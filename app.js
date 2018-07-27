
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

// DOM event handlers

function onSubmitMessageClicked() {
    var messageText = textUserMsg.value.trim();
        
    if (!messageText) {
        return false; // do not send empty messages
    }

    var newMessage = { userName: userName, messageText: messageText };
    sendNewMessage( newMessage );		

    textUserMsg.value = "";

    updateMessages(); // show the new message in the chat box

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

function onAuthStateChanged(user) {
    if (user) { // User is signed in!
      // Get profile pic and user's name from the Firebase user object.
      userName = user.displayName;
      userIconUrl =  user.photoURL || "";
      // Set the user's profile pic and name.
    //   this.userPic.style.backgroundImage = 'url(' + (profilePicUrl || '/images/profile_placeholder.png') + ')';
    //   this.userName.textContent = userName;
    } else {
        userName = "Guest";
        userIconUrl = "";
    }

    updateCurrentUser();
}

function onLoginClicked() {
    // Sign in Firebase using popup auth and Google as the identity provider.
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
}

function onLogoutClicked() {
    // Sign out of Firebase.
    firebase.auth().signOut();
}

// Returns true if a user is signed-in.
function isUserSignedIn() {
    return !!firebase.auth().currentUser;
}

// Returns the signed-in user's profile Pic URL.
function getProfilePicUrl() {
    return firebase.auth().currentUser.photoURL || '/images/profile_placeholder.png';
}
  
// Returns the signed-in user's display name.
function getUserName() {
    return firebase.auth().currentUser.displayName;
}

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

// Listen to auth state changes.
firebase.auth().onAuthStateChanged(onAuthStateChanged);

onAuthStateChanged();
