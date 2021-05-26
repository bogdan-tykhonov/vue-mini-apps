<template>
    <div id="home" class="page"  >
            <Heading  title="Welcome to the mini apps created by using Vue.js" />
            <div class="appsList">
                <ul>
                  <li v-for="app in allApps"
                  :key="app.id"
                  >
                  
                      <b-card
                        :title="app.name"
                        :img-src="require('@/assets/img/'+ app.previewSrc + '.jpg')"
                        img-alt="Image"
                        img-top
                        tag="article"
                        style="max-width: 20rem;"
                        class="mb-2"
                      >
                      
                        <b-card-text>
                          {{app.description}}
                        </b-card-text>

                      <router-link :to="app.path"><b-button  variant="info">Watch app</b-button></router-link>
                       
                      </b-card>
                  </li>
                </ul>
            </div>
    </div>
</template>


<script>
import Heading from '@/components/Heading';
import Toast from '@/mixins/toasts';
import currentUser from '@/mixins/currentUser'
export default {
  name: 'Home',
  props: ['allApps', ],
  mixins: [Toast, currentUser],
  components: { Heading },
 async mounted(){
    const message = this.messages[this.$route.query.action];
    if(message){
      const userName =  await this.getName();
      const description = `${message.description } ${userName}`;
      this.makeToast(message.variant, message.title, description);
    }
  }
  
}
</script>

<style scoped lang="scss">
    #home{
        background-color: white;
        .heading{
            text-align: center;
            background-color: $main;
            padding: 50px 0;
        }
    }
    .appsList{
      min-height: 100vh;
      background-color: $secondary;
      ul{
        padding: 50px 0;
        width: 90%;
        margin: auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        li{
            transition: $standart;
            &:hover{
              transform: scale(1.1);
            }
        }
        }
    }
    @media(max-width:768px){
      .card{
        max-width: 80%!important;
        margin: auto;
        margin-bottom: 50px!important;
      }
    }
</style>
