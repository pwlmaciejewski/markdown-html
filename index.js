#!/usr/bin/env node

var path = require('path');
var templateDir = __dirname + '/template';

// Optimist command-line options
var optimist =  require('optimist')
    .alias({
        't': 'title',
        'l': 'template',
        's': 'style',
        'j': 'script',
        'h': 'help',
        'o': 'output-file',
        'i': 'stdin',
        'w': 'watch'
    })
    .describe({
        'title': 'Generated page title',
        'style': 'Path to custom stylesheet',
        'script': 'Path to custom javascript',
        'template': 'Path to custom mustache template',
        'help': 'This screen',
        'output-file': 'Path to output file (stdout if not specified)',
        'stdin': 'If set, stdin will be used instead of file',
        'watch': 'Watch mode'
    })
    .boolean('watch')
    .default({
        'style': path.resolve(templateDir + '/style.css'),
        'template': path.resolve(templateDir + '/template.html')
    });

var argv = optimist.argv;

if (argv.help) {
    optimist.showHelp(console.log);
} else if (argv.i) {
    require('./lib/stdio')(argv);
} else if (argv.w) {
    require('./lib/watch')(argv);
} else {
    require('./lib/file')(argv);
}