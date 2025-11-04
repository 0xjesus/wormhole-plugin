# Wormhole Plugin

Bridge metrics collector using the Wormholescan API.

## Quick Start

```bash
bun install
bun test
bun run build
```

## Configuration

Optional `.env` (defaults work out of the box):

```bash
BASE_URL=https://api.wormholescan.io/api/v1
TIMEOUT=15000
MAX_REQUESTS_PER_SECOND=10
```

## Features

- Real-time volume metrics (24h, 7d, 30d)
- Transfer rates with protocol fees (0.01%)
- Liquidity depth thresholds
- 150+ verified tokens across 8+ chains

## Output Format

```json
{
  "volumes": [
    { "window": "24h", "volumeUsd": 1000000 }
  ],
  "rates": [{
    "source": { "chainId": "1", "symbol": "USDC" },
    "destination": { "chainId": "137", "symbol": "USDC" },
    "effectiveRate": 0.9997
  }]
}
```

## License

MIT
