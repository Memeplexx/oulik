import { testState } from '../src/shared-state';
import { createGlobalStore } from '../src/store-creators';
import { windowAugmentedWithReduxDevtoolsImpl } from './_devtools';

describe('array.filterCustom().patch()', () => {

  beforeAll(() => testState.windowObject = windowAugmentedWithReduxDevtoolsImpl);

  const initialState = {
    object: { property: '' },
    array: [{ id: 1, value: 'one' }, { id: 2, value: 'two' }, { id: 3, value: 'three' }],
  };

  it('should eq()', () => {
    const { get, read } = createGlobalStore(initialState);
    const payload = { value: 'new' };
    const where = (e: typeof initialState['array'][0]) => e.id === 2;
    get(s => s.array)
      .filterWhere(where).returnsTrue()
      .patch(payload);
    expect(testState.currentAction).toEqual({
      type: 'array.filter().patch()',
      patch: payload,
      where: where.toString(),
    });
    expect(read().array).toEqual([initialState.array[0], { ...initialState.array[1], ...payload }, initialState.array[2]]);
    expect(testState.currentMutableState).toEqual(read());
  })

  it('should ne()', () => {
    const { get, read } = createGlobalStore(initialState);
    const payload = { value: 'four' };
    const where = (e: typeof initialState['array'][0]) => e.id !== 2;
    get(s => s.array)
      .filterWhere(where).returnsTrue()
      .patch(payload);
    expect(testState.currentAction).toEqual({
      type: 'array.filter().patch()',
      patch: payload,
      where: where.toString(),
    });
    expect(read().array).toEqual([{ ...initialState.array[0], ...payload }, initialState.array[1], { ...initialState.array[2], ...payload }]);
    expect(testState.currentMutableState).toEqual(read());
  })

  it('should gt()', () => {
    const { get, read } = createGlobalStore(initialState);
    const payload = { value: 'four' };
    const where = (e: typeof initialState['array'][0]) => e.id > 1;
    get(s => s.array)
      .filterWhere(where).returnsTrue()
      .patch(payload);
    expect(testState.currentAction).toEqual({
      type: 'array.filter().patch()',
      patch: payload,
      where: where.toString(),
    });
    expect(read().array).toEqual([initialState.array[0], { ...initialState.array[1], ...payload }, { ...initialState.array[2], ...payload }]);
    expect(testState.currentMutableState).toEqual(read());
  })

  it('should lt()', () => {
    const { get, read } = createGlobalStore(initialState);
    const payload = { value: 'four' };
    const where = (e: typeof initialState['array'][0]) => e.id < 2;
    get(s => s.array)
      .filterWhere(where).returnsTrue()
      .patch(payload);
    expect(testState.currentAction).toEqual({
      type: 'array.filter().patch()',
      patch: payload,
      where: where.toString(),
    });
    expect(read().array).toEqual([{ ...initialState.array[0], ...payload }, initialState.array[1], initialState.array[2]]);
    expect(testState.currentMutableState).toEqual(read());
  })

  it('should in()', () => {
    const { get, read } = createGlobalStore(initialState);
    const payload = { id: 4, value: 'four' };
    const where = (e: typeof initialState['array'][0]) => [1, 2].includes(e.id);
    get(s => s.array)
      .filterWhere(where).returnsTrue()
      .patch(payload);
    expect(testState.currentAction).toEqual({
      type: 'array.filter().patch()',
      patch: payload,
      where: where.toString(),
    });
    expect(read().array).toEqual([{ ...initialState.array[0], ...payload }, { ...initialState.array[1], ...payload }, initialState.array[2]]);
    expect(testState.currentMutableState).toEqual(read());
  })

  it('should ni()', () => {
    const { get, read } = createGlobalStore(initialState);
    const payload = { value: 'four' };
    const where = (e: typeof initialState['array'][0]) => ![1, 2].includes(e.id);
    get(s => s.array)
      .filterWhere(where).returnsTrue()
      .patch(payload);
    expect(testState.currentAction).toEqual({
      type: 'array.filter().patch()',
      patch: payload,
      where: where.toString(),
    });
    expect(read().array).toEqual([initialState.array[0], initialState.array[1], { ...initialState.array[2], ...payload }]);
    expect(testState.currentMutableState).toEqual(read());
  })

  it('should match()', () => {
    const { get, read } = createGlobalStore(initialState);
    const payload = { value: 'four' };
    const where = (e: typeof initialState['array'][0]) => /^t/.test(e.value);
    get(s => s.array)
      .filterWhere(where).returnsTrue()
      .patch(payload);
    expect(testState.currentAction).toEqual({
      type: 'array.filter().patch()',
      patch: payload,
      where: where.toString(),
    });
    expect(read().array).toEqual([initialState.array[0], { ...initialState.array[1], ...payload }, { ...initialState.array[2], ...payload }]);
    expect(testState.currentMutableState).toEqual(read());
  })

});