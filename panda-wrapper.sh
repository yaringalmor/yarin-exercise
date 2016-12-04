#!/bin/bash

function usage {
    echo "Usage: panda-wrapper.sh SERVICE_TO_DEPLOY"
    echo "SERVICE_TO_DEPLOY - static-panda/counting-panda/all"
}

function run_playbook {
    exec ansible-playbook $PLAYBOOK -i $INVENTORY -e "$EXTRA_ENVS"
}

if [ $# != 1 ] ; then
    usage
    exit 0
fi

SERVICE_TO_DEPLOY=$1
PLAYBOOK=base.yml
INVENTORY=dev
EXTRA_ENVS="deploy_service="
declare -a Optional_Services=("static-panda" "counting-panda" "all")

for service in "${Optional_Services[@]}"; do 
    if [[ $service == $SERVICE_TO_DEPLOY ]]; then
        echo "Executing playbook for option:" $SERVICE_TO_DEPLOY
        EXTRA_ENVS=$EXTRA_ENVS+\"$SERVICE_TO_DEPLOY\"
        run_playbook
        exit 1
    fi   
done

usage
exit 2
