import _ from "lodash";
import "./style.css";

const obj = {
  description: "wash the dishes",
  completed: true,
  index: 0,
};
const obj1 = {
  description: "complete To Do list project",
  completed: true,
  index: 1,
};

const arr = [obj, obj1];

window.addEventListener("load", () => {
  for (let i = 0; i < arr.length; i += 1) {
    document.getElementById(arr[i].index).innerHTML = arr[i].description;
  }
});
