//import createRouter, createWebHistory and Type RouteRecordRaw from vue-router
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

// Define route type with explicit type annotations
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
    },
    {
        path: '/products',
        name: 'products',
        component: () => import(/* webpackChunkName: "products" */ '../views/products/index.vue')
    },
    {
        path: '/products/create',
        name: 'products-create',
        component: () => import(/* webpackChunkName: "products-create" */ '../views/products/create.vue')
    },
    {
        path: '/products/edit/:id',
        name: 'products-edit',
        component: () => import(/* webpackChunkName: "products-edit" */ '../views/products/edit.vue')
    },
    {
        path: '/categories',
        name: 'categories',
        component: () => import(/* webpackChunkName: "categories" */ '../views/categories/index.vue')
    },
    {
        path: '/categories/create',
        name: 'categories-create',
        component: () => import(/* webpackChunkName: "categories-create" */ '../views/categories/create.vue')
    },
    {
        path: '/categories/edit/:id',
        name: 'categories-edit',
        component: () => import(/* webpackChunkName: "categories-edit" */ '../views/categories/edit.vue')
    },
]

// Create router with explicit type annotations
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
