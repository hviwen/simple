import {computed, ref, shallowRef} from "vue";
import {$t} from '@/locales'
import {useSvgIcon} from '@/hooks/common/icon'
import {defineStore} from "pinia";
import {useBoolean} from "@osiz/hooks";
import {SetupStoreId} from "@/enum";
// import {router} from '@/router'

import {useAppStore} from '../app'

import {
  filterAuthRoutesByRoles,
  getBreadcrumbsByRoute,
  getCacheRouteNames,
  getGlobalMenusByAuthRoutes,
  getSelectedMenuKeyPathByKey,
  isRouteExistByRouteName,
  sortRoutesByOrder,
  transformMenuToSearchMenus,
  updateLocaleOfGlobalMenus
} from './shared';


export const useRouteStore = defineStore(SetupStoreId.Route, () => {
  const appStore = useAppStore()

  const {bool: isInitConstantRoute, setBool: setIsInitConstantRoute} = useBoolean()

  const authRouteMode = ref(import.meta.env.VITE_AUTH_ROUTE_MODE)

  const routeHome = ref(import.meta.env.VITE_ROUTE_HOME)

  function setRouteHome(route) {
    routeHome.value = route
  }

  const constantRoutes = shallowRef([])

  function addConstantRoutes(routes) {
    const constantRoutesMap = new Map([])
    routes.forEach(route => {
      constantRoutesMap.set(route.name, route)
    })
    constantRoutes.value = Array.from(constantRoutesMap.values())
  }

  const authRoutes = shallowRef([])

  function addAuthRoutes(routes) {
    const authRoutesMap = new Map([])
    routes.forEach(route => {
      authRoutesMap.set(route.name, route)
    })
    authRoutes.value = Array.from(authRoutesMap.values())
  }

  const removeRouteFns = []

  const menus = ref([])

  const searchMenus = computed(() => transformMenuToSearchMenus(menus.value))

  function getGlobalMenus(routes) {
    menus.value = getGlobalMenusByAuthRoutes(routes)
  }

  function updateGlobalMenusByLocale() {
    menus.value = updateLocaleOfGlobalMenus(menus.value)
  }

  const cacheRoutes = ref([])
  const allCacheRoutes = shallowRef([])

  function getCacheRoutes(routes) {
    const alls = getCacheRouteNames(routes)
    cacheRoutes.value = alls
    allCacheRoutes.value = [...alls]
  }

  function addCacheRoutes(routeKey) {
    if (cacheRoutes.value.includes(routeKey)) return
    cacheRoutes.value.push(routeKey)
  }

  function removeCacheRoutes(routeKey) {
    const index = cacheRoutes.value.indexOf(routeKey)
    if (index === -1) return
    cacheRoutes.value.splice(index, 1)
  }

  function isCacheRoute(routeKey) {
    return allCacheRoutes.value.includes(routeKey)
  }

  async function reCacheRoutesByKey(routeKey) {
    if (isCacheRoute(routeKey)) return
    removeCacheRoutes(routeKey)
    await appStore.reloadPage()
    addCacheRoutes(routeKey)
  }

  async function reCacheRoutesByKeys(routeKeys) {
    for await (const routeKey of routeKeys) {
      await reCacheRoutesByKey(routeKey)
    }
  }

  const breadcrumbs = computed(() => getBreadcrumbsByRoute(router.currentRoute.value, menus.value))

  function resetVueRoutes() {
    removeRouteFns.forEach(fn => fn());
    removeRouteFns.length = 0;
  }

  async function resetStore() {
    const routeStore = useRouteStore();

    routeStore.$reset();

    resetVueRoutes();

    // after reset store, need to re-init constant route
    await initConstantRoute();
  }

  async function initConstantRoute() {
    if (isInitConstantRoute.value) return;

    const staticRoute = createStaticRoutes();

    // if (authRouteMode.value === 'static') {
    //   addConstantRoutes(staticRoute.constantRoutes);
    // } else {
    //   const { data, error } = await fetchGetConstantRoutes();
    //
    //   if (!error) {
    //     addConstantRoutes(data);
    //   } else {
    //     // if fetch constant routes failed, use static constant routes
    //     addConstantRoutes(staticRoute.constantRoutes);
    //   }
    // }
    //
    // handleConstantAndAuthRoutes();

    setIsInitConstantRoute(true);
  }

  // async function initAuthRoute() {
  //   if (authRouteMode.value === 'static') {
  //     initStaticAuthRoute();
  //   } else {
  //     await initDynamicAuthRoute();
  //   }
  //
  //   tabStore.initHomeTab();
  // }

})