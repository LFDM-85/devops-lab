// DevOps Lab Services Data and SPA Router

const services = {
    jenkins: {
        name: 'Jenkins',
        icon: '🔧',
        color: '#D24939',
        category: 'CI/CD',
        port: 8080,
        url: 'http://localhost:8080',
        credentials: 'admin / devopslab123',
        description: 'Leading open-source automation server for building, deploying, and automating projects.',
        features: [
            'Pipeline as Code with Jenkinsfile',
            'Distributed builds with agents',
            '1800+ plugins for integrations',
            'Blue Ocean modern UI',
            'Multi-branch pipeline support'
        ],
        quickStart: [
            'Access Jenkins at http://localhost:8080',
            'Login with admin / devopslab123',
            'Create a new Pipeline job',
            'Configure SCM or paste Jenkinsfile',
            'Run your first build'
        ],
        integrations: ['GitLab', 'SonarQube', 'Nexus', 'Docker', 'Kubernetes'],
        docs: 'https://www.jenkins.io/doc/'
    },
    gitlab: {
        name: 'GitLab',
        icon: '🦊',
        color: '#FC6D26',
        category: 'CI/CD',
        port: 8081,
        url: 'http://localhost:8081',
        credentials: 'root / devopslab123',
        description: 'Complete DevOps platform with Git repository management and CI/CD pipelines.',
        features: [
            'Git repository hosting',
            'Integrated CI/CD pipelines',
            'Container registry',
            'Issue tracking & planning',
            'GitLab Runners for automation'
        ],
        quickStart: [
            'Access GitLab at http://localhost:8081',
            'Login with root / devopslab123',
            'Create a new project',
            'Add .gitlab-ci.yml for CI/CD',
            'Push code and watch pipelines run'
        ],
        integrations: ['Jenkins', 'Kubernetes', 'Prometheus', 'Vault'],
        docs: 'https://docs.gitlab.com/'
    },
    prometheus: {
        name: 'Prometheus',
        icon: '📊',
        color: '#E6522C',
        category: 'Monitoring',
        port: 19090,
        url: 'http://localhost:19090',
        credentials: 'No authentication required',
        description: 'Open-source monitoring and alerting toolkit with powerful time-series database.',
        features: [
            'Multi-dimensional data model',
            'PromQL query language',
            'Pull-based metrics collection',
            'Service discovery',
            'Alerting with Alertmanager'
        ],
        quickStart: [
            'Access Prometheus at http://localhost:19090',
            'Explore metrics in the Graph tab',
            'Query with PromQL: node_cpu_seconds_total',
            'Check targets in Status > Targets',
            'Create alerts in prometheus.yml'
        ],
        integrations: ['Grafana', 'Node Exporter', 'Alertmanager', 'Kubernetes'],
        docs: 'https://prometheus.io/docs/'
    },
    grafana: {
        name: 'Grafana',
        icon: '📈',
        color: '#F46800',
        category: 'Monitoring',
        port: 3300,
        url: 'http://localhost:3300',
        credentials: 'admin / devopslab123',
        description: 'Beautiful analytics and monitoring dashboards for visualizing time-series data.',
        features: [
            'Rich visualization library',
            'Multiple data source support',
            'Dashboard templating',
            'Alerting and notifications',
            'Team collaboration features'
        ],
        quickStart: [
            'Access Grafana at http://localhost:3300',
            'Login with admin / devopslab123',
            'Add Prometheus data source',
            'Import dashboard (ID: 1860 for Node Exporter)',
            'Create custom dashboards'
        ],
        integrations: ['Prometheus', 'InfluxDB', 'Elasticsearch', 'MySQL'],
        docs: 'https://grafana.com/docs/grafana/latest/'
    },
    vault: {
        name: 'HashiCorp Vault',
        icon: '🔐',
        color: '#FFD814',
        category: 'Security',
        port: 8200,
        url: 'http://localhost:8200',
        credentials: 'Token: devopslab-root-token',
        description: 'Secure secret management, encryption as a service, and privileged access management.',
        features: [
            'Secret storage and management',
            'Dynamic secrets generation',
            'Data encryption',
            'Identity-based access',
            'Kubernetes integration'
        ],
        quickStart: [
            'Access Vault at http://localhost:8200',
            'Login with token: devopslab-root-token',
            'Enable KV secrets engine',
            'Store secrets: vault kv put secret/myapp key=value',
            'Integrate with Ansible playbooks'
        ],
        integrations: ['Ansible', 'Kubernetes', 'Jenkins', 'Terraform'],
        docs: 'https://developer.hashicorp.com/vault/docs'
    },
    sonarqube: {
        name: 'SonarQube',
        icon: '🔍',
        color: '#4E9BCD',
        category: 'Quality',
        port: 9000,
        url: 'http://localhost:9000',
        credentials: 'admin / admin (change on first login)',
        description: 'Continuous code quality inspection with static analysis for bugs and security vulnerabilities.',
        features: [
            'Support for 25+ languages',
            'Security vulnerability detection',
            'Code smell detection',
            'Quality gates',
            'CI/CD integration'
        ],
        quickStart: [
            'Access SonarQube at http://localhost:9000',
            'Login and change default password',
            'Create a new project',
            'Generate authentication token',
            'Run scanner from CI/CD pipeline'
        ],
        integrations: ['Jenkins', 'GitLab CI', 'Maven', 'Gradle'],
        docs: 'https://docs.sonarqube.org/'
    },
    nexus: {
        name: 'Nexus Repository',
        icon: '📦',
        color: '#00A95C',
        category: 'Artifacts',
        port: 8082,
        url: 'http://localhost:8082',
        credentials: 'admin / (check admin.password in container)',
        description: 'Universal artifact repository manager supporting multiple formats.',
        features: [
            'Maven, npm, Docker, PyPI support',
            'Proxy and hosted repositories',
            'Component security scanning',
            'Repository health check',
            'Role-based access control'
        ],
        quickStart: [
            'Access Nexus at http://localhost:8082',
            'Get password: docker exec nexus cat /nexus-data/admin.password',
            'Login and set new password',
            'Create repositories (Maven, npm, Docker)',
            'Configure in build tools (pom.xml, .npmrc)'
        ],
        integrations: ['Jenkins', 'Maven', 'Gradle', 'npm', 'Docker'],
        docs: 'https://help.sonatype.com/repomanager3'
    },
    registry: {
        name: 'Docker Registry',
        icon: '🐳',
        color: '#2496ED',
        category: 'Artifacts',
        port: 15000,
        url: 'http://localhost:15000/v2/_catalog',
        credentials: 'No authentication required',
        description: 'Private Docker image registry for storing and distributing container images.',
        features: [
            'Private image storage',
            'HTTP API v2',
            'Webhook notifications',
            'Docker pull/push support',
            'Image deletion capability'
        ],
        quickStart: [
            'Tag image: docker tag myapp localhost:15000/myapp:v1',
            'Push image: docker push localhost:15000/myapp:v1',
            'View catalog: curl http://localhost:15000/v2/_catalog',
            'Pull image: docker pull localhost:15000/myapp:v1',
            'Configure in Kubernetes deployments'
        ],
        integrations: ['Docker', 'Kubernetes', 'Jenkins', 'GitLab'],
        docs: 'https://docs.docker.com/registry/'
    },
    // Lab Machines
    'ubuntu-c': {
        name: 'Ubuntu Control',
        icon: '💻',
        color: '#E95420',
        category: 'Terminals',
        port: 7681,
        url: 'http://localhost:7681',
        credentials: 'ansible / ansible',
        description: 'Primary control node for Ansible operations and management.',
        features: [
            'Ansible Core installed',
            'SSH access to all nodes',
            'Development tools pre-installed',
            'Shared /ansible_home storage',
            'Root access enabled'
        ],
        quickStart: [
            'Click Launch to open web terminal',
            'Login with ansible / ansible',
            'Run playbooks from ~/playbooks',
            'Test connectivity: ansible all -m ping',
            'Manage inventory in ~/inventory'
        ],
        integrations: ['Ansible', 'SSH', 'Git', 'Python'],
        docs: 'https://docs.ansible.com/'
    },
    'ubuntu1': {
        name: 'Ubuntu Node 1',
        icon: '🖥️',
        color: '#E95420',
        category: 'Terminals',
        port: 7682,
        url: 'http://localhost:7682',
        credentials: 'ansible / ansible',
        description: 'Ubuntu managed node for application deployment and testing.',
        features: [
            'Managed by Ansible',
            'Docker installed',
            'Standard Ubuntu environment',
            'SSH server enabled',
            'Systemd init system'
        ],
        quickStart: [
            'Click Launch to open web terminal',
            'Login with ansible / ansible',
            'Verify hostname: hostname',
            'Check Docker: docker ps',
            'View logs: journalctl -f'
        ],
        integrations: ['Ansible', 'Docker', 'SSH'],
        docs: 'https://ubuntu.com/server/docs'
    },
    'ubuntu2': {
        name: 'Ubuntu Node 2',
        icon: '🖥️',
        color: '#E95420',
        category: 'Terminals',
        port: 7683,
        url: 'http://localhost:7683',
        credentials: 'ansible / ansible',
        description: 'Ubuntu managed node for application deployment and testing.',
        features: [
            'Managed by Ansible',
            'Docker installed',
            'Standard Ubuntu environment',
            'SSH server enabled',
            'Systemd init system'
        ],
        quickStart: [
            'Click Launch to open web terminal',
            'Login with ansible / ansible',
            'Verify hostname: hostname',
            'Check Docker: docker ps',
            'View logs: journalctl -f'
        ],
        integrations: ['Ansible', 'Docker', 'SSH'],
        docs: 'https://ubuntu.com/server/docs'
    },
    'ubuntu3': {
        name: 'Ubuntu Node 3',
        icon: '🖥️',
        color: '#E95420',
        category: 'Terminals',
        port: 7684,
        url: 'http://localhost:7684',
        credentials: 'ansible / ansible',
        description: 'Ubuntu managed node for application deployment and testing.',
        features: [
            'Managed by Ansible',
            'Docker installed',
            'Standard Ubuntu environment',
            'SSH server enabled',
            'Systemd init system'
        ],
        quickStart: [
            'Click Launch to open web terminal',
            'Login with ansible / ansible',
            'Verify hostname: hostname',
            'Check Docker: docker ps',
            'View logs: journalctl -f'
        ],
        integrations: ['Ansible', 'Docker', 'SSH'],
        docs: 'https://ubuntu.com/server/docs'
    },
    'centos1': {
        name: 'CentOS Node 1',
        icon: '📦',
        color: '#262525',
        category: 'Terminals',
        port: 7685,
        url: 'http://localhost:7685',
        credentials: 'ansible / ansible',
        description: 'CentOS managed node for RPM-based package testing.',
        features: [
            'Managed by Ansible',
            'RPM package manager',
            'Standard CentOS environment',
            'SSH server enabled',
            'Systemd init system'
        ],
        quickStart: [
            'Click Launch to open web terminal',
            'Login with ansible / ansible',
            'Verify hostname: hostname',
            'Check release: cat /etc/redhat-release',
            'Install packages: sudo yum install ...'
        ],
        integrations: ['Ansible', 'YUM/DNF', 'SSH'],
        docs: 'https://www.centos.org/docs/'
    },
    'centos2': {
        name: 'CentOS Node 2',
        icon: '📦',
        color: '#262525',
        category: 'Terminals',
        port: 7686,
        url: 'http://localhost:7686',
        credentials: 'ansible / ansible',
        description: 'CentOS managed node for RPM-based package testing.',
        features: [
            'Managed by Ansible',
            'RPM package manager',
            'Standard CentOS environment',
            'SSH server enabled',
            'Systemd init system'
        ],
        quickStart: [
            'Click Launch to open web terminal',
            'Login with ansible / ansible',
            'Verify hostname: hostname',
            'Check release: cat /etc/redhat-release',
            'Install packages: sudo yum install ...'
        ],
        integrations: ['Ansible', 'YUM/DNF', 'SSH'],
        docs: 'https://www.centos.org/docs/'
    },
    'centos3': {
        name: 'CentOS Node 3',
        icon: '📦',
        color: '#262525',
        category: 'Terminals',
        port: 7687,
        url: 'http://localhost:7687',
        credentials: 'ansible / ansible',
        description: 'CentOS managed node for RPM-based package testing.',
        features: [
            'Managed by Ansible',
            'RPM package manager',
            'Standard CentOS environment',
            'SSH server enabled',
            'Systemd init system'
        ],
        quickStart: [
            'Click Launch to open web terminal',
            'Login with ansible / ansible',
            'Verify hostname: hostname',
            'Check release: cat /etc/redhat-release',
            'Install packages: sudo yum install ...'
        ],
        integrations: ['Ansible', 'YUM/DNF', 'SSH'],
        docs: 'https://www.centos.org/docs/'
    }
};

