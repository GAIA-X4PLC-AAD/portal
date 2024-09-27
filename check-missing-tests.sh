#!/bin/bash
git fetch origin main

# Step 1: Get the list of changed JS, TS, JSX and TSX files in the src directory
CHANGED_FILES=$(git diff --name-only origin/main..HEAD -- 'src/*.[jt]s' 'src/*.[jt]sx')

# Initialize an empty array to hold files without tests
MISSING_TEST_FILES=()

# Step 2: Loop through each changed file and check if it has a corresponding test file
for FILE in $CHANGED_FILES; do
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
