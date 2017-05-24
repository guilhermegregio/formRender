import localStorageMock from '../../../__mocks__/localStorage';
import { fragmentFromString } from '../../infraestructure';
import DefaultSubmit from '../../application/defaultSubmit';

import style from './button.style.scss';

export default class ButtonComponent {
    constructor(options) {
        this.options = options || {};
        this.container = document.createDocumentFragment();
        this.changed = false;
        this.elements = {};
    }

    renderTemplate() {
        let template = `
            <div class="button-component group ${this.options.class}">
                <button id="${this.options.id}" type="button" class="button primary" value="${this.options.value}">
                    <span class="load fa fa-spinner"></span>
                    <span class="value">${this.options.value}</span>
                </button>
            </div>
        `;

        return template;
    }

    appendTo(el) {
        this.container.appendChild(fragmentFromString(this.renderTemplate()));

        this.setElements();

        this.binds();

        el.appendChild(this.container);
    }

    binds() {
        this.elements.input.addEventListener('click', () => {

            this.submit();
        }, true);
    }

    setElements() {
        let root = this.container.querySelector('.button-component');
        let input = this.container.querySelector('button');

        this.elements = { root, input };
    }

    submit() {
        let defaultSubmit = new DefaultSubmit();


        this.elements.input.classList.add('work');
        if (defaultSubmit.valid()) {
            defaultSubmit.submit();
            this.elements.input.classList.remove('work');
            this.showSuccessMessage();
        } else {
            this.elements.input.classList.remove('work');
            this.showErrorMessage();
        }
    }

    validate() {
        return true;
    }

    getKey() {
        return '';
    }

    getValue() {
        return '';
    }

    showSuccessMessage() {
        let message = this.writeMessage('Sucesso', 'Informações cadastrada.');
        message.classList.add('success');
    }

    showErrorMessage() {
        let message = this.writeMessage('Error', 'Dados inválidos.');
        message.classList.add('error');
    }

    writeMessage(title, body) {
        let timer;
        let message = document.querySelector('.message-log');

        let titleElement = message.querySelector('h3');
        let bodyElement = message.querySelector('p');
        let closeElement = message.querySelector('.link');

        titleElement.textContent = title;
        bodyElement.textContent = body;

        closeElement.addEventListener('click', () => {
            this.removeMessage(message);
            window.clearTimeout(timer);
        }, true);

        timer = window.setTimeout(() => this.removeMessage(message), 2000);
        return message;
    }

    removeMessage(element) {
        element.classList.remove('success');
        element.classList.remove('error');
    }
}