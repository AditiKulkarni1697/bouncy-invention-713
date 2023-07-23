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

