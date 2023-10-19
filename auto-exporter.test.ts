import * as fs from 'fs';
import { fileHasValidExtension, generateExportsFromDir } from './auto-exporter';

jest.mock('fs');

describe('autoExporter', () => {
  
  beforeEach(() => {
    process.argv = [];  // Reset any command-line arguments
  });
  
  describe('fileHasValidExtension', () => {
    it('should correctly identify valid extensions', () => {
      const mockOptions = {
        directory: 'src',
        includeExtensions: ['.ts', '.tsx'],
        excludeExtensions: ['.test.ts', '.spec.ts']
      };
      
      expect(fileHasValidExtension('file.ts', mockOptions)).toBe(true);
      expect(fileHasValidExtension('file.test.ts', mockOptions)).toBe(false);
      expect(fileHasValidExtension('file.jsx', mockOptions)).toBe(false);
    });
  });

  describe('generateExportsFromDir', () => {
    
    it('should generate correct export statements', () => {
      (fs.existsSync as jest.Mock).mockReturnValue(true);
      (fs.readdirSync as jest.Mock).mockReturnValue(['file.ts', 'file.test.ts', 'folder']);
      (fs.lstatSync as jest.Mock).mockImplementation((path) => {
        return {
          isDirectory: () => path === 'folder'
        };
      });
      
      const mockOptions = {
        directory: 'src',
        includeExtensions: ['.ts', '.tsx'],
        excludeExtensions: ['.test.ts', '.spec.ts']
      };
      
      const exports = generateExportsFromDir('src', mockOptions);
      expect(exports).toContain('export * from "./file";');
      expect(exports).not.toContain('export * from "./file.test";');
    });
  });
  
  // ... More tests for other functionalities.
});