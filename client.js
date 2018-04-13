// const axios = require("axios");
const container = document.getElementById("container");
//get ALL
const getAll = () => {
  return axios
    .get("http://localhost:3000/todo")
    .then(rawResponse => {
      let bufferString = "";
      let datas = rawResponse.data;
      datas.map(data => {
        bufferString += `<div class="list-item">${data.todo}</div>`;
      });
      container.innerHTML = bufferString;
    })
    .catch(function(error) {
      console.log(error);
    });
};

//get One
const getOne = () => {
  return axios
    .get("http://localhost:3000/todo/1")
    .then(rawResponse => {
      console.log("-------------------------------------------");
      console.log("get One");
      console.log(rawResponse.data);
    })
    .catch(function(error) {
      console.log(error);
    });
};

//Create new todo
const createNew = () => {
  return axios
    .post("http://localhost:3000/todo", {
      todo: "New Todo",
      done: false
    })
    .then(function(rawResponse) {
      console.log("-------------------------------------------");
      console.log("Create new todo");
      console.log(rawResponse.data);
    })
    .catch(function(error) {
      console.log(error);
    });
};

getAll();
