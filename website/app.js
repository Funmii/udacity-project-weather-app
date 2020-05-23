/* Global Variables */
(function() {
    const url = "https://api.openweathermap.org/data/2.5/weather";
    const apikey = "5e737cd338aa49303076139dd1a48f15";
// Create a new date instance dynamically with JS
//let d = new Date();
//let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();



  const date = new Date().toLocaleDateString("en", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
  const generateBtn = document.getElementById("generate");
  const feelingsElement = document.getElementById("feelings");
  const zipElement = document.getElementById("zip");
  /*
  const dateElem = document.getElementById("date");
  const tempElem = document.getElementById("temp");
  const contentElem = document.getElementById("content"); */

  const getWeatherInfo = async zip =>
    await fetch(`${baseUrl}?zip=${zip}&units=metric&APPID=${apiKey}`);

  const saveEntry = async ({ temperature, date, feeling }) =>
    await fetch("/api/v1/entry", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ temperature, date, feeling })
    });

    const updateUI = async () => {
      const request = await fetch('/api/v1/entry');
      try {
        const allData = await request.json();
        document.getElementById('date').innerHTML = 'Date: ' + allData.date;
        document.getElementById('temp').innerHTML = 'Temperature: ' + allData.temperature;
        document.getElementById('content').innerHTML = 'Note: ' + allData.feeling;
      } catch (error) {
        console.log("error", error);
      }
    };

  generateBtn.addEventListener("click", async () => {
    generateBtn.textContent = "Loading......";
    const zip = zipElement.value;
    const feeling = feelingsElement.value;
    const res = await getWeatherInfo(zip);
    generateBtn.textContent = "Generate";

    try {
      const {
        main: { temp: temperature }
      } = await res.json();
      await saveEntry({ temperature, date, feeling });
      await updateUI();
    } catch (err) {
      console.error(err);
    }
  });
})();
