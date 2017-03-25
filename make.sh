#!/bin/bash

SCRIPT_DIR=$(cd $(dirname $(readlink $0 || echo $0));pwd -P)


# Using inliner which is distributed with npm
#
inliner ${SCRIPT_DIR}/sha256_calculator_dev.html > ${SCRIPT_DIR}/sha256_calculator.html



