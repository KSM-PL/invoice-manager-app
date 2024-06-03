# frontend/Dockerfile

# Use an official node runtime as a parent image
FROM node:20.12.0-alpine3.19

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 5173

# Start the application
CMD ["npm", "run", "dev","--","--host"]
