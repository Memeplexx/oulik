import { testState } from '../src/shared-state';
import { createGlobalStore } from '../src/store-creators';
import { windowAugmentedWithReduxDevtoolsImpl } from './_devtools';

describe('array.find().replace()', () => {

  beforeAll(() => testState.windowObject = windowAugmentedWithReduxDevtoolsImpl);

  const initialState = {
    object: { property: '' },
    array: [{ id: 1, value: 'one' }, { id: 2, value: 'two' }, { id: 3, value: 'three' }],
  };

  it('should eq()', () => {
    const store = createGlobalStore(initialState);
    const payload = { id: 4, value: 'four' };
    store.get(s => s.array)
      .findWhere(e => e.id).eq(2)
      .replace(payload);
    expect(testState.currentAction).toEqual({
      type: 'array.find().replace()',
      replacement: payload,
      where: 'id === 2',
    });
    expect(store.read().array).toEqual([initialState.array[0], payload, initialState.array[2]]);
    expect(testState.currentMutableState).toEqual(store.read());
  })

  it('should ne()', () => {
    const store = createGlobalStore(initialState);
    const payload = { id: 4, value: 'four' };
    store.get(s => s.array)
      .findWhere(e => e.id).ne(2)
      .replace(payload);
    expect(testState.currentAction).toEqual({
      type: 'array.find().replace()',
      replacement: payload,
      where: 'id !== 2',
    });
    expect(store.read().array).toEqual([payload, initialState.array[1], initialState.array[2]]);
    expect(testState.currentMutableState).toEqual(store.read());
  })

  it('should gt()', () => {
    const store = createGlobalStore(initialState);
    const payload = { id: 4, value: 'four' };
    store.get(s => s.array)
      .findWhere(e => e.id).gt(1)
      .replace(payload);
    expect(testState.currentAction).toEqual({
      type: 'array.find().replace()',
      replacement: payload,
      where: 'id > 1',
    });
    expect(store.read().array).toEqual([initialState.array[0], payload, initialState.array[2]]);
    expect(testState.currentMutableState).toEqual(store.read());
  })

  it('should gte()', () => {
    const store = createGlobalStore(initialState);
    const payload = { id: 4, value: 'four' };
    store.get(s => s.array)
      .findWhere(e => e.id).gte(1)
      .replace(payload);
    expect(testState.currentAction).toEqual({
      type: 'array.find().replace()',
      replacement: payload,
      where: 'id >= 1',
    });
    expect(store.read().array).toEqual([payload, initialState.array[1], initialState.array[2]]);
    expect(testState.currentMutableState).toEqual(store.read());
  })

  it('should lt()', () => {
    const store = createGlobalStore(initialState);
    const payload = { id: 4, value: 'four' };
    store.get(s => s.array)
      .findWhere(e => e.id).lt(2)
      .replace(payload);
    expect(testState.currentAction).toEqual({
      type: 'array.find().replace()',
      replacement: payload,
      where: 'id < 2',
    });
    expect(store.read().array).toEqual([payload, initialState.array[1], initialState.array[2]]);
    expect(testState.currentMutableState).toEqual(store.read());
  })

  it('should lte()', () => {
    const store = createGlobalStore(initialState);
    const payload = { id: 4, value: 'four' };
    store.get(s => s.array)
      .findWhere(e => e.id).lte(2)
      .replace(payload);
    expect(testState.currentAction).toEqual({
      type: 'array.find().replace()',
      replacement: payload,
      where: 'id <= 2',
    });
    expect(store.read().array).toEqual([payload, initialState.array[1], initialState.array[2]]);
    expect(testState.currentMutableState).toEqual(store.read());
  })

  it('should in()', () => {
    const store = createGlobalStore(initialState);
    const payload = { id: 4, value: 'four' };
    store.get(s => s.array)
      .findWhere(e => e.id).in([1, 2])
      .replace(payload);
    expect(testState.currentAction).toEqual({
      type: 'array.find().replace()',
      replacement: payload,
      where: '[1, 2].includes(id)',
    });
    expect(store.read().array).toEqual([payload, initialState.array[1], initialState.array[2]]);
    expect(testState.currentMutableState).toEqual(store.read());
  })

  it('should ni()', () => {
    const store = createGlobalStore(initialState);
    const payload = { id: 4, value: 'four' };
    store.get(s => s.array)
      .findWhere(e => e.id).ni([1, 2])
      .replace(payload);
    expect(testState.currentAction).toEqual({
      type: 'array.find().replace()',
      replacement: payload,
      where: '![1, 2].includes(id)',
    });
    expect(store.read().array).toEqual([initialState.array[0], initialState.array[1], payload]);
    expect(testState.currentMutableState).toEqual(store.read());
  })

  it('should match()', () => {
    const store = createGlobalStore(initialState);
    const payload = { id: 4, value: 'four' };
    store.get(s => s.array)
      .findWhere(e => e.value).matches(/^t/)
      .replace(payload);
    expect(testState.currentAction).toEqual({
      type: 'array.find().replace()',
      replacement: payload,
      where: 'value.match(/^t/)',
    });
    expect(store.read().array).toEqual([initialState.array[0], payload, initialState.array[2]]);
    expect(testState.currentMutableState).toEqual(store.read());
  })

});