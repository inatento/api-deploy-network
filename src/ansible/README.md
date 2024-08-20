# Dar permisos a los scripts:
> chmod 755 *.sh

# NOTA: Para poder probar ansible en el proyecto debe haber instalado previamente desde ../setup/ansible.sh
# Agregar la siguiente línea al archivo ansible.cfg:
roles_path = ./roles

# Verificar que haya par de claves ssh:
ls -al ~/. ssh
# Sino hay par de llaves generarlos con:
ssh-keygen
# Copiar el contenido que hay:
cat ~/.ssh/id_rsa.pub
# Pegar el contenido en las llaves de las instancias nodo de Ansible (las que serán los peers de la red) de GCP

# Listar hosts:
ansible-inventory -i ./inventory/hosts.yml --list
# Probar conexión:
ansible -i ./inventory/hosts.yml orgs -m ping
# Ejecutar un conjunto de tareas:
ansible-playbook -i ./inventory/hosts.yml ./playbooks/install_docker.yml
# Ejecutar una tarea específica:
ansible-playbook -i ./inventory/hosts.yml ./playbooks/install_docker.yml --tags "set-docker-permissions"