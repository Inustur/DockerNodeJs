# Use the official Node.js image as our base image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the npm packages in the container
RUN npm install

RUN npm add express

RUN npm add body-parser

# Copy the rest of the application code into the container
COPY . .

# Expose the port the app runs on
ENV PORT=8080

EXPOSE 8080

# The command to run the application
CMD ["node", "server.js"]
