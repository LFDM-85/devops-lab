# DevOps Lab Exercises

This document contains hands-on exercises to help you master DevOps tools and practices.

## 🎯 Exercise 1: Complete Monitoring Stack

**Objective**: Deploy and configure a complete observability solution for the lab infrastructure.

**Time**: 30-45 minutes

### Steps

1. **Deploy Node Exporters**
   ```bash
   cd ~/playbooks
   ansible-playbook -i ../inventory/hosts.ini monitoring/01-deploy-node-exporter.yml
   ```

2. **Verify Prometheus Configuration**
   - Open Prometheus UI: http://localhost:9090
   - Navigate to Status > Targets
   - Verify all nodes are being scraped
   - Run query: `up{job="ubuntu-nodes"}`

3. **Configure Grafana**
   ```bash
   ansible-playbook -i ../inventory/hosts.ini monitoring/03-setup-grafana.yml
   ```

4. **Explore Dashboards**
   - Open Grafana: http://localhost:3000
   - Login: admin/devopslab123
   - Browse the Node Exporter Full dashboard
   - Identify which node has highest CPU usage

### Challenge
Create a custom dashboard showing:
- Total number of nodes
- Average memory usage across all nodes
- Network traffic by node

---

## 🔧 Exercise 2: Build a CI/CD Pipeline

**Objective**: Create a complete CI/CD pipeline from code to deployment.

**Time**: 45-60 minutes

### Steps

1. **Setup Jenkins Agent**
   ```bash
   ansible-playbook -i ../inventory/hosts.ini jenkins/01-install-jenkins-agent.yml
   ```

2. **Create a Sample Application**
   ```bash
   # On control node
   mkdir -p ~/projects/demo-app
   cd ~/projects/demo-app
   
   # Create a simple Python app
   cat > app.py << 'EOF'
   from flask import Flask
   app = Flask(__name__)
   
   @app.route('/')
   def hello():
       return "Hello from DevOps Lab!"
   
   if __name__ == '__main__':
       app.run(host='0.0.0.0', port=5000)
   EOF
   
   # Create requirements
   echo "flask" > requirements.txt
   
   # Create Dockerfile
   cat > Dockerfile << 'EOF'
   FROM python:3.9-slim
   WORKDIR /app
   COPY requirements.txt .
   RUN pip install -r requirements.txt
   COPY app.py .
   CMD ["python", "app.py"]
   EOF
   ```

3. **Host on Git**
   - Create a new repository on GitHub (or use local path)
   - Push your code

4. **Create Jenkins Pipeline**
   - Open Jenkins: http://localhost:8080
   - Create new Pipeline job
   - Configure SCM (Git) to point to your repository
   - Write Jenkinsfile:
   ```groovy
   pipeline {
       agent any
       stages {
           stage('Build') {
               steps {
                   sh 'docker build -t demo-app:${BUILD_NUMBER} .'
               }
           }
           stage('Test') {
               steps {
                   sh 'echo "Tests would go here"'
               }
           }
           stage('Push') {
               steps {
                   sh 'docker tag demo-app:${BUILD_NUMBER} localhost:5000/demo-app:${BUILD_NUMBER}'
                   sh 'docker push localhost:5000/demo-app:${BUILD_NUMBER}'
               }
           }
       }
   }
   ```

5. **Trigger Build**
   - Make a code change
   - Push to Git
   - Watch the pipeline execute

### Challenge
- Add unit tests to the pipeline
- Implement code quality scanning with SonarQube
- Deploy the app to the K3s cluster

---

## ☸️ Exercise 3: Kubernetes Application Deployment

**Objective**: Deploy a multi-tier application to the K3s cluster.

**Time**: 45-60 minutes

### Steps

1. **Deploy K3s Cluster**
   ```bash
   ansible-playbook -i ../inventory/hosts.ini kubernetes/01-deploy-k3s-enhanced.yml
   ```

2. **Verify Cluster**
   ```bash
   ssh ubuntu1
   kubectl get nodes
   kubectl get pods --all-namespaces
   ```

3. **Deploy Sample Application**
   ```bash
   ansible-playbook -i ../inventory/hosts.ini kubernetes/02-deploy-sample-app.yml
   ```

4. **Access Application**
   ```bash
   curl http://localhost:30001
   ```

5. **Scale the Application**
   ```bash
   ssh ubuntu1
   kubectl scale deployment nginx-demo --replicas=3
   kubectl get pods -w
   ```

