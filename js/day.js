window.addEventListener("load", () => {
  const list = sessionStorage.getItem("exercise-list");
  document.getElementById("exercise-list").innerHTML = list;
});

var id_counter = 1;

function addExercise() {
  var list = document.getElementById("exercise-list");
  const num_exercises = list.children.length;
  var item = document.createElement("li");
  item.setAttribute("class", "exercise");
  item.setAttribute("id", id_counter);
  id_counter += 1;
  const id = item.getAttribute("id");
  item.innerHTML = (`<div class="remove-and-name">
                      <button type="button" class="sub" onclick="removeExercise(${id})">&#10539;</button>
                      <div class="enter-name">
                        <input type="text" class="first-input" id="name-${id}" placeholder="Name (ex. Squats, RDLs, etc.)" required/>
                        <span class="highlight"></span>
                        <span class="bar"></span>
                        <label></label>
                      </div>
                      <button type="button" class="sub" onclick="handleSave(${id})">Save</button>
                    </div>
                    <div>
                      <button class="input-button" role="button" onclick="showPopup(${id})">
                        <span class="text">Input</span>
                      </button>
                    </div>`);
  list.appendChild(item);
  sessionStorage.setItem("exercise-list", list.innerHTML);

  var input = document.createElement("div");
  input.setAttribute("class", "exercise-input");
  input.setAttribute("id", `input-${id}`);
  input.innerHTML = (`<div class="exercise-input">
                      <div class="exercise-title"><h1>Squats</h1></div>
                      <div class="set-list">
                        <div class="set">
                          <div class="set_header">
                              <h2><strong>Set 1</strong></h2>
                              <button type="button" class="sub">&#10539;</button>
                          </div>
                          <div class="set-info">
                            <div class="enter-num">
                              <input type="text" required/>
                              <span class="highlight"></span>
                              <span class="bar"></span>
                              <label>Weight</label>
                            </div>
                            <div class="enter-num">
                              <input type="text" required/>
                              <span class="highlight"></span>
                              <span class="bar"></span>
                              <label>Reps</label>
                            </div>
                            <div class="enter-input">
                              <h3>RPE</h3>
                              <input
                                type="range"
                                min="1"
                                max="10"
                                value="1"
                                oninput="rangeValue1.innerText = this.value"
                              />
                              <span id="rangeValue1" class="sliderNum">1</span>
                            </div>
                          </div>
                        </div>
                      <button type="button" class="add">&#43;</button>
                    </div>`);
  document.body.appendChild(input);
}

function removeExercise(id) {
  var item_to_remove = document.getElementById(id);
  item_to_remove.parentNode.removeChild(item_to_remove);
  var list = document.getElementById("exercise-list");
  var input_to_remove = document.getElementById(`input-${id}`);
  input_to_remove.parentNode.removeChild(input_to_remove);
  sessionStorage.setItem("exercise-list", list.innerHTML);
}

function handleSave(id) {
  var list = document.getElementById("exercise-list");
  var exercise = document.getElementById(id);
  var name = document.getElementById(`name-${id}`).value;
  exercise.innerHTML = (`<div class="remove-and-name">
                          <button type="button" class="sub" onclick="removeExercise(${id})">&#10539;</button>
                          <h3 id="name-${id}">${name}</h3>
                          <button type="button" class="sub" onclick="handleEdit(${id})">Edit</button>
                        </div>
                        <div>
                          <button class="input-button" role="button" onclick="showPopup(${id})">
                            <span class="text">Input</span>
                          </button>
                        </div>`);
  sessionStorage.setItem("exercise-list", list.innerHTML);
  sessionStorage.setItem("curr-exercise", name);
}

function handleEdit(id) {
  var list = document.getElementById("exercise-list");
  var exercise = document.getElementById(id);
  var name = document.getElementById(`name-${id}`).innerText;
  exercise.innerHTML = (`<div class="remove-and-name">
                          <button type="button" class="sub" onclick="removeExercise(${id})">&#10539;</button>
                          <div class="enter-name">
                            <input type="text" id="name-${id}" value="${name}" required/>
                          </div>
                          <button type="button" class="sub" onclick="handleSave(${id})">Save</button>
                        </div>
                        <div>
                          <button class="input-button" role="button" onclick="showPopup(${id})">
                            <span class="text">Input</span>
                          </button>
                        </div>`);
  sessionStorage.setItem("exercise-list", list.innerHTML);
}

function showPopup(id) {
  // var content = obj.nextElementSibling;
  //   if (content.style.display === "block") {
  //     content.style.display = "none";
  //   } else {
  //     content.style.display = "block";
  //   }
  document.getElementById(`input-${id}`).style.display = "block";
}