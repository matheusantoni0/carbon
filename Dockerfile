FROM node:16

WORKDIR /usr/app

COPY package.json ./
COPY .env ./

RUN npm install

COPY . .

EXPOSE ${PORT}

CMD ["npm", "run", "dev"]
