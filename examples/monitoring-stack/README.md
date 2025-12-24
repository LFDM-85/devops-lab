# Monitoring Stack Deployment Example

This example shows how to deploy and configure a complete monitoring solution.

## Overview

Deploy a full observability stack with:
- **Prometheus**: Metrics collection
- **Grafana**: Visualization
- **Node Exporter**: System metrics
- **Alertmanager**: Alert management

## Architecture

```
┌──────────────┐
│   Grafana    │
│   :3000      │
└──────┬───────┘
       │
       ▼
┌──────────────┐      ┌─────────────┐
│  Prometheus  │─────▶│ Alertmanager│
│   :9090      │      │   :9093     │
└──────┬───────┘      └─────────────┘
       │
       ▼
┌──────────────────────────┐
│   Node Exporters         │
│  ubuntu1,2,3:9100        │
│  centos1,2,3:9100        │
└──────────────────────────┘
```

## Deployment Steps

### 1. Deploy Node Exporters

```bash
cd ~/playbooks
ansible-playbook -i ../inventory/hosts.ini monitoring/01-deploy-node-exporter.yml
```

This playbook:
- Downloads node_exporter
- Installs on all nodes
- Starts the service
- Verifies it's running

### 2. Configure Prometheus

Prometheus configuration is in `config/prometheus/prometheus.yml`:

```yaml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

scrape_configs:
  - job_name: 'ubuntu-nodes'
    static_configs:
      - targets:
          - 'ubuntu1:9100'
          - 'ubuntu2:9100'
          - 'ubuntu3:9100'
        labels:
          os: 'ubuntu'

  - job_name: 'centos-nodes'
    static_configs:
      - targets:
          - 'centos1:9100'
          - 'centos2:9100'
          - 'centos3:9100'
        labels:
          os: 'rocky'
```

### 3. Setup Grafana Dashboards

```bash
ansible-playbook -i ../inventory/hosts.ini monitoring/03-setup-grafana.yml
```

This configures:
- Prometheus as datasource
- Imports Node Exporter Full dashboard
- Sets up authentication

### 4. Create Custom Dashboards

Access Grafana at http://localhost:3000 (admin/devopslab123)

#### CPU Usage Dashboard

```json
{
  "dashboard": {
    "title": "Lab Infrastructure Overview",
    "panels": [
      {
        "title": "CPU Usage by Node",
        "targets": [
          {
            "expr": "100 - (avg by(instance) (irate(node_cpu_seconds_total{mode=\"idle\"}[5m])) * 100)"
          }
        ],
        "type": "graph"
      },
      {
        "title": "Memory Usage",
        "targets": [
          {
            "expr": "node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes * 100"
          }
        ],
        "type": "gauge"
      },
      {
        "title": "Disk I/O",
        "targets": [
          {
            "expr": "rate(node_disk_io_time_seconds_total[5m])"
          }
        ],
        "type": "graph"
      },
      {
        "title": "Network Traffic",
        "targets": [
          {
            "expr": "rate(node_network_receive_bytes_total[5m])"
          }
        ],
        "type": "graph"
      }
    ]
  }
}
```

### 5. Configure Alert Rules

Create `config/prometheus/alerts/node_alerts.yml`:

```yaml
groups:
  - name: node_alerts
    interval: 30s
    rules:
      - alert: HighCPUUsage
        expr: 100 - (avg by(instance) (irate(node_cpu_seconds_total{mode="idle"}[5m])) * 100) > 80
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High CPU usage on {{ $labels.instance }}"
          description: "CPU usage is above 80% for 5 minutes"

      - alert: HighMemoryUsage
        expr: (node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes) * 100 < 10
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High memory usage on {{ $labels.instance }}"
          description: "Available memory is below 10%"

      - alert: DiskSpaceRunningOut
        expr: (node_filesystem_avail_bytes / node_filesystem_size_bytes) * 100 < 10
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "Disk space low on {{ $labels.instance }}"
          description: "Disk space is below 10%"

      - alert: NodeDown
        expr: up{job=~".*nodes"} == 0
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "Node {{ $labels.instance }} is down"
          description: "Node has been down for 1 minute"
```

