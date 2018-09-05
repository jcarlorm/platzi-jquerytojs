
const url = 'https://randomuser.me/api/'
const urlPeliculas = 'https://yts.am/api/v2/list_movies.json?genre=:gen'

async function load(){
	//await

	async function getData(url){
		const response = await fetch(url)
		const data = await response.json()
		return data
	}

	const actionList = await getData(urlPeliculas.replace(':gen' , 'action'))
	const dramaList = await getData(urlPeliculas.replace(':gen' , 'drama'))
	const animationList = await getData(urlPeliculas.replace(':gen' , 'animation'))
	console.log('actionlist' , actionList)
	console.log('actionlist' , dramaList)
	console.log('actionlist' , animationList)
	
}

load()
