'use strict';
var fs = require('fs-extra');
var path = require('path');
var $ = require('cheerio');
var REGEX = /(?:\/\/|\/\*|<!--)\s*@gluex(?:\:(\S+))?\s*(\S+)\s*(?:\(\s*(\S+)\s*\)\s*)?(?:\*\/|-->)?/i;
module.exports = function (input, output, namespace, watch, quite) {
    var f, match, watchers = {}, now = +Date.now();
    return (function gluex(inp, inp_, selector) {
        if (!inp_)
            return output ? fs.outputFileSync(output, gluex(input, 'root'), 'utf8') : gluex(input, 'root');
        if (!fs.existsSync(inp)) {
            !quite && console.error("GLUEX " + inp_ + ": " + inp + " doesn\u00B4t exist");
            return null;
        }
        var f = fs.readFileSync(inp, 'utf8');
        if (watch && !watchers[inp]) {
            watchers[inp] = fs.watch(inp, null, function (ev) {
                for (var i in watchers)
                    if (i != input) {
                        watchers[i].close();
                        delete watchers[i];
                    }
                if ((+Date.now() - now) > 50) {
                    now = +Date.now();
                    !quite && console.time("GLUEX reload");
                    gluex(input);
                    !quite && console.timeEnd("GLUEX reload");
                }
            });
        }
        if (selector) {
            var ext = path.extname(inp).substring(1);
            switch (ext.toUpperCase()) {
                case "JSON":
                    f = JSON.stringify(eval("(" + f + ")" + selector)).replace(/^"|"$/gi, '');
                    break;
                case "HTML":
                    f = $.load(f).html(selector);
                    break;
                default: !quite && console.warn("GLUEX the use of selectors is only supported for HTML and JSON files but not for \"." + ext + "\"");
            }
        }
        while (match = REGEX.exec(f))
            f = f.replace(match[0], (!namespace || namespace == match[1]) ?
                gluex(path.resolve(path.dirname(inp), match[2]), inp, match[3]) : '');
        return f;
    })(input);
};
module.exports.REGEX = REGEX;
