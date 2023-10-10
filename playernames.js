var url_string = window.location.href;
var url = new URL(url_string);
var number_of_players = Number(url.searchParams.get("numberofplayers"));
console.log(number_of_players);


for (var i = 1; i < number_of_players + 1; i++){
  var paragraph = document.createElement("p");
  var centering = document.createElement("center");
    var inputfield = document.createElement("input");
    inputfield.className = "textbox";
    inputfield.id = "text" + i;
    inputfield.type = "text";
    inputfield.placeholder = "Player "+i;
    //inputfield.value = "Player "+i;
    centering.appendChild(inputfield);
    paragraph.appendChild(centering);
    document.body.appendChild(paragraph);
  }



var paragraph = document.createElement("p");
var center = document.createElement("center");
var button = document.createElement("button");
button.className = 'button-28';
button.role = 'button';
button.id = 'button';
button.onclick = function() {submit()};
button.innerHTML = "Submit";
center.appendChild(button);
paragraph.appendChild(center);
document.body.appendChild(paragraph);

var paragraph = document.createElement("p");
var center = document.createElement("center");
var button = document.createElement("button");
button.className = 'button-28'
button.onclick = function() {go_to_startpage()};
button.innerHTML = "Choose other number of players";

center.appendChild(button);
paragraph.appendChild(center);
document.body.appendChild(paragraph);


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