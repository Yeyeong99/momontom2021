const form = document.querySelector(".js-name-form"),
 input = form.querySelector("input"),
 greeting = document.querySelector("h2");

const USER_LS = "currentuser"

function saveName(text){
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {  
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
    form.classList.add("hide");
}

function askForName() {
    form.addEventListener("submit", handleSubmit)
}

function paintGreeting(text) {
    greeting.innerText = `Hello ${text}`
}
function getName() {
    const userName = localStorage.getItem(USER_LS);
    if (userName === null) {
        askForName();
    }else{
        paintGreeting(userName);
        form.classList.add("hide");
    }
    
}

function init() {
    getName();
}

init();
