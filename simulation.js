let sim_time = 0;

function incrementTime() {
    document.getElementById("time").src = sim_time;
    document.getElementById("time").innerText = "Current Time: " + sim_time;
    sim_time += 1;
}

function submitClicked() {
    //clearly this will do something else
    var clock = setInterval(incrementTime, 1000);
    var name = document.getElementById("nameField").value;
    document.cookie = "username=" + name;

    document.getElementById("greet_p").innerText = "Hi " + name;
    changePicture("state1.png");
}

function coreEngine() {
    let cycleTime = 0;
    let maxFlow = 70;
}

function changePicture(imageName){
    document.getElementById("image").src = imageName;
}
