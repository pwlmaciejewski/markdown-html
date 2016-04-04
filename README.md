# markdown-html [![NPM version](https://badge.fury.io/js/markdown-html.svg)](http://badge.fury.io/js/markdown-html) [![Build Status](https://travis-ci.org/pwlmaciejewski/markdown-html.svg)](https://travis-ci.org/pwlmaciejewski/markdown-html)

## Information

<table>
<tr> 
<td>Package</td><td>markdown-html</td>
</tr>
<tr>
<td>Description</td>
<td>Command line markdown to html conversion. You can supply your own template (mustache), styles and scripts.</td>
</tr>
<tr>
<td>Node Version</td>
<td>>= 0.10</td>
</tr>
</table>

## Usage

Basic usage: 
    
    markdown-html in.md -o out.html


Use in watch mode for maximum pleasure:

    markdown-html -w in.md -o out.html


List of options:

    --title, -t        Generated page title
    --style, -s        Path to custom stylesheet
    --script, -j       Path to custom javascript                    
    --template, -l     Path to custom mustache template
    --help, -h         This screen
    --output-file, -o  Path to output file (stdout if not specified)
    --stdin, -i        If set, stdin will be used instead of file
    --watch, -w        Watch mode
