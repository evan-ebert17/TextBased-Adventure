
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

//accessing prompts/rooms
//give every prompt in the game a value (1-737);
//when player enters a command they will go to a value and it will pull up the corresponding text box
//to save the game, it just stores this value in localstorage and then whenever player loads, it goes to the last saved value-prompt
let pIndex = 0;
const up = + 2;
const down = - 2;
const left = + 1;
const right = - 1;

var allPrompts = [];
var housePrompts = [
    {
        init: "you wake up in your bed, head slightly aching from last nights saunter through a few local places. as it stands, your name is Daniel and you are a detective. currently, you are on the case of the Michael Derrick gang, a notorius crime syndicate that has been pedaling drugs and alchohol. it is currently bright outside on a sunday afternoon.",
        roomelVal: 0,
        ifrepeated: 0,
    },
    {
        room: 'this is your bathroom',
        roomelVal: -2,
    },
    {
        room: 'this is bedroom-storage hallway',
        roomelVal: 1,
    },
    {
        room: 'this is your front attic',
        roomelVal: 4,
    },
    {
        room: 'this is your back attic',
        roomelVal: 5,
    },
    {
        room: "storage",
        roomelVal: 2,
    },
    {
        room: "office",
        roomelVal: 0,
        ifrepeated: 5,
    },
    {
        room: "hall office",
        roomelVal: -1,
    },
    {
        room: "hall living",
        roomelVal: -3,
    },
    {
        room: "livingroom",
        roomelVal: -4,
    },
    {
        room: 'this is your kitchen',
        roomelVal: -5,
    },
    {
        room: "front door",
        roomelVal: -6,
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

formEl.addEventListener('submit', function (event) {
    if (event) {
        userText.value = '';
        event.preventDefault();
    }
})

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

let currentPrompt;

function promptCycling() {
    //when I input text and enter, it takes the input and goes to a positon in the array based on the input
    //additionally, once I am at the new point in the array I can go back and that the position from the array I have choices that I would not have otherwise
    currentPrompt = housePrompts[pIndex];
    console.log(currentPrompt[pIndex]);
    mainText.textContent = currentPrompt.room;
    for (let i = 0; i < currentPrompt.length; i++) {
        const element = array[i];

    }

}


mapButton.addEventListener('click', function (event) {
    event.preventDefault();
    mapContent.classList.add('.map')
    mapContent.appendChild(houseMap);
    hideMap();
    indexCubeChar();
});

function altCommands() {
    if (userText === "help" || userText === "commands") {
        mainText.textContent = '';
        //this is me thinking about appending a paragraph of just help information
        // var commandlist = document.createElement('p');
        // commandlist.classList.add(".smallertext");
        // commandlist.textContent = "Commands:"
        // mainholder.append(commandlist);
        mainText.textContent = "help: displays this page, look: inspects a thing you specify, north or up/south or down/west or left/east or right: moves you in said direction, talk: talk to a person..."
    }
}

function indexCubeChar() {
    const indexCubeChar = document.createElement('button');
    if (mapContent.style.display === "block") {
        indexCubeChar.style.backgroundColor = '#90ee90';
        indexCubeChar.style.zIndex = 1;
        mapContent.append(indexCubeChar)
    } else {
        return;
    }
}