.PHONY: help start-base start-full stop restart clean status logs health-check init-vault

# Default target
help:
	@echo "Luis Melo DevOps Lab - Makefile Commands"
	@echo "=========================================="
	@echo ""
	@echo "Infrastructure:"
	@echo "  make start-base     - Start base Ansible lab (7 nodes)"
	@echo "  make start-full     - Start full stack with DevOps tools"
	@echo "  make stop           - Stop all containers"
	@echo "  make restart        - Restart all services"
	@echo "  make clean          - Remove containers and volumes"
	@echo ""
	@echo "Management:"
	@echo "  make status         - Show container status"
	@echo "  make logs           - Tail logs from all services"
	@echo "  make health-check   - Run health check on all services"
	@echo ""
	@echo "Setup:"
	@echo "  make init-vault     - Initialize Vault with sample secrets"
	@echo "  make setup-grafana  - Configure Grafana dashboards"
	@echo ""
	@echo "Access:"
	@echo "  Portal:      http://localhost:1000"
	@echo "  Control:     ssh -p 2221 ansible@localhost"
	@echo ""

# Start base infrastructure only
start-base:
	@echo "Starting base Ansible lab..."
	docker compose up -d
	@echo "✓ Base lab started!"
	@echo "Access portal: http://localhost:1000"

# Start full stack with DevOps tools
start-full:
	@echo "Starting full DevOps platform..."
	docker compose -f docker-compose.yaml -f docker-compose-devops.yaml up -d
	@echo "✓ Full stack started!"
	@echo "This may take a few minutes for all services to be ready..."
	@echo "Run 'make health-check' to verify all services"

# Stop all containers
stop:
	@echo "Stopping all services..."
	docker compose -f docker-compose.yaml -f docker-compose-devops.yaml down
	@echo "✓ All services stopped"

# Restart all services
restart: stop start-full

# Clean up everything (containers and volumes)
clean:
	@echo "⚠️  This will remove all containers and volumes!"
	@read -p "Are you sure? [y/N] " -n 1 -r; \
	echo; \
	if [[ $$REPLY =~ ^[Yy]$$ ]]; then \
		docker compose -f docker-compose.yaml -f docker-compose-devops.yaml down -v; \
		echo "✓ Cleanup complete"; \
	else \
		echo "Cancelled"; \
	fi

# Show container status
status:
	@echo "Container Status:"
	@echo "================"
	@docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" | grep -E "(NAMES|ubuntu|centos|jenkins|gitlab|prometheus|grafana|vault|sonar|nexus|registry|portal)"

# Tail logs
logs:
	docker compose -f docker-compose.yaml -f docker-compose-devops.yaml logs -f

# Run health check
health-check:
	@bash scripts/health-check.sh

# Initialize Vault
init-vault:
	@bash scripts/init-vault.sh

# Setup Grafana dashboards
setup-grafana:
	@echo "Setting up Grafana..."
	@docker exec -it ubuntu-c ansible-playbook -i /home/ansible/inventory/hosts.ini /home/ansible/playbooks/monitoring/03-setup-grafana.yml
	@echo "✓ Grafana configured!"
	@echo "Access: http://localhost:3000 (admin/devopslab123)"

# Quick access commands
ssh-control:
	@ssh -p 2221 ansible@localhost

# Build all images
build:
	docker compose build

# Pull latest images for DevOps tools
pull:
	docker compose -f docker-compose-devops.yaml pull
