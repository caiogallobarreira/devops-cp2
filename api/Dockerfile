FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY ./package*.json ./

# Install the dependencies
RUN npm install

# Copy the application source code
COPY ./index.js .

# Expose the API port
EXPOSE 3000

# Create a new user to run the NodeJS server
RUN adduser -D dimdim
USER dimdim

# Start the NodeJS server
CMD ["npm", "start"]