// SPA Router
class PortalRouter {
    constructor() {
        this.currentPage = 'home';
        this.init();
    }

    init() {
        // Handle browser back/forward
        window.addEventListener('popstate', (e) => {
            if (e.state && e.state.page) {
                this.showPage(e.state.page, false);
            } else {
                this.showPage('home', false);
            }
        });

        // Handle initial hash
        const hash = window.location.hash.slice(1);
        if (hash && services[hash]) {
            this.showPage(hash, true);
        } else {
            this.showPage('home', false);
        }
    }

    navigate(page) {
        this.showPage(page, true);
    }

    showPage(page, pushState = true) {
        this.currentPage = page;
        
        if (pushState) {
            const url = page === 'home' ? '#' : `#${page}`;
            window.history.pushState({ page }, '', url);
        }

        if (page === 'home') {
            this.renderHome();
        } else if (services[page]) {
            this.renderServicePage(page);
        }

        // Smooth scroll to top
        try {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (e) {
            window.scrollTo(0, 0);
        }
    }

    renderHome() {
        const container = document.getElementById('app-container');
        if (!container) return;
        container.innerHTML = `
            <header>
                <h1>🚀 Luis Melo DevOps Lab</h1>
                <div class="subtitle">Complete DevOps Platform • Ansible • Kubernetes • CI/CD • Monitoring</div>
                <div class="credentials-box">
                    <strong>Default Credentials:</strong> ansible / ansible | <strong>Admin UIs:</strong> admin / devopslab123
                </div>
            </header>

            ${this.renderServiceCategories()}

            <footer>
                <p><strong>Luis Melo DevOps Lab</strong> • Infrastructure as Code • Powered by Ansible, Docker & Kubernetes</p>
                <p>Quick Start: <code>ssh -p 2221 ansible@localhost</code> • Run playbooks from <code>~/playbooks/</code></p>
            </footer>
        `;
    }

    renderServiceCategories() {
        const categories = {
            'CI/CD': [],
            'Monitoring': [],
            'Security': [],
            'Quality': [],
            'Artifacts': [],
            'Terminals': []
        };

        Object.keys(services).forEach(key => {
            const service = services[key];
            categories[service.category].push({ key, ...service });
        });

        let html = '';
        for (const [category, items] of Object.entries(categories)) {
            if (items.length > 0) {
                html += `
                    <div class="section-title">
                        <span class="status-indicator"></span>${category}
                    </div>
                    <div class="grid">
                        ${items.map(service => this.renderServiceCard(service.key, service)).join('')}
                    </div>
                `;
            }
        }
        return html;
    }

    renderServiceCard(key, service) {
        return `
            <div class="card service-card" onclick="router.navigate('${key}')" style="cursor: pointer;">
                <div class="card-header">
                    <span class="card-title">${service.icon} ${service.name}</span>
                    <span class="badge badge-devops">${service.category}</span>
                </div>
                <div class="info-row">
                    <span class="label">Port:</span>
                    <span class="value">${service.port}</span>
                </div>
                <div class="info-row">
                    <span class="label">Purpose:</span>
                    <span class="value">${service.description.split('.')[0]}</span>
                </div>
                <a href="${service.url}" target="_blank" class="btn btn-primary" onclick="event.stopPropagation()">
                    Open ${service.name}
                </a>
                <div class="ssh-hint">${service.credentials}</div>
            </div>
        `;
    }

    renderServicePage(serviceKey) {
        const service = services[serviceKey];
        const container = document.getElementById('app-container');
        
        container.innerHTML = `
            <div class="service-detail-page">
                <div class="breadcrumb">
                    <a href="#" onclick="router.navigate('home'); return false;">← Back to Dashboard</a>
                </div>

                <div class="service-hero" style="border-left: 4px solid ${service.color}">
                    <div class="service-icon" style="font-size: 4rem;">${service.icon}</div>
                    <div class="service-hero-content">
                        <h1>${service.name}</h1>
                        <p class="service-description">${service.description}</p>
                        <div class="service-meta">
                            <span class="meta-badge" style="background: ${service.color}20; color: ${service.color}">
                                ${service.category}
                            </span>
                            <span class="meta-item">📍 Port ${service.port}</span>
                            <span class="meta-item">🔗 <a href="${service.url}" target="_blank">Open Service</a></span>
                        </div>
                    </div>
                </div>

                <div class="service-content-grid">
                    <div class="content-card">
                        <h2>🚀 Quick Start</h2>
                        <ol class="quick-start-list">
                            ${service.quickStart.map(step => `<li>${step}</li>`).join('')}
                        </ol>
                    </div>

                    <div class="content-card">
                        <h2>✨ Key Features</h2>
                        <ul class="features-list">
                            ${service.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>

                    <div class="content-card">
                        <h2>🔐 Access</h2>
                        <div class="access-box">
                            <div class="access-item">
                                <strong>URL:</strong>
                                <a href="${service.url}" target="_blank">${service.url}</a>
                            </div>
                            <div class="access-item">
                                <strong>Credentials:</strong>
                                <code>${service.credentials}</code>
                            </div>
                        </div>
                    </div>

                    <div class="content-card">
                        <h2>🔗 Integrations</h2>
                        <div class="integration-tags">
                            ${service.integrations.map(int => `<span class="tag">${int}</span>`).join('')}
                        </div>
                    </div>

                    <div class="content-card full-width">
                        <h2>📚 Documentation & Resources</h2>
                        <div class="resource-links">
                            <a href="${service.docs}" target="_blank" class="resource-link">
                                📖 Official Documentation
                            </a>
                            <a href="${service.url}" target="_blank" class="resource-link">
                                🌐 Access ${service.name}
                            </a>
                        </div>
                    </div>
                </div>

                <div class="action-footer">
                    <a href="${service.url}" target="_blank" class="btn btn-primary btn-large">
                        Launch ${service.name} →
                    </a>
                    <button onclick="router.navigate('home')" class="btn btn-secondary btn-large">
                        ← Back to Dashboard
                    </button>
                </div>
            </div>
        `;
    }
}

// Initialize router
const initRouter = () => {
    if (!window.router) {
        window.router = new PortalRouter();
    }
};

if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', initRouter);
} else {
    initRouter();
}
