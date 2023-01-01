FROM node:15-alpine

WORKDIR /app

# copy package.json and package-lock.json files
COPY package*.json ./

# copy generated prisma files
COPY prisma ./prisma/

# copy env varible
COPY .env ./

# copy tsconfig.json file
COPY tsconfig.json ./

# copy
COPY . .

# install packages
RUN npm install

# generate prisma client
RUN npx prisma generate

# set executable permission for startup.sh script
RUN chmod +x startup.sh


# run and expose the server on port 3000
EXPOSE 5000

# a command to start the server
CMD ["./startup.sh"]
