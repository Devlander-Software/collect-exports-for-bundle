"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomTypeScriptFileContent = void 0;
const randomTypeScriptFileContent = () => {
    const types = ['string', 'number', 'boolean', 'null', 'any'];
    const variables = [];
    const functions = [];
    for (let i = 0; i < 5; i++) {
        const type = types[Math.floor(Math.random() * types.length)];
        let value;
        switch (type) {
            case 'string':
                value = `"${Math.random().toString(36).substr(2, 5)}"`;
                break;
            case 'number':
                value = `${Math.floor(Math.random() * 100)}`;
                break;
            case 'boolean':
                value = `${Math.random() < 0.5}`;
                break;
            case 'null':
                value = 'null';
                break;
            case 'any':
                value = ['null', `"${Math.random().toString(36).substr(2, 5)}"`, `${Math.floor(Math.random() * 100)}`, `${Math.random() < 0.5}`][Math.floor(Math.random() * 4)];
                break;
        }
        variables.push(`export const var${String.fromCharCode(97 + i)}: ${type} = ${value};`);
        functions.push(`
  export function func${String.fromCharCode(65 + i)}(): ${type} {
    return ${value};
  }`);
    }
    return variables.join('\n') + functions.join('\n');
};
exports.randomTypeScriptFileContent = randomTypeScriptFileContent;
//# sourceMappingURL=generate-random-typescript-content.js.map