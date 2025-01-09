#!/bin/bash

# Start the frontend
cd ./client/
npm run dev &

# Start the backend
cd ../server/
node index.js &
