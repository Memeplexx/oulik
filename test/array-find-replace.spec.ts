import { store } from '../src/store-creators';
import { libState } from '../src/shared-state';
import { windowAugmentedWithReduxDevtoolsImpl } from './_devtools';

describe('array.find().replace()', () => {

  beforeAll(() => libState.windowObject = windowAugmentedWithReduxDevtoolsImpl);

  const initialState = {
    object: { property: '' },
    array: [{ id: 1, value: 'one' }, { id: 2, value: 'two' }, { id: 3, value: 'three' }],
  };

  it('should eq()', () => {
    const select = store(initialState);
    const payload = { id: 4, value: 'four' };
    select(s => s.array)
      .findWhere(e => e.id).eq(2)
      .replace(payload);
    expect(libState.currentAction).toEqual({
      type: 'array.find().replace()',
      replacement: payload,
      query: 'id === 2',
    });
    expect(select(s => s.array).read()).toEqual([initialState.array[0], payload, initialState.array[2]]);
    expect(libState.currentMutableState).toEqual(select().read());
  })

  it('should ne()', () => {
    const select = store(initialState);
    const payload = { id: 4, value: 'four' };
    select(s => s.array)
      .findWhere(e => e.id).ne(2)
      .replace(payload);
    expect(libState.currentAction).toEqual({
      type: 'array.find().replace()',
      replacement: payload,
      query: 'id !== 2',
    });
    expect(select(s => s.array).read()).toEqual([payload, initialState.array[1], initialState.array[2]]);
    expect(libState.currentMutableState).toEqual(select().read());
  })

  it('should gt()', () => {
    const select = store(initialState);
    const payload = { id: 4, value: 'four' };
    select(s => s.array)
      .findWhere(e => e.id).gt(1)
      .replace(payload);
    expect(libState.currentAction).toEqual({
      type: 'array.find().replace()',
      replacement: payload,
      query: 'id > 1',
    });
    expect(select(s => s.array).read()).toEqual([initialState.array[0], payload, initialState.array[2]]);
    expect(libState.currentMutableState).toEqual(select().read());
  })

  it('should gte()', () => {
    const select = store(initialState);
    const payload = { id: 4, value: 'four' };
    select(s => s.array)
      .findWhere(e => e.id).gte(1)
      .replace(payload);
    expect(libState.currentAction).toEqual({
      type: 'array.find().replace()',
      replacement: payload,
      query: 'id >= 1',
    });
    expect(select(s => s.array).read()).toEqual([payload, initialState.array[1], initialState.array[2]]);
    expect(libState.currentMutableState).toEqual(select().read());
  })

  it('should lt()', () => {
    const select = store(initialState);
    const payload = { id: 4, value: 'four' };
    select(s => s.array)
      .findWhere(e => e.id).lt(2)
      .replace(payload);
    expect(libState.currentAction).toEqual({
      type: 'array.find().replace()',
      replacement: payload,
      query: 'id < 2',
    });
    expect(select(s => s.array).read()).toEqual([payload, initialState.array[1], initialState.array[2]]);
    expect(libState.currentMutableState).toEqual(select().read());
  })

  it('should lte()', () => {
    const select = store(initialState);
    const payload = { id: 4, value: 'four' };
    select(s => s.array)
      .findWhere(e => e.id).lte(2)
      .replace(payload);
    expect(libState.currentAction).toEqual({
      type: 'array.find().replace()',
      replacement: payload,
      query: 'id <= 2',
    });
    expect(select(s => s.array).read()).toEqual([payload, initialState.array[1], initialState.array[2]]);
    expect(libState.currentMutableState).toEqual(select().read());
  })

  it('should in()', () => {
    const select = store(initialState);
    const payload = { id: 4, value: 'four' };
    select(s => s.array)
      .findWhere(e => e.id).in([1, 2])
      .replace(payload);
    expect(libState.currentAction).toEqual({
      type: 'array.find().replace()',
      replacement: payload,
      query: '[1, 2].includes(id)',
    });
    expect(select(s => s.array).read()).toEqual([payload, initialState.array[1], initialState.array[2]]);
    expect(libState.currentMutableState).toEqual(select().read());
  })

  it('should ni()', () => {
    const get = store(initialState);
    const payload = { id: 4, value: 'four' };
    get(s => s.array)
      .findWhere(e => e.id).ni([1, 2])
      .replace(payload);
    expect(libState.currentAction).toEqual({
      type: 'array.find().replace()',
      replacement: payload,
      query: '![1, 2].includes(id)',
    });
    expect(get(s => s.array).read()).toEqual([initialState.array[0], initialState.array[1], payload]);
    expect(libState.currentMutableState).toEqual(get().read());
  })

  it('should match()', () => {
    const get = store(initialState);
    const payload = { id: 4, value: 'four' };
    get(s => s.array)
      .findWhere(e => e.value).match(/^t/)
      .replace(payload);
    expect(libState.currentAction).toEqual({
      type: 'array.find().replace()',
      replacement: payload,
      query: 'value.match(/^t/)',
    });
    expect(get(s => s.array).read()).toEqual([initialState.array[0], payload, initialState.array[2]]);
    expect(libState.currentMutableState).toEqual(get().read());
  })

});