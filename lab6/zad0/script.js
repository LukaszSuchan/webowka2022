counter = 0;
document.getElementById("counter").innerText=counter;

function activateButton() {
    let element = document.getElementById("btn1");
    element.addEventListener("click", increment)
}

function deactivateButton() {
    counter = 0;
    let element = document.getElementById("btn1");
    element.removeEventListener("click", increment)
    document.getElementById("counter").innerText=counter;
}

function increment() {
    counter+=1;
    document.getElementById("counter").innerText=counter;
}