![Devlander Collect Exports For Bundle Header](https://github.com/Devlander-Software/collect-exports-for-bundle/raw/main/media/images/collect-exports-for-bundle-preview.jpg)


<a href="https://twitter.com/intent/tweet?button_hashtag=Devlander" target="\_parent">
  <img alt="#Devlander" src="https://img.shields.io/twitter/url?color=%2308a0e9&label=%23Devlander&style=social&url=https%3A%2F%2Ftwitter.com%2Fintent%2Ftweet%3Fbutton_hashtag%3DDevlander">
</a><a href="https://bit.ly/devlander-discord-invite" target="\_parent">
  <img alt="" src="https://img.shields.io/badge/Discord-Devlander-%235865F2" />
</a>

<a href="https://www.npmjs.com/package/@devlander/collect-exports-for-bundle" target="\_parent">

  <img alt="" src="https://img.shields.io/npm/dm/@devlander/collect-exports-for-bundle.svg" />
</a>

<a href="https://github.com/orgs/Devlander-Software/discussions">
  <img alt="Join the discussion on Github" src="https://img.shields.io/badge/Github%20Discussions%20%26%20Support-Chat%20now!-blue" />
</a>



<a href="https://twitter.com/landonwjohnson" target="\_parent">
  <img alt="" src="https://img.shields.io/twitter/follow/landonwjohnson.svg?style=social&label=Follow" />
</a> 



# Table of contents
- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [Programmatically](#programmatically)
  - [Typescript](#typescript)
  - [Default Exports](#default-exports)
  - [Collecting files from the Root folder](#collecting-files-from-the-root-folder)
  - [Collecting files within a directory](#collecting-files-within-a-directory)
  - [Using the CLI](#collecting-files-using-the-cli)
- [To do](#to-do)
- [Future Plans](#future-plans)
- [Connect with me on Social](#social)

## Introduction
The Collect Exports For Bundle Script is a utility designed to automatically generate export statements for files in a specified directory. This tool is especially useful for projects with numerous files that need to be exported, eliminating the tedious task of manually writing export statements.

## Use Case and Motivation

The primary motivation behind the creation of the **Collect Exports For Bundle Script** is to automate and simplify the process of bundling exports. By offering a streamlined tool for generating export statements, developers can save time and avoid potential mistakes associated with manually handling numerous export statements.

### Why was this package created?

1. **Sharing Types and Enums Between Projects:** 
   - In large-scale development, where multiple projects may depend on the same types and enumerations, maintaining consistency becomes crucial. By centralizing and automating the bundling of these shared types and enums, developers can ensure uniformity and reduce the risk of discrepancies between projects.

2. **Automate Extracting Components from Design Systems:**
   - Design systems often consist of numerous components, each with its own file. Manually exporting each component from an index file can be time-consuming and prone to errors. The **Collect Exports For Bundle Script** automates this process, making it easy to extract components from the design system's index file, which in turn accelerates the feature deployment process.

3. **Saving Time and Increasing Efficiency:**
   - In today's agile development environment, every moment counts. Manually writing export statements, especially in projects with a vast number of files, can be tedious and error-prone. This package was designed to alleviate this pain point, allowing developers to focus more on writing code and less on the intricacies of managing exports.

By addressing these challenges, the **Collect Exports For Bundle Script** offers a valuable toolset that promotes best practices, enhances productivity, and ensures consistency across projects.



## Features
- Export all your TypeScript files from a project into a single `index.ts` file.
- Use in other GitHub gists and repositories.
- Type-safe with a default export option.
- Recursive scanning of directories.
- Specify which file extensions to include or exclude.
- Configurable through command-line arguments or direct function parameters.
- Suitable for both command-line usage and integration with GitHub actions.




## Installation
To install the Collect Exports For Bundle Script from the provided gist:

### npm:

```bash

npm install @devlander/collect-exports-for-bundle
```

### yarn:

```bash
yarn add @devlander/collect-exports-for-bundle
```

## Usage
After installation, you can use the Collect Exports For Bundle Script in two primary ways: Programmatically or through the command line.

### Programmatically:
First, require or import the **autoExporter** function from the installed module and call it with an options object:

```javascript
const { autoExporter } = require("@devlander/collect-exports-for-bundle");

autoExporter({
  directory: "src",
  includeExtensions: [".ts", ".tsx"],
  excludeExtensions: [".test.ts"],
});
```


### Typescript
This utility is built in TypeScript, tailored for seamless integration with other TypeScript packages.

### Default Exports
Control your package's exports by choosing a ***default export***. This ensures that when your package compiles, you'll have full command over your ***default export*** and the ***exports*** you need to ***destructure***:

#### A package with a default export:

```typescript
import PackageName, { otherThingsInYourPackage } from "package-name"
```

####  A package without a default export:

```typescript
import { otherThingsInYourPackage } from "package-name"
```

## Collecting files from the Root folder
This tool can be effectively utilized in both ***GitHub repositories*** and ***gists***. For ***GitHub gists***, particularly when building modules and compiling from the project's root where there isn't a specific src folder, the files and **excludeFolders** parameters in the configuration become essential.

#### Example Configuration:

```typescript

import {
    AutoExporterOptions,
    autoExporter,
} from "@devlander/collect-exports-for-bundle";

const main = () => {
    const configForAutoExporter: AutoExporterOptions = {
        directory: "./",
        excludeExtensions: [".d.ts", ".test.ts", ".test.tsx"],
        includeExtensions: [".ts"],
        excludeFolder: ["node_modules", "typings", "dist"],
        defaultExportFile: "somefile.ts",
    };

    autoExporter(configForAutoExporter);
};

main();
```
### Collecting files within a directory
You can also configure the tool to specifically collect files within a particular directory.

#### Example Configuration:

```typescript
import {
    AutoExporterOptions,
    autoExporter,
} from "@devlander/collect-exports-for-bundle";

const main = () => {
    const configForAutoExporter: AutoExporterOptions = {
        directory: "src",
        excludeExtensions: [".d.ts", ".test.ts", ".test.tsx", ".stories.tsx"],
        includeExtensions: [".ts", ".component.tsx", ".styles.tsx"],
        defaultExportFile: "app.ts",
    };

    autoExporter(configForAutoExporter);
};

main();
```

### Command Line Interface (CLI) Usage

Once you've installed the **Collect Exports For Bundle Script**, you can utilize its command-line interface to generate export statements without having to integrate it programmatically into your projects.

### Basic Usage:

Run the script without any arguments to be prompted with a series of questions that will guide you in setting up your configuration:

```bash
$ collect-files-and-export
```
You'll be asked about:

- The directory to scan.
- The default export file name (if any).
- File extensions to include or exclude.
- Folders to exclude.
- Specific file paths to include.


### Advanced Usage:
For those familiar with the tool's configuration options, you can pass them directly as command-line arguments:

```bash
$ collect-files-and-export --directory=src --defaultExportFile=app.ts --includeExtensions=.ts,.tsx --excludeExtensions=.test.ts,.test.tsx
```
This provides a faster way for advanced users to leverage the tool without going through the interactive prompts.

### Integrating with GitHub Actions:
You can easily integrate the CLI tool with your GitHub Actions workflow. This allows for automated generation of export statements as part of your CI/CD pipeline. Refer to the GitHub Actions documentation for more details on setting up custom workflows with third-party tools.
## Integration with GitHub Actions

Leverage the power of automation by integrating the **Collect Exports For Bundle Script** directly into your GitHub Actions workflows. This way, whenever changes are pushed to your repository or certain conditions are met, GitHub Actions can automatically execute the tool to generate export statements for you.

### Example Workflow:

Here's an example `.yml` configuration for a GitHub Action workflow that automatically runs the script upon each push to the main branch:

```yaml
name: Auto-Generate Exports

on:
  push:
    branches:
      - main

jobs:
  generate-exports:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v2

    - name: Set up Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'

    - name: Install dependencies
      run: |
        npm install

    - name: Install Collect Exports For Bundle Script
      run: |
        npm install gist:2ca297f86cf9e25ae2fcc01752f80908

    - name: Run script
      run: |
        npx collect-files-and-export --directory=src --defaultExportFile=app.ts --includeExtensions=.ts,.tsx --excludeExtensions=.test.ts,.test.tsx

    - name: Commit changes
      run: |
        git config --local user.email "action@github.com"
        git config --local user.name "GitHub Action"
        git add -A
        git commit -m "Automatically updated exports using Collect Exports For Bundle Script"
        git push
```

## To do
 [] - Write tests for **generateExportsFromDir**
 [] - Write tests for **randomTypeScriptFileContent**


## Future Plans
This utility is currently hosted as a ***GitHub gist***. However, as it evolves and if it outgrows the gist, it may transition into a full-fledged package.


## Connect with me on social 
- [Website](https://bit.ly/landonjohnsondev)
- [Instagram](https://bit.ly/landonjohnsondev-on-instagram)
- [YouTube](https://bit.ly/devlanderjs-youtube)
- [Twitter](https://bit.ly/landonwjohnson-on-twitter)
- [Facebook](https://bit.ly/devlander-facebook-page)
