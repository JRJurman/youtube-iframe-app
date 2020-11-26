import { registerHtml, useUrlParams } from 'tram-one'

const html = registerHtml()

export default () => {
  const {appTitle} = useUrlParams()
  const manifest = JSON.stringify({
    name: appTitle,
    short_name: appTitle,
    description: `Youtube iFrame App - ${appTitle} - https://youtube-iframe-app.surge.sh/`,
    icons: [
      {
        "src": "/youtube-iframe-app-favicon.svg",
        "sizes": "32x32 48x48 72x72 96x96 128x128 256x256"
      },
    ],
    display: "fullscreen",
    theme_color: "#bdd"
  })
  return html`
    <link rel="manifest" href='data:application/manifest+json,${manifest}' />
  `
}
