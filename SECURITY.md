# Security

This site is static: no server, no database, no forms that send data. The attack surface is
the build pipeline and its dependencies, and that is where the controls are
([ADR-0008](docs/adr/0008-supply-chain-security.md)):

- GitHub Actions pinned by commit SHA, least-privilege permissions, no persisted credentials;
- CodeQL on the code and on the workflows; OpenSSF Scorecard published weekly;
- dependency review on every pull request and `npm audit` in CI;
- `main` changes only through reviewed pull requests with green checks.

## Reporting a vulnerability

Please report it privately through GitHub: **Security → Report a vulnerability** on this
repository. Don't open a public issue. We'll reply as soon as we can and credit you if you want.
