<template>
    <div id="weather" class="page">
         <Heading title="Weather Forecast"  />
         <div class="container forecast-wrapper">
             <form @submit.prevent="getCityInfo" class="search">
                <div class="search-group">
                    <input @focus="inputFocus = true" @blur="leaveFocus"  @input="findCities" v-model="cityInput" type="text" placeholder="Type a city...">
                    <ul v-show="showCityList" class="cityList">
                        <li v-for="(city) in citiesHelper"
                        :key="city.id"
                        
                        @click="chooseCity(city.coord.lat,city.coord.lon, city.name, city.country)"
                        >
                            <h3>{{city.name}}</h3>
                        </li>
                    </ul>
                </div>
                <b-button type="submit" variant="info">Search</b-button>
            </form>

            <div v-if="loading" class="spinner-load">
              <b-spinner   variant="primary" label="Spinning" ></b-spinner>
            </div>

            <transition name="fade">
                <div v-if="!loading" class="weather-info">
                <h1>{{cityName}}, {{cityCountry}}</h1>
                <img :src="`http://openweathermap.org/img/wn/${iconCode}@2x.png`" alt="">
                <div class="temperature">
                        <h3>{{temperature}}</h3>
                        <span>℃</span>
                </div>
                
                <h2>{{weather}}</h2>

            </div>
            </transition>

        <transition name="fade">
            <section v-if="!loading" class="daily-forecast">
                
                <DayForecast 
                v-for="day in dailyForecast" 
                :key="day.dt"
                :day="day"
                />
                
            </section>
        </transition>

         </div>
    </div>
 
</template>

<script>
import DayForecast from '@/components/DayForecast';
import Heading from '@/components/Heading';
import cities from '@/assets/data/city.list.json';
import Toast from '@/mixins/toasts.js';
import loadCityData from '@/api/weather_api';
export default {
name: 'Weather',
components: {Heading, DayForecast},
mixins: [Toast],
data(){
    return{
        cityList: cities,
        cityLat: '51.5085',
        cityLon: '-0.1257',
        cityInput: '',
        cityName: 'London',
        cityCountry:'GB',
        choosenCityData : {
            name: 'London',
            country: 'GB'
        },
        citiesHelper: [],
        iconCode:'',
        weather: '',
        temperature: '',
        inputFocus: false,
        dailyForecast: [],
        cityIsChoosen: true,
        loading: false,

    }
},
methods: {
    async getCityInfo(){
        try{
        if(!this.cityIsChoosen) return this.makeToast('danger', 'Invalid city', 'Please choose city from avaliable list');
        this.loading = true;
        const cityData = await loadCityData(this.cityLat, this.cityLon);
       this.cityName = this.choosenCityData.name;
       this.cityCountry = this.choosenCityData.country;
        this.temperature = Math.round(cityData.current.temp);
        this.iconCode = cityData.current.weather[0].icon;
        const weather  = cityData.current.weather[0].description;
        this.weather = weather[0].toUpperCase() + weather.slice(1);
        this.dailyForecast = this.normalizeCitiesArr(cityData.daily);
        this.cityIsChoosen = false;
        this.loading = false;
        }catch(e){
            console.log(e);
        }
    },
    findCities(){
        if(this.cityInput.length < 3) return;
        this.citiesHelper = this.foundCities;
        
    },
    chooseCity(lat, lon, name, country){
        this.cityLat = lat;
        this.cityLon = lon;
        this.cityInput = name;
        this.choosenCityData.name = name;
        this.choosenCityData.country = country;
        this.cityIsChoosen = true;
    },
    leaveFocus(){
        setTimeout(() => {
            this.inputFocus = false;
        }, 100);
    },
    getDay(time){
        let date = new Date(time);
        return date.getDate();
    },
    normalizeCitiesArr(arr){
        return arr.map( day => {
            const daysName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            let date = new Date();
            date.setTime(day.dt * 1000);
            const dayDate = date.getDate();
            const dayName = daysName[date.getDay()];
            day.dayDate = dayDate;
            day.dayName = dayName;
            return day;
        });
    },
    
},
computed: {
    foundCities(){
        return this.cityList.filter( city => city.name.indexOf(this.cityInput) + 1).slice(0, 5);
    },
    showCityList(){
        return (this.citiesHelper.length && this.cityInput.length > 3 && this.inputFocus);
    }
},
created(){
    this.getCityInfo();
}
}
</script>

<style scoped=true lang="scss">
    .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
    opacity: 0;
    }
    .spinner-load{
        margin-top: 100px;
    }
    .container{
        flex-direction: column;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 100px;
        .search{
            display: flex;
            input{
                border: none;
                padding: 10px;
                width: 500px;
            }
            button{
                border-bottom-left-radius: 0px;
                border-top-left-radius: 0px;
                height: 100%;
                position: relative;
                height: 45px;
                bottom: 1px;
                width: 100px;
            }
        }
        .temperature{
            justify-content: center;
            margin: 50px 0 20px 0;
            display: flex;
            h3{
                font-size: 60px;

            }
            span{
                left: 10px;
                font-size: 50px;
                color: white;
                position: relative;
                bottom: 10px;
            }
        }
        .search-group{
            position: relative;
        }
        .weather-info{
            text-align: center;
            margin-top: 50px;
        }
        .cityList{
            border-top: 1px solid black;
            z-index: 100;
            position: absolute;
            background-color: white;
            width: 100%;
            li{
                cursor: pointer;
                transition: $standart;
                &:hover{
                    background-color: $main;
                    h3{
                        color: white;
                    }
                }
            }
            h3{
                padding: 10px;
                font-size: 15px;
                color: black;
            }
        }
    }
    .daily-forecast{
        justify-content: space-between;
        padding-bottom: 100px;
        margin-top: 50px;
        width: 100%;
        display: flex;
       
    }

    @media(max-width:992px){
        .daily-forecast{
            overflow: scroll
        }
        .container .search {
            input{
                width: 240px;
            }
            button{
            width: 90px;
        }
        }
    }
</style>