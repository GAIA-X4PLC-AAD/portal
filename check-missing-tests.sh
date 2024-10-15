#!/bin/bash

# Fetch the latest changes from origin (main)
git fetch origin main

# Step 1: Get the list of changed JS, TS, JSX, and TSX files in the src directory, compared to the merge base
# Only include added or modified files (exclude deleted ones) using --diff-filter=ACM
CHANGED_FILES=$(git diff --name-only --diff-filter=ACM origin/main..HEAD -- 'src/*.[jt]s' 'src/*.[jt]sx')

# Initialize an empty array to hold files without tests
MISSING_TEST_FILES=()

# Read the list of files to ignore for coverage, trim leading and trailing whitespaces
IGNORE_LIST=$(sed 's/^[[:space:]]*//;s/[[:space:]]*$//' .coverageignore)

# Step 2: Loop through each changed file and check if it has a corresponding test file or contains the istanbul ignore comment
for FILE in $CHANGED_FILES; do
  # Check if the file is in the ignore list
    if echo "$IGNORE_LIST" | grep -Fxq "$FILE"; then
      echo "Skipping coverage check for $FILE (in .coverageignore)"
      continue
    fi

  # Check if the file contains the /* test coverage not required */ comment
  if grep -q "/\* test coverage not required \*/" "$FILE"; then
    echo "Skipping coverage check for $FILE (contains /* test coverage not required */)"
    continue
  fi

  # Extract the file path and replace "src/" with "tests/" and add ".test" postfix
  TEST_FILE=$(echo "$FILE" | sed 's|^src/|tests/|' | sed 's|\.[jt]sx\?$|.test&|')

  # Check if the corresponding test file exists
  if [[ ! -f "$TEST_FILE" ]]; then
    MISSING_TEST_FILES+=("$FILE") # Add to missing test files array if test is not found
  fi
done

# Step 3: Report and fail if there are any missing test files
if [ ${#MISSING_TEST_FILES[@]} -ne 0 ]; then
  echo "The following source files do not have corresponding test files:"
  for MISSING_FILE in "${MISSING_TEST_FILES[@]}"; do
    echo "$MISSING_FILE"
  done
  exit 1 # Fail the workflow
else
  echo "All changed files have corresponding test files."
  exit 0 # Success
fi
