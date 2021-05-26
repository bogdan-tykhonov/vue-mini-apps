
<template>
  <div id="login" class="page">
       <div class="container">
 <b-form @submit.prevent="onSubmit" >
    

      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="email"
          type="email"
          placeholder="Enter email"
          required
         
        ></b-form-input>
       
      </b-form-group>

        <b-form-group id="input-group-2" label="Password:" label-for="input-2">
            <b-form-input
            id="input-2"
            v-model="pass"
            placeholder="Enter password"
            required
            type="password"
            ></b-form-input>
         
        </b-form-group>


      <b-button type="submit" variant="info">Submit</b-button>

        <div class="sign-up">
            
             <h3>Don't have an account? <router-link class="info" to="/registration">Sign up</router-link></h3>
        </div>

    </b-form>
   
      </div>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import Toast from '@/mixins/toasts.js';
export default {
name: 'Login',
mixins: [Toast],
data(){
  return{
    email: '',
    pass: ''
  }
},
methods: {
    onSubmit() {
        const formData = {
            email: this.email,
            password: this.pass
        }
        this.login(formData);
      },

      async login({email, password}){
            try{
              await  firebase.auth().signInWithEmailAndPassword(email, password);
               this.$emit('isAuthEvent');
              this.$router.push('/?action=login');
            }catch (e){
                let errorText;
                if(e.code == 'auth/wrong-password'){
                    errorText = 'Invalid password';
                }else if (e.code == 'auth/user-not-found'){
                     errorText = 'User with this email is not found';
                }else if(e.code == 'auth/too-many-requests'){
                    errorText = 'To many request, please try later';
                }
                this.makeToast('danger', 'Authenticaion error', errorText);
            }
      
        },
},
  mounted(){
    const message = this.messages[this.$route.query.action];
    if(message){
      this.makeToast(message.variant, message.title, message.description);
    }
  },
}
</script>

<style lang="scss" scoped>
    form{
        background-color: white;
        border-radius: 10px;
        padding: 20px;
        width: 500px;
        margin: auto;
        
    }
    #login{
        padding-top: 100px;
        button{
            margin-left: auto;
            display: block;
            width: 150px;
        }
        .sign-up{
            margin-top: 20px;
            text-align: center;
            h3{
                color: $textColor;
                font-size: 20px;
            }
            a{
                color: #17a2b8;
                font-size: 20px;
            }
        }
       
    }
    @media(max-width:576px){
      form{
        width: 350px;
      }
    }
</style>