import style from './text.style.scss';

export default class TextComponent {
    constructor(options) {
        this.options = options || {};
        this.container = document.createDocumentFragment();
        this.changed = false;
        this.elements = {};
    }

    renderTemplate() {
        let template = `
            <div class="text-component ${this.options.class}">
                <label>${this.options.name}: </label><input id="${this.options.id}" name="${this.options.name}" type="text" value="${this.options.value}" />
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
            this.changed = true;
            this.elements.root.classList.remove('invalid');
            if (!this.validate()) {
                this.elements.root.classList.add('invalid');
            }
        }, true);

        if (this.options.type.indexOf('address') !== -1) {
            autocomplete = new google.maps.places.Autocomplete(this.elements.input, { types: ['geocode'] });
            autocomplete.addListener('place_changed', () => {
                let location = autocomplete.getPlace().geometry.location;
                let lat = location.lat();
                let lng = location.lng();

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

        let er = buildMaskRegExp(this.options.mask);

        return er.test(this.elements.input.value);
    }
}

function fragmentFromString(strHTML) {
    return document.createRange().createContextualFragment(strHTML);
}

function buildMaskRegExp(mask) {

    mask = mask
        .replace(/0/g, '\\d')
        .replace(/\./g, '\\.')
        .replace(/\$/g, '\\$')
        .replace(/\^/g, '\\^')
        .replace(/\[/g, '\\[')
        .replace(/\]/g, '\\]')
        .replace(/\(/g, '\\(')
        .replace(/\)/g, '\\)');

    return new RegExp(mask, 'g');
}