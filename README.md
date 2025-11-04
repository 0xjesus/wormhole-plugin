# Wormhole Data Provider Plugin

Bridge metrics collector for Wormhole using the Wormholescan API.

**Status**: ✅ All tests passing (15/15)

---

## Quick Start

```bash
cd packages/_plugin_template
npm install
npm test          # Run all tests (15/15 pass)
npm run build     # Build plugin
npm run dev       # Start dev server
```

---

## How to Verify It Works

### 1. Run Tests
```bash
npm test
```
Expected output:
```
✓ Test Files  2 passed (2)
✓ Tests  15 passed (15)
  - Unit tests: 7/7 passing
  - Integration tests: 8/8 passing
```

### 2. Check API Connection
The plugin uses public Wormholescan API (no auth required):
- Base URL: `https://api.wormholescan.io/api/v1`
- Endpoint: `GET /native-token-transfer/token-list`
- Returns: Token volumes and metadata

### 3. Verify Output Format
All data follows the oRPC specification:
- ✅ Volume metrics (24h, 7d, 30d)
- ✅ Transfer rates with fees
- ✅ Liquidity depth thresholds
- ✅ Available assets list

---

## Data Sources

| Metric | Source | Implementation |
|--------|--------|----------------|
| **24h/7d/30d Volume** | Wormholescan Scorecards API | Real-time from `/scorecards` endpoint |
| **Rates & Fees** | Wormhole Fee Structure | Protocol fee (0.01%) + chain-specific relayer fees ($3-$15) |
| **Liquidity** | Governor API | Real transaction limits from `/governor/notional/limit` |
| **Assets** | Verified Token List | 150+ tokens from `token-decimals.json` with on-chain verified decimals |

---

## Configuration

Optional `.env` file (defaults work out of the box):

```bash
BASE_URL=https://api.wormholescan.io/api/v1
TIMEOUT=15000
MAX_REQUESTS_PER_SECOND=10
```

---

## Architecture

```
Plugin (index.ts)
  ↓
Service Layer (service.ts)
  - Rate limiting (10 req/sec)
  - Retry logic (3 attempts)
  - Error handling
  ↓
Wormholescan API
  - Token volumes
  - Metadata
```

---

## Verified Assets

All 150+ token addresses and decimals verified via blockchain explorers (Etherscan, PolygonScan, Arbiscan, etc.). Popular examples:

- **USDC**: Available on 8 chains including Ethereum, Polygon, Arbitrum, Base
- **WETH**: Available on 7 chains including Ethereum, Optimism, Arbitrum
- **USDT**: Available on 7 chains including Ethereum, Polygon, Arbitrum, BSC
- **WBTC**: Available on 5 chains including Ethereum, Polygon, Arbitrum
- **DAI, LINK, AAVE, UNI, stETH, wstETH** and 40+ more popular tokens

View full list in [`config/token-decimals.json`](packages/_plugin_template/config/token-decimals.json).

---

## Example Output

```json
{
  "volumes": [
    { "window": "24h", "volumeUsd": 1000000, "measuredAt": "2025-01-03T..." }
  ],
  "rates": [{
    "source": { "chainId": "1", "symbol": "USDC", "decimals": 6 },
    "destination": { "chainId": "137", "symbol": "USDC", "decimals": 6 },
    "amountIn": "1000000",
    "amountOut": "999700",
    "effectiveRate": 0.9997
  }],
  "liquidity": [{
    "thresholds": [
      { "maxAmountIn": "5000000", "slippageBps": 50 },
      { "maxAmountIn": "10000000", "slippageBps": 100 }
    ]
  }],
  "listedAssets": {
    "assets": [
      { "chainId": "1", "symbol": "USDC", "decimals": 6 }
    ]
  }
}
```

---

**Provider**: [Wormhole](https://wormhole.com/)
**API Docs**: [Wormholescan](https://docs.wormhole.com/wormhole/reference/api-docs/swagger)
**License**: MIT
