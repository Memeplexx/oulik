import { testState } from '../src/shared-state';
import { store } from '../src/store-creators';
import { windowAugmentedWithReduxDevtoolsImpl } from './_devtools';

describe('array.filterCustom().remove()', () => {

  beforeAll(() => testState.windowObject = windowAugmentedWithReduxDevtoolsImpl);

  const initialState = {
    object: { property: '' },
    array: [{ id: 1, value: 'one' }, { id: 2, value: 'two' }, { id: 3, value: 'three' }],
  };

  it('should eq()', () => {
    const { select, read } = store(initialState);
    const where = (e: typeof initialState['array'][0]) => e.id === 2;
    select(s => s.array)
      .filterWhere(where).returnsTrue()
      .remove();
    expect(testState.currentAction).toEqual({
      type: 'array.filter().remove()',
      toRemove: [initialState.array[1]],
      where: where.toString(),
    });
    expect(read().array).toEqual([initialState.array[0], initialState.array[2]]);
    expect(testState.currentMutableState).toEqual(read());
  })

  it('should ne()', () => {
    const { select, read } = store(initialState);
    const where = (e: typeof initialState['array'][0]) => e.id !== 2;
    select(s => s.array)
      .filterWhere(where).returnsTrue()
      .remove();
    expect(testState.currentAction).toEqual({
      type: 'array.filter().remove()',
      toRemove: [initialState.array[0], initialState.array[2]],
      where: where.toString(),
    });
    expect(read().array).toEqual([initialState.array[1]]);
    expect(testState.currentMutableState).toEqual(read());
  })

  it('should gt()', () => {
    const { select, read } = store(initialState);
    const where = (e: typeof initialState['array'][0]) => e.id > 1;
    select(s => s.array)
      .filterWhere(where).returnsTrue()
      .remove();
    expect(testState.currentAction).toEqual({
      type: 'array.filter().remove()',
      toRemove: [initialState.array[1], initialState.array[2]],
      where: where.toString(),
    });
    expect(read().array).toEqual([initialState.array[0]]);
    expect(testState.currentMutableState).toEqual(read());
  })

  it('should lt()', () => {
    const { select, read } = store(initialState);
    const where = (e: typeof initialState['array'][0]) => e.id < 2;
    select(s => s.array)
      .filterWhere(where).returnsTrue()
      .remove();
    expect(testState.currentAction).toEqual({
      type: 'array.filter().remove()',
      toRemove: [initialState.array[0]],
      where: where.toString(),
    });
    expect(read().array).toEqual([initialState.array[1], initialState.array[2]]);
    expect(testState.currentMutableState).toEqual(read());
  })

  it('should in()', () => {
    const { select, read } = store(initialState);
    const where = (e: typeof initialState['array'][0]) => [1, 2].includes(e.id);
    select(s => s.array)
      .filterWhere(where).returnsTrue()
      .remove();
    expect(testState.currentAction).toEqual({
      type: 'array.filter().remove()',
      toRemove: [initialState.array[0], initialState.array[1]],
      where: where.toString(),
    });
    expect(read().array).toEqual([initialState.array[2]]);
    expect(testState.currentMutableState).toEqual(read());
  })

  it('should ni()', () => {
    const { select, read } = store(initialState);
    const where = (e: typeof initialState['array'][0]) => ![1, 2].includes(e.id);
    select(s => s.array)
      .filterWhere(where).returnsTrue()
      .remove();
    expect(testState.currentAction).toEqual({
      type: 'array.filter().remove()',
      toRemove: [initialState.array[2]],
      where: where.toString(),
    });
    expect(read().array).toEqual([initialState.array[0], initialState.array[1]]);
    expect(testState.currentMutableState).toEqual(read());
  })

  it('should match()', () => {
    const { select, read } = store(initialState);
    const where = (e: typeof initialState['array'][0]) => /^t/.test(e.value);
    select(s => s.array)
      .filterWhere(where).returnsTrue()
      .remove();
    expect(testState.currentAction).toEqual({
      type: 'array.filter().remove()',
      toRemove: [initialState.array[1], initialState.array[2]],
      where: where.toString(),
    });
    expect(read().array).toEqual([initialState.array[0]]);
    expect(testState.currentMutableState).toEqual(read());
  })

});