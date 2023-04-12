window.addEventListener("load", () => {
    var days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    var week_html = document.getElementById("week");
    var week_plan = JSON.parse(sessionStorage.getItem(`next_week`));
    for(var i=0; i < week_plan.length; ++i){
        const day_name = days[i];
        var day = document.createElement('div');
        day.setAttribute("class", "day");
        day.setAttribute("id", day_name);
        if(week_plan[i].length==0){
            day.innerHTML = `<h3>Rest Day!</h3>`
        }else{
            for(var j=0; j<week_plan[i].length; ++j){
                var exercise_html = document.createElement('div'); 
                exercise_html.setAttribute("class", "exercise");
                var exerciseName = Object.keys(week_plan[i][j])[0];
                exerciseName_html = document.createElement('h3');
                exerciseName_html.innerHTML = `${exerciseName}`;
                for(var set of week_plan[i][j][exerciseName]){
                    var set_html = document.createElement('div')
                    set_html.setAttribute("class", "set");
                    set_html.innerHTML = `<p>Set: ${set["set"]}</p><p>Weight: ${parseInt(set["weight"])} lbs</p><p>Reps: ${set["reps"]}</p>`
                    exercise_html.appendChild(set_html);
                }
                day.appendChild(exerciseName_html);
                day.appendChild(exercise_html);
            }
        }
        var day_header = document.createElement("h1");
        day_header.innerHTML = `${days[i].charAt(0).toUpperCase() + days[i].slice(1)}`;
        week_html.appendChild(day_header);
        week_html.appendChild(day);
    }
})