
FROM node:16


WORKDIR /server.js


COPY package*.json ./
RUN npm install --production


COPY . .


EXPOSE 8080


CMD ["npm", "start"]
