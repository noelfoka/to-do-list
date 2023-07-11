// import lodash from 'lodash';
import './style.css';

const obj = {
  description: 'Write an article',
  completed: true,
  index: 0,
};
const obj1 = {
  description: 'Take a cofee',
  completed: true,
  index: 1,
};

const arr = [obj, obj1];

// const _ = lodash;

window.addEventListener('load', () => {
  for (let i = 0; i < arr.length; i += 1) {
    document.getElementById(arr[i].index).innerHTML = arr[i].description;
  }
});
