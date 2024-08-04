#!/bin/bash

# clean up
echo "#############################################################"
echo "This script need docker desktop installed"
echo "Begin to setup MySQL container and create test user data..."
echo "#############################################################"
echo ""
existing_container=$(docker ps -q -f name=mysql)

if [ ! -z "$existing_container" ]; then
  echo "Stopping and removing existing MySQL container..."
  docker stop mysql
  docker rm mysql
fi

# Start a MySQL container
docker run --name mysql -e MYSQL_ROOT_PASSWORD=1234 -p 3306:3306 -d mysql:latest

# Wait for MySQL to be fully initialized
echo "Waiting for MySQL to initialize..."
sleep 10

# Create a new database and users
docker exec -i mysql mysql -uroot -p1234 <<EOF
CREATE DATABASE eastside;
FLUSH PRIVILEGES;
EOF
echo "DONE"

echo "Preparing all tables"
npx prisma migrate dev --name init
echo "DONE"

docker exec -i mysql mysql -uroot -p1234 <<EOF
USE eastside;
INSERT INTO User (id, username, first_name, last_name) VALUES ("1234", 'place_holder', 'foo', 'bar');
FLUSH PRIVILEGES;
EOF

echo ""
echo "#######################################################################################"
echo "MySQL setup complete. Database 'eastside' is setup with username: root, password: 1234"
echo "Make sure to configure mysql URL to be mysql://root:1234@localhost:3306/eastside"
echo "User for test with id '1234', username 'place_holder', first_name 'foo', last_name 'bar' is created."
echo "#######################################################################################\n"
echo ""