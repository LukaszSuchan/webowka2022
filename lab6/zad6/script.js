
document.getElementById("a").addEventListener("click", getTop10MostPopularLanguagesBars);
document.getElementById("b").addEventListener("click", getTop10MostUnpopularLanguagesBars);
document.getElementById("c").addEventListener("click", getTop5MostPopularCurrenciesBars);

let languagesCount = 0;
let languageUsage = [];
let currenciesUsage = [];
let lnaguagesArray = [];
countries.forEach(country => country.languages.forEach(language => lnaguagesArray.push(language)));
let currenciesArray = [];
countries.forEach(country => currenciesArray.push(country.currency));
let lanuageIsInStats = lnaguagesArray.filter((x, i, a) => a.indexOf(x) == i);
let currenciesInStats = currenciesArray.filter((x, i, a) => a.indexOf(x) == i);
console.log(lanuageIsInStats);
lanuageIsInStats.forEach(lis => {
    languageUsage.push([lis, 0]);
})
currenciesInStats.forEach(cis => {
    currenciesUsage.push([cis, 0]);
})

function countLanguages(countries) {
    countries.forEach(e => {
        languagesCount+=e.languages.length;
        e.languages.forEach(l => {
            languageUsage.forEach(g => {
                if(g[0] === l){
                    g[1]+=1;
                }
            })
        })
    });
}

function countCurrencies(countries) {
    countries.forEach(e => {
        let currency = e.currency;
        currenciesUsage.forEach(g => {
            if(g[0] === currency) {
                g[1]+=1;
            }
        })
    })
}

countLanguages(countries);
countCurrencies(countries);
console.log(languagesCount);
console.log(languageUsage);
console.log(lanuageIsInStats);

function getTop10MostPopularLanguagesBars(){
    writeBars(getTop10MostPopularLanguages());
}

function getTop10MostUnpopularLanguagesBars(){
    writeBars(getTop10MostUnpopularLanguages());
}

function getTop5MostPopularCurrenciesBars(){
    writeBars(getTop5MostPopularCurrencies());
    document.getElementById("chart").style.height = "250px";
}


function getTop10MostPopularLanguages() {
    return languageUsage.sort(function(a, b) {
        return b[1] - a[1];
    }).slice(0, 10);

}

function getTop10MostUnpopularLanguages() {
    return languageUsage.sort(function(a, b){
        return a[1] - b[1];
    }).slice(0, 10);
}

function getTop5MostPopularCurrencies(){
    return currenciesUsage.sort(function(a, b) {
        return b[1] - a[1];
    }).slice(0, 5);
}

function writeBars(data) {
    var bars = document.getElementById("bars");
    var labels = document.getElementById("labels");
    var counts = document.getElementById("counts");
    let max = data[0][1];
    bars.innerHTML = ``;
    labels.innerHTML = ``;
    counts.innerHTML = ``;
    data.forEach(d => {
        bars.innerHTML+=
        `
        <div class="bar" style="width:${(d[1]/max)*100}%;"></div>
        `;
        labels.innerHTML+=
        `
        <p class="label">${d[0]}</p>
        `;
        counts.innerHTML+=
        `
        <p>${d[1]}</p>`
    })
}

getTop10MostPopularLanguagesBars()