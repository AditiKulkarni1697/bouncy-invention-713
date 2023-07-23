const trainer_details = document.getElementById("trainer_details");



const trainer = JSON.parse(sessionStorage.getItem("logedClient"));

if(!trainer) {
  location.replace('../index.html')
}
fetch(`http://localhost:8585/trainer/${trainer._id}`)

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
        <p>Total Classes : ${data.Trainer.classes.length}</p>
       </div>
       
       `;
  })
  .catch((err) => console.log(err));

// CLASSES

const createBtn = document.getElementById("createBtn");
const classFormContainer = document.getElementById("classFormContainer");
let flag = false;
createBtn.addEventListener("click", (e) => {
  document.querySelector('#classes_container').innerHTML = ""
  e.preventDefault();
  // classContainer.innerHTML = ""
  // console.log(classContainer)
  if (flag == false) {
    classFormContainer.innerHTML = "";
    classFormContainer.setAttribute("style", "display:block");
    flag = true;
    const form = document.createElement("form");

    const titleDiv = document.createElement("div");
    const title_text = document.createElement("p");
    const title_input = document.createElement("input");
    title_text.innerHTML = "Title";
    title_input.setAttribute("placeholder", "title");
    title_input.setAttribute("id", "title");
    titleDiv.append(title_text, title_input);

    const seattotalDiv = document.createElement("div");
    const seattotal_text = document.createElement("p");
    const seattotal_input = document.createElement("input");
    seattotal_text.innerHTML = "seatTotal";
    seattotal_input.setAttribute("placeholder", "seatTotal");
    seattotal_input.setAttribute("id", "seatTotal");
    seattotalDiv.append(seattotal_text, seattotal_input);

    const seatOccupiedDiv = document.createElement("div");
    const seatOccupied_text = document.createElement("p");
    const seatOccupied_input = document.createElement("input");
    seatOccupied_text.innerHTML = "seatOccupied";
    seatOccupied_input.setAttribute("placeholder", "seatOccupied");
    seatOccupied_input.setAttribute("id", "seatOccupied");
    seatOccupiedDiv.append(seatOccupied_text, seatOccupied_input);

    const priceDiv = document.createElement("div");
    const price_text = document.createElement("p");
    const price_input = document.createElement("input");
    price_text.innerHTML = "price";
    price_input.setAttribute("placeholder", "price");
    price_input.setAttribute("id", "price");
    priceDiv.append(price_text, price_input);

    const activityDiv = document.createElement("div");
    const activity_text = document.createElement("p");
    const activity_input = document.createElement("input");
    activity_text.innerHTML = "Activity";
    activity_input.setAttribute("placeholder", "activity");
    activity_input.setAttribute("id", "activity");
    activityDiv.append(activity_text, activity_input);

    const venueDiv = document.createElement("div");
    const venue_text = document.createElement("p");
    const venue_input = document.createElement("input");
    venue_input.setAttribute("placeholder", "venue");
    venue_text.innerHTML = "Venue"
    venue_input.setAttribute("id", "venue");
    venueDiv.append(venue_text, venue_input);

    const linkDiv = document.createElement("div");
    const link_text = document.createElement("p");
    const link_input = document.createElement("input");
    link_text.innerHTML = "Link";
    link_input.setAttribute("placeholder", "link");
    link_input.setAttribute("id", "link");
    linkDiv.append(link_text, link_input);

    const durationDiv = document.createElement("div");
    const duration_text = document.createElement("p");
    const duration_input = document.createElement("input");
    duration_text.innerHTML = "Duration";
    duration_input.setAttribute("placeholder", "duration");
    duration_input.setAttribute("id", "duration");
    durationDiv.append(duration_text, duration_input);

    const imageDiv = document.createElement("div");
    const image_text = document.createElement("p");
    const image_input = document.createElement("input");
    image_text.innerHTML = "Image";
    image_input.setAttribute("placeholder", "image");
    image_input.setAttribute("id", "image");
    imageDiv.append(image_text, image_input);

    const classDateDiv = document.createElement("div");
    const classDate_text = document.createElement("p");
    const classDate_input = document.createElement("input");
    classDate_text.innerHTML = "ClassDate";
    classDate_input.setAttribute("placeholder", "classDate");
    classDate_input.setAttribute("id", "classDate");
    classDate_input.setAttribute("type", "date");
    classDateDiv.append(classDate_text, classDate_input);

    const classTimeDiv = document.createElement("div");
    const classTime_text = document.createElement("p");
    const classTime_input = document.createElement("input");
    classTime_text.innerHTML = "ClassTime";
    classTime_input.setAttribute("placeholder", "classTime");
    classTime_input.setAttribute("id", "classTime");
    classTime_input.setAttribute("type", "time");
    classTimeDiv.append(classTime_text, classTime_input);

    const submit = document.createElement("button");
    submit.innerHTML = "Submit";
    submit.addEventListener("click", (e) => {
      e.preventDefault();
      createClass();
    });

    form.append(
      titleDiv,
      seattotalDiv,
      seatOccupiedDiv,
      priceDiv,
      activityDiv,
      venueDiv,
      linkDiv,
      durationDiv,
      imageDiv,
      classDateDiv,
      classTimeDiv,
      submit
    );
    classFormContainer.append(form);
  } else {
    classFormContainer.setAttribute("style", "display:none");
    flag = false;
  }
});

function createClass() {
  const classData = {
    title: document.getElementById("title").value,
    seatTotal: parseInt(document.getElementById("seatTotal").value),
    seatOccupied: parseInt(document.getElementById("seatOccupied").value),
    price: parseFloat(document.getElementById("price").value),
    activity: document.getElementById("activity").value,
    venue: document.getElementById("venue").value,
    // Link: document.getElementById("Link").value,
    duration: document.getElementById("duration").value,
    image: document.getElementById("image").value,
    trainerID: trainer._id,
    trainerName: trainer.name,
    trainerEmail: trainer.email,

    classDate: document.getElementById("classDate").value,
    classTime:document.getElementById("classTime").value,
    users: [],
  };

  console.log(classData,'sfdfsfs');

  fetch("http://localhost:8585/trainer/createClass", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(classData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data, "ssssssssssss")
      if(data.isOk){
        Swal.fire({
          icon : 'success',
          title : data.message,
          text : data.message
        })
        // resetClassForm();
        setTimeout(()=>{location.reload()},  3000)
      }
      else{
        Swal.fire({
          icon : 'error',
          title : data.message,
          text : data.message
        })
      }

    
    })
    .catch((error) => {
      
      console.log("Error creating class:");
      // Handle error here, e.g., display an error message to the user
    });
}

// Function to reset the class form after class creation
function resetClassForm() {
  document.getElementById("title").value = "";
  document.getElementById("seatTotal").value = "";
  document.getElementById("seatOccupied").value = "";
  document.getElementById("price").value = "";
  document.getElementById("activity").value = "";
  document.getElementById("venue").value = "";
  document.getElementById("Link").value = "";
  document.getElementById("duration").value = "";
  document.getElementById("image").value = "";

  document.getElementById("classDate").value = "";
  document.getElementById("classTime").value = "";
}

//classes divs
const classes = document.getElementById("classes");

fetch(`http://localhost:8585/classes/trainer/${trainer._id}`)
  .then((res) => res.json())
  .then((data) => {
    if (data.classes.length) {
      const classes_container = document.createElement("div");
      classes_container.setAttribute("id", "classes_container");
      data.classes.map((ele) => {
        const individual_class = document.createElement("div");
        individual_class.setAttribute("id", "individual_class");
        individual_class.setAttribute("data-id", ele._id);
        const title = document.createElement("p");
        title.innerHTML = ele.title;
        const price = document.createElement("p");
        price.innerHTML = ele.price;
        const activity = document.createElement("p");
        activity.innerHTML = ele.activity;
        const update_form = document.createElement("div");
        update_form.setAttribute("id", "update_form");
        const update = document.createElement("button");
        update.innerHTML = "Update";
        update.setAttribute("id", "update");
        update.setAttribute("data-id", ele._id);

        const deleted = document.createElement("button");
        deleted.innerHTML = "Delete";
        deleted.setAttribute("id", "delete");

        deleted.addEventListener("click", (e) => {
          e.preventDefault();
          fetch(`http://localhost:8585/classes/delete/${ele._id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => response.json())
            .then((data) => {
              if(data.isOk){
                Swal.fire({
                  icon : 'success',
                  title : "Delete operation successful",
                  text : data.message
                })
                setTimeout(()=>{location.reload()},  1500)
              }
              else{
                Swal.fire({
                  icon : 'error',
                  title : 'Something went wrong',
                  text : data.message
                })
              }
            })
            .catch((error) => {
              // console.log("Error deleting class:", error.message);
              Swal.fire({
                icon : 'error',
                title : 'Something Went Wrong',
                text : "Some error occured!"
              })
              // Handle error here, e.g., display an error message to the user
            });
        });

        update.addEventListener("click", (e) => {
          e.preventDefault();

          sessionStorage.setItem("classID", ele._id);
          
          
          if (flag == false) {
            update_form.innerHTML = "";
            
          /////////

            update_form.setAttribute("style", "display:block");
            update_form.setAttribute("style", "width: 200px");
            update_form.setAttribute("style", "z-index: 1");
            flag = true;
            const form = document.createElement("form");

            const titleDiv = document.createElement("div");
            const title_text = document.createElement("p");
            const title_input = document.createElement("input");
            title_text.innerHTML = "Title";
            title_input.setAttribute("placeholder", "title");
            title_input.setAttribute("id", "title");
            //title_input.setAttribute("value", ele.title);

            titleDiv.append(title_text, title_input);

            const seattotalDiv = document.createElement("div");
            const seattotal_text = document.createElement("p");
            const seattotal_input = document.createElement("input");
            seattotal_text.innerHTML = "seatTotal";
            seattotal_input.setAttribute("placeholder", "seatTotal");
            seattotal_input.setAttribute("id", "seatTotal");
            //seattotal_input.setAttribute("value", ele.seatTotal);
            seattotalDiv.append(seattotal_text, seattotal_input);

            const seatOccupiedDiv = document.createElement("div");
            const seatOccupied_text = document.createElement("p");
            const seatOccupied_input = document.createElement("input");
            seatOccupied_text.innerHTML = "seatOccupied";
            seatOccupied_input.setAttribute("placeholder", "seatOccupied");
            seatOccupied_input.setAttribute("id", "seatOccupied");
            //seatOccupied_input.setAttribute("value", ele.seatOccupied);
            seatOccupiedDiv.append(seatOccupied_text, seatOccupied_input);

            const priceDiv = document.createElement("div");
            const price_text = document.createElement("p");
            const price_input = document.createElement("input");
            price_text.innerHTML = "price";
            price_input.setAttribute("placeholder", "price");
            price_input.setAttribute("id", "price");
            //price_input.setAttribute("value", ele.price);
            priceDiv.append(price_text, price_input);

            const activityDiv = document.createElement("div");
            const activity_text = document.createElement("p");
            const activity_input = document.createElement("input");
            activity_text.innerHTML = "Activity";
            activity_input.setAttribute("placeholder", "activity");
            activity_input.setAttribute("id", "activity");
            // activity_input.setAttribute("value", ele.activity);
            activityDiv.append(activity_text, activity_input);

            const venueDiv = document.createElement("div");
            const venue_text = document.createElement("p");
            const venue_input = document.createElement("input");
            venue_input.setAttribute("placeholder", "venue");
            venue_input.setAttribute("id", "venue");
            //venue_input.setAttribute("value", ele.venue);
            venueDiv.append(venue_text, venue_input);
            venue_text.innerHTML = "Venu"

            const linkDiv = document.createElement("div");
            const link_text = document.createElement("p");
            const link_input = document.createElement("input");
            link_text.innerHTML = "Link";
            link_input.setAttribute("placeholder", "link");
            link_input.setAttribute("id", "link");
            // link_input.setAttribute("value", ele.link);
            linkDiv.append(link_text, link_input);

            const durationDiv = document.createElement("div");
            const duration_text = document.createElement("p");
            const duration_input = document.createElement("input");
            duration_text.innerHTML = "Duration";
            duration_input.setAttribute("placeholder", "duration");
            duration_input.setAttribute("id", "duration");
            // duration_input.setAttribute("value", ele.duration);
            durationDiv.append(duration_text, duration_input);

            const imageDiv = document.createElement("div");
            const image_text = document.createElement("p");
            const image_input = document.createElement("input");
            image_text.innerHTML = "Image";
            image_input.setAttribute("placeholder", "image");
            image_input.setAttribute("id", "image");
            // image_input.setAttribute("value", ele.image);
            imageDiv.append(image_text, image_input);

            const classDateDiv = document.createElement("div");
            const classDate_text = document.createElement("p");
            const classDate_input = document.createElement("input");
            classDate_text.innerHTML = "ClassDate";
            classDate_input.setAttribute("placeholder", "classDate");
            classDate_input.setAttribute("id", "classDate");
            classDate_input.setAttribute("type", "date");
            //classDate_input.setAttribute("value", ele.classDate);
            classDateDiv.append(classDate_text, classDate_input);

            const classTimeDiv = document.createElement("div");
            const classTime_text = document.createElement("p");
            const classTime_input = document.createElement("input");
            classTime_text.innerHTML = "ClassTime";
            classTime_input.setAttribute("placeholder", "classTime");
            classTime_input.setAttribute("id", "classTime");
            classTime_input.setAttribute("type", "time");
            // classTime_input.setAttribute("value", ele.classTime);
            classTimeDiv.append(classTime_text, classTime_input);

            let divID = e.target.dataset.id
            let divs = document.querySelectorAll('#individual_class')
            
            for(let div of divs){
              let id = div.dataset.id
              // console.log(id, divID)
            if(id !== divID){
              div.style.display = "none"
            }else{
              div.style.display  = 'block'
              let ptags = document.querySelectorAll(`[data-id="${id}"] > p`)
              let btns = document.querySelectorAll(`[data-id="${id}"] > button`)
              let form =  document.querySelector(`#update_form`)
              console.log(form)
              for(let p of ptags){p.style.display = 'none'}
              for(let b of btns){b.style.display = 'none'}
              form.style.width = "100%"
            }
            }

            const update = document.createElement("button");
            update.innerHTML = "Update";
            update.addEventListener("click", (e) => {
              e.preventDefault();
              updateClass();
            });

            form.append(
              titleDiv,
              seattotalDiv,
              seatOccupiedDiv,
              priceDiv,
              activityDiv,
              venueDiv,
              linkDiv,
              durationDiv,
              imageDiv,
              classDateDiv,
              classTimeDiv,
              update
            );
            update_form.append(form);
          } else {
            update_form.setAttribute("style", "display:none");
            flag = false;
          }
        });
        individual_class.append(
          title,
          price,
          activity,
          update_form,
          update,
          deleted
        );
        classes_container.append(individual_class);
      });
      classes.append(classes_container);
    } else {
      const message = document.createElement("h2");
      message.innerHTML = "Created Classes will be shown here";
      classes.append(message);
    }
  })
  .catch((err) => console.log(err));

