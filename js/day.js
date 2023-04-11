window.addEventListener("load", () => {
  const list = sessionStorage.getItem("exercise-list");
  document.getElementById("exercise-list").innerHTML = list;
});

function addExercise() {
  var list = document.getElementById("exercise-list");
  const num_exercises = list.children.length;
  var item = document.createElement("li");
  item.setAttribute("class", "exercise");
  item.setAttribute("id", num_exercises + 1);
  const id = item.getAttribute("id");
  item.innerHTML = `<div class="remove-and-name"><button type="button" class="sub" onclick="removeExercise(${id})">&#10539;</button><div class="enter-name"><input type="text" class="first-input" id="name-${id}" placeholder="Name (ex. Squats, RDLs, etc.)" required/><span class="highlight"></span><span class="bar"></span><label></label></div><button type="button" class="sub" onclick="handleSave(${id})">Save</button></div><div><a href="../inputs/moninput.html"><button class="input-button" role="button" onclick="updateCurrExercise(${id})"><span class="text">Input</span></button></a></div>`;
  list.appendChild(item);
  sessionStorage.setItem("exercise-list", list.innerHTML);
}

function removeExercise(id) {
  var item_to_remove = document.getElementById(id);
  item_to_remove.parentNode.removeChild(item_to_remove);
  var list = document.getElementById("exercise-list");
  sessionStorage.setItem("exercise-list", list.innerHTML);
}

function handleSave(id) {
  var list = document.getElementById("exercise-list");
  var exercise = document.getElementById(id);
  var name = document.getElementById(`name-${id}`).value;
  exercise.innerHTML = `<div class="remove-and-name"><button type="button" class="sub" onclick="removeExercise(${id})">&#10539;</button><h3 id="name-${id}">${name}</h3><button type="button" class="sub" onclick="handleEdit(${id})">Edit</button></div><div><a href="../inputs/moninput.html"><button class="input-button" role="button" onclick="updateCurrExercise(${id})"><span class="text">Input</span></button></a></div>`;
  sessionStorage.setItem("exercise-list", list.outerHTML);
  sessionStorage.setItem("curr-exercise", name);
}

function handleEdit(id) {
  var list = document.getElementById("exercise-list");
  var exercise = document.getElementById(id);
  var name = document.getElementById(`name-${id}`).innerText;
  exercise.innerHTML = `<div class="remove-and-name"><button type="button" class="sub" onclick="removeExercise(${id})">&#10539;</button><div class="enter-name"><input type="text" id="name-${id}" value="${name}" required/></div><button type="button" class="sub" onclick="handleSave(${id})">Save</button></div><div><a href="../inputs/moninput.html"><button class="input-button" role="button" onclick="updateCurrExercise(${id})"><span class="text">Input</span></button></a></div>`;
  sessionStorage.setItem("exercise-list", list.innerHTML);
}

function updateCurrExercise(id) {
  const name = document.getElementById(`name-${id}`).innerText;
  sessionStorage.setItem("curr-exercise", name);
}