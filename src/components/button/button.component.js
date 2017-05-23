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
                <input id="${this.options.id}" name="${this.options.name}" type="button" value="${this.options.value}" />
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
        let root = this.container.querySelector('.text-component');
        let input = this.container.querySelector('input');

        this.elements = { root, input };
    }

    submit() {
        let defaultSubmit = new DefaultSubmit();

        if (defaultSubmit.valid()) {
            defaultSubmit.submit();
        } else {
            alert('Algum dado inválido!');
        }
    }

    validate(){
        return true;
    }

    getKey(){
        return '';
    }

    getValue(){
        return '';
    }
}