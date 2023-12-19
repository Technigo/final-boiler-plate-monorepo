export const CodeForLater = () => {
	const apiKey = 'aff6066a613c698c44985fc4b08d1488'
	const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`
	fetch(url)
		.then((response) => response.json())
		.then((data) => {
			const movieData = data.results

			console.log(movieData)
		})
	return <>HELLO</>
}
