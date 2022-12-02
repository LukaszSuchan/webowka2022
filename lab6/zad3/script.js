let template = `<table id="table1">
<tr>
    <th>City</th>
    <th>Township</th>
    <th>Province</th>
    <th>Area</th>
    <th>People</th>
    <th>Density</th>
</tr>
</table>`

let template2 = 
`
<table id="table2">
<tr>
    <th>Odpowiedz</th>
    <th>Liczba powyzej 80K</th>
    <th>Liczba poniżej 80k</th>
</tr>
</table>
`

let template3 = 
`
<table id="table3">
<tr>
    <th>Średnia powierzchnia miast zaczynających się na 'P'</th>
</tr>
</table>
`

let template4 = 
`
<table id="table4">
<tr>
    <th>Odpowiedz</th>
    <th>Liczba miast powyżej 5k</th>
</tr>
</table>
`

document.getElementById("malopolska").addEventListener("click", getMalopolskaCities)
document.getElementById("two-a").addEventListener("click", getCitiesWithDoubleA)
document.getElementById("5th-density").addEventListener("click", getFifthOfDensityCity)
document.getElementById("add-city-sufix").addEventListener("click", getAllCitiesOverMillion)
document.getElementById("compare").addEventListener("click", getCitiesCountOver80K)
document.getElementById("avg-area").addEventListener("click", getAvgAreaCitiesStartedWithP)
document.getElementById("reply").addEventListener("click", getCountPomorskieOver5K)

async function getMalopolskaCities(){
    let response = await fetch('http://localhost:3000/cities')
    .then(res => res = res.json())
    .then(citiesFromMalopolska);
    display(response);

}

async function getCitiesWithDoubleA(){
    let response = await fetch('http://localhost:3000/cities')
    .then(res => res = res.json())
    .then(doubleACities);
    display(response);
}

async function getFifthOfDensityCity(){
    let response = await fetch('http://localhost:3000/cities')
    .then(res => res = res.json())
    .then(fifthMostDenseCity);
    display(response);
}

async function getAllCitiesOverMillion(){
    let response = await fetch('http://localhost:3000/cities')
    .then(res => res = res.json())
    .then(addSufixToCities);
    display(response);
}

async function getCitiesCountOver80K(){
    let response = await fetch('http://localhost:3000/cities');
    let allCities = await response.json();
    let over80KCount = await fetch('http://localhost:3000/cities')
    .then(res => res = res.json())
    .then(count80kCities);

    over80K = over80KCount.length
    console.log(allCities.length)
    below80K = allCities.length - over80K;
    let answer = "Powyżej 80k";
    if(below80K > over80K){
        answer = "Poniżej 80k";
    }

    const display = document.getElementById("display");
    display.innerHTML += template2;
    table = document.getElementById("table2");
    table.innerHTML +=
    `
    <tr>
        <td>${answer}</td>
        <td>${over80K}</td>
        <td>${below80K}</td>
    </tr>
    `
}

async function getAvgAreaCitiesStartedWithP() {
    let citiesStartedWithP = await fetch('http://localhost:3000/cities')
    .then(res => res = res.json())
    .then(getPCities);
    let avg = parseFloat(getAverageArea(citiesStartedWithP)).toFixed(2);

    const display = document.getElementById("display");
    display.innerHTML += template3;
    table = document.getElementById("table3");
    table.innerHTML +=
    `
    <tr>
        <td>${avg} km^2</td>
    </tr>
    `
}

async function getCountPomorskieOver5K(){
    let pomorskieCities = await fetch('http://localhost:3000/cities')
    .then(res => res = res.json())
    .then(citiesFromPomorskie);

    let over5K = pomorskieCities.filter(value => value.people > 5000).length;

    let answer = "NIE"
    if(pomorskieCities.length == over5K) {
        answer = "TAK";
    }

    const display = document.getElementById("display");
    display.innerHTML += template4;
    table = document.getElementById("table4");
    table.innerHTML +=
    `
    <tr>
        <td>${answer}</td>
        <td>${over5K}</td>
    </tr>
    `
}

function display(cities) {
    const display = document.getElementById("display");
    display.innerHTML += template;
    table = document.getElementById("table1");
    table.innerHTML += addCities(cities);
}

function citiesFromMalopolska(cities){
    return cities.filter(value => value.province == "małopolskie");
}
function doubleACities(cities) {
    let regex = RegExp(/^([b-z]||[ęóąśłżźćń])*a([b-z]||[ęóąśłżźćń])*a([b-z]||[ęóąśłżźćń])]*$/i);
    return cities.filter(value => regex.test(value.name));
}
function fifthMostDenseCity(cities) {
    cities.sort( (city2, city1) => city1.density - city2.density);
    return cities.slice(4,5);
}
function addSufixToCities(cities) {
    let bigCities = cities.filter(value => value.people > 100000);
    bigCities.forEach(city => city.name += ' City');
    return bigCities;
}
function count80kCities(cities) {
    return cities.filter(value => value.people > 80000);
}
function getPCities(cities){
    let regex = RegExp(/^p.*$/i);  
    return cities.filter(value => regex.test(value.name))
}

function citiesFromPomorskie(cities){
    return cities.filter(value => value.province === 'pomorskie')
}

function getAverageArea(cities) {
    let cnt = 0;
    cities.forEach(city => cnt += city.area)
    return cnt / cities.length;
}

function addCities(cities) {
    let template = '';
    cities.forEach(city => {
        template += 
        `
        <tr>
            <td>${city.name}</td>
            <td>${city.township}</td>
            <td>${city.province}</td>
            <td>${city.area}</td>
            <td>${city.people}</td>
            <td>${city.density}</td>
        </tr>
        `
    });
    return template;

}