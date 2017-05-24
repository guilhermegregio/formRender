import ButtonComponent from './button.component';

let element;

beforeEach(() => {
    element = document.createElement('div');
});

test('should create simple button', () => {
    let button = new ButtonComponent({
        "type": "button",
        "name": "btnSave",
        "id": "btnSave",
        "value": "Gravar",
        "class": "input"
    });

    button.appendTo(element);

    let input = element.querySelector('.button-component button');

    expect(input.tagName).toBe('BUTTON');
    expect(input.value).toBe('Gravar');
});