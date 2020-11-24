import 'core-js/stable'
import 'regenerator-runtime/runtime'
import { registerHtml, start, useUrlParams } from 'tram-one'
import './styles.css'

const html = registerHtml()

const youtubeIFrame = () => {
  const {videoUrl, appTitle, autoplay=0, controls=1} = useUrlParams()
  return html`
    <div>
      <title>${appTitle}</title>
      <iframe style="width: 100vw; height: 100vh;" src="https://www.youtube.com/embed/${videoUrl}?autoplay=${autoplay}&controls=${controls}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
  `
}

const home = () => {
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
    window.history.pushState({}, '', `?videoUrl=${videoId}&appTitle=${appTitle.value}&autoplay=${autoplay.checked ? 1 : 0}&controls=${controls.checked? 1 : 0}`)
  }

	return html`
    <main>
      <title>Youtube iFrame App</title>
      <header class="introduction">
        <h1>Youtube iFrame App</h1>
        <p>
          In this webapp, you can build a simple page that lets you install an app that is a youtube video.<br/>
          This is great for when you want to make a playlist or live stream a dedicated app.
        </p>
      </header>
      <form class="create-video-form" onsubmit=${goToVideoPage}>

        <label for="videoUrl">Video URL</label>
        <input type="text" id="videoUrl" name="videoUrl" placeholder="https://youtu.be/ or https://www.youtube.com/watch" />

        <label for="appTitle">App Title</label>
        <input type="text" id="appTitle" name="appTitle" placeholder="My Favorite Playlist" />

        <label for="autoplay" class="autoplay-title">Autoplay</label>
        <input type="checkbox" id="autoplay" name="autoplay" />
        <label for="autoplay"class="autoplay-hint">Should the video start as soon as the page is loaded?</label>

        <label for="controls" class="controls-title">Controls</label>
        <input type="checkbox" id="controls" name="controls" />
        <label for="controls" class="controls-hint">Should playback controls be visible on the video?</label>

        <input type="submit" value="Go to Video Page">
      </form>
    </main>
  `
}

const router = () => {
  const {videoUrl} = useUrlParams()
  if (videoUrl) {
    return youtubeIFrame()
  }
  else {
    return home()
  }
}

start('#app', router)
