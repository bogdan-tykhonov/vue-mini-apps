<template>
  <div id="register" class="page">
      <div class="container">
 <b-form @submit.prevent="onSubmit" >

     <b-form-group id="input-group-1" label="Your Name:" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="name"
          placeholder="Enter name"
          required
          :class="{invalid: (!$v.name.minLength && $v.name.$dirty) }"
        ></b-form-input>

            <div class="valid-error" v-if="!$v.name.minLength && $v.name.$dirty">
                    Name should be at least {{$v.name.$params.minLength.min}} symbols
            </div>
      </b-form-group>
    

      <b-form-group
        id="input-group-2"
        label="Email address:"
        label-for="input-2"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="input-2"
          v-model="email"
          type="email"
          placeholder="Enter email"
          required
          :class="{invalid: (!$v.email.email && $v.email.$dirty)}"
        ></b-form-input>
        <div class="valid-error" v-if="!$v.email.email && $v.email.$dirty">
                    Invalid email adress
            </div>
      </b-form-group>

        <b-form-group id="input-group-3" label="Password:" label-for="input-3">
            <b-form-input
            id="input-3"
            v-model="pass"
            type="password"
            placeholder="Enter password"
            required
            :class="{invalid: (!$v.pass.minLength && $v.pass.$dirty)}"
            ></b-form-input>
            <div class="valid-error" v-if="!$v.pass.minLength && $v.pass.$dirty">
                    Password should be at least {{$v.pass.$params.minLength.min}} symbols
            </div>
        </b-form-group>


      <b-button type="submit" variant="info">Submit</b-button>

        <div class="sign-up">
           <h3>Already have an account? <router-link class="info" to="/login">Sign in</router-link></h3>
        </div>

    </b-form>
   
      </div>
  </div>
</template>

<script>
import {email, minLength} from 'vuelidate/lib/validators';
import firebase from 'firebase/app';
import Toast from '@/mixins/toasts.js';
export default {
    
name: 'Registration',
mixins: [Toast],
data() {
      return {
    
          email: '',
          name: '',
        pass: '',
   

      }
    },
    validations: {
        email: {email}, 
        name: {minLength: minLength(3)}, 
        pass: { minLength: minLength(7)}
    },
    methods: {
       onSubmit() {
        if(this.$v.$invalid){
            this.$v.$touch();
            return;
        }
        const formData = {
            email: this.email,
            password: this.pass,
            name: this.name
        }
        
        this.register(formData);
        
        
        },

        async register({email, password, name}){
            try{
                await firebase.auth().createUserWithEmailAndPassword(email,password);
                const userId = await firebase.auth().currentUser.uid;
                 await firebase.database().ref(`/users/${userId}/info`).set({name});
                 this.$emit('isAuthEvent');
                 this.$router.push('/vue-mini-apps');
                 
            }catch(e){
                console.log(e);
                if(e.code == 'auth/email-already-in-use'){
                    this.makeToast('danger', 'Registration error', 'User with this email is already exists')
                }        
            }
        },
        

    }
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
    #register{
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
        input.invalid{
            border: 1px solid rgb(180, 36, 36);
        }
        .valid-error{
            margin-top: 5px;
            font-size: 16px;
            color: rgb(180, 36, 36);
        }
    }
    
    @media(max-width:567px){
        form{
            width: 350px;
        }
    }
</style>