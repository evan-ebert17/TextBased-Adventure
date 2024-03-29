
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

var userInputMessages = document.getElementById('userInputMessages');
var userinputDiv = document.getElementById('userInputMessagesDiv');

var inventorycontentText = document.getElementById("inventory");
var inventoryDiv = document.getElementById("invdiv");
var inventoryButton = document.getElementById("inventorybutton");

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
const directions = {
    up: + 5,
    down: - 5,
    left: + 1,
    right: - 1,
}

var up = directions.up;
var down = directions.down;
var left = directions.left;
var right = directions.right;

var grid = [
    {
        room: 'bedroom',
        roomelVal: 0,
    },
    {
        room: 'bathroom',
        roomelVal: -5,
    },
    {
        room: 'bedroomStorageHallway',
        roomelVal: 1,
    },
    {
        room: 'frontAttic',
        roomelVal: 7,
    },
    {
        room: 'backAttic',
        roomelVal: 8,
    },
    {
        room: "storage",
        roomelVal: 2,
    },
    {
        room: "office",
        roomelVal: -3,
    },
    {
        room: "hallOffice",
        roomelVal: -4,
    },
    {
        room: "hallLiving",
        roomelVal: -9,
    },
    {
        room: "livingRoom",
        roomelVal: -10,
    },
    {
        room: 'kitchen',
        roomelVal: -11,
    },
    {
        room: "frontDoor",
        roomelVal: -15,
    },
];

const prompts = {
    street: {
        mainstreet: {
            disc: "you are on the main road"
        }
    },
    housePrompts: {

        kitchen: {
            disc: 'your kitchen'
        },
        bedroom: {
            disc: 'you wake up in your bed, head slightly aching from last nights saunter through a few local places. as it stands, your name is Daniel and you are a detective. currently, you are on the case of the Michael Derrick gang, a notorius crime syndicate that has been pedaling drugs and alchohol. it is currently bright outside on a sunday afternoon.',
        },
        bedroomStorageHallway: {
            disc: 'you are in the hall next to the bedroom'
        },
        bathroom: {
            disc: 'this is your bathroom, there is a bottle of medicine on the shelf.'
        },
        frontAttic: {
            disc: 'this is the front portion of your attic'
        },
        backAttic: {
            disc: 'and this is the back portion.'
        },
        storage: {
            disc: 'you are in a storage room in your house'
        },
        office: {
            disc: 'you are in your home office.'
        },
        hallOffice: {
            disc: 'you are in the hallway in between your home office and... more hallway!'
        },
        hallLiving: {
            disc: 'you are in the hall that leads out to your living room'
        },
        livingRoom: {
            disc: 'this is your living room.'
        },
        frontDoor: {
            disc: 'you are at the front door.'
        },
    }
}


//holds all of the data for the games states, for example, currentMapLocation refers to the position of spaces on the map that are part of a numbered grid,
//so when you hit -8 you have essentially left the house and therefore would need to update the state to "outside" and not "house"
//current location starts at 0 because of the up, left, right, down adding to it to change the value of it so that it can equal roomelVal to target a room description
var currentState = {
    locationState: ['house', 'street', 'work', 'lair'],
    inventory: [''],
    //-8 = you're on the street
    currentMapLocation: [-20, 9, 56],
    currentLocation: [0],
    lastLocation: [],
}

var lastPos = currentState.lastLocation;

