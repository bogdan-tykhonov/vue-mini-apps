<template>
  <div id="navbar">
  <b-navbar toggleable="lg" type="light" variant="info">
    <b-navbar-brand href="#">Vue mini apps</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="nav-links">
          <router-link to="/vue-mini-apps">Home</router-link>
          <router-link to="/calculator">Calculator</router-link>
          <router-link to="/todolist">Todolist</router-link>
          <router-link to="/weather">Weather forecast</router-link>
      </b-navbar-nav>

     <b-navbar-nav class="ml-auto">
       <b-nav-item-dropdown right v-if="auth">
          <template #button-content>
            <em>{{userName}}</em>
          </template>
          <b-dropdown-item @click.prevent="signOut" >Log Out</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-navbar-nav v-else class="nav-links">
        <router-link  to="/login">Sign in</router-link>
        </b-navbar-nav>
     </b-navbar-nav>

    </b-collapse>
    
  </b-navbar>
  
</div>

</template>

<script>
import {makeLogout} from '@/api/db';
export default {
    name: "Navbar",
    props: ['auth', 'userName'],
    methods: {
     async signOut(){
       try{
        await makeLogout();
        this.$emit('isAuthEvent');
        this.$router.push('/login?action=logout');
       }catch(e){
         console.log(e);
       }
      }
    },
    
}
</script>

<style lang="scss">
    #navbar{
        .nav-links{
            a{
            margin-right: 10px;
            color: white;
                 }
            }
        em{
          color: white;
        }
    }
    @media(max-width:992px){
      .navbar-nav a{
        padding: 10px 0;
      }
    }
    
</style>