
----------
```markdown
# DevOps Assignment Project (Next.js, Docker, GHCR, Minikube)

This project is a **Next.js portfolio website** containerized with **Docker** and deployed on **Kubernetes using Minikube**. It demonstrates containerization, Kubernetes deployment, and NodePort service exposure on an EC2 instance.

---

##  Setup Instructions

### Prerequisites
- Linux-based machine (AWS EC2 recommended)
- [Docker](https://docs.docker.com/get-docker/)
- [Minikube](https://minikube.sigs.k8s.io/docs/start/)
- [kubectl](https://kubernetes.io/docs/tasks/tools/)
- Node.js 18+ (for building Next.js app)

- Before running this project, make sure you have all prerequisites installed.  
For detailed installation instructions, see the [Installation Guide](INSTALLATION.md).
- Make sure to open the ports of the instance that will be accessed
```

### Clone the repository
```bash
git clone https://github.com/Harshavardhanchary/Devops-Assignment.git
cd Devops-Assignment

```
----------

##  Run Project locally

### Install dependencies

```bash
npm install

```

### Run Next.js locally

```bash
npm run dev

```

Open your browser at:

```
http://localhost:3000 or  http://<instace-ip>:3000

```

### Build Docker image

```bash
docker build -t image-name:tag .

```
### Run Docker image
```
docker run -d -p 80:80 image-name:tag
```
----------

##  Deployment Steps for Minikube

### Start Minikube with Docker driver

```bash
minikube start --driver=docker

```

### Apply Kubernetes manifests

```bash
kubectl apply -f deploy.yaml
kubectl apply -f service.yaml

```
or
```
sh all.sh (Applies all the files through shell script)
```

### Verify deployment

```bash
kubectl get pods
kubectl get svc

```

-   Example output for NodePort service:
    

```
NAME                   TYPE       CLUSTER-IP      EXTERNAL-IP   PORT(S)        AGE
nextjs-nginx-service   NodePort   10.100.38.219   <none>        80:32000/TCP   2m

```

----------

## 4.  Access the Deployed Application

### Access inside EC2 (Minikube NodePort)

-   Check NodePort:
    

```bash
kubectl get svc nextjs-nginx-service

```

-   Access via Minikube IP:
    - Get minikubeip
```
minikup ip
```
Example output ip: 192.29.8.0

```bash
curl http://$(minikube ip):32000

```

### Access via EC2 Public IP

1.  Install `socat` to forward ports:
    

```bash
sudo apt update
sudo apt install -y socat

```

2.  Forward traffic from EC2 public port to Minikube NodePort:
    

```bash
sudo socat TCP-LISTEN:32000,fork TCP:$(minikube ip):32000

```

3.  Open in browser:
    

```
http://<EC2_PUBLIC_IP>:32000

```

>  Note: “We used `socat` to forward traffic from the EC2 public port to Minikube NodePort, because Minikube runs in a VM and its internal IP is not directly reachable from outside. In production, a LoadBalancer or Ingress would be used instead.”


##  Nginx Installation and Configuration (Optional)

### Install Nginx

`sudo apt update`

`sudo apt install -y nginx` 

### Configure Nginx as a reverse proxy to Minikube

1.  Edit the default server configuration:
    

`sudo nano /etc/nginx/sites-available/default` 

2.  Replace the content with:
    

`server { listen  80; location / { proxy_pass http://192.168.49.2:32000; proxy_set_header Host $host; proxy_set_header X-Real-IP $remote_addr; proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}` 

> Make sure the IP `192.168.49.2` matches your Minikube IP (use `minikube ip`).

3.  Restart Nginx to apply changes:
    

`sudo systemctl restart nginx` 

4.  Open your browser at:
    

`http://<EC2_PUBLIC_IP>` 

-   Nginx will now forward traffic to Minikube NodePort automatically.
----------

```
>  **CI/CD Integration:**  
> As this project uses **GitHub Actions** for continuous integration and deployment.  
> Kubernetes manifests (`deploy.yaml` ) is automatically updated on commits.  
> To apply the latest changes, simply **pull the repository** and run:
> `git pull`
> 
> ```bash
> kubectl apply -f deploy.yaml
> kubectl apply -f service.yaml
> ```
> 
> No manual editing of manifests is required.

```

## Project Structure

```
.
├── .github				#CICD-deploy.yaml
├── Dockerfile			#Dockerfile
├── README.md
├── k8s					#Manifests
├── next.config.js
├── nginx.conf
├── package.json
├── pages
└── styles
```
##  Skills Demonstrated
- Docker containerization
- Kubernetes deployment (Minikube, NodePort, Nginx)
- CI/CD with GitHub Actions
- Git version control and automated pipeline management
- Cloud deployment on AWS EC2

----

