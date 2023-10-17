# Collect Exports For Bundle Script

## Introduction

The Collect Exports For Bundle Script is a utility designed to automatically generate export statements for files in a specified directory. This tool is especially useful for projects with numerous files that need to be exported, eliminating the tedious task of manually writing export statements.

## Features

- Recursive scanning of directories.
- Specify which file extensions to include or exclude.
- Configurable through command-line arguments or direct function parameters.
- Utilizes picocolors for colorful console outputs.

## Installation

To install the Collect Exports For Bundle Script from the provided gist:

npm

```bash
npm install gist:2ca297f86cf9e25ae2fcc01752f80908
```

```bash
yarn add gist:2ca297f86cf9e25ae2fcc01752f80908
```

## Usage

After installation, you can use the Collect Exports For Bundle Script in two primary ways: Programmatically or through the command line.

## Programmatically:

First, require the **autoExporter** function from the installed module and call it with an options object:

```javascript
const { autoExporter } = require("@devlander/collect-exports-for-bundle");

autoExporter({
  directory: "src",
  includeExtensions: [".ts", ".tsx"],
  excludeExtensions: [".test.ts"],
});
```

## Command Line:

To use it via the command line, you can create an npm script or run it directly using npx:

```bash
npx gist:2ca297f86cf9e25ae2fcc01752f80908 [arguments]
```

## Command Line Arguments:

- **-d or --directory**: The directory to scan. E.g., -d src.

- **-de or --default-export**: Default export file name. E.g., -de index.ts.

- **-ie** or --include-extensions\*\*: File extensions to include, separated by commas. E.g., -ie .ts,.tsx.

- **-ee** or --exclude-extensions: File extensions to exclude, separated by commas. E.g., -ee .test.ts,.spec.ts.

## Example:

```bash

npx gist:2ca297f86cf9e25ae2fcc01752f80908 -d src -ie .ts,.tsx -ee .test.ts,.spec.ts
```

This command will generate exports for all .ts and .tsx files in the src directory, excluding any .test.ts or .spec.ts files.

### Conclusion

The Collect Exports For Bundle Script simplifies the process of generating export statements in projects, providing a flexible and configurable solution that can be effortlessly integrated into any development workflow.
