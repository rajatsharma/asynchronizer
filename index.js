/**
 * Entry Script
 */
const polyfill = require('@hellpack/packer/lib/polyfill');

polyfill({ dev: './src/server', prod: './dist/server.bundle' });
