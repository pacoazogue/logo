define("ace/mode/logoes_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules"], function (d, c, e) {
    var f = d("../lib/oop");
    var a = d("./text_highlight_rules").TextHighlightRules;
    var b = function () {
        var g = this.createKeywordMapper({
            "variable.language": "",
            keyword: " alto amarillo avanza av azar azul bajalapiz bl blanco borrapantalla bp  centro cian cierto cos coseno cuenta cuentarepite  devuelve dev diferencia division  ejecuta elegir elemento entero espera  falso fr frase  gd giraderecha gi giraizquierda gris  hasta haz hazlocal  igual? iguales? init! invierte     limpia lista lista? local log10  mayor? mayorque? magenta marron md menor? menorque? menos menosprimero menosultimo mezcla mientras mp muestra muestratortuga mt  negro no noigual? numero?  o ocultatortuga ot  palabra palabra? para pared& poncl poncolorlapiz pong pongrosor ponpos ponprimero ponrumbo ponultimo ponx ponxy pony pos potencia pp pri primero producto pu  quita  raizcuadrada rc re redondea rellena repite repitepara resto retrocede ro rojo rotula rumbo  si sen seno sisino sl subelapiz suma    ul ultimo  valor vacio? verdadero verde  y        ",
            "constant.language": "PARA FIN VERDADERAO FALSO",
            "support.type": "",
            "keyword.operator": "redondea COS diferencia LOG10 MENOS PI potencia divid raizcuadrada SIN multi "
        }, "text", true, " ");
        var h = "WITH\\W+(?:HEADER\\W+LINE|FRAME|KEY)|NO\\W+STANDARD\\W+PAGE\\W+HEADING|EXIT\\W+FROM\\W+STEP\\W+LOOP|BEGIN\\W+OF\\W+(?:BLOCK|LINE)|BEGIN\\W+OF|END\\W+OF\\W+(?:BLOCK|LINE)|END\\W+OF|NO\\W+INTERVALS|RESPECTING\\W+BLANKS|SEPARATED\\W+BY|USING\\W+(?:EDIT\\W+MASK)|WHERE\\W+(?:LINE)|RADIOBUTTON\\W+GROUP|REF\\W+TO|(?:PUBLIC|PRIVATE|PROTECTED)(?:\\W+SECTION)?|DELETING\\W+(?:TRAILING|LEADING)(?:ALL\\W+OCCURRENCES)|(?:FIRST|LAST)\\W+OCCURRENCE|INHERITING\\W+FROM|LINE-COUNT|ADD-CORRESPONDING|AUTHORITY-CHECK|BREAK-POINT|CLASS-DATA|CLASS-METHODS|CLASS-METHOD|DIVIDE-CORRESPONDING|EDITOR-CALL|END-OF-DEFINITION|END-OF-PAGE|END-OF-SELECTION|FIELD-GROUPS|FIELD-SYMBOLS|FUNCTION-POOL|MOVE-CORRESPONDING|MULTIPLY-CORRESPONDING|NEW-LINE|NEW-PAGE|NEW-SECTION|PRINT-CONTROL|RP-PROVIDE-FROM-LAST|SELECT-OPTIONS|SELECTION-SCREEN|START-OF-SELECTION|SUBTRACT-CORRESPONDING|SYNTAX-CHECK|SYNTAX-TRACE|TOP-OF-PAGE|TYPE-POOL|TYPE-POOLS|LINE-SIZE|LINE-COUNT|MESSAGE-ID|DISPLAY-MODE|READ(?:-ONLY)?|IS\\W+(?:NOT\\W+)?(?:ASSIGNED|BOUND|INITIAL|SUPPLIED)";
        this.$rules = {
            start: [{
                token: "comment",
                regex: "[;|#]",
                next: "singleLineComment"
            }, {
                token: "comment",
                regex: "\\/\\*",
                next: "comment"
            }, {
                token: "constant.language.boolean",
                regex: /(?:VRAI|FAUX)\b/
            }, {
                token: "constant.numeric",
                regex: "[+-]?\\d+\\b"
            }, {
                token: "constant.string",
                regex: '"\\w+\\b'
            }, {
                token: "variable.parameter",
                regex: ":\\w*"
            }, {
                token: g,
                regex: "\\b\\w+\\.?\\w+\\b\\??"
            }, {
                caseInsensitive: true
            }],
            comment: [{
                token: "comment",
                regex: ".*?\\*\\/",
                next: "start"
            }, {
                token: "comment",
                regex: ".+"
            }],
            singleLineComment: [{
                token: "comment",
                regex: /\\$/,
                next: "singleLineComment"
            }, {
                token: "comment",
                regex: /$/,
                next: "start"
            }, {
                defaultToken: "comment"
            }]
        }
    };
    f.inherits(b, a);
    c.logoespHighlightRules = b
});
define("ace/mode/folding/coffee", ["require", "exports", "module", "ace/lib/oop", "ace/mode/folding/fold_mode", "ace/range"], function (b, a, c) {
    var d = b("../../lib/oop");
    var g = b("./fold_mode").FoldMode;
    var f = b("../../range").Range;
    var e = a.FoldMode = function () { }
        ;
    d.inherits(e, g);
    (function () {
        this.getFoldWidgetRange = function (o, k, s) {
            var m = this.indentationBlock(o, s);
            if (m) {
                return m
            }
            var r = /\S/;
            var t = o.getLine(s);
            var l = t.search(r);
            if (l == -1 || t[l] != "#") {
                return
            }
            var i = t.length;
            var p = o.getLength();
            var q = s;
            var j = s;
            while (++s < p) {
                t = o.getLine(s);
                var h = t.search(r);
                if (h == -1) {
                    continue
                }
                if (t[h] != "#") {
                    break
                }
                j = s
            }
            if (j > q) {
                var n = o.getLine(j).length;
                return new f(q, i, j, n)
            }
        }
            ;
        this.getFoldWidget = function (n, j, o) {
            var p = n.getLine(o);
            var h = p.search(/\S/);
            var k = n.getLine(o + 1);
            var i = n.getLine(o - 1);
            var l = i.search(/\S/);
            var m = k.search(/\S/);
            if (h == -1) {
                n.foldWidgets[o - 1] = l != -1 && l < m ? "start" : "";
                return ""
            }
            if (l == -1) {
                if (h == m && p[h] == "#" && k[h] == "#") {
                    n.foldWidgets[o - 1] = "";
                    n.foldWidgets[o + 1] = "";
                    return "start"
                }
            } else {
                if (l == h && p[h] == "#" && i[h] == "#") {
                    if (n.getLine(o - 2).search(/\S/) == -1) {
                        n.foldWidgets[o - 1] = "start";
                        n.foldWidgets[o + 1] = "";
                        return ""
                    }
                }
            }
            if (l != -1 && l < h) {
                n.foldWidgets[o - 1] = "start"
            } else {
                n.foldWidgets[o - 1] = ""
            }
            if (h < m) {
                return "start"
            } else {
                return ""
            }
        }
    }
    ).call(e.prototype)
});
define("ace/mode/logoes", ["require", "exports", "module", "ace/mode/logoes_highlight_rules", "ace/mode/folding/coffee", "ace/range", "ace/mode/text", "ace/lib/oop"], function (d, f, b) {
    var h = d("./logoes_highlight_rules").logoespHighlightRules;
    var a = d("./folding/coffee").FoldMode;
    var c = d("../range").Range;
    var e = d("./text").Mode;
    var g = d("../lib/oop");
    function i() {
        this.HighlightRules = h;
        this.foldingRules = new a()
    }
    g.inherits(i, e);
    (function () {
        this.getNextLineIndent = function (m, k, l) {
            var j = this.$getIndent(k);
            return j
        }
            ;
        this.toggleCommentLines = function (o, p, m, l) {
            var k = new c(0, 0, 0, 0);
            for (var n = m; n <= l; ++n) {
                var j = p.getLine(n);
                if (hereComment.test(j)) {
                    continue
                }
                if (commentLine.test(j)) {
                    j = j.replace(commentLine, "$1")
                } else {
                    j = j.replace(indentation, "$&#")
                }
                k.end.row = k.start.row = n;
                k.end.column = j.length + 1;
                p.replace(k, j)
            }
        }
            ;
        this.$id = "ace/mode/logoes"
    }
    ).call(i.prototype);
    f.Mode = i
});
