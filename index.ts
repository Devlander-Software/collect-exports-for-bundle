// File:  index.js (JavaScript)
// GitHub Gist URL: https://gist.github.com/landonwjohnson/6c444d07e8686711347fa474dd5540f5
// Location: external-modules/auto-exporter-script/index.js
export * from './collect-paths';
export * from './color-log';
export * from './generate-exports-from-dir';
export * from './has-valid-extension';

export { default as autoExporter } from './auto-exporter';
export { AutoExporterOptions } from './types';


import autoExporter from './auto-exporter';
export default autoExporter;


