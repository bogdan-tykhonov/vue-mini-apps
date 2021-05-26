import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/Pages/Home';
import Calculator from '@/Pages/Calculator';
import Todolist from '@/Pages/Todolist';
import Weather from '@/Pages/Weather';
import Login from '@/Pages/Login';
import Registration from '@/Pages/Registration';
import firebase from 'firebase/app';
Vue.use(Router);

const router = new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            component: Home,
        },
        {
            path: '/Calculator',
            component: Calculator,
            meta: {auth: true}
        },
        {
            path: "/todolist",
            component: Todolist,
            meta: {auth: true}
        },
        {
            path: "/weather",
            component: Weather,
            meta: {auth:true}
        },
        {
            path: "/login",
            component: Login,
        },
        {
            path: '/registration',
            component: Registration
        }
    ]
});

router.beforeEach((to, from , next) => {
    const currentUser = firebase.auth().currentUser;
    const requireAuth = to.matched.some(record => record.meta.auth);

    if(requireAuth && !currentUser){
        next('/login');
    }else{
        next();
    }
})

export default router;