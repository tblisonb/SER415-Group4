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
    if (state_time >= 10)
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
    var name = document.getElementById("nameField").value;
    document.cookie = "username=" + name;
}

/**
 * Begins the global simulation time.
 */
function startSimulation() {
    var clock = setInterval(incrementTime, 1000);
    document.getElementById("b_sim").disabled = true;
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