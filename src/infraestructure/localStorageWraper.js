class LocalStorageCustom {
    constructor() {
        this.storage = localStorage;
    }

    getItem(key) {
        return this.storage.getItem(key);
    }

    setItem(key, value) {
        let event = new CustomEvent('itemInserted', { detail: { key, value } });
        document.dispatchEvent(event);

        return this.storage.setItem(key, value);
    }

    clear() {
        return this.storage.clear();
    }
}

export default new LocalStorageCustom();