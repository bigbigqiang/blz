(function () {
    var a = function (d, c, b) {
        d = jsPlumbUtil.isArray(d) ? d : [d.x, d.y];
        c = jsPlumbUtil.isArray(c) ? c : [c.x, c.y];
        return b(d, c)
    };
    jsPlumbUtil = {
        isArray: function (b) {
            return Object.prototype.toString.call(b) === "[object Array]"
        },
        isNumber: function (b) {
            return Object.prototype.toString.call(b) === "[object Number]"
        },
        isString: function (b) {
            return typeof b === "string"
        },
        isBoolean: function (b) {
            return typeof b === "boolean"
        },
        isNull: function (b) {
            return b == null
        },
        isObject: function (b) {
            return b == null ? false : Object.prototype.toString.call(b) === "[object Object]"
        },
        isDate: function (b) {
            return Object.prototype.toString.call(b) === "[object Date]"
        },
        isFunction: function (b) {
            return Object.prototype.toString.call(b) === "[object Function]"
        },
        clone: function (d) {
            if (this.isString(d)) {
                return "" + d
            } else {
                if (this.isBoolean(d)) {
                    return !!d
                } else {
                    if (this.isDate(d)) {
                        return new Date(d.getTime())
                    } else {
                        if (this.isFunction(d)) {
                            return d
                        } else {
                            if (this.isArray(d)) {
                                var c = [];
                                for (var e = 0; e < d.length; e++) {
                                    c.push(this.clone(d[e]))
                                }
                                return c
                            } else {
                                if (this.isObject(d)) {
                                    var c = {};
                                    for (var e in d) {
                                        c[e] = this.clone(d[e])
                                    }
                                    return c
                                } else {
                                    return d
                                }
                            }
                        }
                    }
                }
            }
        },
        merge: function (e, d) {
            var k = this.clone(e);
            for (var h in d) {
                if (k[h] == null || this.isString(d[h]) || this.isBoolean(d[h])) {
                    k[h] = d[h]
                } else {
                    if (this.isArray(d[h])) {
                        var f = [];
                        if (this.isArray(k[h])) {
                            f.push.apply(f, k[h])
                        }
                        f.push.apply(f, d[h]);
                        k[h] = f
                    } else {
                        if (this.isObject(d[h])) {
                            if (!this.isObject(k[h])) {
                                k[h] = {}
                            }
                            for (var g in d[h]) {
                                k[h][g] = d[h][g]
                            }
                        }
                    }
                }
            }
            return k
        },
        copyValues: function (c, e, d) {
            for (var b = 0; b < c.length; b++) {
                d[c[b]] = e[c[b]]
            }
        },
        functionChain: function (d, f, c) {
            for (var b = 0; b < c.length; b++) {
                var e = c[b][0][c[b][1]].apply(c[b][0], c[b][2]);
                if (e === f) {
                    return e
                }
            }
            return d
        },
        populate: function (d, c) {
            var b = function (k) {
                var g = k.match(/(\${.*?})/g);
                if (g != null) {
                    for (var f = 0; f < g.length; f++) {
                        var h = c[g[f].substring(2, g[f].length - 1)];
                        if (h != null) {
                            k = k.replace(g[f], h)
                        }
                    }
                }
                return k
            }, e = function (h) {
                if (h != null) {
                    if (jsPlumbUtil.isString(h)) {
                        return b(h)
                    } else {
                        if (jsPlumbUtil.isArray(h)) {
                            var g = [];
                            for (var f = 0; f < h.length; f++) {
                                g.push(e(h[f]))
                            }
                            return g
                        } else {
                            if (jsPlumbUtil.isObject(h)) {
                                var g = {};
                                for (var f in h) {
                                    g[f] = e(h[f])
                                }
                                return g
                            } else {
                                return h
                            }
                        }
                    }
                }
            };
            return e(d)
        },
        convertStyle: function (c, b) {
            if ("transparent" === c) {
                return c
            }
            var h = c, g = function (i) {
                return i.length == 1 ? "0" + i : i
            }, d = function (i) {
                return g(Number(i).toString(16))
            }, e = /(rgb[a]?\()(.*)(\))/;
            if (c.match(e)) {
                var f = c.match(e)[2].split(",");
                h = "#" + d(f[0]) + d(f[1]) + d(f[2]);
                if (!b && f.length == 4) {
                    h = h + d(f[3])
                }
            }
            return h
        },
        gradient: function (c, b) {
            return a(c, b, function (e, d) {
                if (d[0] == e[0]) {
                    return d[1] > e[1] ? Infinity : -Infinity
                } else {
                    if (d[1] == e[1]) {
                        return d[0] > e[0] ? 0 : -0
                    } else {
                        return (d[1] - e[1]) / (d[0] - e[0])
                    }
                }
            })
        },
        normal: function (c, b) {
            return -1 / this.gradient(c, b)
        },
        lineLength: function (c, b) {
            return a(c, b, function (e, d) {
                return Math.sqrt(Math.pow(d[1] - e[1], 2) + Math.pow(d[0] - e[0], 2))
            })
        },
        segment: function (c, b) {
            return a(c, b, function (e, d) {
                if (d[0] > e[0]) {
                    return (d[1] > e[1]) ? 2 : 1
                } else {
                    if (d[0] == e[0]) {
                        return d[1] > e[1] ? 2 : 1
                    } else {
                        return (d[1] > e[1]) ? 3 : 4
                    }
                }
            })
        },
        theta: function (c, b) {
            return a(c, b, function (f, e) {
                var d = jsPlumbUtil.gradient(f, e), g = Math.atan(d), h = jsPlumbUtil.segment(f, e);
                if ((h == 4 || h == 3)) {
                    g += Math.PI
                }
                if (g < 0) {
                    g += (2 * Math.PI)
                }
                return g
            })
        },
        intersects: function (g, f) {
            var d = g.x, b = g.x + g.w, l = g.y, i = g.y + g.h, e = f.x, c = f.x + f.w, k = f.y, h = f.y + f.h;
            return ((d <= e && e <= b) && (l <= k && k <= i)) || ((d <= c && c <= b) && (l <= k && k <= i)) || ((d <= e && e <= b) && (l <= h && h <= i)) || ((d <= c && e <= b) && (l <= h && h <= i)) || ((e <= d && d <= c) && (k <= l && l <= h)) || ((e <= b && b <= c) && (k <= l && l <= h)) || ((e <= d && d <= c) && (k <= i && i <= h)) || ((e <= b && d <= c) && (k <= i && i <= h))
        },
        segmentMultipliers: [null, [1, -1], [1, 1], [-1, 1], [-1, -1]],
        inverseSegmentMultipliers: [null, [-1, -1], [-1, 1], [1, 1], [1, -1]],
        pointOnLine: function (b, f, c) {
            var e = jsPlumbUtil.gradient(b, f), k = jsPlumbUtil.segment(b, f), i = c > 0 ? jsPlumbUtil.segmentMultipliers[k] : jsPlumbUtil.inverseSegmentMultipliers[k], d = Math.atan(e), g = Math.abs(c * Math.sin(d)) * i[1], h = Math.abs(c * Math.cos(d)) * i[0];
            return {x: b.x + h, y: b.y + g}
        },
        perpendicularLineTo: function (d, e, f) {
            var c = jsPlumbUtil.gradient(d, e), g = Math.atan(-1 / c), h = f / 2 * Math.sin(g), b = f / 2 * Math.cos(g);
            return [{x: e.x + b, y: e.y + h}, {x: e.x - b, y: e.y - h}]
        },
        findWithFunction: function (b, d) {
            if (b) {
                for (var c = 0; c < b.length; c++) {
                    if (d(b[c])) {
                        return c
                    }
                }
            }
            return -1
        },
        clampToGrid: function (b, g, d, f, e) {
            var c = function (m, h) {
                var l = m % h, i = Math.floor(m / h), k = l >= (h / 2) ? 1 : 0;
                return (i + k) * h
            };
            return [f || d == null ? b : c(b, d[0]), e || d == null ? g : c(g, d[1])]
        },
        indexOf: function (b, c) {
            return jsPlumbUtil.findWithFunction(b, function (d) {
                return d == c
            })
        },
        removeWithFunction: function (c, d) {
            var b = jsPlumbUtil.findWithFunction(c, d);
            if (b > -1) {
                c.splice(b, 1)
            }
            return b != -1
        },
        remove: function (c, d) {
            var b = jsPlumbUtil.indexOf(c, d);
            if (b > -1) {
                c.splice(b, 1)
            }
            return b != -1
        },
        addWithFunction: function (d, c, b) {
            if (jsPlumbUtil.findWithFunction(d, b) == -1) {
                d.push(c)
            }
        },
        addToList: function (e, c, d) {
            var b = e[c];
            if (b == null) {
                b = [], e[c] = b
            }
            b.push(d);
            return b
        },
        EventGenerator: function () {
            var d = {}, c = this, e = false;
            var b = ["ready"];
            this.bind = function (f, g) {
                jsPlumbUtil.addToList(d, f, g);
                return c
            };
            this.fire = function (h, k, f) {
                if (!e && d[h]) {
                    for (var g = 0; g < d[h].length; g++) {
                        if (jsPlumbUtil.findWithFunction(b, function (i) {
                                return i === h
                            }) != -1) {
                            d[h][g](k, f)
                        } else {
                            try {
                                d[h][g](k, f)
                            } catch (l) {
                                jsPlumbUtil.log("jsPlumb: fire failed for event " + h + " : " + l)
                            }
                        }
                    }
                }
                return c
            };
            this.unbind = function (f) {
                if (f) {
                    delete d[f]
                } else {
                    d = {}
                }
                return c
            };
            this.getListener = function (f) {
                return d[f]
            };
            this.setSuspendEvents = function (f) {
                e = f
            };
            this.isSuspendEvents = function () {
                return e
            }
        },
        logEnabled: true,
        log: function () {
            if (jsPlumbUtil.logEnabled && typeof console != "undefined") {
                try {
                    var c = arguments[arguments.length - 1];
                    /*console.log(c)*/
                } catch (b) {
                }
            }
        },
        group: function (b) {
            if (jsPlumbUtil.logEnabled && typeof console != "undefined") {
                console.group(b)
            }
        },
        groupEnd: function (b) {
            if (jsPlumbUtil.logEnabled && typeof console != "undefined") {
                console.groupEnd(b)
            }
        },
        time: function (b) {
            if (jsPlumbUtil.logEnabled && typeof console != "undefined") {
                console.time(b)
            }
        },
        timeEnd: function (b) {
            if (jsPlumbUtil.logEnabled && typeof console != "undefined") {
                console.timeEnd(b)
            }
        },
        removeElement: function (b) {
            if (b != null && b.parentNode != null) {
                b.parentNode.removeChild(b)
            }
        },
        removeElements: function (c) {
            for (var b = 0; b < c.length; b++) {
                jsPlumbUtil.removeElement(c[b])
            }
        }
    }
})();
(function () {
    var b = !!document.createElement("canvas").getContext, a = !!window.SVGAngle || document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1"), d = function () {
        if (d.vml == undefined) {
            var f = document.body.appendChild(document.createElement("div"));
            f.innerHTML = '<v:shape id="vml_flag1" adj="1" />';
            var e = f.firstChild;
            e.style.behavior = "url(#default#VML)";
            d.vml = e ? typeof e.adj == "object" : true;
            f.parentNode.removeChild(f)
        }
        return d.vml
    };
    var c = function (k) {
        var i = {}, h = [], f = {}, e = {}, g = {};
        this.register = function (o) {
            var n = jsPlumb.CurrentLibrary;
            o = n.getElementObject(o);
            var q = k.getId(o), m = n.getDOMElement(o), l = n.getOffset(o);
            if (!i[q]) {
                i[q] = o;
                h.push(o);
                f[q] = {}
            }
            var p = function (v, r) {
                if (v) {
                    for (var s = 0; s < v.childNodes.length; s++) {
                        if (v.childNodes[s].nodeType != 3 && v.childNodes[s].nodeType != 8) {
                            var u = n.getElementObject(v.childNodes[s]), w = k.getId(u, null, true);
                            if (w && e[w] && e[w] > 0) {
                                var t = n.getOffset(u);
                                f[q][w] = {id: w, offset: {left: t.left - l.left, top: t.top - l.top}};
                                g[w] = q
                            }
                            p(v.childNodes[s])
                        }
                    }
                }
            };
            p(m)
        };
        this.updateOffsets = function (p) {
            var s = jsPlumb.CurrentLibrary, n = s.getElementObject(p), m = k.getId(n), o = f[m], l = s.getOffset(n);
            if (o) {
                for (var r in o) {
                    var t = s.getElementObject(r), q = s.getOffset(t);
                    f[m][r] = {id: r, offset: {left: q.left - l.left, top: q.top - l.top}};
                    g[r] = m
                }
            }
        };
        this.endpointAdded = function (n) {
            var s = jsPlumb.CurrentLibrary, v = document.body, l = k.getId(n), u = s.getDOMElement(n), m = u.parentNode, q = m == v;
            e[l] = e[l] ? e[l] + 1 : 1;
            while (m != null && m != v) {
                var r = k.getId(m, null, true);
                if (r && i[r]) {
                    var x = -1, t = s.getElementObject(m), o = s.getOffset(t);
                    if (f[r][l] == null) {
                        var w = jsPlumb.CurrentLibrary.getOffset(n);
                        f[r][l] = {id: l, offset: {left: w.left - o.left, top: w.top - o.top}};
                        g[l] = r
                    }
                    break
                }
                m = m.parentNode
            }
        };
        this.endpointDeleted = function (m) {
            if (e[m.elementId]) {
                e[m.elementId]--;
                if (e[m.elementId] <= 0) {
                    for (var l in f) {
                        if (f[l]) {
                            delete f[l][m.elementId];
                            delete g[m.elementId]
                        }
                    }
                }
            }
        };
        this.changeId = function (m, l) {
            f[l] = f[m];
            f[m] = {};
            g[l] = g[m];
            g[m] = null
        };
        this.getElementsForDraggable = function (l) {
            return f[l]
        };
        this.elementRemoved = function (l) {
            var m = g[l];
            if (m) {
                delete f[m][l];
                delete g[l]
            }
        };
        this.reset = function () {
            i = {};
            h = [];
            f = {};
            e = {}
        }
    };
    if (!window.console) {
        window.console = {
            time: function () {
            }, timeEnd: function () {
            }, group: function () {
            }, groupEnd: function () {
            }, log: function () {
            }
        }
    }
    window.jsPlumbAdapter = {
        headless: false, appendToRoot: function (e) {
            document.body.appendChild(e)
        }, getRenderModes: function () {
            return ["canvas", "svg", "vml"]
        }, isRenderModeAvailable: function (e) {
            return {canvas: b, svg: a, vml: d()}[e]
        }, getDragManager: function (e) {
            return new c(e)
        }, setRenderMode: function (i) {
            var h;
            if (i) {
                i = i.toLowerCase();
                var f = this.isRenderModeAvailable("canvas"), e = this.isRenderModeAvailable("svg"), g = this.isRenderModeAvailable("vml");
                if (i === "svg") {
                    if (e) {
                        h = "svg"
                    } else {
                        if (f) {
                            h = "canvas"
                        } else {
                            if (g) {
                                h = "vml"
                            }
                        }
                    }
                } else {
                    if (i === "canvas" && f) {
                        h = "canvas"
                    } else {
                        if (g) {
                            h = "vml"
                        }
                    }
                }
            }
            return h
        }
    }
})();
(function () {
    var g = jsPlumbUtil.findWithFunction, D = jsPlumbUtil.indexOf, y = jsPlumbUtil.removeWithFunction, k = jsPlumbUtil.remove, q = jsPlumbUtil.addWithFunction, i = jsPlumbUtil.addToList, l = jsPlumbUtil.isArray, x = jsPlumbUtil.isString, t = jsPlumbUtil.isObject;
    var A = function (E, F) {
        return n.CurrentLibrary.getAttribute(e(E), F)
    }, c = function (F, G, E) {
        n.CurrentLibrary.setAttribute(e(F), G, E)
    }, w = function (F, E) {
        n.CurrentLibrary.addClass(e(F), E)
    }, h = function (F, E) {
        return n.CurrentLibrary.hasClass(e(F), E)
    }, m = function (F, E) {
        n.CurrentLibrary.removeClass(e(F), E)
    }, e = function (E) {
        return n.CurrentLibrary.getElementObject(E)
    }, r = function (F, E) {
        var H = n.CurrentLibrary.getOffset(e(F));
        if (E != null) {
            var G = E.getZoom();
            return {left: H.left / G, top: H.top / G}
        } else {
            return H
        }
    }, a = function (E) {
        return n.CurrentLibrary.getSize(e(E))
    }, o = jsPlumbUtil.log, C = jsPlumbUtil.group, f = jsPlumbUtil.groupEnd, B = jsPlumbUtil.time, s = jsPlumbUtil.timeEnd, p = function () {
        return "" + (new Date()).getTime()
    }, z = window.jsPlumbUIComponent = function (X) {
        var R = this, Y = arguments, P = false, J = X.parameters || {}, H = R.idPrefix, T = H + (new Date()).getTime(), S = null, Z = null;
        R._jsPlumb = X._jsPlumb;
        R.getId = function () {
            return T
        };
        R.hoverClass = X.hoverClass || R._jsPlumb.Defaults.HoverClass || n.Defaults.HoverClass;
        jsPlumbUtil.EventGenerator.apply(this);
        if (X.events) {
            for (var U in X.events) {
                R.bind(U, X.events[U])
            }
        }
        this.clone = function () {
            var aa = new Object();
            R.constructor.apply(aa, Y);
            return aa
        };
        this.getParameter = function (aa) {
            return J[aa]
        }, this.getParameters = function () {
            return J
        }, this.setParameter = function (aa, ab) {
            J[aa] = ab
        }, this.setParameters = function (aa) {
            J = aa
        }, this.overlayPlacements = [];
        var I = X.beforeDetach;
        this.isDetachAllowed = function (aa) {
            var ab = true;
            if (I) {
                try {
                    ab = I(aa)
                } catch (ac) {
                    o("jsPlumb: beforeDetach callback failed", ac)
                }
            }
            return ab
        };
        var L = X.beforeDrop;
        this.isDropAllowed = function (af, ac, ad, aa, ab) {
            var ae = R._jsPlumb.checkCondition("beforeDrop", {
                sourceId: af,
                targetId: ac,
                scope: ad,
                connection: aa,
                dropEndpoint: ab
            });
            if (L) {
                try {
                    ae = L({sourceId: af, targetId: ac, scope: ad, connection: aa, dropEndpoint: ab})
                } catch (ag) {
                    o("jsPlumb: beforeDrop callback failed", ag)
                }
            }
            return ae
        };
        var V = function () {
            if (S && Z) {
                var aa = {};
                n.extend(aa, S);
                n.extend(aa, Z);
                delete R.hoverPaintStyle;
                if (aa.gradient && S.fillStyle) {
                    delete aa.gradient
                }
                Z = aa
            }
        };
        this.setPaintStyle = function (aa, ab) {
            S = aa;
            R.paintStyleInUse = S;
            V();
            if (!ab) {
                R.repaint()
            }
        };
        this.getPaintStyle = function () {
            return S
        };
        this.setHoverPaintStyle = function (aa, ab) {
            Z = aa;
            V();
            if (!ab) {
                R.repaint()
            }
        };
        this.getHoverPaintStyle = function () {
            return Z
        };
        this.setHover = function (aa, ac, ab) {
            if (!R._jsPlumb.currentlyDragging && !R._jsPlumb.isHoverSuspended()) {
                P = aa;
                if (R.canvas != null) {
                    if (R.hoverClass != null) {
                        if (aa) {
                            G.addClass(R.canvas, R.hoverClass)
                        } else {
                            G.removeClass(R.canvas, R.hoverClass)
                        }
                    }
                    if (aa) {
                        G.addClass(R.canvas, R._jsPlumb.hoverClass)
                    } else {
                        G.removeClass(R.canvas, R._jsPlumb.hoverClass)
                    }
                }
                if (Z != null) {
                    R.paintStyleInUse = aa ? Z : S;
                    if (!R._jsPlumb.isSuspendDrawing()) {
                        ab = ab || p();
                        R.repaint({timestamp: ab, recalc: false})
                    }
                }
                if (R.getAttachedElements && !ac) {
                    W(aa, p(), R)
                }
            }
        };
        this.isHover = function () {
            return P
        };
        this.bindListeners = function (ac, aa, ab) {
            ac.bind("click", function (ad, ae) {
                aa.fire("click", aa, ae)
            });
            ac.bind("dblclick", function (ad, ae) {
                aa.fire("dblclick", aa, ae)
            });
            ac.bind("contextmenu", function (ad, ae) {
                aa.fire("contextmenu", aa, ae)
            });
            ac.bind("mouseenter", function (ad, ae) {
                if (!aa.isHover()) {
                    ab(true);
                    aa.fire("mouseenter", aa, ae)
                }
            });
            ac.bind("mouseexit", function (ad, ae) {
                if (aa.isHover()) {
                    ab(false);
                    aa.fire("mouseexit", aa, ae)
                }
            });
            ac.bind("mousedown", function (ad, ae) {
                aa.fire("mousedown", aa, ae)
            });
            ac.bind("mouseup", function (ad, ae) {
                aa.fire("mouseup", aa, ae)
            })
        };
        var G = n.CurrentLibrary, F = ["click", "dblclick", "mouseenter", "mouseout", "mousemove", "mousedown", "mouseup", "contextmenu"], Q = {mouseout: "mouseexit"}, K = function (ac, ad, ab) {
            var aa = Q[ab] || ab;
            G.bind(ac, ab, function (ae) {
                ad.fire(aa, ad, ae)
            })
        }, O = function (ac, ab) {
            var aa = Q[ab] || ab;
            G.unbind(ac, ab)
        };
        this.attachListeners = function (ac, ad) {
            for (var ab = 0, aa = F.length; ab < aa; ab++) {
                K(ac, ad, F[ab])
            }
        };
        var W = function (af, ae, ab) {
            var ad = R.getAttachedElements();
            if (ad) {
                for (var ac = 0, aa = ad.length; ac < aa; ac++) {
                    if (!ab || ab != ad[ac]) {
                        ad[ac].setHover(af, true, ae)
                    }
                }
            }
        };
        this.reattachListenersForElement = function (ac) {
            if (arguments.length > 1) {
                for (var ab = 0, aa = F.length; ab < aa; ab++) {
                    O(ac, F[ab])
                }
                for (var ab = 1, aa = arguments.length; ab < aa; ab++) {
                    R.attachListeners(ac, arguments[ab])
                }
            }
        };
        var E = [], M = function (aa) {
            return aa == null ? null : aa.split(" ")
        }, N = function (ae, ac) {
            if (R.getDefaultType) {
                var af = R.getTypeDescriptor();
                var ad = jsPlumbUtil.merge({}, R.getDefaultType());
                for (var ab = 0, aa = E.length; ab < aa; ab++) {
                    ad = jsPlumbUtil.merge(ad, R._jsPlumb.getType(E[ab], af))
                }
                if (ae) {
                    ad = jsPlumbUtil.populate(ad, ae)
                }
                R.applyType(ad, ac);
                if (!ac) {
                    R.repaint()
                }
            }
        };
        R.setType = function (aa, ac, ab) {
            E = M(aa) || [];
            N(ac, ab)
        };
        R.getType = function () {
            return E
        };
        R.reapplyTypes = function (ab, aa) {
            N(ab, aa)
        };
        R.hasType = function (aa) {
            return jsPlumbUtil.indexOf(E, aa) != -1
        };
        R.addType = function (ad, ag, ae) {
            var ac = M(ad), af = false;
            if (ac != null) {
                for (var ab = 0, aa = ac.length; ab < aa; ab++) {
                    if (!R.hasType(ac[ab])) {
                        E.push(ac[ab]);
                        af = true
                    }
                }
                if (af) {
                    N(ag, ae)
                }
            }
        };
        R.removeType = function (ae, af) {
            var ac = M(ae), ag = false, ad = function (ai) {
                var ah = jsPlumbUtil.indexOf(E, ai);
                if (ah != -1) {
                    E.splice(ah, 1);
                    return true
                }
                return false
            };
            if (ac != null) {
                for (var ab = 0, aa = ac.length; ab < aa; ab++) {
                    ag = ad(ac[ab]) || ag
                }
                if (ag) {
                    N(null, af)
                }
            }
        };
        R.toggleType = function (ae, ag, af) {
            var ad = M(ae);
            if (ad != null) {
                for (var ac = 0, ab = ad.length; ac < ab; ac++) {
                    var aa = jsPlumbUtil.indexOf(E, ad[ac]);
                    if (aa != -1) {
                        E.splice(aa, 1)
                    } else {
                        E.push(ad[ac])
                    }
                }
                N(ag, af)
            }
        };
        this.applyType = function (ab, ac) {
            R.setPaintStyle(ab.paintStyle, ac);
            R.setHoverPaintStyle(ab.hoverPaintStyle, ac);
            if (ab.parameters) {
                for (var aa in ab.parameters) {
                    R.setParameter(aa, ab.parameters[aa])
                }
            }
        };
        this.addClass = function (aa) {
            if (R.canvas != null) {
                w(R.canvas, aa)
            }
        };
        this.removeClass = function (aa) {
            if (R.canvas != null) {
                m(R.canvas, aa)
            }
        }
    }, v = window.overlayCapableJsPlumbUIComponent = function (J) {
        z.apply(this, arguments);
        var R = this;
        this.overlays = [];
        var H = function (V) {
            var T = null;
            if (l(V)) {
                var S = V[0], U = n.extend({component: R, _jsPlumb: R._jsPlumb}, V[1]);
                if (V.length == 3) {
                    n.extend(U, V[2])
                }
                T = new n.Overlays[R._jsPlumb.getRenderMode()][S](U)
            } else {
                if (V.constructor == String) {
                    T = new n.Overlays[R._jsPlumb.getRenderMode()][V]({component: R, _jsPlumb: R._jsPlumb})
                } else {
                    T = V
                }
            }
            R.overlays.push(T)
        }, I = function (X) {
            var S = R.defaultOverlayKeys || [], W = X.overlays, T = function (Y) {
                return R._jsPlumb.Defaults[Y] || n.Defaults[Y] || []
            };
            if (!W) {
                W = []
            }
            for (var V = 0, U = S.length; V < U; V++) {
                W.unshift.apply(W, T(S[V]))
            }
            return W
        };
        var F = I(J);
        if (F) {
            for (var M = 0, K = F.length; M < K; M++) {
                H(F[M])
            }
        }
        var E = function (V) {
            var S = -1;
            for (var U = 0, T = R.overlays.length; U < T; U++) {
                if (V === R.overlays[U].id) {
                    S = U;
                    break
                }
            }
            return S
        };
        this.addOverlay = function (S, T) {
            H(S);
            if (!T) {
                R.repaint()
            }
        };
        this.getOverlay = function (T) {
            var S = E(T);
            return S >= 0 ? R.overlays[S] : null
        };
        this.getOverlays = function () {
            return R.overlays
        };
        this.hideOverlay = function (T) {
            var S = R.getOverlay(T);
            if (S) {
                S.hide()
            }
        };
        this.hideOverlays = function () {
            for (var T = 0, S = R.overlays.length; T < S; T++) {
                R.overlays[T].hide()
            }
        };
        this.showOverlay = function (T) {
            var S = R.getOverlay(T);
            if (S) {
                S.show()
            }
        };
        this.showOverlays = function () {
            for (var T = 0, S = R.overlays.length; T < S; T++) {
                R.overlays[T].show()
            }
        };
        this.removeAllOverlays = function () {
            for (var T = 0, S = R.overlays.length; T < S; T++) {
                if (R.overlays[T].cleanup) {
                    R.overlays[T].cleanup()
                }
            }
            R.overlays.splice(0, R.overlays.length);
            R.repaint()
        };
        this.removeOverlay = function (T) {
            var S = E(T);
            if (S != -1) {
                var U = R.overlays[S];
                if (U.cleanup) {
                    U.cleanup()
                }
                R.overlays.splice(S, 1)
            }
        };
        this.removeOverlays = function () {
            for (var T = 0, S = arguments.length; T < S; T++) {
                R.removeOverlay(arguments[T])
            }
        };
        var G = "__label", Q = function (U) {
            var S = {
                cssClass: U.cssClass,
                labelStyle: this.labelStyle,
                id: G,
                component: R,
                _jsPlumb: R._jsPlumb
            }, T = n.extend(S, U);
            return new n.Overlays[R._jsPlumb.getRenderMode()].Label(T)
        };
        if (J.label) {
            var N = J.labelLocation || R.defaultLabelLocation || 0.5, O = J.labelStyle || R._jsPlumb.Defaults.LabelStyle || n.Defaults.LabelStyle;
            this.overlays.push(Q({label: J.label, location: N, labelStyle: O}))
        }
        this.setLabel = function (S) {
            var T = R.getOverlay(G);
            if (!T) {
                var U = S.constructor == String || S.constructor == Function ? {label: S} : S;
                T = Q(U);
                this.overlays.push(T)
            } else {
                if (S.constructor == String || S.constructor == Function) {
                    T.setLabel(S)
                } else {
                    if (S.label) {
                        T.setLabel(S.label)
                    }
                    if (S.location) {
                        T.setLocation(S.location)
                    }
                }
            }
            if (!R._jsPlumb.isSuspendDrawing()) {
                R.repaint()
            }
        };
        this.getLabel = function () {
            var S = R.getOverlay(G);
            return S != null ? S.getLabel() : null
        };
        this.getLabelOverlay = function () {
            return R.getOverlay(G)
        };
        var L = this.applyType;
        this.applyType = function (U, V) {
            L(U, V);
            R.removeAllOverlays();
            if (U.overlays) {
                for (var T = 0, S = U.overlays.length; T < S; T++) {
                    R.addOverlay(U.overlays[T], true)
                }
            }
        };
        var P = this.setHover;
        this.setHover = function (U, W, V) {
            P.apply(R, arguments);
            for (var T = 0, S = R.overlays.length; T < S; T++) {
                R.overlays[T][U ? "addClass" : "removeClass"](R._jsPlumb.hoverClass)
            }
        }
    };
    var d = 0, b = function () {
        var E = d + 1;
        d++;
        return E
    };
    var u = function (F) {
        this.Defaults = {
            Anchor: "BottomCenter",
            Anchors: [null, null],
            ConnectionsDetachable: true,
            ConnectionOverlays: [],
            Connector: "Bezier",
            Container: null,
            DoNotThrowErrors: false,
            DragOptions: {},
            DropOptions: {},
            Endpoint: "Dot",
            EndpointOverlays: [],
            Endpoints: [null, null],
            EndpointStyle: {fillStyle: "#456"},
            EndpointStyles: [null, null],
            EndpointHoverStyle: null,
            EndpointHoverStyles: [null, null],
            HoverPaintStyle: null,
            LabelStyle: {color: "black"},
            LogEnabled: false,
            Overlays: [],
            MaxConnections: 1,
            PaintStyle: {lineWidth: 8, strokeStyle: "#456"},
            ReattachConnections: false,
            RenderMode: "svg",
            Scope: "jsPlumb_DefaultScope"
        };
        if (F) {
            n.extend(this.Defaults, F)
        }
        this.logEnabled = this.Defaults.LogEnabled;
        var aJ = {}, ab = {};
        this.registerConnectionType = function (a8, a7) {
            aJ[a8] = n.extend({}, a7)
        };
        this.registerConnectionTypes = function (a8) {
            for (var a7 in a8) {
                aJ[a7] = n.extend({}, a8[a7])
            }
        };
        this.registerEndpointType = function (a8, a7) {
            ab[a8] = n.extend({}, a7)
        };
        this.registerEndpointTypes = function (a8) {
            for (var a7 in a8) {
                ab[a7] = n.extend({}, a8[a7])
            }
        };
        this.getType = function (a8, a7) {
            return a7 === "connection" ? aJ[a8] : ab[a8]
        };
        jsPlumbUtil.EventGenerator.apply(this);
        var a0 = this, aw = b(), az = a0.bind, an = {}, U = 1;
        this.getInstanceIndex = function () {
            return aw
        };
        this.setZoom = function (a8, a7) {
            U = a8;
            if (a7) {
                a0.repaintEverything()
            }
        };
        this.getZoom = function () {
            return U
        };
        for (var am in this.Defaults) {
            an[am] = this.Defaults[am]
        }
        this.bind = function (a8, a7) {
            if ("ready" === a8 && H) {
                a7()
            } else {
                az.apply(a0, [a8, a7])
            }
        };
        a0.importDefaults = function (a8) {
            for (var a7 in a8) {
                a0.Defaults[a7] = a8[a7]
            }
        };
        a0.restoreDefaults = function () {
            a0.Defaults = n.extend({}, an)
        };
        var K = null, aU = null, H = false, Z = null, aH = {}, aC = {}, aE = {}, aa = {}, a2 = {}, aV = {}, aZ = {}, a6 = [], X = [], N = this.Defaults.Scope, R = null, aF = function (a8, a7) {
            if (a0.Defaults.Container) {
                n.CurrentLibrary.appendElement(a8, a0.Defaults.Container)
            } else {
                if (!a7) {
                    jsPlumbAdapter.appendToRoot(a8)
                } else {
                    n.CurrentLibrary.appendElement(a8, a7)
                }
            }
        }, ao = 1, ad = function () {
            return "" + ao++
        }, au = function (a7) {
            return a7._nodes ? a7._nodes : a7
        }, aQ = function (a9, bc, bb, ba) {
            if (!jsPlumbAdapter.headless && !aM) {
                var bd = A(a9, "id"), a7 = a0.dragManager.getElementsForDraggable(bd);
                if (bb == null) {
                    bb = p()
                }
                a0.anchorManager.redraw(bd, bc, bb, null, ba);
                if (a7) {
                    for (var a8 in a7) {
                        a0.anchorManager.redraw(a7[a8].id, bc, bb, a7[a8].offset, ba)
                    }
                }
            }
        }, ar = function (a9, bb) {
            var bc = null;
            if (l(a9)) {
                bc = [];
                for (var a8 = 0, a7 = a9.length; a8 < a7; a8++) {
                    var ba = e(a9[a8]), bd = A(ba, "id");
                    bc.push(bb(ba, bd))
                }
            } else {
                var ba = e(a9), bd = A(ba, "id");
                bc = bb(ba, bd)
            }
            return bc
        }, ah = function (a7) {
            return aE[a7]
        }, aS = function (bb, a7, be) {
            if (!jsPlumbAdapter.headless) {
                var bg = a7 == null ? false : a7, bc = n.CurrentLibrary;
                if (bg) {
                    if (bc.isDragSupported(bb) && !bc.isAlreadyDraggable(bb)) {
                        var bf = be || a0.Defaults.DragOptions || n.Defaults.DragOptions;
                        bf = n.extend({}, bf);
                        var bd = bc.dragEvents.drag, a8 = bc.dragEvents.stop, ba = bc.dragEvents.start;
                        bf[ba] = ae(bf[ba], function () {
                            a0.setHoverSuspended(true);
                            a0.select({source: bb}).addClass(a0.elementDraggingClass + " " + a0.sourceElementDraggingClass, true);
                            a0.select({target: bb}).addClass(a0.elementDraggingClass + " " + a0.targetElementDraggingClass, true)
                        });
                        bf[bd] = ae(bf[bd], function () {
                            var bh = bc.getUIPosition(arguments, a0.getZoom());
                            aQ(bb, bh, null, true);
                            w(bb, "jsPlumb_dragged")
                        });
                        bf[a8] = ae(bf[a8], function () {
                            var bh = bc.getUIPosition(arguments, a0.getZoom());
                            aQ(bb, bh);
                            m(bb, "jsPlumb_dragged");
                            a0.setHoverSuspended(false);
                            a0.select({source: bb}).removeClass(a0.elementDraggingClass + " " + a0.sourceElementDraggingClass, true);
                            a0.select({target: bb}).removeClass(a0.elementDraggingClass + " " + a0.targetElementDraggingClass, true)
                        });
                        var a9 = E(bb);
                        aZ[a9] = true;
                        var bg = aZ[a9];
                        bf.disabled = bg == null ? false : !bg;
                        bc.initDraggable(bb, bf, false, a0);
                        a0.dragManager.register(bb)
                    }
                }
            }
        }, al = function (ba, be) {
            var a7 = n.extend({sourceIsNew: true, targetIsNew: true}, ba);
            if (be) {
                n.extend(a7, be)
            }
            if (a7.source && a7.source.endpoint) {
                a7.sourceEndpoint = a7.source
            }
            if (a7.target && a7.target.endpoint) {
                a7.targetEndpoint = a7.target
            }
            if (ba.uuids) {
                a7.sourceEndpoint = ah(ba.uuids[0]);
                a7.targetEndpoint = ah(ba.uuids[1])
            }
            if (a7.sourceEndpoint && a7.sourceEndpoint.isFull()) {
                o(a0, "could not add connection; source endpoint is full");
                return
            }
            if (a7.targetEndpoint && a7.targetEndpoint.isFull()) {
                o(a0, "could not add connection; target endpoint is full");
                return
            }
            if (a7.sourceEndpoint && !a7.sourceEndpoint.addedViaMouse) {
                a7.sourceIsNew = false
            }
            if (a7.targetEndpoint && !a7.targetEndpoint.addedViaMouse) {
                a7.targetIsNew = false
            }
            if (!a7.type && a7.sourceEndpoint) {
                a7.type = a7.sourceEndpoint.connectionType
            }
            if (a7.sourceEndpoint && a7.sourceEndpoint.connectorOverlays) {
                a7.overlays = a7.overlays || [];
                for (var bd = 0, bc = a7.sourceEndpoint.connectorOverlays.length; bd < bc; bd++) {
                    a7.overlays.push(a7.sourceEndpoint.connectorOverlays[bd])
                }
            }
            if (!a7["pointer-events"] && a7.sourceEndpoint && a7.sourceEndpoint.connectorPointerEvents) {
                a7["pointer-events"] = a7.sourceEndpoint.connectorPointerEvents
            }
            if (a7.target && !a7.target.endpoint && !a7.targetEndpoint && !a7.newConnection) {
                var bb = E(a7.target), a8 = aI[bb], a9 = at[bb];
                if (a8) {
                    if (!ac[bb]) {
                        return
                    }
                    var bf = a9 != null ? a9 : a0.addEndpoint(a7.target, a8);
                    if (aW[bb]) {
                        at[bb] = bf
                    }
                    a7.targetEndpoint = bf;
                    bf._makeTargetCreator = true;
                    a7.targetIsNew = true
                }
            }
            if (a7.source && !a7.source.endpoint && !a7.sourceEndpoint && !a7.newConnection) {
                var bb = E(a7.source), a8 = ak[bb], a9 = aL[bb];
                if (a8) {
                    if (!V[bb]) {
                        return
                    }
                    var bf = a9 != null ? a9 : a0.addEndpoint(a7.source, a8);
                    if (aO[bb]) {
                        aL[bb] = bf
                    }
                    a7.sourceEndpoint = bf;
                    a7.sourceIsNew = true
                }
            }
            return a7
        }, W = function (bb) {
            var ba = a0.Defaults.ConnectionType || a0.getDefaultConnectionType(), a9 = a0.Defaults.EndpointType || n.Endpoint, a8 = n.CurrentLibrary.getParent;
            if (bb.container) {
                bb.parent = bb.container
            } else {
                if (bb.sourceEndpoint) {
                    bb.parent = bb.sourceEndpoint.parent
                } else {
                    if (bb.source.constructor == a9) {
                        bb.parent = bb.source.parent
                    } else {
                        bb.parent = a8(bb.source)
                    }
                }
            }
            bb._jsPlumb = a0;
            bb.newConnection = W;
            bb.newEndpoint = ap;
            bb.endpointsByUUID = aE;
            bb.endpointsByElement = aC;
            bb.finaliseConnection = a5;
            var a7 = new ba(bb);
            a7.id = "con_" + ad();
            a4("click", "click", a7);
            a4("dblclick", "dblclick", a7);
            a4("contextmenu", "contextmenu", a7);
            return a7
        }, a5 = function (a9, ba, a7) {
            ba = ba || {};
            if (!a9.suspendedEndpoint) {
                i(aH, a9.scope, a9)
            }
            a0.anchorManager.newConnection(a9);
            aQ(a9.source);
            if (!ba.doNotFireConnectionEvent && ba.fireEvent !== false) {
                var a8 = {
                    connection: a9,
                    source: a9.source,
                    target: a9.target,
                    sourceId: a9.sourceId,
                    targetId: a9.targetId,
                    sourceEndpoint: a9.endpoints[0],
                    targetEndpoint: a9.endpoints[1]
                };
                a0.fire("jsPlumbConnection", a8, a7);
                a0.fire("connection", a8, a7)
            }
        }, a4 = function (a7, a8, a9) {
            a9.bind(a7, function (bb, ba) {
                a0.fire(a8, a9, ba)
            })
        }, ai = function (a9) {
            if (a9.container) {
                return a9.container
            } else {
                var a7 = n.CurrentLibrary.getTagName(a9.source), a8 = n.CurrentLibrary.getParent(a9.source);
                if (a7 && a7.toLowerCase() === "td") {
                    return n.CurrentLibrary.getParent(a8)
                } else {
                    return a8
                }
            }
        }, ap = function (ba) {
            var a9 = a0.Defaults.EndpointType || n.Endpoint;
            var a7 = n.extend({}, ba);
            a7.parent = ai(a7);
            a7._jsPlumb = a0;
            a7.newConnection = W;
            a7.newEndpoint = ap;
            a7.endpointsByUUID = aE;
            a7.endpointsByElement = aC;
            a7.finaliseConnection = a5;
            a7.fireDetachEvent = aN;
            a7.floatingConnections = aV;
            a7.getParentFromParams = ai;
            a7.connectionsByScope = aH;
            var a8 = new a9(a7);
            a8.id = "ep_" + ad();
            a4("click", "endpointClick", a8);
            a4("dblclick", "endpointDblClick", a8);
            a4("contextmenu", "contextmenu", a8);
            if (!jsPlumbAdapter.headless) {
                a0.dragManager.endpointAdded(ba.source)
            }
            return a8
        }, P = function (ba, a9, bc) {
            var a8 = aC[ba];
            if (a8 && a8.length) {
                for (var bd = 0, bf = a8.length; bd < bf; bd++) {
                    for (var bb = 0, be = a8[bd].connections.length; bb < be; bb++) {
                        var a7 = a9(a8[bd].connections[bb]);
                        if (a7) {
                            return
                        }
                    }
                    if (bc) {
                        bc(a8[bd])
                    }
                }
            }
        }, S = function (a8) {
            for (var a7 in aC) {
                P(a7, a8)
            }
        }, aY = function (a8, a7) {
            return ar(a8, function (a9, ba) {
                aZ[ba] = a7;
                if (n.CurrentLibrary.isDragSupported(a9)) {
                    n.CurrentLibrary.setDraggable(a9, a7)
                }
            })
        }, aK = function (a9, ba, a7) {
            ba = ba === "block";
            var a8 = null;
            if (a7) {
                if (ba) {
                    a8 = function (bc) {
                        bc.setVisible(true, true, true)
                    }
                } else {
                    a8 = function (bc) {
                        bc.setVisible(false, true, true)
                    }
                }
            }
            var bb = A(a9, "id");
            P(bb, function (bd) {
                if (ba && a7) {
                    var bc = bd.sourceId === bb ? 1 : 0;
                    if (bd.endpoints[bc].isVisible()) {
                        bd.setVisible(true)
                    }
                } else {
                    bd.setVisible(ba)
                }
            }, a8)
        }, aX = function (a7) {
            return ar(a7, function (a9, a8) {
                var ba = aZ[a8] == null ? false : aZ[a8];
                ba = !ba;
                aZ[a8] = ba;
                n.CurrentLibrary.setDraggable(a9, ba);
                return ba
            })
        }, aA = function (a7, a9) {
            var a8 = null;
            if (a9) {
                a8 = function (ba) {
                    var bb = ba.isVisible();
                    ba.setVisible(!bb)
                }
            }
            P(a7, function (bb) {
                var ba = bb.isVisible();
                bb.setVisible(!ba)
            }, a8)
        }, Q = function (bc) {
            var ba = bc.timestamp, a7 = bc.recalc, bb = bc.offset, a8 = bc.elId;
            if (aM && !ba) {
                ba = aP
            }
            if (!a7) {
                if (ba && ba === a2[a8]) {
                    return {o: aa[a8], s: X[a8]}
                }
            }
            if (a7 || !bb) {
                var a9 = e(a8);
                if (a9 != null) {
                    X[a8] = a(a9);
                    aa[a8] = r(a9, a0);
                    a2[a8] = ba
                }
            } else {
                aa[a8] = bb;
                if (X[a8] == null) {
                    var a9 = e(a8);
                    if (a9 != null) {
                        X[a8] = a(a9)
                    }
                }
            }
            if (aa[a8] && !aa[a8].right) {
                aa[a8].right = aa[a8].left + X[a8][0];
                aa[a8].bottom = aa[a8].top + X[a8][1];
                aa[a8].width = X[a8][0];
                aa[a8].height = X[a8][1];
                aa[a8].centerx = aa[a8].left + (aa[a8].width / 2);
                aa[a8].centery = aa[a8].top + (aa[a8].height / 2)
            }
            return {o: aa[a8], s: X[a8]}
        }, ay = function (a7) {
            var a8 = aa[a7];
            if (!a8) {
                return Q({elId: a7})
            } else {
                return {o: a8, s: X[a7]}
            }
        }, E = function (a7, a8, ba) {
            var a9 = e(a7);
            var bb = A(a9, "id");
            if (!bb || bb == "undefined") {
                if (arguments.length == 2 && arguments[1] != undefined) {
                    bb = a8
                } else {
                    if (arguments.length == 1 || (arguments.length == 3 && !arguments[2])) {
                        bb = "jsPlumb_" + aw + "_" + ad()
                    }
                }
                if (!ba) {
                    c(a9, "id", bb)
                }
            }
            return bb
        }, ae = function (a9, a7, a8) {
            a9 = a9 || function () {
                };
            a7 = a7 || function () {
                };
            return function () {
                var ba = null;
                try {
                    ba = a7.apply(this, arguments)
                } catch (bb) {
                    o(a0, "jsPlumb function failed : " + bb)
                }
                if (a8 == null || (ba !== a8)) {
                    try {
                        a9.apply(this, arguments)
                    } catch (bb) {
                        o(a0, "wrapped function failed : " + bb)
                    }
                }
                return ba
            }
        };
        this.isConnectionBeingDragged = function () {
            return Z != null
        };
        this.setConnectionBeingDragged = function (a7) {
            Z = a7
        };
        this.connectorClass = "_jsPlumb_connector";
        this.hoverClass = "_jsPlumb_hover";
        this.endpointClass = "_jsPlumb_endpoint";
        this.endpointConnectedClass = "_jsPlumb_endpoint_connected";
        this.endpointFullClass = "_jsPlumb_endpoint_full";
        this.endpointDropAllowedClass = "_jsPlumb_endpoint_drop_allowed";
        this.endpointDropForbiddenClass = "_jsPlumb_endpoint_drop_forbidden";
        this.overlayClass = "_jsPlumb_overlay";
        this.draggingClass = "_jsPlumb_dragging";
        this.elementDraggingClass = "_jsPlumb_element_dragging";
        this.sourceElementDraggingClass = "_jsPlumb_source_element_dragging";
        this.targetElementDraggingClass = "_jsPlumb_target_element_dragging";
        this.endpointAnchorClassPrefix = "_jsPlumb_endpoint_anchor";
        this.Anchors = {};
        this.Connectors = {canvas: {}, svg: {}, vml: {}};
        this.Endpoints = {canvas: {}, svg: {}, vml: {}};
        this.Overlays = {canvas: {}, svg: {}, vml: {}};
        this.ConnectorRenderers = {};
        this.addClass = function (a8, a7) {
            return n.CurrentLibrary.addClass(a8, a7)
        };
        this.removeClass = function (a8, a7) {
            return n.CurrentLibrary.removeClass(a8, a7)
        };
        this.hasClass = function (a8, a7) {
            return n.CurrentLibrary.hasClass(a8, a7)
        };
        this.addEndpoint = function (ba, bb, bl) {
            bl = bl || {};
            var a9 = n.extend({}, bl);
            n.extend(a9, bb);
            a9.endpoint = a9.endpoint || a0.Defaults.Endpoint || n.Defaults.Endpoint;
            a9.paintStyle = a9.paintStyle || a0.Defaults.EndpointStyle || n.Defaults.EndpointStyle;
            ba = au(ba);
            var bd = [], bg = (l(ba) || (ba.length != null && !x(ba))) ? ba : [ba];
            for (var be = 0, bc = bg.length; be < bc; be++) {
                var bj = e(bg[be]), a8 = E(bj);
                a9.source = bj;
                Q({elId: a8, timestamp: aP});
                var bi = ap(a9);
                if (a9.parentAnchor) {
                    bi.parentAnchor = a9.parentAnchor
                }
                i(aC, a8, bi);
                var bh = aa[a8], bf = X[a8];
                var bk = bi.anchor.compute({xy: [bh.left, bh.top], wh: bf, element: bi, timestamp: aP});
                var a7 = {anchorLoc: bk, timestamp: aP};
                if (aM) {
                    a7.recalc = false
                }
                if (!aM) {
                    bi.paint(a7)
                }
                bd.push(bi)
            }
            return bd.length == 1 ? bd[0] : bd
        };
        this.addEndpoints = function (bc, a8, a7) {
            var bb = [];
            for (var ba = 0, a9 = a8.length; ba < a9; ba++) {
                var bd = a0.addEndpoint(bc, a8[ba], a7);
                if (l(bd)) {
                    Array.prototype.push.apply(bb, bd)
                } else {
                    bb.push(bd)
                }
            }
            return bb
        };
        this.animate = function (a9, a8, a7) {
            var ba = e(a9), bd = A(a9, "id");
            a7 = a7 || {};
            var bc = n.CurrentLibrary.dragEvents.step;
            var bb = n.CurrentLibrary.dragEvents.complete;
            a7[bc] = ae(a7[bc], function () {
                a0.repaint(bd)
            });
            a7[bb] = ae(a7[bb], function () {
                a0.repaint(bd)
            });
            n.CurrentLibrary.animate(ba, a8, a7)
        };
        this.checkCondition = function (ba, bc) {
            var a7 = a0.getListener(ba), bb = true;
            if (a7 && a7.length > 0) {
                try {
                    for (var a9 = 0, a8 = a7.length; a9 < a8; a9++) {
                        bb = bb && a7[a9](bc)
                    }
                } catch (bd) {
                    o(a0, "cannot check condition [" + ba + "]" + bd)
                }
            }
            return bb
        };
        this.checkASyncCondition = function (a9, bb, ba, a8) {
            var a7 = a0.getListener(a9);
            if (a7 && a7.length > 0) {
                try {
                    a7[0](bb, ba, a8)
                } catch (bc) {
                    o(a0, "cannot asynchronously check condition [" + a9 + "]" + bc)
                }
            }
        };
        this.connect = function (ba, a8) {
            var a7 = al(ba, a8), a9;
            if (a7) {
                if (a7.deleteEndpointsOnDetach == null) {
                    a7.deleteEndpointsOnDetach = true
                }
                a9 = W(a7);
                a5(a9, a7)
            }
            return a9
        };
        this.deleteEndpoint = function (a8, a7) {
            a0.doWhileSuspended(function () {
                var bf = (typeof a8 == "string") ? aE[a8] : a8;
                if (bf) {
                    var bc = bf.getUuid();
                    if (bc) {
                        aE[bc] = null
                    }
                    bf.detachAll().cleanup();
                    if (bf.endpoint.cleanup) {
                        bf.endpoint.cleanup()
                    }
                    jsPlumbUtil.removeElements(bf.endpoint.getDisplayElements());
                    a0.anchorManager.deleteEndpoint(bf);
                    for (var be in aC) {
                        var a9 = aC[be];
                        if (a9) {
                            var bd = [];
                            for (var bb = 0, ba = a9.length; bb < ba; bb++) {
                                if (a9[bb] != bf) {
                                    bd.push(a9[bb])
                                }
                            }
                            aC[be] = bd
                        }
                        if (aC[be].length < 1) {
                            delete aC[be]
                        }
                    }
                    if (!jsPlumbAdapter.headless) {
                        a0.dragManager.endpointDeleted(bf)
                    }
                }
                return a0
            }, a7)
        };
        this.deleteEveryEndpoint = function () {
            a0.doWhileSuspended(function () {
                for (var ba in aC) {
                    var a7 = aC[ba];
                    if (a7 && a7.length) {
                        for (var a9 = 0, a8 = a7.length; a9 < a8; a9++) {
                            a0.deleteEndpoint(a7[a9], true)
                        }
                    }
                }
                aC = {};
                aE = {};
                a0.anchorManager.reset();
                a0.dragManager.reset()
            });
            return a0
        };
        var aN = function (ba, bc, a7) {
            var a9 = a0.Defaults.ConnectionType || a0.getDefaultConnectionType(), a8 = ba.constructor == a9, bb = a8 ? {
                connection: ba,
                source: ba.source,
                target: ba.target,
                sourceId: ba.sourceId,
                targetId: ba.targetId,
                sourceEndpoint: ba.endpoints[0],
                targetEndpoint: ba.endpoints[1]
            } : ba;
            if (bc) {
                a0.fire("jsPlumbConnectionDetached", bb, a7);
                a0.fire("connectionDetached", bb, a7)
            }
            a0.anchorManager.connectionDetached(bb)
        };
        this.detach = function () {
            if (arguments.length == 0) {
                return
            }
            var bb = a0.Defaults.ConnectionType || a0.getDefaultConnectionType(), bc = arguments[0].constructor == bb, ba = arguments.length == 2 ? bc ? (arguments[1] || {}) : arguments[0] : arguments[0], bf = (ba.fireEvent !== false), a8 = ba.forceDetach, a9 = bc ? arguments[0] : ba.connection;
            if (a9) {
                if (a8 || jsPlumbUtil.functionChain(true, false, [[a9.endpoints[0], "isDetachAllowed", [a9]], [a9.endpoints[1], "isDetachAllowed", [a9]], [a9, "isDetachAllowed", [a9]], [a0, "checkCondition", ["beforeDetach", a9]]])) {
                    a9.endpoints[0].detach(a9, false, true, bf)
                }
            } else {
                var a7 = n.extend({}, ba);
                if (a7.uuids) {
                    ah(a7.uuids[0]).detachFrom(ah(a7.uuids[1]), bf)
                } else {
                    if (a7.sourceEndpoint && a7.targetEndpoint) {
                        a7.sourceEndpoint.detachFrom(a7.targetEndpoint)
                    } else {
                        var be = E(a7.source), bd = E(a7.target);
                        P(be, function (bg) {
                            if ((bg.sourceId == be && bg.targetId == bd) || (bg.targetId == be && bg.sourceId == bd)) {
                                if (a0.checkCondition("beforeDetach", bg)) {
                                    bg.endpoints[0].detach(bg, false, true, bf)
                                }
                            }
                        })
                    }
                }
            }
        };
        this.detachAllConnections = function (ba, bb) {
            bb = bb || {};
            ba = e(ba);
            var bc = A(ba, "id"), a7 = aC[bc];
            if (a7 && a7.length) {
                for (var a9 = 0, a8 = a7.length; a9 < a8; a9++) {
                    a7[a9].detachAll(bb.fireEvent)
                }
            }
            return a0
        };
        this.detachEveryConnection = function (ba) {
            ba = ba || {};
            for (var bb in aC) {
                var a7 = aC[bb];
                if (a7 && a7.length) {
                    for (var a9 = 0, a8 = a7.length; a9 < a8; a9++) {
                        a7[a9].detachAll(ba.fireEvent)
                    }
                }
            }
            aH = {};
            return a0
        };
        this.draggable = function (ba, a8) {
            if (typeof ba == "object" && ba.length) {
                for (var a9 = 0, a7 = ba.length; a9 < a7; a9++) {
                    var bb = e(ba[a9]);
                    if (bb) {
                        aS(bb, true, a8)
                    }
                }
            } else {
                if (ba._nodes) {
                    for (var a9 = 0, a7 = ba._nodes.length; a9 < a7; a9++) {
                        var bb = e(ba._nodes[a9]);
                        if (bb) {
                            aS(bb, true, a8)
                        }
                    }
                } else {
                    var bb = e(ba);
                    if (bb) {
                        aS(bb, true, a8)
                    }
                }
            }
            return a0
        };
        this.extend = function (a8, a7) {
            return n.CurrentLibrary.extend(a8, a7)
        };
        this.getDefaultEndpointType = function () {
            return n.Endpoint
        };
        this.getDefaultConnectionType = function () {
            return n.Connection
        };
        var a1 = function (bc, bb, a9, a7) {
            for (var ba = 0, a8 = bc.length; ba < a8; ba++) {
                bc[ba][bb].apply(bc[ba], a9)
            }
            return a7(bc)
        }, O = function (bc, bb, a9) {
            var a8 = [];
            for (var ba = 0, a7 = bc.length; ba < a7; ba++) {
                a8.push([bc[ba][bb].apply(bc[ba], a9), bc[ba]])
            }
            return a8
        }, af = function (a9, a8, a7) {
            return function () {
                return a1(a9, a8, arguments, a7)
            }
        }, aj = function (a8, a7) {
            return function () {
                return O(a8, a7, arguments)
            }
        }, a3 = function (a7, bb) {
            var ba = [];
            if (a7) {
                if (typeof a7 == "string") {
                    if (a7 === "*") {
                        return a7
                    }
                    ba.push(a7)
                } else {
                    if (bb) {
                        ba = a7
                    } else {
                        for (var a9 = 0, a8 = a7.length; a9 < a8; a9++) {
                            ba.push(E(e(a7[a9])))
                        }
                    }
                }
            }
            return ba
        }, aq = function (a9, a8, a7) {
            if (a9 === "*") {
                return true
            }
            return a9.length > 0 ? D(a9, a8) != -1 : !a7
        };
        this.getConnections = function (bh, a8) {
            if (!bh) {
                bh = {}
            } else {
                if (bh.constructor == String) {
                    bh = {scope: bh}
                }
            }
            var bg = bh.scope || a0.getDefaultScope(), bf = a3(bg, true), a7 = a3(bh.source), bd = a3(bh.target), bb = (!a8 && bf.length > 1) ? {} : [], bi = function (bk, bl) {
                if (!a8 && bf.length > 1) {
                    var bj = bb[bk];
                    if (bj == null) {
                        bj = [];
                        bb[bk] = bj
                    }
                    bj.push(bl)
                } else {
                    bb.push(bl)
                }
            };
            for (var ba in aH) {
                if (aq(bf, ba)) {
                    for (var a9 = 0, bc = aH[ba].length; a9 < bc; a9++) {
                        var be = aH[ba][a9];
                        if (aq(a7, be.sourceId) && aq(bd, be.targetId)) {
                            bi(ba, be)
                        }
                    }
                }
            }
            return bb
        };
        var I = function (a7, a8) {
            return function (bb) {
                for (var a9 = 0, ba = a7.length; a9 < ba; a9++) {
                    bb(a7[a9])
                }
                return a8(a7)
            }
        }, L = function (a7) {
            return function (a8) {
                return a7[a8]
            }
        };
        var M = function (bc, bd) {
            var a7 = {
                length: bc.length,
                each: I(bc, bd),
                get: L(bc)
            }, bb = ["setHover", "removeAllOverlays", "setLabel", "addClass", "addOverlay", "removeOverlay", "removeOverlays", "showOverlay", "hideOverlay", "showOverlays", "hideOverlays", "setPaintStyle", "setHoverPaintStyle", "setSuspendEvents", "setParameter", "setParameters", "setVisible", "repaint", "addType", "toggleType", "removeType", "removeClass", "setType", "bind", "unbind"], ba = ["getLabel", "getOverlay", "isHover", "getParameter", "getParameters", "getPaintStyle", "getHoverPaintStyle", "isVisible", "hasType", "getType", "isSuspendEvents"];
            for (var a8 = 0, a9 = bb.length; a8 < a9; a8++) {
                a7[bb[a8]] = af(bc, bb[a8], bd)
            }
            for (var a8 = 0, a9 = ba.length; a8 < a9; a8++) {
                a7[ba[a8]] = aj(bc, ba[a8])
            }
            return a7
        };
        var av = function (a8) {
            var a7 = M(a8, av);
            return n.CurrentLibrary.extend(a7, {
                setDetachable: af(a8, "setDetachable", av),
                setReattach: af(a8, "setReattach", av),
                setConnector: af(a8, "setConnector", av),
                detach: function () {
                    for (var a9 = 0, ba = a8.length; a9 < ba; a9++) {
                        a0.detach(a8[a9])
                    }
                },
                isDetachable: aj(a8, "isDetachable"),
                isReattach: aj(a8, "isReattach")
            })
        };
        var aR = function (a8) {
            var a7 = M(a8, aR);
            return n.CurrentLibrary.extend(a7, {
                setEnabled: af(a8, "setEnabled", aR),
                setAnchor: af(a8, "setAnchor", aR),
                isEnabled: aj(a8, "isEnabled"),
                detachAll: function () {
                    for (var a9 = 0, ba = a8.length; a9 < ba; a9++) {
                        a8[a9].detachAll()
                    }
                },
                remove: function () {
                    for (var a9 = 0, ba = a8.length; a9 < ba; a9++) {
                        a0.deleteEndpoint(a8[a9])
                    }
                }
            })
        };
        this.select = function (a7) {
            a7 = a7 || {};
            a7.scope = a7.scope || "*";
            var a8 = a7.connections || a0.getConnections(a7, true);
            return av(a8)
        };
        this.selectEndpoints = function (bi) {
            bi = bi || {};
            bi.scope = bi.scope || "*";
            var ba = !bi.element && !bi.source && !bi.target, bd = ba ? "*" : a3(bi.element), a7 = ba ? "*" : a3(bi.source), bm = ba ? "*" : a3(bi.target), bf = a3(bi.scope, true);
            var bo = [];
            for (var a8 in aC) {
                var bj = aq(bd, a8, true), bg = aq(a7, a8, true), bl = a7 != "*", bn = aq(bm, a8, true), bc = bm != "*";
                if (bj || bg || bn) {
                    inner:for (var bh = 0, bb = aC[a8].length; bh < bb; bh++) {
                        var be = aC[a8][bh];
                        if (aq(bf, be.scope, true)) {
                            var bk = (bl && a7.length > 0 && !be.isSource), a9 = (bc && bm.length > 0 && !be.isTarget);
                            if (bk || a9) {
                                continue inner
                            }
                            bo.push(be)
                        }
                    }
                }
            }
            return aR(bo)
        };
        this.getAllConnections = function () {
            return aH
        };
        this.getDefaultScope = function () {
            return N
        };
        this.getEndpoint = ah;
        this.getEndpoints = function (a7) {
            return aC[E(a7)]
        };
        this.getId = E;
        this.getOffset = function (a8) {
            var a7 = aa[a8];
            return Q({elId: a8})
        };
        this.getSelector = function () {
            return n.CurrentLibrary.getSelector.apply(null, arguments)
        };
        this.getSize = function (a8) {
            var a7 = X[a8];
            if (!a7) {
                Q({elId: a8})
            }
            return X[a8]
        };
        this.appendElement = aF;
        var aB = false;
        this.isHoverSuspended = function () {
            return aB
        };
        this.setHoverSuspended = function (a7) {
            aB = a7
        };
        var aG = function (a7) {
            return function () {
                return jsPlumbAdapter.isRenderModeAvailable(a7)
            }
        };
        this.isCanvasAvailable = aG("canvas");
        this.isSVGAvailable = aG("svg");
        this.isVMLAvailable = aG("vml");
        this.hide = function (a7, a8) {
            aK(a7, "none", a8);
            return a0
        };
        this.idstamp = ad;
        this.init = function () {
            if (!H) {
                a0.anchorManager = new n.AnchorManager({jsPlumbInstance: a0});
                a0.setRenderMode(a0.Defaults.RenderMode);
                H = true;
                a0.fire("ready", a0)
            }
        };
        this.log = K;
        this.jsPlumbUIComponent = z;
        this.makeAnchor = function () {
            var bb = function (be, bf) {
                if (n.Anchors[be]) {
                    return new n.Anchors[be](bf)
                }
                if (!a0.Defaults.DoNotThrowErrors) {
                    throw {msg: "jsPlumb: unknown anchor type '" + be + "'"}
                }
            };
            if (arguments.length == 0) {
                return null
            }
            var bd = arguments[0], a9 = arguments[1], a8 = arguments[2], ba = null;
            if (bd.compute && bd.getOrientation) {
                return bd
            } else {
                if (typeof bd == "string") {
                    ba = bb(arguments[0], {elementId: a9, jsPlumbInstance: a0})
                } else {
                    if (l(bd)) {
                        if (l(bd[0]) || x(bd[0])) {
                            if (bd.length == 2 && x(bd[0]) && t(bd[1])) {
                                var a7 = n.extend({elementId: a9, jsPlumbInstance: a0}, bd[1]);
                                ba = bb(bd[0], a7)
                            } else {
                                ba = new n.DynamicAnchor({
                                    anchors: bd,
                                    selector: null,
                                    elementId: a9,
                                    jsPlumbInstance: a8
                                })
                            }
                        } else {
                            var bc = {
                                x: bd[0],
                                y: bd[1],
                                orientation: (bd.length >= 4) ? [bd[2], bd[3]] : [0, 0],
                                offsets: (bd.length >= 6) ? [bd[4], bd[5]] : [0, 0],
                                elementId: a9,
                                jsPlumbInstance: a8,
                                cssClass: bd.length == 7 ? bd[6] : null
                            };
                            ba = new n.Anchor(bc);
                            ba.clone = function () {
                                return new n.Anchor(bc)
                            }
                        }
                    }
                }
            }
            if (!ba.id) {
                ba.id = "anchor_" + ad()
            }
            return ba
        };
        this.makeAnchors = function (ba, a8, a7) {
            var bc = [];
            for (var a9 = 0, bb = ba.length; a9 < bb; a9++) {
                if (typeof ba[a9] == "string") {
                    bc.push(n.Anchors[ba[a9]]({elementId: a8, jsPlumbInstance: a7}))
                } else {
                    if (l(ba[a9])) {
                        bc.push(a0.makeAnchor(ba[a9], a8, a7))
                    }
                }
            }
            return bc
        };
        this.makeDynamicAnchor = function (a7, a8) {
            return new n.DynamicAnchor({anchors: a7, selector: a8, elementId: null, jsPlumbInstance: a0})
        };
        var aI = {}, at = {}, aW = {}, ag = {}, T = function (a7, a8) {
            a7.paintStyle = a7.paintStyle || a0.Defaults.EndpointStyles[a8] || a0.Defaults.EndpointStyle || n.Defaults.EndpointStyles[a8] || n.Defaults.EndpointStyle;
            a7.hoverPaintStyle = a7.hoverPaintStyle || a0.Defaults.EndpointHoverStyles[a8] || a0.Defaults.EndpointHoverStyle || n.Defaults.EndpointHoverStyles[a8] || n.Defaults.EndpointHoverStyle;
            a7.anchor = a7.anchor || a0.Defaults.Anchors[a8] || a0.Defaults.Anchor || n.Defaults.Anchors[a8] || n.Defaults.Anchor;
            a7.endpoint = a7.endpoint || a0.Defaults.Endpoints[a8] || a0.Defaults.Endpoint || n.Defaults.Endpoints[a8] || n.Defaults.Endpoint
        };
        this.makeTarget = function (ba, bb, bi) {
            var a8 = n.extend({_jsPlumb: a0}, bi);
            n.extend(a8, bb);
            T(a8, 1);
            var bf = n.CurrentLibrary, bg = a8.scope || a0.Defaults.Scope, bc = !(a8.deleteEndpointsOnDetach === false), a9 = a8.maxConnections || -1, a7 = a8.onMaxConnections;
            _doOne = function (bn) {
                var bl = E(bn);
                aI[bl] = a8;
                aW[bl] = a8.uniqueEndpoint, ag[bl] = a9, ac[bl] = true, proxyComponent = new z(a8);
                var bk = n.extend({}, a8.dropOptions || {}), bj = function () {
                    var bq = n.CurrentLibrary.getDropEvent(arguments), bs = a0.select({target: bl}).length;
                    a0.currentlyDragging = false;
                    var bC = e(bf.getDragObject(arguments)), br = A(bC, "dragId"), bA = A(bC, "originalScope"), bx = aV[br], bp = bx.endpoints[0], bo = a8.endpoint ? n.extend({}, a8.endpoint) : {};
                    if (!ac[bl] || ag[bl] > 0 && bs >= ag[bl]) {
                        if (a7) {
                            a7({element: bn, connection: bx}, bq)
                        }
                        return false
                    }
                    bp.anchor.locked = false;
                    if (bA) {
                        bf.setDragScope(bC, bA)
                    }
                    var bv = proxyComponent.isDropAllowed(bx.sourceId, E(bn), bx.scope, bx, null);
                    if (bx.endpointsToDeleteOnDetach) {
                        if (bp === bx.endpointsToDeleteOnDetach[0]) {
                            bx.endpointsToDeleteOnDetach[0] = null
                        } else {
                            if (bp === bx.endpointsToDeleteOnDetach[1]) {
                                bx.endpointsToDeleteOnDetach[1] = null
                            }
                        }
                    }
                    if (bx.suspendedEndpoint) {
                        bx.targetId = bx.suspendedEndpoint.elementId;
                        bx.target = bf.getElementObject(bx.suspendedEndpoint.elementId);
                        bx.endpoints[1] = bx.suspendedEndpoint
                    }
                    if (bv) {
                        bp.detach(bx, false, true, false);
                        var bB = at[bl] || a0.addEndpoint(bn, a8);
                        if (a8.uniqueEndpoint) {
                            at[bl] = bB
                        }
                        bB._makeTargetCreator = true;
                        if (bB.anchor.positionFinder != null) {
                            var by = bf.getUIPosition(arguments, a0.getZoom()), bu = r(bn, a0), bz = a(bn), bt = bB.anchor.positionFinder(by, bu, bz, bB.anchor.constructorParams);
                            bB.anchor.x = bt[0];
                            bB.anchor.y = bt[1]
                        }
                        var bw = a0.connect({
                            source: bp,
                            target: bB,
                            scope: bA,
                            previousConnection: bx,
                            container: bx.parent,
                            deleteEndpointsOnDetach: bc,
                            endpointsToDeleteOnDetach: bc ? [bp, bB] : null,
                            doNotFireConnectionEvent: bp.endpointWillMoveAfterConnection
                        });
                        if (bx.endpoints[1]._makeTargetCreator && bx.endpoints[1].connections.length < 2) {
                            a0.deleteEndpoint(bx.endpoints[1])
                        }
                        bw.repaint()
                    } else {
                        if (bx.suspendedEndpoint) {
                            if (bx.isReattach()) {
                                bx.setHover(false);
                                bx.floatingAnchorIndex = null;
                                bx.suspendedEndpoint.addConnection(bx);
                                a0.repaint(bp.elementId)
                            } else {
                                bp.detach(bx, false, true, true, bq)
                            }
                        }
                    }
                };
                var bm = bf.dragEvents.drop;
                bk.scope = bk.scope || bg;
                bk[bm] = ae(bk[bm], bj);
                bf.initDroppable(bn, bk, true)
            };
            ba = au(ba);
            var be = ba.length && ba.constructor != String ? ba : [ba];
            for (var bd = 0, bh = be.length; bd < bh; bd++) {
                _doOne(e(be[bd]))
            }
            return a0
        };
        this.unmakeTarget = function (a8, a9) {
            a8 = n.CurrentLibrary.getElementObject(a8);
            var a7 = E(a8);
            if (!a9) {
                delete aI[a7];
                delete aW[a7];
                delete ag[a7];
                delete ac[a7]
            }
            return a0
        };
        this.makeTargets = function (a9, bb, a7) {
            for (var a8 = 0, ba = a9.length; a8 < ba; a8++) {
                a0.makeTarget(a9[a8], bb, a7)
            }
        };
        var ak = {}, aL = {}, aO = {}, V = {}, G = {}, J = {}, ac = {}, aD = function (a8, bd, a7) {
            var bb = a8.target || a8.srcElement, ba = false, bc = a0.getSelector(bd, a7);
            for (var a9 = 0; a9 < bc.length; a9++) {
                if (bc[a9] == bb) {
                    ba = true;
                    break
                }
            }
            return ba
        };
        this.makeSource = function (bb, bc, bh) {
            var a9 = n.extend({}, bh);
            n.extend(a9, bc);
            T(a9, 0);
            var bf = n.CurrentLibrary, ba = a9.maxConnections || -1, a8 = a9.onMaxConnections, a7 = function (bp) {
                var bj = E(bp), br = function () {
                    return a9.parent == null ? a9.parent : a9.parent === "parent" ? bf.getElementObject(bf.getDOMElement(bp).parentNode) : bf.getElementObject(a9.parent)
                }, bi = a9.parent != null ? a0.getId(br()) : bj;
                ak[bi] = a9;
                aO[bi] = a9.uniqueEndpoint;
                V[bi] = true;
                var bk = bf.dragEvents.stop, bo = bf.dragEvents.drag, bq = n.extend({}, a9.dragOptions || {}), bm = bq.drag, bs = bq.stop, bt = null, bn = false;
                J[bi] = ba;
                bq.scope = bq.scope || a9.scope;
                bq[bo] = ae(bq[bo], function () {
                    if (bm) {
                        bm.apply(this, arguments)
                    }
                    bn = false
                });
                bq[bk] = ae(bq[bk], function () {
                    if (bs) {
                        bs.apply(this, arguments)
                    }
                    a0.currentlyDragging = false;
                    if (bt.connections.length == 0) {
                        a0.deleteEndpoint(bt)
                    } else {
                        bf.unbind(bt.canvas, "mousedown");
                        var bv = a9.anchor || a0.Defaults.Anchor, bw = bt.anchor, by = bt.connections[0];
                        bt.setAnchor(a0.makeAnchor(bv, bj, a0));
                        if (a9.parent) {
                            var bx = br();
                            if (bx) {
                                var bu = bt.elementId, bz = a9.container || a0.Defaults.Container || n.Defaults.Container;
                                bt.setElement(bx, bz);
                                bt.endpointWillMoveAfterConnection = false;
                                a0.anchorManager.rehomeEndpoint(bu, bx);
                                by.previousConnection = null;
                                y(aH[by.scope], function (bA) {
                                    return bA.id === by.id
                                });
                                a0.anchorManager.connectionDetached({
                                    sourceId: by.sourceId,
                                    targetId: by.targetId,
                                    connection: by
                                });
                                a5(by)
                            }
                        }
                        bt.repaint();
                        a0.repaint(bt.elementId);
                        a0.repaint(by.targetId)
                    }
                });
                var bl = function (by) {
                    if (!V[bi]) {
                        return
                    }
                    if (a9.filter) {
                        var bF = bf.getOriginalEvent(by), bu = jsPlumbUtil.isString(a9.filter) ? aD(bF, bp, a9.filter) : a9.filter(bF, bp);
                        if (bu === false) {
                            return
                        }
                    }
                    var bw = a0.select({source: bi}).length;
                    if (J[bi] >= 0 && bw >= J[bi]) {
                        if (a8) {
                            a8({element: bp, maxConnections: ba}, by)
                        }
                        return false
                    }
                    var bD = Q({elId: bj}).o, bA = a0.getZoom(), bC = (((by.pageX || by.page.x) / bA) - bD.left) / bD.width, bB = (((by.pageY || by.page.y) / bA) - bD.top) / bD.height, bI = bC, bH = bB;
                    if (a9.parent) {
                        var bz = br(), bx = E(bz);
                        bD = Q({elId: bx}).o;
                        bI = ((by.pageX || by.page.x) - bD.left) / bD.width, bH = ((by.pageY || by.page.y) - bD.top) / bD.height
                    }
                    var bG = {};
                    n.extend(bG, a9);
                    bG.isSource = true;
                    bG.anchor = [bC, bB, 0, 0];
                    bG.parentAnchor = [bI, bH, 0, 0];
                    bG.dragOptions = bq;
                    if (a9.parent) {
                        var bv = bG.container || a0.Defaults.Container || n.Defaults.Container;
                        if (bv) {
                            bG.container = bv
                        } else {
                            bG.container = n.CurrentLibrary.getParent(br())
                        }
                    }
                    bt = a0.addEndpoint(bj, bG);
                    bn = true;
                    bt.endpointWillMoveAfterConnection = a9.parent != null;
                    bt.endpointWillMoveTo = a9.parent ? br() : null;
                    bt.addedViaMouse = true;
                    var bE = function () {
                        if (bn) {
                            a0.deleteEndpoint(bt)
                        }
                    };
                    a0.registerListener(bt.canvas, "mouseup", bE);
                    a0.registerListener(bp, "mouseup", bE);
                    bf.trigger(bt.canvas, "mousedown", by)
                };
                a0.registerListener(bp, "mousedown", bl);
                G[bj] = bl;
                if (a9.filter && jsPlumbUtil.isString(a9.filter)) {
                    bf.setDragFilter(bp, a9.filter)
                }
            };
            bb = au(bb);
            var be = bb.length && bb.constructor != String ? bb : [bb];
            for (var bd = 0, bg = be.length; bd < bg; bd++) {
                a7(e(be[bd]))
            }
            return a0
        };
        this.unmakeSource = function (a8, a9) {
            a8 = n.CurrentLibrary.getElementObject(a8);
            var ba = E(a8), a7 = G[ba];
            if (a7) {
                a0.unregisterListener(a8, "mousedown", a7)
            }
            if (!a9) {
                delete ak[ba];
                delete aO[ba];
                delete V[ba];
                delete G[ba];
                delete J[ba]
            }
            return a0
        };
        this.unmakeEverySource = function () {
            for (var a7 in V) {
                a0.unmakeSource(a7, true)
            }
            ak = {};
            aO = {};
            V = {};
            G = {}
        };
        this.unmakeEveryTarget = function () {
            for (var a7 in ac) {
                a0.unmakeTarget(a7, true)
            }
            aI = {};
            aW = {};
            ag = {};
            ac = {};
            return a0
        };
        this.makeSources = function (a9, bb, a7) {
            for (var a8 = 0, ba = a9.length; a8 < ba; a8++) {
                a0.makeSource(a9[a8], bb, a7)
            }
            return a0
        };
        var ax = function (bc, bb, bd, a7) {
            var a8 = bc == "source" ? V : ac;
            if (x(bb)) {
                a8[bb] = a7 ? !a8[bb] : bd
            } else {
                if (bb.length) {
                    bb = au(bb);
                    for (var a9 = 0, ba = bb.length; a9 < ba; a9++) {
                        var be = _el = n.CurrentLibrary.getElementObject(bb[a9]), be = E(_el);
                        a8[be] = a7 ? !a8[be] : bd
                    }
                }
            }
            return a0
        };
        this.setSourceEnabled = function (a7, a8) {
            return ax("source", a7, a8)
        };
        this.toggleSourceEnabled = function (a7) {
            ax("source", a7, null, true);
            return a0.isSourceEnabled(a7)
        };
        this.isSource = function (a7) {
            a7 = n.CurrentLibrary.getElementObject(a7);
            return V[E(a7)] != null
        };
        this.isSourceEnabled = function (a7) {
            a7 = n.CurrentLibrary.getElementObject(a7);
            return V[E(a7)] === true
        };
        this.setTargetEnabled = function (a7, a8) {
            return ax("target", a7, a8)
        };
        this.toggleTargetEnabled = function (a7) {
            ax("target", a7, null, true);
            return a0.isTargetEnabled(a7)
        };
        this.isTarget = function (a7) {
            a7 = n.CurrentLibrary.getElementObject(a7);
            return ac[E(a7)] != null
        };
        this.isTargetEnabled = function (a7) {
            a7 = n.CurrentLibrary.getElementObject(a7);
            return ac[E(a7)] === true
        };
        this.ready = function (a7) {
            a0.bind("ready", a7)
        };
        this.repaint = function (a9, bb, ba) {
            if (typeof a9 == "object" && a9.length) {
                for (var a7 = 0, a8 = a9.length; a7 < a8; a7++) {
                    aQ(e(a9[a7]), bb, ba)
                }
            } else {
                aQ(e(a9), bb, ba)
            }
            return a0
        };
        this.repaintEverything = function () {
            var a8 = null;
            for (var a7 in aC) {
                aQ(e(a7), null, a8)
            }
            return a0
        };
        this.removeAllEndpoints = function (a8, a9) {
            var a7 = function (bf) {
                var bb = jsPlumbUtil.isString(bf) ? bf : E(e(bf)), be = aC[bb];
                if (be) {
                    for (var bc = 0, bd = be.length; bc < bd; bc++) {
                        a0.deleteEndpoint(be[bc])
                    }
                }
                delete aC[bb];
                if (a9) {
                    var ba = n.CurrentLibrary.getDOMElement(e(bf));
                    if (ba && ba.nodeType != 3 && ba.nodeType != 8) {
                        for (var bc = 0, bd = ba.childNodes.length; bc < bd; bc++) {
                            a7(ba.childNodes[bc])
                        }
                    }
                }
            };
            a7(a8);
            return a0
        };
        this.remove = function (a7) {
            var a9 = e(a7);
            var a8 = jsPlumbUtil.isString(a7) ? a7 : E(a9);
            a0.doWhileSuspended(function () {
                a0.removeAllEndpoints(a8, true);
                a0.dragManager.elementRemoved(a8)
            });
            n.CurrentLibrary.removeElement(a9)
        };
        var Y = {}, aT = function () {
            for (var a8 in Y) {
                for (var a7 = 0, a9 = Y[a8].length; a7 < a9; a7++) {
                    var ba = Y[a8][a7];
                    n.CurrentLibrary.unbind(ba.el, ba.event, ba.listener)
                }
            }
            Y = {}
        };
        this.registerListener = function (a8, a7, a9) {
            n.CurrentLibrary.bind(a8, a7, a9);
            i(Y, a7, {el: a8, event: a7, listener: a9})
        };
        this.unregisterListener = function (a8, a7, a9) {
            n.CurrentLibrary.unbind(a8, a7, a9);
            y(Y, function (ba) {
                return ba.type == a7 && ba.listener == a9
            })
        };
        this.reset = function () {
            a0.deleteEveryEndpoint();
            a0.unbind();
            aI = {};
            at = {};
            aW = {};
            ag = {};
            ak = {};
            aL = {};
            aO = {};
            J = {};
            aT();
            a0.anchorManager.reset();
            if (!jsPlumbAdapter.headless) {
                a0.dragManager.reset()
            }
        };
        this.setDefaultScope = function (a7) {
            N = a7;
            return a0
        };
        this.setDraggable = aY;
        this.setId = function (a9, ba, be) {
            var a7 = a9.constructor == String ? a9 : a0.getId(a9), a8 = a0.getConnections({
                source: a7,
                scope: "*"
            }, true), bc = a0.getConnections({target: a7, scope: "*"}, true);
            ba = "" + ba;
            if (!be) {
                a9 = n.CurrentLibrary.getElementObject(a7);
                n.CurrentLibrary.setAttribute(a9, "id", ba)
            }
            a9 = n.CurrentLibrary.getElementObject(ba);
            aC[ba] = aC[a7] || [];
            for (var bd = 0, bf = aC[ba].length; bd < bf; bd++) {
                aC[ba][bd].setElementId(ba);
                aC[ba][bd].setReferenceElement(a9)
            }
            delete aC[a7];
            a0.anchorManager.changeId(a7, ba);
            if (!jsPlumbAdapter.headless) {
                a0.dragManager.changeId(a7, ba)
            }
            var bb = function (bk, bg, bj) {
                for (var bh = 0, bi = bk.length; bh < bi; bh++) {
                    bk[bh].endpoints[bg].setElementId(ba);
                    bk[bh].endpoints[bg].setReferenceElement(a9);
                    bk[bh][bj + "Id"] = ba;
                    bk[bh][bj] = a9
                }
            };
            bb(a8, 0, "source");
            bb(bc, 1, "target");
            a0.repaint(ba)
        };
        this.setIdChanged = function (a8, a7) {
            a0.setId(a8, a7, true)
        };
        this.setDebugLog = function (a7) {
            K = a7
        };
        var aM = false, aP = null;
        this.setSuspendDrawing = function (a8, a7) {
            aM = a8;
            if (a8) {
                aP = new Date().getTime()
            } else {
                aP = null
            }
            if (a7) {
                a0.repaintEverything()
            }
        };
        this.isSuspendDrawing = function () {
            return aM
        };
        this.getSuspendedAt = function () {
            return aP
        };
        this.doWhileSuspended = function (a8, a7) {
            a0.setSuspendDrawing(true);
            try {
                a8()
            } catch (a9) {
                o("Function run while suspended failed", a9)
            }
            a0.setSuspendDrawing(false, !a7)
        };
        this.updateOffset = Q;
        this.getOffset = function (a7) {
            return aa[a7]
        };
        this.getSize = function (a7) {
            return X[a7]
        };
        this.getCachedData = ay;
        this.timestamp = p;
        this.SVG = "svg";
        this.CANVAS = "canvas";
        this.VML = "vml";
        this.setRenderMode = function (a7) {
            R = jsPlumbAdapter.setRenderMode(a7);
            return R
        };
        this.getRenderMode = function () {
            return R
        };
        this.show = function (a7, a8) {
            aK(a7, "block", a8);
            return a0
        };
        this.sizeCanvas = function (a9, a7, bb, a8, ba) {
            if (a9) {
                a9.style.height = ba + "px";
                a9.height = ba;
                a9.style.width = a8 + "px";
                a9.width = a8;
                a9.style.left = a7 + "px";
                a9.style.top = bb + "px"
            }
            return a0
        };
        this.getTestHarness = function () {
            return {
                endpointsByElement: aC, endpointCount: function (a7) {
                    var a8 = aC[a7];
                    return a8 ? a8.length : 0
                }, connectionCount: function (a7) {
                    a7 = a7 || N;
                    var a8 = aH[a7];
                    return a8 ? a8.length : 0
                }, getId: E, makeAnchor: self.makeAnchor, makeDynamicAnchor: self.makeDynamicAnchor
            }
        };
        this.toggleVisible = aA;
        this.toggleDraggable = aX;
        this.wrap = ae;
        this.addListener = this.bind;
        this.adjustForParentOffsetAndScroll = function (bc, a9) {
            var ba = null, a7 = bc;
            if (a9.tagName.toLowerCase() === "svg" && a9.parentNode) {
                ba = a9.parentNode
            } else {
                if (a9.offsetParent) {
                    ba = a9.offsetParent
                }
            }
            if (ba != null) {
                var a8 = ba.tagName.toLowerCase() === "body" ? {
                    left: 0,
                    top: 0
                } : r(ba, a0), bb = ba.tagName.toLowerCase() === "body" ? {left: 0, top: 0} : {
                    left: ba.scrollLeft,
                    top: ba.scrollTop
                };
                a7[0] = bc[0] - a8.left + bb.left;
                a7[1] = bc[1] - a8.top + bb.top
            }
            return a7
        };
        if (!jsPlumbAdapter.headless) {
            a0.dragManager = jsPlumbAdapter.getDragManager(a0);
            a0.recalculateOffsets = a0.dragManager.updateOffsets
        }
    };
    var n = new u();
    if (typeof window != "undefined") {
        window.jsPlumb = n
    }
    n.getInstance = function (F) {
        var E = new u(F);
        E.init();
        return E
    };
    if (typeof define === "function") {
        define("jsplumb", [], function () {
            return n
        });
        define("jsplumbinstance", [], function () {
            return n.getInstance()
        })
    }
    if (typeof exports !== "undefined") {
        exports.jsPlumb = n
    }
})();
(function () {
    jsPlumb.AnchorManager = function (w) {
        var e = {}, r = {}, u = {}, m = {}, y = {}, v = {
            HORIZONTAL: "horizontal",
            VERTICAL: "vertical",
            DIAGONAL: "diagonal",
            IDENTITY: "identity"
        }, g = {}, o = this, h = {}, p = w.jsPlumbInstance, f = jsPlumb.CurrentLibrary, n = {}, k = function (K, L, G, C, H, A) {
            if (K === L) {
                return {orientation: v.IDENTITY, a: ["top", "top"]}
            }
            var B = Math.atan2((C.centery - G.centery), (C.centerx - G.centerx)), F = Math.atan2((G.centery - C.centery), (G.centerx - C.centerx)), E = ((G.left <= C.left && G.right >= C.left) || (G.left <= C.right && G.right >= C.right) || (G.left <= C.left && G.right >= C.right) || (C.left <= G.left && C.right >= G.right)), J = ((G.top <= C.top && G.bottom >= C.top) || (G.top <= C.bottom && G.bottom >= C.bottom) || (G.top <= C.top && G.bottom >= C.bottom) || (C.top <= G.top && C.bottom >= G.bottom)), I = function (M) {
                return [H.isContinuous ? H.verifyEdge(M[0]) : M[0], A.isContinuous ? A.verifyEdge(M[1]) : M[1]]
            }, D = {orientation: v.DIAGONAL, theta: B, theta2: F};
            if (!(E || J)) {
                if (C.left > G.left && C.top > G.top) {
                    D.a = ["right", "top"]
                } else {
                    if (C.left > G.left && G.top > C.top) {
                        D.a = ["top", "left"]
                    } else {
                        if (C.left < G.left && C.top < G.top) {
                            D.a = ["top", "right"]
                        } else {
                            if (C.left < G.left && C.top > G.top) {
                                D.a = ["left", "top"]
                            }
                        }
                    }
                }
            } else {
                if (E) {
                    D.orientation = v.HORIZONTAL;
                    D.a = G.top < C.top ? ["bottom", "top"] : ["top", "bottom"]
                } else {
                    D.orientation = v.VERTICAL;
                    D.a = G.left < C.left ? ["right", "left"] : ["left", "right"]
                }
            }
            D.a = I(D.a);
            return D
        }, z = function (O, K, I, J, P, L, C) {
            var Q = [], B = K[P ? 0 : 1] / (J.length + 1);
            for (var M = 0; M < J.length; M++) {
                var R = (M + 1) * B, A = L * K[P ? 1 : 0];
                if (C) {
                    R = K[P ? 0 : 1] - R
                }
                var H = (P ? R : A), E = I[0] + H, G = H / K[0], F = (P ? A : R), D = I[1] + F, N = F / K[1];
                Q.push([E, D, G, N, J[M][1], J[M][2]])
            }
            return Q
        }, x = function (A) {
            return function (C, B) {
                var D = true;
                if (A) {
                    D = C[0][0] < B[0][0]
                } else {
                    D = C[0][0] > B[0][0]
                }
                return D === false ? -1 : 1
            }
        }, c = function (B, A) {
            var D = B[0][0] < 0 ? -Math.PI - B[0][0] : Math.PI - B[0][0], C = A[0][0] < 0 ? -Math.PI - A[0][0] : Math.PI - A[0][0];
            if (D > C) {
                return 1
            } else {
                return B[0][1] > A[0][1] ? 1 : -1
            }
        }, s = {
            top: function (B, A) {
                return B[0] > A[0] ? 1 : -1
            }, right: x(true), bottom: x(true), left: c
        }, q = function (A, B) {
            return A.sort(B)
        }, i = function (B, A) {
            var F = p.getCachedData(B), D = F.s, E = F.o, C = function (M, T, I, L, R, Q, H) {
                if (L.length > 0) {
                    var P = q(L, s[M]), N = M === "right" || M === "top", G = z(M, T, I, P, R, Q, N);
                    var U = function (X, W) {
                        var V = p.adjustForParentOffsetAndScroll([W[0], W[1]], X.canvas);
                        u[X.id] = [V[0], V[1], W[2], W[3]];
                        y[X.id] = H
                    };
                    for (var J = 0; J < G.length; J++) {
                        var O = G[J][4], S = O.endpoints[0].elementId === B, K = O.endpoints[1].elementId === B;
                        if (S) {
                            U(O.endpoints[0], G[J])
                        } else {
                            if (K) {
                                U(O.endpoints[1], G[J])
                            }
                        }
                    }
                }
            };
            C("bottom", D, [E.left, E.top], A.bottom, true, 1, [0, 1]);
            C("top", D, [E.left, E.top], A.top, true, 0, [0, -1]);
            C("left", D, [E.left, E.top], A.left, false, 0, [-1, 0]);
            C("right", D, [E.left, E.top], A.right, false, 1, [1, 0])
        };
        this.reset = function () {
            e = {};
            g = {};
            h = {}
        };
        this.addFloatingConnection = function (A, B) {
            n[A] = B
        };
        this.removeFloatingConnection = function (A) {
            delete n[A]
        };
        this.newConnection = function (D) {
            var F = D.sourceId, C = D.targetId, A = D.endpoints, E = true, B = function (G, H, J, I, K) {
                if ((F == C) && J.isContinuous) {
                    f.removeElement(A[1].canvas);
                    E = false
                }
                jsPlumbUtil.addToList(g, I, [K, H, J.constructor == jsPlumb.DynamicAnchor])
            };
            B(0, A[0], A[0].anchor, C, D);
            if (E) {
                B(1, A[1], A[1].anchor, F, D)
            }
        };
        var d = function (A) {
            (function (D, B) {
                if (D) {
                    var C = function (E) {
                        return E[4] == B
                    };
                    jsPlumbUtil.removeWithFunction(D.top, C);
                    jsPlumbUtil.removeWithFunction(D.left, C);
                    jsPlumbUtil.removeWithFunction(D.bottom, C);
                    jsPlumbUtil.removeWithFunction(D.right, C)
                }
            })(h[A.elementId], A.id)
        };
        this.connectionDetached = function (F) {
            var B = F.connection || F, E = F.sourceId, C = F.targetId, A = B.endpoints, D = function (G, H, J, I, K) {
                if (J.constructor == jsPlumb.FloatingAnchor) {
                } else {
                    jsPlumbUtil.removeWithFunction(g[I], function (L) {
                        return L[0].id == K.id
                    })
                }
            };
            D(1, A[1], A[1].anchor, E, B);
            D(0, A[0], A[0].anchor, C, B);
            d(B.endpoints[0]);
            d(B.endpoints[1]);
            o.redraw(B.sourceId);
            o.redraw(B.targetId)
        };
        this.add = function (B, A) {
            jsPlumbUtil.addToList(e, A, B)
        };
        this.changeId = function (B, A) {
            g[A] = g[B];
            e[A] = e[B];
            delete g[B];
            delete e[B]
        };
        this.getConnectionsFor = function (A) {
            return g[A] || []
        };
        this.getEndpointsFor = function (A) {
            return e[A] || []
        };
        this.deleteEndpoint = function (A) {
            jsPlumbUtil.removeWithFunction(e[A.elementId], function (B) {
                return B.id == A.id
            });
            d(A)
        };
        this.clearFor = function (A) {
            delete e[A];
            e[A] = []
        };
        var l = function (U, H, P, E, K, L, N, J, W, M, D, T) {
            var R = -1, C = -1, F = E.endpoints[N], O = F.id, I = [1, 0][N], A = [[H, P], E, K, L, O], B = U[W], V = F._continuousAnchorEdge ? U[F._continuousAnchorEdge] : null;
            if (V) {
                var S = jsPlumbUtil.findWithFunction(V, function (X) {
                    return X[4] == O
                });
                if (S != -1) {
                    V.splice(S, 1);
                    for (var Q = 0; Q < V.length; Q++) {
                        jsPlumbUtil.addWithFunction(D, V[Q][1], function (X) {
                            return X.id == V[Q][1].id
                        });
                        jsPlumbUtil.addWithFunction(T, V[Q][1].endpoints[N], function (X) {
                            return X.id == V[Q][1].endpoints[N].id
                        });
                        jsPlumbUtil.addWithFunction(T, V[Q][1].endpoints[I], function (X) {
                            return X.id == V[Q][1].endpoints[I].id
                        })
                    }
                }
            }
            for (var Q = 0; Q < B.length; Q++) {
                if (w.idx == 1 && B[Q][3] === L && C == -1) {
                    C = Q
                }
                jsPlumbUtil.addWithFunction(D, B[Q][1], function (X) {
                    return X.id == B[Q][1].id
                });
                jsPlumbUtil.addWithFunction(T, B[Q][1].endpoints[N], function (X) {
                    return X.id == B[Q][1].endpoints[N].id
                });
                jsPlumbUtil.addWithFunction(T, B[Q][1].endpoints[I], function (X) {
                    return X.id == B[Q][1].endpoints[I].id
                })
            }
            if (R != -1) {
                B[R] = A
            } else {
                var G = J ? C != -1 ? C : 0 : B.length;
                B.splice(G, 0, A)
            }
            F._continuousAnchorEdge = W
        };
        this.redraw = function (O, R, C, F, W) {
            if (!p.isSuspendDrawing()) {
                var ab = e[O] || [], aa = g[O] || [], B = [], Z = [], D = [];
                C = C || p.timestamp();
                F = F || {left: 0, top: 0};
                if (R) {
                    R = {left: R.left + F.left, top: R.top + F.top}
                }
                var J = p.updateOffset({elId: O, offset: R, recalc: false, timestamp: C}), L = {};
                for (var X = 0; X < aa.length; X++) {
                    var G = aa[X][0], I = G.sourceId, E = G.targetId, H = G.endpoints[0].anchor.isContinuous, N = G.endpoints[1].anchor.isContinuous;
                    if (H || N) {
                        var Y = I + "_" + E, U = E + "_" + I, T = L[Y], M = G.sourceId == O ? 1 : 0;
                        if (H && !h[I]) {
                            h[I] = {top: [], right: [], bottom: [], left: []}
                        }
                        if (N && !h[E]) {
                            h[E] = {top: [], right: [], bottom: [], left: []}
                        }
                        if (O != E) {
                            p.updateOffset({elId: E, timestamp: C})
                        }
                        if (O != I) {
                            p.updateOffset({elId: I, timestamp: C})
                        }
                        var K = p.getCachedData(E), A = p.getCachedData(I);
                        if (E == I && (H || N)) {
                            l(h[I], -Math.PI / 2, 0, G, false, E, 0, false, "top", I, B, Z)
                        } else {
                            if (!T) {
                                T = k(I, E, A.o, K.o, G.endpoints[0].anchor, G.endpoints[1].anchor);
                                L[Y] = T
                            }
                            if (H) {
                                l(h[I], T.theta, 0, G, false, E, 0, false, T.a[0], I, B, Z)
                            }
                            if (N) {
                                l(h[E], T.theta2, -1, G, true, I, 1, true, T.a[1], E, B, Z)
                            }
                        }
                        if (H) {
                            jsPlumbUtil.addWithFunction(D, I, function (ac) {
                                return ac === I
                            })
                        }
                        if (N) {
                            jsPlumbUtil.addWithFunction(D, E, function (ac) {
                                return ac === E
                            })
                        }
                        jsPlumbUtil.addWithFunction(B, G, function (ac) {
                            return ac.id == G.id
                        });
                        if ((H && M == 0) || (N && M == 1)) {
                            jsPlumbUtil.addWithFunction(Z, G.endpoints[M], function (ac) {
                                return ac.id == G.endpoints[M].id
                            })
                        }
                    }
                }
                for (var X = 0; X < ab.length; X++) {
                    if (ab[X].connections.length == 0 && ab[X].anchor.isContinuous) {
                        if (!h[O]) {
                            h[O] = {top: [], right: [], bottom: [], left: []}
                        }
                        l(h[O], -Math.PI / 2, 0, {
                            endpoints: [ab[X], ab[X]], paint: function () {
                            }
                        }, false, O, 0, false, "top", O, B, Z);
                        jsPlumbUtil.addWithFunction(D, O, function (ac) {
                            return ac === O
                        })
                    }
                }
                for (var X = 0; X < D.length; X++) {
                    i(D[X], h[D[X]])
                }
                for (var X = 0; X < ab.length; X++) {
                    ab[X].paint({timestamp: C, offset: J, dimensions: J.s})
                }
                for (var X = 0; X < Z.length; X++) {
                    var Q = p.getCachedData(Z[X].elementId);
                    Z[X].paint({timestamp: C, offset: Q, dimensions: Q.s})
                }
                for (var X = 0; X < aa.length; X++) {
                    var P = aa[X][1];
                    if (P.anchor.constructor == jsPlumb.DynamicAnchor) {
                        P.paint({elementWithPrecedence: O});
                        jsPlumbUtil.addWithFunction(B, aa[X][0], function (ac) {
                            return ac.id == aa[X][0].id
                        });
                        for (var V = 0; V < P.connections.length; V++) {
                            if (P.connections[V] !== aa[X][0]) {
                                jsPlumbUtil.addWithFunction(B, P.connections[V], function (ac) {
                                    return ac.id == P.connections[V].id
                                })
                            }
                        }
                    } else {
                        if (P.anchor.constructor == jsPlumb.Anchor) {
                            jsPlumbUtil.addWithFunction(B, aa[X][0], function (ac) {
                                return ac.id == aa[X][0].id
                            })
                        }
                    }
                }
                var S = n[O];
                if (S) {
                    S.paint({timestamp: C, recalc: false, elId: O})
                }
                for (var X = 0; X < B.length; X++) {
                    B[X].paint({elId: O, timestamp: C, recalc: false, clearEdits: W})
                }
            }
        };
        this.rehomeEndpoint = function (A, E) {
            var B = e[A] || [], C = p.getId(E);
            if (C !== A) {
                for (var D = 0; D < B.length; D++) {
                    o.add(B[D], C)
                }
                B.splice(0, B.length)
            }
        };
        var t = function (C) {
            jsPlumbUtil.EventGenerator.apply(this);
            this.type = "Continuous";
            this.isDynamic = true;
            this.isContinuous = true;
            var F = C.faces || ["top", "right", "bottom", "left"], B = !(C.clockwise === false), K = {}, I = {
                top: "bottom",
                right: "left",
                left: "right",
                bottom: "top"
            }, E = {top: "right", right: "bottom", left: "top", bottom: "left"}, G = {
                top: "left",
                right: "top",
                left: "bottom",
                bottom: "right"
            }, D = B ? E : G, A = B ? G : E, J = C.cssClass || "";
            for (var H = 0; H < F.length; H++) {
                K[F[H]] = true
            }
            this.verifyEdge = function (L) {
                if (K[L]) {
                    return L
                } else {
                    if (K[I[L]]) {
                        return I[L]
                    } else {
                        if (K[D[L]]) {
                            return D[L]
                        } else {
                            if (K[A[L]]) {
                                return A[L]
                            }
                        }
                    }
                }
                return L
            };
            this.compute = function (L) {
                return m[L.element.id] || u[L.element.id] || [0, 0]
            };
            this.getCurrentLocation = function (L) {
                return m[L.id] || u[L.id] || [0, 0]
            };
            this.getOrientation = function (L) {
                return y[L.id] || [0, 0]
            };
            this.clearUserDefinedLocation = function () {
                delete m[C.elementId]
            };
            this.setUserDefinedLocation = function (L) {
                m[C.elementId] = L
            };
            this.getCssClass = function () {
                return J
            };
            this.setCssClass = function (L) {
                J = L
            }
        };
        p.continuousAnchorFactory = {
            get: function (B) {
                var A = r[B.elementId];
                if (!A) {
                    A = new t(B);
                    r[B.elementId] = A
                }
                return A
            }
        }
    };
    jsPlumb.Anchor = function (k) {
        var h = this;
        this.x = k.x || 0;
        this.y = k.y || 0;
        this.elementId = k.elementId;
        jsPlumbUtil.EventGenerator.apply(this);
        var g = k.orientation || [0, 0], f = k.jsPlumbInstance, i = null, e = null, d = null, c = k.cssClass || "";
        this.getCssClass = function () {
            return c
        };
        this.offsets = k.offsets || [0, 0];
        h.timestamp = null;
        this.compute = function (p) {
            var o = p.xy, l = p.wh, m = p.element, n = p.timestamp;
            if (p.clearUserDefinedLocation) {
                d = null
            }
            if (n && n === h.timestamp) {
                return e
            }
            if (d != null) {
                e = d
            } else {
                e = [o[0] + (h.x * l[0]) + h.offsets[0], o[1] + (h.y * l[1]) + h.offsets[1]];
                e = f.adjustForParentOffsetAndScroll(e, m.canvas)
            }
            h.timestamp = n;
            return e
        };
        this.getOrientation = function (l) {
            return g
        };
        this.equals = function (l) {
            if (!l) {
                return false
            }
            var m = l.getOrientation();
            var n = this.getOrientation();
            return this.x == l.x && this.y == l.y && this.offsets[0] == l.offsets[0] && this.offsets[1] == l.offsets[1] && n[0] == m[0] && n[1] == m[1]
        };
        this.getCurrentLocation = function () {
            return e
        };
        this.getUserDefinedLocation = function () {
            return d
        };
        this.setUserDefinedLocation = function (m) {
            d = m
        };
        this.clearUserDefinedLocation = function () {
            d = null
        }
    };
    jsPlumb.FloatingAnchor = function (e) {
        jsPlumb.Anchor.apply(this, arguments);
        var d = e.reference, f = jsPlumb.CurrentLibrary, h = e.jsPlumbInstance, i = e.referenceCanvas, l = f.getSize(f.getElementObject(i)), m = 0, g = 0, c = null, k = null;
        this.x = 0;
        this.y = 0;
        this.isFloating = true;
        this.compute = function (q) {
            var p = q.xy, o = q.element, n = [p[0] + (l[0] / 2), p[1] + (l[1] / 2)];
            n = h.adjustForParentOffsetAndScroll(n, o.canvas);
            k = n;
            return n
        };
        this.getOrientation = function (p) {
            if (c) {
                return c
            } else {
                var n = d.getOrientation(p);
                return [Math.abs(n[0]) * m * -1, Math.abs(n[1]) * g * -1]
            }
        };
        this.over = function (n) {
            c = n.getOrientation()
        };
        this.out = function () {
            c = null
        };
        this.getCurrentLocation = function () {
            return k
        }
    };
    jsPlumb.DynamicAnchor = function (g) {
        jsPlumb.Anchor.apply(this, arguments);
        this.isSelective = true;
        this.isDynamic = true;
        var n = [], m = this, l = function (i) {
            return i.constructor == jsPlumb.Anchor ? i : g.jsPlumbInstance.makeAnchor(i, g.elementId, g.jsPlumbInstance)
        };
        for (var k = 0; k < g.anchors.length; k++) {
            n[k] = l(g.anchors[k])
        }
        this.addAnchor = function (i) {
            n.push(l(i))
        };
        this.getAnchors = function () {
            return n
        };
        this.locked = false;
        var d = n.length > 0 ? n[0] : null, f = n.length > 0 ? 0 : -1, h = d, m = this, e = function (t, q, p, u, o) {
            var i = u[0] + (t.x * o[0]), v = u[1] + (t.y * o[1]), s = u[0] + (o[0] / 2), r = u[1] + (o[1] / 2);
            return (Math.sqrt(Math.pow(q - i, 2) + Math.pow(p - v, 2)) + Math.sqrt(Math.pow(s - i, 2) + Math.pow(r - v, 2)))
        }, c = g.selector || function (y, p, q, r, o) {
                var t = q[0] + (r[0] / 2), s = q[1] + (r[1] / 2);
                var v = -1, x = Infinity;
                for (var u = 0; u < o.length; u++) {
                    var w = e(o[u], t, s, y, p);
                    if (w < x) {
                        v = u + 0;
                        x = w
                    }
                }
                return o[v]
            };
        this.compute = function (s) {
            var r = s.xy, i = s.wh, p = s.timestamp, o = s.txy, t = s.twh;
            if (s.clearUserDefinedLocation) {
                userDefinedLocation = null
            }
            var q = m.getUserDefinedLocation();
            if (q != null) {
                return q
            }
            if (m.locked || o == null || t == null) {
                return d.compute(s)
            } else {
                s.timestamp = null
            }
            d = c(r, i, o, t, n);
            m.x = d.x;
            m.y = d.y;
            if (d != h) {
                m.fire("anchorChanged", d)
            }
            h = d;
            return d.compute(s)
        };
        this.getCurrentLocation = function () {
            return m.getUserDefinedLocation() || (d != null ? d.getCurrentLocation() : null)
        };
        this.getOrientation = function (i) {
            return d != null ? d.getOrientation(i) : [0, 0]
        };
        this.over = function (i) {
            if (d != null) {
                d.over(i)
            }
        };
        this.out = function () {
            if (d != null) {
                d.out()
            }
        };
        this.getCssClass = function () {
            return (d && d.getCssClass()) || ""
        }
    };
    var b = function (c, h, e, d, g, f) {
        jsPlumb.Anchors[g] = function (k) {
            var i = k.jsPlumbInstance.makeAnchor([c, h, e, d, 0, 0], k.elementId, k.jsPlumbInstance);
            i.type = g;
            if (f) {
                f(i, k)
            }
            return i
        }
    };
    b(0.5, 0, 0, -1, "TopCenter");
    b(0.5, 1, 0, 1, "BottomCenter");
    b(0, 0.5, -1, 0, "LeftMiddle");
    b(1, 0.5, 1, 0, "RightMiddle");
    b(0.5, 0, 0, -1, "Top");
    b(0.5, 1, 0, 1, "Bottom");
    b(0, 0.5, -1, 0, "Left");
    b(1, 0.5, 1, 0, "Right");
    b(0.5, 0.5, 0, 0, "Center");
    b(1, 0, 0, -1, "TopRight");
    b(1, 1, 0, 1, "BottomRight");
    b(0, 0, 0, -1, "TopLeft");
    b(0, 1, 0, 1, "BottomLeft");
    jsPlumb.Defaults.DynamicAnchors = function (c) {
        return c.jsPlumbInstance.makeAnchors(["TopCenter", "RightMiddle", "BottomCenter", "LeftMiddle"], c.elementId, c.jsPlumbInstance)
    };
    jsPlumb.Anchors.AutoDefault = function (d) {
        var c = d.jsPlumbInstance.makeDynamicAnchor(jsPlumb.Defaults.DynamicAnchors(d));
        c.type = "AutoDefault";
        return c
    };
    var a = function (d, c) {
        jsPlumb.Anchors[d] = function (f) {
            var e = f.jsPlumbInstance.makeAnchor(["Continuous", {faces: c}], f.elementId, f.jsPlumbInstance);
            e.type = d;
            return e
        }
    };
    jsPlumb.Anchors.Continuous = function (c) {
        return c.jsPlumbInstance.continuousAnchorFactory.get(c)
    };
    a("ContinuousLeft", ["left"]);
    a("ContinuousTop", ["top"]);
    a("ContinuousBottom", ["bottom"]);
    a("ContinuousRight", ["right"]);
    jsPlumb.Anchors.Assign = b(0, 0, 0, 0, "Assign", function (d, e) {
        var c = e.position || "Fixed";
        d.positionFinder = c.constructor == String ? e.jsPlumbInstance.AnchorPositionFinders[c] : c;
        d.constructorParams = e
    });
    jsPlumb.AnchorPositionFinders = {
        Fixed: function (f, c, e, d) {
            return [(f.left - c.left) / e[0], (f.top - c.top) / e[1]]
        }, Grid: function (c, m, g, d) {
            var l = c.left - m.left, k = c.top - m.top, i = g[0] / (d.grid[0]), h = g[1] / (d.grid[1]), f = Math.floor(l / i), e = Math.floor(k / h);
            return [((f * i) + (i / 2)) / g[0], ((e * h) + (h / 2)) / g[1]]
        }
    };
    jsPlumb.Anchors.Perimeter = function (c) {
        c = c || {};
        var d = c.anchorCount || 60, g = c.shape;
        if (!g) {
            throw new Error("no shape supplied to Perimeter Anchor type")
        }
        var e = function () {
            var t = 0.5, s = Math.PI * 2 / d, u = 0, p = [];
            for (var q = 0; q < d; q++) {
                var o = t + (t * Math.sin(u)), v = t + (t * Math.cos(u));
                p.push([o, v, 0, 0]);
                u += s
            }
            return p
        }, h = function (q) {
            var s = d / q.length, o = [], p = function (w, z, v, y, A) {
                s = d * A;
                var u = (v - w) / s, t = (y - z) / s;
                for (var x = 0; x < s; x++) {
                    o.push([w + (u * x), z + (t * x), 0, 0])
                }
            };
            for (var r = 0; r < q.length; r++) {
                p.apply(null, q[r])
            }
            return o
        }, l = function (o) {
            var q = [];
            for (var p = 0; p < o.length; p++) {
                q.push([o[p][0], o[p][1], o[p][2], o[p][3], 1 / o.length])
            }
            return h(q)
        }, i = function () {
            return l([[0, 0, 1, 0], [1, 0, 1, 1], [1, 1, 0, 1], [0, 1, 0, 0]])
        };
        var f = {
            Circle: e, Ellipse: e, Diamond: function () {
                return l([[0.5, 0, 1, 0.5], [1, 0.5, 0.5, 1], [0.5, 1, 0, 0.5], [0, 0.5, 0.5, 0]])
            }, Rectangle: i, Square: i, Triangle: function () {
                return l([[0.5, 0, 1, 1], [1, 1, 0, 1], [0, 1, 0.5, 0]])
            }, Path: function (u) {
                var s = u.points, t = [], q = 0;
                for (var r = 0; r < s.length - 1; r++) {
                    var o = Math.sqrt(Math.pow(s[r][2] - s[r][0]) + Math.pow(s[r][3] - s[r][1]));
                    q += o;
                    t.push([s[r][0], s[r][1], s[r + 1][0], s[r + 1][1], o])
                }
                for (var r = 0; r < t.length; r++) {
                    t[r][4] = t[r][4] / q
                }
                return h(t)
            }
        }, m = function (u, t) {
            var v = [], s = t / 180 * Math.PI;
            for (var r = 0; r < u.length; r++) {
                var q = u[r][0] - 0.5, p = u[r][1] - 0.5;
                v.push([0.5 + ((q * Math.cos(s)) - (p * Math.sin(s))), 0.5 + ((q * Math.sin(s)) + (p * Math.cos(s))), u[r][2], u[r][3]])
            }
            return v
        };
        if (!f[g]) {
            throw new Error("Shape [" + g + "] is unknown by Perimeter Anchor type")
        }
        var n = f[g](c);
        if (c.rotation) {
            n = m(n, c.rotation)
        }
        var k = c.jsPlumbInstance.makeDynamicAnchor(n);
        k.type = "Perimeter";
        return k
    }
})();
(function () {
    var c = function (g, e) {
        var f = false;
        return {
            drag: function () {
                if (f) {
                    f = false;
                    return true
                }
                var h = jsPlumb.CurrentLibrary.getUIPosition(arguments, e.getZoom());
                if (g.element) {
                    jsPlumb.CurrentLibrary.setOffset(g.element, h);
                    e.repaint(g.element, h)
                }
            }, stopDrag: function () {
                f = true
            }
        }
    };
    var a = function (h, f, e) {
        var k = document.createElement("div");
        k.style.position = "absolute";
        var g = jsPlumb.CurrentLibrary.getElementObject(k);
        jsPlumb.CurrentLibrary.appendElement(k, f);
        var i = e.getId(g);
        e.updateOffset({elId: i});
        h.id = i;
        h.element = g
    };
    var d = function (l, k, m, i, g, f, e) {
        var h = new jsPlumb.FloatingAnchor({reference: k, referenceCanvas: i, jsPlumbInstance: f});
        return e({paintStyle: l, endpoint: m, anchor: h, source: g, scope: "__floating"})
    };
    var b = ["connectorStyle", "connectorHoverStyle", "connectorOverlays", "connector", "connectionType", "connectorClass", "connectorHoverClass"];
    jsPlumb.Endpoint = function (h) {
        var r = this, t = h._jsPlumb, k = jsPlumb.CurrentLibrary, H = k.getAttribute, Z = k.getElementObject, q = jsPlumbUtil, g = k.getOffset, Y = h.newConnection, P = h.newEndpoint, W = h.finaliseConnection, X = h.fireDetachEvent, B = h.floatingConnections;
        r.idPrefix = "_jsplumb_e_";
        r.defaultLabelLocation = [0.5, 0.5];
        r.defaultOverlayKeys = ["Overlays", "EndpointOverlays"];
        this.parent = h.parent;
        overlayCapableJsPlumbUIComponent.apply(this, arguments);
        h = h || {};
        this.getTypeDescriptor = function () {
            return "endpoint"
        };
        this.getDefaultType = function () {
            return {
                parameters: {},
                scope: null,
                maxConnections: r._jsPlumb.Defaults.MaxConnections,
                paintStyle: r._jsPlumb.Defaults.EndpointStyle || jsPlumb.Defaults.EndpointStyle,
                endpoint: r._jsPlumb.Defaults.Endpoint || jsPlumb.Defaults.Endpoint,
                hoverPaintStyle: r._jsPlumb.Defaults.EndpointHoverStyle || jsPlumb.Defaults.EndpointHoverStyle,
                overlays: r._jsPlumb.Defaults.EndpointOverlays || jsPlumb.Defaults.EndpointOverlays,
                connectorStyle: h.connectorStyle,
                connectorHoverStyle: h.connectorHoverStyle,
                connectorClass: h.connectorClass,
                connectorHoverClass: h.connectorHoverClass,
                connectorOverlays: h.connectorOverlays,
                connector: h.connector,
                connectorTooltip: h.connectorTooltip
            }
        };
        var Q = this.applyType;
        this.applyType = function (i, ab) {
            Q(i, ab);
            if (i.maxConnections != null) {
                L = i.maxConnections
            }
            if (i.scope) {
                r.scope = i.scope
            }
            q.copyValues(b, i, r)
        };
        var z = true, l = !(h.enabled === false);
        this.isVisible = function () {
            return z
        };
        this.setVisible = function (ac, af, ab) {
            z = ac;
            if (r.canvas) {
                r.canvas.style.display = ac ? "block" : "none"
            }
            r[ac ? "showOverlays" : "hideOverlays"]();
            if (!af) {
                for (var ae = 0; ae < r.connections.length; ae++) {
                    r.connections[ae].setVisible(ac);
                    if (!ab) {
                        var ad = r === r.connections[ae].endpoints[0] ? 1 : 0;
                        if (r.connections[ae].endpoints[ad].connections.length == 1) {
                            r.connections[ae].endpoints[ad].setVisible(ac, true, true)
                        }
                    }
                }
            }
        };
        this.isEnabled = function () {
            return l
        };
        this.setEnabled = function (i) {
            l = i
        };
        var I = h.source, o = h.uuid, f = null, J = null;
        if (o) {
            h.endpointsByUUID[o] = r
        }
        var V = H(I, "id");
        this.elementId = V;
        this.element = I;
        r.setElementId = function (i) {
            V = i;
            r.elementId = i;
            r.anchor.elementId = i
        };
        r.setReferenceElement = function (i) {
            I = i;
            r.element = i
        };
        var e = h.connectionCost;
        this.getConnectionCost = function () {
            return e
        };
        this.setConnectionCost = function (i) {
            e = i
        };
        var K = h.connectionsDirected;
        this.areConnectionsDirected = function () {
            return K
        };
        this.setConnectionsDirected = function (i) {
            K = i
        };
        var E = "", M = function () {
            k.removeClass(I, t.endpointAnchorClassPrefix + "_" + E);
            r.removeClass(t.endpointAnchorClassPrefix + "_" + E);
            E = r.anchor.getCssClass();
            r.addClass(t.endpointAnchorClassPrefix + "_" + E);
            k.addClass(I, t.endpointAnchorClassPrefix + "_" + E)
        };
        this.setAnchor = function (i, ab) {
            r.anchor = t.makeAnchor(i, V, t);
            M();
            r.anchor.bind("anchorChanged", function (ac) {
                r.fire("anchorChanged", {endpoint: r, anchor: ac});
                M()
            });
            if (!ab) {
                t.repaint(V)
            }
        };
        this.cleanup = function () {
            k.removeClass(I, t.endpointAnchorClassPrefix + "_" + E)
        };
        var O = h.anchor ? h.anchor : h.anchors ? h.anchors : (t.Defaults.Anchor || "Top");
        r.setAnchor(O, true);
        if (!h._transient) {
            t.anchorManager.add(r, V)
        }
        var U = null, R = null;
        this.setEndpoint = function (ab) {
            var i = function (ae, ag) {
                var af = t.getRenderMode();
                if (jsPlumb.Endpoints[af][ae]) {
                    return new jsPlumb.Endpoints[af][ae](ag)
                }
                if (!t.Defaults.DoNotThrowErrors) {
                    throw {msg: "jsPlumb: unknown endpoint type '" + ae + "'"}
                }
            };
            var ac = {
                _jsPlumb: r._jsPlumb,
                cssClass: h.cssClass,
                parent: h.parent,
                container: h.container,
                tooltip: h.tooltip,
                connectorTooltip: h.connectorTooltip,
                endpoint: r
            };
            if (q.isString(ab)) {
                U = i(ab, ac)
            } else {
                if (q.isArray(ab)) {
                    ac = q.merge(ab[1], ac);
                    U = i(ab[0], ac)
                } else {
                    U = ab.clone()
                }
            }
            var ad = jsPlumb.extend({}, ac);
            U.clone = function () {
                var ae = new Object();
                U.constructor.apply(ae, [ad]);
                return ae
            };
            r.endpoint = U;
            r.type = r.endpoint.type
        };
        this.setEndpoint(h.endpoint || t.Defaults.Endpoint || jsPlumb.Defaults.Endpoint || "Dot");
        R = U;
        var v = r.setHover;
        r.setHover = function () {
            r.endpoint.setHover.apply(r.endpoint, arguments);
            v.apply(r, arguments)
        };
        var G = function (i) {
            if (r.connections.length > 0) {
                r.connections[0].setHover(i, false)
            } else {
                r.setHover(i)
            }
        };
        r.bindListeners(r.endpoint, r, G);
        this.setPaintStyle(h.paintStyle || h.style || t.Defaults.EndpointStyle || jsPlumb.Defaults.EndpointStyle, true);
        this.setHoverPaintStyle(h.hoverPaintStyle || t.Defaults.EndpointHoverStyle || jsPlumb.Defaults.EndpointHoverStyle, true);
        this.paintStyleInUse = this.getPaintStyle();
        var w = this.getPaintStyle();
        q.copyValues(b, h, this);
        this.isSource = h.isSource || false;
        this.isTarget = h.isTarget || false;
        var L = h.maxConnections || t.Defaults.MaxConnections;
        this.getAttachedElements = function () {
            return r.connections
        };
        this.canvas = this.endpoint.canvas;
        r.addClass(t.endpointAnchorClassPrefix + "_" + E);
        k.addClass(I, t.endpointAnchorClassPrefix + "_" + E);
        this.connections = h.connections || [];
        this.connectorPointerEvents = h["connector-pointer-events"];
        this.scope = h.scope || t.getDefaultScope();
        this.timestamp = null;
        r.reattachConnections = h.reattach || t.Defaults.ReattachConnections;
        r.connectionsDetachable = t.Defaults.ConnectionsDetachable;
        if (h.connectionsDetachable === false || h.detachable === false) {
            r.connectionsDetachable = false
        }
        var D = h.dragAllowedWhenFull || true;
        if (h.onMaxConnections) {
            r.bind("maxConnections", h.onMaxConnections)
        }
        this.computeAnchor = function (i) {
            return r.anchor.compute(i)
        };
        this.addConnection = function (i) {
            r.connections.push(i);
            r[(r.connections.length > 0 ? "add" : "remove") + "Class"](t.endpointConnectedClass);
            r[(r.isFull() ? "add" : "remove") + "Class"](t.endpointFullClass)
        };
        this.detach = function (ac, ag, ad, aj, ab) {
            var ai = q.findWithFunction(r.connections, function (i) {
                return i.id == ac.id
            }), ah = false;
            aj = (aj !== false);
            if (ai >= 0) {
                if (ad || ac._forceDetach || ac.isDetachable() || ac.isDetachAllowed(ac)) {
                    var ak = ac.endpoints[0] == r ? ac.endpoints[1] : ac.endpoints[0];
                    if (ad || ac._forceDetach || (r.isDetachAllowed(ac))) {
                        r.connections.splice(ai, 1);
                        if (!ag) {
                            ak.detach(ac, true, ad);
                            if (ac.endpointsToDeleteOnDetach) {
                                for (var af = 0; af < ac.endpointsToDeleteOnDetach.length; af++) {
                                    var ae = ac.endpointsToDeleteOnDetach[af];
                                    if (ae && ae.connections.length == 0) {
                                        t.deleteEndpoint(ae)
                                    }
                                }
                            }
                        }
                        if (ac.getConnector() != null) {
                            q.removeElements(ac.getConnector().getDisplayElements(), ac.parent)
                        }
                        q.removeWithFunction(h.connectionsByScope[ac.scope], function (i) {
                            return i.id == ac.id
                        });
                        r[(r.connections.length > 0 ? "add" : "remove") + "Class"](t.endpointConnectedClass);
                        r[(r.isFull() ? "add" : "remove") + "Class"](t.endpointFullClass);
                        ah = true;
                        X(ac, (!ag && aj), ab)
                    }
                }
            }
            return ah
        };
        this.detachAll = function (ab, i) {
            while (r.connections.length > 0) {
                r.detach(r.connections[0], false, true, ab, i)
            }
            return r
        };
        this.detachFrom = function (ae, ad, ab) {
            var af = [];
            for (var ac = 0; ac < r.connections.length; ac++) {
                if (r.connections[ac].endpoints[1] == ae || r.connections[ac].endpoints[0] == ae) {
                    af.push(r.connections[ac])
                }
            }
            for (var ac = 0; ac < af.length; ac++) {
                if (r.detach(af[ac], false, true, ad, ab)) {
                    af[ac].setHover(false, false)
                }
            }
            return r
        };
        this.detachFromConnection = function (ab) {
            var i = q.findWithFunction(r.connections, function (ac) {
                return ac.id == ab.id
            });
            if (i >= 0) {
                r.connections.splice(i, 1);
                r[(r.connections.length > 0 ? "add" : "remove") + "Class"](t.endpointConnectedClass);
                r[(r.isFull() ? "add" : "remove") + "Class"](t.endpointFullClass)
            }
        };
        this.getElement = function () {
            return I
        };
        this.setElement = function (ae, ab) {
            var ag = t.getId(ae);
            q.removeWithFunction(h.endpointsByElement[r.elementId], function (i) {
                return i.id == r.id
            });
            I = Z(ae);
            V = t.getId(I);
            r.elementId = V;
            var af = h.getParentFromParams({source: ag, container: ab}), ad = k.getParent(r.canvas);
            k.removeElement(r.canvas, ad);
            k.appendElement(r.canvas, af);
            for (var ac = 0; ac < r.connections.length; ac++) {
                r.connections[ac].moveParent(af);
                r.connections[ac].sourceId = V;
                r.connections[ac].source = I
            }
            q.addToList(h.endpointsByElement, ag, r)
        };
        this.getUuid = function () {
            return o
        };
        r.makeInPlaceCopy = function () {
            var ad = r.anchor.getCurrentLocation(r), ac = r.anchor.getOrientation(r), ab = r.anchor.getCssClass(), i = {
                bind: function () {
                }, compute: function () {
                    return [ad[0], ad[1]]
                }, getCurrentLocation: function () {
                    return [ad[0], ad[1]]
                }, getOrientation: function () {
                    return ac
                }, getCssClass: function () {
                    return ab
                }
            };
            return P({
                anchor: i,
                source: I,
                paintStyle: this.getPaintStyle(),
                endpoint: h.hideOnDrag ? "Blank" : U,
                _transient: true,
                scope: r.scope
            })
        };
        this.isConnectedTo = function (ad) {
            var ac = false;
            if (ad) {
                for (var ab = 0; ab < r.connections.length; ab++) {
                    if (r.connections[ab].endpoints[1] == ad) {
                        ac = true;
                        break
                    }
                }
            }
            return ac
        };
        this.isFloating = function () {
            return f != null
        };
        this.connectorSelector = function () {
            var i = r.connections[0];
            if (r.isTarget && i) {
                return i
            } else {
                return (r.connections.length < L) || L == -1 ? null : i
            }
        };
        this.isFull = function () {
            return !(r.isFloating() || L < 1 || r.connections.length < L)
        };
        this.setDragAllowedWhenFull = function (i) {
            D = i
        };
        this.setStyle = r.setPaintStyle;
        this.equals = function (i) {
            return this.anchor.equals(i.anchor)
        };
        var C = function (ac) {
            var ab = 0;
            if (ac != null) {
                for (var ad = 0; ad < r.connections.length; ad++) {
                    if (r.connections[ad].sourceId == ac || r.connections[ad].targetId == ac) {
                        ab = ad;
                        break
                    }
                }
            }
            return r.connections[ab]
        };
        this.paint = function (af) {
            af = af || {};
            var al = af.timestamp, ak = !(af.recalc === false);
            if (!al || r.timestamp !== al) {
                var ae = t.updateOffset({elId: V, timestamp: al, recalc: ak});
                var at = af.offset ? af.offset.o : ae.o;
                if (at) {
                    var ai = af.anchorPoint, ag = af.connectorPaintStyle;
                    if (ai == null) {
                        var ab = af.dimensions || ae.s;
                        if (at == null || ab == null) {
                            ae = t.updateOffset({elId: V, timestamp: al});
                            at = ae.o;
                            ab = ae.s
                        }
                        var ad = {xy: [at.left, at.top], wh: ab, element: r, timestamp: al};
                        if (ak && r.anchor.isDynamic && r.connections.length > 0) {
                            var an = C(af.elementWithPrecedence), ar = an.endpoints[0] == r ? 1 : 0, ah = ar == 0 ? an.sourceId : an.targetId, aq = t.getCachedData(ah), am = aq.o, ao = aq.s;
                            ad.txy = [am.left, am.top];
                            ad.twh = ao;
                            ad.tElement = an.endpoints[ar]
                        }
                        ai = r.anchor.compute(ad)
                    }
                    U.compute(ai, r.anchor.getOrientation(r), r.paintStyleInUse, ag || r.paintStyleInUse);
                    U.paint(r.paintStyleInUse, r.anchor);
                    r.timestamp = al;
                    for (var aj = 0; aj < r.overlays.length; aj++) {
                        var ac = r.overlays[aj];
                        if (ac.isVisible()) {
                            r.overlayPlacements[aj] = ac.draw(r.endpoint, r.paintStyleInUse);
                            ac.paint(r.overlayPlacements[aj])
                        }
                    }
                }
            }
        };
        this.repaint = this.paint;
        if (k.isDragSupported(I)) {
            var aa = {id: null, element: null}, m = null, s = false, x = null, y = c(aa, t);
            var A = function () {
                m = r.connectorSelector();
                var i = true;
                if (!r.isEnabled()) {
                    i = false
                }
                if (m == null && !h.isSource) {
                    i = false
                }
                if (h.isSource && r.isFull() && !D) {
                    i = false
                }
                if (m != null && !m.isDetachable()) {
                    i = false
                }
                if (i === false) {
                    if (k.stopDrag) {
                        k.stopDrag()
                    }
                    y.stopDrag();
                    return false
                }
                r.addClass("endpointDrag");
                if (m && !r.isFull() && h.isSource) {
                    m = null
                }
                t.updateOffset({elId: V});
                J = r.makeInPlaceCopy();
                J.referenceEndpoint = r;
                J.paint();
                a(aa, r.parent, t);
                var ah = Z(J.canvas), af = g(ah, t), ac = t.adjustForParentOffsetAndScroll([af.left, af.top], J.canvas), ab = Z(r.canvas);
                k.setOffset(aa.element, {left: ac[0], top: ac[1]});
                if (r.parentAnchor) {
                    r.anchor = t.makeAnchor(r.parentAnchor, r.elementId, t)
                }
                k.setAttribute(ab, "dragId", aa.id);
                k.setAttribute(ab, "elId", V);
                f = d(r.getPaintStyle(), r.anchor, U, r.canvas, aa.element, t, P);
                r.canvas.style.visibility = "hidden";
                if (m == null) {
                    r.anchor.locked = true;
                    r.setHover(false, false);
                    m = Y({
                        sourceEndpoint: r,
                        targetEndpoint: f,
                        source: r.endpointWillMoveTo || I,
                        target: aa.element,
                        anchors: [r.anchor, f.anchor],
                        paintStyle: h.connectorStyle,
                        hoverPaintStyle: h.connectorHoverStyle,
                        connector: h.connector,
                        overlays: h.connectorOverlays,
                        type: r.connectionType,
                        cssClass: r.connectorClass,
                        hoverClass: r.connectorHoverClass
                    });
                    m.addClass(t.draggingClass);
                    f.addClass(t.draggingClass);
                    t.fire("connectionDrag", m)
                } else {
                    s = true;
                    m.setHover(false);
                    p(ah, false, true);
                    var ae = m.endpoints[0].id == r.id ? 0 : 1;
                    m.floatingAnchorIndex = ae;
                    r.detachFromConnection(m);
                    var ag = jsPlumb.CurrentLibrary.getDragScope(ab);
                    k.setAttribute(ab, "originalScope", ag);
                    var ad = k.getDropScope(ab);
                    k.setDragScope(ab, ad);
                    if (ae == 0) {
                        x = [m.source, m.sourceId, S, ag];
                        m.source = aa.element;
                        m.sourceId = aa.id
                    } else {
                        x = [m.target, m.targetId, S, ag];
                        m.target = aa.element;
                        m.targetId = aa.id
                    }
                    m.endpoints[ae == 0 ? 1 : 0].anchor.locked = true;
                    m.suspendedEndpoint = m.endpoints[ae];
                    m.suspendedElement = m.endpoints[ae].getElement();
                    m.suspendedElementId = m.endpoints[ae].elementId;
                    m.suspendedElementType = ae == 0 ? "source" : "target";
                    m.suspendedEndpoint.setHover(false);
                    f.referenceEndpoint = m.suspendedEndpoint;
                    m.endpoints[ae] = f;
                    m.addClass(t.draggingClass);
                    f.addClass(t.draggingClass);
                    t.fire("connectionDrag", m)
                }
                B[aa.id] = m;
                t.anchorManager.addFloatingConnection(aa.id, m);
                f.addConnection(m);
                q.addToList(h.endpointsByElement, aa.id, f);
                t.currentlyDragging = true
            };
            var n = h.dragOptions || {}, u = jsPlumb.extend({}, k.defaultDragOptions), N = k.dragEvents.start, T = k.dragEvents.stop, F = k.dragEvents.drag;
            n = jsPlumb.extend(u, n);
            n.scope = n.scope || r.scope;
            n[N] = t.wrap(n[N], A);
            n[F] = t.wrap(n[F], y.drag);
            n[T] = t.wrap(n[T], function () {
                var ab = k.getDropEvent(arguments);
                q.removeWithFunction(h.endpointsByElement[aa.id], function (ac) {
                    return ac.id == f.id
                });
                q.removeElement(J.canvas, I);
                t.anchorManager.clearFor(aa.id);
                var i = m.floatingAnchorIndex == null ? 1 : m.floatingAnchorIndex;
                m.endpoints[i == 0 ? 1 : 0].anchor.locked = false;
                if (m.endpoints[i] == f) {
                    if (s && m.suspendedEndpoint) {
                        if (i == 0) {
                            m.source = x[0];
                            m.sourceId = x[1]
                        } else {
                            m.target = x[0];
                            m.targetId = x[1]
                        }
                        k.setDragScope(x[2], x[3]);
                        m.endpoints[i] = m.suspendedEndpoint;
                        if (m.isReattach() || m._forceReattach || m._forceDetach || !m.endpoints[i == 0 ? 1 : 0].detach(m, false, false, true, ab)) {
                            m.setHover(false);
                            m.floatingAnchorIndex = null;
                            m.suspendedEndpoint.addConnection(m);
                            t.repaint(x[1])
                        }
                        m._forceDetach = null;
                        m._forceReattach = null
                    } else {
                        q.removeElements(m.getConnector().getDisplayElements(), r.parent);
                        r.detachFromConnection(m)
                    }
                }
                q.removeElements([aa.element[0], f.canvas], I);
                t.dragManager.elementRemoved(f.elementId);
                r.canvas.style.visibility = "visible";
                r.anchor.locked = false;
                r.paint({recalc: false});
                m.removeClass(t.draggingClass);
                f.removeClass(t.draggingClass);
                t.fire("connectionDragStop", m);
                m = null;
                J = null;
                delete h.endpointsByElement[f.elementId];
                f.anchor = null;
                f = null;
                t.currentlyDragging = false
            });
            var S = Z(r.canvas);
            k.initDraggable(S, n, true, t)
        }
        var p = function (ac, ah, af, ai) {
            if ((h.isTarget || ah) && k.isDropSupported(I)) {
                var ad = h.dropOptions || t.Defaults.DropOptions || jsPlumb.Defaults.DropOptions;
                ad = jsPlumb.extend({}, ad);
                ad.scope = ad.scope || r.scope;
                var ab = k.dragEvents.drop, ag = k.dragEvents.over, i = k.dragEvents.out, ae = function () {
                    r.removeClass(t.endpointDropAllowedClass);
                    r.removeClass(t.endpointDropForbiddenClass);
                    var aj = k.getDropEvent(arguments), ax = Z(k.getDragObject(arguments)), al = H(ax, "dragId"), an = H(ax, "elId"), aw = H(ax, "originalScope"), aq = B[al];
                    var ao = aq.suspendedEndpoint && (aq.suspendedEndpoint.id == r.id || r.referenceEndpoint && aq.suspendedEndpoint.id == r.referenceEndpoint.id);
                    if (ao) {
                        aq._forceReattach = true;
                        return
                    }
                    if (aq != null) {
                        var at = aq.floatingAnchorIndex == null ? 1 : aq.floatingAnchorIndex, au = at == 0 ? 1 : 0;
                        if (aw) {
                            jsPlumb.CurrentLibrary.setDragScope(ax, aw)
                        }
                        var av = ai != null ? ai.isEnabled() : true;
                        if (r.isFull()) {
                            r.fire("maxConnections", {endpoint: r, connection: aq, maxConnections: L}, aj)
                        }
                        if (!r.isFull() && !(at == 0 && !r.isSource) && !(at == 1 && !r.isTarget) && av) {
                            var ap = true;
                            if (aq.suspendedEndpoint && aq.suspendedEndpoint.id != r.id) {
                                if (at == 0) {
                                    aq.source = aq.suspendedEndpoint.element;
                                    aq.sourceId = aq.suspendedEndpoint.elementId
                                } else {
                                    aq.target = aq.suspendedEndpoint.element;
                                    aq.targetId = aq.suspendedEndpoint.elementId
                                }
                                if (!aq.isDetachAllowed(aq) || !aq.endpoints[at].isDetachAllowed(aq) || !aq.suspendedEndpoint.isDetachAllowed(aq) || !t.checkCondition("beforeDetach", aq)) {
                                    ap = false
                                }
                            }
                            if (at == 0) {
                                aq.source = r.element;
                                aq.sourceId = r.elementId
                            } else {
                                aq.target = r.element;
                                aq.targetId = r.elementId
                            }
                            var ar = function () {
                                aq.floatingAnchorIndex = null
                            };
                            var ak = function () {
                                aq.endpoints[at].detachFromConnection(aq);
                                if (aq.suspendedEndpoint) {
                                    aq.suspendedEndpoint.detachFromConnection(aq)
                                }
                                aq.endpoints[at] = r;
                                r.addConnection(aq);
                                var aB = r.getParameters();
                                for (var az in aB) {
                                    aq.setParameter(az, aB[az])
                                }
                                if (!aq.suspendedEndpoint) {
                                    if (aB.draggable) {
                                        jsPlumb.CurrentLibrary.initDraggable(r.element, n, true, t)
                                    }
                                } else {
                                    var aA = aq.suspendedEndpoint.getElement(), ay = aq.suspendedEndpoint.elementId;
                                    X({
                                        source: at == 0 ? aA : aq.source,
                                        target: at == 1 ? aA : aq.target,
                                        sourceId: at == 0 ? ay : aq.sourceId,
                                        targetId: at == 1 ? ay : aq.targetId,
                                        sourceEndpoint: at == 0 ? aq.suspendedEndpoint : aq.endpoints[0],
                                        targetEndpoint: at == 1 ? aq.suspendedEndpoint : aq.endpoints[1],
                                        connection: aq
                                    }, true, aj)
                                }
                                if (aq.endpoints[0].addedViaMouse) {
                                    aq.endpointsToDeleteOnDetach[0] = aq.endpoints[0]
                                }
                                if (aq.endpoints[1].addedViaMouse) {
                                    aq.endpointsToDeleteOnDetach[1] = aq.endpoints[1]
                                }
                                W(aq, null, aj);
                                ar()
                            };
                            var am = function () {
                                if (aq.suspendedEndpoint) {
                                    aq.endpoints[at] = aq.suspendedEndpoint;
                                    aq.setHover(false);
                                    aq._forceDetach = true;
                                    if (at == 0) {
                                        aq.source = aq.suspendedEndpoint.element;
                                        aq.sourceId = aq.suspendedEndpoint.elementId
                                    } else {
                                        aq.target = aq.suspendedEndpoint.element;
                                        aq.targetId = aq.suspendedEndpoint.elementId
                                    }
                                    aq.suspendedEndpoint.addConnection(aq);
                                    aq.endpoints[0].repaint();
                                    aq.repaint();
                                    t.repaint(aq.sourceId);
                                    aq._forceDetach = false
                                }
                                ar()
                            };
                            ap = ap && r.isDropAllowed(aq.sourceId, aq.targetId, aq.scope, aq, r);
                            if (ap) {
                                ak()
                            } else {
                                am()
                            }
                        }
                        t.currentlyDragging = false;
                        delete B[al];
                        t.anchorManager.removeFloatingConnection(al)
                    }
                };
                ad[ab] = t.wrap(ad[ab], ae);
                ad[ag] = t.wrap(ad[ag], function () {
                    var ak = k.getDragObject(arguments), ao = H(Z(ak), "dragId"), an = B[ao];
                    if (an != null) {
                        var aj = an.floatingAnchorIndex == null ? 1 : an.floatingAnchorIndex;
                        var am = (r.isTarget && an.floatingAnchorIndex != 0) || (an.suspendedEndpoint && r.referenceEndpoint && r.referenceEndpoint.id == an.suspendedEndpoint.id);
                        if (am) {
                            var al = t.checkCondition("checkDropAllowed", {
                                sourceEndpoint: an.endpoints[aj],
                                targetEndpoint: r,
                                connection: an
                            });
                            r[(al ? "add" : "remove") + "Class"](t.endpointDropAllowedClass);
                            r[(al ? "remove" : "add") + "Class"](t.endpointDropForbiddenClass);
                            an.endpoints[aj].anchor.over(r.anchor)
                        }
                    }
                });
                ad[i] = t.wrap(ad[i], function () {
                    var ak = k.getDragObject(arguments), an = H(Z(ak), "dragId"), am = B[an];
                    if (am != null) {
                        var aj = am.floatingAnchorIndex == null ? 1 : am.floatingAnchorIndex;
                        var al = (r.isTarget && am.floatingAnchorIndex != 0) || (am.suspendedEndpoint && r.referenceEndpoint && r.referenceEndpoint.id == am.suspendedEndpoint.id);
                        if (al) {
                            r.removeClass(t.endpointDropAllowedClass);
                            r.removeClass(t.endpointDropForbiddenClass);
                            am.endpoints[aj].anchor.out()
                        }
                    }
                });
                k.initDroppable(ac, ad, true, af)
            }
        };
        p(Z(r.canvas), true, !(h._transient || r.anchor.isFloating), r);
        if (h.type) {
            r.addType(h.type, h.data, t.isSuspendDrawing())
        }
        return r
    }
})();
(function () {
    jsPlumb.Connection = function (b) {
        var l = this, r = true, L, G, o = b._jsPlumb, f = jsPlumb.CurrentLibrary, w = f.getAttribute, K = f.getElementObject, i = jsPlumbUtil, a = f.getOffset, J = b.newConnection, E = b.newEndpoint, d = null;
        l.idPrefix = "_jsplumb_c_";
        l.defaultLabelLocation = 0.5;
        l.defaultOverlayKeys = ["Overlays", "ConnectionOverlays"];
        this.parent = b.parent;
        overlayCapableJsPlumbUIComponent.apply(this, arguments);
        this.isVisible = function () {
            return r
        };
        this.setVisible = function (O) {
            r = O;
            l[O ? "showOverlays" : "hideOverlays"]();
            if (d && d.canvas) {
                d.canvas.style.display = O ? "block" : "none"
            }
            l.repaint()
        };
        var y = b.editable === true;
        this.setEditable = function (O) {
            if (d && d.isEditable()) {
                y = O
            }
            return y
        };
        this.isEditable = function () {
            return y
        };
        this.editStarted = function () {
            l.fire("editStarted", {path: d.getPath()});
            o.setHoverSuspended(true)
        };
        this.editCompleted = function () {
            l.fire("editCompleted", {path: d.getPath()});
            l.setHover(false);
            o.setHoverSuspended(false)
        };
        this.editCanceled = function () {
            l.fire("editCanceled", {path: d.getPath()});
            l.setHover(false);
            o.setHoverSuspended(false)
        };
        var m = this.addClass, z = this.removeClass;
        this.addClass = function (P, O) {
            m(P);
            if (O) {
                l.endpoints[0].addClass(P);
                l.endpoints[1].addClass(P)
            }
        };
        this.removeClass = function (P, O) {
            z(P);
            if (O) {
                l.endpoints[0].removeClass(P);
                l.endpoints[1].removeClass(P)
            }
        };
        this.getTypeDescriptor = function () {
            return "connection"
        };
        this.getDefaultType = function () {
            return {
                parameters: {},
                scope: null,
                detachable: l._jsPlumb.Defaults.ConnectionsDetachable,
                rettach: l._jsPlumb.Defaults.ReattachConnections,
                paintStyle: l._jsPlumb.Defaults.PaintStyle || jsPlumb.Defaults.PaintStyle,
                connector: l._jsPlumb.Defaults.Connector || jsPlumb.Defaults.Connector,
                hoverPaintStyle: l._jsPlumb.Defaults.HoverPaintStyle || jsPlumb.Defaults.HoverPaintStyle,
                overlays: l._jsPlumb.Defaults.ConnectorOverlays || jsPlumb.Defaults.ConnectorOverlays
            }
        };
        var F = this.applyType;
        this.applyType = function (O, P) {
            F(O, P);
            if (O.detachable != null) {
                l.setDetachable(O.detachable)
            }
            if (O.reattach != null) {
                l.setReattach(O.reattach)
            }
            if (O.scope) {
                l.scope = O.scope
            }
            y = O.editable;
            l.setConnector(O.connector, P)
        };
        G = l.setHover;
        l.setHover = function (O) {
            d.setHover.apply(d, arguments);
            G.apply(l, arguments)
        };
        L = function (O) {
            if (!o.isConnectionBeingDragged()) {
                l.setHover(O, false)
            }
        };
        var B = function (O, R, Q) {
            var P = new Object();
            if (!o.Defaults.DoNotThrowErrors && jsPlumb.Connectors[R] == null) {
                throw {msg: "jsPlumb: unknown connector type '" + R + "'"}
            }
            jsPlumb.Connectors[R].apply(P, [Q]);
            jsPlumb.ConnectorRenderers[O].apply(P, [Q]);
            return P
        };
        this.setConnector = function (Q, O) {
            if (d != null) {
                i.removeElements(d.getDisplayElements())
            }
            var R = {
                _jsPlumb: l._jsPlumb,
                parent: b.parent,
                cssClass: b.cssClass,
                container: b.container,
                tooltip: l.tooltip,
                "pointer-events": b["pointer-events"]
            }, P = o.getRenderMode();
            if (i.isString(Q)) {
                d = B(P, Q, R)
            } else {
                if (i.isArray(Q)) {
                    if (Q.length == 1) {
                        d = B(P, Q[0], R)
                    } else {
                        d = B(P, Q[0], i.merge(Q[1], R))
                    }
                }
            }
            l.bindListeners(d, l, L);
            l.canvas = d.canvas;
            if (y && jsPlumb.ConnectorEditors != null && jsPlumb.ConnectorEditors[d.type] && d.isEditable()) {
                new jsPlumb.ConnectorEditors[d.type]({connector: d, connection: l, params: b.editorParams || {}})
            } else {
                y = false
            }
            if (!O) {
                l.repaint()
            }
        };
        this.getConnector = function () {
            return d
        };
        this.source = K(b.source);
        this.target = K(b.target);
        if (b.sourceEndpoint) {
            this.source = b.sourceEndpoint.endpointWillMoveTo || b.sourceEndpoint.getElement()
        }
        if (b.targetEndpoint) {
            this.target = b.targetEndpoint.getElement()
        }
        l.previousConnection = b.previousConnection;
        this.sourceId = w(this.source, "id");
        this.targetId = w(this.target, "id");
        this.scope = b.scope;
        this.endpoints = [];
        this.endpointStyles = [];
        var x = function (P, O) {
            return (P) ? o.makeAnchor(P, O, o) : null
        }, A = function (O, U, P, R, S, Q, T) {
            var V;
            if (O) {
                l.endpoints[U] = O;
                O.addConnection(l)
            } else {
                if (!P.endpoints) {
                    P.endpoints = [null, null]
                }
                var aa = P.endpoints[U] || P.endpoint || o.Defaults.Endpoints[U] || jsPlumb.Defaults.Endpoints[U] || o.Defaults.Endpoint || jsPlumb.Defaults.Endpoint;
                if (!P.endpointStyles) {
                    P.endpointStyles = [null, null]
                }
                if (!P.endpointHoverStyles) {
                    P.endpointHoverStyles = [null, null]
                }
                var Y = P.endpointStyles[U] || P.endpointStyle || o.Defaults.EndpointStyles[U] || jsPlumb.Defaults.EndpointStyles[U] || o.Defaults.EndpointStyle || jsPlumb.Defaults.EndpointStyle;
                if (Y.fillStyle == null && Q != null) {
                    Y.fillStyle = Q.strokeStyle
                }
                if (Y.outlineColor == null && Q != null) {
                    Y.outlineColor = Q.outlineColor
                }
                if (Y.outlineWidth == null && Q != null) {
                    Y.outlineWidth = Q.outlineWidth
                }
                var X = P.endpointHoverStyles[U] || P.endpointHoverStyle || o.Defaults.EndpointHoverStyles[U] || jsPlumb.Defaults.EndpointHoverStyles[U] || o.Defaults.EndpointHoverStyle || jsPlumb.Defaults.EndpointHoverStyle;
                if (T != null) {
                    if (X == null) {
                        X = {}
                    }
                    if (X.fillStyle == null) {
                        X.fillStyle = T.strokeStyle
                    }
                }
                var W = P.anchors ? P.anchors[U] : P.anchor ? P.anchor : x(o.Defaults.Anchors[U], S) || x(jsPlumb.Defaults.Anchors[U], S) || x(o.Defaults.Anchor, S) || x(jsPlumb.Defaults.Anchor, S), Z = P.uuids ? P.uuids[U] : null;
                V = E({
                    paintStyle: Y,
                    hoverPaintStyle: X,
                    endpoint: aa,
                    connections: [l],
                    uuid: Z,
                    anchor: W,
                    source: R,
                    scope: P.scope,
                    container: P.container,
                    reattach: P.reattach || o.Defaults.ReattachConnections,
                    detachable: P.detachable || o.Defaults.ConnectionsDetachable
                });
                l.endpoints[U] = V;
                if (P.drawEndpoints === false) {
                    V.setVisible(false, true, true)
                }
            }
            return V
        };
        var h = A(b.sourceEndpoint, 0, b, l.source, l.sourceId, b.paintStyle, b.hoverPaintStyle);
        if (h) {
            i.addToList(b.endpointsByElement, this.sourceId, h)
        }
        var g = A(b.targetEndpoint, 1, b, l.target, l.targetId, b.paintStyle, b.hoverPaintStyle);
        if (g) {
            i.addToList(b.endpointsByElement, this.targetId, g)
        }
        if (!this.scope) {
            this.scope = this.endpoints[0].scope
        }
        l.endpointsToDeleteOnDetach = [null, null];
        if (b.deleteEndpointsOnDetach) {
            if (b.sourceIsNew) {
                l.endpointsToDeleteOnDetach[0] = l.endpoints[0]
            }
            if (b.targetIsNew) {
                l.endpointsToDeleteOnDetach[1] = l.endpoints[1]
            }
        }
        if (b.endpointsToDeleteOnDetach) {
            l.endpointsToDeleteOnDetach = b.endpointsToDeleteOnDetach
        }
        l.setConnector(this.endpoints[0].connector || this.endpoints[1].connector || b.connector || o.Defaults.Connector || jsPlumb.Defaults.Connector, true);
        if (b.path) {
            d.setPath(b.path)
        }
        this.setPaintStyle(this.endpoints[0].connectorStyle || this.endpoints[1].connectorStyle || b.paintStyle || o.Defaults.PaintStyle || jsPlumb.Defaults.PaintStyle, true);
        this.setHoverPaintStyle(this.endpoints[0].connectorHoverStyle || this.endpoints[1].connectorHoverStyle || b.hoverPaintStyle || o.Defaults.HoverPaintStyle || jsPlumb.Defaults.HoverPaintStyle, true);
        this.paintStyleInUse = this.getPaintStyle();
        var t = o.getSuspendedAt();
        o.updateOffset({elId: this.sourceId, timestamp: t});
        o.updateOffset({elId: this.targetId, timestamp: t});
        if (!o.isSuspendDrawing()) {
            var H = o.getCachedData(this.sourceId), e = H.o, u = H.s, p = o.getCachedData(this.targetId), n = p.o, C = p.s, M = t || o.timestamp(), k = this.endpoints[0].anchor.compute({
                xy: [e.left, e.top],
                wh: u,
                element: this.endpoints[0],
                elementId: this.endpoints[0].elementId,
                txy: [n.left, n.top],
                twh: C,
                tElement: this.endpoints[1],
                timestamp: M
            });
            this.endpoints[0].paint({anchorLoc: k, timestamp: M});
            k = this.endpoints[1].anchor.compute({
                xy: [n.left, n.top],
                wh: C,
                element: this.endpoints[1],
                elementId: this.endpoints[1].elementId,
                txy: [e.left, e.top],
                twh: u,
                tElement: this.endpoints[0],
                timestamp: M
            });
            this.endpoints[1].paint({anchorLoc: k, timestamp: M})
        }
        var q = o.Defaults.ConnectionsDetachable;
        if (b.detachable === false) {
            q = false
        }
        if (l.endpoints[0].connectionsDetachable === false) {
            q = false
        }
        if (l.endpoints[1].connectionsDetachable === false) {
            q = false
        }
        this.isDetachable = function () {
            return q === true
        };
        this.setDetachable = function (O) {
            q = O === true
        };
        var I = b.reattach || l.endpoints[0].reattachConnections || l.endpoints[1].reattachConnections || o.Defaults.ReattachConnections;
        this.isReattach = function () {
            return I === true
        };
        this.setReattach = function (O) {
            I = O === true
        };
        var c = b.cost || l.endpoints[0].getConnectionCost();
        l.getCost = function () {
            return c
        };
        l.setCost = function (O) {
            c = O
        };
        var s = b.directed;
        if (b.directed == null) {
            s = l.endpoints[0].areConnectionsDirected()
        }
        l.isDirected = function () {
            return s === true
        };
        var D = jsPlumb.extend({}, this.endpoints[0].getParameters());
        jsPlumb.extend(D, this.endpoints[1].getParameters());
        jsPlumb.extend(D, l.getParameters());
        l.setParameters(D);
        this.getAttachedElements = function () {
            return l.endpoints
        };
        this.moveParent = function (R) {
            var Q = jsPlumb.CurrentLibrary, P = Q.getParent(d.canvas);
            if (d.bgCanvas) {
                Q.removeElement(d.bgCanvas);
                Q.appendElement(d.bgCanvas, R)
            }
            Q.removeElement(d.canvas);
            Q.appendElement(d.canvas, R);
            for (var O = 0; O < l.overlays.length; O++) {
                if (l.overlays[O].isAppendedAtTopLevel) {
                    Q.removeElement(l.overlays[O].canvas);
                    Q.appendElement(l.overlays[O].canvas, R);
                    if (l.overlays[O].reattachListeners) {
                        l.overlays[O].reattachListeners(d)
                    }
                }
            }
            if (d.reattachListeners) {
                d.reattachListeners()
            }
        };
        var v = null;
        this.paint = function (ag) {
            if (r) {
                ag = ag || {};
                var X = ag.elId, Y = ag.ui, U = ag.recalc, Q = ag.timestamp, Z = false, af = Z ? this.sourceId : this.targetId, T = Z ? this.targetId : this.sourceId, R = Z ? 0 : 1, ai = Z ? 1 : 0;
                if (Q == null || Q != v) {
                    var aj = o.updateOffset({
                        elId: X,
                        offset: Y,
                        recalc: U,
                        timestamp: Q
                    }).o, V = o.updateOffset({
                        elId: af,
                        timestamp: Q
                    }).o, ab = this.endpoints[ai], P = this.endpoints[R];
                    if (ag.clearEdits) {
                        ab.anchor.clearUserDefinedLocation();
                        P.anchor.clearUserDefinedLocation();
                        d.setEdited(false)
                    }
                    var S = ab.anchor.getCurrentLocation(ab), ae = P.anchor.getCurrentLocation(P);
                    d.resetBounds();
                    d.compute({
                        sourcePos: S,
                        targetPos: ae,
                        sourceEndpoint: this.endpoints[ai],
                        targetEndpoint: this.endpoints[R],
                        lineWidth: l.paintStyleInUse.lineWidth,
                        sourceInfo: aj,
                        targetInfo: V,
                        clearEdits: ag.clearEdits === true
                    });
                    var W = {minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity};
                    for (var ad = 0; ad < l.overlays.length; ad++) {
                        var aa = l.overlays[ad];
                        if (aa.isVisible()) {
                            l.overlayPlacements[ad] = aa.draw(d, l.paintStyleInUse);
                            W.minX = Math.min(W.minX, l.overlayPlacements[ad].minX);
                            W.maxX = Math.max(W.maxX, l.overlayPlacements[ad].maxX);
                            W.minY = Math.min(W.minY, l.overlayPlacements[ad].minY);
                            W.maxY = Math.max(W.maxY, l.overlayPlacements[ad].maxY)
                        }
                    }
                    var O = parseFloat(l.paintStyleInUse.lineWidth || 1) / 2, ah = parseFloat(l.paintStyleInUse.lineWidth || 0), ac = {
                        xmin: Math.min(d.bounds.minX - (O + ah), W.minX),
                        ymin: Math.min(d.bounds.minY - (O + ah), W.minY),
                        xmax: Math.max(d.bounds.maxX + (O + ah), W.maxX),
                        ymax: Math.max(d.bounds.maxY + (O + ah), W.maxY)
                    };
                    d.paint(l.paintStyleInUse, null, ac);
                    for (var ad = 0; ad < l.overlays.length; ad++) {
                        var aa = l.overlays[ad];
                        if (aa.isVisible()) {
                            aa.paint(l.overlayPlacements[ad], ac)
                        }
                    }
                }
                v = Q
            }
        };
        this.repaint = function (P) {
            P = P || {};
            var O = !(P.recalc === false);
            this.paint({elId: this.sourceId, recalc: O, timestamp: P.timestamp, clearEdits: P.clearEdits})
        };
        var N = b.type || l.endpoints[0].connectionType || l.endpoints[1].connectionType;
        if (N) {
            l.addType(N, b.data, o.isSuspendDrawing())
        }
    }
})();
(function () {
    jsPlumb.DOMElementComponent = function (e) {
        jsPlumb.jsPlumbUIComponent.apply(this, arguments);
        this.mousemove = this.dblclick = this.click = this.mousedown = this.mouseup = function (f) {
        }
    };
    jsPlumb.Segments = {
        AbstractSegment: function (e) {
            this.params = e;
            this.findClosestPointOnPath = function (f, g) {
                return {d: Infinity, x: null, y: null, l: null}
            };
            this.getBounds = function () {
                return {
                    minX: Math.min(e.x1, e.x2),
                    minY: Math.min(e.y1, e.y2),
                    maxX: Math.max(e.x1, e.x2),
                    maxY: Math.max(e.y1, e.y2)
                }
            }
        }, Straight: function (k) {
            var q = this, o = jsPlumb.Segments.AbstractSegment.apply(this, arguments), h, i, p, g, f, n, l, e = function () {
                h = Math.sqrt(Math.pow(f - g, 2) + Math.pow(l - n, 2));
                i = jsPlumbUtil.gradient({x: g, y: n}, {x: f, y: l});
                p = -1 / i
            };
            this.type = "Straight";
            q.getLength = function () {
                return h
            };
            q.getGradient = function () {
                return i
            };
            this.getCoordinates = function () {
                return {x1: g, y1: n, x2: f, y2: l}
            };
            this.setCoordinates = function (m) {
                g = m.x1;
                n = m.y1;
                f = m.x2;
                l = m.y2;
                e()
            };
            this.setCoordinates({x1: k.x1, y1: k.y1, x2: k.x2, y2: k.y2});
            this.getBounds = function () {
                return {minX: Math.min(g, f), minY: Math.min(n, l), maxX: Math.max(g, f), maxY: Math.max(n, l)}
            };
            this.pointOnPath = function (r, s) {
                if (r == 0 && !s) {
                    return {x: g, y: n}
                } else {
                    if (r == 1 && !s) {
                        return {x: f, y: l}
                    } else {
                        var m = s ? r > 0 ? r : h + r : r * h;
                        return jsPlumbUtil.pointOnLine({x: g, y: n}, {x: f, y: l}, m)
                    }
                }
            };
            this.gradientAtPoint = function (m) {
                return i
            };
            this.pointAlongPathFrom = function (m, u, t) {
                var s = q.pointOnPath(m, t), r = m == 1 ? {x: g + ((f - g) * 10), y: n + ((n - l) * 10)} : u <= 0 ? {
                    x: g,
                    y: n
                } : {x: f, y: l};
                if (u <= 0 && Math.abs(u) > 1) {
                    u *= -1
                }
                return jsPlumbUtil.pointOnLine(s, r, u)
            };
            this.findClosestPointOnPath = function (r, z) {
                if (i == 0) {
                    return {x: r, y: n, d: Math.abs(z - n)}
                } else {
                    if (i == Infinity || i == -Infinity) {
                        return {x: g, y: z, d: Math.abs(r - 1)}
                    } else {
                        var m = n - (i * g), s = z - (p * r), t = (s - m) / (i - p), w = (i * t) + m, v = jsPlumbUtil.lineLength([r, z], [t, w]), u = jsPlumbUtil.lineLength([t, w], [g, n]);
                        return {d: v, x: t, y: w, l: u / h}
                    }
                }
            }
        }, Arc: function (i) {
            var q = this, p = jsPlumb.Segments.AbstractSegment.apply(this, arguments), l = function (s, r) {
                return jsPlumbUtil.theta([i.cx, i.cy], [s, r])
            }, e = function (t) {
                if (q.anticlockwise) {
                    var r = q.startAngle < q.endAngle ? q.startAngle + h : q.startAngle, v = Math.abs(r - q.endAngle);
                    return r - (v * t)
                } else {
                    var u = q.endAngle < q.startAngle ? q.endAngle + h : q.endAngle, v = Math.abs(u - q.startAngle);
                    return q.startAngle + (v * t)
                }
            }, h = 2 * Math.PI;
            this.radius = i.r;
            this.anticlockwise = i.ac;
            this.type = "Arc";
            if (i.startAngle && i.endAngle) {
                this.startAngle = i.startAngle;
                this.endAngle = i.endAngle;
                this.x1 = i.cx + (q.radius * Math.cos(i.startAngle));
                this.y1 = i.cy + (q.radius * Math.sin(i.startAngle));
                this.x2 = i.cx + (q.radius * Math.cos(i.endAngle));
                this.y2 = i.cy + (q.radius * Math.sin(i.endAngle))
            } else {
                this.startAngle = l(i.x1, i.y1);
                this.endAngle = l(i.x2, i.y2);
                this.x1 = i.x1;
                this.y1 = i.y1;
                this.x2 = i.x2;
                this.y2 = i.y2
            }
            if (this.endAngle < 0) {
                this.endAngle += h
            }
            if (this.startAngle < 0) {
                this.startAngle += h
            }
            this.segment = jsPlumbUtil.segment([this.x1, this.y1], [this.x2, this.y2]);
            var m = q.endAngle < q.startAngle ? q.endAngle + h : q.endAngle;
            q.sweep = Math.abs(m - q.startAngle);
            if (q.anticlockwise) {
                q.sweep = h - q.sweep
            }
            var o = 2 * Math.PI * q.radius, f = q.sweep / h, g = o * f;
            this.getLength = function () {
                return g
            };
            this.getBounds = function () {
                return {minX: i.cx - i.r, maxX: i.cx + i.r, minY: i.cy - i.r, maxY: i.cy + i.r}
            };
            var k = 1e-10, n = function (u) {
                var t = Math.floor(u), s = Math.ceil(u);
                if (u - t < k) {
                    return t
                } else {
                    if (s - u < k) {
                        return s
                    }
                }
                return u
            };
            this.pointOnPath = function (r, v) {
                if (r == 0) {
                    return {x: q.x1, y: q.y1, theta: q.startAngle}
                } else {
                    if (r == 1) {
                        return {x: q.x2, y: q.y2, theta: q.endAngle}
                    }
                }
                if (v) {
                    r = r / g
                }
                var u = e(r), t = i.cx + (i.r * Math.cos(u)), s = i.cy + (i.r * Math.sin(u));
                return {x: n(t), y: n(s), theta: u}
            };
            this.gradientAtPoint = function (s, u) {
                var t = q.pointOnPath(s, u);
                var r = jsPlumbUtil.normal([i.cx, i.cy], [t.x, t.y]);
                if (!q.anticlockwise && (r == Infinity || r == -Infinity)) {
                    r *= -1
                }
                return r
            };
            this.pointAlongPathFrom = function (z, r, y) {
                var t = q.pointOnPath(z, y), s = r / o * 2 * Math.PI, u = q.anticlockwise ? -1 : 1, x = t.theta + (u * s), w = i.cx + (q.radius * Math.cos(x)), v = i.cy + (q.radius * Math.sin(x));
                return {x: w, y: v}
            }
        }, Bezier: function (k) {
            var e = this, g = jsPlumb.Segments.AbstractSegment.apply(this, arguments), i = [{x: k.x1, y: k.y1}, {
                x: k.cp1x,
                y: k.cp1y
            }, {x: k.cp2x, y: k.cp2y}, {x: k.x2, y: k.y2}], f = {
                minX: Math.min(k.x1, k.x2, k.cp1x, k.cp2x),
                minY: Math.min(k.y1, k.y2, k.cp1y, k.cp2y),
                maxX: Math.max(k.x1, k.x2, k.cp1x, k.cp2x),
                maxY: Math.max(k.y1, k.y2, k.cp1y, k.cp2y)
            };
            this.type = "Bezier";
            var h = function (m, l, n) {
                if (n) {
                    l = jsBezier.locationAlongCurveFrom(m, l > 0 ? 0 : 1, l)
                }
                return l
            };
            this.pointOnPath = function (l, m) {
                l = h(i, l, m);
                return jsBezier.pointOnCurve(i, l)
            };
            this.gradientAtPoint = function (l, m) {
                l = h(i, l, m);
                return jsBezier.gradientAtPoint(i, l)
            };
            this.pointAlongPathFrom = function (l, n, m) {
                l = h(i, l, m);
                return jsBezier.pointAlongCurveFrom(i, l, n)
            };
            this.getLength = function () {
                return jsBezier.getLength(i)
            };
            this.getBounds = function () {
                return f
            }
        }
    };
    var d = function () {
        var e = this;
        e.resetBounds = function () {
            e.bounds = {minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity}
        };
        e.resetBounds()
    };
    jsPlumb.Connectors.AbstractConnector = function (z) {
        d.apply(this, arguments);
        var u = this, x = [], f = false, p = 0, h = [], s = [], e = z.stub || 0, l = jsPlumbUtil.isArray(e) ? e[0] : e, r = jsPlumbUtil.isArray(e) ? e[1] : e, v = z.gap || 0, m = jsPlumbUtil.isArray(v) ? v[0] : v, o = jsPlumbUtil.isArray(v) ? v[1] : v, n = null, i = false, k = null;
        this.isEditable = function () {
            return false
        };
        this.setEdited = function (B) {
            i = B
        };
        this.getPath = function () {
        };
        this.setPath = function (B) {
        };
        this.findSegmentForPoint = function (B, F) {
            var C = {d: Infinity, s: null, x: null, y: null, l: null};
            for (var D = 0; D < x.length; D++) {
                var E = x[D].findClosestPointOnPath(B, F);
                if (E.d < C.d) {
                    C.d = E.d;
                    C.l = E.l;
                    C.x = E.x;
                    C.y = E.y;
                    C.s = x[D]
                }
            }
            return C
        };
        var y = function () {
            var D = 0;
            for (var C = 0; C < x.length; C++) {
                var B = x[C].getLength();
                s[C] = B / p;
                h[C] = [D, (D += (B / p))]
            }
        }, g = function (D, F) {
            if (F) {
                D = D > 0 ? D / p : (p + D) / p
            }
            var B = h.length - 1, C = 1;
            for (var E = 0; E < h.length; E++) {
                if (h[E][1] >= D) {
                    B = E;
                    C = D == 1 ? 1 : D == 0 ? 0 : (D - h[E][0]) / s[E];
                    break
                }
            }
            return {segment: x[B], proportion: C, index: B}
        }, w = function (C, D) {
            var B = new jsPlumb.Segments[C](D);
            x.push(B);
            p += B.getLength();
            u.updateBounds(B)
        }, A = function () {
            p = 0;
            x.splice(0, x.length);
            h.splice(0, h.length);
            s.splice(0, s.length)
        };
        this.setSegments = function (C) {
            n = [];
            p = 0;
            for (var B = 0; B < C.length; B++) {
                n.push(C[B]);
                p += C[B].getLength()
            }
        };
        var q = function (R) {
            u.lineWidth = R.lineWidth;
            var B = jsPlumbUtil.segment(R.sourcePos, R.targetPos), N = R.targetPos[0] < R.sourcePos[0], L = R.targetPos[1] < R.sourcePos[1], E = R.lineWidth || 1, Q = R.sourceEndpoint.anchor.orientation || R.sourceEndpoint.anchor.getOrientation(R.sourceEndpoint), C = R.targetEndpoint.anchor.orientation || R.targetEndpoint.anchor.getOrientation(R.targetEndpoint), H = N ? R.targetPos[0] : R.sourcePos[0], G = L ? R.targetPos[1] : R.sourcePos[1], J = Math.abs(R.targetPos[0] - R.sourcePos[0]), P = Math.abs(R.targetPos[1] - R.sourcePos[1]);
            if (Q[0] == 0 && Q[1] == 0 || C[0] == 0 && C[1] == 0) {
                var F = J > P ? 0 : 1, D = [1, 0][F];
                Q = [];
                C = [];
                Q[F] = R.sourcePos[F] > R.targetPos[F] ? -1 : 1;
                C[F] = R.sourcePos[F] > R.targetPos[F] ? 1 : -1;
                Q[D] = 0;
                C[D] = 0
            }
            var M = N ? J + (m * Q[0]) : m * Q[0], K = L ? P + (m * Q[1]) : m * Q[1], T = N ? o * C[0] : J + (o * C[0]), S = L ? o * C[1] : P + (o * C[1]), O = ((Q[0] * C[0]) + (Q[1] * C[1]));
            var I = {
                sx: M,
                sy: K,
                tx: T,
                ty: S,
                lw: E,
                xSpan: Math.abs(T - M),
                ySpan: Math.abs(S - K),
                mx: (M + T) / 2,
                my: (K + S) / 2,
                so: Q,
                to: C,
                x: H,
                y: G,
                w: J,
                h: P,
                segment: B,
                startStubX: M + (Q[0] * l),
                startStubY: K + (Q[1] * l),
                endStubX: T + (C[0] * r),
                endStubY: S + (C[1] * r),
                isXGreaterThanStubTimes2: Math.abs(M - T) > (l + r),
                isYGreaterThanStubTimes2: Math.abs(K - S) > (l + r),
                opposite: O == -1,
                perpendicular: O == 0,
                orthogonal: O == 1,
                sourceAxis: Q[0] == 0 ? "y" : "x",
                points: [H, G, J, P, M, K, T, S]
            };
            I.anchorOrientation = I.opposite ? "opposite" : I.orthogonal ? "orthogonal" : "perpendicular";
            return I
        };
        this.getSegments = function () {
            return x
        };
        u.updateBounds = function (C) {
            var B = C.getBounds();
            u.bounds.minX = Math.min(u.bounds.minX, B.minX);
            u.bounds.maxX = Math.max(u.bounds.maxX, B.maxX);
            u.bounds.minY = Math.min(u.bounds.minY, B.minY);
            u.bounds.maxY = Math.max(u.bounds.maxY, B.maxY)
        };
        var t = function () {
            console.log("SEGMENTS:");
            for (var B = 0; B < x.length; B++) {
                console.log(x[B].type, x[B].getLength(), h[B])
            }
        };
        this.pointOnPath = function (C, D) {
            var B = g(C, D);
            return B.segment.pointOnPath(B.proportion, D)
        };
        this.gradientAtPoint = function (C) {
            var B = g(C, absolute);
            return B.segment.gradientAtPoint(B.proportion, absolute)
        };
        this.pointAlongPathFrom = function (C, E, D) {
            var B = g(C, D);
            return B.segment.pointAlongPathFrom(B.proportion, E, false)
        };
        this.compute = function (B) {
            if (!i) {
                k = q(B)
            }
            A();
            this._compute(k, B);
            u.x = k.points[0];
            u.y = k.points[1];
            u.w = k.points[2];
            u.h = k.points[3];
            u.segment = k.segment;
            y()
        };
        return {
            addSegment: w,
            prepareCompute: q,
            sourceStub: l,
            targetStub: r,
            maxStub: Math.max(l, r),
            sourceGap: m,
            targetGap: o,
            maxGap: Math.max(m, o)
        }
    };
    jsPlumb.Connectors.Straight = function () {
        this.type = "Straight";
        var e = jsPlumb.Connectors.AbstractConnector.apply(this, arguments);
        this._compute = function (g, f) {
            e.addSegment("Straight", {x1: g.sx, y1: g.sy, x2: g.startStubX, y2: g.startStubY});
            e.addSegment("Straight", {x1: g.startStubX, y1: g.startStubY, x2: g.endStubX, y2: g.endStubY});
            e.addSegment("Straight", {x1: g.endStubX, y1: g.endStubY, x2: g.tx, y2: g.ty})
        }
    };
    jsPlumb.Connectors.Bezier = function (k) {
        k = k || {};
        var f = this, h = jsPlumb.Connectors.AbstractConnector.apply(this, arguments), i = k.stub || 50, e = k.curviness || 150, g = 10;
        this.type = "Bezier";
        this.getCurviness = function () {
            return e
        };
        this._findControlPoint = function (u, l, r, m, o) {
            var s = m.anchor.getOrientation(m), t = o.anchor.getOrientation(o), q = s[0] != t[0] || s[1] == t[1], n = [];
            if (!q) {
                if (s[0] == 0) {
                    n.push(l[0] < r[0] ? u[0] + g : u[0] - g)
                } else {
                    n.push(u[0] - (e * s[0]))
                }
                if (s[1] == 0) {
                    n.push(l[1] < r[1] ? u[1] + g : u[1] - g)
                } else {
                    n.push(u[1] + (e * t[1]))
                }
            } else {
                if (t[0] == 0) {
                    n.push(r[0] < l[0] ? u[0] + g : u[0] - g)
                } else {
                    n.push(u[0] + (e * t[0]))
                }
                if (t[1] == 0) {
                    n.push(r[1] < l[1] ? u[1] + g : u[1] - g)
                } else {
                    n.push(u[1] + (e * s[1]))
                }
            }
            return n
        };
        this._compute = function (q, n) {
            var o = n.sourcePos, v = n.targetPos, w = Math.abs(o[0] - v[0]), s = Math.abs(o[1] - v[1]), t = o[0] < v[0] ? w : 0, r = o[1] < v[1] ? s : 0, m = o[0] < v[0] ? 0 : w, l = o[1] < v[1] ? 0 : s, x = f._findControlPoint([t, r], o, v, n.sourceEndpoint, n.targetEndpoint), u = f._findControlPoint([m, l], v, o, n.targetEndpoint, n.sourceEndpoint);
            h.addSegment("Bezier", {x1: t, y1: r, x2: m, y2: l, cp1x: x[0], cp1y: x[1], cp2x: u[0], cp2y: u[1]})
        }
    };
    jsPlumb.Endpoints.AbstractEndpoint = function (f) {
        d.apply(this, arguments);
        var e = this;
        this.compute = function (k, g, l, i) {
            var h = e._compute.apply(e, arguments);
            e.x = h[0];
            e.y = h[1];
            e.w = h[2];
            e.h = h[3];
            e.bounds.minX = e.x;
            e.bounds.minY = e.y;
            e.bounds.maxX = e.x + e.w;
            e.bounds.maxY = e.y + e.h;
            return h
        };
        return {compute: e.compute, cssClass: f.cssClass}
    };
    jsPlumb.Endpoints.Dot = function (g) {
        this.type = "Dot";
        var e = this, f = jsPlumb.Endpoints.AbstractEndpoint.apply(this, arguments);
        g = g || {};
        this.radius = g.radius || 10;
        this.defaultOffset = 0.5 * this.radius;
        this.defaultInnerRadius = this.radius / 3;
        this._compute = function (q, i, k, m) {
            e.radius = k.radius || e.radius;
            var p = q[0] - e.radius, o = q[1] - e.radius, r = e.radius * 2, n = e.radius * 2;
            if (k.strokeStyle) {
                var l = k.lineWidth || 1;
                p -= l;
                o -= l;
                r += (l * 2);
                n += (l * 2)
            }
            return [p, o, r, n, e.radius]
        }
    };
    jsPlumb.Endpoints.Rectangle = function (g) {
        this.type = "Rectangle";
        var e = this, f = jsPlumb.Endpoints.AbstractEndpoint.apply(this, arguments);
        g = g || {};
        this.width = g.width || 20;
        this.height = g.height || 20;
        this._compute = function (n, k, p, m) {
            var l = p.width || e.width, i = p.height || e.height, h = n[0] - (l / 2), o = n[1] - (i / 2);
            return [h, o, l, i]
        }
    };
    var b = function (g) {
        jsPlumb.DOMElementComponent.apply(this, arguments);
        var e = this;
        var f = [];
        this.getDisplayElements = function () {
            return f
        };
        this.appendDisplayElement = function (h) {
            f.push(h)
        }
    };
    jsPlumb.Endpoints.Image = function (k) {
        this.type = "Image";
        b.apply(this, arguments);
        var p = this, o = jsPlumb.Endpoints.AbstractEndpoint.apply(this, arguments), i = false, h = false, g = k.width, f = k.height, m = null, e = k.endpoint;
        this.img = new Image();
        p.ready = false;
        this.img.onload = function () {
            p.ready = true;
            g = g || p.img.width;
            f = f || p.img.height;
            if (m) {
                m(p)
            }
        };
        e.setImage = function (q, t) {
            var r = q.constructor == String ? q : q.src;
            m = t;
            p.img.src = q;
            if (p.canvas != null) {
                p.canvas.setAttribute("src", q)
            }
        };
        e.setImage(k.src || k.url, k.onload);
        this._compute = function (s, q, t, r) {
            p.anchorPoint = s;
            if (p.ready) {
                return [s[0] - g / 2, s[1] - f / 2, g, f]
            } else {
                return [0, 0, 0, 0]
            }
        };
        p.canvas = document.createElement("img"), i = false;
        p.canvas.style.margin = 0;
        p.canvas.style.padding = 0;
        p.canvas.style.outline = 0;
        p.canvas.style.position = "absolute";
        var l = k.cssClass ? " " + k.cssClass : "";
        p.canvas.className = jsPlumb.endpointClass + l;
        if (g) {
            p.canvas.setAttribute("width", g)
        }
        if (f) {
            p.canvas.setAttribute("height", f)
        }
        jsPlumb.appendElement(p.canvas, k.parent);
        p.attachListeners(p.canvas, p);
        p.cleanup = function () {
            h = true
        };
        var n = function (t, s, r) {
            if (!h) {
                if (!i) {
                    p.canvas.setAttribute("src", p.img.src);
                    p.appendDisplayElement(p.canvas);
                    i = true
                }
                var q = p.anchorPoint[0] - (g / 2), u = p.anchorPoint[1] - (f / 2);
                jsPlumb.sizeCanvas(p.canvas, q, u, g, f)
            }
        };
        this.paint = function (r, q) {
            if (p.ready) {
                n(r, q)
            } else {
                window.setTimeout(function () {
                    p.paint(r, q)
                }, 200)
            }
        }
    };
    jsPlumb.Endpoints.Blank = function (g) {
        var e = this, f = jsPlumb.Endpoints.AbstractEndpoint.apply(this, arguments);
        this.type = "Blank";
        b.apply(this, arguments);
        this._compute = function (k, h, l, i) {
            return [k[0], k[1], 10, 0]
        };
        e.canvas = document.createElement("div");
        e.canvas.style.display = "block";
        e.canvas.style.width = "1px";
        e.canvas.style.height = "1px";
        e.canvas.style.background = "transparent";
        e.canvas.style.position = "absolute";
        e.canvas.className = e._jsPlumb.endpointClass;
        jsPlumb.appendElement(e.canvas, g.parent);
        this.paint = function (i, h) {
            jsPlumb.sizeCanvas(e.canvas, e.x, e.y, e.w, e.h)
        }
    };
    jsPlumb.Endpoints.Triangle = function (g) {
        this.type = "Triangle";
        var e = this, f = jsPlumb.Endpoints.AbstractEndpoint.apply(this, arguments);
        g = g || {};
        g.width = g.width || 55;
        g.height = g.height || 55;
        this.width = g.width;
        this.height = g.height;
        this._compute = function (n, k, p, m) {
            var l = p.width || e.width, i = p.height || e.height, h = n[0] - (l / 2), o = n[1] - (i / 2);
            return [h, o, l, i]
        }
    };
    var c = jsPlumb.Overlays.AbstractOverlay = function (g) {
        var f = true, e = this;
        this.isAppendedAtTopLevel = true;
        this.component = g.component;
        this.loc = g.location == null ? 0.5 : g.location;
        this.endpointLoc = g.endpointLocation == null ? [0.5, 0.5] : g.endpointLocation;
        this.setVisible = function (h) {
            f = h;
            e.component.repaint()
        };
        this.isVisible = function () {
            return f
        };
        this.hide = function () {
            e.setVisible(false)
        };
        this.show = function () {
            e.setVisible(true)
        };
        this.incrementLocation = function (h) {
            e.loc += h;
            e.component.repaint()
        };
        this.setLocation = function (h) {
            e.loc = h;
            e.component.repaint()
        };
        this.getLocation = function () {
            return e.loc
        }
    };
    jsPlumb.Overlays.Arrow = function (k) {
        this.type = "Arrow";
        c.apply(this, arguments);
        this.isAppendedAtTopLevel = false;
        k = k || {};
        var g = this, e = jsPlumbUtil;
        this.length = k.length || 20;
        this.width = k.width || 20;
        this.id = k.id;
        var i = (k.direction || 1) < 0 ? -1 : 1, h = k.paintStyle || {lineWidth: 1}, f = k.foldback || 0.623;
        this.computeMaxSize = function () {
            return g.width * 1.5
        };
        this.cleanup = function () {
        };
        this.draw = function (v, z) {
            var r, w, n, s, q;
            if (v.pointAlongPathFrom) {
                if (e.isString(g.loc) || g.loc > 1 || g.loc < 0) {
                    var o = parseInt(g.loc);
                    r = v.pointAlongPathFrom(o, i * g.length / 2, true), w = v.pointOnPath(o, true), n = e.pointOnLine(r, w, g.length)
                } else {
                    if (g.loc == 1) {
                        r = v.pointOnPath(g.loc);
                        w = v.pointAlongPathFrom(g.loc, -(g.length));
                        n = e.pointOnLine(r, w, g.length);
                        if (i == -1) {
                            var y = n;
                            n = r;
                            r = y
                        }
                    } else {
                        if (g.loc == 0) {
                            n = v.pointOnPath(g.loc);
                            w = v.pointAlongPathFrom(g.loc, g.length);
                            r = e.pointOnLine(n, w, g.length);
                            if (i == -1) {
                                var y = n;
                                n = r;
                                r = y
                            }
                        } else {
                            r = v.pointAlongPathFrom(g.loc, i * g.length / 2), w = v.pointOnPath(g.loc), n = e.pointOnLine(r, w, g.length)
                        }
                    }
                }
                s = e.perpendicularLineTo(r, n, g.width);
                q = e.pointOnLine(r, n, f * g.length);
                var t = {
                    hxy: r,
                    tail: s,
                    cxy: q
                }, u = h.strokeStyle || z.strokeStyle, x = h.fillStyle || z.strokeStyle, p = h.lineWidth || z.lineWidth, m = {
                    component: v,
                    d: t,
                    lineWidth: p,
                    strokeStyle: u,
                    fillStyle: x,
                    minX: Math.min(r.x, s[0].x, s[1].x),
                    maxX: Math.max(r.x, s[0].x, s[1].x),
                    minY: Math.min(r.y, s[0].y, s[1].y),
                    maxY: Math.max(r.y, s[0].y, s[1].y)
                };
                return m
            } else {
                return {component: v, minX: 0, maxX: 0, minY: 0, maxY: 0}
            }
        }
    };
    jsPlumb.Overlays.PlainArrow = function (f) {
        f = f || {};
        var e = jsPlumb.extend(f, {foldback: 1});
        jsPlumb.Overlays.Arrow.call(this, e);
        this.type = "PlainArrow"
    };
    jsPlumb.Overlays.Diamond = function (g) {
        g = g || {};
        var e = g.length || 40, f = jsPlumb.extend(g, {length: e / 2, foldback: 2});
        jsPlumb.Overlays.Arrow.call(this, f);
        this.type = "Diamond"
    };
    var a = function (f) {
        jsPlumb.DOMElementComponent.apply(this, arguments);
        c.apply(this, arguments);
        var m = this, i = false, h = jsPlumb.CurrentLibrary;
        f = f || {};
        this.id = f.id;
        var e;
        var g = function () {
            e = f.create(f.component);
            e = h.getDOMElement(e);
            e.style.position = "absolute";
            var o = f._jsPlumb.overlayClass + " " + (m.cssClass ? m.cssClass : f.cssClass ? f.cssClass : "");
            e.className = o;
            f._jsPlumb.appendElement(e, f.component.parent);
            f._jsPlumb.getId(e);
            m.attachListeners(e, m);
            m.canvas = e
        };
        this.getElement = function () {
            if (e == null) {
                g()
            }
            return e
        };
        this.getDimensions = function () {
            return h.getSize(h.getElementObject(m.getElement()))
        };
        var k = null, l = function (o) {
            if (k == null) {
                k = m.getDimensions()
            }
            return k
        };
        this.clearCachedDimensions = function () {
            k = null
        };
        this.computeMaxSize = function () {
            var o = l();
            return Math.max(o[0], o[1])
        };
        var n = m.setVisible;
        m.setVisible = function (o) {
            n(o);
            e.style.display = o ? "block" : "none"
        };
        this.cleanup = function () {
            if (e != null) {
                h.removeElement(e)
            }
        };
        this.paint = function (p, o) {
            if (!i) {
                m.getElement();
                p.component.appendDisplayElement(e);
                m.attachListeners(e, p.component);
                i = true
            }
            e.style.left = (p.component.x + p.d.minx) + "px";
            e.style.top = (p.component.y + p.d.miny) + "px"
        };
        this.draw = function (r, w) {
            var o = l();
            if (o != null && o.length == 2) {
                var p = {x: 0, y: 0};
                if (r.pointOnPath) {
                    var q = m.loc, s = false;
                    if (jsPlumbUtil.isString(m.loc) || m.loc < 0 || m.loc > 1) {
                        q = parseInt(m.loc);
                        s = true
                    }
                    p = r.pointOnPath(q, s)
                } else {
                    var u = m.loc.constructor == Array ? m.loc : m.endpointLoc;
                    p = {x: u[0] * r.w, y: u[1] * r.h}
                }
                var v = p.x - (o[0] / 2), t = p.y - (o[1] / 2);
                return {
                    component: r,
                    d: {minx: v, miny: t, td: o, cxy: p},
                    minX: v,
                    maxX: v + o[0],
                    minY: t,
                    maxY: t + o[1]
                }
            } else {
                return {minX: 0, maxX: 0, minY: 0, maxY: 0}
            }
        };
        this.reattachListeners = function (o) {
            if (e) {
                m.reattachListenersForElement(e, m, o)
            }
        }
    };
    jsPlumb.Overlays.Custom = function (e) {
        this.type = "Custom";
        a.apply(this, arguments)
    };
    jsPlumb.Overlays.GuideLines = function () {
        var e = this;
        e.length = 50;
        e.lineWidth = 5;
        this.type = "GuideLines";
        c.apply(this, arguments);
        jsPlumb.jsPlumbUIComponent.apply(this, arguments);
        this.draw = function (g, m) {
            var l = g.pointAlongPathFrom(e.loc, e.length / 2), k = g.pointOnPath(e.loc), i = jsPlumbUtil.pointOnLine(l, k, e.length), h = jsPlumbUtil.perpendicularLineTo(l, i, 40), f = jsPlumbUtil.perpendicularLineTo(i, l, 20);
            return {
                connector: g,
                head: l,
                tail: i,
                headLine: f,
                tailLine: h,
                minX: Math.min(l.x, i.x, f[0].x, f[1].x),
                minY: Math.min(l.y, i.y, f[0].y, f[1].y),
                maxX: Math.max(l.x, i.x, f[0].x, f[1].x),
                maxY: Math.max(l.y, i.y, f[0].y, f[1].y)
            }
        };
        this.cleanup = function () {
        }
    };
    jsPlumb.Overlays.Label = function (i) {
        var e = this;
        this.labelStyle = i.labelStyle || jsPlumb.Defaults.LabelStyle;
        this.cssClass = this.labelStyle != null ? this.labelStyle.cssClass : null;
        i.create = function () {
            return document.createElement("div")
        };
        jsPlumb.Overlays.Custom.apply(this, arguments);
        this.type = "Label";
        var g = i.label || "", e = this, h = null;
        this.setLabel = function (m) {
            g = m;
            h = null;
            e.clearCachedDimensions();
            f();
            e.component.repaint()
        };
        var f = function () {
            if (typeof g == "function") {
                var l = g(e);
                e.getElement().innerHTML = l.replace(/\r\n/g, "<br/>")
            } else {
                if (h == null) {
                    h = g;
                    e.getElement().innerHTML = h.replace(/\r\n/g, "<br/>")
                }
            }
        };
        this.getLabel = function () {
            return g
        };
        var k = this.getDimensions;
        this.getDimensions = function () {
            f();
            return k()
        }
    }
})();
(function () {
    var c = function (e, g, d, f) {
        this.m = (f - g) / (d - e);
        this.b = -1 * ((this.m * e) - g);
        this.rectIntersect = function (q, p, s, o) {
            var n = [];
            var k = (p - this.b) / this.m;
            if (k >= q && k <= (q + s)) {
                n.push([k, (this.m * k) + this.b])
            }
            var t = (this.m * (q + s)) + this.b;
            if (t >= p && t <= (p + o)) {
                n.push([(t - this.b) / this.m, t])
            }
            var k = ((p + o) - this.b) / this.m;
            if (k >= q && k <= (q + s)) {
                n.push([k, (this.m * k) + this.b])
            }
            var t = (this.m * q) + this.b;
            if (t >= p && t <= (p + o)) {
                n.push([(t - this.b) / this.m, t])
            }
            if (n.length == 2) {
                var m = (n[0][0] + n[1][0]) / 2, l = (n[0][1] + n[1][1]) / 2;
                n.push([m, l]);
                var i = m <= q + (s / 2) ? -1 : 1, r = l <= p + (o / 2) ? -1 : 1;
                n.push([i, r]);
                return n
            }
            return null
        }
    }, a = function (e, g, d, f) {
        if (e <= d && f <= g) {
            return 1
        } else {
            if (e <= d && g <= f) {
                return 2
            } else {
                if (d <= e && f >= g) {
                    return 3
                }
            }
        }
        return 4
    }, b = function (g, f, i, e, h, m, l, d, k) {
        if (d <= k) {
            return [g, f]
        }
        if (i === 1) {
            if (e[3] <= 0 && h[3] >= 1) {
                return [g + (e[2] < 0.5 ? -1 * m : m), f]
            } else {
                if (e[2] >= 1 && h[2] <= 0) {
                    return [g, f + (e[3] < 0.5 ? -1 * l : l)]
                } else {
                    return [g + (-1 * m), f + (-1 * l)]
                }
            }
        } else {
            if (i === 2) {
                if (e[3] >= 1 && h[3] <= 0) {
                    return [g + (e[2] < 0.5 ? -1 * m : m), f]
                } else {
                    if (e[2] >= 1 && h[2] <= 0) {
                        return [g, f + (e[3] < 0.5 ? -1 * l : l)]
                    } else {
                        return [g + (1 * m), f + (-1 * l)]
                    }
                }
            } else {
                if (i === 3) {
                    if (e[3] >= 1 && h[3] <= 0) {
                        return [g + (e[2] < 0.5 ? -1 * m : m), f]
                    } else {
                        if (e[2] <= 0 && h[2] >= 1) {
                            return [g, f + (e[3] < 0.5 ? -1 * l : l)]
                        } else {
                            return [g + (-1 * m), f + (-1 * l)]
                        }
                    }
                } else {
                    if (i === 4) {
                        if (e[3] <= 0 && h[3] >= 1) {
                            return [g + (e[2] < 0.5 ? -1 * m : m), f]
                        } else {
                            if (e[2] <= 0 && h[2] >= 1) {
                                return [g, f + (e[3] < 0.5 ? -1 * l : l)]
                            } else {
                                return [g + (1 * m), f + (-1 * l)]
                            }
                        }
                    }
                }
            }
        }
    };
    jsPlumb.Connectors.StateMachine = function (g) {
        g = g || {};
        this.type = "StateMachine";
        var m = this, k = jsPlumb.Connectors.AbstractConnector.apply(this, arguments), d = g.curviness || 10, h = g.margin || 5, i = g.proximityLimit || 80, e = g.orientation && g.orientation === "clockwise", f = g.loopbackRadius || 25, l = g.showLoopback !== false;
        this._compute = function (v, O) {
            var G = Math.abs(O.sourcePos[0] - O.targetPos[0]), M = Math.abs(O.sourcePos[1] - O.targetPos[1]), E = Math.min(O.sourcePos[0], O.targetPos[0]), C = Math.min(O.sourcePos[1], O.targetPos[1]);
            if (!l || (O.sourceEndpoint.elementId !== O.targetEndpoint.elementId)) {
                var u = O.sourcePos[0] < O.targetPos[0] ? 0 : G, r = O.sourcePos[1] < O.targetPos[1] ? 0 : M, J = O.sourcePos[0] < O.targetPos[0] ? G : 0, H = O.sourcePos[1] < O.targetPos[1] ? M : 0;
                if (O.sourcePos[2] === 0) {
                    u -= h
                }
                if (O.sourcePos[2] === 1) {
                    u += h
                }
                if (O.sourcePos[3] === 0) {
                    r -= h
                }
                if (O.sourcePos[3] === 1) {
                    r += h
                }
                if (O.targetPos[2] === 0) {
                    J -= h
                }
                if (O.targetPos[2] === 1) {
                    J += h
                }
                if (O.targetPos[3] === 0) {
                    H -= h
                }
                if (O.targetPos[3] === 1) {
                    H += h
                }
                var D = (u + J) / 2, A = (r + H) / 2, n = (-1 * D) / A, K = Math.atan(n), F = (n == Infinity || n == -Infinity) ? 0 : Math.abs(d / 2 * Math.sin(K)), I = (n == Infinity || n == -Infinity) ? 0 : Math.abs(d / 2 * Math.cos(K)), o = a(u, r, J, H), z = Math.sqrt(Math.pow(J - u, 2) + Math.pow(H - r, 2)), B = b(D, A, o, O.sourcePos, O.targetPos, d, d, z, i);
                k.addSegment("Bezier", {x1: J, y1: H, x2: u, y2: r, cp1x: B[0], cp1y: B[1], cp2x: B[0], cp2y: B[1]})
            } else {
                var N = O.sourcePos[0], L = O.sourcePos[0], t = O.sourcePos[1] - h, q = O.sourcePos[1] - h, s = N, p = t - f;
                G = 2 * f, M = 2 * f, E = s - f, C = p - f;
                v.points[0] = E;
                v.points[1] = C;
                v.points[2] = G;
                v.points[3] = M;
                k.addSegment("Arc", {
                    x1: (N - E) + 4,
                    y1: t - C,
                    startAngle: 0,
                    endAngle: 2 * Math.PI,
                    r: f,
                    ac: !e,
                    x2: (N - E) - 4,
                    y2: t - C,
                    cx: s - E,
                    cy: p - C
                })
            }
        }
    }
})();
(function () {
    jsPlumb.Connectors.Flowchart = function (params) {
        this.type = "Flowchart";
        params = params || {};
        params.stub = params.stub || 30;
        var self = this, _super = jsPlumb.Connectors.AbstractConnector.apply(this, arguments), midpoint = params.midpoint || 0.5, points = [], segments = [], grid = params.grid, alwaysRespectStubs = params.alwaysRespectStubs, userSuppliedSegments = null, lastx = null, lasty = null, lastOrientation, cornerRadius = params.cornerRadius != null ? params.cornerRadius : 0, sgn = function (n) {
            return n < 0 ? -1 : n == 0 ? 0 : 1
        }, addSegment = function (segments, x, y, paintInfo) {
            if (lastx == x && lasty == y) {
                return
            }
            var lx = lastx == null ? paintInfo.sx : lastx, ly = lasty == null ? paintInfo.sy : lasty, o = lx == x ? "v" : "h", sgnx = sgn(x - lx), sgny = sgn(y - ly);
            lastx = x;
            lasty = y;
            segments.push([lx, ly, x, y, o, sgnx, sgny])
        }, segLength = function (s) {
            return Math.sqrt(Math.pow(s[0] - s[2], 2) + Math.pow(s[1] - s[3], 2))
        }, _cloneArray = function (a) {
            var _a = [];
            _a.push.apply(_a, a);
            return _a
        }, updateMinMax = function (a1) {
            self.bounds.minX = Math.min(self.bounds.minX, a1[2]);
            self.bounds.maxX = Math.max(self.bounds.maxX, a1[2]);
            self.bounds.minY = Math.min(self.bounds.minY, a1[3]);
            self.bounds.maxY = Math.max(self.bounds.maxY, a1[3])
        }, writeSegments = function (segments, paintInfo) {
            var current, next;
            for (var i = 0; i < segments.length - 1; i++) {
                current = current || _cloneArray(segments[i]);
                next = _cloneArray(segments[i + 1]);
                if (cornerRadius > 0 && current[4] != next[4]) {
                    var radiusToUse = Math.min(cornerRadius, segLength(current), segLength(next));
                    current[2] -= current[5] * radiusToUse;
                    current[3] -= current[6] * radiusToUse;
                    next[0] += next[5] * radiusToUse;
                    next[1] += next[6] * radiusToUse;
                    var ac = (current[6] == next[5] && next[5] == 1) || ((current[6] == next[5] && next[5] == 0) && current[5] != next[6]) || (current[6] == next[5] && next[5] == -1), sgny = next[1] > current[3] ? 1 : -1, sgnx = next[0] > current[2] ? 1 : -1, sgnEqual = sgny == sgnx, cx = (sgnEqual && ac || (!sgnEqual && !ac)) ? next[0] : current[2], cy = (sgnEqual && ac || (!sgnEqual && !ac)) ? current[3] : next[1];
                    _super.addSegment("Straight", {x1: current[0], y1: current[1], x2: current[2], y2: current[3]});
                    _super.addSegment("Arc", {
                        r: radiusToUse,
                        x1: current[2],
                        y1: current[3],
                        x2: next[0],
                        y2: next[1],
                        cx: cx,
                        cy: cy,
                        ac: ac
                    })
                } else {
                    var dx = (current[2] == current[0]) ? 0 : (current[2] > current[0]) ? (paintInfo.lw / 2) : -(paintInfo.lw / 2), dy = (current[3] == current[1]) ? 0 : (current[3] > current[1]) ? (paintInfo.lw / 2) : -(paintInfo.lw / 2);
                    _super.addSegment("Straight", {
                        x1: current[0] - dx,
                        y1: current[1] - dy,
                        x2: current[2] + dx,
                        y2: current[3] + dy
                    })
                }
                current = next
            }
            _super.addSegment("Straight", {x1: next[0], y1: next[1], x2: next[2], y2: next[3]})
        };
        this.setSegments = function (s) {
            userSuppliedSegments = s
        };
        this.isEditable = function () {
            return true
        };
        this.getOriginalSegments = function () {
            return userSuppliedSegments || segments
        };
        this._compute = function (paintInfo, params) {
            if (params.clearEdits) {
                userSuppliedSegments = null
            }
            if (userSuppliedSegments != null) {
                writeSegments(userSuppliedSegments, paintInfo);
                return
            }
            segments = [];
            lastx = null;
            lasty = null;
            lastOrientation = null;
            var midx = paintInfo.startStubX + ((paintInfo.endStubX - paintInfo.startStubX) * midpoint), midy = paintInfo.startStubY + ((paintInfo.endStubY - paintInfo.startStubY) * midpoint);
            var findClearedLine = function (start, mult, anchorPos, dimension) {
                return start + (mult * ((1 - anchorPos) * dimension) + _super.maxStub)
            }, orientations = {x: [0, 1], y: [1, 0]}, commonStubCalculator = function (axis) {
                return [paintInfo.startStubX, paintInfo.startStubY, paintInfo.endStubX, paintInfo.endStubY]
            }, stubCalculators = {
                perpendicular: commonStubCalculator,
                orthogonal: commonStubCalculator,
                opposite: function (axis) {
                    var pi = paintInfo, idx = axis == "x" ? 0 : 1, areInProximity = {
                        x: function () {
                            return ((pi.so[idx] == 1 && (((pi.startStubX > pi.endStubX) && (pi.tx > pi.startStubX)) || ((pi.sx > pi.endStubX) && (pi.tx > pi.sx))))) || ((pi.so[idx] == -1 && (((pi.startStubX < pi.endStubX) && (pi.tx < pi.startStubX)) || ((pi.sx < pi.endStubX) && (pi.tx < pi.sx)))))
                        }, y: function () {
                            return ((pi.so[idx] == 1 && (((pi.startStubY > pi.endStubY) && (pi.ty > pi.startStubY)) || ((pi.sy > pi.endStubY) && (pi.ty > pi.sy))))) || ((pi.so[idx] == -1 && (((pi.startStubY < pi.endStubY) && (pi.ty < pi.startStubY)) || ((pi.sy < pi.endStubY) && (pi.ty < pi.sy)))))
                        }
                    };
                    if (!alwaysRespectStubs && areInProximity[axis]()) {
                        return {
                            x: [(paintInfo.sx + paintInfo.tx) / 2, paintInfo.startStubY, (paintInfo.sx + paintInfo.tx) / 2, paintInfo.endStubY],
                            y: [paintInfo.startStubX, (paintInfo.sy + paintInfo.ty) / 2, paintInfo.endStubX, (paintInfo.sy + paintInfo.ty) / 2]
                        }[axis]
                    } else {
                        return [paintInfo.startStubX, paintInfo.startStubY, paintInfo.endStubX, paintInfo.endStubY]
                    }
                }
            }, lineCalculators = {
                perpendicular: function (axis, ss, oss, es, oes) {
                    with (paintInfo) {
                        var sis = {
                            x: [[[1, 2, 3, 4], null, [2, 1, 4, 3]], null, [[4, 3, 2, 1], null, [3, 4, 1, 2]]],
                            y: [[[3, 2, 1, 4], null, [2, 3, 4, 1]], null, [[4, 1, 2, 3], null, [1, 4, 3, 2]]]
                        }, stubs = {
                            x: [[startStubX, endStubX], null, [endStubX, startStubX]],
                            y: [[startStubY, endStubY], null, [endStubY, startStubY]]
                        }, midLines = {
                            x: [[midx, startStubY], [midx, endStubY]],
                            y: [[startStubX, midy], [endStubX, midy]]
                        }, linesToEnd = {
                            x: [[endStubX, startStubY]],
                            y: [[startStubX, endStubY]]
                        }, startToEnd = {
                            x: [[startStubX, endStubY], [endStubX, endStubY]],
                            y: [[endStubX, startStubY], [endStubX, endStubY]]
                        }, startToMidToEnd = {
                            x: [[startStubX, midy], [endStubX, midy], [endStubX, endStubY]],
                            y: [[midx, startStubY], [midx, endStubY], [endStubX, endStubY]]
                        }, otherStubs = {
                            x: [startStubY, endStubY],
                            y: [startStubX, endStubX]
                        }, soIdx = orientations[axis][0], toIdx = orientations[axis][1], _so = so[soIdx] + 1, _to = to[toIdx] + 1, otherFlipped = (to[toIdx] == -1 && (otherStubs[axis][1] < otherStubs[axis][0])) || (to[toIdx] == 1 && (otherStubs[axis][1] > otherStubs[axis][0])), stub1 = stubs[axis][_so][0], stub2 = stubs[axis][_so][1], segmentIndexes = sis[axis][_so][_to];
                        if (segment == segmentIndexes[3] || (segment == segmentIndexes[2] && otherFlipped)) {
                            return midLines[axis]
                        } else {
                            if (segment == segmentIndexes[2] && stub2 < stub1) {
                                return linesToEnd[axis]
                            } else {
                                if ((segment == segmentIndexes[2] && stub2 >= stub1) || (segment == segmentIndexes[1] && !otherFlipped)) {
                                    return startToMidToEnd[axis]
                                } else {
                                    if (segment == segmentIndexes[0] || (segment == segmentIndexes[1] && otherFlipped)) {
                                        return startToEnd[axis]
                                    }
                                }
                            }
                        }
                    }
                }, orthogonal: function (axis, startStub, otherStartStub, endStub, otherEndStub) {
                    var pi = paintInfo, extent = {
                        x: pi.so[0] == -1 ? Math.min(startStub, endStub) : Math.max(startStub, endStub),
                        y: pi.so[1] == -1 ? Math.min(startStub, endStub) : Math.max(startStub, endStub)
                    }[axis];
                    return {
                        x: [[extent, otherStartStub], [extent, otherEndStub], [endStub, otherEndStub]],
                        y: [[otherStartStub, extent], [otherEndStub, extent], [otherEndStub, endStub]]
                    }[axis]
                }, opposite: function (axis, ss, oss, es, oes) {
                    var pi = paintInfo, otherAxis = {x: "y", y: "x"}[axis], dim = {
                        x: "height",
                        y: "width"
                    }[axis], comparator = pi["is" + axis.toUpperCase() + "GreaterThanStubTimes2"];
                    if (params.sourceEndpoint.elementId == params.targetEndpoint.elementId) {
                        var _val = oss + ((1 - params.sourceEndpoint.anchor[otherAxis]) * params.sourceInfo[dim]) + _super.maxStub;
                        return {x: [[ss, _val], [es, _val]], y: [[_val, ss], [_val, es]]}[axis]
                    } else {
                        if (!comparator || (pi.so[idx] == 1 && ss > es) || (pi.so[idx] == -1 && ss < es)) {
                            return {x: [[ss, midy], [es, midy]], y: [[midx, ss], [midx, es]]}[axis]
                        } else {
                            if ((pi.so[idx] == 1 && ss < es) || (pi.so[idx] == -1 && ss > es)) {
                                return {x: [[midx, pi.sy], [midx, pi.ty]], y: [[pi.sx, midy], [pi.tx, midy]]}[axis]
                            }
                        }
                    }
                }
            };
            var stubs = stubCalculators[paintInfo.anchorOrientation](paintInfo.sourceAxis), idx = paintInfo.sourceAxis == "x" ? 0 : 1, oidx = paintInfo.sourceAxis == "x" ? 1 : 0, ss = stubs[idx], oss = stubs[oidx], es = stubs[idx + 2], oes = stubs[oidx + 2];
            addSegment(segments, stubs[0], stubs[1], paintInfo);
            var p = lineCalculators[paintInfo.anchorOrientation](paintInfo.sourceAxis, ss, oss, es, oes);
            if (p) {
                for (var i = 0; i < p.length; i++) {
                    addSegment(segments, p[i][0], p[i][1], paintInfo)
                }
            }
            addSegment(segments, stubs[2], stubs[3], paintInfo);
            addSegment(segments, paintInfo.tx, paintInfo.ty, paintInfo);
            writeSegments(segments, paintInfo)
        };
        this.getPath = function () {
            var _last = null, _lastAxis = null, s = [], segs = userSuppliedSegments || segments;
            for (var i = 0; i < segs.length; i++) {
                var seg = segs[i], axis = seg[4], axisIndex = (axis == "v" ? 3 : 2);
                if (_last != null && _lastAxis === axis) {
                    _last[axisIndex] = seg[axisIndex]
                } else {
                    if (seg[0] != seg[2] || seg[1] != seg[3]) {
                        s.push({start: [seg[0], seg[1]], end: [seg[2], seg[3]]});
                        _last = seg;
                        _lastAxis = seg[4]
                    }
                }
            }
            return s
        };
        this.setPath = function (path) {
            userSuppliedSegments = [];
            for (var i = 0; i < path.length; i++) {
                var lx = path[i].start[0], ly = path[i].start[1], x = path[i].end[0], y = path[i].end[1], o = lx == x ? "v" : "h", sgnx = sgn(x - lx), sgny = sgn(y - ly);
                userSuppliedSegments.push([lx, ly, x, y, o, sgnx, sgny])
            }
        }
    }
})();
(function () {
    var h = {
        "stroke-linejoin": "joinstyle",
        joinstyle: "joinstyle",
        endcap: "endcap",
        miterlimit: "miterlimit"
    }, c = null;
    if (document.createStyleSheet && document.namespaces) {
        var m = [".jsplumb_vml", "jsplumb\\:textbox", "jsplumb\\:oval", "jsplumb\\:rect", "jsplumb\\:stroke", "jsplumb\\:shape", "jsplumb\\:group"], g = "behavior:url(#default#VML);position:absolute;";
        c = document.createStyleSheet();
        for (var r = 0; r < m.length; r++) {
            c.addRule(m[r], g)
        }
        document.namespaces.add("jsplumb", "urn:schemas-microsoft-com:vml")
    }
    jsPlumb.vml = {};
    var t = 1000, s = {}, a = function (u, i) {
        var w = jsPlumb.getId(u), v = s[w];
        if (!v) {
            v = f("group", [0, 0, t, t], {"class": i});
            v.style.backgroundColor = "red";
            s[w] = v;
            jsPlumb.appendElement(v, u)
        }
        return v
    }, e = function (v, w) {
        for (var u in w) {
            v[u] = w[u]
        }
    }, f = function (u, y, z, w, i, v) {
        z = z || {};
        var x = document.createElement("jsplumb:" + u);
        if (v) {
            i.appendElement(x, w)
        } else {
            jsPlumb.CurrentLibrary.appendElement(x, w)
        }
        x.className = (z["class"] ? z["class"] + " " : "") + "jsplumb_vml";
        k(x, y);
        e(x, z);
        return x
    }, k = function (u, i, v) {
        u.style.left = i[0] + "px";
        u.style.top = i[1] + "px";
        u.style.width = i[2] + "px";
        u.style.height = i[3] + "px";
        u.style.position = "absolute";
        if (v) {
            u.style.zIndex = v
        }
    }, p = jsPlumb.vml.convertValue = function (i) {
        return Math.floor(i * t)
    }, b = function (w, u, v, i) {
        if ("transparent" === u) {
            i.setOpacity(v, "0.0")
        } else {
            i.setOpacity(v, "1.0")
        }
    }, q = function (y, u, B, C) {
        var x = {};
        if (u.strokeStyle) {
            x.stroked = "true";
            var D = jsPlumbUtil.convertStyle(u.strokeStyle, true);
            x.strokecolor = D;
            b(x, D, "stroke", B);
            x.strokeweight = u.lineWidth + "px"
        } else {
            x.stroked = "false"
        }
        if (u.fillStyle) {
            x.filled = "true";
            var v = jsPlumbUtil.convertStyle(u.fillStyle, true);
            x.fillcolor = v;
            b(x, v, "fill", B)
        } else {
            x.filled = "false"
        }
        if (u.dashstyle) {
            if (B.strokeNode == null) {
                B.strokeNode = f("stroke", [0, 0, 0, 0], {dashstyle: u.dashstyle}, y, C)
            } else {
                B.strokeNode.dashstyle = u.dashstyle
            }
        } else {
            if (u["stroke-dasharray"] && u.lineWidth) {
                var E = u["stroke-dasharray"].indexOf(",") == -1 ? " " : ",", z = u["stroke-dasharray"].split(E), w = "";
                for (var A = 0; A < z.length; A++) {
                    w += (Math.floor(z[A] / u.lineWidth) + E)
                }
                if (B.strokeNode == null) {
                    B.strokeNode = f("stroke", [0, 0, 0, 0], {dashstyle: w}, y, C)
                } else {
                    B.strokeNode.dashstyle = w
                }
            }
        }
        e(y, x)
    }, n = function () {
        var i = this, v = {};
        jsPlumb.jsPlumbUIComponent.apply(this, arguments);
        this.opacityNodes = {stroke: null, fill: null};
        this.initOpacityNodes = function (w) {
            i.opacityNodes.stroke = f("stroke", [0, 0, 1, 1], {opacity: "0.0"}, w, i._jsPlumb);
            i.opacityNodes.fill = f("fill", [0, 0, 1, 1], {opacity: "0.0"}, w, i._jsPlumb)
        };
        this.setOpacity = function (w, y) {
            var x = i.opacityNodes[w];
            if (x) {
                x.opacity = "" + y
            }
        };
        var u = [];
        this.getDisplayElements = function () {
            return u
        };
        this.appendDisplayElement = function (x, w) {
            if (!w) {
                i.canvas.parentNode.appendChild(x)
            }
            u.push(x)
        }
    }, d = jsPlumb.ConnectorRenderers.vml = function (w) {
        var i = this;
        i.strokeNode = null;
        i.canvas = null;
        var v = n.apply(this, arguments);
        var u = i._jsPlumb.connectorClass + (w.cssClass ? (" " + w.cssClass) : "");
        this.paint = function (y) {
            if (y !== null) {
                var B = i.getSegments(), z = {path: ""}, C = [i.x, i.y, i.w, i.h];
                for (var A = 0; A < B.length; A++) {
                    z.path += jsPlumb.Segments.vml.SegmentRenderer.getPath(B[A]);
                    z.path += " "
                }
                if (y.outlineColor) {
                    var E = y.outlineWidth || 1, F = y.lineWidth + (2 * E), D = {
                        strokeStyle: jsPlumbUtil.convertStyle(y.outlineColor),
                        lineWidth: F
                    };
                    for (var x in h) {
                        D[x] = y[x]
                    }
                    if (i.bgCanvas == null) {
                        z["class"] = u;
                        z.coordsize = (C[2] * t) + "," + (C[3] * t);
                        i.bgCanvas = f("shape", C, z, w.parent, i._jsPlumb, true);
                        k(i.bgCanvas, C);
                        i.appendDisplayElement(i.bgCanvas, true);
                        i.attachListeners(i.bgCanvas, i);
                        i.initOpacityNodes(i.bgCanvas, ["stroke"])
                    } else {
                        z.coordsize = (C[2] * t) + "," + (C[3] * t);
                        k(i.bgCanvas, C);
                        e(i.bgCanvas, z)
                    }
                    q(i.bgCanvas, D, i)
                }
                if (i.canvas == null) {
                    z["class"] = u;
                    z.coordsize = (C[2] * t) + "," + (C[3] * t);
                    i.canvas = f("shape", C, z, w.parent, i._jsPlumb, true);
                    i.appendDisplayElement(i.canvas, true);
                    i.attachListeners(i.canvas, i);
                    i.initOpacityNodes(i.canvas, ["stroke"])
                } else {
                    z.coordsize = (C[2] * t) + "," + (C[3] * t);
                    k(i.canvas, C);
                    e(i.canvas, z)
                }
                q(i.canvas, y, i, i._jsPlumb)
            }
        };
        this.reattachListeners = function () {
            if (i.canvas) {
                i.reattachListenersForElement(i.canvas, i)
            }
        }
    }, l = window.VmlEndpoint = function (y) {
        n.apply(this, arguments);
        var i = null, v = this, u = null, x = null;
        v.canvas = document.createElement("div");
        v.canvas.style.position = "absolute";
        var w = v._jsPlumb.endpointClass + (y.cssClass ? (" " + y.cssClass) : "");
        y._jsPlumb.appendElement(v.canvas, y.parent);
        this.paint = function (A, z) {
            var B = {};
            jsPlumb.sizeCanvas(v.canvas, v.x, v.y, v.w, v.h);
            if (i == null) {
                B["class"] = w;
                i = v.getVml([0, 0, v.w, v.h], B, z, v.canvas, v._jsPlumb);
                v.attachListeners(i, v);
                v.appendDisplayElement(i, true);
                v.appendDisplayElement(v.canvas, true);
                v.initOpacityNodes(i, ["fill"])
            } else {
                k(i, [0, 0, v.w, v.h]);
                e(i, B)
            }
            q(i, A, v)
        };
        this.reattachListeners = function () {
            if (i) {
                v.reattachListenersForElement(i, v)
            }
        }
    };
    jsPlumb.Segments.vml = {
        SegmentRenderer: {
            getPath: function (i) {
                return ({
                    Straight: function (u) {
                        var v = u.params;
                        return "m" + p(v.x1) + "," + p(v.y1) + " l" + p(v.x2) + "," + p(v.y2) + " e"
                    }, Bezier: function (u) {
                        var v = u.params;
                        return "m" + p(v.x1) + "," + p(v.y1) + " c" + p(v.cp1x) + "," + p(v.cp1y) + "," + p(v.cp2x) + "," + p(v.cp2y) + "," + p(v.x2) + "," + p(v.y2) + " e"
                    }, Arc: function (z) {
                        var B = z.params, u = Math.min(B.x1, B.x2), y = Math.max(B.x1, B.x2), C = Math.min(B.y1, B.y2), w = Math.max(B.y1, B.y2), A = z.anticlockwise ? 1 : 0, v = (z.anticlockwise ? "at " : "wa "), x = function () {
                            var D = [null, [function () {
                                return [u, C]
                            }, function () {
                                return [u - B.r, C - B.r]
                            }], [function () {
                                return [u - B.r, C]
                            }, function () {
                                return [u, C - B.r]
                            }], [function () {
                                return [u - B.r, C - B.r]
                            }, function () {
                                return [u, C]
                            }], [function () {
                                return [u, C - B.r]
                            }, function () {
                                return [u - B.r, C]
                            }]][z.segment][A]();
                            return p(D[0]) + "," + p(D[1]) + "," + p(D[0] + (2 * B.r)) + "," + p(D[1] + (2 * B.r))
                        };
                        return v + x() + "," + p(B.x1) + "," + p(B.y1) + "," + p(B.x2) + "," + p(B.y2) + " e"
                    }
                })[i.type](i)
            }
        }
    };
    jsPlumb.Endpoints.vml.Dot = function () {
        jsPlumb.Endpoints.Dot.apply(this, arguments);
        l.apply(this, arguments);
        this.getVml = function (w, x, u, v, i) {
            return f("oval", w, x, v, i)
        }
    };
    jsPlumb.Endpoints.vml.Rectangle = function () {
        jsPlumb.Endpoints.Rectangle.apply(this, arguments);
        l.apply(this, arguments);
        this.getVml = function (w, x, u, v, i) {
            return f("rect", w, x, v, i)
        }
    };
    jsPlumb.Endpoints.vml.Image = jsPlumb.Endpoints.Image;
    jsPlumb.Endpoints.vml.Blank = jsPlumb.Endpoints.Blank;
    jsPlumb.Overlays.vml.Label = jsPlumb.Overlays.Label;
    jsPlumb.Overlays.vml.Custom = jsPlumb.Overlays.Custom;
    var o = function (x, v) {
        x.apply(this, v);
        n.apply(this, v);
        var u = this, w = null;
        u.canvas = null;
        u.isAppendedAtTopLevel = true;
        var i = function (y) {
            return "m " + p(y.hxy.x) + "," + p(y.hxy.y) + " l " + p(y.tail[0].x) + "," + p(y.tail[0].y) + " " + p(y.cxy.x) + "," + p(y.cxy.y) + " " + p(y.tail[1].x) + "," + p(y.tail[1].y) + " x e"
        };
        this.paint = function (C, D) {
            var z = {}, I = C.d, B = C.component;
            if (C.strokeStyle) {
                z.stroked = "true";
                z.strokecolor = jsPlumbUtil.convertStyle(C.strokeStyle, true)
            }
            if (C.lineWidth) {
                z.strokeweight = C.lineWidth + "px"
            }
            if (C.fillStyle) {
                z.filled = "true";
                z.fillcolor = C.fillStyle
            }
            var y = Math.min(I.hxy.x, I.tail[0].x, I.tail[1].x, I.cxy.x), L = Math.min(I.hxy.y, I.tail[0].y, I.tail[1].y, I.cxy.y), E = Math.max(I.hxy.x, I.tail[0].x, I.tail[1].x, I.cxy.x), A = Math.max(I.hxy.y, I.tail[0].y, I.tail[1].y, I.cxy.y), K = Math.abs(E - y), G = Math.abs(A - L), F = [y, L, K, G];
            z.path = i(I);
            z.coordsize = (B.w * t) + "," + (B.h * t);
            F[0] = B.x;
            F[1] = B.y;
            F[2] = B.w;
            F[3] = B.h;
            if (u.canvas == null) {
                var J = B._jsPlumb.overlayClass || "";
                var H = v && (v.length == 1) ? (v[0].cssClass || "") : "";
                z["class"] = H + " " + J;
                u.canvas = f("shape", F, z, B.canvas.parentNode, B._jsPlumb, true);
                B.appendDisplayElement(u.canvas, true);
                u.attachListeners(u.canvas, B);
                u.attachListeners(u.canvas, u)
            } else {
                k(u.canvas, F);
                e(u.canvas, z)
            }
        };
        this.reattachListeners = function () {
            if (u.canvas) {
                u.reattachListenersForElement(u.canvas, u)
            }
        };
        this.cleanup = function () {
            if (u.canvas != null) {
                jsPlumb.CurrentLibrary.removeElement(u.canvas)
            }
        }
    };
    jsPlumb.Overlays.vml.Arrow = function () {
        o.apply(this, [jsPlumb.Overlays.Arrow, arguments])
    };
    jsPlumb.Overlays.vml.PlainArrow = function () {
        o.apply(this, [jsPlumb.Overlays.PlainArrow, arguments])
    };
    jsPlumb.Overlays.vml.Diamond = function () {
        o.apply(this, [jsPlumb.Overlays.Diamond, arguments])
    }
})();
(function () {
    var l = {
        joinstyle: "stroke-linejoin",
        "stroke-linejoin": "stroke-linejoin",
        "stroke-dashoffset": "stroke-dashoffset",
        "stroke-linecap": "stroke-linecap"
    }, w = "stroke-dasharray", B = "dashstyle", e = "linearGradient", b = "radialGradient", c = "fill", a = "stop", A = "stroke", q = "stroke-width", h = "style", m = "none", t = "jsplumb_gradient_", o = "lineWidth", D = {
        svg: "http://www.w3.org/2000/svg",
        xhtml: "http://www.w3.org/1999/xhtml"
    }, g = function (G, E) {
        for (var F in E) {
            G.setAttribute(F, "" + E[F])
        }
    }, f = function (F, E) {
        var G = document.createElementNS(D.svg, F);
        E = E || {};
        E.version = "1.1";
        E.xmlns = D.xhtml;
        g(G, E);
        return G
    }, n = function (E) {
        return "position:absolute;left:" + E[0] + "px;top:" + E[1] + "px"
    }, i = function (F) {
        for (var E = 0; E < F.childNodes.length; E++) {
            if (F.childNodes[E].tagName == e || F.childNodes[E].tagName == b) {
                F.removeChild(F.childNodes[E])
            }
        }
    }, v = function (O, J, G, E, K) {
        var H = t + K._jsPlumb.idstamp();
        i(O);
        var M;
        if (!G.gradient.offset) {
            M = f(e, {id: H, gradientUnits: "userSpaceOnUse"})
        } else {
            M = f(b, {id: H})
        }
        O.appendChild(M);
        for (var L = 0; L < G.gradient.stops.length; L++) {
            var I = K.segment == 1 || K.segment == 2 ? L : G.gradient.stops.length - 1 - L, N = jsPlumbUtil.convertStyle(G.gradient.stops[I][1], true), P = f(a, {
                offset: Math.floor(G.gradient.stops[L][0] * 100) + "%",
                "stop-color": N
            });
            M.appendChild(P)
        }
        var F = G.strokeStyle ? A : c;
        J.setAttribute(h, F + ":url(#" + H + ")")
    }, x = function (L, H, F, E, I) {
        if (F.gradient) {
            v(L, H, F, E, I)
        } else {
            i(L);
            H.setAttribute(h, "")
        }
        H.setAttribute(c, F.fillStyle ? jsPlumbUtil.convertStyle(F.fillStyle, true) : m);
        H.setAttribute(A, F.strokeStyle ? jsPlumbUtil.convertStyle(F.strokeStyle, true) : m);
        if (F.lineWidth) {
            H.setAttribute(q, F.lineWidth)
        }
        if (F[B] && F[o] && !F[w]) {
            var M = F[B].indexOf(",") == -1 ? " " : ",", J = F[B].split(M), G = "";
            J.forEach(function (N) {
                G += (Math.floor(N * F.lineWidth) + M)
            });
            H.setAttribute(w, G)
        } else {
            if (F[w]) {
                H.setAttribute(w, F[w])
            }
        }
        for (var K in l) {
            if (F[K]) {
                H.setAttribute(l[K], F[K])
            }
        }
    }, C = function (G) {
        var E = /([0-9].)(p[xt])\s(.*)/, F = G.match(E);
        return {size: F[1] + F[2], font: F[3]}
    }, r = function (J, K, F) {
        var L = F.split(" "), I = J.className, H = I.baseVal.split(" ");
        for (var G = 0; G < L.length; G++) {
            if (K) {
                if (H.indexOf(L[G]) == -1) {
                    H.push(L[G])
                }
            } else {
                var E = H.indexOf(L[G]);
                if (E != -1) {
                    H.splice(E, 1)
                }
            }
        }
        J.className.baseVal = H.join(" ")
    }, u = function (F, E) {
        r(F, true, E)
    }, k = function (F, E) {
        r(F, false, E)
    }, z = function (F, G, E) {
        if (F.childNodes.length > E) {
            F.insertBefore(G, F.childNodes[E])
        } else {
            F.appendChild(G)
        }
    };
    jsPlumbUtil.svg = {addClass: u, removeClass: k, node: f, attr: g, pos: n};
    var s = function (J) {
        var E = this, H = J.pointerEventsSpec || "all", I = {};
        jsPlumb.jsPlumbUIComponent.apply(this, J.originalArgs);
        E.canvas = null, E.path = null, E.svg = null;
        var G = J.cssClass + " " + (J.originalArgs[0].cssClass || ""), K = {
            style: "",
            width: 0,
            height: 0,
            "pointer-events": H,
            position: "absolute"
        };
        E.svg = f("svg", K);
        if (J.useDivWrapper) {
            E.canvas = document.createElement("div");
            E.canvas.style.position = "absolute";
            jsPlumb.sizeCanvas(E.canvas, 0, 0, 1, 1);
            E.canvas.className = G
        } else {
            g(E.svg, {"class": G});
            E.canvas = E.svg
        }
        J._jsPlumb.appendElement(E.canvas, J.originalArgs[0]["parent"]);
        if (J.useDivWrapper) {
            E.canvas.appendChild(E.svg)
        }
        var F = [E.canvas];
        this.getDisplayElements = function () {
            return F
        };
        this.appendDisplayElement = function (L) {
            F.push(L)
        };
        this.paint = function (N, M, O) {
            if (N != null) {
                var Q = [E.x, E.y], L = [E.w, E.h], P;
                if (O != null) {
                    if (O.xmin < 0) {
                        Q[0] += O.xmin
                    }
                    if (O.ymin < 0) {
                        Q[1] += O.ymin
                    }
                    L[0] = O.xmax + ((O.xmin < 0) ? -O.xmin : 0);
                    L[1] = O.ymax + ((O.ymin < 0) ? -O.ymin : 0)
                }
                if (J.useDivWrapper) {
                    jsPlumb.sizeCanvas(E.canvas, Q[0], Q[1], L[0], L[1]);
                    Q[0] = 0, Q[1] = 0;
                    P = n([0, 0])
                } else {
                    P = n([Q[0], Q[1]])
                }
                I.paint.apply(this, arguments);
                g(E.svg, {style: P, width: L[0], height: L[1]})
            }
        };
        return {renderer: I}
    };
    var d = jsPlumb.ConnectorRenderers.svg = function (G) {
        var E = this, F = s.apply(this, [{
            cssClass: G._jsPlumb.connectorClass,
            originalArgs: arguments,
            pointerEventsSpec: "none",
            _jsPlumb: G._jsPlumb
        }]);
        F.renderer.paint = function (H, L, Q) {
            var M = E.getSegments(), I = "", J = [0, 0];
            if (Q.xmin < 0) {
                J[0] = -Q.xmin
            }
            if (Q.ymin < 0) {
                J[1] = -Q.ymin
            }
            for (var K = 0; K < M.length; K++) {
                I += jsPlumb.Segments.svg.SegmentRenderer.getPath(M[K]);
                I += " "
            }
            var R = {
                d: I,
                transform: "translate(" + J[0] + "," + J[1] + ")",
                "pointer-events": G["pointer-events"] || "visibleStroke"
            }, O = null, N = [E.x, E.y, E.w, E.h];
            if (H.outlineColor) {
                var P = H.outlineWidth || 1, S = H.lineWidth + (2 * P), O = jsPlumb.CurrentLibrary.extend({}, H);
                O.strokeStyle = jsPlumbUtil.convertStyle(H.outlineColor);
                O.lineWidth = S;
                if (E.bgPath == null) {
                    E.bgPath = f("path", R);
                    z(E.svg, E.bgPath, 0);
                    E.attachListeners(E.bgPath, E)
                } else {
                    g(E.bgPath, R)
                }
                x(E.svg, E.bgPath, O, N, E)
            }
            if (E.path == null) {
                E.path = f("path", R);
                z(E.svg, E.path, H.outlineColor ? 1 : 0);
                E.attachListeners(E.path, E)
            } else {
                g(E.path, R)
            }
            x(E.svg, E.path, H, N, E)
        };
        this.reattachListeners = function () {
            if (E.bgPath) {
                E.reattachListenersForElement(E.bgPath, E)
            }
            if (E.path) {
                E.reattachListenersForElement(E.path, E)
            }
        }
    };
    jsPlumb.Segments.svg = {
        SegmentRenderer: {
            getPath: function (E) {
                return ({
                    Straight: function () {
                        var F = E.getCoordinates();
                        return "M " + F.x1 + " " + F.y1 + " L " + F.x2 + " " + F.y2
                    }, Bezier: function () {
                        var F = E.params;
                        return "M " + F.x1 + " " + F.y1 + " C " + F.cp1x + " " + F.cp1y + " " + F.cp2x + " " + F.cp2y + " " + F.x2 + " " + F.y2
                    }, Arc: function () {
                        var H = E.params, F = E.sweep > Math.PI ? 1 : 0, G = E.anticlockwise ? 0 : 1;
                        return "M" + E.x1 + " " + E.y1 + " A " + E.radius + " " + H.r + " 0 " + F + "," + G + " " + E.x2 + " " + E.y2
                    }
                })[E.type]()
            }
        }
    };
    var y = window.SvgEndpoint = function (G) {
        var E = this, F = s.apply(this, [{
            cssClass: G._jsPlumb.endpointClass,
            originalArgs: arguments,
            pointerEventsSpec: "all",
            useDivWrapper: true,
            _jsPlumb: G._jsPlumb
        }]);
        F.renderer.paint = function (I) {
            var H = jsPlumb.extend({}, I);
            if (H.outlineColor) {
                H.strokeWidth = H.outlineWidth;
                H.strokeStyle = jsPlumbUtil.convertStyle(H.outlineColor, true)
            }
            if (E.node == null) {
                E.node = E.makeNode(H);
                E.svg.appendChild(E.node);
                E.attachListeners(E.node, E)
            } else {
                if (E.updateNode != null) {
                    E.updateNode(E.node)
                }
            }
            x(E.svg, E.node, H, [E.x, E.y, E.w, E.h], E);
            n(E.node, [E.x, E.y])
        };
        this.reattachListeners = function () {
            if (E.node) {
                E.reattachListenersForElement(E.node, E)
            }
        }
    };
    jsPlumb.Endpoints.svg.Dot = function () {
        jsPlumb.Endpoints.Dot.apply(this, arguments);
        y.apply(this, arguments);
        this.makeNode = function (E) {
            return f("circle", {cx: this.w / 2, cy: this.h / 2, r: this.radius})
        };
        this.updateNode = function (E) {
            g(E, {cx: this.w / 2, cy: this.h / 2, r: this.radius})
        }
    };
    jsPlumb.Endpoints.svg.Rectangle = function () {
        jsPlumb.Endpoints.Rectangle.apply(this, arguments);
        y.apply(this, arguments);
        this.makeNode = function (E) {
            return f("rect", {width: this.w, height: this.h})
        };
        this.updateNode = function (E) {
            g(E, {width: this.w, height: this.h})
        }
    };
    jsPlumb.Endpoints.svg.Image = jsPlumb.Endpoints.Image;
    jsPlumb.Endpoints.svg.Blank = jsPlumb.Endpoints.Blank;
    jsPlumb.Overlays.svg.Label = jsPlumb.Overlays.Label;
    jsPlumb.Overlays.svg.Custom = jsPlumb.Overlays.Custom;
    var p = function (I, G) {
        I.apply(this, G);
        jsPlumb.jsPlumbUIComponent.apply(this, G);
        this.isAppendedAtTopLevel = false;
        var E = this, H = null;
        this.paint = function (M, J) {
            if (M.component.svg && J) {
                if (H == null) {
                    H = f("path", {"pointer-events": "all"});
                    M.component.svg.appendChild(H);
                    E.attachListeners(H, M.component);
                    E.attachListeners(H, E)
                }
                var K = G && (G.length == 1) ? (G[0].cssClass || "") : "", L = [0, 0];
                if (J.xmin < 0) {
                    L[0] = -J.xmin
                }
                if (J.ymin < 0) {
                    L[1] = -J.ymin
                }
                g(H, {
                    d: F(M.d),
                    "class": K,
                    stroke: M.strokeStyle ? M.strokeStyle : null,
                    fill: M.fillStyle ? M.fillStyle : null,
                    transform: "translate(" + L[0] + "," + L[1] + ")"
                })
            }
        };
        var F = function (J) {
            return "M" + J.hxy.x + "," + J.hxy.y + " L" + J.tail[0].x + "," + J.tail[0].y + " L" + J.cxy.x + "," + J.cxy.y + " L" + J.tail[1].x + "," + J.tail[1].y + " L" + J.hxy.x + "," + J.hxy.y
        };
        this.reattachListeners = function () {
            if (H) {
                E.reattachListenersForElement(H, E)
            }
        };
        this.cleanup = function () {
            if (H != null) {
                jsPlumb.CurrentLibrary.removeElement(H)
            }
        }
    };
    jsPlumb.Overlays.svg.Arrow = function () {
        p.apply(this, [jsPlumb.Overlays.Arrow, arguments])
    };
    jsPlumb.Overlays.svg.PlainArrow = function () {
        p.apply(this, [jsPlumb.Overlays.PlainArrow, arguments])
    };
    jsPlumb.Overlays.svg.Diamond = function () {
        p.apply(this, [jsPlumb.Overlays.Diamond, arguments])
    };
    jsPlumb.Overlays.svg.GuideLines = function () {
        var I = null, E = this, H, G;
        jsPlumb.Overlays.GuideLines.apply(this, arguments);
        this.paint = function (L, J) {
            if (I == null) {
                I = f("path");
                L.connector.svg.appendChild(I);
                E.attachListeners(I, L.connector);
                E.attachListeners(I, E);
                H = f("path");
                L.connector.svg.appendChild(H);
                E.attachListeners(H, L.connector);
                E.attachListeners(H, E);
                G = f("path");
                L.connector.svg.appendChild(G);
                E.attachListeners(G, L.connector);
                E.attachListeners(G, E)
            }
            var K = [0, 0];
            if (J.xmin < 0) {
                K[0] = -J.xmin
            }
            if (J.ymin < 0) {
                K[1] = -J.ymin
            }
            g(I, {d: F(L.head, L.tail), stroke: "red", fill: null, transform: "translate(" + K[0] + "," + K[1] + ")"});
            g(H, {
                d: F(L.tailLine[0], L.tailLine[1]),
                stroke: "blue",
                fill: null,
                transform: "translate(" + K[0] + "," + K[1] + ")"
            });
            g(G, {
                d: F(L.headLine[0], L.headLine[1]),
                stroke: "green",
                fill: null,
                transform: "translate(" + K[0] + "," + K[1] + ")"
            })
        };
        var F = function (K, J) {
            return "M " + K.x + "," + K.y + " L" + J.x + "," + J.y
        }
    }
})();
(function (b) {
    var a = function (c) {
        return typeof(c) == "string" ? b("#" + c) : b(c)
    };
    jsPlumb.CurrentLibrary = {
        addClass: function (d, c) {
            d = a(d);
            try {
                if (d[0].className.constructor == SVGAnimatedString) {
                    jsPlumbUtil.svg.addClass(d[0], c)
                }
            } catch (f) {
            }
            try {
                d.addClass(c)
            } catch (f) {
            }
        },
        animate: function (e, d, c) {
            e.animate(d, c)
        },
        appendElement: function (d, c) {
            a(c).append(d)
        },
        ajax: function (c) {
            c = c || {};
            c.type = c.type || "get";
            b.ajax(c)
        },
        bind: function (c, d, e) {
            c = a(c);
            c.bind(d, e)
        },
        dragEvents: {
            start: "start",
            stop: "stop",
            drag: "drag",
            step: "step",
            over: "over",
            out: "out",
            drop: "drop",
            complete: "complete"
        },
        extend: function (d, c) {
            return b.extend(d, c)
        },
        getAttribute: function (c, d) {
            return c.attr(d)
        },
        getClientXY: function (c) {
            return [c.clientX, c.clientY]
        },
        getDragObject: function (c) {
            return c[1].draggable || c[1].helper
        },
        getDragScope: function (c) {
            return c.draggable("option", "scope")
        },
        getDropEvent: function (c) {
            return c[0]
        },
        getDropScope: function (c) {
            return c.droppable("option", "scope")
        },
        getDOMElement: function (c) {
            if (typeof(c) == "string") {
                return document.getElementById(c)
            } else {
                if (c.context || c.length != null) {
                    return c[0]
                } else {
                    return c
                }
            }
        },
        getElementObject: a,
        getOffset: function (c) {
            return c.offset()
        },
        getOriginalEvent: function (c) {
            return c.originalEvent
        },
        getPageXY: function (c) {
            return [c.pageX, c.pageY]
        },
        getParent: function (c) {
            return a(c).parent()
        },
        getScrollLeft: function (c) {
            return c.scrollLeft()
        },
        getScrollTop: function (c) {
            return c.scrollTop()
        },
        getSelector: function (d, c) {
            if (arguments.length == 2) {
                return a(d).find(c)
            } else {
                return b(d)
            }
        },
        getSize: function (c) {
            return [c.outerWidth(), c.outerHeight()]
        },
        getTagName: function (c) {
            var d = a(c);
            return d.length > 0 ? d[0].tagName : null
        },
        getUIPosition: function (d, e) {
            e = e || 1;
            if (d.length == 1) {
                ret = {left: d[0].pageX, top: d[0].pageY}
            } else {
                var f = d[1], c = f.offset;
                ret = c || f.absolutePosition;
                f.position.left /= e;
                f.position.top /= e
            }
            return {left: ret.left / e, top: ret.top / e}
        },
        hasClass: function (d, c) {
            return d.hasClass(c)
        },
        initDraggable: function (e, d, f, c) {
            d = d || {};
            if (!d.doNotRemoveHelper) {
                d.helper = null
            }
            if (f) {
                d.scope = d.scope || jsPlumb.Defaults.Scope
            }
            e.draggable(d)
        },
        initDroppable: function (d, c) {
            c.scope = c.scope || jsPlumb.Defaults.Scope;
            d.droppable(c)
        },
        isAlreadyDraggable: function (c) {
            return a(c).hasClass("ui-draggable")
        },
        isDragSupported: function (d, c) {
            return d.draggable
        },
        isDropSupported: function (d, c) {
            return d.droppable
        },
        removeClass: function (d, c) {
            d = a(d);
            try {
                if (d[0].className.constructor == SVGAnimatedString) {
                    jsPlumbUtil.svg.removeClass(d[0], c);
                    return
                }
            } catch (f) {
            }
            d.removeClass(c)
        },
        removeElement: function (c) {
            a(c).remove()
        },
        setAttribute: function (d, e, c) {
            d.attr(e, c)
        },
        setDragFilter: function (d, c) {
            if (jsPlumb.CurrentLibrary.isAlreadyDraggable(d)) {
                d.draggable("option", "cancel", c)
            }
        },
        setDraggable: function (d, c) {
            d.draggable("option", "disabled", !c)
        },
        setDragScope: function (d, c) {
            d.draggable("option", "scope", c)
        },
        setOffset: function (c, d) {
            a(c).offset(d)
        },
        trigger: function (e, f, c) {
            var d = jQuery._data(a(e)[0], "handle");
            d(c)
        },
        unbind: function (c, d, e) {
            c = a(c);
            c.unbind(d, e)
        }
    };
    b(document).ready(jsPlumb.init)
})(jQuery);
(function () {
    "undefined" == typeof Math.sgn && (Math.sgn = function (m) {
        return 0 == m ? 0 : 0 < m ? 1 : -1
    });
    var a = {
        subtract: function (n, m) {
            return {x: n.x - m.x, y: n.y - m.y}
        }, dotProduct: function (n, m) {
            return n.x * m.x + n.y * m.y
        }, square: function (m) {
            return Math.sqrt(m.x * m.x + m.y * m.y)
        }, scale: function (n, m) {
            return {x: n.x * m, y: n.y * m}
        }
    }, b = Math.pow(2, -65), f = function (z, y) {
        for (var u = [], w = y.length - 1, t = 2 * w - 1, s = [], v = [], p = [], r = [], q = [[1, 0.6, 0.3, 0.1], [0.4, 0.6, 0.6, 0.4], [0.1, 0.3, 0.6, 1]], x = 0; x <= w; x++) {
            s[x] = a.subtract(y[x], z)
        }
        for (x = 0; x <= w - 1; x++) {
            v[x] = a.subtract(y[x + 1], y[x]), v[x] = a.scale(v[x], 3)
        }
        for (x = 0; x <= w - 1; x++) {
            for (var o = 0; o <= w; o++) {
                p[x] || (p[x] = []), p[x][o] = a.dotProduct(v[x], s[o])
            }
        }
        for (x = 0; x <= t; x++) {
            r[x] || (r[x] = []), r[x].y = 0, r[x].x = parseFloat(x) / t
        }
        t = w - 1;
        for (s = 0; s <= w + t; s++) {
            x = Math.max(0, s - t);
            for (v = Math.min(s, w); x <= v; x++) {
                j = s - x, r[x + j].y += p[j][x] * q[j][x]
            }
        }
        w = y.length - 1;
        r = i(r, 2 * w - 1, u, 0);
        t = a.subtract(z, y[0]);
        p = a.square(t);
        for (x = q = 0; x < r; x++) {
            t = a.subtract(z, h(y, w, u[x], null, null)), t = a.square(t), t < p && (p = t, q = u[x])
        }
        t = a.subtract(z, y[w]);
        t = a.square(t);
        t < p && (p = t, q = 1);
        return {location: q, distance: p}
    }, i = function (D, C, y, A) {
        var x = [], w = [], z = [], t = [], v = 0, u, B;
        B = Math.sgn(D[0].y);
        for (var s = 1; s <= C; s++) {
            u = Math.sgn(D[s].y), u != B && v++, B = u
        }
        switch (v) {
            case 0:
                return 0;
            case 1:
                if (64 <= A) {
                    return y[0] = (D[0].x + D[C].x) / 2, 1
                }
                var o, q, v = D[0].y - D[C].y;
                B = D[C].x - D[0].x;
                s = D[0].x * D[C].y - D[C].x * D[0].y;
                u = max_distance_below = 0;
                for (o = 1; o < C; o++) {
                    q = v * D[o].x + B * D[o].y + s, q > u ? u = q : q < max_distance_below && (max_distance_below = q)
                }
                q = B;
                o = 0 * q - 1 * v;
                u = (1 * (s - u) - 0 * q) * (1 / o);
                q = B;
                B = s - max_distance_below;
                o = 0 * q - 1 * v;
                v = (1 * B - 0 * q) * (1 / o);
                B = Math.min(u, v);
                if (Math.max(u, v) - B < b) {
                    return z = D[C].x - D[0].x, t = D[C].y - D[0].y, y[0] = 0 + 1 * (z * (D[0].y - 0) - t * (D[0].x - 0)) * (1 / (0 * z - 1 * t)), 1
                }
        }
        h(D, C, 0.5, x, w);
        D = i(x, C, z, A + 1);
        C = i(w, C, t, A + 1);
        for (A = 0; A < D; A++) {
            y[A] = z[A]
        }
        for (A = 0; A < C; A++) {
            y[A + D] = t[A]
        }
        return D + C
    }, h = function (n, m, q, s, p) {
        for (var o = [[]], r = 0; r <= m; r++) {
            o[0][r] = n[r]
        }
        for (n = 1; n <= m; n++) {
            for (r = 0; r <= m - n; r++) {
                o[n] || (o[n] = []), o[n][r] || (o[n][r] = {}), o[n][r].x = (1 - q) * o[n - 1][r].x + q * o[n - 1][r + 1].x, o[n][r].y = (1 - q) * o[n - 1][r].y + q * o[n - 1][r + 1].y
            }
        }
        if (null != s) {
            for (r = 0; r <= m; r++) {
                s[r] = o[r][0]
            }
        }
        if (null != p) {
            for (r = 0; r <= m; r++) {
                p[r] = o[m - r][r]
            }
        }
        return o[m][0]
    }, e = {}, l = function (x, w) {
        var s, u = x.length - 1;
        s = e[u];
        if (!s) {
            s = [];
            var r = function (m) {
                return function () {
                    return m
                }
            }, q = function () {
                return function (m) {
                    return m
                }
            }, t = function () {
                return function (m) {
                    return 1 - m
                }
            }, n = function (m) {
                return function (y) {
                    for (var A = 1, z = 0; z < m.length; z++) {
                        A *= m[z](y)
                    }
                    return A
                }
            };
            s.push(new function () {
                return function (m) {
                    return Math.pow(m, u)
                }
            });
            for (var p = 1; p < u; p++) {
                for (var o = [new r(u)], v = 0; v < u - p; v++) {
                    o.push(new q)
                }
                for (v = 0; v < p; v++) {
                    o.push(new t)
                }
                s.push(new n(o))
            }
            s.push(new function () {
                return function (m) {
                    return Math.pow(1 - m, u)
                }
            });
            e[u] = s
        }
        for (t = q = r = 0; t < x.length; t++) {
            r += x[t].x * s[t](w), q += x[t].y * s[t](w)
        }
        return {x: r, y: q}
    }, d = function (n, m) {
        return Math.sqrt(Math.pow(n.x - m.x, 2) + Math.pow(n.y - m.y, 2))
    }, c = function (m) {
        return m[0].x == m[1].x && m[0].y == m[1].y
    }, k = function (n, m, q) {
        if (c(n)) {
            return {point: n[0], location: m}
        }
        for (var s = l(n, m), p = 0, o = 0 < q ? 1 : -1, r = null; p < Math.abs(q);) {
            m += 0.005 * o, r = l(n, m), p += d(r, s), s = r
        }
        return {point: r, location: m}
    }, g = function (n, m) {
        var p = l(n, m), q = l(n.slice(0, n.length - 1), m), o = q.y - p.y, p = q.x - p.x;
        return 0 == o ? Infinity : Math.atan(o / p)
    };
    window.jsBezier = {
        distanceFromCurve: f, gradientAtPoint: g, gradientAtPointAlongCurveFrom: function (n, m, o) {
            m = k(n, m, o);
            1 < m.location && (m.location = 1);
            0 > m.location && (m.location = 0);
            return g(n, m.location)
        }, nearestPointOnCurve: function (n, m) {
            var o = f(n, m);
            return {point: h(m, m.length - 1, o.location, null, null), location: o.location}
        }, pointOnCurve: l, pointAlongCurveFrom: function (n, m, o) {
            return k(n, m, o).point
        }, perpendicularToCurveAt: function (n, m, o, p) {
            m = k(n, m, null == p ? 0 : p);
            n = g(n, m.location);
            p = Math.atan(-1 / n);
            n = o / 2 * Math.sin(p);
            o = o / 2 * Math.cos(p);
            return [{x: m.point.x + o, y: m.point.y + n}, {x: m.point.x - o, y: m.point.y - n}]
        }, locationAlongCurveFrom: function (n, m, o) {
            return k(n, m, o).location
        }, getLength: function (n) {
            if (c(n)) {
                return 0
            }
            for (var m = l(n, 0), p = 0, q = 0, o = null; 1 > q;) {
                q += 0.005, o = l(n, q), p += d(o, m), m = o
            }
            return p
        }
    }
})();