window.addEventListener("load", () => {
  const title = sessionStorage.getItem("curr-exercise");
  document.getElementById("title").innerHTML = `<h1>${title}</h1>`;
  var set_list = sessionStorage.getItem("set-list");
  document.getElementById("set-list").innerHTML = set_list;
  console.log(`Num_sets: ${document.getElementById("set-list").childNodes.length}`);
});

function addSet() {
    var set_list = document.getElementById("set-list");
    const num_sets = set_list.children.length;
    console.log(num_sets+1);
    var set = document.createElement("li");
    set.setAttribute("class", "set");
    set.setAttribute("id", num_sets + 1);
    const id = set.getAttribute("id");
    set.innerHTML = (
        `<div class="set_header">
          <h2>
            <strong>Set ${num_sets+1}</strong>
          </h2>
        </div>
        <div class="set-info">
          <div class="enter-num">
            <input type="text" required />
            <span class="highlight"></span>
            <span class="bar"></span>
            <label>Weight</label>
          </div>
          <div class="enter-num">
            <input type="text" required />
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
            <span id="rangeValue1" class="sliderNum">
              1
            </span>
          </div>
        </div>`
    );
    set_list.appendChild(set);
    sessionStorage.setItem("set-list", set_list.innerHTML);
}

function removeSet() {
    var set_list = document.getElementById("set-list");
    if (set_list.children.length > 0) {
        set_list.lastChild.remove();
    }
    sessionStorage.setItem("set-list", set_list.innerHTML);
}

function saveSets() {
  
}