function updateClass() {
  const classData = {
    title: document.getElementById("title").value,
    seatTotal: parseInt(document.getElementById("seatTotal").value),
    seatOccupied: parseInt(document.getElementById("seatOccupied").value),
    price: parseFloat(document.getElementById("price").value),
    activity: document.getElementById("activity").value,
    venue: document.getElementById("venue").value,
    //Link: document.getElementById("Link").value,
    duration: document.getElementById("duration").value,
    image: document.getElementById("image").value,

    trainerID: trainer._id,
    trainerName: trainer.name,
    trainerEmail: trainer.email,
    classDate: new Date(document.getElementById("classDate").value),
    classTime: new Date(document.getElementById("classTime").value),
    users: [],
  };
  console.log(classData);

  const classID = sessionStorage.getItem("classID");

  fetch(`http://localhost:8585/trainer/updateClass/${classID}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(classData),
  })
    .then((response) => response.json())
    .then((data) => {
      if(data.isOk){
        Swal.fire({
          icon : 'success',
          title : data.message,
          text : data.message
        })
        setTimeout(()=>{location.reload()},  3000)
      }
      else{
        Swal.fire({
          icon : 'error',
          title : data.message,
          text : data.message
        })
      }
    })
    .catch((error) => {
      console.error("Error deleting class:", error.message);
      Swal.fire({
        icon : 'error',
        title : 'Something Went Wrong',
        text : "Some error occured!"
      })
      // Handle error here, e.g., display an error message to the user
    });
}

