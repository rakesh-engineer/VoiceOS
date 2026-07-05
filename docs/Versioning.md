# VoiceOS - Release Versioning Guidelines

VoiceOS follows standard Semantic Versioning (SemVer) guidelines for version control, dependency declarations, and documentation tracking.

---

## 1. Version Format

Versions are declared in the format `MAJOR.MINOR.PATCH` (e.g. `v1.0.0`):

1.  **`MAJOR` version bump:**
    *   Triggered when making incompatible API changes, structural database schema updates, or rewriting core routing systems.
    *   *Example:* Upgrading backend authentication structures that require old users to migrate accounts.
2.  **`MINOR` version bump:**
    *   Triggered when adding features or component layouts in a backwards-compatible manner.
    *   *Example:* Adding a new digital employee card block (AI Executive) or dynamic integrations.
3.  **`PATCH` version bump:**
    *   Triggered when making backwards-compatible bug fixes or security patches.
    *   *Example:* Adjusting visual CSS alignment rules, resolving typo tags, or fixing CORS rules in route handlers.

---

## 2. Release Status Tags

In early-stage releases, append release status qualifiers:

*   **`-alpha` (Alpha):** Internal engineering builds. High churn rate. API interfaces change frequently.
*   **`-beta` (Beta):** Feature-complete builds deployed to testing staging systems or shared with limited customers.
*   **`Public Beta` / `Release Candidate`:** Ready for public preview. Code undergoes hardening and QA testing before the final general availability (GA) label is assigned.

---

## 3. Version Tracking Locations

When upgrading the VoiceOS application version, ensure the release identifier is updated in the following repository files:

1.  **[package.json](file:///C:/Users/tcpwa/ProjectOS/package.json#L3):** Update the `version` field (e.g., `"version": "1.0.0"`).
2.  **[VERSION.md](file:///C:/Users/tcpwa/ProjectOS/VERSION.md):** Prepend a new changelog block containing the version number, publish date, release status, and summaries of new capabilities, resolved issues, and architectural refactoring details.
3.  **Git Tag:** Create a corresponding lightweight annotated tag on the final merge commit:
    ```bash
    git tag -a v1.0.0 -m "Release version 1.0.0 (Public Beta)"
    git push origin v1.0.0
    ```
