const URL = 'https://localhost:7103/api/';

// this is to login
export function login(usuario,pass){
    let dato = {usuario:usuario,pass:pass}; 
    // esta es la llamada
    return fetch(URL + 'autenticacion', {
        method : 'POST',  // metodo http
        body : JSON.stringify(dato), // forma de envio de datos
        headers : {
            'Content-Type' : 'application/json'
        }
    })
    .then(data => data.text()) // recibimos los datos 
}

// this is to get the students of the teacher

export function getStudent(usuario){
    return fetch (URL+'alumnoProfesor?usuario='+usuario, { // pasamos la url de la api mas el usuario
        headers : {
            'Content-Type' : 'application/json'
        }
    })
    .then(data => data.json()) // formateamos en json
}

// this is to add new student

export function createStudent(student){

    let data = {dni:student.dni,nombre:student.nombre,direccion:student.direccion,edad:student.edad,email:student.email};//definimos los datos para el body

    return fetch (URL+'insertarYmatricular?id_asig='+student.asignatura,{
        method : 'POST',
        body : JSON.stringify(data),
        headers : {
            'Content-Type' : 'application/json'
        }
    })
    .then(data => data.text()); // como devuelve un bool parseamos a text
}

// delete student

export function deleteStudent(id){
    return fetch (URL+'eliminarAlumno?id='+id,{
        method : 'DELETE',
        headers : {
            'Content-Type' : 'application/json'
        }
    })
    .then(data => data.text());
}

// this is to get student

export function getStudentDetails(id){
    return fetch(URL+'datosAlumno?id='+id,{
        method : 'GET', // get for default
        headers : {
            'Content-Type' : 'application/json'
        }
    })
    .then(data => data.json());
}

//edit student

export function editStudent(student){
    return fetch(URL+'actualizarAlumno',{
        method : 'PUT',
        body: JSON.stringify(student),
        headers : {
            'Content-Type' : 'application/json'
        }
    })
    .then(data => data.text());
}

// get califications from students with id matricula

export function getCalifications(id){
    return fetch(URL+'getCalificaciones?matriculaID='+id,{
        headers : {
            'Content-Type' : 'application/json'
        }
    })
    .then(data => data.json());
}

// new calification
 export function postCalification(calification,id){

    let datos = {descripcion:calification.descripcion,nota:calification.nota,porcentaje:calification.porcentaje,matriculaId:id};

    return fetch(URL+'postCalificacion',{
        method : 'POST',
        body : JSON.stringify(datos),
        headers : {
            'Content-Type' : 'application/json'
        }
    })
    .then(data => data.text());
 }

 //this is to delete calification
 export function deleteCalification(id){
    return fetch (URL+'deleteCalificacion?id='+id,{
        method : 'DELETE',
        headers : {
            'Content-Type' : 'application/json'
        }
    })
    .then(data => data.text());
 }