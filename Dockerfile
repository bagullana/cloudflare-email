FROM node:21.4.0-slim

RUN apt-get update && apt-get install -y git python-is-python3 make g++ libc++1

WORKDIR /site

COPY package.json .

COPY setup.sh /usr/bin

RUN chmod u+x /usr/bin/setup.sh

ENTRYPOINT /usr/bin/setup.sh
