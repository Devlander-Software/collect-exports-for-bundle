import { getFileNameFromExtension } from "../src/utils/get-file-name-from-extension";

describe('getFileNameFromExtension', () => {
    it('should return the base name for a file with a simple extension', () => {
        expect(getFileNameFromExtension('myfile.ts')).toBe('myfile');
        expect(getFileNameFromExtension('myfile.ts', true)).toBe('myfile');
        expect(getFileNameFromExtension('myfile.ts', false)).toBe('myfile');
    });

    it('should return the base name for a file with a complex extension if removeComplexExtension is true', () => {
        expect(getFileNameFromExtension('myfile.native.ts', true)).toBe('myfile');
        expect(getFileNameFromExtension('myfile.web.ts', true)).toBe('myfile');
    });

    it('should return the name with the complex part if removeComplexExtension is false', () => {
        expect(getFileNameFromExtension('myfile.native.ts', false)).toBe('myfile.native');
        expect(getFileNameFromExtension('myfile.web.ts', false)).toBe('myfile.web');
    });

    it('should return the name with the complex part if removeComplexExtension is undefined', () => {
        expect(getFileNameFromExtension('myfile.native.ts')).toBe('myfile.native');
        expect(getFileNameFromExtension('myfile.web.ts')).toBe('myfile.web');
    });

    it('should return the same name if the file has no extension', () => {
        expect(getFileNameFromExtension('myfile')).toBe('myfile');
    });

   
});
