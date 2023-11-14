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

<a href="https://bit.ly/3zg6mBG">
  <img alt="Join Devlander on Twitch" src="https://img.shields.io/twitch/status/twitch" />
</a>



<a href="https://bit.ly/landonwjohnson-on-twitter" target="\_parent">
  <img alt="" src="https://img.shields.io/twitter/follow/landonwjohnson.svg?style=social&label=Follow" />
</a> 

<a href="https://wakatime.com/i/landonwjohnson" target="\_parent">
  <img alt="" src="https://wakatime.com/badge/user/bd50b6c5-e0ca-4937-83b3-ab2d13adbc73/project/018b459c-3fa7-454f-94e5-e85da6e4d8a4.svg" />
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
  - [Helper Functions](helper-functions)
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

By addressing these challenges, the **Collect Exports For Bundle Script** offers a valuable tool set that promotes best practices, enhances productivity, and ensures consistency across projects.



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
After installation, you can use the Collect Exports For Bundle Script in two primary ways: Programmatically

### Programmatically:
First, require or import the **autoExporter** function from the installed module and call it with an options object:

```javascript
const { autoExporter } = require("@devlander/collect-exports-for-bundle");
  autoExporter({
    rootDir: "src",
    allowedExtensions: [".ts", ".tsx"],
    ignoredExtensions: [".test.ts"],
  });
```


### Typescript
This utility is built in TypeScript, tailored for seamless integration with other TypeScript packages.

### Default Exports
Control your package's exports by choosing a ***default export***. This ensures that when your package compiles, you'll have full command over your ***default export*** and the ***exports*** you need to ***destructure***.
Below are examples of packages with default and named exports 

#### A package with a default export:

```typescript
import PackageName, { otherThingsInYourPackage } from "package-name"
```

####  A package without a default export:

```typescript
import { otherThingsInYourPackage } from "package-name"
```

## Collecting files from the Root folder
This tool can be effectively utilized in both ***GitHub repositories*** and ***gists***. For ***GitHub gists***, particularly when building modules and compiling from the project's root where there isn't a specific src folder, the files and **excludedFolders** parameters in the configuration become essential.

#### Example Configuration:

```typescript
const autoExporter = require("@devlander/collect-exports-for-bundle").default

const init = () => {
  autoExporter({
    rootDir: "./src",
    outputFilenameExtension: ".ts",
    outputFileName: "index",
    exportMode: "both",
    primaryExportFile: "main.ts",
    allowedExtensions: [".enum.ts", ".component.tsx", ".type.ts", ".type.tsx"], 
    ignoredExtensions: [".test.ts", ".test.tsx", ".stories.tsx"],
  });
};

init();

```
### Collecting files within a directory
You can also configure the tool to specifically collect files within a particular directory using the **specificFiles** property. 
In this example, **main.ts** and **isEmpty.ts** would be the only files searched for an export

#### Example Configuration:

```typescript
const autoExporter = require("@devlander/collect-exports-for-bundle").default

const init = () => {
    const configForAutoExporter: AutoExporterOptions = {
        rootDir: "src",
        specificFiles: ["main.ts", "isEmpty.ts"]
    };

    autoExporter(configForAutoExporter);
};

init();
```


## Helper functions 

### Collect Paths From Directories 
**collectPathsFromDirectories** takes in **allowedExtensions**, **ignoredExtensions**, **specificFiles**, **debug** and **excludedFolders**.
This function returns paths that have valid file extensions for your directory 

#### Example 
```typescript
const {collectPathsFromDirectories} = require("@devlander/collect-exports-for-bundle").default


const validPaths: string[] = await collectPathsFromDirectories("./src", {
  allowedExtensions: [".component.tsx", ".tsx", ".ts"],
  ignoredExtensions: [".spec.tsx", ".test.tsx"],
  specificFiles: [],
  debug: false,
  excludedFolders: ["node_modules", "dist", "build"]
})

```

### Create Extensions 
**createExtensions** takes in a **word**, a list of **words**, and **fileExtensions**
and will return a list of file extensions with combinations of the three. 
This function returns paths that have valid file extensions for your directory 

#### Example 
```typescript
const {createExtensions} = require("@devlander/collect-exports-for-bundle")

const webExtensions = createExtensions(
  "web",
  ["props", "type", "types", "interface", "enum"],
  [".tsx", ".ts"]
);

// Output for createExtensions
 [
  '.web.tsx',           '.web.ts',
  '.web.props.tsx',     '.props.web.tsx',
  '.web.props.ts',      '.props.web.ts',
  '.web.type.tsx',      '.type.web.tsx',
  '.web.type.ts',       '.type.web.ts',
  '.web.types.tsx',     '.types.web.tsx',
  '.web.types.ts',      '.types.web.ts',
  '.web.interface.tsx', '.interface.web.tsx',
  '.web.interface.ts',  '.interface.web.ts',
  '.web.enum.tsx',      '.enum.web.tsx',
  '.web.enum.ts',       '.enum.web.ts'
]

```




## To do
 [] - Create cli
 [] - Create in depth tests for each function 


## Connect with me on social 
- [Website](https://bit.ly/landonjohnsondev)
- [Instagram](https://bit.ly/landonjohnsondev-on-instagram)
- [YouTube](https://bit.ly/devlanderjs-youtube)
- [Twitter](https://bit.ly/landonwjohnson-on-twitter)
- [Facebook](https://bit.ly/devlander-facebook-page)
