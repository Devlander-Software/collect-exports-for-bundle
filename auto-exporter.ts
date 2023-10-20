import * as fs from "fs";
import * as path from "path";
import * as pc from "picocolors";
import { colorfulLog } from "./color-log";
import { generateExportsFromDir } from "./generate-exports-from-dir"; // Assuming you named the file containing the new function like this
import { simulateProgressBar } from "./stimulate-progress-bar";
import { AutoExporterOptions } from "./types";

const checkForCommandLineFlags = (
  config: AutoExporterOptions
): AutoExporterOptions => {
  function handleCommandLineArgs(): void {
    const args = process.argv.slice(2);
    for (let i = 0; i < args.length; i++) {
      switch (args[i]) {
        case "-d":
        case "--directory":
          config.directory = args[i + 1];
          i++;
          break;
        case "-de":
        case "--default-export":
          config.defaultExportFile = args[i + 1];
          i++;
          break;
        case "-ie":
        case "--include-extensions":
          config.includeExtensions = args[i + 1].split(",");
          i++;
          break;
        case "-ee":
        case "--exclude-extensions":
          config.excludeExtensions = args[i + 1].split(",");
          i++;
          break;
        // Add case for excludeFolders and files if you want to handle them via command line
      }
    }
    console.log(
      pc.cyan("Updated Configuration after processing command-line args:"),
      JSON.stringify(config, null, 2)
    );
  }

  console.log("Starting auto-exporter script");
  console.log(
    colorfulLog("Current Configuration:", "blue"),
    JSON.stringify(config, null, 2)
  );

  handleCommandLineArgs();

  return config;
};

export const createTestFolderAndFiles = (
  folderPath: string,
  files: string[]
): void => {
  fs.mkdirSync(folderPath, { recursive: true });
  for (const file of files) {
    fs.writeFileSync(path.join(folderPath, file), "");
  }
};

export const autoExporter = (options: AutoExporterOptions = {}): void => {
  const config: AutoExporterOptions = {
    ...options,
    directory: options.directory || "src",
    defaultExportFile: options.defaultExportFile || "",
    includeExtensions: options.includeExtensions || [".ts", ".tsx"],
    excludeExtensions: options.excludeExtensions || [".test.tsx", ".test.ts"],
    excludeFolders: options.excludeFolders || [],
    files: options.files || [],
    saveEntryFileWithExtension: options.saveEntryFileWithExtension || ".ts",
  };

  const fileNameToWriteTo = `index${config.saveEntryFileWithExtension}`;

  if (config && config.defaultExportFile && config.defaultExportFile !== "") {
    // default export file should never be index
    // all of the files in the directory will be exported in index.ts
    if (config.defaultExportFile.includes("index")) {
      config.defaultExportFile = config.defaultExportFile = "";
    }
  }

  const TOTAL_STEPS = 4; // Number of steps in your progress
  let currentStep = 1; // Starting step

  simulateProgressBar(
    "Processing command-line flags...",
    TOTAL_STEPS,
    currentStep++
  );
  checkForCommandLineFlags(config);

  simulateProgressBar(
    "Checking default export file...",
    TOTAL_STEPS,
    currentStep++
  );
  if (!config.directory || config.directory === "") {
    throw new Error("Directory is required");
  }

  if (config.files && config.files.length > 0) {
    if (!config.defaultExportFile || config.defaultExportFile !== "") {
      if (
        config.defaultExportFile &&
        fs.existsSync(path.join(config.directory, config.defaultExportFile))
      ) {
        if (!config.files.includes(config.defaultExportFile)) {
          config.files.push(config.defaultExportFile);
        }
      }
    }
  }

  simulateProgressBar(
    "Generating exports from directory...",
    TOTAL_STEPS,
    currentStep++
  );
  const exportsList = generateExportsFromDir(config.directory, config);

  simulateProgressBar(
    `Writing to ${fileNameToWriteTo}...`,
    TOTAL_STEPS,
    currentStep++
  );
  fs.writeFileSync(
    path.join(config.directory, fileNameToWriteTo),
    exportsList.join("\n")
  );

  console.log(
    colorfulLog(`\nExports generated in ${fileNameToWriteTo}\n`, "blue")
  );
};

export default autoExporter;
