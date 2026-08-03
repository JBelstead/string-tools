#!/usr/bin/env bash
set -e
cd "$(dirname "${BASH_SOURCE[0]}")"

PID_FILE=".dev-server.pid"
LOG_FILE=".dev-server.log"

if [ -f "$PID_FILE" ] && kill -0 "$(cat "$PID_FILE")" 2>/dev/null; then
  echo "Dev server already running (PID $(cat "$PID_FILE")) - http://localhost:5173/"
  exit 0
fi

nohup node node_modules/vite/bin/vite.js > "$LOG_FILE" 2>&1 &
echo $! > "$PID_FILE"
sleep 1
echo "Dev server started (PID $(cat "$PID_FILE")) - http://localhost:5173/"
echo "Logs: $LOG_FILE"
