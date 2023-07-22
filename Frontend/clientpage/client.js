// USER DETAILS

const user_details = document.getElementById("user_details");

const userID = 1;
fetch(`https://jsonplaceholder.typicode.com/users/1`)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);

    user_details.innerHTML = `<div>
        ${
          data.name === "Leanne Graham"
            ? `<img
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
        
        <p>Name:${data.name}</p>
        <p>email:${data.email}</p>
        <p>City:{data.city}</p>
        <p>Age:{data.age}</p>
        <p>Gender:{data.gender}</p>
        <p>Height:{data.height}</p>
        <p>Weight:{data.weight}</p>
        <p>CardDetails:{data.cardDetails}</p>
        <div>
         {classes.map((ele)=>{
          return  <li><ul>{ele}</ul></li>
         })}
        </div>
       </div>
       
       `;
  })
  .catch((err) => console.log(err));

// CLASSES
const classes = document.getElementById("classes");

const bookClass = (classID) => {
  fetch(`http://localhost:8585/bookClass/${classID}`)
    .then((res) => res.json())
    .then((data) => alert(data.message))
    .catch((err) => console.log(err));
};

fetch(`http://localhost:8585/classes/users/${userID}`)
  .then((res) => res.json())
  .then(
    (data) =>
      (classes.innerHTML = `
    <div class="classes_container">
     ${
       data.classes.length
         ? data.classes.map(
             (ele) => ` <div class="individual_class">
        <p>${ele.title}</p>
        <p>${ele.price}</p>
        <p>${ele.activity}</p>

            <button onclick=${bookClass(ele._id)}>Book</button>
          </div>`
           )
         : `<h2 class="message">Available Classes will be shown here</h2>`
     }
    </div>
  `)
  )
  .catch((err) => console.log(err));
