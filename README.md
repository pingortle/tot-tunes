# Tot Tunes - A Music Player for Tiny Tots

## Concept 🤔
### [Inspiration](https://blog.testdouble.com/posts/2018-02-20-music-cards)
Kids can play their favorite music or learn using advanced talking flash cards. This service ([plus](http://a.co/cCXmWU7) [a few](http://a.co/1Yy2d8M) [goodies](http://a.co/fXV2Fwh)) turns your linux device into a toddler DJ station.

## Play 🔊🎶 👶

- Run `bin/yt-import <youtube url> <keycard id>` to download a youtube video, convert it to MP3 and copy it to the Tot Tunes device for playback.
- Swipe your new music card.
- Enjoy your Tot Tunes!

## Develop 🎞

- `brew bundle`
- `npm install`
- testing (requires `13012062.mp3` and `21804289.mp3` in `$PWD/tunes`)
  - macOS: `npm test`
  - other: `KEYBOARD_DEVICE=<path to a stream of events> node main.js` (requires `play` in path, with an API like `play -v 0.2 music.mp3`)
  - To see it running without actual events, set `KEYBOARD_DEVICE` to `sample-data.bin`. (`KEYBOARD_DEVICE=sample-data.bin node main.js`)
  - *FIXME*: Since audio playing was added, the instructions above are broken.
    - *WORKAROUND*: Before testing place `13012062.mp3` and `21804289.mp3` in `$PWD/tunes`. You'll also need an executable in your path called `play` which can be called like `play -v 0.2 music.mp3`. `afplay` works for macOS. A shim is available in the project `bin` directory, so a command like `PATH=$PATH:bin KEYBOARD_DEVICE=sample-data.bin node main.js` should work.

## Deploy 🛳

- `npm run build && npm run deploy` (*FIXME*: server ssh host is not configurable 😬)
  - deploy script depends on a `systemd` service called `tot-tunes.service`

### Example `systemd` Config

`$ cat /etc/systemd/system/tot-tunes.service`⤵️
```
[Unit]
Description=Tot Tunes

[Service]
User=pi
ExecStart=/usr/local/bin/tot-tunes
Type=simple
Restart=always

[Install]
WantedBy=multi-user.target
```

### Example `tot-tunes` Service Script

`$ cat /home/pi/tot-tunes`⤵️

```
#!/bin/sh

KEYBOARD_DEVICE=/dev/input/by-id/usb-Sycreader_USB_Reader_08FF20150112-event-kbd
TUNES_DIRECTORY=/home/pi/tunes
/home/pi/tot-tunes
```

In this example the `tot-tunes` binary is located at `/home/pi/tot-tunes`.

### MP3 Player

| OS                  | Install Command                      |
|---------------------|--------------------------------------|
| Raspbian            | `apt-get install sox libsox-fmt-mp3` |

#### Note: Sound on the Raspberry Pi Zero

To get the USB speaker working, I had to do quite a bit of digging. The winning combination seems to be configuring ALSA to use the usb audio interface by default and using the SoX player.