Update `prometheus.yml`:
```yaml
rule_files:
  - "alerts/*.yml"
```

### 6. Deploy Alertmanager (Optional)

Add to `docker-compose-devops.yaml`:

```yaml
  alertmanager:
    image: prom/alertmanager:latest
    hostname: alertmanager
    container_name: alertmanager
    ports:
      - "9093:9093"
    volumes:
      - ./config/alertmanager:/etc/alertmanager
    command:
      - '--config.file=/etc/alertmanager/alertmanager.yml'
    networks:
      - luismelo-net
    restart: unless-stopped
```

Configure Alertmanager in `config/alertmanager/alertmanager.yml`:

```yaml
global:
  resolve_timeout: 5m

route:
  group_by: ['alertname']
  group_wait: 10s
  group_interval: 10s
  repeat_interval: 12h
  receiver: 'default'

receivers:
  - name: 'default'
    webhook_configs:
      - url: 'http://webhook-receiver:8080/alerts'
```

## Useful Prometheus Queries

### System Metrics

```promql
# CPU Usage
100 - (avg by(instance) (irate(node_cpu_seconds_total{mode="idle"}[5m])) * 100)

# Memory Usage
(node_memory_MemTotal_bytes - node_memory_MemAvailable_bytes) / node_memory_MemTotal_bytes * 100

# Disk Usage
(node_filesystem_size_bytes - node_filesystem_avail_bytes) / node_filesystem_size_bytes * 100

# Network Receive Rate
rate(node_network_receive_bytes_total[5m])

# Network Transmit Rate
rate(node_network_transmit_bytes_total[5m])

# Load Average
node_load1

# Uptime
node_time_seconds - node_boot_time_seconds
```

### Aggregations

```promql
# Average CPU across all Ubuntu nodes
avg(100 - (avg by(instance) (irate(node_cpu_seconds_total{mode="idle",os="ubuntu"}[5m])) * 100))

# Total memory across all nodes
sum(node_memory_MemTotal_bytes)

# Number of nodes up
count(up{job=~".*nodes"} == 1)
```

## Grafana Dashboard Tips

### Variables

Create variables for dynamic dashboards:

```
Name: node
Type: Query
Query: label_values(up{job=~".*nodes"}, instance)
```

Use in queries: `node_cpu_seconds_total{instance="$node"}`

### Templating

Create reusable dashboard templates:

```json
{
  "templating": {
    "list": [
      {
        "name": "datasource",
        "type": "datasource",
        "query": "prometheus"
      },
      {
        "name": "node",
        "type": "query",
        "datasource": "$datasource",
        "query": "label_values(node_uname_info, instance)"
      }
    ]
  }
}
```

## Best Practices

1. **Metric Naming**: Use consistent naming conventions
2. **Labels**: Add meaningful labels for filtering
3. **Retention**: Configure appropriate retention periods
4. **Sampling**: Adjust scrape intervals based on needs
5. **Alerting**: Set appropriate thresholds and durations
6. **Documentation**: Document all custom metrics

## Troubleshooting

### Targets not appearing

```bash
# Check Prometheus targets
curl http://localhost:9090/api/v1/targets | jq

# Verify exporters manually
ansible -i inventory/hosts.ini monitoring -m shell -a "curl -s localhost:9100/metrics | head"
```

### No data in Grafana

1. Verify Prometheus datasource
2. Check query syntax
3. Verify time range
4. Check if metrics exist: http://localhost:9090/api/v1/label/__name__/values

### High cardinality issues

```promql
# Find high cardinality metrics
topk(10, count by(__name__)({__name__=~".+"}))
```

## Next Steps

- Add application-specific metrics
- Create SLO/SLI dashboards
- Implement distributed tracing
- Add log aggregation (ELK stack)
- Create runbooks for alerts
