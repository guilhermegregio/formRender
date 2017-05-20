/**
* @jest-environment jsdom
*/

import googleMock from '../../../__mocks__/google';
import TextComponent from './text.component';

test('should change name', () => {
    let element = document.createElement('div');

    let text = new TextComponent({
        "name": "txtFullname",
        "id": "txtFullname",
        "value": "",
        "type": "text",
        "class": "input"
    });

    text.appendTo(element);

    let input = element.querySelector('.input input');

    changeValue(input, 'Guilherme')


    expect(text.changed).toBe(true);
    expect(input.value).toBe('Guilherme');
});

test('should validate invalid cpf mask', () => {
    let element = document.createElement('div');

    let text = new TextComponent({
        "name": "txtFullname",
        "id": "txtFullname",
        "mask": "(000).000.000-00",
        "value": "",
        "type": "text",
        "class": "input"
    });

    text.appendTo(element);

    let input = element.querySelector('.input input');
    let componentRoot = element.querySelector('.text-component')
    changeValue(input, '329.190.111-7A');

    expect(componentRoot.className).toEqual(expect.stringContaining('invalid'));
    expect(text.validate()).toBe(false);
});

test('should validate mask', () => {
    let element = document.createElement('div');

    let text = new TextComponent({
        "name": "txtFullname",
        "id": "txtFullname",
        "mask": "^(000).[000].$000-00$",
        "value": "^(329).[080].$120-00$",
        "type": "text"
    });

    text.appendTo(element);

    let componentRoot = element.querySelector('.text-component')

    expect(componentRoot.className).not.toEqual(expect.stringContaining('invalid'));
    expect(text.validate()).toBe(true);
});

function changeValue(element, value) {
    let event = new window.Event("change");

    element.value = value;

    element.dispatchEvent(event);
}