# base image
FROM node:16.10.0

# create & set working directory
WORKDIR /app

# copy source files
COPY package.json .
COPY yarn.lock .

# install dependencies
RUN yarn install

# copy rest of source files
COPY . .

RUN cp .env.sample .env

EXPOSE 3000

# start app
CMD ["yarn", "start"]
