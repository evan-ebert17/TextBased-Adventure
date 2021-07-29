
var menuDiv = document.getElementById("menuscreen");
var mainmenuButton = document.getElementById("start");
var saveBtn = document.getElementById("savebtn");
var loadBtn = document.getElementById("loadbtn")

var formEl = document.getElementById('form');
var mainTextContentDiv = document.querySelector(".maintext");
var mainTextDiv = document.getElementById("mainholder");
var mainText = document.getElementById("maincontent");

var userText = document.getElementById("textcontent");
var submitText = document.getElementById("submission");

var inventorycontentText = document.getElementById("inventory");
var inventoryDiv = document.getElementById("invdiv");
var inventoryButton = document.getElementById("inventorybutton");

//const maps = require('.images.js');
const houseMap = document.createElement('img');
houseMap.src = "assets/images/roomHouseTest.png";

var mapDiv = document.getElementById("mapdiv");
var mapContent = document.getElementById("map");
var mapButton = document.getElementById('mapbutton');

var savedLocal = localStorage.setItem('save', mainText.textContent)
var loadLocal = localStorage.getItem('save');
//accessing prompts/rooms
//give every prompt in the game a value (1-737);
//when player enters a command they will go to a value and it will pull up the corresponding text box
//to save the game, it just stores this value in localstorage and then whenever player loads, it goes to the last saved value-prompt
let pIndex = 0;
const up = + 2;
const down = - 2;
const left = + 1;
const right = - 1;

