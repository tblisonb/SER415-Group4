/**
 * Global simulation time in seconds.
 * @type {number}
 * **
 * Global sate time in seconds.
 * @type {number}
 */
let sim_time = 0;
let state_time = 0;
/**
 * State represented by an integer between 1 and 4.
 * 1 - N/S straight + right
 * 2 - N/S left turn only
 * 3 - E/W straight + right
 * 4 - E/W left turn only
 * @type {number}
 */
let state = 1;

/**
 * Increments the current simulation time by one second and cycles through the simulation states.
 */
function incrementTime() {
    document.getElementById("time").src = sim_time;
    document.getElementById("time").innerText = "Current Time: " + sim_time;
    updatePicture();
    updateState();
    sim_time += 1;
    state_time += 1;
    if (state_time >= document.getElementById("state" + state).value)
        if (state >= 4) {
            state = 1;
            state_time = 0;
        }
    else {
            state += 1;
            state_time = 0;
        }
}

/**
 * Accept user parameters.
 */
function submitClicked() {
    //clearly this will do something else
    console.log('submit');

    let modelInit = {};
    modelInit.straightFlow = 0.6;
    modelInit.rightFlow = 0.2;
    modelInit.leftFlow = 0.2;
    modelInit.reactionTime = 2;
    modelInit.environmentModifer = 1;
    modelInit.peakFlow = 70;
    modelInit.timeToPeak = 5; // This number will probably be between 5-20. Think of this as a speed coefficent. It shifts the whole curve. Smaller number is more acceleration
    modelInit.X1 = 5;
    modelInit.X3 = 5;
    modelInit.X2 = 20;
    modelInit.X4 = 20;
    modelInit.NS_Green = 15;
    modelInit.NS_Left = 5;
    modelInit.EW_Green = 15;
    modelInit.EW_Left = 5;

    if (document.getElementById("feature1").checked){
        modelInit = modifyTraffic(modelInit, .67, NaN, NaN)
    }
    else if (document.getElementById("feature2").checked){
        modelInit = modifyTraffic(modelInit, .33, NaN, NaN)
    }
    else if (document.getElementById("feature3").checked){
        modelInit = modifyTraffic(modelInit, .55, NaN, NaN)
    }
    else if (document.getElementById("feature4").checked){
        modelInit = modifyTraffic(modelInit, .75, 6, 3)
    }
    else if (document.getElementById("feature5").checked){
        modelInit = modifyTraffic(modelInit, .80, 5.5, 2.5)
    }
    else if (document.getElementById("feature6").checked){
        modelInit = modifyTraffic(modelInit, .3015, NaN, NaN)
    }

    console.log(modelInit);
    let trafficModel = new TrafficModel(modelInit);
    document.getElementById("greet_p").innerHTML = JSON.stringify(trafficModel.verify());
}

/**
 * Begins the global simulation time.
 */
function startSimulation() {
    if (document.getElementById("state1").value != null && document.getElementById("state1").value > 0 &&
        document.getElementById("state2").value != null && document.getElementById("state2").value > 0 &&
        document.getElementById("state3").value != null && document.getElementById("state3").value > 0 &&
        document.getElementById("state4").value != null && document.getElementById("state4").value > 0) {
        document.getElementById("cycle_time_warning").innerText = null;
        var clock = setInterval(incrementTime, 1000);
        document.getElementById("b_sim").disabled = true;
    } else {
        document.getElementById("cycle_time_warning").innerText = "Error: Must supply cycle times.";
    }
}

/**
 * This function updates the environmentModifier and timeToPeak values as part of user features.
 */
function modifyTraffic(modelInit, environmentModifier, timeToPeak, reactionTime){
    modelInit.environmentModifer = environmentModifier;
    if (!isNaN(timeToPeak)){
        modelInit.timeToPeak = timeToPeak;
    }
    if (!isNaN(reactionTime)){
        modelInit.reactionTime = reactionTime;
    }
    return modelInit;
}

function coreEngine() {
    let cycleTime = 0;
    let maxFlow = 70;
    // insert parameterized functions here
}

/**
 * Updates the currently shown picture based on the state.
 */
function updatePicture() {
    document.getElementById("image").src = "state" + state + ".png";
}

/**
 * Update the displayed state every 1s interval.
 */
function updateState() {
    if (state == 1) {
        document.getElementById("state").innerText = "State: N/S Straight + Right";
    } else if (state == 2) {
        document.getElementById("state").innerText = "State: N/S Left Only";
    } else if (state == 3) {
        document.getElementById("state").innerText = "State: E/W Straight + Right";
    } else {
        document.getElementById("state").innerText = "State: E/W Left Only";
    }
}