const trainer_details = document.getElementById("trainer_details");

const trainerID = JSON.parse(sessionStorage.getItem("logedClient"));
fetch(`http://localhost:8585/trainer/64ba2e0d2cf2c9c1093c9122`)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);

    trainer_details.innerHTML = `<div>
        ${
          data.Trainer.gender === "male"
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
        
        <p>Name : ${data.Trainer.name}</p>
        <p>email : ${data.Trainer.email}</p>
        <p>Ph No. : ${data.Trainer.phone}</p>
        <p>City : ${data.Trainer.city}</p>
        <p>Gender : ${data.Trainer.gender}</p>
        <div>
        <li>
         ${
           data.Trainer.classes
             ? data.Trainer.classes.map((ele) => `<ul>${ele}</ul>`)
             : []
         }
         </li>
        </div>
       </div>
       
       `;
  })
  .catch((err) => console.log(err));

// CLASSES
const classes = document.getElementById("classes");
const closeModal = document.getElementById("closeModal");

function showModal() {
  updateFormModal.style.display = "block";
}

// Function to hide the modal
function hideModal() {
  updateFormModal.style.display = "none";
}

fetch(`http://localhost:8585/classes/trainer/64bbd32ca2ea094336ae833d`)
  .then((res) => res.json())
  .then((data) =>
    console.log(data)(
      (classes.innerHTML = `
    <div class="classes_container">
     ${
       data.classes.length
         ? data.classes.map(
             (ele) => ` <div class="individual_class">
       <p>${ele.title}</p>
       <p>${ele.price}</p>
       <p>${ele.activity}</p>           
       <button id="update">Update</button>
       <div id="modal_form"></div>
       <button>Delete</button>
         </div>`
           )
         : `<h2 class="message">Your created classes will be shown here</h2>`
     }
    </div>
  `)
    )
  )
  .catch((err) => console.log(err));

//  ${
//    (sessionStorage.setItem("classID", JSON.stringify(ele._id)),
//    sessionStorage.setItem("class", JSON.stringify(ele)))
//  }
try {
  const update = document.getElementById("update");
  console.log(update);
  update.addEventListener("click", modalClass);
} catch (err) {
  console.log(err.message);
}

function modalClass(e) {
  e.preventDefault();

  const modal_form = document.getElementById("modal_form");
  const Class = JSON.parse(sessionStorage.getItem("class"));

  modal_form.innerHTML =
    // <!-- The modal -->
    `<div id="updateFormModal" class="modal">
      <div class="modal-content">
        <span id="closeModal" style="float: right; cursor: pointer;">&times;</span>
        <h2>Update Form</h2>
        <form id="updateForm">
         
          <label for="title">Title:</label>
          <input type="text" id="title" name="title" placeholder=${Class.title} value=${e.target.value} required>
          
          <label for="price">Price:</label>
          <input type="number" id="price" name="price" placeholder=${Class.price} value=${e.target.value} required>
          
          <label for="activity">Activity:</label>
          <input type="text" id="activity" name="activity" placeholder=${Class.activity} value=${e.target.value} required>
  
          <label for="venue">Venue:</label>
          <input type="text" id="venue" name="venue" placeholder=${Class.venue} value=${e.target.value} required>
          
          <label for="duration">Duration:</label>
          <input type="text" id="duration" name="duration" placeholder=${Class.duration} value=${e.target.value} required>
  
          <label for="classDate">classDate:</label>
          <input type="date" id="classDate" name="classDate" placeholder=${Class.classDate} value=${e.target.value} required>
  
          <label for="classTime">classTime:</label>
          <input type="text" id="classTime" name="classTime" placeholder=${Class.classTime} value=${e.target.value} required>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>`;

  showModal();
}

//closeModal.addEventListener("click", hideModal);     //for now

const updateForm = document.getElementById("updateForm");
// updateForm.addEventListener("submit", function (event) {  //for now
//   event.preventDefault();
//   // Add code to handle form submission here
//   const form = event.target; // Get the form element
//   const formData = new FormData(form);
//   const classID = localStorage.getItem("classID");
//   fetch(`http://localhost:8585/classes/trainer/updateClass/${classID}`, {
//     method: "PATCH",
//     headers: {
//       // Add any necessary headers here, e.g., 'Content-Type'
//       "Content-Type": "application/json", // Assuming you're sending JSON data
//     },
//     body: JSON.stringify(Object.fromEntries(formData)),
//   })
//     .then((res) => res.json())
//     .then((data) => alert(data.message))
//     .catch((err) => console.log(err));
// });
