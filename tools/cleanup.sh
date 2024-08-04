existing_container=$(docker ps -q -f name=mysql)

if [ ! -z "$existing_container" ]; then
  echo "Stopping and removing existing MySQL container..."
  docker stop mysql
  docker rm mysql
fi