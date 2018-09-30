# MVP Blockers
- [ ] Connect/change WiFi config
  - The current solution is to hard code SSID/Key in `wpa_supplicant.conf` when creating the filesystem. This seems very user unfriendly compared to other consumer iot product strategies such as a p2p WiFi connection with a web interface. Imagine changing your network's configuration and then needing to dismantle the Tot Tunes device, connect the SD card to your computer, edit a file, then put it all back together again. Requires too much tech savvy + confidence IMO.
  - Example WiFi Direct config: http://solderandflux.com/2017/02/07/wifi-direct-style-wifi-setup-on-a-raspberry-pi/
  - wpa supplicant config packages: https://www.npmjs.com/package/wirelesser, https://www.npmjs.com/package/wpa_supplicant
- [ ] Add/edit song db
  - Only allows youtube as a source unless you have the tech know-how to copy mp3s to the device.
  - Ditch electron app in favor of built-in web gui?
- [ ] Update software
- [ ] Improve security?
  - Not sure how big of a concern this is... If the device remains connected to the internet, then we should definitely make sure it's locked down.

# Moonshots
- Battery powered version... possible?
- Bluetooth audio

# Dev Happiness
- Shorten device deploy times for faster feedback on real device
  - Idea: Deploy code most likely to change outside the initial binary. This way only js needs to travel to the device, and we rarely update the runtime binary anyway.
- Automate integration tests
- Automate setup from vanilla raspbian to functioning Tot Tunes device
  - Determine minimum set of `apt` packages
  - Script the `systemd` config
