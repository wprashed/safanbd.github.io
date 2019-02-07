// SmoothScroll for websites v1.2.1
// Licensed under the terms of the MIT license.

// People involved
//  - Balazs Galambosi (maintainer)
//  - Michael Herf     (Pulse Algorithm)

! function () {
    function e() {
        var e = !1;
        e && c("keydown", r), v.keyboardSupport && !e && u("keydown", r)
    }

    function t() {
        if (document.body) {
            var t = document.body,
                o = document.documentElement,
                n = window.innerHeight,
                r = t.scrollHeight;
            if (S = document.compatMode.indexOf("CSS") >= 0 ? o : t, w = t, e(), x = !0, top != self) y = !0;
            else if (r > n && (t.offsetHeight <= n || o.offsetHeight <= n)) {
                var a = !1,
                    i = function () {
                        a || o.scrollHeight == document.height || (a = !0, setTimeout(function () {
                            o.style.height = document.height + "px", a = !1
                        }, 500))
                    };
                if (o.style.height = "auto", setTimeout(i, 10), S.offsetHeight <= n) {
                    var l = document.createElement("div");
                    l.style.clear = "both", t.appendChild(l)
                }
            }
            v.fixedBackground || b || (t.style.backgroundAttachment = "scroll", o.style.backgroundAttachment = "scroll")
        }
    }

    function o(e, t, o, n) {
        if (n || (n = 1e3), d(t, o), 1 != v.accelerationMax) {
            var r = +new Date,
                a = r - C;
            if (a < v.accelerationDelta) {
                var i = (1 + 30 / a) / 2;
                i > 1 && (i = Math.min(i, v.accelerationMax), t *= i, o *= i)
            }
            C = +new Date
        }
        if (M.push({
                x: t,
                y: o,
                lastX: 0 > t ? .99 : -.99,
                lastY: 0 > o ? .99 : -.99,
                start: +new Date
            }), !T) {
            var l = e === document.body,
                u = function () {
                    for (var r = +new Date, a = 0, i = 0, c = 0; c < M.length; c++) {
                        var s = M[c],
                            d = r - s.start,
                            f = d >= v.animationTime,
                            h = f ? 1 : d / v.animationTime;
                        v.pulseAlgorithm && (h = p(h));
                        var m = s.x * h - s.lastX >> 0,
                            w = s.y * h - s.lastY >> 0;
                        a += m, i += w, s.lastX += m, s.lastY += w, f && (M.splice(c, 1), c--)
                    }
                    l ? window.scrollBy(a, i) : (a && (e.scrollLeft += a), i && (e.scrollTop += i)), t || o || (M = []), M.length ? E(u, e, n / v.frameRate + 1) : T = !1
                };
            E(u, e, 0), T = !0
        }
    }

    function n(e) {
        x || t();
        var n = e.target,
            r = l(n);
        if (!r || e.defaultPrevented || s(w, "embed") || s(n, "embed") && /\.pdf/i.test(n.src)) return !0;
        var a = e.wheelDeltaX || 0,
            i = e.wheelDeltaY || 0;
        return a || i || (i = e.wheelDelta || 0), !v.touchpadSupport && f(i) ? !0 : (Math.abs(a) > 1.2 && (a *= v.stepSize / 120), Math.abs(i) > 1.2 && (i *= v.stepSize / 120), o(r, -a, -i), void e.preventDefault())
    }

    function r(e) {
        var t = e.target,
            n = e.ctrlKey || e.altKey || e.metaKey || e.shiftKey && e.keyCode !== H.spacebar;
        if (/input|textarea|select|embed/i.test(t.nodeName) || t.isContentEditable || e.defaultPrevented || n) return !0;
        if (s(t, "button") && e.keyCode === H.spacebar) return !0;
        var r, a = 0,
            i = 0,
            u = l(w),
            c = u.clientHeight;
        switch (u == document.body && (c = window.innerHeight), e.keyCode) {
        case H.up:
            i = -v.arrowScroll;
            break;
        case H.down:
            i = v.arrowScroll;
            break;
        case H.spacebar:
            r = e.shiftKey ? 1 : -1, i = -r * c * .9;
            break;
        case H.pageup:
            i = .9 * -c;
            break;
        case H.pagedown:
            i = .9 * c;
            break;
        case H.home:
            i = -u.scrollTop;
            break;
        case H.end:
            var d = u.scrollHeight - u.scrollTop - c;
            i = d > 0 ? d + 10 : 0;
            break;
        case H.left:
            a = -v.arrowScroll;
            break;
        case H.right:
            a = v.arrowScroll;
            break;
        default:
            return !0
        }
        o(u, a, i), e.preventDefault()
    }

    function a(e) {
        w = e.target
    }

    function i(e, t) {
        for (var o = e.length; o--;) z[N(e[o])] = t;
        return t
    }

    function l(e) {
        var t = [],
            o = S.scrollHeight;
        do {
            var n = z[N(e)];
            if (n) return i(t, n);
            if (t.push(e), o === e.scrollHeight) {
                if (!y || S.clientHeight + 10 < o) return i(t, document.body)
            } else if (e.clientHeight + 10 < e.scrollHeight && (overflow = getComputedStyle(e, "").getPropertyValue("overflow-y"), "scroll" === overflow || "auto" === overflow)) return i(t, e)
        } while (e = e.parentNode)
    }

    function u(e, t, o) {
        window.addEventListener(e, t, o || !1)
    }

    function c(e, t, o) {
        window.removeEventListener(e, t, o || !1)
    }

    function s(e, t) {
        return (e.nodeName || "").toLowerCase() === t.toLowerCase()
    }

    function d(e, t) {
        e = e > 0 ? 1 : -1, t = t > 0 ? 1 : -1, (k.x !== e || k.y !== t) && (k.x = e, k.y = t, M = [], C = 0)
    }

    function f(e) {
        if (e) {
            e = Math.abs(e), D.push(e), D.shift(), clearTimeout(A);
            var t = D[0] == D[1] && D[1] == D[2],
                o = h(D[0], 120) && h(D[1], 120) && h(D[2], 120);
            return !(t || o)
        }
    }

    function h(e, t) {
        return Math.floor(e / t) == e / t
    }

    function m(e) {
        var t, o, n;
        return e *= v.pulseScale, 1 > e ? t = e - (1 - Math.exp(-e)) : (o = Math.exp(-1), e -= 1, n = 1 - Math.exp(-e), t = o + n * (1 - o)), t * v.pulseNormalize
    }

    function p(e) {
        return e >= 1 ? 1 : 0 >= e ? 0 : (1 == v.pulseNormalize && (v.pulseNormalize /= m(1)), m(e))
    }
    var w, g = {
            frameRate: 150,
            animationTime: 800,
            stepSize: 120,
            pulseAlgorithm: !0,
            pulseScale: 8,
            pulseNormalize: 1,
            accelerationDelta: 20,
            accelerationMax: 1,
            keyboardSupport: !0,
            arrowScroll: 50,
            touchpadSupport: !0,
            fixedBackground: !0,
            excluded: ""
        },
        v = g,
        b = !1,
        y = !1,
        k = {
            x: 0,
            y: 0
        },
        x = !1,
        S = document.documentElement,
        D = [120, 120, 120],
        H = {
            left: 37,
            up: 38,
            right: 39,
            down: 40,
            spacebar: 32,
            pageup: 33,
            pagedown: 34,
            end: 35,
            home: 36
        },
        v = g,
        M = [],
        T = !1,
        C = +new Date,
        z = {};
    setInterval(function () {
        z = {}
    }, 1e4);
    var A, N = function () {
            var e = 0;
            return function (t) {
                return t.uniqueID || (t.uniqueID = e++)
            }
        }(),
        E = function () {
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || function (e, t, o) {
                window.setTimeout(e, o || 1e3 / 60)
            }
        }(),
        K = /chrome/i.test(window.navigator.userAgent),
        L = "onmousewheel" in document;
    L && K && (u("mousedown", a), u("mousewheel", n), u("load", t))
}();

