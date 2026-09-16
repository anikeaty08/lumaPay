# LumaPay and Midnight MCP

There is no separate published LumaPay MCP package in this repository. Agents should use the Midnight MCP server for authoritative SDK, Compact, network, wallet, deployment, and troubleshooting guidance.

Initialize the Midnight agent skills once from the workspace:

```bash
npx midnight-agent-skills init
```

Use the MCP server to confirm version compatibility and current network behavior before changing chain-facing code. Keep all credentials in a local ignored `.env`; never pass them through MCP prompts or commit them.

A future LumaPay-specific MCP surface should expose safe product actions such as deployment status, contract identifiers, public invoice state, and checkout metadata. It must not expose mnemonics, seeds, private-state passwords, invoice openings, or claim secrets.
