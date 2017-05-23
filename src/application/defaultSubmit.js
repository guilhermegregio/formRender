import ComponentRegister from '../infraestructure/componentRegister';
import { isEmptyObj } from '../infraestructure';
const STORE_KEY = 'formData';

export default class DefaultSubmit {

    constructor() {
        this.store = window.localStorage;
    }

    submit() {
        let components = ComponentRegister.getRegister().components;

        if (this.valid()) {
            this.setFormData(this.getComponentsData());
        }

    }

    valid() {
        let components = ComponentRegister.getRegister().components;

        let valid = components.reduce((prevVal, component) => prevVal && component.validate(), true);

        return components.length !== 0 && valid;
    }

    getComponentsData() {
        let components = ComponentRegister.getRegister().components;
        let data = {};

        components.forEach(component => {
            data[component.getKey()] = component.getValue();
        });

        return data;
    }

    getFormData() {
        let data = this.store.getItem(STORE_KEY);

        if (data) {
            data = JSON.parse(data);
        } else {
            data = [];
        }

        return data;
    }

    setFormData(data) {
        let formData = this.getFormData();

        if (isEmptyObj(data)) {
            return false;
        }

        formData.push(data);
        this.store.setItem(STORE_KEY, JSON.stringify(formData));
    }
}