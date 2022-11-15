FROM node:alpine

RUN mkdir -p /app
RUN mkdir -p /app/backend

WORKDIR /app/backend

COPY package*.json /app/backend/

RUN npm install

COPY . /app/backend

EXPOSE 8000

CMD ["npm", "start"]