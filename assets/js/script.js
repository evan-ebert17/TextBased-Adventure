
var menuDiv = document.getElementById("menuscreen");
var mainmenuButton = document.getElementById("start");

var mainTextContentDiv = document.querySelector(".maintext");
var mainTextDiv = document.getElementById("mainholder");
var mainText = document.getElementById("maincontent");

var userText = document.getElementById("textcontent");
var submitText = document.getElementById("submission");

var inventorycontent = document.getElementById("inventory");
var inventoryDiv = document.getElementById("invdiv");
var inventoryButton = document.getElementById("inventorybutton");

var maps = require('.images.js')
var mapDiv = document.getElementById("mapdiv");
var mapContent = document.getElementById("map");
var mapButton = document.getElementById('mapbutton');

let title;
let lastPara;

function createTitle() {
    title = document.createElement('h1');
    title.innerHTML = "Gost"
    var titleffect = document.getElementById('titleffect');
    titleffect.append(title);
}

//this is me trying to stop the submitting text from refreshing the page.
//submitText.addEventListener('submit', function (event) {
    //    event.preventDefault();
    //});
    
mainmenuButton.addEventListener('click', function (event) {
    event.preventDefault();
    menuDiv.innerHTML = '';
    createTitle();
    mainText.textContent = "you wake up in your bed, head slightly aching from last nights saunter through a few local places. as it stands, your name is Daniel and you are a detective. currently, you are on the case of the Michael Derrick gang, a notorius crime syndicate that has been pedaling drugs and alchohol. it is currently bright outside on a sunday afternoon."
})

function hideInv() {
   if(inventorycontent.style.display === "none") {
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
    if(mapContent.style.display === "none") {
        mapContent.style.display = "block";
    } else {
        mapContent.style.display = "none";
    }
 }
 

mapButton.addEventListener('click', function (event) {
    event.preventDefault();
    mapContent = maps.houseMap;
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