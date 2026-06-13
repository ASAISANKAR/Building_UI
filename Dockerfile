# Stage 1: Build the React 19 application
FROM node:22-alpine AS builder
WORKDIR /app

# Copy package configuration files
COPY package*.json ./

# Install dependencies strictly according to package-lock.json
RUN npm ci

# Copy the rest of the application files
COPY . .

# Build the production assets (typically outputs to /app/dist for Vite)
RUN npm run build

# Stage 2: Serve the built static assets using Nginx
FROM nginx:1.27-alpine

# Remove default Nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy built assets from the builder stage to Nginx web root
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 to access the application
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
