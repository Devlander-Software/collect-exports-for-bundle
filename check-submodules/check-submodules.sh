#!/bin/bash

# Base path to the submodules
SUBMODULES_BASE_PATH="example/src/packages/@devlander"
STATUS_FILE="submodule_status.json"

# Check if a directory is empty
is_empty() {
  if [ -d "$1" ] && [ -z "$(ls -A "$1")" ]; then
    return 0
  else
    return 1
  fi
}

# Initialize and update git submodule
init_submodule() {
  git submodule update --init -- "$1"
}

# Install npm package
install_package() {
  (cd "$1" && yarn install)
}

# Update the JSON status file
update_status() {
  NOW=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

  if [ ! -f "$STATUS_FILE" ]; then
    echo "{}" > "$STATUS_FILE"
  fi

  UPDATED_JSON=$(jq --arg path "$1" --arg time "$NOW" '.[$path] = $time' "$STATUS_FILE")
  echo "$UPDATED_JSON" > "$STATUS_FILE"
}

# Iterate over each submodule in the base path
for SUBMODULE in "$SUBMODULES_BASE_PATH"/*; do
  # Extract the name of the submodule from the path
  SUBMODULE_NAME=$(basename "$SUBMODULE")
  
  # Full path to the submodule
  FULL_SUBMODULE_PATH="$SUBMODULES_BASE_PATH/$SUBMODULE_NAME"

  echo "Checking submodule: $SUBMODULE_NAME"

  if is_empty "$FULL_SUBMODULE_PATH"; then
    echo "Submodule directory is empty. Initializing and updating submodule: $SUBMODULE_NAME"
    init_submodule "$FULL_SUBMODULE_PATH"

    echo "Installing submodule: $SUBMODULE_NAME"
    install_package "$FULL_SUBMODULE_PATH"

    echo "Updating status file for submodule: $SUBMODULE_NAME"
    update_status "$SUBMODULE_NAME"
else
    LAST_UPDATE=""
    if [ -f "$STATUS_FILE" ]; then
        LAST_UPDATE=$(jq -r --arg path "$SUBMODULE_NAME" '.[$path]' "$STATUS_FILE")
    fi

    TODAY=$(date -u +"%Y-%m-%d")
    if [ -z "$LAST_UPDATE" ] || [ "${LAST_UPDATE:0:10}" != "$TODAY" ]; then
        echo "Submodule $SUBMODULE_NAME has not been updated today. Pulling latest changes."
        (cd "$FULL_SUBMODULE_PATH" && git pull)

        echo "Updating status file for submodule: $SUBMODULE_NAME"
        update_status "$SUBMODULE_NAME"
    else
        echo "Submodule $SUBMODULE_NAME is up-to-date. No action taken."
    fi
fi


done
