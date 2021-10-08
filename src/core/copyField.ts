import { Field } from './Field';

export const copyField = (field: Field): Field => field.map((row) => [...row]);
