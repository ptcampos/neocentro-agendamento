// import * as UserService from '../services/User';

const routes = [
  {
    path: '/',
    name: 'main',
    component: () => import('layouts/PublicLayout.vue'),
    children: [
      { path: '', name: 'web-home', component: () => import('pages/landing/CheckOrder.vue') },
      // { path: '', name: 'web-home', component: () => import('pages/landing/Home.vue') },
      // { path: 'cart', name: 'web-cart', component: () => import('pages/landing/Cart.vue') },
      // {
      //   path: 'payment',
      //   name: 'web-payment',
      //   component: () => import('pages/landing/Payment.vue'),
      // },
      // {
      //   path: 'schedule',
      //   name: 'web-schedule',
      //   component: () => import('pages/landing/Schedule.vue'),
      // },
    ],
  },
  // {
  //   path: '/auth',
  //   redirect: '/auth/signup',
  //   name: 'default',
  //   component: () => import('layouts/PublicLayout.vue'),
  //   children: [
  //     { path: 'account-type', name: 'auth', component: () => import('pages/auth/AccountType.vue') },
  //     { path: 'login', component: () => import('pages/auth/Login.vue') },
  //     { path: 'signup', component: () => import('pages/auth/Signup.vue') },
  //     { path: 'signup-internal', component: () => import('pages/auth/SignupInternal.vue') },
  //     { path: 'forgot-password', component: () => import('pages/auth/ForgotPassword.vue') },
  //   ],
  // },
  // {
  //   path: '/app',
  //   component: () => import('layouts/MainLayout.vue'),
  //   redirect: () => {
  //     const user = UserService.getUser();
  //     if (user && user.data && user.data.roles === 'client') {
  //       return '/app/client/home';
  //     }
  //     return '/app/internal/home';
  //   },
  //   children: [
  //     {
  //       path: 'client/home',
  //       meta: { requiresAuth: true, allowedUsers: ['client'] },
  //       component: () => import('pages/clients/Home.vue'),
  //     },
  //     {
  //       path: 'internal/home',
  //       meta: { requiresAuth: true, allowedUsers: ['internal'] },
  //       component: () => import('pages/Index.vue'),
  //     },
  //     {
  //       path: 'settings',
  //       meta: { requiresAuth: true, allowedUsers: ['internal', 'client'] },
  //       component: () => import('pages/settings/Index.vue'),
  //     },
  //   ],
  // },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
