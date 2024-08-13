export function transformElegantRoutesToVueRoutes(routes, layouts, views) {
  return routes.flatMap(route => transformElegantRouteToVueRoute(route, layouts, views));
}

function transformElegantRouteToVueRoute(route, layouts, views) {
  const LAYOUT_PREFIX = 'layout.';
  const VIEW_PREFIX = 'view.';
  const ROUTE_DEGREE_SPLITTER = '_';
  const FIRST_LEVEL_ROUTE_COMPONENT_SPLIT = '$';

  function isLayout(component) {
    return component.startsWith(LAYOUT_PREFIX);
  }

  function getLayoutName(component) {
    const layout = component.replace(LAYOUT_PREFIX, '');

    if (!layouts[layout]) {
      throw new Error(`Layout component "${layout}" not found`);
    }

    return layout;
  }

  function isView(component) {
    return component.startsWith(VIEW_PREFIX);
  }

  function getViewName(component) {
    const view = component.replace(VIEW_PREFIX, '');

    if (!views[view]) {
      throw new Error(`View component "${view}" not found`);
    }

    return view;
  }

  function isFirstLevelRoute(item) {
    return !item.name.includes(ROUTE_DEGREE_SPLITTER);
  }

  function isSingleLevelRoute(item) {
    return isFirstLevelRoute(item) && !item.children?.length;
  }

  function getSingleLevelRouteComponent(component) {
    const [layout, view] = component.split(FIRST_LEVEL_ROUTE_COMPONENT_SPLIT);

    return {
      layout: getLayoutName(layout),
      view: getViewName(view)
    };
  }

  const vueRoutes = []

  if (route.path.includes(':') && !route.props) {
    route.props = true;
  }

  const {name, path, component, children, ...rest} = route

  const vueRoute = {
    name,
    path,
    ...rest
  };

  try {
    if (component) {
      if (isSingleLevelRoute(route)) {
        const {layout, view} = getSingleLevelRouteComponent(component);
        const singleLevelRoute = {
          path,
          component: layouts[layout],
          meta: {
            title: route.meta?.title || ''
          },
          children: [
            {
              name,
              path: '',
              component: views[view],
              ...rest
            }
          ]
        }

        return [singleLevelRoute]
      }

      if (isLayout(component)) {
        const layoutName = getLayoutName(component);

        vueRoute.component = layouts[layoutName];
      }

      if (isView(component)) {
        const viewName = getViewName(component);
        vueRoute.component = views[viewName];
      }
    }
  } catch (error) {
    console.error(error);
    return []
  }
  if (children?.length && !vueRoute.redirect) {
    vueRoute.redirect = {
      name: children[0].name
    };
  }

  if (children?.length) {
    const childRoutes = children.flatMap(child => transformElegantRouteToVueRoute(child, layouts, views));

    if (isFirstLevelRoute(route)) {
      vueRoute.children = childRoutes;
    } else {
      vueRoutes.push(...childRoutes);
    }
  }

  vueRoutes.unshift(vueRoute);

  return vueRoutes;
}

const routeMap = {
  "root": "/",
  "not-found": "/:pathMatch(.*)*",
  "403": "/403",
  "404": "/404",
  "500": "/500",
  "home": "/home",
  "iframe-page": "/iframe-page/:url",
  "login": "/login/:module(pwd-login|code-login|register|reset-pwd|bind-wechat)?"
};

export function getRoutePath(name) {
  return routeMap[name]
}

export function getRouteName(path) {
  return Object.entries(routeMap).find(([, routePath]) => routePath === path)?.[0] || null;
}