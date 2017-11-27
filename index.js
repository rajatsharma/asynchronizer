/**
 * Entry Script
 */

if (process.env.NODE_ENV === 'production') {
  // In production, serve the webpacked server file.
  require('./server.bundle.js')
} else {
  // Babel polyfill to convert ES6 code in runtime
  require('@babel/register')
  require('@babel/polyfill')
  require('./src/server')
}
