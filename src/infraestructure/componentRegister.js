let instance;

class ComponentRegister {
    static getRegister() {
        if (!instance) {
            instance = new ComponentRegister();
        }

        return instance;
    }

    constructor() {
        this.components = [];
    }

    registry(componentInstance) {
        this.components.push(componentInstance);

        return componentInstance;
    }
}


export default ComponentRegister;