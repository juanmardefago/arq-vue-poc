FROM node:12

WORKDIR /home/feathers
COPY README.md README.md
COPY package.json package.json
COPY package-lock.json package-lock.json
COPY config/ config/
COPY public/ public/
COPY src/ src/
ENV NODE_ENV 'production'
ENV PORT '3030'

EXPOSE 3030

RUN npm ci --only=production
CMD ["node", "src/index.js"]
