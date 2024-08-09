import {createStorage, createLocalForageStorage} from '@osiz/utils'

const storagePrefix = 'vue-osiz-'

export const localStg = createStorage('local',storagePrefix)

export const sessionStg = createStorage('session',storagePrefix)

export const localForageStg = createLocalForageStorage(storagePrefix)