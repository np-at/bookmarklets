
CWD:=$(shell /bin/pwd)
NPM_PATH:=$(shell command -v npm)
NPX_PATH:=$(shell command -v npx)
MS=src/scripts/main.ts

MKLETS = $(basename $(notdir $(wildcard src/marklets/*.ts)))


help:
	@echo run \`make bookmarklets\` to generate the bookmarklets js in dist/$(MKLETS).js

dist:
	mkdir -p $@


install: .tmp/.install | .tmp/

.tmp/.install: package-lock.json package.json | .tmp/
	$(NPM_PATH) install
	@touch .tmp/.install

bookmarklets: dist/$(MKLETS).js

dist/$(MKLETS).js : $(addprefix dist/, %.js) : src/marklets/%.ts | dist $(MS) install
	@echo "Compiling $@"
	$(NPX_PATH) ts-node --project tsconfig.json $(MS) $< $@

.tmp/:
	@mkdir -p .tmp

clean:
	@echo "Cleaning"
	rm -rf dist/*
	rm -rf .tmp/

.PHONY: clean bookmarklets help install test all
