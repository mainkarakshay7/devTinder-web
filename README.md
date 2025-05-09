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
