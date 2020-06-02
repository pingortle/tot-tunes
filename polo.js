var polo = require('polo')
var apps = polo()

apps.once('up', (name, service) => {
  console.log(`service ${name} discovered…`)
  console.log(apps.get(name))
  console.log(`http://${service.address}`)
  process.exit(0)
})
