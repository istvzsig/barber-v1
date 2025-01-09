#!/bin/bash

# Color codes
COLOR_INFO='\033[0;34m'    # Informational messages
COLOR_WARNING='\033[0;33m' # Warning messages
COLOR_SUCCESS='\033[0;32m' # Success messages
COLOR_ERROR='\033[0;31m'   # Error messages
COLOR_MISC='\033[0;35m'    # Miscellaneous messages
COLOR_DEBUG='\033[0;36m'   # Debug messages
COLOR_DEFAULT='\033[0;37m' # Default messages
NO_COLOR='\033[0m'         # No Color

# Server
SERVER_PORT=3000 # Get the port from .env file
SERVER_PID=$(lsof -t -i:$SERVER_PORT)
SERVER_FILE=server/index.js

function log() {
    mkdir -p logs
    local current_datetime=$(date '+%Y-%m-%d_%H-%M-%S')
    local current_time=$(date '+%Y-%m-%d %H:%M:%S')
    LOG_FILE=$(mktemp "logs/${current_datetime}.log")
    local color="$1"
    local level="$2"
    local message="$3"
    local log_entry="${color}[${level}]: $current_time - $message${NO_COLOR}"
    echo "$log_entry" >>"$LOG_FILE"
}

function log_server() {
    local color=$1
    local message=$2
    log $color "SERVER" $message
}

function log_client() {
    local color=$1
    local mesage=$2
    log $color "CLIENT" $message
}

function kill_server_process() {
    if [[ -n $SERVER_PID ]]; then
        kill -9 $SERVER_PID
        log_server $COLOR_ERROR "Process with PID: $SERVER_PID force killed." $LOG_FILE
        sleep 1
    fi
}

function start_backend() {
    mkdir -p temp
    set -x
    kill_server_process
    local TEMP_FILE=$(mktemp "/temp.XXXXXX")
    node "$SERVER_FILE" &>"$TEMP_FILE" &
    local pid=$!
    wait $pid
    local node_output=$(cat "$TEMP_FILE")
    log_server $COLOR_SUCCESS $node_output
}

function start_frontend {
    # log_client $COLOR_SUCCESS "Client started..."
    cd client/
    npm run dev &
}

function start_server_test() {
    cd server/
    npm test
    cd ..
    echo "Server tests finished."
    exit 0
}
