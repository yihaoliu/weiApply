#!/bin/bash

npm run dll
npm run build


if [ $1 = 'prod01' ]; then
rsync -rvltOD ./webpack/dist/* ali-krspace-web-01:/data/work/kr-node-proxy/static/
elif [ $1 = 'prod02' ]; then
rsync -rvltOD ./webpack/dist/* ali-krspace-web-02:/data/work/kr-node-proxy/static/
elif [ $1 = 'all' ]; then
rsync -rvltOD ./webpack/dist/* ali-krspace-web-01:/data/work/kr-node-proxy/static/
rsync -rvltOD ./webpack/dist/* ali-krspace-web-02:/data/work/kr-node-proxy/static/
fi
