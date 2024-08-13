import {ref, computed, reactive} from "vue";
import {useRoute} from "vue-router";
import {defineStore} from "pinia";
import {useLoading} from '@osiz/hooks'
import {SetupStoreId} from "@/enum/index.js";
import {localStg} from "@/utils/storage.js";
// import {} from '@/hooks/common/router'
// import {} from '@/service/api'
import {$t} from '@/locales';
// import { useRouteStore } from '../route';
// import { useTabStore } from '../tab';
import {clearAuthStorage, getToken} from './shared';

export const useAuthStore = defineStore(SetupStoreId.Auth, () => {
  const route = useRoute()

  const {loading: loginLoading, setLoading: setLoginLoading} = useLoading()

  const token = ref(getToken())

  const userInfo = reactive({
    userId: '',
    userName: '',
    roles: [],
    buttons: []
  })
})