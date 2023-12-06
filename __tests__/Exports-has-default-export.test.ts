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

    

    it("it should work with a Named Function that is being default exported whether it is a var, let, const, class, function, interface, type, enum", () => {
    //   export default function myFunc() {
    //     return 'hello world';
    // }
    })

    it("it should work with a Anonymous Function that is being default exported whether it is a var, let, const, class, function, interface, type, enum", () => {
    //   export default () => {
    //     return 'hello world';
    // }
    
    })

    it("it should work with a named class that is being default exported", () => {
    //   export default class MyClass {
    //     myFunc() {
    //         return 'hello world';
    //     }
    // }
    
      })
   

      it("it should work with classes that are being default exported  anonymously", () => {
        // example
        // export default class {
        //     myFunc() {
        //         return 'hello world';
        //     }
        // }
        
      })


      it("it should work when default exporting a class with static method", () => {
         // example
        // export default class MyClass {
        //     static myFunc() {
        //         return 'hello world';
        //     }
        // }
        

      })

      it("it should work when re-exporting a default export from another module", () => {
        // example
        // export {default} from './TestComp'

      })

      it("it should work when re-exporting a named module as default", () => {
        // example
        // export {TestComp as default} from './TestComp'
      })
      
    }

   

  )
  