import { registerHtml, useEffect } from 'tram-one'
import './styles.css'

const html = registerHtml()

export default () => {
	useEffect(() => {
		if ('serviceWorker' in navigator) {
			navigator.serviceWorker.register('/sw.js', {
				scope: '.'
			}).then((registration) => {
				console.log('Service worker registration succeeded:', registration);
			}, /*catch*/ function(error) {
				console.log('Service worker registration failed:', error);
			});
		} else {
			console.log('Service workers are not supported.');
		}
	})

  return html`
    <div />
  `
}
