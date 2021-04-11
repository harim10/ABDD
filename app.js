// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyB2qibAv9wBZzB4lfR9ozWecMcyA0RPFRM",
    authDomain: "abdd-d1743.firebaseapp.com",
    projectId: "abdd-d1743",
    storageBucket: "abdd-d1743.appspot.com",
    messagingSenderId: "918734501334",
    appId: "1:918734501334:web:b7ba0305dc2faf8c30e077"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  function registrar(){
        console.log("Click en Registrar");

        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((user) => {
                // Signed in
                // ...
                verificar();
                console.log("Usuario Registrado...");
            })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
        console.log(errorCode);
        console.log(errorMessage);
    });
  }

  function verificar(){
    var user = firebase.auth().currentUser;
    user.sendEmailVerification().then(function() {
      // Email sent.
      console.log("Email enviado....");
    }).catch(function(error) {
      // An error happened.
      console.log("Error al mandar Email...");
    });
  }

  function ingreso(){

    var emailI = document.getElementById('emailI').value;
    var passwordI = document.getElementById('passwordI').value;

    console.log("entrando...");
    firebase.auth().signInWithEmailAndPassword(emailI, passwordI)
    .then((userCredential) => {
    console.log("entró");
    var user = userCredential.user;
    //window.location='crud';
    var contenido = document.getElementById('contenido');
    contenido.innerHTML = `
    
    <a href="crud.html" class="btn btn-primary btn-lg active" role="button" aria-pressed="true">Todo correcto! click para continuar</a>
    `;
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
  });
  }

  function observador(){
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("hay usuario activo");
        //aparece();
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var displayName = user.displayName;
        var email = user.email;

        console.log(emailverified);
        
        var emailverified = user.emailverified;
        var uid = user.uid;
        var providerData = user.providerData;    
        // ...
      } else {
        console.log("no hay usuario activo");
        // User is signed out
        // ...
      }
    });

  }
  observador();

  /*function aparece(){
    var contenido = document.getElementById('contenido');
    window.location='';
    contenido.innerHTML = `
    <a href="index.html" class="btn btn-secondary btn-lg active" role="button" aria-pressed="true">Salir</a>
    `;
  }*/