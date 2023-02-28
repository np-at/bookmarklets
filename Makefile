
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


install: .tmp/.install | .tmp

.tmp/.install .node_modules: package-lock.json package.json | .tmp
	"$(NPM_PATH)" install
	touch .tmp/.install

bookmarklets: $(COMPILED_MARKLETS)
	@echo "$(UTIL_FILES)"

$(COMPILED_MARKLETS) : dist/%.js : src/marklets/%.ts  | dist .node_modules .tmp/.install # $(MS) install
	@echo "Compiling $@"
	@"$(NPX_PATH)" ts-node --project tsconfig.json "$(MS)" --input $< --output $@

$(COMPILED_MARKLETS): $(UTIL_FILES)


build: bookmarklets

serve: bookmarklets
	"$(NPM_PATH)" run dev
clean:
	@echo "Cleaning"
	rm -rf dist/*
	rm -rf .tmp/

clean-all: clean
	rm -rf node_modules
	rm -f .node_modules


.PHONY: clean clean-all bookmarklets help install test all serve build
