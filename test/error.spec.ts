import { make } from '../src';
import { errorMessages } from '../src/consts';
import { tests } from '../src/tests';
import { windowAugmentedWithReduxDevtoolsImpl } from './_devtools';

describe('Error', () => {

  beforeAll(() => tests.windowObject = windowAugmentedWithReduxDevtoolsImpl);

  it('should throw an error when a method is invoked within a selector', () => {
    const select = make(new Array<string>());
    expect(() => select(s => s.some(e => true)).replaceWith(false)).toThrowError(errorMessages.ILLEGAL_FUNCTION_INVOKED_WITHIN_SELECTOR('some'));
  })

  it('should throw an error when filter() is invoked within a selector', () => {
    const select = make(new Array<string>());
    expect(() => select(s => s.filter(e => true)).replaceAll([])).toThrowError(errorMessages.ILLEGAL_FUNCTION_INVOKED_WITHIN_SELECTOR('filter'));
  })

  it('should throw an error if the initial state has functions in it', () => {
    expect(() => make({
      test: () => null,
    })).toThrowError(errorMessages.INVALID_STATE_INPUT);
  })

  it('should throw an error if the initial state has a set in it', () => {
    expect(() => make({
      test: new Set(),
    })).toThrowError(errorMessages.INVALID_STATE_INPUT);
  })

});