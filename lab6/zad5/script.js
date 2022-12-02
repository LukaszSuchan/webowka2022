let translateAmount = 100;
let translate = 0;

async function loadSite(){
    var employees = await getEmplyees();
    let i = 1;
    console.log(employees);
    employees.forEach(e => {
        console.log(e);
        writeSlide(i, e);
        i+=1;
    })
    document.getElementById("left").style.visibility = 'hidden';
}

async function getEmplyees() {
    var res = await fetch("employees.json");
    var json = await res.json();
    return json;
}

var pages = []
function writeSlide(id, data) {

    let slider = document.getElementById("slider");
    slider.innerHTML += 
    `
    <div class="slide" id="slide${id}">
    <img id ="photo${id}" src="" alt="employee-photo">
    <p id="name${id}"></p>
    <p id="position${id}"></p>
    <p id="description${id}"></p>
    </div>
`
    var nameElement = document.querySelector("#name" + id);
    var positionElement = document.querySelector("#position" + id);
    var descriptionElement = document.querySelector("#description" + id);
    var imgElement = document.querySelector("#photo" + id);

    var name = data.name;
    var pos = data.position;
    var desc = data.description;
    var img = data.imgSource;
    console.log(data);

    nameElement.textContent = name;
    positionElement.textContent = pos;
    descriptionElement.textContent = desc;
    imgElement.src = "photos/" + img;
    pages.push("slide"+id);
    console.log(pages);
}

loadSite();


function slide(direction) {

    if (-300 < translate && direction === "next") {
        translate -= translateAmount
        document.getElementById("right").style.visibility = 'visible'; 
        document.getElementById("left").style.visibility = 'visible';
        if (translate == -300) {
            document.getElementById("right").style.visibility = 'hidden';
        }
    } 
    else if (translate < 0 && direction === "prev") {
        translate += translateAmount
        document.getElementById("right").style.visibility = 'visible'; 
        document.getElementById("left").style.visibility = 'visible';
        if (translate === 0) {
            document.getElementById("left").style.visibility = 'hidden';
        }
    } 
    pages.forEach(
        page => {
            let pageElement = document.getElementById(page);
            pageElement.style.transform = `translateX(${translate}%)`
        }
    );
}

