var assert = require('chai').assert;
var childProcess = require('child_process');
var execFile = childProcess.execFile;

var mdhtml = function () {
    var args = Array.prototype.slice.call(arguments);
    args.unshift(__dirname + '/../bin/markdown-html.js');
    return execFile.apply(this, args);
};

test('Basic', function (done) {
    mdhtml([__dirname + '/fixture/basic.md'], function (err, stdout, stderr) {
        assert.notEqual(stdout.search('<html>'), -1, 'It should return html');
        assert.notEqual(stdout.search('<ol>'), -1, 'Output should contain an <ol>');
        assert.notEqual(stdout.search('<title>basic</title>'), -1, 'Title should be "basic"');
        done();
    });
});

test('Template', function (done) {
    mdhtml(['--template', __dirname + '/fixture/template.html', __dirname + '/fixture/basic.md'], function (err, stdout, stderr) {
        assert.notEqual(stdout.search('THIS IS A CUSTOM TEMPLATE'), -1, 'It should use custom template');
        done();
    });
});

test('Title', function (done) {
    mdhtml(['--title', 'blabla', __dirname + '/fixture/basic.md'], function (err, stdout, stderr) {
        assert.notEqual(stdout.search('<title>blabla'), -1, 'It should use user-specified title');
        done();
    });
});

test('Style', function (done) {
    mdhtml(['--style', __dirname + '/fixture/style.css', __dirname + '/fixture/basic.md'], function (err, stdout, stderr) {
        assert.notEqual(stdout.search('body { background: #000; }'), -1, 'It should use user-specified styles');
        done();
    });
});

test('Help', function (done) {
    mdhtml(['-h'],  function (err, stdout, stderr) {
        assert.equal(stdout.search('<html>'), -1, 'Stdout should not contain html');
        assert.ok(stdout.length, 'Stdout should not be empty');
        done();
    });
});

test('Script', function (done) {
    mdhtml(['--script', __dirname + '/fixture/script.js', __dirname + '/fixture/basic.md'], function (err, stdout, stderr) {
        assert.notEqual(stdout.search('custom script'), -1, 'It should use user-specified script');
        done();
    });
});

test('Stdin', function (done) {
    var io = childProcess.spawn(__dirname + '/../bin/markdown-html.js', ['-i']);
    var out = "";

    io.stdout.on('data', function (chunk) {
        out += chunk.toString();
    });

    io.stdout.on('end', function () {
        assert.ok(out.match(/<h2[^>]*>Test/));
        done();
    });

    io.stdin.end('## Test');
});

test('First header is a title', function (done) {
    mdhtml([__dirname + '/fixture/firstHeaderIsATitle.md'], function (err, stdout, stderr) {
        assert.ok(stdout.match(/<title>XYZ<\/title>/));
        done();
    });        
});

test('Title option takes precedence by first header', function (done) {
    mdhtml(['--title', 'foo',__dirname + '/fixture/firstHeaderIsATitle.md'], function (err, stdout, stderr) {
        assert.ok(stdout.match(/<title>foo<\/title>/));
        done();
    });
});