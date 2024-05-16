# Use Node.js base image
FROM node:16

# Set working directory
WORKDIR /server

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy remaining source code
COPY . .

# Expose port
EXPOSE 7071

# Command to run the application
CMD ["npm", "start"]
