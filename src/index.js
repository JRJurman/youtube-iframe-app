import 'core-js/stable'
import 'regenerator-runtime/runtime'
import { registerHtml, start, useUrlParams } from 'tram-one'
import YoutubeIFrame from './YoutubeIFrame'
import AppGenerator from './AppGenerator'
import './styles.css'
import './layout.css'

const html = registerHtml({
  YoutubeIFrame, AppGenerator
})

const router = () => {
  const {videoId} = useUrlParams()
  if (videoId) {
    return html`<YoutubeIFrame />`
  }
  else {
    return html`<AppGenerator />`
  }
}

start('#app', router)
