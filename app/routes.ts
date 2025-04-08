import { type RouteConfig, index, layout, route, prefix } from '@react-router/dev/routes';

export default [
  route('/login', 'routes/login.page.tsx'),

  ...prefix('/api', [route('/health', 'routes/api/health.api.tsx')]),

  ...prefix('/auth', [
    route('/register', 'routes/auth/register.api.ts'),
    route('/login', 'routes/auth/login.api.ts'),
    route('/logout', 'routes/auth/logout.api.ts'),
  ]),

  layout('routes/site.layout.tsx', [
    index('routes/index.page.tsx'),

    layout('routes/authenticated/auth-guard.layout.tsx', { id: 'auth-layout'}, [
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
