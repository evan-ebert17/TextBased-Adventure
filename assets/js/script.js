
var menuDiv = document.getElementById("menuscreen");
var mainmenuButton = document.getElementById("start");

var formEl = document.getElementById('form');
var mainTextContentDiv = document.querySelector(".maintext");
var mainTextDiv = document.getElementById("mainholder");
var mainText = document.getElementById("maincontent");

var userText = document.getElementById("textcontent");
var submitText = document.getElementById("submission");

var inventorycontent = document.getElementById("inventory");
var inventoryDiv = document.getElementById("invdiv");
var inventoryButton = document.getElementById("inventorybutton");

//const maps = require('.images.js');
const houseMap = document.createElement('img');
houseMap.src = "assets/images/roomHouseTest.png";

var mapDiv = document.getElementById("mapdiv");
var mapContent = document.getElementById("map");
var mapButton = document.getElementById('mapbutton');

var pIndex = 0;

var housePrompts = [
    {
        init: "you wake up in your bed, head slightly aching from last nights saunter through a few local places. as it stands, your name is Daniel and you are a detective. currently, you are on the case of the Michael Derrick gang, a notorius crime syndicate that has been pedaling drugs and alchohol. it is currently bright outside on a sunday afternoon.",
        prompts: ["next room", "next room2", "next room3", "nextroom4"],

    },
]

let title;
let lastPara;

function createTitle() {
    title = document.createElement('h1');
    title.innerHTML = "Gost"
    var titleffect = document.getElementById('titleffect');
    titleffect.append(title);
}

function runTopForm() {
    if (formEl.style.display === "none") {
        formEl.style.display = "block";
    } else {
        formEl.style.display = "none";
    }
}

//this is me trying to stop the submitting text from refreshing the page.
submitText.addEventListener('submit', function (event) {
   event.preventDefault();
});

mainmenuButton.addEventListener('click', function (event) {
    event.preventDefault();
    menuDiv.innerHTML = '';
    createTitle();
    runTopForm();
    mainText.textContent = "you wake up in your bed, head slightly aching from last nights saunter through a few local places. as it stands, your name is Daniel and you are a detective. currently, you are on the case of the Michael Derrick gang, a notorius crime syndicate that has been pedaling drugs and alchohol. it is currently bright outside on a sunday afternoon."
})

function hideInv() {
    if (inventorycontent.style.display === "none") {
        inventorycontent.style.display = "block";
    } else {
        inventorycontent.style.display = "none";
    }
}

inventoryButton.addEventListener('click', function (event) {
    inventorycontent.textContent = '';
    event.preventDefault();
    inventorycontent.textContent = "bomb, rope, gun.";
    hideInv();
})

function hideMap() {
    if (mapContent.style.display === "none") {
        mapContent.style.display = "block";
    } else {
        mapContent.style.display = "none";
    }
}

function promptCycling() {
    //when I input text and enter, it takes the input and goes to a positon in the array based on the input
    //additionally, once I am at the new point in the array I can go back and that the position from the array I have choices that I would not have otherwise
    //
    mainText.textContent = "";
    currentPrompt = housePrompts[pIndex];
    questionSection.innerHTML = currentPrompt.question;

}


mapButton.addEventListener('click', function (event) {
    event.preventDefault();
    mapContent.classList.add('.map')
    mapContent.appendChild(houseMap);
    hideMap();
});

function altCommands() {
    if (userText === "help" || userText === "commands") {
        mainText.textContent = '';
        //this is me thinking about appending a paragraph of just help information
        // var commandlist = document.createElement('p');
        // commandlist.classList.add(".smallertext");
        // commandlist.textContent = "Commands:"
        // mainholder.append(commandlist);
        mainText.textContent = "help: displays this page, look: inspects a thing you specify, north/south/west/east: moves you in said direction, talk: talk to a person..."
    }
}