function checkLastPosLength() {
    if (lastPos.length > 1 && userText.value !== 'back') {
        lastPos.shift();
    }
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

var roomPos = currentState.currentLocation;
let reducedArray;

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
    event.preventDefault();
    if (userText.value === '') {
        return;
    } else {

        if (userText.value === 'help' || userText.value === 'commands') {
            altCommands()
        }
        if (userText.value === 'get') {
            pickedUpItem();
        }
        checkLastPosLength();
        search();
        promptCycling();
        errorHandling();
        const roomAreIn = giveMeRoom(roomPos)
        const housePromptForThisRoom = prompts.housePrompts[roomAreIn].disc

        mainText.textContent = housePromptForThisRoom;
        console.log(lastPos)

        userText.value = '';
    }
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
function timer() {

    var timer = setInterval(function () {
        var sec = 2;
        sec--;
        userInputMessages.className = "timer";
        if (sec < 0) {
            clearInterval(timer);
            userInputMessages.style.visibility = 'hidden';
        }
         else {
            return;
        }
    }, 1000);
    userinputDiv.append(userInputMessages);
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
    if (document.querySelector(".map") !== null) {
        hideMap();
        indexCubeChar();
    }
    else {
        mapContent.classList.add('.map')
        mapContent.appendChild(houseMap);
        hideMap();
        indexCubeChar();
    }
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

function commandCheck() {
    if (userText.value !== `help` || `command` || `commands` || `inventory` || `map`) {
        console.log('help');
        userInputMessages.textContent= `that's not a command! type !help for available commands.`
        timer();
    }
}
function back() {
    if (lastPos[0] === 'up' && userText.value === 'back' || userText.value === 'go back') {
        roomPos.push(-5 + roomPos[0])
    }
    if (lastPos[0] === 'down' && userText.value === 'back' || userText.value === 'go back') {
        roomPos.push(+5 + roomPos[0])
    }
    if (lastPos[0] === 'left' && userText.value === 'back' || userText.value === 'go back') {
        roomPos.push(-1 + roomPos[0])
    }
    if (lastPos[0] === 'right' && userText.value === 'back' || userText.value === 'go back') {
        roomPos.push(+1 + roomPos[0])
    }
}
function promptCycling() {
    //when I input text and enter, it takes the input and goes to a positon in the array based on the input
    //additionally, once I am at the new point in the array I can go back and that the position from the array I have choices that I would not have otherwise
    //target roomelVal in the object so that when it reads an objects uniqure roomelVal it sets the text content to whatever that objects room: is.

    if (userText.value === `go up` || userText.value === `up` || userText.value === `go north` || userText.value === `north`) {
        up + roomPos[0];
        roomPos.push(up + roomPos[0])
        reducedArray;
        lastPos.push('up');
    }
    else if (userText.value === `go down` || userText.value === `down` || userText.value === `go south` || userText.value === `south`) {
        down + roomPos[0];
        roomPos.push(down + roomPos[0])
        reducedArray;
        lastPos.push('down');
    }
    else if (userText.value === `go left` || userText.value === `left` || userText.value === `go west` || userText.value === `west`) {
        left + roomPos[0];
        roomPos.push(left + roomPos[0])
        reducedArray;
        lastPos.push('left');
    }
    else if (userText.value === `go right` || userText.value === `right` || userText.value === `go east` || userText.value === `east`) {
        right + roomPos[0];
        roomPos.push(right + roomPos[0])
        reducedArray;
        lastPos.push('right');
    } else if (userText.value === `go back` || `back`) {
        back();
    } else {
        userText.textContent = "that's not a command! type !help for available commands."
    };

    for (let i = 0; i < grid.length; i++) {
        //roomAreIn uses the function giveMeRoom to find out what room we are currently in (string)
        reducedArray = roomPos.reduce((a, b) => (1 * a) + (1 * b));
        const roomAreIn = giveMeRoom(reducedArray);
        const itemsForHouse = gameItems['house'][roomAreIn];

        //const streetPrompts = prompts.street[roomAreIn].disc

        const housePromptForThisRoom = prompts.housePrompts[roomAreIn].disc
        if (housePromptForThisRoom == undefined) {
            housePromptForThisRoom = null;
            userInputMessages.textContent = 'fhqwhagads';
        }
        // if (roomPos === currentPrompt.roomelVal) {
        //     mainText.textContent = selectedArrayPos.room;
        // }
    }
};


function giveMeRoom(roomPos) {
    let room;

    for (let i = 0; i < grid.length; i++) {
        if (grid[i].roomelVal === reducedArray) {
            room = grid[i].room
        }
    }
    console.log(room)
    return room
}

function search() {
    if(userText.value === "search") {
        console.log("google")
    }
}

function errorHandling() {
    const roomAreIn = giveMeRoom(reducedArray);
    if (prompts.housePrompts[roomAreIn].disc == null) {
        console.log('help') //userText.value = "you ran into a wall, fool"
        return;
    }
    //else if(prompts.street[roomAreIn].disc === undefined) {
    //     userText.value = "you ran out of street, fool"
    //     return;
    // }
}

//this is just whenever you type "help" or "commands", it will bring up a list of all the commands in the game.
function altCommands() {
    //savedLocal
    console.log('what the fuck is happening')
    mainText.textContent = '';
    mainText.textContent = "help: displays this page, look: inspects a thing you specify, north or up/south or down/west or left/east or right: moves you in said direction, talk: talk to a person... dismiss this by typing OK"
    if (userText.value === "OK" || "ok" || "Ok") {
        //mainText.textContent = lastPos[1];
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
});
