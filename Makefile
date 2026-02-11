.PHONY: help clone build sync sync-files clean version check-version

# Variables
HYPERDX_REPO := https://github.com/hyperdxio/hyperdx.git
HYPERDX_DIR := hyperdx
BUILD_DIR := hyperdx/packages/app/out
OUT_DIR := out
TAG ?= UNSET

# Default target - show help
help:
	@echo "HyperDX Build Makefile"
	@echo "======================"
	@echo ""
	@echo "Targets:"
	@echo "  make sync TAG=2.16.0  - Clone, build, and sync HyperDX (full workflow)"
	@echo "  make clone TAG=2.16.0 - Clone HyperDX at specific tag"
	@echo "  make build            - Build HyperDX from cloned source"
	@echo "  make sync-files       - Copy built files to repository"
	@echo "  make clean            - Remove build directory"
	@echo "  make version          - Show current synced version"
	@echo "  make check-version    - Check if current version matches TAG"
	@echo ""
	@echo "Variables:"
	@echo "  TAG - HyperDX release tag version (REQUIRED)"
	@echo ""
	@echo "Examples:"
	@echo "  make sync TAG=2.16.0  - Sync specific version"
	@echo ""

# Clone HyperDX repository
clone:
ifeq ($(TAG),UNSET)
	@echo "Error: TAG is required"
	@echo "Usage: make clone TAG=2.16.0"
	@exit 1
endif
	@echo "Cloning HyperDX $(TAG)..."
	@rm -rf $(HYPERDX_DIR)
	@git clone --depth 1 --branch @hyperdx/app@$(TAG) $(HYPERDX_REPO) $(HYPERDX_DIR)
	@echo "✓ Successfully cloned HyperDX $(TAG)"

# Build HyperDX
build:
	@if [ ! -d "$(HYPERDX_DIR)" ]; then \
		echo "Error: HyperDX directory not found at $(HYPERDX_DIR)"; \
		echo "Run 'make clone TAG=<version>' first"; \
		exit 1; \
	fi
	@echo "Installing dependencies..."
	cd $(HYPERDX_DIR) && yarn install --immutable
	@echo "Building HyperDX..."
	cd $(HYPERDX_DIR) && yarn build:clickhouse
	@if [ ! -d "$(BUILD_DIR)" ]; then \
		echo "Error: Build did not produce 'out' directory"; \
		exit 1; \
	fi
	@echo "✓ Build completed successfully"

# Sync built files to repository
sync-files:
	@if [ ! -d "$(BUILD_DIR)" ]; then \
		echo "Error: Built 'out' directory not found"; \
		echo "Run 'make build' first"; \
		exit 1; \
	fi
	@echo "Syncing built files to repository..."
	@rm -rf $(OUT_DIR)
	@cp -r $(BUILD_DIR) $(OUT_DIR)
	@echo "$(TAG)" > HYPERDX_VERSION
	@echo "✓ Synced HyperDX $(TAG) to repository"
	@echo "  - Built files: ./$(OUT_DIR)"
	@echo "  - Version file: HYPERDX_VERSION"

# Full sync workflow (clone + build + sync)
sync: clean clone build sync-files
	@echo ""
	@echo "========================================="
	@echo "✓ HyperDX $(TAG) successfully synced!"
	@echo "========================================="
	@echo ""
	@echo "Next steps:"
	@echo "  - Review changes: git status"
	@echo "  - Commit changes: git add out HYPERDX_VERSION && git commit -m 'chore: sync HyperDX $(TAG)'"
	@echo ""

# Clean up build directory
clean:
	@if [ -d "$(HYPERDX_DIR)" ]; then \
		echo "Cleaning up hyperdx directory..."; \
		rm -rf $(HYPERDX_DIR); \
		echo "✓ Build directory removed"; \
	fi

# Show current synced version
version:
	@if [ -f "HYPERDX_VERSION" ]; then \
		echo "Current synced version: $$(cat HYPERDX_VERSION)"; \
	else \
		echo "No version synced yet"; \
		echo "Run 'make sync TAG=<version>' to sync a version"; \
	fi

# Check if current version matches TAG
check-version:
ifeq ($(TAG),UNSET)
	@echo "Error: TAG is required"
	@exit 1
endif
	@if [ ! -f "HYPERDX_VERSION" ]; then \
		echo "skip=false"; \
		exit 0; \
	fi
	@CURRENT=$$(cat HYPERDX_VERSION); \
	if [ "$$CURRENT" = "$(TAG)" ]; then \
		echo "skip=true"; \
	else \
		echo "skip=false"; \
	fi
