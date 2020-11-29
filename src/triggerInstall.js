export default ({videoId, appTitle, autoplay, controls}) => {
	window.addEventListener('beforeinstallprompt', (event) => {
		// prevent the default behavior
		event.preventDefault();

		// trigger the prompt
		event.prompt();

		// after the install, push the new page
		event.userChoice.then((choiceResult) => {
			if (choiceResult.outcome === 'accepted') {
				window.history.pushState({}, '', `?videoId=${videoId}&appTitle=${appTitle}&autoplay=${autoplay ? 1 : 0}&controls=${controls? 1 : 0}`)
			} else {
				// prompt was rejected
			}
		});
	});
}
