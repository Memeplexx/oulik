import { testState } from '../src/shared-state';
import { store } from '../src/store-creators';
import { windowAugmentedWithReduxDevtoolsImpl } from './_devtools';

describe('array.whereMany().replace()', () => {

  beforeAll(() => testState.windowObject = windowAugmentedWithReduxDevtoolsImpl);

  const initialState = {
    object: { property: '' },
    array: [{ id: 1, value: 'one' }, { id: 2, value: 'two' }, { id: 3, value: 'three' }],
  };

  it('should eq()', () => {
    const { select, read } = store(initialState);
    const payload = { id: 4, value: 'four' };
    select(s => s.array)
      .filterWhere(e => e.id).isEq(2)
      .replace(payload);
    expect(testState.currentAction).toEqual({
      type: 'array.filter().replace()',
      replacement: payload,
      where: 'id === 2',
    });
    expect(read().array).toEqual([initialState.array[0], payload, initialState.array[2]]);
    expect(testState.currentMutableState).toEqual(read());
  })

  it('should ne()', () => {
    const { select, read } = store(initialState);
    const payload = { id: 4, value: 'four' };
    select(s => s.array)
      .filterWhere(e => e.id).isNotEq(2)
      .replace(payload);
    expect(testState.currentAction).toEqual({
      type: 'array.filter().replace()',
      replacement: payload,
      where: 'id !== 2',
    });
    expect(read().array).toEqual([payload, initialState.array[1], payload]);
    expect(testState.currentMutableState).toEqual(read());
  })

  it('should gt()', () => {
    const { select, read } = store(initialState);
    const payload = { id: 4, value: 'four' };
    select(s => s.array)
      .filterWhere(e => e.id).isMoreThan(1)
      .replace(payload);
    expect(testState.currentAction).toEqual({
      type: 'array.filter().replace()',
      replacement: payload,
      where: 'id > 1',
    });
    expect(read().array).toEqual([initialState.array[0], payload, payload]);
    expect(testState.currentMutableState).toEqual(read());
  })

  it('should gte()', () => {
    const { select, read } = store(initialState);
    const payload = { id: 4, value: 'four' };
    select(s => s.array)
      .filterWhere(e => e.id).isMoreThanOrEq(1)
      .replace(payload);
    expect(testState.currentAction).toEqual({
      type: 'array.filter().replace()',
      replacement: payload,
      where: 'id >= 1',
    });
    expect(read().array).toEqual([payload, payload, payload]);
    expect(testState.currentMutableState).toEqual(read());
  })

  it('should lt()', () => {
    const { select, read } = store(initialState);
    const payload = { id: 4, value: 'four' };
    select(s => s.array)
      .filterWhere(e => e.id).isLessThan(2)
      .replace(payload);
    expect(testState.currentAction).toEqual({
      type: 'array.filter().replace()',
      replacement: payload,
      where: 'id < 2',
    });
    expect(read().array).toEqual([payload, initialState.array[1], initialState.array[2]]);
    expect(testState.currentMutableState).toEqual(read());
  })

  it('should lte()', () => {
    const { select, read } = store(initialState);
    const payload = { id: 4, value: 'four' };
    select(s => s.array)
      .filterWhere(e => e.id).isLessThanOrEq(2)
      .replace(payload);
    expect(testState.currentAction).toEqual({
      type: 'array.filter().replace()',
      replacement: payload,
      where: 'id <= 2',
    });
    expect(read().array).toEqual([payload, payload, initialState.array[2]]);
    expect(testState.currentMutableState).toEqual(read());
  })

  it('should in()', () => {
    const { select, read } = store(initialState);
    const payload = { id: 4, value: 'four' };
    select(s => s.array)
      .filterWhere(e => e.id).isIn([1, 2])
      .replace(payload);
    expect(testState.currentAction).toEqual({
      type: 'array.filter().replace()',
      replacement: payload,
      where: '[1, 2].includes(id)',
    });
    expect(read().array).toEqual([payload, payload, initialState.array[2]]);
    expect(testState.currentMutableState).toEqual(read());
  })

  it('should ni()', () => {
    const { select, read } = store(initialState);
    const payload = { id: 4, value: 'four' };
    select(s => s.array)
      .filterWhere(e => e.id).isNotIn([1, 2])
      .replace(payload);
    expect(testState.currentAction).toEqual({
      type: 'array.filter().replace()',
      replacement: payload,
      where: '![1, 2].includes(id)',
    });
    expect(read().array).toEqual([initialState.array[0], initialState.array[1], payload]);
    expect(testState.currentMutableState).toEqual(read());
  })

  it('should match()', () => {
    const { select, read } = store(initialState);
    const payload = { id: 4, value: 'four' };
    select(s => s.array)
      .filterWhere(e => e.value).isMatching(/^t/)
      .replace(payload);
    expect(testState.currentAction).toEqual({
      type: 'array.filter().replace()',
      replacement: payload,
      where: 'value.match(/^t/)',
    });
    expect(read().array).toEqual([initialState.array[0], payload, payload]);
    expect(testState.currentMutableState).toEqual(read());
  })

});