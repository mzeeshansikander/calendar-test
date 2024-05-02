FROM node:18-alpine

WORKDIR /app

COPY . .

RUN npm install --legacy-peer-deps && npm run build

RUN npm install -g serve

ARG PORT=8080
ENV PORT $PORT
EXPOSE $PORT

CMD serve -s build -l $PORT