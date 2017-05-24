import isEmptyObj from './isEmptyObj';

test('should be empty object', () => {
    expect(isEmptyObj({})).toBe(true);
    expect(isEmptyObj({ '': '' })).toBe(true);
});

test('should is not empty object', () => {
    expect(isEmptyObj({ a: 1 })).toBe(false);
    expect(isEmptyObj({ 'A': '1' })).toBe(false);
});