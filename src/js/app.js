// workout scheduler containers

const monthSelector = document.getElementById(
  "workout-schedule-month-selector"
);
const dateSelector = document.getElementById("workout-schedule-day-selector");
const timeSelector = document.getElementById("workout-schedule-time-selector");
const inputTime = document.getElementById("input-time");
const inputTask = document.getElementById("input-task");
const addTaskContainer = document.getElementById("add-task-container");
const whatToTrainContainer = document.getElementById(
  "what-do-you-want-to-train"
);
const workoutScheduleParent = document.getElementById("workout-schedule-parent");


//workout-tracker containers
const upcomingWorkoutContainer = document.getElementById(
  "upcoming-workouts-container"
);
const workoutTrackingParent = document.getElementById("workout-tracking-parent");


// goal selectors containers
const goalSelectorContainer = document.getElementById('goal-selector-container');
const goalSelectionDiv = document.getElementById('goal-selection');


// intro-page
const firstIntro = document.getElementById('intro-1');
const secondIntro = document.getElementById('intro-2');


const footer = document.getElementById("footer");


// Login- page
const passwordView = document.getElementById("password-view");
const passwordHide = document.getElementById("password-hide");
const loginPasswordInput = document.getElementById("login-password-input");
const loginPageContainer = document.getElementById("login-page-container");
const signUpPageContainer = document.getElementById("sign-up-page-container");

function togglePasswordView(){
  passwordView.classList.toggle("hidden");
  passwordHide.classList.toggle("hidden");
  loginPasswordInput.type = loginPasswordInput.type === "password" ? "text" : "password";
}



function gotoGetBurn(){
  firstIntro.classList.toggle("hidden");
  secondIntro.classList.toggle("hidden");
  secondIntro.classList.toggle("flex");
}

function skipIntro(){
  firstIntro.classList.add('hidden');
  secondIntro.classList.add('hidden');
  signUpPageContainer.classList.toggle('hidden');
  signUpPageContainer.classList.toggle("flex");
}



// login / signup page

function loginUser(){
  loginPageContainer.classList.toggle("hidden");
  loginPageContainer.classList.toggle("flex");
  goalSelectionDiv.classList.toggle("flex");
  goalSelectionDiv.classList.toggle("hidden");
}

function signupUser(event){
  event.preventDefault();
  signUpPageContainer.classList.toggle("hidden");
  signUpPageContainer.classList.toggle("flex");
  goalSelectionDiv.classList.toggle("flex");
  goalSelectionDiv.classList.toggle("hidden");
}

function toggleLoginOrSignup(){
  loginPageContainer.classList.toggle("hidden");
  signUpPageContainer.classList.toggle("hidden");
  loginPageContainer.classList.toggle("flex");
  signUpPageContainer.classList.toggle("flex");

}








// Goal Selector

const workoutGoals = [,
  'Weight Loss',
  'Muscle Gain',
  'Flexibility and Mobility',
  'General Fitness',
  'Event - specific training',
  'Mindfulness and Mental Health',
]

function renderGoals(){
  workoutGoals.map((goal , index) => {
    const div = document.createElement("div");
    div.classList.add("goal-form");
    div.innerHTML = `
      <p>${goal}</p>
      <input type="checkbox" id="goal-${index}" style="height: 18px; background-color: transparent;" name="goal">
    `;
    goalSelectorContainer.appendChild(div);
  })

}

function handleUserGoals(){
  goalSelectionDiv.classList.toggle('flex');
  goalSelectionDiv.classList.toggle('hidden');
  workoutTrackingParent.classList.toggle('flex');
  workoutTrackingParent.classList.toggle('hidden');
  footer.classList.toggle('hidden');
  footer.classList.toggle('flex');
  console.log('footer');
}

renderGoals();



// <------------------------------ Workout tracker -------------------------->

const upcomingWorkoutsData = [
  {
    image: "/src/assets/full-body-workout.png",
    task: "Full Body Workout",
    time: new Date(),
  },
  {
    image: "/src/assets/upper-body.png",
    task: "Upper Body Workout",
    time: new Date(),
  },
  {
    image: "/src/assets/full-body-workout.png",
    task: "Full Body Workout",
    time: new Date(),
  },
  {
    image: "/src/assets/upper-body.png",
    task: "Upper Body Workout",
    time: new Date(),
  },
];

