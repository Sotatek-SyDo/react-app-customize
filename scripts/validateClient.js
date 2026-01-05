const fs = require('fs');
const path = require('path');

function fail(msg) {
  console.error(`❌ ${msg}`);
  process.exit(1);
}

/**
 * Validate client configuration
 * 
 * Note: We only check folder/file existence here.
 * Type safety for page/component keys is enforced by TypeScript
 * via the ClientManifest interface, so no need for runtime validation.
 */
function validateClient(client) {
  const baseDir = path.resolve(__dirname, '..');
  const customizeDir = path.join(baseDir, 'customize', client);

  // 1) Client folder exists?
  if (!fs.existsSync(customizeDir)) {
    fail(`Client "${client}" does not exist in /customize`);
  }

  const entryFile = path.join(customizeDir, 'index.ts');
  const entryFileJs = path.join(customizeDir, 'index.js');

  // 2) Has index.ts or index.js?
  if (!fs.existsSync(entryFile) && !fs.existsSync(entryFileJs)) {
    fail(`Missing index.ts or index.js in customize/${client}`);
  }

  console.log(`✅ Client "${client}" validation passed`);
}

module.exports = { validateClient };
