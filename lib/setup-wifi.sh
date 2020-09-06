#!/usr/bin/env bash

set -euo pipefail

ETC_DIR=/etc/tot-tunes
LIB_SOURCE=???
WPA_SUPPLICANT_FILE=/etc/wpa_supplicant/wpa_supplicant.conf

install_apt_dependencies() {
  apt update
  apt install hostapd
}

install_files() {
  mkdir $ETC_DIR
  tar xf $CONFIG_ARCHIVE -C $ETC_DIR
}

install() {
  install_apt_dependencies
  install_files
}

enable_wifi_direct() {
  
}

uninstall_files() {
  rm -rf $ETC_DIR
}
