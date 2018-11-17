const testFiles = [
  require('./test/lib/run')
]

const dependencies = {
  './lib/run': require('./lib/run')
}

testFiles.forEach(test => test(dependencies))
