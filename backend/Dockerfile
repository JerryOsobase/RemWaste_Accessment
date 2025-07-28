FROM node:18
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Copy wait-for-it.sh script to wait for MySQL
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

EXPOSE 5000

# Wait for MySQL on host "mysql" port 3306, then start your app
CMD ["/wait-for-it.sh", "mysql:3306", "--", "node", "server.js"]
