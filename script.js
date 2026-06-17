async function getweather(city){
try{
const key= APIkey
const url1 = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`
console.log("Searching for:" ,city)
const response =await fetch(url1)
if(!response.ok){
   throw new Error(`API error:${response.status}`
    )
}
const data=await response.json()
if (data.cod !== 200) throw new Error(data.message)
console.log(data)
document.querySelector(".temp").innerHTML=`${Math.round(data.main.temp)}&deg;C`
document.querySelector(".location").innerHTML=data.name
document.querySelector(".cond").innerHTML=data.weather[0].main
document.querySelectorAll(".t2")[0].innerHTML=`${data.main.humidity}%`
document.querySelectorAll(".t2")[1].innerHTML=`${data.wind.speed}km/h`
document.querySelectorAll(".t2")[2].innerHTML=`${data.main.pressure}hPa`
document.querySelector(".svvgg").src=`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
const url2 = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${key}`
const response2 =await fetch(url2)
if(!response2.ok){
   throw new Error(`API error:${response2.status}`
    )
}
const data2=await response2.json()
if (data2.cod !== "200") throw new Error(data2.message)
    console.log(data2)

let days=data2.list.filter(item=>item.dt_txt.includes("12:00:00")).slice(0,5)
let cards=document.querySelectorAll(".card3")
console.log(cards.length)
for (let i = 0; i < days.length; i++){
    const day=days[i]
    const date=new Date(day.dt*1000)
    let dayname
    if(i==0){
        dayname="Today"
    }
    else
  { dayname= date.toLocaleDateString("en-US",{weekday:"short"})}
  
    let iconurl=`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`
if(i==0) document.querySelector(".date").textContent=dayname
cards[i].querySelector(".t3").innerHTML=dayname
cards[i].querySelector(".img4 img").src=iconurl
cards[i].querySelector(".t4").innerHTML=`${Math.round(day.main.temp_max)}&deg;`
};
}
catch(err){
    console.log(err)
}
} 
getweather("Multan")
let sb=document.querySelector(".input")
let si=document.querySelector(".search-icon")
si.addEventListener("click",()=>{
    getweather(document.querySelector(".input").value)
})
sb.addEventListener("keyup",e=>{
    if(e.key==="Enter") getweather(sb.value.trim())
})