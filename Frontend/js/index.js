let params = new URLSearchParams(window.location.search)
let client = params.get('client')

client = (client == 'trainer')? "trainer" : 'user'

let trainer = document.getElementById('trainer')
let service = document.getElementById('service')
let register = document.getElementById('register')
let login = document.getElementById('login')


trainer.addEventListener('click', switchTrainer)
service.addEventListener('click', switchService)
register.addEventListener('click', switchRegister)
login.addEventListener('click', switchLogin)

let trainer2 = document.getElementById('trainer2')
let service2 = document.getElementById('service2')
let register2 = document.getElementById('register2')
let login2 = document.getElementById('login2')


trainer2.addEventListener('click', switchTrainer)
service2.addEventListener('click', switchService)
register2.addEventListener('click', switchRegister)
login2.addEventListener('click', switchLogin)


function switchLogin(){

    window.location.href = `./html/login.html?client=${client}`
}

function switchService(){
    window.location.href = `./html/signup.html?client=${client}`
}

function switchRegister(){
    window.location.href = `./html/signup.html?client=${client}`
}

function switchTrainer (){
    window.location.href = `./html/login.html?client=${'trainer'}`

}

let hamburger_menu = document.getElementById("hamburger-menu")
let nav_menu2 = document.getElementById("nav-menu2")

hamburger_menu.addEventListener("click",(e)=>{
    e.preventDefault()
    if(nav_menu2.style.display === "none"){
    nav_menu2.style.display = "block"
    }
    else{
        nav_menu2.style.display = "none"
    }
})