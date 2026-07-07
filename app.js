//Theme
const theme_btn=document.querySelector("#theme_btn");
const page_1=document.querySelector(".page1");
localStorage.setItem("theme","light");
theme_btn.addEventListener("click",()=>{
    console.log("Hello");
    if(localStorage.getItem("theme")==="dark"){
        page_1.style.background = "#EEAECA";
        page_1.style.background ="radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)";
        localStorage.setItem("theme","light");
        page_1.style.color="black";
        

    }
    else{
        page_1.style.background="#020024";
        page_1.style.background="linear-gradient(90deg,rgba(2, 0, 36, 1) 0%, rgba(9, 9, 121, 1) 35%, rgba(0, 212, 255, 1) 100%)";
        localStorage.setItem('theme',"dark");
        page_1.style.color="white";
    }
});

//Date & Time
const page_1_hour=document.querySelector("#page-1-hour");
const page_1_time=document.querySelector("#page-1-time");
const page_1_date=document.querySelector("#page-1-date");
function getGreeting() {
    let hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
        return "Morning";
    } 
    else if (hour >= 12 && hour < 17) {
        return "Afternoon";
    } 
    else if (hour >= 17 && hour < 20) {
        return "Evening";
    } 
    else {
        return "Night";
    }
}
setInterval(()=>{
    page_1_hour.textContent=`Good ${getGreeting()}`
},1000);

function updateTime() {
    const now = new Date();

    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    page_1_time.textContent = `${hours}:${minutes}:${seconds}`;
}
updateTime();
setInterval(updateTime, 1000);

function updateDate() {
    const now = new Date();

    const days = [
        "Sunday", "Monday", "Tuesday", "Wednesday",
        "Thursday", "Friday", "Saturday"
    ];

    const months = [
        "January", "February", "March", "April",
        "May", "June", "July", "August",
        "September", "October", "November", "December"
    ];

    const dayName = days[now.getDay()];
    const date = now.getDate();
    const month = months[now.getMonth()];

    page_1_date.textContent = `${dayName}, ${date} ${month}`;
}
setInterval(()=>{
    updateDate();
},1000);

//To-do-task
const todo_inp=document.querySelector(".todo-inp");
const todo_btn=document.querySelector(".todo-btn");
const task_menu=document.querySelector(".task-menu");
const todo_back_btn=document.querySelector(".todo-list-back-btn");
const todo_menu=document.querySelector(".to-do-list-menu");
const opt_todo=document.querySelector(".opt-todo");

opt_todo.addEventListener("click",()=>{
    todo_menu.style.display="block"
})
let task=JSON.parse(localStorage.getItem("task")) || [];
reRender();
function reRender(){
    task_menu.innerHTML="";
    task.forEach((elem,idx)=>{
        task_menu.innerHTML+= `<div class="task">
                    <p>${idx+1}&nbsp;&nbsp;&nbsp;&nbsp;${elem}</p>
                    <button class="done-btn" data-index=${idx}>Done</button>
                    </div>`
    })
    todo_inp.value="";
    localStorage.setItem("task",JSON.stringify(task));
    
}
todo_btn.addEventListener("click",()=>{
    if(todo_inp.value.trim() != ""){
        task.push(todo_inp.value);
        console.log(todo_inp.value);
        reRender();
        
    }
    
})
task_menu.addEventListener("click",(e)=>{
    if(e.target.classList.contains("done-btn")){
        let idx=e.target.dataset.index;
        console.log(idx);
        task.splice(idx,1);
        reRender();
    }
});
todo_back_btn.addEventListener("click",()=>{
    todo_menu.style.display="none";
})

//daily planner
const daily_planner_menu=document.querySelector(".daily-planner-menu");
const daily_planner_opt=document.querySelector(".opt-daily-planner");
const daily_planner_back_btn=document.querySelector(".daily-planner-back-btn");
daily_planner_back_btn.addEventListener("click",()=>{
    daily_planner_menu.style.display="none";
});
daily_planner_opt.addEventListener("click",()=>{
    daily_planner_menu.style.display="block";
})

//  Daily Goal
const daily_goal_menu = document.querySelector(".daily-goal-menu");
const daily_goal_back_btn = document.querySelector(".daily-goal-back-btn");
const daily_goal_inp = document.querySelector(".daily-goal-inp");
const daily_goal_btn = document.querySelector(".daily-goal-btn");
const daily_goal_task_menu = document.querySelector(".daily-goal-task-menu");
const opt_daily_goal=document.querySelector(".opt-daily-goal");

opt_daily_goal.addEventListener("click",()=>{
    daily_goal_menu.style.display="block"
});
daily_goal_back_btn.addEventListener("click",()=>{
    daily_goal_menu.style.display="none";
});

