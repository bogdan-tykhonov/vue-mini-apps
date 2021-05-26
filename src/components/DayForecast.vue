<template>
                <article 
                
                class="one-day_forecast">

                    <div class="day-info">
                        <h2>
                            {{day.dayName}}
                        </h2>
                        <h3>{{day.dayDate}}</h3>
                    </div>

                    <img :src="`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`" alt="">

                    <div class="temperature">
                        <div class="max">
                            <h3>{{Math.round(day.temp.max)}}</h3>
                        <span>℃</span>
                        </div>
                        <div class="min">
                            <h3>{{Math.round(day.temp.min)}}</h3>
                        <span>℃</span>
                        </div>
                    </div>

                    <div class="weather-info">
                        <h3>{{weatherDesc}}</h3>
                    </div>

                </article>
</template>

<script>
export default {
    name: "DayForecast",
    props:['day'],
    data(){
        return{
            weather: this.day.weather[0].description
        }
    },
    computed: {
        weatherDesc: function() {
            return this.weather[0].toUpperCase() + this.weather.slice(1)
        }
    }
}
</script>

<style scoped=true lang='scss'>
     article{
            width: 10%;
            .day-info{
                display: flex;
                align-items: center;
                h2{
                    margin-right: 10px;
                    
                }
                h2,h3{
                    font-weight: 300;
                    font-size: 20px;
                }
                
            }
            img{
                width: 70px;
                margin: auto;
            }
            .temperature{
                margin-top: 10px;
                display: flex;
                align-items: flex-end;
                    .max, .min{
                        width: 100%;
                        display: flex;
                        align-items: flex-start;
                        span{
                            position: relative;
                            left: 3px;
                            color: white;
                        }
                    }
                    .max{
                        h3{
                            font-weight: 300;
                            margin-bottom: 0px;
                            font-size: 25px;
                        }
                        span{
                            font-size: 15px;
                        }
                        margin-right: 10px;
                    }
                    .min{
                        h3{
                            font-weight: 200;
                            margin-bottom: 3px;
                            font-size: 20px;
                        }
                        span{
                            font-weight: 200;
                            font-size: 12px;
                        }
                    }
                }
               .weather-info{
                   h3{
                       font-size: 14px;
                        margin-top: 15px;
                   }
               }
        }
        @media(max-width:992px){
        article{
            width: 110px;
            margin-right: 50px
        };
    }
</style>