import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue';

const NotFoundView = () => import("@/views/NotFoundView.vue");
const LoginView = () => import("@/views/LoginView.vue");
const RegisterView = () => import("@/views/RegisterView.vue");
const UploadView=()=> import('@/views/UploadView.vue')
const PhotoView=()=> import('@/views/PhotoView.vue')
const EditView=()=>import('@/views/EditPhotoView.vue')
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: LoginView,
    },
    {
      path: "/home",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
    },    
    {
      path: "/upload",
      name: "upload",
      component: UploadView,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFoundView",
      component: NotFoundView,
    },
    {
      path: "/photo",
      name: "photo",
      component: PhotoView,
    },
    {
      path: "/edit",
      name: "edit",
      component: EditView,
    },
  ],
});

export default router
