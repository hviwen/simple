import {$t} from '@/locales'
import {useSvgIcon} from '@/hooks/common/icon'

export function filterAuthRoutesByRoles(routes, roles) {
  return routes.flatMap(route => filterAuthRouteByRoles(route, roles))
}

function filterAuthRouteByRoles(route, roles) {
  const routeRoles = route.meta?.roles || []
  const isEmptyRoles = routeRoles.length === 0

  const hasPermission = roles.some(role => roles.includes(role))
  const filterRoute = {...route}
  if (filterRoute.children?.length) {
    filterRoute.children = filterRoute.children.flatMap(item => filterAuthRouteByRoles(item, roles))
  }

  return hasPermission || isEmptyRoles ? [filterRoute] : []
}

function sortRouteByOrder(route) {
  if (route.children?.length) {
    route.children.sort((next, prev) => (Number(next.meta?.order) || 0) - (Number(prev.meta?.order) || 0))
    route.children.forEach(item => sortRouteByOrder(item))
  }
  return route
}

export function sortRoutesByOrder(routes) {
  if (routes.children?.length) {
    routes.children.sort((next, prev) => (Number(next.meta?.order) || 0) - (Number(prev.meta?.order) || 0))
    routes.children.forEach(item => sortRoutesByOrder(item))
  }
  return routes
}

export function getGlobalMenusByAuthRoutes(routes = []) {
  const menus = [];

  routes.forEach(route => {
    if (!route.meta?.hideInMenu) {
      const menu = getGlobalMenuByBaseRoute(route);

      if (route.children?.some(child => !child.meta?.hideInMenu)) {
        menu.children = getGlobalMenusByAuthRoutes(route.children);
      }

      menus.push(menu);
    }
  });

  return menus;
}

function getGlobalMenuByBaseRoute(route) {
  const {SvgIconVNode} = useSvgIcon();

  const {name, path} = route;
  const {title, i18nKey, icon = import.meta.env.VITE_MENU_ICON, localIcon, iconFontSize} = route.meta ?? {};

  const label = i18nKey ? $t(i18nKey) : title;

  return {
    key: name,
    label,
    i18nKey,
    routeKey: name,
    routePath: path,
    icon: SvgIconVNode({icon, localIcon, fontSize: iconFontSize || 20})
  };
}

export function updateLocaleOfGlobalMenus(menus = []) {
  const result = [];

  menus.forEach(menu => {
    const {i18nKey, label, children} = menu;

    const newLabel = i18nKey ? $t(i18nKey) : label;

    const newMenu = {
      ...menu,
      label: newLabel
    };

    if (children?.length) {
      newMenu.children = updateLocaleOfGlobalMenus(children);
    }

    result.push(newMenu);
  });

  return result;
}

export function getCacheRouteNames(routes = []) {
  const cacheNames = [];

  routes.forEach(route => {
    // only get last two level route, which has component
    route.children?.forEach(child => {
      if (child.component && child.meta?.keepAlive) {
        cacheNames.push(child.name);
      }
    });
  });

  return cacheNames;
}

function recursiveGetIsRouteExistByRouteName(route, routeName) {
  let isExist = route.name === routeName;

  if (isExist) {
    return true;
  }

  if (route.children && route.children.length) {
    isExist = route.children.some(item => recursiveGetIsRouteExistByRouteName(item, routeName));
  }

  return isExist;
}

export function isRouteExistByRouteName(routeName, routes = []) {
  return routes.some(route => recursiveGetIsRouteExistByRouteName(route, routeName));
}

function findMenuPath(targetKey, menu) {
  const path = [];

  function dfs(item) {
    path.push(item.key);

    if (item.key === targetKey) {
      return true;
    }

    if (item.children) {
      for (const child of item.children) {
        if (dfs(child)) {
          return true;
        }
      }
    }

    path.pop();

    return false;
  }

  if (dfs(menu)) {
    return path;
  }

  return null;
}

export function getSelectedMenuKeyPathByKey(selectedKey, menus = []) {
  const keyPath = [];

  menus.some(menu => {
    const path = findMenuPath(selectedKey, menu);

    const find = Boolean(path?.length);

    if (find) {
      keyPath.push(...path);
    }

    return find;
  });

  return keyPath;
}

function transformMenuToBreadcrumb(menu) {
  const {children, ...rest} = menu;

  const breadcrumb = {
    ...rest
  };

  if (children?.length) {
    breadcrumb.options = children.map(transformMenuToBreadcrumb);
  }

  return breadcrumb;
}

export function getBreadcrumbsByRoute(route, menus = []) {
  const key = route.name;
  const activeKey = route.meta?.activeMenu;

  const menuKey = activeKey || key;

  for (const menu of menus) {
    if (menu.key === menuKey) {
      const breadcrumbMenu = menuKey !== activeKey ? menu : getGlobalMenuByBaseRoute(route);

      return [transformMenuToBreadcrumb(breadcrumbMenu)];
    }

    if (menu.children?.length) {
      const result = getBreadcrumbsByRoute(route, menu.children);
      if (result.length > 0) {
        return [transformMenuToBreadcrumb(menu), ...result];
      }
    }
  }

  return [];
}

export function transformMenuToSearchMenus(menus = [], treeMap = []) {
  if (menus && menus.length === 0) return [];
  return menus.reduce((acc, cur) => {
    if (!cur.children) {
      acc.push(cur);
    }
    if (cur.children && cur.children.length > 0) {
      transformMenuToSearchMenus(cur.children, treeMap);
    }
    return acc;
  }, treeMap);
}
