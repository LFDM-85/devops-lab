FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y \
    software-properties-common \
    curl \
    git \
    vim \
    nano \
    iputils-ping \
    net-tools \
    openssh-client \
    sshpass \
    python3-pip \
    sudo \
    wget \
    unzip \
    jq \
    apt-transport-https \
    ca-certificates \
    gnupg \
    lsb-release \
    && add-apt-repository --yes --update ppa:ansible/ansible \
    && apt-get install -y ansible \
    && rm -rf /var/lib/apt/lists/*

# Install kubectl
RUN curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl" \
    && install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl \
    && rm kubectl

# Install Helm
RUN curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash

# Install Terraform
RUN wget -O- https://apt.releases.hashicorp.com/gpg | gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg \
    && echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | tee /etc/apt/sources.list.d/hashicorp.list \
    && apt-get update && apt-get install -y terraform \
    && rm -rf /var/lib/apt/lists/*

# Install Vault CLI
RUN apt-get update && apt-get install -y vault \
    && rm -rf /var/lib/apt/lists/*

# Install yq for YAML processing
RUN wget https://github.com/mikefarah/yq/releases/latest/download/yq_linux_amd64 -O /usr/bin/yq \
    && chmod +x /usr/bin/yq

# Install Docker CLI
RUN curl -fsSL https://get.docker.com -o get-docker.sh \
    && sh get-docker.sh \
    && rm get-docker.sh

# Install Ansible collections and additional tools
RUN ansible-galaxy collection install community.general \
    && ansible-galaxy collection install kubernetes.core \
    && ansible-galaxy collection install ansible.posix \
    && pip3 install ansible-lint docker


# Install TTYD
RUN curl -L https://github.com/tsl0922/ttyd/releases/download/1.7.3/ttyd.x86_64 -o /usr/bin/ttyd \
    && chmod +x /usr/bin/ttyd

# Remove existing ubuntu user if it exists to free up UID 1000
RUN if id -u ubuntu >/dev/null 2>&1; then userdel -rf ubuntu; fi

RUN useradd -m -s /bin/bash -u 1000 ansible && \
    echo "ansible:ansible" | chpasswd && \
    usermod -aG sudo ansible && \
    echo "ansible ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers

COPY branding.sh /etc/profile.d/branding.sh
RUN chmod +x /etc/profile.d/branding.sh

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

WORKDIR /home/ansible
CMD ["/entrypoint.sh"]
