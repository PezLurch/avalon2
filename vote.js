//----------------------------\\

//Get infos from link starts here. 
//The link always has this form:

//vote.html?player1=Player%201&player2=Player%202&player3=Player%203&player4=Player%204

//&player5=Player%205&player6=Player%206&player7=Player%207&player8=Player%208&player9=Player%209

//&voter1=Player%203&voter2=Player%204&voter3=Player%205&voter4=undefined&voter5=undefined

//&gamesstats1=tbd&gamesstats2=tbd&gamesstats3=tbd&gamesstats4=tbd

//&numberofgames=0

//&numberofplayers=9
//----------------------------\\


var url_string = window.location.href;
var url = new URL(url_string);

var number_of_players = Number(get_number_of_players(url));
var number_of_games = Number(get_number_of_games(url));
var c = get_player_names(url);
var number_of_voters = get_number_of_voters(number_of_players, number_of_games);
var v = get_voter_names(url);
var games_statuses = get_games_statuses(url);


//----------------------------\\
//Get infos from link stops here.
//----------------------------\\



//----------------------------\\
//Draw the elements on the page starts here: the stats bar and the vote buttons.
//----------------------------\\

draw_games_stats_bar(games_statuses);
create_vote_buttons(number_of_voters);

//----------------------------\\
//Draw the elements on the page ends here: the stats bar and the vote buttons.
//----------------------------\\


//----------------------------\\
//Function that gets number of voters from number of players and number of games starts here
//----------------------------\\


function get_number_of_voters(number_of_players, number_of_games){
if (number_of_players === 5){
  var voter_number_list = [2,3,2,3,3]
  }
  if (number_of_players === 6){
    var voter_number_list = [2,3,4,3,4]
    }
  if (number_of_players === 7){
      var voter_number_list = [2,3,3,4,4]
      }
  if (number_of_players === 8){
    var voter_number_list = [3,4,4,5,5]
  }
  if (number_of_players === 9){
    var voter_number_list = [3,4,4,5,5]
  }
  return voter_number_list[number_of_games];
}

//----------------------------\\
//Function that gets number of voters from number of players and number of games ends here
//----------------------------\\



//----------------------------\\
//Vote processing starts here.
//----------------------------\\
var the_votes = {};
for (var i = 0; i < number_of_voters+1; i++) {
  the_votes["player"+(i+1)] = "novote";
}

var success = 'success';
var failure = 'failure';
function succ_or_fail(i,success_or_failure){
  alert("Hi "+v[i-1]+"! You voted "+success_or_failure+"!");
  the_votes["player"+(Number(i))] = success_or_failure;
}


//----------------------------\\
//Vote processing ends here.
//----------------------------\\


//----------------------------\\
//Function called on submit to process everything and go to next page starts here. 
//----------------------------\\

function seeresults(){
    all_voted = true;
    var counter = 0;
    for (key in the_votes){
      counter += 1;
        if (the_votes[key] === "novote" && counter < number_of_voters+1){
            all_voted = false;
        }
    }
    if (all_voted === false){
        alert("Not everybody voted! Try again!");
    } else {
        number_success = 0;
        number_failure = 0;
        for (key in the_votes){
            if (the_votes[key] === success){
                number_success = number_success + 1;
            } else if (the_votes[key] === failure){
                number_failure = number_failure + 1;
            }
        }
        if (number_failure === 0){
          games_statuses[number_of_games] = "success";
          var new_circle = document.getElementById("game"+(number_of_games+1));
          new_circle.style.backgroundColor = "green";   
          draw_games_stats_bar(games_statuses);
            alert("Success! Everybody voted success!");
            
            number_of_games += 1;
            
            var next_page = construct_new_link("votenames.html",c, v, games_statuses, number_of_games);
        location.assign(next_page);
        } else {
          games_statuses[number_of_games] = "failure";
          var new_circle = document.getElementById("game"+(number_of_games+1));
          new_circle.style.backgroundColor = "red";          
            alert("Failure! There were " + number_failure +
        " votes for failure and " + number_success +" votes for success!");
        
        number_of_games += 1;
        
        var next_page = construct_new_link("votenames.html",c, v, games_statuses, number_of_games);
        location.assign(next_page);
        } 
    }
    }

//----------------------------\\
//Function called on submit to process everything and go to next page ends here. 
//----------------------------\\



