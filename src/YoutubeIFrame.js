import { registerHtml, useUrlParams } from 'tram-one'
import addInlineManifest from './addInlineManifest'
import ServiceWorker from './ServiceWorker'

const html = registerHtml({
  ServiceWorker
})

export default () => {
  const {videoId, appTitle, autoplay=0, controls=1} = useUrlParams()
  addInlineManifest({videoId, appTitle, autoplay, controls})

  return html`
    <div class="youtubeIFrame">
      <title>${appTitle}</title>
      <ServiceWorker />
      <iframe style="width: 100vw; height: 100vh;" src="https://www.youtube.com/embed/${videoId}?autoplay=${autoplay}&controls=${controls}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
  `
}
