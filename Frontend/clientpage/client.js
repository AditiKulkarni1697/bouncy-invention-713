const user_details = document.getElementsByClassName("user_details");
const user_id = 1;
fetch(`https://jsonplaceholder.typicode.com/users/${user_id}`)
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
