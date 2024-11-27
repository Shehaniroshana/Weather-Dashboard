
 async function search(){
  let city=document.getElementById("location").value;
  let key="39c21c8c2cc6205709e7d5f8611ff421"

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
.then((r)=>r.json())
.then((data)=>{
  console.log(data);
  document.getElementById("lname").innerHTML=data.name;

       switch(data.weather[0].main){
        case "Rain":
          document.getElementById("icon").innerHTML=`<img src="im/c.png" alt="" style="width: 200px; padding: 20px; text-align: left; disply:flex;">`;
        break;
        case "Snow":
         document.getElementById("icon").innerHTML=`<img src="im/snow.png" alt="" style="width: 200px; padding: 20px; text-align: left; disply:flex;">`;
        break;
       }
}).catch((error)=>{console.log("error")}
)
 } 