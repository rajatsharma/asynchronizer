const ghPages = require('gh-pages')
const fs = require('fs')

const branch = process.argv[2]

fs.writeFile('dist/Procfile', 'web npm run heroku',
  (err) => err ? console.log(err) : console.log('Created Procfile for Heroku'))
fs.copyFileSync('package.json', 'dist/package.json')
console.log('Copied package.json')
fs.copyFileSync('package-lock.json', 'dist/package-lock.json')
console.log('Copied package-lock.json')
fs.copyFileSync('index.js', 'dist/index.js')
console.log('Copied index.js')

ghPages.publish('dist', {
  branch: branch
}, function (err, success) {
  if (err) {
    return console.error(err)
  }
  console.log('Successfully pushed to ' + branch)
})
// INFO https://github.com/tschaub/gh-pages
