# Naming Conventions for tests

## Use one the following at the beginning of a filename 
- **Extensions**: For anything related to extensions
- **Exports**: For anything related to exports 
- **Regex**: For anything related to regex
- **Constraints**: for anything related to constraint functions
- **Comments**: For anything related to comments
- **Paths**: For anything related to paths
- **Convert**: For any converting functions
- **Helper**: For any helper functions that don't have a clear category


The reasoning for this is so we can run tests for specific features. It also makes it easier to find the files when looking through the test folder.  

Here's an example of testing for everything related to **Exports**

```bash

jest "*Exports*.test.ts"

```