export default {
  data(){
    return{
      messages: {
        logout: {
          variant: 'danger',
          title: 'Vue mini Apps',
          description: 'You have loged out'
        },
        login: {
          variant: 'info',
          title: 'Vue mini Apps',
          description: 'Welcome back'
        }
      }
    }
  },
    methods: {
        makeToast(variant = null, title, description) {
            this.$bvToast.toast(description, {
              title: title,
              variant: variant,
              solid: true
            })
          }
    }
}