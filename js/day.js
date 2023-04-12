var id_counter = 1;

window.addEventListener("load", (event) => {
  switch (event.target.title) {
    case "sunday":
      loadDay('sunday');
      break;
    case "monday":
      loadDay('monday');
      break;
    case "tuesday":
      loadDay('tuesday');
      break;
    case "wednesday":
      loadDay('wednesday');
      break;
    case "thursday":
      loadDay('thursday');
      break;
    case "friday":
      loadDay('friday');
      break;
    case "saturday":
      loadDay('saturday');
      break;
  }
});

function loadDay(day) {
  sessionStorage.setItem("curr-day", day);  
  const list = sessionStorage.getItem(`${day}-exercise-list`);
  document.getElementById(`${day}-exercise-list`).innerHTML = list;
  const exercise_info = JSON.parse(sessionStorage.getItem(`${day}-object`));
  for (let i = 0; i < document.getElementById(`${day}-exercise-list`).children.length; i++) {
    const id = document.getElementById(`${day}-exercise-list`).children[i].getAttribute("id");
    const set_list = sessionStorage.getItem(`${day}-set-list-${id}`);
    document.getElementById(`${day}-set-list-${id}`).innerHTML = set_list;
    for (exc in exercise_info[i]) {
      let j = 0;
      document.getElementById(`${day}-exercise-list`).children[i].children[0].children[0].children[1].children[0].value = Object.keys(exercise_info[i])[0];
      exercise_info[i][exc].forEach(element => {
        document.getElementById(`${day}-exercise-list`).children[i].children[1].children[j].children[0].children[1].children[0].value = element.weight;
        document.getElementById(`${day}-exercise-list`).children[i].children[1].children[j].children[0].children[2].children[0].value = element.reps;
        document.getElementById(`${day}-exercise-list`).children[i].children[1].children[j].children[0].children[3].children[2].value = element.rpe
        ++j;
      });
    }
  }
  id_counter = parseInt(sessionStorage.getItem(`${day}-curr-max-id`));
}

function addExercise(day) {
  var list = document.getElementById(`${day}-exercise-list`);
  var item = document.createElement("li");
  if (isNaN(id_counter)) {
    id_counter = 1;
  }
  item.setAttribute("class", "exercise");
  item.setAttribute("id", id_counter);
  id_counter += 1;
  sessionStorage.setItem(`${day}-curr-max-id`, id_counter);
  const id = item.getAttribute("id");
  item.innerHTML = `<div class="name-and-buttons">
                      <div class="remove-and-name">
                        <button type="button" class="sub" onclick="removeExercise('${day}', ${id})">&#10539;</button>
                        <div class="enter-name">
                          <input type="text" class="first-input" id="name-${id}" placeholder="Name (ex. Squats, RDLs, etc.)" required/>
                          <span class="highlight"></span>
                          <span class="bar"></span>
                          <label></label>
                        </div>
                      </div>
                      <div class="set-buttons">
                        <button class="input-button" role="button" onclick="addSet('${day}', ${id})">
                          <span class="text">&#43; Add Set</span>
                        </button>
                        <button class="input-button" role="button" onclick="removeSet('${day}', ${id})">
                          <span class="text">&minus; Remove Set</span>
                        </button>
                      </div>
                    </div>
                    <ul id="${day}-set-list-${id}"></ul>`;
  list.appendChild(item);
  sessionStorage.setItem(`${day}-exercise-list`, list.innerHTML);
}

function removeExercise(day, id) {
  var item_to_remove = document.getElementById(id);
  sessionStorage.removeItem(`${day}-set-list-${id}`);
  item_to_remove.parentNode.removeChild(item_to_remove);
  var list = document.getElementById(`${day}-exercise-list`);
  sessionStorage.setItem(`${day}-exercise-list`, list.innerHTML);
}

function addSet(day, id) {
  var set_list = document.getElementById(`${day}-set-list-${id}`);
  const set = document.createElement("li");
  var set_id = set_list.children.length+1;
  set.setAttribute("id", `set-${set_id}`);
  set.setAttribute("class", "set");
  set.innerHTML = `<div class="set-info">
                      <div class="set_header">
                        <h2>
                          <strong>Set ${set_id}</strong>
                        </h2>
                      </div>
                      <div class="enter-num">
                        <input type="text" id="${day}-ex-${id}-set-${set_id}-weight" placeholder="Weight (lbs)" required />
                        <label></label>
                      </div>
                      <div class="enter-num">
                        <input type="text" id="${day}-ex-${id}-set-${set_id}-reps" placeholder="Reps" required />
                        <label></label>
                      </div>
                      <div class="enter-rpe">
                        <h3>RPE</h3>
                        <div class="RPE-help-tip">
                          <p>RPE stands for rate of perceived exertion - it represents how hard you're working. It is based on a 1-10 scale where 1 represents no effort and 10 represents maximal effort.</p>
                        </div>
                        <input
                          type="range"
                          id="${day}-ex-${id}-set-${set_id}-rpe"
                          min="1"
                          max="10"
                          value="1"
                          oninput="${day}_ex_${id}_set_${set_id}_rangeValue.innerText = this.value"
                        />
                        <span id="${day}_ex_${id}_set_${set_id}_rangeValue" class="sliderNum">
                          1
                        </span>
                      </div>
                    </div>`;
  set_list.appendChild(set);
  sessionStorage.setItem(`${day}-set-list-${id}`, set_list.innerHTML);
}

function removeSet(day, id) {
  var set_list = document.getElementById(`${day}-set-list-${id}`);
  if (set_list.children.length > 0) {
    set_list.lastChild.remove();
    sessionStorage.setItem(`${day}-set-list-${id}`, set_list.innerHTML);
  }
}

function saveDay(day) {
  var exercise_info = [];
  var exercise_html = document.getElementById(`${day}-exercise-list`);
  for (let i = 0; i < exercise_html.children.length; ++i) { // loop over all exercises
    const id = exercise_html.children[i].getAttribute("id");
    var set_list = document.getElementById(`${day}-set-list-${id}`);
    sessionStorage.setItem(`${day}-set-list-${id}`, set_list.innerHTML);
    const name = exercise_html.children[i].children[0].children[0].children[1].children[0].value;
    sessionStorage.setItem(`${day}-ex-${id}-name`, name);
    var curr_exercise_info = {};
    curr_exercise_info[name] = [];
    const num_sets = exercise_html.children[i].children[1].children.length;
    for (let j = 0; j < num_sets; ++j) { // loop over each set in current exercise
      const weight = exercise_html.children[i].children[1].children[j].children[0].children[1].children[0].value;
      const reps = exercise_html.children[i].children[1].children[j].children[0].children[2].children[0].value;
      const rpe = exercise_html.children[i].children[1].children[j].children[0].children[3].children[2].value;
      curr_exercise_info[name].push({"set": j+1, "weight": weight, "reps": reps, "rpe": rpe});
    }
    exercise_info.push(curr_exercise_info);
  }
  sessionStorage.setItem(`${day}-object`, JSON.stringify(exercise_info));
}