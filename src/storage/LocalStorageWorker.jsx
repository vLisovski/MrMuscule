class LocalStorageWorker {
    save(key, value) {
        window.localStorage.setItem(key, value);
    }

    get(key) {
        return window.localStorage.getItem(key);
    }

    delete(key) {
        window.localStorage.removeItem(key);
    }
}

export default LocalStorageWorker;