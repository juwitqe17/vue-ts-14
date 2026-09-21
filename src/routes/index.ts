//import createRouter, createWebHistory and Type RouteRecordRaw from vue-router
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

// Define route type with explicit type annotations
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/products',
        name: 'products',
        component: () => import(/* webpackChunkName: "products" */ '../views/products/index.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/products/create',
        name: 'products-create',
        component: () => import(/* webpackChunkName: "products-create" */ '../views/products/create.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/products/edit/:id',
        name: 'products-edit',
        component: () => import(/* webpackChunkName: "products-edit" */ '../views/products/edit.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/categories',
        name: 'categories',
        component: () => import(/* webpackChunkName: "categories" */ '../views/categories/index.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/categories/create',
        name: 'categories-create',
        component: () => import(/* webpackChunkName: "categories-create" */ '../views/categories/create.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/categories/edit/:id',
        name: 'categories-edit',
        component: () => import(/* webpackChunkName: "categories-edit" */ '../views/categories/edit.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/auth/Login.vue')
    },
]

// Create router with explicit type annotations
const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to) => {
    const token = localStorage.getItem('token');

    if (to.meta.requiresAuth && !token) {
        return { name: 'login' };
    }

    if (to.name === 'login' && token) {
        return { name: 'products' };
    }
});

export default router