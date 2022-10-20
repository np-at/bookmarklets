
NPROCS = $(shell sysctl hw.ncpu 2>/dev/null | grep -o '[0-9]\+' || echo "1")
MAKEFLAGS += -j$(NPROCS)

CWD:=$(shell /bin/pwd)
NPM_PATH:=$(shell command -v npm || echo "npm")
NPX_PATH:=$(shell command -v npx || echo "npx")
MS=src/scripts/main.ts

BOOKMARKLETS = $(basename $(notdir $(wildcard src/marklets/*.ts)))
COMPILED_MARKLETS := $(addprefix dist/, $(addsuffix .js,$(BOOKMARKLETS)))

help:
	@echo $(BOOKMARKLETS)
	@echo run \`make bookmarklets\` to generate the bookmarklets js in dist/$(MKLETS).js

dist .tmp:
	mkdir -p $@


install: .tmp/.install | .tmp

.tmp/.install: package-lock.json package.json | .tmp
	"$(NPM_PATH)" install
	@touch .tmp/.install

bookmarklets: $(COMPILED_MARKLETS)

$(COMPILED_MARKLETS) : dist/%.js : src/marklets/%.ts  | dist # $(MS) install
	@echo "Compiling $@"
	"$(NPX_PATH)" ts-node --project tsconfig.json "$(MS)" --input $< --output $@

clean:
	@echo "Cleaning"
	rm -rf dist/*
	rm -rf .tmp/

.PHONY: clean bookmarklets help install test all
