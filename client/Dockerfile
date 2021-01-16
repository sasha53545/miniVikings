FROM node:14.7.0-alpine3.10
WORKDIR /app
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install
COPY amplify amplify
COPY public public
COPY src src
CMD ["npm", "run", "start"]
