#!/bin/bash
# Helper script to start node_exporter on system nodes

if ! pgrep -f "node_exporter" > /dev/null; then
    nohup /usr/local/bin/node_exporter > /var/log/node_exporter.log 2>&1 &
    echo "Node exporter started"
else
    echo "Node exporter already running"
fi
