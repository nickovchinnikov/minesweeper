import { copyField } from './copyField';

import { Field } from './Field';

import { fieldGenerator } from './__mocks__/Field';

describe('Check copyField', () => {
  it('Object.is should be different, data is the same', () => {
    const prevField = fieldGenerator(9) as Field;

    const nextField = copyField(prevField);

    expect(prevField).not.toBe(nextField);
    expect(prevField).toEqual(nextField);
  });
});
