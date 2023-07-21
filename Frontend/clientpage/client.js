const user_details = document.getElementsByClassName("user_details");

fetch("")
  .then((res) => res.json())
  .then((data) => console.log(data));
