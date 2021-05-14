import { testState } from '../src/shared-state';
import { store } from '../src/store-creators';
import { windowAugmentedWithReduxDevtoolsImpl } from './_devtools';

describe('array', () => {

  beforeAll(() => testState.windowObject = windowAugmentedWithReduxDevtoolsImpl);

  const initialState = {
    array: [{ id: 1, value: 'one' }, { id: 2, value: 'two' }, { id: 3, value: 'three' }],
    object: { property: '' },
  };

  it('should removeAll()', () => {
    const { select, read } = store(initialState);
    select(s => s.array)
      .removeAll();
    expect(testState.currentAction).toEqual({
      type: 'array.removeAll()',
    });
    expect(read().array).toEqual([]);
    expect(testState.currentMutableState).toEqual(read());
  });

  it('should replaceAll()', () => {
    const { select, read } = store(initialState);
    const payload = [{ id: 4, value: 'four' }, { id: 5, value: 'five' }];
    select(s => s.array)
      .replaceAll(payload);
    expect(testState.currentAction).toEqual({
      type: 'array.replaceAll()',
      replacement: payload,
    });
    expect(read().array).toEqual(payload);
    expect(testState.currentMutableState).toEqual(read());
  });

  it('should reset()', () => {
    const { select, read } = store(initialState);
    select(s => s.array)
      .reset();
    expect(testState.currentAction).toEqual({
      type: 'array.reset()',
      replacement: initialState.array,
    });
    expect(read().array).toEqual(initialState.array);
    expect(testState.currentMutableState).toEqual(read());
  });

  it('should insert() one', () => {
    const { select, read } = store(initialState);
    const payload = { id: 4, value: 'four' };
    select(s => s.array)
      .insert(payload);
    expect(testState.currentAction).toEqual({
      type: 'array.insert()',
      insertion: payload,
    });
    expect(read().array).toEqual([...initialState.array, payload]);
    expect(testState.currentMutableState).toEqual(read());
  })

  it('should insert() one at index', () => {
    const { select, read } = store(initialState);
    const payload = { id: 4, value: 'four' };
    select(s => s.array)
      .insert(payload, { atIndex: 1 });
    expect(testState.currentAction).toEqual({
      type: 'array.insert()',
      insertion: payload,
      atIndex: 1
    });
    expect(read().array).toEqual([initialState.array[0], payload, initialState.array[1], initialState.array[2]]);
    expect(testState.currentMutableState).toEqual(read());
  })

  it('should insert() many', () => {
    const { select, read } = store(initialState);
    const payload = [{ id: 4, value: 'four' }, { id: 5, value: 'five' }];
    select(s => s.array)
      .insert(payload);
    expect(testState.currentAction).toEqual({
      type: 'array.insert()',
      insertion: payload,
    });
    expect(read().array).toEqual([...initialState.array, ...payload]);
    expect(testState.currentMutableState).toEqual(read());
  })

  it('should insert() many at index', () => {
    const { select, read } = store(initialState);
    const payload = [{ id: 4, value: 'four' }, { id: 5, value: 'five' }];
    select(s => s.array)
      .insert(payload, { atIndex: 1 });
    expect(testState.currentAction).toEqual({
      type: 'array.insert()',
      insertion: payload,
      atIndex: 1
    });
    expect(read().array).toEqual([initialState.array[0], ...payload, initialState.array[1], initialState.array[2]]);
    expect(testState.currentMutableState).toEqual(read());
  })

  it('should be able to upsertMatching() with multiple elements, replacing and inserting', () => {
    const { select, read } = store(initialState);
    const payload = [{ id: 2, value: 'twoo' }, { id: 3, value: 'threee' }, { id: 4, value: 'four' }];
    select(s => s.array)
      .upsertMatching(s => s.id)
      .with(payload);
    expect(testState.currentAction).toEqual({
      type: 'array.upsertMatching(id).with()',
      argument: payload,
      replacementCount: 2,
      insertionCount: 1,
    });
    expect(read().array).toEqual([{ id: 1, value: 'one' }, { id: 2, value: 'twoo' }, { id: 3, value: 'threee' }, { id: 4, value: 'four' }]);
    expect(testState.currentMutableState).toEqual(read());
  });

  it('should upsertMatching() with one element replacing', () => {
    const { select, read } = store(initialState);
    const payload = { id: 2, value: 'two updated' };
    select(s => s.array)
      .upsertMatching(s => s.id)
      .with(payload);
    expect(testState.currentAction).toEqual({
      type: 'array.upsertMatching(id).with()',
      argument: payload,
      insertionCount: 0,
      replacementCount: 1,
    });
    expect(read().array).toEqual([initialState.array[0], payload, initialState.array[2]]);
    expect(testState.currentMutableState).toEqual(read());
  });

  it('should upsertMatching() with one element inserting', () => {
    const { select, read } = store(initialState);
    const payload = { id: 4, value: 'four inserted' };
    select(s => s.array)
      .upsertMatching(s => s.id)
      .with(payload);
    expect(testState.currentAction).toEqual({
      type: 'array.upsertMatching(id).with()',
      argument: payload,
      insertionCount: 1,
      replacementCount: 0,
    });
    expect(read().array).toEqual([...initialState.array, payload]);
    expect(testState.currentMutableState).toEqual(read());
  });

});