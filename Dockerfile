FROM node:20.14-alpine

WORKDIR /app

COPY package.json /app/
COPY yarn.lock /app/

RUN yarn cache clean \
   rm -rf node_modules \
   yarn install --frozen-lockfile 

COPY . .

EXPOSE 300

CMD ["yarn", "start:dev"]