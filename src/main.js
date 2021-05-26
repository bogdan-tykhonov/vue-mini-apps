import Vue from 'vue'
import App from './App.vue'
import {Vuelidate} from 'vuelidate';
import router from './router';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';


Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(Vuelidate);
Vue.config.productionTip = false

var firebaseConfig = {
  apiKey: "AIzaSyA4zalzo6Bp5tY2Jta5BRKcGojD8IFpPWc",
    authDomain: "vue-mini-apps.firebaseapp.com",
    databaseURL: "https://vue-mini-apps-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "vue-mini-apps",
    storageBucket: "vue-mini-apps.appspot.com",
    messagingSenderId: "796528227322",
    appId: "1:796528227322:web:1cd90955f0665e0100ea43",
    measurementId: "G-JGECDFXN1J"
};

firebase.initializeApp(firebaseConfig);
let app;

firebase.auth().onAuthStateChanged(()=> {
  if(!app){
   app = new Vue({
      router,
      render: h => h(App),
    }).$mount('#app')
  }
})




