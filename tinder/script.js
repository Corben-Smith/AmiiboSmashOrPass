var smashNumber = 0;
var passNumber = 0;
var index = 0;
var amiibos;
var amiibo;
let smashAmiibos = [];
let passAmiibos = [];
var selectedSeries = "The Legend of Zelda";
const rootURL = "https://www.amiiboapi.com/api/amiibo";


var xhr = new XMLHttpRequest();
var xhrcurrent = new XMLHttpRequest();

function start(){
    xhr.open('GET', rootURL, true);
    xhr.send();
}

xhr.onload = function() {
// Check if the request was successful
if (xhr.status >= 200 && xhr.status < 300) {
    // Parse the response JSON if applicable
    amiibosJSON = JSON.parse(xhr.responseText);
    amiibos = amiibosJSON.amiibo;
    setMonster();
} else {
    // Handle errors
    console.error('Request failed with status:', xhr.status);
}
};

function smashClick(){
    var smashField = document.getElementById("smashField");
    smashNumber++;
    smashAmiibos.push(amiibos[index-1]);
    smashField.innerHTML = smashNumber;
    setMonster();
    updateGrid("smash");
}

function passClick(){
    var passField = document.getElementById("passField");
    passNumber++;
    passAmiibos.push(amiibos[index-1]);
    passField.innerHTML = passNumber;
    setMonster();
    updateGrid("pass");
}

function updateGrid(condition){
    if(condition !== "wipe"){
        let grid = [];
        for (let i = 0; i < 3; i++) {
            grid.push(document.getElementById(condition + "Grid" + (i+1)));   
        }

        let tempindex = 1;
        grid.forEach(element => {
            if(condition === "smash"){
                element.src = smashAmiibos[smashAmiibos.length-tempindex].image;
            }else{
                element.src = passAmiibos[passAmiibos.length-tempindex].image;
            }
            tempindex++;
        });
    }
    else{
        let smashGrid = [];
        let passGrid = [];
        for (let i = 0; i < 3; i++) {
            smashGrid.push(document.getElementById("smashGrid" + (i+1)));   
            passGrid.push(document.getElementById("passGrid" + (i+1)));   
        }
        smashGrid.forEach(element => {
            element.src = "blank.png";
        });
        
        passGrid.forEach(element => {
            element.src = "blank.png";
        });
    }
}


function setMonster(){
    var image = document.getElementById("img");
    var name = document.getElementById("name");

    if(selectedSeries !== "none"){
        while(selectedSeries !== amiibos[index].gameSeries){
            index++;
        }
        image.src =  amiibos[index].image;
        name.innerHTML = amiibos[index].name;
    }
    else{
        image.src =  amiibos[index].image;
        name.innerHTML = amiibos[index].name;
    }
    
    console.log(smashAmiibos)
    index++;
}

function end(){
    
}

function changeSeries(series){
    if(series != "none"){
        var passField = document.getElementById("passField");
        passField.innerHTML = 0;
        var smashField = document.getElementById("smashField");
        smashField.innerHTML = 0;

        selectedSeries = series;
        index = 0;
        smashNumber = 0;
        passNumber = 0;
        smashAmiibos = [];
        passAmiibos = [];
        updateGrid("wipe");
        setMonster();
    }
    else{
        var passField = document.getElementById("passField");
        passField.innerHTML = 0;
        var smashField = document.getElementById("smashField");
        smashField.innerHTML = 0;

        selectedSeries = "none";
        index = 0;
        smashNumber = 0;
        passNumber = 0;
        smashAmiibos = [];
        passAmiibos = [];
        updateGrid("wipe");
        setMonster();
    }
}
