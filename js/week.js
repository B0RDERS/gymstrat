window.addEventListener("load", () => {
    var days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    for(var day of days){
        if (`rest-${day}` in sessionStorage &&
            sessionStorage.getItem(`rest-${day}`) === "true") {
            document.getElementById(`rest-${day}`).checked = true;
            handleRestDay(day);
        }
    }
})

function handleRestDay(day) {
    var day_html = document.getElementById(day);
    if(document.getElementById(`rest-${day}`).checked){
        day_html.children[1].style.visibility="hidden";
        sessionStorage.setItem(`rest-${day}`, true);
    }else{
        day_html.children[1].style.visibility="visible";
        sessionStorage.setItem(`rest-${day}`, false);
    }
}

function handleSubmit() {
    var inputComplete = true;
    var days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    for (var day of days){
        if (!document.getElementById(`rest-${day}`).checked){
            if (sessionStorage.getItem(`${day}-object`) === null || 
               JSON.parse(sessionStorage.getItem(`${day}-object`)).length == 0){
                alert(`Please input data for ${day.charAt(0).toUpperCase() + day.slice(1)}.`);
                inputComplete=false;
                break;
            }
        }
    }
    if(inputComplete){
        var next_week = [];
        for(var day of days){
            if (document.getElementById(`rest-${day}`).checked){
                next_week.push([]);
            } 
            else {
                var next_workout = [];
                var workout = JSON.parse(sessionStorage.getItem(`${day}-object`));
                for(var i=0; i<workout.length; ++i){
                    var exerciseName = Object.keys(workout[i])[0];
                    next_workout.push({});
                    next_workout[i][exerciseName] = [];
                    for(var set of workout[i][exerciseName]){
                        var new_weight = parseInt(set["weight"]);
                        var rpe = parseInt(set["rpe"]);
                        if (rpe < 8) {
                            new_weight *= 1.1;
                        }
                        else if (rpe < 8.5) {
                            new_weight *= 1.08
                        }
                        else if (rpe < 9.5) {
                            new_weight *= 1.05
                        }
                        next_workout[i][exerciseName].push({set: set["set"], weight: new_weight, reps: set["reps"]})
                    }
                }
                next_week.push(next_workout);
            }
        }
        console.log(next_week);
        sessionStorage.setItem("next_week", JSON.stringify(next_week));
        window.location.replace("output.html");
    }
}