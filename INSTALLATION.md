
----------

```markdown
# Installation Guide 
```

```
## 1. Update System Packages
```bash
sudo apt update && sudo apt upgrade -y

```

----------

## 2. Install Node.js (for Next.js)

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
node -v
npm -v

```

----------

## 3. Install Docker

```bash
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

```
```
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
```
```
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```
----------

## 4. Install Minikube

```bash
curl -LO https://github.com/kubernetes/minikube/releases/latest/download/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube
rm minikube-linux-amd64
minikube version

```

```bash
minikube start --driver=docker

```

----------

## 5. Install kubectl

```bash
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
chmod +x kubectl
sudo mv kubectl /usr/local/bin/
kubectl version --client

```

----------

## 6.Install socat (for NodePort port forwarding)

```bash
sudo apt install -y socat

```

-   Example usage to forward NodePort 32000:
    

```bash
sudo socat TCP-LISTEN:32000,fork TCP:$(minikube ip):32000

```

----------

## 7.Install Nginx (optional, for reverse proxy)

```bash
sudo apt install -y nginx
sudo systemctl enable nginx
sudo systemctl start nginx

```

### Configure Nginx as Reverse Proxy

1.  Edit default site:
    

```bash
sudo nano /etc/nginx/sites-available/default

```

2.  Add the following configuration (replace Minikube IP if different):
    

```
server {
    listen 80;

    location / {
        proxy_pass http://192.168.49.2:32000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}

```

3.  Restart Nginx:
    

```bash
sudo systemctl restart nginx

```

4.  Access via EC2 Public IP:
    

```
http://<EC2_PUBLIC_IP>

```

----------

##  Verification

-   Docker:
    

```bash
docker --version

```

-   Minikube:
    

```bash
minikube version

```

-   kubectl:
    

```bash
kubectl version --client

```

-   Node.js / npm:
    

```bash
node -v
npm -v

```

-   Nginx:
    

```bash
systemctl status nginx

```

----------

## Notes

-   All installations assume a **Linux EC2 instance** (Ubuntu/Debian).
    
-   Minikube runs in a **VM or Docker container**, so NodePort services are not directly exposed externally — use `socat` or Nginx reverse proxy to access via EC2 public IP.
 
    
