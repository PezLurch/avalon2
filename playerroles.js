//----------------------------\\
//Getting the info from the URL starts here
//----------------------------\\
const url_string = window.location.href;
const url = new URL(url_string);
const number_of_players = Number(url.searchParams.get("numberofplayers"));
const player_names = get_player_names(url);
const voter_names = [];

let games_statuses = ['tbd','tbd','tbd','tbd','tbd'];
let number_of_games = 0;
//----------------------------\\
//Getting the info from the URL ends here
//----------------------------\\


//----------------------------\\
//Create random list of roles starts here
//----------------------------\\
if (number_of_players === 5){
  var roles = ["Merlin", "Good", "Good","Assassin","Bad"];
}
if (number_of_players === 6){
  var roles = ["Merlin", "Good", "Good", "Good","Assassin","Bad"];
}
if (number_of_players === 7){
  var roles = ["Merlin", "Good", "Good", "Good","Assassin","Bad","Bad"];
}
if (number_of_players === 8){
  var roles = ["Merlin", "Good", "Good", "Good","Assassin","Bad","Bad","Bad"];
}
if (number_of_players === 9){
  var roles = ["Merlin", "Good", "Good", "Good","Good","Assassin","Bad","Bad","Bad"];
}
roles.sort(() => Math.random()-0.5);
//----------------------------\\
//Create random list of roles ends here
//----------------------------\\


//----------------------------\\
//Create the fields where players can see their roles starts here
//----------------------------\\
for (var i = 1; i < number_of_players+1; i++){
  var paragraph = document.createElement("p");
  var center = document.createElement("center");
  var button = document.createElement("button");
  button.className = 'button-28';
  button.id = 'button'+i;
  button.onclick = function() {showrole(this.id.slice(-1))};
  center.appendChild(button);
  paragraph.appendChild(center);
  document.body.appendChild(paragraph);
}
for (var i = 0; i < number_of_players; i++) {
  document.getElementById("button"+(i+1)).innerHTML = player_names[i];
}
//----------------------------\\
//Create the fields where players can see their roles ends here
//----------------------------\\


//----------------------------\\
//Create button where players can go to the next page starts here
//----------------------------\\
var paragraph = document.createElement("p");
var center = document.createElement("center");
var button = document.createElement("button");
button.className = 'button-28'
button.onclick = function() {gotovotes()};
button.innerHTML = "Go to votes!";

center.appendChild(button);
paragraph.appendChild(center);
document.body.appendChild(paragraph);
//----------------------------\\
//Create button where players can go to the next page ends here
//----------------------------\\

//----------------------------\\
//Create button where players can go to the start page starts here
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
//Create button where players can go to the start page ends here
//----------------------------\\


//----------------------------\\
//And now all the functions processing stuff.
//----------------------------\\
let new_link = construct_new_link("votenames.html",player_names,voter_names,games_statuses,number_of_games);

function showrole(playernumber){

  if (document.getElementById("button"+playernumber).innerHTML === player_names[playernumber-1]){
    document.getElementById("button"+playernumber).innerHTML = roles[playernumber-1];
  }
  else if (document.getElementById("button"+playernumber).innerHTML === roles[playernumber-1]){
    document.getElementById("button"+playernumber).innerHTML = player_names[playernumber-1];
  }
}

function gotovotes(){
  location.assign(new_link);
}
function go_to_startpage(){
    location.assign('startpage.html');
}

function get_player_names(url){
    var player_names = ["","","","","","","","",""];
    console.log(number_of_players);
    for (var i = 0; i < number_of_players; i++){
      console.log(i);
      console.log(url.searchParams.get("player"+(i+1)));
    player_names[i] = url.searchParams.get("player"+(i+1));
    }
    console.log(player_names);
    return player_names;
    }

function get_voter_names(url){
    var voter_names= ["","","",""];//voter names
    for (var i = 0; i < 4; i++) {
        voter_names[i] = url.searchParams.get("voters"+(1+i));
    }
    return voter_names;
    }
function get_games_statuses() {
    var games_statuses = ["","","","",""];
    for (var i = 0; i < 5; i++) {
        games_statuses[i] = url.searchParams.get("gamesstats"+(1+i));
    }
    return games_statuses;
    }
function get_number_of_games() {
    var number_of_games = url.searchParams.get("numberofgames");
    return number_of_games;
    }


function construct_new_link (next_page,player_names, voter_names, games_statuses, number_of_games) {
  let new_link = next_page;
  new_link = new_link + "?player"+1+"="+player_names[0];
  for (i = 2; i < number_of_players+1; i++){
    new_link = new_link + "&player"+i+"="+player_names[i-1];
  }
  for (i = 1; i < 6; i++){
    new_link = new_link + "&voter"+i+"="+voter_names[i-1];
  }
  for (i = 1; i < 5; i++){
    new_link = new_link + "&gamesstats"+i+"="+games_statuses[i-1];
  }
  new_link = new_link + "&numberofgames="+number_of_games;
  new_link = new_link + "&numberofplayers="+number_of_players;
    return new_link;
  }




