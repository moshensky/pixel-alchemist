#!/usr/bin/env bash

# exit on error
set -e

usage() {
    echo "usage: deploy --set-version v0.0.1 --port 22"
}

files_path="./ops/deploy/files"
www_dir="/srv/www/pixel-alchemist"
temp_www_dir="www-pixel-alchemist"
username="nikita"
host="pixel-alchemist.moshensky.com"

new_version=
port=

while [ "$1" != "" ]; do
    case $1 in
        --set-version)
                                  shift
                                new_version=$1
                                ;;
        --port)
                                shift
                                port=$1
                                ;;
        -h | --help)
                                usage
                                exit
                                ;;
        *)
                                usage
                                exit 1
            ;;
    esac
    shift
done

if [ -z "$new_version" ]; then
    usage
    exit 1
fi

read -s -p "Become pass: " password
echo ''
read -s -p "Docker token: " docker_token
echo ''

# -- Create versioned docker-compose file
template_docker_compose=${files_path}/docker-compose.yml
docker_compose_path=${files_path}/docker-compose-${new_version}.yml
cp "$template_docker_compose" "$docker_compose_path"

image="moshensky/lw:pixel-alchemist-"
image_with_version="${image}${new_version}"
awk '{if (match($0, "'"${image}"'") > 0) print "    image: '"${image_with_version}"'" ;else print}' "$docker_compose_path" > tmp
mv tmp "$docker_compose_path"

# -- Build docker image
docker build --platform=linux/amd64 --build-arg new_version="${new_version}" -t "$image_with_version" -f "./ops/deploy/Dockerfile" .

# -- Push images
echo "${docker_token}" | docker login --username moshensky --password-stdin
docker push "$image_with_version"

# -- Pull images
execute_remote_sudo_cmd() {
    local cmd=$1
    ssh "${username}@${host}" -p "$port" "echo ${password} | sudo -S ${cmd}"
}

execute_remote_cmd() {
    local cmd=$1
    ssh "${username}@${host}" -p "$port" "$cmd"
}

echo ">>> Deploying to $host"
echo "Create dir"
execute_remote_sudo_cmd "mkdir -p $www_dir"
echo ">>> Start files copy"
scp -P "$port" -r "${files_path}" "${username}@${host}:~/$temp_www_dir"
echo ">>> Move files to appropriate directory"
execute_remote_sudo_cmd "cp -rf $temp_www_dir/* $www_dir && rm -rf $temp_www_dir"
# Pull docker image
execute_remote_cmd "echo $docker_token | docker login --username moshensky --password-stdin && docker pull $image_with_version"
# Start it up
execute_remote_cmd "docker compose -f $www_dir/docker-compose-${new_version}.yml up -d --force-recreate --remove-orphans"

echo "Success!"
exit 0
