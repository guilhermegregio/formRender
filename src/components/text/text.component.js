import { buildRegExpByMask, fragmentFromString, localStorageWraper } from '../../infraestructure';
import style from './text.style.scss';

export default class TextComponent {
    constructor(options) {
        this.options = options || {};
        this.container = document.createDocumentFragment();
        this.elements = {};
    }

    renderTemplate() {
        let template = `
            <div class="text-component group ${this.options.class}">
                <input id="${this.options.id}" name="${this.options.name}" type="text" value="${this.options.value}" placeholder="" required/>
                <span class="highlight"></span>
                <span class="bar"></span>
                <label>${this.options.name}:</label>
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
        let autocomplete;

        this.elements.input.addEventListener('change', () => {
            this.elements.root.classList.remove('invalid');
            if (!this.validate()) {
                this.elements.root.classList.add('invalid');
            }
        }, true);

        if (this.options.type.indexOf('address') !== -1) {
            autocomplete = new google.maps.places.Autocomplete(this.elements.input, { types: ['geocode'] });
            autocomplete.addListener('place_changed', () => {
                let place = autocomplete.getPlace();
                let location = place.geometry.location;
                let lat = location.lat();
                let lng = location.lng();

                localStorageWraper.setItem("lat-lng", JSON.stringify({ lat, lng }));
            });
        }
    }

    setElements() {
        let root = this.container.querySelector('.text-component');
        let input = this.container.querySelector('input');

        this.elements = { root, input };
    }

    validate() {
        if (!this.options.mask) {
            return true;
        }

        let er = buildRegExpByMask(this.options.mask);

        let valid = er.test(this.elements.input.value);

        if (!valid) {
            this.elements.root.classList.add('invalid');
        }

        return valid;
    }

    getKey() {
        return this.options.id;
    }

    getValue() {
        return this.elements.input.value;
    }
}