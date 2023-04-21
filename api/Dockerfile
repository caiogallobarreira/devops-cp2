FROM node:16-alpine

WORKDIR /app
COPY ./package*.json ./
RUN npm install
COPY ./index.js .
EXPOSE 3000
RUN adduser -D dimdim
USER dimdim

CMD ["npm", "start"]