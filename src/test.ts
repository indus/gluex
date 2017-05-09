'use strict';

declare var describe;
declare var it;

var expect = require('chai').expect;
var fs = require('fs-extra');
var gluex = require('../index');

describe('#REGEX', function () {
    var REGEX = gluex.REGEX;

    it('should find HTML comment', function () {
        var ns = undefined;
        var file = `file.html`;
        var sel = undefined;
        var string = `<!-- @gluex ${file} -->`;
        var match = REGEX.exec(`</some>${string}
        <other>`);
        expect(match).to.not.be.undefined;
        expect(match[0]).to.equal(string);
        expect(match[1]).to.equal(ns);
        expect(match[2]).to.equal(file);
        expect(match[3]).to.equal(sel);
    });

    it('should find JS line comment', function () {
        var ns = undefined;
        var file = `file.js`;
        var sel = undefined;
        var string = `// @gluex ${file}`;
        var match = REGEX.exec(`var some;${string}
        var other;`);
        expect(match).to.not.be.undefined;
        expect(match[0].trim()).to.equal(string.trim());
        expect(match[1]).to.equal(ns);
        expect(match[2]).to.equal(file);
        expect(match[3]).to.equal(sel);
    });

    it('should find JS block comment', function () {
        var ns = undefined;
        var file = `file.js`;
        var sel = undefined;
        var string = `/* @gluex ${file} */`;
        var match = REGEX.exec(`var some;${string}
        var other;`);
        expect(match).to.not.be.undefined;
        expect(match[0]).to.equal(string);
        expect(match[1]).to.equal(ns);
        expect(match[2]).to.equal(file);
        expect(match[3]).to.equal(sel);
    });

    it('should find HTML comment with namespace & selector', function () {
        var ns = "dev";
        var file = `./test/file.html`;
        var sel = "#comp";
        var string = `<!-- @gluex${ns ? ':' + ns : ''} ${file} ${sel ? '(' + sel + ')' : ''} -->`;
        var match = REGEX.exec(`</some>${string}
        <other>`);
        expect(match).to.not.be.undefined;
        expect(match[0]).to.equal(string);
        expect(match[1]).to.equal(ns);
        expect(match[2]).to.equal(file);
        expect(match[3]).to.equal(sel);
    });

    it('should find JS line comment with namespace & selector', function () {
        var ns = "dev";
        var file = `./test/file.json`;
        var sel = ".prop";
        var string = `// @gluex${ns ? ':' + ns : ''} ${file} ${sel ? '(' + sel + ')' : ''}`;
        var match = REGEX.exec(`var some;${string}
        var other;`);
        expect(match).to.not.be.undefined;
        expect(match[0].trim()).to.equal(string.trim());
        expect(match[1]).to.equal(ns);
        expect(match[2]).to.equal(file);
        expect(match[3]).to.equal(sel);
    });

    it('should find JS block comment with namespace & selector', function () {
        var ns = "dev";
        var file = `./test/file.json`;
        var sel = ".prop";
        var string = `/* @gluex${ns ? ':' + ns : ''} ${file} ${sel ? '(' + sel + ')' : ''} */`;
        var match = REGEX.exec(`var some;${string}
        var other;`);
        expect(match).to.not.be.undefined;
        expect(match[0]).to.equal(string);
        expect(match[1]).to.equal(ns);
        expect(match[2]).to.equal(file);
        expect(match[3]).to.equal(sel);
    });
})

describe('#GLUEX', function () {
    it(`should glue example0`, function () {
        var input = `test/example0/index.html`,
            output = `test/example0/index_gluex.html`,
            test = `test/example0/index_test.html`;
        gluex(input, output);
        expect(fs.readFileSync(test, 'utf8')).to.equal(fs.readFileSync(output, 'utf8'));
        expect(fs.readFileSync(test, 'utf8')).to.equal(gluex(input));
    });

    it(`should glue example1`, function () {
        var input = `test/example1/index.html`,
            output = `test/example1/index_gluex.html`,
            test = `test/example1/index_test.html`;
        gluex(input, output);
        expect(fs.readFileSync(test, 'utf8')).to.equal(fs.readFileSync(output, 'utf8'));
        expect(fs.readFileSync(test, 'utf8')).to.equal(gluex(input));
    });

    it(`should glue example2`, function () {
        var input = `test/example2/index.html`,
            output = `test/example2/index_gluex.html`,
            test = `test/example2/index_test.html`;
        gluex(input, output);
        expect(fs.readFileSync(test, 'utf8')).to.equal(fs.readFileSync(output, 'utf8'));
        expect(fs.readFileSync(test, 'utf8')).to.equal(gluex(input));
    });

    it(`should glue example3`, function () {
        var input = `test/example3/index.html`,
            output = `test/example3/index_gluex.html`,
            test = `test/example3/index_test.html`;
        gluex(input, output,'dev');
        expect(fs.readFileSync(test, 'utf8')).to.equal(fs.readFileSync(output, 'utf8'));
        expect(fs.readFileSync(test, 'utf8')).to.equal(gluex(input,null,'dev'));
    });

})