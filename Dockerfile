FROM node:18-alpine

COPY ./ ./

RUN yarn install --non-interactive
RUN yarn build

EXPOSE 5000
CMD ["node", "/dist/app.js"]
