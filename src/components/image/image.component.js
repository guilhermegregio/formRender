import { fragmentFromString, localStorageWraper } from '../../infraestructure';
import style from './image.style.scss';

export default class ImageComponent {
    constructor(options) {
        this.options = options || {};
        this.container = document.createDocumentFragment();
        this.changed = false;
        this.elements = {};
    }

    renderTemplate() {
        let template = `
            <div class="image-component group ${this.options.class}">
                <img name="${this.options.name}" />
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
        let image = localStorageWraper.getItem('imgData');

        this.setImage(image);

        document.addEventListener('itemInserted', (event) => {
            if (event.detail.key === 'imgData') {
                this.setImage(event.detail.value)
            }
        }, false);
    }

    setImage(image) {
        if (image && image.match(/data:image/)) {
            this.elements.img.src = image;
        }
    }

    setElements() {
        let root = this.container.querySelector('.image-component');
        let img = this.container.querySelector('img');

        this.elements = { root, img };
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