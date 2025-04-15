const cityInput = document.querySelector('.city-input');
const searctBtn = document.querySelector('.search-btn');
const weatherInfosection = document.querySelector('.Weather-info')
const notFoundSection = document.querySelector('.not-found');
const searchCitySection = document.querySelector('.search-city');
const countrytName=document.querySelector('.country-text');
const currentDate=document.querySelector('.current-date-txt');
const tempTxt=document.querySelector('.temp-txt');
const conditionTxt=document.querySelector('.condition-txt');
const humidityValue=document.querySelector('.humidity-value-txt');
const windSpeed=document.querySelector('.wind-speed');
const weatherSummeryImg=document.querySelector('.weather-summer-img');


const apiKey = '42aad09a637e1cfb4d6d1f5c0db15dd5';
// const APIURL=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=metric`;
// const apiUrl=`https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key};`
// const imgurl="https://openweathermap.org/img/wn/";
searctBtn.addEventListener('click', () => {
    if (cityInput.value.trim() != '') {
        updateWeatherInfo(cityInput.value)
        cityInput.value = ''
        cityInput.blur()

    }
})
cityInput.addEventListener('keydown', (event) => {
    if (event.key == 'Enter' && cityInput.value.trim() != '') {
        updateWeatherInfo(cityInput.value)
        cityInput.value = ''
        cityInput.blur()

    }
})
async function getFatchData(endpoint, city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(apiUrl)
    return response.json()

}
function getweatherIcon(id){
    if(id<=232) return 'thunderstorm.svg';    
    if(id<=321) return 'drizzle.svg';    
    if(id<=531) return 'rain.svg';    
    if(id<=622) return 'snow.svg';    
    if(id<=781) return 'atmosphere.svg';
    if(id<=800) return 'clear.svg';
    else return 'clouds.svg'
}
function getCurrentDate(){
    const currentDate=new Date()
    const option={
        weekday:'short',
        day:'2-digit',
        month:'short'

    }
    return currentDate.toLocaleDateString('en-GB',option)
    
}

async function updateWeatherInfo(city) {
    const weatherData = await getFatchData('weather', city)


    if (weatherData.cod != 200) {

        showDisplaySection(notFoundSection)
        return
    }
    console.log(weatherData);

    const {
        name: country,
        main: { temp, humidity },
        wind: {speed},
        weather:[{id,main}]
    } = weatherData

    countrytName.textContent=country;
    tempTxt.textContent=Math.round(temp) + '°C';
    humidityValue.textContent=humidity + '%';
    windSpeed.textContent=speed +'m/s';
    conditionTxt.textContent=main
   
    
    weatherSummeryImg.src = `./weather/${getweatherIcon(id)}`;
    currentDate.textContent=getCurrentDate()
    showDisplaySection(weatherInfosection)


}

function showDisplaySection(section) {
    [weatherInfosection, searchCitySection, notFoundSection]
        .forEach(section => section.style.display = 'none')

    section.style.display = 'flex'
}
