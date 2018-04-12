const express = require("express");
const app = express();
var bodyParser = require("body-parser");

// var requestTime = function(req, res, next) {
//   req.requestTime = new Date();
//   next();
// };
var port = process.env.PORT || 3001;

let todoList = [
  { todo: "Learn NodeJs", done: false },
  { todo: "Learn ReactJs", done: false }
];
// app.use(requestTime);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get("/todo/search", (req, res) => {
  let searchKey = req.query.todo;
  let result = todoList.filter(todo =>
    todo.todo.toLowerCase().includes(searchKey.toLowerCase())
  );
  res.send({ success: true, result: result });
});

app.get("/todo", (req, res) => {
  res.send({ data: todoList });
});

app.get("/todo/:id", (req, res) => {
  let length = todoList.length;
  let index = req.params.id;
  console.log(index);
  if (index > length - 1) {
    res.send("not found");
  } else {
    res.send({ data: todoList[index] });
  }
});

app.post("/todo", (req, res) => {
  let todo = req.body.todo;
  let done = JSON.parse(req.body.done);
  console.log(req.body);
  if (todo === "") {
    res.send("todo cannont empty");
  } else {
    let newTodo = {
      todo: req.body.todo,
      done: done
    };
    todoList.push(newTodo);
    res.send({ sucess: true, data: newTodo });
  }
});

app.delete("/todo/:id", (req, res) => {
  let length = todoList.length;
  let index = req.params.id;

  if (index > length - 1) {
    res.send({ sucess: false, message: "data not found" });
  } else {
    todoList.splice(index, 1);
    res.send({ success: true, data: todoList });
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}! `));
