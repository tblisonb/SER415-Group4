/*
ModelInit Interface

straightFlow: number less than 1
rightFlow: number less than 1
leftFlow: number less than 1

environmentModifer: number, percentage modifer to traffic flow, defaults to 1.

reactionTime: number of seconds before drivers start moving, defaults to 2 seconds
peakFlow: the max flow for cars in any direction aka horizontal asymptote for acceleration function, defaults to 70 cars/sec
timeToPeak: number of seconds until acceleration inflection point. How long cars go before you see diminishing returns from acceleration, defaults to 20 sec

X1: number, total rate of traffic for X1 input
X2: number, total rate of traffic for X2 input
X3: number, total rate of traffic for X3 input
X4: number, total rate of traffic for X4 input

NS_Green: number, seconds in north/south green state
NS_Left: number, seconds in north/south green state
EW_Green: number, seconds in north/south green state
EW_Left: number, seconds in north/south green state


private properties:
don't make these, they get calculated from the other inputs as interim values
NS_Rate: number greatest rate between X1 & X3
EW_Rate: number greates rate between X2 & X4
 */
let mi = undefined;


// time in seconds
function getAccelIntegralAtTime(time) {
    return 2 * mi.peakFlow * (Math.PI * time * Math.atan(Math.PI * time / mi.timeToPeak) - 10 * Math.log(Math.pow(Math.PI, 2) * Math.pow(time, 2) + Math.pow(mi.timeToPeak, 2))) / Math.pow(Math.PI, 2);
}

// time in seconds, this is the top of our integral
function getTotalCarOnGreenCycle(time) {
    if (time < mi.reactionTime) {
        return 0;
    }
    time = time - mi.reactionTime;

    // Integral is from a to b is integral(b) - integral(a). In our case it always starts at 0 to our elapsed time
    return mi.environmentModifer * (getAccelIntegralAtTime(time) - getAccelIntegralAtTime(0));

}

function init(MI) {
    if (MI.straightFlow + MI.rightFlow + MI.leftFlow !== 1) {
        console.log('S + R + L =/= 1. Adjust model inputs.');
    }

    if (typeof(MI.reactionTime) === 'undefined') {
        MI.reactionTime = 2;
    }
    if (typeof(MI.peakFlow) === 'undefined') {
        MI.peakFlow = 70;
    }
    if (typeof(MI.timeToPeak) === 'undefined') {
        MI.timeToPeak = 20;
    }
    if (typeof(MI.timeToPeak) === 'undefined') {
        MI.environmentModifer = 1;
    }

    MI.NS_rate = MI.X1 > MI.X3 ? MI.X1 : MI.X3;
    MI.EW_rate = MI.X2 > MI.X4 ? MI.X2 : MI.X4;
    mi = MI;
}

// Input flow X1R, (rate of cars per min after being reduced by turn choice)
function isDirectionValid(inputFlow, totalCycleTime, lightCycleTime) {
    return inputFlow * totalCycleTime <= getTotalCarOnGreenCycle(lightCycleTime);
}

// Returns object which shows directions that passed
function verify() {
    let verification = {};
    let totalCycleTime = mi.NS_Green + mi.NS_Left + mi.EW_Green + mi.EW_Left;
    verification.NS_Green = isDirectionValid(mi.NS_rate * (mi.straightFlow > mi.rightFlow ? mi.straightFlow : mi.rightFlow), totalCycleTime, mi.NS_Green);
    verification.NS_Left = isDirectionValid(mi.NS_rate * mi.leftFlow, totalCycleTime, mi.NS_Left);
    verification.EW_Green = isDirectionValid(mi.EW_rate * (mi.straightFlow > mi.rightFlow ? mi.straightFlow : mi.rightFlow), totalCycleTime, mi.EW_Green);
    verification.EW_Left = isDirectionValid(mi.EW_rate * mi.leftFlow, totalCycleTime, mi.EW_Left);
    return verification;
}
function TrafficModel(modelInputs) {
    this.verify = verify;
    init(modelInputs);
}
