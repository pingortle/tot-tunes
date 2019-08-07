module.exports = function log () {
  return (message$) => message$.addListener({ next: console.log })
}
