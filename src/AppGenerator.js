import 'core-js/stable'
import 'regenerator-runtime/runtime'
import { registerHtml } from 'tram-one'
import './styles.css'

const html = registerHtml()

export default () => {
  const goToVideoPage = (event) => {
    event.preventDefault()
    const form = event.target
    const {videoUrl, appTitle, autoplay, controls} = form
    let videoId = ''
    if (videoUrl.value.includes('youtu.be')) {
      // https://youtu.be/lHLChGEwdwQ
      videoId = videoUrl.value.split('/').slice(-1)[0]
    }
    else if (videoUrl.value.includes('youtube.com/watch?v=')) {
      // https://www.youtube.com/watch?v=lHLChGEwdwQ
      videoId = videoUrl.value.split('?v=').slice(-1)[0]
    }
    else {
      // we couldn't parse it, maybe it was the video id?
      videoId = videoUrl.value
    }
    window.history.pushState({}, '', `?videoId=${videoId}&appTitle=${appTitle.value}&autoplay=${autoplay.checked ? 1 : 0}&controls=${controls.checked? 1 : 0}`)
  }

	return html`
    <main>
      <title>Youtube iFrame App</title>
      <h1>Youtube iFrame App</h1>
      <section class="app-content">
        <p class="introduction">
          Enter a youtube video url to get a dedicated app you can install.<br/>
          This is great for playlists and live streams you want to load natively.
        </p>
        <form class="create-video-form" onsubmit=${goToVideoPage}>

          <label for="videoUrl" class="title">Video URL</label>
          <input type="text" id="videoUrl" name="videoUrl" placeholder="https://youtu.be/ or https://www.youtube.com/watch" />

          <label for="appTitle" class="title">App Title</label>
          <input type="text" id="appTitle" name="appTitle" placeholder="My Favorite Playlist" />

          <label for="autoplay" class="autoplay-title title">Autoplay</label>
          <input type="checkbox" id="autoplay" name="autoplay" />
          <label for="autoplay"class="autoplay-hint hint">Should the video immediately start?</label>

          <label for="controls" class="controls-title title">Controls</label>
          <input type="checkbox" id="controls" name="controls" />
          <label for="controls" class="controls-hint hint">Should there be visible playback controls?</label>

          <input type="submit" value="Go to Video Page">
        </form>
      </section>
    </main>
  `
}
