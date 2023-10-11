const url_string = window.location.href;
const url = new URL(url_string);
const number_of_players = Number(url.searchParams.get("numberofplayers"));


var voter_number_list;
switch (number_of_players) {
  case 5:
    voter_number_list = [2, 3, 2, 3, 3];
    break;
  case 6:
    voter_number_list = [2, 3, 4, 3, 4];
    break;
  case 7:
    voter_number_list = [2, 3, 3, 4, 4];
    break;
  case 8:
  case 9:
    voter_number_list = [3, 4, 4, 5, 5];
    break;
  default:
    // Handle unexpected cases, if necessary
    break;
}

var number_of_games = Number(get_number_of_games(url));

var number_of_voters = voter_number_list[number_of_games];

var heading = document.createElement("h2");
var center = document.createElement("center");
heading.className = "subheader";
heading.innerHTML = "This is round "+(number_of_games +1) +" with "+ +number_of_voters +" voters. Who is voting?";
center.appendChild(heading);
document.body.appendChild(center);


var ul = document.createElement(ul);
ul.className = "voters";

for (var i = 1; i<number_of_players+1; i++){
  var paragraph = document.createElement("p");
  var center = document.createElement("center");
  var li = document.createElement("li");
  li.className = "voteli";
  var boxlabel = document.createElement("label");
  boxlabel.htmlFor = "player" + i;
  boxlabel.innerHTML = "Player " + i;
  box = document.createElement("input");
  box.id = "player" + i;
  box.type = "checkbox";
  li.appendChild(box);
  li.appendChild(boxlabel);
  center.appendChild(li);
  paragraph.appendChild(center);
  ul.appendChild(paragraph);
}
document.body.appendChild(ul);









// for (var i = 1; i<number_of_players+1; i++){ 
//     var paragraph = document.createElement("p");
//     var center = document.createElement("center");
//     var box = document.createElement("label");
//     box.className = "label";
//     box.for = "player" + i;
//     box.id = "player" + i +"name";
//     center.appendChild(box);
//     box = document.createElement("input");
//     box.id = "player" + i;
//     box.type = "checkbox";
//     center.appendChild(box);
//     paragraph.appendChild(center);
//     document.body.appendChild(paragraph);
// }


var submitparagraph = document.createElement("p");
var submitbutton = document.createElement("button");
var center = document.createElement("center");
submitbutton.id = 'button';
submitbutton.className = 'button-28';
submitbutton.onclick = function() {submit()};
submitbutton.innerHTML = "Submit";
center.appendChild(submitbutton);
submitparagraph.appendChild(center);
document.body.appendChild(submitparagraph);






  var c = get_player_names(url);
  console.log(c);
  var v = get_voter_names(url);
  var games_statuses = get_games_statuses(url);
  draw_games_stats_bar(games_statuses);
  for (var i = 0; i < number_of_players; i++) {
  document.getElementById("player"+(i+1)+"name").innerHTML = c[i];
  }


//   for (var i = 1; i < 6; i++) {
//   var game = document.getElementById("game"+i);
//   game.style.left = window.innerWidth - 40*i + "px";
//   game.style.top =  10 + "px";
//     if (games_statuses[i-1] === "success"){
//         game.style.backgroundColor = "green";
//     } else if (games_statuses[i-1] === "failure"){
//         game.style.backgroundColor = "red";
//     }
// }

  var ar = c + v + games_statuses + number_of_games;


  function submit(){
    var votes_given = 0;
    var players = [false,false,false,false,false,false];
    var j = 0;
    for (let i = 0; i < number_of_players; i++){
      var x = i + 1;
      console.log(x + String(document.querySelector('#player'+x).checked));
      players[i] = document.querySelector('#player'+x).checked;
      if (document.querySelector('#player'+x).checked){
        v[j] = c[i];
        j++;
        votes_given++;
        
      }
     }
    console.log(v);
    console.log(votes_given);
    

    if (votes_given === number_of_voters){
        let new_link = construct_new_link("vote.html",c, v, games_statuses, number_of_games);
        console.log(number_of_games);
        console.log(new_link);
        console.log(games_statuses);
        console.log(v);
        console.log(c);
        location.assign(new_link);
        } else {
        alert("Select "+number_of_voters+ " players!");
      }
      }
      
      

  //These are the functions to extract info from the link.
  //URL should have always the following format:
  //*.html?key1=player1name  &key2=player2name  &key3=player3name
  //      &key4=player4name  &key5=player5name  &key6=player6name
  //      &key7=voter1name   &key8=voter2name   &key9=voter3name   &key10=voter4name (if applicable)
  //      &key11=game1status &key12=game2status &key13=game3status &key14=game4status &key15=game5status
  //      &key16=number_of_games
  function get_player_names(url){
    var c = ["","","","","","","",""];
    for (var i = 0; i < number_of_players; i++) {
        console.log(url.searchParams.get("player"+(i+1)));
      c[i] = url.searchParams.get("player"+(i+1));
    }
    console.log(c);
    return c;
  }
  function get_voter_names(url){
    var v= ["","","","",""];//voter names
    for (var i = 0; i < 5; i++) {
      v[i] = url.searchParams.get("voter"+(1+i));
    }
    console.log(v);
    return v;
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


  function draw_games_stats_bar(games_statuses){
    for (var i = 1; i < 6; i++) {
    var the_circle = document.createElement("div");
    the_circle.className = "circle";
    the_circle.id = "game"+i;
  the_circle.style.left = window.innerWidth - 55*i - 50 + "px" ;
  the_circle.style.top =  30 + "px";
    if (games_statuses[i-1] === "success"){
        the_circle.style.backgroundColor = "green";
    } else if (games_statuses[i-1] === "failure"){
        the_circle.style.backgroundColor = "red";
    }
    document.body.appendChild(the_circle);
}
}

draw_games_stats_bar(games_statuses);