var savedArray = [];
var grid = [
    {
        room: 'Bedroom',
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
];

//holds all of the data for the games states, for example, currentMapLocation refers to the position of spaces on the map that are part of a numbered grid,
//so when you hit -8 you have essentially left the house and therefore would need to update the state to "outside" and not "house"
//current location starts at 0 because of the up, left, right, down adding to it to change the value of it so that it can equal roomelVal to target a room description
var currentState = {
    locationState: ['house', 'street', 'work', 'lair'],
    inventory: [''],
    currentMapLocation: [-8, 9, 56],
    currentLocation: 0,
}

//arrays containing all of the items in a given area, change this to by room probably so that on 
//game load you cannot just type "get x" and get it even though you're not in the correct room
var gameItems = {
    house: {
        kitchen: ['medicine', 'plate'],
        bathroom: ['medicine'],
        storage: ['tape', 'rope', 'gun'],
        attic: ['box'],
        livingRoom: ['newspaper', 'matches'],
    }
    ,
    street: {},
    //more later
}

gameItems['house']['kitchen']

var inventorycontent = currentState.inventory;


let lastPara;

let title;
function createTitle() {
    title = document.createElement('h1');
    title.innerHTML = "Gost"
    var titleffect = document.getElementById('titleffect');
    titleffect.append(title);
}

formEl.addEventListener('submit', function (event) {
    console.log(userText.value)
    if (event) {
        event.preventDefault();
    }
    pickedUpItem();
    promptCycling();
    const roomWeRIn = giveMeRoom(roomPos)
    const housePropmptForthisRoom = prompts.housePrompts[roomWeRIn].disc


    userText.value = '';
});

mainmenuButton.addEventListener('click', function (event) {
    event.preventDefault();
    menuDiv.innerHTML = '';
    createTitle();
    runTopForm();
    mainText.textContent = prompts.housePrompts.bedroom.disc;
});

function runTopForm() {
    if (formEl.style.display === "none") {
        formEl.style.display = "block";
    } else {
        formEl.style.display = "none";
    }
}

function hideMap() {
    if (mapContent.style.display === "none") {
        mapContent.style.display = "block";
    } else {
        mapContent.style.display = "none";
    }
}

//function that states if the user types the command get followed by an item inside the room they are in and it is 'get-able'
//they pick it up and the item gets pushed to the inventory up in the currentState object
function pickedUpItem() {
    if (userText.value === `get medicine`) {
        userText.value = `got ${gameItems.house}`
        gameItemsHolder.house[1].push(currentState.inventory);
        console.log(currentState.inventory);
    };
}
//when the inventory button is clicked, if you have nothing it displays "ya got..." otherwise it will display whatever content you have in the inventory array
inventoryButton.addEventListener('click', function (event) {
    event.preventDefault();
    inventorycontent.textContent = '';
    if (inventorycontent.textContent === '' && event) {
        inventorycontentText.textContent = "Ya got nothin', champ."
    } else {
        inventorycontentText.textContent = inventorycontent;
    }
    hideInv();
});

function hideInv() {
    if (inventorycontentText.style.display === "none") {
        inventorycontentText.style.display = "block";
    } else {
        inventorycontentText.style.display = "none";
    }
}

mapButton.addEventListener('click', function (event) {
    event.preventDefault();
    mapContent.classList.add('.map')
    mapContent.appendChild(houseMap);
    hideMap();
    indexCubeChar();
});
//basically the "player", it is a cube (a button element) that will track to the players room, therefore displaying the players location on the map
function indexCubeChar() {
    const indexCubeChar = document.createElement('button');
    if (mapContent.style.display === "block") {
        indexCubeChar.style.backgroundColor = '#90ee90';
        indexCubeChar.style.zIndex = 1;
        mapContent.append(indexCubeChar)
    } else {
        return;
    }
};
//room position
var roomPos = currentState.currentLocation;

function promptCycling() {
    //when I input text and enter, it takes the input and goes to a positon in the array based on the input
    //additionally, once I am at the new point in the array I can go back and that the position from the array I have choices that I would not have otherwise
    //target roomelVal in the object so that when it reads an objects uniqure roomelVal it sets the text content to whatever that objects room: is.

    if (userText.value === `go up`) {
        up += roomPos;
    }
    else if (userText.value === `go down`) {
        down += roomPos;
    }
    else if (userText.value === `go left`) {
        left + roomPos;
        console.log(left + roomPos);
    }
    else if (userText.value === `go right`) {
        right += roomPos;
    }
    else {
        userText.textContent = "that's not a command! type !help for available commands."
    };

    for (let i = 0; i < grid.length; i++) {
        //const selectedArrayPos = currentPrompt[pIndex];
        const roomWeRIn = giveMeRoom(roomPos)
        const itemsForHouse = gameItems['house'][roomWeRIn]

        //const streetPrompts = prompts.street[roomWeRIn].disc

        const housePropmptForthisRoom = prompts.housePrompts[roomWeRIn].disc
        mainText.textContent = housePropmptForthisRoom
        // if (roomPos === currentPrompt.roomelVal) {
        //     mainText.textContent = selectedArrayPos.room;
        // }
    }
};

const prompts = {
    street: {
        mainstreet: {
            disc: "you are on the main road"
        }
    },
    housePrompts: {

        kitchen: {
            names: 'bug',
            props: ' Bug is here oh no!'
        },
        bedroom: {
            disc: 'you wake up in your bed, head slightly aching from last nights saunter through a few local places. as it stands, your name is Daniel and you are a detective. currently, you are on the case of the Michael Derrick gang, a notorius crime syndicate that has been pedaling drugs and alchohol. it is currently bright outside on a sunday afternoon.',
        },
        hallBedroom: {
            disc: 'you are in the hall next to the bedroom'
        }
    }
}

function giveMeRoom(roomPos) {
    let room;

    for (let i = 0; i < grid.length; i++) {


        if (grid[i].roomelVal === roomPos) {
            room = grid[i].room
        }

    }
    return room

}




//this is just whenever you type "help" or "commands", it will bring up a list of all the commands in the game.
function altCommands() {
    if (userText.value === "help" || userText.value === "commands") {
        savedLocal
        mainText.textContent = '';
        //this is me thinking about appending a paragraph of just help information
        mainText.textContent = "help: displays this page, look: inspects a thing you specify, north or up/south or down/west or left/east or right: moves you in said direction, talk: talk to a person... dismiss this by typing OK"
        if (userText.value === "OK" || "ok" || "Ok") {
            mainText.textContent = loadLocal;
        }

    }

}
//save button
saveBtn.addEventListener('click', function (event) {
    event.preventDefault();
    savedLocal;
})
//load button
loadBtn.addEventListener('click', function (event) {
    event.preventDefault();
    lastPara = localStorage.getItem('save');
    mainText.textContent = lastPara;
})