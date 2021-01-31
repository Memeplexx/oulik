import { errorMessages } from '../src/consts';
import { set } from '../src/core';
import { tests } from '../src/tests';
import { windowAugmentedWithReduxDevtoolsImpl } from './_devtools';

describe('array.find().and().or()', () => {

  beforeAll(() => tests.windowObject = windowAugmentedWithReduxDevtoolsImpl);

  const initialState = {
    object: { property: '' },
    array: [{ id: 1, value: 'one' }, { id: 2, value: 'two' }, { id: 3, value: 'three' }],
  };

  it('should eq().and().eq()', () => {
    const get = set(initialState);
    tests.logLevel = 'DEBUG';
    get(s => s.array)
      .find(s => s.id).eq(2).and(s => s.value).eq('two')
      .remove();
    tests.logLevel = 'NONE';
    expect(tests.currentAction).toEqual({
      type: 'array.find().remove()',
      toRemove: initialState.array[1],
      query: 'id === 2 && value === two',
    });
    expect(get(s => s.array).read()).toEqual([initialState.array[0], initialState.array[2]]);
    expect(tests.currentMutableState).toEqual(get().read());
  })

  it('should eq().or().eq()', () => {
    const get = set(initialState);
    get(s => s.array)
      .find(s => s.id).eq(1).or(s => s.value).eq('two')
      .remove();
    expect(tests.currentAction).toEqual({
      type: 'array.find().remove()',
      toRemove: initialState.array[0],
      query: 'id === 1 || value === two',
    });
    expect(get(s => s.array).read()).toEqual([initialState.array[1], initialState.array[2]]);
    expect(tests.currentMutableState).toEqual(get().read());
  })

  it('should eq().and().eq() not matching throw', () => {
    const get = set(initialState);
    expect(() => get(s => s.array)
      .find(s => s.id).eq(1).and(s => s.id).eq(2)
      .remove()).toThrowError(errorMessages.NO_ARRAY_ELEMENT_FOUND);
  })

  it('should eq().and().eq().or().eq()', () => {
    const get = set(initialState);
    get(s => s.array)
      .find(e => e.id).eq(1).and(e => e.id).eq(2).or(e => e.id).eq(3)
      .remove();
    expect(tests.currentAction).toEqual({
      type: 'array.find().remove()',
      toRemove: initialState.array[2],
      query: 'id === 1 && id === 2 || id === 3',
    });
    expect(get(s => s.array).read()).toEqual([initialState.array[0], initialState.array[1]]);
    expect(tests.currentMutableState).toEqual(get().read());
  })

  it('should eq().or().eq().and().eq()', () => {
    const get = set(initialState);
    get(s => s.array)
      .find(e => e.id).eq(4).or(e => e.id).eq(3).and(e => e.value).eq('three')
      .remove();
    expect(tests.currentAction).toEqual({
      type: 'array.find().remove()',
      toRemove: initialState.array[2],
      query: 'id === 4 || id === 3 && value === three',
    });
    expect(get(s => s.array).read()).toEqual([initialState.array[0], initialState.array[1]]);
    expect(tests.currentMutableState).toEqual(get().read());
  })

  it('should eq().and().eq().or().eq().and().eq()', () => {
    const get = set(initialState);
    get(s => s.array)
      .find(e => e.id).eq(1).and(e => e.value).eq('one').or(e => e.id).eq(3).and(e => e.value).eq('three')
      .remove();
    expect(tests.currentAction).toEqual({
      type: 'array.find().remove()',
      toRemove: initialState.array[0],
      query: 'id === 1 && value === one || id === 3 && value === three',
    });
    expect(get(s => s.array).read()).toEqual([initialState.array[1], initialState.array[2]]);
    expect(tests.currentMutableState).toEqual(get().read());
  })

});