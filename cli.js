#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { parse } from "json2csv";

// Get command line arguments
const args = process.argv.slice(2);

// Parse flags
let inputFile = null;
let outputFile = null;
let format = "csv";

for (let i = 0; i < args.length; i++) {
  const arg = args[i];

  if (arg === "--file" || arg === "-f") {
    inputFile = args[++i];
  } else if (arg === "--output" || arg === "-o") {
    outputFile = args[++i];
  } else if (arg === "--format") {
    format = args[++i];
  } else if (arg === "--help" || arg === "-h") {
    console.log(`
Usage: jlcsv <input.jsonl> [options]

Options:
  -f, --file <path>     Input JSONL file
  -o, --output <path>   Output CSV file (default: input name with .csv)
  --format <type>       Output format (default: csv)
  -h, --help            Show this help message

Examples:
  jlcsv file.jsonl
  jlcsv --file data.jsonl --output result.csv
  jlcsv file.jsonl -o custom.csv
    `);
    process.exit(0);
  } else if (!inputFile && !arg.startsWith("-")) {
    // First non-flag argument is the input file
    inputFile = arg;
  }
}

// Validate input
if (!inputFile) {
  console.error("❌ Error: No input file specified");
  console.log("Usage: jlcsv <input.jsonl>");
  console.log("Run 'jlcsv --help' for more options");
  process.exit(1);
}

if (!fs.existsSync(inputFile)) {
  console.error(`❌ Error: File not found: ${inputFile}`);
  process.exit(1);
}

// Set default output file if not specified
if (!outputFile) {
  const parsed = path.parse(inputFile);
  outputFile = path.join(parsed.dir, `${parsed.name}.csv`);
}

try {
  // Read all lines
  const lines = fs.readFileSync(inputFile, "utf8").trim().split("\n");

  if (lines.length === 0) {
    console.error("❌ Error: Input file is empty");
    process.exit(1);
  }

  // Parse JSON lines
  const data = lines.map((line, index) => {
    try {
      return JSON.parse(line);
    } catch (e) {
      throw new Error(`Invalid JSON on line ${index + 1}: ${e.message}`);
    }
  });

  // Convert to CSV
  const csv = parse(data);

  // Write CSV file
  fs.writeFileSync(outputFile, csv, "utf8");

  console.log(`✅ Converted ${inputFile} → ${outputFile}`);
  console.log(`📊 ${data.length} records processed`);
} catch (error) {
  console.error(`❌ Error: ${error.message}`);
  process.exit(1);
}