
const url = 'https://randomuser.me/api/'
const urlPeliculas = 'https://yts.am/api/v2/list_movies.json?genre=:gen'

const BASE_API = 'https://yts.am/api/v2/'

async function load(){
	//await

	const $actionContainer = document.querySelector('#action')
	const $dramaContainer = document.querySelector('#drama')
	const $animationContainer = document.querySelector('#animation')

	const $featuringContainer = document.querySelector('#featuring')
	const $form = document.querySelector('#form')
	const $home = document.querySelector('#home')



	const $modal = document.getElementById('modal')
	const $overlay = document.getElementById('overlay')
	const $hideModal = document.getElementById('hide-modal')

	const $modalTitle = $modal.querySelector('h1')
	const $modalImage = $modal.querySelector('img')
	const $modalDescription= $modal.querySelector('p')

	function setAttributes($element, attributes){
		for (const attribute in attributes) {
			$element.setAttribute(attribute , attributes[attribute])
		}
	}

	$form.addEventListener('submit' ,async (event) => {
		event.preventDefault()
		$home.classList.add('search-active')
		const $loader = document.createElement('img')
		setAttributes($loader, {
			src: 'src/images/loader.gif',
			height:50,
			width: 50
		})
		$featuringContainer.append($loader)

		const data = new FormData($form)
		const { data: { movies: pelis } } = await getData(`${BASE_API}list_movies.json?LIMIT=1&query_term=${data.get('name')}`)
		if(pelis){
			const HTMLString = featuringTemplate(pelis[0])
			$featuringContainer.innerHTML = HTMLString
		} else{ 
			$loader.remove()
			$home.classList.remove('search-active')
			throw new Error('No se encontro la pelicula')
		}
	})

	function featuringTemplate(peli)
	{
		return(
		`<div class="featuring">
			<div class="featuring-image">
				<img src="${peli.medium_cover_image}" width="70" height="100" alt="">
			</div>
			<div class="featuring-content">
				<p class="featuring-title">Pelicula encontrada</p>
				<p class="featuring-album">${peli.title}</p>
			</div>
		</div>`)
	}

	function videoItemTemplate(movie, category) {
		return (
			`<div class="primaryPlaylistItem" data-id="${movie.id}"  data-category="${category}">
				<div class="primaryPlaylistItem-image">
					<img class="fadeIn" src="${movie.medium_cover_image}">
				</div>
					<h4 class="primaryPlaylistItem-title">
					${movie.title}
				</h4>
			</div>`
		)
	}

	function renderMovie(movie, $container, category)
	{
		$container.innerHTML += videoItemTemplate(movie, category)
	}

	function renderMovieList(list, $container, category)
	{
		$container.children[0].remove()
		list.forEach( movie => renderMovie(movie, $container, category) );
		[].forEach.call($container.children, child => addEventClick(child) )

	}

	async function getData(url){
		const response = await fetch(url)
		const data = await response.json()
		return data
	}

	async function cacheExist(category) {
		const listName = `${category}List`
		const cacheList = window.localStorage.getItem(listName)
		if (cacheList) {
			return JSON.parse(cacheList)
		}
		const {data: { movies: data}}  =  await getData(urlPeliculas.replace(':gen' , category))
		localStorage.setItem(listName , JSON.stringify(data) )
		return data
	}

	const actionList = await cacheExist('action')
	renderMovieList(actionList , $actionContainer, 'drama')

	const dramaList = await cacheExist('drama')	
	renderMovieList(dramaList , $dramaContainer, 'drama')

	const animationList = await cacheExist('animation')	
	renderMovieList(animationList , $animationContainer, 'animation')
	

	function addEventClick($element){

		$element.addEventListener('click' , () => {
			showModal($element)
		})
	}

	function showModal($element){
		$overlay.classList.add('active')
		$modal.style.animation = 'modalIn .8s forwards'
		const id = $element.dataset.id
		const category = $element.dataset.category
		const data = findMovie(id, category)
		$modalTitle.textContent = data.title
		$modalImage.setAttribute('src', data.medium_cover_image)
		$modalDescription.textContent = data.description_full
	}

	function findMovie(id, category)
	{
		switch (category) {
			case 'action':
					return findById( actionList,id) 
			case 'drama':
					return findById( dramaList,id) 
			default: 
					return findById( animationList ,id) 

		}
	}

	function findById(list , id)
	{
		return list.find( (movie) => movie.id === parseInt(id, 10))
	}

	$hideModal.addEventListener('click' , hideModal)

	function hideModal(){
		$overlay.classList.remove('active')
		$modal.style.animation = 'modalOut .8s forwards'
	}
	
}

load()
