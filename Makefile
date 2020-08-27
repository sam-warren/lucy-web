#!make

# ------------------------------------------------------------------------------
# Makefile -- InvasivesBC
# ------------------------------------------------------------------------------

-include .env

export $(shell sed 's/=.*//' .env)

all : help
.DEFAULT : help
.PHONY : local local-debug build-local setup-local run-local run-debug close-local cclean-local test-local database api app api-mobile help

# ------------------------------------------------------------------------------
# Task Aliases
# ------------------------------------------------------------------------------

local: | setup-docker close-local build-local run-local ## Performs all commands necessary to run api-mobile in docker

local-debug: | setup-docker close-local build-local run-debug ## Performs all commands necessary to run api-mobile in docker in debug mode

# ------------------------------------------------------------------------------
# Development Commands
# ------------------------------------------------------------------------------

setup-docker: ## Prepares the environment variables for local development using docker
	@echo "==============================================="
	@echo "Make: setup-local - copying env.docker to .env"
	@echo "==============================================="
	@cp env_config/env.docker .env

build-local: ## Builds the local development containers
	@echo "==============================================="
	@echo "Make: build-local - building Docker images"
	@echo "==============================================="
	@docker-compose -f docker-compose.yml build

run-local: ## Runs the local development containers
	@echo "==============================================="
	@echo "Make: run-local - running api/app images"
	@echo "==============================================="
	@docker-compose -f docker-compose.yml up -d

run-debug: ## Runs the local development containers in debug mode, where all container output is printed to the console
	@echo "==============================================="
	@echo "Make: run-debug - running api/app images in debug mode"
	@echo "==============================================="
	@docker-compose -f docker-compose.yml up

close-local: ## Closes the local development containers
	@echo "==============================================="
	@echo "Make: close-local - closing Docker containers"
	@echo "==============================================="
	@docker-compose -f docker-compose.yml down

clean-local: ## Closes and cleans (removes) local development containers
	@echo "==============================================="
	@echo "Make: clean-local - closing and cleaning Docker containers"
	@echo "==============================================="
	@docker-compose -f docker-compose.yml down -v --rmi all --remove-orphans

# ------------------------------------------------------------------------------
# Helper Commands
# ------------------------------------------------------------------------------

database: ## Executes into database container.
	@echo "==============================================="
	@echo "Make: Shelling into database container"
	@echo "==============================================="
	@export PGPASSWORD=$(DB_PASS)
	@docker-compose exec db psql -U $(DB_USER) $(DB_DATABASE)

api: ## Executes into the api container.
	@echo "==============================================="
	@echo "Shelling into api container"
	@echo "==============================================="
	@docker-compose exec api bash

app: ## Executes into the app container.
	@echo "==============================================="
	@echo "Shelling into app container"
	@echo "==============================================="
	@docker-compose exec app bash

api-mobile: ## Executes into the workspace container.
	@echo "==============================================="
	@echo "Shelling into api-mobile container"
	@echo "==============================================="
	@docker-compose exec api-mobile bash

help:	## Display this help screen.
	@grep -h -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'