FROM node:alpine

COPY . /opt
WORKDIR /opt/backend/

RUN npm install 
RUN npm install nodemon

CMD npm start