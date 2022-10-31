import { createRouter, createWebHistory } from "vue-router";
import layoutContent from "../layout/layoutContent.vue";
import  OtherCom from "../components/Page/OtherComponent.vue"

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