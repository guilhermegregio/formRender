import DefaultSubmit from './defaultSubmit';
import ComponentRegister from '../infraestructure/componentRegister';

import localStorageMock from '../../__mocks__/localStorage';

class MockComponent {
    constructor(key, value, valid) {
        this.key = key;
        this.value = value;
        this.valid = valid;
    }

    validate() {
        return this.valid;
    }

    getValue() {
        return this.value;
    }

    getKey() {
        return this.key;
    }
}

let defaultSubmit;

beforeEach(() => {
    ComponentRegister.getRegister().clean();
    defaultSubmit = new DefaultSubmit();
});

test('should is valid if form is valid', () => {
    expect(defaultSubmit.valid()).toBe(false);
});

test('should invalid form', () => {
    ComponentRegister.getRegister().registry(new MockComponent('key1', 'Teste', true));
    ComponentRegister.getRegister().registry(new MockComponent('key1', 'Teste', false));

    expect(defaultSubmit.valid()).toBe(false);
});

test('should valid form', () => {
    ComponentRegister.getRegister().registry(new MockComponent('key1', 'Teste', true));
    ComponentRegister.getRegister().registry(new MockComponent('key1', 'Teste', true));

    expect(defaultSubmit.valid()).toBe(true);
});

test('should save form', () => {
    ComponentRegister.getRegister().registry(new MockComponent('key1', 'Teste', true));

    defaultSubmit.submit();

    expect(localStorage.getItem('formData')).toBe(JSON.stringify([{ key1: 'Teste' }]));
});