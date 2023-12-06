import { createExtensions } from "../src/extensions/create-extensions";

describe('createExtensions', () => {

    const allowedWords = [
        "props",
        "type",
        "types",
        "interface",
        "enum",
        "component",
        "table",
        "styles",
        "provider",
        "defaults",
        "types",
      ]
      const webExtensions = createExtensions(
        "web",
        allowedWords,
        [".tsx", ".ts"]
      );
      
      console.log(webExtensions, 'this is webExtensions')
      
      const nativeExtensions = createExtensions(
        "native",
        allowedWords,
        [".tsx", ".ts"]
      );
      

      console.log(nativeExtensions, 'this is nativeExtensions')
      
      
      
      const sharedAllowedExtensions = [
        ...createExtensions(
          " ",
          allowedWords,
          [".tsx", ".ts"]
        ),
      ];

        console.log(sharedAllowedExtensions, 'this is sharedAllowedExtensions')
      
      const sharedIgnoredExtensions = createExtensions(
        "",
        ["d", "test", "stories"],
        [".tsx", ".ts"]
      );
      
        console.log(sharedIgnoredExtensions, 'this is sharedIgnoredExtensions')



        it('should create correct web extensions', () => {
            const expectedWebExtensions = [
              ".web.tsx", ".web.ts",
              ".web.props.tsx", ".props.web.tsx", ".web.props.ts", ".props.web.ts",
              ".web.type.tsx", ".type.web.tsx", ".web.type.ts", ".type.web.ts",
              ".web.types.tsx", ".types.web.tsx", ".web.types.ts", ".types.web.ts",
              ".web.interface.tsx", ".interface.web.tsx", ".web.interface.ts", ".interface.web.ts",
              ".web.enum.tsx", ".enum.web.tsx", ".web.enum.ts", ".enum.web.ts",
              ".web.component.tsx", ".component.web.tsx", ".web.component.ts", ".component.web.ts",
              ".web.table.tsx", ".table.web.tsx", ".web.table.ts", ".table.web.ts",
              ".web.styles.tsx", ".styles.web.tsx", ".web.styles.ts", ".styles.web.ts",
              ".web.provider.tsx", ".provider.web.tsx", ".web.provider.ts", ".provider.web.ts",
              ".web.defaults.tsx", ".defaults.web.tsx", ".web.defaults.ts", ".defaults.web.ts"
            ];
          
            expect(webExtensions).toEqual(expect.arrayContaining(expectedWebExtensions));
            expect(webExtensions.length).toBe(expectedWebExtensions.length);
          });
          

          it('should create correct native extensions', () => {
            const expectedNativeExtensions = [
              ".native.tsx", ".native.ts",
              ".native.props.tsx", ".props.native.tsx", ".native.props.ts", ".props.native.ts",
              ".native.type.tsx", ".type.native.tsx", ".native.type.ts", ".type.native.ts",
              ".native.types.tsx", ".types.native.tsx", ".native.types.ts", ".types.native.ts",
              ".native.interface.tsx", ".interface.native.tsx", ".native.interface.ts", ".interface.native.ts",
              ".native.enum.tsx", ".enum.native.tsx", ".native.enum.ts", ".enum.native.ts",
              ".native.component.tsx", ".component.native.tsx", ".native.component.ts", ".component.native.ts",
              ".native.table.tsx", ".table.native.tsx", ".native.table.ts", ".table.native.ts",
              ".native.styles.tsx", ".styles.native.tsx", ".native.styles.ts", ".styles.native.ts",
              ".native.provider.tsx", ".provider.native.tsx", ".native.provider.ts", ".provider.native.ts",
              ".native.defaults.tsx", ".defaults.native.tsx", ".native.defaults.ts", ".defaults.native.ts"
            ];
          
            expect(nativeExtensions).toEqual(expect.arrayContaining(expectedNativeExtensions));
            expect(nativeExtensions.length).toBe(expectedNativeExtensions.length);
          });
          ``
          

          it('should create correct shared allowed extensions', () => {
            const expectedSharedAllowedExtensions = [
              ".tsx", ".ts",
              ".props.tsx", ".props.ts", 
              ".type.tsx", ".type.ts", 
              ".types.tsx", ".types.ts", 
              ".interface.tsx", ".interface.ts", 
              ".enum.tsx", ".enum.ts", 
              ".component.tsx", ".component.ts", 
              ".table.tsx", ".table.ts", 
              ".styles.tsx", ".styles.ts", 
              ".provider.tsx", ".provider.ts", 
              ".defaults.tsx", ".defaults.ts"
            ];
          
            expect(sharedAllowedExtensions).toEqual(expect.arrayContaining(expectedSharedAllowedExtensions));
            expect(sharedAllowedExtensions.length).toBe(expectedSharedAllowedExtensions.length);
          });
          
          it('should create correct shared ignored extensions', () => {
            const expectedSharedIgnoredExtensions = [
              ".tsx", ".ts",
              ".d.tsx", ".d.ts", 
              ".test.tsx", ".test.ts", 
              ".stories.tsx", ".stories.ts"
            ];
          
            expect(sharedIgnoredExtensions).toEqual(expect.arrayContaining(expectedSharedIgnoredExtensions));
            expect(sharedIgnoredExtensions.length).toBe(expectedSharedIgnoredExtensions.length);
          });


 

    
  });