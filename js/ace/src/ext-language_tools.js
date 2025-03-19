define("ace/snippets", ["require", "exports", "module", "ace/lib/oop", "ace/lib/event_emitter", "ace/lib/lang", "ace/range", "ace/anchor", "ace/keyboard/hash_handler", "ace/tokenizer", "ace/lib/dom", "ace/editor"], function (e, f, c) {
    var l = e("./lib/oop");
    var q = e("./lib/event_emitter").EventEmitter;
    var b = e("./lib/lang");
    var d = e("./range").Range;
    var g = e("./anchor").Anchor;
    var j = e("./keyboard/hash_handler").HashHandler;
    var n = e("./tokenizer").Tokenizer;
    var p = d.comparePoints;
    var a = function () {
        this.snippetMap = {};
        this.snippetNameMap = {}
    };
    (function () {
        l.implement(this, q);
        this.getTokenizer = function () {
            function r(v, u, t) {
                v = v.substr(1);
                if (/^\d+$/.test(v) && !t.inFormatString) {
                    return [{
                        tabstopId: parseInt(v, 10)
                    }]
                }
                return [{
                    text: v
                }]
            }
            function s(t) {
                return "(?:[^\\\\" + t + "]|\\\\.)"
            }
            a.$tokenizer = new n({
                start: [{
                    regex: /:/,
                    onMatch: function (v, u, t) {
                        if (t.length && t[0].expectIf) {
                            t[0].expectIf = false;
                            t[0].elseBranch = t[0];
                            return [t[0]]
                        }
                        return ":"
                    }
                }, {
                    regex: /\\./,
                    onMatch: function (w, v, t) {
                        var u = w[1];
                        if (u == "}" && t.length) {
                            w = u
                        } else {
                            if ("`$\\".indexOf(u) != -1) {
                                w = u
                            } else {
                                if (t.inFormatString) {
                                    if (u == "n") {
                                        w = "\n"
                                    } else {
                                        if (u == "t") {
                                            w = "\n"
                                        } else {
                                            if ("ulULE".indexOf(u) != -1) {
                                                w = {
                                                    changeCase: u,
                                                    local: u > "a"
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        return [w]
                    }
                }, {
                    regex: /}/,
                    onMatch: function (v, u, t) {
                        return [t.length ? t.shift() : v]
                    }
                }, {
                    regex: /\$(?:\d+|\w+)/,
                    onMatch: r
                }, {
                    regex: /\$\{[\dA-Z_a-z]+/,
                    onMatch: function (x, w, u) {
                        var v = r(x.substr(1), w, u);
                        u.unshift(v[0]);
                        return v
                    },
                    next: "snippetVar"
                }, {
                    regex: /\n/,
                    token: "newline",
                    merge: false
                }],
                snippetVar: [{
                    regex: "\\|" + s("\\|") + "*\\|",
                    onMatch: function (v, u, t) {
                        t[0].choices = v.slice(1, -1).split(",")
                    },
                    next: "start"
                }, {
                    regex: "/(" + s("/") + "+)/(?:(" + s("/") + "*)/)(\\w*):?",
                    onMatch: function (w, v, t) {
                        var u = t[0];
                        u.fmtString = w;
                        w = this.splitRegex.exec(w);
                        u.guard = w[1];
                        u.fmt = w[2];
                        u.flag = w[3];
                        return ""
                    },
                    next: "start"
                }, {
                    regex: "`" + s("`") + "*`",
                    onMatch: function (v, u, t) {
                        t[0].code = v.splice(1, -1);
                        return ""
                    },
                    next: "start"
                }, {
                    regex: "\\?",
                    onMatch: function (v, u, t) {
                        if (t[0]) {
                            t[0].expectIf = true
                        }
                    },
                    next: "start"
                }, {
                    regex: "([^:}\\\\]|\\\\.)*:?",
                    token: "",
                    next: "start"
                }],
                formatString: [{
                    regex: "/(" + s("/") + "+)/",
                    token: "regex"
                }, {
                    regex: "",
                    onMatch: function (v, u, t) {
                        t.inFormatString = true
                    },
                    next: "start"
                }]
            });
            a.prototype.getTokenizer = function () {
                return a.$tokenizer
            }
                ;
            return a.$tokenizer
        }
            ;
        this.tokenizeTmSnippet = function (s, r) {
            return this.getTokenizer().getLineTokens(s, r).tokens.map(function (t) {
                return t.value || t
            })
        }
            ;
        this.$getDefaultValue = function (w, t) {
            if (/^[A-Z]\d+$/.test(t)) {
                var u = t.substr(1);
                return (this.variables[t[0] + "__"] || {})[u]
            }
            if (/^\d+$/.test(t)) {
                return (this.variables.__ || {})[t]
            }
            t = t.replace(/^TM_/, "");
            if (!w) {
                return
            }
            var v = w.session;
            switch (t) {
                case "CURRENT_WORD":
                    var x = v.getWordRange();
                case "SELECTION":
                case "SELECTED_TEXT":
                    return v.getTextRange(x);
                case "CURRENT_LINE":
                    return v.getLine(w.getCursorPosition().row);
                case "PREV_LINE":
                    return v.getLine(w.getCursorPosition().row - 1);
                case "LINE_INDEX":
                    return w.getCursorPosition().column;
                case "LINE_NUMBER":
                    return w.getCursorPosition().row + 1;
                case "SOFT_TABS":
                    return v.getUseSoftTabs() ? "YES" : "NO";
                case "TAB_SIZE":
                    return v.getTabSize();
                case "FILENAME":
                case "FILEPATH":
                    return "";
                case "FULLNAME":
                    return "Ace"
            }
        }
            ;
        this.variables = {};
        this.getVariableValue = function (r, s) {
            if (this.variables.hasOwnProperty(s)) {
                return this.variables[s](r, s) || ""
            }
            return this.$getDefaultValue(r, s) || ""
        }
            ;
        this.tmStrFormat = function (y, w, v) {
            var s = w.flag || "";
            var u = w.guard;
            u = new RegExp(u, s.replace(/[^gi]/, ""));
            var t = this.tokenizeTmSnippet(w.fmt, "formatString");
            var r = this;
            var x = y.replace(u, function () {
                r.variables.__ = arguments;
                var C = r.resolveVariables(t, v);
                var D = "E";
                for (var z = 0; z < C.length; z++) {
                    var B = C[z];
                    if (typeof B == "object") {
                        C[z] = "";
                        if (B.changeCase && B.local) {
                            var A = C[z + 1];
                            if (A && typeof A == "string") {
                                if (B.changeCase == "u") {
                                    C[z] = A[0].toUpperCase()
                                } else {
                                    C[z] = A[0].toLowerCase()
                                }
                                C[z + 1] = A.substr(1)
                            }
                        } else {
                            if (B.changeCase) {
                                D = B.changeCase
                            }
                        }
                    } else {
                        if (D == "U") {
                            C[z] = B.toUpperCase()
                        } else {
                            if (D == "L") {
                                C[z] = B.toLowerCase()
                            }
                        }
                    }
                }
                return C.join("")
            });
            this.variables.__ = null;
            return x
        }
            ;
        this.resolveVariables = function (w, v) {
            var r = [];
            for (var s = 0; s < w.length; s++) {
                var u = w[s];
                if (typeof u == "string") {
                    r.push(u)
                } else {
                    if (typeof u != "object") {
                        continue
                    } else {
                        if (u.skip) {
                            t(u)
                        } else {
                            if (u.processed < s) {
                                continue
                            } else {
                                if (u.text) {
                                    var x = this.getVariableValue(v, u.text);
                                    if (x && u.fmtString) {
                                        x = this.tmStrFormat(x, u)
                                    }
                                    u.processed = s;
                                    if (u.expectIf == null) {
                                        if (x) {
                                            r.push(x);
                                            t(u)
                                        }
                                    } else {
                                        if (x) {
                                            u.skip = u.elseBranch
                                        } else {
                                            t(u)
                                        }
                                    }
                                } else {
                                    if (u.tabstopId != null) {
                                        r.push(u)
                                    } else {
                                        if (u.changeCase != null) {
                                            r.push(u)
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            function t(y) {
                var z = w.indexOf(y, s + 1);
                if (z != -1) {
                    s = z
                }
            }
            return r
        }
            ;
        this.insertSnippetForSelection = function (w, L) {
            var x = w.getCursorPosition();
            var A = w.session.getLine(x.row);
            var K = w.session.getTabString();
            var C = A.match(/^\s*/)[0];
            if (x.column < C.length) {
                C = C.slice(0, x.column)
            }
            var E = this.tokenizeTmSnippet(L);
            E = this.resolveVariables(E, w);
            E = E.map(function (O) {
                if (O == "\n") {
                    return O + C
                }
                if (typeof O == "string") {
                    return O.replace(/\t/g, K)
                }
                return O
            });
            var N = [];
            E.forEach(function (T, O) {
                if (typeof T != "object") {
                    return
                }
                var U = T.tabstopId;
                var Q = N[U];
                if (!Q) {
                    Q = N[U] = [];
                    Q.index = U;
                    Q.value = ""
                }
                if (Q.indexOf(T) !== -1) {
                    return
                }
                Q.push(T);
                var P = E.indexOf(T, O + 1);
                if (P === -1) {
                    return
                }
                var S = E.slice(O + 1, P);
                var R = S.some(function (V) {
                    return typeof V === "object"
                });
                if (R && !Q.value) {
                    Q.value = S
                } else {
                    if (S.length && (!Q.value || typeof Q.value !== "string")) {
                        Q.value = S.join("")
                    }
                }
            });
            N.forEach(function (O) {
                O.length = 0
            });
            var v = {};
            function t(R) {
                var S = [];
                for (var P = 0; P < R.length; P++) {
                    var Q = R[P];
                    if (typeof Q == "object") {
                        if (v[Q.tabstopId]) {
                            continue
                        }
                        var O = R.lastIndexOf(Q, P - 1);
                        Q = S[O] || {
                            tabstopId: Q.tabstopId
                        }
                    }
                    S[P] = Q
                }
                return S
            }
            for (var J = 0; J < E.length; J++) {
                var F = E[J];
                if (typeof F != "object") {
                    continue
                }
                var G = F.tabstopId;
                var I = E.indexOf(F, J + 1);
                if (v[G]) {
                    if (v[G] === F) {
                        v[G] = null
                    }
                    continue
                }
                var r = N[G];
                var y = typeof r.value == "string" ? [r.value] : t(r.value);
                y.unshift(J + 1, Math.max(0, I - J));
                y.push(F);
                v[G] = F;
                E.splice.apply(E, y);
                if (r.indexOf(F) === -1) {
                    r.push(F)
                }
            }
            var z = 0
                , s = 0;
            var B = "";
            E.forEach(function (O) {
                if (typeof O === "string") {
                    if (O[0] === "\n") {
                        s = O.length - 1;
                        z++
                    } else {
                        s += O.length
                    }
                    B += O
                } else {
                    if (!O.start) {
                        O.start = {
                            row: z,
                            column: s
                        }
                    } else {
                        O.end = {
                            row: z,
                            column: s
                        }
                    }
                }
            });
            var D = w.getSelectionRange();
            var u = w.session.replace(D, B);
            var H = new k(w);
            var M = w.inVirtualSelectionMode && w.selection.index;
            H.addTabstops(N, D.start, u, M)
        }
            ;
        this.insertSnippet = function (t, r) {
            var s = this;
            if (t.inVirtualSelectionMode) {
                return s.insertSnippetForSelection(t, r)
            }
            t.forEachSelection(function () {
                s.insertSnippetForSelection(t, r)
            }, null, {
                keepOrder: true
            });
            if (t.tabstopManager) {
                t.tabstopManager.tabNext()
            }
        }
            ;
        this.$getScope = function (s) {
            var r = s.session.$mode.$id || "";
            r = r.split("/").pop();
            if (r === "html" || r === "php") {
                if (r === "php" && !s.session.$mode.inlinePhp) {
                    r = "html"
                }
                var u = s.getCursorPosition();
                var t = s.session.getState(u.row);
                if (typeof t === "object") {
                    t = t[0]
                }
                if (t.substring) {
                    if (t.substring(0, 3) == "js-") {
                        r = "javascript"
                    } else {
                        if (t.substring(0, 4) == "css-") {
                            r = "css"
                        } else {
                            if (t.substring(0, 4) == "php-") {
                                r = "php"
                            }
                        }
                    }
                }
            }
            return r
        }
            ;
        this.getActiveScopes = function (s) {
            var r = this.$getScope(s);
            var t = [r];
            var u = this.snippetMap;
            if (u[r] && u[r].includeScopes) {
                t.push.apply(t, u[r].includeScopes)
            }
            t.push("_");
            return t
        }
            ;
        this.expandWithTab = function (u, t) {
            var s = this;
            var r = u.forEachSelection(function () {
                return s.expandSnippetForSelection(u, t)
            }, null, {
                keepOrder: true
            });
            if (r && u.tabstopManager) {
                u.tabstopManager.tabNext()
            }
            return r
        }
            ;
        this.expandSnippetForSelection = function (t, s) {
            var y = t.getCursorPosition();
            var r = t.session.getLine(y.row);
            var w = r.substring(0, y.column);
            var x = r.substr(y.column);
            var v = this.snippetMap;
            var u;
            this.getActiveScopes(t).some(function (A) {
                var z = v[A];
                if (z) {
                    u = this.findMatchingSnippet(z, w, x)
                }
                return !!u
            }, this);
            if (!u) {
                return false
            }
            if (s && s.dryRun) {
                return true
            }
            t.session.doc.removeInLine(y.row, y.column - u.replaceBefore.length, y.column + u.replaceAfter.length);
            this.variables.M__ = u.matchBefore;
            this.variables.T__ = u.matchAfter;
            this.insertSnippetForSelection(t, u.content);
            this.variables.M__ = this.variables.T__ = null;
            return true
        }
            ;
        this.findMatchingSnippet = function (w, u, v) {
            for (var r = w.length; r--;) {
                var t = w[r];
                if (t.startRe && !t.startRe.test(u)) {
                    continue
                }
                if (t.endRe && !t.endRe.test(v)) {
                    continue
                }
                if (!t.startRe && !t.endRe) {
                    continue
                }
                t.matchBefore = t.startRe ? t.startRe.exec(u) : [""];
                t.matchAfter = t.endRe ? t.endRe.exec(v) : [""];
                t.replaceBefore = t.triggerRe ? t.triggerRe.exec(u)[0] : "";
                t.replaceAfter = t.endTriggerRe ? t.endTriggerRe.exec(v)[0] : "";
                return t
            }
        }
            ;
        this.snippetMap = {};
        this.snippetNameMap = {};
        this.register = function (u, v) {
            var w = this.snippetMap;
            var t = this.snippetNameMap;
            var s = this;
            if (!u) {
                u = []
            }
            function y(z) {
                if (z && !/^\^?\(.*\)\$?$|^\\b$/.test(z)) {
                    z = "(?:" + z + ")"
                }
                return z || ""
            }
            function r(A, B, z) {
                A = y(A);
                B = y(B);
                if (z) {
                    A = B + A;
                    if (A && A[A.length - 1] != "$") {
                        A = A + "$"
                    }
                } else {
                    A = A + B;
                    if (A && A[0] != "^") {
                        A = "^" + A
                    }
                }
                return new RegExp(A)
            }
            function x(A) {
                if (!A.scope) {
                    A.scope = v || "_"
                }
                v = A.scope;
                if (!w[v]) {
                    w[v] = [];
                    t[v] = {}
                }
                var B = t[v];
                if (A.name) {
                    var z = B[A.name];
                    if (z) {
                        s.unregister(z)
                    }
                    B[A.name] = A
                }
                w[v].push(A);
                if (A.tabTrigger && !A.trigger) {
                    if (!A.guard && /^\w/.test(A.tabTrigger)) {
                        A.guard = "\\b"
                    }
                    A.trigger = b.escapeRegExp(A.tabTrigger)
                }
                A.startRe = r(A.trigger, A.guard, true);
                A.triggerRe = new RegExp(A.trigger, "", true);
                A.endRe = r(A.endTrigger, A.endGuard, true);
                A.endTriggerRe = new RegExp(A.endTrigger, "", true)
            }
            if (u && u.content) {
                x(u)
            } else {
                if (Array.isArray(u)) {
                    u.forEach(x)
                }
            }
            this._signal("registerSnippets", {
                scope: v
            })
        }
            ;
        this.unregister = function (t, u) {
            var v = this.snippetMap;
            var s = this.snippetNameMap;
            function r(x) {
                var z = s[x.scope || u];
                if (z && z[x.name]) {
                    delete z[x.name];
                    var y = v[x.scope || u];
                    var w = y && y.indexOf(x);
                    if (w >= 0) {
                        y.splice(w, 1)
                    }
                }
            }
            if (t.content) {
                r(t)
            } else {
                if (Array.isArray(t)) {
                    t.forEach(r)
                }
            }
        }
            ;
        this.parseSnippetFile = function (x) {
            x = x.replace(/\r/g, "");
            var w = []
                , r = {};
            var z = /^#.*|^({[\s\S]*})\s*$|^(\S+) (.*)$|^((?:\n*\t.*)+)/gm;
            var t;
            while (t = z.exec(x)) {
                if (t[1]) {
                    try {
                        r = JSON.parse(t[1]);
                        w.push(r)
                    } catch (v) { }
                }
                if (t[4]) {
                    r.content = t[4].replace(/^\t/gm, "");
                    w.push(r);
                    r = {}
                } else {
                    var y = t[2]
                        , s = t[3];
                    if (y == "regex") {
                        var u = /\/((?:[^\/\\]|\\.)*)|$/g;
                        r.guard = u.exec(s)[1];
                        r.trigger = u.exec(s)[1];
                        r.endTrigger = u.exec(s)[1];
                        r.endGuard = u.exec(s)[1]
                    } else {
                        if (y == "snippet") {
                            r.tabTrigger = s.match(/^\S*/)[0];
                            if (!r.name) {
                                r.name = s
                            }
                        } else {
                            r[y] = s
                        }
                    }
                }
            }
            return w
        }
            ;
        this.getSnippetByName = function (r, s) {
            var u = this.snippetNameMap;
            var t;
            this.getActiveScopes(s).some(function (w) {
                var v = u[w];
                if (v) {
                    t = v[r]
                }
                return !!t
            }, this);
            return t
        }
    }
    ).call(a.prototype);
    var k = function (r) {
        if (r.tabstopManager) {
            return r.tabstopManager
        }
        r.tabstopManager = this;
        this.$onChange = this.onChange.bind(this);
        this.$onChangeSelection = b.delayedCall(this.onChangeSelection.bind(this)).schedule;
        this.$onChangeSession = this.onChangeSession.bind(this);
        this.$onAfterExec = this.onAfterExec.bind(this);
        this.attach(r)
    };
    (function () {
        this.attach = function (r) {
            this.index = 0;
            this.ranges = [];
            this.tabstops = [];
            this.$openTabstops = null;
            this.selectedTabstop = null;
            this.editor = r;
            this.editor.on("change", this.$onChange);
            this.editor.on("changeSelection", this.$onChangeSelection);
            this.editor.on("changeSession", this.$onChangeSession);
            this.editor.commands.on("afterExec", this.$onAfterExec);
            this.editor.keyBinding.addKeyboardHandler(this.keyboardHandler)
        }
            ;
        this.detach = function () {
            this.tabstops.forEach(this.removeTabstopMarkers, this);
            this.ranges = null;
            this.tabstops = null;
            this.selectedTabstop = null;
            this.editor.removeListener("change", this.$onChange);
            this.editor.removeListener("changeSelection", this.$onChangeSelection);
            this.editor.removeListener("changeSession", this.$onChangeSession);
            this.editor.commands.removeListener("afterExec", this.$onAfterExec);
            this.editor.keyBinding.removeKeyboardHandler(this.keyboardHandler);
            this.editor.tabstopManager = null;
            this.editor = null
        }
            ;
        this.onChange = function (B) {
            var w = B.data.range;
            var t = B.data.action[0] == "r";
            var v = w.start;
            var x = w.end;
            var E = v.row;
            var y = x.row;
            var D = y - E;
            var A = x.column - v.column;
            if (t) {
                D = -D;
                A = -A
            }
            if (!this.$inChange && t) {
                var C = this.selectedTabstop;
                var F = C && !C.some(function (G) {
                    return p(G.start, v) <= 0 && p(G.end, x) >= 0
                });
                if (F) {
                    return this.detach()
                }
            }
            var u = this.ranges;
            for (var z = 0; z < u.length; z++) {
                var s = u[z];
                if (s.end.row < v.row) {
                    continue
                }
                if (t && p(v, s.start) < 0 && p(x, s.end) > 0) {
                    this.removeRange(s);
                    z--;
                    continue
                }
                if (s.start.row == E && s.start.column > v.column) {
                    s.start.column += A
                }
                if (s.end.row == E && s.end.column >= v.column) {
                    s.end.column += A
                }
                if (s.start.row >= E) {
                    s.start.row += D
                }
                if (s.end.row >= E) {
                    s.end.row += D
                }
                if (p(s.start, s.end) > 0) {
                    this.removeRange(s)
                }
            }
            if (!u.length) {
                this.detach()
            }
        }
            ;
        this.updateLinkedFields = function () {
            var u = this.selectedTabstop;
            if (!u || !u.hasLinkedRanges) {
                return
            }
            this.$inChange = true;
            var v = this.editor.session;
            var w = v.getTextRange(u.firstNonLinked);
            for (var t = u.length; t--;) {
                var s = u[t];
                if (!s.linked) {
                    continue
                }
                var r = f.snippetManager.tmStrFormat(w, s.original);
                v.replace(s, r)
            }
            this.$inChange = false
        }
            ;
        this.onAfterExec = function (r) {
            if (r.command && !r.command.readOnly) {
                this.updateLinkedFields()
            }
        }
            ;
        this.onChangeSelection = function () {
            if (!this.editor) {
                return
            }
            var t = this.editor.selection.lead;
            var s = this.editor.selection.anchor;
            var w = this.editor.selection.isEmpty();
            for (var u = this.ranges.length; u--;) {
                if (this.ranges[u].linked) {
                    continue
                }
                var r = this.ranges[u].contains(t.row, t.column);
                var v = w || this.ranges[u].contains(s.row, s.column);
                if (r && v) {
                    return
                }
            }
            this.detach()
        }
            ;
        this.onChangeSession = function () {
            this.detach()
        }
            ;
        this.tabNext = function (t) {
            var r = this.tabstops.length;
            var s = this.index + (t || 1);
            s = Math.min(Math.max(s, 1), r);
            if (s == r) {
                s = 0
            }
            this.selectTabstop(s);
            if (s === 0) {
                this.detach()
            }
        }
            ;
        this.selectTabstop = function (r) {
            this.$openTabstops = null;
            var t = this.tabstops[this.index];
            if (t) {
                this.addTabstopMarkers(t)
            }
            this.index = r;
            t = this.tabstops[this.index];
            if (!t || !t.length) {
                return
            }
            this.selectedTabstop = t;
            if (!this.editor.inVirtualSelectionMode) {
                var u = this.editor.multiSelect;
                u.toSingleRange(t.firstNonLinked.clone());
                for (var s = t.length; s--;) {
                    if (t.hasLinkedRanges && t[s].linked) {
                        continue
                    }
                    u.addRange(t[s].clone(), true)
                }
                if (u.ranges[0]) {
                    u.addRange(u.ranges[0].clone())
                }
            } else {
                this.editor.selection.setRange(t.firstNonLinked)
            }
            this.editor.keyBinding.addKeyboardHandler(this.keyboardHandler)
        }
            ;
        this.addTabstops = function (w, x, t) {
            if (!this.$openTabstops) {
                this.$openTabstops = []
            }
            if (!w[0]) {
                var v = d.fromPoints(t, t);
                h(v.start, x);
                h(v.end, x);
                w[0] = [v];
                w[0].index = 0
            }
            var u = this.index;
            var r = [u + 1, 0];
            var s = this.ranges;
            w.forEach(function (C, A) {
                var z = this.$openTabstops[A] || C;
                for (var B = C.length; B--;) {
                    var D = C[B];
                    var y = d.fromPoints(D.start, D.end || D.start);
                    o(y.start, x);
                    o(y.end, x);
                    y.original = D;
                    y.tabstop = z;
                    s.push(y);
                    if (z != C) {
                        z.unshift(y)
                    } else {
                        z[B] = y
                    }
                    if (D.fmtString) {
                        y.linked = true;
                        z.hasLinkedRanges = true
                    } else {
                        if (!z.firstNonLinked) {
                            z.firstNonLinked = y
                        }
                    }
                }
                if (!z.firstNonLinked) {
                    z.hasLinkedRanges = false
                }
                if (z === C) {
                    r.push(z);
                    this.$openTabstops[A] = z
                }
                this.addTabstopMarkers(z)
            }, this);
            if (r.length > 2) {
                if (this.tabstops.length) {
                    r.push(r.splice(2, 1)[0])
                }
                this.tabstops.splice.apply(this.tabstops, r)
            }
        }
            ;
        this.addTabstopMarkers = function (r) {
            var s = this.editor.session;
            r.forEach(function (t) {
                if (!t.markerId) {
                    t.markerId = s.addMarker(t, "ace_snippet-marker", "text")
                }
            })
        }
            ;
        this.removeTabstopMarkers = function (r) {
            var s = this.editor.session;
            r.forEach(function (t) {
                s.removeMarker(t.markerId);
                t.markerId = null
            })
        }
            ;
        this.removeRange = function (r) {
            var s = r.tabstop.indexOf(r);
            r.tabstop.splice(s, 1);
            s = this.ranges.indexOf(r);
            this.ranges.splice(s, 1);
            this.editor.session.removeMarker(r.markerId);
            if (!r.tabstop.length) {
                s = this.tabstops.indexOf(r.tabstop);
                if (s != -1) {
                    this.tabstops.splice(s, 1)
                }
                if (!this.tabstops.length) {
                    this.detach()
                }
            }
        }
            ;
        this.keyboardHandler = new j();
        this.keyboardHandler.bindKeys({
            Tab: function (r) {
                if (f.snippetManager && f.snippetManager.expandWithTab(r)) {
                    return
                }
                r.tabstopManager.tabNext(1)
            },
            "Shift-Tab": function (r) {
                r.tabstopManager.tabNext(-1)
            },
            Esc: function (r) {
                r.tabstopManager.detach()
            },
            Return: function (r) {
                return false
            }
        })
    }
    ).call(k.prototype);
    var m = {};
    m.onChange = g.prototype.onChange;
    m.setPosition = function (s, r) {
        this.pos.row = s;
        this.pos.column = r
    }
        ;
    m.update = function (t, s, r) {
        this.$insertRight = r;
        this.pos = t;
        this.onChange(s)
    }
        ;
    var o = function (r, s) {
        if (r.row == 0) {
            r.column += s.column
        }
        r.row += s.row
    };
    var h = function (r, s) {
        if (r.row == s.row) {
            r.column -= s.column
        }
        r.row -= s.row
    };
    e("./lib/dom").importCssString(".ace_snippet-marker {    -moz-box-sizing: border-box;    box-sizing: border-box;    background: rgba(194, 193, 208, 0.09);    border: 1px dotted rgba(211, 208, 235, 0.62);    position: absolute;}");
    f.snippetManager = new a();
    var i = e("./editor").Editor;
    (function () {
        this.insertSnippet = function (s, r) {
            return f.snippetManager.insertSnippet(this, s, r)
        }
            ;
        this.expandSnippet = function (r) {
            return f.snippetManager.expandWithTab(this, r)
        }
    }
    ).call(i.prototype)
});
define("ace/autocomplete/popup", ["require", "exports", "module", "ace/edit_session", "ace/virtual_renderer", "ace/editor", "ace/range", "ace/lib/event", "ace/lib/lang", "ace/lib/dom"], function (g, j, e) {
    var a = g("../edit_session").EditSession;
    var i = g("../virtual_renderer").VirtualRenderer;
    var k = g("../editor").Editor;
    var f = g("../range").Range;
    var b = g("../lib/event");
    var d = g("../lib/lang");
    var h = g("../lib/dom");
    var c = function (n) {
        var o = new i(n);
        o.$maxLines = 4;
        var m = new k(o);
        m.setHighlightActiveLine(false);
        m.setShowPrintMargin(false);
        m.renderer.setShowGutter(false);
        m.renderer.setHighlightGutterLine(false);
        m.$mouseHandler.$focusWaitTimout = 0;
        m.$highlightTagPending = true;
        return m
    };
    var l = function (q) {
        var o = h.createElement("div");
        var m = new c(o);
        if (q) {
            q.appendChild(o)
        }
        o.style.display = "none";
        m.renderer.content.style.cursor = "default";
        m.renderer.setStyle("ace_autocomplete");
        m.setOption("displayIndentGuides", false);
        m.setOption("dragDelay", 150);
        var v = function () { };
        m.focus = v;
        m.$isFocused = true;
        m.renderer.$cursorLayer.restartTimer = v;
        m.renderer.$cursorLayer.element.style.opacity = 0;
        m.renderer.$maxLines = 8;
        m.renderer.$keepTextAreaAtCursor = false;
        m.setHighlightActiveLine(false);
        m.session.highlight("");
        m.session.$searchHighlight.clazz = "ace_highlight-marker";
        m.on("mousedown", function (w) {
            var x = w.getDocumentPosition();
            m.selection.moveToPosition(x);
            t.start.row = t.end.row = x.row;
            w.stop()
        });
        var n;
        var s = new f(-1, 0, -1, Infinity);
        var t = new f(-1, 0, -1, Infinity);
        t.id = m.session.addMarker(t, "ace_active-line", "fullLine");
        m.setSelectOnHover = function (w) {
            if (!w) {
                s.id = m.session.addMarker(s, "ace_line-hover", "fullLine")
            } else {
                if (s.id) {
                    m.session.removeMarker(s.id);
                    s.id = null
                }
            }
        }
            ;
        m.setSelectOnHover(false);
        m.on("mousemove", function (w) {
            if (!n) {
                n = w;
                return
            }
            if (n.x == w.x && n.y == w.y) {
                return
            }
            n = w;
            n.scrollTop = m.renderer.scrollTop;
            var x = n.getDocumentPosition().row;
            if (s.start.row != x) {
                if (!s.id) {
                    m.setRow(x)
                }
                p(x)
            }
        });
        m.renderer.on("beforeRender", function () {
            if (n && s.start.row != -1) {
                n.$pos = null;
                var w = n.getDocumentPosition().row;
                if (!s.id) {
                    m.setRow(w)
                }
                p(w, true)
            }
        });
        m.renderer.on("afterRender", function () {
            var y = m.getRow();
            var w = m.renderer.$textLayer;
            var x = w.element.childNodes[y - w.config.firstRow];
            if (x == w.selectedNode) {
                return
            }
            if (w.selectedNode) {
                h.removeCssClass(w.selectedNode, "ace_selected")
            }
            w.selectedNode = x;
            if (x) {
                h.addCssClass(x, "ace_selected")
            }
        });
        var u = function () {
            p(-1)
        };
        var p = function (x, w) {
            if (x !== s.start.row) {
                s.start.row = s.end.row = x;
                if (!w) {
                    m.session._emit("changeBackMarker")
                }
                m._emit("changeHoverMarker")
            }
        };
        m.getHoveredRow = function () {
            return s.start.row
        }
            ;
        b.addListener(m.container, "mouseout", u);
        m.on("hide", u);
        m.on("changeSelection", u);
        m.session.doc.getLength = function () {
            return m.data.length
        }
            ;
        m.session.doc.getLine = function (w) {
            var x = m.data[w];
            if (typeof x == "string") {
                return x
            }
            return (x && x.value) || ""
        }
            ;
        var r = m.session.bgTokenizer;
        r.$tokenizeRow = function (E) {
            var y = m.data[E];
            var C = [];
            if (!y) {
                return C
            }
            if (typeof y == "string") {
                y = {
                    value: y
                }
            }
            if (!y.caption) {
                y.caption = y.value || y.name
            }
            var D = -1;
            var A, B;
            for (var z = 0; z < y.caption.length; z++) {
                B = y.caption[z];
                A = y.matchMask & (1 << z) ? 1 : 0;
                if (D !== A) {
                    C.push({
                        type: y.className || "" + (A ? "completion-highlight" : ""),
                        value: B
                    });
                    D = A
                } else {
                    C[C.length - 1].value += B
                }
            }
            if (y.meta) {
                var x = m.renderer.$size.scrollerWidth / m.renderer.layerConfig.characterWidth;
                var w = y.meta;
                if (w.length + y.caption.length > x - 2) {
                    w = w.substr(0, x - y.caption.length - 3) + "\u2026"
                }
                C.push({
                    type: "rightAlignedText",
                    value: w
                })
            }
            return C
        }
            ;
        r.$updateOnChange = v;
        r.start = v;
        m.session.$computeWidth = function () {
            return this.screenWidth = 0
        }
            ;
        m.$blockScrolling = Infinity;
        m.isOpen = false;
        m.isTopdown = false;
        m.data = [];
        m.setData = function (w) {
            m.data = w || [];
            m.setValue(d.stringRepeat("\n", w.length), -1);
            m.setRow(0)
        }
            ;
        m.getData = function (w) {
            return m.data[w]
        }
            ;
        m.getRow = function () {
            return t.start.row
        }
            ;
        m.setRow = function (w) {
            w = Math.max(-1, Math.min(this.data.length, w));
            if (t.start.row != w) {
                m.selection.clearSelection();
                t.start.row = t.end.row = w || 0;
                m.session._emit("changeBackMarker");
                m.moveCursorTo(w || 0, 0);
                if (m.isOpen) {
                    m._signal("select")
                }
            }
        }
            ;
        m.on("changeSelection", function () {
            if (m.isOpen) {
                m.setRow(m.selection.lead.row)
            }
            m.renderer.scrollCursorIntoView()
        });
        m.hide = function () {
            this.container.style.display = "none";
            this._signal("hide");
            m.isOpen = false
        }
            ;
        m.show = function (D, F, A) {
            var y = this.container;
            var x = window.innerHeight;
            var w = window.innerWidth;
            var B = this.renderer;
            var E = B.$maxLines * F * 1.4;
            var C = D.top + this.$borderSize;
            if (C + E > x - F && !A) {
                y.style.top = "";
                y.style.bottom = x - C + "px";
                m.isTopdown = false
            } else {
                C += F;
                y.style.top = C + "px";
                y.style.bottom = "";
                m.isTopdown = true
            }
            y.style.display = "";
            this.renderer.$textLayer.checkForSizeChanges();
            var z = D.left;
            if (z + y.offsetWidth > w) {
                z = w - y.offsetWidth
            }
            y.style.left = z + "px";
            this._signal("show");
            n = null;
            m.isOpen = true
        }
            ;
        m.getTextLeftOffset = function () {
            return this.$borderSize + this.renderer.$padding + this.$imageSize
        }
            ;
        m.$imageSize = 0;
        m.$borderSize = 1;
        return m
    };
    h.importCssString(".ace_editor.ace_autocomplete .ace_marker-layer .ace_active-line {    background-color: #CAD6FA;    z-index: 1;}.ace_editor.ace_autocomplete .ace_line-hover {    border: 1px solid #abbffe;    margin-top: -1px;    background: rgba(233,233,253,0.4);}.ace_editor.ace_autocomplete .ace_line-hover {    position: absolute;    z-index: 2;}.ace_editor.ace_autocomplete .ace_scroller {   background: none;   border: none;   box-shadow: none;}.ace_rightAlignedText {    color: gray;    display: inline-block;    position: absolute;    right: 4px;    text-align: right;    z-index: -1;}.ace_editor.ace_autocomplete .ace_completion-highlight{    color: #000;    text-shadow: 0 0 0.01em;}.ace_editor.ace_autocomplete {    width: 280px;    z-index: 200000;    background: #fbfbfb;    color: #444;    border: 1px lightgray solid;    position: fixed;    box-shadow: 2px 3px 5px rgba(0,0,0,.2);    line-height: 1.4;}");
    j.AcePopup = l
});
define("ace/autocomplete/util", ["require", "exports", "module"], function (c, b, d) {
    b.parForEach = function (k, h, j) {
        var g = 0;
        var e = k.length;
        if (e === 0) {
            j()
        }
        for (var f = 0; f < e; f++) {
            h(k[f], function (i, l) {
                g++;
                if (g === e) {
                    j(i, l)
                }
            })
        }
    }
        ;
    var a = /[a-zA-Z_0-9\$\-\u00A2-\uFFFF]/;
    b.retrievePrecedingIdentifier = function (h, j, g) {
        g = g || a;
        var e = [];
        for (var f = j - 1; f >= 0; f--) {
            if (g.test(h[f])) {
                e.push(h[f])
            } else {
                break
            }
        }
        return e.reverse().join("")
    }
        ;
    b.retrieveFollowingIdentifier = function (h, j, g) {
        g = g || a;
        var e = [];
        for (var f = j; f < h.length; f++) {
            if (g.test(h[f])) {
                e.push(h[f])
            } else {
                break
            }
        }
        return e
    }
});
define("ace/autocomplete", ["require", "exports", "module", "ace/keyboard/hash_handler", "ace/autocomplete/popup", "ace/autocomplete/util", "ace/lib/event", "ace/lib/lang", "ace/lib/dom", "ace/snippets"], function (f, h, e) {
    var j = f("./keyboard/hash_handler").HashHandler;
    var l = f("./autocomplete/popup").AcePopup;
    var i = f("./autocomplete/util");
    var c = f("./lib/event");
    var d = f("./lib/lang");
    var g = f("./lib/dom");
    var b = f("./snippets").snippetManager;
    var k = function () {
        this.autoInsert = false;
        this.autoSelect = true;
        this.exactMatch = false;
        this.gatherCompletionsId = 0;
        this.keyboardHandler = new j();
        this.keyboardHandler.bindKeys(this.commands);
        this.blurListener = this.blurListener.bind(this);
        this.changeListener = this.changeListener.bind(this);
        this.mousedownListener = this.mousedownListener.bind(this);
        this.mousewheelListener = this.mousewheelListener.bind(this);
        this.changeTimer = d.delayedCall(function () {
            this.updateCompletions(true)
        }
            .bind(this));
        this.tooltipTimer = d.delayedCall(this.updateDocTooltip.bind(this), 50)
    };
    (function () {
        this.$init = function () {
            this.popup = new l(document.body || document.documentElement);
            this.popup.on("click", function (m) {
                this.insertMatch();
                m.stop()
            }
                .bind(this));
            this.popup.focus = this.editor.focus.bind(this.editor);
            this.popup.on("show", this.tooltipTimer.bind(null, null));
            this.popup.on("select", this.tooltipTimer.bind(null, null));
            this.popup.on("changeHoverMarker", this.tooltipTimer.bind(null, null));
            return this.popup
        }
            ;
        this.getPopup = function () {
            return this.popup || this.$init()
        }
            ;
        this.openPopup = function (n, q, s) {
            if (!this.popup) {
                this.$init()
            }
            this.popup.setData(this.completions.filtered);
            n.keyBinding.addKeyboardHandler(this.keyboardHandler);
            var p = n.renderer;
            this.popup.setRow(this.autoSelect ? 0 : -1);
            if (!s) {
                this.popup.setTheme(n.getTheme());
                this.popup.setFontSize(n.getFontSize());
                var m = p.layerConfig.lineHeight;
                var r = p.$cursorLayer.getPixelPosition(this.base, true);
                r.left -= this.popup.getTextLeftOffset();
                var o = n.container.getBoundingClientRect();
                r.top += o.top - p.layerConfig.offset;
                r.left += o.left - n.renderer.scrollLeft;
                r.left += p.$gutterLayer.gutterWidth;
                this.popup.show(r, m)
            } else {
                if (s && !q) {
                    this.detach()
                }
            }
        }
            ;
        this.detach = function () {
            this.editor.keyBinding.removeKeyboardHandler(this.keyboardHandler);
            this.editor.off("changeSelection", this.changeListener);
            this.editor.off("blur", this.blurListener);
            this.editor.off("mousedown", this.mousedownListener);
            this.editor.off("mousewheel", this.mousewheelListener);
            this.changeTimer.cancel();
            this.hideDocTooltip();
            this.gatherCompletionsId += 1;
            if (this.popup && this.popup.isOpen) {
                this.popup.hide()
            }
            if (this.base) {
                this.base.detach()
            }
            this.activated = false;
            this.completions = this.base = null
        }
            ;
        this.changeListener = function (m) {
            var n = this.editor.selection.lead;
            if (n.row != this.base.row || n.column < this.base.column) {
                this.detach()
            }
            if (this.activated) {
                this.changeTimer.schedule()
            } else {
                this.detach()
            }
        }
            ;
        this.blurListener = function (n) {
            var m = document.activeElement;
            var o = this.editor.textInput.getElement();
            if (m != o && (!this.popup || m.parentNode != this.popup.container) && m != this.tooltipNode && n.relatedTarget != this.tooltipNode && n.relatedTarget != o) {
                this.detach()
            }
        }
            ;
        this.mousedownListener = function (m) {
            this.detach()
        }
            ;
        this.mousewheelListener = function (m) {
            this.detach()
        }
            ;
        this.goTo = function (n) {
            var o = this.popup.getRow();
            var m = this.popup.session.getLength() - 1;
            switch (n) {
                case "up":
                    o = o <= 0 ? m : o - 1;
                    break;
                case "down":
                    o = o >= m ? -1 : o + 1;
                    break;
                case "start":
                    o = 0;
                    break;
                case "end":
                    o = m;
                    break
            }
            this.popup.setRow(o)
        }
            ;
        this.insertMatch = function (p) {
            if (!p) {
                p = this.popup.getData(this.popup.getRow())
            }
            if (!p) {
                return false
            }
            if (p.completer && p.completer.insertMatch) {
                p.completer.insertMatch(this.editor, p)
            } else {
                if (this.completions.filterText) {
                    var m = this.editor.selection.getAllRanges();
                    for (var o = 0, n; n = m[o]; o++) {
                        n.start.column -= this.completions.filterText.length;
                        this.editor.session.remove(n)
                    }
                }
                if (p.snippet) {
                    b.insertSnippet(this.editor, p.snippet)
                } else {
                    this.editor.execCommand("insertstring", p.value || p)
                }
            }
            this.detach()
        }
            ;
        this.commands = {
            Up: function (m) {
                m.completer.goTo("up")
            },
            Down: function (m) {
                m.completer.goTo("down")
            },
            "Ctrl-Up|Ctrl-Home": function (m) {
                m.completer.goTo("start")
            },
            "Ctrl-Down|Ctrl-End": function (m) {
                m.completer.goTo("end")
            },
            Esc: function (m) {
                m.completer.detach()
            },
            Return: function (m) {
                return m.completer.insertMatch()
            },
            "Shift-Return": function (m) {
                m.completer.insertMatch(true)
            },
            Tab: function (n) {
                var m = n.completer.insertMatch();
                if (!m && !n.tabstopManager) {
                    n.completer.goTo("down")
                } else {
                    return m
                }
            },
            PageUp: function (m) {
                m.completer.popup.gotoPageUp()
            },
            PageDown: function (m) {
                m.completer.popup.gotoPageDown()
            }
        };
        this.gatherCompletions = function (n, t) {
            var r = n.getSession();
            var s = n.getCursorPosition();
            var m = r.getLine(s.row);
            var q = i.retrievePrecedingIdentifier(m, s.column);
            this.base = r.doc.createAnchor(s.row, s.column - q.length);
            this.base.$insertRight = true;
            var p = [];
            var o = n.completers.length;
            n.completers.forEach(function (u, v) {
                u.getCompletions(n, r, s, q, function (y, x) {
                    if (!y) {
                        p = p.concat(x)
                    }
                    var z = n.getCursorPosition();
                    var w = r.getLine(z.row);
                    t(null, {
                        prefix: i.retrievePrecedingIdentifier(w, z.column, x[0] && x[0].identifierRegex),
                        matches: p,
                        finished: (--o === 0)
                    })
                })
            });
            return true
        }
            ;
        this.showPopup = function (m) {
            if (this.editor) {
                this.detach()
            }
            this.activated = true;
            this.editor = m;
            if (m.completer != this) {
                if (m.completer) {
                    m.completer.detach()
                }
                m.completer = this
            }
            m.on("changeSelection", this.changeListener);
            m.on("blur", this.blurListener);
            m.on("mousedown", this.mousedownListener);
            m.on("mousewheel", this.mousewheelListener);
            this.updateCompletions()
        }
            ;
        this.updateCompletions = function (p) {
            if (p && this.base && this.completions) {
                var o = this.editor.getCursorPosition();
                var n = this.editor.session.getTextRange({
                    start: this.base,
                    end: o
                });
                if (n == this.completions.filterText) {
                    return
                }
                this.completions.setFilter(n);
                if (!this.completions.filtered.length) {
                    return this.detach()
                }
                if (this.completions.filtered.length == 1 && this.completions.filtered[0].value == n && !this.completions.filtered[0].snippet) {
                    return this.detach()
                }
                this.openPopup(this.editor, n, p);
                return
            }
            var m = this.gatherCompletionsId;
            this.gatherCompletions(this.editor, function (t, r) {
                var s = function () {
                    if (!r.finished) {
                        return
                    }
                    return this.detach()
                }
                    .bind(this);
                var v = r.prefix;
                var u = r && r.matches;
                if (!u || !u.length) {
                    return s()
                }
                if (v.indexOf(r.prefix) !== 0 || m != this.gatherCompletionsId) {
                    return
                }
                this.completions = new a(u);
                if (this.exactMatch) {
                    this.completions.exactMatch = true
                }
                this.completions.setFilter(v);
                var q = this.completions.filtered;
                if (!q.length) {
                    return s()
                }
                if (q.length == 1 && q[0].value == v && !q[0].snippet) {
                    return s()
                }
                if (this.autoInsert && q.length == 1 && r.finished) {
                    return this.insertMatch(q[0])
                }
                this.openPopup(this.editor, v, p)
            }
                .bind(this))
        }
            ;
        this.cancelContextMenu = function () {
            this.editor.$mouseHandler.cancelContextMenu()
        }
            ;
        this.updateDocTooltip = function () {
            var m = this.popup;
            var o = m.data;
            var n = o && (o[m.getHoveredRow()] || o[m.getRow()]);
            var p = null;
            if (!n || !this.editor || !this.popup.isOpen) {
                return this.hideDocTooltip()
            }
            this.editor.completers.some(function (q) {
                if (q.getDocTooltip) {
                    p = q.getDocTooltip(n)
                }
                return p
            });
            if (!p) {
                p = n
            }
            if (typeof p == "string") {
                p = {
                    docText: p
                }
            }
            if (!p || !(p.docHTML || p.docText)) {
                return this.hideDocTooltip()
            }
            this.showDocTooltip(p)
        }
            ;
        this.showDocTooltip = function (p) {
            if (!this.tooltipNode) {
                this.tooltipNode = g.createElement("div");
                this.tooltipNode.className = "ace_tooltip ace_doc-tooltip";
                this.tooltipNode.style.margin = 0;
                this.tooltipNode.style.pointerEvents = "auto";
                this.tooltipNode.tabIndex = -1;
                this.tooltipNode.onblur = this.blurListener.bind(this)
            }
            var o = this.tooltipNode;
            if (p.docHTML) {
                o.innerHTML = p.docHTML
            } else {
                if (p.docText) {
                    o.textContent = p.docText
                }
            }
            if (!o.parentNode) {
                document.body.appendChild(o)
            }
            var m = this.popup;
            var n = m.container.getBoundingClientRect();
            o.style.top = m.container.style.top;
            o.style.bottom = m.container.style.bottom;
            if (window.innerWidth - n.right < 320) {
                o.style.right = window.innerWidth - n.left + "px";
                o.style.left = ""
            } else {
                o.style.left = (n.right + 1) + "px";
                o.style.right = ""
            }
            o.style.display = "block"
        }
            ;
        this.hideDocTooltip = function () {
            this.tooltipTimer.cancel();
            if (!this.tooltipNode) {
                return
            }
            var m = this.tooltipNode;
            if (!this.editor.isFocused() && document.activeElement == m) {
                this.editor.focus()
            }
            this.tooltipNode = null;
            if (m.parentNode) {
                m.parentNode.removeChild(m)
            }
        }
    }
    ).call(k.prototype);
    k.startCommand = {
        name: "startAutocomplete",
        exec: function (m) {
            if (!m.completer) {
                m.completer = new k()
            }
            m.completer.autoInsert = false;
            m.completer.autoSelect = true;
            m.completer.showPopup(m);
            m.completer.cancelContextMenu()
        },
        bindKey: "Ctrl-Space|Ctrl-Shift-Space|Alt-Space"
    };
    var a = function (o, n, m) {
        this.all = o;
        this.filtered = o;
        this.filterText = n || "";
        this.exactMatch = false
    };
    (function () {
        this.setFilter = function (o) {
            if (o.length > this.filterText && o.lastIndexOf(this.filterText, 0) === 0) {
                var n = this.filtered
            } else {
                var n = this.all
            }
            this.filterText = o;
            n = this.filterCompletions(n, this.filterText);
            n = n.sort(function (q, p) {
                return p.exactMatch - q.exactMatch || p.score - q.score
            });
            var m = null;
            n = n.filter(function (q) {
                var p = q.snippet || q.caption || q.value;
                if (p === m) {
                    return false
                }
                m = p;
                return true
            });
            this.filtered = n
        }
            ;
        this.filterCompletions = function (x, r) {
            var s = [];
            var z = r.toUpperCase();
            var u = r.toLowerCase();
            loop: for (var t = 0, A; A = x[t]; t++) {
                var B = A.value || A.caption || A.snippet;
                if (!B) {
                    continue
                }
                var v = -1;
                var q = 0;
                var y = 0;
                var w, m;
                if (this.exactMatch) {
                    if (r !== B.substr(0, r.length)) {
                        continue loop
                    }
                } else {
                    for (var p = 0; p < r.length; p++) {
                        var o = B.indexOf(u[p], v + 1);
                        var n = B.indexOf(z[p], v + 1);
                        w = (o >= 0) ? ((n < 0 || o < n) ? o : n) : n;
                        if (w < 0) {
                            continue loop
                        }
                        m = w - v - 1;
                        if (m > 0) {
                            if (v === -1) {
                                y += 10
                            }
                            y += m
                        }
                        q = q | (1 << w);
                        v = w
                    }
                }
                A.matchMask = q;
                A.exactMatch = y ? 0 : 1;
                A.score = (A.score || 0) - y;
                s.push(A)
            }
            return s
        }
    }
    ).call(a.prototype);
    h.Autocomplete = k;
    h.FilteredList = a
});
define("ace/autocomplete/text_completer", ["require", "exports", "module", "ace/range"], function (c, a, d) {
    var g = c("../range").Range;
    var e = /[^a-zA-Z_0-9\$\-\u00C0-\u1FFF\u2C00-\uD7FF\w]+/;
    function f(i, j) {
        var h = i.getTextRange(g.fromPoints({
            row: 0,
            column: 0
        }, j));
        return h.split(e).length - 1
    }
    function b(k, m) {
        var h = f(k, m);
        var l = k.getValue().split(e);
        var i = Object.create(null);
        var j = l[h];
        l.forEach(function (o, n) {
            if (!o || o === j) {
                return
            }
            var q = Math.abs(h - n);
            var p = l.length - q;
            if (i[o]) {
                i[o] = Math.max(p, i[o])
            } else {
                i[o] = p
            }
        });
        return i
    }
    a.getCompletions = function (i, l, n, k, m) {
        var j = b(l, n, k);
        var h = Object.keys(j);
        m(null, h.map(function (o) {
            return {
                caption: o,
                value: o,
                score: j[o],
                meta: "local"
            }
        }))
    }
});
define("ace/ext/language_tools", ["require", "exports", "module", "ace/snippets", "ace/autocomplete", "ace/config", "ace/lib/lang", "ace/autocomplete/util", "ace/autocomplete/text_completer", "ace/editor", "ace/config"], function (k, r, d) {
    var p = k("../snippets").snippetManager;
    var n = k("../autocomplete").Autocomplete;
    var q = k("../config");
    var s = k("../lib/lang");
    var c = k("../autocomplete/util");
    var a = k("../autocomplete/text_completer");
    var h = {
        getCompletions: function (u, x, z, w, y) {
            if (x.$mode.completer) {
                return x.$mode.completer.getCompletions(u, x, z, w, y)
            }
            var v = u.session.getState(z.row);
            var t = x.$mode.getCompletions(v, x, z, w);
            y(null, t)
        }
    };
    var b = {
        getCompletions: function (u, x, z, w, y) {
            var v = p.snippetMap;
            var t = [];
            p.getActiveScopes(u).forEach(function (E) {
                var C = v[E] || [];
                for (var B = C.length; B--;) {
                    var D = C[B];
                    var A = D.name || D.tabTrigger;
                    if (!A) {
                        continue
                    }
                    t.push({
                        caption: A,
                        snippet: D.content,
                        meta: D.tabTrigger && !D.name ? D.tabTrigger + "\u21E5 " : "snippet",
                        type: "snippet"
                    })
                }
            }, this);
            y(null, t)
        },
        getDocTooltip: function (t) {
            if (t.type == "snippet" && !t.docHTML) {
                t.docHTML = ["<b>", s.escapeHTML(t.caption), "</b>", "<hr></hr>", s.escapeHTML(t.snippet)].join("")
            }
        }
    };
    var f = [b, a, h];
    r.setCompleters = function (t) {
        f = t || []
    }
        ;
    r.addCompleter = function (t) {
        f.push(t)
    }
        ;
    r.textCompleter = a;
    r.keyWordCompleter = h;
    r.snippetCompleter = b;
    var l = {
        name: "expandSnippet",
        exec: function (t) {
            return p.expandWithTab(t)
        },
        bindKey: "Tab"
    };
    var e = function (u, t) {
        m(t.session.$mode)
    };
    var m = function (t) {
        var u = t.$id;
        if (!p.files) {
            p.files = {}
        }
        j(u);
        if (t.modes) {
            t.modes.forEach(m)
        }
    };
    var j = function (u) {
        if (!u || p.files[u]) {
            return
        }
        var t = u.replace("mode", "snippets");
        p.files[u] = {};
        q.loadModule(t, function (v) {
            if (v) {
                p.files[u] = v;
                if (!v.snippets && v.snippetText) {
                    v.snippets = p.parseSnippetFile(v.snippetText)
                }
                p.register(v.snippets || [], v.scope);
                if (v.includeScopes) {
                    p.snippetMap[v.scope].includeScopes = v.includeScopes;
                    v.includeScopes.forEach(function (w) {
                        j("ace/mode/" + w)
                    })
                }
            }
        })
    };
    function i(u) {
        var w = u.getCursorPosition();
        var t = u.session.getLine(w.row);
        var v;
        u.completers.forEach(function (x) {
            if (x.identifierRegexps) {
                x.identifierRegexps.forEach(function (y) {
                    if (!v && y) {
                        v = c.retrievePrecedingIdentifier(t, w.column, y)
                    }
                })
            }
        });
        return v || c.retrievePrecedingIdentifier(t, w.column)
    }
    var g = function (v) {
        var t = v.editor;
        var w = t.completer && t.completer.activated;
        if (v.command.name === "backspace") {
            if (w && !i(t)) {
                t.completer.detach()
            }
        } else {
            if (v.command.name === "insertstring") {
                var u = i(t);
                if (u && !w) {
                    if (!t.completer) {
                        t.completer = new n()
                    }
                    t.completer.autoInsert = false;
                    t.completer.showPopup(t)
                }
            }
        }
    };
    var o = k("../editor").Editor;
    k("../config").defineOptions(o.prototype, "editor", {
        enableBasicAutocompletion: {
            set: function (t) {
                if (t) {
                    if (!this.completers) {
                        this.completers = Array.isArray(t) ? t : f
                    }
                    this.commands.addCommand(n.startCommand)
                } else {
                    this.commands.removeCommand(n.startCommand)
                }
            },
            value: false
        },
        enableLiveAutocompletion: {
            set: function (t) {
                if (t) {
                    if (!this.completers) {
                        this.completers = Array.isArray(t) ? t : f
                    }
                    this.commands.on("afterExec", g)
                } else {
                    this.commands.removeListener("afterExec", g)
                }
            },
            value: false
        },
        enableSnippets: {
            set: function (t) {
                if (t) {
                    this.commands.addCommand(l);
                    this.on("changeMode", e);
                    e(null, this)
                } else {
                    this.commands.removeCommand(l);
                    this.off("changeMode", e)
                }
            },
            value: false
        }
    })
});
(function () {
    window.require(["ace/ext/language_tools"], function () { })
}
)();