const whatDoYouWantToDoData = [
  {
    image: "/src/assets/full-body-workout.png",
    task: "Full Body Workout",
    parts: ["Chest", "Arms", "Head", "Thighs"],
  },
  {
    image: "/src/assets/upper-body.png",
    task: "Upper Body Workout",
    parts: ["Chest", "Forearms", "Next", "Shoulders"],
  },
  {
    image: "/src/assets/full-body-workout.png",
    task: "Full Body Workout",
    parts: ["Chest", "Arms", "Head", "Thighs"],
  },
  {
    image: "/src/assets/upper-body.png",
    task: "Upper Body Workout",
    parts: ["Chest", "Forearms", "Next", "Shoulders"],
  },
];

function goBackToGoalSelector(){
  console.log("goBackToGoalSelect");
  workoutTrackingParent.classList.toggle('flex');
  workoutTrackingParent.classList.toggle('hidden');
  goalSelectionDiv.classList.toggle('flex');
  goalSelectionDiv.classList.toggle('hidden');
  footer.classList.toggle('hidden');
  footer.classList.toggle('flex');
}

function renderUpcomingWorkouts() {
  upcomingWorkoutsData.map((workout, index) => {
    const { image, task, time } = workout;

    const div = document.createElement("div");
    div.classList.add("upcoming-workout-card");
    div.innerHTML = `
    <div class="flex gap-5 items-center">
    <img src="${image}" alt="workout" class="upcoming-workout-image"/>
    <div class="">
        <p>${task}</p>
        <span>${time.toDateString()}</span>
    </div></div>
    <label class="switch">
      <input type="checkbox">
      <span class="slider round"></span>
    </label>
    `;
    upcomingWorkoutContainer.appendChild(div);
  });
}

function renderWhatToDo() {
  whatDoYouWantToDoData.map((data , index) => {
    const div = document.createElement("div");
    div.classList.add("what-to-train");
    div.id=`train-${index}`
    let parts = "";
    data.parts.map((part) => {
      parts += `<p class="text-[10px]">${part}</p>`;
    });
    div.innerHTML = `
      <div class="flex flex-col gap-1">
        <p class="text-[12px] font-[500]">${data.task}</p>
        ${parts}
      </div>

      <div class="is-it">
        <img src="${data.image}" height="60px" width="60px" class="flex-shrink-0 top-0 aspect-square"/>
      </div>
    `;
    whatToTrainContainer.appendChild(div);
  });
}

function refreshWorkoutTrackerPage() {
  upcomingWorkoutContainer.innerHTML = "";
  renderUpcomingWorkouts();
}

refreshWorkoutTrackerPage();
renderWhatToDo();

// <------------------ End of Workout Tracker ---------------------->

// <-------------    Workout Scheduler  -------------------------------------->

const todaysDate = new Date();
let currentDate = new Date();
let firstRender = true;

function refreshUpdates() {
  renderDates(currentDate.getMonth(), currentDate.getFullYear());
  renderWorkoutTimes();
  renderTasks(
    currentDate.getDate(),
    currentDate.getMonth(),
    currentDate.getFullYear()
  );
  renderMonth();
}

function prevMonthSelect() {
  currentDate.setMonth(currentDate.getMonth() - 1);
  refreshUpdates();
}

function nextMonthSelect() {
  currentDate.setMonth(currentDate.getMonth() + 1);
  refreshUpdates();
}

function renderMonth() {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  monthSelector.innerHTML = `${
    months[currentDate.getMonth()]
  } ${currentDate.getFullYear()}`;
}

function compareDates(date1, date2) {
  let d1 = new Date(date1);
  let d2 = new Date(date2);
  d1.setHours(0, 0, 0, 0);
  d2.setHours(0, 0, 0, 0);
  return d1.getTime() === d2.getTime();
}

function handleDateChange(month, year, date) {
  currentDate = new Date(year, month, date);
  refreshUpdates();
}

