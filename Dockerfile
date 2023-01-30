FROM node:alpine

RUN apk --no-cache add \
    python3 \
    make \
    g++ \
    libc6-compat

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY package-lock.json /usr/src/app

RUN npm ci --omit=dev

COPY . /usr/src/app

RUN mkdir /usr/src/app/key

COPY ./Keypair6Delta.ppk /usr/src/app/key

RUN chown -R node:node .


#ENV URI_RABBITMQ='amqp://guest:guest@rabbitmq-service.oih-dev-ns.svc.cluster.local'
ENV URI_RABBITMQ='amqp://guest:guest@rabbitmq-service.oih.svc.cluster.local'

USER node

ENTRYPOINT ["node", "./node_modules/@openintegrationhub/ferryman/runGlobal.js"]
