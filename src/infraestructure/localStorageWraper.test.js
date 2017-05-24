import localStorageMock from '../../__mocks__/localStorage';

import localStorageWrapper from './localStorageWraper';

let localStorage = window.localStorage;

beforeEach(() => {
    localStorage.setItem('test', 'simple test');

});

test('should get from localStorage', () => {

    let local = localStorageWrapper.getItem('test');

    expect(local).toBe('simple test');
});

test('should set on localStorage', () => {

    localStorageWrapper.setItem('test', 'new value');


    expect(localStorage.getItem('test')).toBe('new value');
});

test('should clean localStorage', () => {

    localStorageWrapper.clear();

    expect(localStorage.getItem('test')).toBe(undefined);
});