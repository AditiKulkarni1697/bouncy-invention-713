// USER DETAILS
let user = JSON.parse(sessionStorage.getItem('logedClient'))


let logoutbtn = document.getElementById('logout')
logoutbtn.addEventListener('click',()=>{ 
  sessionStorage.clear()
  location.replace('../index.html')
})

if(!user) {
  window.location.href = `../index.html`

}else{
  getData()
}

function getData(){
  fetch('https://elegant-tunic-frog.cyclic.app/user/'+user._id)
  .then(res =>res.json())
  .then(data => {
    user = data.user;
    console.log(user)
    sessionStorage.setItem('logedClient', JSON.stringify(user))
  })
  .catch(ERR=>console.log(ERR))    
  

  const user_details = document.getElementById("user_details");

  user_details.innerHTML = `<div>
        ${

          (user.gender == 'male')? `<img

              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGP0LOh8SpUJCGgsBxnYVT1lvY4DNW_f_lBA&usqp=CAU"
              alt="male_avatar"
              class="img"
            />`
            : `<img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6qdg5oamUcczZ1Eg56Fcn3NlwQF1PBnCAlQ&usqp=CAU"
              alt=""
              class="img"
            />`
        }
        

        <p>Name : ${user.name}</p>
        <p>Email : ${user.email}</p>
        <p>City : ${user.city}</p>
        <p>Age : ${user.age}</p>
        <p>Gender : ${user.gender}</p>
        <p>Height : ${user.height}</p>
        <p>Weight : ${user.weight}</p>
        <div>
         ${user.classes.map((ele)=> `<li><ul>${ele}</ul></li>`).join('')}

        </div>
       </div>
       
       `;
}

const ownClassbtn = document.getElementById('ownClass')
const BookClassbtn = document.getElementById('bookClass')

ownClassbtn.addEventListener('click', ()=>{
  showOwnClass()
})
BookClassbtn.addEventListener('click', ()=>{
  BookClass()
})

const logout = document.getElementById('logout')
const service = document.getElementById('service')
const home = document.getElementById('home')


logout.addEventListener('click', switchLogout)
service.addEventListener('click', switchService)
home.addEventListener('click', switchHome)


function switchHome(){

  window.location.href = `../index.html`
}

function switchService(){
  window.location.href = `../index.html`

}

function switchLogout(){
  sessionStorage.clear()

  window.location.href = `../index.html`

}

function BookClass(){
  fetch(`https://elegant-tunic-frog.cyclic.app/classes`)
  .then(res => res.json())
  .then(data => {

    console.log(data)

    if(data.classes.length == 0){
      document.getElementById('showClass').innerHTML = "<h2 style='color:white; text-align:center; margin-top:40px'>No Available Session</h2>"
    }
    else{
      renderderAllData(data.classes, false)
    }
  })
  .catch(err=> console.log(err))
}

function showOwnClass(){
  
  fetch(`https://elegant-tunic-frog.cyclic.app/classes/users/${user._id}`)
  .then(res => res.json())
  .then(data => {

    console.log(data)

    if(data.classes.length == 0){
      document.getElementById('showClass').innerHTML = "<h2 style='color:white; text-align:center; margin-top:40px'>No Booked Session</h2>"
    }
    else{
      renderderAllData(data.classes, true)
    }
  })
  .catch(err=> console.log(err))
}

showOwnClass()
async function renderderAllData(allData, isown) {

  let divForRender = document.getElementById('showClass')
  divForRender.innerHTML = ""
  let map_allData = allData.map(el => `                            
      <div class="class-card">
      <div class="class-image">
          <img src="../image/boxing2.jpg" width="100">
      </div>

     <div class="class-details">
          <h3>Class Name: ${el.title} </h3>
          <p>Instructor: ${el.trainerName}</p>
          <p>Date: ${new Date().getDate() }-07-2023</p>
          <p>Time: 10:00 AM</p>
      </div>

      <div class="book-button">

          <button class='bookBtn' id="${el._id}">${isown? 'Details': (el.users.includes(user._id))? "Booked" : 'Book Session'}</button>

      </div>
  </div>
      </div>`
  ).join("")


  divForRender.innerHTML = map_allData
  let btns = document.querySelectorAll('.bookBtn')

  for(let btn of btns){
    if(btn.textContent != 'Details' && btn.textContent != 'Booked' ){
      btn.addEventListener('click', (e)=>{
        window.location.href =`./card.html?classId=${e.target.id}`

      })
    }
  }
}


