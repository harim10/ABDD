// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: "AIzaSyB2qibAv9wBZzB4lfR9ozWecMcyA0RPFRM",
    authDomain: "abdd-d1743.firebaseapp.com",
    projectId: "abdd-d1743",
  });
  
  var db = firebase.firestore();
  function agregar(){
    var curp = document.getElementById('curp').value;
    var nombre = document.getElementById('nombre').value;
    var apellido = document.getElementById('apellido').value;
    var año = document.getElementById('año').value;
    var domicilio = document.getElementById('domicilio').value;
    var municipio = document.getElementById('municipio').value;
  
    console.log(curp, nombre, apellido, año, domicilio, municipio);
     
    db.collection("users").add({
        curp: curp,  
        nombre: nombre,
        apellido: apellido,
        año: año,
        domicilio: domicilio,
        municipio: municipio
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        document.getElementById('curp').value = '';
        document.getElementById('nombre').value = '';
        document.getElementById('apellido').value = '';
        document.getElementById('año').value = '';
        document.getElementById('domicilio').value = '';
        document.getElementById('municipio').value = '';
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
  }


  var tabla = document.getElementById('tabla');

  db.collection("users").onSnapshot((querySnapshot) => {
      tabla.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().curp}`);
        tabla.innerHTML += `
        <tr>
            <th scope="row">${doc.id}</th>
            <td>${doc.data().curp}</td>
            <td>${doc.data().nombre}</td>
            <td>${doc.data().apellido}</td>
            <td>${doc.data().año}</td>
            <td>${doc.data().domicilio}</td>
            <td>${doc.data().municipio}</td>
            <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
            <td><button class="btn btn-warning" onclick="editar('${doc.id}','${doc.data().curp}','${doc.data().nombre}','${doc.data().apellido}','${doc.data().año}','${doc.data().domicilio}','${doc.data().municipio}')">Editar</button></td>
        </tr>
        `
        });
    });
  //borrar datos
    function eliminar(id){
        db.collection("users").doc(id).delete().then(() => {
            console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }

    //editar
    function editar(id, curp, nombre, apellido, año, domicilio, municipio){
        var curp = document.getElementById('curp').value = curp;
        var nombre = document.getElementById('nombre').value = nombre;
        var apellido = document.getElementById('apellido').value = apellido;
        var año = document.getElementById('año').value = año;
        var domicilio = document.getElementById('domicilio').value = domicilio;
        var municipio = document.getElementById('municipio').value = municipio;
        var boton = document.getElementById('boton');
        boton.innerHTML = 'Editar'

        boton.onclick = function(){
            var washingtonRef = db.collection("users").doc(id);

            var curp = document.getElementById('curp').value;
            var nombre = document.getElementById('nombre').value;
            var apellido = document.getElementById('apellido').value;
            var año = document.getElementById('año').value;
            var domicilio = document.getElementById('domicilio').value;
            var municipio = document.getElementById('municipio').value;
            // Set the "capital" field of the city 'DC'
            return washingtonRef.update({
                curp: curp,  
                nombre: nombre,
                apellido: apellido,
                año: año,
                domicilio: domicilio,
                municipio: municipio
            })
            .then(() => {
                console.log("Document successfully updated!");
                boton.innerHTML = 'Agregar'
                document.getElementById('curp').value = '';
                document.getElementById('nombre').value = '';
                document.getElementById('apellido').value = '';
                document.getElementById('año').value = '';
                document.getElementById('domicilio').value = '';
                document.getElementById('municipio').value = '';
            })
            .catch((error) => {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);          
            });
        }
    
    }

   /* function cerrar(){
        firebase.auth().signOut()
        .then(function(){
          console.log("saliendo...");
        })
        .catch(function(error){
          console.log(error)
        })
      }*/