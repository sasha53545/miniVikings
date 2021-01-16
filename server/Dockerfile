FROM node:15.0.1-alpine3.10
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY models models
COPY routes routes
COPY App.js App.js
COPY config.js config.js
CMD [ "npm", "run", "server" ]
