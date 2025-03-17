FROM node:20.18.1

WORKDIR /usr/app

COPY package*.json ./

RUN npm ci

COPY . .

CMD ["npm", "run", "develop"]