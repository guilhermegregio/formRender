import { fragmentFromString } from '../../infraestructure';
import style from './map.style.scss';

export default class MapComponent {
    constructor(options) {
        this.options = options || {};
        this.container = document.createDocumentFragment();
        this.changed = false;
        this.elements = {};
    }

    renderTemplate() {
        let template = `<div class="map-component ${this.options.class}"></div>`;

        return template;
    }

    appendTo(el) {
        this.container.appendChild(fragmentFromString(this.renderTemplate()));

        this.setElements();

        this.binds();

        el.appendChild(this.container);
    }

    binds() {
        let map = new google.maps.Map(this.elements.root, {
            zoom: 17,
            center: { lat: -23.6212773, lng: -46.7653889 }
        });

    }

    setElements() {
        let root = this.container.querySelector('.map-component');

        this.elements = { root };
    }
}