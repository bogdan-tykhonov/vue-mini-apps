<template >
  <div id="app">
    <Navbar @isAuthEvent="isAuthHandler" :userName="userName" :auth="isAuth"/>
    
      <router-view   @isAuthEvent="isAuthHandler" :allApps="apps" />
    
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import currentUser from '@/mixins/currentUser'
export default {
  name: 'App',
  mixins: [currentUser],
  components: {
   Navbar,
  },
  data(){
    return{
       apps: [
        {
          name: "Calculator",
          path: '/vue-mini-apps/Calculator',
          description: 'Simple calculator which can be usefull in basic math',
          previewSrc: 'calc'
        },
        {
          name: "TodoList",
          path: '/vue-mini-apps/todolist',
          description: 'Create your plan for the coming day and be productive as never',
          previewSrc: 'todo'
        },
        {
          name: "Weather",
          path:'/vue-mini-apps/weather',
          description: 'Check a weather forecast from the all world',
          previewSrc: 'weather'
        }
      ],
      isAuth: false,
      userName: null
    }
  },
  methods: {
    async isAuthHandler(){
      try{
          this.isAuth = await this.getUid();
           this.userName = await this.getName();
      }catch(e){
       console.log(e);
      }
    }
  },
  async mounted(){
     await this.isAuthHandler();
  }
}
</script>

<style lang="scss">

@keyframes preview{
    from{
      opacity: 0;
        transform: translateY(100px);
    }
    to{
      opacity: 1;
       transform: translateY(0);
    }
}
.page{
  min-height: 100vh;
  background-color: $secondary;
  animation: preview 1s;
}

h1,h2,h3{
  color: white;
}


</style>
