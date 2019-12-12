FROM node:12

WORKDIR /home/feathers
COPY README.md README.md
COPY package.json package.json
COPY package-lock.json package-lock.json
COPY config/ config/
COPY public/ public/
COPY src/ src/
COPY newrelic.js newrelic.js
ENV PORT '3030'

EXPOSE 3030

RUN npm i
CMD ["node", "src/index.js"]
