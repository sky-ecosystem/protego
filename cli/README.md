# Protego Scripts

## Usage

```
npx @sky-ecosystem/protego@latest [options] [command]
```

```
Usage: Protego CLI [options] [command]

  ____                   _
 |  _ \   _ __    ___   | |_    ___    __ _    ___
 | |_) | | '__|  / _ \  | __|  / _ \  / _` |  / _ \
 |  __/  | |    | (_) | | |_  |  __/ | (_| | | (_) |
 |_|     |_|     \___/   \__|  \___|  \__, |  \___/
                                      |___/

Options:
  -V, --version                    output the version number
  -r, --rpc-url <rpc-url>          Ethereum Node RPC URL (default: "https://mainnet.gateway.tenderly.co", env: ETH_RPC_URL)
  -b, --from-block <block-number>  Display spells from a given block (default: 0)
  --pause-address <address>        MCD_PAUSE contract address (default: "0xbE286431454714F511008713973d3B053A2d38f3")
  -h, --help                       display help for command

Commands:
  list [options]                   List spells by status
  encode                           Encode calldata to drop spells (i.e: input for Etherscan/Tenderly  UIs)
  help [command]                   display help for command
```

### CLI Commands

The Protego CLI supports the following commands:

**1. `list` command**

This command lists spells based on the provided filters. It utilizes global options (like `--rpc-url`, `--from-block`, `--pause-address`) for context and has its own specific options (`--status`, `--format`) to control its behavior.

**Usage Examples:**

To list all `PENDING` spells from block `19420069` using default RPC and table format:

```bash
npx @sky-ecosystem/protego@latest list --status PENDING --from-block 19420069
```

To list `ALL` spells from the default block, using a custom RPC URL, and outputting in `JSON` format:

```bash
npx @sky-ecosystem/protego@latest list --rpc-url <your-custom-rpc-url> --format JSON
```

**Command Options:**

```
Usage: Protego CLI list [options]

List pending spells by status

Options:
  -s, --status <status>  Filter by status (choices: "PENDING", "DROPPED", "EXECUTED", "ALL", default: "ALL")
  -f, --format <format>  Output format (choices: "TABLE", "JSON", default: "TABLE")
  -h, --help             display help for command
```

Output can be a table for a quick glance at Spells or JSON: Better for copy and pasting into block explorers or transaction builders.

**Output - Table (default):**

```
╔═══════════════════╤═══════════════════╤═══════════════════╤═══════════════════╤════════════╤═════════════════════════════╤════════════╗
║ GUY               │ HASH              │ USR               │ TAG               │ FAX        │ ETA (UTC)                   │ STATUS     ║
╟───────────────────┼───────────────────┼───────────────────┼───────────────────┼────────────┼─────────────────────────────┼────────────╢
║ 0x113781...81e390 │ 0xe1ee25...dece22 │ 0x1AF95B...6BFD55 │ 0xb00835...61accb │ 0xc0406226 │ 1749170292 (25-06-06 00:38) │ PENDING    ║
╟───────────────────┼───────────────────┼───────────────────┼───────────────────┼────────────┼─────────────────────────────┼────────────╢
║ 0x113781...81e390 │ 0x87721f...5ba4ed │ 0x49cAA0...01E1fB │ 0xb00835...61accb │ 0xc0406226 │ 1749170292 (25-06-06 00:38) │ PENDING    ║
╟───────────────────┼───────────────────┼───────────────────┼───────────────────┼────────────┼─────────────────────────────┼────────────╢
║ 0x113781...81e390 │ 0xe16369...40d5f2 │ 0x0c5fb8...4Be590 │ 0xb00835...61accb │ 0xc0406226 │ 1749170292 (25-06-06 00:38) │ PENDING    ║
╟───────────────────┼───────────────────┼───────────────────┼───────────────────┼────────────┼─────────────────────────────┼────────────╢
║ 0x113781...81e390 │ 0x12f23a...52f7f6 │ 0x34E7A9...dBBff0 │ 0xb00835...61accb │ 0xc0406226 │ 1749170292 (25-06-06 00:38) │ DROPPED    ║
╚═══════════════════╧═══════════════════╧═══════════════════╧═══════════════════╧════════════╧═════════════════════════════╧════════════╝
```

**Output - JSON:**

```
[
  {
    "hash": "0xe1ee25b3818453fe9f283b7f11bf9ea6c21c062329c4fb86b7472e228fdece22",
    "guy": "0x11378105b356039fC1C264019EF182EbE581e390",
    "usr": "0x1AF95B825DCb36cf0fBB4Ff3cD05cf752B6BFD55",
    "tag": "0xb00835271ba99b9695e8413dbc40cf5784d5bd971d38f0a085e60407eb61accb",
    "fax": "0xc0406226",
    "eta": "1749170292",
    "status": "PENDING"
  },
  {
    "hash": "0x87721f1b7f036bce3eea2569dad5e3ff2932413ff2ae26a8dcece0fec55ba4ed",
    "guy": "0x11378105b356039fC1C264019EF182EbE581e390",
    "usr": "0x49cAA015f300949336fb3519e59C6a9b8401E1fB",
    "tag": "0xb00835271ba99b9695e8413dbc40cf5784d5bd971d38f0a085e60407eb61accb",
    "fax": "0xc0406226",
    "eta": "1749170292",
    "status": "PENDING"
  },
  {
    "hash": "0xe163693acf1542472a882e888d91159f799383904ea4f3de4b58115f3740d5f2",
    "guy": "0x11378105b356039fC1C264019EF182EbE581e390",
    "usr": "0x0c5fb8D0addBd19258BDbD9221D3F87D294Be590",
    "tag": "0xb00835271ba99b9695e8413dbc40cf5784d5bd971d38f0a085e60407eb61accb",
    "fax": "0xc0406226",
    "eta": "1749170292",
    "status": "PENDING"
  },
  {
    "hash": "0x12f23a5647be1bce226a960c00d7378a4fac2e9ee12eb71f90cada301552f7f6",
    "guy": "0x11378105b356039fC1C264019EF182EbE581e390",
    "usr": "0x34E7A9ADD532f0C89a03b2B8AC9ACA32E2dBBff0",
    "tag": "0xb00835271ba99b9695e8413dbc40cf5784d5bd971d38f0a085e60407eb61accb",
    "fax": "0xc0406226",
    "eta": "1749170292",
    "status": "DROPPED"
  }
]
```

The script outputs a table with the plans' details:

- GUY: Address of the spell (keep in mind this only works for compliant Spells, this field lists the plan scheduler address, which is the Spell on compliant spells, if non-compliant this field should be ignored)
- HASH: Hash of the plan
- USR: Address of the `DssSpellAction` related to the Spell
- TAG: `extcodehash` from the address of `DssSpellAction`
- FAX: `callcode` to be used when calling the Spell
- ETA: Timestamp of earliest execution time
- STATUS: Status of the plan:
  - PENDING: The plan has been plotted (scheduled) on Pause, and is pending execution
  - EXECUTED: The plan has already been executed
  - DROPPED: The plan was scheduled and subsequently dropped

**2. `encode`**

The `encode` command helps users generate the necessary calldata to cancel pending spells using the `drop(Plan[] calldata _plans)` function, typically on platforms like Etherscan or Tenderly.

It fetches all `PENDING` spells based on the global options provided (like `--rpc-url`, `--from-block`, `--pause-address`) and then interactively prompts the user to select which spells they want to encode for cancellation.

**Usage:**

```bash
npx @sky-ecosystem/protego@latest encode [global options]
# or when running locally
node cli encode [global options]
```

Global options are the same as for the default command (e.g., `--rpc-url`, `--from-block`).

**Example:**

To encode pending spells using default RPC and from the default block:

```bash
node cli encode
```

To encode pending spells using a specific RPC and from block `19500000`:

```bash
node cli encode --rpc-url <your-rpc-url> --from-block 19500000
```

```
? Select spells to be encoded for `drop(Plan[] calldata _plans)` ›
Instructions:
    ↑/↓: Highlight option
    ←/→/[space]: Toggle selection
    a: Toggle all
    enter/return: Complete answer
◯   guy: 0x1137...e390 | hash: 0xe1ee...ce22 | usr: 0x1AF9...FD55 | eta: 1749170292 (25-06-06 00:38 UTC)
◉   guy: 0x1137...e390 | hash: 0x8772...a4ed | usr: 0x49cA...E1fB | eta: 1749170292 (25-06-06 00:38 UTC)
◉   guy: 0x1137...e390 | hash: 0xe163...d5f2 | usr: 0x0c5f...e590 | eta: 1749170292 (25-06-06 00:38 UTC)
◯   guy: 0x1137...e390 | hash: 0x27e4...1e92 | usr: 0x36B7...e359 | eta: 1749170292 (25-06-06 00:38 UTC)
◯   guy: 0x1137...e390 | hash: 0x5220...981b | usr: 0x003E...23b6 | eta: 1749170292 (25-06-06 00:38 UTC)
◯   guy: 0x1137...e390 | hash: 0xa67e...35e2 | usr: 0xbbaC...087b | eta: 1749170292 (25-06-06 00:38 UTC)
◯   guy: 0x1137...e390 | hash: 0x16b4...c16f | usr: 0x59d1...5986 | eta: 1749170292 (25-06-06 00:38 UTC)
◯   guy: 0x1137...e390 | hash: 0x90ca...8ccb | usr: 0xA2D8...2b05 | eta: 1749170292 (25-06-06 00:38 UTC)
```

**Output:**

After selecting the spells, the command will output a JSON array. Each element in the array is another array representing a plan, formatted as `[usr, tag, fax, eta]`.

Example output:

```
[["0x49cAA015f300949336fb3519e59C6a9b8401E1fB","0xb00835271ba99b9695e8413dbc40cf5784d5bd971d38f0a085e60407eb61accb","0xc0406226","1749170292"],["0x0c5fb8D0addBd19258BDbD9221D3F87D294Be590","0xb00835271ba99b9695e8413dbc40cf5784d5bd971d38f0a085e60407eb61accb","0xc0406226","1749170292"]]
```

This output can be directly used as the `_plans` parameter for the `drop` function.

### As a dependency

```bash
npm i @sky-ecosystem/protego
```

```javascript
import { fetchPausePlans } from "@sky-ecosystem/protego";

const plans = await fetchPausePlans({
  rpcUrl: "https://eth.llamarpc.com",
  fromBlock: 16420000,
  status: "PENDING",
  // Optional: this is the MCD_PAUSE address
  pauseAddress: "0xbE286431454714F511008713973d3B053A2d38f3",
});
```

Response type:

```typescript
type Result = {
  hash: string;
  guy: string;
  usr: string;
  tag: string;
  fax: string;
  eta: number;
  status: "PENDING" | "EXECUTED" | "DROPPED" | "ALL";
};

type Status = "ALL" | "PENDING" | "DROPPED" | "EXECUTED";

type Cfg = {
    status: Status = "ALL",
    fromBlock: number = 0,
    rpcUrl: string = "mainnet",
    pauseAddress: string = "{MCD_PAUSE}",
}

function fetchPausePlans(cfg: Cfg = {}): Promise<Result[]>{}
```

## Collaborating

### 1. Install dependencies

```bash
npm i
```

### 2. Run scripts

List plans in `MCD_PAUSE` since block 16420000

```bash
npm run cli -- list --from-block 16420000

OR

node cli list --from-block 16420000
```

Filter by status with `--status` flag.
Possible values are: `PENDING`, `EXECUTED`, `DROPPED` and `ALL` (default).

Get pending plans since block 19420069

```bash
node cli list --status PENDING --from-block 19420069
```

Get executed plans since block 19420069

```bash
node cli list --status EXECUTED --from-block 19420069
```

Get dropped plans since block 19420069

```bash
node cli list --status DROPPED --from-block 19420069
```

Encode

```bash
node cli encode --from-block 19420069
```

### 3. Help

```bash
node cli --help
```
