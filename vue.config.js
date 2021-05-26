module.exports = {
  publicPath: '/vue-mini-apps/',
    css: {
      loaderOptions: {
        sass: {
            additionalData: `@import "@/assets/styles/main.scss";`
        }
      }
    }
  };