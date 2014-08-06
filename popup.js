var History = chrome.extension.getBackgroundPage().History;

function listHistory() {
    var index,
        text = "<ul>";
    for (index = 0; index < History.length; index++) { // for every item in History, loop through
        text = text + "<li>" + History[index] + "</li>"; // add an 'li' for bullet point
    }
    text = text + "</ul>"; // end list with 'ul'
    document.getElementById("historyItems").innerHTML = text; // show text in historyItems DIV
}

if (History.index === 0) {
    document.getElementById("historyItems").innerHTML = "You have not recently searched for anything"; // if empty, display messsge
}

listHistory();