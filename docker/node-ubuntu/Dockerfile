FROM ubuntu:24.04

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y \
    openssh-server \
    curl \
    python3 \
    python3-pip \
    sudo \
    vim \
    iputils-ping \
    wget \
    git \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Install Docker
RUN curl -fsSL https://get.docker.com -o get-docker.sh \
    && sh get-docker.sh \
    && rm get-docker.sh

# Install node_exporter for Prometheus metrics
RUN wget https://github.com/prometheus/node_exporter/releases/download/v1.7.0/node_exporter-1.7.0.linux-amd64.tar.gz \
    && tar xvfz node_exporter-1.7.0.linux-amd64.tar.gz \
    && cp node_exporter-1.7.0.linux-amd64/node_exporter /usr/local/bin/ \
    && rm -rf node_exporter-1.7.0.linux-amd64*


RUN mkdir /var/run/sshd

# Install TTYD
RUN curl -L https://github.com/tsl0922/ttyd/releases/download/1.7.3/ttyd.x86_64 -o /usr/bin/ttyd \
    && chmod +x /usr/bin/ttyd

# Remove existing ubuntu user if it exists to free up UID 1000
RUN if id -u ubuntu >/dev/null 2>&1; then userdel -rf ubuntu; fi

RUN useradd -m -s /bin/bash -u 1000 ansible && \
    echo "ansible:ansible" | chpasswd && \
    usermod -aG sudo ansible && \
    echo "ansible ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers

# Enable Password Auth for Lab
RUN sed -i 's/#PasswordAuthentication yes/PasswordAuthentication yes/' /etc/ssh/sshd_config

COPY branding.sh /etc/profile.d/branding.sh
RUN chmod +x /etc/profile.d/branding.sh

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 22 7681
CMD ["/entrypoint.sh"]
