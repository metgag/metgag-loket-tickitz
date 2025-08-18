FROM ubuntu

# update repo dan install SSH server
RUN apt-get update && apt-get install openssh-server -y

RUN mkdir -p /run/sshd

# membuat user baru dengan flag direktori dan shell
RUN useradd -m -d /home/archie -s /usr/bin/bash archie

# menyalin kunci public ke /home/archie ....
COPY koentji.pub /home/archie/.ssh/authorized_keys

# mengubah konfigurasi ssh
RUN sed -i 's/#PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config
RUN sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin no/' /etc/ssh/sshd_config
RUN sed -i 's/#PubKeyAuthentication no/PubKeyAuthentication yes/' /etc/ssh/sshd_config

CMD [ "/usr/sbin/sshd", "-D", "-e" ]
