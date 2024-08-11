FROM node:20.16.0-bookworm

WORKDIR /app

COPY package.json package-lock.json .

RUN npm install

EXPOSE 4321

CMD ["/usr/bin/bash"]
