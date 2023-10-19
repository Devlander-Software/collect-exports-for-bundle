"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generate_random_typescript_content_1 = require("./generate-random-typescript-content");
describe('randomTypeScriptFileContent', () => {
    it('should return a string', () => {
        expect(typeof (0, generate_random_typescript_content_1.randomTypeScriptFileContent)()).toBe('string');
    });
    it('should contain exportable variables and functions', () => {
        const content = (0, generate_random_typescript_content_1.randomTypeScriptFileContent)();
        expect(content).toMatch(/export const var[a-e]:/);
        expect(content).toMatch(/export function func[A-E]\(\):/);
    });
    it('should not contain any undefined values', () => {
        const content = (0, generate_random_typescript_content_1.randomTypeScriptFileContent)();
        expect(content).not.toContain('undefined = null');
    });
});
//# sourceMappingURL=generate-random-typescript-content.test.js.map