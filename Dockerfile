FROM node:12.19-slim
RUN apt-get update && apt-get install -y git

WORKDIR /app
COPY package*.json /app/

RUN npm ci --only=production
COPY src/ /app/src/
COPY server.js/ /app/
CMD ["node", "--harmony", "./server" ]





