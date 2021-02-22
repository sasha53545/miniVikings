FROM node:14.7.0-alpine3.10 as dev
WORKDIR /app
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install
COPY amplify amplify
COPY public public
COPY src src
CMD ["npm", "run", "start"]

FROM dev as build
RUN npm run build

FROM nginx:stable-alpine as production

COPY --from=build /app/build /usr/share/nginx/html

#RUN rm /etc/nginx/conf.d/default.conf
#COPY nginx.conf /etc/nginx/conf.d

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
