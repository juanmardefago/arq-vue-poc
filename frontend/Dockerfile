FROM mhart/alpine-node:12

RUN npm install -g serve
COPY ./dist /dist

EXPOSE 5000

CMD ["/usr/bin/serve", "/dist/"]
