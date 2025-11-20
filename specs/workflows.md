---

# ✅ **4. `specs/workflows.md`**  
Define how to automatize with Kiro

```md
# Workflow Specification for Kiro Automation

## Overview
Kiro must automate:
- documentation generation
- READMEs updates
- version bumping
- changelog creation
- component documentation updates

These workflows are executed by events defined in `.kiro/hooks.yaml`.

---

## Documentation Workflow

### Trigger:

- onCommit
- onMergeToMain

### Actions:

1. Inspect changed files
2. Build markdown documentation using:
   - dashboard.md
   - components.md
   - architecture.md
3. Update:
   - README.md (latest changes section)
   - docs/dashboard.md
   - CHANGELOG.md

---

## Versioning Workflow

### Trigger:

- onMergeToMain

### Rules:

- Use semantic versioning
- Default bump: patch
- If commit contains “BREAKING CHANGE”, bump major
- Update `package.json` and `package-lock.json`

---

## Testing Workflow

Before commit, Kiro must:

- run eslint
- run tests with coverage
- block commit if tests fail

---

## CI Expectations

Kiro-generated documentation must be consistent across environments.
