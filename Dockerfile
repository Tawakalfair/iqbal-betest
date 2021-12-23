FROM node:alpine

RUN mkdir /apps
ADD . /apps
WORKDIR /apps

RUN npm install --quiet

CMD npm start