let daily_goal_task=JSON.parse(localStorage.getItem("daily_goal_task")) || [];
function daily_goal_reRender(){
    daily_goal_task_menu.innerHTML="";
    daily_goal_task.forEach((elem,idx)=>{
            daily_goal_task_menu.innerHTML+=`<div class="task">
                    <p>${idx+1}&nbsp;&nbsp;&nbsp;&nbsp;${elem}</p>
                    <button class="daily-done-btn" data-index="${idx}">Done</button>
                    </div>`
    })
}
daily_goal_reRender();
daily_goal_btn.addEventListener("click",()=>{
   if(daily_goal_inp.value.trim() !=""){
        daily_goal_task.push(daily_goal_inp.value);
   }
   localStorage.setItem("daily_goal_task",JSON.stringify(daily_goal_task));
   daily_goal_reRender();
})
daily_goal_task_menu.addEventListener("click",(e)=>{
    console.log(e.target.classList);
    console.log(e.target.dataset.index);
    if(e.target.classList.contains("daily-done-btn")){
         let idx=e.target.dataset.index;
         daily_goal_task.splice(idx,1);
         localStorage.setItem("daily_goal_task",JSON.stringify(daily_goal_task));
         daily_goal_reRender();
    }
})

//Pomodoro Timer
const pomodoro_menu=document.querySelector(".pomodoro-timer-menu");
const pom_back=document.querySelector(".pom-back");
const opt_pomodoro=document.querySelector(".opt-pomodoro");
const timer = document.querySelector("#timer");
const startBtn = document.querySelector("#start-btn");
const pauseBtn = document.querySelector("#pause-btn");
const resetBtn = document.querySelector("#reset-btn");

let workTime = 25 * 60; //25 minutes in seconds
let breakTime = 5 * 60;

let currentTime = workTime;
let isRunning = false;
let isWork = true;

let interval;

function updateDisplay() {

    let minutes = Math.floor(currentTime / 60);
    let seconds = currentTime % 60;

    timer.textContent =
        `${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;
}

function startTimer() {

    if (isRunning) return;

    isRunning = true;

    interval = setInterval(() => {

        currentTime--;

        updateDisplay();

        if(currentTime <= 0){

            clearInterval(interval);

            if(isWork){

                alert("Work session finished! Break time");
                currentTime = breakTime;
            }
            else{

                alert("Break finished! Work time");
                currentTime = workTime;
            }

            isWork = !isWork;
            isRunning = false;

            startTimer();
        }

    },1000);
}

function pauseTimer(){

    clearInterval(interval);
    isRunning = false;
}

function resetTimer(){

    clearInterval(interval);

    isRunning = false;
    isWork = true;

    currentTime = workTime;

    updateDisplay();
}
startBtn.addEventListener("click",startTimer);
pauseBtn.addEventListener("click",pauseTimer);
resetBtn.addEventListener("click",resetTimer);
pom_back.addEventListener("click",()=>{
    pomodoro_menu.style.display="none";
});
opt_pomodoro.addEventListener("click",()=>{
    pomodoro_menu.style.display="flex";
})
updateDisplay();

//Motivation 
const quote = document.querySelector("#quote");
const quoteBtn = document.querySelector("#quote-btn");
const  motivation_menu=document.querySelector(".motivation-menu");
const mot_back=document.querySelector(".mot-back");
const opt_mot=document.querySelector(".opt-mot");
mot_back.addEventListener("click",()=>{
    motivation_menu.style.display="none";
});
opt_mot.addEventListener("click",()=>{
    motivation_menu.style.display="flex";
})

async function getQuote() {

    try {

        let response = await fetch(
            "https://api.quotable.io/random"
        );

        let data = await response.json();

        quote.textContent =
            `"${data.content}" — ${data.author}`;

    }
    catch(error){

        quote.textContent =
            "Unable to load quote";
            
        console.log(error);
    }
}

quoteBtn.addEventListener("click", getQuote);

getQuote();


//Weather API
const weatherBtn = document.querySelector("#weather-btn");
const cityName = document.querySelector("#city-name");
const weatherCondition = document.querySelector("#weather-condition");
const temperature = document.querySelector("#temperature");

const apiKey = "347c1757e128ff7f3d023d627b9c20f6";

async function getWeather(){
    cityName.textContent = "Loading...";

    navigator.geolocation.getCurrentPosition(
        async (position) => {
            try{
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;

                let response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
                );

                if(!response.ok){
                    throw new Error("Weather API request failed");
                }

                let data = await response.json();

                cityName.textContent = data.name;
                weatherCondition.textContent = data.weather[0].main;
                temperature.textContent = `${Math.round(data.main.temp)}°C`;
            }
            catch(error){
                cityName.textContent = "Weather unavailable";
                console.log(error);
            }
        },
        (error) => {
            cityName.textContent = "Location access denied";
            console.log(error);
        }
    );
}

weatherBtn.addEventListener("click", getWeather);

getWeather();