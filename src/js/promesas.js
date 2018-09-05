console.log('hola mundo!');


const noCambia = "Leonidas";

let cambia = "@LeonidasEsteban"

function cambiarNombre(nuevoNombre) {
  cambia = nuevoNombre
}


const getUser = new Promise( (todoBien, todoMal) => {
	setTimeout( () => {
		todoBien('excedio el tiempo')
	}, 3000);
})

const getUserAll = new Promise( (todoBien, todoMal) => {
	setTimeout( () => {
		todoBien('excedio el tiempo')
	}, 5000);
})


Promise.all([
	getUser,
	getUser
])
.then( message => {
	console.log(message)
})
.catch(message => {
	console.error(message)
})