
var messagesArray = [];  // The messages

var userName = "Guest"; // The current user name
var userIconUrl = "https://upload.wikimedia.org/wikipedia/commons/d/d3/User_Circle.png"; // the current user icon url

function sendNewMessage(newMessage) {
    messagesArray.push(newMessage);
}

function updateMessages() {
    var messagesHtml = buildMessagesHtml();
	divChatBox.innerHTML = messagesHtml; // insert chat divs into the #divChatBox div			
}

function buildMessagesHtml() {
    var messagesHtml = "";

    for (var i=0; i < messagesArray.length; i++) {
        var msg = messagesArray[i];
        var divHtml = "<div class='msgln'><b>" + msg.userName + "</b>: " + msg.messageText + "<br /></div>";
        messagesHtml += divHtml;
    }

    return messagesHtml;
}

function updateCurrentUser() {
    spanUserName.innerHTML = userName;
    userIcon.src = userIconUrl;

    if (isUserSignedIn() == false) {
        pLogin.style.display = "block";
        pLogout.style.display = "none";
        userIcon.style.display = "none";
    } else {
        userIcon.style.display = "block";
        pLogout.style.display = "block";
        pLogin.style.display = "none";    
    }
}

// Returns true if a user is signed-in.
function isUserSignedIn() {
    return userName != "Guest";
}

// DOM event handlers

function onLoginClicked() {
    var newUserName = prompt("User name?");
    if (newUserName) {
        userName = newUserName;
        updateCurrentUser();
    }
}

function onLogoutClicked() {
    userName = "Guest";
    updateCurrentUser();
}

function onSubmitMessageClicked() {
    var messageText = textUserMsg.value.trim();
        
    if (!messageText) {
        return; // do not send empty messages
    }

    var newMessage = { userName: userName, messageText: messageText };
    sendNewMessage( newMessage );		

    textUserMsg.value = "";

    updateMessages(); // show the new message in the chat box
}

// Shortcuts to DOM Elements.
var buttonSubmitMsg = document.getElementById("buttonSubmitMsg");
var textUserMsg = document.getElementById("textUserMsg");
var pLogin = document.getElementById("pLogin");
var pLogout = document.getElementById("pLogout");
var buttonLogin = document.getElementById("buttonLogin");
var buttonLogout = document.getElementById("buttonLogout");
var divChatBox = document.getElementById("divChatBox");
var spanUserName = document.getElementById("spanUserName");
var userIcon = document.getElementsByClassName("userIcon")[0];

buttonSubmitMsg.onclick = onSubmitMessageClicked;
buttonLogin.onclick = onLoginClicked;
buttonLogout.onclick = onLogoutClicked;

updateCurrentUser();

updateMessages();
