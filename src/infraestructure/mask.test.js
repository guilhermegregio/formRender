import Mask from './mask';

let input;

beforeEach(() => {
    input = document.createElement('input');
});

test('should mask a text', () => {
    expect(new Mask('(00) 00000-0000').mask('12345689012')).toBe('(12) 34568-9012');
});