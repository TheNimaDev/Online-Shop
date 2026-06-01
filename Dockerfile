FROM mirror2.chabokan.net/node:alpine

WORKDIR /app

COPY package*.json .

RUN npm install --registry=https://mirror2.chabokan.net/npm/

COPY . .

RUN chmod +x entrypoint.sh && addgroup -S app && adduser -S app -G app
USER app

ENTRYPOINT [ "./entrypoint.sh" ]
  
CMD ["node", "src/server.js"]