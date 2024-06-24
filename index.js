
const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "c27dff1eea4d312b80f84fed8bb5ccfe";

weatherForm.addEventListener("submit" , async event => {
    event.preventDefault();
    const city = cityInput.value;

    if (city){
        try{
            
            const weatherData = await getweatherData(city);
            displayWeatherInfo(weatherData);

        }
        catch(error){
            console.log(error);
            displayError(error);
        }

    }
    else{
        displayError("Please Enter a City")
    }

});

async function getweatherData(city){

    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiURL);

    if(!response.ok){
        throw new Error("Could not find  city");
    }
    return await response.json();
}

function displayWeatherInfo(data){
    const { name: city,
           main:{temp, humidity},
           weather:[{description, id}]} = data;
    

    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

        cityDisplay.textContent = city;
        tempDisplay.textContent = `${(temp - 273.15).toFixed(2)}°C`;
        humidityDisplay.textContent = `Humidity ${humidity}%`;
        descDisplay.textContent = description;
        weatherEmoji.textContent = getweatherEmoji(id);

        cityDisplay.classList.add("cityDisplay");
        tempDisplay.classList.add("tempDisplay");
        humidityDisplay.classList.add("humidityDisplay");
        descDisplay.classList.add("descDisplay");
        weatherEmoji.classList.add("weatherEmoji")

        card.appendChild(cityDisplay);
        card.appendChild(tempDisplay);
        card.appendChild(humidityDisplay);
        card.appendChild(descDisplay);
        card.appendChild(weatherEmoji);
}

function getweatherEmoji(weatherID){
    switch(true){
        case(weatherID >= 200 && weatherID < 300):
            return "⛈️";
        case(weatherID >= 300 && weatherID < 400):
            return "🌧️";
        case(weatherID >= 500 && weatherID < 600):
            return "☔";
        case(weatherID >= 600 && weatherID < 700):
            return "❄️";
        case(weatherID >= 700 && weatherID < 800):
            return "⛅";
        case(weatherID ===800):
            return "🌞";
        case(weatherID >= 801 && weatherID < 810):
            return "☁️";
        default:
            return"?";

    }

}

function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay)


}