<template>
        <div class="heading">
                <div class="container">
          
                    <h1>
                        {{title}}
                </h1>    
                </div>       
            </div>
</template>

<script>
export default {
name: "Heading",
props: ['title']
}
</script>

<style lang="scss">
.heading{
    position: relative;
            text-align: center;
            background-image: url('../assets/img/city.jpeg');
            background-size: cover;
            background-position: center;
            height: 150px;

            &::before{
                content: '';
                position: absolute;
                height: 100%;
                width: 100%;
                top: 0;
                left: 0;
                background-color: rgba(83, 207, 216, 0.8);
            }
            .container{
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                position: absolute;
                margin: auto;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
    @media(max-width:567px){
        .heading{
            h1{
                font-size: 35px;
            }
        }
    }
</style>