

async function search() {
    try {
        let CITY =document.getElementById("city").value; 
        const r= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${KEY}&units=metric`);
        const data= await r.json();  
        document.getElementById('temp').innerHTML= `${data.main.temp}°C`;
        document.getElementById('humidity').innerHTML = `${data.main.humidity}%`;
        document.getElementById('wind').innerHTML= `${data.wind.speed} km/h`;
        console.log(data);
    } catch (error) {
        console.error("error");
    }
}
