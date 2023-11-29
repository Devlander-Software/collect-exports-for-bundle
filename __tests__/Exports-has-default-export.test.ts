import { hasDefaultExport } from "../src/export-related/has-default-export";
import { fileContentWithDefaultExport, fileContentWithIndexDefaultExport } from "./shared.test";

describe('hasDefaultExport', () => {
it('should find default export in index files if destructured', () => {
    let hasExport = hasDefaultExport(fileContentWithIndexDefaultExport)
    expect(hasExport).toBe(true);
  
  });

  it('should find default export in index files if not destructured', () => {
    let hasExport = hasDefaultExport(fileContentWithDefaultExport, false)
    expect(hasExport).toBe(true);
  
  }
    );

}   )
  