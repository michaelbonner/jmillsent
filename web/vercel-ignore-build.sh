#!/bin/bash

echo "VERCEL_ENV: $VERCEL_ENV"

# disable code check for builds for now
exit 1;

# Check if the commit has changes in the current directory
if [[ $(git diff HEAD^ HEAD .) ]] ; then

  # check if this is a production build, or a PR preview
  if [[ "$VERCEL_ENV" == "production" || "$VERCEL_ENV" == "preview" ]] ; then
    echo "✅ - Build can proceed"
    exit 1;

  else
    echo "🛑 - Not production or preview"
    exit 0;
  fi

else
  echo "🛑 - No changes in this directory"
fi 