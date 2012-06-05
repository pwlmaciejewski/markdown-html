#!/usr/bin/env node

var argv = require('optimist').argv;
var markdown = require('node-markdown').Markdown;
var fs = require('fs');
var path = require('path');
var mustache = require('mu2');
var util = require('util');

// Get generate html from md.
var input = argv._[0];
if (!input) {
	return;
}
var content = markdown(fs.readFileSync(input, 'utf-8'));

// Check for template and style files.
var templateDir = __dirname + '/../template';
var templatePath = argv.template || templateDir + '/template.html';
var stylePath = argv.style || templateDir + '/style.css';

if (!path.existsSync(templatePath)) {
	throw new Error('Template does not exist.');
}

if (!path.existsSync(stylePath)) {
	throw new Error('Style does not exist.');
}

// Load style.
var style = fs.readFileSync(stylePath);

// Compile template and pipe it out.
mustache.compileAndRender(templatePath, { 
	content: content,
	style: style
}).pipe(process.stdout);