//----------------------------\\
//Functions to extract info from the link start here.
//----------------------------\\


function get_player_names(url){
    var c = ["","","","","","","","",""];
    for (var i = 0; i < number_of_players + 1; i++) {
      c[i] = url.searchParams.get("player"+(i+1));
    }
    return c;
}

  function get_voter_names(url){
    var v= [];//voter names
    for (var i = 0; i < number_of_voters; i++) {
      v[i] = url.searchParams.get("voter"+(1+i));
    }
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

  function get_number_of_players() {
    var number_of_players = url.searchParams.get("numberofplayers");
    return number_of_players;
  }


//----------------------------\\
//Functions to extract info from the link end here.
//----------------------------\\



//----------------------------\\
//Functions to create link for the next page starts here.
//----------------------------\\

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
    
var wins = 0;
var looses = 0;
for (x in games_statuses) {
    if (games_statuses[x] === "success"){
        wins +=1;
    }
    if (games_statuses[x] === "failure"){
        looses +=1;
    }
}
if (wins > 2){
  alert("Game won!");
    return "startpage.html"
}
if (looses > 2){
  alert("Game lost!");
    return "startpage.html"
}
    return new_link;
  }

//----------------------------\\
//Functions to create link for the next page ends here.
//----------------------------\\



//----------------------------\\
//Functions to draw stats bar and vote buttons start here. 
//----------------------------\\


  function draw_games_stats_bar(games_statuses){
    for (var i = 1; i < 6; i++) {
    var the_circle = document.createElement("div");
    the_circle.className = "circle";
    the_circle.id = "game"+i;
  the_circle.style.left = window.innerWidth - 55*i - 50 + "px";
  the_circle.style.top =  10 + "px";
    if (games_statuses[i-1] === "success"){
        the_circle.style.backgroundColor = "green";
    } else if (games_statuses[i-1] === "failure"){
        the_circle.style.backgroundColor = "red";
    }
    document.body.appendChild(the_circle);
}
  }


  function create_vote_buttons(number_of_voters){
    var paragraph = document.createElement("p");
    var center = document.createElement("center");
    let h1element = document.createElement("h1");
    h1element.className = "header";
    h1element.textContent = "Vote "+ (number_of_games+1) + " with " + number_of_voters +" voters!";
    center.appendChild(h1element);
    paragraph.appendChild(center);
    document.body.appendChild(paragraph);
    for (var i=1; i<number_of_voters+1; i++){
    var paragraph = document.createElement("p");
    var center = document.createElement("center");
    var h2element = document.createElement("h2");
    h2element.className = "subheader";
    h2element.id = "voter"+(i+1);
    h2element.textContent = "Vote of " + v[i-1];
    var paragraph = document.createElement("p");
    // Create the first button (Success)
    var buttonSuccess = document.createElement("button");
    buttonSuccess.className = "button-succ";
    buttonSuccess.id = "buttonsuccess"+i;
    buttonSuccess.textContent = "Success";
    buttonSuccess.onclick = function() {
        succ_or_fail(this.id.slice(-1), "success");
    };
    // Create the second button (Failure)
    var buttonFailure = document.createElement("button");
    buttonFailure.className = "button-fail";
    buttonFailure.id = "buttonfailure"+i;
    buttonFailure.textContent = "Failure";
    buttonFailure.onclick = function() {
        succ_or_fail(this.id.slice(-1), "failure");        
    };
    // Append the buttons to the paragraph element
    
    // Append the paragraph to the document body (or any other element you prefer)
    center.appendChild(h2element);
    document.body.appendChild(center);
    var center = document.createElement("center");
    
    center.appendChild(buttonSuccess);
    center.appendChild(buttonFailure);
    paragraph.appendChild(center);
    document.body.appendChild(paragraph);
    }
    var paragraph = document.createElement("p");
    var center = document.createElement("center");
    var buttonresult = document.createElement("button");
    buttonresult.className = "button-28";
    buttonresult.id = 'button';
    buttonresult.onclick = function(){seeresults()};
    buttonresult.textContent = "See results!"
    center.appendChild(buttonresult);
    paragraph.appendChild(center);
    document.body.appendChild(paragraph);
}

//----------------------------\\
//Functions to draw stats bar and vote buttons end here. 
//----------------------------\\