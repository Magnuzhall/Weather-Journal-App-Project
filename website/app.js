// Personal API Key for OpenWeatherMap API
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=d18e8f8b9891ee849aeff0424a2173d7';

//Variables to change the UI once button is clicked
const currentDate = document.querySelector('#date')
const cityName = document.querySelector('#name');
const currentTemperature = document.querySelector('#temp');
const userContent = document.querySelector('#content');

//Button to make it all happen
const generateButton = document.querySelector('#generate');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

//Async function to make a GET request to the API
const retrieveWeatherData = async (url, zipcode, apikey) => {
    const response = await fetch(url+zipcode+apikey);

    try {
        const allData = await response.json();
        return allData;
    }
    catch(error) {
        console.log("error", error);
    }
};

//Async function to make a Post request to add the API data
const postData = async ( url = '', data = {} ) => {

    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),     
  });
  
    try {
      const newData = await response.json();
      return newData;
    }
    catch(error) {
      console.log("error", error);
    }
  };

//Add event listener to button with a callback function when button is clicked
generateButton.addEventListener('click', clickedButton);

//Call the GET function 
function clickedButton() {
    //User input variables
    const zipCode = document.querySelector('#zip').value;
    const userFeelings = document.querySelector('#feelings').value;
    retrieveWeatherData(baseURL,zipCode, apiKey)

    //Chain promise that makes a POST request to add API data and user input
        .then(function(data) {
            console.log(data);
            postData('/dataEntry', {date: newDate, name: data.name, temp: Math.round(data.main.temp-273.15) + '°C', content: userFeelings})
            //Call function to update the UI
            updateUI();
        })      
};

//Function to update the UI - this retrieves data from our app and dynamically updates the values
const updateUI = async () => {
    
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        currentDate.innerHTML = `Date: ${allData.date}`;
        cityName.innerHTML = `City: ${allData.name}`;
        currentTemperature.innerHTML = `Temperature: ${allData.temp}`;
        userContent.innerHTML = `User entry: ${allData.content}`;
    }
    catch(error) {
        console.log("error", error);
    }
}

