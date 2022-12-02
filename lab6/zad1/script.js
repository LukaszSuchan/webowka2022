let counter = 0;
let stopped = false;

const blok1 = document.getElementById("blok1");
const blok2 = document.getElementById("blok2");
const blok3 = document.getElementById("blok3");

blok1.addEventListener('click', clickPlusOne);
blok2.addEventListener('click', clickPlusThree);
blok3.addEventListener('click', clickPlusFive);
document.getElementById("stop").addEventListener('click', stop);
document.getElementById("reset").addEventListener('click', reset);


function createLog(logText) {
    let logs = document.getElementById("logs");
    let log = document.createTextNode(logText);
    var li = document.createElement("li");
    li.appendChild(log);
    logs.appendChild(li);
}

function clickPlusOne() {
    const i = document.getElementById("counter");
    counter+=1
    i.innerHTML = counter
    createLog("nacisnąłeś szary o wartości 1");
    bounds()
}

function clickPlusThree(event) {
    const i = document.getElementById("counter");
    counter+=3
    i.innerHTML = counter
    createLog("nacisnąłeś czerwony o wartości 3");
    if (stopped) {
        stopBubble(event);
    }
    bounds()
}

function clickPlusFive() {
    const i = document.getElementById("counter");
    counter+=5
    i.innerHTML = counter
    createLog("nacisnąłeś zółty o wartości 5");
    if (stopped) {
        stopBubble(event);
    }
    bounds();
}

function stop() {
    const button = document.getElementById("stop");
    if (stopped){
        stopped = false;
        button.innerHTML = "stop propagation";
    } 
    else {
        stopped = true;
        button.innerHTML = "start propagation";
    }
}

function reset(){
    counter = 0;
    const i = document.getElementById("counter");
    i.innerHTML = counter
    location.reload();
}

function stopBubble(e) {
    if (!e){
        let e = window.event;
    }
    e.cancelBubble = true;
    if (e.stopPropagation) {
        e.stopPropagation();
    }
}

function bounds() {
    if (counter > 30) {
        blok2.removeEventListener('click', clickPlusThree);
    }
    if(counter > 50) {
        blok3.removeEventListener('click', clickPlusFive);
    }
}




    