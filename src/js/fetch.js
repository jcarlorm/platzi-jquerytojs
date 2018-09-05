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


const url = 'https://randomuser.me/api/'

$.ajax(url, {
	method: 'GET',
	success: function(data){
		console.log(data)
		
	},
	error: function(error){
		console.error(error)		
	}
})

fetch(url)
	.then( response => {
		return response.json()
	})
	.then(user => {
		console.log( user )
	})
	.catch( error => {
		console.error('fallo')
	})