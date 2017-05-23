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
                <button type="button" class="button primary" value="${this.options.value}">
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
        } else {
            alert('Algum dado inválido!');
            this.elements.input.classList.remove('work');

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
}