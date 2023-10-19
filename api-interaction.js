const axios = require("axios");

function addUser(userName, email, age) {
  const url = `http://13.54.110.83:3000/insert?username=${userName}&email=${email}&age=${age}`;
  
  axios.post(url)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
}

function listUser() {
  const url = "http://13.54.110.83:3000/list";

  axios.get(url)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
}

addUser("foong", "foong@open.gov.sg", "10");
listUser();
