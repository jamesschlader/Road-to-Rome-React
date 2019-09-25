# base image
FROM node:12.2.0-alpine

# set working directory
WORKDIR /app
COPY . .

# install and cache app dependencies
COPY package.json /app/package.json
EXPOSE 3000
RUN npm install 
RUN npm audit fix
RUN ls

# start app
CMD ["npm", "start"]
