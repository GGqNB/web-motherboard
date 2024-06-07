#!/bin/bash

export NVM_DIR=$HOME/.nvm;
source $NVM_DIR/nvm.sh;

nvm use --lts && npm run build && \
sudo rm -rf /var/www/html/* && sudo cp -r dist/spa/* /var/www/html/
