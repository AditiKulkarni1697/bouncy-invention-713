// USER DETAILS

const user_details = document.getElementById("user_details");

//const user = JSON.parse(sessionStorage.getItem("logedClient"));
//console.log(user);
fetch(`http://localhost:8585/user/64bbd32ca2ea094336ae833d`)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);

    user_details.innerHTML = `<div>
        ${
          data.user.gender === "male"
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
        
        <p>Name:${data.user.name}</p>
        <p>email:${data.user.email}</p>
        <p>City:${data.user.city}</p>
        <p>Age:${data.user.age}</p>
        <p>Gender:${data.user.gender}</p>
        <p>Height:${data.user.height}</p>
        <p>Weight:${data.user.weight}</p>
        <p>CardDetails:${data.user.cardDetails}</p>
        <div>Classes : 
         ${
           data.user.classes.length
             ? data.user.classes.map((ele) => {
                 return `<li><ul>${ele}</ul></li>`;
               })
             : `<p>Empty</p>`
         }
        </div>
       </div>
       
       `;
  })
  .catch((err) => console.log(err));

// CLASSES
const classes = document.getElementById("classes");

const bookClass = () => {
  const classID = sessionStorage.getItem("classid");
  fetch(`http://localhost:8585/user/bookClass/${classID}`)
    .then((res) => res.json())
    .then((data) => alert(data.message))
    .catch((err) => console.log(err.message));
};

fetch(`http://localhost:8585/classes`)
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
        <p>Rs.${ele.price}</p>
        <p>${ele.activity}</p>

            <button ${sessionStorage.setItem(
              "classid",
              ele._id
            )} onclick= "bookClass()" >Book</button>
          </div>`
           )
         : `<h2 class="message">Available Classes will be shown here</h2>`
     }
    </div>
  `)
  )
  .catch((err) => console.log(err));
