export default async function loadCityData(lat, lon){
    const res = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=52abb27a4013c55e487c7d5dac46b944&units=metric`);
    const data = await res.json();
    return data;
}

