#!/bin/bash

# Start SSH Daemon
# Check for Ubuntu/Debian vs RHEL/Rocky paths
if [ -x "$(command -v systemctl)" ]; then
    # Start via service if available (unlikely in docker without systemd)
    service ssh start || /usr/sbin/sshd
elif [ -f /usr/sbin/sshd ]; then
    # Direct execution (Rocky/Ubuntu)
    # Ensure dir exists
    mkdir -p /var/run/sshd
    # Generate host keys if missing (Rocky)
    if [ -f /etc/ssh/ssh_host_rsa_key ]; then :; else ssh-keygen -A; fi
    /usr/sbin/sshd
fi

# Start TTYD (Web Terminal)
# -p 7681: Listen on port 7681 inside container
# -W: Writable
# su - ansible: Login as ansible user
echo "Starting TTYD..."
nohup ttyd -p 7681 -W su - ansible > /var/log/ttyd.log 2>&1 &

# Keep container alive
tail -f /dev/null
