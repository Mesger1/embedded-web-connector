#!/bin/bash
NODE_VERSION="v6.3.1"
echo "Install Script for Embedded-Device-Connector starting ..."

if [ "$(node --version)" == "$NODE_VERSION" ] ; then
	echo "node version correct"
else
	echo "Updating node sources.list"
	curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -
fi

echo "Downloading Debian Package"
sudo wget -q https://raw.githubusercontent.com/gerdmestdagh/embedded-device-connector/master/embedded-device-connector-1.0.deb -O embedded-device-connector.deb
echo "Installing Debian Package"
sudo dpkg -i embedded-device-connector.deb
sudo apt-get -y -f install
echo "DONE!!!"
