# Sample CI/CD Pipeline Example

This example demonstrates a complete CI/CD workflow from code to deployment.

## Project Structure

```
demo-app/
├── app.py                 # Flask application
├── requirements.txt       # Python dependencies
├── Dockerfile            # Container image
├── Jenkinsfile           # Jenkins pipeline

├── k8s/                  # Kubernetes manifests
│   ├── deployment.yaml
│   └── service.yaml
└── tests/               # Unit tests
    └── test_app.py
```

## Application Code

**app.py**:
```python
from flask import Flask, jsonify
import os

app = Flask(__name__)

@app.route('/')
def home():
    return jsonify({
        'message': 'Hello from DevOps Lab!',
        'version': os.getenv('APP_VERSION', '1.0.0')
    })

@app.route('/health')
def health():
    return jsonify({'status': 'healthy'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
```

**requirements.txt**:
```
flask==3.0.0
pytest==7.4.3
```

**Dockerfile**:
```dockerfile
FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY app.py .
ENV APP_VERSION=1.0.0
EXPOSE 5000
CMD ["python", "app.py"]
```

## Jenkins Pipeline

**Jenkinsfile**:
```groovy
pipeline {
    agent any
    
    environment {
        REGISTRY = 'localhost:5000'
        IMAGE_NAME = 'demo-app'
        VERSION = "${BUILD_NUMBER}"
    }
    
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/yourusername/demo-app.git'
            }
        }
        
        stage('Test') {
            steps {
                sh 'pip install -r requirements.txt'
                sh 'pytest tests/ -v'
            }
        }
        
        stage('Build') {
            steps {
                script {
                    sh "docker build -t ${IMAGE_NAME}:${VERSION} ."
                    sh "docker tag ${IMAGE_NAME}:${VERSION} ${IMAGE_NAME}:latest"
                }
            }
        }
        
        stage('Quality Check') {
            steps {
                sh """
                    docker run --rm \
                        -e SONAR_HOST_URL=http://sonarqube:9000 \
                        -v \$(pwd):/usr/src \
                        sonarsource/sonar-scanner-cli
                """
            }
        }
        
        stage('Push to Registry') {
            steps {
                sh "docker tag ${IMAGE_NAME}:${VERSION} ${REGISTRY}/${IMAGE_NAME}:${VERSION}"
                sh "docker push ${REGISTRY}/${IMAGE_NAME}:${VERSION}"
            }
        }
        
        stage('Deploy to K8s') {
            steps {
                script {
                    sh """
                        sed 's|IMAGE_TAG|${VERSION}|g' k8s/deployment.yaml | kubectl apply -f -
                        kubectl apply -f k8s/service.yaml
                    """
                }
            }
        }
        
        stage('Verify Deployment') {
            steps {
                sh 'kubectl rollout status deployment/demo-app'
                sh 'kubectl get pods -l app=demo-app'
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
        success {
            echo "Pipeline completed successfully!"
        }
        failure {
            echo "Pipeline failed. Check logs for details."
        }
    }
}
```



## Kubernetes Manifests

**k8s/deployment.yaml**:
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: demo-app
  labels:
    app: demo-app
spec:
  replicas: 2
  selector:
    matchLabels:
      app: demo-app
  template:
    metadata:
      labels:
        app: demo-app
    spec:
      containers:
      - name: demo-app
        image: localhost:5000/demo-app:IMAGE_TAG
        ports:
        - containerPort: 5000
        env:
        - name: APP_VERSION
          value: "IMAGE_TAG"
        livenessProbe:
          httpGet:
            path: /health
            port: 5000
          initialDelaySeconds: 10
          periodSeconds: 5
        readinessProbe:
          httpGet:
            path: /health
            port: 5000
          initialDelaySeconds: 5
          periodSeconds: 3
```

**k8s/service.yaml**:
```yaml
apiVersion: v1
kind: Service
metadata:
  name: demo-app
spec:
  type: NodePort
  selector:
    app: demo-app
  ports:
  - port: 80
    targetPort: 5000
    nodePort: 30002
```

## Setup Instructions

1. **Create the project**:
   ```bash
   mkdir -p demo-app/{k8s,tests}
   # Create all files as shown above
   ```

2. **Initialize Git**:
   ```bash
   cd demo-app
   git init
   git add .
   git commit -m "Initial commit"
   ```

   ```bash
   # Add remote (example for GitHub)
   git remote add origin https://github.com/yourusername/demo-app.git
   git push -u origin main
   ```

4. **Setup Jenkins Job**:
   - Open Jenkins: http://localhost:8080
   - Create new Pipeline job
   - Point to Git repository
   - Use Jenkinsfile from SCM

5. **Run the Pipeline**:
   - Trigger build manually or via webhook
   - Watch it build, test, scan, and deploy

6. **Access the Application**:
   ```bash
   curl http://localhost:30002
   ```

## Monitoring Integration

The application automatically exposes metrics that Prometheus can scrape:

```yaml
# Add to prometheus.yml
scrape_configs:
  - job_name: 'demo-app'
    kubernetes_sd_configs:
      - role: pod
    relabel_configs:
      - source_labels: [__meta_kubernetes_pod_label_app]
        regex: demo-app
        action: keep
```

## Next Steps

- Add integration tests
- Implement blue/green deployments
- Add Canary releases
- Configure alerts in Grafana
- Implement automated rollbacks
