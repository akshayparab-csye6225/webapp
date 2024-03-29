#!/bin/bash

# Update and upgrade
sudo yum update -y
sudo yum upgrade -y

# Install NGINX
sudo amazon-linux-extras install nginx1 -y
sudo systemctl status nginx
sudo systemctl enable nginx
sudo systemctl start nginx

# Install MYSQL Client
sudo yum install mysql -y

# Install CloudWatch
sudo yum install amazon-cloudwatch-agent -y

# NVM install
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
source ~/.bashrc
# Install lts
nvm install 16.19.1
nvm use 16.19.1

#Create directory for webapp logs
sudo mkdir /var/log/webapp

#Change ownership of directory to system user running webapp
sudo chown ec2-user /var/log/webapp

# Decompress webapp
mkdir /home/ec2-user/webapp
tar -xf /home/ec2-user/webapp.tar.gz -C /home/ec2-user/webapp
# npm install
npm install --omit=dev --prefix /home/ec2-user/webapp

# Create systemd service
sudo touch /etc/systemd/system/webapp.service

# Add script
sudo bash -c "cat > /etc/systemd/system/webapp.service <<EOF
[Unit]
Description=webapp

[Service]
# Start Service and Examples
WorkingDirectory=/home/ec2-user/webapp
ExecStart=/home/ec2-user/.nvm/versions/node/v16.19.1/bin/node -r dotenv/config /home/ec2-user/webapp/server.js
# Restart service after 10 seconds if node service crashes
RestartSec=10
Restart=always
Restart=on-failure
# Output to syslog
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=webapp-server
User=ec2-user

[Install]
WantedBy=multi-user.target
EOF"

# Start node app
sudo systemctl daemon-reload
sudo systemctl enable webapp.service
sudo systemctl start webapp.service