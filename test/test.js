var execFile = require('child_process').execFile;

var mdhtml = function () {
	var args = Array.prototype.slice.call(arguments);
	args.unshift(__dirname + '/../bin/markdown-html.js');
	return execFile.apply(this, args);
};

exports.basic = function (test) {
	mdhtml([__dirname + '/fixture/basic.md'], function (err, stdout, stderr) {
		test.notEqual(stdout.search('<html>'), -1, 'It should return html');
		test.notEqual(stdout.search('<ol>'), -1, 'Output should contain an <ol>');
		test.notEqual(stdout.search('<title>basic</title>'), -1, 'Title should be "basic"');
		test.done();
	});
};

exports.template = function (test) {
	mdhtml(['--template', __dirname + '/fixture/template.html', __dirname + '/fixture/basic.md'], function (err, stdout, stderr) {
		test.notEqual(stdout.search('THIS IS A CUSTOM TEMPLATE'), -1, 'It should use custom template');
		test.done();
	});
};

exports.title = function (test) {
	mdhtml(['--title', 'blabla', __dirname + '/fixture/basic.md'], function (err, stdout, stderr) {
		test.notEqual(stdout.search('<title>blabla'), -1, 'It should use user-specified title');
		test.done();
	});
};

exports.style = function (test) {
	mdhtml(['--style', __dirname + '/fixture/style.css', __dirname + '/fixture/basic.md'], function (err, stdout, stderr) {
		test.notEqual(stdout.search('body { background: #000; }'), -1, 'It should use user-specified styles');
		test.done();
	});
};

exports.help = function (test) {
	mdhtml(['-h'],  function (err, stdout, stderr) {
		test.equal(stdout.search('<html>'), -1, 'Stdout should not contain html');
		test.ok(stdout.length, 'Stdout should not be empty');
		test.done();
	});
};

exports.style = function (test) {
	mdhtml(['--script', __dirname + '/fixture/script.js', __dirname + '/fixture/basic.md'], function (err, stdout, stderr) {
		test.notEqual(stdout.search('custom script'), -1, 'It should use user-specified script');
		test.done();
	});
};