import localforage from "localforage";

export function createStorage(type, storagePrefix) {
  const stag = type === 'session' ? window.sessionStorage : window.localStorage;

  const storage = {
    set(key, value) {
      const json = JSON.stringify(value);
      stag.setItem(`${storagePrefix}${key}`, json)
    },
    get(key) {
      const json = stag.getItem(`${storagePrefix}${key}`);
      if (json) {
        let storageData = null
        try {
          storageData = JSON.parse(json);
        } catch (e) {
          console.warn('Storage data parse error', e);
        }

        if (storageData) {
          return storageData;
        }
      }
      stag.removeItem(`${storagePrefix}${key}`);
      return null;
    },
    remove(key) {
      stag.removeItem(`${storagePrefix}${key}`);
    },
    clear() {
      stag.clear();
    }
  }
  return storage;
}

export function createLocalForageStorage(driver) {
  const driverMap = {
    local: localforage.LOCALSTORAGE,
    indexedDB: localforage.INDEXEDDB,
    webSQL: localforage.WEBSQL
  }

  localforage.config({
    driver: driverMap[driver]
  });

  return localforage
}