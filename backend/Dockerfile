FROM node:22-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install the exact locked production graph.
RUN npm ci --omit=dev

# Bundle app source
COPY . .

# Expose the port the app runs on (Back4App expects this, default to 3000)
EXPOSE 3000

# The API does not need root privileges.
USER node
CMD [ "npm", "start" ]
