FROM node:18-alpine

WORKDIR /app

COPY . .

RUN npm install --legacy-peer-deps && npm run build

ARG PORT=8000
ENV PORT $PORT
EXPOSE $PORT

CMD ["npm", "run", "start:prod"]