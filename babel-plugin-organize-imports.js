module.exports = function organizeImportsPlugin() {
  return {
    visitor: {
      Program(path) {
        const imports = [];
        const otherStatements = [];
        
        // Separate imports from other statements
        path.node.body.forEach(node => {
          if (node.type === 'ImportDeclaration') {
            imports.push(node);
          } else {
            otherStatements.push(node);
          }
        });
        
        // Sort imports by type and source
        imports.sort((a, b) => {
          // External packages first
          const aIsExternal = !a.source.value.startsWith('.');
          const bIsExternal = !b.source.value.startsWith('.');
          
          if (aIsExternal && !bIsExternal) return -1;
          if (!aIsExternal && bIsExternal) return 1;
          
          // Then by source path
          return a.source.value.localeCompare(b.source.value);
        });
        
        // Reconstruct the program
        path.node.body = [...imports, ...otherStatements];
      }
    }
  };
}; 