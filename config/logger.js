const chalk = require('chalk');

exports.info = (...args) => console.log(chalk.cyan(...args));

exports.error = (...args) => console.log(chalk.red(...args));

exports.warn = (...args) => console.log(chalk.yellow(...args));

exports.bold = chalk.bold;

exports.yellow = chalk.yellow;
