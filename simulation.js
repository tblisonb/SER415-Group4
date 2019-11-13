function submitClicked() {
    //clearly this will do something else
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
