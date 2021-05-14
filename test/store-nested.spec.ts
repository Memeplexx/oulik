import { errorMessages } from '../src/shared-consts';
import { libState, testState } from '../src/shared-state';
import { nestedStore, store } from '../src/store-creators';
import { windowAugmentedWithReduxDevtoolsImpl } from './_devtools';

describe('Nested', () => {

  const spyInfo = jest.spyOn(console, 'info');

  beforeAll(() => testState.windowObject = windowAugmentedWithReduxDevtoolsImpl);

  beforeEach(() => {
    libState.nestedContainerStore = null;
    spyInfo.mockReset();
  });

  it('should attach a lib store correctly', () => {
    const initialState = {
      test: '',
      nested: {},
    };
    const initialStateComp = {
      one: ''
    };
    const { select, read } = store(initialState, { isContainerForNestedStores: true });
    const componentName = 'myComp';
    nestedStore(initialStateComp, { componentName });
    expect(read()).toEqual({ ...initialState, nested: { [componentName]: { 0: initialStateComp } } });
  })

  it('should throw an error is more than one container store is created', () => {
    store({}, { isContainerForNestedStores: true });
    expect(() => store({}, { isContainerForNestedStores: true })).toThrow(errorMessages.CANNOT_CREATE_MORE_THAN_ONE_CONTAINER_STORE);
  })

  it('should revert to a top-level store correctly', () => {
    const { select, read } = store({ test: '' });
    const nested = nestedStore({ test: '' }, { componentName: 'nested' });
    nested.select(s => s.test).replace('test');
    expect(read()).toEqual({ test: '' });
    expect(nested.read()).toEqual({ test: 'test' });
  })

  it('should be able to update a lib store correctly', () => {
    const initialState = {
      test: '',
      nested: {},
    };
    store(initialState, { isContainerForNestedStores: true });
    const componentName = 'myComp';
    const nestedStore1 = nestedStore({ one: '' }, { componentName });
    expect(nestedStore1.read().one).toEqual('');
    nestedStore1.select(s => s.one).replace('test');
    expect(testState.currentAction).toEqual({
      type: `nested.${componentName}.0.one.replace()`,
      replacement: 'test',
    })
    expect(nestedStore1.read().one).toEqual('test');
  })

  it('should be able to update a lib store via host store correctly', () => {
    const initialState = {
      test: '',
      nested: {} as { myComp: { [key: string]: { one: string } } },
    };
    const { select, read } = store(initialState, { isContainerForNestedStores: true });
    const componentName = 'myComp';
    const nestedStore1 = nestedStore({ one: '' }, { componentName });
    expect(nestedStore1.read().one).toEqual('');
    select(s => s.nested.myComp['0'].one).replace('test');
    expect(nestedStore1.read().one).toEqual('test');
  })

  it('should be able to stopTracking a lib store correctly', () => {
    const initialState = {
      test: '',
    };
    const { select, read } = store(initialState, { isContainerForNestedStores: true });
    const componentName = 'myComp';
    const nestedStore1 = nestedStore({ one: '' }, { componentName });
    expect(read()).toEqual({ test: '', nested: { [componentName]: { 0: { one: '' } } } });
    nestedStore1.select().storeDetach();
    expect(read()).toEqual({ test: '', nested: {} });
  })

  it('should be able to stopTracking a lib store where there are multiple stores for the same lib', () => {
    const initialState = {
      test: '',
    };
    const { select, read } = store(initialState, { isContainerForNestedStores: true });
    const componentName = 'myComp';
    const nestedStore1 = nestedStore({ one: '' }, { componentName });
    const nestedStore2 = nestedStore({ one: '' }, { componentName });
    expect(read()).toEqual({ test: '', nested: { [componentName]: { '0': { one: '' }, '1': { one: '' } } } });
    nestedStore1.select().storeDetach();
    expect(read()).toEqual({ test: '', nested: { [componentName]: { '1': { one: '' } } } });
    nestedStore2.select().storeDetach();
    expect(read()).toEqual({ test: '', nested: {} });
  })

  it('should be able to perform an update on a second nested store', () => {
    const initialState = {
      test: '',
    };
    const { select, read } = store(initialState, { isContainerForNestedStores: true });
    const componentName = 'myComp';
    const nestedStore1 = nestedStore({ one: '' }, { componentName });
    nestedStore1.select(s => s.one).replace('test1');
    const nestedStore2 = nestedStore({ one: '' }, { componentName });
    nestedStore2.select(s => s.one).replace('test2');
    expect(read()).toEqual({ test: '', nested: { [componentName]: { 0: { one: 'test1' }, 1: { one: 'test2' } } } });
  })

  it('should be able to support nested store which is a top-level array', () => {
    const initialState = {
      test: '',
    };
    const { select, read } = store(initialState, { isContainerForNestedStores: true });
    const componentName = 'myComp';
    const nestedStore1 = nestedStore(new Array<string>(), { componentName });
    nestedStore1.select().insert('test');
    expect(read()).toEqual({ test: '', nested: { [componentName]: { 0: ['test'] } } });
  })

  it('should be able to support nested store which is a top-level number', () => {
    const initialState = {
      test: '',
    };
    const { select, read } = store(initialState, { isContainerForNestedStores: true });
    const componentName = 'myComp';
    const nestedStore1 = nestedStore(0, { componentName });
    nestedStore1.select().replace(1);
    expect(read()).toEqual({ test: '', nested: { [componentName]: { 0: 1 } } });
  })

  it('should be able to support more than one nested store type', () => {
    const initialState = {
      test: '',
    };
    const { select, read } = store(initialState, { isContainerForNestedStores: true });
    const componentName = 'myComp';
    nestedStore(0, { componentName });
    const componentName2 = 'myComp2';
    nestedStore(0, { componentName: componentName2 });
    expect(read()).toEqual({ test: '', nested: { [componentName]: { 0: 0 }, [componentName2]: { 0: 0 } } });
  })

  it('should throw an error if the containing stores state is a primitive', () => {
    expect(() => store(0, { isContainerForNestedStores: true })).toThrowError(errorMessages.INVALID_CONTAINER_FOR_NESTED_STORES);
  })

  it('should throw an error if the containing stores state is an array', () => {
    expect(() => store(new Array<string>(), { isContainerForNestedStores: true })).toThrowError(errorMessages.INVALID_CONTAINER_FOR_NESTED_STORES);
  })

  it('should reset the container store correctly after nested stores have been added', () => {
    const initialState = {
      test: '',
    };
    const { select, read } = store(initialState, { isContainerForNestedStores: true });
    const componentName = 'myComp';
    nestedStore(0, { componentName });
    const componentName2 = 'myComp2';
    nestedStore(0, { componentName: componentName2 });
    select().reset();
    expect(read()).toEqual(initialState);
  })

  it('should be able to reset the state of a nested store', () => {
    const initialState = {
      test: '',
    };
    const { select, read } = store(initialState, { isContainerForNestedStores: true });
    const componentName = 'myComp';
    const nested = nestedStore(0, { componentName });
    nested.select().replace(1);
    expect(read()).toEqual({ test: '', nested: { myComp: { '0': 1 } } });
    nested.select().reset();
    expect(read()).toEqual({ test: '', nested: { myComp: { '0': 0 } } });
    expect(nested.read()).toEqual(0);
    select().reset();
  })

  it('should work without a container store', () => {
    libState.nestedContainerStore = null;
    const { select, read } = nestedStore({
      object: { property: 'a' },
      array: [{ id: 1, value: 'one' }, { id: 2, value: 'two' }, { id: 3, value: 'three' }],
      string: 'b',
    }, { componentName: 'dd', dontTrackWithDevtools: true });
    select(s => s.object.property).replace('test');
    expect(read().object.property).toEqual('test');
    select().storeDetach();
    expect(spyInfo).toHaveBeenCalledWith(errorMessages.NO_CONTAINER_STORE);
    spyInfo.mockReset();
    select(s => s.array).reset();
    expect(spyInfo).toHaveBeenCalledWith(errorMessages.NO_CONTAINER_STORE);
  });

});