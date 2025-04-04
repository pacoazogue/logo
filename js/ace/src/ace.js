(function () {
    var h = "";
    var d = (function () {
        return this
    }
    )();
    if (!d && typeof window != "undefined") {
        d = window
    }
    if (!h && typeof requirejs !== "undefined") {
        return
    }
    var g = function (i, k, j) {
        if (typeof i !== "string") {
            if (g.original) {
                g.original.apply(this, arguments)
            } else {
                console.error("dropping module because define wasn't a string.");
                console.trace()
            }
            return
        }
        if (arguments.length == 2) {
            j = k
        }
        if (!g.modules[i]) {
            g.payloads[i] = j;
            g.modules[i] = null
        }
    };
    g.modules = {};
    g.payloads = {};
    var a = function (r, m, q) {
        if (typeof m === "string") {
            var o = f(r, m);
            if (o != undefined) {
                q && q();
                return o
            }
        } else {
            if (Object.prototype.toString.call(m) === "[object Array]") {
                var p = [];
                for (var k = 0, j = m.length; k < j; ++k) {
                    var n = f(r, m[k]);
                    if (n == undefined && c.original) {
                        return
                    }
                    p.push(n)
                }
                return q && q.apply(null, p) || true
            }
        }
    };
    var c = function (j, k) {
        var i = a("", j, k);
        if (i == undefined && c.original) {
            return c.original.apply(this, arguments)
        }
        return i
    };
    var e = function (m, i) {
        if (i.indexOf("!") !== -1) {
            var l = i.split("!");
            return e(m, l[0]) + "!" + e(m, l[1])
        }
        if (i.charAt(0) == ".") {
            var k = m.split("/").slice(0, -1).join("/");
            i = k + "/" + i;
            while (i.indexOf(".") !== -1 && j != i) {
                var j = i;
                i = i.replace(/\/\.\//, "/").replace(/[^\/]+\/\.\.\//, "")
            }
        }
        return i
    };
    var f = function (o, j) {
        j = e(o, j);
        var l = g.modules[j];
        if (!l) {
            l = g.payloads[j];
            if (typeof l === "function") {
                var i = {};
                var k = {
                    id: j,
                    uri: "",
                    exports: i,
                    packaged: true
                };
                var n = function (p, q) {
                    return a(j, p, q)
                };
                var m = l(n, i, k);
                i = m || k.exports;
                g.modules[j] = i;
                delete g.payloads[j]
            }
            l = g.modules[j] = i || l
        }
        return l
    };
    function b(j) {
        var i = d;
        if (j) {
            if (!d[j]) {
                d[j] = {}
            }
            i = d[j]
        }
        if (!i.define || !i.define.packaged) {
            g.original = i.define;
            i.define = g;
            i.define.packaged = true
        }
        if (!i.require || !i.require.packaged) {
            c.original = i.require;
            i.require = c;
            i.require.packaged = true
        }
    }
    b(h)
}
)();
define("ace/lib/regexp", ["require", "exports", "module"], function (b, a, c) {
    var h = {
        exec: RegExp.prototype.exec,
        test: RegExp.prototype.test,
        match: String.prototype.match,
        replace: String.prototype.replace,
        split: String.prototype.split
    }
        , f = h.exec.call(/()??/, "")[1] === undefined
        , e = function () {
            var i = /^/g;
            h.test.call(i, "");
            return !i.lastIndex
        }();
    if (e && f) {
        return
    }
    RegExp.prototype.exec = function (n) {
        var l = h.exec.apply(this, arguments), k, j;
        if (typeof (n) == "string" && l) {
            if (!f && l.length > 1 && d(l, "") > -1) {
                j = RegExp(this.source, h.replace.call(g(this), "g", ""));
                h.replace.call(n.slice(l.index), j, function () {
                    for (var o = 1; o < arguments.length - 2; o++) {
                        if (arguments[o] === undefined) {
                            l[o] = undefined
                        }
                    }
                })
            }
            if (this._xregexp && this._xregexp.captureNames) {
                for (var m = 1; m < l.length; m++) {
                    k = this._xregexp.captureNames[m - 1];
                    if (k) {
                        l[k] = l[m]
                    }
                }
            }
            if (!e && this.global && !l[0].length && (this.lastIndex > l.index)) {
                this.lastIndex--
            }
        }
        return l
    }
        ;
    if (!e) {
        RegExp.prototype.test = function (j) {
            var i = h.exec.call(this, j);
            if (i && this.global && !i[0].length && (this.lastIndex > i.index)) {
                this.lastIndex--
            }
            return !!i
        }
    }
    function g(i) {
        return (i.global ? "g" : "") + (i.ignoreCase ? "i" : "") + (i.multiline ? "m" : "") + (i.extended ? "x" : "") + (i.sticky ? "y" : "")
    }
    function d(m, k, l) {
        if (Array.prototype.indexOf) {
            return m.indexOf(k, l)
        }
        for (var j = l || 0; j < m.length; j++) {
            if (m[j] === k) {
                return j
            }
        }
        return -1
    }
});
define("ace/lib/es5-shim", ["require", "exports", "module"], function (g, ag, e) {
    function ad() { }
    if (!Function.prototype.bind) {
        Function.prototype.bind = function h(ap) {
            var aq = this;
            if (typeof aq != "function") {
                throw new TypeError("Function.prototype.bind called on incompatible " + aq)
            }
            var an = t.call(arguments, 1);
            var ao = function () {
                if (this instanceof ao) {
                    var ar = aq.apply(this, an.concat(t.call(arguments)));
                    if (Object(ar) === ar) {
                        return ar
                    }
                    return this
                } else {
                    return aq.apply(ap, an.concat(t.call(arguments)))
                }
            };
            if (aq.prototype) {
                ad.prototype = aq.prototype;
                ao.prototype = new ad();
                ad.prototype = null
            }
            return ao
        }
    }
    var c = Function.prototype.call;
    var K = Array.prototype;
    var A = Object.prototype;
    var t = K.slice;
    var L = c.bind(A.toString);
    var T = c.bind(A.hasOwnProperty);
    var ae;
    var al;
    var ac;
    var aj;
    var p;
    if ((p = T(A, "__defineGetter__"))) {
        ae = c.bind(A.__defineGetter__);
        al = c.bind(A.__defineSetter__);
        ac = c.bind(A.__lookupGetter__);
        aj = c.bind(A.__lookupSetter__)
    }
    if ([1, 2].splice(0).length != 2) {
        if (function () {
            function ao(ar) {
                var aq = new Array(ar + 2);
                aq[0] = aq[1] = 0;
                return aq
            }
            var ap = [], an;
            ap.splice.apply(ap, ao(20));
            ap.splice.apply(ap, ao(26));
            an = ap.length;
            ap.splice(5, 0, "XXX");
            an + 1 == ap.length;
            if (an + 1 == ap.length) {
                return true
            }
        }()) {
            var o = Array.prototype.splice;
            Array.prototype.splice = function (ao, an) {
                if (!arguments.length) {
                    return []
                } else {
                    return o.apply(this, [ao === void 0 ? 0 : ao, an === void 0 ? (this.length - ao) : an].concat(t.call(arguments, 2)))
                }
            }
        } else {
            Array.prototype.splice = function (aw, ao) {
                var aq = this.length;
                if (aw > 0) {
                    if (aw > aq) {
                        aw = aq
                    }
                } else {
                    if (aw == void 0) {
                        aw = 0
                    } else {
                        if (aw < 0) {
                            aw = Math.max(aq + aw, 0)
                        }
                    }
                }
                if (!(aw + ao < aq)) {
                    ao = aq - aw
                }
                var av = this.slice(aw, aw + ao);
                var ay = t.call(arguments, 2);
                var az = ay.length;
                if (aw === aq) {
                    if (az) {
                        this.push.apply(this, ay)
                    }
                } else {
                    var au = Math.min(ao, aq - aw);
                    var ax = aw + au;
                    var ap = ax + az - au;
                    var an = aq - ax;
                    var ar = aq - au;
                    if (ap < ax) {
                        for (var at = 0; at < an; ++at) {
                            this[ap + at] = this[ax + at]
                        }
                    } else {
                        if (ap > ax) {
                            for (at = an; at--;) {
                                this[ap + at] = this[ax + at]
                            }
                        }
                    }
                    if (az && aw === ar) {
                        this.length = ar;
                        this.push.apply(this, ay)
                    } else {
                        this.length = ar + az;
                        for (at = 0; at < az; ++at) {
                            this[aw + at] = ay[at]
                        }
                    }
                }
                return av
            }
        }
    }
    if (!Array.isArray) {
        Array.isArray = function D(an) {
            return L(an) == "[object Array]"
        }
    }
    var ai = Object("a")
        , aa = ai[0] != "a" || !(0 in ai);
    if (!Array.prototype.forEach) {
        Array.prototype.forEach = function d(an) {
            var ap = M(this)
                , ao = aa && L(this) == "[object String]" ? this.split("") : ap
                , ar = arguments[1]
                , aq = -1
                , at = ao.length >>> 0;
            if (L(an) != "[object Function]") {
                throw new TypeError()
            }
            while (++aq < at) {
                if (aq in ao) {
                    an.call(ar, ao[aq], aq, ap)
                }
            }
        }
    }
    if (!Array.prototype.map) {
        Array.prototype.map = function J(ao) {
            var aq = M(this)
                , ap = aa && L(this) == "[object String]" ? this.split("") : aq
                , au = ap.length >>> 0
                , an = Array(au)
                , at = arguments[1];
            if (L(ao) != "[object Function]") {
                throw new TypeError(ao + " is not a function")
            }
            for (var ar = 0; ar < au; ar++) {
                if (ar in ap) {
                    an[ar] = ao.call(at, ap[ar], ar, aq)
                }
            }
            return an
        }
    }
    if (!Array.prototype.filter) {
        Array.prototype.filter = function Q(ao) {
            var aq = M(this), ap = aa && L(this) == "[object String]" ? this.split("") : aq, au = ap.length >>> 0, an = [], av, at = arguments[1];
            if (L(ao) != "[object Function]") {
                throw new TypeError(ao + " is not a function")
            }
            for (var ar = 0; ar < au; ar++) {
                if (ar in ap) {
                    av = ap[ar];
                    if (ao.call(at, av, ar, aq)) {
                        an.push(av)
                    }
                }
            }
            return an
        }
    }
    if (!Array.prototype.every) {
        Array.prototype.every = function P(an) {
            var ap = M(this)
                , ao = aa && L(this) == "[object String]" ? this.split("") : ap
                , at = ao.length >>> 0
                , ar = arguments[1];
            if (L(an) != "[object Function]") {
                throw new TypeError(an + " is not a function")
            }
            for (var aq = 0; aq < at; aq++) {
                if (aq in ao && !an.call(ar, ao[aq], aq, ap)) {
                    return false
                }
            }
            return true
        }
    }
    if (!Array.prototype.some) {
        Array.prototype.some = function Y(an) {
            var ap = M(this)
                , ao = aa && L(this) == "[object String]" ? this.split("") : ap
                , at = ao.length >>> 0
                , ar = arguments[1];
            if (L(an) != "[object Function]") {
                throw new TypeError(an + " is not a function")
            }
            for (var aq = 0; aq < at; aq++) {
                if (aq in ao && an.call(ar, ao[aq], aq, ap)) {
                    return true
                }
            }
            return false
        }
    }
    if (!Array.prototype.reduce) {
        Array.prototype.reduce = function q(ao) {
            var aq = M(this)
                , ap = aa && L(this) == "[object String]" ? this.split("") : aq
                , at = ap.length >>> 0;
            if (L(ao) != "[object Function]") {
                throw new TypeError(ao + " is not a function")
            }
            if (!at && arguments.length == 1) {
                throw new TypeError("reduce of empty array with no initial value")
            }
            var ar = 0;
            var an;
            if (arguments.length >= 2) {
                an = arguments[1]
            } else {
                do {
                    if (ar in ap) {
                        an = ap[ar++];
                        break
                    }
                    if (++ar >= at) {
                        throw new TypeError("reduce of empty array with no initial value")
                    }
                } while (true)
            }
            for (; ar < at; ar++) {
                if (ar in ap) {
                    an = ao.call(void 0, an, ap[ar], ar, aq)
                }
            }
            return an
        }
    }
    if (!Array.prototype.reduceRight) {
        Array.prototype.reduceRight = function C(ao) {
            var aq = M(this)
                , ap = aa && L(this) == "[object String]" ? this.split("") : aq
                , at = ap.length >>> 0;
            if (L(ao) != "[object Function]") {
                throw new TypeError(ao + " is not a function")
            }
            if (!at && arguments.length == 1) {
                throw new TypeError("reduceRight of empty array with no initial value")
            }
            var an, ar = at - 1;
            if (arguments.length >= 2) {
                an = arguments[1]
            } else {
                do {
                    if (ar in ap) {
                        an = ap[ar--];
                        break
                    }
                    if (--ar < 0) {
                        throw new TypeError("reduceRight of empty array with no initial value")
                    }
                } while (true)
            }
            do {
                if (ar in this) {
                    an = ao.call(void 0, an, ap[ar], ar, aq)
                }
            } while (ar--);
            return an
        }
    }
    if (!Array.prototype.indexOf || ([0, 1].indexOf(1, 2) != -1)) {
        Array.prototype.indexOf = function v(ao) {
            var an = aa && L(this) == "[object String]" ? this.split("") : M(this)
                , aq = an.length >>> 0;
            if (!aq) {
                return -1
            }
            var ap = 0;
            if (arguments.length > 1) {
                ap = U(arguments[1])
            }
            ap = ap >= 0 ? ap : Math.max(0, aq + ap);
            for (; ap < aq; ap++) {
                if (ap in an && an[ap] === ao) {
                    return ap
                }
            }
            return -1
        }
    }
    if (!Array.prototype.lastIndexOf || ([0, 1].lastIndexOf(0, -3) != -1)) {
        Array.prototype.lastIndexOf = function S(ao) {
            var an = aa && L(this) == "[object String]" ? this.split("") : M(this)
                , aq = an.length >>> 0;
            if (!aq) {
                return -1
            }
            var ap = aq - 1;
            if (arguments.length > 1) {
                ap = Math.min(ap, U(arguments[1]))
            }
            ap = ap >= 0 ? ap : aq - Math.abs(ap);
            for (; ap >= 0; ap--) {
                if (ap in an && ao === an[ap]) {
                    return ap
                }
            }
            return -1
        }
    }
    if (!Object.getPrototypeOf) {
        Object.getPrototypeOf = function ah(an) {
            return an.__proto__ || (an.constructor ? an.constructor.prototype : A)
        }
    }
    if (!Object.getOwnPropertyDescriptor) {
        var b = "Object.getOwnPropertyDescriptor called on a non-object: ";
        Object.getOwnPropertyDescriptor = function B(ap, aq) {
            if ((typeof ap != "object" && typeof ap != "function") || ap === null) {
                throw new TypeError(b + ap)
            }
            if (!T(ap, aq)) {
                return
            }
            var ar, an, at;
            ar = {
                enumerable: true,
                configurable: true
            };
            if (p) {
                var ao = ap.__proto__;
                ap.__proto__ = A;
                var an = ac(ap, aq);
                var at = aj(ap, aq);
                ap.__proto__ = ao;
                if (an || at) {
                    if (an) {
                        ar.get = an
                    }
                    if (at) {
                        ar.set = at
                    }
                    return ar
                }
            }
            ar.value = ap[aq];
            return ar
        }
    }
    if (!Object.getOwnPropertyNames) {
        Object.getOwnPropertyNames = function R(an) {
            return Object.keys(an)
        }
    }
    if (!Object.create) {
        var V;
        if (Object.prototype.__proto__ === null) {
            V = function () {
                return {
                    __proto__: null
                }
            }
        } else {
            V = function () {
                var ao = {};
                for (var an in ao) {
                    ao[an] = null
                }
                ao.constructor = ao.hasOwnProperty = ao.propertyIsEnumerable = ao.isPrototypeOf = ao.toLocaleString = ao.toString = ao.valueOf = ao.__proto__ = null;
                return ao
            }
        }
        Object.create = function j(ap, aq) {
            var ao;
            if (ap === null) {
                ao = V()
            } else {
                if (typeof ap != "object") {
                    throw new TypeError("typeof prototype[" + (typeof ap) + "] != 'object'")
                }
                var an = function () { };
                an.prototype = ap;
                ao = new an();
                ao.__proto__ = ap
            }
            if (aq !== void 0) {
                Object.defineProperties(ao, aq)
            }
            return ao
        }
    }
    function F(an) {
        try {
            Object.defineProperty(an, "sentinel", {});
            return "sentinel" in an
        } catch (ao) { }
    }
    if (Object.defineProperty) {
        var i = F({});
        var H = typeof document == "undefined" || F(document.createElement("div"));
        if (!i || !H) {
            var E = Object.defineProperty
        }
    }
    if (!Object.defineProperty || E) {
        var f = "Property description must be an object: ";
        var W = "Object.defineProperty called on non-object: ";
        var n = "getters & setters can not be defined on this javascript engine";
        Object.defineProperty = function Z(ao, aq, ar) {
            if ((typeof ao != "object" && typeof ao != "function") || ao === null) {
                throw new TypeError(W + ao)
            }
            if ((typeof ar != "object" && typeof ar != "function") || ar === null) {
                throw new TypeError(f + ar)
            }
            if (E) {
                try {
                    return E.call(Object, ao, aq, ar)
                } catch (ap) { }
            }
            if (T(ar, "value")) {
                if (p && (ac(ao, aq) || aj(ao, aq))) {
                    var an = ao.__proto__;
                    ao.__proto__ = A;
                    delete ao[aq];
                    ao[aq] = ar.value;
                    ao.__proto__ = an
                } else {
                    ao[aq] = ar.value
                }
            } else {
                if (!p) {
                    throw new TypeError(n)
                }
                if (T(ar, "get")) {
                    ae(ao, aq, ar.get)
                }
                if (T(ar, "set")) {
                    al(ao, aq, ar.set)
                }
            }
            return ao
        }
    }
    if (!Object.defineProperties) {
        Object.defineProperties = function N(an, ao) {
            for (var ap in ao) {
                if (T(ao, ap)) {
                    Object.defineProperty(an, ap, ao[ap])
                }
            }
            return an
        }
    }
    if (!Object.seal) {
        Object.seal = function X(an) {
            return an
        }
    }
    if (!Object.freeze) {
        Object.freeze = function s(an) {
            return an
        }
    }
    try {
        Object.freeze(function () { })
    } catch (l) {
        Object.freeze = (function s(ao) {
            return function an(ap) {
                if (typeof ap == "function") {
                    return ap
                } else {
                    return ao(ap)
                }
            }
        }
        )(Object.freeze)
    }
    if (!Object.preventExtensions) {
        Object.preventExtensions = function O(an) {
            return an
        }
    }
    if (!Object.isSealed) {
        Object.isSealed = function am(an) {
            return false
        }
    }
    if (!Object.isFrozen) {
        Object.isFrozen = function ab(an) {
            return false
        }
    }
    if (!Object.isExtensible) {
        Object.isExtensible = function r(ao) {
            if (Object(ao) === ao) {
                throw new TypeError()
            }
            var an = "";
            while (T(ao, an)) {
                an += "?"
            }
            ao[an] = true;
            var ap = T(ao, an);
            delete ao[an];
            return ap
        }
    }
    if (!Object.keys) {
        var m = true
            , u = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"]
            , k = u.length;
        for (var x in {
            toString: null
        }) {
            m = false
        }
        Object.keys = function I(ap) {
            if ((typeof ap != "object" && typeof ap != "function") || ap === null) {
                throw new TypeError("Object.keys called on a non-object")
            }
            var at = [];
            for (var ao in ap) {
                if (T(ap, ao)) {
                    at.push(ao)
                }
            }
            if (m) {
                for (var aq = 0, ar = k; aq < ar; aq++) {
                    var an = u[aq];
                    if (T(ap, an)) {
                        at.push(an)
                    }
                }
            }
            return at
        }
    }
    if (!Date.now) {
        Date.now = function af() {
            return new Date().getTime()
        }
    }
    var ak = "\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF";
    if (!String.prototype.trim || ak.trim()) {
        ak = "[" + ak + "]";
        var G = new RegExp("^" + ak + ak + "*")
            , y = new RegExp(ak + ak + "*$");
        String.prototype.trim = function a() {
            return String(this).replace(G, "").replace(y, "")
        }
    }
    function U(an) {
        an = +an;
        if (an !== an) {
            an = 0
        } else {
            if (an !== 0 && an !== (1 / 0) && an !== -(1 / 0)) {
                an = (an > 0 || -1) * Math.floor(Math.abs(an))
            }
        }
        return an
    }
    function z(an) {
        var ao = typeof an;
        return (an === null || ao === "undefined" || ao === "boolean" || ao === "number" || ao === "string")
    }
    function w(ao) {
        var aq, an, ap;
        if (z(ao)) {
            return ao
        }
        an = ao.valueOf;
        if (typeof an === "function") {
            aq = an.call(ao);
            if (z(aq)) {
                return aq
            }
        }
        ap = ao.toString;
        if (typeof ap === "function") {
            aq = ap.call(ao);
            if (z(aq)) {
                return aq
            }
        }
        throw new TypeError()
    }
    var M = function (an) {
        if (an == null) {
            throw new TypeError("can't convert " + an + " to object")
        }
        return Object(an)
    }
});
define("ace/lib/fixoldbrowsers", ["require", "exports", "module", "ace/lib/regexp", "ace/lib/es5-shim"], function (b, a, c) {
    b("./regexp");
    b("./es5-shim")
});
define("ace/lib/dom", ["require", "exports", "module"], function (c, a, d) {
    var b = "http://www.w3.org/1999/xhtml";
    a.getDocumentHead = function (f) {
        if (!f) {
            f = document
        }
        return f.head || f.getElementsByTagName("head")[0] || f.documentElement
    }
        ;
    a.createElement = function (f, g) {
        return document.createElementNS ? document.createElementNS(g || b, f) : document.createElement(f)
    }
        ;
    a.hasCssClass = function (h, f) {
        var g = (h.className || "").split(/\s+/g);
        return g.indexOf(f) !== -1
    }
        ;
    a.addCssClass = function (g, f) {
        if (!a.hasCssClass(g, f)) {
            g.className += " " + f
        }
    }
        ;
    a.removeCssClass = function (i, g) {
        var h = i.className.split(/\s+/g);
        while (true) {
            var f = h.indexOf(g);
            if (f == -1) {
                break
            }
            h.splice(f, 1)
        }
        i.className = h.join(" ")
    }
        ;
    a.toggleCssClass = function (i, g) {
        var h = i.className.split(/\s+/g)
            , j = true;
        while (true) {
            var f = h.indexOf(g);
            if (f == -1) {
                break
            }
            j = false;
            h.splice(f, 1)
        }
        if (j) {
            h.push(g)
        }
        i.className = h.join(" ");
        return j
    }
        ;
    a.setCssClass = function (h, g, f) {
        if (f) {
            a.addCssClass(h, g)
        } else {
            a.removeCssClass(h, g)
        }
    }
        ;
    a.hasCssString = function (i, h) {
        var f = 0, g;
        h = h || document;
        if (h.createStyleSheet && (g = h.styleSheets)) {
            while (f < g.length) {
                if (g[f++].owningElement.id === i) {
                    return true
                }
            }
        } else {
            if ((g = h.getElementsByTagName("style"))) {
                while (f < g.length) {
                    if (g[f++].id === i) {
                        return true
                    }
                }
            }
        }
        return false
    }
        ;
    a.importCssString = function e(g, i, h) {
        h = h || document;
        if (i && a.hasCssString(i, h)) {
            return null
        }
        var f;
        if (h.createStyleSheet) {
            f = h.createStyleSheet();
            f.cssText = g;
            if (i) {
                f.owningElement.id = i
            }
        } else {
            f = h.createElementNS ? h.createElementNS(b, "style") : h.createElement("style");
            f.appendChild(h.createTextNode(g));
            if (i) {
                f.id = i
            }
            a.getDocumentHead(h).appendChild(f)
        }
    }
        ;
    a.importCssStylsheet = function (g, h) {
        if (h.createStyleSheet) {
            h.createStyleSheet(g)
        } else {
            var f = a.createElement("link");
            f.rel = "stylesheet";
            f.href = g;
            a.getDocumentHead(h).appendChild(f)
        }
    }
        ;
    a.getInnerWidth = function (f) {
        return (parseInt(a.computedStyle(f, "paddingLeft"), 10) + parseInt(a.computedStyle(f, "paddingRight"), 10) + f.clientWidth)
    }
        ;
    a.getInnerHeight = function (f) {
        return (parseInt(a.computedStyle(f, "paddingTop"), 10) + parseInt(a.computedStyle(f, "paddingBottom"), 10) + f.clientHeight)
    }
        ;
    if (typeof document == "undefined") {
        return
    }
    if (window.pageYOffset !== undefined) {
        a.getPageScrollTop = function () {
            return window.pageYOffset
        }
            ;
        a.getPageScrollLeft = function () {
            return window.pageXOffset
        }
    } else {
        a.getPageScrollTop = function () {
            return document.body.scrollTop
        }
            ;
        a.getPageScrollLeft = function () {
            return document.body.scrollLeft
        }
    }
    if (window.getComputedStyle) {
        a.computedStyle = function (f, g) {
            if (g) {
                return (window.getComputedStyle(f, "") || {})[g] || ""
            }
            return window.getComputedStyle(f, "") || {}
        }
    } else {
        a.computedStyle = function (f, g) {
            if (g) {
                return f.currentStyle[g]
            }
            return f.currentStyle
        }
    }
    a.scrollbarWidth = function (g) {
        var h = a.createElement("ace_inner");
        h.style.width = "100%";
        h.style.minWidth = "0px";
        h.style.height = "200px";
        h.style.display = "block";
        var j = a.createElement("ace_outer");
        var k = j.style;
        k.position = "absolute";
        k.left = "-10000px";
        k.overflow = "hidden";
        k.width = "200px";
        k.minWidth = "0px";
        k.height = "150px";
        k.display = "block";
        j.appendChild(h);
        var f = g.documentElement;
        f.appendChild(j);
        var i = h.offsetWidth;
        k.overflow = "scroll";
        var l = h.offsetWidth;
        if (i == l) {
            l = j.clientWidth
        }
        f.removeChild(j);
        return i - l
    }
        ;
    a.setInnerHtml = function (h, f) {
        var g = h.cloneNode(false);
        g.innerHTML = f;
        h.parentNode.replaceChild(g, h);
        return g
    }
        ;
    if ("textContent" in document.documentElement) {
        a.setInnerText = function (f, g) {
            f.textContent = g
        }
            ;
        a.getInnerText = function (f) {
            return f.textContent
        }
    } else {
        a.setInnerText = function (f, g) {
            f.innerText = g
        }
            ;
        a.getInnerText = function (f) {
            return f.innerText
        }
    }
    a.getParentWindow = function (f) {
        return f.defaultView || f.parentWindow
    }
});
define("ace/lib/oop", ["require", "exports", "module"], function (b, a, c) {
    a.inherits = function (e, d) {
        e.super_ = d;
        e.prototype = Object.create(d.prototype, {
            constructor: {
                value: e,
                enumerable: false,
                writable: true,
                configurable: true
            }
        })
    }
        ;
    a.mixin = function (f, d) {
        for (var e in d) {
            f[e] = d[e]
        }
        return f
    }
        ;
    a.implement = function (e, d) {
        a.mixin(e, d)
    }
});
define("ace/lib/keys", ["require", "exports", "module", "ace/lib/fixoldbrowsers", "ace/lib/oop"], function (c, a, d) {
    c("./fixoldbrowsers");
    var e = c("./oop");
    var b = (function () {
        var g = {
            MODIFIER_KEYS: {
                16: "Shift",
                17: "Ctrl",
                18: "Alt",
                224: "Meta"
            },
            KEY_MODS: {
                ctrl: 1,
                alt: 2,
                option: 2,
                shift: 4,
                "super": 8,
                meta: 8,
                command: 8,
                cmd: 8
            },
            FUNCTION_KEYS: {
                8: "Backspace",
                9: "Tab",
                13: "Return",
                19: "Pause",
                27: "Esc",
                32: "Space",
                33: "PageUp",
                34: "PageDown",
                35: "End",
                36: "Home",
                37: "Left",
                38: "Up",
                39: "Right",
                40: "Down",
                44: "Print",
                45: "Insert",
                46: "Delete",
                96: "Numpad0",
                97: "Numpad1",
                98: "Numpad2",
                99: "Numpad3",
                100: "Numpad4",
                101: "Numpad5",
                102: "Numpad6",
                103: "Numpad7",
                104: "Numpad8",
                105: "Numpad9",
                "-13": "NumpadEnter",
                112: "F1",
                113: "F2",
                114: "F3",
                115: "F4",
                116: "F5",
                117: "F6",
                118: "F7",
                119: "F8",
                120: "F9",
                121: "F10",
                122: "F11",
                123: "F12",
                144: "Numlock",
                145: "Scrolllock"
            },
            PRINTABLE_KEYS: {
                32: " ",
                48: "0",
                49: "1",
                50: "2",
                51: "3",
                52: "4",
                53: "5",
                54: "6",
                55: "7",
                56: "8",
                57: "9",
                59: ";",
                61: "=",
                65: "a",
                66: "b",
                67: "c",
                68: "d",
                69: "e",
                70: "f",
                71: "g",
                72: "h",
                73: "i",
                74: "j",
                75: "k",
                76: "l",
                77: "m",
                78: "n",
                79: "o",
                80: "p",
                81: "q",
                82: "r",
                83: "s",
                84: "t",
                85: "u",
                86: "v",
                87: "w",
                88: "x",
                89: "y",
                90: "z",
                107: "+",
                109: "-",
                110: ".",
                186: ";",
                187: "=",
                188: ",",
                189: "-",
                190: ".",
                191: "/",
                192: "`",
                219: "[",
                220: "\\",
                221: "]",
                222: "'"
            }
        };
        var f, h;
        for (h in g.FUNCTION_KEYS) {
            f = g.FUNCTION_KEYS[h].toLowerCase();
            g[f] = parseInt(h, 10)
        }
        for (h in g.PRINTABLE_KEYS) {
            f = g.PRINTABLE_KEYS[h].toLowerCase();
            g[f] = parseInt(h, 10)
        }
        e.mixin(g, g.MODIFIER_KEYS);
        e.mixin(g, g.PRINTABLE_KEYS);
        e.mixin(g, g.FUNCTION_KEYS);
        g.enter = g["return"];
        g.escape = g.esc;
        g.del = g["delete"];
        g[173] = "-";
        (function () {
            var k = ["cmd", "ctrl", "alt", "shift"];
            for (var j = Math.pow(2, k.length); j--;) {
                g.KEY_MODS[j] = k.filter(function (i) {
                    return j & g.KEY_MODS[i]
                }).join("-") + "-"
            }
        }
        )();
        g.KEY_MODS[0] = "";
        g.KEY_MODS[-1] = "input-";
        return g
    }
    )();
    e.mixin(a, b);
    a.keyCodeToString = function (g) {
        var f = b[g];
        if (typeof f != "string") {
            f = String.fromCharCode(g)
        }
        return f.toLowerCase()
    }
});
define("ace/lib/useragent", ["require", "exports", "module"], function (b, a, d) {
    a.OS = {
        LINUX: "LINUX",
        MAC: "MAC",
        WINDOWS: "WINDOWS"
    };
    a.getOS = function () {
        if (a.isMac) {
            return a.OS.MAC
        } else {
            if (a.isLinux) {
                return a.OS.LINUX
            } else {
                return a.OS.WINDOWS
            }
        }
    }
        ;
    if (typeof navigator != "object") {
        return
    }
    var e = (navigator.platform.match(/mac|win|linux/i) || ["other"])[0].toLowerCase();
    var c = navigator.userAgent;
    a.isWin = (e == "win");
    a.isMac = (e == "mac");
    a.isLinux = (e == "linux");
    a.isIE = (navigator.appName == "Microsoft Internet Explorer" || navigator.appName.indexOf("MSAppHost") >= 0) ? parseFloat((c.match(/(?:MSIE |Trident\/[0-9]+[\.0-9]+;.*rv:)([0-9]+[\.0-9]+)/) || [])[1]) : parseFloat((c.match(/(?:Trident\/[0-9]+[\.0-9]+;.*rv:)([0-9]+[\.0-9]+)/) || [])[1]);
    a.isOldIE = a.isIE && a.isIE < 9;
    a.isGecko = a.isMozilla = (window.Controllers || window.controllers) && window.navigator.product === "Gecko";
    a.isOldGecko = a.isGecko && parseInt((c.match(/rv\:(\d+)/) || [])[1], 10) < 4;
    a.isOpera = window.opera && Object.prototype.toString.call(window.opera) == "[object Opera]";
    a.isWebKit = parseFloat(c.split("WebKit/")[1]) || undefined;
    a.isChrome = parseFloat(c.split(" Chrome/")[1]) || undefined;
    a.isAIR = c.indexOf("AdobeAIR") >= 0;
    a.isIPad = c.indexOf("iPad") >= 0;
    a.isTouchPad = c.indexOf("TouchPad") >= 0;
    a.isChromeOS = c.indexOf(" CrOS ") >= 0
});
define("ace/lib/event", ["require", "exports", "module", "ace/lib/keys", "ace/lib/useragent"], function (e, f, c) {
    var j = e("./keys");
    var d = e("./useragent");
    f.addListener = function (l, k, n) {
        if (l.addEventListener) {
            return l.addEventListener(k, n, false)
        }
        if (l.attachEvent) {
            var m = function () {
                n.call(l, window.event)
            };
            n._wrapper = m;
            l.attachEvent("on" + k, m)
        }
    }
        ;
    f.removeListener = function (l, k, m) {
        if (l.removeEventListener) {
            return l.removeEventListener(k, m, false)
        }
        if (l.detachEvent) {
            l.detachEvent("on" + k, m._wrapper || m)
        }
    }
        ;
    f.stopEvent = function (k) {
        f.stopPropagation(k);
        f.preventDefault(k);
        return false
    }
        ;
    f.stopPropagation = function (k) {
        if (k.stopPropagation) {
            k.stopPropagation()
        } else {
            k.cancelBubble = true
        }
    }
        ;
    f.preventDefault = function (k) {
        if (k.preventDefault) {
            k.preventDefault()
        } else {
            k.returnValue = false
        }
    }
        ;
    f.getButton = function (k) {
        if (k.type == "dblclick") {
            return 0
        }
        if (k.type == "contextmenu" || (d.isMac && (k.ctrlKey && !k.altKey && !k.shiftKey))) {
            return 2
        }
        if (k.preventDefault) {
            return k.button
        } else {
            return {
                1: 0,
                2: 2,
                4: 1
            }[k.button]
        }
    }
        ;
    f.capture = function (n, m, l) {
        function k(o) {
            m && m(o);
            l && l(o);
            f.removeListener(document, "mousemove", m, true);
            f.removeListener(document, "mouseup", k, true);
            f.removeListener(document, "dragstart", k, true)
        }
        f.addListener(document, "mousemove", m, true);
        f.addListener(document, "mouseup", k, true);
        f.addListener(document, "dragstart", k, true);
        return k
    }
        ;
    f.addMouseWheelListener = function (k, l) {
        if ("onmousewheel" in k) {
            f.addListener(k, "mousewheel", function (n) {
                var m = 8;
                if (n.wheelDeltaX !== undefined) {
                    n.wheelX = -n.wheelDeltaX / m;
                    n.wheelY = -n.wheelDeltaY / m
                } else {
                    n.wheelX = 0;
                    n.wheelY = -n.wheelDelta / m
                }
                l(n)
            })
        } else {
            if ("onwheel" in k) {
                f.addListener(k, "wheel", function (n) {
                    var m = 0.35;
                    switch (n.deltaMode) {
                        case n.DOM_DELTA_PIXEL:
                            n.wheelX = n.deltaX * m || 0;
                            n.wheelY = n.deltaY * m || 0;
                            break;
                        case n.DOM_DELTA_LINE:
                        case n.DOM_DELTA_PAGE:
                            n.wheelX = (n.deltaX || 0) * 5;
                            n.wheelY = (n.deltaY || 0) * 5;
                            break
                    }
                    l(n)
                })
            } else {
                f.addListener(k, "DOMMouseScroll", function (m) {
                    if (m.axis && m.axis == m.HORIZONTAL_AXIS) {
                        m.wheelX = (m.detail || 0) * 5;
                        m.wheelY = 0
                    } else {
                        m.wheelX = 0;
                        m.wheelY = (m.detail || 0) * 5
                    }
                    l(m)
                })
            }
        }
    }
        ;
    f.addMultiMouseDownListener = function (n, k, o, r) {
        var s = 0;
        var q, p, l;
        var m = {
            2: "dblclick",
            3: "tripleclick",
            4: "quadclick"
        };
        f.addListener(n, "mousedown", function (u) {
            if (f.getButton(u) !== 0) {
                s = 0
            } else {
                if (u.detail > 1) {
                    s++;
                    if (s > 4) {
                        s = 1
                    }
                } else {
                    s = 1
                }
            }
            if (d.isIE) {
                var t = Math.abs(u.clientX - q) > 5 || Math.abs(u.clientY - p) > 5;
                if (!l || t) {
                    s = 1
                }
                if (l) {
                    clearTimeout(l)
                }
                l = setTimeout(function () {
                    l = null
                }, k[s - 1] || 600);
                if (s == 1) {
                    q = u.clientX;
                    p = u.clientY
                }
            }
            u._clicks = s;
            o[r]("mousedown", u);
            if (s > 4) {
                s = 0
            } else {
                if (s > 1) {
                    return o[r](m[s], u)
                }
            }
        });
        if (d.isOldIE) {
            f.addListener(n, "dblclick", function (t) {
                s = 2;
                if (l) {
                    clearTimeout(l)
                }
                l = setTimeout(function () {
                    l = null
                }, k[s - 1] || 600);
                o[r]("mousedown", t);
                o[r](m[s], t)
            })
        }
    }
        ;
    var b = d.isMac && d.isOpera && !("KeyboardEvent" in window) ? function (k) {
        return 0 | (k.metaKey ? 1 : 0) | (k.altKey ? 2 : 0) | (k.shiftKey ? 4 : 0) | (k.ctrlKey ? 8 : 0)
    }
        : function (k) {
            return 0 | (k.ctrlKey ? 1 : 0) | (k.altKey ? 2 : 0) | (k.shiftKey ? 4 : 0) | (k.metaKey ? 8 : 0)
        }
        ;
    f.getModifierString = function (k) {
        return j.KEY_MODS[b(k)]
    }
        ;
    function i(p, o, n) {
        var m = b(o);
        if (!d.isMac && h) {
            if (h[91] || h[92]) {
                m |= 8
            }
            if (h.altGr) {
                if ((3 & m) != 3) {
                    h.altGr = 0
                } else {
                    return
                }
            }
            if (n === 18 || n === 17) {
                var k = "location" in o ? o.location : o.keyLocation;
                if (n === 17 && k === 1) {
                    if (h[n] == 1) {
                        g = o.timeStamp
                    }
                } else {
                    if (n === 18 && m === 3 && k === 2) {
                        var l = o.timeStamp - g;
                        if (l < 50) {
                            h.altGr = true
                        }
                    }
                }
            }
        }
        if (n in j.MODIFIER_KEYS) {
            n = -1
        }
        if (m & 8 && (n === 91 || n === 93)) {
            n = -1
        }
        if (!m && n === 13) {
            var k = "location" in o ? o.location : o.keyLocation;
            if (k === 3) {
                p(o, m, -n);
                if (o.defaultPrevented) {
                    return
                }
            }
        }
        if (d.isChromeOS && m & 8) {
            p(o, m, n);
            if (o.defaultPrevented) {
                return
            } else {
                m &= ~8
            }
        }
        if (!m && !(n in j.FUNCTION_KEYS) && !(n in j.PRINTABLE_KEYS)) {
            return false
        }
        return p(o, m, n)
    }
    var h = null;
    var g = 0;
    f.addCommandKeyListener = function (m, o) {
        var l = f.addListener;
        if (d.isOldGecko || (d.isOpera && !("KeyboardEvent" in window))) {
            var n = null;
            l(m, "keydown", function (p) {
                n = p.keyCode
            });
            l(m, "keypress", function (p) {
                return i(o, p, n)
            })
        } else {
            var k = null;
            l(m, "keydown", function (q) {
                h[q.keyCode] = (h[q.keyCode] || 0) + 1;
                var p = i(o, q, q.keyCode);
                k = q.defaultPrevented;
                return p
            });
            l(m, "keypress", function (p) {
                if (k && (p.ctrlKey || p.altKey || p.shiftKey || p.metaKey)) {
                    f.stopEvent(p);
                    k = null
                }
            });
            l(m, "keyup", function (p) {
                h[p.keyCode] = null
            });
            if (!h) {
                h = Object.create(null);
                l(window, "focus", function (p) {
                    h = Object.create(null)
                })
            }
        }
    }
        ;
    if (window.postMessage && !d.isOldIE) {
        var a = 1;
        f.nextTick = function (n, m) {
            m = m || window;
            var k = "zero-timeout-message-" + a;
            f.addListener(m, "message", function l(o) {
                if (o.data == k) {
                    f.stopPropagation(o);
                    f.removeListener(m, "message", l);
                    n()
                }
            });
            m.postMessage(k, "*")
        }
    }
    f.nextFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame;
    if (f.nextFrame) {
        f.nextFrame = f.nextFrame.bind(window)
    } else {
        f.nextFrame = function (k) {
            setTimeout(k, 17)
        }
    }
});
define("ace/lib/lang", ["require", "exports", "module"], function (c, a, d) {
    a.last = function (g) {
        return g[g.length - 1]
    }
        ;
    a.stringReverse = function (g) {
        return g.split("").reverse().join("")
    }
        ;
    a.stringRepeat = function (h, i) {
        var g = "";
        while (i > 0) {
            if (i & 1) {
                g += h
            }
            if (i >>= 1) {
                h += h
            }
        }
        return g
    }
        ;
    var e = /^\s\s*/;
    var f = /\s\s*$/;
    a.stringTrimLeft = function (g) {
        return g.replace(e, "")
    }
        ;
    a.stringTrimRight = function (g) {
        return g.replace(f, "")
    }
        ;
    a.copyObject = function (h) {
        var i = {};
        for (var g in h) {
            i[g] = h[g]
        }
        return i
    }
        ;
    a.copyArray = function (k) {
        var j = [];
        for (var h = 0, g = k.length; h < g; h++) {
            if (k[h] && typeof k[h] == "object") {
                j[h] = this.copyObject(k[h])
            } else {
                j[h] = k[h]
            }
        }
        return j
    }
        ;
    a.deepCopy = function b(i) {
        if (typeof i !== "object" || !i) {
            return i
        }
        var j;
        if (Array.isArray(i)) {
            j = [];
            for (var h = 0; h < i.length; h++) {
                j[h] = b(i[h])
            }
            return j
        }
        var g = i.constructor;
        if (g === RegExp) {
            return i
        }
        j = g();
        for (var h in i) {
            j[h] = b(i[h])
        }
        return j
    }
        ;
    a.arrayToMap = function (g) {
        var j = {};
        for (var h = 0; h < g.length; h++) {
            j[g[h]] = 1
        }
        return j
    }
        ;
    a.createMap = function (h) {
        var j = Object.create(null);
        for (var g in h) {
            j[g] = h[g]
        }
        return j
    }
        ;
    a.arrayRemove = function (j, h) {
        for (var g = 0; g <= j.length; g++) {
            if (h === j[g]) {
                j.splice(g, 1)
            }
        }
    }
        ;
    a.escapeRegExp = function (g) {
        return g.replace(/([.*+?^${}()|[\]\/\\])/g, "\\$1")
    }
        ;
    a.escapeHTML = function (g) {
        return g.replace(/&/g, "&#38;").replace(/"/g, "&#34;").replace(/'/g, "&#39;").replace(/</g, "&#60;")
    }
        ;
    a.getMatchOffsets = function (h, g) {
        var i = [];
        h.replace(g, function (j) {
            i.push({
                offset: arguments[arguments.length - 2],
                length: j.length
            })
        });
        return i
    }
        ;
    a.deferredCall = function (h) {
        var j = null;
        var i = function () {
            j = null;
            h()
        };
        var g = function (k) {
            g.cancel();
            j = setTimeout(i, k || 0);
            return g
        };
        g.schedule = g;
        g.call = function () {
            this.cancel();
            h();
            return g
        }
            ;
        g.cancel = function () {
            clearTimeout(j);
            j = null;
            return g
        }
            ;
        g.isPending = function () {
            return j
        }
            ;
        return g
    }
        ;
    a.delayedCall = function (i, h) {
        var k = null;
        var j = function () {
            k = null;
            i()
        };
        var g = function (l) {
            if (k == null) {
                k = setTimeout(j, l || h)
            }
        };
        g.delay = function (l) {
            k && clearTimeout(k);
            k = setTimeout(j, l || h)
        }
            ;
        g.schedule = g;
        g.call = function () {
            this.cancel();
            i()
        }
            ;
        g.cancel = function () {
            k && clearTimeout(k);
            k = null
        }
            ;
        g.isPending = function () {
            return k
        }
            ;
        return g
    }
});
define("ace/keyboard/textinput", ["require", "exports", "module", "ace/lib/event", "ace/lib/useragent", "ace/lib/dom", "ace/lib/lang"], function (e, h, c) {
    var a = e("../lib/event");
    var d = e("../lib/useragent");
    var f = e("../lib/dom");
    var b = e("../lib/lang");
    var g = d.isChrome < 18;
    var i = d.isIE;
    var j = function (s, p) {
        var G = f.createElement("textarea");
        G.className = "ace_text-input";
        if (d.isTouchPad) {
            G.setAttribute("x-palm-disable-auto-cap", true)
        }
        G.setAttribute("wrap", "off");
        G.setAttribute("autocorrect", "off");
        G.setAttribute("autocapitalize", "off");
        G.setAttribute("spellcheck", false);
        G.style.opacity = "0";
        if (d.isOldIE) {
            G.style.top = "-1000px"
        }
        s.insertBefore(G, s.firstChild);
        var w = "\x01\x01";
        var E = false;
        var l = false;
        var x = false;
        var T = "";
        var Q = true;
        try {
            var N = document.activeElement === G
        } catch (S) { }
        a.addListener(G, "blur", function (V) {
            p.onBlur(V);
            N = false
        });
        a.addListener(G, "focus", function (V) {
            N = true;
            p.onFocus(V);
            M()
        });
        this.focus = function () {
            if (T) {
                return G.focus()
            }
            G.style.position = "fixed";
            G.style.top = "-1000px";
            G.focus();
            setTimeout(function () {
                G.style.position = ""
            }, 0)
        }
            ;
        this.blur = function () {
            G.blur()
        }
            ;
        this.isFocused = function () {
            return N
        }
            ;
        var m = b.delayedCall(function () {
            N && M(Q)
        });
        var B = b.delayedCall(function () {
            if (!x) {
                G.value = w;
                N && M()
            }
        });
        function M(Y) {
            if (x) {
                return
            }
            x = true;
            if (v) {
                V = 0;
                X = Y ? 0 : G.value.length - 1
            } else {
                var V = Y ? 2 : 1;
                var X = 2
            }
            try {
                G.setSelectionRange(V, X)
            } catch (W) { }
            x = false
        }
        function z() {
            if (x) {
                return
            }
            G.value = w;
            if (d.isWebKit) {
                B.schedule()
            }
        }
        d.isWebKit || p.addEventListener("changeSelection", function () {
            if (p.selection.isEmpty() != Q) {
                Q = !Q;
                m.schedule()
            }
        });
        z();
        if (N) {
            p.onFocus()
        }
        var C = function (V) {
            return V.selectionStart === 0 && V.selectionEnd === V.value.length
        };
        if (!G.setSelectionRange && G.createTextRange) {
            G.setSelectionRange = function (W, X) {
                var V = this.createTextRange();
                V.collapse(true);
                V.moveStart("character", W);
                V.moveEnd("character", X);
                V.select()
            }
                ;
            C = function (X) {
                try {
                    var V = X.ownerDocument.selection.createRange()
                } catch (W) { }
                if (!V || V.parentElement() != X) {
                    return false
                }
                return V.text == X.value
            }
        }
        if (d.isOldIE) {
            var J = false;
            var y = function (W) {
                if (J) {
                    return
                }
                var V = G.value;
                if (x || !V || V == w) {
                    return
                }
                if (W && V == w[0]) {
                    return q.schedule()
                }
                n(V);
                J = true;
                z();
                J = false
            };
            var q = b.delayedCall(y);
            a.addListener(G, "propertychange", y);
            var D = {
                13: 1,
                27: 1
            };
            a.addListener(G, "keyup", function (V) {
                if (x && (!G.value || D[V.keyCode])) {
                    setTimeout(O, 0)
                }
                if ((G.value.charCodeAt(0) || 0) < 129) {
                    return q.call()
                }
                x ? I() : A()
            });
            a.addListener(G, "keydown", function (V) {
                q.schedule(50)
            })
        }
        var t = function (V) {
            if (E) {
                E = false
            } else {
                if (C(G)) {
                    p.selectAll();
                    M()
                } else {
                    if (v) {
                        M(p.selection.isEmpty())
                    }
                }
            }
        };
        var v = null;
        this.setInputHandler = function (V) {
            v = V
        }
            ;
        this.getInputHandler = function () {
            return v
        }
            ;
        var R = false;
        var n = function (V) {
            if (v) {
                V = v(V);
                v = null
            }
            if (l) {
                M();
                if (V) {
                    p.onPaste(V)
                }
                l = false
            } else {
                if (V == w.charAt(0)) {
                    if (R) {
                        p.execCommand("del", {
                            source: "ace"
                        })
                    } else {
                        p.execCommand("backspace", {
                            source: "ace"
                        })
                    }
                } else {
                    if (V.substring(0, 2) == w) {
                        V = V.substr(2)
                    } else {
                        if (V.charAt(0) == w.charAt(0)) {
                            V = V.substr(1)
                        } else {
                            if (V.charAt(V.length - 1) == w.charAt(0)) {
                                V = V.slice(0, -1)
                            }
                        }
                    }
                    if (V.charAt(V.length - 1) == w.charAt(0)) {
                        V = V.slice(0, -1)
                    }
                    if (V) {
                        p.onTextInput(V)
                    }
                }
            }
            if (R) {
                R = false
            }
        };
        var P = function (W) {
            if (x) {
                return
            }
            var V = G.value;
            n(V);
            z()
        };
        var u = function (X, W) {
            var Y = X.clipboardData || window.clipboardData;
            if (!Y || g) {
                return
            }
            var V = i ? "Text" : "text/plain";
            if (W) {
                return Y.setData(V, W) !== false
            } else {
                return Y.getData(V)
            }
        };
        var o = function (X, V) {
            var W = p.getCopyText();
            if (!W) {
                return a.preventDefault(X)
            }
            if (u(X, W)) {
                V ? p.onCut() : p.onCopy();
                a.preventDefault(X)
            } else {
                E = true;
                G.value = W;
                G.select();
                setTimeout(function () {
                    E = false;
                    z();
                    M();
                    V ? p.onCut() : p.onCopy()
                })
            }
        };
        var K = function (V) {
            o(V, true)
        };
        var k = function (V) {
            o(V, false)
        };
        var L = function (W) {
            var V = u(W);
            if (typeof V == "string") {
                if (V) {
                    p.onPaste(V)
                }
                if (d.isIE) {
                    setTimeout(M)
                }
                a.preventDefault(W)
            } else {
                G.value = "";
                l = true
            }
        };
        a.addCommandKeyListener(G, p.onCommandKey.bind(p));
        a.addListener(G, "select", t);
        a.addListener(G, "input", P);
        a.addListener(G, "cut", K);
        a.addListener(G, "copy", k);
        a.addListener(G, "paste", L);
        if (!("oncut" in G) || !("oncopy" in G) || !("onpaste" in G)) {
            a.addListener(s, "keydown", function (V) {
                if ((d.isMac && !V.metaKey) || !V.ctrlKey) {
                    return
                }
                switch (V.keyCode) {
                    case 67:
                        k(V);
                        break;
                    case 86:
                        L(V);
                        break;
                    case 88:
                        K(V);
                        break
                }
            })
        }
        var A = function (V) {
            if (x || !p.onCompositionStart || p.$readOnly) {
                return
            }
            x = {};
            p.onCompositionStart();
            setTimeout(I, 0);
            p.on("mousedown", O);
            if (!p.selection.isEmpty()) {
                p.insert("");
                p.session.markUndoGroup();
                p.selection.clearSelection()
            }
            p.session.markUndoGroup()
        };
        var I = function () {
            if (!x || !p.onCompositionUpdate || p.$readOnly) {
                return
            }
            var W = G.value.replace(/\x01/g, "");
            if (x.lastValue === W) {
                return
            }
            p.onCompositionUpdate(W);
            if (x.lastValue) {
                p.undo()
            }
            x.lastValue = W;
            if (x.lastValue) {
                var V = p.selection.getRange();
                p.insert(x.lastValue);
                p.session.markUndoGroup();
                x.range = p.selection.getRange();
                p.selection.setRange(V);
                p.selection.clearSelection()
            }
        };
        var O = function (W) {
            if (!p.onCompositionEnd || p.$readOnly) {
                return
            }
            var Y = x;
            x = false;
            var X = setTimeout(function () {
                X = null;
                var Z = G.value.replace(/\x01/g, "");
                if (x) {
                    return
                } else {
                    if (Z == Y.lastValue) {
                        z()
                    } else {
                        if (!Y.lastValue && Z) {
                            z();
                            n(Z)
                        }
                    }
                }
            });
            v = function V(Z) {
                if (X) {
                    clearTimeout(X)
                }
                Z = Z.replace(/\x01/g, "");
                if (Z == Y.lastValue) {
                    return ""
                }
                if (Y.lastValue && X) {
                    p.undo()
                }
                return Z
            }
                ;
            p.onCompositionEnd();
            p.removeListener("mousedown", O);
            if (W.type == "compositionend" && Y.range) {
                p.selection.setRange(Y.range)
            }
        };
        var F = b.delayedCall(I, 50);
        a.addListener(G, "compositionstart", A);
        if (d.isGecko) {
            a.addListener(G, "text", function () {
                F.schedule()
            })
        } else {
            a.addListener(G, "keyup", function () {
                F.schedule()
            });
            a.addListener(G, "keydown", function () {
                F.schedule()
            })
        }
        a.addListener(G, "compositionend", O);
        this.getElement = function () {
            return G
        }
            ;
        this.setReadOnly = function (V) {
            G.readOnly = V
        }
            ;
        this.onContextMenu = function (V) {
            R = true;
            M(p.selection.isEmpty());
            p._emit("nativecontextmenu", {
                target: p,
                domEvent: V
            });
            this.moveToMouse(V, true)
        }
            ;
        this.moveToMouse = function (ab, X) {
            if (!X && d.isOldIE) {
                return
            }
            if (!T) {
                T = G.style.cssText
            }
            G.style.cssText = (X ? "z-index:100000;" : "") + "height:" + G.style.height + ";" + (d.isIE ? "opacity:0.1;" : "");
            var Y = p.container.getBoundingClientRect();
            var W = f.computedStyle(p.container);
            var aa = Y.top + (parseInt(W.borderTopWidth) || 0);
            var Z = Y.left + (parseInt(Y.borderLeftWidth) || 0);
            var ac = Y.bottom - aa - G.clientHeight - 2;
            var V = function (ad) {
                G.style.left = ad.clientX - Z - 2 + "px";
                G.style.top = Math.min(ad.clientY - aa - 2, ac) + "px"
            };
            V(ab);
            if (ab.type != "mousedown") {
                return
            }
            if (p.renderer.$keepTextAreaAtCursor) {
                p.renderer.$keepTextAreaAtCursor = null
            }
            if (d.isWin && !d.isOldIE) {
                a.capture(p.container, V, U)
            }
        }
            ;
        this.onContextMenuClose = U;
        var r;
        function U() {
            clearTimeout(r);
            r = setTimeout(function () {
                if (T) {
                    G.style.cssText = T;
                    T = ""
                }
                if (p.renderer.$keepTextAreaAtCursor == null) {
                    p.renderer.$keepTextAreaAtCursor = true;
                    p.renderer.$moveTextAreaToCursor()
                }
            }, d.isOldIE ? 200 : 0)
        }
        var H = function (V) {
            p.textInput.onContextMenu(V);
            U()
        };
        a.addListener(p.renderer.scroller, "contextmenu", H);
        a.addListener(G, "contextmenu", H)
    };
    h.TextInput = j
});
define("ace/mouse/default_handlers", ["require", "exports", "module", "ace/lib/dom", "ace/lib/event", "ace/lib/useragent"], function (e, g, c) {
    var f = e("../lib/dom");
    var a = e("../lib/event");
    var d = e("../lib/useragent");
    var j = 0;
    function i(m) {
        m.$clickSelection = null;
        var l = m.editor;
        l.setDefaultHandler("mousedown", this.onMouseDown.bind(m));
        l.setDefaultHandler("dblclick", this.onDoubleClick.bind(m));
        l.setDefaultHandler("tripleclick", this.onTripleClick.bind(m));
        l.setDefaultHandler("quadclick", this.onQuadClick.bind(m));
        l.setDefaultHandler("mousewheel", this.onMouseWheel.bind(m));
        var k = ["select", "startSelect", "selectEnd", "selectAllEnd", "selectByWordsEnd", "selectByLinesEnd", "dragWait", "dragWaitEnd", "focusWait"];
        k.forEach(function (n) {
            m[n] = this[n]
        }, this);
        m.selectByLines = this.extendSelectionBy.bind(m, "getLineRange");
        m.selectByWords = this.extendSelectionBy.bind(m, "getWordRange")
    }
    (function () {
        this.onMouseDown = function (o) {
            var m = o.inSelection();
            var q = o.getDocumentPosition();
            this.mousedownEvent = o;
            var n = this.editor;
            var l = o.getButton();
            if (l !== 0) {
                var p = n.getSelectionRange();
                var k = p.isEmpty();
                n.$blockScrolling++;
                if (k) {
                    n.selection.moveToPosition(q)
                }
                n.$blockScrolling--;
                n.textInput.onContextMenu(o.domEvent);
                return
            }
            this.mousedownEvent.time = Date.now();
            if (m && !n.isFocused()) {
                n.focus();
                if (this.$focusTimout && !this.$clickSelection && !n.inMultiSelectMode) {
                    this.setState("focusWait");
                    this.captureMouse(o);
                    return
                }
            }
            this.captureMouse(o);
            this.startSelect(q, o.domEvent._clicks > 1);
            return o.preventDefault()
        }
            ;
        this.startSelect = function (m, k) {
            m = m || this.editor.renderer.screenToTextCoordinates(this.x, this.y);
            var l = this.editor;
            l.$blockScrolling++;
            if (this.mousedownEvent.getShiftKey()) {
                l.selection.selectToPosition(m)
            } else {
                if (!k) {
                    l.selection.moveToPosition(m)
                }
            }
            if (!k) {
                this.select()
            }
            if (l.renderer.scroller.setCapture) {
                l.renderer.scroller.setCapture()
            }
            l.setStyle("ace_selecting");
            this.setState("select");
            l.$blockScrolling--
        }
            ;
        this.select = function () {
            var k, l = this.editor;
            var o = l.renderer.screenToTextCoordinates(this.x, this.y);
            l.$blockScrolling++;
            if (this.$clickSelection) {
                var m = this.$clickSelection.comparePoint(o);
                if (m == -1) {
                    k = this.$clickSelection.end
                } else {
                    if (m == 1) {
                        k = this.$clickSelection.start
                    } else {
                        var n = h(this.$clickSelection, o);
                        o = n.cursor;
                        k = n.anchor
                    }
                }
                l.selection.setSelectionAnchor(k.row, k.column)
            }
            l.selection.selectToPosition(o);
            l.$blockScrolling--;
            l.renderer.scrollCursorIntoView()
        }
            ;
        this.extendSelectionBy = function (l) {
            var n, o = this.editor;
            var r = o.renderer.screenToTextCoordinates(this.x, this.y);
            var m = o.selection[l](r.row, r.column);
            o.$blockScrolling++;
            if (this.$clickSelection) {
                var k = this.$clickSelection.comparePoint(m.start);
                var q = this.$clickSelection.comparePoint(m.end);
                if (k == -1 && q <= 0) {
                    n = this.$clickSelection.end;
                    if (m.end.row != r.row || m.end.column != r.column) {
                        r = m.start
                    }
                } else {
                    if (q == 1 && k >= 0) {
                        n = this.$clickSelection.start;
                        if (m.start.row != r.row || m.start.column != r.column) {
                            r = m.end
                        }
                    } else {
                        if (k == -1 && q == 1) {
                            r = m.end;
                            n = m.start
                        } else {
                            var p = h(this.$clickSelection, r);
                            r = p.cursor;
                            n = p.anchor
                        }
                    }
                }
                o.selection.setSelectionAnchor(n.row, n.column)
            }
            o.selection.selectToPosition(r);
            o.$blockScrolling--;
            o.renderer.scrollCursorIntoView()
        }
            ;
        this.selectEnd = this.selectAllEnd = this.selectByWordsEnd = this.selectByLinesEnd = function () {
            this.$clickSelection = null;
            this.editor.unsetStyle("ace_selecting");
            if (this.editor.renderer.scroller.releaseCapture) {
                this.editor.renderer.scroller.releaseCapture()
            }
        }
            ;
        this.focusWait = function () {
            var l = b(this.mousedownEvent.x, this.mousedownEvent.y, this.x, this.y);
            var k = Date.now();
            if (l > j || k - this.mousedownEvent.time > this.$focusTimout) {
                this.startSelect(this.mousedownEvent.getDocumentPosition())
            }
        }
            ;
        this.onDoubleClick = function (m) {
            var o = m.getDocumentPosition();
            var l = this.editor;
            var n = l.session;
            var k = n.getBracketRange(o);
            if (k) {
                if (k.isEmpty()) {
                    k.start.column--;
                    k.end.column++
                }
                this.setState("select")
            } else {
                k = l.selection.getWordRange(o.row, o.column);
                this.setState("selectByWords")
            }
            this.$clickSelection = k;
            this.select()
        }
            ;
        this.onTripleClick = function (m) {
            var n = m.getDocumentPosition();
            var l = this.editor;
            this.setState("selectByLines");
            var k = l.getSelectionRange();
            if (k.isMultiLine() && k.contains(n.row, n.column)) {
                this.$clickSelection = l.selection.getLineRange(k.start.row);
                this.$clickSelection.end = l.selection.getLineRange(k.end.row).end
            } else {
                this.$clickSelection = l.selection.getLineRange(n.row)
            }
            this.select()
        }
            ;
        this.onQuadClick = function (l) {
            var k = this.editor;
            k.selectAll();
            this.$clickSelection = k.getSelectionRange();
            this.setState("selectAll")
        }
            ;
        this.onMouseWheel = function (o) {
            if (o.getAccelKey()) {
                return
            }
            if (o.getShiftKey() && o.wheelY && !o.wheelX) {
                o.wheelX = o.wheelY;
                o.wheelY = 0
            }
            var l = o.domEvent.timeStamp;
            var n = l - (this.$lastScrollTime || 0);
            var m = this.editor;
            var k = m.renderer.isScrollableBy(o.wheelX * o.speed, o.wheelY * o.speed);
            if (k || n < 200) {
                this.$lastScrollTime = l;
                m.renderer.scrollBy(o.wheelX * o.speed, o.wheelY * o.speed);
                return o.stop()
            }
        }
    }
    ).call(i.prototype);
    g.DefaultHandlers = i;
    function b(l, k, n, m) {
        return Math.sqrt(Math.pow(n - l, 2) + Math.pow(m - k, 2))
    }
    function h(k, m) {
        if (k.start.row == k.end.row) {
            var l = 2 * m.column - k.start.column - k.end.column
        } else {
            if (k.start.row == k.end.row - 1 && !k.start.column && !k.end.column) {
                var l = m.column - 4
            } else {
                var l = 2 * m.row - k.start.row - k.end.row
            }
        }
        if (l < 0) {
            return {
                cursor: k.start,
                anchor: k.end
            }
        } else {
            return {
                cursor: k.end,
                anchor: k.start
            }
        }
    }
});
define("ace/tooltip", ["require", "exports", "module", "ace/lib/oop", "ace/lib/dom"], function (b, a, c) {
    var e = b("./lib/oop");
    var f = b("./lib/dom");
    function d(g) {
        this.isOpen = false;
        this.$element = null;
        this.$parentNode = g
    }
    (function () {
        this.$init = function () {
            this.$element = f.createElement("div");
            this.$element.className = "ace_tooltip";
            this.$element.style.display = "none";
            this.$parentNode.appendChild(this.$element);
            return this.$element
        }
            ;
        this.getElement = function () {
            return this.$element || this.$init()
        }
            ;
        this.setText = function (g) {
            f.setInnerText(this.getElement(), g)
        }
            ;
        this.setHtml = function (g) {
            this.getElement().innerHTML = g
        }
            ;
        this.setPosition = function (g, h) {
            this.getElement().style.left = g + "px";
            this.getElement().style.top = h + "px"
        }
            ;
        this.setClassName = function (g) {
            f.addCssClass(this.getElement(), g)
        }
            ;
        this.show = function (h, g, i) {
            if (h != null) {
                this.setText(h)
            }
            if (g != null && i != null) {
                this.setPosition(g, i)
            }
            if (!this.isOpen) {
                this.getElement().style.display = "block";
                this.isOpen = true
            }
        }
            ;
        this.hide = function () {
            if (this.isOpen) {
                this.getElement().style.display = "none";
                this.isOpen = false
            }
        }
            ;
        this.getHeight = function () {
            return this.getElement().offsetHeight
        }
            ;
        this.getWidth = function () {
            return this.getElement().offsetWidth
        }
    }
    ).call(d.prototype);
    a.Tooltip = d
});
define("ace/mouse/default_gutter_handler", ["require", "exports", "module", "ace/lib/dom", "ace/lib/oop", "ace/lib/event", "ace/tooltip"], function (e, g, d) {
    var f = e("../lib/dom");
    var h = e("../lib/oop");
    var a = e("../lib/event");
    var i = e("../tooltip").Tooltip;
    function b(p) {
        var m = p.editor;
        var k = m.renderer.$gutterLayer;
        var s = new c(m.container);
        p.editor.setDefaultHandler("guttermousedown", function (u) {
            if (!m.isFocused() || u.getButton() != 0) {
                return
            }
            var w = k.getRegion(u);
            if (w == "foldWidgets") {
                return
            }
            var v = u.getDocumentPosition().row;
            var t = m.session.selection;
            if (u.getShiftKey()) {
                t.selectTo(v, 0)
            } else {
                if (u.domEvent.detail == 2) {
                    m.selectAll();
                    return u.preventDefault()
                }
                p.$clickSelection = m.selection.getLineRange(v)
            }
            p.setState("selectByLines");
            p.captureMouse(u);
            return u.preventDefault()
        });
        var r, j, l;
        function q() {
            var y = j.getDocumentPosition().row;
            var t = k.$annotations[y];
            if (!t) {
                return o()
            }
            var A = m.session.getLength();
            if (y == A) {
                var v = m.renderer.pixelToScreenCoordinates(0, j.y).row;
                var z = j.$pos;
                if (v > m.session.documentToScreenRow(z.row, z.column)) {
                    return o()
                }
            }
            if (l == t) {
                return
            }
            l = t.text.join("<br/>");
            s.setHtml(l);
            s.show();
            m.on("mousewheel", o);
            if (p.$tooltipFollowsMouse) {
                n(j)
            } else {
                var u = k.$cells[m.session.documentToScreenRow(y, 0)].element;
                var x = u.getBoundingClientRect();
                var w = s.getElement().style;
                w.left = x.right + "px";
                w.top = x.bottom + "px"
            }
        }
        function o() {
            if (r) {
                r = clearTimeout(r)
            }
            if (l) {
                s.hide();
                l = null;
                m.removeEventListener("mousewheel", o)
            }
        }
        function n(t) {
            s.setPosition(t.x, t.y)
        }
        p.editor.setDefaultHandler("guttermousemove", function (u) {
            var t = u.domEvent.target || u.domEvent.srcElement;
            if (f.hasCssClass(t, "ace_fold-widget")) {
                return o()
            }
            if (l && p.$tooltipFollowsMouse) {
                n(u)
            }
            j = u;
            if (r) {
                return
            }
            r = setTimeout(function () {
                r = null;
                if (j && !p.isMousePressed) {
                    q()
                } else {
                    o()
                }
            }, 50)
        });
        a.addListener(m.renderer.$gutter, "mouseout", function (t) {
            j = null;
            if (!l || r) {
                return
            }
            r = setTimeout(function () {
                r = null;
                o()
            }, 50)
        });
        m.on("changeSession", o)
    }
    function c(j) {
        i.call(this, j)
    }
    h.inherits(c, i);
    (function () {
        this.setPosition = function (k, o) {
            var l = window.innerWidth || document.documentElement.clientWidth;
            var n = window.innerHeight || document.documentElement.clientHeight;
            var m = this.getWidth();
            var j = this.getHeight();
            k += 15;
            o += 15;
            if (k + m > l) {
                k -= (k + m) - l
            }
            if (o + j > n) {
                o -= 20 + j
            }
            i.prototype.setPosition.call(this, k, o)
        }
    }
    ).call(c.prototype);
    g.GutterHandler = b
});
define("ace/mouse/mouse_event", ["require", "exports", "module", "ace/lib/event", "ace/lib/useragent"], function (c, b, d) {
    var f = c("../lib/event");
    var a = c("../lib/useragent");
    var e = b.MouseEvent = function (h, g) {
        this.domEvent = h;
        this.editor = g;
        this.x = this.clientX = h.clientX;
        this.y = this.clientY = h.clientY;
        this.$pos = null;
        this.$inSelection = null;
        this.propagationStopped = false;
        this.defaultPrevented = false
    }
        ;
    (function () {
        this.stopPropagation = function () {
            f.stopPropagation(this.domEvent);
            this.propagationStopped = true
        }
            ;
        this.preventDefault = function () {
            f.preventDefault(this.domEvent);
            this.defaultPrevented = true
        }
            ;
        this.stop = function () {
            this.stopPropagation();
            this.preventDefault()
        }
            ;
        this.getDocumentPosition = function () {
            if (this.$pos) {
                return this.$pos
            }
            this.$pos = this.editor.renderer.screenToTextCoordinates(this.clientX, this.clientY);
            return this.$pos
        }
            ;
        this.inSelection = function () {
            if (this.$inSelection !== null) {
                return this.$inSelection
            }
            var g = this.editor;
            var i = g.getSelectionRange();
            if (i.isEmpty()) {
                this.$inSelection = false
            } else {
                var h = this.getDocumentPosition();
                this.$inSelection = i.contains(h.row, h.column)
            }
            return this.$inSelection
        }
            ;
        this.getButton = function () {
            return f.getButton(this.domEvent)
        }
            ;
        this.getShiftKey = function () {
            return this.domEvent.shiftKey
        }
            ;
        this.getAccelKey = a.isMac ? function () {
            return this.domEvent.metaKey
        }
            : function () {
                return this.domEvent.ctrlKey
            }
    }
    ).call(e.prototype)
});
define("ace/mouse/dragdrop_handler", ["require", "exports", "module", "ace/lib/dom", "ace/lib/event", "ace/lib/useragent"], function (e, g, c) {
    var f = e("../lib/dom");
    var a = e("../lib/event");
    var d = e("../lib/useragent");
    var j = 200;
    var h = 200;
    var k = 5;
    function i(t) {
        var r = t.editor;
        var L = f.createElement("img");
        L.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
        if (d.isOpera) {
            L.style.cssText = "width:1px;height:1px;position:fixed;top:0;left:0;z-index:2147483647;opacity:0;"
        }
        var M = ["dragWait", "dragWaitEnd", "startDrag", "dragReadyEnd", "onMouseDrag"];
        M.forEach(function (y) {
            t[y] = this[y]
        }, this);
        r.addEventListener("mousedown", this.onMouseDown.bind(t));
        var z = r.container;
        var J, B, w;
        var C, F;
        var p, A = 0;
        var q;
        var K;
        var G;
        var u;
        var D;
        this.onDragStart = function (N) {
            if (this.cancelDrag || !z.draggable) {
                var x = this;
                setTimeout(function () {
                    x.startSelect();
                    x.captureMouse(N)
                }, 0);
                return N.preventDefault()
            }
            F = r.getSelectionRange();
            var y = N.dataTransfer;
            y.effectAllowed = r.getReadOnly() ? "copy" : "copyMove";
            if (d.isOpera) {
                r.container.appendChild(L);
                L.scrollTop = 0
            }
            y.setDragImage && y.setDragImage(L, 0, 0);
            if (d.isOpera) {
                r.container.removeChild(L)
            }
            y.clearData();
            y.setData("Text", r.session.getTextRange());
            K = true;
            this.setState("drag")
        }
            ;
        this.onDragEnd = function (y) {
            z.draggable = false;
            K = false;
            this.setState(null);
            if (!r.getReadOnly()) {
                var x = y.dataTransfer.dropEffect;
                if (!q && x == "move") {
                    r.session.remove(r.getSelectionRange())
                }
                r.renderer.$cursorLayer.setBlinking(true)
            }
            this.editor.unsetStyle("ace_dragging");
            this.editor.renderer.setCursorStyle("")
        }
            ;
        this.onDragEnter = function (x) {
            if (r.getReadOnly() || !n(x.dataTransfer)) {
                return
            }
            B = x.clientX;
            w = x.clientY;
            if (!J) {
                v()
            }
            A++;
            x.dataTransfer.dropEffect = q = H(x);
            return a.preventDefault(x)
        }
            ;
        this.onDragOver = function (x) {
            if (r.getReadOnly() || !n(x.dataTransfer)) {
                return
            }
            B = x.clientX;
            w = x.clientY;
            if (!J) {
                v();
                A++
            }
            if (l !== null) {
                l = null
            }
            x.dataTransfer.dropEffect = q = H(x);
            return a.preventDefault(x)
        }
            ;
        this.onDragLeave = function (x) {
            A--;
            if (A <= 0 && J) {
                o();
                q = null;
                return a.preventDefault(x)
            }
        }
            ;
        this.onDrop = function (N) {
            if (!p) {
                return
            }
            var y = N.dataTransfer;
            if (K) {
                switch (q) {
                    case "move":
                        if (F.contains(p.row, p.column)) {
                            F = {
                                start: p,
                                end: p
                            }
                        } else {
                            F = r.moveText(F, p)
                        }
                        break;
                    case "copy":
                        F = r.moveText(F, p, true);
                        break
                }
            } else {
                var x = y.getData("Text");
                F = {
                    start: p,
                    end: r.session.insert(p, x)
                };
                r.focus();
                q = null
            }
            o();
            return a.preventDefault(N)
        }
            ;
        a.addListener(z, "dragstart", this.onDragStart.bind(t));
        a.addListener(z, "dragend", this.onDragEnd.bind(t));
        a.addListener(z, "dragenter", this.onDragEnter.bind(t));
        a.addListener(z, "dragover", this.onDragOver.bind(t));
        a.addListener(z, "dragleave", this.onDragLeave.bind(t));
        a.addListener(z, "drop", this.onDrop.bind(t));
        function I(O, N) {
            var y = Date.now();
            var x = !N || O.row != N.row;
            var Q = !N || O.column != N.column;
            if (!u || x || Q) {
                r.$blockScrolling += 1;
                r.moveCursorToPosition(O);
                r.$blockScrolling -= 1;
                u = y;
                D = {
                    x: B,
                    y: w
                }
            } else {
                var P = b(D.x, D.y, B, w);
                if (P > k) {
                    u = null
                } else {
                    if (y - u >= h) {
                        r.renderer.scrollCursorIntoView();
                        u = null
                    }
                }
            }
        }
        function s(W, Q) {
            var N = Date.now();
            var U = r.renderer.layerConfig.lineHeight;
            var y = r.renderer.layerConfig.characterWidth;
            var O = r.renderer.scroller.getBoundingClientRect();
            var R = {
                x: {
                    left: B - O.left,
                    right: O.right - B
                },
                y: {
                    top: w - O.top,
                    bottom: O.bottom - w
                }
            };
            var T = Math.min(R.x.left, R.x.right);
            var P = Math.min(R.y.top, R.y.bottom);
            var X = {
                row: W.row,
                column: W.column
            };
            if (T / y <= 2) {
                X.column += (R.x.left < R.x.right ? -3 : +2)
            }
            if (P / U <= 1) {
                X.row += (R.y.top < R.y.bottom ? -1 : +1)
            }
            var V = W.row != X.row;
            var S = W.column != X.column;
            var x = !Q || W.row != Q.row;
            if (V || (S && !x)) {
                if (!G) {
                    G = N
                } else {
                    if (N - G >= j) {
                        r.renderer.scrollCursorIntoView(X)
                    }
                }
            } else {
                G = null
            }
        }
        function m() {
            var x = p;
            p = r.renderer.screenToTextCoordinates(B, w);
            I(p, x);
            s(p, x)
        }
        function v() {
            F = r.selection.toOrientedRange();
            J = r.session.addMarker(F, "ace_selection", r.getSelectionStyle());
            r.clearSelection();
            if (r.isFocused()) {
                r.renderer.$cursorLayer.setBlinking(false)
            }
            clearInterval(C);
            m();
            C = setInterval(m, 20);
            A = 0;
            a.addListener(document, "mousemove", E)
        }
        function o() {
            clearInterval(C);
            r.session.removeMarker(J);
            J = null;
            r.$blockScrolling += 1;
            r.selection.fromOrientedRange(F);
            r.$blockScrolling -= 1;
            if (r.isFocused() && !K) {
                r.renderer.$cursorLayer.setBlinking(!r.getReadOnly())
            }
            F = null;
            p = null;
            A = 0;
            G = null;
            u = null;
            a.removeListener(document, "mousemove", E)
        }
        var l = null;
        function E() {
            if (l == null) {
                l = setTimeout(function () {
                    if (l != null && J) {
                        o()
                    }
                }, 20)
            }
        }
        function n(y) {
            var x = y.types;
            return !x || Array.prototype.some.call(x, function (N) {
                return N == "text/plain" || N == "Text"
            })
        }
        function H(Q) {
            var P = ["copy", "copymove", "all", "uninitialized"];
            var x = ["move", "copymove", "linkmove", "all", "uninitialized"];
            var y = d.isMac ? Q.altKey : Q.ctrlKey;
            var O = "uninitialized";
            try {
                O = Q.dataTransfer.effectAllowed.toLowerCase()
            } catch (Q) { }
            var N = "none";
            if (y && P.indexOf(O) >= 0) {
                N = "copy"
            } else {
                if (x.indexOf(O) >= 0) {
                    N = "move"
                } else {
                    if (P.indexOf(O) >= 0) {
                        N = "copy"
                    }
                }
            }
            return N
        }
    }
    (function () {
        this.dragWait = function () {
            var l = Date.now() - this.mousedownEvent.time;
            if (l > this.editor.getDragDelay()) {
                this.startDrag()
            }
        }
            ;
        this.dragWaitEnd = function () {
            var l = this.editor.container;
            l.draggable = false;
            this.startSelect(this.mousedownEvent.getDocumentPosition());
            this.selectEnd()
        }
            ;
        this.dragReadyEnd = function (l) {
            this.editor.renderer.$cursorLayer.setBlinking(!this.editor.getReadOnly());
            this.editor.unsetStyle("ace_dragging");
            this.editor.renderer.setCursorStyle("");
            this.dragWaitEnd()
        }
            ;
        this.startDrag = function () {
            this.cancelDrag = false;
            var m = this.editor;
            var n = m.container;
            n.draggable = true;
            m.renderer.$cursorLayer.setBlinking(false);
            m.setStyle("ace_dragging");
            var l = d.isWin ? "default" : "move";
            m.renderer.setCursorStyle(l);
            this.setState("dragReady")
        }
            ;
        this.onMouseDrag = function (m) {
            var l = this.editor.container;
            if (d.isIE && this.state == "dragReady") {
                var n = b(this.mousedownEvent.x, this.mousedownEvent.y, this.x, this.y);
                if (n > 3) {
                    l.dragDrop()
                }
            }
            if (this.state === "dragWait") {
                var n = b(this.mousedownEvent.x, this.mousedownEvent.y, this.x, this.y);
                if (n > 0) {
                    l.draggable = false;
                    this.startSelect(this.mousedownEvent.getDocumentPosition())
                }
            }
        }
            ;
        this.onMouseDown = function (r) {
            if (!this.$dragEnabled) {
                return
            }
            this.mousedownEvent = r;
            var o = this.editor;
            var n = r.inSelection();
            var m = r.getButton();
            var l = r.domEvent.detail || 1;
            if (l === 1 && m === 0 && n) {
                if (r.editor.inMultiSelectMode && (r.getAccelKey() || r.getShiftKey())) {
                    return
                }
                this.mousedownEvent.time = Date.now();
                var q = r.domEvent.target || r.domEvent.srcElement;
                if ("unselectable" in q) {
                    q.unselectable = "on"
                }
                if (o.getDragDelay()) {
                    if (d.isWebKit) {
                        this.cancelDrag = true;
                        var p = o.container;
                        p.draggable = true
                    }
                    this.setState("dragWait")
                } else {
                    this.startDrag()
                }
                this.captureMouse(r, this.onMouseDrag.bind(this));
                r.defaultPrevented = true
            }
        }
    }
    ).call(i.prototype);
    function b(m, l, o, n) {
        return Math.sqrt(Math.pow(o - m, 2) + Math.pow(n - l, 2))
    }
    g.DragdropHandler = i
});
define("ace/lib/net", ["require", "exports", "module", "ace/lib/dom"], function (b, a, c) {
    var d = b("./dom");
    a.get = function (e, g) {
        var f = new XMLHttpRequest();
        f.open("GET", e, true);
        f.onreadystatechange = function () {
            if (f.readyState === 4) {
                g(f.responseText)
            }
        }
            ;
        f.send(null)
    }
        ;
    a.loadScript = function (g, h) {
        var e = d.getDocumentHead();
        var f = document.createElement("script");
        f.src = g;
        e.appendChild(f);
        f.onload = f.onreadystatechange = function (j, i) {
            if (i || !f.readyState || f.readyState == "loaded" || f.readyState == "complete") {
                f = f.onload = f.onreadystatechange = null;
                if (!i) {
                    h()
                }
            }
        }
    }
        ;
    a.qualifyURL = function (f) {
        var e = document.createElement("a");
        e.href = f;
        return e.href
    }
});
define("ace/lib/event_emitter", ["require", "exports", "module"], function (d, b, e) {
    var f = {};
    var a = function () {
        this.propagationStopped = true
    };
    var c = function () {
        this.defaultPrevented = true
    };
    f._emit = f._dispatchEvent = function (g, l) {
        this._eventRegistry || (this._eventRegistry = {});
        this._defaultHandlers || (this._defaultHandlers = {});
        var k = this._eventRegistry[g] || [];
        var h = this._defaultHandlers[g];
        if (!k.length && !h) {
            return
        }
        if (typeof l != "object" || !l) {
            l = {}
        }
        if (!l.type) {
            l.type = g
        }
        if (!l.stopPropagation) {
            l.stopPropagation = a
        }
        if (!l.preventDefault) {
            l.preventDefault = c
        }
        k = k.slice();
        for (var j = 0; j < k.length; j++) {
            k[j](l, this);
            if (l.propagationStopped) {
                break
            }
        }
        if (h && !l.defaultPrevented) {
            return h(l, this)
        }
    }
        ;
    f._signal = function (g, k) {
        var j = (this._eventRegistry || {})[g];
        if (!j) {
            return
        }
        j = j.slice();
        for (var h = 0; h < j.length; h++) {
            j[h](k, this)
        }
    }
        ;
    f.once = function (h, j) {
        var g = this;
        j && this.addEventListener(h, function i() {
            g.removeEventListener(h, i);
            j.apply(null, arguments)
        })
    }
        ;
    f.setDefaultHandler = function (j, m) {
        var h = this._defaultHandlers;
        if (!h) {
            h = this._defaultHandlers = {
                _disabled_: {}
            }
        }
        if (h[j]) {
            var g = h[j];
            var l = h._disabled_[j];
            if (!l) {
                h._disabled_[j] = l = []
            }
            l.push(g);
            var k = l.indexOf(m);
            if (k != -1) {
                l.splice(k, 1)
            }
        }
        h[j] = m
    }
        ;
    f.removeDefaultHandler = function (j, m) {
        var h = this._defaultHandlers;
        if (!h) {
            return
        }
        var l = h._disabled_[j];
        if (h[j] == m) {
            var g = h[j];
            if (l) {
                this.setDefaultHandler(j, l.pop())
            }
        } else {
            if (l) {
                var k = l.indexOf(m);
                if (k != -1) {
                    l.splice(k, 1)
                }
            }
        }
    }
        ;
    f.on = f.addEventListener = function (h, j, g) {
        this._eventRegistry = this._eventRegistry || {};
        var i = this._eventRegistry[h];
        if (!i) {
            i = this._eventRegistry[h] = []
        }
        if (i.indexOf(j) == -1) {
            i[g ? "unshift" : "push"](j)
        }
        return j
    }
        ;
    f.off = f.removeListener = f.removeEventListener = function (g, j) {
        this._eventRegistry = this._eventRegistry || {};
        var i = this._eventRegistry[g];
        if (!i) {
            return
        }
        var h = i.indexOf(j);
        if (h !== -1) {
            i.splice(h, 1)
        }
    }
        ;
    f.removeAllListeners = function (g) {
        if (this._eventRegistry) {
            this._eventRegistry[g] = []
        }
    }
        ;
    b.EventEmitter = f
});
define("ace/lib/app_config", ["require", "exports", "module", "ace/lib/oop", "ace/lib/event_emitter"], function (d, e, c) {
    var g = d("./oop");
    var i = d("./event_emitter").EventEmitter;
    var a = {
        setOptions: function (j) {
            Object.keys(j).forEach(function (k) {
                this.setOption(k, j[k])
            }, this)
        },
        getOptions: function (k) {
            var j = {};
            if (!k) {
                k = Object.keys(this.$options)
            } else {
                if (!Array.isArray(k)) {
                    j = k;
                    k = Object.keys(j)
                }
            }
            k.forEach(function (l) {
                j[l] = this.getOption(l)
            }, this);
            return j
        },
        setOption: function (j, l) {
            if (this["$" + j] === l) {
                return
            }
            var k = this.$options[j];
            if (!k) {
                return f('misspelled option "' + j + '"')
            }
            if (k.forwardTo) {
                return this[k.forwardTo] && this[k.forwardTo].setOption(j, l)
            }
            if (!k.handlesSet) {
                this["$" + j] = l
            }
            if (k && k.set) {
                k.set.call(this, l)
            }
        },
        getOption: function (j) {
            var k = this.$options[j];
            if (!k) {
                return f('misspelled option "' + j + '"')
            }
            if (k.forwardTo) {
                return this[k.forwardTo] && this[k.forwardTo].getOption(j)
            }
            return k && k.get ? k.get.call(this) : this["$" + j]
        }
    };
    function f(j) {
        if (typeof console != "undefined" && console.warn) {
            console.warn.apply(console, arguments)
        }
    }
    function h(l, j) {
        var k = new Error(l);
        k.data = j;
        if (typeof console == "object" && console.error) {
            console.error(k)
        }
        setTimeout(function () {
            throw k
        })
    }
    var b = function () {
        this.$defaultOptions = {}
    };
    (function () {
        g.implement(this, i);
        this.defineOptions = function (l, k, j) {
            if (!l.$options) {
                this.$defaultOptions[k] = l.$options = {}
            }
            Object.keys(j).forEach(function (n) {
                var m = j[n];
                if (typeof m == "string") {
                    m = {
                        forwardTo: m
                    }
                }
                m.name || (m.name = n);
                l.$options[m.name] = m;
                if ("initialValue" in m) {
                    l["$" + m.name] = m.initialValue
                }
            });
            g.implement(l, a);
            return this
        }
            ;
        this.resetOptions = function (j) {
            Object.keys(j.$options).forEach(function (l) {
                var k = j.$options[l];
                if ("value" in k) {
                    j.setOption(l, k.value)
                }
            })
        }
            ;
        this.setDefaultValue = function (m, j, l) {
            var k = this.$defaultOptions[m] || (this.$defaultOptions[m] = {});
            if (k[j]) {
                if (k.forwardTo) {
                    this.setDefaultValue(k.forwardTo, j, l)
                } else {
                    k[j].value = l
                }
            }
        }
            ;
        this.setDefaultValues = function (j, k) {
            Object.keys(k).forEach(function (l) {
                this.setDefaultValue(j, l, k[l])
            }, this)
        }
            ;
        this.warn = f;
        this.reportError = h
    }
    ).call(b.prototype);
    e.AppConfig = b
});
define("ace/config", ["require", "exports", "module", "ace/lib/lang", "ace/lib/oop", "ace/lib/net", "ace/lib/app_config"], function (e, g, d) {
    var c = e("./lib/lang");
    var h = e("./lib/oop");
    var i = e("./lib/net");
    var b = e("./lib/app_config").AppConfig;
    d.exports = g = new b();
    var a = (function () {
        return this
    }
    )();
    var k = {
        packaged: false,
        workerPath: null,
        modePath: null,
        themePath: null,
        basePath: "",
        suffix: ".js",
        $moduleUrls: {}
    };
    g.get = function (l) {
        if (!k.hasOwnProperty(l)) {
            throw new Error("Unknown config key: " + l)
        }
        return k[l]
    }
        ;
    g.set = function (l, m) {
        if (!k.hasOwnProperty(l)) {
            throw new Error("Unknown config key: " + l)
        }
        k[l] = m
    }
        ;
    g.all = function () {
        return c.copyObject(k)
    }
        ;
    g.moduleUrl = function (n, m) {
        if (k.$moduleUrls[n]) {
            return k.$moduleUrls[n]
        }
        var r = n.split("/");
        m = m || r[r.length - 2] || "";
        var l = m == "snippets" ? "/" : "-";
        var p = r[r.length - 1];
        if (m == "worker" && l == "-") {
            var o = new RegExp("^" + m + "[\\-_]|[\\-_]" + m + "$", "g");
            p = p.replace(o, "")
        }
        if ((!p || p == m) && r.length > 1) {
            p = r[r.length - 2]
        }
        var q = k[m + "Path"];
        if (q == null) {
            q = k.basePath
        } else {
            if (l == "/") {
                m = l = ""
            }
        }
        if (q && q.slice(-1) != "/") {
            q += "/"
        }
        return q + m + l + p + this.get("suffix")
    }
        ;
    g.setModuleUrl = function (l, m) {
        return k.$moduleUrls[l] = m
    }
        ;
    g.$loading = {};
    g.loadModule = function (l, o) {
        var m, n;
        if (Array.isArray(l)) {
            n = l[0];
            l = l[1]
        }
        try {
            m = e(l)
        } catch (p) { }
        if (m && !g.$loading[l]) {
            return o && o(m)
        }
        if (!g.$loading[l]) {
            g.$loading[l] = []
        }
        g.$loading[l].push(o);
        if (g.$loading[l].length > 1) {
            return
        }
        var q = function () {
            e([l], function (r) {
                g._emit("load.module", {
                    name: l,
                    module: r
                });
                var s = g.$loading[l];
                g.$loading[l] = null;
                s.forEach(function (t) {
                    t && t(r)
                })
            })
        };
        if (!g.get("packaged")) {
            return q()
        }
        i.loadScript(g.moduleUrl(l, n), q)
    }
        ;
    j(true);
    function j(p) {
        k.packaged = p || e.packaged || d.packaged || (a.define && define.packaged);
        if (!a.document) {
            return ""
        }
        var o = {};
        var r = "";
        var t = (document.currentScript || document._currentScript);
        var y = t && t.ownerDocument || document;
        var u = y.getElementsByTagName("script");
        for (var x = 0; x < u.length; x++) {
            var A = u[x];
            var n = A.src || A.getAttribute("src");
            if (!n) {
                continue
            }
            var w = A.attributes;
            for (var v = 0, s = w.length; v < s; v++) {
                var z = w[v];
                if (z.name.indexOf("data-ace-") === 0) {
                    o[f(z.name.replace(/^data-ace-/, ""))] = z.value
                }
            }
            var q = n.match(/^(.*)\/ace(\-\w+)?\.js(\?|$)/);
            if (q) {
                r = q[1]
            }
        }
        if (r) {
            o.base = o.base || r;
            o.packaged = true
        }
        o.basePath = o.base;
        o.workerPath = o.workerPath || o.base;
        o.modePath = o.modePath || o.base;
        o.themePath = o.themePath || o.base;
        delete o.base;
        for (var B in o) {
            if (typeof o[B] !== "undefined") {
                g.set(B, o[B])
            }
        }
    }
    g.init = j;
    function f(l) {
        return l.replace(/-(.)/g, function (n, o) {
            return o.toUpperCase()
        })
    }
});
define("ace/mouse/mouse_handler", ["require", "exports", "module", "ace/lib/event", "ace/lib/useragent", "ace/mouse/default_handlers", "ace/mouse/default_gutter_handler", "ace/mouse/mouse_event", "ace/mouse/dragdrop_handler", "ace/config"], function (f, h, c) {
    var a = f("../lib/event");
    var d = f("../lib/useragent");
    var k = f("./default_handlers").DefaultHandlers;
    var b = f("./default_gutter_handler").GutterHandler;
    var j = f("./mouse_event").MouseEvent;
    var i = f("./dragdrop_handler").DragdropHandler;
    var e = f("../config");
    var g = function (n) {
        var l = this;
        this.editor = n;
        new k(this);
        new b(this);
        new i(this);
        var p = function (q) {
            if (!document.hasFocus || !document.hasFocus()) {
                window.focus()
            }
            n.focus()
        };
        var o = n.renderer.getMouseEventTarget();
        a.addListener(o, "click", this.onMouseEvent.bind(this, "click"));
        a.addListener(o, "mousemove", this.onMouseMove.bind(this, "mousemove"));
        a.addMultiMouseDownListener(o, [400, 300, 250], this, "onMouseEvent");
        if (n.renderer.scrollBarV) {
            a.addMultiMouseDownListener(n.renderer.scrollBarV.inner, [400, 300, 250], this, "onMouseEvent");
            a.addMultiMouseDownListener(n.renderer.scrollBarH.inner, [400, 300, 250], this, "onMouseEvent");
            if (d.isIE) {
                a.addListener(n.renderer.scrollBarV.element, "mousedown", p);
                a.addListener(n.renderer.scrollBarH.element, "mousedown", p)
            }
        }
        a.addMouseWheelListener(n.container, this.onMouseWheel.bind(this, "mousewheel"));
        var m = n.renderer.$gutter;
        a.addListener(m, "mousedown", this.onMouseEvent.bind(this, "guttermousedown"));
        a.addListener(m, "click", this.onMouseEvent.bind(this, "gutterclick"));
        a.addListener(m, "dblclick", this.onMouseEvent.bind(this, "gutterdblclick"));
        a.addListener(m, "mousemove", this.onMouseEvent.bind(this, "guttermousemove"));
        a.addListener(o, "mousedown", p);
        a.addListener(m, "mousedown", function (q) {
            n.focus();
            return a.preventDefault(q)
        });
        n.on("mousemove", function (t) {
            if (l.state || l.$dragDelay || !l.$dragEnabled) {
                return
            }
            var s = n.renderer.screenToTextCoordinates(t.x, t.y);
            var q = n.session.selection.getRange();
            var r = n.renderer;
            if (!q.isEmpty() && q.insideStart(s.row, s.column)) {
                r.setCursorStyle("default")
            } else {
                r.setCursorStyle("")
            }
        })
    };
    (function () {
        this.onMouseEvent = function (l, m) {
            this.editor._emit(l, new j(m, this.editor))
        }
            ;
        this.onMouseMove = function (l, n) {
            var m = this.editor._eventRegistry && this.editor._eventRegistry.mousemove;
            if (!m || !m.length) {
                return
            }
            this.editor._emit(l, new j(n, this.editor))
        }
            ;
        this.onMouseWheel = function (l, m) {
            var n = new j(m, this.editor);
            n.speed = this.$scrollSpeed * 2;
            n.wheelX = m.wheelX;
            n.wheelY = m.wheelY;
            this.editor._emit(l, n)
        }
            ;
        this.setState = function (l) {
            this.state = l
        }
            ;
        this.captureMouse = function (p, m) {
            this.x = p.x;
            this.y = p.y;
            this.isMousePressed = true;
            var q = this.editor.renderer;
            if (q.$keepTextAreaAtCursor) {
                q.$keepTextAreaAtCursor = null
            }
            var n = this;
            var s = function (t) {
                if (!t) {
                    return
                }
                if (d.isWebKit && !t.which && n.releaseMouse) {
                    return n.releaseMouse()
                }
                n.x = t.clientX;
                n.y = t.clientY;
                m && m(t);
                n.mouseEvent = new j(t, n.editor);
                n.$mouseMoved = true
            };
            var r = function (t) {
                clearInterval(l);
                o();
                n[n.state + "End"] && n[n.state + "End"](t);
                n.state = "";
                if (q.$keepTextAreaAtCursor == null) {
                    q.$keepTextAreaAtCursor = true;
                    q.$moveTextAreaToCursor()
                }
                n.isMousePressed = false;
                n.$onCaptureMouseMove = n.releaseMouse = null;
                t && n.onMouseEvent("mouseup", t)
            };
            var o = function () {
                n[n.state] && n[n.state]();
                n.$mouseMoved = false
            };
            if (d.isOldIE && p.domEvent.type == "dblclick") {
                return setTimeout(function () {
                    r(p)
                })
            }
            n.$onCaptureMouseMove = s;
            n.releaseMouse = a.capture(this.editor.container, s, r);
            var l = setInterval(o, 20)
        }
            ;
        this.releaseMouse = null;
        this.cancelContextMenu = function () {
            var l = function (m) {
                if (m && m.domEvent && m.domEvent.type != "contextmenu") {
                    return
                }
                this.editor.off("nativecontextmenu", l);
                if (m && m.domEvent) {
                    a.stopEvent(m.domEvent)
                }
            }
                .bind(this);
            setTimeout(l, 10);
            this.editor.on("nativecontextmenu", l)
        }
    }
    ).call(g.prototype);
    e.defineOptions(g.prototype, "mouseHandler", {
        scrollSpeed: {
            initialValue: 2
        },
        dragDelay: {
            initialValue: (d.isMac ? 150 : 0)
        },
        dragEnabled: {
            initialValue: true
        },
        focusTimout: {
            initialValue: 0
        },
        tooltipFollowsMouse: {
            initialValue: true
        }
    });
    h.MouseHandler = g
});
define("ace/mouse/fold_handler", ["require", "exports", "module"], function (b, a, c) {
    function d(e) {
        e.on("click", function (i) {
            var f = i.getDocumentPosition();
            var h = e.session;
            var g = h.getFoldAt(f.row, f.column, 1);
            if (g) {
                if (i.getAccelKey()) {
                    h.removeFold(g)
                } else {
                    h.expandFold(g)
                }
                i.stop()
            }
        });
        e.on("gutterclick", function (g) {
            var i = e.renderer.$gutterLayer.getRegion(g);
            if (i == "foldWidgets") {
                var h = g.getDocumentPosition().row;
                var f = e.session;
                if (f.foldWidgets && f.foldWidgets[h]) {
                    e.session.onFoldWidgetClick(h, g)
                }
                if (!e.isFocused()) {
                    e.focus()
                }
                g.stop()
            }
        });
        e.on("gutterdblclick", function (j) {
            var l = e.renderer.$gutterLayer.getRegion(j);
            if (l == "foldWidgets") {
                var k = j.getDocumentPosition().row;
                var i = e.session;
                var h = i.getParentFoldRangeData(k, true);
                var f = h.range || h.firstRange;
                if (f) {
                    k = f.start.row;
                    var g = i.getFoldAt(k, i.getLine(k).length, 1);
                    if (g) {
                        i.removeFold(g)
                    } else {
                        i.addFold("...", f);
                        e.renderer.scrollCursorIntoView({
                            row: f.start.row,
                            column: 0
                        })
                    }
                }
                j.stop()
            }
        })
    }
    a.FoldHandler = d
});
define("ace/keyboard/keybinding", ["require", "exports", "module", "ace/lib/keys", "ace/lib/event"], function (c, a, d) {
    var b = c("../lib/keys");
    var e = c("../lib/event");
    var f = function (g) {
        this.$editor = g;
        this.$data = {
            editor: g
        };
        this.$handlers = [];
        this.setDefaultHandler(g.commands)
    };
    (function () {
        this.setDefaultHandler = function (g) {
            this.removeKeyboardHandler(this.$defaultHandler);
            this.$defaultHandler = g;
            this.addKeyboardHandler(g, 0)
        }
            ;
        this.setKeyboardHandler = function (i) {
            var g = this.$handlers;
            if (g[g.length - 1] == i) {
                return
            }
            while (g[g.length - 1] && g[g.length - 1] != this.$defaultHandler) {
                this.removeKeyboardHandler(g[g.length - 1])
            }
            this.addKeyboardHandler(i, 1)
        }
            ;
        this.addKeyboardHandler = function (h, j) {
            if (!h) {
                return
            }
            if (typeof h == "function" && !h.handleKeyboard) {
                h.handleKeyboard = h
            }
            var g = this.$handlers.indexOf(h);
            if (g != -1) {
                this.$handlers.splice(g, 1)
            }
            if (j == undefined) {
                this.$handlers.push(h)
            } else {
                this.$handlers.splice(j, 0, h)
            }
            if (g == -1 && h.attach) {
                h.attach(this.$editor)
            }
        }
            ;
        this.removeKeyboardHandler = function (h) {
            var g = this.$handlers.indexOf(h);
            if (g == -1) {
                return false
            }
            this.$handlers.splice(g, 1);
            h.detach && h.detach(this.$editor);
            return true
        }
            ;
        this.getKeyboardHandler = function () {
            return this.$handlers[this.$handlers.length - 1]
        }
            ;
        this.getStatusText = function () {
            var h = this.$data;
            var g = h.editor;
            return this.$handlers.map(function (i) {
                return i.getStatusText && i.getStatusText(g, h) || ""
            }).filter(Boolean).join(" ")
        }
            ;
        this.$callKeyboardHandlers = function (l, h, n, m) {
            var k;
            var o = false;
            var g = this.$editor.commands;
            for (var j = this.$handlers.length; j--;) {
                k = this.$handlers[j].handleKeyboard(this.$data, l, h, n, m);
                if (!k || !k.command) {
                    continue
                }
                if (k.command == "null") {
                    o = true
                } else {
                    o = g.exec(k.command, this.$editor, k.args, m)
                }
                if (o && m && l != -1 && k.passEvent != true && k.command.passEvent != true) {
                    e.stopEvent(m)
                }
                if (o) {
                    break
                }
            }
            return o
        }
            ;
        this.onCommandKey = function (j, h, i) {
            var g = b.keyCodeToString(i);
            this.$callKeyboardHandlers(h, g, i, j)
        }
            ;
        this.onTextInput = function (h) {
            var g = this.$callKeyboardHandlers(-1, h);
            if (!g) {
                this.$editor.commands.exec("insertstring", this.$editor, h)
            }
        }
    }
    ).call(f.prototype);
    a.KeyBinding = f
});
define("ace/range", ["require", "exports", "module"], function (b, a, c) {
    var e = function (g, f) {
        return g.row - f.row || g.column - f.column
    };
    var d = function (g, h, f, i) {
        this.start = {
            row: g,
            column: h
        };
        this.end = {
            row: f,
            column: i
        }
    };
    (function () {
        this.isEqual = function (f) {
            return this.start.row === f.start.row && this.end.row === f.end.row && this.start.column === f.start.column && this.end.column === f.end.column
        }
            ;
        this.toString = function () {
            return ("Range: [" + this.start.row + "/" + this.start.column + "] -> [" + this.end.row + "/" + this.end.column + "]")
        }
            ;
        this.contains = function (g, f) {
            return this.compare(g, f) == 0
        }
            ;
        this.compareRange = function (g) {
            var h, f = g.end, i = g.start;
            h = this.compare(f.row, f.column);
            if (h == 1) {
                h = this.compare(i.row, i.column);
                if (h == 1) {
                    return 2
                } else {
                    if (h == 0) {
                        return 1
                    } else {
                        return 0
                    }
                }
            } else {
                if (h == -1) {
                    return -2
                } else {
                    h = this.compare(i.row, i.column);
                    if (h == -1) {
                        return -1
                    } else {
                        if (h == 1) {
                            return 42
                        } else {
                            return 0
                        }
                    }
                }
            }
        }
            ;
        this.comparePoint = function (f) {
            return this.compare(f.row, f.column)
        }
            ;
        this.containsRange = function (f) {
            return this.comparePoint(f.start) == 0 && this.comparePoint(f.end) == 0
        }
            ;
        this.intersects = function (f) {
            var g = this.compareRange(f);
            return (g == -1 || g == 0 || g == 1)
        }
            ;
        this.isEnd = function (g, f) {
            return this.end.row == g && this.end.column == f
        }
            ;
        this.isStart = function (g, f) {
            return this.start.row == g && this.start.column == f
        }
            ;
        this.setStart = function (g, f) {
            if (typeof g == "object") {
                this.start.column = g.column;
                this.start.row = g.row
            } else {
                this.start.row = g;
                this.start.column = f
            }
        }
            ;
        this.setEnd = function (g, f) {
            if (typeof g == "object") {
                this.end.column = g.column;
                this.end.row = g.row
            } else {
                this.end.row = g;
                this.end.column = f
            }
        }
            ;
        this.inside = function (g, f) {
            if (this.compare(g, f) == 0) {
                if (this.isEnd(g, f) || this.isStart(g, f)) {
                    return false
                } else {
                    return true
                }
            }
            return false
        }
            ;
        this.insideStart = function (g, f) {
            if (this.compare(g, f) == 0) {
                if (this.isEnd(g, f)) {
                    return false
                } else {
                    return true
                }
            }
            return false
        }
            ;
        this.insideEnd = function (g, f) {
            if (this.compare(g, f) == 0) {
                if (this.isStart(g, f)) {
                    return false
                } else {
                    return true
                }
            }
            return false
        }
            ;
        this.compare = function (g, f) {
            if (!this.isMultiLine()) {
                if (g === this.start.row) {
                    return f < this.start.column ? -1 : (f > this.end.column ? 1 : 0)
                }
            }
            if (g < this.start.row) {
                return -1
            }
            if (g > this.end.row) {
                return 1
            }
            if (this.start.row === g) {
                return f >= this.start.column ? 0 : -1
            }
            if (this.end.row === g) {
                return f <= this.end.column ? 0 : 1
            }
            return 0
        }
            ;
        this.compareStart = function (g, f) {
            if (this.start.row == g && this.start.column == f) {
                return -1
            } else {
                return this.compare(g, f)
            }
        }
            ;
        this.compareEnd = function (g, f) {
            if (this.end.row == g && this.end.column == f) {
                return 1
            } else {
                return this.compare(g, f)
            }
        }
            ;
        this.compareInside = function (g, f) {
            if (this.end.row == g && this.end.column == f) {
                return 1
            } else {
                if (this.start.row == g && this.start.column == f) {
                    return -1
                } else {
                    return this.compare(g, f)
                }
            }
        }
            ;
        this.clipRows = function (h, g) {
            if (this.end.row > g) {
                var f = {
                    row: g + 1,
                    column: 0
                }
            } else {
                if (this.end.row < h) {
                    var f = {
                        row: h,
                        column: 0
                    }
                }
            }
            if (this.start.row > g) {
                var i = {
                    row: g + 1,
                    column: 0
                }
            } else {
                if (this.start.row < h) {
                    var i = {
                        row: h,
                        column: 0
                    }
                }
            }
            return d.fromPoints(i || this.start, f || this.end)
        }
            ;
        this.extend = function (i, g) {
            var h = this.compare(i, g);
            if (h == 0) {
                return this
            } else {
                if (h == -1) {
                    var j = {
                        row: i,
                        column: g
                    }
                } else {
                    var f = {
                        row: i,
                        column: g
                    }
                }
            }
            return d.fromPoints(j || this.start, f || this.end)
        }
            ;
        this.isEmpty = function () {
            return (this.start.row === this.end.row && this.start.column === this.end.column)
        }
            ;
        this.isMultiLine = function () {
            return (this.start.row !== this.end.row)
        }
            ;
        this.clone = function () {
            return d.fromPoints(this.start, this.end)
        }
            ;
        this.collapseRows = function () {
            if (this.end.column == 0) {
                return new d(this.start.row, 0, Math.max(this.start.row, this.end.row - 1), 0)
            } else {
                return new d(this.start.row, 0, this.end.row, 0)
            }
        }
            ;
        this.toScreenRange = function (g) {
            var f = g.documentToScreenPosition(this.start);
            var h = g.documentToScreenPosition(this.end);
            return new d(f.row, f.column, h.row, h.column)
        }
            ;
        this.moveBy = function (g, f) {
            this.start.row += g;
            this.start.column += f;
            this.end.row += g;
            this.end.column += f
        }
    }
    ).call(d.prototype);
    d.fromPoints = function (g, f) {
        return new d(g.row, g.column, f.row, f.column)
    }
        ;
    d.comparePoints = e;
    d.comparePoints = function (g, f) {
        return g.row - f.row || g.column - f.column
    }
        ;
    a.Range = d
});
define("ace/selection", ["require", "exports", "module", "ace/lib/oop", "ace/lib/lang", "ace/lib/event_emitter", "ace/range"], function (b, a, c) {
    var f = b("./lib/oop");
    var h = b("./lib/lang");
    var e = b("./lib/event_emitter").EventEmitter;
    var g = b("./range").Range;
    var d = function (j) {
        this.session = j;
        this.doc = j.getDocument();
        this.clearSelection();
        this.lead = this.selectionLead = this.doc.createAnchor(0, 0);
        this.anchor = this.selectionAnchor = this.doc.createAnchor(0, 0);
        var i = this;
        this.lead.on("change", function (k) {
            i._emit("changeCursor");
            if (!i.$isEmpty) {
                i._emit("changeSelection")
            }
            if (!i.$keepDesiredColumnOnChange && k.old.column != k.value.column) {
                i.$desiredColumn = null
            }
        });
        this.selectionAnchor.on("change", function () {
            if (!i.$isEmpty) {
                i._emit("changeSelection")
            }
        })
    };
    (function () {
        f.implement(this, e);
        this.isEmpty = function () {
            return (this.$isEmpty || (this.anchor.row == this.lead.row && this.anchor.column == this.lead.column))
        }
            ;
        this.isMultiLine = function () {
            if (this.isEmpty()) {
                return false
            }
            return this.getRange().isMultiLine()
        }
            ;
        this.getCursor = function () {
            return this.lead.getPosition()
        }
            ;
        this.setSelectionAnchor = function (j, i) {
            this.anchor.setPosition(j, i);
            if (this.$isEmpty) {
                this.$isEmpty = false;
                this._emit("changeSelection")
            }
        }
            ;
        this.getSelectionAnchor = function () {
            if (this.$isEmpty) {
                return this.getSelectionLead()
            } else {
                return this.anchor.getPosition()
            }
        }
            ;
        this.getSelectionLead = function () {
            return this.lead.getPosition()
        }
            ;
        this.shiftSelection = function (k) {
            if (this.$isEmpty) {
                this.moveCursorTo(this.lead.row, this.lead.column + k);
                return
            }
            var j = this.getSelectionAnchor();
            var i = this.getSelectionLead();
            var l = this.isBackwards();
            if (!l || j.column !== 0) {
                this.setSelectionAnchor(j.row, j.column + k)
            }
            if (l || i.column !== 0) {
                this.$moveSelection(function () {
                    this.moveCursorTo(i.row, i.column + k)
                })
            }
        }
            ;
        this.isBackwards = function () {
            var j = this.anchor;
            var i = this.lead;
            return (j.row > i.row || (j.row == i.row && j.column > i.column))
        }
            ;
        this.getRange = function () {
            var j = this.anchor;
            var i = this.lead;
            if (this.isEmpty()) {
                return g.fromPoints(i, i)
            }
            if (this.isBackwards()) {
                return g.fromPoints(i, j)
            } else {
                return g.fromPoints(j, i)
            }
        }
            ;
        this.clearSelection = function () {
            if (!this.$isEmpty) {
                this.$isEmpty = true;
                this._emit("changeSelection")
            }
        }
            ;
        this.selectAll = function () {
            var i = this.doc.getLength() - 1;
            this.setSelectionAnchor(0, 0);
            this.moveCursorTo(i, this.doc.getLine(i).length)
        }
            ;
        this.setRange = this.setSelectionRange = function (i, j) {
            if (j) {
                this.setSelectionAnchor(i.end.row, i.end.column);
                this.selectTo(i.start.row, i.start.column)
            } else {
                this.setSelectionAnchor(i.start.row, i.start.column);
                this.selectTo(i.end.row, i.end.column)
            }
            if (this.getRange().isEmpty()) {
                this.$isEmpty = true
            }
            this.$desiredColumn = null
        }
            ;
        this.$moveSelection = function (i) {
            var j = this.lead;
            if (this.$isEmpty) {
                this.setSelectionAnchor(j.row, j.column)
            }
            i.call(this)
        }
            ;
        this.selectTo = function (j, i) {
            this.$moveSelection(function () {
                this.moveCursorTo(j, i)
            })
        }
            ;
        this.selectToPosition = function (i) {
            this.$moveSelection(function () {
                this.moveCursorToPosition(i)
            })
        }
            ;
        this.moveTo = function (j, i) {
            this.clearSelection();
            this.moveCursorTo(j, i)
        }
            ;
        this.moveToPosition = function (i) {
            this.clearSelection();
            this.moveCursorToPosition(i)
        }
            ;
        this.selectUp = function () {
            this.$moveSelection(this.moveCursorUp)
        }
            ;
        this.selectDown = function () {
            this.$moveSelection(this.moveCursorDown)
        }
            ;
        this.selectRight = function () {
            this.$moveSelection(this.moveCursorRight)
        }
            ;
        this.selectLeft = function () {
            this.$moveSelection(this.moveCursorLeft)
        }
            ;
        this.selectLineStart = function () {
            this.$moveSelection(this.moveCursorLineStart)
        }
            ;
        this.selectLineEnd = function () {
            this.$moveSelection(this.moveCursorLineEnd)
        }
            ;
        this.selectFileEnd = function () {
            this.$moveSelection(this.moveCursorFileEnd)
        }
            ;
        this.selectFileStart = function () {
            this.$moveSelection(this.moveCursorFileStart)
        }
            ;
        this.selectWordRight = function () {
            this.$moveSelection(this.moveCursorWordRight)
        }
            ;
        this.selectWordLeft = function () {
            this.$moveSelection(this.moveCursorWordLeft)
        }
            ;
        this.getWordRange = function (k, i) {
            if (typeof i == "undefined") {
                var j = k || this.lead;
                k = j.row;
                i = j.column
            }
            return this.session.getWordRange(k, i)
        }
            ;
        this.selectWord = function () {
            this.setSelectionRange(this.getWordRange())
        }
            ;
        this.selectAWord = function () {
            var j = this.getCursor();
            var i = this.session.getAWordRange(j.row, j.column);
            this.setSelectionRange(i)
        }
            ;
        this.getLineRange = function (m, k) {
            var i = typeof m == "number" ? m : this.lead.row;
            var j;
            var l = this.session.getFoldLine(i);
            if (l) {
                i = l.start.row;
                j = l.end.row
            } else {
                j = i
            }
            if (k === true) {
                return new g(i, 0, j, this.session.getLine(j).length)
            } else {
                return new g(i, 0, j + 1, 0)
            }
        }
            ;
        this.selectLine = function () {
            this.setSelectionRange(this.getLineRange())
        }
            ;
        this.moveCursorUp = function () {
            this.moveCursorBy(-1, 0)
        }
            ;
        this.moveCursorDown = function () {
            this.moveCursorBy(1, 0)
        }
            ;
        this.moveCursorLeft = function () {
            var k = this.lead.getPosition(), i;
            if (i = this.session.getFoldAt(k.row, k.column, -1)) {
                this.moveCursorTo(i.start.row, i.start.column)
            } else {
                if (k.column === 0) {
                    if (k.row > 0) {
                        this.moveCursorTo(k.row - 1, this.doc.getLine(k.row - 1).length)
                    }
                } else {
                    var j = this.session.getTabSize();
                    if (this.session.isTabStop(k) && this.doc.getLine(k.row).slice(k.column - j, k.column).split(" ").length - 1 == j) {
                        this.moveCursorBy(0, -j)
                    } else {
                        this.moveCursorBy(0, -1)
                    }
                }
            }
        }
            ;
        this.moveCursorRight = function () {
            var k = this.lead.getPosition(), i;
            if (i = this.session.getFoldAt(k.row, k.column, 1)) {
                this.moveCursorTo(i.end.row, i.end.column)
            } else {
                if (this.lead.column == this.doc.getLine(this.lead.row).length) {
                    if (this.lead.row < this.doc.getLength() - 1) {
                        this.moveCursorTo(this.lead.row + 1, 0)
                    }
                } else {
                    var j = this.session.getTabSize();
                    var k = this.lead;
                    if (this.session.isTabStop(k) && this.doc.getLine(k.row).slice(k.column, k.column + j).split(" ").length - 1 == j) {
                        this.moveCursorBy(0, j)
                    } else {
                        this.moveCursorBy(0, 1)
                    }
                }
            }
        }
            ;
        this.moveCursorLineStart = function () {
            var n = this.lead.row;
            var k = this.lead.column;
            var j = this.session.documentToScreenRow(n, k);
            var i = this.session.screenToDocumentPosition(j, 0);
            var l = this.session.getDisplayLine(n, null, i.row, i.column);
            var m = l.match(/^\s*/);
            if (m[0].length != k && !this.session.$useEmacsStyleLineStart) {
                i.column += m[0].length
            }
            this.moveCursorToPosition(i)
        }
            ;
        this.moveCursorLineEnd = function () {
            var j = this.lead;
            var l = this.session.getDocumentLastRowColumnPosition(j.row, j.column);
            if (this.lead.column == l.column) {
                var i = this.session.getLine(l.row);
                if (l.column == i.length) {
                    var k = i.search(/\s+$/);
                    if (k > 0) {
                        l.column = k
                    }
                }
            }
            this.moveCursorTo(l.row, l.column)
        }
            ;
        this.moveCursorFileEnd = function () {
            var j = this.doc.getLength() - 1;
            var i = this.doc.getLine(j).length;
            this.moveCursorTo(j, i)
        }
            ;
        this.moveCursorFileStart = function () {
            this.moveCursorTo(0, 0)
        }
            ;
        this.moveCursorLongWordRight = function () {
            var n = this.lead.row;
            var l = this.lead.column;
            var i = this.doc.getLine(n);
            var m = i.substring(l);
            var k;
            this.session.nonTokenRe.lastIndex = 0;
            this.session.tokenRe.lastIndex = 0;
            var j = this.session.getFoldAt(n, l, 1);
            if (j) {
                this.moveCursorTo(j.end.row, j.end.column);
                return
            }
            if (k = this.session.nonTokenRe.exec(m)) {
                l += this.session.nonTokenRe.lastIndex;
                this.session.nonTokenRe.lastIndex = 0;
                m = i.substring(l)
            }
            if (l >= i.length) {
                this.moveCursorTo(n, i.length);
                this.moveCursorRight();
                if (n < this.doc.getLength() - 1) {
                    this.moveCursorWordRight()
                }
                return
            }
            if (k = this.session.tokenRe.exec(m)) {
                l += this.session.tokenRe.lastIndex;
                this.session.tokenRe.lastIndex = 0
            }
            this.moveCursorTo(n, l)
        }
            ;
        this.moveCursorLongWordLeft = function () {
            var n = this.lead.row;
            var k = this.lead.column;
            var j;
            if (j = this.session.getFoldAt(n, k, -1)) {
                this.moveCursorTo(j.start.row, j.start.column);
                return
            }
            var m = this.session.getFoldStringAt(n, k, -1);
            if (m == null) {
                m = this.doc.getLine(n).substring(0, k)
            }
            var l = h.stringReverse(m);
            var i;
            this.session.nonTokenRe.lastIndex = 0;
            this.session.tokenRe.lastIndex = 0;
            if (i = this.session.nonTokenRe.exec(l)) {
                k -= this.session.nonTokenRe.lastIndex;
                l = l.slice(this.session.nonTokenRe.lastIndex);
                this.session.nonTokenRe.lastIndex = 0
            }
            if (k <= 0) {
                this.moveCursorTo(n, 0);
                this.moveCursorLeft();
                if (n > 0) {
                    this.moveCursorWordLeft()
                }
                return
            }
            if (i = this.session.tokenRe.exec(l)) {
                k -= this.session.tokenRe.lastIndex;
                this.session.tokenRe.lastIndex = 0
            }
            this.moveCursorTo(n, k)
        }
            ;
        this.$shortWordEndIndex = function (n) {
            var j, i = 0, m;
            var l = /\s/;
            var k = this.session.tokenRe;
            k.lastIndex = 0;
            if (j = this.session.tokenRe.exec(n)) {
                i = this.session.tokenRe.lastIndex
            } else {
                while ((m = n[i]) && l.test(m)) {
                    i++
                }
                if (i < 1) {
                    k.lastIndex = 0;
                    while ((m = n[i]) && !k.test(m)) {
                        k.lastIndex = 0;
                        i++;
                        if (l.test(m)) {
                            if (i > 2) {
                                i--;
                                break
                            } else {
                                while ((m = n[i]) && l.test(m)) {
                                    i++
                                }
                                if (i > 2) {
                                    break
                                }
                            }
                        }
                    }
                }
            }
            k.lastIndex = 0;
            return i
        }
            ;
        this.moveCursorShortWordRight = function () {
            var p = this.lead.row;
            var n = this.lead.column;
            var j = this.doc.getLine(p);
            var o = j.substring(n);
            var m = this.session.getFoldAt(p, n, 1);
            if (m) {
                return this.moveCursorTo(m.end.row, m.end.column)
            }
            if (n == j.length) {
                var i = this.doc.getLength();
                do {
                    p++;
                    o = this.doc.getLine(p)
                } while (p < i && /^\s*$/.test(o));
                if (!/^\s+/.test(o)) {
                    o = ""
                }
                n = 0
            }
            var k = this.$shortWordEndIndex(o);
            this.moveCursorTo(p, n + k)
        }
            ;
        this.moveCursorShortWordLeft = function () {
            var n = this.lead.row;
            var l = this.lead.column;
            var k;
            if (k = this.session.getFoldAt(n, l, -1)) {
                return this.moveCursorTo(k.start.row, k.start.column)
            }
            var i = this.session.getLine(n).substring(0, l);
            if (l === 0) {
                do {
                    n--;
                    i = this.doc.getLine(n)
                } while (n > 0 && /^\s*$/.test(i));
                l = i.length;
                if (!/\s+$/.test(i)) {
                    i = ""
                }
            }
            var m = h.stringReverse(i);
            var j = this.$shortWordEndIndex(m);
            return this.moveCursorTo(n, l - j)
        }
            ;
        this.moveCursorWordRight = function () {
            if (this.session.$selectLongWords) {
                this.moveCursorLongWordRight()
            } else {
                this.moveCursorShortWordRight()
            }
        }
            ;
        this.moveCursorWordLeft = function () {
            if (this.session.$selectLongWords) {
                this.moveCursorLongWordLeft()
            } else {
                this.moveCursorShortWordLeft()
            }
        }
            ;
        this.moveCursorBy = function (l, k) {
            var j = this.session.documentToScreenPosition(this.lead.row, this.lead.column);
            if (k === 0) {
                if (this.$desiredColumn) {
                    j.column = this.$desiredColumn
                } else {
                    this.$desiredColumn = j.column
                }
            }
            var i = this.session.screenToDocumentPosition(j.row + l, j.column);
            if (l !== 0 && k === 0 && i.row === this.lead.row && i.column === this.lead.column) {
                if (this.session.lineWidgets && this.session.lineWidgets[i.row]) {
                    i.row++
                }
            }
            this.moveCursorTo(i.row, i.column + k, k === 0)
        }
            ;
        this.moveCursorToPosition = function (i) {
            this.moveCursorTo(i.row, i.column)
        }
            ;
        this.moveCursorTo = function (l, k, i) {
            var j = this.session.getFoldAt(l, k, 1);
            if (j) {
                l = j.start.row;
                k = j.start.column
            }
            this.$keepDesiredColumnOnChange = true;
            this.lead.setPosition(l, k);
            this.$keepDesiredColumnOnChange = false;
            if (!i) {
                this.$desiredColumn = null
            }
        }
            ;
        this.moveCursorToScreen = function (k, j, i) {
            var l = this.session.screenToDocumentPosition(k, j);
            this.moveCursorTo(l.row, l.column, i)
        }
            ;
        this.detach = function () {
            this.lead.detach();
            this.anchor.detach();
            this.session = this.doc = null
        }
            ;
        this.fromOrientedRange = function (i) {
            this.setSelectionRange(i, i.cursor == i.start);
            this.$desiredColumn = i.desiredColumn || this.$desiredColumn
        }
            ;
        this.toOrientedRange = function (i) {
            var j = this.getRange();
            if (i) {
                i.start.column = j.start.column;
                i.start.row = j.start.row;
                i.end.column = j.end.column;
                i.end.row = j.end.row
            } else {
                i = j
            }
            i.cursor = this.isBackwards() ? i.start : i.end;
            i.desiredColumn = this.$desiredColumn;
            return i
        }
            ;
        this.getRangeOfMovements = function (j) {
            var l = this.getCursor();
            try {
                j.call(null, this);
                var i = this.getCursor();
                return g.fromPoints(l, i)
            } catch (k) {
                return g.fromPoints(l, l)
            } finally {
                this.moveCursorToPosition(l)
            }
        }
            ;
        this.toJSON = function () {
            if (this.rangeCount) {
                var i = this.ranges.map(function (k) {
                    var j = k.clone();
                    j.isBackwards = k.cursor == k.start;
                    return j
                })
            } else {
                var i = this.getRange();
                i.isBackwards = this.isBackwards()
            }
            return i
        }
            ;
        this.fromJSON = function (l) {
            if (l.start == undefined) {
                if (this.rangeList) {
                    this.toSingleRange(l[0]);
                    for (var j = l.length; j--;) {
                        var k = g.fromPoints(l[j].start, l[j].end);
                        if (l[j].isBackwards) {
                            k.cursor = k.start
                        }
                        this.addRange(k, true)
                    }
                    return
                } else {
                    l = l[0]
                }
            }
            if (this.rangeList) {
                this.toSingleRange(l)
            }
            this.setSelectionRange(l, l.isBackwards)
        }
            ;
        this.isEqual = function (k) {
            if ((k.length || this.rangeCount) && k.length != this.rangeCount) {
                return false
            }
            if (!k.length || !this.ranges) {
                return this.getRange().isEqual(k)
            }
            for (var j = this.ranges.length; j--;) {
                if (!this.ranges[j].isEqual(k[j])) {
                    return false
                }
            }
            return true
        }
    }
    ).call(d.prototype);
    a.Selection = d
});
define("ace/tokenizer", ["require", "exports", "module", "ace/config"], function (d, a, e) {
    var c = d("./config");
    var f = 2000;
    var b = function (q) {
        this.states = q;
        this.regExps = {};
        this.matchMappings = {};
        for (var p in this.states) {
            var h = this.states[p];
            var k = [];
            var r = 0;
            var g = this.matchMappings[p] = {
                defaultToken: "text"
            };
            var l = "g";
            var n = [];
            for (var j = 0; j < h.length; j++) {
                var m = h[j];
                if (m.defaultToken) {
                    g.defaultToken = m.defaultToken
                }
                if (m.caseInsensitive) {
                    l = "gi"
                }
                if (m.regex == null) {
                    continue
                }
                if (m.regex instanceof RegExp) {
                    m.regex = m.regex.toString().slice(1, -1)
                }
                var o = m.regex;
                var s = new RegExp("(?:(" + o + ")|(.))").exec("a").length - 2;
                if (Array.isArray(m.token)) {
                    if (m.token.length == 1 || s == 1) {
                        m.token = m.token[0]
                    } else {
                        if (s - 1 != m.token.length) {
                            this.reportError("number of classes and regexp groups doesn't match", {
                                rule: m,
                                groupCount: s - 1
                            });
                            m.token = m.token[0]
                        } else {
                            m.tokenArray = m.token;
                            m.token = null;
                            m.onMatch = this.$arrayTokens
                        }
                    }
                } else {
                    if (typeof m.token == "function" && !m.onMatch) {
                        if (s > 1) {
                            m.onMatch = this.$applyToken
                        } else {
                            m.onMatch = m.token
                        }
                    }
                }
                if (s > 1) {
                    if (/\\\d/.test(m.regex)) {
                        o = m.regex.replace(/\\([0-9]+)/g, function (i, t) {
                            return "\\" + (parseInt(t, 10) + r + 1)
                        })
                    } else {
                        s = 1;
                        o = this.removeCapturingGroups(m.regex)
                    }
                    if (!m.splitRegex && typeof m.token != "string") {
                        n.push(m)
                    }
                }
                g[r] = j;
                r += s;
                k.push(o);
                if (!m.onMatch) {
                    m.onMatch = null
                }
            }
            if (!k.length) {
                g[0] = 0;
                k.push("$")
            }
            n.forEach(function (i) {
                i.splitRegex = this.createSplitterRegexp(i.regex, l)
            }, this);
            this.regExps[p] = new RegExp("(" + k.join(")|(") + ")|($)", l)
        }
    };
    (function () {
        this.$setMaxTokenCount = function (g) {
            f = g | 0
        }
            ;
        this.$applyToken = function (n) {
            var h = this.splitRegex.exec(n).slice(1);
            var k = this.token.apply(this, h);
            if (typeof k === "string") {
                return [{
                    type: k,
                    value: n
                }]
            }
            var m = [];
            for (var j = 0, g = k.length; j < g; j++) {
                if (h[j]) {
                    m[m.length] = {
                        type: k[j],
                        value: h[j]
                    }
                }
            }
            return m
        }
            ,
            this.$arrayTokens = function (n) {
                if (!n) {
                    return []
                }
                var h = this.splitRegex.exec(n);
                if (!h) {
                    return "text"
                }
                var m = [];
                var k = this.tokenArray;
                for (var j = 0, g = k.length; j < g; j++) {
                    if (h[j + 1]) {
                        m[m.length] = {
                            type: k[j],
                            value: h[j + 1]
                        }
                    }
                }
                return m
            }
            ;
        this.removeCapturingGroups = function (h) {
            var g = h.replace(/\[(?:\\.|[^\]])*?\]|\\.|\(\?[:=!]|(\()/g, function (i, j) {
                return j ? "(?:" : i
            });
            return g
        }
            ;
        this.createSplitterRegexp = function (j, h) {
            if (j.indexOf("(?=") != -1) {
                var g = 0;
                var k = false;
                var i = {};
                j.replace(/(\\.)|(\((?:\?[=!])?)|(\))|([\[\]])/g, function (l, n, r, q, p, o) {
                    if (k) {
                        k = p != "]"
                    } else {
                        if (p) {
                            k = true
                        } else {
                            if (q) {
                                if (g == i.stack) {
                                    i.end = o + 1;
                                    i.stack = -1
                                }
                                g--
                            } else {
                                if (r) {
                                    g++;
                                    if (r.length != 1) {
                                        i.stack = g;
                                        i.start = o
                                    }
                                }
                            }
                        }
                    }
                    return l
                });
                if (i.end != null && /^\)*$/.test(j.substr(i.end))) {
                    j = j.substring(0, i.start) + j.substr(i.end)
                }
            }
            return new RegExp(j, (h || "").replace("g", ""))
        }
            ;
        this.getLineTokens = function (q, g) {
            if (g && typeof g != "string") {
                var k = g.slice(0);
                g = k[0];
                if (g === "#tmp") {
                    k.shift();
                    g = k.shift()
                }
            } else {
                var k = []
            }
            var y = g || "start";
            var j = this.states[y];
            if (!j) {
                y = "start";
                j = this.states[y]
            }
            var p = this.matchMappings[y];
            var t = this.regExps[y];
            t.lastIndex = 0;
            var o, r = [];
            var w = 0;
            var s = 0;
            var n = {
                type: null,
                value: ""
            };
            while (o = t.exec(q)) {
                var h = p.defaultToken;
                var l = null;
                var u = o[0];
                var m = t.lastIndex;
                if (m - u.length > w) {
                    var x = q.substring(w, m - u.length);
                    if (n.type == h) {
                        n.value += x
                    } else {
                        if (n.type) {
                            r.push(n)
                        }
                        n = {
                            type: h,
                            value: x
                        }
                    }
                }
                for (var v = 0; v < o.length - 2; v++) {
                    if (o[v + 1] === undefined) {
                        continue
                    }
                    l = j[p[v]];
                    if (l.onMatch) {
                        h = l.onMatch(u, y, k)
                    } else {
                        h = l.token
                    }
                    if (l.next) {
                        if (typeof l.next == "string") {
                            y = l.next
                        } else {
                            y = l.next(y, k)
                        }
                        j = this.states[y];
                        if (!j) {
                            this.reportError("state doesn't exist", y);
                            y = "start";
                            j = this.states[y]
                        }
                        p = this.matchMappings[y];
                        w = m;
                        t = this.regExps[y];
                        t.lastIndex = m
                    }
                    break
                }
                if (u) {
                    if (typeof h === "string") {
                        if ((!l || l.merge !== false) && n.type === h) {
                            n.value += u
                        } else {
                            if (n.type) {
                                r.push(n)
                            }
                            n = {
                                type: h,
                                value: u
                            }
                        }
                    } else {
                        if (h) {
                            if (n.type) {
                                r.push(n)
                            }
                            n = {
                                type: null,
                                value: ""
                            };
                            for (var v = 0; v < h.length; v++) {
                                r.push(h[v])
                            }
                        }
                    }
                }
                if (w == q.length) {
                    break
                }
                w = m;
                if (s++ > f) {
                    if (s > 2 * q.length) {
                        this.reportError("infinite loop with in ace tokenizer", {
                            startState: g,
                            line: q
                        })
                    }
                    while (w < q.length) {
                        if (n.type) {
                            r.push(n)
                        }
                        n = {
                            value: q.substring(w, w += 2000),
                            type: "overflow"
                        }
                    }
                    y = "start";
                    k = [];
                    break
                }
            }
            if (n.type) {
                r.push(n)
            }
            if (k.length > 1) {
                if (k[0] !== y) {
                    k.unshift("#tmp", y)
                }
            }
            return {
                tokens: r,
                state: k.length ? k : y
            }
        }
            ;
        this.reportError = c.reportError
    }
    ).call(b.prototype);
    a.Tokenizer = b
});
define("ace/mode/text_highlight_rules", ["require", "exports", "module", "ace/lib/lang"], function (c, b, d) {
    var e = c("../lib/lang");
    var a = function () {
        this.$rules = {
            start: [{
                token: "empty_line",
                regex: "^$"
            }, {
                defaultToken: "text"
            }]
        }
    };
    (function () {
        this.addRules = function (n, l) {
            if (!l) {
                for (var j in n) {
                    this.$rules[j] = n[j]
                }
                return
            }
            for (var j in n) {
                var k = n[j];
                for (var h = 0; h < k.length; h++) {
                    var m = k[h];
                    if (m.next || m.onMatch) {
                        if (typeof m.next != "string") {
                            if (m.nextState && m.nextState.indexOf(l) !== 0) {
                                m.nextState = l + m.nextState
                            }
                        } else {
                            if (m.next.indexOf(l) !== 0) {
                                m.next = l + m.next
                            }
                        }
                    }
                }
                this.$rules[l + j] = k
            }
        }
            ;
        this.getRules = function () {
            return this.$rules
        }
            ;
        this.embedRules = function (l, n, o, q, j) {
            var h = typeof l == "function" ? new l().getRules() : l;
            if (q) {
                for (var m = 0; m < q.length; m++) {
                    q[m] = n + q[m]
                }
            } else {
                q = [];
                for (var p in h) {
                    q.push(n + p)
                }
            }
            this.addRules(h, n);
            if (o) {
                var k = Array.prototype[j ? "push" : "unshift"];
                for (var m = 0; m < q.length; m++) {
                    k.apply(this.$rules[q[m]], e.deepCopy(o))
                }
            }
            if (!this.$embeds) {
                this.$embeds = []
            }
            this.$embeds.push(n)
        }
            ;
        this.getEmbeds = function () {
            return this.$embeds
        }
            ;
        var f = function (i, h) {
            if (i != "start" || h.length) {
                h.unshift(this.nextState, i)
            }
            return this.nextState
        };
        var g = function (i, h) {
            h.shift();
            return h.shift() || "start"
        };
        this.normalizeRules = function () {
            var j = 0;
            var i = this.$rules;
            function h(t) {
                var m = i[t];
                m.processed = true;
                for (var n = 0; n < m.length; n++) {
                    var s = m[n];
                    if (!s.regex && s.start) {
                        s.regex = s.start;
                        if (!s.next) {
                            s.next = []
                        }
                        s.next.push({
                            defaultToken: s.token
                        }, {
                            token: s.token + ".end",
                            regex: s.end || s.start,
                            next: "pop"
                        });
                        s.token = s.token + ".start";
                        s.push = true
                    }
                    var o = s.next || s.push;
                    if (o && Array.isArray(o)) {
                        var u = s.stateName;
                        if (!u) {
                            u = s.token;
                            if (typeof u != "string") {
                                u = u[0] || ""
                            }
                            if (i[u]) {
                                u += j++
                            }
                        }
                        i[u] = o;
                        s.next = u;
                        h(u)
                    } else {
                        if (o == "pop") {
                            s.next = g
                        }
                    }
                    if (s.push) {
                        s.nextState = s.next || s.push;
                        s.next = f;
                        delete s.push
                    }
                    if (s.rules) {
                        for (var k in s.rules) {
                            if (i[k]) {
                                if (i[k].push) {
                                    i[k].push.apply(i[k], s.rules[k])
                                }
                            } else {
                                i[k] = s.rules[k]
                            }
                        }
                    }
                    if (s.include || typeof s == "string") {
                        var l = s.include || s;
                        var p = i[l]
                    } else {
                        if (Array.isArray(s)) {
                            p = s
                        }
                    }
                    if (p) {
                        var q = [n, 1].concat(p);
                        if (s.noEscape) {
                            q = q.filter(function (r) {
                                return !r.next
                            })
                        }
                        m.splice.apply(m, q);
                        n--;
                        p = null
                    }
                    if (s.keywordMap) {
                        s.token = this.createKeywordMapper(s.keywordMap, s.defaultToken || "text", s.caseInsensitive);
                        delete s.defaultToken
                    }
                }
            }
            Object.keys(i).forEach(h, this)
        }
            ;
        this.createKeywordMapper = function (j, l, h, k) {
            var i = Object.create(null);
            Object.keys(j).forEach(function (o) {
                var m = j[o];
                if (h) {
                    m = m.toLowerCase()
                }
                var p = m.split(k || "|");
                for (var n = p.length; n--;) {
                    i[p[n]] = o
                }
            });
            if (Object.getPrototypeOf(i)) {
                i.__proto__ = null
            }
            this.$keywordList = Object.keys(i);
            j = null;
            return h ? function (m) {
                return i[m.toLowerCase()] || l
            }
                : function (m) {
                    return i[m] || l
                }
        }
            ;
        this.getKeywords = function () {
            return this.$keywords
        }
    }
    ).call(a.prototype);
    b.TextHighlightRules = a
});
define("ace/mode/behaviour", ["require", "exports", "module"], function (b, a, c) {
    var d = function () {
        this.$behaviours = {}
    };
    (function () {
        this.add = function (e, f, g) {
            switch (undefined) {
                case this.$behaviours:
                    this.$behaviours = {};
                case this.$behaviours[e]:
                    this.$behaviours[e] = {}
            }
            this.$behaviours[e][f] = g
        }
            ;
        this.addBehaviours = function (f) {
            for (var e in f) {
                for (var g in f[e]) {
                    this.add(e, g, f[e][g])
                }
            }
        }
            ;
        this.remove = function (e) {
            if (this.$behaviours && this.$behaviours[e]) {
                delete this.$behaviours[e]
            }
        }
            ;
        this.inherit = function (g, e) {
            if (typeof g === "function") {
                var f = new g().getBehaviours(e)
            } else {
                var f = g.getBehaviours(e)
            }
            this.addBehaviours(f)
        }
            ;
        this.getBehaviours = function (g) {
            if (!g) {
                return this.$behaviours
            } else {
                var e = {};
                for (var f = 0; f < g.length; f++) {
                    if (this.$behaviours[g[f]]) {
                        e[g[f]] = this.$behaviours[g[f]]
                    }
                }
                return e
            }
        }
    }
    ).call(d.prototype);
    a.Behaviour = d
});
define("ace/unicode", ["require", "exports", "module"], function (c, b, d) {
    b.packages = {};
    a({
        L: "0041-005A0061-007A00AA00B500BA00C0-00D600D8-00F600F8-02C102C6-02D102E0-02E402EC02EE0370-037403760377037A-037D03860388-038A038C038E-03A103A3-03F503F7-0481048A-05250531-055605590561-058705D0-05EA05F0-05F20621-064A066E066F0671-06D306D506E506E606EE06EF06FA-06FC06FF07100712-072F074D-07A507B107CA-07EA07F407F507FA0800-0815081A082408280904-0939093D09500958-0961097109720979-097F0985-098C098F09900993-09A809AA-09B009B209B6-09B909BD09CE09DC09DD09DF-09E109F009F10A05-0A0A0A0F0A100A13-0A280A2A-0A300A320A330A350A360A380A390A59-0A5C0A5E0A72-0A740A85-0A8D0A8F-0A910A93-0AA80AAA-0AB00AB20AB30AB5-0AB90ABD0AD00AE00AE10B05-0B0C0B0F0B100B13-0B280B2A-0B300B320B330B35-0B390B3D0B5C0B5D0B5F-0B610B710B830B85-0B8A0B8E-0B900B92-0B950B990B9A0B9C0B9E0B9F0BA30BA40BA8-0BAA0BAE-0BB90BD00C05-0C0C0C0E-0C100C12-0C280C2A-0C330C35-0C390C3D0C580C590C600C610C85-0C8C0C8E-0C900C92-0CA80CAA-0CB30CB5-0CB90CBD0CDE0CE00CE10D05-0D0C0D0E-0D100D12-0D280D2A-0D390D3D0D600D610D7A-0D7F0D85-0D960D9A-0DB10DB3-0DBB0DBD0DC0-0DC60E01-0E300E320E330E40-0E460E810E820E840E870E880E8A0E8D0E94-0E970E99-0E9F0EA1-0EA30EA50EA70EAA0EAB0EAD-0EB00EB20EB30EBD0EC0-0EC40EC60EDC0EDD0F000F40-0F470F49-0F6C0F88-0F8B1000-102A103F1050-1055105A-105D106110651066106E-10701075-1081108E10A0-10C510D0-10FA10FC1100-1248124A-124D1250-12561258125A-125D1260-1288128A-128D1290-12B012B2-12B512B8-12BE12C012C2-12C512C8-12D612D8-13101312-13151318-135A1380-138F13A0-13F41401-166C166F-167F1681-169A16A0-16EA1700-170C170E-17111720-17311740-17511760-176C176E-17701780-17B317D717DC1820-18771880-18A818AA18B0-18F51900-191C1950-196D1970-19741980-19AB19C1-19C71A00-1A161A20-1A541AA71B05-1B331B45-1B4B1B83-1BA01BAE1BAF1C00-1C231C4D-1C4F1C5A-1C7D1CE9-1CEC1CEE-1CF11D00-1DBF1E00-1F151F18-1F1D1F20-1F451F48-1F4D1F50-1F571F591F5B1F5D1F5F-1F7D1F80-1FB41FB6-1FBC1FBE1FC2-1FC41FC6-1FCC1FD0-1FD31FD6-1FDB1FE0-1FEC1FF2-1FF41FF6-1FFC2071207F2090-209421022107210A-211321152119-211D212421262128212A-212D212F-2139213C-213F2145-2149214E218321842C00-2C2E2C30-2C5E2C60-2CE42CEB-2CEE2D00-2D252D30-2D652D6F2D80-2D962DA0-2DA62DA8-2DAE2DB0-2DB62DB8-2DBE2DC0-2DC62DC8-2DCE2DD0-2DD62DD8-2DDE2E2F300530063031-3035303B303C3041-3096309D-309F30A1-30FA30FC-30FF3105-312D3131-318E31A0-31B731F0-31FF3400-4DB54E00-9FCBA000-A48CA4D0-A4FDA500-A60CA610-A61FA62AA62BA640-A65FA662-A66EA67F-A697A6A0-A6E5A717-A71FA722-A788A78BA78CA7FB-A801A803-A805A807-A80AA80C-A822A840-A873A882-A8B3A8F2-A8F7A8FBA90A-A925A930-A946A960-A97CA984-A9B2A9CFAA00-AA28AA40-AA42AA44-AA4BAA60-AA76AA7AAA80-AAAFAAB1AAB5AAB6AAB9-AABDAAC0AAC2AADB-AADDABC0-ABE2AC00-D7A3D7B0-D7C6D7CB-D7FBF900-FA2DFA30-FA6DFA70-FAD9FB00-FB06FB13-FB17FB1DFB1F-FB28FB2A-FB36FB38-FB3CFB3EFB40FB41FB43FB44FB46-FBB1FBD3-FD3DFD50-FD8FFD92-FDC7FDF0-FDFBFE70-FE74FE76-FEFCFF21-FF3AFF41-FF5AFF66-FFBEFFC2-FFC7FFCA-FFCFFFD2-FFD7FFDA-FFDC",
        Ll: "0061-007A00AA00B500BA00DF-00F600F8-00FF01010103010501070109010B010D010F01110113011501170119011B011D011F01210123012501270129012B012D012F01310133013501370138013A013C013E014001420144014601480149014B014D014F01510153015501570159015B015D015F01610163016501670169016B016D016F0171017301750177017A017C017E-0180018301850188018C018D019201950199-019B019E01A101A301A501A801AA01AB01AD01B001B401B601B901BA01BD-01BF01C601C901CC01CE01D001D201D401D601D801DA01DC01DD01DF01E101E301E501E701E901EB01ED01EF01F001F301F501F901FB01FD01FF02010203020502070209020B020D020F02110213021502170219021B021D021F02210223022502270229022B022D022F02310233-0239023C023F0240024202470249024B024D024F-02930295-02AF037103730377037B-037D039003AC-03CE03D003D103D5-03D703D903DB03DD03DF03E103E303E503E703E903EB03ED03EF-03F303F503F803FB03FC0430-045F04610463046504670469046B046D046F04710473047504770479047B047D047F0481048B048D048F04910493049504970499049B049D049F04A104A304A504A704A904AB04AD04AF04B104B304B504B704B904BB04BD04BF04C204C404C604C804CA04CC04CE04CF04D104D304D504D704D904DB04DD04DF04E104E304E504E704E904EB04ED04EF04F104F304F504F704F904FB04FD04FF05010503050505070509050B050D050F05110513051505170519051B051D051F0521052305250561-05871D00-1D2B1D62-1D771D79-1D9A1E011E031E051E071E091E0B1E0D1E0F1E111E131E151E171E191E1B1E1D1E1F1E211E231E251E271E291E2B1E2D1E2F1E311E331E351E371E391E3B1E3D1E3F1E411E431E451E471E491E4B1E4D1E4F1E511E531E551E571E591E5B1E5D1E5F1E611E631E651E671E691E6B1E6D1E6F1E711E731E751E771E791E7B1E7D1E7F1E811E831E851E871E891E8B1E8D1E8F1E911E931E95-1E9D1E9F1EA11EA31EA51EA71EA91EAB1EAD1EAF1EB11EB31EB51EB71EB91EBB1EBD1EBF1EC11EC31EC51EC71EC91ECB1ECD1ECF1ED11ED31ED51ED71ED91EDB1EDD1EDF1EE11EE31EE51EE71EE91EEB1EED1EEF1EF11EF31EF51EF71EF91EFB1EFD1EFF-1F071F10-1F151F20-1F271F30-1F371F40-1F451F50-1F571F60-1F671F70-1F7D1F80-1F871F90-1F971FA0-1FA71FB0-1FB41FB61FB71FBE1FC2-1FC41FC61FC71FD0-1FD31FD61FD71FE0-1FE71FF2-1FF41FF61FF7210A210E210F2113212F21342139213C213D2146-2149214E21842C30-2C5E2C612C652C662C682C6A2C6C2C712C732C742C76-2C7C2C812C832C852C872C892C8B2C8D2C8F2C912C932C952C972C992C9B2C9D2C9F2CA12CA32CA52CA72CA92CAB2CAD2CAF2CB12CB32CB52CB72CB92CBB2CBD2CBF2CC12CC32CC52CC72CC92CCB2CCD2CCF2CD12CD32CD52CD72CD92CDB2CDD2CDF2CE12CE32CE42CEC2CEE2D00-2D25A641A643A645A647A649A64BA64DA64FA651A653A655A657A659A65BA65DA65FA663A665A667A669A66BA66DA681A683A685A687A689A68BA68DA68FA691A693A695A697A723A725A727A729A72BA72DA72F-A731A733A735A737A739A73BA73DA73FA741A743A745A747A749A74BA74DA74FA751A753A755A757A759A75BA75DA75FA761A763A765A767A769A76BA76DA76FA771-A778A77AA77CA77FA781A783A785A787A78CFB00-FB06FB13-FB17FF41-FF5A",
        Lu: "0041-005A00C0-00D600D8-00DE01000102010401060108010A010C010E01100112011401160118011A011C011E01200122012401260128012A012C012E01300132013401360139013B013D013F0141014301450147014A014C014E01500152015401560158015A015C015E01600162016401660168016A016C016E017001720174017601780179017B017D018101820184018601870189-018B018E-0191019301940196-0198019C019D019F01A001A201A401A601A701A901AC01AE01AF01B1-01B301B501B701B801BC01C401C701CA01CD01CF01D101D301D501D701D901DB01DE01E001E201E401E601E801EA01EC01EE01F101F401F6-01F801FA01FC01FE02000202020402060208020A020C020E02100212021402160218021A021C021E02200222022402260228022A022C022E02300232023A023B023D023E02410243-02460248024A024C024E03700372037603860388-038A038C038E038F0391-03A103A3-03AB03CF03D2-03D403D803DA03DC03DE03E003E203E403E603E803EA03EC03EE03F403F703F903FA03FD-042F04600462046404660468046A046C046E04700472047404760478047A047C047E0480048A048C048E04900492049404960498049A049C049E04A004A204A404A604A804AA04AC04AE04B004B204B404B604B804BA04BC04BE04C004C104C304C504C704C904CB04CD04D004D204D404D604D804DA04DC04DE04E004E204E404E604E804EA04EC04EE04F004F204F404F604F804FA04FC04FE05000502050405060508050A050C050E05100512051405160518051A051C051E0520052205240531-055610A0-10C51E001E021E041E061E081E0A1E0C1E0E1E101E121E141E161E181E1A1E1C1E1E1E201E221E241E261E281E2A1E2C1E2E1E301E321E341E361E381E3A1E3C1E3E1E401E421E441E461E481E4A1E4C1E4E1E501E521E541E561E581E5A1E5C1E5E1E601E621E641E661E681E6A1E6C1E6E1E701E721E741E761E781E7A1E7C1E7E1E801E821E841E861E881E8A1E8C1E8E1E901E921E941E9E1EA01EA21EA41EA61EA81EAA1EAC1EAE1EB01EB21EB41EB61EB81EBA1EBC1EBE1EC01EC21EC41EC61EC81ECA1ECC1ECE1ED01ED21ED41ED61ED81EDA1EDC1EDE1EE01EE21EE41EE61EE81EEA1EEC1EEE1EF01EF21EF41EF61EF81EFA1EFC1EFE1F08-1F0F1F18-1F1D1F28-1F2F1F38-1F3F1F48-1F4D1F591F5B1F5D1F5F1F68-1F6F1FB8-1FBB1FC8-1FCB1FD8-1FDB1FE8-1FEC1FF8-1FFB21022107210B-210D2110-211221152119-211D212421262128212A-212D2130-2133213E213F214521832C00-2C2E2C602C62-2C642C672C692C6B2C6D-2C702C722C752C7E-2C802C822C842C862C882C8A2C8C2C8E2C902C922C942C962C982C9A2C9C2C9E2CA02CA22CA42CA62CA82CAA2CAC2CAE2CB02CB22CB42CB62CB82CBA2CBC2CBE2CC02CC22CC42CC62CC82CCA2CCC2CCE2CD02CD22CD42CD62CD82CDA2CDC2CDE2CE02CE22CEB2CEDA640A642A644A646A648A64AA64CA64EA650A652A654A656A658A65AA65CA65EA662A664A666A668A66AA66CA680A682A684A686A688A68AA68CA68EA690A692A694A696A722A724A726A728A72AA72CA72EA732A734A736A738A73AA73CA73EA740A742A744A746A748A74AA74CA74EA750A752A754A756A758A75AA75CA75EA760A762A764A766A768A76AA76CA76EA779A77BA77DA77EA780A782A784A786A78BFF21-FF3A",
        Lt: "01C501C801CB01F21F88-1F8F1F98-1F9F1FA8-1FAF1FBC1FCC1FFC",
        Lm: "02B0-02C102C6-02D102E0-02E402EC02EE0374037A0559064006E506E607F407F507FA081A0824082809710E460EC610FC17D718431AA71C78-1C7D1D2C-1D611D781D9B-1DBF2071207F2090-20942C7D2D6F2E2F30053031-3035303B309D309E30FC-30FEA015A4F8-A4FDA60CA67FA717-A71FA770A788A9CFAA70AADDFF70FF9EFF9F",
        Lo: "01BB01C0-01C3029405D0-05EA05F0-05F20621-063F0641-064A066E066F0671-06D306D506EE06EF06FA-06FC06FF07100712-072F074D-07A507B107CA-07EA0800-08150904-0939093D09500958-096109720979-097F0985-098C098F09900993-09A809AA-09B009B209B6-09B909BD09CE09DC09DD09DF-09E109F009F10A05-0A0A0A0F0A100A13-0A280A2A-0A300A320A330A350A360A380A390A59-0A5C0A5E0A72-0A740A85-0A8D0A8F-0A910A93-0AA80AAA-0AB00AB20AB30AB5-0AB90ABD0AD00AE00AE10B05-0B0C0B0F0B100B13-0B280B2A-0B300B320B330B35-0B390B3D0B5C0B5D0B5F-0B610B710B830B85-0B8A0B8E-0B900B92-0B950B990B9A0B9C0B9E0B9F0BA30BA40BA8-0BAA0BAE-0BB90BD00C05-0C0C0C0E-0C100C12-0C280C2A-0C330C35-0C390C3D0C580C590C600C610C85-0C8C0C8E-0C900C92-0CA80CAA-0CB30CB5-0CB90CBD0CDE0CE00CE10D05-0D0C0D0E-0D100D12-0D280D2A-0D390D3D0D600D610D7A-0D7F0D85-0D960D9A-0DB10DB3-0DBB0DBD0DC0-0DC60E01-0E300E320E330E40-0E450E810E820E840E870E880E8A0E8D0E94-0E970E99-0E9F0EA1-0EA30EA50EA70EAA0EAB0EAD-0EB00EB20EB30EBD0EC0-0EC40EDC0EDD0F000F40-0F470F49-0F6C0F88-0F8B1000-102A103F1050-1055105A-105D106110651066106E-10701075-1081108E10D0-10FA1100-1248124A-124D1250-12561258125A-125D1260-1288128A-128D1290-12B012B2-12B512B8-12BE12C012C2-12C512C8-12D612D8-13101312-13151318-135A1380-138F13A0-13F41401-166C166F-167F1681-169A16A0-16EA1700-170C170E-17111720-17311740-17511760-176C176E-17701780-17B317DC1820-18421844-18771880-18A818AA18B0-18F51900-191C1950-196D1970-19741980-19AB19C1-19C71A00-1A161A20-1A541B05-1B331B45-1B4B1B83-1BA01BAE1BAF1C00-1C231C4D-1C4F1C5A-1C771CE9-1CEC1CEE-1CF12135-21382D30-2D652D80-2D962DA0-2DA62DA8-2DAE2DB0-2DB62DB8-2DBE2DC0-2DC62DC8-2DCE2DD0-2DD62DD8-2DDE3006303C3041-3096309F30A1-30FA30FF3105-312D3131-318E31A0-31B731F0-31FF3400-4DB54E00-9FCBA000-A014A016-A48CA4D0-A4F7A500-A60BA610-A61FA62AA62BA66EA6A0-A6E5A7FB-A801A803-A805A807-A80AA80C-A822A840-A873A882-A8B3A8F2-A8F7A8FBA90A-A925A930-A946A960-A97CA984-A9B2AA00-AA28AA40-AA42AA44-AA4BAA60-AA6FAA71-AA76AA7AAA80-AAAFAAB1AAB5AAB6AAB9-AABDAAC0AAC2AADBAADCABC0-ABE2AC00-D7A3D7B0-D7C6D7CB-D7FBF900-FA2DFA30-FA6DFA70-FAD9FB1DFB1F-FB28FB2A-FB36FB38-FB3CFB3EFB40FB41FB43FB44FB46-FBB1FBD3-FD3DFD50-FD8FFD92-FDC7FDF0-FDFBFE70-FE74FE76-FEFCFF66-FF6FFF71-FF9DFFA0-FFBEFFC2-FFC7FFCA-FFCFFFD2-FFD7FFDA-FFDC",
        M: "0300-036F0483-04890591-05BD05BF05C105C205C405C505C70610-061A064B-065E067006D6-06DC06DE-06E406E706E806EA-06ED07110730-074A07A6-07B007EB-07F30816-0819081B-08230825-08270829-082D0900-0903093C093E-094E0951-0955096209630981-098309BC09BE-09C409C709C809CB-09CD09D709E209E30A01-0A030A3C0A3E-0A420A470A480A4B-0A4D0A510A700A710A750A81-0A830ABC0ABE-0AC50AC7-0AC90ACB-0ACD0AE20AE30B01-0B030B3C0B3E-0B440B470B480B4B-0B4D0B560B570B620B630B820BBE-0BC20BC6-0BC80BCA-0BCD0BD70C01-0C030C3E-0C440C46-0C480C4A-0C4D0C550C560C620C630C820C830CBC0CBE-0CC40CC6-0CC80CCA-0CCD0CD50CD60CE20CE30D020D030D3E-0D440D46-0D480D4A-0D4D0D570D620D630D820D830DCA0DCF-0DD40DD60DD8-0DDF0DF20DF30E310E34-0E3A0E47-0E4E0EB10EB4-0EB90EBB0EBC0EC8-0ECD0F180F190F350F370F390F3E0F3F0F71-0F840F860F870F90-0F970F99-0FBC0FC6102B-103E1056-1059105E-10601062-10641067-106D1071-10741082-108D108F109A-109D135F1712-17141732-1734175217531772177317B6-17D317DD180B-180D18A91920-192B1930-193B19B0-19C019C819C91A17-1A1B1A55-1A5E1A60-1A7C1A7F1B00-1B041B34-1B441B6B-1B731B80-1B821BA1-1BAA1C24-1C371CD0-1CD21CD4-1CE81CED1CF21DC0-1DE61DFD-1DFF20D0-20F02CEF-2CF12DE0-2DFF302A-302F3099309AA66F-A672A67CA67DA6F0A6F1A802A806A80BA823-A827A880A881A8B4-A8C4A8E0-A8F1A926-A92DA947-A953A980-A983A9B3-A9C0AA29-AA36AA43AA4CAA4DAA7BAAB0AAB2-AAB4AAB7AAB8AABEAABFAAC1ABE3-ABEAABECABEDFB1EFE00-FE0FFE20-FE26",
        Mn: "0300-036F0483-04870591-05BD05BF05C105C205C405C505C70610-061A064B-065E067006D6-06DC06DF-06E406E706E806EA-06ED07110730-074A07A6-07B007EB-07F30816-0819081B-08230825-08270829-082D0900-0902093C0941-0948094D0951-095509620963098109BC09C1-09C409CD09E209E30A010A020A3C0A410A420A470A480A4B-0A4D0A510A700A710A750A810A820ABC0AC1-0AC50AC70AC80ACD0AE20AE30B010B3C0B3F0B41-0B440B4D0B560B620B630B820BC00BCD0C3E-0C400C46-0C480C4A-0C4D0C550C560C620C630CBC0CBF0CC60CCC0CCD0CE20CE30D41-0D440D4D0D620D630DCA0DD2-0DD40DD60E310E34-0E3A0E47-0E4E0EB10EB4-0EB90EBB0EBC0EC8-0ECD0F180F190F350F370F390F71-0F7E0F80-0F840F860F870F90-0F970F99-0FBC0FC6102D-10301032-10371039103A103D103E10581059105E-10601071-1074108210851086108D109D135F1712-17141732-1734175217531772177317B7-17BD17C617C9-17D317DD180B-180D18A91920-19221927192819321939-193B1A171A181A561A58-1A5E1A601A621A65-1A6C1A73-1A7C1A7F1B00-1B031B341B36-1B3A1B3C1B421B6B-1B731B801B811BA2-1BA51BA81BA91C2C-1C331C361C371CD0-1CD21CD4-1CE01CE2-1CE81CED1DC0-1DE61DFD-1DFF20D0-20DC20E120E5-20F02CEF-2CF12DE0-2DFF302A-302F3099309AA66FA67CA67DA6F0A6F1A802A806A80BA825A826A8C4A8E0-A8F1A926-A92DA947-A951A980-A982A9B3A9B6-A9B9A9BCAA29-AA2EAA31AA32AA35AA36AA43AA4CAAB0AAB2-AAB4AAB7AAB8AABEAABFAAC1ABE5ABE8ABEDFB1EFE00-FE0FFE20-FE26",
        Mc: "0903093E-09400949-094C094E0982098309BE-09C009C709C809CB09CC09D70A030A3E-0A400A830ABE-0AC00AC90ACB0ACC0B020B030B3E0B400B470B480B4B0B4C0B570BBE0BBF0BC10BC20BC6-0BC80BCA-0BCC0BD70C01-0C030C41-0C440C820C830CBE0CC0-0CC40CC70CC80CCA0CCB0CD50CD60D020D030D3E-0D400D46-0D480D4A-0D4C0D570D820D830DCF-0DD10DD8-0DDF0DF20DF30F3E0F3F0F7F102B102C10311038103B103C105610571062-10641067-106D108310841087-108C108F109A-109C17B617BE-17C517C717C81923-19261929-192B193019311933-193819B0-19C019C819C91A19-1A1B1A551A571A611A631A641A6D-1A721B041B351B3B1B3D-1B411B431B441B821BA11BA61BA71BAA1C24-1C2B1C341C351CE11CF2A823A824A827A880A881A8B4-A8C3A952A953A983A9B4A9B5A9BAA9BBA9BD-A9C0AA2FAA30AA33AA34AA4DAA7BABE3ABE4ABE6ABE7ABE9ABEAABEC",
        Me: "0488048906DE20DD-20E020E2-20E4A670-A672",
        N: "0030-003900B200B300B900BC-00BE0660-066906F0-06F907C0-07C90966-096F09E6-09EF09F4-09F90A66-0A6F0AE6-0AEF0B66-0B6F0BE6-0BF20C66-0C6F0C78-0C7E0CE6-0CEF0D66-0D750E50-0E590ED0-0ED90F20-0F331040-10491090-10991369-137C16EE-16F017E0-17E917F0-17F91810-18191946-194F19D0-19DA1A80-1A891A90-1A991B50-1B591BB0-1BB91C40-1C491C50-1C5920702074-20792080-20892150-21822185-21892460-249B24EA-24FF2776-27932CFD30073021-30293038-303A3192-31953220-32293251-325F3280-328932B1-32BFA620-A629A6E6-A6EFA830-A835A8D0-A8D9A900-A909A9D0-A9D9AA50-AA59ABF0-ABF9FF10-FF19",
        Nd: "0030-00390660-066906F0-06F907C0-07C90966-096F09E6-09EF0A66-0A6F0AE6-0AEF0B66-0B6F0BE6-0BEF0C66-0C6F0CE6-0CEF0D66-0D6F0E50-0E590ED0-0ED90F20-0F291040-10491090-109917E0-17E91810-18191946-194F19D0-19DA1A80-1A891A90-1A991B50-1B591BB0-1BB91C40-1C491C50-1C59A620-A629A8D0-A8D9A900-A909A9D0-A9D9AA50-AA59ABF0-ABF9FF10-FF19",
        Nl: "16EE-16F02160-21822185-218830073021-30293038-303AA6E6-A6EF",
        No: "00B200B300B900BC-00BE09F4-09F90BF0-0BF20C78-0C7E0D70-0D750F2A-0F331369-137C17F0-17F920702074-20792080-20892150-215F21892460-249B24EA-24FF2776-27932CFD3192-31953220-32293251-325F3280-328932B1-32BFA830-A835",
        P: "0021-00230025-002A002C-002F003A003B003F0040005B-005D005F007B007D00A100AB00B700BB00BF037E0387055A-055F0589058A05BE05C005C305C605F305F40609060A060C060D061B061E061F066A-066D06D40700-070D07F7-07F90830-083E0964096509700DF40E4F0E5A0E5B0F04-0F120F3A-0F3D0F850FD0-0FD4104A-104F10FB1361-13681400166D166E169B169C16EB-16ED1735173617D4-17D617D8-17DA1800-180A1944194519DE19DF1A1E1A1F1AA0-1AA61AA8-1AAD1B5A-1B601C3B-1C3F1C7E1C7F1CD32010-20272030-20432045-20512053-205E207D207E208D208E2329232A2768-277527C527C627E6-27EF2983-299829D8-29DB29FC29FD2CF9-2CFC2CFE2CFF2E00-2E2E2E302E313001-30033008-30113014-301F3030303D30A030FBA4FEA4FFA60D-A60FA673A67EA6F2-A6F7A874-A877A8CEA8CFA8F8-A8FAA92EA92FA95FA9C1-A9CDA9DEA9DFAA5C-AA5FAADEAADFABEBFD3EFD3FFE10-FE19FE30-FE52FE54-FE61FE63FE68FE6AFE6BFF01-FF03FF05-FF0AFF0C-FF0FFF1AFF1BFF1FFF20FF3B-FF3DFF3FFF5BFF5DFF5F-FF65",
        Pd: "002D058A05BE140018062010-20152E172E1A301C303030A0FE31FE32FE58FE63FF0D",
        Ps: "0028005B007B0F3A0F3C169B201A201E2045207D208D23292768276A276C276E27702772277427C527E627E827EA27EC27EE2983298529872989298B298D298F299129932995299729D829DA29FC2E222E242E262E283008300A300C300E3010301430163018301A301DFD3EFE17FE35FE37FE39FE3BFE3DFE3FFE41FE43FE47FE59FE5BFE5DFF08FF3BFF5BFF5FFF62",
        Pe: "0029005D007D0F3B0F3D169C2046207E208E232A2769276B276D276F27712773277527C627E727E927EB27ED27EF298429862988298A298C298E2990299229942996299829D929DB29FD2E232E252E272E293009300B300D300F3011301530173019301B301E301FFD3FFE18FE36FE38FE3AFE3CFE3EFE40FE42FE44FE48FE5AFE5CFE5EFF09FF3DFF5DFF60FF63",
        Pi: "00AB2018201B201C201F20392E022E042E092E0C2E1C2E20",
        Pf: "00BB2019201D203A2E032E052E0A2E0D2E1D2E21",
        Pc: "005F203F20402054FE33FE34FE4D-FE4FFF3F",
        Po: "0021-00230025-0027002A002C002E002F003A003B003F0040005C00A100B700BF037E0387055A-055F058905C005C305C605F305F40609060A060C060D061B061E061F066A-066D06D40700-070D07F7-07F90830-083E0964096509700DF40E4F0E5A0E5B0F04-0F120F850FD0-0FD4104A-104F10FB1361-1368166D166E16EB-16ED1735173617D4-17D617D8-17DA1800-18051807-180A1944194519DE19DF1A1E1A1F1AA0-1AA61AA8-1AAD1B5A-1B601C3B-1C3F1C7E1C7F1CD3201620172020-20272030-2038203B-203E2041-20432047-205120532055-205E2CF9-2CFC2CFE2CFF2E002E012E06-2E082E0B2E0E-2E162E182E192E1B2E1E2E1F2E2A-2E2E2E302E313001-3003303D30FBA4FEA4FFA60D-A60FA673A67EA6F2-A6F7A874-A877A8CEA8CFA8F8-A8FAA92EA92FA95FA9C1-A9CDA9DEA9DFAA5C-AA5FAADEAADFABEBFE10-FE16FE19FE30FE45FE46FE49-FE4CFE50-FE52FE54-FE57FE5F-FE61FE68FE6AFE6BFF01-FF03FF05-FF07FF0AFF0CFF0EFF0FFF1AFF1BFF1FFF20FF3CFF61FF64FF65",
        S: "0024002B003C-003E005E0060007C007E00A2-00A900AC00AE-00B100B400B600B800D700F702C2-02C502D2-02DF02E5-02EB02ED02EF-02FF03750384038503F604820606-0608060B060E060F06E906FD06FE07F609F209F309FA09FB0AF10B700BF3-0BFA0C7F0CF10CF20D790E3F0F01-0F030F13-0F170F1A-0F1F0F340F360F380FBE-0FC50FC7-0FCC0FCE0FCF0FD5-0FD8109E109F13601390-139917DB194019E0-19FF1B61-1B6A1B74-1B7C1FBD1FBF-1FC11FCD-1FCF1FDD-1FDF1FED-1FEF1FFD1FFE20442052207A-207C208A-208C20A0-20B8210021012103-21062108210921142116-2118211E-2123212521272129212E213A213B2140-2144214A-214D214F2190-2328232B-23E82400-24262440-244A249C-24E92500-26CD26CF-26E126E326E8-26FF2701-27042706-2709270C-27272729-274B274D274F-27522756-275E2761-276727942798-27AF27B1-27BE27C0-27C427C7-27CA27CC27D0-27E527F0-29822999-29D729DC-29FB29FE-2B4C2B50-2B592CE5-2CEA2E80-2E992E9B-2EF32F00-2FD52FF0-2FFB300430123013302030363037303E303F309B309C319031913196-319F31C0-31E33200-321E322A-32503260-327F328A-32B032C0-32FE3300-33FF4DC0-4DFFA490-A4C6A700-A716A720A721A789A78AA828-A82BA836-A839AA77-AA79FB29FDFCFDFDFE62FE64-FE66FE69FF04FF0BFF1C-FF1EFF3EFF40FF5CFF5EFFE0-FFE6FFE8-FFEEFFFCFFFD",
        Sm: "002B003C-003E007C007E00AC00B100D700F703F60606-060820442052207A-207C208A-208C2140-2144214B2190-2194219A219B21A021A321A621AE21CE21CF21D221D421F4-22FF2308-230B23202321237C239B-23B323DC-23E125B725C125F8-25FF266F27C0-27C427C7-27CA27CC27D0-27E527F0-27FF2900-29822999-29D729DC-29FB29FE-2AFF2B30-2B442B47-2B4CFB29FE62FE64-FE66FF0BFF1C-FF1EFF5CFF5EFFE2FFE9-FFEC",
        Sc: "002400A2-00A5060B09F209F309FB0AF10BF90E3F17DB20A0-20B8A838FDFCFE69FF04FFE0FFE1FFE5FFE6",
        Sk: "005E006000A800AF00B400B802C2-02C502D2-02DF02E5-02EB02ED02EF-02FF0375038403851FBD1FBF-1FC11FCD-1FCF1FDD-1FDF1FED-1FEF1FFD1FFE309B309CA700-A716A720A721A789A78AFF3EFF40FFE3",
        So: "00A600A700A900AE00B000B60482060E060F06E906FD06FE07F609FA0B700BF3-0BF80BFA0C7F0CF10CF20D790F01-0F030F13-0F170F1A-0F1F0F340F360F380FBE-0FC50FC7-0FCC0FCE0FCF0FD5-0FD8109E109F13601390-1399194019E0-19FF1B61-1B6A1B74-1B7C210021012103-21062108210921142116-2118211E-2123212521272129212E213A213B214A214C214D214F2195-2199219C-219F21A121A221A421A521A7-21AD21AF-21CD21D021D121D321D5-21F32300-2307230C-231F2322-2328232B-237B237D-239A23B4-23DB23E2-23E82400-24262440-244A249C-24E92500-25B625B8-25C025C2-25F72600-266E2670-26CD26CF-26E126E326E8-26FF2701-27042706-2709270C-27272729-274B274D274F-27522756-275E2761-276727942798-27AF27B1-27BE2800-28FF2B00-2B2F2B452B462B50-2B592CE5-2CEA2E80-2E992E9B-2EF32F00-2FD52FF0-2FFB300430123013302030363037303E303F319031913196-319F31C0-31E33200-321E322A-32503260-327F328A-32B032C0-32FE3300-33FF4DC0-4DFFA490-A4C6A828-A82BA836A837A839AA77-AA79FDFDFFE4FFE8FFEDFFEEFFFCFFFD",
        Z: "002000A01680180E2000-200A20282029202F205F3000",
        Zs: "002000A01680180E2000-200A202F205F3000",
        Zl: "2028",
        Zp: "2029",
        C: "0000-001F007F-009F00AD03780379037F-0383038B038D03A20526-05300557055805600588058B-059005C8-05CF05EB-05EF05F5-0605061C061D0620065F06DD070E070F074B074C07B2-07BF07FB-07FF082E082F083F-08FF093A093B094F095609570973-097809800984098D098E0991099209A909B109B3-09B509BA09BB09C509C609C909CA09CF-09D609D8-09DB09DE09E409E509FC-0A000A040A0B-0A0E0A110A120A290A310A340A370A3A0A3B0A3D0A43-0A460A490A4A0A4E-0A500A52-0A580A5D0A5F-0A650A76-0A800A840A8E0A920AA90AB10AB40ABA0ABB0AC60ACA0ACE0ACF0AD1-0ADF0AE40AE50AF00AF2-0B000B040B0D0B0E0B110B120B290B310B340B3A0B3B0B450B460B490B4A0B4E-0B550B58-0B5B0B5E0B640B650B72-0B810B840B8B-0B8D0B910B96-0B980B9B0B9D0BA0-0BA20BA5-0BA70BAB-0BAD0BBA-0BBD0BC3-0BC50BC90BCE0BCF0BD1-0BD60BD8-0BE50BFB-0C000C040C0D0C110C290C340C3A-0C3C0C450C490C4E-0C540C570C5A-0C5F0C640C650C70-0C770C800C810C840C8D0C910CA90CB40CBA0CBB0CC50CC90CCE-0CD40CD7-0CDD0CDF0CE40CE50CF00CF3-0D010D040D0D0D110D290D3A-0D3C0D450D490D4E-0D560D58-0D5F0D640D650D76-0D780D800D810D840D97-0D990DB20DBC0DBE0DBF0DC7-0DC90DCB-0DCE0DD50DD70DE0-0DF10DF5-0E000E3B-0E3E0E5C-0E800E830E850E860E890E8B0E8C0E8E-0E930E980EA00EA40EA60EA80EA90EAC0EBA0EBE0EBF0EC50EC70ECE0ECF0EDA0EDB0EDE-0EFF0F480F6D-0F700F8C-0F8F0F980FBD0FCD0FD9-0FFF10C6-10CF10FD-10FF1249124E124F12571259125E125F1289128E128F12B112B612B712BF12C112C612C712D7131113161317135B-135E137D-137F139A-139F13F5-13FF169D-169F16F1-16FF170D1715-171F1737-173F1754-175F176D17711774-177F17B417B517DE17DF17EA-17EF17FA-17FF180F181A-181F1878-187F18AB-18AF18F6-18FF191D-191F192C-192F193C-193F1941-1943196E196F1975-197F19AC-19AF19CA-19CF19DB-19DD1A1C1A1D1A5F1A7D1A7E1A8A-1A8F1A9A-1A9F1AAE-1AFF1B4C-1B4F1B7D-1B7F1BAB-1BAD1BBA-1BFF1C38-1C3A1C4A-1C4C1C80-1CCF1CF3-1CFF1DE7-1DFC1F161F171F1E1F1F1F461F471F4E1F4F1F581F5A1F5C1F5E1F7E1F7F1FB51FC51FD41FD51FDC1FF01FF11FF51FFF200B-200F202A-202E2060-206F20722073208F2095-209F20B9-20CF20F1-20FF218A-218F23E9-23FF2427-243F244B-245F26CE26E226E4-26E727002705270A270B2728274C274E2753-2755275F27602795-279727B027BF27CB27CD-27CF2B4D-2B4F2B5A-2BFF2C2F2C5F2CF2-2CF82D26-2D2F2D66-2D6E2D70-2D7F2D97-2D9F2DA72DAF2DB72DBF2DC72DCF2DD72DDF2E32-2E7F2E9A2EF4-2EFF2FD6-2FEF2FFC-2FFF3040309730983100-3104312E-3130318F31B8-31BF31E4-31EF321F32FF4DB6-4DBF9FCC-9FFFA48D-A48FA4C7-A4CFA62C-A63FA660A661A674-A67BA698-A69FA6F8-A6FFA78D-A7FAA82C-A82FA83A-A83FA878-A87FA8C5-A8CDA8DA-A8DFA8FC-A8FFA954-A95EA97D-A97FA9CEA9DA-A9DDA9E0-A9FFAA37-AA3FAA4EAA4FAA5AAA5BAA7C-AA7FAAC3-AADAAAE0-ABBFABEEABEFABFA-ABFFD7A4-D7AFD7C7-D7CAD7FC-F8FFFA2EFA2FFA6EFA6FFADA-FAFFFB07-FB12FB18-FB1CFB37FB3DFB3FFB42FB45FBB2-FBD2FD40-FD4FFD90FD91FDC8-FDEFFDFEFDFFFE1A-FE1FFE27-FE2FFE53FE67FE6C-FE6FFE75FEFD-FF00FFBF-FFC1FFC8FFC9FFD0FFD1FFD8FFD9FFDD-FFDFFFE7FFEF-FFFBFFFEFFFF",
        Cc: "0000-001F007F-009F",
        Cf: "00AD0600-060306DD070F17B417B5200B-200F202A-202E2060-2064206A-206FFEFFFFF9-FFFB",
        Co: "E000-F8FF",
        Cs: "D800-DFFF",
        Cn: "03780379037F-0383038B038D03A20526-05300557055805600588058B-059005C8-05CF05EB-05EF05F5-05FF06040605061C061D0620065F070E074B074C07B2-07BF07FB-07FF082E082F083F-08FF093A093B094F095609570973-097809800984098D098E0991099209A909B109B3-09B509BA09BB09C509C609C909CA09CF-09D609D8-09DB09DE09E409E509FC-0A000A040A0B-0A0E0A110A120A290A310A340A370A3A0A3B0A3D0A43-0A460A490A4A0A4E-0A500A52-0A580A5D0A5F-0A650A76-0A800A840A8E0A920AA90AB10AB40ABA0ABB0AC60ACA0ACE0ACF0AD1-0ADF0AE40AE50AF00AF2-0B000B040B0D0B0E0B110B120B290B310B340B3A0B3B0B450B460B490B4A0B4E-0B550B58-0B5B0B5E0B640B650B72-0B810B840B8B-0B8D0B910B96-0B980B9B0B9D0BA0-0BA20BA5-0BA70BAB-0BAD0BBA-0BBD0BC3-0BC50BC90BCE0BCF0BD1-0BD60BD8-0BE50BFB-0C000C040C0D0C110C290C340C3A-0C3C0C450C490C4E-0C540C570C5A-0C5F0C640C650C70-0C770C800C810C840C8D0C910CA90CB40CBA0CBB0CC50CC90CCE-0CD40CD7-0CDD0CDF0CE40CE50CF00CF3-0D010D040D0D0D110D290D3A-0D3C0D450D490D4E-0D560D58-0D5F0D640D650D76-0D780D800D810D840D97-0D990DB20DBC0DBE0DBF0DC7-0DC90DCB-0DCE0DD50DD70DE0-0DF10DF5-0E000E3B-0E3E0E5C-0E800E830E850E860E890E8B0E8C0E8E-0E930E980EA00EA40EA60EA80EA90EAC0EBA0EBE0EBF0EC50EC70ECE0ECF0EDA0EDB0EDE-0EFF0F480F6D-0F700F8C-0F8F0F980FBD0FCD0FD9-0FFF10C6-10CF10FD-10FF1249124E124F12571259125E125F1289128E128F12B112B612B712BF12C112C612C712D7131113161317135B-135E137D-137F139A-139F13F5-13FF169D-169F16F1-16FF170D1715-171F1737-173F1754-175F176D17711774-177F17DE17DF17EA-17EF17FA-17FF180F181A-181F1878-187F18AB-18AF18F6-18FF191D-191F192C-192F193C-193F1941-1943196E196F1975-197F19AC-19AF19CA-19CF19DB-19DD1A1C1A1D1A5F1A7D1A7E1A8A-1A8F1A9A-1A9F1AAE-1AFF1B4C-1B4F1B7D-1B7F1BAB-1BAD1BBA-1BFF1C38-1C3A1C4A-1C4C1C80-1CCF1CF3-1CFF1DE7-1DFC1F161F171F1E1F1F1F461F471F4E1F4F1F581F5A1F5C1F5E1F7E1F7F1FB51FC51FD41FD51FDC1FF01FF11FF51FFF2065-206920722073208F2095-209F20B9-20CF20F1-20FF218A-218F23E9-23FF2427-243F244B-245F26CE26E226E4-26E727002705270A270B2728274C274E2753-2755275F27602795-279727B027BF27CB27CD-27CF2B4D-2B4F2B5A-2BFF2C2F2C5F2CF2-2CF82D26-2D2F2D66-2D6E2D70-2D7F2D97-2D9F2DA72DAF2DB72DBF2DC72DCF2DD72DDF2E32-2E7F2E9A2EF4-2EFF2FD6-2FEF2FFC-2FFF3040309730983100-3104312E-3130318F31B8-31BF31E4-31EF321F32FF4DB6-4DBF9FCC-9FFFA48D-A48FA4C7-A4CFA62C-A63FA660A661A674-A67BA698-A69FA6F8-A6FFA78D-A7FAA82C-A82FA83A-A83FA878-A87FA8C5-A8CDA8DA-A8DFA8FC-A8FFA954-A95EA97D-A97FA9CEA9DA-A9DDA9E0-A9FFAA37-AA3FAA4EAA4FAA5AAA5BAA7C-AA7FAAC3-AADAAAE0-ABBFABEEABEFABFA-ABFFD7A4-D7AFD7C7-D7CAD7FC-D7FFFA2EFA2FFA6EFA6FFADA-FAFFFB07-FB12FB18-FB1CFB37FB3DFB3FFB42FB45FBB2-FBD2FD40-FD4FFD90FD91FDC8-FDEFFDFEFDFFFE1A-FE1FFE27-FE2FFE53FE67FE6C-FE6FFE75FEFDFEFEFF00FFBF-FFC1FFC8FFC9FFD0FFD1FFD8FFD9FFDD-FFDFFFE7FFEF-FFF8FFFEFFFF"
    });
    function a(g) {
        var f = /\w{4}/g;
        for (var e in g) {
            b.packages[e] = g[e].replace(f, "\\u$&")
        }
    }
});
define("ace/token_iterator", ["require", "exports", "module"], function (b, a, c) {
    var d = function (g, f, h) {
        this.$session = g;
        this.$row = f;
        this.$rowTokens = g.getTokens(f);
        var e = g.getTokenAt(f, h);
        this.$tokenIndex = e ? e.index : -1
    };
    (function () {
        this.stepBackward = function () {
            this.$tokenIndex -= 1;
            while (this.$tokenIndex < 0) {
                this.$row -= 1;
                if (this.$row < 0) {
                    this.$row = 0;
                    return null
                }
                this.$rowTokens = this.$session.getTokens(this.$row);
                this.$tokenIndex = this.$rowTokens.length - 1
            }
            return this.$rowTokens[this.$tokenIndex]
        }
            ;
        this.stepForward = function () {
            this.$tokenIndex += 1;
            var e;
            while (this.$tokenIndex >= this.$rowTokens.length) {
                this.$row += 1;
                if (!e) {
                    e = this.$session.getLength()
                }
                if (this.$row >= e) {
                    this.$row = e - 1;
                    return null
                }
                this.$rowTokens = this.$session.getTokens(this.$row);
                this.$tokenIndex = 0
            }
            return this.$rowTokens[this.$tokenIndex]
        }
            ;
        this.getCurrentToken = function () {
            return this.$rowTokens[this.$tokenIndex]
        }
            ;
        this.getCurrentTokenRow = function () {
            return this.$row
        }
            ;
        this.getCurrentTokenColumn = function () {
            var f = this.$rowTokens;
            var e = this.$tokenIndex;
            var g = f[e].start;
            if (g !== undefined) {
                return g
            }
            g = 0;
            while (e > 0) {
                e -= 1;
                g += f[e].value.length
            }
            return g
        }
    }
    ).call(d.prototype);
    a.TokenIterator = d
});
define("ace/mode/text", ["require", "exports", "module", "ace/tokenizer", "ace/mode/text_highlight_rules", "ace/mode/behaviour", "ace/unicode", "ace/lib/lang", "ace/token_iterator", "ace/range"], function (f, h, d) {
    var j = f("../tokenizer").Tokenizer;
    var a = f("./text_highlight_rules").TextHighlightRules;
    var g = f("./behaviour").Behaviour;
    var b = f("../unicode");
    var c = f("../lib/lang");
    var i = f("../token_iterator").TokenIterator;
    var e = f("../range").Range;
    var k = function () {
        this.HighlightRules = a;
        this.$behaviour = new g()
    };
    (function () {
        this.tokenRe = new RegExp("^[" + b.packages.L + b.packages.Mn + b.packages.Mc + b.packages.Nd + b.packages.Pc + "\\$_]+", "g");
        this.nonTokenRe = new RegExp("^(?:[^" + b.packages.L + b.packages.Mn + b.packages.Mc + b.packages.Nd + b.packages.Pc + "\\$_]|\\s])+", "g");
        this.getTokenizer = function () {
            if (!this.$tokenizer) {
                this.$highlightRules = this.$highlightRules || new this.HighlightRules();
                this.$tokenizer = new j(this.$highlightRules.getRules())
            }
            return this.$tokenizer
        }
            ;
        this.lineCommentStart = "";
        this.blockComment = "";
        this.toggleCommentLines = function (q, m, l, z) {
            var F = m.doc;
            var p = true;
            var B = true;
            var o = Infinity;
            var w = m.getTabSize();
            var E = false;
            if (!this.lineCommentStart) {
                if (!this.blockComment) {
                    return false
                }
                var C = this.blockComment.start;
                var t = this.blockComment.end;
                var x = new RegExp("^(\\s*)(?:" + c.escapeRegExp(C) + ")");
                var y = new RegExp("(?:" + c.escapeRegExp(t) + ")\\s*$");
                var n = function (G, H) {
                    if (u(G, H)) {
                        return
                    }
                    if (!p || /\S/.test(G)) {
                        F.insertInLine({
                            row: H,
                            column: G.length
                        }, t);
                        F.insertInLine({
                            row: H,
                            column: o
                        }, C)
                    }
                };
                var r = function (H, I) {
                    var G;
                    if (G = H.match(y)) {
                        F.removeInLine(I, H.length - G[0].length, H.length)
                    }
                    if (G = H.match(x)) {
                        F.removeInLine(I, G[1].length, G[0].length)
                    }
                };
                var u = function (G, J) {
                    if (x.test(G)) {
                        return true
                    }
                    var I = m.getTokens(J);
                    for (var H = 0; H < I.length; H++) {
                        if (I[H].type === "comment") {
                            return true
                        }
                    }
                }
            } else {
                if (Array.isArray(this.lineCommentStart)) {
                    var x = this.lineCommentStart.map(c.escapeRegExp).join("|");
                    var C = this.lineCommentStart[0]
                } else {
                    var x = c.escapeRegExp(this.lineCommentStart);
                    var C = this.lineCommentStart
                }
                x = new RegExp("^(\\s*)(?:" + x + ") ?");
                E = m.getUseSoftTabs();
                var r = function (I, J) {
                    var G = I.match(x);
                    if (!G) {
                        return
                    }
                    var K = G[1].length
                        , H = G[0].length;
                    if (!D(I, K, H) && G[0][H - 1] == " ") {
                        H--
                    }
                    F.removeInLine(J, K, H)
                };
                var s = C + " ";
                var n = function (G, H) {
                    if (!p || /\S/.test(G)) {
                        if (D(G, o, o)) {
                            F.insertInLine({
                                row: H,
                                column: o
                            }, s)
                        } else {
                            F.insertInLine({
                                row: H,
                                column: o
                            }, C)
                        }
                    }
                };
                var u = function (G, H) {
                    return x.test(G)
                };
                var D = function (G, I, J) {
                    var H = 0;
                    while (I-- && G.charAt(I) == " ") {
                        H++
                    }
                    if (H % w != 0) {
                        return false
                    }
                    var H = 0;
                    while (G.charAt(J++) == " ") {
                        H++
                    }
                    if (w > 2) {
                        return H % w != w - 1
                    } else {
                        return H % w == 0
                    }
                    return true
                }
            }
            function A(G) {
                for (var H = l; H <= z; H++) {
                    G(F.getLine(H), H)
                }
            }
            var v = Infinity;
            A(function (H, I) {
                var G = H.search(/\S/);
                if (G !== -1) {
                    if (G < o) {
                        o = G
                    }
                    if (B && !u(H, I)) {
                        B = false
                    }
                } else {
                    if (v > H.length) {
                        v = H.length
                    }
                }
            });
            if (o == Infinity) {
                o = v;
                p = false;
                B = false
            }
            if (E && o % w != 0) {
                o = Math.floor(o / w) * w
            }
            A(B ? r : n)
        }
            ;
        this.toggleBlockComment = function (l, w, s, z) {
            var t = this.blockComment;
            if (!t) {
                return
            }
            if (!t.start && t[0]) {
                t = t[0]
            }
            var r = new i(w, z.row, z.column);
            var o = r.getCurrentToken();
            var m = w.selection;
            var v = w.selection.toOrientedRange();
            var y, u;
            if (o && /comment/.test(o.type)) {
                var x, p;
                while (o && /comment/.test(o.type)) {
                    var q = o.value.indexOf(t.start);
                    if (q != -1) {
                        var A = r.getCurrentTokenRow();
                        var n = r.getCurrentTokenColumn() + q;
                        x = new e(A, n, A, n + t.start.length);
                        break
                    }
                    o = r.stepBackward()
                }
                var r = new i(w, z.row, z.column);
                var o = r.getCurrentToken();
                while (o && /comment/.test(o.type)) {
                    var q = o.value.indexOf(t.end);
                    if (q != -1) {
                        var A = r.getCurrentTokenRow();
                        var n = r.getCurrentTokenColumn() + q;
                        p = new e(A, n, A, n + t.end.length);
                        break
                    }
                    o = r.stepForward()
                }
                if (p) {
                    w.remove(p)
                }
                if (x) {
                    w.remove(x);
                    y = x.start.row;
                    u = -t.start.length
                }
            } else {
                u = t.start.length;
                y = s.start.row;
                w.insert(s.end, t.end);
                w.insert(s.start, t.start)
            }
            if (v.start.row == y) {
                v.start.column += u
            }
            if (v.end.row == y) {
                v.end.column += u
            }
            w.selection.fromOrientedRange(v)
        }
            ;
        this.getNextLineIndent = function (n, l, m) {
            return this.$getIndent(l)
        }
            ;
        this.checkOutdent = function (n, l, m) {
            return false
        }
            ;
        this.autoOutdent = function (l, m, n) { }
            ;
        this.$getIndent = function (l) {
            return l.match(/^\s*/)[0]
        }
            ;
        this.createWorker = function (l) {
            return null
        }
            ;
        this.createModeDelegates = function (m) {
            this.$embeds = [];
            this.$modes = {};
            for (var n in m) {
                if (m[n]) {
                    this.$embeds.push(n);
                    this.$modes[n] = new m[n]()
                }
            }
            var l = ["toggleBlockComment", "toggleCommentLines", "getNextLineIndent", "checkOutdent", "autoOutdent", "transformAction", "getCompletions"];
            for (var n = 0; n < l.length; n++) {
                (function (p) {
                    var q = l[n];
                    var o = p[q];
                    p[l[n]] = function () {
                        return this.$delegator(q, arguments, o)
                    }
                }(this))
            }
        }
            ;
        this.$delegator = function (s, n, m) {
            var q = n[0];
            if (typeof q != "string") {
                q = q[0]
            }
            for (var p = 0; p < this.$embeds.length; p++) {
                if (!this.$modes[this.$embeds[p]]) {
                    continue
                }
                var o = q.split(this.$embeds[p]);
                if (!o[0] && o[1]) {
                    n[0] = o[1];
                    var r = this.$modes[this.$embeds[p]];
                    return r[s].apply(r, n)
                }
            }
            var l = m.apply(this, n);
            return m ? l : undefined
        }
            ;
        this.transformAction = function (q, p, n, r, s) {
            if (this.$behaviour) {
                var o = this.$behaviour.getBehaviours();
                for (var m in o) {
                    if (o[m][p]) {
                        var l = o[m][p].apply(this, arguments);
                        if (l) {
                            return l
                        }
                    }
                }
            }
        }
            ;
        this.getKeywords = function (o) {
            if (!this.completionKeywords) {
                var v = this.$tokenizer.rules;
                var p = [];
                for (var t in v) {
                    var s = v[t];
                    for (var n = 0, q = s.length; n < q; n++) {
                        if (typeof s[n].token === "string") {
                            if (/keyword|support|storage/.test(s[n].token)) {
                                p.push(s[n].regex)
                            }
                        } else {
                            if (typeof s[n].token === "object") {
                                for (var u = 0, m = s[n].token.length; u < m; u++) {
                                    if (/keyword|support|storage/.test(s[n].token[u])) {
                                        var t = s[n].regex.match(/\(.+?\)/g)[u];
                                        p.push(t.substr(1, t.length - 2))
                                    }
                                }
                            }
                        }
                    }
                }
                this.completionKeywords = p
            }
            if (!o) {
                return this.$keywordList
            }
            return p.concat(this.$keywordList || [])
        }
            ;
        this.$createKeywordList = function () {
            if (!this.$highlightRules) {
                this.getTokenizer()
            }
            return this.$keywordList = this.$highlightRules.$keywordList || []
        }
            ;
        this.getCompletions = function (n, o, p, m) {
            var l = this.$keywordList || this.$createKeywordList();
            return l.map(function (q) {
                return {
                    name: q,
                    value: q,
                    score: 0,
                    meta: "keyword"
                }
            })
        }
            ;
        this.$id = "ace/mode/text"
    }
    ).call(k.prototype);
    h.Mode = k
});
define("ace/anchor", ["require", "exports", "module", "ace/lib/oop", "ace/lib/event_emitter"], function (c, b, d) {
    var f = c("./lib/oop");
    var e = c("./lib/event_emitter").EventEmitter;
    var a = b.Anchor = function (h, i, g) {
        this.$onChange = this.onChange.bind(this);
        this.attach(h);
        if (typeof g == "undefined") {
            this.setPosition(i.row, i.column)
        } else {
            this.setPosition(i, g)
        }
    }
        ;
    (function () {
        f.implement(this, e);
        this.getPosition = function () {
            return this.$clipPositionToDocument(this.row, this.column)
        }
            ;
        this.getDocument = function () {
            return this.document
        }
            ;
        this.$insertRight = false;
        this.onChange = function (j) {
            var m = j.data;
            var h = m.range;
            if (h.start.row == h.end.row && h.start.row != this.row) {
                return
            }
            if (h.start.row > this.row) {
                return
            }
            if (h.start.row == this.row && h.start.column > this.column) {
                return
            }
            var k = this.row;
            var i = this.column;
            var l = h.start;
            var g = h.end;
            if (m.action === "insertText") {
                if (l.row === k && l.column <= i) {
                    if (l.column === i && this.$insertRight) { } else {
                        if (l.row === g.row) {
                            i += g.column - l.column
                        } else {
                            i -= l.column;
                            k += g.row - l.row
                        }
                    }
                } else {
                    if (l.row !== g.row && l.row < k) {
                        k += g.row - l.row
                    }
                }
            } else {
                if (m.action === "insertLines") {
                    if (l.row === k && i === 0 && this.$insertRight) { } else {
                        if (l.row <= k) {
                            k += g.row - l.row
                        }
                    }
                } else {
                    if (m.action === "removeText") {
                        if (l.row === k && l.column < i) {
                            if (g.column >= i) {
                                i = l.column
                            } else {
                                i = Math.max(0, i - (g.column - l.column))
                            }
                        } else {
                            if (l.row !== g.row && l.row < k) {
                                if (g.row === k) {
                                    i = Math.max(0, i - g.column) + l.column
                                }
                                k -= (g.row - l.row)
                            } else {
                                if (g.row === k) {
                                    k -= g.row - l.row;
                                    i = Math.max(0, i - g.column) + l.column
                                }
                            }
                        }
                    } else {
                        if (m.action == "removeLines") {
                            if (l.row <= k) {
                                if (g.row <= k) {
                                    k -= g.row - l.row
                                } else {
                                    k = l.row;
                                    i = 0
                                }
                            }
                        }
                    }
                }
            }
            this.setPosition(k, i, true)
        }
            ;
        this.setPosition = function (j, i, g) {
            var k;
            if (g) {
                k = {
                    row: j,
                    column: i
                }
            } else {
                k = this.$clipPositionToDocument(j, i)
            }
            if (this.row == k.row && this.column == k.column) {
                return
            }
            var h = {
                row: this.row,
                column: this.column
            };
            this.row = k.row;
            this.column = k.column;
            this._signal("change", {
                old: h,
                value: k
            })
        }
            ;
        this.detach = function () {
            this.document.removeEventListener("change", this.$onChange)
        }
            ;
        this.attach = function (g) {
            this.document = g || this.document;
            this.document.on("change", this.$onChange)
        }
            ;
        this.$clipPositionToDocument = function (h, g) {
            var i = {};
            if (h >= this.document.getLength()) {
                i.row = Math.max(0, this.document.getLength() - 1);
                i.column = this.document.getLine(i.row).length
            } else {
                if (h < 0) {
                    i.row = 0;
                    i.column = 0
                } else {
                    i.row = h;
                    i.column = Math.min(this.document.getLine(i.row).length, Math.max(0, g))
                }
            }
            if (g < 0) {
                i.column = 0
            }
            return i
        }
    }
    ).call(a.prototype)
});
define("ace/document", ["require", "exports", "module", "ace/lib/oop", "ace/lib/event_emitter", "ace/range", "ace/anchor"], function (d, c, e) {
    var g = d("./lib/oop");
    var f = d("./lib/event_emitter").EventEmitter;
    var h = d("./range").Range;
    var a = d("./anchor").Anchor;
    var b = function (i) {
        this.$lines = [];
        if (i.length === 0) {
            this.$lines = [""]
        } else {
            if (Array.isArray(i)) {
                this._insertLines(0, i)
            } else {
                this.insert({
                    row: 0,
                    column: 0
                }, i)
            }
        }
    };
    (function () {
        g.implement(this, f);
        this.setValue = function (j) {
            var i = this.getLength();
            this.remove(new h(0, 0, i, this.getLine(i - 1).length));
            this.insert({
                row: 0,
                column: 0
            }, j)
        }
            ;
        this.getValue = function () {
            return this.getAllLines().join(this.getNewLineCharacter())
        }
            ;
        this.createAnchor = function (j, i) {
            return new a(this, j, i)
        }
            ;
        if ("aaa".split(/a/).length === 0) {
            this.$split = function (i) {
                return i.replace(/\r\n|\r/g, "\n").split("\n")
            }
        } else {
            this.$split = function (i) {
                return i.split(/\r\n|\r|\n/)
            }
        }
        this.$detectNewLine = function (j) {
            var i = j.match(/^.*?(\r\n|\r|\n)/m);
            this.$autoNewLine = i ? i[1] : "\n";
            this._signal("changeNewLineMode")
        }
            ;
        this.getNewLineCharacter = function () {
            switch (this.$newLineMode) {
                case "windows":
                    return "\r\n";
                case "unix":
                    return "\n";
                default:
                    return this.$autoNewLine || "\n"
            }
        }
            ;
        this.$autoNewLine = "";
        this.$newLineMode = "auto";
        this.setNewLineMode = function (i) {
            if (this.$newLineMode === i) {
                return
            }
            this.$newLineMode = i;
            this._signal("changeNewLineMode")
        }
            ;
        this.getNewLineMode = function () {
            return this.$newLineMode
        }
            ;
        this.isNewLine = function (i) {
            return (i == "\r\n" || i == "\r" || i == "\n")
        }
            ;
        this.getLine = function (i) {
            return this.$lines[i] || ""
        }
            ;
        this.getLines = function (j, i) {
            return this.$lines.slice(j, i + 1)
        }
            ;
        this.getAllLines = function () {
            return this.getLines(0, this.getLength())
        }
            ;
        this.getLength = function () {
            return this.$lines.length
        }
            ;
        this.getTextRange = function (k) {
            if (k.start.row == k.end.row) {
                return this.getLine(k.start.row).substring(k.start.column, k.end.column)
            }
            var j = this.getLines(k.start.row, k.end.row);
            j[0] = (j[0] || "").substring(k.start.column);
            var i = j.length - 1;
            if (k.end.row - k.start.row == i) {
                j[i] = j[i].substring(0, k.end.column)
            }
            return j.join(this.getNewLineCharacter())
        }
            ;
        this.$clipPosition = function (i) {
            var j = this.getLength();
            if (i.row >= j) {
                i.row = Math.max(0, j - 1);
                i.column = this.getLine(j - 1).length
            } else {
                if (i.row < 0) {
                    i.row = 0
                }
            }
            return i
        }
            ;
        this.insert = function (i, m) {
            if (!m || m.length === 0) {
                return i
            }
            i = this.$clipPosition(i);
            if (this.getLength() <= 1) {
                this.$detectNewLine(m)
            }
            var k = this.$split(m);
            var l = k.splice(0, 1)[0];
            var j = k.length == 0 ? null : k.splice(k.length - 1, 1)[0];
            i = this.insertInLine(i, l);
            if (j !== null) {
                i = this.insertNewLine(i);
                i = this._insertLines(i.row, k);
                i = this.insertInLine(i, j || "")
            }
            return i
        }
            ;
        this.insertLines = function (j, i) {
            if (j >= this.getLength()) {
                return this.insert({
                    row: j,
                    column: 0
                }, "\n" + i.join("\n"))
            }
            return this._insertLines(Math.max(j, 0), i)
        }
            ;
        this._insertLines = function (m, j) {
            if (j.length == 0) {
                return {
                    row: m,
                    column: 0
                }
            }
            while (j.length > 20000) {
                var i = this._insertLines(m, j.slice(0, 20000));
                j = j.slice(20000);
                m = i.row
            }
            var l = [m, 0];
            l.push.apply(l, j);
            this.$lines.splice.apply(this.$lines, l);
            var k = new h(m, 0, m + j.length, 0);
            var n = {
                action: "insertLines",
                range: k,
                lines: j
            };
            this._signal("change", {
                data: n
            });
            return k.end
        }
            ;
        this.insertNewLine = function (i) {
            i = this.$clipPosition(i);
            var k = this.$lines[i.row] || "";
            this.$lines[i.row] = k.substring(0, i.column);
            this.$lines.splice(i.row + 1, 0, k.substring(i.column, k.length));
            var j = {
                row: i.row + 1,
                column: 0
            };
            var l = {
                action: "insertText",
                range: h.fromPoints(i, j),
                text: this.getNewLineCharacter()
            };
            this._signal("change", {
                data: l
            });
            return j
        }
            ;
        this.insertInLine = function (i, l) {
            if (l.length == 0) {
                return i
            }
            var k = this.$lines[i.row] || "";
            this.$lines[i.row] = k.substring(0, i.column) + l + k.substring(i.column);
            var j = {
                row: i.row,
                column: i.column + l.length
            };
            var m = {
                action: "insertText",
                range: h.fromPoints(i, j),
                text: l
            };
            this._signal("change", {
                data: m
            });
            return j
        }
            ;
        this.remove = function (j) {
            if (!(j instanceof h)) {
                j = h.fromPoints(j.start, j.end)
            }
            j.start = this.$clipPosition(j.start);
            j.end = this.$clipPosition(j.end);
            if (j.isEmpty()) {
                return j.start
            }
            var m = j.start.row;
            var k = j.end.row;
            if (j.isMultiLine()) {
                var l = j.start.column == 0 ? m : m + 1;
                var i = k - 1;
                if (j.end.column > 0) {
                    this.removeInLine(k, 0, j.end.column)
                }
                if (i >= l) {
                    this._removeLines(l, i)
                }
                if (l != m) {
                    this.removeInLine(m, j.start.column, this.getLine(m).length);
                    this.removeNewLine(j.start.row)
                }
            } else {
                this.removeInLine(m, j.start.column, j.end.column)
            }
            return j.start
        }
            ;
        this.removeInLine = function (m, k, p) {
            if (k == p) {
                return
            }
            var j = new h(m, k, m, p);
            var i = this.getLine(m);
            var l = i.substring(k, p);
            var o = i.substring(0, k) + i.substring(p, i.length);
            this.$lines.splice(m, 1, o);
            var n = {
                action: "removeText",
                range: j,
                text: l
            };
            this._signal("change", {
                data: n
            });
            return j.start
        }
            ;
        this.removeLines = function (j, i) {
            if (j < 0 || i >= this.getLength()) {
                return this.remove(new h(j, 0, i + 1, 0))
            }
            return this._removeLines(j, i)
        }
            ;
        this._removeLines = function (l, j) {
            var i = new h(l, 0, j + 1, 0);
            var k = this.$lines.splice(l, j - l + 1);
            var m = {
                action: "removeLines",
                range: i,
                nl: this.getNewLineCharacter(),
                lines: k
            };
            this._signal("change", {
                data: m
            });
            return k
        }
            ;
        this.removeNewLine = function (m) {
            var l = this.getLine(m);
            var i = this.getLine(m + 1);
            var k = new h(m, l.length, m + 1, 0);
            var j = l + i;
            this.$lines.splice(m, 2, j);
            var n = {
                action: "removeText",
                range: k,
                text: this.getNewLineCharacter()
            };
            this._signal("change", {
                data: n
            })
        }
            ;
        this.replace = function (j, k) {
            if (!(j instanceof h)) {
                j = h.fromPoints(j.start, j.end)
            }
            if (k.length == 0 && j.isEmpty()) {
                return j.start
            }
            if (k == this.getTextRange(j)) {
                return j.end
            }
            this.remove(j);
            if (k) {
                var i = this.insert(j.start, k)
            } else {
                i = j.start
            }
            return i
        }
            ;
        this.applyDeltas = function (l) {
            for (var k = 0; k < l.length; k++) {
                var m = l[k];
                var j = h.fromPoints(m.range.start, m.range.end);
                if (m.action == "insertLines") {
                    this.insertLines(j.start.row, m.lines)
                } else {
                    if (m.action == "insertText") {
                        this.insert(j.start, m.text)
                    } else {
                        if (m.action == "removeLines") {
                            this._removeLines(j.start.row, j.end.row - 1)
                        } else {
                            if (m.action == "removeText") {
                                this.remove(j)
                            }
                        }
                    }
                }
            }
        }
            ;
        this.revertDeltas = function (l) {
            for (var k = l.length - 1; k >= 0; k--) {
                var m = l[k];
                var j = h.fromPoints(m.range.start, m.range.end);
                if (m.action == "insertLines") {
                    this._removeLines(j.start.row, j.end.row - 1)
                } else {
                    if (m.action == "insertText") {
                        this.remove(j)
                    } else {
                        if (m.action == "removeLines") {
                            this._insertLines(j.start.row, m.lines)
                        } else {
                            if (m.action == "removeText") {
                                this.insert(j.start, m.text)
                            }
                        }
                    }
                }
            }
        }
            ;
        this.indexToPosition = function (o, n) {
            var k = this.$lines || this.getAllLines();
            var m = this.getNewLineCharacter().length;
            for (var p = n || 0, j = k.length; p < j; p++) {
                o -= k[p].length + m;
                if (o < 0) {
                    return {
                        row: p,
                        column: o + k[p].length + m
                    }
                }
            }
            return {
                row: j - 1,
                column: k[j - 1].length
            }
        }
            ;
        this.positionToIndex = function (p, l) {
            var j = this.$lines || this.getAllLines();
            var k = this.getNewLineCharacter().length;
            var m = 0;
            var o = Math.min(p.row, j.length);
            for (var n = l || 0; n < o; ++n) {
                m += j[n].length + k
            }
            return m + p.column
        }
    }
    ).call(b.prototype);
    c.Document = b
});
define("ace/background_tokenizer", ["require", "exports", "module", "ace/lib/oop", "ace/lib/event_emitter"], function (c, b, d) {
    var f = c("./lib/oop");
    var e = c("./lib/event_emitter").EventEmitter;
    var a = function (i, h) {
        this.running = false;
        this.lines = [];
        this.states = [];
        this.currentLine = 0;
        this.tokenizer = i;
        var g = this;
        this.$worker = function () {
            if (!g.running) {
                return
            }
            var n = new Date();
            var p = g.currentLine;
            var l = -1;
            var m = g.doc;
            while (g.lines[p]) {
                p++
            }
            var o = p;
            var j = m.getLength();
            var k = 0;
            g.running = false;
            while (p < j) {
                g.$tokenizeRow(p);
                l = p;
                do {
                    p++
                } while (g.lines[p]);
                k++;
                if ((k % 5 === 0) && (new Date() - n) > 20) {
                    g.running = setTimeout(g.$worker, 20);
                    break
                }
            }
            g.currentLine = p;
            if (o <= l) {
                g.fireUpdateEvent(o, l)
            }
        }
    };
    (function () {
        f.implement(this, e);
        this.setTokenizer = function (g) {
            this.tokenizer = g;
            this.lines = [];
            this.states = [];
            this.start(0)
        }
            ;
        this.setDocument = function (g) {
            this.doc = g;
            this.lines = [];
            this.states = [];
            this.stop()
        }
            ;
        this.fireUpdateEvent = function (i, g) {
            var h = {
                first: i,
                last: g
            };
            this._signal("update", {
                data: h
            })
        }
            ;
        this.start = function (g) {
            this.currentLine = Math.min(g || 0, this.currentLine, this.doc.getLength());
            this.lines.splice(this.currentLine, this.lines.length);
            this.states.splice(this.currentLine, this.states.length);
            this.stop();
            this.running = setTimeout(this.$worker, 700)
        }
            ;
        this.scheduleStart = function () {
            if (!this.running) {
                this.running = setTimeout(this.$worker, 700)
            }
        }
            ;
        this.$updateOnChange = function (k) {
            var i = k.range;
            var h = i.start.row;
            var g = i.end.row - h;
            if (g === 0) {
                this.lines[h] = null
            } else {
                if (k.action == "removeText" || k.action == "removeLines") {
                    this.lines.splice(h, g + 1, null);
                    this.states.splice(h, g + 1, null)
                } else {
                    var j = Array(g + 1);
                    j.unshift(h, 1);
                    this.lines.splice.apply(this.lines, j);
                    this.states.splice.apply(this.states, j)
                }
            }
            this.currentLine = Math.min(h, this.currentLine, this.doc.getLength());
            this.stop()
        }
            ;
        this.stop = function () {
            if (this.running) {
                clearTimeout(this.running)
            }
            this.running = false
        }
            ;
        this.getTokens = function (g) {
            return this.lines[g] || this.$tokenizeRow(g)
        }
            ;
        this.getState = function (g) {
            if (this.currentLine == g) {
                this.$tokenizeRow(g)
            }
            return this.states[g] || "start"
        }
            ;
        this.$tokenizeRow = function (j) {
            var g = this.doc.getLine(j);
            var i = this.states[j - 1];
            var h = this.tokenizer.getLineTokens(g, i, j);
            if (this.states[j] + "" !== h.state + "") {
                this.states[j] = h.state;
                this.lines[j + 1] = null;
                if (this.currentLine > j + 1) {
                    this.currentLine = j + 1
                }
            } else {
                if (this.currentLine == j) {
                    this.currentLine = j + 1
                }
            }
            return this.lines[j] = h.tokens
        }
    }
    ).call(a.prototype);
    b.BackgroundTokenizer = a
});
define("ace/search_highlight", ["require", "exports", "module", "ace/lib/lang", "ace/lib/oop", "ace/range"], function (b, a, c) {
    var g = b("./lib/lang");
    var e = b("./lib/oop");
    var f = b("./range").Range;
    var d = function (i, h, j) {
        this.setRegexp(i);
        this.clazz = h;
        this.type = j || "text"
    };
    (function () {
        this.MAX_RANGES = 500;
        this.setRegexp = function (h) {
            if (this.regExp + "" == h + "") {
                return
            }
            this.regExp = h;
            this.cache = []
        }
            ;
        this.update = function (p, q, r, l) {
            if (!this.regExp) {
                return
            }
            var k = l.firstRow
                , m = l.lastRow;
            for (var o = k; o <= m; o++) {
                var h = this.cache[o];
                if (h == null) {
                    h = g.getMatchOffsets(r.getLine(o), this.regExp);
                    if (h.length > this.MAX_RANGES) {
                        h = h.slice(0, this.MAX_RANGES)
                    }
                    h = h.map(function (i) {
                        return new f(o, i.offset, o, i.offset + i.length)
                    });
                    this.cache[o] = h.length ? h : ""
                }
                for (var n = h.length; n--;) {
                    q.drawSingleLineMarker(p, h[n].toScreenRange(r), this.clazz, l)
                }
            }
        }
    }
    ).call(d.prototype);
    a.SearchHighlight = d
});
define("ace/edit_session/fold_line", ["require", "exports", "module", "ace/range"], function (b, a, c) {
    var d = b("../range").Range;
    function e(f, h) {
        this.foldData = f;
        if (Array.isArray(h)) {
            this.folds = h
        } else {
            h = this.folds = [h]
        }
        var g = h[h.length - 1];
        this.range = new d(h[0].start.row, h[0].start.column, g.end.row, g.end.column);
        this.start = this.range.start;
        this.end = this.range.end;
        this.folds.forEach(function (i) {
            i.setFoldLine(this)
        }, this)
    }
    (function () {
        this.shiftRow = function (f) {
            this.start.row += f;
            this.end.row += f;
            this.folds.forEach(function (g) {
                g.start.row += f;
                g.end.row += f
            })
        }
            ;
        this.addFold = function (f) {
            if (f.sameRow) {
                if (f.start.row < this.startRow || f.endRow > this.endRow) {
                    throw new Error("Can't add a fold to this FoldLine as it has no connection")
                }
                this.folds.push(f);
                this.folds.sort(function (h, g) {
                    return -h.range.compareEnd(g.start.row, g.start.column)
                });
                if (this.range.compareEnd(f.start.row, f.start.column) > 0) {
                    this.end.row = f.end.row;
                    this.end.column = f.end.column
                } else {
                    if (this.range.compareStart(f.end.row, f.end.column) < 0) {
                        this.start.row = f.start.row;
                        this.start.column = f.start.column
                    }
                }
            } else {
                if (f.start.row == this.end.row) {
                    this.folds.push(f);
                    this.end.row = f.end.row;
                    this.end.column = f.end.column
                } else {
                    if (f.end.row == this.start.row) {
                        this.folds.unshift(f);
                        this.start.row = f.start.row;
                        this.start.column = f.start.column
                    } else {
                        throw new Error("Trying to add fold to FoldRow that doesn't have a matching row")
                    }
                }
            }
            f.foldLine = this
        }
            ;
        this.containsRow = function (f) {
            return f >= this.start.row && f <= this.end.row
        }
            ;
        this.walk = function (p, g, k) {
            var f = 0, o = this.folds, l, m, n, j = true;
            if (g == null) {
                g = this.end.row;
                k = this.end.column
            }
            for (var h = 0; h < o.length; h++) {
                l = o[h];
                m = l.range.compareStart(g, k);
                if (m == -1) {
                    p(null, g, k, f, j);
                    return
                }
                n = p(null, l.start.row, l.start.column, f, j);
                n = !n && p(l.placeholder, l.start.row, l.start.column, f);
                if (n || m === 0) {
                    return
                }
                j = !l.sameRow;
                f = l.end.column
            }
            p(null, g, k, f, j)
        }
            ;
        this.getNextFoldTo = function (k, h) {
            var f, j;
            for (var g = 0; g < this.folds.length; g++) {
                f = this.folds[g];
                j = f.range.compareEnd(k, h);
                if (j == -1) {
                    return {
                        fold: f,
                        kind: "after"
                    }
                } else {
                    if (j === 0) {
                        return {
                            fold: f,
                            kind: "inside"
                        }
                    }
                }
            }
            return null
        }
            ;
        this.addRemoveChars = function (m, k, f) {
            var h = this.getNextFoldTo(m, k), g, l;
            if (h) {
                g = h.fold;
                if (h.kind == "inside" && g.start.column != k && g.start.row != m) {
                    window.console && window.console.log(m, k, g)
                } else {
                    if (g.start.row == m) {
                        l = this.folds;
                        var j = l.indexOf(g);
                        if (j === 0) {
                            this.start.column += f
                        }
                        for (j; j < l.length; j++) {
                            g = l[j];
                            g.start.column += f;
                            if (!g.sameRow) {
                                return
                            }
                            g.end.column += f
                        }
                        this.end.column += f
                    }
                }
            }
        }
            ;
        this.split = function (o, g) {
            var l = this.getNextFoldTo(o, g);
            if (!l || l.kind == "inside") {
                return null
            }
            var k = l.fold;
            var n = this.folds;
            var f = this.foldData;
            var h = n.indexOf(k);
            var m = n[h - 1];
            this.end.row = m.end.row;
            this.end.column = m.end.column;
            n = n.splice(h, n.length - h);
            var j = new e(f, n);
            f.splice(f.indexOf(this) + 1, 0, j);
            return j
        }
            ;
        this.merge = function (h) {
            var j = h.folds;
            for (var g = 0; g < j.length; g++) {
                this.addFold(j[g])
            }
            var f = this.foldData;
            f.splice(f.indexOf(h), 1)
        }
            ;
        this.toString = function () {
            var f = [this.range.toString() + ": ["];
            this.folds.forEach(function (g) {
                f.push("  " + g.toString())
            });
            f.push("]");
            return f.join("\n")
        }
            ;
        this.idxToPosition = function (f) {
            var j = 0;
            for (var h = 0; h < this.folds.length; h++) {
                var g = this.folds[h];
                f -= g.start.column - j;
                if (f < 0) {
                    return {
                        row: g.start.row,
                        column: g.start.column + f
                    }
                }
                f -= g.placeholder.length;
                if (f < 0) {
                    return g.start
                }
                j = g.end.column
            }
            return {
                row: this.end.row,
                column: this.end.column + f
            }
        }
    }
    ).call(e.prototype);
    a.FoldLine = e
});
define("ace/range_list", ["require", "exports", "module", "ace/range"], function (c, b, d) {
    var f = c("./range").Range;
    var e = f.comparePoints;
    var a = function () {
        this.ranges = []
    };
    (function () {
        this.comparePoints = e;
        this.pointIndex = function (o, j, n) {
            var l = this.ranges;
            for (var k = n || 0; k < l.length; k++) {
                var h = l[k];
                var m = e(o, h.end);
                if (m > 0) {
                    continue
                }
                var g = e(o, h.start);
                if (m === 0) {
                    return j && g !== 0 ? -k - 2 : k
                }
                if (g > 0 || (g === 0 && !j)) {
                    return k
                }
                return -k - 1
            }
            return -k - 1
        }
            ;
        this.add = function (h) {
            var g = !h.isEmpty();
            var j = this.pointIndex(h.start, g);
            if (j < 0) {
                j = -j - 1
            }
            var i = this.pointIndex(h.end, g, j);
            if (i < 0) {
                i = -i - 1
            } else {
                i++
            }
            return this.ranges.splice(j, i - j, h)
        }
            ;
        this.addList = function (h) {
            var j = [];
            for (var g = h.length; g--;) {
                j.push.call(j, this.add(h[g]))
            }
            return j
        }
            ;
        this.substractPoint = function (h) {
            var g = this.pointIndex(h);
            if (g >= 0) {
                return this.ranges.splice(g, 1)
            }
        }
            ;
        this.merge = function () {
            var m = [];
            var l = this.ranges;
            l = l.sort(function (n, i) {
                return e(n.start, i.start)
            });
            var j = l[0], g;
            for (var h = 1; h < l.length; h++) {
                g = j;
                j = l[h];
                var k = e(g.end, j.start);
                if (k < 0) {
                    continue
                }
                if (k == 0 && !g.isEmpty() && !j.isEmpty()) {
                    continue
                }
                if (e(g.end, j.end) < 0) {
                    g.end.row = j.end.row;
                    g.end.column = j.end.column
                }
                l.splice(h, 1);
                m.push(j);
                j = g;
                h--
            }
            this.ranges = l;
            return m
        }
            ;
        this.contains = function (h, g) {
            return this.pointIndex({
                row: h,
                column: g
            }) >= 0
        }
            ;
        this.containsPoint = function (g) {
            return this.pointIndex(g) >= 0
        }
            ;
        this.rangeAtPoint = function (h) {
            var g = this.pointIndex(h);
            if (g >= 0) {
                return this.ranges[g]
            }
        }
            ;
        this.clipRows = function (j, h) {
            var m = this.ranges;
            if (m[0].start.row > h || m[m.length - 1].start.row < j) {
                return []
            }
            var n = this.pointIndex({
                row: j,
                column: 0
            });
            if (n < 0) {
                n = -n - 1
            }
            var l = this.pointIndex({
                row: h,
                column: 0
            }, n);
            if (l < 0) {
                l = -l - 1
            }
            var g = [];
            for (var k = n; k < l; k++) {
                g.push(m[k])
            }
            return g
        }
            ;
        this.removeAll = function () {
            return this.ranges.splice(0, this.ranges.length)
        }
            ;
        this.attach = function (g) {
            if (this.session) {
                this.detach()
            }
            this.session = g;
            this.onChange = this.$onChange.bind(this);
            this.session.on("change", this.onChange)
        }
            ;
        this.detach = function () {
            if (!this.session) {
                return
            }
            this.session.removeListener("change", this.onChange);
            this.session = null
        }
            ;
        this.$onChange = function (s) {
            var l = s.data.range;
            if (s.data.action[0] == "i") {
                var j = l.start;
                var m = l.end
            } else {
                var m = l.start;
                var j = l.end
            }
            var u = j.row;
            var o = m.row;
            var t = o - u;
            var q = -j.column + m.column;
            var h = this.ranges;
            for (var p = 0, k = h.length; p < k; p++) {
                var g = h[p];
                if (g.end.row < u) {
                    continue
                }
                if (g.start.row > u) {
                    break
                }
                if (g.start.row == u && g.start.column >= j.column) {
                    if (g.start.column == j.column && this.$insertRight) { } else {
                        g.start.column += q;
                        g.start.row += t
                    }
                }
                if (g.end.row == u && g.end.column >= j.column) {
                    if (g.end.column == j.column && this.$insertRight) {
                        continue
                    }
                    if (g.end.column == j.column && q > 0 && p < k - 1) {
                        if (g.end.column > g.start.column && g.end.column == h[p + 1].start.column) {
                            g.end.column -= q
                        }
                    }
                    g.end.column += q;
                    g.end.row += t
                }
            }
            if (t != 0 && p < k) {
                for (; p < k; p++) {
                    var g = h[p];
                    g.start.row += t;
                    g.end.row += t
                }
            }
        }
    }
    ).call(a.prototype);
    b.RangeList = a
});
define("ace/edit_session/fold", ["require", "exports", "module", "ace/range", "ace/range_list", "ace/lib/oop"], function (d, f, a) {
    var c = d("../range").Range;
    var g = d("../range_list").RangeList;
    var h = d("../lib/oop");
    var j = f.Fold = function (l, m) {
        this.foldLine = null;
        this.placeholder = m;
        this.range = l;
        this.start = l.start;
        this.end = l.end;
        this.sameRow = l.start.row == l.end.row;
        this.subFolds = this.ranges = []
    }
        ;
    h.inherits(j, g);
    (function () {
        this.toString = function () {
            return '"' + this.placeholder + '" ' + this.range.toString()
        }
            ;
        this.setFoldLine = function (l) {
            this.foldLine = l;
            this.subFolds.forEach(function (m) {
                m.setFoldLine(l)
            })
        }
            ;
        this.clone = function () {
            var l = this.range.clone();
            var m = new j(l, this.placeholder);
            this.subFolds.forEach(function (n) {
                m.subFolds.push(n.clone())
            });
            m.collapseChildren = this.collapseChildren;
            return m
        }
            ;
        this.addSubFold = function (p) {
            if (this.range.isEqual(p)) {
                return
            }
            if (!this.range.containsRange(p)) {
                throw new Error("A fold can't intersect already existing fold" + p.range + this.range)
            }
            i(p, this.start);
            var t = p.start.row
                , l = p.start.column;
            for (var o = 0, r = -1; o < this.subFolds.length; o++) {
                r = this.subFolds[o].range.compare(t, l);
                if (r != 1) {
                    break
                }
            }
            var s = this.subFolds[o];
            if (r == 0) {
                return s.addSubFold(p)
            }
            var t = p.range.end.row
                , l = p.range.end.column;
            for (var m = o, r = -1; m < this.subFolds.length; m++) {
                r = this.subFolds[m].range.compare(t, l);
                if (r != 1) {
                    break
                }
            }
            var n = this.subFolds[m];
            if (r == 0) {
                throw new Error("A fold can't intersect already existing fold" + p.range + this.range)
            }
            var q = this.subFolds.splice(o, m - o, p);
            p.setFoldLine(this.foldLine);
            return p
        }
            ;
        this.restoreRange = function (l) {
            return k(l, this.start)
        }
    }
    ).call(j.prototype);
    function b(l, m) {
        l.row -= m.row;
        if (l.row == 0) {
            l.column -= m.column
        }
    }
    function i(l, m) {
        b(l.start, m);
        b(l.end, m)
    }
    function e(l, m) {
        if (l.row == 0) {
            l.column += m.column
        }
        l.row += m.row
    }
    function k(l, m) {
        e(l.start, m);
        e(l.end, m)
    }
});
define("ace/edit_session/folding", ["require", "exports", "module", "ace/range", "ace/edit_session/fold_line", "ace/edit_session/fold", "ace/token_iterator"], function (d, c, e) {
    var g = d("../range").Range;
    var h = d("./fold_line").FoldLine;
    var a = d("./fold").Fold;
    var f = d("../token_iterator").TokenIterator;
    function b() {
        this.getFoldAt = function (p, m, l) {
            var o = this.getFoldLine(p);
            if (!o) {
                return null
            }
            var n = o.folds;
            for (var k = 0; k < n.length; k++) {
                var j = n[k];
                if (j.range.contains(p, m)) {
                    if (l == 1 && j.range.isEnd(p, m)) {
                        continue
                    } else {
                        if (l == -1 && j.range.isStart(p, m)) {
                            continue
                        }
                    }
                    return j
                }
            }
        }
            ;
        this.getFoldsInRange = function (q) {
            var l = q.start;
            var n = q.end;
            var m = this.$foldData;
            var k = [];
            l.column += 1;
            n.column -= 1;
            for (var p = 0; p < m.length; p++) {
                var s = m[p].range.compareRange(q);
                if (s == 2) {
                    continue
                } else {
                    if (s == -2) {
                        break
                    }
                }
                var t = m[p].folds;
                for (var o = 0; o < t.length; o++) {
                    var r = t[o];
                    s = r.range.compareRange(q);
                    if (s == -2) {
                        break
                    } else {
                        if (s == 2) {
                            continue
                        } else {
                            if (s == 42) {
                                break
                            }
                        }
                    }
                    k.push(r)
                }
            }
            l.column -= 1;
            n.column += 1;
            return k
        }
            ;
        this.getFoldsInRangeList = function (i) {
            if (Array.isArray(i)) {
                var j = [];
                i.forEach(function (k) {
                    j = j.concat(this.getFoldsInRange(k))
                }, this)
            } else {
                var j = this.getFoldsInRange(i)
            }
            return j
        }
            ;
        this.getAllFolds = function () {
            var n = [];
            var m = this.$foldData;
            for (var l = 0; l < m.length; l++) {
                for (var k = 0; k < m[l].folds.length; k++) {
                    n.push(m[l].folds[k])
                }
            }
            return n
        }
            ;
        this.getFoldStringAt = function (r, k, j, q) {
            q = q || this.getFoldLine(r);
            if (!q) {
                return null
            }
            var m = {
                end: {
                    column: 0
                }
            };
            var o, n;
            for (var l = 0; l < q.folds.length; l++) {
                n = q.folds[l];
                var p = n.range.compareEnd(r, k);
                if (p == -1) {
                    o = this.getLine(n.start.row).substring(m.end.column, n.start.column);
                    break
                } else {
                    if (p === 0) {
                        return null
                    }
                }
                m = n
            }
            if (!o) {
                o = this.getLine(n.start.row).substring(m.end.column)
            }
            if (j == -1) {
                return o.substring(0, k - m.end.column)
            } else {
                if (j == 1) {
                    return o.substring(k - m.end.column)
                } else {
                    return o
                }
            }
        }
            ;
        this.getFoldLine = function (j, k) {
            var m = this.$foldData;
            var l = 0;
            if (k) {
                l = m.indexOf(k)
            }
            if (l == -1) {
                l = 0
            }
            for (l; l < m.length; l++) {
                var n = m[l];
                if (n.start.row <= j && n.end.row >= j) {
                    return n
                } else {
                    if (n.end.row > j) {
                        return null
                    }
                }
            }
            return null
        }
            ;
        this.getNextFoldLine = function (j, k) {
            var m = this.$foldData;
            var l = 0;
            if (k) {
                l = m.indexOf(k)
            }
            if (l == -1) {
                l = 0
            }
            for (l; l < m.length; l++) {
                var n = m[l];
                if (n.end.row >= j) {
                    return n
                }
            }
            return null
        }
            ;
        this.getFoldedRowCount = function (p, n) {
            var m = this.$foldData
                , k = n - p + 1;
            for (var l = 0; l < m.length; l++) {
                var o = m[l]
                    , j = o.end.row
                    , q = o.start.row;
                if (j >= n) {
                    if (q < n) {
                        if (q >= p) {
                            k -= n - q
                        } else {
                            k = 0
                        }
                    }
                    break
                } else {
                    if (j >= p) {
                        if (q >= p) {
                            k -= j - q
                        } else {
                            k -= j - p + 1
                        }
                    }
                }
            }
            return k
        }
            ;
        this.$addFoldLine = function (i) {
            this.$foldData.push(i);
            this.$foldData.sort(function (k, j) {
                return k.start.row - j.start.row
            });
            return i
        }
            ;
        this.addFold = function (t, n) {
            var j = this.$foldData;
            var r = false;
            var q;
            if (t instanceof a) {
                q = t
            } else {
                q = new a(n, t);
                q.collapseChildren = n.collapseChildren
            }
            this.$clipRangeToDocument(q.range);
            var w = q.start.row;
            var k = q.start.column;
            var l = q.end.row;
            var p = q.end.column;
            if (!(w < l || w == l && k <= p - 2)) {
                throw new Error("The range has to be at least 2 characters width")
            }
            var o = this.getFoldAt(w, k, 1);
            var v = this.getFoldAt(l, p, -1);
            if (o && v == o) {
                return o.addSubFold(q)
            }
            if (o && !o.range.isStart(w, k)) {
                this.removeFold(o)
            }
            if (v && !v.range.isEnd(l, p)) {
                this.removeFold(v)
            }
            var u = this.getFoldsInRange(q.range);
            if (u.length > 0) {
                this.removeFolds(u);
                u.forEach(function (i) {
                    q.addSubFold(i)
                })
            }
            for (var m = 0; m < j.length; m++) {
                var s = j[m];
                if (l == s.start.row) {
                    s.addFold(q);
                    r = true;
                    break
                } else {
                    if (w == s.end.row) {
                        s.addFold(q);
                        r = true;
                        if (!q.sameRow) {
                            var x = j[m + 1];
                            if (x && x.start.row == l) {
                                s.merge(x);
                                break
                            }
                        }
                        break
                    } else {
                        if (l <= s.start.row) {
                            break
                        }
                    }
                }
            }
            if (!r) {
                s = this.$addFoldLine(new h(this.$foldData, q))
            }
            if (this.$useWrapMode) {
                this.$updateWrapData(s.start.row, s.start.row)
            } else {
                this.$updateRowLengthCache(s.start.row, s.start.row)
            }
            this.$modified = true;
            this._emit("changeFold", {
                data: q,
                action: "add"
            });
            return q
        }
            ;
        this.addFolds = function (i) {
            i.forEach(function (j) {
                this.addFold(j)
            }, this)
        }
            ;
        this.removeFold = function (l) {
            var o = l.foldLine;
            var k = o.start.row;
            var j = o.end.row;
            var m = this.$foldData;
            var n = o.folds;
            if (n.length == 1) {
                m.splice(m.indexOf(o), 1)
            } else {
                if (o.range.isEnd(l.end.row, l.end.column)) {
                    n.pop();
                    o.end.row = n[n.length - 1].end.row;
                    o.end.column = n[n.length - 1].end.column
                } else {
                    if (o.range.isStart(l.start.row, l.start.column)) {
                        n.shift();
                        o.start.row = n[0].start.row;
                        o.start.column = n[0].start.column
                    } else {
                        if (l.sameRow) {
                            n.splice(n.indexOf(l), 1)
                        } else {
                            var i = o.split(l.start.row, l.start.column);
                            n = i.folds;
                            n.shift();
                            i.start.row = n[0].start.row;
                            i.start.column = n[0].start.column
                        }
                    }
                }
            }
            if (!this.$updating) {
                if (this.$useWrapMode) {
                    this.$updateWrapData(k, j)
                } else {
                    this.$updateRowLengthCache(k, j)
                }
            }
            this.$modified = true;
            this._emit("changeFold", {
                data: l,
                action: "remove"
            })
        }
            ;
        this.removeFolds = function (l) {
            var j = [];
            for (var k = 0; k < l.length; k++) {
                j.push(l[k])
            }
            j.forEach(function (i) {
                this.removeFold(i)
            }, this);
            this.$modified = true
        }
            ;
        this.expandFold = function (i) {
            this.removeFold(i);
            i.subFolds.forEach(function (j) {
                i.restoreRange(j);
                this.addFold(j)
            }, this);
            if (i.collapseChildren > 0) {
                this.foldAll(i.start.row + 1, i.end.row, i.collapseChildren - 1)
            }
            i.subFolds = []
        }
            ;
        this.expandFolds = function (i) {
            i.forEach(function (j) {
                this.expandFold(j)
            }, this)
        }
            ;
        this.unfold = function (i, k) {
            var j, m;
            if (i == null) {
                j = new g(0, 0, this.getLength(), 0);
                k = true
            } else {
                if (typeof i == "number") {
                    j = new g(i, 0, i, this.getLine(i).length)
                } else {
                    if ("row" in i) {
                        j = g.fromPoints(i, i)
                    } else {
                        j = i
                    }
                }
            }
            m = this.getFoldsInRangeList(j);
            if (k) {
                this.removeFolds(m)
            } else {
                var l = m;
                while (l.length) {
                    this.expandFolds(l);
                    l = this.getFoldsInRangeList(j)
                }
            }
            if (m.length) {
                return m
            }
        }
            ;
        this.isRowFolded = function (i, j) {
            return !!this.getFoldLine(i, j)
        }
            ;
        this.getRowFoldEnd = function (i, j) {
            var k = this.getFoldLine(i, j);
            return k ? k.end.row : i
        }
            ;
        this.getRowFoldStart = function (i, j) {
            var k = this.getFoldLine(i, j);
            return k ? k.start.row : i
        }
            ;
        this.getFoldDisplayLine = function (n, j, o, i, l) {
            if (i == null) {
                i = n.start.row
            }
            if (l == null) {
                l = 0
            }
            if (j == null) {
                j = n.end.row
            }
            if (o == null) {
                o = this.getLine(j).length
            }
            var m = this.doc;
            var k = "";
            n.walk(function (s, r, q, p) {
                if (r < i) {
                    return
                }
                if (r == i) {
                    if (q < l) {
                        return
                    }
                    p = Math.max(l, p)
                }
                if (s != null) {
                    k += s
                } else {
                    k += m.getLine(r).substring(p, q)
                }
            }, j, o);
            return k
        }
            ;
        this.getDisplayLine = function (m, n, j, k) {
            var l = this.getFoldLine(m);
            if (!l) {
                var i;
                i = this.doc.getLine(m);
                return i.substring(k || 0, n || i.length)
            } else {
                return this.getFoldDisplayLine(l, m, n, j, k)
            }
        }
            ;
        this.$cloneFoldData = function () {
            var i = [];
            i = this.$foldData.map(function (k) {
                var j = k.folds.map(function (l) {
                    return l.clone()
                });
                return new h(i, j)
            });
            return i
        }
            ;
        this.toggleFold = function (k) {
            var l = this.selection;
            var i = l.getRange();
            var j;
            var p;
            if (i.isEmpty()) {
                var o = i.start;
                j = this.getFoldAt(o.row, o.column);
                if (j) {
                    this.expandFold(j);
                    return
                } else {
                    if (p = this.findMatchingBracket(o)) {
                        if (i.comparePoint(p) == 1) {
                            i.end = p
                        } else {
                            i.start = p;
                            i.start.column++;
                            i.end.column--
                        }
                    } else {
                        if (p = this.findMatchingBracket({
                            row: o.row,
                            column: o.column + 1
                        })) {
                            if (i.comparePoint(p) == 1) {
                                i.end = p
                            } else {
                                i.start = p
                            }
                            i.start.column++
                        } else {
                            i = this.getCommentFoldRange(o.row, o.column) || i
                        }
                    }
                }
            } else {
                var m = this.getFoldsInRange(i);
                if (k && m.length) {
                    this.expandFolds(m);
                    return
                } else {
                    if (m.length == 1) {
                        j = m[0]
                    }
                }
            }
            if (!j) {
                j = this.getFoldAt(i.start.row, i.start.column)
            }
            if (j && j.range.toString() == i.toString()) {
                this.expandFold(j);
                return
            }
            var n = "...";
            if (!i.isMultiLine()) {
                n = this.getTextRange(i);
                if (n.length < 4) {
                    return
                }
                n = n.trim().substring(0, 2) + ".."
            }
            this.addFold(n, i)
        }
            ;
        this.getCommentFoldRange = function (o, n, j) {
            var m = new f(this, o, n);
            var k = m.getCurrentToken();
            if (k && /^comment|string/.test(k.type)) {
                var i = new g();
                var l = new RegExp(k.type.replace(/\..*/, "\\."));
                if (j != 1) {
                    do {
                        k = m.stepBackward()
                    } while (k && l.test(k.type));
                    m.stepForward()
                }
                i.start.row = m.getCurrentTokenRow();
                i.start.column = m.getCurrentTokenColumn() + 2;
                m = new f(this, o, n);
                if (j != -1) {
                    do {
                        k = m.stepForward()
                    } while (k && l.test(k.type));
                    k = m.stepBackward()
                } else {
                    k = m.getCurrentToken()
                }
                i.end.row = m.getCurrentTokenRow();
                i.end.column = m.getCurrentTokenColumn() + k.value.length - 2;
                return i
            }
        }
            ;
        this.foldAll = function (k, j, p) {
            if (p == undefined) {
                p = 100000
            }
            var m = this.foldWidgets;
            if (!m) {
                return
            }
            j = j || this.getLength();
            k = k || 0;
            for (var o = k; o < j; o++) {
                if (m[o] == null) {
                    m[o] = this.getFoldWidget(o)
                }
                if (m[o] != "start") {
                    continue
                }
                var i = this.getFoldWidgetRange(o);
                if (i && i.isMultiLine() && i.end.row <= j && i.start.row >= k) {
                    o = i.end.row;
                    try {
                        var l = this.addFold("...", i);
                        if (l) {
                            l.collapseChildren = p
                        }
                    } catch (n) { }
                }
            }
        }
            ;
        this.$foldStyles = {
            manual: 1,
            markbegin: 1,
            markbeginend: 1
        };
        this.$foldStyle = "markbegin";
        this.setFoldStyle = function (i) {
            if (!this.$foldStyles[i]) {
                throw new Error("invalid fold style: " + i + "[" + Object.keys(this.$foldStyles).join(", ") + "]")
            }
            if (this.$foldStyle == i) {
                return
            }
            this.$foldStyle = i;
            if (i == "manual") {
                this.unfold()
            }
            var j = this.$foldMode;
            this.$setFolding(null);
            this.$setFolding(j)
        }
            ;
        this.$setFolding = function (i) {
            if (this.$foldMode == i) {
                return
            }
            this.$foldMode = i;
            this.off("change", this.$updateFoldWidgets);
            this.off("tokenizerUpdate", this.$tokenizerUpdateFoldWidgets);
            this._emit("changeAnnotation");
            if (!i || this.$foldStyle == "manual") {
                this.foldWidgets = null;
                return
            }
            this.foldWidgets = [];
            this.getFoldWidget = i.getFoldWidget.bind(i, this, this.$foldStyle);
            this.getFoldWidgetRange = i.getFoldWidgetRange.bind(i, this, this.$foldStyle);
            this.$updateFoldWidgets = this.updateFoldWidgets.bind(this);
            this.$tokenizerUpdateFoldWidgets = this.tokenizerUpdateFoldWidgets.bind(this);
            this.on("change", this.$updateFoldWidgets);
            this.on("tokenizerUpdate", this.$tokenizerUpdateFoldWidgets)
        }
            ;
        this.getParentFoldRangeData = function (o, l) {
            var n = this.foldWidgets;
            if (!n || (l && n[o])) {
                return {}
            }
            var m = o - 1, j;
            while (m >= 0) {
                var p = n[m];
                if (p == null) {
                    p = n[m] = this.getFoldWidget(m)
                }
                if (p == "start") {
                    var k = this.getFoldWidgetRange(m);
                    if (!j) {
                        j = k
                    }
                    if (k && k.end.row >= o) {
                        break
                    }
                }
                m--
            }
            return {
                range: m !== -1 && k,
                firstRange: j
            }
        }
            ;
        this.onFoldWidgetClick = function (m, l) {
            l = l.domEvent;
            var j = {
                children: l.shiftKey,
                all: l.ctrlKey || l.metaKey,
                siblings: l.altKey
            };
            var i = this.$toggleFoldWidget(m, j);
            if (!i) {
                var k = (l.target || l.srcElement);
                if (k && /ace_fold-widget/.test(k.className)) {
                    k.className += " ace_invalid"
                }
            }
        }
            ;
        this.$toggleFoldWidget = function (p, q) {
            if (!this.getFoldWidget) {
                return
            }
            var n = this.getFoldWidget(p);
            var r = this.getLine(p);
            var i = n === "end" ? -1 : 1;
            var m = this.getFoldAt(p, i === -1 ? 0 : r.length, i);
            if (m) {
                if (q.children || q.all) {
                    this.removeFold(m)
                } else {
                    this.expandFold(m)
                }
                return
            }
            var l = this.getFoldWidgetRange(p, true);
            if (l && !l.isMultiLine()) {
                m = this.getFoldAt(l.start.row, l.start.column, 1);
                if (m && l.isEqual(m.range)) {
                    this.removeFold(m);
                    return
                }
            }
            if (q.siblings) {
                var k = this.getParentFoldRangeData(p);
                if (k.range) {
                    var o = k.range.start.row + 1;
                    var j = k.range.end.row
                }
                this.foldAll(o, j, q.all ? 10000 : 0)
            } else {
                if (q.children) {
                    j = l ? l.end.row : this.getLength();
                    this.foldAll(p + 1, j, q.all ? 10000 : 0)
                } else {
                    if (l) {
                        if (q.all) {
                            l.collapseChildren = 10000
                        }
                        this.addFold("...", l)
                    }
                }
            }
            return l
        }
            ;
        this.toggleFoldWidget = function (m) {
            var l = this.selection.getCursor().row;
            l = this.getRowFoldStart(l);
            var i = this.$toggleFoldWidget(l, {});
            if (i) {
                return
            }
            var k = this.getParentFoldRangeData(l, true);
            i = k.range || k.firstRange;
            if (i) {
                l = i.start.row;
                var j = this.getFoldAt(l, this.getLine(l).length, 1);
                if (j) {
                    this.removeFold(j)
                } else {
                    this.addFold("...", i)
                }
            }
        }
            ;
        this.updateFoldWidgets = function (l) {
            var n = l.data;
            var j = n.range;
            var m = j.start.row;
            var i = j.end.row - m;
            if (i === 0) {
                this.foldWidgets[m] = null
            } else {
                if (n.action == "removeText" || n.action == "removeLines") {
                    this.foldWidgets.splice(m, i + 1, null)
                } else {
                    var k = Array(i + 1);
                    k.unshift(m, 1);
                    this.foldWidgets.splice.apply(this.foldWidgets, k)
                }
            }
        }
            ;
        this.tokenizerUpdateFoldWidgets = function (j) {
            var i = j.data;
            if (i.first != i.last) {
                if (this.foldWidgets.length > i.first) {
                    this.foldWidgets.splice(i.first, this.foldWidgets.length)
                }
            }
        }
    }
    c.Folding = b
});
define("ace/edit_session/bracket_match", ["require", "exports", "module", "ace/token_iterator", "ace/range"], function (c, b, d) {
    var e = c("../token_iterator").TokenIterator;
    var f = c("../range").Range;
    function a() {
        this.findMatchingBracket = function (g, i) {
            if (g.column == 0) {
                return null
            }
            var j = i || this.getLine(g.row).charAt(g.column - 1);
            if (j == "") {
                return null
            }
            var h = j.match(/([\(\[\{])|([\)\]\}])/);
            if (!h) {
                return null
            }
            if (h[1]) {
                return this.$findClosingBracket(h[1], g)
            } else {
                return this.$findOpeningBracket(h[2], g)
            }
        }
            ;
        this.getBracketRange = function (m) {
            var g = this.getLine(m.row);
            var k = true, h;
            var j = g.charAt(m.column - 1);
            var i = j && j.match(/([\(\[\{])|([\)\]\}])/);
            if (!i) {
                j = g.charAt(m.column);
                m = {
                    row: m.row,
                    column: m.column + 1
                };
                i = j && j.match(/([\(\[\{])|([\)\]\}])/);
                k = false
            }
            if (!i) {
                return null
            }
            if (i[1]) {
                var l = this.$findClosingBracket(i[1], m);
                if (!l) {
                    return null
                }
                h = f.fromPoints(m, l);
                if (!k) {
                    h.end.column++;
                    h.start.column--
                }
                h.cursor = h.end
            } else {
                var l = this.$findOpeningBracket(i[2], m);
                if (!l) {
                    return null
                }
                h = f.fromPoints(l, m);
                if (!k) {
                    h.start.column++;
                    h.end.column--
                }
                h.cursor = h.start
            }
            return h
        }
            ;
        this.$brackets = {
            ")": "(",
            "(": ")",
            "]": "[",
            "[": "]",
            "{": "}",
            "}": "{"
        };
        this.$findOpeningBracket = function (g, m, p) {
            var j = this.$brackets[g];
            var k = 1;
            var l = new e(this, m.row, m.column);
            var h = l.getCurrentToken();
            if (!h) {
                h = l.stepForward()
            }
            if (!h) {
                return
            }
            if (!p) {
                p = new RegExp("(\\.?" + h.type.replace(".", "\\.").replace("rparen", ".paren").replace(/\b(?:end)\b/, "(?:start|begin|end)") + ")+")
            }
            var n = m.column - l.getCurrentTokenColumn() - 2;
            var o = h.value;
            while (true) {
                while (n >= 0) {
                    var i = o.charAt(n);
                    if (i == j) {
                        k -= 1;
                        if (k == 0) {
                            return {
                                row: l.getCurrentTokenRow(),
                                column: n + l.getCurrentTokenColumn()
                            }
                        }
                    } else {
                        if (i == g) {
                            k += 1
                        }
                    }
                    n -= 1
                }
                do {
                    h = l.stepBackward()
                } while (h && !p.test(h.type));
                if (h == null) {
                    break
                }
                o = h.value;
                n = o.length - 1
            }
            return null
        }
            ;
        this.$findClosingBracket = function (g, m, q) {
            var h = this.$brackets[g];
            var k = 1;
            var l = new e(this, m.row, m.column);
            var i = l.getCurrentToken();
            if (!i) {
                i = l.stepForward()
            }
            if (!i) {
                return
            }
            if (!q) {
                q = new RegExp("(\\.?" + i.type.replace(".", "\\.").replace("lparen", ".paren").replace(/\b(?:start|begin)\b/, "(?:start|begin|end)") + ")+")
            }
            var n = m.column - l.getCurrentTokenColumn();
            while (true) {
                var o = i.value;
                var p = o.length;
                while (n < p) {
                    var j = o.charAt(n);
                    if (j == h) {
                        k -= 1;
                        if (k == 0) {
                            return {
                                row: l.getCurrentTokenRow(),
                                column: n + l.getCurrentTokenColumn()
                            }
                        }
                    } else {
                        if (j == g) {
                            k += 1
                        }
                    }
                    n += 1
                }
                do {
                    i = l.stepForward()
                } while (i && !q.test(i.type));
                if (i == null) {
                    break
                }
                n = 0
            }
            return null
        }
    }
    b.BracketMatch = a
});
define("ace/edit_session", ["require", "exports", "module", "ace/lib/oop", "ace/lib/lang", "ace/config", "ace/lib/event_emitter", "ace/selection", "ace/mode/text", "ace/range", "ace/document", "ace/background_tokenizer", "ace/search_highlight", "ace/edit_session/folding", "ace/edit_session/bracket_match"], function (g, i, c) {
    var l = g("./lib/oop");
    var b = g("./lib/lang");
    var e = g("./config");
    var m = g("./lib/event_emitter").EventEmitter;
    var n = g("./selection").Selection;
    var h = g("./mode/text").Mode;
    var f = g("./range").Range;
    var j = g("./document").Document;
    var d = g("./background_tokenizer").BackgroundTokenizer;
    var k = g("./search_highlight").SearchHighlight;
    var a = function (p, o) {
        this.$breakpoints = [];
        this.$decorations = [];
        this.$frontMarkers = {};
        this.$backMarkers = {};
        this.$markerId = 1;
        this.$undoSelect = true;
        this.$foldData = [];
        this.$foldData.toString = function () {
            return this.join("\n")
        }
            ;
        this.on("changeFold", this.onChangeFold.bind(this));
        this.$onChange = this.onChange.bind(this);
        if (typeof p != "object" || !p.getLine) {
            p = new j(p)
        }
        this.setDocument(p);
        this.selection = new n(this);
        e.resetOptions(this);
        this.setMode(o);
        e._signal("session", this)
    };
    (function () {
        l.implement(this, m);
        this.setDocument = function (x) {
            if (this.doc) {
                this.doc.removeListener("change", this.$onChange)
            }
            this.doc = x;
            x.on("change", this.$onChange);
            if (this.bgTokenizer) {
                this.bgTokenizer.setDocument(this.getDocument())
            }
            this.resetCaches()
        }
            ;
        this.getDocument = function () {
            return this.doc
        }
            ;
        this.$resetRowCache = function (y) {
            if (!y) {
                this.$docRowCache = [];
                this.$screenRowCache = [];
                return
            }
            var x = this.$docRowCache.length;
            var z = this.$getRowCacheIndex(this.$docRowCache, y) + 1;
            if (x > z) {
                this.$docRowCache.splice(z, x);
                this.$screenRowCache.splice(z, x)
            }
        }
            ;
        this.$getRowCacheIndex = function (y, B) {
            var x = 0;
            var A = y.length - 1;
            while (x <= A) {
                var z = (x + A) >> 1;
                var C = y[z];
                if (B > C) {
                    x = z + 1
                } else {
                    if (B < C) {
                        A = z - 1
                    } else {
                        return z
                    }
                }
            }
            return x - 1
        }
            ;
        this.resetCaches = function () {
            this.$modified = true;
            this.$wrapData = [];
            this.$rowLengthCache = [];
            this.$resetRowCache(0);
            if (this.bgTokenizer) {
                this.bgTokenizer.start(0)
            }
        }
            ;
        this.onChangeFold = function (y) {
            var x = y.data;
            this.$resetRowCache(x.start.row)
        }
            ;
        this.onChange = function (y) {
            var z = y.data;
            this.$modified = true;
            this.$resetRowCache(z.range.start.row);
            var x = this.$updateInternalDataOnChange(y);
            if (!this.$fromUndo && this.$undoManager && !z.ignore) {
                this.$deltasDoc.push(z);
                if (x && x.length != 0) {
                    this.$deltasFold.push({
                        action: "removeFolds",
                        folds: x
                    })
                }
                this.$informUndoManager.schedule()
            }
            this.bgTokenizer && this.bgTokenizer.$updateOnChange(z);
            this._signal("change", y)
        }
            ;
        this.setValue = function (x) {
            this.doc.setValue(x);
            this.selection.moveTo(0, 0);
            this.$resetRowCache(0);
            this.$deltas = [];
            this.$deltasDoc = [];
            this.$deltasFold = [];
            this.setUndoManager(this.$undoManager);
            this.getUndoManager().reset()
        }
            ;
        this.getValue = this.toString = function () {
            return this.doc.getValue()
        }
            ;
        this.getSelection = function () {
            return this.selection
        }
            ;
        this.getState = function (x) {
            return this.bgTokenizer.getState(x)
        }
            ;
        this.getTokens = function (x) {
            return this.bgTokenizer.getTokens(x)
        }
            ;
        this.getTokenAt = function (B, z) {
            var A = this.bgTokenizer.getTokens(B);
            var y, C = 0;
            if (z == null) {
                x = A.length - 1;
                C = this.getLine(B).length
            } else {
                for (var x = 0; x < A.length; x++) {
                    C += A[x].value.length;
                    if (C >= z) {
                        break
                    }
                }
            }
            y = A[x];
            if (!y) {
                return null
            }
            y.index = x;
            y.start = C - y.value.length;
            return y
        }
            ;
        this.setUndoManager = function (y) {
            this.$undoManager = y;
            this.$deltas = [];
            this.$deltasDoc = [];
            this.$deltasFold = [];
            if (this.$informUndoManager) {
                this.$informUndoManager.cancel()
            }
            if (y) {
                var x = this;
                this.$syncInformUndoManager = function () {
                    x.$informUndoManager.cancel();
                    if (x.$deltasFold.length) {
                        x.$deltas.push({
                            group: "fold",
                            deltas: x.$deltasFold
                        });
                        x.$deltasFold = []
                    }
                    if (x.$deltasDoc.length) {
                        x.$deltas.push({
                            group: "doc",
                            deltas: x.$deltasDoc
                        });
                        x.$deltasDoc = []
                    }
                    if (x.$deltas.length > 0) {
                        y.execute({
                            action: "aceupdate",
                            args: [x.$deltas, x],
                            merge: x.mergeUndoDeltas
                        })
                    }
                    x.mergeUndoDeltas = false;
                    x.$deltas = []
                }
                    ;
                this.$informUndoManager = b.delayedCall(this.$syncInformUndoManager)
            }
        }
            ;
        this.markUndoGroup = function () {
            if (this.$syncInformUndoManager) {
                this.$syncInformUndoManager()
            }
        }
            ;
        this.$defaultUndoManager = {
            undo: function () { },
            redo: function () { },
            reset: function () { }
        };
        this.getUndoManager = function () {
            return this.$undoManager || this.$defaultUndoManager
        }
            ;
        this.getTabString = function () {
            if (this.getUseSoftTabs()) {
                return b.stringRepeat(" ", this.getTabSize())
            } else {
                return "\t"
            }
        }
            ;
        this.setUseSoftTabs = function (x) {
            this.setOption("useSoftTabs", x)
        }
            ;
        this.getUseSoftTabs = function () {
            return this.$useSoftTabs && !this.$mode.$indentWithTabs
        }
            ;
        this.setTabSize = function (x) {
            this.setOption("tabSize", x)
        }
            ;
        this.getTabSize = function () {
            return this.$tabSize
        }
            ;
        this.isTabStop = function (x) {
            return this.$useSoftTabs && (x.column % this.$tabSize === 0)
        }
            ;
        this.$overwrite = false;
        this.setOverwrite = function (x) {
            this.setOption("overwrite", x)
        }
            ;
        this.getOverwrite = function () {
            return this.$overwrite
        }
            ;
        this.toggleOverwrite = function () {
            this.setOverwrite(!this.$overwrite)
        }
            ;
        this.addGutterDecoration = function (y, x) {
            if (!this.$decorations[y]) {
                this.$decorations[y] = ""
            }
            this.$decorations[y] += " " + x;
            this._signal("changeBreakpoint", {})
        }
            ;
        this.removeGutterDecoration = function (y, x) {
            this.$decorations[y] = (this.$decorations[y] || "").replace(" " + x, "");
            this._signal("changeBreakpoint", {})
        }
            ;
        this.getBreakpoints = function () {
            return this.$breakpoints
        }
            ;
        this.setBreakpoints = function (y) {
            this.$breakpoints = [];
            for (var x = 0; x < y.length; x++) {
                this.$breakpoints[y[x]] = "ace_breakpoint"
            }
            this._signal("changeBreakpoint", {})
        }
            ;
        this.clearBreakpoints = function () {
            this.$breakpoints = [];
            this._signal("changeBreakpoint", {})
        }
            ;
        this.setBreakpoint = function (y, x) {
            if (x === undefined) {
                x = "ace_breakpoint"
            }
            if (x) {
                this.$breakpoints[y] = x
            } else {
                delete this.$breakpoints[y]
            }
            this._signal("changeBreakpoint", {})
        }
            ;
        this.clearBreakpoint = function (x) {
            delete this.$breakpoints[x];
            this._signal("changeBreakpoint", {})
        }
            ;
        this.addMarker = function (z, A, B, y) {
            var C = this.$markerId++;
            var x = {
                range: z,
                type: B || "line",
                renderer: typeof B == "function" ? B : null,
                clazz: A,
                inFront: !!y,
                id: C
            };
            if (y) {
                this.$frontMarkers[C] = x;
                this._signal("changeFrontMarker")
            } else {
                this.$backMarkers[C] = x;
                this._signal("changeBackMarker")
            }
            return C
        }
            ;
        this.addDynamicMarker = function (x, y) {
            if (!x.update) {
                return
            }
            var z = this.$markerId++;
            x.id = z;
            x.inFront = !!y;
            if (y) {
                this.$frontMarkers[z] = x;
                this._signal("changeFrontMarker")
            } else {
                this.$backMarkers[z] = x;
                this._signal("changeBackMarker")
            }
            return x
        }
            ;
        this.removeMarker = function (y) {
            var x = this.$frontMarkers[y] || this.$backMarkers[y];
            if (!x) {
                return
            }
            var z = x.inFront ? this.$frontMarkers : this.$backMarkers;
            if (x) {
                delete (z[y]);
                this._signal(x.inFront ? "changeFrontMarker" : "changeBackMarker")
            }
        }
            ;
        this.getMarkers = function (x) {
            return x ? this.$frontMarkers : this.$backMarkers
        }
            ;
        this.highlight = function (y) {
            if (!this.$searchHighlight) {
                var x = new k(null, "ace_selected-word", "text");
                this.$searchHighlight = this.addDynamicMarker(x)
            }
            this.$searchHighlight.setRegexp(y)
        }
            ;
        this.highlightLines = function (A, z, B, y) {
            if (typeof z != "number") {
                B = z;
                z = A
            }
            if (!B) {
                B = "ace_step"
            }
            var x = new f(A, 0, z, Infinity);
            x.id = this.addMarker(x, B, "fullLine", y);
            return x
        }
            ;
        this.setAnnotations = function (x) {
            this.$annotations = x;
            this._signal("changeAnnotation", {})
        }
            ;
        this.getAnnotations = function () {
            return this.$annotations || []
        }
            ;
        this.clearAnnotations = function () {
            this.setAnnotations([])
        }
            ;
        this.$detectNewLine = function (y) {
            var x = y.match(/^.*?(\r?\n)/m);
            if (x) {
                this.$autoNewLine = x[1]
            } else {
                this.$autoNewLine = "\n"
            }
        }
            ;
        this.getWordRange = function (C, B) {
            var z = this.getLine(C);
            var x = false;
            if (B > 0) {
                x = !!z.charAt(B - 1).match(this.tokenRe)
            }
            if (!x) {
                x = !!z.charAt(B).match(this.tokenRe)
            }
            if (x) {
                var A = this.tokenRe
            } else {
                if (/^\s+$/.test(z.slice(B - 1, B + 1))) {
                    var A = /\s/
                } else {
                    var A = this.nonTokenRe
                }
            }
            var D = B;
            if (D > 0) {
                do {
                    D--
                } while (D >= 0 && z.charAt(D).match(A));
                D++
            }
            var y = B;
            while (y < z.length && z.charAt(y).match(A)) {
                y++
            }
            return new f(C, D, C, y)
        }
            ;
        this.getAWordRange = function (z, y) {
            var A = this.getWordRange(z, y);
            var x = this.getLine(A.end.row);
            while (x.charAt(A.end.column).match(/[ \t]/)) {
                A.end.column += 1
            }
            return A
        }
            ;
        this.setNewLineMode = function (x) {
            this.doc.setNewLineMode(x)
        }
            ;
        this.getNewLineMode = function () {
            return this.doc.getNewLineMode()
        }
            ;
        this.setUseWorker = function (x) {
            this.setOption("useWorker", x)
        }
            ;
        this.getUseWorker = function () {
            return this.$useWorker
        }
            ;
        this.onReloadTokenizer = function (y) {
            var x = y.data;
            this.bgTokenizer.start(x.first);
            this._signal("tokenizerUpdate", y)
        }
            ;
        this.$modes = {};
        this.$mode = null;
        this.$modeId = null;
        this.setMode = function (A, x) {
            if (A && typeof A === "object") {
                if (A.getTokenizer) {
                    return this.$onChangeMode(A)
                }
                var y = A;
                var z = y.path
            } else {
                z = A || "ace/mode/text"
            }
            if (!this.$modes["ace/mode/text"]) {
                this.$modes["ace/mode/text"] = new h()
            }
            if (this.$modes[z] && !y) {
                this.$onChangeMode(this.$modes[z]);
                x && x();
                return
            }
            this.$modeId = z;
            e.loadModule(["mode", z], function (B) {
                if (this.$modeId !== z) {
                    return x && x()
                }
                if (this.$modes[z] && !y) {
                    this.$onChangeMode(this.$modes[z])
                } else {
                    if (B && B.Mode) {
                        B = new B.Mode(y);
                        if (!y) {
                            this.$modes[z] = B;
                            B.$id = z
                        }
                        this.$onChangeMode(B)
                    }
                }
                x && x()
            }
                .bind(this));
            if (!this.$mode) {
                this.$onChangeMode(this.$modes["ace/mode/text"], true)
            }
        }
            ;
        this.$onChangeMode = function (A, B) {
            if (!B) {
                this.$modeId = A.$id
            }
            if (this.$mode === A) {
                return
            }
            this.$mode = A;
            this.$stopWorker();
            if (this.$useWorker) {
                this.$startWorker()
            }
            var z = A.getTokenizer();
            if (z.addEventListener !== undefined) {
                var y = this.onReloadTokenizer.bind(this);
                z.addEventListener("update", y)
            }
            if (!this.bgTokenizer) {
                this.bgTokenizer = new d(z);
                var x = this;
                this.bgTokenizer.addEventListener("update", function (C) {
                    x._signal("tokenizerUpdate", C)
                })
            } else {
                this.bgTokenizer.setTokenizer(z)
            }
            this.bgTokenizer.setDocument(this.getDocument());
            this.tokenRe = A.tokenRe;
            this.nonTokenRe = A.nonTokenRe;
            if (!B) {
                if (A.attachToSession) {
                    A.attachToSession(this)
                }
                this.$options.wrapMethod.set.call(this, this.$wrapMethod);
                this.$setFolding(A.foldingRules);
                this.bgTokenizer.start(0);
                this._emit("changeMode")
            }
        }
            ;
        this.$stopWorker = function () {
            if (this.$worker) {
                this.$worker.terminate();
                this.$worker = null
            }
        }
            ;
        this.$startWorker = function () {
            try {
                this.$worker = this.$mode.createWorker(this)
            } catch (x) {
                e.warn("Could not load worker", x);
                this.$worker = null
            }
        }
            ;
        this.getMode = function () {
            return this.$mode
        }
            ;
        this.$scrollTop = 0;
        this.setScrollTop = function (x) {
            if (this.$scrollTop === x || isNaN(x)) {
                return
            }
            this.$scrollTop = x;
            this._signal("changeScrollTop", x)
        }
            ;
        this.getScrollTop = function () {
            return this.$scrollTop
        }
            ;
        this.$scrollLeft = 0;
        this.setScrollLeft = function (x) {
            if (this.$scrollLeft === x || isNaN(x)) {
                return
            }
            this.$scrollLeft = x;
            this._signal("changeScrollLeft", x)
        }
            ;
        this.getScrollLeft = function () {
            return this.$scrollLeft
        }
            ;
        this.getScreenWidth = function () {
            this.$computeWidth();
            if (this.lineWidgets) {
                return Math.max(this.getLineWidgetMaxWidth(), this.screenWidth)
            }
            return this.screenWidth
        }
            ;
        this.getLineWidgetMaxWidth = function () {
            if (this.lineWidgetsWidth != null) {
                return this.lineWidgetsWidth
            }
            var x = 0;
            this.lineWidgets.forEach(function (y) {
                if (y && y.screenWidth > x) {
                    x = y.screenWidth
                }
            });
            return this.lineWidgetWidth = x
        }
            ;
        this.$computeWidth = function (y) {
            if (this.$modified || y) {
                this.$modified = false;
                if (this.$useWrapMode) {
                    return this.screenWidth = this.$wrapLimit
                }
                var F = this.doc.getAllLines();
                var x = this.$rowLengthCache;
                var z = 0;
                var E = 0;
                var D = this.$foldData[E];
                var B = D ? D.start.row : Infinity;
                var C = F.length;
                for (var A = 0; A < C; A++) {
                    if (A > B) {
                        A = D.end.row + 1;
                        if (A >= C) {
                            break
                        }
                        D = this.$foldData[E++];
                        B = D ? D.start.row : Infinity
                    }
                    if (x[A] == null) {
                        x[A] = this.$getStringScreenWidth(F[A])[0]
                    }
                    if (x[A] > z) {
                        z = x[A]
                    }
                }
                this.screenWidth = z
            }
        }
            ;
        this.getLine = function (x) {
            return this.doc.getLine(x)
        }
            ;
        this.getLines = function (y, x) {
            return this.doc.getLines(y, x)
        }
            ;
        this.getLength = function () {
            return this.doc.getLength()
        }
            ;
        this.getTextRange = function (x) {
            return this.doc.getTextRange(x || this.selection.getRange())
        }
            ;
        this.insert = function (x, y) {
            return this.doc.insert(x, y)
        }
            ;
        this.remove = function (x) {
            return this.doc.remove(x)
        }
            ;
        this.undoChanges = function (A, z) {
            if (!A.length) {
                return
            }
            this.$fromUndo = true;
            var x = null;
            for (var y = A.length - 1; y != -1; y--) {
                var B = A[y];
                if (B.group == "doc") {
                    this.doc.revertDeltas(B.deltas);
                    x = this.$getUndoSelection(B.deltas, true, x)
                } else {
                    B.deltas.forEach(function (C) {
                        this.addFolds(C.folds)
                    }, this)
                }
            }
            this.$fromUndo = false;
            x && this.$undoSelect && !z && this.selection.setSelectionRange(x);
            return x
        }
            ;
        this.redoChanges = function (A, z) {
            if (!A.length) {
                return
            }
            this.$fromUndo = true;
            var x = null;
            for (var y = 0; y < A.length; y++) {
                var B = A[y];
                if (B.group == "doc") {
                    this.doc.applyDeltas(B.deltas);
                    x = this.$getUndoSelection(B.deltas, false, x)
                }
            }
            this.$fromUndo = false;
            x && this.$undoSelect && !z && this.selection.setSelectionRange(x);
            return x
        }
            ;
        this.setUndoSelect = function (x) {
            this.$undoSelect = x
        }
            ;
        this.$getUndoSelection = function (x, y, E) {
            function B(I) {
                var H = I.action === "insertText" || I.action === "insertLines";
                return y ? !H : H
            }
            var G = x[0];
            var A, F;
            var C = false;
            if (B(G)) {
                A = f.fromPoints(G.range.start, G.range.end);
                C = true
            } else {
                A = f.fromPoints(G.range.start, G.range.start);
                C = false
            }
            for (var z = 1; z < x.length; z++) {
                G = x[z];
                if (B(G)) {
                    F = G.range.start;
                    if (A.compare(F.row, F.column) == -1) {
                        A.setStart(G.range.start)
                    }
                    F = G.range.end;
                    if (A.compare(F.row, F.column) == 1) {
                        A.setEnd(G.range.end)
                    }
                    C = true
                } else {
                    F = G.range.start;
                    if (A.compare(F.row, F.column) == -1) {
                        A = f.fromPoints(G.range.start, G.range.start)
                    }
                    C = false
                }
            }
            if (E != null) {
                if (f.comparePoints(E.start, A.start) === 0) {
                    E.start.column += A.end.column - A.start.column;
                    E.end.column += A.end.column - A.start.column
                }
                var D = E.compareRange(A);
                if (D == 1) {
                    A.setStart(E.start)
                } else {
                    if (D == -1) {
                        A.setEnd(E.end)
                    }
                }
            }
            return A
        }
            ;
        this.replace = function (x, y) {
            return this.doc.replace(x, y)
        }
            ;
        this.moveText = function (D, F, x) {
            var G = this.getTextRange(D);
            var E = this.getFoldsInRange(D);
            var y = f.fromPoints(F, F);
            if (!x) {
                this.remove(D);
                var C = D.start.row - D.end.row;
                var z = C ? -D.end.column : D.start.column - D.end.column;
                if (z) {
                    if (y.start.row == D.end.row && y.start.column > D.end.column) {
                        y.start.column += z
                    }
                    if (y.end.row == D.end.row && y.end.column > D.end.column) {
                        y.end.column += z
                    }
                }
                if (C && y.start.row >= D.end.row) {
                    y.start.row += C;
                    y.end.row += C
                }
            }
            y.end = this.insert(y.start, G);
            if (E.length) {
                var A = D.start;
                var B = y.start;
                var C = B.row - A.row;
                var z = B.column - A.column;
                this.addFolds(E.map(function (H) {
                    H = H.clone();
                    if (H.start.row == A.row) {
                        H.start.column += z
                    }
                    if (H.end.row == A.row) {
                        H.end.column += z
                    }
                    H.start.row += C;
                    H.end.row += C;
                    return H
                }))
            }
            return y
        }
            ;
        this.indentRows = function (y, x, A) {
            A = A.replace(/\t/g, this.getTabString());
            for (var z = y; z <= x; z++) {
                this.insert({
                    row: z,
                    column: 0
                }, A)
            }
        }
            ;
        this.outdentRows = function (z) {
            var D = z.collapseRows();
            var y = new f(0, 0, 0, 0);
            var C = this.getTabSize();
            for (var B = D.start.row; B <= D.end.row; ++B) {
                var x = this.getLine(B);
                y.start.row = B;
                y.end.row = B;
                for (var A = 0; A < C; ++A) {
                    if (x.charAt(A) != " ") {
                        break
                    }
                }
                if (A < C && x.charAt(A) == "\t") {
                    y.start.column = A;
                    y.end.column = A + 1
                } else {
                    y.start.column = 0;
                    y.end.column = A
                }
                this.remove(y)
            }
        }
            ;
        this.$moveLines = function (E, A, z) {
            E = this.getRowFoldStart(E);
            A = this.getRowFoldEnd(A);
            if (z < 0) {
                var D = this.getRowFoldStart(E + z);
                if (D < 0) {
                    return 0
                }
                var C = D - E
            } else {
                if (z > 0) {
                    var D = this.getRowFoldEnd(A + z);
                    if (D > this.doc.getLength() - 1) {
                        return 0
                    }
                    var C = D - A
                } else {
                    E = this.$clipRowToDocument(E);
                    A = this.$clipRowToDocument(A);
                    var C = A - E + 1
                }
            }
            var y = new f(E, 0, A, Number.MAX_VALUE);
            var B = this.getFoldsInRange(y).map(function (F) {
                F = F.clone();
                F.start.row += C;
                F.end.row += C;
                return F
            });
            var x = z == 0 ? this.doc.getLines(E, A) : this.doc.removeLines(E, A);
            this.doc.insertLines(E + C, x);
            B.length && this.addFolds(B);
            return C
        }
            ;
        this.moveLinesUp = function (y, x) {
            return this.$moveLines(y, x, -1)
        }
            ;
        this.moveLinesDown = function (y, x) {
            return this.$moveLines(y, x, 1)
        }
            ;
        this.duplicateLines = function (y, x) {
            return this.$moveLines(y, x, 0)
        }
            ;
        this.$clipRowToDocument = function (x) {
            return Math.max(0, Math.min(x, this.doc.getLength() - 1))
        }
            ;
        this.$clipColumnToRow = function (y, x) {
            if (x < 0) {
                return 0
            }
            return Math.min(this.doc.getLine(y).length, x)
        }
            ;
        this.$clipPositionToDocument = function (z, y) {
            y = Math.max(0, y);
            if (z < 0) {
                z = 0;
                y = 0
            } else {
                var x = this.doc.getLength();
                if (z >= x) {
                    z = x - 1;
                    y = this.doc.getLine(x - 1).length
                } else {
                    y = Math.min(this.doc.getLine(z).length, y)
                }
            }
            return {
                row: z,
                column: y
            }
        }
            ;
        this.$clipRangeToDocument = function (y) {
            if (y.start.row < 0) {
                y.start.row = 0;
                y.start.column = 0
            } else {
                y.start.column = this.$clipColumnToRow(y.start.row, y.start.column)
            }
            var x = this.doc.getLength() - 1;
            if (y.end.row > x) {
                y.end.row = x;
                y.end.column = this.doc.getLine(x).length
            } else {
                y.end.column = this.$clipColumnToRow(y.end.row, y.end.column)
            }
            return y
        }
            ;
        this.$wrapLimit = 80;
        this.$useWrapMode = false;
        this.$wrapLimitRange = {
            min: null,
            max: null
        };
        this.setUseWrapMode = function (y) {
            if (y != this.$useWrapMode) {
                this.$useWrapMode = y;
                this.$modified = true;
                this.$resetRowCache(0);
                if (y) {
                    var x = this.getLength();
                    this.$wrapData = Array(x);
                    this.$updateWrapData(0, x - 1)
                }
                this._signal("changeWrapMode")
            }
        }
            ;
        this.getUseWrapMode = function () {
            return this.$useWrapMode
        }
            ;
        this.setWrapLimitRange = function (y, x) {
            if (this.$wrapLimitRange.min !== y || this.$wrapLimitRange.max !== x) {
                this.$wrapLimitRange = {
                    min: y,
                    max: x
                };
                this.$modified = true;
                if (this.$useWrapMode) {
                    this._signal("changeWrapMode")
                }
            }
        }
            ;
        this.adjustWrapLimit = function (A, z) {
            var y = this.$wrapLimitRange;
            if (y.max < 0) {
                y = {
                    min: z,
                    max: z
                }
            }
            var x = this.$constrainWrapLimit(A, y.min, y.max);
            if (x != this.$wrapLimit && x > 1) {
                this.$wrapLimit = x;
                this.$modified = true;
                if (this.$useWrapMode) {
                    this.$updateWrapData(0, this.getLength() - 1);
                    this.$resetRowCache(0);
                    this._signal("changeWrapLimit")
                }
                return true
            }
            return false
        }
            ;
        this.$constrainWrapLimit = function (y, z, x) {
            if (z) {
                y = Math.max(z, y)
            }
            if (x) {
                y = Math.min(x, y)
            }
            return y
        }
            ;
        this.getWrapLimit = function () {
            return this.$wrapLimit
        }
            ;
        this.setWrapLimit = function (x) {
            this.setWrapLimitRange(x, x)
        }
            ;
        this.getWrapLimitRange = function () {
            return {
                min: this.$wrapLimitRange.min,
                max: this.$wrapLimitRange.max
            }
        }
            ;
        this.$updateInternalDataOnChange = function (G) {
            var D = this.$useWrapMode;
            var F;
            var B = G.data.action;
            var A = G.data.range.start.row;
            var M = G.data.range.end.row;
            var y = G.data.range.start;
            var C = G.data.range.end;
            var x = null;
            if (B.indexOf("Lines") != -1) {
                if (B == "insertLines") {
                    M = A + (G.data.lines.length)
                } else {
                    M = A
                }
                F = G.data.lines ? G.data.lines.length : M - A
            } else {
                F = M - A
            }
            this.$updating = true;
            if (F != 0) {
                if (B.indexOf("remove") != -1) {
                    this[D ? "$wrapData" : "$rowLengthCache"].splice(A, F);
                    var z = this.$foldData;
                    x = this.getFoldsInRange(G.data.range);
                    this.removeFolds(x);
                    var K = this.getFoldLine(C.row);
                    var L = 0;
                    if (K) {
                        K.addRemoveChars(C.row, C.column, y.column - C.column);
                        K.shiftRow(-F);
                        var J = this.getFoldLine(A);
                        if (J && J !== K) {
                            J.merge(K);
                            K = J
                        }
                        L = z.indexOf(K) + 1
                    }
                    for (L; L < z.length; L++) {
                        var K = z[L];
                        if (K.start.row >= C.row) {
                            K.shiftRow(-F)
                        }
                    }
                    M = A
                } else {
                    var H = Array(F);
                    H.unshift(A, 0);
                    var E = D ? this.$wrapData : this.$rowLengthCache;
                    E.splice.apply(E, H);
                    var z = this.$foldData;
                    var K = this.getFoldLine(A);
                    var L = 0;
                    if (K) {
                        var I = K.range.compareInside(y.row, y.column);
                        if (I == 0) {
                            K = K.split(y.row, y.column);
                            if (K) {
                                K.shiftRow(F);
                                K.addRemoveChars(M, 0, C.column - y.column)
                            }
                        } else {
                            if (I == -1) {
                                K.addRemoveChars(A, 0, C.column - y.column);
                                K.shiftRow(F)
                            }
                        }
                        L = z.indexOf(K) + 1
                    }
                    for (L; L < z.length; L++) {
                        var K = z[L];
                        if (K.start.row >= A) {
                            K.shiftRow(F)
                        }
                    }
                }
            } else {
                F = Math.abs(G.data.range.start.column - G.data.range.end.column);
                if (B.indexOf("remove") != -1) {
                    x = this.getFoldsInRange(G.data.range);
                    this.removeFolds(x);
                    F = -F
                }
                var K = this.getFoldLine(A);
                if (K) {
                    K.addRemoveChars(A, y.column, F)
                }
            }
            if (D && this.$wrapData.length != this.doc.getLength()) {
                console.error("doc.getLength() and $wrapData.length have to be the same!")
            }
            this.$updating = false;
            if (D) {
                this.$updateWrapData(A, M)
            } else {
                this.$updateRowLengthCache(A, M)
            }
            return x
        }
            ;
        this.$updateRowLengthCache = function (z, y, x) {
            this.$rowLengthCache[z] = null;
            this.$rowLengthCache[y] = null
        }
            ;
        this.$updateWrapData = function (x, D) {
            var F = this.doc.getAllLines();
            var z = this.getTabSize();
            var y = this.$wrapData;
            var E = this.$wrapLimit;
            var A;
            var B;
            var C = x;
            D = Math.min(D, F.length - 1);
            while (C <= D) {
                B = this.getFoldLine(C, B);
                if (!B) {
                    A = this.$getDisplayTokens(F[C]);
                    y[C] = this.$computeWrapSplits(A, E, z);
                    C++
                } else {
                    A = [];
                    B.walk(function (L, K, J, G) {
                        var H;
                        if (L != null) {
                            H = this.$getDisplayTokens(L, A.length);
                            H[0] = u;
                            for (var I = 1; I < H.length; I++) {
                                H[I] = o
                            }
                        } else {
                            H = this.$getDisplayTokens(F[K].substring(G, J), A.length)
                        }
                        A = A.concat(H)
                    }
                        .bind(this), B.end.row, F[B.end.row].length + 1);
                    y[B.start.row] = this.$computeWrapSplits(A, E, z);
                    C = B.end.row + 1
                }
            }
        }
            ;
        var w = 1
            , v = 2
            , u = 3
            , o = 4
            , r = 9
            , s = 10
            , t = 11
            , p = 12;
        this.$computeWrapSplits = function (G, L, C) {
            if (G.length == 0) {
                return []
            }
            var I = [];
            var B = G.length;
            var E = 0
                , z = 0;
            var H = this.$wrapAsCode;
            var K = this.$indentedSoftWrap;
            var x = L <= Math.max(2 * C, 8) || K === false ? 0 : Math.floor(L / 2);
            function A() {
                var M = 0;
                if (x === 0) {
                    return M
                }
                if (K) {
                    for (var O = 0; O < G.length; O++) {
                        var N = G[O];
                        if (N == s) {
                            M += 1
                        } else {
                            if (N == t) {
                                M += C
                            } else {
                                if (N == p) {
                                    continue
                                } else {
                                    break
                                }
                            }
                        }
                    }
                }
                if (H && K !== false) {
                    M += C
                }
                return Math.min(M, x)
            }
            function J(O) {
                var N = G.slice(E, O);
                var M = N.length;
                N.join("").replace(/12/g, function () {
                    M -= 1
                }).replace(/2/g, function () {
                    M -= 1
                });
                if (!I.length) {
                    y = A();
                    I.indent = y
                }
                z += M;
                I.push(z);
                E = O
            }
            var y = 0;
            while (B - E > L - y) {
                var F = E + L - y;
                if (G[F - 1] >= s && G[F] >= s) {
                    J(F);
                    continue
                }
                if (G[F] == u || G[F] == o) {
                    for (F; F != E - 1; F--) {
                        if (G[F] == u) {
                            break
                        }
                    }
                    if (F > E) {
                        J(F);
                        continue
                    }
                    F = E + L;
                    for (F; F < G.length; F++) {
                        if (G[F] != o) {
                            break
                        }
                    }
                    if (F == G.length) {
                        break
                    }
                    J(F);
                    continue
                }
                var D = Math.max(F - (L - (L >> 2)), E - 1);
                while (F > D && G[F] < u) {
                    F--
                }
                if (H) {
                    while (F > D && G[F] < u) {
                        F--
                    }
                    while (F > D && G[F] == r) {
                        F--
                    }
                } else {
                    while (F > D && G[F] < s) {
                        F--
                    }
                }
                if (F > D) {
                    J(++F);
                    continue
                }
                F = E + L;
                if (G[F] == v) {
                    F--
                }
                J(F - y)
            }
            return I
        }
            ;
        this.$getDisplayTokens = function (B, A) {
            var x = [];
            var z;
            A = A || 0;
            for (var y = 0; y < B.length; y++) {
                var D = B.charCodeAt(y);
                if (D == 9) {
                    z = this.getScreenTabSize(x.length + A);
                    x.push(t);
                    for (var C = 1; C < z; C++) {
                        x.push(p)
                    }
                } else {
                    if (D == 32) {
                        x.push(s)
                    } else {
                        if ((D > 39 && D < 48) || (D > 57 && D < 64)) {
                            x.push(r)
                        } else {
                            if (D >= 4352 && q(D)) {
                                x.push(w, v)
                            } else {
                                x.push(w)
                            }
                        }
                    }
                }
            }
            return x
        }
            ;
        this.$getStringScreenWidth = function (z, B, x) {
            if (B == 0) {
                return [0, 0]
            }
            if (B == null) {
                B = Infinity
            }
            x = x || 0;
            var A, y;
            for (y = 0; y < z.length; y++) {
                A = z.charCodeAt(y);
                if (A == 9) {
                    x += this.getScreenTabSize(x)
                } else {
                    if (A >= 4352 && q(A)) {
                        x += 2
                    } else {
                        x += 1
                    }
                }
                if (x > B) {
                    break
                }
            }
            return [x, y]
        }
            ;
        this.lineWidgets = null;
        this.getRowLength = function (y) {
            if (this.lineWidgets) {
                var x = this.lineWidgets[y] && this.lineWidgets[y].rowCount || 0
            } else {
                x = 0
            }
            if (!this.$useWrapMode || !this.$wrapData[y]) {
                return 1 + x
            } else {
                return this.$wrapData[y].length + 1 + x
            }
        }
            ;
        this.getRowLineCount = function (x) {
            if (!this.$useWrapMode || !this.$wrapData[x]) {
                return 1
            } else {
                return this.$wrapData[x].length + 1
            }
        }
            ;
        this.getRowWrapIndent = function (x) {
            if (this.$useWrapMode) {
                var z = this.screenToDocumentPosition(x, Number.MAX_VALUE);
                var y = this.$wrapData[z.row];
                return y.length && y[0] < z.column ? y.indent : 0
            } else {
                return 0
            }
        }
            ;
        this.getScreenLastRowColumn = function (x) {
            var y = this.screenToDocumentPosition(x, Number.MAX_VALUE);
            return this.documentToScreenColumn(y.row, y.column)
        }
            ;
        this.getDocumentLastRowColumn = function (x, z) {
            var y = this.documentToScreenRow(x, z);
            return this.getScreenLastRowColumn(y)
        }
            ;
        this.getDocumentLastRowColumnPosition = function (x, z) {
            var y = this.documentToScreenRow(x, z);
            return this.screenToDocumentPosition(y, Number.MAX_VALUE / 10)
        }
            ;
        this.getRowSplitData = function (x) {
            if (!this.$useWrapMode) {
                return undefined
            } else {
                return this.$wrapData[x]
            }
        }
            ;
        this.getScreenTabSize = function (x) {
            return this.$tabSize - x % this.$tabSize
        }
            ;
        this.screenToDocumentRow = function (y, x) {
            return this.screenToDocumentPosition(y, x).row
        }
            ;
        this.screenToDocumentColumn = function (y, x) {
            return this.screenToDocumentPosition(y, x).column
        }
            ;
        this.screenToDocumentPosition = function (F, B) {
            if (F < 0) {
                return {
                    row: 0,
                    column: 0
                }
            }
            var D;
            var x = 0;
            var L = 0;
            var y;
            var A = 0;
            var J = 0;
            var H = this.$screenRowCache;
            var M = this.$getRowCacheIndex(H, F);
            var K = H.length;
            if (K && M >= 0) {
                var A = H[M];
                var x = this.$docRowCache[M];
                var E = F > H[K - 1]
            } else {
                var E = !K
            }
            var I = this.getLength() - 1;
            var N = this.getNextFoldLine(x);
            var z = N ? N.start.row : Infinity;
            while (A <= F) {
                J = this.getRowLength(x);
                if (A + J > F || x >= I) {
                    break
                } else {
                    A += J;
                    x++;
                    if (x > z) {
                        x = N.end.row + 1;
                        N = this.getNextFoldLine(x, N);
                        z = N ? N.start.row : Infinity
                    }
                }
                if (E) {
                    this.$docRowCache.push(x);
                    this.$screenRowCache.push(A)
                }
            }
            if (N && N.start.row <= x) {
                D = this.getFoldDisplayLine(N);
                x = N.start.row
            } else {
                if (A + J <= F || x > I) {
                    return {
                        row: I,
                        column: this.getLine(I).length
                    }
                } else {
                    D = this.getLine(x);
                    N = null
                }
            }
            var G = 0;
            if (this.$useWrapMode) {
                var C = this.$wrapData[x];
                if (C) {
                    var O = Math.floor(F - A);
                    y = C[O];
                    if (O > 0 && C.length) {
                        G = C.indent;
                        L = C[O - 1] || C[C.length - 1];
                        D = D.substring(L)
                    }
                }
            }
            L += this.$getStringScreenWidth(D, B - G)[1];
            if (this.$useWrapMode && L >= y) {
                L = y - 1
            }
            if (N) {
                return N.idxToPosition(L)
            }
            return {
                row: x,
                column: L
            }
        }
            ;
        this.documentToScreenPosition = function (x, L) {
            if (typeof L === "undefined") {
                var A = this.$clipPositionToDocument(x.row, x.column)
            } else {
                A = this.$clipPositionToDocument(x, L)
            }
            x = A.row;
            L = A.column;
            var F = 0;
            var H = null;
            var z = null;
            z = this.getFoldAt(x, L, 1);
            if (z) {
                x = z.start.row;
                L = z.start.column
            }
            var J, B = 0;
            var I = this.$docRowCache;
            var M = this.$getRowCacheIndex(I, x);
            var K = I.length;
            if (K && M >= 0) {
                var B = I[M];
                var F = this.$screenRowCache[M];
                var E = x > I[K - 1]
            } else {
                var E = !K
            }
            var N = this.getNextFoldLine(B);
            var y = N ? N.start.row : Infinity;
            while (B < x) {
                if (B >= y) {
                    J = N.end.row + 1;
                    if (J > x) {
                        break
                    }
                    N = this.getNextFoldLine(J, N);
                    y = N ? N.start.row : Infinity
                } else {
                    J = B + 1
                }
                F += this.getRowLength(B);
                B = J;
                if (E) {
                    this.$docRowCache.push(B);
                    this.$screenRowCache.push(F)
                }
            }
            var D = "";
            if (N && B >= y) {
                D = this.getFoldDisplayLine(N, x, L);
                H = N.start.row
            } else {
                D = this.getLine(x).substring(0, L);
                H = x
            }
            var G = 0;
            if (this.$useWrapMode) {
                var O = this.$wrapData[H];
                if (O) {
                    var C = 0;
                    while (D.length >= O[C]) {
                        F++;
                        C++
                    }
                    D = D.substring(O[C - 1] || 0, D.length);
                    G = C > 0 ? O.indent : 0
                }
            }
            return {
                row: F,
                column: G + this.$getStringScreenWidth(D)[0]
            }
        }
            ;
        this.documentToScreenColumn = function (y, x) {
            return this.documentToScreenPosition(y, x).column
        }
            ;
        this.documentToScreenRow = function (x, y) {
            return this.documentToScreenPosition(x, y).row
        }
            ;
        this.getScreenLength = function () {
            var D = 0;
            var y = null;
            if (!this.$useWrapMode) {
                D = this.getLength();
                var A = this.$foldData;
                for (var z = 0; z < A.length; z++) {
                    y = A[z];
                    D -= y.end.row - y.start.row
                }
            } else {
                var B = this.$wrapData.length;
                var E = 0
                    , z = 0;
                var y = this.$foldData[z++];
                var x = y ? y.start.row : Infinity;
                while (E < B) {
                    var C = this.$wrapData[E];
                    D += C ? C.length + 1 : 1;
                    E++;
                    if (E > x) {
                        E = y.end.row + 1;
                        y = this.$foldData[z++];
                        x = y ? y.start.row : Infinity
                    }
                }
            }
            if (this.lineWidgets) {
                D += this.$getWidgetScreenLength()
            }
            return D
        }
            ;
        this.$setFontMetrics = function (x) { }
            ;
        this.destroy = function () {
            if (this.bgTokenizer) {
                this.bgTokenizer.setDocument(null);
                this.bgTokenizer = null
            }
            this.$stopWorker()
        }
            ;
        function q(x) {
            if (x < 4352) {
                return false
            }
            return x >= 4352 && x <= 4447 || x >= 4515 && x <= 4519 || x >= 4602 && x <= 4607 || x >= 9001 && x <= 9002 || x >= 11904 && x <= 11929 || x >= 11931 && x <= 12019 || x >= 12032 && x <= 12245 || x >= 12272 && x <= 12283 || x >= 12288 && x <= 12350 || x >= 12353 && x <= 12438 || x >= 12441 && x <= 12543 || x >= 12549 && x <= 12589 || x >= 12593 && x <= 12686 || x >= 12688 && x <= 12730 || x >= 12736 && x <= 12771 || x >= 12784 && x <= 12830 || x >= 12832 && x <= 12871 || x >= 12880 && x <= 13054 || x >= 13056 && x <= 19903 || x >= 19968 && x <= 42124 || x >= 42128 && x <= 42182 || x >= 43360 && x <= 43388 || x >= 44032 && x <= 55203 || x >= 55216 && x <= 55238 || x >= 55243 && x <= 55291 || x >= 63744 && x <= 64255 || x >= 65040 && x <= 65049 || x >= 65072 && x <= 65106 || x >= 65108 && x <= 65126 || x >= 65128 && x <= 65131 || x >= 65281 && x <= 65376 || x >= 65504 && x <= 65510
        }
    }
    ).call(a.prototype);
    g("./edit_session/folding").Folding.call(a.prototype);
    g("./edit_session/bracket_match").BracketMatch.call(a.prototype);
    e.defineOptions(a.prototype, "session", {
        wrap: {
            set: function (p) {
                if (!p || p == "off") {
                    p = false
                } else {
                    if (p == "free") {
                        p = true
                    } else {
                        if (p == "printMargin") {
                            p = -1
                        } else {
                            if (typeof p == "string") {
                                p = parseInt(p, 10) || false
                            }
                        }
                    }
                }
                if (this.$wrap == p) {
                    return
                }
                this.$wrap = p;
                if (!p) {
                    this.setUseWrapMode(false)
                } else {
                    var o = typeof p == "number" ? p : null;
                    this.setWrapLimitRange(o, o);
                    this.setUseWrapMode(true)
                }
            },
            get: function () {
                if (this.getUseWrapMode()) {
                    if (this.$wrap == -1) {
                        return "printMargin"
                    }
                    if (!this.getWrapLimitRange().min) {
                        return "free"
                    }
                    return this.$wrap
                }
                return "off"
            },
            handlesSet: true
        },
        wrapMethod: {
            set: function (o) {
                o = o == "auto" ? this.$mode.type != "text" : o != "text";
                if (o != this.$wrapAsCode) {
                    this.$wrapAsCode = o;
                    if (this.$useWrapMode) {
                        this.$modified = true;
                        this.$resetRowCache(0);
                        this.$updateWrapData(0, this.getLength() - 1)
                    }
                }
            },
            initialValue: "auto"
        },
        indentedSoftWrap: {
            initialValue: true
        },
        firstLineNumber: {
            set: function () {
                this._signal("changeBreakpoint")
            },
            initialValue: 1
        },
        useWorker: {
            set: function (o) {
                this.$useWorker = o;
                this.$stopWorker();
                if (o) {
                    this.$startWorker()
                }
            },
            initialValue: true
        },
        useSoftTabs: {
            initialValue: true
        },
        tabSize: {
            set: function (o) {
                if (isNaN(o) || this.$tabSize === o) {
                    return
                }
                this.$modified = true;
                this.$rowLengthCache = [];
                this.$tabSize = o;
                this._signal("changeTabSize")
            },
            initialValue: 4,
            handlesSet: true
        },
        overwrite: {
            set: function (o) {
                this._signal("changeOverwrite")
            },
            initialValue: false
        },
        newLineMode: {
            set: function (o) {
                this.doc.setNewLineMode(o)
            },
            get: function () {
                return this.doc.getNewLineMode()
            },
            handlesSet: true
        },
        mode: {
            set: function (o) {
                this.setMode(o)
            },
            get: function () {
                return this.$modeId
            }
        }
    });
    i.EditSession = a
});
define("ace/search", ["require", "exports", "module", "ace/lib/lang", "ace/lib/oop", "ace/range"], function (c, a, d) {
    var g = c("./lib/lang");
    var e = c("./lib/oop");
    var f = c("./range").Range;
    var b = function () {
        this.$options = {}
    };
    (function () {
        this.set = function (h) {
            e.mixin(this.$options, h);
            return this
        }
            ;
        this.getOptions = function () {
            return g.copyObject(this.$options)
        }
            ;
        this.setOptions = function (h) {
            this.$options = h
        }
            ;
        this.find = function (k) {
            var i = this.$options;
            var j = this.$matchIterator(k, i);
            if (!j) {
                return false
            }
            var h = null;
            j.forEach(function (l, o, n) {
                if (!l.start) {
                    var m = l.offset + (n || 0);
                    h = new f(o, m, o, m + l.length);
                    if (!l.length && i.start && i.start.start && i.skipCurrent != false && h.isEqual(i.start)) {
                        h = null;
                        return false
                    }
                } else {
                    h = l
                }
                return true
            });
            return h
        }
            ;
        this.findAll = function (k) {
            var q = this.$options;
            if (!q.needle) {
                return []
            }
            this.$assembleRegExp(q);
            var v = q.range;
            var h = v ? k.getLines(v.start.row, v.end.row) : k.doc.getAllLines();
            var o = [];
            var x = q.re;
            if (q.$isMultiLine) {
                var C = x.length;
                var y = h.length - C;
                var w;
                outer: for (var s = x.offset || 0; s <= y; s++) {
                    for (var A = 0; A < C; A++) {
                        if (h[s + A].search(x[A]) == -1) {
                            continue outer
                        }
                    }
                    var z = h[s];
                    var u = h[s + C - 1];
                    var r = z.length - z.match(x[0])[0].length;
                    var n = u.match(x[C - 1])[0].length;
                    if (w && w.end.row === s && w.end.column > r) {
                        continue
                    }
                    o.push(w = new f(s, r, s + C - 1, n));
                    if (C > 2) {
                        s = s + C - 2
                    }
                }
            } else {
                for (var B = 0; B < h.length; B++) {
                    var l = g.getMatchOffsets(h[B], x);
                    for (var A = 0; A < l.length; A++) {
                        var t = l[A];
                        o.push(new f(B, t.offset, B, t.offset + t.length))
                    }
                }
            }
            if (v) {
                var p = v.start.column;
                var m = v.start.column;
                var B = 0
                    , A = o.length - 1;
                while (B < A && o[B].start.column < p && o[B].start.row == v.start.row) {
                    B++
                }
                while (B < A && o[A].end.column > m && o[A].end.row == v.end.row) {
                    A--
                }
                o = o.slice(B, A + 1);
                for (B = 0,
                    A = o.length; B < A; B++) {
                    o[B].start.row += v.start.row;
                    o[B].end.row += v.start.row
                }
            }
            return o
        }
            ;
        this.replace = function (h, o) {
            var k = this.$options;
            var n = this.$assembleRegExp(k);
            if (k.$isMultiLine) {
                return o
            }
            if (!n) {
                return
            }
            var j = n.exec(h);
            if (!j || j[0].length != h.length) {
                return null
            }
            o = h.replace(n, o);
            if (k.preserveCase) {
                o = o.split("");
                for (var l = Math.min(h.length, h.length); l--;) {
                    var m = h[l];
                    if (m && m.toLowerCase() != m) {
                        o[l] = o[l].toUpperCase()
                    } else {
                        o[l] = o[l].toLowerCase()
                    }
                }
                o = o.join("")
            }
            return o
        }
            ;
        this.$matchIterator = function (m, i) {
            var k = this.$assembleRegExp(i);
            if (!k) {
                return false
            }
            var n;
            if (i.$isMultiLine) {
                var h = k.length;
                var j = function (o, u, t) {
                    var s = o.search(k[0]);
                    if (s == -1) {
                        return
                    }
                    for (var q = 1; q < h; q++) {
                        o = m.getLine(u + q);
                        if (o.search(k[q]) == -1) {
                            return
                        }
                    }
                    var r = o.match(k[h - 1])[0].length;
                    var p = new f(u, s, u + h - 1, r);
                    if (k.offset == 1) {
                        p.start.row--;
                        p.start.column = Number.MAX_VALUE
                    } else {
                        if (t) {
                            p.start.column += t
                        }
                    }
                    if (n(p)) {
                        return true
                    }
                }
            } else {
                if (i.backwards) {
                    var j = function (o, s, r) {
                        var q = g.getMatchOffsets(o, k);
                        for (var p = q.length - 1; p >= 0; p--) {
                            if (n(q[p], s, r)) {
                                return true
                            }
                        }
                    }
                } else {
                    var j = function (o, s, r) {
                        var q = g.getMatchOffsets(o, k);
                        for (var p = 0; p < q.length; p++) {
                            if (n(q[p], s, r)) {
                                return true
                            }
                        }
                    }
                }
            }
            var l = this.$lineIterator(m, i);
            return {
                forEach: function (o) {
                    n = o;
                    l.forEach(j)
                }
            }
        }
            ;
        this.$assembleRegExp = function (i, m) {
            if (i.needle instanceof RegExp) {
                return i.re = i.needle
            }
            var l = i.needle;
            if (!i.needle) {
                return i.re = false
            }
            if (!i.regExp) {
                l = g.escapeRegExp(l)
            }
            if (i.wholeWord) {
                l = "\\b" + l + "\\b"
            }
            var h = i.caseSensitive ? "gm" : "gmi";
            i.$isMultiLine = !m && /[\n\r]/.test(l);
            if (i.$isMultiLine) {
                return i.re = this.$assembleMultilineRegExp(l, h)
            }
            try {
                var j = new RegExp(l, h)
            } catch (k) {
                j = false
            }
            return i.re = j
        }
            ;
        this.$assembleMultilineRegExp = function (n, h) {
            var m = n.replace(/\r\n|\r|\n/g, "$\n^").split("\n");
            var k = [];
            for (var j = 0; j < m.length; j++) {
                try {
                    k.push(new RegExp(m[j], h))
                } catch (l) {
                    return false
                }
            }
            if (m[0] == "") {
                k.shift();
                k.offset = 1
            } else {
                k.offset = 0
            }
            return k
        }
            ;
        this.$lineIterator = function (m, p) {
            var n = p.backwards == true;
            var i = p.skipCurrent != false;
            var k = p.range;
            var h = p.start;
            if (!h) {
                h = k ? k[n ? "end" : "start"] : m.selection.getRange()
            }
            if (h.start) {
                h = h[i != n ? "end" : "start"]
            }
            var j = k ? k.start.row : 0;
            var o = k ? k.end.row : m.getLength() - 1;
            var l = n ? function (s) {
                var r = h.row;
                var q = m.getLine(r).substring(0, h.column);
                if (s(q, r)) {
                    return
                }
                for (r--; r >= j; r--) {
                    if (s(m.getLine(r), r)) {
                        return
                    }
                }
                if (p.wrap == false) {
                    return
                }
                for (r = o,
                    j = h.row; r >= j; r--) {
                    if (s(m.getLine(r), r)) {
                        return
                    }
                }
            }
                : function (s) {
                    var r = h.row;
                    var q = m.getLine(r).substr(h.column);
                    if (s(q, r, h.column)) {
                        return
                    }
                    for (r = r + 1; r <= o; r++) {
                        if (s(m.getLine(r), r)) {
                            return
                        }
                    }
                    if (p.wrap == false) {
                        return
                    }
                    for (r = j,
                        o = h.row; r <= o; r++) {
                        if (s(m.getLine(r), r)) {
                            return
                        }
                    }
                }
                ;
            return {
                forEach: l
            }
        }
    }
    ).call(b.prototype);
    a.Search = b
});
define("ace/keyboard/hash_handler", ["require", "exports", "module", "ace/lib/keys", "ace/lib/useragent"], function (e, c, f) {
    var d = e("../lib/keys");
    var b = e("../lib/useragent");
    var a = d.KEY_MODS;
    function g(j, i) {
        this.platform = i || (b.isMac ? "mac" : "win");
        this.commands = {};
        this.commandKeyBinding = {};
        this.addCommands(j);
        this.$singleCommand = true
    }
    function h(j, i) {
        g.call(this, j, i);
        this.$singleCommand = false
    }
    h.prototype = g.prototype;
    (function () {
        this.addCommand = function (k) {
            if (this.commands[k.name]) {
                this.removeCommand(k)
            }
            this.commands[k.name] = k;
            if (k.bindKey) {
                this._buildKeyHash(k)
            }
        }
            ;
        this.removeCommand = function (o, m) {
            var k = o && (typeof o === "string" ? o : o.name);
            o = this.commands[k];
            if (!m) {
                delete this.commands[k]
            }
            var n = this.commandKeyBinding;
            for (var q in n) {
                var p = n[q];
                if (p == o) {
                    delete n[q]
                } else {
                    if (Array.isArray(p)) {
                        var l = p.indexOf(o);
                        if (l != -1) {
                            p.splice(l, 1);
                            if (p.length == 1) {
                                n[q] = p[0]
                            }
                        }
                    }
                }
            }
        }
            ;
        this.bindKey = function (l, m, k) {
            if (typeof l == "object") {
                if (k == undefined) {
                    k = l.position
                }
                l = l[this.platform]
            }
            if (!l) {
                return
            }
            if (typeof m == "function") {
                return this.addCommand({
                    exec: m,
                    bindKey: l,
                    name: m.name || l
                })
            }
            l.split("|").forEach(function (o) {
                var n = "";
                if (o.indexOf(" ") != -1) {
                    var p = o.split(/\s+/);
                    o = p.pop();
                    p.forEach(function (s) {
                        var t = this.parseKeys(s);
                        var u = a[t.hashId] + t.key;
                        n += (n ? " " : "") + u;
                        this._addCommandToBinding(n, "chainKeys")
                    }, this);
                    n += " "
                }
                var q = this.parseKeys(o);
                var r = a[q.hashId] + q.key;
                this._addCommandToBinding(n + r, m, k)
            }, this)
        }
            ;
        function j(k) {
            return typeof k == "object" && k.bindKey && k.bindKey.position || 0
        }
        this._addCommandToBinding = function (r, q, m) {
            var p = this.commandKeyBinding, o;
            if (!q) {
                delete p[r]
            } else {
                if (!p[r] || this.$singleCommand) {
                    p[r] = q
                } else {
                    if (!Array.isArray(p[r])) {
                        p[r] = [p[r]]
                    } else {
                        if ((o = p[r].indexOf(q)) != -1) {
                            p[r].splice(o, 1)
                        }
                    }
                    if (typeof m != "number") {
                        if (m || q.isDefault) {
                            m = -100
                        } else {
                            m = j(q)
                        }
                    }
                    var l = p[r];
                    for (o = 0; o < l.length; o++) {
                        var k = l[o];
                        var n = j(k);
                        if (n > m) {
                            break
                        }
                    }
                    l.splice(o, 0, q)
                }
            }
        }
            ;
        this.addCommands = function (k) {
            k && Object.keys(k).forEach(function (l) {
                var m = k[l];
                if (!m) {
                    return
                }
                if (typeof m === "string") {
                    return this.bindKey(m, l)
                }
                if (typeof m === "function") {
                    m = {
                        exec: m
                    }
                }
                if (typeof m !== "object") {
                    return
                }
                if (!m.name) {
                    m.name = l
                }
                this.addCommand(m)
            }, this)
        }
            ;
        this.removeCommands = function (k) {
            Object.keys(k).forEach(function (l) {
                this.removeCommand(k[l])
            }, this)
        }
            ;
        this.bindKeys = function (k) {
            Object.keys(k).forEach(function (l) {
                this.bindKey(l, k[l])
            }, this)
        }
            ;
        this._buildKeyHash = function (k) {
            this.bindKey(k.bindKey, k)
        }
            ;
        this.parseKeys = function (o) {
            var q = o.toLowerCase().split(/[\-\+]([\-\+])?/).filter(function (r) {
                return r
            });
            var m = q.pop();
            var p = d[m];
            if (d.FUNCTION_KEYS[p]) {
                m = d.FUNCTION_KEYS[p].toLowerCase()
            } else {
                if (!q.length) {
                    return {
                        key: m,
                        hashId: -1
                    }
                } else {
                    if (q.length == 1 && q[0] == "shift") {
                        return {
                            key: m.toUpperCase(),
                            hashId: -1
                        }
                    }
                }
            }
            var n = 0;
            for (var l = q.length; l--;) {
                var k = d.KEY_MODS[q[l]];
                if (k == null) {
                    if (typeof console != "undefined") {
                        console.error("invalid modifier " + q[l] + " in " + o)
                    }
                    return false
                }
                n |= k
            }
            return {
                key: m,
                hashId: n
            }
        }
            ;
        this.findKeyCommand = function i(m, k) {
            var l = a[m] + k;
            return this.commandKeyBinding[l]
        }
            ;
        this.handleKeyboard = function (n, m, k, o) {
            var l = a[m] + k;
            var p = this.commandKeyBinding[l];
            if (n.$keyChain) {
                n.$keyChain += " " + l;
                p = this.commandKeyBinding[n.$keyChain] || p
            }
            if (p) {
                if (p == "chainKeys" || p[p.length - 1] == "chainKeys") {
                    n.$keyChain = n.$keyChain || l;
                    return {
                        command: "null"
                    }
                }
            }
            if (n.$keyChain) {
                if ((!m || m == 4) && k.length == 1) {
                    n.$keyChain = n.$keyChain.slice(0, -l.length - 1)
                } else {
                    if (m == -1 || o > 0) {
                        n.$keyChain = ""
                    }
                }
            }
            return {
                command: p
            }
        }
            ;
        this.getStatusText = function (k, l) {
            return l.$keyChain || ""
        }
    }
    ).call(g.prototype);
    c.HashHandler = g;
    c.MultiHashHandler = h
});
define("ace/commands/command_manager", ["require", "exports", "module", "ace/lib/oop", "ace/keyboard/hash_handler", "ace/lib/event_emitter"], function (b, a, c) {
    var f = b("../lib/oop");
    var e = b("../keyboard/hash_handler").MultiHashHandler;
    var d = b("../lib/event_emitter").EventEmitter;
    var g = function (i, h) {
        e.call(this, h, i);
        this.byName = this.commands;
        this.setDefaultHandler("exec", function (j) {
            return j.command.exec(j.editor, j.args || {})
        })
    };
    f.inherits(g, e);
    (function () {
        f.implement(this, d);
        this.exec = function (m, k, h) {
            if (Array.isArray(m)) {
                for (var j = m.length; j--;) {
                    if (this.exec(m[j], k, h)) {
                        return true
                    }
                }
                return false
            }
            if (typeof m === "string") {
                m = this.commands[m]
            }
            if (!m) {
                return false
            }
            if (k && k.$readOnly && !m.readOnly) {
                return false
            }
            var l = {
                editor: k,
                command: m,
                args: h
            };
            l.returnValue = this._emit("exec", l);
            this._signal("afterExec", l);
            return l.returnValue === false ? false : true
        }
            ;
        this.toggleRecording = function (h) {
            if (this.$inReplay) {
                return
            }
            h && h._emit("changeStatus");
            if (this.recording) {
                this.macro.pop();
                this.removeEventListener("exec", this.$addCommandToMacro);
                if (!this.macro.length) {
                    this.macro = this.oldMacro
                }
                return this.recording = false
            }
            if (!this.$addCommandToMacro) {
                this.$addCommandToMacro = function (i) {
                    this.macro.push([i.command, i.args])
                }
                    .bind(this)
            }
            this.oldMacro = this.macro;
            this.macro = [];
            this.on("exec", this.$addCommandToMacro);
            return this.recording = true
        }
            ;
        this.replay = function (h) {
            if (this.$inReplay || !this.macro) {
                return
            }
            if (this.recording) {
                return this.toggleRecording(h)
            }
            try {
                this.$inReplay = true;
                this.macro.forEach(function (i) {
                    if (typeof i == "string") {
                        this.exec(i, h)
                    } else {
                        this.exec(i[0], h, i[1])
                    }
                }, this)
            } finally {
                this.$inReplay = false
            }
        }
            ;
        this.trimMacro = function (h) {
            return h.map(function (i) {
                if (typeof i[0] != "string") {
                    i[0] = i[0].name
                }
                if (!i[1]) {
                    i = i[0]
                }
                return i
            })
        }
    }
    ).call(g.prototype);
    a.CommandManager = g
});
define("ace/commands/default_commands", ["require", "exports", "module", "ace/lib/lang", "ace/config", "ace/range"], function (c, a, d) {
    var g = c("../lib/lang");
    var b = c("../config");
    var f = c("../range").Range;
    function e(h, i) {
        return {
            win: h,
            mac: i
        }
    }
    a.commands = [{
        name: "showSettingsMenu",
        bindKey: e("Ctrl-,", "Command-,"),
        exec: function (h) {
            b.loadModule("ace/ext/settings_menu", function (i) {
                i.init(h);
                h.showSettingsMenu()
            })
        },
        readOnly: true
    }, {
        name: "goToNextError",
        bindKey: e("Alt-E", "Ctrl-E"),
        exec: function (h) {
            b.loadModule("ace/ext/error_marker", function (i) {
                i.showErrorMarker(h, 1)
            })
        },
        scrollIntoView: "animate",
        readOnly: true
    }, {
        name: "goToPreviousError",
        bindKey: e("Alt-Shift-E", "Ctrl-Shift-E"),
        exec: function (h) {
            b.loadModule("ace/ext/error_marker", function (i) {
                i.showErrorMarker(h, -1)
            })
        },
        scrollIntoView: "animate",
        readOnly: true
    }, {
        name: "selectall",
        bindKey: e("Ctrl-A", "Command-A"),
        exec: function (h) {
            h.selectAll()
        },
        readOnly: true
    }, {
        name: "centerselection",
        bindKey: e(null, "Ctrl-L"),
        exec: function (h) {
            h.centerSelection()
        },
        readOnly: true
    }, {
        name: "gotoline",
        bindKey: e("Ctrl-L", "Command-L"),
        exec: function (i) {
            var h = parseInt(prompt("Enter line number:"), 10);
            if (!isNaN(h)) {
                i.gotoLine(h)
            }
        },
        readOnly: true
    }, {
        name: "fold",
        bindKey: e("Alt-L|Ctrl-F1", "Command-Alt-L|Command-F1"),
        exec: function (h) {
            h.session.toggleFold(false)
        },
        multiSelectAction: "forEach",
        scrollIntoView: "center",
        readOnly: true
    }, {
        name: "unfold",
        bindKey: e("Alt-Shift-L|Ctrl-Shift-F1", "Command-Alt-Shift-L|Command-Shift-F1"),
        exec: function (h) {
            h.session.toggleFold(true)
        },
        multiSelectAction: "forEach",
        scrollIntoView: "center",
        readOnly: true
    }, {
        name: "toggleFoldWidget",
        bindKey: e("F2", "F2"),
        exec: function (h) {
            h.session.toggleFoldWidget()
        },
        multiSelectAction: "forEach",
        scrollIntoView: "center",
        readOnly: true
    }, {
        name: "toggleParentFoldWidget",
        bindKey: e("Alt-F2", "Alt-F2"),
        exec: function (h) {
            h.session.toggleFoldWidget(true)
        },
        multiSelectAction: "forEach",
        scrollIntoView: "center",
        readOnly: true
    }, {
        name: "foldall",
        bindKey: e(null, "Ctrl-Command-Option-0"),
        exec: function (h) {
            h.session.foldAll()
        },
        scrollIntoView: "center",
        readOnly: true
    }, {
        name: "foldOther",
        bindKey: e("Alt-0", "Command-Option-0"),
        exec: function (h) {
            h.session.foldAll();
            h.session.unfold(h.selection.getAllRanges())
        },
        scrollIntoView: "center",
        readOnly: true
    }, {
        name: "unfoldall",
        bindKey: e("Alt-Shift-0", "Command-Option-Shift-0"),
        exec: function (h) {
            h.session.unfold()
        },
        scrollIntoView: "center",
        readOnly: true
    }, {
        name: "findnext",
        bindKey: e("Ctrl-K", "Command-G"),
        exec: function (h) {
            h.findNext()
        },
        multiSelectAction: "forEach",
        scrollIntoView: "center",
        readOnly: true
    }, {
        name: "findprevious",
        bindKey: e("Ctrl-Shift-K", "Command-Shift-G"),
        exec: function (h) {
            h.findPrevious()
        },
        multiSelectAction: "forEach",
        scrollIntoView: "center",
        readOnly: true
    }, {
        name: "selectOrFindNext",
        bindKey: e("Alt-K", "Ctrl-G"),
        exec: function (h) {
            if (h.selection.isEmpty()) {
                h.selection.selectWord()
            } else {
                h.findNext()
            }
        },
        readOnly: true
    }, {
        name: "selectOrFindPrevious",
        bindKey: e("Alt-Shift-K", "Ctrl-Shift-G"),
        exec: function (h) {
            if (h.selection.isEmpty()) {
                h.selection.selectWord()
            } else {
                h.findPrevious()
            }
        },
        readOnly: true
    }, {
        name: "find",
        bindKey: e("Ctrl-F", "Command-F"),
        exec: function (h) {
            b.loadModule("ace/ext/searchbox", function (i) {
                i.Search(h)
            })
        },
        readOnly: true
    }, {
        name: "overwrite",
        bindKey: "Insert",
        exec: function (h) {
            h.toggleOverwrite()
        },
        readOnly: true
    }, {
        name: "selecttostart",
        bindKey: e("Ctrl-Shift-Home", "Command-Shift-Up"),
        exec: function (h) {
            h.getSelection().selectFileStart()
        },
        multiSelectAction: "forEach",
        readOnly: true,
        scrollIntoView: "animate",
        aceCommandGroup: "fileJump"
    }, {
        name: "gotostart",
        bindKey: e("Ctrl-Home", "Command-Home|Command-Up"),
        exec: function (h) {
            h.navigateFileStart()
        },
        multiSelectAction: "forEach",
        readOnly: true,
        scrollIntoView: "animate",
        aceCommandGroup: "fileJump"
    }, {
        name: "selectup",
        bindKey: e("Shift-Up", "Shift-Up"),
        exec: function (h) {
            h.getSelection().selectUp()
        },
        multiSelectAction: "forEach",
        scrollIntoView: "cursor",
        readOnly: true
    }, {
        name: "golineup",
        bindKey: e("Up", "Up|Ctrl-P"),
        exec: function (i, h) {
            i.navigateUp(h.times)
        },
        multiSelectAction: "forEach",
        scrollIntoView: "cursor",
        readOnly: true
    }, {
        name: "selecttoend",
        bindKey: e("Ctrl-Shift-End", "Command-Shift-Down"),
        exec: function (h) {
            h.getSelection().selectFileEnd()
        },
        multiSelectAction: "forEach",
        readOnly: true,
        scrollIntoView: "animate",
        aceCommandGroup: "fileJump"
    }, {
        name: "gotoend",
        bindKey: e("Ctrl-End", "Command-End|Command-Down"),
        exec: function (h) {
            h.navigateFileEnd()
        },
        multiSelectAction: "forEach",
        readOnly: true,
        scrollIntoView: "animate",
        aceCommandGroup: "fileJump"
    }, {
        name: "selectdown",
        bindKey: e("Shift-Down", "Shift-Down"),
        exec: function (h) {
            h.getSelection().selectDown()
        },
        multiSelectAction: "forEach",
        scrollIntoView: "cursor",
        readOnly: true
    }, {
        name: "golinedown",
        bindKey: e("Down", "Down|Ctrl-N"),
        exec: function (i, h) {
            i.navigateDown(h.times)
        },
        multiSelectAction: "forEach",
        scrollIntoView: "cursor",
        readOnly: true
    }, {
        name: "selectwordleft",
        bindKey: e("Ctrl-Shift-Left", "Option-Shift-Left"),
        exec: function (h) {
            h.getSelection().selectWordLeft()
        },
        multiSelectAction: "forEach",
        scrollIntoView: "cursor",
        readOnly: true
    }, {
        name: "gotowordleft",
        bindKey: e("Ctrl-Left", "Option-Left"),
        exec: function (h) {
            h.navigateWordLeft()
        },
        multiSelectAction: "forEach",
        scrollIntoView: "cursor",
        readOnly: true
    }, {
        name: "selecttolinestart",
        bindKey: e("Alt-Shift-Left", "Command-Shift-Left"),
        exec: function (h) {
            h.getSelection().selectLineStart()
        },
        multiSelectAction: "forEach",
        scrollIntoView: "cursor",
        readOnly: true
    }, {
        name: "gotolinestart",
        bindKey: e("Alt-Left|Home", "Command-Left|Home|Ctrl-A"),
        exec: function (h) {
            h.navigateLineStart()
        },
        multiSelectAction: "forEach",
        scrollIntoView: "cursor",
        readOnly: true
    }, {
        name: "selectleft",
        bindKey: e("Shift-Left", "Shift-Left"),
        exec: function (h) {
            h.getSelection().selectLeft()
        },
        multiSelectAction: "forEach",
        scrollIntoView: "cursor",
        readOnly: true
    }, {
        name: "gotoleft",
        bindKey: e("Left", "Left|Ctrl-B"),
        exec: function (i, h) {
            i.navigateLeft(h.times)
        },
        multiSelectAction: "forEach",
        scrollIntoView: "cursor",
        readOnly: true
    }, {
        name: "selectwordright",
        bindKey: e("Ctrl-Shift-Right", "Option-Shift-Right"),
        exec: function (h) {
            h.getSelection().selectWordRight()
        },
        multiSelectAction: "forEach",
        scrollIntoView: "cursor",
        readOnly: true
    }, {
        name: "gotowordright",
        bindKey: e("Ctrl-Right", "Option-Right"),
        exec: function (h) {
            h.navigateWordRight()
        },
        multiSelectAction: "forEach",
        scrollIntoView: "cursor",
        readOnly: true
    }, {
        name: "selecttolineend",
        bindKey: e("Alt-Shift-Right", "Command-Shift-Right"),
        exec: function (h) {
            h.getSelection().selectLineEnd()
        },
        multiSelectAction: "forEach",
        scrollIntoView: "cursor",
        readOnly: true
    }, {
        name: "gotolineend",
        bindKey: e("Alt-Right|End", "Command-Right|End|Ctrl-E"),
        exec: function (h) {
            h.navigateLineEnd()
        },
        multiSelectAction: "forEach",
        scrollIntoView: "cursor",
        readOnly: true
    }, {
        name: "selectright",
        bindKey: e("Shift-Right", "Shift-Right"),
        exec: function (h) {
            h.getSelection().selectRight()
        },
        multiSelectAction: "forEach",
        scrollIntoView: "cursor",
        readOnly: true
    }, {
        name: "gotoright",
        bindKey: e("Right", "Right|Ctrl-F"),
        exec: function (i, h) {
            i.navigateRight(h.times)
        },
        multiSelectAction: "forEach",
        scrollIntoView: "cursor",
        readOnly: true
    }, {
        name: "selectpagedown",
        bindKey: "Shift-PageDown",
        exec: function (h) {
            h.selectPageDown()
        },
        readOnly: true
    }, {
        name: "pagedown",
        bindKey: e(null, "Option-PageDown"),
        exec: function (h) {
            h.scrollPageDown()
        },
        readOnly: true
    }, {
        name: "gotopagedown",
        bindKey: e("PageDown", "PageDown|Ctrl-V"),
        exec: function (h) {
            h.gotoPageDown()
        },
        readOnly: true
    }, {
        name: "selectpageup",
        bindKey: "Shift-PageUp",
        exec: function (h) {
            h.selectPageUp()
        },
        readOnly: true
    }, {
        name: "pageup",
        bindKey: e(null, "Option-PageUp"),
        exec: function (h) {
            h.scrollPageUp()
        },
        readOnly: true
    }, {
        name: "gotopageup",
        bindKey: "PageUp",
        exec: function (h) {
            h.gotoPageUp()
        },
        readOnly: true
    }, {
        name: "scrollup",
        bindKey: e("Ctrl-Up", null),
        exec: function (h) {
            h.renderer.scrollBy(0, -2 * h.renderer.layerConfig.lineHeight)
        },
        readOnly: true
    }, {
        name: "scrolldown",
        bindKey: e("Ctrl-Down", null),
        exec: function (h) {
            h.renderer.scrollBy(0, 2 * h.renderer.layerConfig.lineHeight)
        },
        readOnly: true
    }, {
        name: "selectlinestart",
        bindKey: "Shift-Home",
        exec: function (h) {
            h.getSelection().selectLineStart()
        },
        multiSelectAction: "forEach",
        scrollIntoView: "cursor",
        readOnly: true
    }, {
        name: "selectlineend",
        bindKey: "Shift-End",
        exec: function (h) {
            h.getSelection().selectLineEnd()
        },
        multiSelectAction: "forEach",
        scrollIntoView: "cursor",
        readOnly: true
    }, {
        name: "togglerecording",
        bindKey: e("Ctrl-Alt-E", "Command-Option-E"),
        exec: function (h) {
            h.commands.toggleRecording(h)
        },
        readOnly: true
    }, {
        name: "replaymacro",
        bindKey: e("Ctrl-Shift-E", "Command-Shift-E"),
        exec: function (h) {
            h.commands.replay(h)
        },
        readOnly: true
    }, {
        name: "jumptomatching",
        bindKey: e("Ctrl-P", "Ctrl-P"),
        exec: function (h) {
            h.jumpToMatching()
        },
        multiSelectAction: "forEach",
        scrollIntoView: "animate",
        readOnly: true
    }, {
        name: "selecttomatching",
        bindKey: e("Ctrl-Shift-P", "Ctrl-Shift-P"),
        exec: function (h) {
            h.jumpToMatching(true)
        },
        multiSelectAction: "forEach",
        scrollIntoView: "animate",
        readOnly: true
    }, {
        name: "expandToMatching",
        bindKey: e("Ctrl-Shift-M", "Ctrl-Shift-M"),
        exec: function (h) {
            h.jumpToMatching(true, true)
        },
        multiSelectAction: "forEach",
        scrollIntoView: "animate",
        readOnly: true
    }, {
        name: "passKeysToBrowser",
        bindKey: e(null, null),
        exec: function () { },
        passEvent: true,
        readOnly: true
    }, {
        name: "cut",
        exec: function (i) {
            var h = i.getSelectionRange();
            i._emit("cut", h);
            if (!i.selection.isEmpty()) {
                i.session.remove(h);
                i.clearSelection()
            }
        },
        scrollIntoView: "cursor",
        multiSelectAction: "forEach"
    }, {
        name: "removeline",
        bindKey: e("Ctrl-D", "Command-D"),
        exec: function (h) {
            h.removeLines()
        },
        scrollIntoView: "cursor",
        multiSelectAction: "forEachLine"
    }, {
        name: "duplicateSelection",
        bindKey: e("Ctrl-Shift-D", "Command-Shift-D"),
        exec: function (h) {
            h.duplicateSelection()
        },
        scrollIntoView: "cursor",
        multiSelectAction: "forEach"
    }, {
        name: "sortlines",
        bindKey: e("Ctrl-Alt-S", "Command-Alt-S"),
        exec: function (h) {
            h.sortLines()
        },
        scrollIntoView: "selection",
        multiSelectAction: "forEachLine"
    }, {
        name: "togglecomment",
        bindKey: e("Ctrl-/", "Command-/"),
        exec: function (h) {
            h.toggleCommentLines()
        },
        multiSelectAction: "forEachLine",
        scrollIntoView: "selectionPart"
    }, {
        name: "toggleBlockComment",
        bindKey: e("Ctrl-Shift-/", "Command-Shift-/"),
        exec: function (h) {
            h.toggleBlockComment()
        },
        multiSelectAction: "forEach",
        scrollIntoView: "selectionPart"
    }, {
        name: "modifyNumberUp",
        bindKey: e("Ctrl-Shift-Up", "Alt-Shift-Up"),
        exec: function (h) {
            h.modifyNumber(1)
        },
        scrollIntoView: "cursor",
        multiSelectAction: "forEach"
    }, {
        name: "modifyNumberDown",
        bindKey: e("Ctrl-Shift-Down", "Alt-Shift-Down"),
        exec: function (h) {
            h.modifyNumber(-1)
        },
        scrollIntoView: "cursor",
        multiSelectAction: "forEach"
    }, {
        name: "replace",
        bindKey: e("Ctrl-H", "Command-Option-F"),
        exec: function (h) {
            b.loadModule("ace/ext/searchbox", function (i) {
                i.Search(h, true)
            })
        }
    }, {
        name: "undo",
        bindKey: e("Ctrl-Z", "Command-Z"),
        exec: function (h) {
            h.undo()
        }
    }, {
        name: "redo",
        bindKey: e("Ctrl-Shift-Z|Ctrl-Y", "Command-Shift-Z|Command-Y"),
        exec: function (h) {
            h.redo()
        }
    }, {
        name: "copylinesup",
        bindKey: e("Alt-Shift-Up", "Command-Option-Up"),
        exec: function (h) {
            h.copyLinesUp()
        },
        scrollIntoView: "cursor"
    }, {
        name: "movelinesup",
        bindKey: e("Alt-Up", "Option-Up"),
        exec: function (h) {
            h.moveLinesUp()
        },
        scrollIntoView: "cursor"
    }, {
        name: "copylinesdown",
        bindKey: e("Alt-Shift-Down", "Command-Option-Down"),
        exec: function (h) {
            h.copyLinesDown()
        },
        scrollIntoView: "cursor"
    }, {
        name: "movelinesdown",
        bindKey: e("Alt-Down", "Option-Down"),
        exec: function (h) {
            h.moveLinesDown()
        },
        scrollIntoView: "cursor"
    }, {
        name: "del",
        bindKey: e("Delete", "Delete|Ctrl-D|Shift-Delete"),
        exec: function (h) {
            h.remove("right")
        },
        multiSelectAction: "forEach",
        scrollIntoView: "cursor"
    }, {
        name: "backspace",
        bindKey: e("Shift-Backspace|Backspace", "Ctrl-Backspace|Shift-Backspace|Backspace|Ctrl-H"),
        exec: function (h) {
            h.remove("left")
        },
        multiSelectAction: "forEach",
        scrollIntoView: "cursor"
    }, {
        name: "cut_or_delete",
        bindKey: e("Shift-Delete", null),
        exec: function (h) {
            if (h.selection.isEmpty()) {
                h.remove("left")
            } else {
                return false
            }
        },
        multiSelectAction: "forEach",
        scrollIntoView: "cursor"
    }, {
        name: "removetolinestart",
        bindKey: e("Alt-Backspace", "Command-Backspace"),
        exec: function (h) {
            h.removeToLineStart()
        },
        multiSelectAction: "forEach",
        scrollIntoView: "cursor"
    }, {
        name: "removetolineend",
        bindKey: e("Alt-Delete", "Ctrl-K"),
        exec: function (h) {
            h.removeToLineEnd()
        },
        multiSelectAction: "forEach",
        scrollIntoView: "cursor"
    }, {
        name: "removewordleft",
        bindKey: e("Ctrl-Backspace", "Alt-Backspace|Ctrl-Alt-Backspace"),
        exec: function (h) {
            h.removeWordLeft()
        },
        multiSelectAction: "forEach",
        scrollIntoView: "cursor"
    }, {
        name: "removewordright",
        bindKey: e("Ctrl-Delete", "Alt-Delete"),
        exec: function (h) {
            h.removeWordRight()
        },
        multiSelectAction: "forEach",
        scrollIntoView: "cursor"
    }, {
        name: "outdent",
        bindKey: e("Shift-Tab", "Shift-Tab"),
        exec: function (h) {
            h.blockOutdent()
        },
        multiSelectAction: "forEach",
        scrollIntoView: "selectionPart"
    }, {
        name: "indent",
        bindKey: e("Tab", "Tab"),
        exec: function (h) {
            h.indent()
        },
        multiSelectAction: "forEach",
        scrollIntoView: "selectionPart"
    }, {
        name: "blockoutdent",
        bindKey: e("Ctrl-[", "Ctrl-["),
        exec: function (h) {
            h.blockOutdent()
        },
        multiSelectAction: "forEachLine",
        scrollIntoView: "selectionPart"
    }, {
        name: "blockindent",
        bindKey: e("Ctrl-]", "Ctrl-]"),
        exec: function (h) {
            h.blockIndent()
        },
        multiSelectAction: "forEachLine",
        scrollIntoView: "selectionPart"
    }, {
        name: "insertstring",
        exec: function (h, i) {
            h.insert(i)
        },
        multiSelectAction: "forEach",
        scrollIntoView: "cursor"
    }, {
        name: "inserttext",
        exec: function (i, h) {
            i.insert(g.stringRepeat(h.text || "", h.times || 1))
        },
        multiSelectAction: "forEach",
        scrollIntoView: "cursor"
    }, {
        name: "splitline",
        bindKey: e(null, "Ctrl-O"),
        exec: function (h) {
            h.splitLine()
        },
        multiSelectAction: "forEach",
        scrollIntoView: "cursor"
    }, {
        name: "transposeletters",
        bindKey: e("Ctrl-T", "Ctrl-T"),
        exec: function (h) {
            h.transposeLetters()
        },
        multiSelectAction: function (h) {
            h.transposeSelections(1)
        },
        scrollIntoView: "cursor"
    }, {
        name: "touppercase",
        bindKey: e("Ctrl-U", "Ctrl-U"),
        exec: function (h) {
            h.toUpperCase()
        },
        multiSelectAction: "forEach",
        scrollIntoView: "cursor"
    }, {
        name: "tolowercase",
        bindKey: e("Ctrl-Shift-U", "Ctrl-Shift-U"),
        exec: function (h) {
            h.toLowerCase()
        },
        multiSelectAction: "forEach",
        scrollIntoView: "cursor"
    }, {
        name: "expandtoline",
        bindKey: e("Ctrl-Shift-L", "Command-Shift-L"),
        exec: function (i) {
            var h = i.selection.getRange();
            h.start.column = h.end.column = 0;
            h.end.row++;
            i.selection.setRange(h, false)
        },
        multiSelectAction: "forEach",
        scrollIntoView: "cursor",
        readOnly: true
    }, {
        name: "joinlines",
        bindKey: e(null, null),
        exec: function (o) {
            var q = o.selection.isBackwards();
            var p = q ? o.selection.getSelectionLead() : o.selection.getSelectionAnchor();
            var r = q ? o.selection.getSelectionAnchor() : o.selection.getSelectionLead();
            var m = o.session.doc.getLine(p.row).length;
            var k = o.session.doc.getTextRange(o.selection.getRange());
            var l = k.replace(/\n\s*/, " ").length;
            var j = o.session.doc.getLine(p.row);
            for (var n = p.row + 1; n <= r.row + 1; n++) {
                var h = g.stringTrimLeft(g.stringTrimRight(o.session.doc.getLine(n)));
                if (h.length !== 0) {
                    h = " " + h
                }
                j += h
            }
            if (r.row + 1 < (o.session.doc.getLength() - 1)) {
                j += o.session.doc.getNewLineCharacter()
            }
            o.clearSelection();
            o.session.doc.replace(new f(p.row, 0, r.row + 2, 0), j);
            if (l > 0) {
                o.selection.moveCursorTo(p.row, p.column);
                o.selection.selectTo(p.row, p.column + l)
            } else {
                m = o.session.doc.getLine(p.row).length > m ? (m + 1) : m;
                o.selection.moveCursorTo(p.row, m)
            }
        },
        multiSelectAction: "forEach",
        readOnly: true
    }, {
        name: "invertSelection",
        bindKey: e(null, null),
        exec: function (m) {
            var k = m.session.doc.getLength() - 1;
            var n = m.session.doc.getLine(k).length;
            var h = m.selection.rangeList.ranges;
            var j = [];
            if (h.length < 1) {
                h = [m.selection.getRange()]
            }
            for (var l = 0; l < h.length; l++) {
                if (l == (h.length - 1)) {
                    if (!(h[l].end.row === k && h[l].end.column === n)) {
                        j.push(new f(h[l].end.row, h[l].end.column, k, n))
                    }
                }
                if (l === 0) {
                    if (!(h[l].start.row === 0 && h[l].start.column === 0)) {
                        j.push(new f(0, 0, h[l].start.row, h[l].start.column))
                    }
                } else {
                    j.push(new f(h[l - 1].end.row, h[l - 1].end.column, h[l].start.row, h[l].start.column))
                }
            }
            m.exitMultiSelectMode();
            m.clearSelection();
            for (var l = 0; l < j.length; l++) {
                m.selection.addRange(j[l], false)
            }
        },
        readOnly: true,
        scrollIntoView: "none"
    }]
});
define("ace/editor", ["require", "exports", "module", "ace/lib/fixoldbrowsers", "ace/lib/oop", "ace/lib/dom", "ace/lib/lang", "ace/lib/useragent", "ace/keyboard/textinput", "ace/mouse/mouse_handler", "ace/mouse/fold_handler", "ace/keyboard/keybinding", "ace/edit_session", "ace/search", "ace/range", "ace/lib/event_emitter", "ace/commands/command_manager", "ace/commands/default_commands", "ace/config", "ace/token_iterator"], function (i, s, c) {
    i("./lib/fixoldbrowsers");
    var o = i("./lib/oop");
    var n = i("./lib/dom");
    var t = i("./lib/lang");
    var m = i("./lib/useragent");
    var b = i("./keyboard/textinput").TextInput;
    var q = i("./mouse/mouse_handler").MouseHandler;
    var d = i("./mouse/fold_handler").FoldHandler;
    var g = i("./keyboard/keybinding").KeyBinding;
    var a = i("./edit_session").EditSession;
    var h = i("./search").Search;
    var p = i("./range").Range;
    var f = i("./lib/event_emitter").EventEmitter;
    var k = i("./commands/command_manager").CommandManager;
    var j = i("./commands/default_commands").commands;
    var r = i("./config");
    var e = i("./token_iterator").TokenIterator;
    var l = function (v, w) {
        var u = v.getContainerElement();
        this.container = u;
        this.renderer = v;
        this.commands = new k(m.isMac ? "mac" : "win", j);
        this.textInput = new b(v.getTextAreaContainer(), this);
        this.renderer.textarea = this.textInput.getElement();
        this.keyBinding = new g(this);
        this.$mouseHandler = new q(this);
        new d(this);
        this.$blockScrolling = 0;
        this.$search = new h().set({
            wrap: true
        });
        this.$historyTracker = this.$historyTracker.bind(this);
        this.commands.on("exec", this.$historyTracker);
        this.$initOperationListeners();
        this._$emitInputEvent = t.delayedCall(function () {
            this._signal("input", {});
            if (this.session && this.session.bgTokenizer) {
                this.session.bgTokenizer.scheduleStart()
            }
        }
            .bind(this));
        this.on("change", function (y, x) {
            x._$emitInputEvent.schedule(31)
        });
        this.setSession(w || new a(""));
        r.resetOptions(this);
        r._signal("editor", this)
    };
    (function () {
        o.implement(this, f);
        this.$initOperationListeners = function () {
            function u(v) {
                return v[v.length - 1]
            }
            this.selections = [];
            this.commands.on("exec", this.startOperation.bind(this), true);
            this.commands.on("afterExec", this.endOperation.bind(this), true);
            this.$opResetTimer = t.delayedCall(this.endOperation.bind(this));
            this.on("change", function () {
                this.curOp || this.startOperation();
                this.curOp.docChanged = true
            }
                .bind(this), true);
            this.on("changeSelection", function () {
                this.curOp || this.startOperation();
                this.curOp.selectionChanged = true
            }
                .bind(this), true)
        }
            ;
        this.curOp = null;
        this.prevOp = {};
        this.startOperation = function (u) {
            if (this.curOp) {
                if (!u || this.curOp.command) {
                    return
                }
                this.prevOp = this.curOp
            }
            if (!u) {
                this.previousCommand = null;
                u = {}
            }
            this.$opResetTimer.schedule();
            this.curOp = {
                command: u.command || {},
                args: u.args,
                scrollTop: this.renderer.scrollTop
            };
            if (this.curOp.command.name && this.curOp.command.scrollIntoView !== undefined) {
                this.$blockScrolling++
            }
        }
            ;
        this.endOperation = function (w) {
            if (this.curOp) {
                if (w && w.returnValue === false) {
                    return this.curOp = null
                }
                this._signal("beforeEndOperation");
                var x = this.curOp.command;
                if (x.name && this.$blockScrolling > 0) {
                    this.$blockScrolling--
                }
                var y = x && x.scrollIntoView;
                if (y) {
                    switch (y) {
                        case "center-animate":
                            y = "animate";
                        case "center":
                            this.renderer.scrollCursorIntoView(null, 0.5);
                            break;
                        case "animate":
                        case "cursor":
                            this.renderer.scrollCursorIntoView();
                            break;
                        case "selectionPart":
                            var u = this.selection.getRange();
                            var v = this.renderer.layerConfig;
                            if (u.start.row >= v.lastRow || u.end.row <= v.firstRow) {
                                this.renderer.scrollSelectionIntoView(this.selection.anchor, this.selection.lead)
                            }
                            break;
                        default:
                            break
                    }
                    if (y == "animate") {
                        this.renderer.animateScrolling(this.curOp.scrollTop)
                    }
                }
                this.prevOp = this.curOp;
                this.curOp = null
            }
        }
            ;
        this.$mergeableCommands = ["backspace", "del", "insertstring"];
        this.$historyTracker = function (w) {
            if (!this.$mergeUndoDeltas) {
                return
            }
            var v = this.prevOp;
            var u = this.$mergeableCommands;
            var y = v.command && (w.command.name == v.command.name);
            if (w.command.name == "insertstring") {
                var x = w.args;
                if (this.mergeNextCommand === undefined) {
                    this.mergeNextCommand = true
                }
                y = y && this.mergeNextCommand && (!/\s/.test(x) || /\s/.test(v.args));
                this.mergeNextCommand = true
            } else {
                y = y && u.indexOf(w.command.name) !== -1
            }
            if (this.$mergeUndoDeltas != "always" && Date.now() - this.sequenceStartTime > 2000) {
                y = false
            }
            if (y) {
                this.session.mergeUndoDeltas = true
            } else {
                if (u.indexOf(w.command.name) !== -1) {
                    this.sequenceStartTime = Date.now()
                }
            }
        }
            ;
        this.setKeyboardHandler = function (w, v) {
            if (w && typeof w === "string") {
                this.$keybindingId = w;
                var u = this;
                r.loadModule(["keybinding", w], function (x) {
                    if (u.$keybindingId == w) {
                        u.keyBinding.setKeyboardHandler(x && x.handler)
                    }
                    v && v()
                })
            } else {
                this.$keybindingId = null;
                this.keyBinding.setKeyboardHandler(w);
                v && v()
            }
        }
            ;
        this.getKeyboardHandler = function () {
            return this.keyBinding.getKeyboardHandler()
        }
            ;
        this.setSession = function (w) {
            if (this.session == w) {
                return
            }
            if (this.curOp) {
                this.endOperation()
            }
            this.curOp = {};
            var v = this.session;
            if (v) {
                this.session.removeEventListener("change", this.$onDocumentChange);
                this.session.removeEventListener("changeMode", this.$onChangeMode);
                this.session.removeEventListener("tokenizerUpdate", this.$onTokenizerUpdate);
                this.session.removeEventListener("changeTabSize", this.$onChangeTabSize);
                this.session.removeEventListener("changeWrapLimit", this.$onChangeWrapLimit);
                this.session.removeEventListener("changeWrapMode", this.$onChangeWrapMode);
                this.session.removeEventListener("onChangeFold", this.$onChangeFold);
                this.session.removeEventListener("changeFrontMarker", this.$onChangeFrontMarker);
                this.session.removeEventListener("changeBackMarker", this.$onChangeBackMarker);
                this.session.removeEventListener("changeBreakpoint", this.$onChangeBreakpoint);
                this.session.removeEventListener("changeAnnotation", this.$onChangeAnnotation);
                this.session.removeEventListener("changeOverwrite", this.$onCursorChange);
                this.session.removeEventListener("changeScrollTop", this.$onScrollTopChange);
                this.session.removeEventListener("changeScrollLeft", this.$onScrollLeftChange);
                var u = this.session.getSelection();
                u.removeEventListener("changeCursor", this.$onCursorChange);
                u.removeEventListener("changeSelection", this.$onSelectionChange)
            }
            this.session = w;
            if (w) {
                this.$onDocumentChange = this.onDocumentChange.bind(this);
                w.addEventListener("change", this.$onDocumentChange);
                this.renderer.setSession(w);
                this.$onChangeMode = this.onChangeMode.bind(this);
                w.addEventListener("changeMode", this.$onChangeMode);
                this.$onTokenizerUpdate = this.onTokenizerUpdate.bind(this);
                w.addEventListener("tokenizerUpdate", this.$onTokenizerUpdate);
                this.$onChangeTabSize = this.renderer.onChangeTabSize.bind(this.renderer);
                w.addEventListener("changeTabSize", this.$onChangeTabSize);
                this.$onChangeWrapLimit = this.onChangeWrapLimit.bind(this);
                w.addEventListener("changeWrapLimit", this.$onChangeWrapLimit);
                this.$onChangeWrapMode = this.onChangeWrapMode.bind(this);
                w.addEventListener("changeWrapMode", this.$onChangeWrapMode);
                this.$onChangeFold = this.onChangeFold.bind(this);
                w.addEventListener("changeFold", this.$onChangeFold);
                this.$onChangeFrontMarker = this.onChangeFrontMarker.bind(this);
                this.session.addEventListener("changeFrontMarker", this.$onChangeFrontMarker);
                this.$onChangeBackMarker = this.onChangeBackMarker.bind(this);
                this.session.addEventListener("changeBackMarker", this.$onChangeBackMarker);
                this.$onChangeBreakpoint = this.onChangeBreakpoint.bind(this);
                this.session.addEventListener("changeBreakpoint", this.$onChangeBreakpoint);
                this.$onChangeAnnotation = this.onChangeAnnotation.bind(this);
                this.session.addEventListener("changeAnnotation", this.$onChangeAnnotation);
                this.$onCursorChange = this.onCursorChange.bind(this);
                this.session.addEventListener("changeOverwrite", this.$onCursorChange);
                this.$onScrollTopChange = this.onScrollTopChange.bind(this);
                this.session.addEventListener("changeScrollTop", this.$onScrollTopChange);
                this.$onScrollLeftChange = this.onScrollLeftChange.bind(this);
                this.session.addEventListener("changeScrollLeft", this.$onScrollLeftChange);
                this.selection = w.getSelection();
                this.selection.addEventListener("changeCursor", this.$onCursorChange);
                this.$onSelectionChange = this.onSelectionChange.bind(this);
                this.selection.addEventListener("changeSelection", this.$onSelectionChange);
                this.onChangeMode();
                this.$blockScrolling += 1;
                this.onCursorChange();
                this.$blockScrolling -= 1;
                this.onScrollTopChange();
                this.onScrollLeftChange();
                this.onSelectionChange();
                this.onChangeFrontMarker();
                this.onChangeBackMarker();
                this.onChangeBreakpoint();
                this.onChangeAnnotation();
                this.session.getUseWrapMode() && this.renderer.adjustWrapLimit();
                this.renderer.updateFull()
            } else {
                this.selection = null;
                this.renderer.setSession(w)
            }
            this._signal("changeSession", {
                session: w,
                oldSession: v
            });
            this.curOp = null;
            v && v._signal("changeEditor", {
                oldEditor: this
            });
            w && w._signal("changeEditor", {
                editor: this
            })
        }
            ;
        this.getSession = function () {
            return this.session
        }
            ;
        this.setValue = function (u, v) {
            this.session.doc.setValue(u);
            if (!v) {
                this.selectAll()
            } else {
                if (v == 1) {
                    this.navigateFileEnd()
                } else {
                    if (v == -1) {
                        this.navigateFileStart()
                    }
                }
            }
            return u
        }
            ;
        this.getValue = function () {
            return this.session.getValue()
        }
            ;
        this.getSelection = function () {
            return this.selection
        }
            ;
        this.resize = function (u) {
            this.renderer.onResize(u)
        }
            ;
        this.setTheme = function (v, u) {
            this.renderer.setTheme(v, u)
        }
            ;
        this.getTheme = function () {
            return this.renderer.getTheme()
        }
            ;
        this.setStyle = function (u) {
            this.renderer.setStyle(u)
        }
            ;
        this.unsetStyle = function (u) {
            this.renderer.unsetStyle(u)
        }
            ;
        this.getFontSize = function () {
            return this.getOption("fontSize") || n.computedStyle(this.container, "fontSize")
        }
            ;
        this.setFontSize = function (u) {
            this.setOption("fontSize", u)
        }
            ;
        this.$highlightBrackets = function () {
            if (this.session.$bracketHighlight) {
                this.session.removeMarker(this.session.$bracketHighlight);
                this.session.$bracketHighlight = null
            }
            if (this.$highlightPending) {
                return
            }
            var u = this;
            this.$highlightPending = true;
            setTimeout(function () {
                u.$highlightPending = false;
                var w = u.session;
                if (!w || !w.bgTokenizer) {
                    return
                }
                var x = w.findMatchingBracket(u.getCursorPosition());
                if (x) {
                    var v = new p(x.row, x.column, x.row, x.column + 1)
                } else {
                    if (w.$mode.getMatching) {
                        var v = w.$mode.getMatching(u.session)
                    }
                }
                if (v) {
                    w.$bracketHighlight = w.addMarker(v, "ace_bracket", "text")
                }
            }, 50)
        }
            ;
        this.$highlightTags = function () {
            if (this.$highlightTagPending) {
                return
            }
            var u = this;
            this.$highlightTagPending = true;
            setTimeout(function () {
                u.$highlightTagPending = false;
                var B = u.session;
                if (!B || !B.bgTokenizer) {
                    return
                }
                var C = u.getCursorPosition();
                var A = new e(u.session, C.row, C.column);
                var x = A.getCurrentToken();
                if (!x || !/\b(?:tag-open|tag-name)/.test(x.type)) {
                    B.removeMarker(B.$tagHighlight);
                    B.$tagHighlight = null;
                    return
                }
                if (x.type.indexOf("tag-open") != -1) {
                    x = A.stepForward();
                    if (!x) {
                        return
                    }
                }
                var E = x.value;
                var y = 0;
                var v = A.stepBackward();
                if (v.value == "<") {
                    do {
                        v = x;
                        x = A.stepForward();
                        if (x && x.value === E && x.type.indexOf("tag-name") !== -1) {
                            if (v.value === "<") {
                                y++
                            } else {
                                if (v.value === "</") {
                                    y--
                                }
                            }
                        }
                    } while (x && y >= 0)
                } else {
                    do {
                        x = v;
                        v = A.stepBackward();
                        if (x && x.value === E && x.type.indexOf("tag-name") !== -1) {
                            if (v.value === "<") {
                                y++
                            } else {
                                if (v.value === "</") {
                                    y--
                                }
                            }
                        }
                    } while (v && y <= 0);
                    A.stepForward()
                }
                if (!x) {
                    B.removeMarker(B.$tagHighlight);
                    B.$tagHighlight = null;
                    return
                }
                var D = A.getCurrentTokenRow();
                var w = A.getCurrentTokenColumn();
                var z = new p(D, w, D, w + x.value.length);
                if (B.$tagHighlight && z.compareRange(B.$backMarkers[B.$tagHighlight].range) !== 0) {
                    B.removeMarker(B.$tagHighlight);
                    B.$tagHighlight = null
                }
                if (z && !B.$tagHighlight) {
                    B.$tagHighlight = B.addMarker(z, "ace_bracket", "text")
                }
            }, 50)
        }
            ;
        this.focus = function () {
            var u = this;
            setTimeout(function () {
                u.textInput.focus()
            });
            this.textInput.focus()
        }
            ;
        this.isFocused = function () {
            return this.textInput.isFocused()
        }
            ;
        this.blur = function () {
            this.textInput.blur()
        }
            ;
        this.onFocus = function (u) {
            if (this.$isFocused) {
                return
            }
            this.$isFocused = true;
            this.renderer.showCursor();
            this.renderer.visualizeFocus();
            this._emit("focus", u)
        }
            ;
        this.onBlur = function (u) {
            if (!this.$isFocused) {
                return
            }
            this.$isFocused = false;
            this.renderer.hideCursor();
            this.renderer.visualizeBlur();
            this._emit("blur", u)
        }
            ;
        this.$cursorChange = function () {
            this.renderer.updateCursor()
        }
            ;
        this.onDocumentChange = function (w) {
            var x = w.data;
            var u = x.range;
            var v;
            if (u.start.row == u.end.row && x.action != "insertLines" && x.action != "removeLines") {
                v = u.end.row
            } else {
                v = Infinity
            }
            this.renderer.updateLines(u.start.row, v, this.session.$useWrapMode);
            this._signal("change", w);
            this.$cursorChange();
            this.$updateHighlightActiveLine()
        }
            ;
        this.onTokenizerUpdate = function (v) {
            var u = v.data;
            this.renderer.updateLines(u.first, u.last)
        }
            ;
        this.onScrollTopChange = function () {
            this.renderer.scrollToY(this.session.getScrollTop())
        }
            ;
        this.onScrollLeftChange = function () {
            this.renderer.scrollToX(this.session.getScrollLeft())
        }
            ;
        this.onCursorChange = function () {
            this.$cursorChange();
            if (!this.$blockScrolling) {
                r.warn("Automatically scrolling cursor into view after selection change", "this will be disabled in the next version", "set editor.$blockScrolling = Infinity to disable this message");
                this.renderer.scrollCursorIntoView()
            }
            this.$highlightBrackets();
            this.$highlightTags();
            this.$updateHighlightActiveLine();
            this._signal("changeSelection")
        }
            ;
        this.$updateHighlightActiveLine = function () {
            var w = this.getSession();
            var v;
            if (this.$highlightActiveLine) {
                if ((this.$selectionStyle != "line" || !this.selection.isMultiLine())) {
                    v = this.getCursorPosition()
                }
                if (this.renderer.$maxLines && this.session.getLength() === 1 && !(this.renderer.$minLines > 1)) {
                    v = false
                }
            }
            if (w.$highlightLineMarker && !v) {
                w.removeMarker(w.$highlightLineMarker.id);
                w.$highlightLineMarker = null
            } else {
                if (!w.$highlightLineMarker && v) {
                    var u = new p(v.row, v.column, v.row, Infinity);
                    u.id = w.addMarker(u, "ace_active-line", "screenLine");
                    w.$highlightLineMarker = u
                } else {
                    if (v) {
                        w.$highlightLineMarker.start.row = v.row;
                        w.$highlightLineMarker.end.row = v.row;
                        w.$highlightLineMarker.start.column = v.column;
                        w._signal("changeBackMarker")
                    }
                }
            }
        }
            ;
        this.onSelectionChange = function (y) {
            var x = this.session;
            if (x.$selectionMarker) {
                x.removeMarker(x.$selectionMarker)
            }
            x.$selectionMarker = null;
            if (!this.selection.isEmpty()) {
                var u = this.selection.getRange();
                var w = this.getSelectionStyle();
                x.$selectionMarker = x.addMarker(u, "ace_selection", w)
            } else {
                this.$updateHighlightActiveLine()
            }
            var v = this.$highlightSelectedWord && this.$getSelectionHighLightRegexp();
            this.session.highlight(v);
            this._signal("changeSelection")
        }
            ;
        this.$getSelectionHighLightRegexp = function () {
            var A = this.session;
            var x = this.getSelectionRange();
            if (x.isEmpty() || x.isMultiLine()) {
                return
            }
            var B = x.start.column - 1;
            var z = x.end.column + 1;
            var v = A.getLine(x.start.row);
            var u = v.length;
            var y = v.substring(Math.max(B, 0), Math.min(z, u));
            if ((B >= 0 && /^[\w\d]/.test(y)) || (z <= u && /[\w\d]$/.test(y))) {
                return
            }
            y = v.substring(x.start.column, x.end.column);
            if (!/^[\w\d]+$/.test(y)) {
                return
            }
            var w = this.$search.$assembleRegExp({
                wholeWord: true,
                caseSensitive: true,
                needle: y
            });
            return w
        }
            ;
        this.onChangeFrontMarker = function () {
            this.renderer.updateFrontMarkers()
        }
            ;
        this.onChangeBackMarker = function () {
            this.renderer.updateBackMarkers()
        }
            ;
        this.onChangeBreakpoint = function () {
            this.renderer.updateBreakpoints()
        }
            ;
        this.onChangeAnnotation = function () {
            this.renderer.setAnnotations(this.session.getAnnotations())
        }
            ;
        this.onChangeMode = function (u) {
            this.renderer.updateText();
            this._emit("changeMode", u)
        }
            ;
        this.onChangeWrapLimit = function () {
            this.renderer.updateFull()
        }
            ;
        this.onChangeWrapMode = function () {
            this.renderer.onResize(true)
        }
            ;
        this.onChangeFold = function () {
            this.$updateHighlightActiveLine();
            this.renderer.updateFull()
        }
            ;
        this.getSelectedText = function () {
            return this.session.getTextRange(this.getSelectionRange())
        }
            ;
        this.getCopyText = function () {
            var u = this.getSelectedText();
            this._signal("copy", u);
            return u
        }
            ;
        this.onCopy = function () {
            this.commands.exec("copy", this)
        }
            ;
        this.onCut = function () {
            this.commands.exec("cut", this)
        }
            ;
        this.onPaste = function (z) {
            if (this.$readOnly) {
                return
            }
            var y = {
                text: z
            };
            this._signal("paste", y);
            z = y.text;
            if (!this.inMultiSelectMode || this.inVirtualSelectionMode) {
                this.insert(z)
            } else {
                var v = z.split(/\r\n|\r|\n/);
                var u = this.selection.rangeList.ranges;
                if (v.length > u.length || v.length < 2 || !v[1]) {
                    return this.commands.exec("insertstring", this, z)
                }
                for (var x = u.length; x--;) {
                    var w = u[x];
                    if (!w.isEmpty()) {
                        this.session.remove(w)
                    }
                    this.session.insert(w.start, v[x])
                }
            }
            this.renderer.scrollCursorIntoView()
        }
            ;
        this.execCommand = function (v, u) {
            return this.commands.exec(v, this, u)
        }
            ;
        this.insert = function (E, C) {
            var D = this.session;
            var A = D.getMode();
            var F = this.getCursorPosition();
            if (this.getBehavioursEnabled() && !C) {
                var w = A.transformAction(D.getState(F.row), "insertion", this, D, E);
                if (w) {
                    if (E !== w.text) {
                        this.session.mergeUndoDeltas = false;
                        this.$mergeNextCommand = false
                    }
                    E = w.text
                }
            }
            if (E == "\t") {
                E = this.session.getTabString()
            }
            if (!this.selection.isEmpty()) {
                var z = this.getSelectionRange();
                F = this.session.remove(z);
                this.clearSelection()
            } else {
                if (this.session.getOverwrite()) {
                    var z = new p.fromPoints(F, F);
                    z.end.column += E.length;
                    this.session.remove(z)
                }
            }
            if (E == "\n" || E == "\r\n") {
                var H = D.getLine(F.row);
                if (F.column > H.search(/\S|$/)) {
                    var B = H.substr(F.column).search(/\S|$/);
                    D.doc.removeInLine(F.row, F.column, F.column + B)
                }
            }
            this.clearSelection();
            var v = F.column;
            var y = D.getState(F.row);
            var H = D.getLine(F.row);
            var G = A.checkOutdent(y, H, E);
            var x = D.insert(F, E);
            if (w && w.selection) {
                if (w.selection.length == 2) {
                    this.selection.setSelectionRange(new p(F.row, v + w.selection[0], F.row, v + w.selection[1]))
                } else {
                    this.selection.setSelectionRange(new p(F.row + w.selection[0], w.selection[1], F.row + w.selection[2], w.selection[3]))
                }
            }
            if (D.getDocument().isNewLine(E)) {
                var u = A.getNextLineIndent(y, H.slice(0, F.column), D.getTabString());
                D.insert({
                    row: F.row + 1,
                    column: 0
                }, u)
            }
            if (G) {
                A.autoOutdent(y, D, F.row)
            }
        }
            ;
        this.onTextInput = function (u) {
            this.keyBinding.onTextInput(u)
        }
            ;
        this.onCommandKey = function (w, u, v) {
            this.keyBinding.onCommandKey(w, u, v)
        }
            ;
        this.setOverwrite = function (u) {
            this.session.setOverwrite(u)
        }
            ;
        this.getOverwrite = function () {
            return this.session.getOverwrite()
        }
            ;
        this.toggleOverwrite = function () {
            this.session.toggleOverwrite()
        }
            ;
        this.setScrollSpeed = function (u) {
            this.setOption("scrollSpeed", u)
        }
            ;
        this.getScrollSpeed = function () {
            return this.getOption("scrollSpeed")
        }
            ;
        this.setDragDelay = function (u) {
            this.setOption("dragDelay", u)
        }
            ;
        this.getDragDelay = function () {
            return this.getOption("dragDelay")
        }
            ;
        this.setSelectionStyle = function (u) {
            this.setOption("selectionStyle", u)
        }
            ;
        this.getSelectionStyle = function () {
            return this.getOption("selectionStyle")
        }
            ;
        this.setHighlightActiveLine = function (u) {
            this.setOption("highlightActiveLine", u)
        }
            ;
        this.getHighlightActiveLine = function () {
            return this.getOption("highlightActiveLine")
        }
            ;
        this.setHighlightGutterLine = function (u) {
            this.setOption("highlightGutterLine", u)
        }
            ;
        this.getHighlightGutterLine = function () {
            return this.getOption("highlightGutterLine")
        }
            ;
        this.setHighlightSelectedWord = function (u) {
            this.setOption("highlightSelectedWord", u)
        }
            ;
        this.getHighlightSelectedWord = function () {
            return this.$highlightSelectedWord
        }
            ;
        this.setAnimatedScroll = function (u) {
            this.renderer.setAnimatedScroll(u)
        }
            ;
        this.getAnimatedScroll = function () {
            return this.renderer.getAnimatedScroll()
        }
            ;
        this.setShowInvisibles = function (u) {
            this.renderer.setShowInvisibles(u)
        }
            ;
        this.getShowInvisibles = function () {
            return this.renderer.getShowInvisibles()
        }
            ;
        this.setDisplayIndentGuides = function (u) {
            this.renderer.setDisplayIndentGuides(u)
        }
            ;
        this.getDisplayIndentGuides = function () {
            return this.renderer.getDisplayIndentGuides()
        }
            ;
        this.setShowPrintMargin = function (u) {
            this.renderer.setShowPrintMargin(u)
        }
            ;
        this.getShowPrintMargin = function () {
            return this.renderer.getShowPrintMargin()
        }
            ;
        this.setPrintMarginColumn = function (u) {
            this.renderer.setPrintMarginColumn(u)
        }
            ;
        this.getPrintMarginColumn = function () {
            return this.renderer.getPrintMarginColumn()
        }
            ;
        this.setReadOnly = function (u) {
            this.setOption("readOnly", u)
        }
            ;
        this.getReadOnly = function () {
            return this.getOption("readOnly")
        }
            ;
        this.setBehavioursEnabled = function (u) {
            this.setOption("behavioursEnabled", u)
        }
            ;
        this.getBehavioursEnabled = function () {
            return this.getOption("behavioursEnabled")
        }
            ;
        this.setWrapBehavioursEnabled = function (u) {
            this.setOption("wrapBehavioursEnabled", u)
        }
            ;
        this.getWrapBehavioursEnabled = function () {
            return this.getOption("wrapBehavioursEnabled")
        }
            ;
        this.setShowFoldWidgets = function (u) {
            this.setOption("showFoldWidgets", u)
        }
            ;
        this.getShowFoldWidgets = function () {
            return this.getOption("showFoldWidgets")
        }
            ;
        this.setFadeFoldWidgets = function (u) {
            this.setOption("fadeFoldWidgets", u)
        }
            ;
        this.getFadeFoldWidgets = function () {
            return this.getOption("fadeFoldWidgets")
        }
            ;
        this.remove = function (w) {
            if (this.selection.isEmpty()) {
                if (w == "left") {
                    this.selection.selectLeft()
                } else {
                    this.selection.selectRight()
                }
            }
            var v = this.getSelectionRange();
            if (this.getBehavioursEnabled()) {
                var y = this.session;
                var x = y.getState(v.start.row);
                var A = y.getMode().transformAction(x, "deletion", this, y, v);
                if (v.end.column === 0) {
                    var z = y.getTextRange(v);
                    if (z[z.length - 1] == "\n") {
                        var u = y.getLine(v.end.row);
                        if (/^\s+$/.test(u)) {
                            v.end.column = u.length
                        }
                    }
                }
                if (A) {
                    v = A
                }
            }
            this.session.remove(v);
            this.clearSelection()
        }
            ;
        this.removeWordRight = function () {
            if (this.selection.isEmpty()) {
                this.selection.selectWordRight()
            }
            this.session.remove(this.getSelectionRange());
            this.clearSelection()
        }
            ;
        this.removeWordLeft = function () {
            if (this.selection.isEmpty()) {
                this.selection.selectWordLeft()
            }
            this.session.remove(this.getSelectionRange());
            this.clearSelection()
        }
            ;
        this.removeToLineStart = function () {
            if (this.selection.isEmpty()) {
                this.selection.selectLineStart()
            }
            this.session.remove(this.getSelectionRange());
            this.clearSelection()
        }
            ;
        this.removeToLineEnd = function () {
            if (this.selection.isEmpty()) {
                this.selection.selectLineEnd()
            }
            var u = this.getSelectionRange();
            if (u.start.column == u.end.column && u.start.row == u.end.row) {
                u.end.column = 0;
                u.end.row++
            }
            this.session.remove(u);
            this.clearSelection()
        }
            ;
        this.splitLine = function () {
            if (!this.selection.isEmpty()) {
                this.session.remove(this.getSelectionRange());
                this.clearSelection()
            }
            var u = this.getCursorPosition();
            this.insert("\n");
            this.moveCursorToPosition(u)
        }
            ;
        this.transposeLetters = function () {
            if (!this.selection.isEmpty()) {
                return
            }
            var y = this.getCursorPosition();
            var w = y.column;
            if (w === 0) {
                return
            }
            var u = this.session.getLine(y.row);
            var x, v;
            if (w < u.length) {
                x = u.charAt(w) + u.charAt(w - 1);
                v = new p(y.row, w - 1, y.row, w + 1)
            } else {
                x = u.charAt(w - 1) + u.charAt(w - 2);
                v = new p(y.row, w - 2, y.row, w)
            }
            this.session.replace(v, x)
        }
            ;
        this.toLowerCase = function () {
            var v = this.getSelectionRange();
            if (this.selection.isEmpty()) {
                this.selection.selectWord()
            }
            var u = this.getSelectionRange();
            var w = this.session.getTextRange(u);
            this.session.replace(u, w.toLowerCase());
            this.selection.setSelectionRange(v)
        }
            ;
        this.toUpperCase = function () {
            var v = this.getSelectionRange();
            if (this.selection.isEmpty()) {
                this.selection.selectWord()
            }
            var u = this.getSelectionRange();
            var w = this.session.getTextRange(u);
            this.session.replace(u, w.toUpperCase());
            this.selection.setSelectionRange(v)
        }
            ;
        this.indent = function () {
            var y = this.session;
            var v = this.getSelectionRange();
            if (v.start.row < v.end.row) {
                var B = this.$getSelectedRows();
                y.indentRows(B.first, B.last, "\t");
                return
            } else {
                if (v.start.column < v.end.column) {
                    var A = y.getTextRange(v);
                    if (!/^\s+$/.test(A)) {
                        var B = this.$getSelectedRows();
                        y.indentRows(B.first, B.last, "\t");
                        return
                    }
                }
            }
            var D = y.getLine(v.start.row);
            var w = v.start;
            var C = y.getTabSize();
            var u = y.documentToScreenColumn(w.row, w.column);
            if (this.session.getUseSoftTabs()) {
                var x = (C - u % C);
                var z = t.stringRepeat(" ", x)
            } else {
                var x = u % C;
                while (D[v.start.column] == " " && x) {
                    v.start.column--;
                    x--
                }
                this.selection.setSelectionRange(v);
                z = "\t"
            }
            return this.insert(z)
        }
            ;
        this.blockIndent = function () {
            var u = this.$getSelectedRows();
            this.session.indentRows(u.first, u.last, "\t")
        }
            ;
        this.blockOutdent = function () {
            var u = this.session.getSelection();
            this.session.outdentRows(u.getRange())
        }
            ;
        this.sortLines = function () {
            var y = this.$getSelectedRows();
            var z = this.session;
            var w = [];
            for (x = y.first; x <= y.last; x++) {
                w.push(z.getLine(x))
            }
            w.sort(function (B, A) {
                if (B.toLowerCase() < A.toLowerCase()) {
                    return -1
                }
                if (B.toLowerCase() > A.toLowerCase()) {
                    return 1
                }
                return 0
            });
            var v = new p(0, 0, 0, 0);
            for (var x = y.first; x <= y.last; x++) {
                var u = z.getLine(x);
                v.start.row = x;
                v.end.row = x;
                v.end.column = u.length;
                z.replace(v, w[x - y.first])
            }
        }
            ;
        this.toggleCommentLines = function () {
            var v = this.session.getState(this.getCursorPosition().row);
            var u = this.$getSelectedRows();
            this.session.getMode().toggleCommentLines(v, this.session, u.first, u.last)
        }
            ;
        this.toggleBlockComment = function () {
            var w = this.getCursorPosition();
            var v = this.session.getState(w.row);
            var u = this.getSelectionRange();
            this.session.getMode().toggleBlockComment(v, this.session, u, w)
        }
            ;
        this.getNumberAt = function (z, x) {
            var v = /[\-]?[0-9]+(?:\.[0-9]+)?/g;
            v.lastIndex = 0;
            var w = this.session.getLine(z);
            while (v.lastIndex < x) {
                var u = v.exec(w);
                if (u.index <= x && u.index + u[0].length >= x) {
                    var y = {
                        value: u[0],
                        start: u.index,
                        end: u.index + u[0].length
                    };
                    return y
                }
            }
            return null
        }
            ;
        this.modifyNumber = function (w) {
            var E = this.selection.getCursor().row;
            var v = this.selection.getCursor().column;
            var D = new p(E, v - 1, E, v);
            var z = this.session.getTextRange(D);
            if (!isNaN(parseFloat(z)) && isFinite(z)) {
                var A = this.getNumberAt(E, v);
                if (A) {
                    var x = A.value.indexOf(".") >= 0 ? A.start + A.value.indexOf(".") + 1 : A.end;
                    var u = A.start + A.value.length - x;
                    var C = parseFloat(A.value);
                    C *= Math.pow(10, u);
                    if (x !== A.end && v < x) {
                        w *= Math.pow(10, A.end - v - 1)
                    } else {
                        w *= Math.pow(10, A.end - v)
                    }
                    C += w;
                    C /= Math.pow(10, u);
                    var y = C.toFixed(u);
                    var B = new p(E, A.start, E, A.end);
                    this.session.replace(B, y);
                    this.moveCursorTo(E, Math.max(A.start + 1, v + y.length - A.value.length))
                }
            }
        }
            ;
        this.removeLines = function () {
            var v = this.$getSelectedRows();
            var u;
            if (v.first === 0 || v.last + 1 < this.session.getLength()) {
                u = new p(v.first, 0, v.last + 1, 0)
            } else {
                u = new p(v.first - 1, this.session.getLine(v.first - 1).length, v.last, this.session.getLine(v.last).length)
            }
            this.session.remove(u);
            this.clearSelection()
        }
            ;
        this.duplicateSelection = function () {
            var y = this.selection;
            var z = this.session;
            var v = y.getRange();
            var w = y.isBackwards();
            if (v.isEmpty()) {
                var A = v.start.row;
                z.duplicateLines(A, A)
            } else {
                var u = w ? v.start : v.end;
                var x = z.insert(u, z.getTextRange(v), false);
                v.start = u;
                v.end = x;
                y.setSelectionRange(v, w)
            }
        }
            ;
        this.moveLinesDown = function () {
            this.$moveLines(1, false)
        }
            ;
        this.moveLinesUp = function () {
            this.$moveLines(-1, false)
        }
            ;
        this.moveText = function (u, v, w) {
            return this.session.moveText(u, v, w)
        }
            ;
        this.copyLinesUp = function () {
            this.$moveLines(-1, true)
        }
            ;
        this.copyLinesDown = function () {
            this.$moveLines(1, true)
        }
            ;
        this.$moveLines = function (x, u) {
            var I, E;
            var G = this.selection;
            if (!G.inMultiSelectMode || this.inVirtualSelectionMode) {
                var C = G.toOrientedRange();
                I = this.$getSelectedRows(C);
                E = this.session.$moveLines(I.first, I.last, u ? 0 : x);
                if (u && x == -1) {
                    E = 0
                }
                C.moveBy(E, 0);
                G.fromOrientedRange(C)
            } else {
                var v = G.rangeList.ranges;
                G.rangeList.detach(this.session);
                this.inVirtualSelectionMode = true;
                var F = 0;
                var D = 0;
                var y = v.length;
                for (var A = 0; A < y; A++) {
                    var z = A;
                    v[A].moveBy(F, 0);
                    I = this.$getSelectedRows(v[A]);
                    var B = I.first;
                    var H = I.last;
                    while (++A < y) {
                        if (D) {
                            v[A].moveBy(D, 0)
                        }
                        var w = this.$getSelectedRows(v[A]);
                        if (u && w.first != H) {
                            break
                        } else {
                            if (!u && w.first > H + 1) {
                                break
                            }
                        }
                        H = w.last
                    }
                    A--;
                    F = this.session.$moveLines(B, H, u ? 0 : x);
                    if (u && x == -1) {
                        z = A + 1
                    }
                    while (z <= A) {
                        v[z].moveBy(F, 0);
                        z++
                    }
                    if (!u) {
                        F = 0
                    }
                    D += F
                }
                G.fromOrientedRange(G.ranges[0]);
                G.rangeList.attach(this.session);
                this.inVirtualSelectionMode = false
            }
        }
            ;
        this.$getSelectedRows = function (u) {
            u = (u || this.getSelectionRange()).collapseRows();
            return {
                first: this.session.getRowFoldStart(u.start.row),
                last: this.session.getRowFoldEnd(u.end.row)
            }
        }
            ;
        this.onCompositionStart = function (u) {
            this.renderer.showComposition(this.getCursorPosition())
        }
            ;
        this.onCompositionUpdate = function (u) {
            this.renderer.setCompositionText(u)
        }
            ;
        this.onCompositionEnd = function () {
            this.renderer.hideComposition()
        }
            ;
        this.getFirstVisibleRow = function () {
            return this.renderer.getFirstVisibleRow()
        }
            ;
        this.getLastVisibleRow = function () {
            return this.renderer.getLastVisibleRow()
        }
            ;
        this.isRowVisible = function (u) {
            return (u >= this.getFirstVisibleRow() && u <= this.getLastVisibleRow())
        }
            ;
        this.isRowFullyVisible = function (u) {
            return (u >= this.renderer.getFirstFullyVisibleRow() && u <= this.renderer.getLastFullyVisibleRow())
        }
            ;
        this.$getVisibleRowCount = function () {
            return this.renderer.getScrollBottomRow() - this.renderer.getScrollTopRow() + 1
        }
            ;
        this.$moveByPage = function (w, u) {
            var y = this.renderer;
            var v = this.renderer.layerConfig;
            var x = w * Math.floor(v.height / v.lineHeight);
            this.$blockScrolling++;
            if (u === true) {
                this.selection.$moveSelection(function () {
                    this.moveCursorBy(x, 0)
                })
            } else {
                if (u === false) {
                    this.selection.moveCursorBy(x, 0);
                    this.selection.clearSelection()
                }
            }
            this.$blockScrolling--;
            var z = y.scrollTop;
            y.scrollBy(0, x * v.lineHeight);
            if (u != null) {
                y.scrollCursorIntoView(null, 0.5)
            }
            y.animateScrolling(z)
        }
            ;
        this.selectPageDown = function () {
            this.$moveByPage(1, true)
        }
            ;
        this.selectPageUp = function () {
            this.$moveByPage(-1, true)
        }
            ;
        this.gotoPageDown = function () {
            this.$moveByPage(1, false)
        }
            ;
        this.gotoPageUp = function () {
            this.$moveByPage(-1, false)
        }
            ;
        this.scrollPageDown = function () {
            this.$moveByPage(1)
        }
            ;
        this.scrollPageUp = function () {
            this.$moveByPage(-1)
        }
            ;
        this.scrollToRow = function (u) {
            this.renderer.scrollToRow(u)
        }
            ;
        this.scrollToLine = function (v, u, w, x) {
            this.renderer.scrollToLine(v, u, w, x)
        }
            ;
        this.centerSelection = function () {
            var u = this.getSelectionRange();
            var v = {
                row: Math.floor(u.start.row + (u.end.row - u.start.row) / 2),
                column: Math.floor(u.start.column + (u.end.column - u.start.column) / 2)
            };
            this.renderer.alignCursor(v, 0.5)
        }
            ;
        this.getCursorPosition = function () {
            return this.selection.getCursor()
        }
            ;
        this.getCursorPositionScreen = function () {
            return this.session.documentToScreenPosition(this.getCursorPosition())
        }
            ;
        this.getSelectionRange = function () {
            return this.selection.getRange()
        }
            ;
        this.selectAll = function () {
            this.$blockScrolling += 1;
            this.selection.selectAll();
            this.$blockScrolling -= 1
        }
            ;
        this.clearSelection = function () {
            this.selection.clearSelection()
        }
            ;
        this.moveCursorTo = function (v, u) {
            this.selection.moveCursorTo(v, u)
        }
            ;
        this.moveCursorToPosition = function (u) {
            this.selection.moveCursorToPosition(u)
        }
            ;
        this.jumpToMatching = function (D, E) {
            var F = this.getCursorPosition();
            var B = new e(this.session, F.row, F.column);
            var u = B.getCurrentToken();
            var x = u || B.stepForward();
            if (!x) {
                return
            }
            var v;
            var I = false;
            var z = {};
            var y = F.column - x.start;
            var w;
            var G = {
                ")": "(",
                "(": "(",
                "]": "[",
                "[": "[",
                "{": "{",
                "}": "{"
            };
            do {
                if (x.value.match(/[{}()\[\]]/g)) {
                    for (; y < x.value.length && !I; y++) {
                        if (!G[x.value[y]]) {
                            continue
                        }
                        w = G[x.value[y]] + "." + x.type.replace("rparen", "lparen");
                        if (isNaN(z[w])) {
                            z[w] = 0
                        }
                        switch (x.value[y]) {
                            case "(":
                            case "[":
                            case "{":
                                z[w]++;
                                break;
                            case ")":
                            case "]":
                            case "}":
                                z[w]--;
                                if (z[w] === -1) {
                                    v = "bracket";
                                    I = true
                                }
                                break
                        }
                    }
                } else {
                    if (x && x.type.indexOf("tag-name") !== -1) {
                        if (isNaN(z[x.value])) {
                            z[x.value] = 0
                        }
                        if (u.value === "<") {
                            z[x.value]++
                        } else {
                            if (u.value === "</") {
                                z[x.value]--
                            }
                        }
                        if (z[x.value] === -1) {
                            v = "tag";
                            I = true
                        }
                    }
                }
                if (!I) {
                    u = x;
                    x = B.stepForward();
                    y = 0
                }
            } while (x && !I);
            if (!v) {
                return
            }
            var A, C;
            if (v === "bracket") {
                A = this.session.getBracketRange(F);
                if (!A) {
                    A = new p(B.getCurrentTokenRow(), B.getCurrentTokenColumn() + y - 1, B.getCurrentTokenRow(), B.getCurrentTokenColumn() + y - 1);
                    C = A.start;
                    if (E || C.row === F.row && Math.abs(C.column - F.column) < 2) {
                        A = this.session.getBracketRange(C)
                    }
                }
            } else {
                if (v === "tag") {
                    if (x && x.type.indexOf("tag-name") !== -1) {
                        var H = x.value
                    } else {
                        return
                    }
                    A = new p(B.getCurrentTokenRow(), B.getCurrentTokenColumn() - 2, B.getCurrentTokenRow(), B.getCurrentTokenColumn() - 2);
                    if (A.compare(F.row, F.column) === 0) {
                        I = false;
                        do {
                            x = u;
                            u = B.stepBackward();
                            if (u) {
                                if (u.type.indexOf("tag-close") !== -1) {
                                    A.setEnd(B.getCurrentTokenRow(), B.getCurrentTokenColumn() + 1)
                                }
                                if (x.value === H && x.type.indexOf("tag-name") !== -1) {
                                    if (u.value === "<") {
                                        z[H]++
                                    } else {
                                        if (u.value === "</") {
                                            z[H]--
                                        }
                                    }
                                    if (z[H] === 0) {
                                        I = true
                                    }
                                }
                            }
                        } while (u && !I)
                    }
                    if (x && x.type.indexOf("tag-name")) {
                        C = A.start;
                        if (C.row == F.row && Math.abs(C.column - F.column) < 2) {
                            C = A.end
                        }
                    }
                }
            }
            C = A && A.cursor || C;
            if (C) {
                if (D) {
                    if (A && E) {
                        this.selection.setRange(A)
                    } else {
                        if (A && A.isEqual(this.getSelectionRange())) {
                            this.clearSelection()
                        } else {
                            this.selection.selectTo(C.row, C.column)
                        }
                    }
                } else {
                    this.selection.moveTo(C.row, C.column)
                }
            }
        }
            ;
        this.gotoLine = function (u, w, v) {
            this.selection.clearSelection();
            this.session.unfold({
                row: u - 1,
                column: w || 0
            });
            this.$blockScrolling += 1;
            this.exitMultiSelectMode && this.exitMultiSelectMode();
            this.moveCursorTo(u - 1, w || 0);
            this.$blockScrolling -= 1;
            if (!this.isRowFullyVisible(u - 1)) {
                this.scrollToLine(u - 1, true, v)
            }
        }
            ;
        this.navigateTo = function (v, u) {
            this.selection.moveTo(v, u)
        }
            ;
        this.navigateUp = function (v) {
            if (this.selection.isMultiLine() && !this.selection.isBackwards()) {
                var u = this.selection.anchor.getPosition();
                return this.moveCursorToPosition(u)
            }
            this.selection.clearSelection();
            this.selection.moveCursorBy(-v || -1, 0)
        }
            ;
        this.navigateDown = function (v) {
            if (this.selection.isMultiLine() && this.selection.isBackwards()) {
                var u = this.selection.anchor.getPosition();
                return this.moveCursorToPosition(u)
            }
            this.selection.clearSelection();
            this.selection.moveCursorBy(v || 1, 0)
        }
            ;
        this.navigateLeft = function (v) {
            if (!this.selection.isEmpty()) {
                var u = this.getSelectionRange().start;
                this.moveCursorToPosition(u)
            } else {
                v = v || 1;
                while (v--) {
                    this.selection.moveCursorLeft()
                }
            }
            this.clearSelection()
        }
            ;
        this.navigateRight = function (v) {
            if (!this.selection.isEmpty()) {
                var u = this.getSelectionRange().end;
                this.moveCursorToPosition(u)
            } else {
                v = v || 1;
                while (v--) {
                    this.selection.moveCursorRight()
                }
            }
            this.clearSelection()
        }
            ;
        this.navigateLineStart = function () {
            this.selection.moveCursorLineStart();
            this.clearSelection()
        }
            ;
        this.navigateLineEnd = function () {
            this.selection.moveCursorLineEnd();
            this.clearSelection()
        }
            ;
        this.navigateFileEnd = function () {
            this.selection.moveCursorFileEnd();
            this.clearSelection()
        }
            ;
        this.navigateFileStart = function () {
            this.selection.moveCursorFileStart();
            this.clearSelection()
        }
            ;
        this.navigateWordRight = function () {
            this.selection.moveCursorWordRight();
            this.clearSelection()
        }
            ;
        this.navigateWordLeft = function () {
            this.selection.moveCursorWordLeft();
            this.clearSelection()
        }
            ;
        this.replace = function (w, v) {
            if (v) {
                this.$search.set(v)
            }
            var u = this.$search.find(this.session);
            var x = 0;
            if (!u) {
                return x
            }
            if (this.$tryReplace(u, w)) {
                x = 1
            }
            if (u !== null) {
                this.selection.setSelectionRange(u);
                this.renderer.scrollSelectionIntoView(u.start, u.end)
            }
            return x
        }
            ;
        this.replaceAll = function (y, v) {
            if (v) {
                this.$search.set(v)
            }
            var u = this.$search.findAll(this.session);
            var z = 0;
            if (!u.length) {
                return z
            }
            this.$blockScrolling += 1;
            var x = this.getSelectionRange();
            this.selection.moveTo(0, 0);
            for (var w = u.length - 1; w >= 0; --w) {
                if (this.$tryReplace(u[w], y)) {
                    z++
                }
            }
            this.selection.setSelectionRange(x);
            this.$blockScrolling -= 1;
            return z
        }
            ;
        this.$tryReplace = function (v, w) {
            var u = this.session.getTextRange(v);
            w = this.$search.replace(u, w);
            if (w !== null) {
                v.end = this.session.replace(v, w);
                return v
            } else {
                return null
            }
        }
            ;
        this.getLastSearchOptions = function () {
            return this.$search.getOptions()
        }
            ;
        this.find = function (y, x, v) {
            if (!x) {
                x = {}
            }
            if (typeof y == "string" || y instanceof RegExp) {
                x.needle = y
            } else {
                if (typeof y == "object") {
                    o.mixin(x, y)
                }
            }
            var u = this.selection.getRange();
            if (x.needle == null) {
                y = this.session.getTextRange(u) || this.$search.$options.needle;
                if (!y) {
                    u = this.session.getWordRange(u.start.row, u.start.column);
                    y = this.session.getTextRange(u)
                }
                this.$search.set({
                    needle: y
                })
            }
            this.$search.set(x);
            if (!x.start) {
                this.$search.set({
                    start: u
                })
            }
            var w = this.$search.find(this.session);
            if (x.preventScroll) {
                return w
            }
            if (w) {
                this.revealRange(w, v);
                return w
            }
            if (x.backwards) {
                u.start = u.end
            } else {
                u.end = u.start
            }
            this.selection.setRange(u)
        }
            ;
        this.findNext = function (v, u) {
            this.find({
                skipCurrent: true,
                backwards: false
            }, v, u)
        }
            ;
        this.findPrevious = function (v, u) {
            this.find(v, {
                skipCurrent: true,
                backwards: true
            }, u)
        }
            ;
        this.revealRange = function (v, u) {
            this.$blockScrolling += 1;
            this.session.unfold(v);
            this.selection.setSelectionRange(v);
            this.$blockScrolling -= 1;
            var w = this.renderer.scrollTop;
            this.renderer.scrollSelectionIntoView(v.start, v.end, 0.5);
            if (u !== false) {
                this.renderer.animateScrolling(w)
            }
        }
            ;
        this.undo = function () {
            this.$blockScrolling++;
            this.session.getUndoManager().undo();
            this.$blockScrolling--;
            this.renderer.scrollCursorIntoView(null, 0.5)
        }
            ;
        this.redo = function () {
            this.$blockScrolling++;
            this.session.getUndoManager().redo();
            this.$blockScrolling--;
            this.renderer.scrollCursorIntoView(null, 0.5)
        }
            ;
        this.destroy = function () {
            this.renderer.destroy();
            this._signal("destroy", this);
            if (this.session) {
                this.session.destroy()
            }
        }
            ;
        this.setAutoScrollEditorIntoView = function (w) {
            if (!w) {
                return
            }
            var y;
            var u = this;
            var x = false;
            if (!this.$scrollAnchor) {
                this.$scrollAnchor = document.createElement("div")
            }
            var A = this.$scrollAnchor;
            A.style.cssText = "position:absolute";
            this.container.insertBefore(A, this.container.firstChild);
            var B = this.on("changeSelection", function () {
                x = true
            });
            var z = this.renderer.on("beforeRender", function () {
                if (x) {
                    y = u.renderer.container.getBoundingClientRect()
                }
            });
            var v = this.renderer.on("afterRender", function () {
                if (x && y && (u.isFocused() || u.searchBox && u.searchBox.isFocused())) {
                    var D = u.renderer;
                    var F = D.$cursorLayer.$pixelPos;
                    var C = D.layerConfig;
                    var E = F.top - C.offset;
                    if (F.top >= 0 && E + y.top < 0) {
                        x = true
                    } else {
                        if (F.top < C.height && F.top + y.top + C.lineHeight > window.innerHeight) {
                            x = false
                        } else {
                            x = null
                        }
                    }
                    if (x != null) {
                        A.style.top = E + "px";
                        A.style.left = F.left + "px";
                        A.style.height = C.lineHeight + "px";
                        A.scrollIntoView(x)
                    }
                    x = y = null
                }
            });
            this.setAutoScrollEditorIntoView = function (C) {
                if (C) {
                    return
                }
                delete this.setAutoScrollEditorIntoView;
                this.removeEventListener("changeSelection", B);
                this.renderer.removeEventListener("afterRender", v);
                this.renderer.removeEventListener("beforeRender", z)
            }
        }
            ;
        this.$resetCursorStyle = function () {
            var u = this.$cursorStyle || "ace";
            var v = this.renderer.$cursorLayer;
            if (!v) {
                return
            }
            v.setSmoothBlinking(/smooth/.test(u));
            v.isBlinking = !this.$readOnly && u != "wide";
            n.setCssClass(v.element, "ace_slim-cursors", /slim/.test(u))
        }
    }
    ).call(l.prototype);
    r.defineOptions(l.prototype, "editor", {
        selectionStyle: {
            set: function (u) {
                this.onSelectionChange();
                this._signal("changeSelectionStyle", {
                    data: u
                })
            },
            initialValue: "line"
        },
        highlightActiveLine: {
            set: function () {
                this.$updateHighlightActiveLine()
            },
            initialValue: true
        },
        highlightSelectedWord: {
            set: function (u) {
                this.$onSelectionChange()
            },
            initialValue: true
        },
        readOnly: {
            set: function (u) {
                this.$resetCursorStyle()
            },
            initialValue: false
        },
        cursorStyle: {
            set: function (u) {
                this.$resetCursorStyle()
            },
            values: ["ace", "slim", "smooth", "wide"],
            initialValue: "ace"
        },
        mergeUndoDeltas: {
            values: [false, true, "always"],
            initialValue: true
        },
        behavioursEnabled: {
            initialValue: true
        },
        wrapBehavioursEnabled: {
            initialValue: true
        },
        autoScrollEditorIntoView: {
            set: function (u) {
                this.setAutoScrollEditorIntoView(u)
            }
        },
        hScrollBarAlwaysVisible: "renderer",
        vScrollBarAlwaysVisible: "renderer",
        highlightGutterLine: "renderer",
        animatedScroll: "renderer",
        showInvisibles: "renderer",
        showPrintMargin: "renderer",
        printMarginColumn: "renderer",
        printMargin: "renderer",
        fadeFoldWidgets: "renderer",
        showFoldWidgets: "renderer",
        showLineNumbers: "renderer",
        showGutter: "renderer",
        displayIndentGuides: "renderer",
        fontSize: "renderer",
        fontFamily: "renderer",
        maxLines: "renderer",
        minLines: "renderer",
        scrollPastEnd: "renderer",
        fixedWidthGutter: "renderer",
        theme: "renderer",
        scrollSpeed: "$mouseHandler",
        dragDelay: "$mouseHandler",
        dragEnabled: "$mouseHandler",
        focusTimout: "$mouseHandler",
        tooltipFollowsMouse: "$mouseHandler",
        firstLineNumber: "session",
        overwrite: "session",
        newLineMode: "session",
        useWorker: "session",
        useSoftTabs: "session",
        tabSize: "session",
        wrap: "session",
        indentedSoftWrap: "session",
        foldStyle: "session",
        mode: "session"
    });
    s.Editor = l
});
define("ace/undomanager", ["require", "exports", "module"], function (b, a, c) {
    var d = function () {
        this.reset()
    };
    (function () {
        this.execute = function (e) {
            var f = e.args[0];
            this.$doc = e.args[1];
            if (e.merge && this.hasUndo()) {
                this.dirtyCounter--;
                f = this.$undoStack.pop().concat(f)
            }
            this.$undoStack.push(f);
            this.$redoStack = [];
            if (this.dirtyCounter < 0) {
                this.dirtyCounter = NaN
            }
            this.dirtyCounter++
        }
            ;
        this.undo = function (e) {
            var g = this.$undoStack.pop();
            var f = null;
            if (g) {
                f = this.$doc.undoChanges(g, e);
                this.$redoStack.push(g);
                this.dirtyCounter--
            }
            return f
        }
            ;
        this.redo = function (e) {
            var g = this.$redoStack.pop();
            var f = null;
            if (g) {
                f = this.$doc.redoChanges(g, e);
                this.$undoStack.push(g);
                this.dirtyCounter++
            }
            return f
        }
            ;
        this.reset = function () {
            this.$undoStack = [];
            this.$redoStack = [];
            this.dirtyCounter = 0
        }
            ;
        this.hasUndo = function () {
            return this.$undoStack.length > 0
        }
            ;
        this.hasRedo = function () {
            return this.$redoStack.length > 0
        }
            ;
        this.markClean = function () {
            this.dirtyCounter = 0
        }
            ;
        this.isClean = function () {
            return this.dirtyCounter === 0
        }
    }
    ).call(d.prototype);
    a.UndoManager = d
});
define("ace/layer/gutter", ["require", "exports", "module", "ace/lib/dom", "ace/lib/oop", "ace/lib/lang", "ace/lib/event_emitter"], function (b, a, c) {
    var h = b("../lib/dom");
    var f = b("../lib/oop");
    var g = b("../lib/lang");
    var e = b("../lib/event_emitter").EventEmitter;
    var d = function (i) {
        this.element = h.createElement("div");
        this.element.className = "ace_layer ace_gutter-layer";
        i.appendChild(this.element);
        this.setShowFoldWidgets(this.$showFoldWidgets);
        this.gutterWidth = 0;
        this.$annotations = [];
        this.$updateAnnotations = this.$updateAnnotations.bind(this);
        this.$cells = []
    };
    (function () {
        f.implement(this, e);
        this.setSession = function (i) {
            if (this.session) {
                this.session.removeEventListener("change", this.$updateAnnotations)
            }
            this.session = i;
            if (i) {
                i.on("change", this.$updateAnnotations)
            }
        }
            ;
        this.addGutterDecoration = function (j, i) {
            if (window.console) {
                console.warn && console.warn("deprecated use session.addGutterDecoration")
            }
            this.session.addGutterDecoration(j, i)
        }
            ;
        this.removeGutterDecoration = function (j, i) {
            if (window.console) {
                console.warn && console.warn("deprecated use session.removeGutterDecoration")
            }
            this.session.removeGutterDecoration(j, i)
        }
            ;
        this.setAnnotations = function (o) {
            this.$annotations = [];
            for (var l = 0; l < o.length; l++) {
                var j = o[l];
                var p = j.row;
                var n = this.$annotations[p];
                if (!n) {
                    n = this.$annotations[p] = {
                        text: []
                    }
                }
                var k = j.text;
                k = k ? g.escapeHTML(k) : j.html || "";
                if (n.text.indexOf(k) === -1) {
                    n.text.push(k)
                }
                var m = j.type;
                if (m == "error") {
                    n.className = " ace_error"
                } else {
                    if (m == "warning" && n.className != " ace_error") {
                        n.className = " ace_warning"
                    } else {
                        if (m == "info" && (!n.className)) {
                            n.className = " ace_info"
                        }
                    }
                }
            }
        }
            ;
        this.$updateAnnotations = function (l) {
            if (!this.$annotations.length) {
                return
            }
            var n = l.data;
            var j = n.range;
            var m = j.start.row;
            var i = j.end.row - m;
            if (i === 0) { } else {
                if (n.action == "removeText" || n.action == "removeLines") {
                    this.$annotations.splice(m, i + 1, null)
                } else {
                    var k = new Array(i + 1);
                    k.unshift(m, 1);
                    this.$annotations.splice.apply(this.$annotations, k)
                }
            }
        }
            ;
        this.update = function (C) {
            var j = this.session;
            var i = C.firstRow;
            var y = Math.min(C.lastRow + C.gutterOffset, j.getLength() - 1);
            var n = j.getNextFoldLine(i);
            var m = n ? n.start.row : Infinity;
            var x = this.$showFoldWidgets && j.foldWidgets;
            var t = j.$breakpoints;
            var o = j.$decorations;
            var A = j.$firstLineNumber;
            var s = 0;
            var r = j.gutterRenderer || this.$renderer;
            var k = null;
            var q = -1;
            var p = i;
            while (true) {
                if (p > m) {
                    p = n.end.row + 1;
                    n = j.getNextFoldLine(p, n);
                    m = n ? n.start.row : Infinity
                }
                if (p > y) {
                    while (this.$cells.length > q + 1) {
                        k = this.$cells.pop();
                        this.element.removeChild(k.element)
                    }
                    break
                }
                k = this.$cells[++q];
                if (!k) {
                    k = {
                        element: null,
                        textNode: null,
                        foldWidget: null
                    };
                    k.element = h.createElement("div");
                    k.textNode = document.createTextNode("");
                    k.element.appendChild(k.textNode);
                    this.element.appendChild(k.element);
                    this.$cells[q] = k
                }
                var l = "ace_gutter-cell ";
                if (t[p]) {
                    l += t[p]
                }
                if (o[p]) {
                    l += o[p]
                }
                if (this.$annotations[p]) {
                    l += this.$annotations[p].className
                }
                if (k.element.className != l) {
                    k.element.className = l
                }
                var w = j.getRowLength(p) * C.lineHeight + "px";
                if (w != k.element.style.height) {
                    k.element.style.height = w
                }
                if (x) {
                    var B = x[p];
                    if (B == null) {
                        B = x[p] = j.getFoldWidget(p)
                    }
                }
                if (B) {
                    if (!k.foldWidget) {
                        k.foldWidget = h.createElement("span");
                        k.element.appendChild(k.foldWidget)
                    }
                    var l = "ace_fold-widget ace_" + B;
                    if (B == "start" && p == m && p < n.end.row) {
                        l += " ace_closed"
                    } else {
                        l += " ace_open"
                    }
                    if (k.foldWidget.className != l) {
                        k.foldWidget.className = l
                    }
                    var w = C.lineHeight + "px";
                    if (k.foldWidget.style.height != w) {
                        k.foldWidget.style.height = w
                    }
                } else {
                    if (k.foldWidget) {
                        k.element.removeChild(k.foldWidget);
                        k.foldWidget = null
                    }
                }
                var u = s = r ? r.getText(j, p) : p + A;
                if (u != k.textNode.data) {
                    k.textNode.data = u
                }
                p++
            }
            this.element.style.height = C.minHeight + "px";
            if (this.$fixedWidth || j.$useWrapMode) {
                s = j.getLength() + A
            }
            var z = r ? r.getWidth(j, s, C) : s.toString().length * C.characterWidth;
            var v = this.$padding || this.$computePadding();
            z += v.left + v.right;
            if (z !== this.gutterWidth && !isNaN(z)) {
                this.gutterWidth = z;
                this.element.style.width = Math.ceil(this.gutterWidth) + "px";
                this._emit("changeGutterWidth", z)
            }
        }
            ;
        this.$fixedWidth = false;
        this.$showLineNumbers = true;
        this.$renderer = "";
        this.setShowLineNumbers = function (i) {
            this.$renderer = !i && {
                getWidth: function () {
                    return ""
                },
                getText: function () {
                    return ""
                }
            }
        }
            ;
        this.getShowLineNumbers = function () {
            return this.$showLineNumbers
        }
            ;
        this.$showFoldWidgets = true;
        this.setShowFoldWidgets = function (i) {
            if (i) {
                h.addCssClass(this.element, "ace_folding-enabled")
            } else {
                h.removeCssClass(this.element, "ace_folding-enabled")
            }
            this.$showFoldWidgets = i;
            this.$padding = null
        }
            ;
        this.getShowFoldWidgets = function () {
            return this.$showFoldWidgets
        }
            ;
        this.$computePadding = function () {
            if (!this.element.firstChild) {
                return {
                    left: 0,
                    right: 0
                }
            }
            var i = h.computedStyle(this.element.firstChild);
            this.$padding = {};
            this.$padding.left = parseInt(i.paddingLeft) + 1 || 0;
            this.$padding.right = parseInt(i.paddingRight) || 0;
            return this.$padding
        }
            ;
        this.getRegion = function (i) {
            var k = this.$padding || this.$computePadding();
            var j = this.element.getBoundingClientRect();
            if (i.x < k.left + j.left) {
                return "markers"
            }
            if (this.$showFoldWidgets && i.x > j.right - k.right) {
                return "foldWidgets"
            }
        }
    }
    ).call(d.prototype);
    a.Gutter = d
});
define("ace/layer/marker", ["require", "exports", "module", "ace/range", "ace/lib/dom"], function (c, b, d) {
    var e = c("../range").Range;
    var f = c("../lib/dom");
    var a = function (g) {
        this.element = f.createElement("div");
        this.element.className = "ace_layer ace_marker-layer";
        g.appendChild(this.element)
    };
    (function () {
        this.$padding = 0;
        this.setPadding = function (g) {
            this.$padding = g
        }
            ;
        this.setSession = function (g) {
            this.session = g
        }
            ;
        this.setMarkers = function (g) {
            this.markers = g
        }
            ;
        this.update = function (i) {
            var i = i || this.config;
            if (!i) {
                return
            }
            this.config = i;
            var k = [];
            for (var j in this.markers) {
                var g = this.markers[j];
                if (!g.range) {
                    g.update(k, this, this.session, i);
                    continue
                }
                var h = g.range.clipRows(i.firstRow, i.lastRow);
                if (h.isEmpty()) {
                    continue
                }
                h = h.toScreenRange(this.session);
                if (g.renderer) {
                    var m = this.$getTop(h.start.row, i);
                    var l = this.$padding + h.start.column * i.characterWidth;
                    g.renderer(k, h, l, m, i)
                } else {
                    if (g.type == "fullLine") {
                        this.drawFullLineMarker(k, h, g.clazz, i)
                    } else {
                        if (g.type == "screenLine") {
                            this.drawScreenLineMarker(k, h, g.clazz, i)
                        } else {
                            if (h.isMultiLine()) {
                                if (g.type == "text") {
                                    this.drawTextMarker(k, h, g.clazz, i)
                                } else {
                                    this.drawMultiLineMarker(k, h, g.clazz, i)
                                }
                            } else {
                                this.drawSingleLineMarker(k, h, g.clazz + " ace_start", i)
                            }
                        }
                    }
                }
            }
            this.element.innerHTML = k.join("")
        }
            ;
        this.$getTop = function (h, g) {
            return (h - g.firstRowScreen) * g.lineHeight
        }
            ;
        this.drawTextMarker = function (j, h, i, g, m) {
            var n = h.start.row;
            var l = this.session;
            var k = new e(n, h.start.column, n, l.getScreenLastRowColumn(n));
            this.drawSingleLineMarker(j, k, i + " ace_start", g, 1, m);
            n = h.end.row;
            k = new e(n, l.getRowWrapIndent(n), n, h.end.column);
            this.drawSingleLineMarker(j, k, i, g, 0, m);
            for (n = h.start.row + 1; n < h.end.row; n++) {
                k.start.row = n;
                k.start.column = l.getRowWrapIndent(n);
                k.end.row = n;
                k.end.column = l.getScreenLastRowColumn(n);
                this.drawSingleLineMarker(j, k, i, g, 1, m)
            }
        }
            ;
        this.drawMultiLineMarker = function (i, l, m, j, g) {
            var o = this.$padding;
            var p = j.lineHeight;
            var n = this.$getTop(l.start.row, j);
            var k = o + l.start.column * j.characterWidth;
            g = g || "";
            i.push("<div class='", m, " ace_start' style='", "height:", p, "px;", "right:0;", "top:", n, "px;", "left:", k, "px;", g, "'></div>");
            n = this.$getTop(l.end.row, j);
            var h = l.end.column * j.characterWidth;
            i.push("<div class='", m, "' style='", "height:", p, "px;", "width:", h, "px;", "top:", n, "px;", "left:", o, "px;", g, "'></div>");
            p = (l.end.row - l.start.row - 1) * j.lineHeight;
            if (p <= 0) {
                return
            }
            n = this.$getTop(l.start.row + 1, j);
            i.push("<div class='", m, "' style='", "height:", p, "px;", "right:0;", "top:", n, "px;", "left:", o, "px;", g, "'></div>")
        }
            ;
        this.drawSingleLineMarker = function (h, l, n, j, m, g) {
            var p = j.lineHeight;
            var i = (l.end.column + (m || 0) - l.start.column) * j.characterWidth;
            var o = this.$getTop(l.start.row, j);
            var k = this.$padding + l.start.column * j.characterWidth;
            h.push("<div class='", n, "' style='", "height:", p, "px;", "width:", i, "px;", "top:", o, "px;", "left:", k, "px;", g || "", "'></div>")
        }
            ;
        this.drawFullLineMarker = function (k, h, j, i, m) {
            var l = this.$getTop(h.start.row, i);
            var g = i.lineHeight;
            if (h.start.row != h.end.row) {
                g += this.$getTop(h.end.row, i) - l
            }
            k.push("<div class='", j, "' style='", "height:", g, "px;", "top:", l, "px;", "left:0;right:0;", m || "", "'></div>")
        }
            ;
        this.drawScreenLineMarker = function (k, h, j, i, m) {
            var l = this.$getTop(h.start.row, i);
            var g = i.lineHeight;
            k.push("<div class='", j, "' style='", "height:", g, "px;", "top:", l, "px;", "left:0;right:0;", m || "", "'></div>")
        }
    }
    ).call(a.prototype);
    b.Marker = a
});
define("ace/layer/text", ["require", "exports", "module", "ace/lib/oop", "ace/lib/dom", "ace/lib/lang", "ace/lib/useragent", "ace/lib/event_emitter"], function (e, g, b) {
    var h = e("../lib/oop");
    var f = e("../lib/dom");
    var a = e("../lib/lang");
    var c = e("../lib/useragent");
    var i = e("../lib/event_emitter").EventEmitter;
    var d = function (j) {
        this.element = f.createElement("div");
        this.element.className = "ace_layer ace_text-layer";
        j.appendChild(this.element);
        this.$updateEolChar = this.$updateEolChar.bind(this)
    };
    (function () {
        h.implement(this, i);
        this.EOF_CHAR = "\xB6";
        this.EOL_CHAR_LF = "\xAC";
        this.EOL_CHAR_CRLF = "\xa4";
        this.EOL_CHAR = this.EOL_CHAR_LF;
        this.TAB_CHAR = "\u2192";
        this.SPACE_CHAR = "\xB7";
        this.$padding = 0;
        this.$updateEolChar = function () {
            var j = this.session.doc.getNewLineCharacter() == "\n" ? this.EOL_CHAR_LF : this.EOL_CHAR_CRLF;
            if (this.EOL_CHAR != j) {
                this.EOL_CHAR = j;
                return true
            }
        }
            ;
        this.setPadding = function (j) {
            this.$padding = j;
            this.element.style.padding = "0 " + j + "px"
        }
            ;
        this.getLineHeight = function () {
            return this.$fontMetrics.$characterSize.height || 0
        }
            ;
        this.getCharacterWidth = function () {
            return this.$fontMetrics.$characterSize.width || 0
        }
            ;
        this.$setFontMetrics = function (j) {
            this.$fontMetrics = j;
            this.$fontMetrics.on("changeCharacterSize", function (k) {
                this._signal("changeCharacterSize", k)
            }
                .bind(this));
            this.$pollSizeChanges()
        }
            ;
        this.checkForSizeChanges = function () {
            this.$fontMetrics.checkForSizeChanges()
        }
            ;
        this.$pollSizeChanges = function () {
            return this.$pollSizeChangesTimer = this.$fontMetrics.$pollSizeChanges()
        }
            ;
        this.setSession = function (j) {
            this.session = j;
            if (j) {
                this.$computeTabString()
            }
        }
            ;
        this.showInvisibles = false;
        this.setShowInvisibles = function (j) {
            if (this.showInvisibles == j) {
                return false
            }
            this.showInvisibles = j;
            this.$computeTabString();
            return true
        }
            ;
        this.displayIndentGuides = true;
        this.setDisplayIndentGuides = function (j) {
            if (this.displayIndentGuides == j) {
                return false
            }
            this.displayIndentGuides = j;
            this.$computeTabString();
            return true
        }
            ;
        this.$tabStrings = [];
        this.onChangeTabSize = this.$computeTabString = function () {
            var o = this.session.getTabSize();
            this.tabSize = o;
            var j = this.$tabStrings = [0];
            for (var l = 1; l < o + 1; l++) {
                if (this.showInvisibles) {
                    j.push("<span class='ace_invisible ace_invisible_tab'>" + this.TAB_CHAR + a.stringRepeat(" ", l - 1) + "</span>")
                } else {
                    j.push(a.stringRepeat(" ", l))
                }
            }
            if (this.displayIndentGuides) {
                this.$indentGuideRe = /\s\S| \t|\t |\s$/;
                var m = "ace_indent-guide";
                var q = "";
                var k = "";
                if (this.showInvisibles) {
                    m += " ace_invisible";
                    q = " ace_invisible_space";
                    k = " ace_invisible_tab";
                    var p = a.stringRepeat(this.SPACE_CHAR, this.tabSize);
                    var n = this.TAB_CHAR + a.stringRepeat(" ", this.tabSize - 1)
                } else {
                    var p = a.stringRepeat(" ", this.tabSize);
                    var n = p
                }
                this.$tabStrings[" "] = "<span class='" + m + q + "'>" + p + "</span>";
                this.$tabStrings["\t"] = "<span class='" + m + k + "'>" + n + "</span>"
            }
        }
            ;
        this.updateLines = function (k, m, u) {
            if (this.config.lastRow != k.lastRow || this.config.firstRow != k.firstRow) {
                this.scrollLines(k)
            }
            this.config = k;
            var p = Math.max(m, k.firstRow);
            var r = Math.min(u, k.lastRow);
            var s = this.element.childNodes;
            var j = 0;
            for (var t = k.firstRow; t < p; t++) {
                var q = this.session.getFoldLine(t);
                if (q) {
                    if (q.containsRow(p)) {
                        p = q.start.row;
                        break
                    } else {
                        t = q.end.row
                    }
                }
                j++
            }
            var t = p;
            var q = this.session.getNextFoldLine(t);
            var n = q ? q.start.row : Infinity;
            while (true) {
                if (t > n) {
                    t = q.end.row + 1;
                    q = this.session.getNextFoldLine(t, q);
                    n = q ? q.start.row : Infinity
                }
                if (t > r) {
                    break
                }
                var l = s[j++];
                if (l) {
                    var o = [];
                    this.$renderLine(o, t, !this.$useLineGroups(), t == n ? q : false);
                    l.style.height = k.lineHeight * this.session.getRowLength(t) + "px";
                    l.innerHTML = o.join("")
                }
                t++
            }
        }
            ;
        this.scrollLines = function (l) {
            var j = this.config;
            this.config = l;
            if (!j || j.lastRow < l.firstRow) {
                return this.update(l)
            }
            if (l.lastRow < j.firstRow) {
                return this.update(l)
            }
            var m = this.element;
            if (j.firstRow < l.firstRow) {
                for (var n = this.session.getFoldedRowCount(j.firstRow, l.firstRow - 1); n > 0; n--) {
                    m.removeChild(m.firstChild)
                }
            }
            if (j.lastRow > l.lastRow) {
                for (var n = this.session.getFoldedRowCount(l.lastRow + 1, j.lastRow); n > 0; n--) {
                    m.removeChild(m.lastChild)
                }
            }
            if (l.firstRow < j.firstRow) {
                var k = this.$renderLinesFragment(l, l.firstRow, j.firstRow - 1);
                if (m.firstChild) {
                    m.insertBefore(k, m.firstChild)
                } else {
                    m.appendChild(k)
                }
            }
            if (l.lastRow > j.lastRow) {
                var k = this.$renderLinesFragment(l, j.lastRow + 1, l.lastRow);
                m.appendChild(k)
            }
        }
            ;
        this.$renderLinesFragment = function (k, l, r) {
            var o = this.element.ownerDocument.createDocumentFragment();
            var q = l;
            var p = this.session.getNextFoldLine(q);
            var m = p ? p.start.row : Infinity;
            while (true) {
                if (q > m) {
                    q = p.end.row + 1;
                    p = this.session.getNextFoldLine(q, p);
                    m = p ? p.start.row : Infinity
                }
                if (q > r) {
                    break
                }
                var j = f.createElement("div");
                var n = [];
                this.$renderLine(n, q, false, q == m ? p : false);
                j.innerHTML = n.join("");
                if (this.$useLineGroups()) {
                    j.className = "ace_line_group";
                    o.appendChild(j);
                    j.style.height = k.lineHeight * this.session.getRowLength(q) + "px"
                } else {
                    while (j.firstChild) {
                        o.appendChild(j.firstChild)
                    }
                }
                q++
            }
            return o
        }
            ;
        this.update = function (k) {
            this.config = k;
            var l = [];
            var p = k.firstRow
                , m = k.lastRow;
            var o = p;
            var n = this.session.getNextFoldLine(o);
            var j = n ? n.start.row : Infinity;
            while (true) {
                if (o > j) {
                    o = n.end.row + 1;
                    n = this.session.getNextFoldLine(o, n);
                    j = n ? n.start.row : Infinity
                }
                if (o > m) {
                    break
                }
                if (this.$useLineGroups()) {
                    l.push("<div class='ace_line_group' style='height:", k.lineHeight * this.session.getRowLength(o), "px'>")
                }
                this.$renderLine(l, o, false, o == j ? n : false);
                if (this.$useLineGroups()) {
                    l.push("</div>")
                }
                o++
            }
            this.element.innerHTML = l.join("")
        }
            ;
        this.$textToken = {
            text: true,
            rparen: true,
            lparen: true
        };
        this.$renderToken = function (l, p, o, r) {
            var s = this;
            var j = /\t|&|<|( +)|([\x00-\x1f\x80-\xa0\xad\u1680\u180E\u2000-\u200f\u2028\u2029\u202F\u205F\u3000\uFEFF])|[\u1100-\u115F\u11A3-\u11A7\u11FA-\u11FF\u2329-\u232A\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFB\u3000-\u303E\u3041-\u3096\u3099-\u30FF\u3105-\u312D\u3131-\u318E\u3190-\u31BA\u31C0-\u31E3\u31F0-\u321E\u3220-\u3247\u3250-\u32FE\u3300-\u4DBF\u4E00-\uA48C\uA490-\uA4C6\uA960-\uA97C\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFAFF\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE66\uFE68-\uFE6B\uFF01-\uFF60\uFFE0-\uFFE6]/g;
            var q = function (A, v, u, w, t) {
                if (v) {
                    return s.showInvisibles ? "<span class='ace_invisible ace_invisible_space'>" + a.stringRepeat(s.SPACE_CHAR, A.length) + "</span>" : A
                } else {
                    if (A == "&") {
                        return "&#38;"
                    } else {
                        if (A == "<") {
                            return "&#60;"
                        } else {
                            if (A == "\t") {
                                var y = s.session.getScreenTabSize(p + w);
                                p += y - 1;
                                return s.$tabStrings[y]
                            } else {
                                if (A == "\u3000") {
                                    var z = s.showInvisibles ? "ace_cjk ace_invisible ace_invisible_space" : "ace_cjk";
                                    var x = s.showInvisibles ? s.SPACE_CHAR : "";
                                    p += 1;
                                    return "<span class='" + z + "' style='width:" + (s.config.characterWidth * 2) + "px'>" + x + "</span>"
                                } else {
                                    if (u) {
                                        return "<span class='ace_invisible ace_invisible_space ace_invalid'>" + s.SPACE_CHAR + "</span>"
                                    } else {
                                        p += 1;
                                        return "<span class='ace_cjk' style='width:" + (s.config.characterWidth * 2) + "px'>" + A + "</span>"
                                    }
                                }
                            }
                        }
                    }
                }
            };
            var m = r.replace(j, q);
            if (!this.$textToken[o.type]) {
                var n = "ace_" + o.type.replace(/\./g, " ace_");
                var k = "";
                if (o.type == "fold") {
                    k = " style='width:" + (o.value.length * this.config.characterWidth) + "px;' "
                }
                l.push("<span class='", n, "'", k, ">", m, "</span>")
            } else {
                l.push(m)
            }
            return p + r.length
        }
            ;
        this.renderIndentGuide = function (l, k, j) {
            var m = k.search(this.$indentGuideRe);
            if (m <= 0 || m >= j) {
                return k
            }
            if (k[0] == " ") {
                m -= m % this.tabSize;
                l.push(a.stringRepeat(this.$tabStrings[" "], m / this.tabSize));
                return k.substr(m)
            } else {
                if (k[0] == "\t") {
                    l.push(a.stringRepeat(this.$tabStrings["\t"], m));
                    return k.substr(m)
                }
            }
            return k
        }
            ;
        this.$renderWrappedLine = function (j, p, t, k) {
            var q = 0;
            var r = 0;
            var l = t[0];
            var o = 0;
            for (var n = 0; n < p.length; n++) {
                var m = p[n];
                var s = m.value;
                if (n == 0 && this.displayIndentGuides) {
                    q = s.length;
                    s = this.renderIndentGuide(j, s, l);
                    if (!s) {
                        continue
                    }
                    q -= s.length
                }
                if (q + s.length < l) {
                    o = this.$renderToken(j, o, m, s);
                    q += s.length
                } else {
                    while (q + s.length >= l) {
                        o = this.$renderToken(j, o, m, s.substring(0, l - q));
                        s = s.substring(l - q);
                        q = l;
                        if (!k) {
                            j.push("</div>", "<div class='ace_line' style='height:", this.config.lineHeight, "px'>")
                        }
                        j.push(a.stringRepeat("\xa0", t.indent));
                        r++;
                        o = 0;
                        l = t[r] || Number.MAX_VALUE
                    }
                    if (s.length != 0) {
                        q += s.length;
                        o = this.$renderToken(j, o, m, s)
                    }
                }
            }
        }
            ;
        this.$renderSimpleLine = function (n, o) {
            var l = 0;
            var k = o[0];
            var m = k.value;
            if (this.displayIndentGuides) {
                m = this.renderIndentGuide(n, m)
            }
            if (m) {
                l = this.$renderToken(n, l, k, m)
            }
            for (var j = 1; j < o.length; j++) {
                k = o[j];
                m = k.value;
                l = this.$renderToken(n, l, k, m)
            }
        }
            ;
        this.$renderLine = function (k, o, j, n) {
            if (!n && n != false) {
                n = this.session.getFoldLine(o)
            }
            if (n) {
                var m = this.$getFoldLineTokens(o, n)
            } else {
                var m = this.session.getTokens(o)
            }
            if (!j) {
                k.push("<div class='ace_line' style='height:", this.config.lineHeight * (this.$useLineGroups() ? 1 : this.session.getRowLength(o)), "px'>")
            }
            if (m.length) {
                var l = this.session.getRowSplitData(o);
                if (l && l.length) {
                    this.$renderWrappedLine(k, m, l, j)
                } else {
                    this.$renderSimpleLine(k, m)
                }
            }
            if (this.showInvisibles) {
                if (n) {
                    o = n.end.row
                }
                k.push("<span class='ace_invisible ace_invisible_eol'>", o == this.session.getLength() - 1 ? this.EOF_CHAR : this.EOL_CHAR, "</span>")
            }
            if (!j) {
                k.push("</div>")
            }
        }
            ;
        this.$getFoldLineTokens = function (n, m) {
            var l = this.session;
            var j = [];
            function o(s, u, t) {
                var p = 0
                    , q = 0;
                while ((q + s[p].value.length) < u) {
                    q += s[p].value.length;
                    p++;
                    if (p == s.length) {
                        return
                    }
                }
                if (q != u) {
                    var r = s[p].value.substring(u - q);
                    if (r.length > (t - u)) {
                        r = r.substring(0, t - u)
                    }
                    j.push({
                        type: s[p].type,
                        value: r
                    });
                    q = u + r.length;
                    p += 1
                }
                while (q < t && p < s.length) {
                    var r = s[p].value;
                    if (r.length + q > t) {
                        j.push({
                            type: s[p].type,
                            value: r.substring(0, t - q)
                        })
                    } else {
                        j.push(s[p])
                    }
                    q += r.length;
                    p += 1
                }
            }
            var k = l.getTokens(n);
            m.walk(function (t, s, r, q, p) {
                if (t != null) {
                    j.push({
                        type: "fold",
                        value: t
                    })
                } else {
                    if (p) {
                        k = l.getTokens(s)
                    }
                    if (k.length) {
                        o(k, q, r)
                    }
                }
            }, m.end.row, this.session.getLine(m.end.row).length);
            return j
        }
            ;
        this.$useLineGroups = function () {
            return this.session.getUseWrapMode()
        }
            ;
        this.destroy = function () {
            clearInterval(this.$pollSizeChangesTimer);
            if (this.$measureNode) {
                this.$measureNode.parentNode.removeChild(this.$measureNode)
            }
            delete this.$measureNode
        }
    }
    ).call(d.prototype);
    g.Text = d
});
define("ace/layer/cursor", ["require", "exports", "module", "ace/lib/dom"], function (b, a, c) {
    var f = b("../lib/dom");
    var e;
    var d = function (g) {
        this.element = f.createElement("div");
        this.element.className = "ace_layer ace_cursor-layer";
        g.appendChild(this.element);
        if (e === undefined) {
            e = "opacity" in this.element
        }
        this.isVisible = false;
        this.isBlinking = true;
        this.blinkInterval = 1000;
        this.smoothBlinking = false;
        this.cursors = [];
        this.cursor = this.addCursor();
        f.addCssClass(this.element, "ace_hidden-cursors");
        this.$updateCursors = this.$updateVisibility.bind(this)
    };
    (function () {
        this.$updateVisibility = function (j) {
            var h = this.cursors;
            for (var g = h.length; g--;) {
                h[g].style.visibility = j ? "" : "hidden"
            }
        }
            ;
        this.$updateOpacity = function (j) {
            var h = this.cursors;
            for (var g = h.length; g--;) {
                h[g].style.opacity = j ? "" : "0"
            }
        }
            ;
        this.$padding = 0;
        this.setPadding = function (g) {
            this.$padding = g
        }
            ;
        this.setSession = function (g) {
            this.session = g
        }
            ;
        this.setBlinking = function (g) {
            if (g != this.isBlinking) {
                this.isBlinking = g;
                this.restartTimer()
            }
        }
            ;
        this.setBlinkInterval = function (g) {
            if (g != this.blinkInterval) {
                this.blinkInterval = g;
                this.restartTimer()
            }
        }
            ;
        this.setSmoothBlinking = function (g) {
            if (g != this.smoothBlinking && !e) {
                this.smoothBlinking = g;
                f.setCssClass(this.element, "ace_smooth-blinking", g);
                this.$updateCursors(true);
                this.$updateCursors = (g ? this.$updateOpacity : this.$updateVisibility).bind(this);
                this.restartTimer()
            }
        }
            ;
        this.addCursor = function () {
            var g = f.createElement("div");
            g.className = "ace_cursor";
            this.element.appendChild(g);
            this.cursors.push(g);
            return g
        }
            ;
        this.removeCursor = function () {
            if (this.cursors.length > 1) {
                var g = this.cursors.pop();
                g.parentNode.removeChild(g);
                return g
            }
        }
            ;
        this.hideCursor = function () {
            this.isVisible = false;
            f.addCssClass(this.element, "ace_hidden-cursors");
            this.restartTimer()
        }
            ;
        this.showCursor = function () {
            this.isVisible = true;
            f.removeCssClass(this.element, "ace_hidden-cursors");
            this.restartTimer()
        }
            ;
        this.restartTimer = function () {
            var h = this.$updateCursors;
            clearInterval(this.intervalId);
            clearTimeout(this.timeoutId);
            if (this.smoothBlinking) {
                f.removeCssClass(this.element, "ace_smooth-blinking")
            }
            h(true);
            if (!this.isBlinking || !this.blinkInterval || !this.isVisible) {
                return
            }
            if (this.smoothBlinking) {
                setTimeout(function () {
                    f.addCssClass(this.element, "ace_smooth-blinking")
                }
                    .bind(this))
            }
            var g = function () {
                this.timeoutId = setTimeout(function () {
                    h(false)
                }, 0.6 * this.blinkInterval)
            }
                .bind(this);
            this.intervalId = setInterval(function () {
                h(true);
                g()
            }, this.blinkInterval);
            g()
        }
            ;
        this.getPixelPosition = function (g, h) {
            if (!this.config || !this.session) {
                return {
                    left: 0,
                    top: 0
                }
            }
            if (!g) {
                g = this.session.selection.getCursor()
            }
            var k = this.session.documentToScreenPosition(g);
            var i = this.$padding + k.column * this.config.characterWidth;
            var j = (k.row - (h ? this.config.firstRowScreen : 0)) * this.config.lineHeight;
            return {
                left: i,
                top: j
            }
        }
            ;
        this.update = function (h) {
            this.config = h;
            var l = this.session.$selectionMarkers;
            var j = 0
                , o = 0;
            if (l === undefined || l.length === 0) {
                l = [{
                    cursor: null
                }]
            }
            for (var j = 0, p = l.length; j < p; j++) {
                var m = this.getPixelPosition(l[j].cursor, true);
                if ((m.top > h.height + h.offset || m.top < 0) && j > 1) {
                    continue
                }
                var k = (this.cursors[o++] || this.addCursor()).style;
                if (!this.drawCursor) {
                    k.left = m.left + "px";
                    k.top = m.top + "px";
                    k.width = h.characterWidth + "px";
                    k.height = h.lineHeight + "px"
                } else {
                    this.drawCursor(k, m, h, l[j], this.session)
                }
            }
            while (this.cursors.length > o) {
                this.removeCursor()
            }
            var g = this.session.getOverwrite();
            this.$setOverwrite(g);
            this.$pixelPos = m;
            this.restartTimer()
        }
            ;
        this.drawCursor = null;
        this.$setOverwrite = function (g) {
            if (g != this.overwrite) {
                this.overwrite = g;
                if (g) {
                    f.addCssClass(this.element, "ace_overwrite-cursors")
                } else {
                    f.removeCssClass(this.element, "ace_overwrite-cursors")
                }
            }
        }
            ;
        this.destroy = function () {
            clearInterval(this.intervalId);
            clearTimeout(this.timeoutId)
        }
    }
    ).call(d.prototype);
    a.Cursor = d
});
define("ace/scrollbar", ["require", "exports", "module", "ace/lib/oop", "ace/lib/dom", "ace/lib/event", "ace/lib/event_emitter"], function (d, f, b) {
    var h = d("./lib/oop");
    var e = d("./lib/dom");
    var a = d("./lib/event");
    var j = d("./lib/event_emitter").EventEmitter;
    var c = function (k) {
        this.element = e.createElement("div");
        this.element.className = "ace_scrollbar ace_scrollbar" + this.classSuffix;
        this.inner = e.createElement("div");
        this.inner.className = "ace_scrollbar-inner";
        this.element.appendChild(this.inner);
        k.appendChild(this.element);
        this.setVisible(false);
        this.skipEvent = false;
        a.addListener(this.element, "scroll", this.onScroll.bind(this));
        a.addListener(this.element, "mousedown", a.preventDefault)
    };
    (function () {
        h.implement(this, j);
        this.setVisible = function (k) {
            this.element.style.display = k ? "" : "none";
            this.isVisible = k
        }
    }
    ).call(c.prototype);
    var g = function (k, l) {
        c.call(this, k);
        this.scrollTop = 0;
        l.$scrollbarWidth = this.width = e.scrollbarWidth(k.ownerDocument);
        this.inner.style.width = this.element.style.width = (this.width || 15) + 5 + "px"
    };
    h.inherits(g, c);
    (function () {
        this.classSuffix = "-v";
        this.onScroll = function () {
            if (!this.skipEvent) {
                this.scrollTop = this.element.scrollTop;
                this._emit("scroll", {
                    data: this.scrollTop
                })
            }
            this.skipEvent = false
        }
            ;
        this.getWidth = function () {
            return this.isVisible ? this.width : 0
        }
            ;
        this.setHeight = function (k) {
            this.element.style.height = k + "px"
        }
            ;
        this.setInnerHeight = function (k) {
            this.inner.style.height = k + "px"
        }
            ;
        this.setScrollHeight = function (k) {
            this.inner.style.height = k + "px"
        }
            ;
        this.setScrollTop = function (k) {
            if (this.scrollTop != k) {
                this.skipEvent = true;
                this.scrollTop = this.element.scrollTop = k
            }
        }
    }
    ).call(g.prototype);
    var i = function (k, l) {
        c.call(this, k);
        this.scrollLeft = 0;
        this.height = l.$scrollbarWidth;
        this.inner.style.height = this.element.style.height = (this.height || 15) + 5 + "px"
    };
    h.inherits(i, c);
    (function () {
        this.classSuffix = "-h";
        this.onScroll = function () {
            if (!this.skipEvent) {
                this.scrollLeft = this.element.scrollLeft;
                this._emit("scroll", {
                    data: this.scrollLeft
                })
            }
            this.skipEvent = false
        }
            ;
        this.getHeight = function () {
            return this.isVisible ? this.height : 0
        }
            ;
        this.setWidth = function (k) {
            this.element.style.width = k + "px"
        }
            ;
        this.setInnerWidth = function (k) {
            this.inner.style.width = k + "px"
        }
            ;
        this.setScrollWidth = function (k) {
            this.inner.style.width = k + "px"
        }
            ;
        this.setScrollLeft = function (k) {
            if (this.scrollLeft != k) {
                this.skipEvent = true;
                this.scrollLeft = this.element.scrollLeft = k
            }
        }
    }
    ).call(i.prototype);
    f.ScrollBar = g;
    f.ScrollBarV = g;
    f.ScrollBarH = i;
    f.VScrollBar = g;
    f.HScrollBar = i
});
define("ace/renderloop", ["require", "exports", "module", "ace/lib/event"], function (b, a, c) {
    var d = b("./lib/event");
    var e = function (g, f) {
        this.onRender = g;
        this.pending = false;
        this.changes = 0;
        this.window = f || window
    };
    (function () {
        this.schedule = function (g) {
            this.changes = this.changes | g;
            if (!this.pending && this.changes) {
                this.pending = true;
                var f = this;
                d.nextFrame(function () {
                    f.pending = false;
                    var h;
                    while (h = f.changes) {
                        f.changes = 0;
                        f.onRender(h)
                    }
                }, this.window)
            }
        }
    }
    ).call(e.prototype);
    a.RenderLoop = e
});
define("ace/layer/font_metrics", ["require", "exports", "module", "ace/lib/oop", "ace/lib/dom", "ace/lib/lang", "ace/lib/useragent", "ace/lib/event_emitter"], function (d, f, b) {
    var h = d("../lib/oop");
    var e = d("../lib/dom");
    var a = d("../lib/lang");
    var c = d("../lib/useragent");
    var j = d("../lib/event_emitter").EventEmitter;
    var i = 0;
    var g = f.FontMetrics = function (l, k) {
        this.el = e.createElement("div");
        this.$setMeasureNodeStyles(this.el.style, true);
        this.$main = e.createElement("div");
        this.$setMeasureNodeStyles(this.$main.style);
        this.$measureNode = e.createElement("div");
        this.$setMeasureNodeStyles(this.$measureNode.style);
        this.el.appendChild(this.$main);
        this.el.appendChild(this.$measureNode);
        l.appendChild(this.el);
        if (!i) {
            this.$testFractionalRect()
        }
        this.$measureNode.innerHTML = a.stringRepeat("X", i);
        this.$characterSize = {
            width: 0,
            height: 0
        };
        this.checkForSizeChanges()
    }
        ;
    (function () {
        h.implement(this, j);
        this.$characterSize = {
            width: 0,
            height: 0
        };
        this.$testFractionalRect = function () {
            var l = e.createElement("div");
            this.$setMeasureNodeStyles(l.style);
            l.style.width = "0.2px";
            document.documentElement.appendChild(l);
            var k = l.getBoundingClientRect().width;
            if (k > 0 && k < 1) {
                i = 50
            } else {
                i = 100
            }
            l.parentNode.removeChild(l)
        }
            ;
        this.$setMeasureNodeStyles = function (l, k) {
            l.width = l.height = "auto";
            l.left = l.top = "0px";
            l.visibility = "hidden";
            l.position = "absolute";
            l.whiteSpace = "pre";
            if (c.isIE < 8) {
                l["font-family"] = "inherit"
            } else {
                l.font = "inherit"
            }
            l.overflow = k ? "hidden" : "visible"
        }
            ;
        this.checkForSizeChanges = function () {
            var l = this.$measureSizes();
            if (l && (this.$characterSize.width !== l.width || this.$characterSize.height !== l.height)) {
                this.$measureNode.style.fontWeight = "bold";
                var k = this.$measureSizes();
                this.$measureNode.style.fontWeight = "";
                this.$characterSize = l;
                this.charSizes = Object.create(null);
                this.allowBoldFonts = k && k.width === l.width && k.height === l.height;
                this._emit("changeCharacterSize", {
                    data: l
                })
            }
        }
            ;
        this.$pollSizeChanges = function () {
            if (this.$pollSizeChangesTimer) {
                return this.$pollSizeChangesTimer
            }
            var k = this;
            return this.$pollSizeChangesTimer = setInterval(function () {
                k.checkForSizeChanges()
            }, 500)
        }
            ;
        this.setPolling = function (k) {
            if (k) {
                this.$pollSizeChanges()
            } else {
                if (this.$pollSizeChangesTimer) {
                    clearInterval(this.$pollSizeChangesTimer);
                    this.$pollSizeChangesTimer = 0
                }
            }
        }
            ;
        this.$measureSizes = function () {
            if (i === 50) {
                var l = null;
                try {
                    l = this.$measureNode.getBoundingClientRect()
                } catch (m) {
                    l = {
                        width: 0,
                        height: 0
                    }
                }
                var k = {
                    height: l.height,
                    width: l.width / i
                }
            } else {
                var k = {
                    height: this.$measureNode.clientHeight,
                    width: this.$measureNode.clientWidth / i
                }
            }
            if (k.width === 0 || k.height === 0) {
                return null
            }
            return k
        }
            ;
        this.$measureCharWidth = function (k) {
            this.$main.innerHTML = a.stringRepeat(k, i);
            var l = this.$main.getBoundingClientRect();
            return l.width / i
        }
            ;
        this.getCharacterWidth = function (l) {
            var k = this.charSizes[l];
            if (k === undefined) {
                this.charSizes[l] = this.$measureCharWidth(l) / this.$characterSize.width
            }
            return k
        }
            ;
        this.destroy = function () {
            clearInterval(this.$pollSizeChangesTimer);
            if (this.el && this.el.parentNode) {
                this.el.parentNode.removeChild(this.el)
            }
        }
    }
    ).call(g.prototype)
});
define("ace/virtual_renderer", ["require", "exports", "module", "ace/lib/oop", "ace/lib/dom", "ace/config", "ace/lib/useragent", "ace/layer/gutter", "ace/layer/marker", "ace/layer/text", "ace/layer/cursor", "ace/scrollbar", "ace/scrollbar", "ace/renderloop", "ace/layer/font_metrics", "ace/lib/event_emitter"], function (d, r, a) {
    var n = d("./lib/oop");
    var m = d("./lib/dom");
    var q = d("./config");
    var j = d("./lib/useragent");
    var k = d("./layer/gutter").Gutter;
    var b = d("./layer/marker").Marker;
    var g = d("./layer/text").Text;
    var o = d("./layer/cursor").Cursor;
    var e = d("./scrollbar").HScrollBar;
    var h = d("./scrollbar").VScrollBar;
    var p = d("./renderloop").RenderLoop;
    var l = d("./layer/font_metrics").FontMetrics;
    var c = d("./lib/event_emitter").EventEmitter;
    var i = '.ace_editor {position: relative;overflow: hidden;font: 12px/normal \'Monaco\', \'Menlo\', \'Ubuntu Mono\', \'Consolas\', \'source-code-pro\', monospace;direction: ltr;}.ace_scroller {position: absolute;overflow: hidden;top: 0;bottom: 0;background-color: inherit;-ms-user-select: none;-moz-user-select: none;-webkit-user-select: none;user-select: none;cursor: text;}.ace_content {position: absolute;-moz-box-sizing: border-box;-webkit-box-sizing: border-box;box-sizing: border-box;min-width: 100%;}.ace_dragging .ace_scroller:before{position: absolute;top: 0;left: 0;right: 0;bottom: 0;content: \'\';background: rgba(250, 250, 250, 0.01);z-index: 1000;}.ace_dragging.ace_dark .ace_scroller:before{background: rgba(0, 0, 0, 0.01);}.ace_selecting, .ace_selecting * {cursor: text !important;}.ace_gutter {position: absolute;overflow : hidden;width: auto;top: 0;bottom: 0;left: 0;cursor: default;z-index: 4;-ms-user-select: none;-moz-user-select: none;-webkit-user-select: none;user-select: none;}.ace_gutter-active-line {position: absolute;left: 0;right: 0;}.ace_scroller.ace_scroll-left {box-shadow: 17px 0 16px -16px rgba(0, 0, 0, 0.4) inset;}.ace_gutter-cell {padding-left: 19px;padding-right: 6px;background-repeat: no-repeat;}.ace_gutter-cell.ace_error {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAABOFBMVEX/////////QRswFAb/Ui4wFAYwFAYwFAaWGAfDRymzOSH/PxswFAb/SiUwFAYwFAbUPRvjQiDllog5HhHdRybsTi3/Tyv9Tir+Syj/UC3////XurebMBIwFAb/RSHbPx/gUzfdwL3kzMivKBAwFAbbvbnhPx66NhowFAYwFAaZJg8wFAaxKBDZurf/RB6mMxb/SCMwFAYwFAbxQB3+RB4wFAb/Qhy4Oh+4QifbNRcwFAYwFAYwFAb/QRzdNhgwFAYwFAbav7v/Uy7oaE68MBK5LxLewr/r2NXewLswFAaxJw4wFAbkPRy2PyYwFAaxKhLm1tMwFAazPiQwFAaUGAb/QBrfOx3bvrv/VC/maE4wFAbRPBq6MRO8Qynew8Dp2tjfwb0wFAbx6eju5+by6uns4uH9/f36+vr/GkHjAAAAYnRSTlMAGt+64rnWu/bo8eAA4InH3+DwoN7j4eLi4xP99Nfg4+b+/u9B/eDs1MD1mO7+4PHg2MXa347g7vDizMLN4eG+Pv7i5evs/v79yu7S3/DV7/498Yv24eH+4ufQ3Ozu/v7+y13sRqwAAADLSURBVHjaZc/XDsFgGIBhtDrshlitmk2IrbHFqL2pvXf/+78DPokj7+Fz9qpU/9UXJIlhmPaTaQ6QPaz0mm+5gwkgovcV6GZzd5JtCQwgsxoHOvJO15kleRLAnMgHFIESUEPmawB9ngmelTtipwwfASilxOLyiV5UVUyVAfbG0cCPHig+GBkzAENHS0AstVF6bacZIOzgLmxsHbt2OecNgJC83JERmePUYq8ARGkJx6XtFsdddBQgZE2nPR6CICZhawjA4Fb/chv+399kfR+MMMDGOQAAAABJRU5ErkJggg==");background-repeat: no-repeat;background-position: 2px center;}.ace_gutter-cell.ace_warning {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAmVBMVEX///8AAAD///8AAAAAAABPSzb/5sAAAAB/blH/73z/ulkAAAAAAAD85pkAAAAAAAACAgP/vGz/rkDerGbGrV7/pkQICAf////e0IsAAAD/oED/qTvhrnUAAAD/yHD/njcAAADuv2r/nz//oTj/p064oGf/zHAAAAA9Nir/tFIAAAD/tlTiuWf/tkIAAACynXEAAAAAAAAtIRW7zBpBAAAAM3RSTlMAABR1m7RXO8Ln31Z36zT+neXe5OzooRDfn+TZ4p3h2hTf4t3k3ucyrN1K5+Xaks52Sfs9CXgrAAAAjklEQVR42o3PbQ+CIBQFYEwboPhSYgoYunIqqLn6/z8uYdH8Vmdnu9vz4WwXgN/xTPRD2+sgOcZjsge/whXZgUaYYvT8QnuJaUrjrHUQreGczuEafQCO/SJTufTbroWsPgsllVhq3wJEk2jUSzX3CUEDJC84707djRc5MTAQxoLgupWRwW6UB5fS++NV8AbOZgnsC7BpEAAAAABJRU5ErkJggg==");background-position: 2px center;}.ace_gutter-cell.ace_info {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAAAAAA6mKC9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAJ0Uk5TAAB2k804AAAAPklEQVQY02NgIB68QuO3tiLznjAwpKTgNyDbMegwisCHZUETUZV0ZqOquBpXj2rtnpSJT1AEnnRmL2OgGgAAIKkRQap2htgAAAAASUVORK5CYII=");background-position: 2px center;}.ace_dark .ace_gutter-cell.ace_info {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAJFBMVEUAAAChoaGAgIAqKiq+vr6tra1ZWVmUlJSbm5s8PDxubm56enrdgzg3AAAAAXRSTlMAQObYZgAAAClJREFUeNpjYMAPdsMYHegyJZFQBlsUlMFVCWUYKkAZMxZAGdxlDMQBAG+TBP4B6RyJAAAAAElFTkSuQmCC");}.ace_scrollbar {position: absolute;right: 0;bottom: 0;z-index: 6;}.ace_scrollbar-inner {position: absolute;cursor: text;left: 0;top: 0;}.ace_scrollbar-v{overflow-x: hidden;overflow-y: scroll;top: 0;}.ace_scrollbar-h {overflow-x: scroll;overflow-y: hidden;left: 0;}.ace_print-margin {position: absolute;height: 100%;}.ace_text-input {position: absolute;z-index: 0;width: 0.5em;height: 1em;opacity: 0;background: transparent;-moz-appearance: none;appearance: none;border: none;resize: none;outline: none;overflow: hidden;font: inherit;padding: 0 1px;margin: 0 -1px;text-indent: -1em;-ms-user-select: text;-moz-user-select: text;-webkit-user-select: text;user-select: text;}.ace_text-input.ace_composition {background: inherit;color: inherit;z-index: 1000;opacity: 1;text-indent: 0;}.ace_layer {z-index: 1;position: absolute;overflow: hidden;word-wrap: normal;white-space: pre;height: 100%;width: 100%;-moz-box-sizing: border-box;-webkit-box-sizing: border-box;box-sizing: border-box;pointer-events: none;}.ace_gutter-layer {position: relative;width: auto;text-align: right;pointer-events: auto;}.ace_text-layer {font: inherit !important;}.ace_cjk {display: inline-block;text-align: center;}.ace_cursor-layer {z-index: 4;}.ace_cursor {z-index: 4;position: absolute;-moz-box-sizing: border-box;-webkit-box-sizing: border-box;box-sizing: border-box;border-left: 2px solid}.ace_slim-cursors .ace_cursor {border-left-width: 1px;}.ace_overwrite-cursors .ace_cursor {border-left-width: 0;border-bottom: 1px solid;}.ace_hidden-cursors .ace_cursor {opacity: 0.2;}.ace_smooth-blinking .ace_cursor {-webkit-transition: opacity 0.18s;transition: opacity 0.18s;}.ace_editor.ace_multiselect .ace_cursor {border-left-width: 1px;}.ace_marker-layer .ace_step, .ace_marker-layer .ace_stack {position: absolute;z-index: 3;}.ace_marker-layer .ace_selection {position: absolute;z-index: 5;}.ace_marker-layer .ace_bracket {position: absolute;z-index: 6;}.ace_marker-layer .ace_active-line {position: absolute;z-index: 2;}.ace_marker-layer .ace_selected-word {position: absolute;z-index: 4;-moz-box-sizing: border-box;-webkit-box-sizing: border-box;box-sizing: border-box;}.ace_line .ace_fold {-moz-box-sizing: border-box;-webkit-box-sizing: border-box;box-sizing: border-box;display: inline-block;height: 11px;margin-top: -2px;vertical-align: middle;background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAJCAYAAADU6McMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAJpJREFUeNpi/P//PwOlgAXGYGRklAVSokD8GmjwY1wasKljQpYACtpCFeADcHVQfQyMQAwzwAZI3wJKvCLkfKBaMSClBlR7BOQikCFGQEErIH0VqkabiGCAqwUadAzZJRxQr/0gwiXIal8zQQPnNVTgJ1TdawL0T5gBIP1MUJNhBv2HKoQHHjqNrA4WO4zY0glyNKLT2KIfIMAAQsdgGiXvgnYAAAAASUVORK5CYII="),url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAA3CAYAAADNNiA5AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAACJJREFUeNpi+P//fxgTAwPDBxDxD078RSX+YeEyDFMCIMAAI3INmXiwf2YAAAAASUVORK5CYII=");background-repeat: no-repeat, repeat-x;background-position: center center, top left;color: transparent;border: 1px solid black;border-radius: 2px;cursor: pointer;pointer-events: auto;}.ace_dark .ace_fold {}.ace_fold:hover{background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAJCAYAAADU6McMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAJpJREFUeNpi/P//PwOlgAXGYGRklAVSokD8GmjwY1wasKljQpYACtpCFeADcHVQfQyMQAwzwAZI3wJKvCLkfKBaMSClBlR7BOQikCFGQEErIH0VqkabiGCAqwUadAzZJRxQr/0gwiXIal8zQQPnNVTgJ1TdawL0T5gBIP1MUJNhBv2HKoQHHjqNrA4WO4zY0glyNKLT2KIfIMAAQsdgGiXvgnYAAAAASUVORK5CYII="),url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAA3CAYAAADNNiA5AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAACBJREFUeNpi+P//fz4TAwPDZxDxD5X4i5fLMEwJgAADAEPVDbjNw87ZAAAAAElFTkSuQmCC");}.ace_tooltip {background-color: #FFF;background-image: -webkit-linear-gradient(top, transparent, rgba(0, 0, 0, 0.1));background-image: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.1));border: 1px solid gray;border-radius: 1px;box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);color: black;max-width: 100%;padding: 3px 4px;position: fixed;z-index: 999999;-moz-box-sizing: border-box;-webkit-box-sizing: border-box;box-sizing: border-box;cursor: default;white-space: pre;word-wrap: break-word;line-height: normal;font-style: normal;font-weight: normal;letter-spacing: normal;pointer-events: none;}.ace_folding-enabled > .ace_gutter-cell {padding-right: 13px;}.ace_fold-widget {-moz-box-sizing: border-box;-webkit-box-sizing: border-box;box-sizing: border-box;margin: 0 -12px 0 1px;display: none;width: 11px;vertical-align: top;background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAANElEQVR42mWKsQ0AMAzC8ixLlrzQjzmBiEjp0A6WwBCSPgKAXoLkqSot7nN3yMwR7pZ32NzpKkVoDBUxKAAAAABJRU5ErkJggg==");background-repeat: no-repeat;background-position: center;border-radius: 3px;border: 1px solid transparent;cursor: pointer;}.ace_folding-enabled .ace_fold-widget {display: inline-block;   }.ace_fold-widget.ace_end {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAANElEQVR42m3HwQkAMAhD0YzsRchFKI7sAikeWkrxwScEB0nh5e7KTPWimZki4tYfVbX+MNl4pyZXejUO1QAAAABJRU5ErkJggg==");}.ace_fold-widget.ace_closed {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAGCAYAAAAG5SQMAAAAOUlEQVR42jXKwQkAMAgDwKwqKD4EwQ26sSOkVWjgIIHAzPiCgaqiqnJHZnKICBERHN194O5b9vbLuAVRL+l0YWnZAAAAAElFTkSuQmCCXA==");}.ace_fold-widget:hover {border: 1px solid rgba(0, 0, 0, 0.3);background-color: rgba(255, 255, 255, 0.2);box-shadow: 0 1px 1px rgba(255, 255, 255, 0.7);}.ace_fold-widget:active {border: 1px solid rgba(0, 0, 0, 0.4);background-color: rgba(0, 0, 0, 0.05);box-shadow: 0 1px 1px rgba(255, 255, 255, 0.8);}.ace_dark .ace_fold-widget {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHklEQVQIW2P4//8/AzoGEQ7oGCaLLAhWiSwB146BAQCSTPYocqT0AAAAAElFTkSuQmCC");}.ace_dark .ace_fold-widget.ace_end {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAH0lEQVQIW2P4//8/AxQ7wNjIAjDMgC4AxjCVKBirIAAF0kz2rlhxpAAAAABJRU5ErkJggg==");}.ace_dark .ace_fold-widget.ace_closed {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAHElEQVQIW2P4//+/AxAzgDADlOOAznHAKgPWAwARji8UIDTfQQAAAABJRU5ErkJggg==");}.ace_dark .ace_fold-widget:hover {box-shadow: 0 1px 1px rgba(255, 255, 255, 0.2);background-color: rgba(255, 255, 255, 0.1);}.ace_dark .ace_fold-widget:active {box-shadow: 0 1px 1px rgba(255, 255, 255, 0.2);}.ace_fold-widget.ace_invalid {background-color: #FFB4B4;border-color: #DE5555;}.ace_fade-fold-widgets .ace_fold-widget {-webkit-transition: opacity 0.4s ease 0.05s;transition: opacity 0.4s ease 0.05s;opacity: 0;}.ace_fade-fold-widgets:hover .ace_fold-widget {-webkit-transition: opacity 0.05s ease 0.05s;transition: opacity 0.05s ease 0.05s;opacity:1;}.ace_underline {text-decoration: underline;}.ace_bold {font-weight: bold;}.ace_nobold .ace_bold {font-weight: normal;}.ace_italic {font-style: italic;}.ace_error-marker {background-color: rgba(255, 0, 0,0.2);position: absolute;z-index: 9;}.ace_highlight-marker {background-color: rgba(255, 255, 0,0.2);position: absolute;z-index: 8;}';
    m.importCssString(i, "ace_editor.css");
    var f = function (t, v) {
        var s = this;
        this.container = t || m.createElement("div");
        this.$keepTextAreaAtCursor = !j.isOldIE;
        m.addCssClass(this.container, "ace_editor");
        this.setTheme(v);
        this.$gutter = m.createElement("div");
        this.$gutter.className = "ace_gutter";
        this.container.appendChild(this.$gutter);
        this.scroller = m.createElement("div");
        this.scroller.className = "ace_scroller";
        this.container.appendChild(this.scroller);
        this.content = m.createElement("div");
        this.content.className = "ace_content";
        this.scroller.appendChild(this.content);
        this.$gutterLayer = new k(this.$gutter);
        this.$gutterLayer.on("changeGutterWidth", this.onGutterResize.bind(this));
        this.$markerBack = new b(this.content);
        var u = this.$textLayer = new g(this.content);
        this.canvas = u.element;
        this.$markerFront = new b(this.content);
        this.$cursorLayer = new o(this.content);
        this.$horizScroll = false;
        this.$vScroll = false;
        this.scrollBar = this.scrollBarV = new h(this.container, this);
        this.scrollBarH = new e(this.container, this);
        this.scrollBarV.addEventListener("scroll", function (w) {
            if (!s.$scrollAnimation) {
                s.session.setScrollTop(w.data - s.scrollMargin.top)
            }
        });
        this.scrollBarH.addEventListener("scroll", function (w) {
            if (!s.$scrollAnimation) {
                s.session.setScrollLeft(w.data - s.scrollMargin.left)
            }
        });
        this.scrollTop = 0;
        this.scrollLeft = 0;
        this.cursorPos = {
            row: 0,
            column: 0
        };
        this.$fontMetrics = new l(this.container, 500);
        this.$textLayer.$setFontMetrics(this.$fontMetrics);
        this.$textLayer.addEventListener("changeCharacterSize", function (w) {
            s.updateCharacterSize();
            s.onResize(true, s.gutterWidth, s.$size.width, s.$size.height);
            s._signal("changeCharacterSize", w)
        });
        this.$size = {
            width: 0,
            height: 0,
            scrollerHeight: 0,
            scrollerWidth: 0,
            $dirty: true
        };
        this.layerConfig = {
            width: 1,
            padding: 0,
            firstRow: 0,
            firstRowScreen: 0,
            lastRow: 0,
            lineHeight: 0,
            characterWidth: 0,
            minHeight: 1,
            maxHeight: 1,
            offset: 0,
            height: 1,
            gutterOffset: 1
        };
        this.scrollMargin = {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            v: 0,
            h: 0
        };
        this.$loop = new p(this.$renderChanges.bind(this), this.container.ownerDocument.defaultView);
        this.$loop.schedule(this.CHANGE_FULL);
        this.updateCharacterSize();
        this.setPadding(4);
        q.resetOptions(this);
        q._emit("renderer", this)
    };
    (function () {
        this.CHANGE_CURSOR = 1;
        this.CHANGE_MARKER = 2;
        this.CHANGE_GUTTER = 4;
        this.CHANGE_SCROLL = 8;
        this.CHANGE_LINES = 16;
        this.CHANGE_TEXT = 32;
        this.CHANGE_SIZE = 64;
        this.CHANGE_MARKER_BACK = 128;
        this.CHANGE_MARKER_FRONT = 256;
        this.CHANGE_FULL = 512;
        this.CHANGE_H_SCROLL = 1024;
        n.implement(this, c);
        this.updateCharacterSize = function () {
            if (this.$textLayer.allowBoldFonts != this.$allowBoldFonts) {
                this.$allowBoldFonts = this.$textLayer.allowBoldFonts;
                this.setStyle("ace_nobold", !this.$allowBoldFonts)
            }
            this.layerConfig.characterWidth = this.characterWidth = this.$textLayer.getCharacterWidth();
            this.layerConfig.lineHeight = this.lineHeight = this.$textLayer.getLineHeight();
            this.$updatePrintMargin()
        }
            ;
        this.setSession = function (s) {
            if (this.session) {
                this.session.doc.off("changeNewLineMode", this.onChangeNewLineMode)
            }
            this.session = s;
            if (s && this.scrollMargin.top && s.getScrollTop() <= 0) {
                s.setScrollTop(-this.scrollMargin.top)
            }
            this.$cursorLayer.setSession(s);
            this.$markerBack.setSession(s);
            this.$markerFront.setSession(s);
            this.$gutterLayer.setSession(s);
            this.$textLayer.setSession(s);
            if (!s) {
                return
            }
            this.$loop.schedule(this.CHANGE_FULL);
            this.session.$setFontMetrics(this.$fontMetrics);
            this.onChangeNewLineMode = this.onChangeNewLineMode.bind(this);
            this.onChangeNewLineMode();
            this.session.doc.on("changeNewLineMode", this.onChangeNewLineMode)
        }
            ;
        this.updateLines = function (u, s, t) {
            if (s === undefined) {
                s = Infinity
            }
            if (!this.$changedLines) {
                this.$changedLines = {
                    firstRow: u,
                    lastRow: s
                }
            } else {
                if (this.$changedLines.firstRow > u) {
                    this.$changedLines.firstRow = u
                }
                if (this.$changedLines.lastRow < s) {
                    this.$changedLines.lastRow = s
                }
            }
            if (this.$changedLines.lastRow < this.layerConfig.firstRow) {
                if (t) {
                    this.$changedLines.lastRow = this.layerConfig.lastRow
                } else {
                    return
                }
            }
            if (this.$changedLines.firstRow > this.layerConfig.lastRow) {
                return
            }
            this.$loop.schedule(this.CHANGE_LINES)
        }
            ;
        this.onChangeNewLineMode = function () {
            this.$loop.schedule(this.CHANGE_TEXT);
            this.$textLayer.$updateEolChar()
        }
            ;
        this.onChangeTabSize = function () {
            this.$loop.schedule(this.CHANGE_TEXT | this.CHANGE_MARKER);
            this.$textLayer.onChangeTabSize()
        }
            ;
        this.updateText = function () {
            this.$loop.schedule(this.CHANGE_TEXT)
        }
            ;
        this.updateFull = function (s) {
            if (s) {
                this.$renderChanges(this.CHANGE_FULL, true)
            } else {
                this.$loop.schedule(this.CHANGE_FULL)
            }
        }
            ;
        this.updateFontSize = function () {
            this.$textLayer.checkForSizeChanges()
        }
            ;
        this.$changes = 0;
        this.$updateSizeAsync = function () {
            if (this.$loop.pending) {
                this.$size.$dirty = true
            } else {
                this.onResize()
            }
        }
            ;
        this.onResize = function (x, t, w, s) {
            if (this.resizing > 2) {
                return
            } else {
                if (this.resizing > 0) {
                    this.resizing++
                } else {
                    this.resizing = x ? 1 : 0
                }
            }
            var v = this.container;
            if (!s) {
                s = v.clientHeight || v.scrollHeight
            }
            if (!w) {
                w = v.clientWidth || v.scrollWidth
            }
            var u = this.$updateCachedSize(x, t, w, s);
            if (!this.$size.scrollerHeight || (!w && !s)) {
                return this.resizing = 0
            }
            if (x) {
                this.$gutterLayer.$padding = null
            }
            if (x) {
                this.$renderChanges(u | this.$changes, true)
            } else {
                this.$loop.schedule(u | this.$changes)
            }
            if (this.resizing) {
                this.resizing = 0
            }
            this.scrollBarV.scrollLeft = this.scrollBarV.scrollTop = null
        }
            ;
        this.$updateCachedSize = function (y, u, w, s) {
            s -= (this.$extraHeight || 0);
            var v = 0;
            var t = this.$size;
            var x = {
                width: t.width,
                height: t.height,
                scrollerHeight: t.scrollerHeight,
                scrollerWidth: t.scrollerWidth
            };
            if (s && (y || t.height != s)) {
                t.height = s;
                v |= this.CHANGE_SIZE;
                t.scrollerHeight = t.height;
                if (this.$horizScroll) {
                    t.scrollerHeight -= this.scrollBarH.getHeight()
                }
                this.scrollBarV.element.style.bottom = this.scrollBarH.getHeight() + "px";
                v = v | this.CHANGE_SCROLL
            }
            if (w && (y || t.width != w)) {
                v |= this.CHANGE_SIZE;
                t.width = w;
                if (u == null) {
                    u = this.$showGutter ? this.$gutter.offsetWidth : 0
                }
                this.gutterWidth = u;
                this.scrollBarH.element.style.left = this.scroller.style.left = u + "px";
                t.scrollerWidth = Math.max(0, w - u - this.scrollBarV.getWidth());
                this.scrollBarH.element.style.right = this.scroller.style.right = this.scrollBarV.getWidth() + "px";
                this.scroller.style.bottom = this.scrollBarH.getHeight() + "px";
                if (this.session && this.session.getUseWrapMode() && this.adjustWrapLimit() || y) {
                    v |= this.CHANGE_FULL
                }
            }
            t.$dirty = !w || !s;
            if (v) {
                this._signal("resize", x)
            }
            return v
        }
            ;
        this.onGutterResize = function () {
            var s = this.$showGutter ? this.$gutter.offsetWidth : 0;
            if (s != this.gutterWidth) {
                this.$changes |= this.$updateCachedSize(true, s, this.$size.width, this.$size.height)
            }
            if (this.session.getUseWrapMode() && this.adjustWrapLimit()) {
                this.$loop.schedule(this.CHANGE_FULL)
            } else {
                if (this.$size.$dirty) {
                    this.$loop.schedule(this.CHANGE_FULL)
                } else {
                    this.$computeLayerConfig();
                    this.$loop.schedule(this.CHANGE_MARKER)
                }
            }
        }
            ;
        this.adjustWrapLimit = function () {
            var t = this.$size.scrollerWidth - this.$padding * 2;
            var s = Math.floor(t / this.characterWidth);
            return this.session.adjustWrapLimit(s, this.$showPrintMargin && this.$printMarginColumn)
        }
            ;
        this.setAnimatedScroll = function (s) {
            this.setOption("animatedScroll", s)
        }
            ;
        this.getAnimatedScroll = function () {
            return this.$animatedScroll
        }
            ;
        this.setShowInvisibles = function (s) {
            this.setOption("showInvisibles", s)
        }
            ;
        this.getShowInvisibles = function () {
            return this.getOption("showInvisibles")
        }
            ;
        this.getDisplayIndentGuides = function () {
            return this.getOption("displayIndentGuides")
        }
            ;
        this.setDisplayIndentGuides = function (s) {
            this.setOption("displayIndentGuides", s)
        }
            ;
        this.setShowPrintMargin = function (s) {
            this.setOption("showPrintMargin", s)
        }
            ;
        this.getShowPrintMargin = function () {
            return this.getOption("showPrintMargin")
        }
            ;
        this.setPrintMarginColumn = function (s) {
            this.setOption("printMarginColumn", s)
        }
            ;
        this.getPrintMarginColumn = function () {
            return this.getOption("printMarginColumn")
        }
            ;
        this.getShowGutter = function () {
            return this.getOption("showGutter")
        }
            ;
        this.setShowGutter = function (s) {
            return this.setOption("showGutter", s)
        }
            ;
        this.getFadeFoldWidgets = function () {
            return this.getOption("fadeFoldWidgets")
        }
            ;
        this.setFadeFoldWidgets = function (s) {
            this.setOption("fadeFoldWidgets", s)
        }
            ;
        this.setHighlightGutterLine = function (s) {
            this.setOption("highlightGutterLine", s)
        }
            ;
        this.getHighlightGutterLine = function () {
            return this.getOption("highlightGutterLine")
        }
            ;
        this.$updateGutterLineHighlight = function () {
            var u = this.$cursorLayer.$pixelPos;
            var s = this.layerConfig.lineHeight;
            if (this.session.getUseWrapMode()) {
                var t = this.session.selection.getCursor();
                t.column = 0;
                u = this.$cursorLayer.getPixelPosition(t, true);
                s *= this.session.getRowLength(t.row)
            }
            this.$gutterLineHighlight.style.top = u.top - this.layerConfig.offset + "px";
            this.$gutterLineHighlight.style.height = s + "px"
        }
            ;
        this.$updatePrintMargin = function () {
            if (!this.$showPrintMargin && !this.$printMarginEl) {
                return
            }
            if (!this.$printMarginEl) {
                var t = m.createElement("div");
                t.className = "ace_layer ace_print-margin-layer";
                this.$printMarginEl = m.createElement("div");
                this.$printMarginEl.className = "ace_print-margin";
                t.appendChild(this.$printMarginEl);
                this.content.insertBefore(t, this.content.firstChild)
            }
            var s = this.$printMarginEl.style;
            s.left = ((this.characterWidth * this.$printMarginColumn) + this.$padding) + "px";
            s.visibility = this.$showPrintMargin ? "visible" : "hidden";
            if (this.session && this.session.$wrap == -1) {
                this.adjustWrapLimit()
            }
        }
            ;
        this.getContainerElement = function () {
            return this.container
        }
            ;
        this.getMouseEventTarget = function () {
            return this.content
        }
            ;
        this.getTextAreaContainer = function () {
            return this.container
        }
            ;
        this.$moveTextAreaToCursor = function () {
            if (!this.$keepTextAreaAtCursor) {
                return
            }
            var u = this.layerConfig;
            var y = this.$cursorLayer.$pixelPos.top;
            var s = this.$cursorLayer.$pixelPos.left;
            y -= u.offset;
            var x = this.textarea.style;
            var v = this.lineHeight;
            if (y < 0 || y > u.height - v) {
                x.top = x.left = "0";
                return
            }
            var t = this.characterWidth;
            if (this.$composition) {
                var z = this.textarea.value.replace(/^\x01+/, "");
                t *= (this.session.$getStringScreenWidth(z)[0] + 2);
                v += 2
            }
            s -= this.scrollLeft;
            if (s > this.$size.scrollerWidth - t) {
                s = this.$size.scrollerWidth - t
            }
            s += this.gutterWidth;
            x.height = v + "px";
            x.width = t + "px";
            x.left = Math.min(s, this.$size.scrollerWidth - t) + "px";
            x.top = Math.min(y, this.$size.height - v) + "px"
        }
            ;
        this.getFirstVisibleRow = function () {
            return this.layerConfig.firstRow
        }
            ;
        this.getFirstFullyVisibleRow = function () {
            return this.layerConfig.firstRow + (this.layerConfig.offset === 0 ? 0 : 1)
        }
            ;
        this.getLastFullyVisibleRow = function () {
            var s = Math.floor((this.layerConfig.height + this.layerConfig.offset) / this.layerConfig.lineHeight);
            return this.layerConfig.firstRow - 1 + s
        }
            ;
        this.getLastVisibleRow = function () {
            return this.layerConfig.lastRow
        }
            ;
        this.$padding = null;
        this.setPadding = function (s) {
            this.$padding = s;
            this.$textLayer.setPadding(s);
            this.$cursorLayer.setPadding(s);
            this.$markerFront.setPadding(s);
            this.$markerBack.setPadding(s);
            this.$loop.schedule(this.CHANGE_FULL);
            this.$updatePrintMargin()
        }
            ;
        this.setScrollMargin = function (v, s, u, t) {
            var w = this.scrollMargin;
            w.top = v | 0;
            w.bottom = s | 0;
            w.right = t | 0;
            w.left = u | 0;
            w.v = w.top + w.bottom;
            w.h = w.left + w.right;
            if (w.top && this.scrollTop <= 0 && this.session) {
                this.session.setScrollTop(-w.top)
            }
            this.updateFull()
        }
            ;
        this.getHScrollBarAlwaysVisible = function () {
            return this.$hScrollBarAlwaysVisible
        }
            ;
        this.setHScrollBarAlwaysVisible = function (s) {
            this.setOption("hScrollBarAlwaysVisible", s)
        }
            ;
        this.getVScrollBarAlwaysVisible = function () {
            return this.$vScrollBarAlwaysVisible
        }
            ;
        this.setVScrollBarAlwaysVisible = function (s) {
            this.setOption("vScrollBarAlwaysVisible", s)
        }
            ;
        this.$updateScrollBarV = function () {
            var s = this.layerConfig.maxHeight;
            var t = this.$size.scrollerHeight;
            if (!this.$maxLines && this.$scrollPastEnd) {
                s -= (t - this.lineHeight) * this.$scrollPastEnd;
                if (this.scrollTop > s - t) {
                    s = this.scrollTop + t;
                    this.scrollBarV.scrollTop = null
                }
            }
            this.scrollBarV.setScrollHeight(s + this.scrollMargin.v);
            this.scrollBarV.setScrollTop(this.scrollTop + this.scrollMargin.top)
        }
            ;
        this.$updateScrollBarH = function () {
            this.scrollBarH.setScrollWidth(this.layerConfig.width + 2 * this.$padding + this.scrollMargin.h);
            this.scrollBarH.setScrollLeft(this.scrollLeft + this.scrollMargin.left)
        }
            ;
        this.$frozen = false;
        this.freeze = function () {
            this.$frozen = true
        }
            ;
        this.unfreeze = function () {
            this.$frozen = false
        }
            ;
        this.$renderChanges = function (u, v) {
            if (this.$changes) {
                u |= this.$changes;
                this.$changes = 0
            }
            if ((!this.session || !this.container.offsetWidth || this.$frozen) || (!u && !v)) {
                this.$changes |= u;
                return
            }
            if (this.$size.$dirty) {
                this.$changes |= u;
                return this.onResize(true)
            }
            if (!this.lineHeight) {
                this.$textLayer.checkForSizeChanges()
            }
            this._signal("beforeRender");
            var t = this.layerConfig;
            if (u & this.CHANGE_FULL || u & this.CHANGE_SIZE || u & this.CHANGE_TEXT || u & this.CHANGE_LINES || u & this.CHANGE_SCROLL || u & this.CHANGE_H_SCROLL) {
                u |= this.$computeLayerConfig();
                if (t.firstRow != this.layerConfig.firstRow && t.firstRowScreen == this.layerConfig.firstRowScreen) {
                    var s = this.scrollTop + (t.firstRow - this.layerConfig.firstRow) * this.lineHeight;
                    if (s > 0) {
                        this.scrollTop = s;
                        u = u | this.CHANGE_SCROLL;
                        u |= this.$computeLayerConfig()
                    }
                }
                t = this.layerConfig;
                this.$updateScrollBarV();
                if (u & this.CHANGE_H_SCROLL) {
                    this.$updateScrollBarH()
                }
                this.$gutterLayer.element.style.marginTop = (-t.offset) + "px";
                this.content.style.marginTop = (-t.offset) + "px";
                this.content.style.width = t.width + 2 * this.$padding + "px";
                this.content.style.height = t.minHeight + "px"
            }
            if (u & this.CHANGE_H_SCROLL) {
                this.content.style.marginLeft = -this.scrollLeft + "px";
                this.scroller.className = this.scrollLeft <= 0 ? "ace_scroller" : "ace_scroller ace_scroll-left"
            }
            if (u & this.CHANGE_FULL) {
                this.$textLayer.update(t);
                if (this.$showGutter) {
                    this.$gutterLayer.update(t)
                }
                this.$markerBack.update(t);
                this.$markerFront.update(t);
                this.$cursorLayer.update(t);
                this.$moveTextAreaToCursor();
                this.$highlightGutterLine && this.$updateGutterLineHighlight();
                this._signal("afterRender");
                return
            }
            if (u & this.CHANGE_SCROLL) {
                if (u & this.CHANGE_TEXT || u & this.CHANGE_LINES) {
                    this.$textLayer.update(t)
                } else {
                    this.$textLayer.scrollLines(t)
                }
                if (this.$showGutter) {
                    this.$gutterLayer.update(t)
                }
                this.$markerBack.update(t);
                this.$markerFront.update(t);
                this.$cursorLayer.update(t);
                this.$highlightGutterLine && this.$updateGutterLineHighlight();
                this.$moveTextAreaToCursor();
                this._signal("afterRender");
                return
            }
            if (u & this.CHANGE_TEXT) {
                this.$textLayer.update(t);
                if (this.$showGutter) {
                    this.$gutterLayer.update(t)
                }
            } else {
                if (u & this.CHANGE_LINES) {
                    if (this.$updateLines() || (u & this.CHANGE_GUTTER) && this.$showGutter) {
                        this.$gutterLayer.update(t)
                    }
                } else {
                    if (u & this.CHANGE_TEXT || u & this.CHANGE_GUTTER) {
                        if (this.$showGutter) {
                            this.$gutterLayer.update(t)
                        }
                    }
                }
            }
            if (u & this.CHANGE_CURSOR) {
                this.$cursorLayer.update(t);
                this.$moveTextAreaToCursor();
                this.$highlightGutterLine && this.$updateGutterLineHighlight()
            }
            if (u & (this.CHANGE_MARKER | this.CHANGE_MARKER_FRONT)) {
                this.$markerFront.update(t)
            }
            if (u & (this.CHANGE_MARKER | this.CHANGE_MARKER_BACK)) {
                this.$markerBack.update(t)
            }
            this._signal("afterRender")
        }
            ;
        this.$autosize = function () {
            var s = this.session.getScreenLength() * this.lineHeight;
            var x = this.$maxLines * this.lineHeight;
            var v = Math.max((this.$minLines || 1) * this.lineHeight, Math.min(x, s)) + this.scrollMargin.v + (this.$extraHeight || 0);
            var u = s > x;
            if (v != this.desiredHeight || this.$size.height != this.desiredHeight || u != this.$vScroll) {
                if (u != this.$vScroll) {
                    this.$vScroll = u;
                    this.scrollBarV.setVisible(u)
                }
                var t = this.container.clientWidth;
                this.container.style.height = v + "px";
                this.$updateCachedSize(true, this.$gutterWidth, t, v);
                this.desiredHeight = v;
                this._signal("autosize")
            }
        }
            ;
        this.$computeLayerConfig = function () {
            if (this.$maxLines && this.lineHeight > 1) {
                this.$autosize()
            }
            var t = this.session;
            var E = this.$size;
            var I = E.height <= 2 * this.lineHeight;
            var u = this.session.getScreenLength();
            var F = u * this.lineHeight;
            var w = this.scrollTop % this.lineHeight;
            var y = E.scrollerHeight + this.lineHeight;
            var K = this.$getLongestLine();
            var x = !I && (this.$hScrollBarAlwaysVisible || E.scrollerWidth - K - 2 * this.$padding < 0);
            var L = this.$horizScroll !== x;
            if (L) {
                this.$horizScroll = x;
                this.scrollBarH.setVisible(x)
            }
            var B = !this.$maxLines && this.$scrollPastEnd ? (E.scrollerHeight - this.lineHeight) * this.$scrollPastEnd : 0;
            F += B;
            this.session.setScrollTop(Math.max(-this.scrollMargin.top, Math.min(this.scrollTop, F - E.scrollerHeight + this.scrollMargin.bottom)));
            this.session.setScrollLeft(Math.max(-this.scrollMargin.left, Math.min(this.scrollLeft, K + 2 * this.$padding - E.scrollerWidth + this.scrollMargin.right)));
            var z = !I && (this.$vScrollBarAlwaysVisible || E.scrollerHeight - F + B < 0 || this.scrollTop);
            var A = this.$vScroll !== z;
            if (A) {
                this.$vScroll = z;
                this.scrollBarV.setVisible(z)
            }
            var G = Math.ceil(y / this.lineHeight) - 1;
            var s = Math.max(0, Math.round((this.scrollTop - w) / this.lineHeight));
            var H = s + G;
            var C, D;
            var v = this.lineHeight;
            s = t.screenToDocumentRow(s, 0);
            var J = t.getFoldLine(s);
            if (J) {
                s = J.start.row
            }
            C = t.documentToScreenRow(s, 0);
            D = t.getRowLength(s) * v;
            H = Math.min(t.screenToDocumentRow(H, 0), t.getLength() - 1);
            y = E.scrollerHeight + t.getRowLength(H) * v + D;
            w = this.scrollTop - C * v;
            var M = 0;
            if (this.layerConfig.width != K) {
                M = this.CHANGE_H_SCROLL
            }
            if (L || A) {
                M = this.$updateCachedSize(true, this.gutterWidth, E.width, E.height);
                this._signal("scrollbarVisibilityChanged");
                if (A) {
                    K = this.$getLongestLine()
                }
            }
            this.layerConfig = {
                width: K,
                padding: this.$padding,
                firstRow: s,
                firstRowScreen: C,
                lastRow: H,
                lineHeight: v,
                characterWidth: this.characterWidth,
                minHeight: y,
                maxHeight: F,
                offset: w,
                gutterOffset: Math.max(0, Math.ceil((w + E.height - E.scrollerHeight) / v)),
                height: this.$size.scrollerHeight
            };
            return M
        }
            ;
        this.$updateLines = function () {
            var u = this.$changedLines.firstRow;
            var t = this.$changedLines.lastRow;
            this.$changedLines = null;
            var s = this.layerConfig;
            if (u > s.lastRow + 1) {
                return
            }
            if (t < s.firstRow) {
                return
            }
            if (t === Infinity) {
                if (this.$showGutter) {
                    this.$gutterLayer.update(s)
                }
                this.$textLayer.update(s);
                return
            }
            this.$textLayer.updateLines(s, u, t);
            return true
        }
            ;
        this.$getLongestLine = function () {
            var s = this.session.getScreenWidth();
            if (this.showInvisibles && !this.session.$useWrapMode) {
                s += 1
            }
            return Math.max(this.$size.scrollerWidth - 2 * this.$padding, Math.round(s * this.characterWidth))
        }
            ;
        this.updateFrontMarkers = function () {
            this.$markerFront.setMarkers(this.session.getMarkers(true));
            this.$loop.schedule(this.CHANGE_MARKER_FRONT)
        }
            ;
        this.updateBackMarkers = function () {
            this.$markerBack.setMarkers(this.session.getMarkers());
            this.$loop.schedule(this.CHANGE_MARKER_BACK)
        }
            ;
        this.addGutterDecoration = function (t, s) {
            this.$gutterLayer.addGutterDecoration(t, s)
        }
            ;
        this.removeGutterDecoration = function (t, s) {
            this.$gutterLayer.removeGutterDecoration(t, s)
        }
            ;
        this.updateBreakpoints = function (s) {
            this.$loop.schedule(this.CHANGE_GUTTER)
        }
            ;
        this.setAnnotations = function (s) {
            this.$gutterLayer.setAnnotations(s);
            this.$loop.schedule(this.CHANGE_GUTTER)
        }
            ;
        this.updateCursor = function () {
            this.$loop.schedule(this.CHANGE_CURSOR)
        }
            ;
        this.hideCursor = function () {
            this.$cursorLayer.hideCursor()
        }
            ;
        this.showCursor = function () {
            this.$cursorLayer.showCursor()
        }
            ;
        this.scrollSelectionIntoView = function (t, s, u) {
            this.scrollCursorIntoView(t, u);
            this.scrollCursorIntoView(s, u)
        }
            ;
        this.scrollCursorIntoView = function (B, x, w) {
            if (this.$size.scrollerHeight === 0) {
                return
            }
            var z = this.$cursorLayer.getPixelPosition(B);
            var u = z.left;
            var A = z.top;
            var y = w && w.top || 0;
            var s = w && w.bottom || 0;
            var t = this.$scrollAnimation ? this.session.getScrollTop() : this.scrollTop;
            if (t + y > A) {
                if (x) {
                    A -= x * this.$size.scrollerHeight
                }
                if (A === 0) {
                    A = -this.scrollMargin.top
                }
                this.session.setScrollTop(A)
            } else {
                if (t + this.$size.scrollerHeight - s < A + this.lineHeight) {
                    if (x) {
                        A += x * this.$size.scrollerHeight
                    }
                    this.session.setScrollTop(A + this.lineHeight - this.$size.scrollerHeight)
                }
            }
            var v = this.scrollLeft;
            if (v > u) {
                if (u < this.$padding + 2 * this.layerConfig.characterWidth) {
                    u = -this.scrollMargin.left
                }
                this.session.setScrollLeft(u)
            } else {
                if (v + this.$size.scrollerWidth < u + this.characterWidth) {
                    this.session.setScrollLeft(Math.round(u + this.characterWidth - this.$size.scrollerWidth))
                } else {
                    if (v <= this.$padding && u - v < this.characterWidth) {
                        this.session.setScrollLeft(0)
                    }
                }
            }
        }
            ;
        this.getScrollTop = function () {
            return this.session.getScrollTop()
        }
            ;
        this.getScrollLeft = function () {
            return this.session.getScrollLeft()
        }
            ;
        this.getScrollTopRow = function () {
            return this.scrollTop / this.lineHeight
        }
            ;
        this.getScrollBottomRow = function () {
            return Math.max(0, Math.floor((this.scrollTop + this.$size.scrollerHeight) / this.lineHeight) - 1)
        }
            ;
        this.scrollToRow = function (s) {
            this.session.setScrollTop(s * this.lineHeight)
        }
            ;
        this.alignCursor = function (u, w) {
            if (typeof u == "number") {
                u = {
                    row: u,
                    column: 0
                }
            }
            var v = this.$cursorLayer.getPixelPosition(u);
            var s = this.$size.scrollerHeight - this.lineHeight;
            var t = v.top - s * (w || 0);
            this.session.setScrollTop(t);
            return t
        }
            ;
        this.STEPS = 8;
        this.$calcSteps = function (x, t) {
            var v = 0;
            var s = this.STEPS;
            var u = [];
            var w = function (z, A, y) {
                return y * (Math.pow(z - 1, 3) + 1) + A
            };
            for (v = 0; v < s; ++v) {
                u.push(w(v / this.STEPS, x, t - x))
            }
            return u
        }
            ;
        this.scrollToLine = function (t, s, u, y) {
            var x = this.$cursorLayer.getPixelPosition({
                row: t,
                column: 0
            });
            var w = x.top;
            if (s) {
                w -= this.$size.scrollerHeight / 2
            }
            var v = this.scrollTop;
            this.session.setScrollTop(w);
            if (u !== false) {
                this.animateScrolling(v, y)
            }
        }
            ;
        this.animateScrolling = function (w, x) {
            var t = this.scrollTop;
            if (!this.$animatedScroll) {
                return
            }
            var s = this;
            if (w == t) {
                return
            }
            if (this.$scrollAnimation) {
                var v = this.$scrollAnimation.steps;
                if (v.length) {
                    w = v[0];
                    if (w == t) {
                        return
                    }
                }
            }
            var u = s.$calcSteps(w, t);
            this.$scrollAnimation = {
                from: w,
                to: t,
                steps: u
            };
            clearInterval(this.$timer);
            s.session.setScrollTop(u.shift());
            s.session.$scrollTop = t;
            this.$timer = setInterval(function () {
                if (u.length) {
                    s.session.setScrollTop(u.shift());
                    s.session.$scrollTop = t
                } else {
                    if (t != null) {
                        s.session.$scrollTop = -1;
                        s.session.setScrollTop(t);
                        t = null
                    } else {
                        s.$timer = clearInterval(s.$timer);
                        s.$scrollAnimation = null;
                        x && x()
                    }
                }
            }, 10)
        }
            ;
        this.scrollToY = function (s) {
            if (this.scrollTop !== s) {
                this.$loop.schedule(this.CHANGE_SCROLL);
                this.scrollTop = s
            }
        }
            ;
        this.scrollToX = function (s) {
            if (this.scrollLeft !== s) {
                this.scrollLeft = s
            }
            this.$loop.schedule(this.CHANGE_H_SCROLL)
        }
            ;
        this.scrollTo = function (s, t) {
            this.session.setScrollTop(t);
            this.session.setScrollLeft(t)
        }
            ;
        this.scrollBy = function (t, s) {
            s && this.session.setScrollTop(this.session.getScrollTop() + s);
            t && this.session.setScrollLeft(this.session.getScrollLeft() + t)
        }
            ;
        this.isScrollableBy = function (t, s) {
            if (s < 0 && this.session.getScrollTop() >= 1 - this.scrollMargin.top) {
                return true
            }
            if (s > 0 && this.session.getScrollTop() + this.$size.scrollerHeight - this.layerConfig.maxHeight < -1 + this.scrollMargin.bottom) {
                return true
            }
            if (t < 0 && this.session.getScrollLeft() >= 1 - this.scrollMargin.left) {
                return true
            }
            if (t > 0 && this.session.getScrollLeft() + this.$size.scrollerWidth - this.layerConfig.width < -1 + this.scrollMargin.right) {
                return true
            }
        }
            ;
        this.pixelToScreenCoordinates = function (s, z) {
            var u = this.scroller.getBoundingClientRect();
            var w = (s + this.scrollLeft - u.left - this.$padding) / this.characterWidth;
            var v = Math.floor((z + this.scrollTop - u.top) / this.lineHeight);
            var t = Math.round(w);
            return {
                row: v,
                column: t,
                side: w - t > 0 ? 1 : -1
            }
        }
            ;
        this.screenToTextCoordinates = function (s, w) {
            var u = this.scroller.getBoundingClientRect();
            var t = Math.round((s + this.scrollLeft - u.left - this.$padding) / this.characterWidth);
            var v = (w + this.scrollTop - u.top) / this.lineHeight;
            return this.session.screenToDocumentPosition(v, Math.max(t, 0))
        }
            ;
        this.textToScreenCoordinates = function (v, u) {
            var t = this.scroller.getBoundingClientRect();
            var z = this.session.documentToScreenPosition(v, u);
            var s = this.$padding + Math.round(z.column * this.characterWidth);
            var w = z.row * this.lineHeight;
            return {
                pageX: t.left + s - this.scrollLeft,
                pageY: t.top + w - this.scrollTop
            }
        }
            ;
        this.visualizeFocus = function () {
            m.addCssClass(this.container, "ace_focus")
        }
            ;
        this.visualizeBlur = function () {
            m.removeCssClass(this.container, "ace_focus")
        }
            ;
        this.showComposition = function (s) {
            if (!this.$composition) {
                this.$composition = {
                    keepTextAreaAtCursor: this.$keepTextAreaAtCursor,
                    cssText: this.textarea.style.cssText
                }
            }
            this.$keepTextAreaAtCursor = true;
            m.addCssClass(this.textarea, "ace_composition");
            this.textarea.style.cssText = "";
            this.$moveTextAreaToCursor()
        }
            ;
        this.setCompositionText = function (s) {
            this.$moveTextAreaToCursor()
        }
            ;
        this.hideComposition = function () {
            if (!this.$composition) {
                return
            }
            m.removeCssClass(this.textarea, "ace_composition");
            this.$keepTextAreaAtCursor = this.$composition.keepTextAreaAtCursor;
            this.textarea.style.cssText = this.$composition.cssText;
            this.$composition = null
        }
            ;
        this.setTheme = function (v, t) {
            var s = this;
            this.$themeId = v;
            s._dispatchEvent("themeChange", {
                theme: v
            });
            if (!v || typeof v == "string") {
                var u = v || this.$options.theme.initialValue;
                q.loadModule(["theme", u], w)
            } else {
                w(v)
            }
            function w(x) {
                if (s.$themeId != v) {
                    return t && t()
                }
                if (!x.cssClass) {
                    return
                }
                m.importCssString(x.cssText, x.cssClass, s.container.ownerDocument);
                if (s.theme) {
                    m.removeCssClass(s.container, s.theme.cssClass)
                }
                var y = "padding" in x ? x.padding : "padding" in (s.theme || {}) ? 4 : s.$padding;
                if (s.$padding && y != s.$padding) {
                    s.setPadding(y)
                }
                s.$theme = x.cssClass;
                s.theme = x;
                m.addCssClass(s.container, x.cssClass);
                m.setCssClass(s.container, "ace_dark", x.isDark);
                if (s.$size) {
                    s.$size.width = 0;
                    s.$updateSizeAsync()
                }
                s._dispatchEvent("themeLoaded", {
                    theme: x
                });
                t && t()
            }
        }
            ;
        this.getTheme = function () {
            return this.$themeId
        }
            ;
        this.setStyle = function (t, s) {
            m.setCssClass(this.container, t, s !== false)
        }
            ;
        this.unsetStyle = function (s) {
            m.removeCssClass(this.container, s)
        }
            ;
        this.setCursorStyle = function (s) {
            if (this.scroller.style.cursor != s) {
                this.scroller.style.cursor = s
            }
        }
            ;
        this.setMouseCursor = function (s) {
            this.scroller.style.cursor = s
        }
            ;
        this.destroy = function () {
            this.$textLayer.destroy();
            this.$cursorLayer.destroy()
        }
    }
    ).call(f.prototype);
    q.defineOptions(f.prototype, "renderer", {
        animatedScroll: {
            initialValue: false
        },
        showInvisibles: {
            set: function (s) {
                if (this.$textLayer.setShowInvisibles(s)) {
                    this.$loop.schedule(this.CHANGE_TEXT)
                }
            },
            initialValue: false
        },
        showPrintMargin: {
            set: function () {
                this.$updatePrintMargin()
            },
            initialValue: true
        },
        printMarginColumn: {
            set: function () {
                this.$updatePrintMargin()
            },
            initialValue: 80
        },
        printMargin: {
            set: function (s) {
                if (typeof s == "number") {
                    this.$printMarginColumn = s
                }
                this.$showPrintMargin = !!s;
                this.$updatePrintMargin()
            },
            get: function () {
                return this.$showPrintMargin && this.$printMarginColumn
            }
        },
        showGutter: {
            set: function (s) {
                this.$gutter.style.display = s ? "block" : "none";
                this.$loop.schedule(this.CHANGE_FULL);
                this.onGutterResize()
            },
            initialValue: true
        },
        fadeFoldWidgets: {
            set: function (s) {
                m.setCssClass(this.$gutter, "ace_fade-fold-widgets", s)
            },
            initialValue: false
        },
        showFoldWidgets: {
            set: function (s) {
                this.$gutterLayer.setShowFoldWidgets(s)
            },
            initialValue: true
        },
        showLineNumbers: {
            set: function (s) {
                this.$gutterLayer.setShowLineNumbers(s);
                this.$loop.schedule(this.CHANGE_GUTTER)
            },
            initialValue: true
        },
        displayIndentGuides: {
            set: function (s) {
                if (this.$textLayer.setDisplayIndentGuides(s)) {
                    this.$loop.schedule(this.CHANGE_TEXT)
                }
            },
            initialValue: true
        },
        highlightGutterLine: {
            set: function (s) {
                if (!this.$gutterLineHighlight) {
                    this.$gutterLineHighlight = m.createElement("div");
                    this.$gutterLineHighlight.className = "ace_gutter-active-line";
                    this.$gutter.appendChild(this.$gutterLineHighlight);
                    return
                }
                this.$gutterLineHighlight.style.display = s ? "" : "none";
                if (this.$cursorLayer.$pixelPos) {
                    this.$updateGutterLineHighlight()
                }
            },
            initialValue: false,
            value: true
        },
        hScrollBarAlwaysVisible: {
            set: function (s) {
                if (!this.$hScrollBarAlwaysVisible || !this.$horizScroll) {
                    this.$loop.schedule(this.CHANGE_SCROLL)
                }
            },
            initialValue: false
        },
        vScrollBarAlwaysVisible: {
            set: function (s) {
                if (!this.$vScrollBarAlwaysVisible || !this.$vScroll) {
                    this.$loop.schedule(this.CHANGE_SCROLL)
                }
            },
            initialValue: false
        },
        fontSize: {
            set: function (s) {
                if (typeof s == "number") {
                    s = s + "px"
                }
                this.container.style.fontSize = s;
                this.updateFontSize()
            },
            initialValue: 12
        },
        fontFamily: {
            set: function (s) {
                this.container.style.fontFamily = s;
                this.updateFontSize()
            }
        },
        maxLines: {
            set: function (s) {
                this.updateFull()
            }
        },
        minLines: {
            set: function (s) {
                this.updateFull()
            }
        },
        scrollPastEnd: {
            set: function (s) {
                s = +s || 0;
                if (this.$scrollPastEnd == s) {
                    return
                }
                this.$scrollPastEnd = s;
                this.$loop.schedule(this.CHANGE_SCROLL)
            },
            initialValue: 0,
            handlesSet: true
        },
        fixedWidthGutter: {
            set: function (s) {
                this.$gutterLayer.$fixedWidth = !!s;
                this.$loop.schedule(this.CHANGE_GUTTER)
            }
        },
        theme: {
            set: function (s) {
                this.setTheme(s)
            },
            get: function () {
                return this.$themeId || this.theme
            },
            initialValue: "./theme/textmate",
            handlesSet: true
        }
    });
    r.VirtualRenderer = f
});
define("ace/worker/worker_client", ["require", "exports", "module", "ace/lib/oop", "ace/lib/net", "ace/lib/event_emitter", "ace/config"], function (d, e, b) {
    var f = d("../lib/oop");
    var h = d("../lib/net");
    var i = d("../lib/event_emitter").EventEmitter;
    var c = d("../config");
    var a = function (k, q, l, r) {
        this.$sendDeltaQueue = this.$sendDeltaQueue.bind(this);
        this.changeListener = this.changeListener.bind(this);
        this.onMessage = this.onMessage.bind(this);
        if (d.nameToUrl && !d.toUrl) {
            d.toUrl = d.nameToUrl
        }
        if (c.get("packaged") || !d.toUrl) {
            r = r || c.moduleUrl(q, "worker")
        } else {
            var m = this.$normalizePath;
            r = r || m(d.toUrl("ace/worker/worker.js", null, "_"));
            var s = {};
            k.forEach(function (t) {
                s[t] = m(d.toUrl(t, null, "_").replace(/(\.js)?(\?.*)?$/, ""))
            })
        }
        try {
            this.$worker = new Worker(r)
        } catch (o) {
            if (o instanceof window.DOMException) {
                var j = this.$workerBlob(r);
                var p = window.URL || window.webkitURL;
                var n = p.createObjectURL(j);
                this.$worker = new Worker(n);
                p.revokeObjectURL(n)
            } else {
                throw o
            }
        }
        this.$worker.postMessage({
            init: true,
            tlns: s,
            module: q,
            classname: l
        });
        this.callbackId = 1;
        this.callbacks = {};
        this.$worker.onmessage = this.onMessage
    };
    (function () {
        f.implement(this, i);
        this.onMessage = function (j) {
            var k = j.data;
            switch (k.type) {
                case "event":
                    this._signal(k.name, {
                        data: k.data
                    });
                    break;
                case "call":
                    var l = this.callbacks[k.id];
                    if (l) {
                        l(k.data);
                        delete this.callbacks[k.id]
                    }
                    break;
                case "error":
                    this.reportError(k.data);
                    break;
                case "log":
                    window.console && console.log && console.log.apply(console, k.data);
                    break
            }
        }
            ;
        this.reportError = function (j) {
            window.console && console.error && console.error(j)
        }
            ;
        this.$normalizePath = function (j) {
            return h.qualifyURL(j)
        }
            ;
        this.terminate = function () {
            this._signal("terminate", {});
            this.deltaQueue = null;
            this.$worker.terminate();
            this.$worker = null;
            if (this.$doc) {
                this.$doc.off("change", this.changeListener)
            }
            this.$doc = null
        }
            ;
        this.send = function (k, j) {
            this.$worker.postMessage({
                command: k,
                args: j
            })
        }
            ;
        this.call = function (k, j, m) {
            if (m) {
                var l = this.callbackId++;
                this.callbacks[l] = m;
                j.push(l)
            }
            this.send(k, j)
        }
            ;
        this.emit = function (k, l) {
            try {
                this.$worker.postMessage({
                    event: k,
                    data: {
                        data: l.data
                    }
                })
            } catch (j) {
                console.error(j.stack)
            }
        }
            ;
        this.attachToDocument = function (j) {
            if (this.$doc) {
                this.terminate()
            }
            this.$doc = j;
            this.call("setValue", [j.getValue()]);
            j.on("change", this.changeListener)
        }
            ;
        this.changeListener = function (j) {
            if (!this.deltaQueue) {
                this.deltaQueue = [j.data];
                setTimeout(this.$sendDeltaQueue, 0)
            } else {
                this.deltaQueue.push(j.data)
            }
        }
            ;
        this.$sendDeltaQueue = function () {
            var j = this.deltaQueue;
            if (!j) {
                return
            }
            this.deltaQueue = null;
            if (j.length > 20 && j.length > this.$doc.getLength() >> 1) {
                this.call("setValue", [this.$doc.getValue()])
            } else {
                this.emit("change", {
                    data: j
                })
            }
        }
            ;
        this.$workerBlob = function (l) {
            var j = "importScripts('" + h.qualifyURL(l) + "');";
            try {
                return new Blob([j], {
                    type: "application/javascript"
                })
            } catch (n) {
                var m = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder;
                var k = new m();
                k.append(j);
                return k.getBlob("application/javascript")
            }
        }
    }
    ).call(a.prototype);
    var g = function (n, m, q) {
        this.$sendDeltaQueue = this.$sendDeltaQueue.bind(this);
        this.changeListener = this.changeListener.bind(this);
        this.callbackId = 1;
        this.callbacks = {};
        this.messageBuffer = [];
        var k = null;
        var p = false;
        var l = Object.create(i);
        var j = this;
        this.$worker = {};
        this.$worker.terminate = function () { }
            ;
        this.$worker.postMessage = function (r) {
            j.messageBuffer.push(r);
            if (k) {
                if (p) {
                    setTimeout(o)
                } else {
                    o()
                }
            }
        }
            ;
        this.setEmitSync = function (r) {
            p = r
        }
            ;
        var o = function () {
            var r = j.messageBuffer.shift();
            if (r.command) {
                k[r.command].apply(k, r.args)
            } else {
                if (r.event) {
                    l._signal(r.event, r.data)
                }
            }
        };
        l.postMessage = function (r) {
            j.onMessage({
                data: r
            })
        }
            ;
        l.callback = function (s, r) {
            this.postMessage({
                type: "call",
                id: r,
                data: s
            })
        }
            ;
        l.emit = function (r, s) {
            this.postMessage({
                type: "event",
                name: r,
                data: s
            })
        }
            ;
        c.loadModule(["worker", m], function (r) {
            k = new r[q](l);
            while (j.messageBuffer.length) {
                o()
            }
        })
    };
    g.prototype = a.prototype;
    e.UIWorkerClient = g;
    e.WorkerClient = a
});
define("ace/placeholder", ["require", "exports", "module", "ace/range", "ace/lib/event_emitter", "ace/lib/oop"], function (b, a, c) {
    var f = b("./range").Range;
    var e = b("./lib/event_emitter").EventEmitter;
    var d = b("./lib/oop");
    var g = function (n, m, o, l, i, k) {
        var h = this;
        this.length = m;
        this.session = n;
        this.doc = n.getDocument();
        this.mainClass = i;
        this.othersClass = k;
        this.$onUpdate = this.onUpdate.bind(this);
        this.doc.on("change", this.$onUpdate);
        this.$others = l;
        this.$onCursorChange = function () {
            setTimeout(function () {
                h.onCursorChange()
            })
        }
            ;
        this.$pos = o;
        var j = n.getUndoManager().$undoStack || n.getUndoManager().$undostack || {
            length: -1
        };
        this.$undoStackDepth = j.length;
        this.setup();
        n.selection.on("changeCursor", this.$onCursorChange)
    };
    (function () {
        d.implement(this, e);
        this.setup = function () {
            var h = this;
            var j = this.doc;
            var i = this.session;
            var k = this.$pos;
            this.selectionBefore = i.selection.toJSON();
            if (i.selection.inMultiSelectMode) {
                i.selection.toSingleRange()
            }
            this.pos = j.createAnchor(k.row, k.column);
            this.markerId = i.addMarker(new f(k.row, k.column, k.row, k.column + this.length), this.mainClass, null, false);
            this.pos.on("change", function (l) {
                i.removeMarker(h.markerId);
                h.markerId = i.addMarker(new f(l.value.row, l.value.column, l.value.row, l.value.column + h.length), h.mainClass, null, false)
            });
            this.others = [];
            this.$others.forEach(function (l) {
                var m = j.createAnchor(l.row, l.column);
                h.others.push(m)
            });
            i.setUndoSelect(false)
        }
            ;
        this.showOtherMarkers = function () {
            if (this.othersActive) {
                return
            }
            var i = this.session;
            var h = this;
            this.othersActive = true;
            this.others.forEach(function (j) {
                j.markerId = i.addMarker(new f(j.row, j.column, j.row, j.column + h.length), h.othersClass, null, false);
                j.on("change", function (k) {
                    i.removeMarker(j.markerId);
                    j.markerId = i.addMarker(new f(k.value.row, k.value.column, k.value.row, k.value.column + h.length), h.othersClass, null, false)
                })
            })
        }
            ;
        this.hideOtherMarkers = function () {
            if (!this.othersActive) {
                return
            }
            this.othersActive = false;
            for (var h = 0; h < this.others.length; h++) {
                this.session.removeMarker(this.others[h].markerId)
            }
        }
            ;
        this.onUpdate = function (o) {
            var p = o.data;
            var h = p.range;
            if (h.start.row !== h.end.row) {
                return
            }
            if (h.start.row !== this.pos.row) {
                return
            }
            if (this.$updating) {
                return
            }
            this.$updating = true;
            var k = p.action === "insertText" ? h.end.column - h.start.column : h.start.column - h.end.column;
            if (h.start.column >= this.pos.column && h.start.column <= this.pos.column + this.length + 1) {
                var n = h.start.column - this.pos.column;
                this.length += k;
                if (!this.session.$fromUndo) {
                    if (p.action === "insertText") {
                        for (var m = this.others.length - 1; m >= 0; m--) {
                            var j = this.others[m];
                            var l = {
                                row: j.row,
                                column: j.column + n
                            };
                            if (j.row === h.start.row && h.start.column < j.column) {
                                l.column += k
                            }
                            this.doc.insert(l, p.text)
                        }
                    } else {
                        if (p.action === "removeText") {
                            for (var m = this.others.length - 1; m >= 0; m--) {
                                var j = this.others[m];
                                var l = {
                                    row: j.row,
                                    column: j.column + n
                                };
                                if (j.row === h.start.row && h.start.column < j.column) {
                                    l.column += k
                                }
                                this.doc.remove(new f(l.row, l.column, l.row, l.column - k))
                            }
                        }
                    }
                    if (h.start.column === this.pos.column && p.action === "insertText") {
                        setTimeout(function () {
                            this.pos.setPosition(this.pos.row, this.pos.column - k);
                            for (var s = 0; s < this.others.length; s++) {
                                var q = this.others[s];
                                var r = {
                                    row: q.row,
                                    column: q.column - k
                                };
                                if (q.row === h.start.row && h.start.column < q.column) {
                                    r.column += k
                                }
                                q.setPosition(r.row, r.column)
                            }
                        }
                            .bind(this), 0)
                    } else {
                        if (h.start.column === this.pos.column && p.action === "removeText") {
                            setTimeout(function () {
                                for (var r = 0; r < this.others.length; r++) {
                                    var q = this.others[r];
                                    if (q.row === h.start.row && h.start.column < q.column) {
                                        q.setPosition(q.row, q.column - k)
                                    }
                                }
                            }
                                .bind(this), 0)
                        }
                    }
                }
                this.pos._emit("change", {
                    value: this.pos
                });
                for (var m = 0; m < this.others.length; m++) {
                    this.others[m]._emit("change", {
                        value: this.others[m]
                    })
                }
            }
            this.$updating = false
        }
            ;
        this.onCursorChange = function (h) {
            if (this.$updating || !this.session) {
                return
            }
            var i = this.session.selection.getCursor();
            if (i.row === this.pos.row && i.column >= this.pos.column && i.column <= this.pos.column + this.length) {
                this.showOtherMarkers();
                this._emit("cursorEnter", h)
            } else {
                this.hideOtherMarkers();
                this._emit("cursorLeave", h)
            }
        }
            ;
        this.detach = function () {
            this.session.removeMarker(this.markerId);
            this.hideOtherMarkers();
            this.doc.removeEventListener("change", this.$onUpdate);
            this.session.selection.removeEventListener("changeCursor", this.$onCursorChange);
            this.pos.detach();
            for (var h = 0; h < this.others.length; h++) {
                this.others[h].detach()
            }
            this.session.setUndoSelect(true);
            this.session = null
        }
            ;
        this.cancel = function () {
            if (this.$undoStackDepth === -1) {
                throw Error("Canceling placeholders only supported with undo manager attached to session.")
            }
            var k = this.session.getUndoManager();
            var h = (k.$undoStack || k.$undostack).length - this.$undoStackDepth;
            for (var j = 0; j < h; j++) {
                k.undo(true)
            }
            if (this.selectionBefore) {
                this.session.selection.fromJSON(this.selectionBefore)
            }
        }
    }
    ).call(g.prototype);
    a.PlaceHolder = g
});
define("ace/mouse/multi_select_handler", ["require", "exports", "module", "ace/lib/event", "ace/lib/useragent"], function (d, b, e) {
    var f = d("../lib/event");
    var a = d("../lib/useragent");
    function c(i, h) {
        return i.row == h.row && i.column == h.column
    }
    function g(E) {
        var F = E.domEvent;
        var H = F.altKey;
        var A = F.shiftKey;
        var u = F.ctrlKey;
        var w = E.getAccelKey();
        var h = E.getButton();
        if (u && a.isMac) {
            h = F.button
        }
        if (E.editor.inMultiSelectMode && h == 2) {
            E.editor.textInput.onContextMenu(E.domEvent);
            return
        }
        if (!u && !H && !w) {
            if (h === 0 && E.editor.inMultiSelectMode) {
                E.editor.exitMultiSelectMode()
            }
            return
        }
        if (h !== 0) {
            return
        }
        var n = E.editor;
        var I = n.selection;
        var G = n.inMultiSelectMode;
        var q = E.getDocumentPosition();
        var o = I.getCursor();
        var B = E.inSelection() || (I.isEmpty() && c(q, o));
        var t = E.x
            , s = E.y;
        var p = function (J) {
            t = J.clientX;
            s = J.clientY
        };
        var i = n.session;
        var m = n.renderer.pixelToScreenCoordinates(t, s);
        var y = m;
        var r;
        if (n.$mouseHandler.$enableJumpToDef) {
            if (u && H || w && H) {
                r = "add"
            } else {
                if (H && n.$blockSelectEnabled) {
                    r = "block"
                }
            }
        } else {
            if (w && !H) {
                r = "add";
                if (!G && A) {
                    return
                }
            } else {
                if (H && n.$blockSelectEnabled) {
                    r = "block"
                }
            }
        }
        if (r && a.isMac && F.ctrlKey) {
            n.$mouseHandler.cancelContextMenu()
        }
        if (r == "add") {
            if (!G && B) {
                return
            }
            if (!G) {
                var z = I.toOrientedRange();
                n.addSelectionMarker(z)
            }
            var x = I.rangeList.rangeAtPoint(q);
            n.$blockScrolling++;
            n.inVirtualSelectionMode = true;
            if (A) {
                x = null;
                z = I.ranges[0];
                n.removeSelectionMarker(z)
            }
            n.once("mouseup", function () {
                var J = I.toOrientedRange();
                if (x && J.isEmpty() && c(x.cursor, J.cursor)) {
                    I.substractPoint(J.cursor)
                } else {
                    if (A) {
                        I.substractPoint(z.cursor)
                    } else {
                        if (z) {
                            n.removeSelectionMarker(z);
                            I.addRange(z)
                        }
                    }
                    I.addRange(J)
                }
                n.$blockScrolling--;
                n.inVirtualSelectionMode = false
            })
        } else {
            if (r == "block") {
                E.stop();
                n.inVirtualSelectionMode = true;
                var l;
                var D = [];
                var k = function () {
                    var K = n.renderer.pixelToScreenCoordinates(t, s);
                    var J = i.screenToDocumentPosition(K.row, K.column);
                    if (c(y, K) && c(J, I.lead)) {
                        return
                    }
                    y = K;
                    n.$blockScrolling++;
                    n.selection.moveToPosition(J);
                    n.renderer.scrollCursorIntoView();
                    n.removeSelectionMarkers(D);
                    D = I.rectangularRangeBlock(y, m);
                    if (n.$mouseHandler.$clickSelection && D.length == 1 && D[0].isEmpty()) {
                        D[0] = n.$mouseHandler.$clickSelection.clone()
                    }
                    D.forEach(n.addSelectionMarker, n);
                    n.updateSelectionMarkers();
                    n.$blockScrolling--
                };
                n.$blockScrolling++;
                if (G && !w) {
                    I.toSingleRange()
                } else {
                    if (!G && w) {
                        l = I.toOrientedRange();
                        n.addSelectionMarker(l)
                    }
                }
                if (A) {
                    m = i.documentToScreenPosition(I.lead)
                } else {
                    I.moveToPosition(q)
                }
                n.$blockScrolling--;
                y = {
                    row: -1,
                    column: -1
                };
                var j = function (K) {
                    clearInterval(v);
                    n.removeSelectionMarkers(D);
                    if (!D.length) {
                        D = [I.toOrientedRange()]
                    }
                    n.$blockScrolling++;
                    if (l) {
                        n.removeSelectionMarker(l);
                        I.toSingleRange(l)
                    }
                    for (var J = 0; J < D.length; J++) {
                        I.addRange(D[J])
                    }
                    n.inVirtualSelectionMode = false;
                    n.$mouseHandler.$clickSelection = null;
                    n.$blockScrolling--
                };
                var C = k;
                f.capture(n.container, p, j);
                var v = setInterval(function () {
                    C()
                }, 20);
                return E.preventDefault()
            }
        }
    }
    b.onMouseDown = g
});
define("ace/commands/multi_select_commands", ["require", "exports", "module", "ace/keyboard/hash_handler"], function (b, a, c) {
    a.defaultCommands = [{
        name: "addCursorAbove",
        exec: function (e) {
            e.selectMoreLines(-1)
        },
        bindKey: {
            win: "Ctrl-Alt-Up",
            mac: "Ctrl-Alt-Up"
        },
        scrollIntoView: "cursor",
        readonly: true
    }, {
        name: "addCursorBelow",
        exec: function (e) {
            e.selectMoreLines(1)
        },
        bindKey: {
            win: "Ctrl-Alt-Down",
            mac: "Ctrl-Alt-Down"
        },
        scrollIntoView: "cursor",
        readonly: true
    }, {
        name: "addCursorAboveSkipCurrent",
        exec: function (e) {
            e.selectMoreLines(-1, true)
        },
        bindKey: {
            win: "Ctrl-Alt-Shift-Up",
            mac: "Ctrl-Alt-Shift-Up"
        },
        scrollIntoView: "cursor",
        readonly: true
    }, {
        name: "addCursorBelowSkipCurrent",
        exec: function (e) {
            e.selectMoreLines(1, true)
        },
        bindKey: {
            win: "Ctrl-Alt-Shift-Down",
            mac: "Ctrl-Alt-Shift-Down"
        },
        scrollIntoView: "cursor",
        readonly: true
    }, {
        name: "selectMoreBefore",
        exec: function (e) {
            e.selectMore(-1)
        },
        bindKey: {
            win: "Ctrl-Alt-Left",
            mac: "Ctrl-Alt-Left"
        },
        scrollIntoView: "cursor",
        readonly: true
    }, {
        name: "selectMoreAfter",
        exec: function (e) {
            e.selectMore(1)
        },
        bindKey: {
            win: "Ctrl-Alt-Right",
            mac: "Ctrl-Alt-Right"
        },
        scrollIntoView: "cursor",
        readonly: true
    }, {
        name: "selectNextBefore",
        exec: function (e) {
            e.selectMore(-1, true)
        },
        bindKey: {
            win: "Ctrl-Alt-Shift-Left",
            mac: "Ctrl-Alt-Shift-Left"
        },
        scrollIntoView: "cursor",
        readonly: true
    }, {
        name: "selectNextAfter",
        exec: function (e) {
            e.selectMore(1, true)
        },
        bindKey: {
            win: "Ctrl-Alt-Shift-Right",
            mac: "Ctrl-Alt-Shift-Right"
        },
        scrollIntoView: "cursor",
        readonly: true
    }, {
        name: "splitIntoLines",
        exec: function (e) {
            e.multiSelect.splitIntoLines()
        },
        bindKey: {
            win: "Ctrl-Alt-L",
            mac: "Ctrl-Alt-L"
        },
        readonly: true
    }, {
        name: "alignCursors",
        exec: function (e) {
            e.alignCursors()
        },
        bindKey: {
            win: "Ctrl-Alt-A",
            mac: "Ctrl-Alt-A"
        },
        scrollIntoView: "cursor"
    }, {
        name: "findAll",
        exec: function (e) {
            e.findAll()
        },
        bindKey: {
            win: "Ctrl-Alt-K",
            mac: "Ctrl-Alt-G"
        },
        scrollIntoView: "cursor",
        readonly: true
    }];
    a.multiSelectCommands = [{
        name: "singleSelection",
        bindKey: "esc",
        exec: function (e) {
            e.exitMultiSelectMode()
        },
        scrollIntoView: "cursor",
        readonly: true,
        isAvailable: function (e) {
            return e && e.inMultiSelectMode
        }
    }];
    var d = b("../keyboard/hash_handler").HashHandler;
    a.keyboardHandler = new d(a.multiSelectCommands)
});
define("ace/multi_select", ["require", "exports", "module", "ace/range_list", "ace/range", "ace/selection", "ace/mouse/multi_select_handler", "ace/lib/event", "ace/lib/lang", "ace/commands/multi_select_commands", "ace/search", "ace/edit_session", "ace/editor", "ace/config"], function (g, q, b) {
    var n = g("./range_list").RangeList;
    var o = g("./range").Range;
    var c = g("./selection").Selection;
    var e = g("./mouse/multi_select_handler").onMouseDown;
    var m = g("./lib/event");
    var r = g("./lib/lang");
    var d = g("./commands/multi_select_commands");
    q.commands = d.defaultCommands.concat(d.multiSelectCommands);
    var f = g("./search").Search;
    var h = new f();
    function j(u, t, s) {
        h.$options.wrap = true;
        h.$options.needle = t;
        h.$options.backwards = s == -1;
        return h.find(u)
    }
    var a = g("./edit_session").EditSession;
    (function () {
        this.getSelectionMarkers = function () {
            return this.$selectionMarkers
        }
    }
    ).call(a.prototype);
    (function () {
        this.ranges = null;
        this.rangeList = null;
        this.addRange = function (t, s) {
            if (!t) {
                return
            }
            if (!this.inMultiSelectMode && this.rangeCount === 0) {
                var v = this.toOrientedRange();
                this.rangeList.add(v);
                this.rangeList.add(t);
                if (this.rangeList.ranges.length != 2) {
                    this.rangeList.removeAll();
                    return s || this.fromOrientedRange(t)
                }
                this.rangeList.removeAll();
                this.rangeList.add(v);
                this.$onAddRange(v)
            }
            if (!t.cursor) {
                t.cursor = t.end
            }
            var u = this.rangeList.add(t);
            this.$onAddRange(t);
            if (u.length) {
                this.$onRemoveRange(u)
            }
            if (this.rangeCount > 1 && !this.inMultiSelectMode) {
                this._signal("multiSelect");
                this.inMultiSelectMode = true;
                this.session.$undoSelect = false;
                this.rangeList.attach(this.session)
            }
            return s || this.fromOrientedRange(t)
        }
            ;
        this.toSingleRange = function (s) {
            s = s || this.ranges[0];
            var t = this.rangeList.removeAll();
            if (t.length) {
                this.$onRemoveRange(t)
            }
            s && this.fromOrientedRange(s)
        }
            ;
        this.substractPoint = function (t) {
            var s = this.rangeList.substractPoint(t);
            if (s) {
                this.$onRemoveRange(s);
                return s[0]
            }
        }
            ;
        this.mergeOverlappingRanges = function () {
            var s = this.rangeList.merge();
            if (s.length) {
                this.$onRemoveRange(s)
            } else {
                if (this.ranges[0]) {
                    this.fromOrientedRange(this.ranges[0])
                }
            }
        }
            ;
        this.$onAddRange = function (s) {
            this.rangeCount = this.rangeList.ranges.length;
            this.ranges.unshift(s);
            this._signal("addRange", {
                range: s
            })
        }
            ;
        this.$onRemoveRange = function (u) {
            this.rangeCount = this.rangeList.ranges.length;
            if (this.rangeCount == 1 && this.inMultiSelectMode) {
                var v = this.rangeList.ranges.pop();
                u.push(v);
                this.rangeCount = 0
            }
            for (var t = u.length; t--;) {
                var s = this.ranges.indexOf(u[t]);
                this.ranges.splice(s, 1)
            }
            this._signal("removeRange", {
                ranges: u
            });
            if (this.rangeCount === 0 && this.inMultiSelectMode) {
                this.inMultiSelectMode = false;
                this._signal("singleSelect");
                this.session.$undoSelect = true;
                this.rangeList.detach(this.session)
            }
            v = v || this.ranges[0];
            if (v && !v.isEqual(this.getRange())) {
                this.fromOrientedRange(v)
            }
        }
            ;
        this.$initRangeList = function () {
            if (this.rangeList) {
                return
            }
            this.rangeList = new n();
            this.ranges = [];
            this.rangeCount = 0
        }
            ;
        this.getAllRanges = function () {
            return this.rangeCount ? this.rangeList.ranges.concat() : [this.getRange()]
        }
            ;
        this.splitIntoLines = function () {
            if (this.rangeCount > 1) {
                var t = this.rangeList.ranges;
                var z = t[t.length - 1];
                var A = o.fromPoints(t[0].start, z.end);
                this.toSingleRange();
                this.setSelectionRange(A, z.cursor == z.start)
            } else {
                var A = this.getRange();
                var B = this.isBackwards();
                var C = A.start.row;
                var x = A.end.row;
                if (C == x) {
                    if (B) {
                        var u = A.end
                            , w = A.start
                    } else {
                        var u = A.start
                            , w = A.end
                    }
                    this.addRange(o.fromPoints(w, w));
                    this.addRange(o.fromPoints(u, u));
                    return
                }
                var v = [];
                var s = this.getLineRange(C, true);
                s.start.column = A.start.column;
                v.push(s);
                for (var y = C + 1; y < x; y++) {
                    v.push(this.getLineRange(y, true))
                }
                s = this.getLineRange(x, true);
                s.end.column = A.end.column;
                v.push(s);
                v.forEach(this.addRange, this)
            }
        }
            ;
        this.toggleBlockSelection = function () {
            if (this.rangeCount > 1) {
                var s = this.rangeList.ranges;
                var w = s[s.length - 1];
                var t = o.fromPoints(s[0].start, w.end);
                this.toSingleRange();
                this.setSelectionRange(t, w.cursor == w.start)
            } else {
                var v = this.session.documentToScreenPosition(this.selectionLead);
                var u = this.session.documentToScreenPosition(this.selectionAnchor);
                var x = this.rectangularRangeBlock(v, u);
                x.forEach(this.addRange, this)
            }
        }
            ;
        this.rectangularRangeBlock = function (t, z, E) {
            var u = [];
            var w = t.column < z.column;
            if (w) {
                var v = t.column;
                var D = z.column
            } else {
                var v = z.column;
                var D = t.column
            }
            var F = t.row < z.row;
            if (F) {
                var G = t.row;
                var y = z.row
            } else {
                var G = z.row;
                var y = t.row
            }
            if (v < 0) {
                v = 0
            }
            if (G < 0) {
                G = 0
            }
            if (G == y) {
                E = true
            }
            for (var H = G; H <= y; H++) {
                var B = o.fromPoints(this.session.screenToDocumentPosition(H, v), this.session.screenToDocumentPosition(H, D));
                if (B.isEmpty()) {
                    if (C && p(B.end, C)) {
                        break
                    }
                    var C = B.end
                }
                B.cursor = w ? B.start : B.end;
                u.push(B)
            }
            if (F) {
                u.reverse()
            }
            if (!E) {
                var x = u.length - 1;
                while (u[x].isEmpty() && x > 0) {
                    x--
                }
                if (x > 0) {
                    var s = 0;
                    while (u[s].isEmpty()) {
                        s++
                    }
                }
                for (var A = x; A >= s; A--) {
                    if (u[A].isEmpty()) {
                        u.splice(A, 1)
                    }
                }
            }
            return u
        }
    }
    ).call(c.prototype);
    var l = g("./editor").Editor;
    (function () {
        this.updateSelectionMarkers = function () {
            this.renderer.updateCursor();
            this.renderer.updateBackMarkers()
        }
            ;
        this.addSelectionMarker = function (t) {
            if (!t.cursor) {
                t.cursor = t.end
            }
            var s = this.getSelectionStyle();
            t.marker = this.session.addMarker(t, "ace_selection", s);
            this.session.$selectionMarkers.push(t);
            this.session.selectionMarkerCount = this.session.$selectionMarkers.length;
            return t
        }
            ;
        this.removeSelectionMarker = function (s) {
            if (!s.marker) {
                return
            }
            this.session.removeMarker(s.marker);
            var t = this.session.$selectionMarkers.indexOf(s);
            if (t != -1) {
                this.session.$selectionMarkers.splice(t, 1)
            }
            this.session.selectionMarkerCount = this.session.$selectionMarkers.length
        }
            ;
        this.removeSelectionMarkers = function (s) {
            var u = this.session.$selectionMarkers;
            for (var w = s.length; w--;) {
                var t = s[w];
                if (!t.marker) {
                    continue
                }
                this.session.removeMarker(t.marker);
                var v = u.indexOf(t);
                if (v != -1) {
                    u.splice(v, 1)
                }
            }
            this.session.selectionMarkerCount = u.length
        }
            ;
        this.$onAddRange = function (s) {
            this.addSelectionMarker(s.range);
            this.renderer.updateCursor();
            this.renderer.updateBackMarkers()
        }
            ;
        this.$onRemoveRange = function (s) {
            this.removeSelectionMarkers(s.ranges);
            this.renderer.updateCursor();
            this.renderer.updateBackMarkers()
        }
            ;
        this.$onMultiSelect = function (s) {
            if (this.inMultiSelectMode) {
                return
            }
            this.inMultiSelectMode = true;
            this.setStyle("ace_multiselect");
            this.keyBinding.addKeyboardHandler(d.keyboardHandler);
            this.commands.setDefaultHandler("exec", this.$onMultiSelectExec);
            this.renderer.updateCursor();
            this.renderer.updateBackMarkers()
        }
            ;
        this.$onSingleSelect = function (s) {
            if (this.session.multiSelect.inVirtualMode) {
                return
            }
            this.inMultiSelectMode = false;
            this.unsetStyle("ace_multiselect");
            this.keyBinding.removeKeyboardHandler(d.keyboardHandler);
            this.commands.removeDefaultHandler("exec", this.$onMultiSelectExec);
            this.renderer.updateCursor();
            this.renderer.updateBackMarkers();
            this._emit("changeSelection")
        }
            ;
        this.$onMultiSelectExec = function (u) {
            var v = u.command;
            var t = u.editor;
            if (!t.multiSelect) {
                return
            }
            if (!v.multiSelectAction) {
                var s = v.exec(t, u.args || {});
                t.multiSelect.addRange(t.multiSelect.toOrientedRange());
                t.multiSelect.mergeOverlappingRanges()
            } else {
                if (v.multiSelectAction == "forEach") {
                    s = t.forEachSelection(v, u.args)
                } else {
                    if (v.multiSelectAction == "forEachLine") {
                        s = t.forEachSelection(v, u.args, true)
                    } else {
                        if (v.multiSelectAction == "single") {
                            t.exitMultiSelectMode();
                            s = v.exec(t, u.args || {})
                        } else {
                            s = v.multiSelectAction(t, u.args || {})
                        }
                    }
                }
            }
            return s
        }
            ;
        this.forEachSelection = function (v, C, G) {
            if (this.inVirtualSelectionMode) {
                return
            }
            var z = G && G.keepOrder;
            var B = G == true || G && G.$byLines;
            var D = this.session;
            var E = this.selection;
            var w = E.rangeList;
            var t = (z ? E : w).ranges;
            var F;
            if (!t.length) {
                return v.exec ? v.exec(this, C || {}) : v(this, C || {})
            }
            var u = E._eventRegistry;
            E._eventRegistry = {};
            var s = new c(D);
            this.inVirtualSelectionMode = true;
            for (var y = t.length; y--;) {
                if (B) {
                    while (y > 0 && t[y].start.row == t[y - 1].end.row) {
                        y--
                    }
                }
                s.fromOrientedRange(t[y]);
                s.index = y;
                this.selection = D.selection = s;
                var A = v.exec ? v.exec(this, C || {}) : v(this, C || {});
                if (!F && A !== undefined) {
                    F = A
                }
                s.toOrientedRange(t[y])
            }
            s.detach();
            this.selection = D.selection = E;
            this.inVirtualSelectionMode = false;
            E._eventRegistry = u;
            E.mergeOverlappingRanges();
            var x = this.renderer.$scrollAnimation;
            this.onCursorChange();
            this.onSelectionChange();
            if (x && x.from == x.to) {
                this.renderer.animateScrolling(x.from)
            }
            return F
        }
            ;
        this.exitMultiSelectMode = function () {
            if (!this.inMultiSelectMode || this.inVirtualSelectionMode) {
                return
            }
            this.multiSelect.toSingleRange()
        }
            ;
        this.getSelectedText = function () {
            var w = "";
            if (this.inMultiSelectMode && !this.inVirtualSelectionMode) {
                var t = this.multiSelect.rangeList.ranges;
                var u = [];
                for (var v = 0; v < t.length; v++) {
                    u.push(this.session.getTextRange(t[v]))
                }
                var s = this.session.getDocument().getNewLineCharacter();
                w = u.join(s);
                if (w.length == (u.length - 1) * s.length) {
                    w = ""
                }
            } else {
                if (!this.selection.isEmpty()) {
                    w = this.session.getTextRange(this.getSelectionRange())
                }
            }
            return w
        }
            ;
        this.$checkMultiselectChange = function (u, t) {
            if (this.inMultiSelectMode && !this.inVirtualSelectionMode) {
                var s = this.multiSelect.ranges[0];
                if (this.multiSelect.isEmpty() && t == this.multiSelect.anchor) {
                    return
                }
                var v = t == this.multiSelect.anchor ? s.cursor == s.start ? s.end : s.start : s.cursor;
                if (v.row != t.row || this.session.$clipPositionToDocument(v.row, v.column).column != t.column) {
                    this.multiSelect.toSingleRange(this.multiSelect.toOrientedRange())
                }
            }
        }
            ;
        this.findAll = function (y, v, t) {
            v = v || {};
            v.needle = y || v.needle;
            if (v.needle == undefined) {
                var u = this.selection.isEmpty() ? this.selection.getWordRange() : this.selection.getRange();
                v.needle = this.session.getTextRange(u)
            }
            this.$search.set(v);
            var s = this.$search.findAll(this.session);
            if (!s.length) {
                return 0
            }
            this.$blockScrolling += 1;
            var x = this.multiSelect;
            if (!t) {
                x.toSingleRange(s[0])
            }
            for (var w = s.length; w--;) {
                x.addRange(s[w], true)
            }
            if (u && x.rangeList.rangeAtPoint(u.start)) {
                x.addRange(u, true)
            }
            this.$blockScrolling -= 1;
            return s.length
        }
            ;
        this.selectMoreLines = function (t, A) {
            var w = this.selection.toOrientedRange();
            var B = w.cursor == w.end;
            var z = this.session.documentToScreenPosition(w.cursor);
            if (this.selection.$desiredColumn) {
                z.column = this.selection.$desiredColumn
            }
            var x = this.session.screenToDocumentPosition(z.row + t, z.column);
            if (!w.isEmpty()) {
                var u = this.session.documentToScreenPosition(B ? w.end : w.start);
                var v = this.session.screenToDocumentPosition(u.row + t, u.column)
            } else {
                var v = x
            }
            if (B) {
                var y = o.fromPoints(x, v);
                y.cursor = y.start
            } else {
                var y = o.fromPoints(v, x);
                y.cursor = y.end
            }
            y.desiredColumn = z.column;
            if (!this.selection.inMultiSelectMode) {
                this.selection.addRange(w)
            } else {
                if (A) {
                    var s = w.cursor
                }
            }
            this.selection.addRange(y);
            if (s) {
                this.selection.substractPoint(s)
            }
        }
            ;
        this.transposeSelections = function (t) {
            var y = this.session;
            var x = y.multiSelect;
            var w = x.ranges;
            for (var v = w.length; v--;) {
                var s = w[v];
                if (s.isEmpty()) {
                    var u = y.getWordRange(s.start.row, s.start.column);
                    s.start.row = u.start.row;
                    s.start.column = u.start.column;
                    s.end.row = u.end.row;
                    s.end.column = u.end.column
                }
            }
            x.mergeOverlappingRanges();
            var z = [];
            for (var v = w.length; v--;) {
                var s = w[v];
                z.unshift(y.getTextRange(s))
            }
            if (t < 0) {
                z.unshift(z.pop())
            } else {
                z.push(z.shift())
            }
            for (var v = w.length; v--;) {
                var s = w[v];
                var u = s.clone();
                y.replace(s, z[v]);
                s.start.row = u.start.row;
                s.start.column = u.start.column
            }
        }
            ;
        this.selectMore = function (u, w, v) {
            var z = this.session;
            var x = z.multiSelect;
            var s = x.toOrientedRange();
            if (s.isEmpty()) {
                s = z.getWordRange(s.start.row, s.start.column);
                s.cursor = u == -1 ? s.start : s.end;
                this.multiSelect.addRange(s);
                if (v) {
                    return
                }
            }
            var y = z.getTextRange(s);
            var t = j(z, y, u);
            if (t) {
                t.cursor = u == -1 ? t.start : t.end;
                this.$blockScrolling += 1;
                this.session.unfold(t);
                this.multiSelect.addRange(t);
                this.$blockScrolling -= 1;
                this.renderer.scrollCursorIntoView(null, 0.5)
            }
            if (w) {
                this.multiSelect.substractPoint(s.cursor)
            }
        }
            ;
        this.alignCursors = function () {
            var z = this.session;
            var u = z.multiSelect;
            var t = u.ranges;
            var G = -1;
            var v = t.filter(function (H) {
                if (H.cursor.row == G) {
                    return true
                }
                G = H.cursor.row
            });
            if (!t.length || v.length == t.length - 1) {
                var w = this.selection.getRange();
                var y = w.start.row
                    , x = w.end.row;
                var B = y == x;
                if (B) {
                    var A = this.session.getLength();
                    var F;
                    do {
                        F = this.session.getLine(x)
                    } while (/[=:]/.test(F) && ++x < A);
                    do {
                        F = this.session.getLine(y)
                    } while (/[=:]/.test(F) && --y > 0);
                    if (y < 0) {
                        y = 0
                    }
                    if (x >= A) {
                        x = A - 1
                    }
                }
                var E = this.session.doc.removeLines(y, x);
                E = this.$reAlignText(E, B);
                this.session.doc.insert({
                    row: y,
                    column: 0
                }, E.join("\n") + "\n");
                if (!B) {
                    w.start.column = 0;
                    w.end.column = E[E.length - 1].length
                }
                this.selection.setRange(w)
            } else {
                v.forEach(function (H) {
                    u.substractPoint(H.cursor)
                });
                var C = 0;
                var D = Infinity;
                var s = t.map(function (J) {
                    var K = J.cursor;
                    var H = z.getLine(K.row);
                    var I = H.substr(K.column).search(/\S/g);
                    if (I == -1) {
                        I = 0
                    }
                    if (K.column > C) {
                        C = K.column
                    }
                    if (I < D) {
                        D = I
                    }
                    return I
                });
                t.forEach(function (J, I) {
                    var K = J.cursor;
                    var H = C - K.column;
                    var L = s[I] - D;
                    if (H > L) {
                        z.insert(K, r.stringRepeat(" ", H - L))
                    } else {
                        z.remove(new o(K.row, K.column, K.row, K.column - H + L))
                    }
                    J.start.column = J.end.column = C;
                    J.start.row = J.end.row = K.row;
                    J.cursor = J.end
                });
                u.fromOrientedRange(t[0]);
                this.renderer.updateCursor();
                this.renderer.updateBackMarkers()
            }
        }
            ;
        this.$reAlignText = function (C, v) {
            var s = true
                , u = true;
            var x, y, B;
            return C.map(function (E) {
                var D = E.match(/(\s*)(.*?)(\s*)([=:].*)/);
                if (!D) {
                    return [E]
                }
                if (x == null) {
                    x = D[1].length;
                    y = D[2].length;
                    B = D[3].length;
                    return D
                }
                if (x + y + B != D[1].length + D[2].length + D[3].length) {
                    u = false
                }
                if (x != D[1].length) {
                    s = false
                }
                if (x > D[1].length) {
                    x = D[1].length
                }
                if (y < D[2].length) {
                    y = D[2].length
                }
                if (B > D[3].length) {
                    B = D[3].length
                }
                return D
            }).map(v ? t : s ? u ? A : t : w);
            function z(D) {
                return r.stringRepeat(" ", D)
            }
            function t(D) {
                return !D[2] ? D[0] : z(x) + D[2] + z(y - D[2].length + B) + D[4].replace(/^([=:])\s+/, "$1 ")
            }
            function A(D) {
                return !D[2] ? D[0] : z(x + y - D[2].length) + D[2] + z(B, " ") + D[4].replace(/^([=:])\s+/, "$1 ")
            }
            function w(D) {
                return !D[2] ? D[0] : z(x) + D[2] + z(B) + D[4].replace(/^([=:])\s+/, "$1 ")
            }
        }
    }
    ).call(l.prototype);
    function p(t, s) {
        return t.row == s.row && t.column == s.column
    }
    q.onSessionChange = function (u) {
        var t = u.session;
        if (t && !t.multiSelect) {
            t.$selectionMarkers = [];
            t.selection.$initRangeList();
            t.multiSelect = t.selection
        }
        this.multiSelect = t && t.multiSelect;
        var s = u.oldSession;
        if (s) {
            s.multiSelect.off("addRange", this.$onAddRange);
            s.multiSelect.off("removeRange", this.$onRemoveRange);
            s.multiSelect.off("multiSelect", this.$onMultiSelect);
            s.multiSelect.off("singleSelect", this.$onSingleSelect);
            s.multiSelect.lead.off("change", this.$checkMultiselectChange);
            s.multiSelect.anchor.off("change", this.$checkMultiselectChange)
        }
        if (t) {
            t.multiSelect.on("addRange", this.$onAddRange);
            t.multiSelect.on("removeRange", this.$onRemoveRange);
            t.multiSelect.on("multiSelect", this.$onMultiSelect);
            t.multiSelect.on("singleSelect", this.$onSingleSelect);
            t.multiSelect.lead.on("change", this.$checkMultiselectChange);
            t.multiSelect.anchor.on("change", this.$checkMultiselectChange)
        }
        if (t && this.inMultiSelectMode != t.selection.inMultiSelectMode) {
            if (t.selection.inMultiSelectMode) {
                this.$onMultiSelect()
            } else {
                this.$onSingleSelect()
            }
        }
    }
        ;
    function k(s) {
        if (s.$multiselectOnSessionChange) {
            return
        }
        s.$onAddRange = s.$onAddRange.bind(s);
        s.$onRemoveRange = s.$onRemoveRange.bind(s);
        s.$onMultiSelect = s.$onMultiSelect.bind(s);
        s.$onSingleSelect = s.$onSingleSelect.bind(s);
        s.$multiselectOnSessionChange = q.onSessionChange.bind(s);
        s.$checkMultiselectChange = s.$checkMultiselectChange.bind(s);
        s.$multiselectOnSessionChange(s);
        s.on("changeSession", s.$multiselectOnSessionChange);
        s.on("mousedown", e);
        s.commands.addCommands(d.defaultCommands);
        i(s)
    }
    function i(t) {
        var s = t.textInput.getElement();
        var v = false;
        m.addListener(s, "keydown", function (x) {
            var w = x.keyCode == 18 && !(x.ctrlKey || x.shiftKey || x.metaKey);
            if (t.$blockSelectEnabled && w) {
                if (!v) {
                    t.renderer.setMouseCursor("crosshair");
                    v = true
                }
            } else {
                if (v) {
                    u()
                }
            }
        });
        m.addListener(s, "keyup", u);
        m.addListener(s, "blur", u);
        function u(w) {
            if (v) {
                t.renderer.setMouseCursor("");
                v = false
            }
        }
    }
    q.MultiSelect = k;
    g("./config").defineOptions(l.prototype, "editor", {
        enableMultiselect: {
            set: function (s) {
                k(this);
                if (s) {
                    this.on("changeSession", this.$multiselectOnSessionChange);
                    this.on("mousedown", e)
                } else {
                    this.off("changeSession", this.$multiselectOnSessionChange);
                    this.off("mousedown", e)
                }
            },
            value: true
        },
        enableBlockSelect: {
            set: function (s) {
                this.$blockSelectEnabled = s
            },
            value: true
        }
    })
});
define("ace/mode/folding/fold_mode", ["require", "exports", "module", "ace/range"], function (b, a, c) {
    var e = b("../../range").Range;
    var d = a.FoldMode = function () { }
        ;
    (function () {
        this.foldingStartMarker = null;
        this.foldingStopMarker = null;
        this.getFoldWidget = function (h, g, i) {
            var f = h.getLine(i);
            if (this.foldingStartMarker.test(f)) {
                return "start"
            }
            if (g == "markbeginend" && this.foldingStopMarker && this.foldingStopMarker.test(f)) {
                return "end"
            }
            return ""
        }
            ;
        this.getFoldWidgetRange = function (g, f, h) {
            return null
        }
            ;
        this.indentationBlock = function (l, p, g) {
            var o = /\S/;
            var q = l.getLine(p);
            var j = q.search(o);
            if (j == -1) {
                return
            }
            var h = g || q.length;
            var m = l.getLength();
            var n = p;
            var i = p;
            while (++p < m) {
                var f = l.getLine(p).search(o);
                if (f == -1) {
                    continue
                }
                if (f <= j) {
                    break
                }
                i = p
            }
            if (i > n) {
                var k = l.getLine(i).length;
                return new e(n, h, i, k)
            }
        }
            ;
        this.openingBracketBlock = function (j, l, k, h, f) {
            var m = {
                row: k,
                column: h + 1
            };
            var g = j.$findClosingBracket(l, m, f);
            if (!g) {
                return
            }
            var i = j.foldWidgets[g.row];
            if (i == null) {
                i = j.getFoldWidget(g.row)
            }
            if (i == "start" && g.row > m.row) {
                g.row--;
                g.column = j.getLine(g.row).length
            }
            return e.fromPoints(m, g)
        }
            ;
        this.closingBracketBlock = function (i, k, j, h, f) {
            var g = {
                row: j,
                column: h
            };
            var l = i.$findOpeningBracket(k, g);
            if (!l) {
                return
            }
            l.column++;
            g.column--;
            return e.fromPoints(l, g)
        }
    }
    ).call(d.prototype)
});
define("ace/theme/textmate", ["require", "exports", "module", "ace/lib/dom"], function (b, a, c) {
    a.isDark = false;
    a.cssClass = "ace-tm";
    a.cssText = '.ace-tm .ace_gutter {background: #f0f0f0;color: #333;}.ace-tm .ace_print-margin {width: 1px;background: #e8e8e8;}.ace-tm .ace_fold {background-color: #6B72E6;}.ace-tm {background-color: #FFFFFF;color: black;}.ace-tm .ace_cursor {color: black;}.ace-tm .ace_invisible {color: rgb(191, 191, 191);}.ace-tm .ace_storage,.ace-tm .ace_keyword {color: blue;}.ace-tm .ace_constant {color: rgb(197, 6, 11);}.ace-tm .ace_constant.ace_buildin {color: rgb(88, 72, 246);}.ace-tm .ace_constant.ace_language {color: rgb(88, 92, 246);}.ace-tm .ace_constant.ace_library {color: rgb(6, 150, 14);}.ace-tm .ace_invalid {background-color: rgba(255, 0, 0, 0.1);color: red;}.ace-tm .ace_support.ace_function {color: rgb(60, 76, 114);}.ace-tm .ace_support.ace_constant {color: rgb(6, 150, 14);}.ace-tm .ace_support.ace_type,.ace-tm .ace_support.ace_class {color: rgb(109, 121, 222);}.ace-tm .ace_keyword.ace_operator {color: rgb(104, 118, 135);}.ace-tm .ace_string {color: rgb(3, 106, 7);}.ace-tm .ace_comment {color: rgb(76, 136, 107);}.ace-tm .ace_comment.ace_doc {color: rgb(0, 102, 255);}.ace-tm .ace_comment.ace_doc.ace_tag {color: rgb(128, 159, 191);}.ace-tm .ace_constant.ace_numeric {color: rgb(0, 0, 205);}.ace-tm .ace_variable {color: rgb(49, 132, 149);}.ace-tm .ace_xml-pe {color: rgb(104, 104, 91);}.ace-tm .ace_entity.ace_name.ace_function {color: #0000A2;}.ace-tm .ace_heading {color: rgb(12, 7, 255);}.ace-tm .ace_list {color:rgb(185, 6, 144);}.ace-tm .ace_meta.ace_tag {color:rgb(0, 22, 142);}.ace-tm .ace_string.ace_regex {color: rgb(255, 0, 0)}.ace-tm .ace_marker-layer .ace_selection {background: rgb(181, 213, 255);}.ace-tm.ace_multiselect .ace_selection.ace_start {box-shadow: 0 0 3px 0px white;border-radius: 2px;}.ace-tm .ace_marker-layer .ace_step {background: rgb(252, 255, 0);}.ace-tm .ace_marker-layer .ace_stack {background: rgb(164, 229, 101);}.ace-tm .ace_marker-layer .ace_bracket {margin: -1px 0 0 -1px;border: 1px solid rgb(192, 192, 192);}.ace-tm .ace_marker-layer .ace_active-line {background: rgba(0, 0, 0, 0.07);}.ace-tm .ace_gutter-active-line {background-color : #dcdcdc;}.ace-tm .ace_marker-layer .ace_selected-word {background: rgb(250, 250, 255);border: 1px solid rgb(200, 200, 250);}.ace-tm .ace_indent-guide {background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAE0lEQVQImWP4////f4bLly//BwAmVgd1/w11/gAAAABJRU5ErkJggg==") right repeat-y;}';
    var d = b("../lib/dom");
    d.importCssString(a.cssText, a.cssClass)
});
define("ace/line_widgets", ["require", "exports", "module", "ace/lib/oop", "ace/lib/dom", "ace/range"], function (b, a, c) {
    var d = b("./lib/oop");
    var g = b("./lib/dom");
    var f = b("./range").Range;
    function e(h) {
        this.session = h;
        this.session.widgetManager = this;
        this.session.getRowLength = this.getRowLength;
        this.session.$getWidgetScreenLength = this.$getWidgetScreenLength;
        this.updateOnChange = this.updateOnChange.bind(this);
        this.renderWidgets = this.renderWidgets.bind(this);
        this.measureWidgets = this.measureWidgets.bind(this);
        this.session._changedWidgets = [];
        this.$onChangeEditor = this.$onChangeEditor.bind(this);
        this.session.on("change", this.updateOnChange);
        this.session.on("changeEditor", this.$onChangeEditor)
    }
    (function () {
        this.getRowLength = function (j) {
            var i;
            if (this.lineWidgets) {
                i = this.lineWidgets[j] && this.lineWidgets[j].rowCount || 0
            } else {
                i = 0
            }
            if (!this.$useWrapMode || !this.$wrapData[j]) {
                return 1 + i
            } else {
                return this.$wrapData[j].length + 1 + i
            }
        }
            ;
        this.$getWidgetScreenLength = function () {
            var h = 0;
            this.lineWidgets.forEach(function (i) {
                if (i && i.rowCount) {
                    h += i.rowCount
                }
            });
            return h
        }
            ;
        this.$onChangeEditor = function (h) {
            this.attach(h.editor)
        }
            ;
        this.attach = function (h) {
            if (h && h.widgetManager && h.widgetManager != this) {
                h.widgetManager.detach()
            }
            if (this.editor == h) {
                return
            }
            this.detach();
            this.editor = h;
            if (h) {
                h.widgetManager = this;
                h.renderer.on("beforeRender", this.measureWidgets);
                h.renderer.on("afterRender", this.renderWidgets)
            }
        }
            ;
        this.detach = function (j) {
            var i = this.editor;
            if (!i) {
                return
            }
            this.editor = null;
            i.widgetManager = null;
            i.renderer.off("beforeRender", this.measureWidgets);
            i.renderer.off("afterRender", this.renderWidgets);
            var h = this.session.lineWidgets;
            h && h.forEach(function (k) {
                if (k && k.el && k.el.parentNode) {
                    k._inDocument = false;
                    k.el.parentNode.removeChild(k.el)
                }
            })
        }
            ;
        this.updateOnChange = function (n) {
            var l = this.session.lineWidgets;
            if (!l) {
                return
            }
            var o = n.data;
            var j = o.range;
            var i = j.start.row;
            var h = j.end.row - i;
            if (h === 0) { } else {
                if (o.action == "removeText" || o.action == "removeLines") {
                    var m = l.splice(i + 1, h);
                    m.forEach(function (p) {
                        p && this.removeLineWidget(p)
                    }, this);
                    this.$updateRows()
                } else {
                    var k = new Array(h);
                    k.unshift(i, 0);
                    l.splice.apply(l, k);
                    this.$updateRows()
                }
            }
        }
            ;
        this.$updateRows = function () {
            var h = this.session.lineWidgets;
            if (!h) {
                return
            }
            var i = true;
            h.forEach(function (j, k) {
                if (j) {
                    i = false;
                    j.row = k
                }
            });
            if (i) {
                this.session.lineWidgets = null
            }
        }
            ;
        this.addLineWidget = function (h) {
            if (!this.session.lineWidgets) {
                this.session.lineWidgets = new Array(this.session.getLength())
            }
            this.session.lineWidgets[h.row] = h;
            var i = this.editor.renderer;
            if (h.html && !h.el) {
                h.el = g.createElement("div");
                h.el.innerHTML = h.html
            }
            if (h.el) {
                g.addCssClass(h.el, "ace_lineWidgetContainer");
                h.el.style.position = "absolute";
                h.el.style.zIndex = 5;
                i.container.appendChild(h.el);
                h._inDocument = true
            }
            if (!h.coverGutter) {
                h.el.style.zIndex = 3
            }
            if (!h.pixelHeight) {
                h.pixelHeight = h.el.offsetHeight
            }
            if (h.rowCount == null) {
                h.rowCount = h.pixelHeight / i.layerConfig.lineHeight
            }
            this.session._emit("changeFold", {
                data: {
                    start: {
                        row: h.row
                    }
                }
            });
            this.$updateRows();
            this.renderWidgets(null, i);
            return h
        }
            ;
        this.removeLineWidget = function (h) {
            h._inDocument = false;
            if (h.el && h.el.parentNode) {
                h.el.parentNode.removeChild(h.el)
            }
            if (h.editor && h.editor.destroy) {
                try {
                    h.editor.destroy()
                } catch (i) { }
            }
            if (this.session.lineWidgets) {
                this.session.lineWidgets[h.row] = undefined
            }
            this.session._emit("changeFold", {
                data: {
                    start: {
                        row: h.row
                    }
                }
            });
            this.$updateRows()
        }
            ;
        this.onWidgetChanged = function (h) {
            this.session._changedWidgets.push(h);
            this.editor && this.editor.renderer.updateFull()
        }
            ;
        this.measureWidgets = function (p, o) {
            var k = this.session._changedWidgets;
            var l = o.layerConfig;
            if (!k || !k.length) {
                return
            }
            var n = Infinity;
            for (var m = 0; m < k.length; m++) {
                var h = k[m];
                if (!h._inDocument) {
                    h._inDocument = true;
                    o.container.appendChild(h.el)
                }
                h.h = h.el.offsetHeight;
                if (!h.fixedWidth) {
                    h.w = h.el.offsetWidth;
                    h.screenWidth = Math.ceil(h.w / l.characterWidth)
                }
                var j = h.h / l.lineHeight;
                if (h.coverLine) {
                    j -= this.session.getRowLineCount(h.row);
                    if (j < 0) {
                        j = 0
                    }
                }
                if (h.rowCount != j) {
                    h.rowCount = j;
                    if (h.row < n) {
                        n = h.row
                    }
                }
            }
            if (n != Infinity) {
                this.session._emit("changeFold", {
                    data: {
                        start: {
                            row: n
                        }
                    }
                });
                this.session.lineWidgetWidth = null
            }
            this.session._changedWidgets = []
        }
            ;
        this.renderWidgets = function (m, n) {
            var h = n.layerConfig;
            var o = this.session.lineWidgets;
            if (!o) {
                return
            }
            var l = Math.min(this.firstRow, h.firstRow);
            var r = Math.max(this.lastRow, h.lastRow, o.length);
            while (l > 0 && !o[l]) {
                l--
            }
            this.firstRow = h.firstRow;
            this.lastRow = h.lastRow;
            n.$cursorLayer.config = h;
            for (var k = l; k <= r; k++) {
                var q = o[k];
                if (!q || !q.el) {
                    continue
                }
                if (!q._inDocument) {
                    q._inDocument = true;
                    n.container.appendChild(q.el)
                }
                var p = n.$cursorLayer.getPixelPosition({
                    row: k,
                    column: 0
                }, true).top;
                if (!q.coverLine) {
                    p += h.lineHeight * this.session.getRowLineCount(q.row)
                }
                q.el.style.top = p - h.offset + "px";
                var j = q.coverGutter ? 0 : n.gutterWidth;
                if (!q.fixedWidth) {
                    j -= n.scrollLeft
                }
                q.el.style.left = j + "px";
                if (q.fixedWidth) {
                    q.el.style.right = n.scrollBar.getWidth() + "px"
                } else {
                    q.el.style.right = ""
                }
            }
        }
    }
    ).call(e.prototype);
    a.LineWidgets = e
});
define("ace/ext/error_marker", ["require", "exports", "module", "ace/line_widgets", "ace/lib/dom", "ace/range"], function (c, b, d) {
    var f = c("../line_widgets").LineWidgets;
    var g = c("../lib/dom");
    var e = c("../range").Range;
    function h(o, l, i) {
        var m = 0;
        var k = o.length - 1;
        while (m <= k) {
            var j = (m + k) >> 1;
            var n = i(l, o[j]);
            if (n > 0) {
                m = j + 1
            } else {
                if (n < 0) {
                    k = j - 1
                } else {
                    return j
                }
            }
        }
        return -(m + 1)
    }
    function a(o, p, l) {
        var n = o.getAnnotations().sort(e.comparePoints);
        if (!n.length) {
            return
        }
        var m = h(n, {
            row: p,
            column: -1
        }, e.comparePoints);
        if (m < 0) {
            m = -m - 1
        }
        if (m >= n.length) {
            m = l > 0 ? 0 : n.length - 1
        } else {
            if (m === 0 && l < 0) {
                m = n.length - 1
            }
        }
        var k = n[m];
        if (!k || !l) {
            return
        }
        if (k.row === p) {
            do {
                k = n[m += l]
            } while (k && k.row === p);
            if (!k) {
                return n.slice()
            }
        }
        var j = [];
        p = k.row;
        do {
            j[l < 0 ? "unshift" : "push"](k);
            k = n[m += l]
        } while (k && k.row == p);
        return j.length && j
    }
    b.showErrorMarker = function (p, k) {
        var q = p.session;
        if (!q.widgetManager) {
            q.widgetManager = new f(q);
            q.widgetManager.attach(p)
        }
        var r = p.getCursorPosition();
        var v = r.row;
        var m = q.lineWidgets && q.lineWidgets[v];
        if (m) {
            m.destroy()
        } else {
            v -= k
        }
        var o = a(q, v, k);
        var u;
        if (o) {
            var l = o[0];
            r.column = (l.pos && typeof l.column != "number" ? l.pos.sc : l.column) || 0;
            r.row = l.row;
            u = p.renderer.$gutterLayer.$annotations[r.row]
        } else {
            if (m) {
                return
            } else {
                u = {
                    text: ["Looks good!"],
                    className: "ace_ok"
                }
            }
        }
        p.session.unfold(r.row);
        p.selection.moveToPosition(r);
        var t = {
            row: r.row,
            fixedWidth: true,
            coverGutter: true,
            el: g.createElement("div")
        };
        var i = t.el.appendChild(g.createElement("div"));
        var s = t.el.appendChild(g.createElement("div"));
        s.className = "error_widget_arrow " + u.className;
        var j = p.renderer.$cursorLayer.getPixelPosition(r).left;
        s.style.left = j + p.renderer.gutterWidth - 5 + "px";
        t.el.className = "error_widget_wrapper";
        i.className = "error_widget " + u.className;
        i.innerHTML = u.text.join("<br>");
        i.appendChild(g.createElement("div"));
        var n = function (x, y, w) {
            if (y === 0 && (w === "esc" || w === "return")) {
                t.destroy();
                return {
                    command: "null"
                }
            }
        };
        t.destroy = function () {
            if (p.$mouseHandler.isMousePressed) {
                return
            }
            p.keyBinding.removeKeyboardHandler(n);
            q.widgetManager.removeLineWidget(t);
            p.off("changeSelection", t.destroy);
            p.off("changeSession", t.destroy);
            p.off("mouseup", t.destroy);
            p.off("change", t.destroy)
        }
            ;
        p.keyBinding.addKeyboardHandler(n);
        p.on("changeSelection", t.destroy);
        p.on("changeSession", t.destroy);
        p.on("mouseup", t.destroy);
        p.on("change", t.destroy);
        p.session.widgetManager.addLineWidget(t);
        t.el.onmousedown = p.focus.bind(p);
        p.renderer.scrollCursorIntoView(null, 0.5, {
            bottom: t.el.offsetHeight
        })
    }
        ;
    g.importCssString("    .error_widget_wrapper {        background: inherit;        color: inherit;        border:none    }    .error_widget {        border-top: solid 2px;        border-bottom: solid 2px;        margin: 5px 0;        padding: 10px 40px;        white-space: pre-wrap;    }    .error_widget.ace_error, .error_widget_arrow.ace_error{        border-color: #ff5a5a    }    .error_widget.ace_warning, .error_widget_arrow.ace_warning{        border-color: #F1D817    }    .error_widget.ace_info, .error_widget_arrow.ace_info{        border-color: #5a5a5a    }    .error_widget.ace_ok, .error_widget_arrow.ace_ok{        border-color: #5aaa5a    }    .error_widget_arrow {        position: absolute;        border: solid 5px;        border-top-color: transparent!important;        border-right-color: transparent!important;        border-left-color: transparent!important;        top: -5px;    }", "")
});
define("ace/ace", ["require", "exports", "module", "ace/lib/fixoldbrowsers", "ace/lib/dom", "ace/lib/event", "ace/editor", "ace/edit_session", "ace/undomanager", "ace/virtual_renderer", "ace/worker/worker_client", "ace/keyboard/hash_handler", "ace/placeholder", "ace/multi_select", "ace/mode/folding/fold_mode", "ace/theme/textmate", "ace/ext/error_marker", "ace/config"], function (e, h, d) {
    e("./lib/fixoldbrowsers");
    var g = e("./lib/dom");
    var b = e("./lib/event");
    var i = e("./editor").Editor;
    var a = e("./edit_session").EditSession;
    var c = e("./undomanager").UndoManager;
    var f = e("./virtual_renderer").VirtualRenderer;
    e("./worker/worker_client");
    e("./keyboard/hash_handler");
    e("./placeholder");
    e("./multi_select");
    e("./mode/folding/fold_mode");
    e("./theme/textmate");
    e("./ext/error_marker");
    h.config = e("./config");
    h.require = e;
    h.edit = function (m) {
        if (typeof (m) == "string") {
            var j = m;
            m = document.getElementById(j);
            if (!m) {
                throw new Error("ace.edit can't find div #" + j)
            }
        }
        if (m && m.env && m.env.editor instanceof i) {
            return m.env.editor
        }
        var n = "";
        if (m && /input|textarea/i.test(m.tagName)) {
            var p = m;
            n = p.value;
            m = g.createElement("pre");
            p.parentNode.replaceChild(m, p)
        } else {
            n = g.getInnerText(m);
            m.innerHTML = ""
        }
        var o = h.createEditSession(n);
        var l = new i(new f(m));
        l.setSession(o);
        var k = {
            document: o,
            editor: l,
            onResize: l.resize.bind(l, null)
        };
        if (p) {
            k.textarea = p
        }
        b.addListener(window, "resize", k.onResize);
        l.on("destroy", function () {
            b.removeListener(window, "resize", k.onResize);
            k.editor.container.env = null
        });
        l.container.env = l.env = k;
        return l
    }
        ;
    h.createEditSession = function (l, k) {
        var j = new a(l, k);
        j.setUndoManager(new c());
        return j
    }
        ;
    h.EditSession = a;
    h.UndoManager = c
});
(function () {
    window.require(["ace/ace"], function (b) {
        b && b.config.init(true);
        if (!window.ace) {
            window.ace = b
        }
        for (var c in b) {
            if (b.hasOwnProperty(c)) {
                window.ace[c] = b[c]
            }
        }
    })
}
)();
