import { fragmentFromString } from '../../infraestructure';
import style from './upload.style.scss';

export default class UploadComponent {
    constructor(options) {
        this.options = options || {};
        this.container = document.createDocumentFragment();
        this.changed = false;
        this.elements = {};
    }

    renderTemplate() {
        let template = `
            <div class="upload-component ${this.options.class}">
                <input id="${this.options.id}" name="${this.options.name}" type="file" />
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
        this.elements.input.addEventListener('change', function () {
            let file = this.files[0];

            let fReader = new FileReader();

            fReader.onload = function () {
                localStorage.setItem("imgData", fReader.result);
            };

            fReader.readAsDataURL(file);
        }, true);
    }

    setElements() {
        let root = this.container.querySelector('.text-component');
        let input = this.container.querySelector('input');

        this.elements = { root, input };
    }

    validate() {
        return true;
    }

    getKey() {
        return this.options.id;
    }

    getValue() {
        return localStorage.getItem("imgData");
    }
}