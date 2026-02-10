# ClickHouse ClickStack

Automated synchronization and build repository for HyperDX releases.

## Overview

This repository automatically clones, builds, and stores HyperDX releases. The built `out` directory from HyperDX is committed to this repository, making it easy to track and deploy specific versions.

## How It Works

The repository uses a **Makefile** to define reproducible build steps, which are executed both locally and in CI. The GitHub Action workflow:

1. **Monitors** for new HyperDX releases (daily scheduled checks)
2. **Clones** the specified HyperDX release via `make sync`
3. **Builds** the project using yarn
4. **Commits** the built `out` directory to this repository
5. **Tracks** the current version in `HYPERDX_VERSION`

This approach ensures that local builds and CI builds are identical.

## Triggering the Workflow

### Automatic (Scheduled)

The workflow runs automatically every day at 2 AM UTC to check for new HyperDX releases.

### Manual Trigger

You can manually trigger the workflow from the GitHub Actions tab:

1. Go to **Actions** → **Sync HyperDX Release**
2. Click **Run workflow**
3. Specify a release tag (e.g., `@hyperdx/app@2.16.0`) - **REQUIRED**
4. Click **Run workflow**

### Triggered from HyperDX Repository

To trigger this workflow from the HyperDX repository (e.g., when a new release is published), add the following step to their release workflow:

```yaml
- name: Trigger sync in downstream repo
  run: |
    curl -X POST \
      -H "Authorization: token ${{ secrets.PAT_TOKEN }}" \
      -H "Accept: application/vnd.github.v3+json" \
      https://api.github.com/repos/YOUR_USERNAME/clickhouse-clickstack/dispatches \
      -d '{"event_type":"new-release","client_payload":{"tag":"${{ github.ref_name }}"}}'
```

**Note:** This requires a Personal Access Token (PAT) with `repo` scope stored as a secret in the HyperDX repository.

## Local Usage

You can reproduce the build process locally using the provided Makefile.

### Prerequisites

- `make`
- `git`
- `node` and `yarn` (matching the versions in `.nvmrc`)
- `jq` (for parsing GitHub API responses)

### Commands

```bash
# Show all available commands
make help

# Sync specific version (TAG is REQUIRED)
make sync TAG=@hyperdx/app@2.16.0

# Individual steps
make clone TAG=@hyperdx/app@2.16.0   # Clone specific version
make build                           # Build from cloned source
make sync-files                      # Copy built files to repo

# Utility commands
make version            # Show current synced version
make clean              # Remove build directory
```

### Example Workflow

```bash
# Clone and build specific release
make sync TAG=@hyperdx/app@2.16.0

# Review changes
git status
git diff

# Commit changes
git add out HYPERDX_VERSION
git commit -m "chore: sync HyperDX $(cat HYPERDX_VERSION)"
git push
```

## Repository Structure

```
.
├── .github/
│   └── workflows/
│       └── sync-hyperdx.yml    # GitHub Action workflow
├── hyperdx/                    # HyperDX source (gitignored, temporary)
├── out/                        # Built HyperDX files (committed)
├── .gitignore                  # Ignore build directory and temp files
├── Makefile                    # Build automation (used by CI and locally)
├── HYPERDX_VERSION            # Current synced version
├── LICENSE
└── README.md
```

## Workflow Details

### Triggers

- **Schedule**: Daily at 2:00 AM UTC
- **workflow_dispatch**: Manual trigger with optional tag input
- **repository_dispatch**: External trigger with tag payload

### Version Detection Priority

1. Manual workflow input tag
2. Repository dispatch payload tag
3. Latest release from HyperDX GitHub API

### Skipping Unnecessary Builds

The workflow automatically skips building if the target version matches the current `HYPERDX_VERSION`, preventing redundant builds and commits.

### Build Process

The build process is defined in the `Makefile` and executes:

```bash
# Clone HyperDX at specified tag into hyperdx/ directory
git clone --depth 1 --branch <TAG> https://github.com/hyperdxio/hyperdx.git hyperdx

# Install dependencies (frozen lockfile for reproducibility)
cd hyperdx && yarn install --frozen-lockfile

# Build project
yarn build

# Copy out/ directory to repository
cp -r hyperdx/out ./out
```

Both local builds (via `make sync`) and CI builds use the same Makefile, ensuring consistency.

## Setup Requirements

### For This Repository

No special setup required. The workflow uses the default `GITHUB_TOKEN` which has sufficient permissions to commit to the repository.

### For External Triggers

If you want to trigger this workflow from the HyperDX repository:

1. Create a Personal Access Token (PAT) with `repo` scope
2. Add it as a secret (e.g., `PAT_TOKEN`) in the HyperDX repository
3. Update the repository owner/name in the trigger curl command

## Monitoring

Each workflow run creates a summary showing:
- Target version
- Whether the build was skipped
- Final status

View summaries in the GitHub Actions run details.

## Version Tracking

The current HyperDX version is stored in the `HYPERDX_VERSION` file at the root of this repository. This file is automatically updated with each successful sync.

## License

See [LICENSE](LICENSE) file for details.
