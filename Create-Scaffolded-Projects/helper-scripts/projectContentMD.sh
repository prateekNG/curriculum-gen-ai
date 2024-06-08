#!/bin/bash

# Check if the source directory is provided
if [ -z "$1" ]; then
  echo "Usage: $0 <source_directory>"
  exit 1
fi

SOURCE_DIR="$1"

# Get the project directory name from the source directory
PROJECT_NAME=$(basename "$SOURCE_DIR")

# Output directory and file name
OUTPUT_DIR="output"
OUTPUT_FILE="$OUTPUT_DIR/$PROJECT_NAME.md"

# Hardcoded list of files and directories to ignore
IGNORE_LIST=(
  "ignored_file.txt"
  "ignored_directory"
  # Add more files or directories to ignore here
)

# Function to check if a file or directory should be ignored
should_ignore() {
  local file="$1"
  for ignore in "${IGNORE_LIST[@]}"; do
    if [[ "$file" == *"$ignore"* ]]; then
      return 0
    fi
  done
  return 1
}

# Function to check if a file is binary (improved)
is_binary() {
  local file="$1"
  # Check if the file contains any non-printable characters
  if grep -q '[^[:print:]]' "$file"; then
    return 0 # Binary file
  else
    return 1 # Text file
  fi
}

# Create the output directory if it doesn't exist
mkdir -p "$OUTPUT_DIR"

# Create or empty the output file
>"$OUTPUT_FILE"

# Process files in the source directory
process_files() {
  local dir="$1"
  local rel_path="$2"

  for entry in "$dir"/*; do
    if should_ignore "$entry"; then
      continue
    fi

    if [ -d "$entry" ]; then
      process_files "$entry" "$rel_path$(basename "$entry")/"
    elif [ -f "$entry" ]; then
      if is_binary "$entry"; then
        continue
      fi

      local ext="${entry##*.}"
      # extract the file path relative to the source directory, prefixed with "./"
      local file_path="./${rel_path}$(basename "$entry")"
      # local file_path="${rel_path}$(basename "$entry")"

      echo "### $file_path" >>"$OUTPUT_FILE"
      echo "\`\`\`$ext" >>"$OUTPUT_FILE"
      cat "$entry" >>"$OUTPUT_FILE"
      echo "\`\`\`" >>"$OUTPUT_FILE"
      echo '' >>"$OUTPUT_FILE"
    fi
  done
}

process_files "$SOURCE_DIR" ""

echo "Markdown file generated: $OUTPUT_FILE"