# ClickHouse ClickStack

Automated synchronization and static build repository for HyperDX releases, to
be included in [ClickHouse](https://github.com/ClickHouse/ClickHouse) as a
submodule.

## Overview

This repository automatically clones, builds, and stores HyperDX releases. The
built `out` directory from HyperDX is committed to this repository, making it
easy to track and deploy specific versions.

## How It Works

The repository uses a **Makefile** to define reproducible build steps, which are executed both locally and in CI. The GitHub Action workflow:

1. **Monitors** for new HyperDX releases (daily scheduled checks)
2. **Clones** the specified HyperDX release via `make sync`
3. **Builds** the project using yarn
4. **Commits** the built `out` directory to this repository
5. **Tracks** the current version in `HYPERDX_VERSION`

This approach ensures that local builds and CI builds are identical.

## Local Usage

You can reproduce the build process locally using the provided Makefile.

### Prerequisites

- `make`
- `git`
- `node` and `yarn` (matching the versions in hyperdx's `.nvmrc`)

### Commands

```bash
# Show all available commands
make help

# Sync specific version (TAG is REQUIRED)
make sync TAG=2.16.0

# Individual steps
make clone TAG=2.16.0 # Clone specific version
make build            # Build from cloned source
make sync-files       # Copy built files to repo

# Utility commands
make version            # Show current synced version
make clean              # Remove build directory
```

### Example Workflow

```bash
# Clone and build specific release
make sync TAG=2.16.0

# Review changes
git status
git diff
```

## Version Tracking

The current HyperDX version is stored in the `HYPERDX_VERSION` file at the root
of this repository. This file is automatically updated with each successful
sync. Each HyperDX release is tagged and publishes a github release.

## License

See [LICENSE](LICENSE) file for details.
