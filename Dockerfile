FROM node:19-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY prisma ./prisma/

COPY . .

EXPOSE 3000

CMD ["/app/startup.sh"]
