#!/bin/bash

BRANCH_TO_DEPLOY=${1:-master}
BUILD_BRANCH=__deploy

if [[ `git status --porcelain` ]]; then
  echo "Your git repo has local changes"
  exit 1
fi

git checkout -b ${BUILD_BRANCH} ${BRANCH_TO_DEPLOY} && \
    ng build -prod && \
    git add -f dist/ && \
    git commit -m "Production build" && \
    git push -f heroku ${BUILD_BRANCH}:master && \
    git checkout - && \
    git branch -D ${BUILD_BRANCH}
