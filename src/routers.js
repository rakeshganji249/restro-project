import Home from './components/Home.vue';
import SignUp from './components/SignUp.vue';
import LognIn from './components/LognIn.vue';
import { createRouter, createWebHistory } from 'vue-router';
import UpdateDetails from './components/UpdateDetails.vue';

const routes = [
  { name: 'home', path: '/', component: Home },
  { name: 'signup', path: '/signup', component: SignUp },
  { name: 'login', path: '/login', component: LognIn },
  {
    name: 'add',
    path: '/add',
    component: () => import('./components/Add.vue')
  },
  {
    name: 'update',
    path: '/update/:id?',
    component: () => import('./components/Update.vue'),
    props: true
  },
  {
    name: 'profile',
    path: '/profile',
    component: () => import('./components/ProfilePage.vue'),
    children: [
      {
        path: "updatedetails", // nested route -> /profile/update
        name: "UpdateDetails",
        component: UpdateDetails,
      },
    ],
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Route Guard
router.beforeEach((to, from, next) => {
  const user = localStorage.getItem('user-info');
  if ((to.name === 'add' || to.name === 'update') && !user) {
    next({ name: 'signup' });
  } else {
    next();
  }
});

export default router;
