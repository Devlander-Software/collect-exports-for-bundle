import { randomTypeScriptFileContent } from '../utils/generate-random-typescript-content';

describe('randomTypeScriptFileContent', () => {
  it('should return a string', () => {
    expect(typeof randomTypeScriptFileContent()).toBe('string');
  });

  it('should contain exportable variables and functions', () => {
    const content = randomTypeScriptFileContent();
    expect(content).toMatch(/export const var[a-e]:/);
    expect(content).toMatch(/export function func[A-E]\(\):/);
  });

  it('should not contain any undefined values', () => {
    const content = randomTypeScriptFileContent();
    expect(content).not.toContain('undefined = null');
  });
});