/** smooth-scroll v5.3.3, by Chris Ferdinandi | http://github.com/cferdinandi/smooth-scroll | Licensed under MIT: http://gomakethings.com/mit/ */
!function(e,t){"function"==typeof define&&define.amd?define("smoothScroll",t(e)):"object"==typeof exports?module.exports=t(e):e.smoothScroll=t(e)}(window||this,function(e){"use strict";var t,n,o,r={},a=!!document.querySelector&&!!e.addEventListener,c={speed:500,easing:"easeInOutCubic",offset:0,updateURL:!0,callbackBefore:function(){},callbackAfter:function(){}},u=function(e,t,n){if("[object Object]"===Object.prototype.toString.call(e))for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.call(n,e[o],o,e);else for(var r=0,a=e.length;a>r;r++)t.call(n,e[r],r,e)},i=function(e,t){var n={};return u(e,function(t,o){n[o]=e[o]}),u(t,function(e,o){n[o]=t[o]}),n},l=function(e,t){for(var n=t.charAt(0);e&&e!==document;e=e.parentNode)if("."===n){if(e.classList.contains(t.substr(1)))return e}else if("#"===n){if(e.id===t.substr(1))return e}else if("["===n&&e.hasAttribute(t.substr(1,t.length-2)))return e;return!1},s=function(e){return Math.max(e.scrollHeight,e.offsetHeight,e.clientHeight)},f=function(e){for(var t,n=String(e),o=n.length,r=-1,a="",c=n.charCodeAt(0);++r<o;){if(t=n.charCodeAt(r),0===t)throw new InvalidCharacterError("Invalid character: the input contains U+0000.");a+=t>=1&&31>=t||127==t||0===r&&t>=48&&57>=t||1===r&&t>=48&&57>=t&&45===c?"\\"+t.toString(16)+" ":t>=128||45===t||95===t||t>=48&&57>=t||t>=65&&90>=t||t>=97&&122>=t?n.charAt(r):"\\"+n.charAt(r)}return a},d=function(e,t){var n;return"easeInQuad"===e&&(n=t*t),"easeOutQuad"===e&&(n=t*(2-t)),"easeInOutQuad"===e&&(n=.5>t?2*t*t:-1+(4-2*t)*t),"easeInCubic"===e&&(n=t*t*t),"easeOutCubic"===e&&(n=--t*t*t+1),"easeInOutCubic"===e&&(n=.5>t?4*t*t*t:(t-1)*(2*t-2)*(2*t-2)+1),"easeInQuart"===e&&(n=t*t*t*t),"easeOutQuart"===e&&(n=1- --t*t*t*t),"easeInOutQuart"===e&&(n=.5>t?8*t*t*t*t:1-8*--t*t*t*t),"easeInQuint"===e&&(n=t*t*t*t*t),"easeOutQuint"===e&&(n=1+--t*t*t*t*t),"easeInOutQuint"===e&&(n=.5>t?16*t*t*t*t*t:1+16*--t*t*t*t*t),n||t},h=function(e,t,n){var o=0;if(e.offsetParent)do o+=e.offsetTop,e=e.offsetParent;while(e);return o=o-t-n,o>=0?o:0},m=function(){return Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight,document.body.clientHeight,document.documentElement.clientHeight)},p=function(e){return e&&"object"==typeof JSON&&"function"==typeof JSON.parse?JSON.parse(e):{}},v=function(t,n){history.pushState&&(n||"true"===n)&&history.pushState(null,null,[e.location.protocol,"//",e.location.host,e.location.pathname,e.location.search,t].join(""))};r.animateScroll=function(t,n,r){var a=i(a||c,r||{}),u=p(t?t.getAttribute("data-options"):null);a=i(a,u),n="#"+f(n.substr(1));var l="#"===n?document.documentElement:document.querySelector(n),g=e.pageYOffset;o||(o=document.querySelector("[data-scroll-header]"));var b,O,y,S=null===o?0:s(o)+o.offsetTop,I=h(l,S,parseInt(a.offset,10)),H=I-g,E=m(),A=0;v(n,a.updateURL);var L=function(o,r,c){var u=e.pageYOffset;(o==r||u==r||e.innerHeight+u>=E)&&(clearInterval(c),l.focus(),a.callbackAfter(t,n))},Q=function(){A+=16,O=A/parseInt(a.speed,10),O=O>1?1:O,y=g+H*d(a.easing,O),e.scrollTo(0,Math.floor(y)),L(y,I,b)},C=function(){a.callbackBefore(t,n),b=setInterval(Q,16)};0===e.pageYOffset&&e.scrollTo(0,0),C()};var g=function(e){var n=l(e.target,"[data-scroll]");n&&"a"===n.tagName.toLowerCase()&&(e.preventDefault(),r.animateScroll(n,n.hash,t))},b=function(){n||(n=setTimeout(function(){n=null,headerHeight=null===o?0:s(o)+o.offsetTop},66))};return r.destroy=function(){t&&(document.removeEventListener("click",g,!1),e.removeEventListener("resize",b,!1),t=null,n=null,o=null)},r.init=function(n){a&&(r.destroy(),t=i(c,n||{}),o=document.querySelector("[data-scroll-header]"),document.addEventListener("click",g,!1),o&&e.addEventListener("resize",b,!1))},r});