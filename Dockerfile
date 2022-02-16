FROM node:12-alpine
WORKDIR /express-boilerplate
COPY . .
RUN npm install --production
CMD ["node", "dist/bin/server.js"]