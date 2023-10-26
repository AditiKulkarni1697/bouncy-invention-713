document.addEventListener('DOMContentLoaded', () => {
  const trainerDetails = document.getElementById('trainer_details');
  const createBtn = document.getElementById('createBtn');
  const classFormContainer = document.getElementById('classFormContainer');
  const classes = document.getElementById('classes');
  const logout = document.getElementById("logout")
  const home = document.getElementById("home")
  const service = document.getElementById("service")

  const trainer = JSON.parse(sessionStorage.getItem('logedClient'));
  if (!trainer) {
    location.replace('../index.html');
  }

  const apiUrl = 'https://fitme-2.onrender.com';

  // Utility function to create input fields
  function createInputField(label, id, type = 'text', placeholder = '') {
    const div = document.createElement('div');
    const labelElem = document.createElement('p');
    const inputElem = document.createElement('input');

    labelElem.innerHTML = label;
    inputElem.setAttribute('type', type);
    inputElem.setAttribute('placeholder', placeholder);
    inputElem.setAttribute('id', id);
    div.append(labelElem, inputElem);
    return div;
  }

  function switchHome() {
    window.location.href = '../index.html';
  }

  function switchService() {
    window.location.href = '../index.html';
  }

  function switchLogout() {
    sessionStorage.clear();
    window.location.href = '../index.html';
  }

 logout.addEventListener("click",(e)=>{
  e.preventDefault()
  switchLogout()
 })

 home.addEventListener("click",(e)=>{
  e.preventDefault()
  switchHome()
 })

 service.addEventListener("click",(e)=>{
  e.preventDefault()
  switchService()
 })

  // Fetch trainer details
  fetch(`${apiUrl}/trainer/${trainer._id}`)
    .then((res) => res.json())
    .then((data) => {
      trainerDetails.innerHTML = `
        <div>
          <img src="${data.Trainer.gender === 'male'
            ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGP0LOh8SpUJCGgsBxnYVT1lvY4DNW_f_lBA&usqp=CAU'
            : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6qdg5oamUcczZ1Eg56Fcn3NlwQF1PBnCAlQ&usqp=CAU'}"
            alt="${data.Trainer.gender}" class="img" />
          <p>Name : ${data.Trainer.name}</p>
          <p>Email : ${data.Trainer.email}</p>
          <p>Ph No. : ${data.Trainer.phone}</p>
          <p>City : ${data.Trainer.city}</p>
          <p>Gender : ${data.Trainer.gender}</p>
          <p>Total Classes : ${data.Trainer.classes.length}</p>
        </div>
      `;
    })
    .catch((err) => console.log(err));

  // Add click event listeners
  createBtn.addEventListener('click', toggleClassForm);

  function toggleClassForm(e) {
    e.preventDefault();
    if (!classFormContainer.style.display || classFormContainer.style.display === 'none') {
      renderClassForm();
    } else {
      classFormContainer.style.display = 'none';
    }
  }

  function renderClassForm() {
    classFormContainer.innerHTML = '';
    classFormContainer.style.display = 'block';
    classFormContainer.style.width = '500px';
    classFormContainer.style.zIndex = '1';
    classFormContainer.style.color = 'white';

    const form = document.createElement('form');
    const fields = [
      { label: 'Title', id: 'title' },
      { label: 'seatTotal', id: 'seatTotal' },
      { label: 'seatOccupied', id: 'seatOccupied' },
      { label: 'Price', id: 'price' },
      { label: 'Activity', id: 'activity' },
      { label: 'Venue', id: 'venue' },
      { label: 'Link', id: 'link' },
      { label: 'Duration', id: 'duration' },
      { label: 'Image', id: 'image' },
      { label: 'ClassDate', id: 'classDate', type: 'date' },
      { label: 'ClassTime', id: 'classTime', type: 'time' },
    ];

    fields.forEach((field) => {
      const inputField = createInputField(field.label, field.id, field.type);
      form.appendChild(inputField);
    });

    const submitBtn = document.createElement('button');
    submitBtn.innerHTML = 'Submit';
    submitBtn.addEventListener('click', createClass);
    form.appendChild(submitBtn);

    classFormContainer.appendChild(form);
  }

  function createClass(e) {
    e.preventDefault();
    // Extract and validate form data
    const classData = {
      title: document.getElementById('title').value,
      seatTotal: parseInt(document.getElementById('seatTotal').value),
      seatOccupied: parseInt(document.getElementById('seatOccupied').value),
      price: parseFloat(document.getElementById('price').value),
      activity: document.getElementById('activity').value,
      venue: document.getElementById('venue').value,
      link: document.getElementById('link').value,
      duration: document.getElementById('duration').value,
      image: document.getElementById('image').value,
      trainerID: trainer._id,
      trainerName: trainer.name,
      trainerEmail: trainer.email,
      classDate: new Date(document.getElementById('classDate').value),
      classTime: new Date(document.getElementById('classTime').value),
      users: [],
    };

    // Submit data to the server
    fetch(`${apiUrl}/trainer/createClass`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(classData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.isOk) {
          Swal.fire({
            icon: 'success',
            title: data.message,
            text: data.message,
          });
          setTimeout(() => location.reload(), 3000);
        } else {
          Swal.fire({
            icon: 'error',
            title: data.message,
            text: data.message,
          });
        }
      })
      .catch((error) => {
        console.log('Error creating class:', error.message);
        Swal.fire({
          icon: 'error',
          title: 'Something Went Wrong',
          text: 'Some error occurred!',
        });
      });
  }

  // Fetch and display classes
  fetch(`${apiUrl}/classes/trainer/${trainer._id}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.classes.length) {
        const classesContainer = document.createElement('div');
        classesContainer.setAttribute('id', 'classes_container');
        data.classes.forEach((classInfo) => {
          const classItem = createClassItem(classInfo);
          classesContainer.appendChild(classItem);
        });
        classes.appendChild(classesContainer);
      } else {
        const message = document.createElement('h2');
        message.innerHTML = 'Created Classes will be shown here';
        classes.appendChild(message);
      }
    })
    .catch((err) => console.log(err));

  function createClassItem(classInfo) {
    const classItem = document.createElement('div');
    classItem.setAttribute('id', 'individual_class');
    classItem.setAttribute('data-id', classInfo._id);

    const fields = ['title', 'price', 'activity'];
    fields.forEach((field) => {
      const p = document.createElement('p');
      p.innerHTML = classInfo[field];
      classItem.appendChild(p);
    });

    const updateForm = document.createElement('div');
    updateForm.setAttribute('id', 'update_form');

    const updateBtn = createUpdateButton(classInfo._id);
    const deleteBtn = createDeleteButton(classInfo._id);

    updateBtn.addEventListener('click', (e) => {
      e.preventDefault();
      sessionStorage.setItem('classID', classInfo._id);
      createUpdateForm(classInfo)
    });

    classItem.appendChild(updateForm);
    classItem.appendChild(updateBtn);
    classItem.appendChild(deleteBtn);

    return classItem;
  }

  function createUpdateButton(classID) {
    const updateBtn = document.createElement('button');
    updateBtn.innerHTML = 'Update';
    updateBtn.setAttribute('id', 'update');
    updateBtn.setAttribute('data-id', classID);
    return updateBtn;
  }

  function createDeleteButton(classID) {
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = 'Delete';
    deleteBtn.setAttribute('id', 'delete');
    deleteBtn.addEventListener('click', (e) => {
      e.preventDefault();
      fetch(`${apiUrl}/classes/delete/${classID}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.isOk) {
            Swal.fire({
              icon: 'success',
              title: 'Delete operation successful',
              text: data.message,
            });
            setTimeout(() => location.reload(), 1500);
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Something went wrong',
              text: data.message,
            });
          }
        })
        .catch((error) => {
          Swal.fire({
            icon: 'error',
            title: 'Something Went Wrong',
            text: 'Some error occurred!',
          });
        });
    });

    return deleteBtn;
  }

  

  function createUpdateForm(classInfo) {
    // Create a modal form for updating class information
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal-content" style="background-color:black">
        <span class="close" id="closeForm">&times;</span>
        <form>
          ${createInputField('Title', 'updateTitle', 'text', classInfo.title).outerHTML}
          ${createInputField('seatTotal', 'updateSeatTotal', 'number', classInfo.seatTotal).outerHTML}
          ${createInputField('seatOccupied', 'updateSeatOccupied', 'number', classInfo.seatOccupied).outerHTML}
          ${createInputField('Price', 'updatePrice', 'number', classInfo.price).outerHTML}
          ${createInputField('Activity', 'updateActivity', 'text', classInfo.activity).outerHTML}
          ${createInputField('Venue', 'updateVenue', 'text', classInfo.venue).outerHTML}
          ${createInputField('Link', 'updateLink', 'text', classInfo.link).outerHTML}
          ${createInputField('Duration', 'updateDuration', 'text', classInfo.duration).outerHTML}
          ${createInputField('Image', 'updateImage', 'text', classInfo.image).outerHTML}
          ${createInputField('ClassDate', 'updateClassDate', 'date', new Date(classInfo.classDate).toISOString().substring(0, 10)).outerHTML}
          ${createInputField('ClassTime', 'updateClassTime', 'time', new Date(classInfo.classTime).toTimeString().substring(0, 5)).outerHTML}
          <button type="button" id="updateSubmitBtn">Update</button>
        </form>
      </div>
    `;
  
    document.body.appendChild(modal);
  
    const updateSubmitBtn = document.getElementById('updateSubmitBtn');
    updateSubmitBtn.addEventListener('click', () => {
      // Handle the update logic here
      // Extract the updated form data from the modal
      const updatedData = {
        title: document.getElementById('updateTitle').value,
        seatTotal: parseInt(document.getElementById('updateSeatTotal').value),
        seatOccupied: parseInt(document.getElementById('updateSeatOccupied').value),
        price: parseFloat(document.getElementById('updatePrice').value),
        activity: document.getElementById('updateActivity').value,
        venue: document.getElementById('updateVenue').value,
        link: document.getElementById('updateLink').value,
        duration: document.getElementById('updateDuration').value,
        image: document.getElementById('updateImage').value,
        classDate: new Date(document.getElementById('updateClassDate').value),
        classTime: new Date(`${classInfo.classDate} ${document.getElementById('updateClassTime').value}`),
      };
         console.log(updatedData)
      // Update the class information using updatedData
      // Call your updateClass() function or make a fetch request here

      const class_id = sessionStorage.getItem('classID');

      fetch(`${apiUrl}/trainer/updateClass/${class_id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.isOk) {
            Swal.fire({
              icon: 'success',
              title: data.message,
              text: data.message,
            });
            setTimeout(() => location.reload(), 3000);
          } else {
            Swal.fire({
              icon: 'error',
              title: data.message,
              text: data.message,
            });
          }
        })
        .catch((error) => {
          console.log('Error creating class:', error.message);
          Swal.fire({
            icon: 'error',
            title: 'Something Went Wrong',
            text: 'Some error occurred!',
          });
        });

  
      // Close the modal
      closeModal();
    });
    const closeForm = document.getElementById('closeForm');
  closeForm.addEventListener('click', closeModal);

  modal.style.display = 'block';
  
  function closeModal() {
    modal.style.display = 'none';
  }
}

});
