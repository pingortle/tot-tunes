# Tot Tunes - Music Player For Kids 3+ [WIP]

## Concept
### [Inspiration](https://blog.testdouble.com/posts/2018-02-20-music-cards)
Kids can play their favorite music or learn using advanced talking flash cards. This service ([plus](http://a.co/j8Kgw02) [a few](http://a.co/1Yy2d8M) [goodies](http://a.co/fXV2Fwh)) turns your linux device into a toddler DJ station.

### Coming Soon™
Actually playing music. 😁

## Develop

- `npm install`
- `npm run build`
- `KEYBOARD_DEVICE=<path to a stream of events> node main.js`
  - To see it running without actual events, set `KEYBOARD_DEVICE` to `sample-data.bin`. (`KEYBOARD_DEVICE=sample-data.bin node main.js`)
  - *FIXME*: Since audio playing was added, the instructions above are broken.
    - *WORKAROUND*: Before testing place `13012062.mp3` and `21804289.mp3` in `$CWD/tunes`. You'll also need an executable in your path called `play` which can be called like `play -v 0.2 music.mp3`.

## Deploy

- `npm run deploy` (*FIXME*: server ssh host is not configurable 😬)