function renderDates(month, year) {
  dateSelector.innerHTML = "";
  const date = new Date(year, month, 1);

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  let isSame = false;

  const checkMonth = date.getMonth();
  while (date.getMonth() === checkMonth) {
    const div = document.createElement("div");
    if (compareDates(date, currentDate)) {
      div.classList.add("primary-gradient");
      isSame = true;
    }
    div.classList.add("date-selector");
    div.id = `selector-${date.getDate()}`;
    div.addEventListener("click", (e) => {
      if (e.target === div || div.contains(e.target))
        handleDateChange(month, year, div.id.split("-")[1]);
    });
    div.innerHTML = `<span>${
      days[date.getDay()]
    }</span><p>${date.getDate()}</p>`;
    dateSelector.appendChild(div);
    date.setDate(date.getDate() + 1);
  }

  if (isSame && firstRender) {
    const currDiv = document.getElementById(
      `selector-${currentDate.getDate()}`
    );
    currDiv.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
    firstRender = false;
  }
}

function renderWorkoutTimes() {
  timeSelector.innerHTML = "";
  const parsedHour = (hour) => {
    if (hour > 12) hour -= 12;

    return `${hour < 10 ? "0" : ""}${hour}:00`;
  };

  for (let hour = 0; hour < 24; hour++) {
    const meridiem = hour >= 12 ? "PM" : "AM";
    const div = document.createElement("div");
    div.classList.add("time-selector");
    div.id = `hour-${hour}`;
    div.innerHTML = `<p>${parsedHour(hour)}</p><span>${meridiem}</span>`;
    timeSelector.appendChild(div);
  }
}

const workoutScheduleData = [
  {
    hour: 0,
    minutes: 10,
    task: "Brush teeth",
  },
  {
    hour: 6,
    minutes: 36,
    task: "Upper body task",
  },
  {
    hour: 8,
    minutes: 55,
    task: "Lower body task",
  },
  {
    hour: 10,
    minutes: 36,
    task: "Core task",
  },
  {
    hour: 23,
    minutes: 15,
    task: "Cardio task",
  },
];

function addTasks(event) {
  event.preventDefault();
  const time = inputTime.value,
    task = inputTask.value;
  inputTime.value = "";
  inputTask.value = "";
  workoutScheduleData.push({
    hour: parseInt(time.split(":")[0]),
    minutes: parseInt(time.split(":")[1]),
    task,
  });
  renderTasks(
    currentDate.getDate(),
    currentDate.getMonth(),
    currentDate.getFullYear()
  );
  toggleSlide();
}

function renderTasks(day, month, year) {
  renderWorkoutTimes();

  const parseTime = (hour, minutes) => {
    let mer = hour >= 12 ? "pm" : "am";
    if (hour > 12) hour -= 12;
    if (hour === 0) hour = 12;
    return `${hour}:${minutes < 10 ? "0" : ""}${minutes}${mer}`;
  };

  let alternatingRightMargin = 20;

  workoutScheduleData.map((item) => {
    const { hour, minutes, task } = item;

    const parentDiv = document.getElementById(`hour-${hour}`);

    const taskDate = new Date(year, month, day, hour, minutes);

    const div = document.createElement("div");
    div.classList.add(
      "workout-task-floater",
      `${taskDate < todaysDate ? "secondary-gradient" : "upcoming-workouts"}`
    );
    div.style.position = "absolute";
    div.innerHTML = `${task}, ${parseTime(hour, minutes)}`;
    div.style.top = `${minutes / 2}px`;
    div.style.right = `${alternatingRightMargin}px`;
    if (parentDiv) parentDiv.appendChild(div);
    alternatingRightMargin = alternatingRightMargin === 20 ? 80 : 20;
  });
}

function toggleSlide() {
  addTaskContainer.classList.toggle("slide-out");
}

function goBackToTracker(){
  workoutTrackingParent.classList.toggle('flex');
  workoutTrackingParent.classList.toggle('hidden');
  workoutScheduleParent.classList.toggle('flex');
  workoutScheduleParent.classList.toggle('hidden');
}

function gotoWorkoutScheduler(){
  workoutTrackingParent.classList.toggle('flex');
  workoutTrackingParent.classList.toggle('hidden');
  workoutScheduleParent.classList.toggle('flex');
  workoutScheduleParent.classList.toggle('hidden');
}

refreshUpdates();

// <---------------- End of Workout Scheduler ------------------------>
