
NPROCS = $(shell sysctl hw.ncpu 2>/dev/null | grep -o '[0-9]\+' || echo "1")
MAKEFLAGS += -j$(NPROCS)

CWD:=$(shell /bin/pwd)
NPM_PATH:=$(shell command -v npm || echo "npm")
NPX_PATH:=$(shell command -v npx || echo "npx")
MS=src/scripts/main.ts

BOOKMARKLETS = $(basename $(notdir $(wildcard src/marklets/*.ts)))
COMPILED_MARKLETS := $(addprefix dist/, $(addsuffix .js,$(BOOKMARKLETS)))
UTIL_FILES := $(wildcard src/utils/*.ts)

help:
	@echo $(BOOKMARKLETS)
	@echo run \`make bookmarklets\` to generate the bookmarklets js in dist/$(MKLETS).js

dist .tmp:
	mkdir -p $@

lint: .node_modules
	"$(NPM_PATH)" run lint

install: .tmp/.install | .tmp

.tmp/.install .node_modules: package-lock.json package.json | .tmp
	"$(NPM_PATH)" clean-install
	touch .tmp/.install

bookmarklets: $(COMPILED_MARKLETS)
	@echo "$(UTIL_FILES)"

$(COMPILED_MARKLETS) : dist/%.js : src/marklets/%.ts  | dist .node_modules .tmp/.install # $(MS) install
	@echo "Compiling $@"
	@"$(NPX_PATH)" tsx --tsconfig tsconfig.web.json "$(MS)" --input $< --output $@

$(COMPILED_MARKLETS): $(UTIL_FILES)


_site: bookmarklets
	@echo "cleaning out directory"
	"$(NPX_PATH)" parcel build --public-url ./ --dist-dir _site src/index.html

build: _site

serve: bookmarklets
	"$(NPM_PATH)" run dev

new-bookmarklet: install
	@echo "Creating new bookmarklet"
	"$(NPX_PATH)" tsx src/scripts/addScript.ts

clean:
	@echo "Cleaning"
	rm -rf dist/*
	rm -rf .tmp/
	rm -rf .parcel-cache/

clean-all: clean
	rm -rf node_modules
	rm -f .node_modules


.PHONY: clean clean-all bookmarklets help install test all serve build lint new-bookmarklet
