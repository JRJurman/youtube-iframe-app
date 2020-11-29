import { registerHtml } from 'tram-one'

const html = registerHtml()

export default ({videoId, appTitle, autoplay, controls}) => {
  const iframeParams = `?videoId=${videoId}&appTitle=${appTitle}&autoplay=${autoplay ? 1 : 0}&controls=${controls? 1 : 0}`

  const svgIconHref = document.querySelector('link[type="image/svg+xml"]').href
  const pngIconHref = document.querySelector('link[type="image/png"]').href
  const manifest = JSON.stringify({
    name: appTitle,
    short_name: appTitle,
    start_url: `https://youtube-iframe-app.surge.sh/${iframeParams}`,
    description: `Youtube iFrame App - ${appTitle} - https://youtube-iframe-app.surge.sh/`,
    icons: [
      {
        src: svgIconHref,
        sizes: "150x150"
      },
      {
        src: pngIconHref,
        sizes: "512x512"
      }
    ],
    display: "fullscreen",
    theme_color: "rgb(187, 119, 119)"
  })
  const manifestDom = html`
    <link rel="manifest" href='data:application/manifest+json,${manifest}' />
  `
  document.head.append(manifestDom)
}
