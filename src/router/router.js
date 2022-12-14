import { createRouter, createWebHistory } from "vue-router";
import layoutContent from "../components/page/PageEmployee.vue";
import  OtherCom from "../components/page/OtherComponent.vue"

const routes = [
    {
        path: '/',
        name: "layoutContent",
        component: layoutContent
    },
    {
        path: '/other',
        component: OtherCom
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})
export default router