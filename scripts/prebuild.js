// scripts/prebuild.js
const { validateClient } = require('./validateClient');

const client = process.env.VITE_CLIENT || 'default';

validateClient(client);
