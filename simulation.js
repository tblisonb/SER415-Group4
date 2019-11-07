function submitClicked() {
    //clearly this will do something else
    var name = document.getElementById("nameField").value;
    document.cookie = "username=" + name;

    document.getElementById("greet_p").innerText = "Hi " + name;
}
