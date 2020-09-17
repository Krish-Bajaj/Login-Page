//None of this code actually works independently over here because it isn't connected to a firebase account but this is kind a rough idea
//of what i've worked in firebase with it. I've also done auth changes and sign up logout stuff.

var auth = firebase.auth();
var db = firebase.firestore(); 
var functions = firebase.functions();

//Creating a database with name Task1
var messagesRef = firebase.database().ref('Task1');

document.getElementById('contactForm').addEventListener('submit',submitForm);

function submitForm(e){
    e.preventDefault();

    var name = contactForm['l_name'].value;
    var email = contactForm['l_email'].value;   //this is the data entered by the user from the login page
    var pass = contactForm['l_password'].value;

    saveMessage(name,email,pass);

    document.getElementById('contactForm').reset(); //resets the form
}

function saveMessage(name,email,pass){
    var newMessageRef = messagesRef.push();
    newMessageRef.set({
          Name : name,
          Email : email,
          Password: pass
    });
} //part which stores the name email and password in a real time database


//LOG IN
document.getElementById('contactForm').addEventListener('submit',submitLoginForm);

function submitLoginForm(e){
    e.preventDefault();

    var name = contactForm['l_name'].value;
    var email = contactForm['l_email'].value;
    var pass = contactForm['l_password'].value;

    auth.signInWithEmailAndPassword(email, pass).then(cred =>         
    { 
        document.querySelector('.l_alert').style.display = 'block';    //this is an alert if the user logs in 
    setTimeout(function(){
        document.querySelector('.l_alert').style.display = 'none';
    },2000);
        // Clearing the form after clicking logging in
         document.getElementById('contactForm').reset();
         loginForm.querySelector('.error').innerHTML = '';
         
      }).catch(err => {
          loginForm.querySelector('.error').innerHTML = err.message;  //displays an error if the login credentials are incorrect
      });
}