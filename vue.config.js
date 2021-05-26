module.exports = {
  publicPath: '/myapp/',
    css: {
      loaderOptions: {
        sass: {
            additionalData: `@import "@/assets/styles/main.scss";`
        }
      }
    }
  };