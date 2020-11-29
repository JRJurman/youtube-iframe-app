import { registerHtml } from 'tram-one'
import ServiceWorker from './ServiceWorker'
import addInlineManifest from './addInlineManifest'
import triggerInstall from './triggerInstall'
import './styles.css'

const html = registerHtml({
  ServiceWorker
})

const getVideoIdFromUrl = (videoUrl) => {
  if (videoUrl.includes('youtu.be')) {
    // https://youtu.be/lHLChGEwdwQ
    return videoUrl.split('/').slice(-1)[0]
  }
  else if (videoUrl.includes('youtube.com/watch?v=')) {
    // https://www.youtube.com/watch?v=lHLChGEwdwQ
    return videoUrl.split('?v=').slice(-1)[0]
  }
  else {
    // we couldn't parse it, maybe it was the video id?
    return videoUrl
  }
}

export default () => {
  const addManifestAndInstall = (event) => {
    event.preventDefault()
    const form = event.target
    const {videoUrl, appTitle, autoplay, controls} = form

    const videoId = getVideoIdFromUrl(videoUrl.value)

    addInlineManifest({videoId, appTitle: appTitle.value, autoplay: autoplay.checked, controls: controls.checked})

    // sadly, this line really only works on the published page,
    // so if making changes, you'll just have to test them live
    triggerInstall({videoId, appTitle: appTitle.value, autoplay: autoplay.checked, controls: controls.checked})
  }

	return html`
    <main>
      <ServiceWorker />
      <title>Youtube iFrame App</title>
      <h1>Youtube iFrame App</h1>
      <section class="app-content">
        <p class="introduction">
          Enter a youtube video url to get a dedicated app you can install.<br/>
          This is great for playlists and live streams you want to load natively.
        </p>
        <form class="create-video-form" onsubmit=${addManifestAndInstall}>

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

          <input type="submit" value="Install App">
        </form>
      </section>
    </main>
  `
}
