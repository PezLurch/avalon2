//----------------------------\\
//Get the number of players from the url starts here
//----------------------------\\
const url_string = window.location.href;
const url = new URL(url_string);
const number_of_players = Number(url.searchParams.get("numberofplayers"));
//----------------------------\\
//Get the number of players from the url ends here
//----------------------------\\



//----------------------------\\
//Create the input fields for the player names starts here
//----------------------------\\
for (var i = 1; i < number_of_players + 1; i++){
  var paragraph = document.createElement("p");
  paragraph.className = 'center';
  var inputfield = document.createElement("input");
  inputfield.className = "textbox";
  inputfield.id = "text" + i;
  inputfield.type = "text";
  inputfield.placeholder = "Player "+i;
  inputfield.value = "Playerine "+i;
  paragraph.appendChild(inputfield);
  document.body.appendChild(paragraph);
  }
//----------------------------\\
//Create the input fields for the player names ends here
//----------------------------\\


//----------------------------\\
//Create submit button starts here
//----------------------------\\
var paragraph = document.createElement("p");
var button = document.createElement("button");
paragraph.className = 'center';
button.className = 'button-28';
button.role = 'button';
button.id = 'button';
button.onclick = function() {submit()};
button.innerHTML = "Submit";
paragraph.appendChild(button);
document.body.appendChild(paragraph);
//----------------------------\\
//Create submit button ends here
//----------------------------\\

//----------------------------\\
//Create button to go back to startpage starts here
//----------------------------\\
var paragraph = document.createElement("p");
var center = document.createElement("center");
var button = document.createElement("button");
button.className = 'button-28'
button.onclick = function() {go_to_startpage()};
button.innerHTML = "Choose other number of players";
center.appendChild(button);
paragraph.appendChild(center);
document.body.appendChild(paragraph);
//----------------------------\\
//Create button to go back to startpage ends here
//----------------------------\\



//----------------------------\\
//Function that is called when the submit button is pressed starts here
//----------------------------\\
function submit(){
    let new_link = "playerroles.html?player1="+document.getElementById("text1").value
    for (i = 2; i < number_of_players +1; i++){
        new_link = new_link + "&player"+i+"=" + document.getElementById("text"+i).value;
    } 
    new_link = new_link + "&numberofplayers=" + number_of_players;
    location.assign(new_link);
    }
    function go_to_startpage(){
  location.assign('startpage.html');
}
//The link that is created looks like this (if there are 6 players):
// ../avalon2/playerroles.html?player1=Playerine%201
//                           &player2=Playerine%202
//                           &player3=Playerine%203
//                           &player4=Playerine%204
//                           &player5=Playerine%205
//                           &player6=Playerine%206
//                           &numberofplayers=6
//This link contains the player names and the number of players
//----------------------------\\
//Function that is called when the submit button is pressed ends here
//----------------------------\\