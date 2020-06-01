var http = require('http')
var polo = require('polo')

module.exports = function server () {
  var apps = polo()
  var state = {}

  var server = http.createServer(function (req, res) {
    if (req.url !== '/') {
      res.writeHead(404)
      res.end()
      return
    }
    var url = `http://${apps.get('hello-http').address}`

    res.end(`
    <html>
      <head><meta charset="utf8"></head>
      <body>
        <p>😮 wow!</p>
        <p>👏 congrats!</p>
        <p>🎉 you're looking at your very own server, <strong><code><a href="${url}">${url}</a></code></strong>!</p>
        ${state.lastMessage ? `<p>📼 ${state.lastMessage}</p>` : ''}
      </body>
    </html>
  `)
  })

  server.listen(0, function () {
    var address = server.address().address
    var port = server.address().port

    apps.put({
      name: 'hello-http',
      port: port
    })

    console.log(`visit: http://${address}:${port}`)
  })

  return function driveServer (message$) {
    message$.subscribe({
      next (message) {
        state.lastMessage = message
      }
    })
  }
}
