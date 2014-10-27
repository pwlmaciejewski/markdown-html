var compile = require('./compile');

module.exports = function (argv) {
    require('../lib/validate')(argv);
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', function (chunk) {
        compile(argv, chunk);
    });
};
