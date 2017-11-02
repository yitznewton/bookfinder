#!/bin/sh

BRANCH_TO_DEPLOY=${1:-master}
BUILD_BRANCH=__deploy

git checkout -b ${BUILD_BRANCH} ${BRANCH_TO_DEPLOY} && \
    ng build -prod && \
    git add -f dist/ && \
    git commit -m "Production build" && \
    git push -f heroku deploy:master && \
    git checkout - && \
    git branch -D ${BUILD_BRANCH}
