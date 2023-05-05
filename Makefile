# Common makefile commands & variables between projects
include .make/common.mk

## Set the distribution folder
ifndef DISTRIBUTIONS_DIR
	override DISTRIBUTIONS_DIR=./release
endif

## Not defined? Use default repo name which is the application
ifeq ($(REPO_NAME),)
	REPO_NAME="widget-react"
endif

## Not defined? Use default repo owner
ifeq ($(REPO_OWNER),)
	REPO_OWNER="tonicpow"
endif

## Default branch
ifndef REPO_BRANCH
	override REPO_BRANCH="master"
endif

.PHONY: audit
audit: ## Checks for vulnerabilities in dependencies
	@npm audit

.PHONY: build
build: ## Builds the package for web distribution
	@npm run build

.PHONY: clean
clean: ## Remove previous builds and any test cache data
	@npm run clean
	@if [ -d $(DISTRIBUTIONS_DIR) ]; then rm -r $(DISTRIBUTIONS_DIR); fi
	@if [ -d build ]; then rm -r build; fi
	@if [ -d build_cache ]; then rm -r build_cache; fi
	@if [ -d node_modules ]; then rm -r node_modules; fi

.PHONY: install
install: ## Installs the dependencies for the package
	@npm install

.PHONY: lint
lint: ## Runs the standard-js lint tool
	@npm run lint

.PHONY: outdated
outdated: ## Checks for outdated packages via npm
	@npm outdated

.PHONY: publish
publish: ## Will publish the version to npm
	@npm run deploy

.PHONY: release
release:: ## Deploy to npm
	@npm run deploy

.PHONY: test
test: ## Runs all tests
	@npm run test
