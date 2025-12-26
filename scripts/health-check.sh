#!/usr/bin/env bash
# Health check script for all DevOps lab services

set -e

echo "================================"
echo "DevOps Lab Health Check"
echo "================================"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

check_service() {
    local name=$1
    local url=$2
    local expected_code=${3:-200}
    
    printf "%-25s" "$name: "
    
    if curl -s -o /dev/null -w "%{http_code}" --max-time 5 "$url" | grep -q "$expected_code"; then
        echo -e "${GREEN}✓ OK${NC}"
        return 0
    else
        echo -e "${RED}✗ FAIL${NC}"
        return 1
    fi
}

check_container() {
    local name=$1
    printf "%-25s" "$name: "
    
    if docker ps --format '{{.Names}}' | grep -q "^${name}$"; then
        echo -e "${GREEN}✓ Running${NC}"
        return 0
    else
        echo -e "${RED}✗ Not Running${NC}"
        return 1
    fi
}

echo "Infrastructure Nodes:"
echo "--------------------"
check_container "ubuntu-c"
check_container "ubuntu1"
check_container "ubuntu2"
check_container "ubuntu3"
check_container "centos1"
check_container "centos2"
check_container "centos3"
echo ""

echo "DevOps Services:"
echo "----------------"
check_service "Portal" "http://localhost:1000"
check_service "Jenkins" "http://localhost:8080" "200"

check_service "Prometheus" "http://localhost:9090"
check_service "Grafana" "http://localhost:3000" "302"
check_service "Vault" "http://localhost:8200" "[0-9]+"
check_service "SonarQube" "http://localhost:9000"
check_service "Nexus" "http://localhost:8082"
check_service "Registry" "http://localhost:5000/v2/"
echo ""

echo "Prometheus Targets:"
echo "-------------------"
if command -v jq &> /dev/null; then
    active_targets=$(curl -s http://localhost:9090/api/v1/targets | jq '.data.activeTargets | length')
    echo -e "Active targets: ${GREEN}${active_targets}${NC}"
else
    echo -e "${YELLOW}Install jq to see target count${NC}"
fi
echo ""

echo "================================"
echo "Health check complete!"
echo "================================"
