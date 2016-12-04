#!/bin/bash

function help {
    echo "Usage: ansible-wrapper SERVICE_TO_DEPLOY"
    echo "SERVICE_TO_DEPLOY - static-panda/counting-panda/both"
}

PLAYBOOK="both"
if [ $# != 1 ]; then
    help
    exit 0
fi

SERVICE_TO_DEPLOY=$1
PLAYBOOK=base.yml

exec ansible-playbook $PLAYBOOK -i dev -e "deploy_service=\"$SERVICE_TO_DEPLOY\""
