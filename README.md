# 🚀 Luis Melo DevOps Lab

> **A complete, production-grade DevOps learning environment powered by Ansible, Docker, and Kubernetes**

[![Infrastructure](https://img.shields.io/badge/Infrastructure-Docker-2496ED?logo=docker)](https://www.docker.com/)
[![Automation](https://img.shields.io/badge/Automation-Ansible-EE0000?logo=ansible)](https://www.ansible.com/)
[![Orchestration](https://img.shields.io/badge/Orchestration-Kubernetes-326CE5?logo=kubernetes)](https://kubernetes.io/)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Quick Start](#quick-start)
- [Architecture](#architecture)
- [Services](#services)
- [Documentation](#documentation)
- [Usage Examples](#usage-examples)
- [Troubleshooting](#troubleshooting)

## 🎯 Overview

This lab provides a **complete DevOps platform** for learning and testing modern infrastructure automation, CI/CD pipelines, container orchestration, and observability tools. Perfect for:

- 🎓 **Learning**: Hands-on practice with industry-standard tools
- 🧪 **Testing**: Safe environment for experimentation
- 🔬 **Development**: Build and validate automation workflows
- 📚 **Training**: Comprehensive exercises and documentation

## ✨ Features

### Infrastructure (7 Nodes)
- **Control Node**: Ubuntu 22.04 with Ansible, kubectl, helm, terraform, vault CLI
- **Ubuntu Nodes**: 3x Ubuntu 24.04 with Docker, K3s support
- **Rocky Nodes**: 3x Rocky Linux 9 with Docker, monitoring agents

### DevOps Platform (9 Services)
- **CI/CD**: Jenkins, GitLab CE
- **Monitoring**: Prometheus, Grafana, Node Exporter
- **Security**: HashiCorp Vault
- **Quality**: SonarQube
- **Artifacts**: Nexus Repository, Docker Registry

### Pre-configured Features
- ✅ Ansible collections (community, kubernetes, posix)
- ✅ K3s Kubernetes cluster ready to deploy
- ✅ Prometheus monitoring with node exporters
- ✅ Comprehensive playbook library
- ✅ Modern web portal dashboard
- ✅ Helper scripts and automation

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- 8-12GB RAM recommended
- 15-20GB free disk space

### Start the Lab

```bash
# Clone the repository
git clone https://github.com/yourusername/luismelo-ansible-lab.git
cd luismelo-ansible-lab

# Start base infrastructure
make start-base

# OR start full DevOps platform
make start-full

# Access the web portal
open http://localhost:1000
```

### First Steps

1. **Access Control Node**
   ```bash
   ssh -p 2221 ansible@localhost
   # Password: ansible
   ```

2. **Run Your First Playbook**
   ```bash
   cd ~/playbooks
   ansible-playbook -i ../inventory/hosts.ini monitoring/01-deploy-node-exporter.yml
   ```

3. **Deploy Kubernetes Cluster**
   ```bash
   ansible-playbook -i ../inventory/hosts.ini kubernetes/01-deploy-k3s-enhanced.yml
   ```

4. **Explore the Services**
   - Portal: http://localhost:1000
   - Jenkins: http://localhost:8080
   - GitLab: http://localhost:8081
   - Grafana: http://localhost:3300
   - Prometheus: http://localhost:9090
   - Vault: http://localhost:8200

## 🏗️ Architecture

```
┌─────────────────┐
│  Web Portal     │ :1000
│  (Dashboard)    │
└─────────────────┘
         │
         ▼
┌─────────────────┐     ┌──────────────────────────┐
│   ubuntu-c      │────▶│  DevOps Services         │
│  (Control Node) │     │  • Jenkins      :8080    │
│  - Ansible      │     │  • GitLab       :8081    │
│  - kubectl      │     │  • Prometheus   :9090    │
│  - helm         │     │  • Grafana      :3300    │
│  - terraform    │     │  • Vault        :8200    │
└─────────────────┘     │  • SonarQube    :9000    │
         │              │  • Nexus        :8082    │
         │              │  • Registry     :5000    │
         ▼              └──────────────────────────┘
┌──────────────────────────────────────────┐
│  Compute Nodes                           │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐   │
│  │ubuntu1  │  │ubuntu2  │  │ubuntu3  │   │
│  │K3s⚓     │  │K3s⚓     │  │K3s⚓     │   │
│  └─────────┘  └─────────┘  └─────────┘   │
│  ┌───────┐  ┌───────┐  ┌───────┐         │
│  │centos1│  │centos2│  │centos3│         │
│  └───────┘  └───────┘  └───────┘         │
└──────────────────────────────────────────┘
```

## 📦 Services

| Service | Description | Port | Credentials |
|---------|-------------|------|-------------|
| **Portal** | Lab dashboard | 1000 | - |
| **ubuntu-c** | Ansible control node | 2221 | ansible/ansible |
| **Jenkins** | CI/CD automation | 8080 | admin/devopslab123 |
| **GitLab** | Git + CI/CD | 8081 | root/devopslab123 |
| **Prometheus** | Metrics collection | 9090 | - |
| **Grafana** | Visualization | 3300 | admin/devopslab123 |
| **Vault** | Secret management | 8200 | Token: devopslab-root-token |
| **SonarQube** | Code quality | 9000 | admin/admin |
| **Nexus** | Artifact repository | 8082 | admin/(see container) |
| **Registry** | Container registry | 5000 | - |

## 📚 Documentation

- **[Lab Guide](docs/LAB_GUIDE.md)**: Complete platform documentation
- **[Exercises](docs/EXERCISES.md)**: Hands-on learning exercises
- **[Implementation Plan](docs/IMPLEMENTATION_PLAN.md)**: Technical details

## 💡 Usage Examples

### Deploy Complete Monitoring Stack

```bash
# Deploy exporters to all nodes
ansible-playbook -i ../inventory/hosts.ini monitoring/01-deploy-node-exporter.yml

# Setup Grafana dashboards
ansible-playbook -i ../inventory/hosts.ini monitoring/03-setup-grafana.yml

# Access Grafana
open http://localhost:3300
```

### Create a CI/CD Pipeline

```bash
# Setup Jenkins agents
ansible-playbook -i ../inventory/hosts.ini jenkins/01-install-jenkins-agent.yml

# Install GitLab runners
ansible-playbook -i ../inventory/hosts.ini gitlab/01-install-gitlab-runner.yml

# Access Jenkins
open http://localhost:8080
```

### Manage Secrets with Vault

```bash
# Initialize Vault
make init-vault

# Use Vault playbook
ansible-playbook -i ../inventory/hosts.ini security/01-vault-demo.yml

# Access Vault UI
open http://localhost:8200
```

### Deploy to Kubernetes

```bash
# Deploy K3s cluster
ansible-playbook -i ../inventory/hosts.ini kubernetes/01-deploy-k3s-enhanced.yml

# Deploy sample application
ansible-playbook -i ../inventory/hosts.ini kubernetes/02-deploy-sample-app.yml

# Access application
curl http://localhost:30001
```

## 🛠️ Makefile Commands

```bash
make help          # Show all commands
make start-full    # Start complete platform
make stop          # Stop all services
make status        # View service status
make health-check  # Run health checks
make logs          # View logs
make clean         # Remove everything
```

## 🔍 Troubleshooting

### Services not starting

```bash
# Check Docker resources
docker system df

# View container logs
docker logs <container-name>

# Restart specific service
docker-compose restart <service>
```

### Can't connect to nodes

```bash
# Verify connectivity
ansible -i inventory/hosts.ini all -m ping

# Check network
docker network inspect luismelo-net
```

### Out of resources

```bash
# Start only base lab
make start-base

# Or selectively start services
docker-compose up -d ubuntu-c ubuntu1 ubuntu2
```

## 🎓 Learning Paths

1. **Ansible Basics** → Run ad-hoc commands → Write playbooks
2. **CI/CD** → Setup Jenkins → Create pipelines → Deploy apps
3. **Kubernetes** → Deploy K3s → Manage workloads → Scale apps
4. **Monitoring** → Setup Prometheus → Create dashboards → Configure alerts
5. **GitOps** → Setup GitLab → Automate deployments → Implement workflows

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Based on the "Dive Into Ansible" course
- Built with modern DevOps best practices
- Designed for hands-on learning

---

**Ready to level up your DevOps skills? Get started now!** 🚀

```bash
make start-full
open http://localhost:1000
```
