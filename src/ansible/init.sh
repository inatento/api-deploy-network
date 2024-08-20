#!/bin/bash
. ../config.sh

dash "info" "Iniciando Ansible"
execute_with_spinner "ansible-config init --disabled -t all > ansible.cfg"