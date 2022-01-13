FROM node:latest

# Create the bot's directory
RUN mkdir -p /usr/src/komucrawl
WORKDIR /usr/src/komucrawl

COPY package.json /usr/src/komucrawl
RUN npm install

COPY . /usr/src/komucrawl

# Start the bot.
CMD ["node", "sharder.js"]