const routes = [
  {
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', component: () => import('pages/LoginPage.vue') }
    ]
  },
  {
    path: '/admin',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      { path: '', component: () => import('pages/AdminPage.vue') },{ path: 'bugs', component: () => import('pages/AdminBuglist.vue') }
    ]
  },
  {
    path: '/tester',
    component: () => import('layouts/TesterLayout.vue'),
    children: [
      { path: '', component: () => import('pages/TesterPage.vue')},{path: 'report', component: () => import('pages/TesterBugData.vue')} 
    ]
  },
  {
    path: '/developer',
    component: () => import('layouts/DeveloperLayout.vue'),
    children: [
      { path: '', component: () => import('pages/DeveloperPage.vue') },
      { path: 'bugs', component: () => import('pages/DeveloperBugList.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
