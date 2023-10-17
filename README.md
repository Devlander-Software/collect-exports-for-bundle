


# Auto Exporter Script

This is a script I have been using to export all of my TypeScript files into my `index.ts`, which makes developing npm packages convenient.

This Node.js script automatically generates export statements for TypeScript files in a directory. It's especially handy for automatically creating an `index.ts` file that re-exports all members of the TypeScript files in a given directory. The script also provides an option to default-export a specific file.

## Prerequisites

- [Node.js](https://nodejs.org/)
- The [chalk](https://www.npmjs.com/package/chalk) npm package. Install with `npm install chalk`.

## Usage

```bash
node <path_to_script.js> [options]
```

## Options:
-d, --directory: Specifies the directory to generate exports for. Defaults to src.

## Example:
``` bash
node <path_to_script.js> -d ./path/to/directory
```

-de, --default-export: Specifies a file that should be exported as default. Provide the file name, including its extension. Defaults to some-file-name-to-export-as-default.ts.

## Example:
``` bash

node <path_to_script.js> --default-export some-other-file.ts
```


## Behavior
The script considers files with the extensions **.ts, .tsx, .type.ts, .component.tsx, .component.ts, .type.tsx, .type.ts,** and **.table.ts** for exports.

It excludes files with extensions **.stories.tsx, .stories.ts, .test.tsx, .test.ts, .spec.tsx, .spec.ts, .styles.tsx,** and **.styles.ts.**

If a file's name matches the one specified with the --default-export flag, it will be exported as a default export. The name of the export will be a camel-cased version of the file name. For example, some-file-name-to-export-as-default.ts becomes SomeFileNameToExportAsDefault.

The script will skip **index.ts** and **index.tsx** files and won't include them in the generated exports.

## Output
The script will generate an **index.ts** file in the specified directory (or the default directory if none was specified).

During its operation, the script will print messages for each exported file, using green text for successful exports.

Upon completion, a message will be displayed indicating the success of the export generation.


