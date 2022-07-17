<h1>Nginx Docker-Compose Challenge</h1>

<h3>FullCycle Platform</h3>

To run the application just execute:

```
docker-compose up -d
```

It will download the images of the node app, nginx proxy server and mysql

Then just access http://localhost:8080 and it will call the nginx server which will proxy pass to the node app at por 3000.


