FROM rockylinux:9

# Add --allowerasing to fix curl-minimal conflict
RUN dnf install -y --allowerasing \
    openssh-server \
    curl \
    python3 \
    python3-pip \
    sudo \
    vim \
    iputils \
    wget \
    git \
    gcc \
    make \
    procps-ng \
    dnf-plugins-core \
    iptables \
    && dnf clean all

# Install Docker
RUN dnf config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo \
    && dnf install -y docker-ce docker-ce-cli containerd.io \
    && dnf clean all

# Install node_exporter for Prometheus metrics
RUN wget https://github.com/prometheus/node_exporter/releases/download/v1.7.0/node_exporter-1.7.0.linux-amd64.tar.gz \
    && tar xvfz node_exporter-1.7.0.linux-amd64.tar.gz \
    && cp node_exporter-1.7.0.linux-amd64/node_exporter /usr/local/bin/ \
    && rm -rf node_exporter-1.7.0.linux-amd64*

# Install TTYD
RUN curl -L https://github.com/tsl0922/ttyd/releases/download/1.7.3/ttyd.x86_64 -o /usr/bin/ttyd \
    && chmod +x /usr/bin/ttyd

# Generate host keys
RUN ssh-keygen -A

RUN useradd -m -s /bin/bash -u 1000 ansible && \
    echo "ansible:ansible" | chpasswd && \
    usermod -aG wheel ansible && \
    echo "ansible ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers

# Enable Password Auth for Lab
RUN sed -i 's/#PasswordAuthentication yes/PasswordAuthentication yes/' /etc/ssh/sshd_config

COPY branding.sh /etc/profile.d/branding.sh
RUN chmod +x /etc/profile.d/branding.sh

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 22 7681
CMD ["/entrypoint.sh"]
