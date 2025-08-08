# Base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy project files
COPY . .

# Expose app port
EXPOSE 4000

# Start command (overridden by docker-compose)
CMD ["npm", "start"]
