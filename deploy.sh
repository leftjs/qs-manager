#!/usr/bin/env bash
export NODE_ENV=production
git reset --hard
git pull origin HEAD
npm install
pm2 stop qs-manager-server -f
pm2 start ./server/bin/www -n qs-manager-server -x babel-node
pm2 stop qs-manager-web -f
pm2 start ./server.js -n qs-manager-web -x babel-node