6. **Create a Database**
   ```yaml
   # postgres.yaml
   apiVersion: apps/v1
   kind: StatefulSet
   metadata:
     name: postgres
   spec:
     serviceName: postgres
     replicas: 1
     selector:
       matchLabels:
         app: postgres
     template:
       metadata:
         labels:
           app: postgres
       spec:
         containers:
         - name: postgres
           image: postgres:15
           env:
           - name: POSTGRES_PASSWORD
             value: devopslab123
           ports:
           - containerPort: 5432
   ---
   apiVersion: v1
   kind: Service
   metadata:
     name: postgres
   spec:
     selector:
       app: postgres
     ports:
     - port: 5432
   ```

### Challenge
- Deploy a multi-tier app (frontend, backend, database)
- Implement persistent storage
- Configure ingress routes
- Add health checks

---

## 🔐 Exercise 4: Secret Management with Vault

**Objective**: Implement secure secret management in your applications.

**Time**: 30-45 minutes

### Steps

1. **Run Vault Demo**
   ```bash
   ansible-playbook -i ../inventory/hosts.ini security/01-vault-demo.yml
   ```

2. **Access Vault UI**
   - Open: http://localhost:8200
   - Login with token: `devopslab-root-token`
   - Browse secrets

3. **Store Application Secrets**
   ```bash
   # Install vault CLI on control node (already installed)
   export VAULT_ADDR='http://vault:8200'
   export VAULT_TOKEN='devopslab-root-token'
   
   # Write secrets
   vault kv put secret/myapp/db username=dbuser password=super-secret
   vault kv put secret/myapp/api key=sk-1234567890
   
   # Read secrets
   vault kv get secret/myapp/db
   ```

4. **Use Secrets in Ansible**
   ```yaml
   # playbook example
   - name: Retrieve secret from Vault
     uri:
       url: "http://vault:8200/v1/secret/data/myapp/db"
       method: GET
       headers:
         X-Vault-Token: "devopslab-root-token"
       return_content: yes
     register: vault_secret
   
   - name: Use the secret
     debug:
       msg: "Username: {{ vault_secret.json.data.data.username }}"
   ```

### Challenge
- Create policies for different teams
- Implement dynamic database credentials
- Use Vault agent for automatic secret injection

---



## 🎓 Exercise 6: Infrastructure as Code

**Objective**: Use Terraform with Ansible for infrastructure management.

**Time**: 45-60 minutes

### Steps

1. **Create Terraform Configuration**
   ```hcl
   # Create containers using Docker provider
   terraform {
     required_providers {
       docker = {
         source = "kreuzwerker/docker"
       }
     }
   }
   
   resource "docker_container" "app" {
     name  = "terraform-demo"
     image = "nginx:alpine"
     ports {
       internal = 80
       external = 8888
     }
   }
   ```

2. **Apply Configuration**
   ```bash
   terraform init
   terraform plan
   terraform apply
   ```

3. **Use Ansible to Configure**
   ```yaml
   - name: Configure Terraform-created container
     hosts: localhost
     tasks:
       - name: Wait for nginx
         uri:
           url: http://localhost:8888
           status_code: 200
   ```

### Challenge
- Create a complete web application infrastructure
- Implement state management
- Create modules for reusability

---

## 📝 Bonus Challenges

### Challenge 1: High Availability
Setup a highly available application with:
- Load balancing
- Auto-scaling
- Health checks
- Automatic failover

### Challenge 2: Complete Observability
Implement:
- Distributed tracing
- Log aggregation (ELK stack)
- Custom metrics
- Alerting rules

### Challenge 3: Security Hardening
- Implement network policies
- Add pod security policies
- Configure RBAC
- Scan images for vulnerabilities

---

## ✅ Completion Criteria

For each exercise, you should be able to:
- [ ] Execute all steps successfully
- [ ] Explain what each component does
- [ ] Troubleshoot common issues
- [ ] Complete at least one challenge
- [ ] Document your learnings

## 🎉 Congratulations!

Upon completing these exercises, you'll have hands-on experience with:
- Infrastructure automation with Ansible
- CI/CD pipelines with Jenkins and GitLab  
- Container orchestration with Kubernetes
- Observability with Prometheus and Grafana
- Secret management with Vault
- GitOps workflows
- Infrastructure as Code with Terraform

Keep experimenting and building!
