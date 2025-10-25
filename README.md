# jlcsv

Convert JSONL (JSON Lines) files to CSV format with a simple command.

## Installation

### Use with npx (no installation required)

```bash
npx jlcsv file.jsonl
```

### Global installation

```bash
npm install -g jlcsv
```

## Usage

### Basic usage

```bash
# Convert a JSONL file to CSV (output: file.csv)
jlcsv file.jsonl

# Using npx
npx jlcsv documents.jsonl
```

### With options

```bash
# Specify custom output file
jlcsv file.jsonl -o output.csv
jlcsv --file data.jsonl --output results.csv

# Get help
jlcsv --help
```

## Options

| Option            | Alias | Description                                                       |
| ----------------- | ----- | ----------------------------------------------------------------- |
| `--file <path>`   | `-f`  | Input JSONL file                                                  |
| `--output <path>` | `-o`  | Output CSV file (default: same name as input with .csv extension) |
| `--format <type>` | -     | Output format (default: csv)                                      |
| `--help`          | `-h`  | Show help message                                                 |

## Examples

### Simple conversion

```bash
jlcsv data.jsonl
# Output: data.csv in the same directory
```

### Custom output location

```bash
jlcsv data.jsonl -o ../exports/converted.csv
```

### Using flags

```bash
jlcsv --file input.jsonl --output output.csv
```

## Input format

Your JSONL file should contain one JSON object per line:

```jsonl
{"id": 1, "name": "Alice", "age": 30}
{"id": 2, "name": "Bob", "age": 25}
{"id": 3, "name": "Charlie", "age": 35}
```

## Output

The tool will create a CSV file with headers from the JSON keys:

```csv
id,name,age
1,Alice,30
2,Bob,25
3,Charlie,35
```

## Development

### Local testing

```bash
# Clone the repository
git clone <your-repo-url>
cd jlcsv

# Install dependencies
npm install

# Link locally for testing
npm link

# Test the command
jlcsv test.jsonl
```

### Publishing

```bash
# Login to npm
npm login

# Publish
npm publish
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
