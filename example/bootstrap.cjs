const tsNode = require('ts-node');

tsNode.register();
require('./src/init.ts');
require('./circular-dependency-test/init.ts');

require('./defaults-only/init.ts');