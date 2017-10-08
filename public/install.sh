#!/bin/bash
NODE_VERSION="v6.3.1"
echo "****************************************************************************"
echo "*       Install Script for Embedded-Device-Connector starting ...          *"
echo "****************************************************************************"

echo "********* Step 1 checking node                                     *********"

if [ "$(node --version)" == "$NODE_VERSION" ] ; then
	echo "node version correct"
else
	echo "Updating node sources.list"
	curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
	sudo apt-get --yes --force-yes -qq install nodejs
fi

echo "********* Step 2 checking prerequisites                            *********"
echo "Updating apt-get"
sudo apt-get --yes --force-yes -qq update
echo "Hostapd"
sudo apt-get --yes --force-yes -qq install hostapd
echo "DnsMasq"
sudo apt-get --yes --force-yes -qq install dnsmasq
echo "Git"
sudo apt-get --yes --force-yes -qq install git-all

#echo "Lsb-core"
#sudo apt-get -q install lsb-core


echo "********* Step 3 installing app                                   **********"
sudo npm install https://github.com/gerdmestdagh/embedded-device-connector.git -g


echo "********* Step 4 managing service                                  *********"
sudo cp /usr/lib/node_modules/embedded-device-connector/service/wifi-connector.service /etc/systemd/system/
sudo systemctl enable wifi-connector
sudo systemctl start wifi-connector


SERVICE="wifi-connector";

if ps ax | grep -v grep | grep $SERVICE > /dev/null
then
	echo "$SERVICE service running, everything is fine"
	echo "****************************************************************************"
	echo "*                                 DONE!!!                                  *"
	echo "****************************************************************************"

else
	echo "$SERVICE service failed to start"
	echo "****************************************************************************"
	echo "*                                ERROR!!!                                  *"
	echo "****************************************************************************"
fi   
