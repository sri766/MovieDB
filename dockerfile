FROM node:12.18.3-alpine3.12

WORKDIR /app

COPY package*.json ./

RUN ["npm","install"]

COPY . .

ENV PORT=3000

EXPOSE 8080

CMD ["npm","start"]