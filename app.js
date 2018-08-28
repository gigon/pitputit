
var messagesArray = [];  // The messages

var userName = "Guest"; // The current user name
var userIconUrl = "https://upload.wikimedia.org/wikipedia/commons/d/d3/User_Circle.png"; // the current user icon url

function sendNewMessage(newMessage) {
    messagesArray.push(newMessage);
}

function displayMessages() {
    var messagesHtml = buildMessagesHtml();
	divChatBox.innerHTML = messagesHtml; // insert chat divs into the #divChatBox div			
}

function buildMessagesHtml() {
    var messagesHtml = "";

    for (var i=0; i < messagesArray.length; i++) {
        messagesHtml += buildMessageHtml(messagesArray[i]);
    }

    return messagesHtml;
}

function buildMessageHtml(msg) {
    var messageHtml = "<div class='msgln'><b>" + msg.userName + "</b>: " + msg.messageText + "<br /></div>";
    return messageHtml;
}

function insertMessageHtml(msg) {
    divChatBox.innerHTML += buildMessageHtml(msg);
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
    return false;
}

function onLogoutClicked() {
    userName = "Guest";
    updateCurrentUser();
    return false;
}

function onSubmitMessageClicked() {
    var messageText = textUserMsg.value.trim();
        
    if (!messageText) {
        return false; // do not send empty messages
    }

    var newMessage = { userName: userName, messageText: messageText };
    sendNewMessage(newMessage);		

    textUserMsg.value = "";

    insertMessageHtml(newMessage); // show the new message in the chat box

    return false;
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

//------------------------------------------------------------------
// Firebase
//

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDTO5k3aS-mOZCSA2PJ1w8Eakn91xwtdg4",
    authDomain: "pitputit-6af13.firebaseapp.com",
    databaseURL: "https://pitputit-6af13.firebaseio.com",
    projectId: "pitputit-6af13",
    storageBucket: "",
    messagingSenderId: "849608190982"
};
firebase.initializeApp(config);

var messagesRef = firebase.database().ref('messages');

// Load existing messages and listen for new ones
var loadMessages = function() {
    messagesRef.once('value', function(snap) {
        var messagesObj = snap.val();
        messagesArray = flatten(messagesObj);
        displayMessages();
    });

    messagesRef.on('child_added', function(snap) {
        insertMessageHtml(snap.val()); // show the new message in the chat box
    })
};
  
var flatten = function(obj) {
    var arr = [];
    for (prop in obj) {
        arr.push(obj[prop]);
    }
    return arr;
}

//
// Firebase
//------------------------------------------------------------------

updateCurrentUser();

loadMessages();
