# process of deploying app on AWS using NGINX

- Signup on AWS
- Launch an instance
- chmod 400 <secret>.pem
- ssh -i "DevTinder-secret.pem" ubuntu@ec2-63-176-98-196.eu-central-1.compute.amazonaws.com
- Install node version 20.16.0 (same as your local machine)
- git clone
- Front End
  - npm install -> install dependancies
  - npm run build
  - sudo apt dupdate
  - sudo apt install nginx
  - sudo systemctl start nginx
  - sudo systemctl enable nginx
  - copy code from dist(build files) to /var/www/html/
  - sudo scp -r dist/\* /var/www/html/
  - enable port 80 of your instance
- backend
  - allowed ec2 instance public ip to mongodb server
  - install pm2 -g for keep running server all the time
  - pm2 start npm --name "devtinder-backend" -- start
  - pm2 logs
  - pm2 list, pm2 flush <name>, pm2 stop <name>, pm2 delete<name>
  - config nginx - /etc/nginx/sites-available/default
  - restart nginx - sudo systemctl restart nginx
  - modify the BASE_URL in frontend to '/api'

# nginx config

Frontend = http://63.176.98.196/
Backend = http://63.176.98.196:3000/

Domain name: devtinder.com => 63.176.98.196

Frontend = devtinder.com
Backend = devtinder.com:3000 => devtinder.com/api

server_name 63.176.98.196;

location /api/ {
proxy_pass http://localhost:3000/;
proxy_http_version 1.1;
proxy_set_header Upgrade $http_upgrade;
proxy_set_header Connection 'upgrade';
proxy_set_header Host $host;
proxy_cache_bypass $http_upgrade;
}
