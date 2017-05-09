#! /usr/bin/env node
'use strict';
var gluex = require('../index');
var argv = require('yargs')
    .usage('Usage: gluex -i [input.file] -o [output.file]')
    .alias('i', 'input')
    .nargs('i', 1)
    .alias('o', 'output')
    .nargs('o', 1)
    .demandOption(['o', 'i'])
    .alias('n', 'namespace')
    .nargs('n', 1)
    .describe('n', 'e.g. \'dev\' for \'// @gluex:dev some.file\'')
    .boolean('w')
    .alias('w', 'watch')
    .describe('w', 'watch for file changes')
    .boolean('q')
    .alias('q', 'quite')
    .describe('q', 'disable console output')
    .epilog('MIT License; Copyright (c) 2017 Stefan Keim (indus)')
    .argv;
!argv.q && console.time("GLUEX");
gluex(argv.i, argv.o, argv.n, argv.w, argv.q);
!argv.q && console.timeEnd("GLUEX");
argv.w && console.log("GLUEX: waiting for file change");
