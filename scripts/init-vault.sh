#!/usr/bin/env bash
# Initialize HashiCorp Vault for dev use

set -e

echo "Initializing Vault..."

export VAULT_ADDR='http://localhost:8200'
export VAULT_TOKEN='devopslab-root-token'

# Wait for Vault to be ready
echo "Waiting for Vault to be ready..."
until curl -s ${VAULT_ADDR}/v1/sys/health > /dev/null 2>&1; do
    echo -n "."
    sleep 2
done
echo " Ready!"

# Enable KV secrets engine
echo "Enabling KV secrets engine..."
curl -X POST \
    -H "X-Vault-Token: ${VAULT_TOKEN}" \
    -d '{"type":"kv-v2"}' \
    ${VAULT_ADDR}/v1/sys/mounts/secret 2>/dev/null || echo "Secret engine already enabled"

# Create sample secrets
echo "Creating sample secrets..."
curl -X POST \
    -H "X-Vault-Token: ${VAULT_TOKEN}" \
    -d '{"data":{"username":"dbadmin","password":"super-secret-password","host":"postgres.internal","port":"5432"}}' \
    ${VAULT_ADDR}/v1/secret/data/database/postgres

curl -X POST \
    -H "X-Vault-Token: ${VAULT_TOKEN}" \
    -d '{"data":{"api_key":"sk-1234567890abcdef","api_secret":"secret-key-12345"}}' \
    ${VAULT_ADDR}/v1/secret/data/api/production

echo ""
echo "✓ Vault initialized successfully!"
echo ""
echo "Vault UI: http://localhost:8200"
echo "Token: devopslab-root-token"
echo ""
echo "Sample secrets created:"
echo "  - secret/database/postgres"
echo "  - secret/api/production"
