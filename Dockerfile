FROM node

WORKDIR /app

COPY . .
# COPY . /app

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]