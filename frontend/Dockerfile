FROM node:alpine

RUN mkdir -p /app
RUN mkdir -p /app/frontend

WORKDIR /app/frontend

COPY package*.json /app/frontend/

RUN npm install --legacy-peer-deps

COPY . /app/frontend

EXPOSE 3000

CMD ["npm", "start"]
