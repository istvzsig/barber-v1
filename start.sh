#!/bin/bash

# Load logging.sh from github (ensure the URL is correct)
source functions.sh

# Handle Ctrl+C (SIGINT) and clean up processes before exiting
trap cleanup SIGINT

# Start the server and client in the background
# npx eslint ./client --fix

start_server &
start_client &

# Wait for the background processes to finish
wait

# Kill any existing server or client processes before starting new ones
kill_server_process
kill_client_process

rm -rf ./temp
# Notify that the application has started
echo "Application Stopped."
