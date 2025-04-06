import { type RouteConfig, index, layout, route, prefix } from '@react-router/dev/routes';

export default [
  route('/login', 'routes/login.page.tsx'),
  route('/logout', 'routes/logout.page.tsx'),

  // route('/health', 'routes/health.api.tsx'),

  layout('routes/site.layout.tsx', [
    index('routes/index.page.tsx'),

    layout('routes/authenticated/auth-guard.layout.tsx', [
      layout('routes/authenticated/dashboard.layout.tsx', [
        route('/dashboard', 'routes/authenticated/dashboard.page.tsx'),
        route('/leagues', 'routes/authenticated/league/index.page.tsx'),

        ...prefix('/league', [route('/create', 'routes/authenticated/league/create.page.tsx')]),
      ]),
    ]),
  ]),

  // Admin Routes
  ...prefix('/admin', [
    layout('routes/authenticated/admin/admin-guard.layout.tsx', [
      layout('routes/authenticated/admin/admin.layout.tsx', [
        index('routes/authenticated/admin/index.page.tsx'),
        ...prefix('/:seasonYear', [
          layout('routes/authenticated/admin/season/season.layout.tsx', [
            route('/constructors', 'routes/authenticated/admin/season/constructors.page.tsx'),
            route('/circuits', 'routes/authenticated/admin/season/circuits.page.tsx'),
            route('/drivers', 'routes/authenticated/admin/season/drivers.page.tsx'),
          ]),
        ]),
      ]),
    ]),
  ]),
] satisfies RouteConfig;
