/*
 * jQuery UI 1.8.17
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI
 */
(function(a, b) {
    function d(b) {
        return ! a(b).parents().andSelf().filter(function() {
            return a.curCSS(this, "visibility") === "hidden" || a.expr.filters.hidden(this)
        }).length
    }
    function c(b, c) {
        var e = b.nodeName.toLowerCase();
        if ("area" === e) {
            var f = b.parentNode,
            g = f.name,
            h;
            if (!b.href || !g || f.nodeName.toLowerCase() !== "map") return ! 1;
            h = a("img[usemap=#" + g + "]")[0];
            return !! h && d(h)
        }
        return (/input|select|textarea|button|object/.test(e) ? !b.disabled: "a" == e ? b.href || c: c) && d(b)
    }
    a.ui = a.ui || {};
    a.ui.version || (a.extend(a.ui, {
        version: "1.8.17",
        keyCode: {
            ALT: 18,
            BACKSPACE: 8,
            CAPS_LOCK: 20,
            COMMA: 188,
            COMMAND: 91,
            COMMAND_LEFT: 91,
            COMMAND_RIGHT: 93,
            CONTROL: 17,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            INSERT: 45,
            LEFT: 37,
            MENU: 93,
            NUMPAD_ADD: 107,
            NUMPAD_DECIMAL: 110,
            NUMPAD_DIVIDE: 111,
            NUMPAD_ENTER: 108,
            NUMPAD_MULTIPLY: 106,
            NUMPAD_SUBTRACT: 109,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SHIFT: 16,
            SPACE: 32,
            TAB: 9,
            UP: 38,
            WINDOWS: 91
        }
    }), a.fn.extend({
        propAttr: a.fn.prop || a.fn.attr,
        _focus: a.fn.focus,
        focus: function(b, c) {
            return typeof b == "number" ? this.each(function() {
                var d = this;
                setTimeout(function() {
                    a(d).focus(),
                    c && c.call(d)
                },
                b)
            }) : this._focus.apply(this, arguments)
        },
        scrollParent: function() {
            var b;
            a.browser.msie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? b = this.parents().filter(function() {
                return /(relative|absolute|fixed)/.test(a.curCSS(this, "position", 1)) && /(auto|scroll)/.test(a.curCSS(this, "overflow", 1) + a.curCSS(this, "overflow-y", 1) + a.curCSS(this, "overflow-x", 1))
            }).eq(0) : b = this.parents().filter(function() {
                return /(auto|scroll)/.test(a.curCSS(this, "overflow", 1) + a.curCSS(this, "overflow-y", 1) + a.curCSS(this, "overflow-x", 1))
            }).eq(0);
            return /fixed/.test(this.css("position")) || !b.length ? a(document) : b
        },
        zIndex: function(c) {
            if (c !== b) return this.css("zIndex", c);
            if (this.length) {
                var d = a(this[0]),
                e,
                f;
                while (d.length && d[0] !== document) {
                    e = d.css("position");
                    if (e === "absolute" || e === "relative" || e === "fixed") {
                        f = parseInt(d.css("zIndex"), 10);
                        if (!isNaN(f) && f !== 0) return f
                    }
                    d = d.parent()
                }
            }
            return 0
        },
        disableSelection: function() {
            return this.bind((a.support.selectstart ? "selectstart": "mousedown") + ".ui-disableSelection",
            function(a) {
                a.preventDefault()
            })
        },
        enableSelection: function() {
            return this.unbind(".ui-disableSelection")
        }
    }), a.each(["Width", "Height"],
    function(c, d) {
        function h(b, c, d, f) {
            a.each(e,
            function() {
                c -= parseFloat(a.curCSS(b, "padding" + this, !0)) || 0,
                d && (c -= parseFloat(a.curCSS(b, "border" + this + "Width", !0)) || 0),
                f && (c -= parseFloat(a.curCSS(b, "margin" + this, !0)) || 0)
            });
            return c
        }
        var e = d === "Width" ? ["Left", "Right"] : ["Top", "Bottom"],
        f = d.toLowerCase(),
        g = {
            innerWidth: a.fn.innerWidth,
            innerHeight: a.fn.innerHeight,
            outerWidth: a.fn.outerWidth,
            outerHeight: a.fn.outerHeight
        };
        a.fn["inner" + d] = function(c) {
            if (c === b) return g["inner" + d].call(this);
            return this.each(function() {
                a(this).css(f, h(this, c) + "px")
            })
        },
        a.fn["outer" + d] = function(b, c) {
            if (typeof b != "number") return g["outer" + d].call(this, b);
            return this.each(function() {
                a(this).css(f, h(this, b, !0, c) + "px")
            })
        }
    }), a.extend(a.expr[":"], {
        data: function(b, c, d) {
            return !! a.data(b, d[3])
        },
        focusable: function(b) {
            return c(b, !isNaN(a.attr(b, "tabindex")))
        },
        tabbable: function(b) {
            var d = a.attr(b, "tabindex"),
            e = isNaN(d);
            return (e || d >= 0) && c(b, !e)
        }
    }), a(function() {
        var b = document.body,
        c = b.appendChild(c = document.createElement("div"));
        a.extend(c.style, {
            minHeight: "100px",
            height: "auto",
            padding: 0,
            borderWidth: 0
        }),
        a.support.minHeight = c.offsetHeight === 100,
        a.support.selectstart = "onselectstart" in c,
        b.removeChild(c).style.display = "none"
    }), a.extend(a.ui, {
        plugin: {
            add: function(b, c, d) {
                var e = a.ui[b].prototype;
                for (var f in d) e.plugins[f] = e.plugins[f] || [],
                e.plugins[f].push([c, d[f]])
            },
            call: function(a, b, c) {
                var d = a.plugins[b];
                if ( !! d && !!a.element[0].parentNode) for (var e = 0; e < d.length; e++) a.options[d[e][0]] && d[e][1].apply(a.element, c)
            }
        },
        contains: function(a, b) {
            return document.compareDocumentPosition ? a.compareDocumentPosition(b) & 16 : a !== b && a.contains(b)
        },
        hasScroll: function(b, c) {
            if (a(b).css("overflow") === "hidden") return ! 1;
            var d = c && c === "left" ? "scrollLeft": "scrollTop",
            e = !1;
            if (b[d] > 0) return ! 0;
            b[d] = 1,
            e = b[d] > 0,
            b[d] = 0;
            return e
        },
        isOverAxis: function(a, b, c) {
            return a > b && a < b + c
        },
        isOver: function(b, c, d, e, f, g) {
            return a.ui.isOverAxis(b, d, f) && a.ui.isOverAxis(c, e, g)
        }
    }))
})(jQuery);
/*
 * jQuery UI Widget 1.8.17
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Widget
 */
(function(a, b) {
    if (a.cleanData) {
        var c = a.cleanData;
        a.cleanData = function(b) {
            for (var d = 0, e;
            (e = b[d]) != null; d++) try {
                a(e).triggerHandler("remove")
            } catch(f) {}
            c(b)
        }
    } else {
        var d = a.fn.remove;
        a.fn.remove = function(b, c) {
            return this.each(function() {
                c || (!b || a.filter(b, [this]).length) && a("*", this).add([this]).each(function() {
                    try {
                        a(this).triggerHandler("remove")
                    } catch(b) {}
                });
                return d.call(a(this), b, c)
            })
        }
    }
    a.widget = function(b, c, d) {
        var e = b.split(".")[0],
        f;
        b = b.split(".")[1],
        f = e + "-" + b,
        d || (d = c, c = a.Widget),
        a.expr[":"][f] = function(c) {
            return !! a.data(c, b)
        },
        a[e] = a[e] || {},
        a[e][b] = function(a, b) {
            arguments.length && this._createWidget(a, b)
        };
        var g = new c;
        g.options = a.extend(!0, {},
        g.options),
        a[e][b].prototype = a.extend(!0, g, {
            namespace: e,
            widgetName: b,
            widgetEventPrefix: a[e][b].prototype.widgetEventPrefix || b,
            widgetBaseClass: f
        },
        d),
        a.widget.bridge(b, a[e][b])
    },
    a.widget.bridge = function(c, d) {
        a.fn[c] = function(e) {
            var f = typeof e == "string",
            g = Array.prototype.slice.call(arguments, 1),
            h = this;
            e = !f && g.length ? a.extend.apply(null, [!0, e].concat(g)) : e;
            if (f && e.charAt(0) === "_") return h;
            f ? this.each(function() {
                var d = a.data(this, c),
                f = d && a.isFunction(d[e]) ? d[e].apply(d, g) : d;
                if (f !== d && f !== b) {
                    h = f;
                    return ! 1
                }
            }) : this.each(function() {
                var b = a.data(this, c);
                b ? b.option(e || {})._init() : a.data(this, c, new d(e, this))
            });
            return h
        }
    },
    a.Widget = function(a, b) {
        arguments.length && this._createWidget(a, b)
    },
    a.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        options: {
            disabled: !1
        },
        _createWidget: function(b, c) {
            a.data(c, this.widgetName, this),
            this.element = a(c),
            this.options = a.extend(!0, {},
            this.options, this._getCreateOptions(), b);
            var d = this;
            this.element.bind("remove." + this.widgetName,
            function() {
                d.destroy()
            }),
            this._create(),
            this._trigger("create"),
            this._init()
        },
        _getCreateOptions: function() {
            return a.metadata && a.metadata.get(this.element[0])[this.widgetName]
        },
        _create: function() {},
        _init: function() {},
        destroy: function() {
            this.element.unbind("." + this.widgetName).removeData(this.widgetName),
            this.widget().unbind("." + this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass + "-disabled " + "ui-state-disabled")
        },
        widget: function() {
            return this.element
        },
        option: function(c, d) {
            var e = c;
            if (arguments.length === 0) return a.extend({},
            this.options);
            if (typeof c == "string") {
                if (d === b) return this.options[c];
                e = {},
                e[c] = d
            }
            this._setOptions(e);
            return this
        },
        _setOptions: function(b) {
            var c = this;
            a.each(b,
            function(a, b) {
                c._setOption(a, b)
            });
            return this
        },
        _setOption: function(a, b) {
            this.options[a] = b,
            a === "disabled" && this.widget()[b ? "addClass": "removeClass"](this.widgetBaseClass + "-disabled" + " " + "ui-state-disabled").attr("aria-disabled", b);
            return this
        },
        enable: function() {
            return this._setOption("disabled", !1)
        },
        disable: function() {
            return this._setOption("disabled", !0)
        },
        _trigger: function(b, c, d) {
            var e, f, g = this.options[b];
            d = d || {},
            c = a.Event(c),
            c.type = (b === this.widgetEventPrefix ? b: this.widgetEventPrefix + b).toLowerCase(),
            c.target = this.element[0],
            f = c.originalEvent;
            if (f) for (e in f) e in c || (c[e] = f[e]);
            this.element.trigger(c, d);
            return ! (a.isFunction(g) && g.call(this.element[0], c, d) === !1 || c.isDefaultPrevented())
        }
    }
})(jQuery);
/*
 * jQuery UI Mouse 1.8.17
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Mouse
 *
 * Depends:
 * jquery.ui.widget.js
 */
(function(a, b) {
    var c = !1;
    a(document).mouseup(function(a) {
        c = !1
    }),
    a.widget("ui.mouse", {
        options: {
            cancel: ":input,option",
            distance: 1,
            delay: 0
        },
        _mouseInit: function() {
            var b = this;
            this.element.bind("mousedown." + this.widgetName,
            function(a) {
                return b._mouseDown(a)
            }).bind("click." + this.widgetName,
            function(c) {
                if (!0 === a.data(c.target, b.widgetName + ".preventClickEvent")) {
                    a.removeData(c.target, b.widgetName + ".preventClickEvent"),
                    c.stopImmediatePropagation();
                    return ! 1
                }
            }),
            this.started = !1
        },
        _mouseDestroy: function() {
            this.element.unbind("." + this.widgetName)
        },
        _mouseDown: function(b) {
            if (!c) {
                this._mouseStarted && this._mouseUp(b),
                this._mouseDownEvent = b;
                var d = this,
                e = b.which == 1,
                f = typeof this.options.cancel == "string" && b.target.nodeName ? a(b.target).closest(this.options.cancel).length: !1;
                if (!e || f || !this._mouseCapture(b)) return ! 0;
                this.mouseDelayMet = !this.options.delay,
                this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
                    d.mouseDelayMet = !0
                },
                this.options.delay));
                if (this._mouseDistanceMet(b) && this._mouseDelayMet(b)) {
                    this._mouseStarted = this._mouseStart(b) !== !1;
                    if (!this._mouseStarted) {
                        b.preventDefault();
                        return ! 0
                    }
                } ! 0 === a.data(b.target, this.widgetName + ".preventClickEvent") && a.removeData(b.target, this.widgetName + ".preventClickEvent"),
                this._mouseMoveDelegate = function(a) {
                    return d._mouseMove(a)
                },
                this._mouseUpDelegate = function(a) {
                    return d._mouseUp(a)
                },
                a(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate),
                b.preventDefault(),
                c = !0;
                return ! 0
            }
        },
        _mouseMove: function(b) {
            if (a.browser.msie && !(document.documentMode >= 9) && !b.button) return this._mouseUp(b);
            if (this._mouseStarted) {
                this._mouseDrag(b);
                return b.preventDefault()
            }
            this._mouseDistanceMet(b) && this._mouseDelayMet(b) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, b) !== !1, this._mouseStarted ? this._mouseDrag(b) : this._mouseUp(b));
            return ! this._mouseStarted
        },
        _mouseUp: function(b) {
            a(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate),
            this._mouseStarted && (this._mouseStarted = !1, b.target == this._mouseDownEvent.target && a.data(b.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(b));
            return ! 1
        },
        _mouseDistanceMet: function(a) {
            return Math.max(Math.abs(this._mouseDownEvent.pageX - a.pageX), Math.abs(this._mouseDownEvent.pageY - a.pageY)) >= this.options.distance
        },
        _mouseDelayMet: function(a) {
            return this.mouseDelayMet
        },
        _mouseStart: function(a) {},
        _mouseDrag: function(a) {},
        _mouseStop: function(a) {},
        _mouseCapture: function(a) {
            return ! 0
        }
    })
})(jQuery);
(function(a, b) {
    a.widget("ui.draggable", a.ui.mouse, {
        widgetEventPrefix: "drag",
        options: {
            addClasses: !0,
            appendTo: "parent",
            axis: !1,
            connectToSortable: !1,
            containment: !1,
            cursor: "auto",
            cursorAt: !1,
            grid: !1,
            handle: !1,
            helper: "original",
            iframeFix: !1,
            opacity: !1,
            refreshPositions: !1,
            revert: !1,
            revertDuration: 500,
            scope: "default",
            scroll: !0,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            snap: !1,
            snapMode: "both",
            snapTolerance: 20,
            stack: !1,
            zIndex: !1
        },
        _create: function() {
            this.options.helper == "original" && !/^(?:r|a|f)/.test(this.element.css("position")) && (this.element[0].style.position = "relative"),
            this.options.addClasses && this.element.addClass("ui-draggable"),
            this.options.disabled && this.element.addClass("ui-draggable-disabled"),
            this._mouseInit()
        },
        destroy: function() {
            if ( !! this.element.data("draggable")) {
                this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"),
                this._mouseDestroy();
                return this
            }
        },
        _mouseCapture: function(b) {
            var c = this.options;
            if (this.helper || c.disabled || a(b.target).is(".ui-resizable-handle")) return ! 1;
            this.handle = this._getHandle(b);
            if (!this.handle) return ! 1;
            c.iframeFix && a(c.iframeFix === !0 ? "iframe": c.iframeFix).each(function() {
                a('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({
                    width: this.offsetWidth + "px",
                    height: this.offsetHeight + "px",
                    position: "absolute",
                    opacity: "0.001",
                    zIndex: 1e3
                }).css(a(this).offset()).appendTo("body")
            });
            return ! 0
        },
        _mouseStart: function(b) {
            var c = this.options;
            this.helper = this._createHelper(b),
            this._cacheHelperProportions(),
            a.ui.ddmanager && (a.ui.ddmanager.current = this),
            this._cacheMargins(),
            this.cssPosition = this.helper.css("position"),
            this.scrollParent = this.helper.scrollParent(),
            this.offset = this.positionAbs = this.element.offset(),
            this.offset = {
                top: this.offset.top - this.margins.top,
                left: this.offset.left - this.margins.left
            },
            a.extend(this.offset, {
                click: {
                    left: b.pageX - this.offset.left,
                    top: b.pageY - this.offset.top
                },
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            }),
            this.originalPosition = this.position = this._generatePosition(b),
            this.originalPageX = b.pageX,
            this.originalPageY = b.pageY,
            c.cursorAt && this._adjustOffsetFromHelper(c.cursorAt),
            c.containment && this._setContainment();
            if (this._trigger("start", b) === !1) {
                this._clear();
                return ! 1
            }
            this._cacheHelperProportions(),
            a.ui.ddmanager && !c.dropBehaviour && a.ui.ddmanager.prepareOffsets(this, b),
            this.helper.addClass("ui-draggable-dragging"),
            this._mouseDrag(b, !0),
            a.ui.ddmanager && a.ui.ddmanager.dragStart(this, b);
            return ! 0
        },
        _mouseDrag: function(b, c) {
            this.position = this._generatePosition(b),
            this.positionAbs = this._convertPositionTo("absolute");
            if (!c) {
                var d = this._uiHash();
                if (this._trigger("drag", b, d) === !1) {
                    this._mouseUp({});
                    return ! 1
                }
                this.position = d.position
            }
            if (!this.options.axis || this.options.axis != "y") this.helper[0].style.left = this.position.left + "px";
            if (!this.options.axis || this.options.axis != "x") this.helper[0].style.top = this.position.top + "px";
            a.ui.ddmanager && a.ui.ddmanager.drag(this, b);
            return ! 1
        },
        _mouseStop: function(b) {
            var c = !1;
            a.ui.ddmanager && !this.options.dropBehaviour && (c = a.ui.ddmanager.drop(this, b)),
            this.dropped && (c = this.dropped, this.dropped = !1);
            if ((!this.element[0] || !this.element[0].parentNode) && this.options.helper == "original") return ! 1;
            if (this.options.revert == "invalid" && !c || this.options.revert == "valid" && c || this.options.revert === !0 || a.isFunction(this.options.revert) && this.options.revert.call(this.element, c)) {
                var d = this;
                a(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10),
                function() {
                    d._trigger("stop", b) !== !1 && d._clear()
                })
            } else this._trigger("stop", b) !== !1 && this._clear();
            return ! 1
        },
        _mouseUp: function(b) {
            this.options.iframeFix === !0 && a("div.ui-draggable-iframeFix").each(function() {
                this.parentNode.removeChild(this)
            }),
            a.ui.ddmanager && a.ui.ddmanager.dragStop(this, b);
            return a.ui.mouse.prototype._mouseUp.call(this, b)
        },
        cancel: function() {
            this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear();
            return this
        },
        _getHandle: function(b) {
            var c = !this.options.handle || !a(this.options.handle, this.element).length ? !0 : !1;
            a(this.options.handle, this.element).find("*").andSelf().each(function() {
                this == b.target && (c = !0)
            });
            return c
        },
        _createHelper: function(b) {
            var c = this.options,
            d = a.isFunction(c.helper) ? a(c.helper.apply(this.element[0], [b])) : c.helper == "clone" ? this.element.clone().removeAttr("id") : this.element;
            d.parents("body").length || d.appendTo(c.appendTo == "parent" ? this.element[0].parentNode: c.appendTo),
            d[0] != this.element[0] && !/(fixed|absolute)/.test(d.css("position")) && d.css("position", "absolute");
            return d
        },
        _adjustOffsetFromHelper: function(b) {
            typeof b == "string" && (b = b.split(" ")),
            a.isArray(b) && (b = {
                left: +b[0],
                top: +b[1] || 0
            }),
            "left" in b && (this.offset.click.left = b.left + this.margins.left),
            "right" in b && (this.offset.click.left = this.helperProportions.width - b.right + this.margins.left),
            "top" in b && (this.offset.click.top = b.top + this.margins.top),
            "bottom" in b && (this.offset.click.top = this.helperProportions.height - b.bottom + this.margins.top)
        },
        _getParentOffset: function() {
            this.offsetParent = this.helper.offsetParent();
            var b = this.offsetParent.offset();
            this.cssPosition == "absolute" && this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0]) && (b.left += this.scrollParent.scrollLeft(), b.top += this.scrollParent.scrollTop());
            if (this.offsetParent[0] == document.body || this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == "html" && a.browser.msie) b = {
                top: 0,
                left: 0
            };
            return {
                top: b.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: b.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function() {
            if (this.cssPosition == "relative") {
                var a = this.element.position();
                return {
                    top: a.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: a.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            }
            return {
                top: 0,
                left: 0
            }
        },
        _cacheMargins: function() {
            this.margins = {
                left: parseInt(this.element.css("marginLeft"), 10) || 0,
                top: parseInt(this.element.css("marginTop"), 10) || 0,
                right: parseInt(this.element.css("marginRight"), 10) || 0,
                bottom: parseInt(this.element.css("marginBottom"), 10) || 0
            }
        },
        _cacheHelperProportions: function() {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function() {
            var b = this.options;
            b.containment == "parent" && (b.containment = this.helper[0].parentNode);
            if (b.containment == "document" || b.containment == "window") this.containment = [b.containment == "document" ? 0 : a(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, b.containment == "document" ? 0 : a(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, (b.containment == "document" ? 0 : a(window).scrollLeft()) + a(b.containment == "document" ? document: window).width() - this.helperProportions.width - this.margins.left, (b.containment == "document" ? 0 : a(window).scrollTop()) + (a(b.containment == "document" ? document: window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
            if (!/^(document|window|parent)$/.test(b.containment) && b.containment.constructor != Array) {
                var c = a(b.containment),
                d = c[0];
                if (!d) return;
                var e = c.offset(),
                f = a(d).css("overflow") != "hidden";
                this.containment = [(parseInt(a(d).css("borderLeftWidth"), 10) || 0) + (parseInt(a(d).css("paddingLeft"), 10) || 0), (parseInt(a(d).css("borderTopWidth"), 10) || 0) + (parseInt(a(d).css("paddingTop"), 10) || 0), (f ? Math.max(d.scrollWidth, d.offsetWidth) : d.offsetWidth) - (parseInt(a(d).css("borderLeftWidth"), 10) || 0) - (parseInt(a(d).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (f ? Math.max(d.scrollHeight, d.offsetHeight) : d.offsetHeight) - (parseInt(a(d).css("borderTopWidth"), 10) || 0) - (parseInt(a(d).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom],
                this.relative_container = c
            } else b.containment.constructor == Array && (this.containment = b.containment)
        },
        _convertPositionTo: function(b, c) {
            c || (c = this.position);
            var d = b == "absolute" ? 1 : -1,
            e = this.options,
            f = this.cssPosition == "absolute" && (this.scrollParent[0] == document || !a.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent: this.scrollParent,
            g = /(html|body)/i.test(f[0].tagName);
            return {
                top: c.top + this.offset.relative.top * d + this.offset.parent.top * d - (a.browser.safari && a.browser.version < 526 && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : g ? 0 : f.scrollTop()) * d),
                left: c.left + this.offset.relative.left * d + this.offset.parent.left * d - (a.browser.safari && a.browser.version < 526 && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : g ? 0 : f.scrollLeft()) * d)
            }
        },
        _generatePosition: function(b) {
            var c = this.options,
            d = this.cssPosition == "absolute" && (this.scrollParent[0] == document || !a.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent: this.scrollParent,
            e = /(html|body)/i.test(d[0].tagName),
            f = b.pageX,
            g = b.pageY;
            if (this.originalPosition) {
                var h;
                if (this.containment) {
                    if (this.relative_container) {
                        var i = this.relative_container.offset();
                        h = [this.containment[0] + i.left, this.containment[1] + i.top, this.containment[2] + i.left, this.containment[3] + i.top]
                    } else h = this.containment;
                    b.pageX - this.offset.click.left < h[0] && (f = h[0] + this.offset.click.left),
                    b.pageY - this.offset.click.top < h[1] && (g = h[1] + this.offset.click.top),
                    b.pageX - this.offset.click.left > h[2] && (f = h[2] + this.offset.click.left),
                    b.pageY - this.offset.click.top > h[3] && (g = h[3] + this.offset.click.top)
                }
                if (c.grid) {
                    var j = c.grid[1] ? this.originalPageY + Math.round((g - this.originalPageY) / c.grid[1]) * c.grid[1] : this.originalPageY;
                    g = h ? j - this.offset.click.top < h[1] || j - this.offset.click.top > h[3] ? j - this.offset.click.top < h[1] ? j + c.grid[1] : j - c.grid[1] : j: j;
                    var k = c.grid[0] ? this.originalPageX + Math.round((f - this.originalPageX) / c.grid[0]) * c.grid[0] : this.originalPageX;
                    f = h ? k - this.offset.click.left < h[0] || k - this.offset.click.left > h[2] ? k - this.offset.click.left < h[0] ? k + c.grid[0] : k - c.grid[0] : k: k
                }
            }
            return {
                top: g - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (a.browser.safari && a.browser.version < 526 && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : e ? 0 : d.scrollTop()),
                left: f - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (a.browser.safari && a.browser.version < 526 && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : e ? 0 : d.scrollLeft())
            }
        },
        _clear: function() {
            this.helper.removeClass("ui-draggable-dragging"),
            this.helper[0] != this.element[0] && !this.cancelHelperRemoval && this.helper.remove(),
            this.helper = null,
            this.cancelHelperRemoval = !1
        },
        _trigger: function(b, c, d) {
            d = d || this._uiHash(),
            a.ui.plugin.call(this, b, [c, d]),
            b == "drag" && (this.positionAbs = this._convertPositionTo("absolute"));
            return a.Widget.prototype._trigger.call(this, b, c, d)
        },
        plugins: {},
        _uiHash: function(a) {
            return {
                helper: this.helper,
                position: this.position,
                originalPosition: this.originalPosition,
                offset: this.positionAbs
            }
        }
    }),
    a.extend(a.ui.draggable, {
        version: "1.8.17"
    }),
    a.ui.plugin.add("draggable", "connectToSortable", {
        start: function(b, c) {
            var d = a(this).data("draggable"),
            e = d.options,
            f = a.extend({},
            c, {
                item: d.element
            });
            d.sortables = [],
            a(e.connectToSortable).each(function() {
                var c = a.data(this, "sortable");
                c && !c.options.disabled && (d.sortables.push({
                    instance: c,
                    shouldRevert: c.options.revert
                }), c.refreshPositions(), c._trigger("activate", b, f))
            })
        },
        stop: function(b, c) {
            var d = a(this).data("draggable"),
            e = a.extend({},
            c, {
                item: d.element
            });
            a.each(d.sortables,
            function() {
                this.instance.isOver ? (this.instance.isOver = 0, d.cancelHelperRemoval = !0, this.instance.cancelHelperRemoval = !1, this.shouldRevert && (this.instance.options.revert = !0), this.instance._mouseStop(b), this.instance.options.helper = this.instance.options._helper, d.options.helper == "original" && this.instance.currentItem.css({
                    top: "auto",
                    left: "auto"
                })) : (this.instance.cancelHelperRemoval = !1, this.instance._trigger("deactivate", b, e))
            })
        },
        drag: function(b, c) {
            var d = a(this).data("draggable"),
            e = this,
            f = function(b) {
                var c = this.offset.click.top,
                d = this.offset.click.left,
                e = this.positionAbs.top,
                f = this.positionAbs.left,
                g = b.height,
                h = b.width,
                i = b.top,
                j = b.left;
                return a.ui.isOver(e + c, f + d, i, j, g, h)
            };
            a.each(d.sortables,
            function(f) {
                this.instance.positionAbs = d.positionAbs,
                this.instance.helperProportions = d.helperProportions,
                this.instance.offset.click = d.offset.click,
                this.instance._intersectsWith(this.instance.containerCache) ? (this.instance.isOver || (this.instance.isOver = 1, this.instance.currentItem = a(e).clone().removeAttr("id").appendTo(this.instance.element).data("sortable-item", !0), this.instance.options._helper = this.instance.options.helper, this.instance.options.helper = function() {
                    return c.helper[0]
                },
                b.target = this.instance.currentItem[0], this.instance._mouseCapture(b, !0), this.instance._mouseStart(b, !0, !0), this.instance.offset.click.top = d.offset.click.top, this.instance.offset.click.left = d.offset.click.left, this.instance.offset.parent.left -= d.offset.parent.left - this.instance.offset.parent.left, this.instance.offset.parent.top -= d.offset.parent.top - this.instance.offset.parent.top, d._trigger("toSortable", b), d.dropped = this.instance.element, d.currentItem = d.element, this.instance.fromOutside = d), this.instance.currentItem && this.instance._mouseDrag(b)) : this.instance.isOver && (this.instance.isOver = 0, this.instance.cancelHelperRemoval = !0, this.instance.options.revert = !1, this.instance._trigger("out", b, this.instance._uiHash(this.instance)), this.instance._mouseStop(b, !0), this.instance.options.helper = this.instance.options._helper, this.instance.currentItem.remove(), this.instance.placeholder && this.instance.placeholder.remove(), d._trigger("fromSortable", b), d.dropped = !1)
            })
        }
    }),
    a.ui.plugin.add("draggable", "cursor", {
        start: function(b, c) {
            var d = a("body"),
            e = a(this).data("draggable").options;
            d.css("cursor") && (e._cursor = d.css("cursor")),
            d.css("cursor", e.cursor)
        },
        stop: function(b, c) {
            var d = a(this).data("draggable").options;
            d._cursor && a("body").css("cursor", d._cursor)
        }
    }),
    a.ui.plugin.add("draggable", "opacity", {
        start: function(b, c) {
            var d = a(c.helper),
            e = a(this).data("draggable").options;
            d.css("opacity") && (e._opacity = d.css("opacity")),
            d.css("opacity", e.opacity)
        },
        stop: function(b, c) {
            var d = a(this).data("draggable").options;
            d._opacity && a(c.helper).css("opacity", d._opacity)
        }
    }),
    a.ui.plugin.add("draggable", "scroll", {
        start: function(b, c) {
            var d = a(this).data("draggable");
            d.scrollParent[0] != document && d.scrollParent[0].tagName != "HTML" && (d.overflowOffset = d.scrollParent.offset())
        },
        drag: function(b, c) {
            var d = a(this).data("draggable"),
            e = d.options,
            f = !1;
            if (d.scrollParent[0] != document && d.scrollParent[0].tagName != "HTML") {
                if (!e.axis || e.axis != "x") d.overflowOffset.top + d.scrollParent[0].offsetHeight - b.pageY < e.scrollSensitivity ? d.scrollParent[0].scrollTop = f = d.scrollParent[0].scrollTop + e.scrollSpeed: b.pageY - d.overflowOffset.top < e.scrollSensitivity && (d.scrollParent[0].scrollTop = f = d.scrollParent[0].scrollTop - e.scrollSpeed);
                if (!e.axis || e.axis != "y") d.overflowOffset.left + d.scrollParent[0].offsetWidth - b.pageX < e.scrollSensitivity ? d.scrollParent[0].scrollLeft = f = d.scrollParent[0].scrollLeft + e.scrollSpeed: b.pageX - d.overflowOffset.left < e.scrollSensitivity && (d.scrollParent[0].scrollLeft = f = d.scrollParent[0].scrollLeft - e.scrollSpeed)
            } else {
                if (!e.axis || e.axis != "x") b.pageY - a(document).scrollTop() < e.scrollSensitivity ? f = a(document).scrollTop(a(document).scrollTop() - e.scrollSpeed) : a(window).height() - (b.pageY - a(document).scrollTop()) < e.scrollSensitivity && (f = a(document).scrollTop(a(document).scrollTop() + e.scrollSpeed));
                if (!e.axis || e.axis != "y") b.pageX - a(document).scrollLeft() < e.scrollSensitivity ? f = a(document).scrollLeft(a(document).scrollLeft() - e.scrollSpeed) : a(window).width() - (b.pageX - a(document).scrollLeft()) < e.scrollSensitivity && (f = a(document).scrollLeft(a(document).scrollLeft() + e.scrollSpeed))
            }
            f !== !1 && a.ui.ddmanager && !e.dropBehaviour && a.ui.ddmanager.prepareOffsets(d, b)
        }
    }),
    a.ui.plugin.add("draggable", "snap", {
        start: function(b, c) {
            var d = a(this).data("draggable"),
            e = d.options;
            d.snapElements = [],
            a(e.snap.constructor != String ? e.snap.items || ":data(draggable)": e.snap).each(function() {
                var b = a(this),
                c = b.offset();
                this != d.element[0] && d.snapElements.push({
                    item: this,
                    width: b.outerWidth(),
                    height: b.outerHeight(),
                    top: c.top,
                    left: c.left
                })
            })
        },
        drag: function(b, c) {
            var d = a(this).data("draggable"),
            e = d.options,
            f = e.snapTolerance,
            g = c.offset.left,
            h = g + d.helperProportions.width,
            i = c.offset.top,
            j = i + d.helperProportions.height;
            for (var k = d.snapElements.length - 1; k >= 0; k--) {
                var l = d.snapElements[k].left,
                m = l + d.snapElements[k].width,
                n = d.snapElements[k].top,
                o = n + d.snapElements[k].height;
                if (! (l - f < g && g < m + f && n - f < i && i < o + f || l - f < g && g < m + f && n - f < j && j < o + f || l - f < h && h < m + f && n - f < i && i < o + f || l - f < h && h < m + f && n - f < j && j < o + f)) {
                    d.snapElements[k].snapping && d.options.snap.release && d.options.snap.release.call(d.element, b, a.extend(d._uiHash(), {
                        snapItem: d.snapElements[k].item
                    })),
                    d.snapElements[k].snapping = !1;
                    continue
                }
                if (e.snapMode != "inner") {
                    var p = Math.abs(n - j) <= f,
                    q = Math.abs(o - i) <= f,
                    r = Math.abs(l - h) <= f,
                    s = Math.abs(m - g) <= f;
                    p && (c.position.top = d._convertPositionTo("relative", {
                        top: n - d.helperProportions.height,
                        left: 0
                    }).top - d.margins.top),
                    q && (c.position.top = d._convertPositionTo("relative", {
                        top: o,
                        left: 0
                    }).top - d.margins.top),
                    r && (c.position.left = d._convertPositionTo("relative", {
                        top: 0,
                        left: l - d.helperProportions.width
                    }).left - d.margins.left),
                    s && (c.position.left = d._convertPositionTo("relative", {
                        top: 0,
                        left: m
                    }).left - d.margins.left)
                }
                var t = p || q || r || s;
                if (e.snapMode != "outer") {
                    var p = Math.abs(n - i) <= f,
                    q = Math.abs(o - j) <= f,
                    r = Math.abs(l - g) <= f,
                    s = Math.abs(m - h) <= f;
                    p && (c.position.top = d._convertPositionTo("relative", {
                        top: n,
                        left: 0
                    }).top - d.margins.top),
                    q && (c.position.top = d._convertPositionTo("relative", {
                        top: o - d.helperProportions.height,
                        left: 0
                    }).top - d.margins.top),
                    r && (c.position.left = d._convertPositionTo("relative", {
                        top: 0,
                        left: l
                    }).left - d.margins.left),
                    s && (c.position.left = d._convertPositionTo("relative", {
                        top: 0,
                        left: m - d.helperProportions.width
                    }).left - d.margins.left)
                } ! d.snapElements[k].snapping && (p || q || r || s || t) && d.options.snap.snap && d.options.snap.snap.call(d.element, b, a.extend(d._uiHash(), {
                    snapItem: d.snapElements[k].item
                })),
                d.snapElements[k].snapping = p || q || r || s || t
            }
        }
    }),
    a.ui.plugin.add("draggable", "stack", {
        start: function(b, c) {
            var d = a(this).data("draggable").options,
            e = a.makeArray(a(d.stack)).sort(function(b, c) {
                return (parseInt(a(b).css("zIndex"), 10) || 0) - (parseInt(a(c).css("zIndex"), 10) || 0)
            });
            if ( !! e.length) {
                var f = parseInt(e[0].style.zIndex) || 0;
                a(e).each(function(a) {
                    this.style.zIndex = f + a
                }),
                this[0].style.zIndex = f + e.length
            }
        }
    }),
    a.ui.plugin.add("draggable", "zIndex", {
        start: function(b, c) {
            var d = a(c.helper),
            e = a(this).data("draggable").options;
            d.css("zIndex") && (e._zIndex = d.css("zIndex")),
            d.css("zIndex", e.zIndex)
        },
        stop: function(b, c) {
            var d = a(this).data("draggable").options;
            d._zIndex && a(c.helper).css("zIndex", d._zIndex)
        }
    })
})(jQuery);
(function(a, b) {
    a.widget("ui.accordion", {
        options: {
            active: 0,
            animated: "slide",
            autoHeight: !0,
            clearStyle: !1,
            collapsible: !1,
            event: "click",
            fillSpace: !1,
            header: "> li > :first-child,> :not(li):even",
            icons: {
                header: "ui-icon-triangle-1-e",
                headerSelected: "ui-icon-triangle-1-s"
            },
            navigation: !1,
            navigationFilter: function() {
                return this.href.toLowerCase() === location.href.toLowerCase()
            }
        },
        _create: function() {
            var b = this,
            c = b.options;
            b.running = 0,
            b.element.addClass("ui-accordion ui-widget ui-helper-reset").children("li").addClass("ui-accordion-li-fix"),
            b.headers = b.element.find(c.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all").bind("mouseenter.accordion",
            function() {
                c.disabled || a(this).addClass("ui-state-hover")
            }).bind("mouseleave.accordion",
            function() {
                c.disabled || a(this).removeClass("ui-state-hover")
            }).bind("focus.accordion",
            function() {
                c.disabled || a(this).addClass("ui-state-focus")
            }).bind("blur.accordion",
            function() {
                c.disabled || a(this).removeClass("ui-state-focus")
            }),
            b.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom");
            if (c.navigation) {
                var d = b.element.find("a").filter(c.navigationFilter).eq(0);
                if (d.length) {
                    var e = d.closest(".ui-accordion-header");
                    e.length ? b.active = e: b.active = d.closest(".ui-accordion-content").prev()
                }
            }
            b.active = b._findActive(b.active || c.active).addClass("ui-state-default ui-state-active").toggleClass("ui-corner-all").toggleClass("ui-corner-top"),
            b.active.next().addClass("ui-accordion-content-active"),
            b._createIcons(),
            b.resize(),
            b.element.attr("role", "tablist"),
            b.headers.attr("role", "tab").bind("keydown.accordion",
            function(a) {
                return b._keydown(a)
            }).next().attr("role", "tabpanel"),
            b.headers.not(b.active || "").attr({
                "aria-expanded": "false",
                "aria-selected": "false",
                tabIndex: -1
            }).next().hide(),
            b.active.length ? b.active.attr({
                "aria-expanded": "true",
                "aria-selected": "true",
                tabIndex: 0
            }) : b.headers.eq(0).attr("tabIndex", 0),
            a.browser.safari || b.headers.find("a").attr("tabIndex", -1),
            c.event && b.headers.bind(c.event.split(" ").join(".accordion ") + ".accordion",
            function(a) {
                b._clickHandler.call(b, a, this),
                a.preventDefault()
            })
        },
        _createIcons: function() {
            var b = this.options;
            b.icons && (a("<span></span>").addClass("ui-icon " + b.icons.header).prependTo(this.headers), this.active.children(".ui-icon").toggleClass(b.icons.header).toggleClass(b.icons.headerSelected), this.element.addClass("ui-accordion-icons"))
        },
        _destroyIcons: function() {
            this.headers.children(".ui-icon").remove(),
            this.element.removeClass("ui-accordion-icons")
        },
        destroy: function() {
            var b = this.options;
            this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role"),
            this.headers.unbind(".accordion").removeClass("ui-accordion-header ui-accordion-disabled ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-selected").removeAttr("tabIndex"),
            this.headers.find("a").removeAttr("tabIndex"),
            this._destroyIcons();
            var c = this.headers.next().css("display", "").removeAttr("role").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-accordion-disabled ui-state-disabled");
            (b.autoHeight || b.fillHeight) && c.css("height", "");
            return a.Widget.prototype.destroy.call(this)
        },
        _setOption: function(b, c) {
            a.Widget.prototype._setOption.apply(this, arguments),
            b == "active" && this.activate(c),
            b == "icons" && (this._destroyIcons(), c && this._createIcons()),
            b == "disabled" && this.headers.add(this.headers.next())[c ? "addClass": "removeClass"]("ui-accordion-disabled ui-state-disabled")
        },
        _keydown: function(b) {
            if (! (this.options.disabled || b.altKey || b.ctrlKey)) {
                var c = a.ui.keyCode,
                d = this.headers.length,
                e = this.headers.index(b.target),
                f = !1;
                switch (b.keyCode) {
                case c.RIGHT:
                case c.DOWN:
                    f = this.headers[(e + 1) % d];
                    break;
                case c.LEFT:
                case c.UP:
                    f = this.headers[(e - 1 + d) % d];
                    break;
                case c.SPACE:
                case c.ENTER:
                    this._clickHandler({
                        target:
                        b.target
                    },
                    b.target),
                    b.preventDefault()
                }
                if (f) {
                    a(b.target).attr("tabIndex", -1),
                    a(f).attr("tabIndex", 0),
                    f.focus();
                    return ! 1
                }
                return ! 0
            }
        },
        resize: function() {
            var b = this.options,
            c;
            if (b.fillSpace) {
                if (a.browser.msie) {
                    var d = this.element.parent().css("overflow");
                    this.element.parent().css("overflow", "hidden")
                }
                c = this.element.parent().height(),
                a.browser.msie && this.element.parent().css("overflow", d),
                this.headers.each(function() {
                    c -= a(this).outerHeight(!0)
                }),
                this.headers.next().each(function() {
                    a(this).height(Math.max(0, c - a(this).innerHeight() + a(this).height()))
                }).css("overflow", "auto")
            } else b.autoHeight && (c = 0, this.headers.next().each(function() {
                c = Math.max(c, a(this).height("").height())
            }).height(c));
            return this
        },
        activate: function(a) {
            this.options.active = a;
            var b = this._findActive(a)[0];
            this._clickHandler({
                target: b
            },
            b);
            return this
        },
        _findActive: function(b) {
            return b ? typeof b == "number" ? this.headers.filter(":eq(" + b + ")") : this.headers.not(this.headers.not(b)) : b === !1 ? a([]) : this.headers.filter(":eq(0)")
        },
        _clickHandler: function(b, c) {
            var d = this.options;
            if (!d.disabled) {
                if (!b.target) {
                    if (!d.collapsible) return;
                    this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(d.icons.headerSelected).addClass(d.icons.header),
                    this.active.next().addClass("ui-accordion-content-active");
                    var e = this.active.next(),
                    f = {
                        options: d,
                        newHeader: a([]),
                        oldHeader: d.active,
                        newContent: a([]),
                        oldContent: e
                    },
                    g = this.active = a([]);
                    this._toggle(g, e, f);
                    return
                }
                var h = a(b.currentTarget || c),
                i = h[0] === this.active[0];
                d.active = d.collapsible && i ? !1 : this.headers.index(h);
                if (this.running || !d.collapsible && i) return;
                var j = this.active,
                g = h.next(),
                e = this.active.next(),
                f = {
                    options: d,
                    newHeader: i && d.collapsible ? a([]) : h,
                    oldHeader: this.active,
                    newContent: i && d.collapsible ? a([]) : g,
                    oldContent: e
                },
                k = this.headers.index(this.active[0]) > this.headers.index(h[0]);
                this.active = i ? a([]) : h,
                this._toggle(g, e, f, i, k),
                j.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(d.icons.headerSelected).addClass(d.icons.header),
                i || (h.removeClass("ui-state-default ui-corner-all").addClass("ui-state-active ui-corner-top").children(".ui-icon").removeClass(d.icons.header).addClass(d.icons.headerSelected), h.next().addClass("ui-accordion-content-active"));
                return
            }
        },
        _toggle: function(b, c, d, e, f) {
            var g = this,
            h = g.options;
            g.toShow = b,
            g.toHide = c,
            g.data = d;
            var i = function() {
                if ( !! g) return g._completed.apply(g, arguments)
            };
            g._trigger("changestart", null, g.data),
            g.running = c.size() === 0 ? b.size() : c.size();
            if (h.animated) {
                var j = {};
                h.collapsible && e ? j = {
                    toShow: a([]),
                    toHide: c,
                    complete: i,
                    down: f,
                    autoHeight: h.autoHeight || h.fillSpace
                }: j = {
                    toShow: b,
                    toHide: c,
                    complete: i,
                    down: f,
                    autoHeight: h.autoHeight || h.fillSpace
                },
                h.proxied || (h.proxied = h.animated),
                h.proxiedDuration || (h.proxiedDuration = h.duration),
                h.animated = a.isFunction(h.proxied) ? h.proxied(j) : h.proxied,
                h.duration = a.isFunction(h.proxiedDuration) ? h.proxiedDuration(j) : h.proxiedDuration;
                var k = a.ui.accordion.animations,
                l = h.duration,
                m = h.animated;
                m && !k[m] && !a.easing[m] && (m = "slide"),
                k[m] || (k[m] = function(a) {
                    this.slide(a, {
                        easing: m,
                        duration: l || 700
                    })
                }),
                k[m](j)
            } else h.collapsible && e ? b.toggle() : (c.hide(), b.show()),
            i(!0);
            c.prev().attr({
                "aria-expanded": "false",
                "aria-selected": "false",
                tabIndex: -1
            }).blur(),
            b.prev().attr({
                "aria-expanded": "true",
                "aria-selected": "true",
                tabIndex: 0
            }).focus()
        },
        _completed: function(a) {
            this.running = a ? 0 : --this.running;
            this.running || (this.options.clearStyle && this.toShow.add(this.toHide).css({
                height: "",
                overflow: ""
            }), this.toHide.removeClass("ui-accordion-content-active"), this.toHide.length && (this.toHide.parent()[0].className = this.toHide.parent()[0].className), this._trigger("change", null, this.data))
        }
    }),
    a.extend(a.ui.accordion, {
        version: "1.8.17",
        animations: {
            slide: function(b, c) {
                b = a.extend({
                    easing: "swing",
                    duration: 300
                },
                b, c);
                if (!b.toHide.size()) b.toShow.animate({
                    height: "show",
                    paddingTop: "show",
                    paddingBottom: "show"
                },
                b);
                else {
                    if (!b.toShow.size()) {
                        b.toHide.animate({
                            height: "hide",
                            paddingTop: "hide",
                            paddingBottom: "hide"
                        },
                        b);
                        return
                    }
                    var d = b.toShow.css("overflow"),
                    e = 0,
                    f = {},
                    g = {},
                    h = ["height", "paddingTop", "paddingBottom"],
                    i,
                    j = b.toShow;
                    i = j[0].style.width,
                    j.width(j.parent().width() - parseFloat(j.css("paddingLeft")) - parseFloat(j.css("paddingRight")) - (parseFloat(j.css("borderLeftWidth")) || 0) - (parseFloat(j.css("borderRightWidth")) || 0)),
                    a.each(h,
                    function(c, d) {
                        g[d] = "hide";
                        var e = ("" + a.css(b.toShow[0], d)).match(/^([\d+-.]+)(.*)$/);
                        f[d] = {
                            value: e[1],
                            unit: e[2] || "px"
                        }
                    }),
                    b.toShow.css({
                        height: 0,
                        overflow: "hidden"
                    }).show(),
                    b.toHide.filter(":hidden").each(b.complete).end().filter(":visible").animate(g, {
                        step: function(a, c) {
                            c.prop == "height" && (e = c.end - c.start === 0 ? 0 : (c.now - c.start) / (c.end - c.start)),
                            b.toShow[0].style[c.prop] = e * f[c.prop].value + f[c.prop].unit
                        },
                        duration: b.duration,
                        easing: b.easing,
                        complete: function() {
                            b.autoHeight || b.toShow.css("height", ""),
                            b.toShow.css({
                                width: i,
                                overflow: d
                            }),
                            b.complete()
                        }
                    })
                }
            },
            bounceslide: function(a) {
                this.slide(a, {
                    easing: a.down ? "easeOutBounce": "swing",
                    duration: a.down ? 1e3: 200
                })
            }
        }
    })
})(jQuery);
jQuery.effects ||
function(a, b) {
    function l(b) {
        if (!b || typeof b == "number" || a.fx.speeds[b]) return ! 0;
        if (typeof b == "string" && !a.effects[b]) return ! 0;
        return ! 1
    }
    function k(b, c, d, e) {
        typeof b == "object" && (e = c, d = null, c = b, b = c.effect),
        a.isFunction(c) && (e = c, d = null, c = {});
        if (typeof c == "number" || a.fx.speeds[c]) e = d,
        d = c,
        c = {};
        a.isFunction(d) && (e = d, d = null),
        c = c || {},
        d = d || c.duration,
        d = a.fx.off ? 0 : typeof d == "number" ? d: d in a.fx.speeds ? a.fx.speeds[d] : a.fx.speeds._default,
        e = e || c.complete;
        return [b, c, d, e]
    }
    function j(a, b) {
        var c = {
            _: 0
        },
        d;
        for (d in b) a[d] != b[d] && (c[d] = b[d]);
        return c
    }
    function i(b) {
        var c, d;
        for (c in b) d = b[c],
        (d == null || a.isFunction(d) || c in g || /scrollbar/.test(c) || !/color/i.test(c) && isNaN(parseFloat(d))) && delete b[c];
        return b
    }
    function h() {
        var a = document.defaultView ? document.defaultView.getComputedStyle(this, null) : this.currentStyle,
        b = {},
        c,
        d;
        if (a && a.length && a[0] && a[a[0]]) {
            var e = a.length;
            while (e--) c = a[e],
            typeof a[c] == "string" && (d = c.replace(/\-(\w)/g,
            function(a, b) {
                return b.toUpperCase()
            }), b[d] = a[c])
        } else for (c in a) typeof a[c] == "string" && (b[c] = a[c]);
        return b
    }
    function d(b, d) {
        var e;
        do {
            e = a.curCSS(b, d);
            if (e != "" && e != "transparent" || a.nodeName(b, "body")) break;
            d = "backgroundColor"
        } while ( b = b . parentNode );
        return c(e)
    }
    function c(b) {
        var c;
        if (b && b.constructor == Array && b.length == 3) return b;
        if (c = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(b)) return [parseInt(c[1], 10), parseInt(c[2], 10), parseInt(c[3], 10)];
        if (c = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(b)) return [parseFloat(c[1]) * 2.55, parseFloat(c[2]) * 2.55, parseFloat(c[3]) * 2.55];
        if (c = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(b)) return [parseInt(c[1], 16), parseInt(c[2], 16), parseInt(c[3], 16)];
        if (c = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(b)) return [parseInt(c[1] + c[1], 16), parseInt(c[2] + c[2], 16), parseInt(c[3] + c[3], 16)];
        if (c = /rgba\(0, 0, 0, 0\)/.exec(b)) return e.transparent;
        return e[a.trim(b).toLowerCase()]
    }
    a.effects = {},
    a.each(["backgroundColor", "borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor", "borderColor", "color", "outlineColor"],
    function(b, e) {
        a.fx.step[e] = function(a) {
            a.colorInit || (a.start = d(a.elem, e), a.end = c(a.end), a.colorInit = !0),
            a.elem.style[e] = "rgb(" + Math.max(Math.min(parseInt(a.pos * (a.end[0] - a.start[0]) + a.start[0], 10), 255), 0) + "," + Math.max(Math.min(parseInt(a.pos * (a.end[1] - a.start[1]) + a.start[1], 10), 255), 0) + "," + Math.max(Math.min(parseInt(a.pos * (a.end[2] - a.start[2]) + a.start[2], 10), 255), 0) + ")"
        }
    });
    var e = {
        aqua: [0, 255, 255],
        azure: [240, 255, 255],
        beige: [245, 245, 220],
        black: [0, 0, 0],
        blue: [0, 0, 255],
        brown: [165, 42, 42],
        cyan: [0, 255, 255],
        darkblue: [0, 0, 139],
        darkcyan: [0, 139, 139],
        darkgrey: [169, 169, 169],
        darkgreen: [0, 100, 0],
        darkkhaki: [189, 183, 107],
        darkmagenta: [139, 0, 139],
        darkolivegreen: [85, 107, 47],
        darkorange: [255, 140, 0],
        darkorchid: [153, 50, 204],
        darkred: [139, 0, 0],
        darksalmon: [233, 150, 122],
        darkviolet: [148, 0, 211],
        fuchsia: [255, 0, 255],
        gold: [255, 215, 0],
        green: [0, 128, 0],
        indigo: [75, 0, 130],
        khaki: [240, 230, 140],
        lightblue: [173, 216, 230],
        lightcyan: [224, 255, 255],
        lightgreen: [144, 238, 144],
        lightgrey: [211, 211, 211],
        lightpink: [255, 182, 193],
        lightyellow: [255, 255, 224],
        lime: [0, 255, 0],
        magenta: [255, 0, 255],
        maroon: [128, 0, 0],
        navy: [0, 0, 128],
        olive: [128, 128, 0],
        orange: [255, 165, 0],
        pink: [255, 192, 203],
        purple: [128, 0, 128],
        violet: [128, 0, 128],
        red: [255, 0, 0],
        silver: [192, 192, 192],
        white: [255, 255, 255],
        yellow: [255, 255, 0],
        transparent: [255, 255, 255]
    },
    f = ["add", "remove", "toggle"],
    g = {
        border: 1,
        borderBottom: 1,
        borderColor: 1,
        borderLeft: 1,
        borderRight: 1,
        borderTop: 1,
        borderWidth: 1,
        margin: 1,
        padding: 1
    };
    a.effects.animateClass = function(b, c, d, e) {
        a.isFunction(d) && (e = d, d = null);
        return this.queue(function() {
            var g = a(this),
            k = g.attr("style") || " ",
            l = i(h.call(this)),
            m,
            n = g.attr("class");
            a.each(f,
            function(a, c) {
                b[c] && g[c + "Class"](b[c])
            }),
            m = i(h.call(this)),
            g.attr("class", n),
            g.animate(j(l, m), {
                queue: !1,
                duration: c,
                easing: d,
                complete: function() {
                    a.each(f,
                    function(a, c) {
                        b[c] && g[c + "Class"](b[c])
                    }),
                    typeof g.attr("style") == "object" ? (g.attr("style").cssText = "", g.attr("style").cssText = k) : g.attr("style", k),
                    e && e.apply(this, arguments),
                    a.dequeue(this)
                }
            })
        })
    },
    a.fn.extend({
        _addClass: a.fn.addClass,
        addClass: function(b, c, d, e) {
            return c ? a.effects.animateClass.apply(this, [{
                add: b
            },
            c, d, e]) : this._addClass(b)
        },
        _removeClass: a.fn.removeClass,
        removeClass: function(b, c, d, e) {
            return c ? a.effects.animateClass.apply(this, [{
                remove: b
            },
            c, d, e]) : this._removeClass(b)
        },
        _toggleClass: a.fn.toggleClass,
        toggleClass: function(c, d, e, f, g) {
            return typeof d == "boolean" || d === b ? e ? a.effects.animateClass.apply(this, [d ? {
                add: c
            }: {
                remove: c
            },
            e, f, g]) : this._toggleClass(c, d) : a.effects.animateClass.apply(this, [{
                toggle: c
            },
            d, e, f])
        },
        switchClass: function(b, c, d, e, f) {
            return a.effects.animateClass.apply(this, [{
                add: c,
                remove: b
            },
            d, e, f])
        }
    }),
    a.extend(a.effects, {
        version: "1.8.17",
        save: function(a, b) {
            for (var c = 0; c < b.length; c++) b[c] !== null && a.data("ec.storage." + b[c], a[0].style[b[c]])
        },
        restore: function(a, b) {
            for (var c = 0; c < b.length; c++) b[c] !== null && a.css(b[c], a.data("ec.storage." + b[c]))
        },
        setMode: function(a, b) {
            b == "toggle" && (b = a.is(":hidden") ? "show": "hide");
            return b
        },
        getBaseline: function(a, b) {
            var c, d;
            switch (a[0]) {
            case "top":
                c = 0;
                break;
            case "middle":
                c = .5;
                break;
            case "bottom":
                c = 1;
                break;
            default:
                c = a[0] / b.height
            }
            switch (a[1]) {
            case "left":
                d = 0;
                break;
            case "center":
                d = .5;
                break;
            case "right":
                d = 1;
                break;
            default:
                d = a[1] / b.width
            }
            return {
                x: d,
                y: c
            }
        },
        createWrapper: function(b) {
            if (b.parent().is(".ui-effects-wrapper")) return b.parent();
            var c = {
                width: b.outerWidth(!0),


                height: b.outerHeight(!0),
                "float": b.css("float")
            },
            d = a("<div></div>").addClass("ui-effects-wrapper").css({
                fontSize: "100%",
                background: "transparent",
                border: "none",
                margin: 0,
                padding: 0
            }),
            e = document.activeElement;
            b.wrap(d),
            (b[0] === e || a.contains(b[0], e)) && a(e).focus(),
            d = b.parent(),
            b.css("position") == "static" ? (d.css({
                position: "relative"
            }), b.css({
                position: "relative"
            })) : (a.extend(c, {
                position: b.css("position"),
                zIndex: b.css("z-index")
            }), a.each(["top", "left", "bottom", "right"],
            function(a, d) {
                c[d] = b.css(d),
                isNaN(parseInt(c[d], 10)) && (c[d] = "auto")
            }), b.css({
                position: "relative",
                top: 0,
                left: 0,
                right: "auto",
                bottom: "auto"
            }));
            return d.css(c).show()
        },
        removeWrapper: function(b) {
            var c, d = document.activeElement;
            if (b.parent().is(".ui-effects-wrapper")) {
                c = b.parent().replaceWith(b),
                (b[0] === d || a.contains(b[0], d)) && a(d).focus();
                return c
            }
            return b
        },
        setTransition: function(b, c, d, e) {
            e = e || {},
            a.each(c,
            function(a, c) {
                unit = b.cssUnit(c),
                unit[0] > 0 && (e[c] = unit[0] * d + unit[1])
            });
            return e
        }
    }),
    a.fn.extend({
        effect: function(b, c, d, e) {
            var f = k.apply(this, arguments),
            g = {
                options: f[1],
                duration: f[2],
                callback: f[3]
            },
            h = g.options.mode,
            i = a.effects[b];
            if (a.fx.off || !i) return h ? this[h](g.duration, g.callback) : this.each(function() {
                g.callback && g.callback.call(this)
            });
            return i.call(this, g)
        },
        _show: a.fn.show,
        show: function(a) {
            if (l(a)) return this._show.apply(this, arguments);
            var b = k.apply(this, arguments);
            b[1].mode = "show";
            return this.effect.apply(this, b)
        },
        _hide: a.fn.hide,
        hide: function(a) {
            if (l(a)) return this._hide.apply(this, arguments);
            var b = k.apply(this, arguments);
            b[1].mode = "hide";
            return this.effect.apply(this, b)
        },
        __toggle: a.fn.toggle,
        toggle: function(b) {
            if (l(b) || typeof b == "boolean" || a.isFunction(b)) return this.__toggle.apply(this, arguments);
            var c = k.apply(this, arguments);
            c[1].mode = "toggle";
            return this.effect.apply(this, c)
        },
        cssUnit: function(b) {
            var c = this.css(b),
            d = [];
            a.each(["em", "px", "%", "pt"],
            function(a, b) {
                c.indexOf(b) > 0 && (d = [parseFloat(c), b])
            });
            return d
        }
    }),
    a.easing.jswing = a.easing.swing,
    a.extend(a.easing, {
        def: "easeOutQuad",
        swing: function(b, c, d, e, f) {
            return a.easing[a.easing.def](b, c, d, e, f)
        },
        easeInQuad: function(a, b, c, d, e) {
            return d * (b /= e) * b + c
        },
        easeOutQuad: function(a, b, c, d, e) {
            return - d * (b /= e) * (b - 2) + c
        },
        easeInOutQuad: function(a, b, c, d, e) {
            if ((b /= e / 2) < 1) return d / 2 * b * b + c;
            return - d / 2 * (--b * (b - 2) - 1) + c
        },
        easeInCubic: function(a, b, c, d, e) {
            return d * (b /= e) * b * b + c
        },
        easeOutCubic: function(a, b, c, d, e) {
            return d * ((b = b / e - 1) * b * b + 1) + c
        },
        easeInOutCubic: function(a, b, c, d, e) {
            if ((b /= e / 2) < 1) return d / 2 * b * b * b + c;
            return d / 2 * ((b -= 2) * b * b + 2) + c
        },
        easeInQuart: function(a, b, c, d, e) {
            return d * (b /= e) * b * b * b + c
        },
        easeOutQuart: function(a, b, c, d, e) {
            return - d * ((b = b / e - 1) * b * b * b - 1) + c
        },
        easeInOutQuart: function(a, b, c, d, e) {
            if ((b /= e / 2) < 1) return d / 2 * b * b * b * b + c;
            return - d / 2 * ((b -= 2) * b * b * b - 2) + c
        },
        easeInQuint: function(a, b, c, d, e) {
            return d * (b /= e) * b * b * b * b + c
        },
        easeOutQuint: function(a, b, c, d, e) {
            return d * ((b = b / e - 1) * b * b * b * b + 1) + c
        },
        easeInOutQuint: function(a, b, c, d, e) {
            if ((b /= e / 2) < 1) return d / 2 * b * b * b * b * b + c;
            return d / 2 * ((b -= 2) * b * b * b * b + 2) + c
        },
        easeInSine: function(a, b, c, d, e) {
            return - d * Math.cos(b / e * (Math.PI / 2)) + d + c
        },
        easeOutSine: function(a, b, c, d, e) {
            return d * Math.sin(b / e * (Math.PI / 2)) + c
        },
        easeInOutSine: function(a, b, c, d, e) {
            return - d / 2 * (Math.cos(Math.PI * b / e) - 1) + c
        },
        easeInExpo: function(a, b, c, d, e) {
            return b == 0 ? c: d * Math.pow(2, 10 * (b / e - 1)) + c
        },
        easeOutExpo: function(a, b, c, d, e) {
            return b == e ? c + d: d * ( - Math.pow(2, -10 * b / e) + 1) + c
        },
        easeInOutExpo: function(a, b, c, d, e) {
            if (b == 0) return c;
            if (b == e) return c + d;
            if ((b /= e / 2) < 1) return d / 2 * Math.pow(2, 10 * (b - 1)) + c;
            return d / 2 * ( - Math.pow(2, -10 * --b) + 2) + c
        },
        easeInCirc: function(a, b, c, d, e) {
            return - d * (Math.sqrt(1 - (b /= e) * b) - 1) + c
        },
        easeOutCirc: function(a, b, c, d, e) {
            return d * Math.sqrt(1 - (b = b / e - 1) * b) + c
        },
        easeInOutCirc: function(a, b, c, d, e) {
            if ((b /= e / 2) < 1) return - d / 2 * (Math.sqrt(1 - b * b) - 1) + c;
            return d / 2 * (Math.sqrt(1 - (b -= 2) * b) + 1) + c
        },
        easeInElastic: function(a, b, c, d, e) {
            var f = 1.70158,
            g = 0,
            h = d;
            if (b == 0) return c;
            if ((b /= e) == 1) return c + d;
            g || (g = e * .3);
            if (h < Math.abs(d)) {
                h = d;
                var f = g / 4
            } else var f = g / (2 * Math.PI) * Math.asin(d / h);
            return - (h * Math.pow(2, 10 * (b -= 1)) * Math.sin((b * e - f) * 2 * Math.PI / g)) + c
        },
        easeOutElastic: function(a, b, c, d, e) {
            var f = 1.70158,
            g = 0,
            h = d;
            if (b == 0) return c;
            if ((b /= e) == 1) return c + d;
            g || (g = e * .3);
            if (h < Math.abs(d)) {
                h = d;
                var f = g / 4
            } else var f = g / (2 * Math.PI) * Math.asin(d / h);
            return h * Math.pow(2, -10 * b) * Math.sin((b * e - f) * 2 * Math.PI / g) + d + c
        },
        easeInOutElastic: function(a, b, c, d, e) {
            var f = 1.70158,
            g = 0,
            h = d;
            if (b == 0) return c;
            if ((b /= e / 2) == 2) return c + d;
            g || (g = e * .3 * 1.5);
            if (h < Math.abs(d)) {
                h = d;
                var f = g / 4
            } else var f = g / (2 * Math.PI) * Math.asin(d / h);
            if (b < 1) return - 0.5 * h * Math.pow(2, 10 * (b -= 1)) * Math.sin((b * e - f) * 2 * Math.PI / g) + c;
            return h * Math.pow(2, -10 * (b -= 1)) * Math.sin((b * e - f) * 2 * Math.PI / g) * .5 + d + c
        },
        easeInBack: function(a, c, d, e, f, g) {
            g == b && (g = 1.70158);
            return e * (c /= f) * c * ((g + 1) * c - g) + d
        },
        easeOutBack: function(a, c, d, e, f, g) {
            g == b && (g = 1.70158);
            return e * ((c = c / f - 1) * c * ((g + 1) * c + g) + 1) + d
        },
        easeInOutBack: function(a, c, d, e, f, g) {
            g == b && (g = 1.70158);
            if ((c /= f / 2) < 1) return e / 2 * c * c * (((g *= 1.525) + 1) * c - g) + d;
            return e / 2 * ((c -= 2) * c * (((g *= 1.525) + 1) * c + g) + 2) + d
        },
        easeInBounce: function(b, c, d, e, f) {
            return e - a.easing.easeOutBounce(b, f - c, 0, e, f) + d
        },
        easeOutBounce: function(a, b, c, d, e) {
            return (b /= e) < 1 / 2.75 ? d * 7.5625 * b * b + c: b < 2 / 2.75 ? d * (7.5625 * (b -= 1.5 / 2.75) * b + .75) + c: b < 2.5 / 2.75 ? d * (7.5625 * (b -= 2.25 / 2.75) * b + .9375) + c: d * (7.5625 * (b -= 2.625 / 2.75) * b + .984375) + c
        },
        easeInOutBounce: function(b, c, d, e, f) {
            if (c < f / 2) return a.easing.easeInBounce(b, c * 2, 0, e, f) * .5 + d;
            return a.easing.easeOutBounce(b, c * 2 - f, 0, e, f) * .5 + e * .5 + d
        }
    })
} (jQuery);;
var Cufon = (function() {
    var m = function() {
        return m.replace.apply(null, arguments)
    };
    var x = m.DOM = {
        ready: (function() {
            var C = false,
            E = {
                loaded: 1,
                complete: 1
            };
            var B = [],
            D = function() {
                if (C) {
                    return
                }
                C = true;
                for (var F; F = B.shift(); F()) {}
            };
            if (document.addEventListener) {
                document.addEventListener("DOMContentLoaded", D, false);
                window.addEventListener("pageshow", D, false)
            }
            if (!window.opera && document.readyState) { (function() {
                    E[document.readyState] ? D() : setTimeout(arguments.callee, 10)
                })()
            }
            if (document.readyState && document.createStyleSheet) { (function() {
                    try {
                        document.body.doScroll("left");
                        D()
                    } catch(F) {
                        setTimeout(arguments.callee, 1)
                    }
                })()
            }
            q(window, "load", D);
            return function(F) {
                if (!arguments.length) {
                    D()
                } else {
                    C ? F() : B.push(F)
                }
            }
        })(),
        root: function() {
            return document.documentElement || document.body
        }
    };
    var n = m.CSS = {
        Size: function(C, B) {
            this.value = parseFloat(C);
            this.unit = String(C).match(/[a-z%]*$/)[0] || "px";
            this.convert = function(D) {
                return D / B * this.value
            };
            this.convertFrom = function(D) {
                return D / this.value * B
            };
            this.toString = function() {
                return this.value + this.unit
            }
        },
        addClass: function(C, B) {
            var D = C.className;
            C.className = D + (D && " ") + B;
            return C
        },
        color: j(function(C) {
            var B = {};
            B.color = C.replace(/^rgba\((.*?),\s*([\d.]+)\)/,
            function(E, D, F) {
                B.opacity = parseFloat(F);
                return "rgb(" + D + ")"
            });
            return B
        }),
        fontStretch: j(function(B) {
            if (typeof B == "number") {
                return B
            }
            if (/%$/.test(B)) {
                return parseFloat(B) / 100
            }
            return {
                "ultra-condensed": 0.5,
                "extra-condensed": 0.625,
                condensed: 0.75,
                "semi-condensed": 0.875,
                "semi-expanded": 1.125,
                expanded: 1.25,
                "extra-expanded": 1.5,
                "ultra-expanded": 2
            } [B] || 1
        }),
        getStyle: function(C) {
            var B = document.defaultView;
            if (B && B.getComputedStyle) {
                return new a(B.getComputedStyle(C, null))
            }
            if (C.currentStyle) {
                return new a(C.currentStyle)
            }
            return new a(C.style)
        },
        gradient: j(function(F) {
            var G = {
                id: F,
                type: F.match(/^-([a-z]+)-gradient\(/)[1],
                stops: []
            },
            C = F.substr(F.indexOf("(")).match(/([\d.]+=)?(#[a-f0-9]+|[a-z]+\(.*?\)|[a-z]+)/ig);
            for (var E = 0, B = C.length, D; E < B; ++E) {
                D = C[E].split("=", 2).reverse();
                G.stops.push([D[1] || E / (B - 1), D[0]])
            }
            return G
        }),
        quotedList: j(function(E) {
            var D = [],
            C = /\s*((["'])([\s\S]*?[^\\])\2|[^,]+)\s*/g,
            B;
            while (B = C.exec(E)) {
                D.push(B[3] || B[1])
            }
            return D
        }),
        recognizesMedia: j(function(G) {
            var E = document.createElement("style"),
            D,
            C,
            B;
            E.type = "text/css";
            E.media = G;
            try {
                E.appendChild(document.createTextNode("/**/"))
            } catch(F) {}
            C = g("head")[0];
            C.insertBefore(E, C.firstChild);
            D = (E.sheet || E.styleSheet);
            B = D && !D.disabled;
            C.removeChild(E);
            return B
        }),
        removeClass: function(D, C) {
            var B = RegExp("(?:^|\\s+)" + C + "(?=\\s|$)", "g");
            D.className = D.className.replace(B, "");
            return D
        },
        supports: function(D, C) {
            var B = document.createElement("span").style;
            if (B[D] === undefined) {
                return false
            }
            B[D] = C;
            return B[D] === C
        },
        textAlign: function(E, D, B, C) {
            if (D.get("textAlign") == "right") {
                if (B > 0) {
                    E = " " + E
                }
            } else {
                if (B < C - 1) {
                    E += " "
                }
            }
            return E
        },
        textShadow: j(function(F) {
            if (F == "none") {
                return null
            }
            var E = [],
            G = {},
            B,
            C = 0;
            var D = /(#[a-f0-9]+|[a-z]+\(.*?\)|[a-z]+)|(-?[\d.]+[a-z%]*)|,/ig;
            while (B = D.exec(F)) {
                if (B[0] == ",") {
                    E.push(G);
                    G = {};
                    C = 0
                } else {
                    if (B[1]) {
                        G.color = B[1]
                    } else {
                        G[["offX", "offY", "blur"][C++]] = B[2]
                    }
                }
            }
            E.push(G);
            return E
        }),
        textTransform: (function() {
            var B = {
                uppercase: function(C) {
                    return C.toUpperCase()
                },
                lowercase: function(C) {
                    return C.toLowerCase()
                },
                capitalize: function(C) {
                    return C.replace(/\b./g,
                    function(D) {
                        return D.toUpperCase()
                    })
                }
            };
            return function(E, D) {
                var C = B[D.get("textTransform")];
                return C ? C(E) : E
            }
        })(),
        whiteSpace: (function() {
            var D = {
                inline: 1,
                "inline-block": 1,
                "run-in": 1
            };
            var C = /^\s+/,
            B = /\s+$/;
            return function(H, F, G, E) {
                if (E) {
                    if (E.nodeName.toLowerCase() == "br") {
                        H = H.replace(C, "")
                    }
                }
                if (D[F.get("display")]) {
                    return H
                }
                if (!G.previousSibling) {
                    H = H.replace(C, "")
                }
                if (!G.nextSibling) {
                    H = H.replace(B, "")
                }
                return H
            }
        })()
    };
    n.ready = (function() {
        var B = !n.recognizesMedia("all"),
        E = false;
        var D = [],
        H = function() {
            B = true;
            for (var K; K = D.shift(); K()) {}
        };
        var I = g("link"),
        J = g("style");
        function C(K) {
            return K.disabled || G(K.sheet, K.media || "screen")
        }
        function G(M, P) {
            if (!n.recognizesMedia(P || "all")) {
                return true
            }
            if (!M || M.disabled) {
                return false
            }
            try {
                var Q = M.cssRules,
                O;
                if (Q) {
                    search: for (var L = 0, K = Q.length; O = Q[L], L < K; ++L) {
                        switch (O.type) {
                        case 2:
                            break;
                        case 3:
                            if (!G(O.styleSheet, O.media.mediaText)) {
                                return false
                            }
                            break;
                        default:
                            break search
                        }
                    }
                }
            } catch(N) {}
            return true
        }
        function F() {
            if (document.createStyleSheet) {
                return true
            }
            var L, K;
            for (K = 0; L = I[K]; ++K) {
                if (L.rel.toLowerCase() == "stylesheet" && !C(L)) {
                    return false
                }
            }
            for (K = 0; L = J[K]; ++K) {
                if (!C(L)) {
                    return false
                }
            }
            return true
        }
        x.ready(function() {
            if (!E) {
                E = n.getStyle(document.body).isUsable()
            }
            if (B || (E && F())) {
                H()
            } else {
                setTimeout(arguments.callee, 10)
            }
        });
        return function(K) {
            if (B) {
                K()
            } else {
                D.push(K)
            }
        }
    })();
    function s(D) {
        var C = this.face = D.face,
        B = {
            "\u0020": 1,
            "\u00a0": 1,
            "\u3000": 1
        };
        this.glyphs = D.glyphs;
        this.w = D.w;
        this.baseSize = parseInt(C["units-per-em"], 10);
        this.family = C["font-family"].toLowerCase();
        this.weight = C["font-weight"];
        this.style = C["font-style"] || "normal";
        this.viewBox = (function() {
            var F = C.bbox.split(/\s+/);
            var E = {
                minX: parseInt(F[0], 10),
                minY: parseInt(F[1], 10),
                maxX: parseInt(F[2], 10),
                maxY: parseInt(F[3], 10)
            };
            E.width = E.maxX - E.minX;
            E.height = E.maxY - E.minY;
            E.toString = function() {
                return [this.minX, this.minY, this.width, this.height].join(" ")
            };
            return E
        })();
        this.ascent = -parseInt(C.ascent, 10);
        this.descent = -parseInt(C.descent, 10);
        this.height = -this.ascent + this.descent;
        this.spacing = function(L, N, E) {
            var O = this.glyphs,
            M, K, G, P = [],
            F = 0,
            J = -1,
            I = -1,
            H;
            while (H = L[++J]) {
                M = O[H] || this.missingGlyph;
                if (!M) {
                    continue
                }
                if (K) {
                    F -= G = K[H] || 0;
                    P[I] -= G
                }
                F += P[++I] = ~~ (M.w || this.w) + N + (B[H] ? E: 0);
                K = M.k
            }
            P.total = F;
            return P
        }
    }
    function f() {
        var C = {},
        B = {
            oblique: "italic",
            italic: "oblique"
        };
        this.add = function(D) { (C[D.style] || (C[D.style] = {}))[D.weight] = D
        };
        this.get = function(H, I) {
            var G = C[H] || C[B[H]] || C.normal || C.italic || C.oblique;
            if (!G) {
                return null
            }
            I = {
                normal: 400,
                bold: 700
            } [I] || parseInt(I, 10);
            if (G[I]) {
                return G[I]
            }
            var E = {
                1 : 1,
                99 : 0
            } [I % 100],
            K = [],
            F,
            D;
            if (E === undefined) {
                E = I > 400
            }
            if (I == 500) {
                I = 400
            }
            for (var J in G) {
                if (!k(G, J)) {
                    continue
                }
                J = parseInt(J, 10);
                if (!F || J < F) {
                    F = J
                }
                if (!D || J > D) {
                    D = J
                }
                K.push(J)
            }
            if (I < F) {
                I = F
            }
            if (I > D) {
                I = D
            }
            K.sort(function(M, L) {
                return (E ? (M >= I && L >= I) ? M < L: M > L: (M <= I && L <= I) ? M > L: M < L) ? -1 : 1
            });
            return G[K[0]]
        }
    }
    function r() {
        function D(F, G) {
            if (F.contains) {
                return F.contains(G)
            }
            return F.compareDocumentPosition(G) & 16
        }
        function B(G) {
            var F = G.relatedTarget;
            if (!F || D(this, F)) {
                return
            }
            C(this, G.type == "mouseover")
        }
        function E(F) {
            C(this, F.type == "mouseenter")
        }
        function C(F, G) {
            setTimeout(function() {
                var H = d.get(F).options;
                m.replace(F, G ? h(H, H.hover) : H, true)
            },
            10)
        }
        this.attach = function(F) {
            if (F.onmouseenter === undefined) {
                q(F, "mouseover", B);
                q(F, "mouseout", B)
            } else {
                q(F, "mouseenter", E);
                q(F, "mouseleave", E)
            }
        }
    }
    function u() {
        var C = [],
        D = {};
        function B(H) {
            var E = [],
            G;
            for (var F = 0; G = H[F]; ++F) {
                E[F] = C[D[G]]
            }
            return E
        }
        this.add = function(F, E) {
            D[F] = C.push(E) - 1
        };
        this.repeat = function() {
            var E = arguments.length ? B(arguments) : C,
            F;
            for (var G = 0; F = E[G++];) {
                m.replace(F[0], F[1], true)
            }
        }
    }
    function A() {
        var D = {},
        B = 0;
        function C(E) {
            return E.cufid || (E.cufid = ++B)
        }
        this.get = function(E) {
            var F = C(E);
            return D[F] || (D[F] = {})
        }
    }
    function a(B) {
        var D = {},
        C = {};
        this.extend = function(E) {
            for (var F in E) {
                if (k(E, F)) {
                    D[F] = E[F]
                }
            }
            return this
        };
        this.get = function(E) {
            return D[E] != undefined ? D[E] : B[E]
        };
        this.getSize = function(F, E) {
            return C[F] || (C[F] = new n.Size(this.get(F), E))
        };
        this.isUsable = function() {
            return !! B
        }
    }
    function q(C, B, D) {
        if (C.addEventListener) {
            C.addEventListener(B, D, false)
        } else {
            if (C.attachEvent) {
                C.attachEvent("on" + B,
                function() {
                    return D.call(C, window.event)
                })
            }
        }
    }
    function v(C, B) {
        var D = d.get(C);
        if (D.options) {
            return C
        }
        if (B.hover && B.hoverables[C.nodeName.toLowerCase()]) {
            b.attach(C)
        }
        D.options = B;
        return C
    }
    function j(B) {
        var C = {};
        return function(D) {
            if (!k(C, D)) {
                C[D] = B.apply(null, arguments)
            }
            return C[D]
        }
    }
    function c(F, E) {
        var B = n.quotedList(E.get("fontFamily").toLowerCase()),
        D;
        for (var C = 0; D = B[C]; ++C) {
            if (i[D]) {
                return i[D].get(E.get("fontStyle"), E.get("fontWeight"))
            }
        }
        return null
    }
    function g(B) {
        return document.getElementsByTagName(B)
    }
    function k(C, B) {
        return C.hasOwnProperty(B)
    }
    function h() {
        var C = {},
        B, F;
        for (var E = 0, D = arguments.length; B = arguments[E], E < D; ++E) {
            for (F in B) {
                if (k(B, F)) {
                    C[F] = B[F]
                }
            }
        }
        return C
    }
    function o(E, M, C, N, F, D) {
        var K = document.createDocumentFragment(),
        H;
        if (M === "") {
            return K
        }
        var L = N.separate;
        var I = M.split(p[L]),
        B = (L == "words");
        if (B && t) {
            if (/^\s/.test(M)) {
                I.unshift("")
            }
            if (/\s$/.test(M)) {
                I.push("")
            }
        }
        for (var J = 0, G = I.length; J < G; ++J) {
            H = z[N.engine](E, B ? n.textAlign(I[J], C, J, G) : I[J], C, N, F, D, J < G - 1);
            if (H) {
                K.appendChild(H)
            }
        }
        return K
    }
    function l(D, M) {
        var C = D.nodeName.toLowerCase();
        if (M.ignore[C]) {
            return
        }
        var E = !M.textless[C];
        var B = n.getStyle(v(D, M)).extend(M);
        var F = c(D, B),
        G,
        K,
        I,
        H,
        L,
        J;
        if (!F) {
            return
        }
        for (G = D.firstChild; G; G = I) {
            K = G.nodeType;
            I = G.nextSibling;
            if (E && K == 3) {
                if (H) {
                    H.appendData(G.data);
                    D.removeChild(G)
                } else {
                    H = G
                }
                if (I) {
                    continue
                }
            }
            if (H) {
                D.replaceChild(o(F, n.whiteSpace(H.data, B, H, J), B, M, G, D), H);
                H = null
            }
            if (K == 1) {
                if (G.firstChild) {
                    if (G.nodeName.toLowerCase() == "cufon") {
                        z[M.engine](F, null, B, M, G, D)
                    } else {
                        arguments.callee(G, M)
                    }
                }
                J = G
            }
        }
    }
    var t = " ".split(/\s+/).length == 0;
    var d = new A();
    var b = new r();
    var y = new u();
    var e = false;
    var z = {},
    i = {},
    w = {
        autoDetect: false,
        engine: null,
        forceHitArea: false,
        hover: false,
        hoverables: {
            a: true
        },
        ignore: {
            applet: 1,
            canvas: 1,
            col: 1,
            colgroup: 1,
            head: 1,
            iframe: 1,
            map: 1,
            optgroup: 1,
            option: 1,
            script: 1,
            select: 1,
            style: 1,
            textarea: 1,
            title: 1,
            pre: 1
        },
        printable: true,
        selector: (window.Sizzle || (window.jQuery &&
        function(B) {
            return jQuery(B)
        }) || (window.dojo && dojo.query) || (window.Ext && Ext.query) || (window.YAHOO && YAHOO.util && YAHOO.util.Selector && YAHOO.util.Selector.query) || (window.$$ &&
        function(B) {
            return $$(B)
        }) || (window.$ &&
        function(B) {
            return $(B)
        }) || (document.querySelectorAll &&
        function(B) {
            return document.querySelectorAll(B)
        }) || g),
        separate: "words",
        textless: {
            dl: 1,
            html: 1,
            ol: 1,
            table: 1,
            tbody: 1,
            thead: 1,
            tfoot: 1,
            tr: 1,
            ul: 1
        },
        textShadow: "none"
    };
    var p = {
        words: /\s/.test("\u00a0") ? /[^\S\u00a0]+/: /\s+/,
        characters: "",
        none: /^/
    };
    m.now = function() {
        x.ready();
        return m
    };
    m.refresh = function() {
        y.repeat.apply(y, arguments);
        return m
    };
    m.registerEngine = function(C, B) {
        if (!B) {
            return m
        }
        z[C] = B;
        return m.set("engine", C)
    };
    m.registerFont = function(D) {
        if (!D) {
            return m
        }
        var B = new s(D),
        C = B.family;
        if (!i[C]) {
            i[C] = new f()
        }
        i[C].add(B);
        return m.set("fontFamily", '"' + C + '"')
    };
    m.replace = function(D, C, B) {
        C = h(w, C);
        if (!C.engine) {
            return m
        }
        if (!e) {
            n.addClass(x.root(), "cufon-active cufon-loading");
            n.ready(function() {
                n.addClass(n.removeClass(x.root(), "cufon-loading"), "cufon-ready")
            });
            e = true
        }
        if (C.hover) {
            C.forceHitArea = true
        }
        if (C.autoDetect) {
            delete C.fontFamily
        }
        if (typeof C.textShadow == "string") {
            C.textShadow = n.textShadow(C.textShadow)
        }
        if (typeof C.color == "string" && /^-/.test(C.color)) {
            C.textGradient = n.gradient(C.color)
        } else {
            delete C.textGradient
        }
        if (!B) {
            y.add(D, arguments)
        }
        if (D.nodeType || typeof D == "string") {
            D = [D]
        }
        n.ready(function() {
            for (var F = 0, E = D.length; F < E; ++F) {
                var G = D[F];
                if (typeof G == "string") {
                    m.replace(C.selector(G), C, true)
                } else {
                    l(G, C)
                }
            }
        });
        return m
    };
    m.set = function(B, C) {
        w[B] = C;
        return m
    };
    return m
})();
Cufon.registerEngine("vml", (function() {
    var e = document.namespaces;
    if (!e) {
        return
    }
    e.add("cvml", "urn:schemas-microsoft-com:vml");
    e = null;
    var b = document.createElement("cvml:shape");
    b.style.behavior = "url(#default#VML)";
    if (!b.coordsize) {
        return
    }
    b = null;
    var h = (document.documentMode || 0) < 8;
    document.write(('<style type="text/css">cufoncanvas{text-indent:0;}@media screen{cvml\\:shape,cvml\\:rect,cvml\\:fill,cvml\\:shadow{behavior:url(#default#VML);display:block;antialias:true;position:absolute;}cufoncanvas{position:absolute;text-align:left;}cufon{display:inline-block;position:relative;vertical-align:' + (h ? "middle": "text-bottom") + ";}cufon cufontext{position:absolute;left:-10000in;font-size:1px;}a cufon{cursor:pointer}}@media print{cufon cufoncanvas{display:none;}}</style>").replace(/;/g, "!important;"));
    function c(i, j) {
        return a(i, /(?:em|ex|%)$|^[a-z-]+$/i.test(j) ? "1em": j)
    }
    function a(l, m) {
        if (m === "0") {
            return 0
        }
        if (/px$/i.test(m)) {
            return parseFloat(m)
        }
        var k = l.style.left,
        j = l.runtimeStyle.left;
        l.runtimeStyle.left = l.currentStyle.left;
        l.style.left = m.replace("%", "em");
        var i = l.style.pixelLeft;
        l.style.left = k;
        l.runtimeStyle.left = j;
        return i
    }
    function f(l, k, j, n) {
        var i = "computed" + n,
        m = k[i];
        if (isNaN(m)) {
            m = k.get(n);
            k[i] = m = (m == "normal") ? 0 : ~~j.convertFrom(a(l, m))
        }
        return m
    }
    var g = {};
    function d(p) {
        var q = p.id;
        if (!g[q]) {
            var n = p.stops,
            o = document.createElement("cvml:fill"),
            i = [];
            o.type = "gradient";
            o.angle = 180;
            o.focus = "0";
            o.method = "sigma";
            o.color = n[0][1];
            for (var m = 1, l = n.length - 1; m < l; ++m) {
                i.push(n[m][0] * 100 + "% " + n[m][1])
            }
            o.colors = i.join(",");
            o.color2 = n[l][1];
            g[q] = o
        }
        return g[q]
    }
    return function(ac, G, Y, C, K, ad, W) {
        var n = (G === null);
        if (n) {
            G = K.alt
        }
        var I = ac.viewBox;
        var p = Y.computedFontSize || (Y.computedFontSize = new Cufon.CSS.Size(c(ad, Y.get("fontSize")) + "px", ac.baseSize));
        var y, q;
        if (n) {
            y = K;
            q = K.firstChild
        } else {
            y = document.createElement("cufon");
            y.className = "cufon cufon-vml";
            y.alt = G;
            q = document.createElement("cufoncanvas");
            y.appendChild(q);
            if (C.printable) {
                var Z = document.createElement("cufontext");
                Z.appendChild(document.createTextNode(G));
                y.appendChild(Z)
            }
            if (!W) {
                y.appendChild(document.createElement("cvml:shape"))
            }
        }
        var ai = y.style;
        var R = q.style;
        var l = p.convert(I.height),
        af = Math.ceil(l);
        var V = af / l;
        var P = V * Cufon.CSS.fontStretch(Y.get("fontStretch"));
        var U = I.minX,
        T = I.minY;
        R.height = af;
        R.top = Math.round(p.convert(T - ac.ascent));
        R.left = Math.round(p.convert(U));
        ai.height = p.convert(ac.height) + "px";
        var F = Y.get("color");
        var ag = Cufon.CSS.textTransform(G, Y).split("");
        var L = ac.spacing(ag, f(ad, Y, p, "letterSpacing"), f(ad, Y, p, "wordSpacing"));
        if (!L.length) {
            return null
        }
        var k = L.total;
        var x = -U + k + (I.width - L[L.length - 1]);
        var ah = p.convert(x * P),
        X = Math.round(ah);
        var O = x + "," + I.height,
        m;
        var J = "r" + O + "ns";
        var u = C.textGradient && d(C.textGradient);
        var o = ac.glyphs,
        S = 0;
        var H = C.textShadow;
        var ab = -1,
        aa = 0,
        w;
        while (w = ag[++ab]) {
            var D = o[ag[ab]] || ac.missingGlyph,
            v;
            if (!D) {
                continue
            }
            if (n) {
                v = q.childNodes[aa];
                while (v.firstChild) {
                    v.removeChild(v.firstChild)
                }
            } else {
                v = document.createElement("cvml:shape");
                q.appendChild(v)
            }
            v.stroked = "f";
            v.coordsize = O;
            v.coordorigin = m = (U - S) + "," + T;
            v.path = (D.d ? "m" + D.d + "xe": "") + "m" + m + J;
            v.fillcolor = F;
            if (u) {
                v.appendChild(u.cloneNode(false))
            }
            var ae = v.style;
            ae.width = X;
            ae.height = af;
            if (H) {
                var s = H[0],
                r = H[1];
                var B = Cufon.CSS.color(s.color),
                z;
                var N = document.createElement("cvml:shadow");
                N.on = "t";
                N.color = B.color;
                N.offset = s.offX + "," + s.offY;
                if (r) {
                    z = Cufon.CSS.color(r.color);
                    N.type = "double";
                    N.color2 = z.color;
                    N.offset2 = r.offX + "," + r.offY
                }
                N.opacity = B.opacity || (z && z.opacity) || 1;
                v.appendChild(N)
            }
            S += L[aa++]
        }
        var M = v.nextSibling,
        t, A;
        if (C.forceHitArea) {
            if (!M) {
                M = document.createElement("cvml:rect");
                M.stroked = "f";
                M.className = "cufon-vml-cover";
                t = document.createElement("cvml:fill");
                t.opacity = 0;
                M.appendChild(t);
                q.appendChild(M)
            }
            A = M.style;
            A.width = X;
            A.height = af
        } else {
            if (M) {
                q.removeChild(M)
            }
        }
        ai.width = Math.max(Math.ceil(p.convert(k * P)), 0);
        if (h) {
            var Q = Y.computedYAdjust;
            if (Q === undefined) {
                var E = Y.get("lineHeight");
                if (E == "normal") {
                    E = "1em"
                } else {
                    if (!isNaN(E)) {
                        E += "em"
                    }
                }
                Y.computedYAdjust = Q = 0.5 * (a(ad, E) - parseFloat(ai.height))
            }
            if (Q) {
                ai.marginTop = Math.ceil(Q) + "px";
                ai.marginBottom = Q + "px"
            }
        }
        return y
    }
})());
Cufon.registerEngine("canvas", (function() {
    var b = document.createElement("canvas");
    if (!b || !b.getContext || !b.getContext.apply) {
        return
    }
    b = null;
    var a = Cufon.CSS.supports("display", "inline-block");
    var e = !a && (document.compatMode == "BackCompat" || /frameset|transitional/i.test(document.doctype.publicId));
    var f = document.createElement("style");
    f.type = "text/css";
    f.appendChild(document.createTextNode(("cufon{text-indent:0;}@media screen,projection{cufon{display:inline;display:inline-block;position:relative;vertical-align:middle;" + (e ? "": "font-size:1px;line-height:1px;") + "}cufon cufontext{display:-moz-inline-box;display:inline-block;width:0;height:0;overflow:hidden;text-indent:-10000in;}" + (a ? "cufon canvas{position:relative;}": "cufon canvas{position:absolute;}") + "}@media print{cufon{padding:0;}cufon canvas{display:none;}}").replace(/;/g, "!important;")));
    document.getElementsByTagName("head")[0].appendChild(f);
    function d(p, h) {
        var n = 0,
        m = 0;
        var g = [],
        o = /([mrvxe])([^a-z]*)/g,
        k;
        generate: for (var j = 0; k = o.exec(p); ++j) {
            var l = k[2].split(",");
            switch (k[1]) {
            case "v":
                g[j] = {
                    m: "bezierCurveTo",
                    a: [n + ~~l[0], m + ~~l[1], n + ~~l[2], m + ~~l[3], n += ~~l[4], m += ~~l[5]]
                };
                break;
            case "r":
                g[j] = {
                    m: "lineTo",
                    a: [n += ~~l[0], m += ~~l[1]]
                };
                break;
            case "m":
                g[j] = {
                    m: "moveTo",
                    a: [n = ~~l[0], m = ~~l[1]]
                };
                break;
            case "x":
                g[j] = {
                    m: "closePath"
                };
                break;
            case "e":
                break generate
            }
            h[g[j].m].apply(h, g[j].a)
        }
        return g
    }
    function c(m, k) {
        for (var j = 0, h = m.length; j < h; ++j) {
            var g = m[j];
            k[g.m].apply(k, g.a)
        }
    }
    return function(V, w, P, t, C, W) {
        var k = (w === null);
        if (k) {
            w = C.getAttribute("alt")
        }
        var A = V.viewBox;
        var m = P.getSize("fontSize", V.baseSize);
        var B = 0,
        O = 0,
        N = 0,
        u = 0;
        var z = t.textShadow,
        L = [];
        if (z) {
            for (var U = z.length; U--;) {
                var F = z[U];
                var K = m.convertFrom(parseFloat(F.offX));
                var I = m.convertFrom(parseFloat(F.offY));
                L[U] = [K, I];
                if (I < B) {
                    B = I
                }
                if (K > O) {
                    O = K
                }
                if (I > N) {
                    N = I
                }
                if (K < u) {
                    u = K
                }
            }
        }
        var Z = Cufon.CSS.textTransform(w, P).split("");
        var E = V.spacing(Z, ~~m.convertFrom(parseFloat(P.get("letterSpacing")) || 0), ~~m.convertFrom(parseFloat(P.get("wordSpacing")) || 0));
        if (!E.length) {
            return null
        }
        var h = E.total;
        O += A.width - E[E.length - 1];
        u += A.minX;
        var s, n;
        if (k) {
            s = C;
            n = C.firstChild
        } else {
            s = document.createElement("cufon");
            s.className = "cufon cufon-canvas";
            s.setAttribute("alt", w);
            n = document.createElement("canvas");
            s.appendChild(n);
            if (t.printable) {
                var S = document.createElement("cufontext");
                S.appendChild(document.createTextNode(w));
                s.appendChild(S)
            }
        }
        var aa = s.style;
        var H = n.style;
        var j = m.convert(A.height);
        var Y = Math.ceil(j);
        var M = Y / j;
        var G = M * Cufon.CSS.fontStretch(P.get("fontStretch"));
        var J = h * G;
        var Q = Math.ceil(m.convert(J + O - u));
        var o = Math.ceil(m.convert(A.height - B + N));
        try {
            n.width = Q;
            n.height = o;
            H.width = Q + "px";
            H.height = o + "px";
            B += A.minY;
            H.top = Math.round(m.convert(B - V.ascent)) + "px";
            H.left = Math.round(m.convert(u)) + "px";

            var r = Math.max(Math.ceil(m.convert(J)), 0) + "px";
            if (a) {
                aa.width = r;
                aa.height = m.convert(V.height) + "px"
            } else {
                aa.paddingLeft = r;
                aa.paddingBottom = (m.convert(V.height) - 1) + "px"
            }
            var X = n.getContext("2d"),
            D = j / A.height;
            X.scale(D, D * M);
            X.translate( - u, -B);
            X.save();
            function T() {
                var x = V.glyphs,
                ab, l = -1,
                g = -1,
                y;
                X.scale(G, 1);
                while (y = Z[++l]) {
                    var ab = x[Z[l]] || V.missingGlyph;
                    if (!ab) {
                        continue
                    }
                    if (ab.d) {
                        X.beginPath();
                        if (ab.code) {
                            c(ab.code, X)
                        } else {
                            ab.code = d("m" + ab.d, X)
                        }
                        X.fill()
                    }
                    X.translate(E[++g], 0)
                }
                X.restore()
            }
            if (z) {
                for (var U = z.length; U--;) {
                    var F = z[U];
                    X.save();
                    X.fillStyle = F.color;
                    X.translate.apply(X, L[U]);
                    T()
                }
            }
            var q = t.textGradient;
            if (q) {
                var v = q.stops,
                p = X.createLinearGradient(0, A.minY, 0, A.maxY);
                for (var U = 0, R = v.length; U < R; ++U) {
                    p.addColorStop.apply(p, v[U])
                }
                X.fillStyle = p
            } else {
                X.fillStyle = P.get("color")
            }
            T();

        } catch(e) {}
        return s
    }
})());
/*
 * The following copyright notice may not be removed under any circumstances.
 * 
 * Copyright:
 * Part of the digitally encoded machine readable outline data for producing the
 * Typefaces provided is copyrighted � 1988 - 2008 Linotype GmbH, www.linotype.com.
 * All rights reserved. This software is the property of Linotype GmbH, and may not
 * be reproduced, used, displayed, modified, disclosed or transferred without the
 * express written approval of Linotype GmbH.  The digitally encoded machine
 * readable software for producing the Typefaces licensed to you is copyrighted (c)
 * 1988, 1990, 1993 Adobe Systems. All Rights Reserved. This software is the
 * property of Adobe Systems Incorporated and its licensors, and may not be
 * reproduced, used, displayed, modified, disclosed or transferred without the
 * express written approval of Adobe. Helvetica is a trademark of Linotype GmbH
 * registered in the U.S. Patent and Trademark Office and may be registered in
 * certain other jurisdictions. This typeface is original artwork of Linotype
 * Design Studio. The design may be protected in certain jurisdictions.
 * 
 * Trademark:
 * Helvetica is a trademark of Linotype GmbH registered in the U.S. Patent and
 * Trademark Office and may be registered in certain other jurisdictions.
 * 
 * Full name:
 * HelveticaNeueLTPro-Lt
 * 
 * Description:
 * Helvetica is one of the most famous and popular typefaces in the world. It
 * lends an air of lucid efficiency to any typographic message with its clean,
 * no-nonsense shapes. The original typeface was called Haas Grotesk, and was
 * designed in 1957 by Max Miedinger for the Haas'sche Schriftgiesserei (Haas Type
 * Foundry) in Switzerland. In 1960 the name was changed to Helvetica (an
 * adaptation of "Helvetia", the Latin name for Switzerland). Over the years, the
 * Helvetica family was expanded to include many different weights, but these were
 * not as well coordinated with each other as they might have been. In 1983, D.
 * Stempel AG and Linotype re-designed and digitized Neue Helvetica and updated it
 * into a cohesive font family. Today, the original Helvetica family consists of 34
 * different font weights, and the Neue Helvetica family consists of 51 font
 * weights. The numbering system describes Helvetica's characteristics and is
 * similar to the numbering system of the Univers family. The basic or regular
 * font, "Helvetica roman", forms the central point of the system with the
 * designation "55 roman". The first figure of the number describes the weight - 25
 * ultra light to 95 extra black. The second figure gives width information -
 * Helvetica 53 extended to Helvetica 57 condensed. The Helvetica family now forms
 * an integral part of many digital printers and operating systems and has become a
 * stylistic anchor in our visual culture. It is the quintessential sans serif
 * font, timeless and neutral, and can be used for all types of communication.
 * 
 * Manufacturer:
 * Linotype GmbH
 * 
 * Designer:
 * Linotype Design Studio
 * 
 * Vendor URL:
 * http://www.linotype.com
 * 
 * License information:
 * http://www.linotype.com/license
 */
Cufon.registerFont({
    "w": 66,
    "face": {
        "font-family": "Helvetica Neue LT Pro",
        "font-weight": 300,
        "font-stretch": "normal",
        "units-per-em": "360",
        "panose-1": "2 11 4 3 2 2 2 2 2 4",
        "ascent": "257",
        "descent": "-103",
        "x-height": "5",
        "bbox": "-60 -348 378 77.3102",
        "underline-thickness": "18",
        "underline-position": "-18",
        "stemh": "19",
        "stemv": "23",
        "unicode-range": "U+000D-U+FB02"
    },
    "glyphs": {
        " ": {
            "w": 100
        },
        "\u0149": {
            "d": "28,0r0,-186r22,0v1,10,-2,24,1,32v9,-22,34,-37,60,-37v98,0,61,108,68,191r-23,0v-8,-67,28,-171,-47,-172v-75,-1,-58,98,-59,172r-22,0xm8,-290r31,0v2,31,-1,57,-31,55r0,-10v10,-2,13,-6,14,-12r-14,0r0,-33",
            "w": 199
        },
        "\u0132": {
            "d": "28,0r0,-257r24,0r0,257r-24,0xm211,-82r0,-175r25,0r0,185v0,52,-20,77,-75,77v-59,0,-72,-42,-72,-87r25,0v1,22,-2,67,49,67v39,0,48,-20,48,-67",
            "w": 261
        },
        "\ufb01": {
            "d": "115,-221r0,-36r23,0r0,36r-23,0xm34,0r0,-167r-32,0r0,-19r32,0v-5,-48,11,-79,64,-70r0,20v-36,-9,-46,13,-41,50r36,0r0,19r-36,0r0,167r-23,0xm115,0r0,-186r23,0r0,186r-23,0",
            "w": 159
        },
        "\ufb02": {
            "d": "115,0r0,-257r23,0r0,257r-23,0xm34,0r0,-167r-32,0r0,-19r32,0v-5,-48,11,-79,64,-70r0,20v-36,-9,-46,13,-41,50r36,0r0,19r-36,0r0,167r-23,0",
            "w": 159
        },
        "\u0133": {
            "d": "22,-221r0,-36r23,0r0,36r-23,0xm22,0r0,-186r23,0r0,186r-23,0xm90,-221r0,-36r22,0r0,36r-22,0xm90,23r0,-209r22,0r0,203v2,34,-15,59,-55,51r0,-19v21,5,33,-6,33,-26",
            "w": 134
        },
        "\r": {
            "w": 0
        },
        "!": {
            "d": "59,0r-31,0r0,-38r31,0r0,38xm37,-64r-6,-116r0,-77r25,0r0,77r-6,116r-13,0",
            "w": 86
        },
        "\"": {
            "d": "79,-170r0,-87r23,0r0,87r-23,0xm31,-170r0,-87r23,0r0,87r-23,0",
            "w": 133
        },
        "#": {
            "d": "131,-153r-51,0r-8,57r51,0xm179,-96r0,16r-40,0r-11,80r-18,0r11,-80r-51,0r-11,80r-18,0r11,-80r-39,0r0,-16r41,0r8,-57r-39,0r0,-16r41,0r12,-80r18,0r-12,80r51,0r11,-80r18,0r-11,80r38,0r0,16r-40,0r-8,57r38,0",
            "w": 200
        },
        "$": {
            "d": "10,-82r23,0v0,42,22,64,60,68r0,-106v-41,-9,-76,-22,-76,-72v0,-43,34,-70,76,-70r0,-29r14,0r0,29v42,0,77,31,76,78r-23,0v0,-36,-21,-59,-53,-59r0,103v41,9,83,23,83,73v0,48,-41,72,-83,72r0,31r-14,0r0,-31v-56,-5,-81,-32,-83,-87xm93,-143r0,-100v-29,0,-53,15,-53,53v0,33,26,40,53,47xm107,-117r0,103v30,0,60,-15,60,-52v0,-34,-32,-44,-60,-51",
            "w": 200
        },
        "%": {
            "d": "82,-254v41,0,57,29,57,68v0,39,-16,68,-57,68v-41,0,-57,-29,-57,-68v0,-39,16,-68,57,-68xm240,-114v-31,0,-38,29,-38,52v0,23,7,51,38,51v30,0,38,-28,38,-51v0,-23,-8,-52,-38,-52xm240,-131v41,0,57,29,57,68v0,39,-16,68,-57,68v-41,0,-57,-29,-57,-68v0,-39,16,-68,57,-68xm68,12r163,-273r17,0r-162,273r-18,0xm82,-238v-31,0,-38,29,-38,52v0,23,7,52,38,52v30,0,38,-29,38,-52v0,-23,-8,-52,-38,-52",
            "w": 320
        },
        "&": {
            "d": "102,-238v-19,0,-34,11,-34,33v0,18,17,38,29,52v18,-12,39,-27,39,-52v0,-22,-15,-33,-34,-33xm195,0r-28,-33v-37,58,-154,50,-153,-34v0,-36,34,-61,63,-76v-14,-18,-32,-37,-32,-62v0,-31,26,-52,57,-52v31,0,57,21,57,52v0,32,-24,51,-50,67r56,67v6,-13,7,-23,7,-43r23,0v0,14,-3,40,-15,62r43,52r-28,0xm153,-50r-64,-78v-25,13,-52,33,-52,64v0,30,27,50,56,50v26,0,46,-15,60,-36",
            "w": 219
        },
        "'": {
            "d": "39,-170r0,-87r23,0r0,87r-23,0",
            "w": 100
        },
        "(": {
            "d": "87,69r-18,0v-67,-97,-67,-235,0,-331r18,0v-60,97,-62,235,0,331",
            "w": 86
        },
        ")": {
            "d": "0,-262r18,0v67,97,66,235,0,331r-18,0v61,-97,61,-235,0,-331",
            "w": 86
        },
        "*": {
            "d": "51,-200r-41,-14r5,-14r41,15r0,-44r14,0r0,44r42,-15r5,14r-42,14r25,35r-11,8r-26,-36r-27,36r-11,-8",
            "w": 126
        },
        "+": {
            "d": "99,-100r0,-81r19,0r0,81r81,0r0,19r-81,0r0,81r-19,0r0,-81r-81,0r0,-19r81,0",
            "w": 216
        },
        ",": {
            "d": "35,-38r30,0v1,41,1,77,-32,87r0,-15v12,-4,18,-23,17,-34r-15,0r0,-38",
            "w": 100
        },
        "-": {
            "d": "112,-89r-90,0r0,-20r90,0r0,20",
            "w": 133
        },
        ".": {
            "d": "65,0r-30,0r0,-38r30,0r0,38",
            "w": 100
        },
        "\/": {
            "d": "15,5r-20,0r111,-267r19,0",
            "w": 119
        },
        "0": {
            "d": "100,-254v73,0,88,70,88,129v0,59,-15,130,-88,130v-73,0,-88,-70,-88,-129v0,-59,15,-130,88,-130xm100,-235v-58,0,-65,66,-65,110v0,44,7,111,65,111v58,0,65,-67,65,-111v0,-44,-7,-110,-65,-110",
            "w": 200
        },
        "1": {
            "d": "35,-187r0,-16v40,-1,64,-3,71,-49r18,0r0,252r-22,0r0,-187r-67,0",
            "w": 200
        },
        "2": {
            "d": "178,-183v-1,86,-117,92,-139,162r140,0r0,21r-166,0v1,-75,77,-96,121,-136v37,-33,21,-99,-35,-99v-41,0,-58,33,-57,70r-23,0v-1,-52,26,-89,81,-89v44,0,78,24,78,71",
            "w": 200
        },
        "3": {
            "d": "12,-80r23,0v-2,40,23,66,63,66v33,0,64,-19,64,-55v-1,-43,-35,-58,-80,-54r0,-19v38,3,71,-6,71,-46v0,-33,-25,-47,-55,-47v-37,0,-59,27,-58,64r-22,0v0,-48,30,-83,79,-83v39,0,78,19,78,64v0,27,-15,49,-42,56v33,5,52,30,52,63v0,49,-41,76,-87,76v-52,0,-90,-31,-86,-85",
            "w": 200
        },
        "4": {
            "d": "31,-82r96,0r-1,-137xm11,-63r0,-22r116,-167r21,0r0,170r38,0r0,19r-38,0r0,63r-21,0r0,-63r-116,0",
            "w": 200
        },
        "5": {
            "d": "13,-72r23,0v1,35,27,58,62,58v39,0,63,-31,63,-68v0,-65,-90,-89,-121,-36r-19,0r24,-131r126,0r0,21r-110,0r-16,84v48,-51,138,-11,138,64v0,49,-39,85,-87,85v-47,0,-82,-29,-83,-77",
            "w": 200
        },
        "6": {
            "d": "182,-188r-23,0v-4,-28,-23,-47,-52,-47v-58,-1,-72,69,-69,113v12,-25,38,-42,67,-42v50,0,83,35,83,84v0,49,-35,85,-85,85v-61,0,-89,-36,-89,-134v0,-30,8,-125,90,-125v45,0,73,22,78,66xm104,-145v-40,0,-62,30,-62,67v0,36,19,64,63,64v36,0,60,-29,60,-64v0,-37,-22,-67,-61,-67",
            "w": 200
        },
        "7": {
            "d": "18,-228r0,-21r162,0r0,21v-32,33,-96,111,-102,228r-24,0v6,-85,34,-148,104,-228r-140,0",
            "w": 200
        },
        "8": {
            "d": "100,-144v28,0,54,-15,54,-47v0,-29,-24,-44,-54,-44v-28,0,-54,15,-54,44v0,33,27,47,54,47xm176,-191v1,28,-17,46,-41,56v33,7,52,30,52,64v0,51,-39,76,-87,76v-48,0,-87,-25,-87,-76v0,-34,22,-57,51,-65v-26,-8,-41,-27,-41,-55v1,-84,152,-85,153,0xm100,-14v36,0,64,-18,64,-57v0,-36,-30,-54,-64,-54v-35,0,-64,17,-64,54v0,38,28,57,64,57",
            "w": 200
        },
        "9": {
            "d": "18,-60r23,0v4,28,24,46,53,46v58,1,71,-68,68,-112v-12,25,-38,41,-67,41v-50,0,-83,-35,-83,-84v0,-49,36,-85,86,-85v61,0,88,36,88,134v0,30,-8,125,-90,125v-45,0,-73,-21,-78,-65xm96,-104v40,0,62,-29,62,-66v0,-36,-19,-65,-63,-65v-36,0,-60,30,-60,65v0,37,22,66,61,66",
            "w": 200
        },
        ":": {
            "d": "65,0r-30,0r0,-38r30,0r0,38xm65,-142r-30,0r0,-38r30,0r0,38",
            "w": 100
        },
        ";": {
            "d": "65,-142r-30,0r0,-38r30,0r0,38xm35,-38r30,0v1,41,1,77,-32,87r0,-15v12,-4,18,-23,17,-34r-15,0r0,-38",
            "w": 100
        },
        "<": {

            "d": "199,-17r0,20r-182,-84r0,-20r182,-84r0,20r-160,74",
            "w": 216
        },
        "=": {
            "d": "199,-65r0,19r-181,0r0,-19r181,0xm199,-136r0,19r-181,0r0,-19r181,0",
            "w": 216
        },
        ">": {
            "d": "17,-17r160,-74r-160,-74r0,-20r182,84r0,20r-182,84r0,-20",
            "w": 216
        },
        "?": {
            "d": "83,0r0,-38r30,0r0,38r-30,0xm87,-64v-12,-64,65,-75,65,-131v0,-29,-24,-48,-52,-48v-39,0,-59,28,-58,65r-23,0v0,-51,30,-84,82,-84v40,0,73,24,73,66v0,61,-77,69,-65,132r-22,0",
            "w": 193
        },
        "@": {
            "d": "221,-196r-35,104v-5,15,-7,30,5,30v32,0,61,-50,61,-90v0,-59,-46,-94,-102,-94v-67,0,-114,53,-114,119v0,65,48,116,114,116v35,0,72,-18,93,-48r19,0v-22,39,-67,64,-112,64v-78,0,-133,-59,-133,-135v0,-75,59,-132,132,-132v69,0,122,46,122,112v0,58,-43,104,-83,104v-13,0,-24,-8,-25,-24v-26,39,-94,26,-94,-29v0,-50,35,-104,86,-104v16,0,30,9,38,31r9,-24r19,0xm153,-184v-37,0,-61,51,-61,84v0,22,13,34,30,34v33,0,60,-52,60,-84v0,-17,-15,-34,-29,-34",
            "w": 288
        },
        "A": {
            "d": "114,-233r-52,132r101,0xm-3,0r104,-257r28,0r100,257r-26,0r-31,-80r-117,0r-31,80r-27,0",
            "w": 226,
            "k": {
                "y": 6,
                "\u00fd": 6,
                "\u0177": 6,
                "\u00ff": 6,
                "V": 18,
                "\u2019": 31,
                "v": 6,
                "T": 24,
                "\u0164": 24,
                "\u0162": 24,
                "\u021a": 24,
                "W": 2,
                "\u0174": 2,
                "Y": 27,
                "\u00dd": 27,
                "\u0176": 27,
                "\u0178": 27,
                "w": 6,
                "\u0175": 6
            }
        },
        "B": {
            "d": "50,-236r0,92v57,0,143,9,143,-44v0,-62,-84,-46,-143,-48xm26,0r0,-257v81,4,188,-23,191,63v0,27,-18,52,-45,58v33,4,55,30,55,63v0,24,-8,73,-92,73r-109,0xm50,-123r0,102v66,-4,149,19,152,-53v2,-62,-90,-48,-152,-49",
            "w": 240
        },
        "C": {
            "d": "238,-179r-24,0v-9,-40,-42,-63,-79,-63v-132,1,-130,226,0,227v48,0,77,-37,82,-83r25,0v-7,63,-47,103,-107,103v-81,0,-121,-63,-121,-134v0,-71,40,-133,121,-133v49,0,96,29,103,83",
            "w": 253
        },
        "D": {
            "d": "26,0r0,-257r89,0v78,2,118,43,118,128v0,85,-40,129,-118,129r-89,0xm50,-236r0,215v97,5,158,-9,158,-108v0,-99,-61,-113,-158,-107",
            "w": 246
        },
        "E": {
            "d": "26,0r0,-257r177,0r0,21r-153,0r0,93r144,0r0,21r-144,0r0,101r155,0r0,21r-179,0",
            "w": 213
        },
        "F": {
            "d": "26,0r0,-257r163,0r0,21r-139,0r0,93r124,0r0,21r-124,0r0,122r-24,0",
            "w": 193,
            "k": {
                ",": 46
            }
        },
        "G": {
            "d": "246,-131r0,131r-18,0v-2,-15,0,-34,-4,-47v-17,37,-52,52,-89,52v-81,0,-121,-63,-121,-134v0,-71,40,-133,121,-133v54,0,97,29,107,85r-24,0v-3,-30,-34,-65,-83,-65v-132,1,-130,226,0,227v57,0,90,-40,89,-95r-88,0r0,-21r110,0",
            "w": 266
        },
        "H": {
            "d": "26,0r0,-257r24,0r0,112r153,0r0,-112r25,0r0,257r-25,0r0,-125r-153,0r0,125r-24,0",
            "w": 253
        },
        "I": {
            "d": "28,0r0,-257r24,0r0,257r-24,0",
            "w": 79
        },
        "J": {
            "d": "130,-82r0,-175r24,0r0,185v0,52,-20,77,-75,77v-59,0,-71,-42,-71,-87r24,0v1,22,-2,67,49,67v39,0,49,-20,49,-67",
            "w": 180
        },
        "K": {
            "d": "26,0r0,-257r24,0r0,138r150,-138r33,0r-115,106r120,151r-31,0r-107,-134r-50,46r0,88r-24,0",
            "w": 233
        },
        "L": {
            "d": "26,0r0,-257r24,0r0,236r144,0r0,21r-168,0",
            "w": 193,
            "k": {
                "y": 13,
                "\u00fd": 13,
                "\u0177": 13,
                "\u00ff": 13,
                "V": 33,
                "\u2019": 35,
                "T": 33,
                "\u0164": 33,
                "\u0162": 33,
                "\u021a": 33,
                "W": 20,
                "\u0174": 20,
                "Y": 40,
                "\u00dd": 40,
                "\u0176": 40,
                "\u0178": 40
            }
        },
        "M": {
            "d": "25,0r0,-257r36,0r89,225r89,-225r36,0r0,257r-25,0r-1,-222r-87,222r-23,0r-89,-222r0,222r-25,0",
            "w": 299
        },
        "N": {
            "d": "26,0r0,-257r27,0r150,217r0,-217r25,0r0,257r-27,0r-151,-217r0,217r-24,0",
            "w": 253
        },
        "O": {
            "d": "134,-242v-132,1,-130,226,0,227v130,-1,130,-226,0,-227xm12,-129v0,-71,41,-133,122,-133v81,0,121,62,121,133v0,71,-40,134,-121,134v-81,0,-122,-63,-122,-134",
            "w": 266
        },
        "P": {
            "d": "50,-236r0,105v63,-2,142,16,142,-53v0,-68,-79,-50,-142,-52xm26,0r0,-257r114,0v46,0,76,27,76,73v0,46,-30,74,-76,74r-90,0r0,110r-24,0",
            "w": 226,
            "k": {
                ",": 55,
                "A": 27,
                "\u00c0": 27,
                "\u00c1": 27,
                "\u00c2": 27,
                "\u00c3": 27,
                "\u00c4": 27,
                "\u0100": 27,
                "\u0102": 27,
                "\u00c5": 27,
                "\u0104": 27,
                "\u00c6": 27,
                ".": 55,
                "\u2026": 55
            }
        },
        "Q": {
            "d": "252,1r-12,16r-40,-31v-18,13,-39,19,-66,19v-81,0,-122,-63,-122,-134v0,-71,41,-133,122,-133v125,0,155,163,82,235xm160,-69r37,28v59,-60,42,-201,-63,-201v-132,1,-130,226,0,227v18,0,34,-5,47,-13r-34,-26",
            "w": 266
        },
        "R": {
            "d": "50,-236r0,101v63,-2,144,15,147,-50v3,-66,-85,-49,-147,-51xm202,0v-16,-45,6,-114,-59,-114r-93,0r0,114r-24,0r0,-257v85,3,195,-22,196,67v1,34,-19,57,-50,66v62,5,34,81,57,124r-27,0",
            "w": 240,
            "k": {
                "y": -9,
                "\u00fd": -9,
                "\u0177": -9,
                "\u00ff": -9,
                "V": -2,
                "T": -2,
                "\u0164": -2,
                "\u0162": -2,
                "\u021a": -2,
                "W": -2,
                "\u0174": -2,
                "Y": 5,
                "\u00dd": 5,
                "\u0176": 5,
                "\u0178": 5
            }
        },
        "S": {
            "d": "13,-85r24,0v-1,53,37,70,84,70v27,0,68,-16,68,-53v0,-83,-167,-24,-168,-122v0,-25,17,-72,89,-72v51,0,95,26,95,79r-25,0v2,-72,-134,-84,-134,-7v0,47,64,42,101,54v35,12,67,26,67,68v0,18,-7,73,-98,73v-61,0,-106,-27,-103,-90",
            "w": 226
        },
        "T": {
            "d": "-2,-236r0,-21r204,0r0,21r-90,0r0,236r-24,0r0,-236r-90,0",
            "w": 200,
            "k": {
                "A": 24,
                "\u00c0": 24,
                "\u00c1": 24,
                "\u00c2": 24,
                "\u00c3": 24,
                "\u00c4": 24,
                "\u0100": 24,
                "\u0102": 24,
                "\u00c5": 24,
                "\u0104": 24,
                "\u00c6": 24,
                ".": 40,
                "\u2026": 40,
                "a": 40,
                "\u00e0": 40,
                "\u00e1": 40,
                "\u00e2": 40,
                "\u00e3": 40,
                "\u00e4": 40,
                "\u0101": 40,
                "\u0103": 40,
                "\u00e5": 40,
                "\u0105": 40,
                "\u00e6": 40,
                "e": 40,
                "\u00e8": 40,
                "\u00e9": 40,
                "\u00ea": 40,
                "\u011b": 40,
                "\u00eb": 40,
                "\u0113": 40,
                "\u0115": 40,
                "\u0117": 40,
                "\u0119": 40,
                "-": 46,
                "\u00ad": 46,
                "i": -9,
                "\u0131": -9,
                "\u00ec": -9,
                "\u00ed": -9,
                "\u00ee": -9,
                "\u0129": -9,
                "\u00ef": -9,
                "\u012b": -9,
                "\u012f": -9,
                "\u0133": -9,
                "o": 40,
                "\u00f2": 40,
                "\u00f3": 40,
                "\u00f4": 40,
                "\u00f5": 40,
                "\u00f6": 40,
                "\u014d": 40,
                "\u014f": 40,
                "\u0151": 40,
                "\u00f8": 40,
                "\u0153": 40,
                "r": 33,
                "\u0155": 33,
                "\u0159": 33,
                "\u0157": 33,
                "u": 33,
                "\u00f9": 33,
                "\u00fa": 33,
                "\u00fb": 33,
                "\u0169": 33,
                "\u00fc": 33,
                "\u016b": 33,
                "\u016d": 33,
                "\u016f": 33,
                "\u0171": 33,
                "\u0173": 33,
                "y": 40,
                "\u00fd": 40,
                "\u0177": 40,
                "\u00ff": 40,
                "s": 40,
                "\u015b": 40,
                "\u015d": 40,
                "\u0161": 40,
                "\u015f": 40,
                "\u0219": 40,
                ":": 40,
                ",": 40,
                ";": 40,
                "w": 40,
                "\u0175": 40,
                "c": 40,
                "\u0107": 40,
                "\u0109": 40,
                "\u010d": 40,
                "\u010b": 40,
                "\u00e7": 40
            }
        },
        "U": {
            "d": "123,5v-136,0,-93,-142,-100,-262r25,0r0,159v0,59,27,83,75,83v48,0,76,-24,76,-83r0,-159r24,0v-7,120,37,262,-100,262",
            "w": 246
        },
        "V": {
            "d": "93,0r-96,-257r27,0r84,230r83,-230r26,0r-96,257r-28,0",
            "w": 213,
            "k": {
                ";": 27,
                ":": 27,
                ",": 46,
                "A": 20,
                "\u00c0": 20,
                "\u00c1": 20,
                "\u00c2": 20,
                "\u00c3": 20,
                "\u00c4": 20,
                "\u0100": 20,
                "\u0102": 20,
                "\u00c5": 20,
                "\u0104": 20,
                "\u00c6": 20,
                ".": 46,
                "\u2026": 46,
                "a": 20,
                "\u00e0": 20,
                "\u00e1": 20,
                "\u00e2": 20,
                "\u00e3": 20,
                "\u00e4": 20,
                "\u0101": 20,
                "\u0103": 20,
                "\u00e5": 20,
                "\u0105": 20,
                "\u00e6": 20,
                "e": 20,
                "\u00e8": 20,
                "\u00e9": 20,
                "\u00ea": 20,
                "\u011b": 20,
                "\u00eb": 20,
                "\u0113": 20,
                "\u0115": 20,
                "\u0117": 20,
                "\u0119": 20,
                "-": 20,
                "\u00ad": 20,
                "i": -2,
                "\u0131": -2,
                "\u00ec": -2,
                "\u00ed": -2,
                "\u00ee": -2,
                "\u0129": -2,
                "\u00ef": -2,
                "\u012b": -2,
                "\u012f": -2,
                "\u0133": -2,
                "o": 20,
                "\u00f2": 20,
                "\u00f3": 20,
                "\u00f4": 20,
                "\u00f5": 20,
                "\u00f6": 20,
                "\u014d": 20,
                "\u014f": 20,
                "\u0151": 20,
                "\u00f8": 20,
                "\u0153": 20,
                "r": 13,
                "\u0155": 13,
                "\u0159": 13,
                "\u0157": 13,
                "u": 13,
                "\u00f9": 13,
                "\u00fa": 13,
                "\u00fb": 13,
                "\u0169": 13,
                "\u00fc": 13,
                "\u016b": 13,
                "\u016d": 13,
                "\u016f": 13,
                "\u0171": 13,
                "\u0173": 13,
                "y": 6,
                "\u00fd": 6,
                "\u0177": 6,
                "\u00ff": 6
            }
        },
        "W": {
            "d": "71,0r-71,-257r26,0r59,225r63,-225r31,0r63,225r59,-225r24,0r-70,257r-26,0r-66,-230r-65,230r-27,0",
            "w": 326,
            "k": {
                "A": 6,
                "\u00c0": 6,
                "\u00c1": 6,
                "\u00c2": 6,
                "\u00c3": 6,
                "\u00c4": 6,
                "\u0100": 6,
                "\u0102": 6,
                "\u00c5": 6,
                "\u0104": 6,
                "\u00c6": 6,
                ".": 27,
                "\u2026": 27,
                "a": 13,
                "\u00e0": 13,
                "\u00e1": 13,
                "\u00e2": 13,
                "\u00e3": 13,
                "\u00e4": 13,
                "\u0101": 13,
                "\u0103": 13,
                "\u00e5": 13,
                "\u0105": 13,
                "\u00e6": 13,
                "e": 6,
                "\u00e8": 6,
                "\u00e9": 6,
                "\u00ea": 6,
                "\u011b": 6,
                "\u00eb": 6,
                "\u0113": 6,
                "\u0115": 6,
                "\u0117": 6,
                "\u0119": 6,
                "i": -9,
                "\u0131": -9,
                "\u00ec": -9,
                "\u00ed": -9,
                "\u00ee": -9,
                "\u0129": -9,
                "\u00ef": -9,
                "\u012b": -9,
                "\u012f": -9,
                "\u0133": -9,
                "o": 6,
                "\u00f2": 6,
                "\u00f3": 6,
                "\u00f4": 6,
                "\u00f5": 6,
                "\u00f6": 6,
                "\u014d": 6,
                "\u014f": 6,
                "\u0151": 6,
                "\u00f8": 6,
                "\u0153": 6,
                "r": 6,
                "\u0155": 6,
                "\u0159": 6,
                "\u0157": 6,
                "u": 6,
                "\u00f9": 6,
                "\u00fa": 6,
                "\u00fb": 6,
                "\u0169": 6,
                "\u00fc": 6,
                "\u016b": 6,
                "\u016d": 6,
                "\u016f": 6,
                "\u0171": 6,
                "\u0173": 6,
                ":": 6,
                ",": 27,
                ";": 6
            }
        },
        "X": {
            "d": "88,-132r-87,-125r29,0r73,108r75,-108r27,0r-88,125r93,132r-29,0r-78,-113r-80,113r-27,0",
            "w": 206
        },
        "Y": {
            "d": "98,0r0,-106r-102,-151r30,0r84,130r84,-130r30,0r-102,151r0,106r-24,0",
            "w": 219,
            "k": {
                "A": 27,
                "\u00c0": 27,
                "\u00c1": 27,
                "\u00c2": 27,
                "\u00c3": 27,
                "\u00c4": 27,
                "\u0100": 27,
                "\u0102": 27,
                "\u00c5": 27,
                "\u0104": 27,
                "\u00c6": 27,
                ".": 36,
                "\u2026": 36,
                "a": 33,
                "\u00e0": 33,
                "\u00e1": 33,
                "\u00e2": 33,
                "\u00e3": 33,
                "\u00e4": 33,
                "\u0101": 33,
                "\u0103": 33,
                "\u00e5": 33,
                "\u0105": 33,
                "\u00e6": 33,
                "e": 33,
                "\u00e8": 33,
                "\u00e9": 33,
                "\u00ea": 33,
                "\u011b": 33,
                "\u00eb": 33,
                "\u0113": 33,
                "\u0115": 33,
                "\u0117": 33,
                "\u0119": 33,
                "-": 40,
                "\u00ad": 40,
                "i": 3,
                "\u0131": 3,
                "\u00ec": 3,
                "\u00ed": 3,
                "\u00ee": 3,
                "\u0129": 3,
                "\u00ef": 3,
                "\u012b": 3,
                "\u012f": 3,
                "\u0133": 3,
                "o": 33,
                "\u00f2": 33,
                "\u00f3": 33,
                "\u00f4": 33,
                "\u00f5": 33,
                "\u00f6": 33,
                "\u014d": 33,
                "\u014f": 33,
                "\u0151": 33,
                "\u00f8": 33,
                "\u0153": 33,
                "u": 27,
                "\u00f9": 27,
                "\u00fa": 27,
                "\u00fb": 27,
                "\u0169": 27,
                "\u00fc": 27,
                "\u016b": 27,
                "\u016d": 27,
                "\u016f": 27,
                "\u0171": 27,
                "\u0173": 27,
                "v": 20,
                ":": 33,
                ",": 44,
                ";": 33,
                "p": 27,
                "q": 33
            }
        },
        "Z": {
            "d": "13,-236r0,-21r185,0r0,22r-169,214r173,0r0,21r-200,0r0,-22r169,-214r-158,0",
            "w": 206
        },
        "[": {
            "d": "85,69r-58,0r0,-331r58,0r0,19r-35,0r0,293r35,0r0,19",
            "w": 86
        },
        "\\": {
            "d": "125,5r-20,0r-110,-267r19,0",
            "w": 119
        },
        "]": {
            "d": "1,-262r58,0r0,331r-58,0r0,-19r36,0r0,-293r-36,0r0,-19",
            "w": 86
        },
        "^": {
            "d": "37,-86r-21,0r83,-163r18,0r83,163r-20,0r-72,-140",
            "w": 216
        },
        "_": {
            "d": "180,45r-180,0r0,-18r180,0r0,18",
            "w": 180
        },
        "`": {
            "d": "36,-212r-47,-50r28,0r38,50r-19,0"
        },
        "a": {
            "d": "42,-129r-23,0v3,-44,33,-62,76,-62v33,0,68,10,68,60r0,98v-1,12,11,17,21,12r0,20v-28,6,-44,-8,-43,-31v-20,51,-129,53,-129,-17v0,-52,50,-54,99,-60v19,-2,29,-5,29,-25v0,-31,-21,-38,-48,-38v-28,0,-49,13,-50,43xm140,-102v-30,22,-106,6,-106,52v0,23,20,36,42,36v46,0,71,-34,64,-88",
            "w": 186
        },
        "b": {
            "d": "22,0r0,-257r22,0r1,107v9,-27,37,-41,64,-41v57,0,84,45,84,98v0,53,-27,98,-84,98v-31,1,-55,-16,-67,-40r0,35r-20,0xm109,-14v83,-1,82,-157,0,-158v-89,1,-89,157,0,158",
            "w": 206
        },
        "c": {
            "d": "175,-127r-22,0v-6,-28,-23,-45,-53,-45v-86,1,-87,157,0,158v28,0,51,-22,54,-53r23,0v-6,45,-35,72,-77,72v-57,0,-88,-45,-88,-98v0,-53,31,-98,88,-98v40,0,70,21,75,64",
            "w": 186
        },
        "d": {
            "d": "185,-257r0,257r-21,0v-1,-11,2,-26,-1,-35v-10,24,-39,40,-66,40v-57,0,-83,-45,-83,-98v0,-53,26,-98,83,-98v27,0,56,14,65,41r0,-107r23,0xm97,-172v-83,1,-82,157,0,158v89,-1,89,-157,0,-158",
            "w": 206
        },
        "e": {
            "d": "35,-106r120,0v-1,-34,-23,-66,-59,-66v-37,0,-57,32,-61,66xm178,-87r-143,0v0,33,18,73,61,73v33,0,51,-19,58,-47r23,0v-10,42,-34,66,-81,66v-59,0,-84,-45,-84,-98v0,-49,25,-98,84,-98v59,0,84,52,82,104",
            "w": 186
        },
        "f": {
            "d": "93,-186r0,19r-36,0r0,167r-23,0r0,-167r-32,0r0,-19r32,0v-5,-48,11,-79,64,-70r0,20v-36,-9,-46,13,-41,50r36,0",
            "w": 93,
            "k": {
                "\u2019": -6,
                "f": 6,
                "\ufb01": 6,
                "\ufb02": 6
            }
        },
        "g": {
            "d": "179,-186v-9,107,39,260,-83,260v-37,0,-74,-17,-77,-56r23,0v5,27,29,37,54,37v50,0,66,-42,59,-95v-10,23,-32,38,-59,38v-59,0,-84,-43,-84,-96v0,-51,30,-93,84,-93v28,-1,49,18,60,37r0,-32r23,0xm96,-21v79,-1,82,-151,0,-151v-43,0,-61,38,-61,77v0,37,19,74,61,74",
            "w": 200
        },
        "h": {
            "d": "21,0r0,-257r23,0r1,103v9,-22,33,-37,59,-37v98,0,61,108,68,191r-23,0v-8,-67,28,-171,-47,-172v-75,-1,-56,99,-58,172r-23,0",
            "w": 193
        },
        "i": {
            "d": "22,-221r0,-36r23,0r0,36r-23,0xm22,0r0,-186r23,0r0,186r-23,0"
        },
        "j": {
            "d": "22,-221r0,-36r23,0r0,36r-23,0xm22,23r0,-209r23,0r0,203v2,34,-16,59,-56,51r0,-19v21,5,33,-6,33,-26"
        },
        "k": {
            "d": "22,0r0,-257r22,0r0,161r103,-90r30,0r-79,69r85,117r-29,0r-73,-101r-37,30r0,71r-22,0",
            "w": 180
        },
        "l": {
            "d": "22,0r0,-257r23,0r0,257r-23,0"
        },
        "m": {
            "d": "22,0r0,-186r20,0v2,10,-3,26,2,32v16,-45,99,-52,114,-1v11,-24,35,-36,59,-36v87,0,55,114,61,191r-22,0r0,-125v0,-31,-11,-47,-44,-47v-74,0,-45,103,-51,172r-22,0r0,-126v0,-25,-10,-46,-39,-46v-76,0,-53,100,-56,172r-22,0",
            "w": 299
        },
        "n": {
            "d": "21,0r0,-186r23,0v1,10,-2,24,1,32v9,-22,33,-37,59,-37v98,0,61,108,68,191r-23,0v-8,-67,28,-171,-47,-172v-75,-1,-56,99,-58,172r-23,0",
            "w": 193
        },
        "o": {
            "d": "100,-172v-86,1,-87,157,0,158v86,-1,87,-157,0,-158xm100,-191v57,0,88,45,88,98v0,53,-31,98,-88,98v-57,0,-88,-45,-88,-98v0,-53,31,-98,88,-98",
            "w": 200
        },
        "p": {
            "d": "22,69r0,-255r20,0v1,11,-2,27,1,36v10,-26,36,-41,66,-41v57,0,84,45,84,98v0,53,-27,98,-84,98v-28,1,-53,-15,-65,-40r0,104r-22,0xm109,-14v83,-1,82,-157,0,-158v-50,0,-65,37,-65,79v0,39,17,79,65,79",
            "w": 206
        },
        "q": {
            "d": "185,-186r0,255r-23,0r0,-104v-10,27,-38,40,-65,40v-57,0,-83,-45,-83,-98v0,-53,26,-98,83,-98v28,-1,55,19,67,41r0,-36r21,0xm97,-172v-83,1,-82,157,0,158v89,-1,89,-157,0,-158",
            "w": 206
        },
        "r": {
            "d": "22,0r0,-186r20,0v1,14,-2,32,1,44v12,-30,37,-47,70,-46r0,22v-41,-2,-69,28,-69,67r0,99r-22,0",
            "w": 113,
            "k": {
                ".": 33,
                "\u2026": 33,
                "e": 6,
                "\u00e8": 6,
                "\u00e9": 6,
                "\u00ea": 6,
                "\u011b": 6,
                "\u00eb": 6,
                "\u0113": 6,
                "\u0115": 6,
                "\u0117": 6,
                "\u0119": 6,
                "-": 20,
                "\u00ad": 20,
                "o": 6,
                "\u00f2": 6,
                "\u00f3": 6,
                "\u00f4": 6,
                "\u00f5": 6,
                "\u00f6": 6,
                "\u014d": 6,
                "\u014f": 6,
                "\u0151": 6,
                "\u00f8": 6,
                "\u0153": 6,
                ",": 33,
                "q": 6,
                "c": 6,
                "\u0107": 6,
                "\u0109": 6,
                "\u010d": 6,
                "\u010b": 6,
                "\u00e7": 6,
                "d": 6,
                "\u010f": 6,
                "\u0111": 6,
                "n": -6,
                "\u0144": -6,
                "\u0148": -6,
                "\u00f1": -6,
                "\u0146": -6
            }
        },
        "s": {
            "d": "156,-131r-23,0v-1,-28,-23,-41,-49,-41v-20,0,-44,8,-44,32v15,55,123,17,122,90v0,40,-40,55,-75,55v-44,0,-72,-19,-76,-65r23,0v2,31,25,46,55,46v22,0,50,-9,50,-35v0,-58,-121,-21,-121,-90v0,-38,36,-52,69,-52v37,0,67,20,69,60",
            "w": 173
        },
        "t": {
            "d": "58,-242r0,56r37,0r0,19r-37,0r0,126v-4,23,16,27,37,23r0,19v-36,3,-60,0,-60,-41r0,-127r-32,0r0,-19r32,0r0,-56r23,0",
            "w": 106
        },
        "u": {
            "d": "172,-186r0,186r-21,0v-1,-10,2,-25,-1,-33v-24,60,-129,49,-129,-32r0,-121r23,0v8,67,-28,174,50,172v72,-3,52,-100,55,-172r23,0",
            "w": 193
        },
        "v": {
            "d": "72,0r-71,-186r25,0r59,163r58,-163r23,0r-70,186r-24,0",
            "w": 166
        },
        "w": {
            "d": "63,0r-60,-186r24,0r48,159r46,-159r25,0r46,159r48,-159r24,0r-60,186r-25,0r-46,-156r-46,156r-24,0",
            "w": 266,
            "k": {
                ".": 20,
                "\u2026": 20,
                ",": 20
            }
        },
        "x": {
            "d": "0,0r72,-96r-66,-90r28,0r53,71r52,-71r28,0r-67,89r73,97r-29,0r-58,-78r-58,78r-28,0",
            "w": 173
        },
        "y": {
            "d": "75,-1r-74,-185r24,0r61,159r57,-159r23,0r-81,214v-13,37,-29,45,-66,39r0,-19v37,12,47,-21,56,-49",
            "w": 166
        },
        "z": {
            "d": "156,-170r-123,151r128,0r0,19r-156,0r0,-18r122,-149r-113,0r0,-19r142,0r0,16",
            "w": 166
        },
        "{": {
            "d": "105,69v-56,11,-50,-48,-49,-99v0,-29,-5,-57,-26,-57r0,-19v62,-6,-21,-170,75,-156r0,19v-37,-4,-27,51,-27,87v0,41,-21,54,-25,60v5,3,25,18,25,58v0,34,-12,91,27,88r0,19",
            "w": 119
        },
        "|": {
            "d": "31,77r0,-360r19,0r0,360r-19,0",
            "w": 79
        },
        "}": {
            "d": "14,-262v55,-11,51,46,50,98v0,29,5,57,26,57r0,20v-62,6,21,170,-76,156r0,-19v38,5,27,-52,27,-88v0,-41,22,-53,26,-59v-5,-3,-26,-19,-26,-59v0,-34,12,-91,-27,-87r0,-19",
            "w": 119
        },
        "~": {
            "d": "70,-112v24,-1,56,23,77,23v14,0,23,-11,31,-24r13,13v-10,15,-23,31,-45,31v-37,0,-90,-50,-108,1r-13,-13v8,-15,21,-31,45,-31",
            "w": 216
        },
        "\u00a0": {
            "w": 100
        },
        "\u00c0": {
            "d": "114,-233r-52,132r101,0xm-3,0r104,-257r28,0r100,257r-26,0r-31,-80r-117,0r-31,80r-27,0xm111,-280r-48,-51r28,0r38,51r-18,0",
            "w": 226,
            "k": {
                "y": 6,
                "\u00fd": 6,
                "\u0177": 6,
                "\u00ff": 6,
                "V": 18,
                "\u2019": 31,
                "v": 6,
                "T": 24,
                "\u0164": 24,
                "\u0162": 24,
                "\u021a": 24,
                "W": 2,
                "\u0174": 2,
                "Y": 27,
                "\u00dd": 27,
                "\u0176": 27,
                "\u0178": 27,
                "w": 6,
                "\u0175": 6
            }
        },
        "\u00c1": {
            "d": "114,-233r-52,132r101,0xm-3,0r104,-257r28,0r100,257r-26,0r-31,-80r-117,0r-31,80r-27,0xm167,-332r-47,51r-19,0r38,-51r28,0",
            "w": 226,
            "k": {
                "y": 6,
                "\u00fd": 6,
                "\u0177": 6,
                "\u00ff": 6,
                "V": 18,
                "\u2019": 31,
                "v": 6,
                "T": 24,
                "\u0164": 24,
                "\u0162": 24,
                "\u021a": 24,
                "W": 2,
                "\u0174": 2,
                "Y": 27,
                "\u00dd": 27,
                "\u0176": 27,
                "\u0178": 27,
                "w": 6,
                "\u0175": 6
            }
        },
        "\u00c2": {
            "d": "114,-233r-52,132r101,0xm-3,0r104,-257r28,0r100,257r-26,0r-31,-80r-117,0r-31,80r-27,0xm126,-331r41,51r-23,0r-31,-37r-32,37r-21,0r42,-51r24,0",
            "w": 226,
            "k": {
                "y": 6,
                "\u00fd": 6,
                "\u0177": 6,
                "\u00ff": 6,
                "V": 18,
                "\u2019": 31,
                "v": 6,
                "T": 24,
                "\u0164": 24,
                "\u0162": 24,
                "\u021a": 24,
                "W": 2,
                "\u0174": 2,
                "Y": 27,
                "\u00dd": 27,
                "\u0176": 27,
                "\u0178": 27,
                "w": 6,
                "\u0175": 6
            }
        },
        "\u00c3": {
            "d": "114,-233r-52,132r101,0xm-3,0r104,-257r28,0r100,257r-26,0r-31,-80r-117,0r-31,80r-27,0xm157,-324r14,0v-3,16,-13,34,-32,34v-28,-1,-57,-36,-67,2r-14,0v2,-17,13,-35,32,-35v30,0,55,34,67,-1",
            "w": 226,
            "k": {
                "y": 6,
                "\u00fd": 6,
                "\u0177": 6,
                "\u00ff": 6,
                "V": 18,
                "\u2019": 31,
                "v": 6,
                "T": 24,
                "\u0164": 24,
                "\u0162": 24,
                "\u021a": 24,
                "W": 2,
                "\u0174": 2,
                "Y": 27,
                "\u00dd": 27,
                "\u0176": 27,
                "\u0178": 27,
                "w": 6,
                "\u0175": 6
            }
        },
        "\u00c4": {
            "d": "114,-233r-52,132r101,0xm-3,0r104,-257r28,0r100,257r-26,0r-31,-80r-117,0r-31,80r-27,0xm94,-288r-24,0r0,-36r24,0r0,36xm158,-288r-24,0r0,-36r24,0r0,36",
            "w": 226,
            "k": {
                "y": 6,
                "\u00fd": 6,
                "\u0177": 6,
                "\u00ff": 6,
                "V": 18,
                "\u2019": 31,
                "v": 6,
                "T": 24,
                "\u0164": 24,
                "\u0162": 24,
                "\u021a": 24,
                "W": 2,
                "\u0174": 2,
                "Y": 27,
                "\u00dd": 27,
                "\u0176": 27,
                "\u0178": 27,
                "w": 6,
                "\u0175": 6
            }
        },
        "\u0100": {
            "d": "114,-233r-52,132r101,0xm-3,0r104,-257r28,0r100,257r-26,0r-31,-80r-117,0r-31,80r-27,0xm173,-298r-119,0r0,-16r119,0r0,16",
            "w": 226,
            "k": {
                "y": 6,
                "\u00fd": 6,
                "\u0177": 6,
                "\u00ff": 6,
                "V": 18,
                "\u2019": 31,
                "v": 6,
                "T": 24,
                "\u0164": 24,
                "\u0162": 24,
                "\u021a": 24,
                "W": 2,
                "\u0174": 2,
                "Y": 27,
                "\u00dd": 27,
                "\u0176": 27,
                "\u0178": 27,
                "w": 6,
                "\u0175": 6
            }
        },
        "\u0102": {
            "d": "114,-233r-52,132r101,0xm-3,0r104,-257r28,0r100,257r-26,0r-31,-80r-117,0r-31,80r-27,0xm63,-329r14,0v3,39,71,38,75,0r14,0v-4,28,-23,46,-52,46v-29,0,-48,-17,-51,-46",
            "w": 226,
            "k": {
                "y": 6,
                "\u00fd": 6,
                "\u0177": 6,
                "\u00ff": 6,
                "V": 18,
                "\u2019": 31,
                "v": 6,
                "T": 24,
                "\u0164": 24,
                "\u0162": 24,
                "\u021a": 24,
                "W": 2,
                "\u0174": 2,
                "Y": 27,
                "\u00dd": 27,
                "\u0176": 27,
                "\u0178": 27,
                "w": 6,
                "\u0175": 6
            }
        },
        "\u00c5": {
            "d": "114,-233r-52,132r101,0xm-3,0r104,-257r28,0r100,257r-26,0r-31,-80r-117,0r-31,80r-27,0xm90,-310v0,14,10,25,24,25v14,0,25,-11,25,-25v0,-14,-11,-24,-25,-24v-14,0,-24,10,-24,24xm76,-310v0,-21,17,-38,38,-38v21,0,39,17,39,38v0,21,-18,39,-39,39v-21,0,-38,-18,-38,-39",
            "w": 226,
            "k": {
                "y": 6,
                "\u00fd": 6,
                "\u0177": 6,
                "\u00ff": 6,
                "V": 18,
                "\u2019": 31,
                "v": 6,
                "T": 24,
                "\u0164": 24,
                "\u0162": 24,
                "\u021a": 24,
                "W": 2,
                "\u0174": 2,
                "Y": 27,
                "\u00dd": 27,
                "\u0176": 27,
                "\u0178": 27,
                "w": 6,
                "\u0175": 6
            }
        },
        "\u0104": {
            "d": "229,0r-12,0v-27,22,-30,31,-30,42v1,25,31,19,36,2r10,5v-11,36,-68,30,-68,-5v0,-7,1,-22,38,-44r-31,-80r-117,0r-31,80r-27,0r104,-257r28,0xm114,-233r-52,132r101,0",
            "w": 226,
            "k": {
                "y": 6,
                "\u00fd": 6,
                "\u0177": 6,
                "\u00ff": 6,
                "V": 18,
                "\u2019": 31,
                "v": 6,
                "T": 24,
                "\u0164": 24,
                "\u0162": 24,
                "\u021a": 24,
                "W": 2,
                "\u0174": 2,
                "Y": 27,
                "\u00dd": 27,
                "\u0176": 27,
                "\u0178": 27,
                "w": 6,
                "\u0175": 6
            }
        },
        "\u00c6": {
            "d": "78,-102r82,0r0,-134r-14,0xm185,-122r0,101r133,0r0,21r-158,0r0,-81r-93,0r-42,81r-28,0r135,-257r185,0r0,21r-132,0r0,93r124,0r0,21r-124,0",
            "w": 326
        },
        "\u0106": {
            "d": "238,-179r-24,0v-9,-40,-42,-63,-79,-63v-132,1,-130,226,0,227v48,0,77,-37,82,-83r25,0v-7,63,-47,103,-107,103v-81,0,-121,-63,-121,-134v0,-71,40,-133,121,-133v49,0,96,29,103,83xm189,-332r-47,51r-19,0r38,-51r28,0",
            "w": 253
        },
        "\u0108": {
            "d": "238,-179r-24,0v-9,-40,-42,-63,-79,-63v-132,1,-130,226,0,227v48,0,77,-37,82,-83r25,0v-7,63,-47,103,-107,103v-81,0,-121,-63,-121,-134v0,-71,40,-133,121,-133v49,0,96,29,103,83xm147,-331r41,51r-23,0r-31,-37r-32,37r-21,0r41,-51r25,0",
            "w": 253
        },
        "\u010c": {
            "d": "238,-179r-24,0v-9,-40,-42,-63,-79,-63v-132,1,-130,226,0,227v48,0,77,-37,82,-83r25,0v-7,63,-47,103,-107,103v-81,0,-121,-63,-121,-134v0,-71,40,-133,121,-133v49,0,96,29,103,83xm120,-281r-41,-51r24,0r31,37r31,-37r21,0r-41,51r-25,0",
            "w": 253
        },
        "\u010a": {
            "d": "238,-179r-24,0v-9,-40,-42,-63,-79,-63v-132,1,-130,226,0,227v48,0,77,-37,82,-83r25,0v-7,63,-47,103,-107,103v-81,0,-121,-63,-121,-134v0,-71,40,-133,121,-133v49,0,96,29,103,83xm146,-288r-25,0r0,-36r25,0r0,36",
            "w": 253
        },
        "\u00c7": {
            "d": "122,5v-72,-6,-108,-68,-108,-134v0,-71,40,-133,121,-133v49,0,96,29,103,83r-24,0v-9,-40,-42,-63,-79,-63v-132,1,-130,226,0,227v48,0,77,-37,82,-83r25,0v-7,63,-47,103,-107,103r-12,14v22,-3,39,-1,42,23v-2,35,-47,37,-74,24r5,-12v13,5,48,12,48,-10v0,-24,-34,-4,-40,-17",
            "w": 253
        },
        "\u010e": {
            "d": "26,0r0,-257r89,0v78,2,118,43,118,128v0,85,-40,129,-118,129r-89,0xm50,-236r0,215v97,5,158,-9,158,-108v0,-99,-61,-113,-158,-107xm97,-281r-41,-51r24,0r31,37r31,-37r21,0r-41,51r-25,0",
            "w": 246
        },
        "\u0110": {
            "d": "26,-141r0,-116r89,0v78,2,118,43,118,128v0,85,-40,129,-118,129r-89,0r0,-125r-26,0r0,-16r26,0xm50,-236r0,95r85,0r0,16r-85,0r0,104v97,5,158,-9,158,-108v0,-99,-61,-113,-158,-107",
            "w": 246
        },
        "\u00d0": {
            "d": "26,-141r0,-116r89,0v78,2,118,43,118,128v0,85,-40,129,-118,129r-89,0r0,-125r-26,0r0,-16r26,0xm50,-236r0,95r85,0r0,16r-85,0r0,104v97,5,158,-9,158,-108v0,-99,-61,-113,-158,-107",
            "w": 246
        },
        "\u00c8": {
            "d": "26,0r0,-257r177,0r0,21r-153,0r0,93r144,0r0,21r-144,0r0,101r155,0r0,21r-179,0xm114,-280r-48,-51r28,0r38,51r-18,0",
            "w": 213
        },
        "\u00c9": {
            "d": "26,0r0,-257r177,0r0,21r-153,0r0,93r144,0r0,21r-144,0r0,101r155,0r0,21r-179,0xm167,-332r-48,51r-18,0r38,-51r28,0",
            "w": 213
        },
        "\u00ca": {
            "d": "26,0r0,-257r177,0r0,21r-153,0r0,93r144,0r0,21r-144,0r0,101r155,0r0,21r-179,0xm128,-331r41,51r-24,0r-31,-37r-31,37r-21,0r41,-51r25,0",
            "w": 213
        },
        "\u011a": {
            "d": "26,0r0,-257r177,0r0,21r-153,0r0,93r144,0r0,21r-144,0r0,101r155,0r0,21r-179,0xm101,-281r-41,-51r23,0r31,37r32,-37r21,0r-41,51r-25,0",
            "w": 213
        },
        "\u00cb": {
            "d": "26,0r0,-257r177,0r0,21r-153,0r0,93r144,0r0,21r-144,0r0,101r155,0r0,21r-179,0xm95,-288r-25,0r0,-36r25,0r0,36xm158,-288r-24,0r0,-36r24,0r0,36",
            "w": 213
        },
        "\u0112": {
            "d": "26,0r0,-257r177,0r0,21r-153,0r0,93r144,0r0,21r-144,0r0,101r155,0r0,21r-179,0xm175,-298r-119,0r0,-16r119,0r0,16",
            "w": 213
        },
        "\u0114": {
            "d": "26,0r0,-257r177,0r0,21r-153,0r0,93r144,0r0,21r-144,0r0,101r155,0r0,21r-179,0xm63,-329r14,0v3,39,71,38,75,0r14,0v-4,28,-23,46,-52,46v-29,0,-48,-17,-51,-46",
            "w": 213
        },
        "\u0116": {
            "d": "26,0r0,-257r177,0r0,21r-153,0r0,93r144,0r0,21r-144,0r0,101r155,0r0,21r-179,0xm127,-288r-24,0r0,-36r24,0r0,36",
            "w": 213
        },
        "\u0118": {
            "d": "205,0r-16,0v-27,22,-30,31,-30,42v1,25,31,19,36,2r10,5v-11,36,-68,30,-68,-5v0,-7,1,-22,38,-44r-149,0r0,-257r177,0r0,21r-153,0r0,93r144,0r0,21r-144,0r0,101r155,0r0,21",
            "w": 213
        },
        "\u011c": {
            "d": "246,-131r0,131r-18,0v-2,-15,0,-34,-4,-47v-17,37,-52,52,-89,52v-81,0,-121,-63,-121,-134v0,-71,40,-133,121,-133v54,0,97,29,107,85r-24,0v-3,-30,-34,-65,-83,-65v-132,1,-130,226,0,227v57,0,90,-40,89,-95r-88,0r0,-21r110,0xm147,-331r41,51r-23,0r-31,-37r-32,37r-21,0r41,-51r25,0",
            "w": 266
        },
        "\u011e": {
            "d": "246,-131r0,131r-18,0v-2,-15,0,-34,-4,-47v-17,37,-52,52,-89,52v-81,0,-121,-63,-121,-134v0,-71,40,-133,121,-133v54,0,97,29,107,85r-24,0v-3,-30,-34,-65,-83,-65v-132,1,-130,226,0,227v57,0,90,-40,89,-95r-88,0r0,-21r110,0xm83,-329r14,0v3,39,71,38,75,0r14,0v-4,28,-23,46,-52,46v-29,0,-48,-17,-51,-46",
            "w": 266
        },
        "\u0120": {
            "d": "246,-131r0,131r-18,0v-2,-15,0,-34,-4,-47v-17,37,-52,52,-89,52v-81,0,-121,-63,-121,-134v0,-71,40,-133,121,-133v54,0,97,29,107,85r-24,0v-3,-30,-34,-65,-83,-65v-132,1,-130,226,0,227v57,0,90,-40,89,-95r-88,0r0,-21r110,0xm148,-288r-25,0r0,-36r25,0r0,36",
            "w": 266
        },
        "\u0122": {
            "d": "246,-131r0,131r-18,0v-2,-15,0,-34,-4,-47v-17,37,-52,52,-89,52v-81,0,-121,-63,-121,-134v0,-71,40,-133,121,-133v54,0,97,29,107,85r-24,0v-3,-30,-34,-65,-83,-65v-132,1,-130,226,0,227v57,0,90,-40,89,-95r-88,0r0,-21r110,0xm119,18r31,0v2,31,-1,57,-31,55r0,-10v10,-2,13,-6,14,-12r-14,0r0,-33",
            "w": 266
        },
        "\u0124": {
            "d": "26,0r0,-257r24,0r0,112r153,0r0,-112r25,0r0,257r-25,0r0,-125r-153,0r0,125r-24,0xm140,-331r41,51r-24,0r-31,-37r-31,37r-21,0r41,-51r25,0",
            "w": 253
        },
        "\u0126": {
            "d": "26,0r0,-257r24,0r0,71r153,0r0,-71r25,0r0,257r-25,0r0,-121r-153,0r0,121r-24,0xm203,-170r-153,0r0,28r153,0r0,-28",
            "w": 253
        },
        "\u00cc": {
            "d": "28,0r0,-257r24,0r0,257r-24,0xm34,-280r-48,-51r28,0r38,51r-18,0",
            "w": 79
        },
        "\u00cd": {
            "d": "28,0r0,-257r24,0r0,257r-24,0xm94,-332r-48,51r-18,0r38,-51r28,0",
            "w": 79
        },
        "\u00ce": {
            "d": "28,0r0,-257r24,0r0,257r-24,0xm53,-331r41,51r-24,0r-31,-37r-31,37r-21,0r41,-51r25,0",
            "w": 79
        },
        "\u0128": {
            "d": "28,0r0,-257r24,0r0,257r-24,0xm83,-324r13,0v-3,16,-12,34,-31,34v-29,-1,-58,-36,-68,2r-14,0v2,-17,13,-35,32,-35v30,0,56,34,68,-1",
            "w": 79
        },
        "\u00cf": {
            "d": "28,0r0,-257r24,0r0,257r-24,0xm21,-288r-25,0r0,-36r25,0r0,36xm84,-288r-24,0r0,-36r24,0r0,36",
            "w": 79
        },
        "\u012a": {
            "d": "28,0r0,-257r24,0r0,257r-24,0xm99,-298r-118,0r0,-16r118,0r0,16",
            "w": 79
        },
        "\u0130": {
            "d": "28,0r0,-257r24,0r0,257r-24,0xm52,-288r-24,0r0,-36r24,0r0,36",
            "w": 79
        },
        "\u012e": {
            "d": "52,-257r0,257v-24,23,-26,31,-26,42v0,25,28,19,32,2r9,5v-10,35,-62,30,-61,-5v0,-7,0,-22,34,-44r-12,0r0,-257r24,0",
            "w": 79
        },
        "\u0134": {
            "d": "130,-82r0,-175r24,0r0,185v0,52,-20,77,-75,77v-59,0,-71,-42,-71,-87r24,0v1,22,-2,67,49,67v39,0,49,-20,49,-67xm153,-331r41,51r-23,0r-31,-37r-32,37r-21,0r41,-51r25,0",
            "w": 180
        },
        "\u0136": {
            "d": "26,0r0,-257r24,0r0,138r150,-138r33,0r-115,106r120,151r-31,0r-107,-134r-50,46r0,88r-24,0xm105,18r31,0v2,31,-1,57,-31,55r0,-10v10,-2,13,-6,14,-12r-14,0r0,-33",
            "w": 233
        },
        "\u0139": {
            "d": "26,0r0,-257r24,0r0,236r144,0r0,21r-168,0xm94,-332r-47,51r-19,0r38,-51r28,0",
            "w": 193,
            "k": {
                "y": 13,
                "\u00fd": 13,
                "\u0177": 13,
                "\u00ff": 13,
                "V": 33,
                "\u2019": 35,
                "T": 33,
                "\u0164": 33,
                "\u0162": 33,
                "\u021a": 33,
                "W": 20,
                "\u0174": 20,
                "Y": 40,
                "\u00dd": 40,
                "\u0176": 40,
                "\u0178": 40
            }
        },
        "\u013d": {
            "d": "26,0r0,-257r24,0r0,236r144,0r0,21r-168,0xm136,-257r-31,51r-17,0r20,-51r28,0",
            "w": 193,
            "k": {
                "y": 13,
                "\u00fd": 13,
                "\u0177": 13,
                "\u00ff": 13,
                "V": 33,
                "\u2019": 35,
                "T": 33,
                "\u0164": 33,
                "\u0162": 33,
                "\u021a": 33,
                "W": 20,
                "\u0174": 20,
                "Y": 40,
                "\u00dd": 40,
                "\u0176": 40,
                "\u0178": 40
            }
        },
        "\u013b": {
            "d": "26,0r0,-257r24,0r0,236r144,0r0,21r-168,0xm90,18r31,0v2,31,-1,57,-31,55r0,-10v10,-2,13,-6,14,-12r-14,0r0,-33",
            "w": 193,
            "k": {
                "y": 13,
                "\u00fd": 13,
                "\u0177": 13,
                "\u00ff": 13,
                "V": 33,
                "\u2019": 35,
                "T": 33,
                "\u0164": 33,
                "\u0162": 33,
                "\u021a": 33,
                "W": 20,
                "\u0174": 20,
                "Y": 40,
                "\u00dd": 40,
                "\u0176": 40,
                "\u0178": 40
            }
        },
        "\u0141": {
            "d": "26,-110r0,-147r24,0r0,130r88,-61r0,21r-88,60r0,86r144,0r0,21r-168,0r0,-90r-30,20r0,-20",
            "w": 193
        },
        "\u013f": {
            "d": "26,0r0,-257r24,0r0,236r144,0r0,21r-168,0xm128,-149r-24,0r0,-37r24,0r0,37",
            "w": 193
        },
        "\u0143": {
            "d": "26,0r0,-257r27,0r150,217r0,-217r25,0r0,257r-27,0r-151,-217r0,217r-24,0xm179,-332r-48,51r-18,0r38,-51r28,0",
            "w": 253
        },
        "\u0147": {
            "d": "26,0r0,-257r27,0r150,217r0,-217r25,0r0,257r-27,0r-151,-217r0,217r-24,0xm112,-281r-41,-51r23,0r31,37r32,-37r21,0r-41,51r-25,0",
            "w": 253
        },
        "\u00d1": {
            "d": "26,0r0,-257r27,0r150,217r0,-217r25,0r0,257r-27,0r-151,-217r0,217r-24,0xm172,-324r14,0v-3,16,-13,34,-32,34v-28,-1,-57,-36,-67,2r-14,0v2,-17,13,-35,32,-35v30,0,55,34,67,-1",
            "w": 253
        },
        "\u0145": {
            "d": "26,0r0,-257r27,0r150,217r0,-217r25,0r0,257r-27,0r-151,-217r0,217r-24,0xm109,18r31,0v2,31,-1,57,-31,55r0,-10v10,-2,13,-6,14,-12r-14,0r0,-33",
            "w": 253
        },
        "\u00d2": {
            "d": "134,-242v-132,1,-130,226,0,227v130,-1,130,-226,0,-227xm12,-129v0,-71,41,-133,122,-133v81,0,121,62,121,133v0,71,-40,134,-121,134v-81,0,-122,-63,-122,-134xm134,-280r-48,-51r28,0r38,51r-18,0",
            "w": 266
        },
        "\u00d3": {
            "d": "134,-242v-132,1,-130,226,0,227v130,-1,130,-226,0,-227xm12,-129v0,-71,41,-133,122,-133v81,0,121,62,121,133v0,71,-40,134,-121,134v-81,0,-122,-63,-122,-134xm190,-332r-47,51r-19,0r38,-51r28,0",
            "w": 266
        },
        "\u00d4": {
            "d": "134,-242v-132,1,-130,226,0,227v130,-1,130,-226,0,-227xm12,-129v0,-71,41,-133,122,-133v81,0,121,62,121,133v0,71,-40,134,-121,134v-81,0,-122,-63,-122,-134xm147,-331r41,51r-24,0r-31,-37r-31,37r-21,0r41,-51r25,0",
            "w": 266
        },
        "\u00d5": {
            "d": "134,-242v-132,1,-130,226,0,227v130,-1,130,-226,0,-227xm12,-129v0,-71,41,-133,122,-133v81,0,121,62,121,133v0,71,-40,134,-121,134v-81,0,-122,-63,-122,-134xm177,-324r13,0v-3,16,-12,34,-31,34v-29,-1,-58,-36,-68,2r-14,0v2,-17,13,-35,32,-35v30,0,56,34,68,-1",
            "w": 266
        },
        "\u00d6": {
            "d": "134,-242v-132,1,-130,226,0,227v130,-1,130,-226,0,-227xm12,-129v0,-71,41,-133,122,-133v81,0,121,62,121,133v0,71,-40,134,-121,134v-81,0,-122,-63,-122,-134xm113,-288r-24,0r0,-36r24,0r0,36xm177,-288r-25,0r0,-36r25,0r0,36",
            "w": 266
        },
        "\u014c": {
            "d": "134,-242v-132,1,-130,226,0,227v130,-1,130,-226,0,-227xm12,-129v0,-71,41,-133,122,-133v81,0,121,62,121,133v0,71,-40,134,-121,134v-81,0,-122,-63,-122,-134xm193,-298r-118,0r0,-16r118,0r0,16",
            "w": 266
        },
        "\u014e": {
            "d": "134,-242v-132,1,-130,226,0,227v130,-1,130,-226,0,-227xm12,-129v0,-71,41,-133,122,-133v81,0,121,62,121,133v0,71,-40,134,-121,134v-81,0,-122,-63,-122,-134xm82,-329r14,0v3,38,72,39,76,0r14,0v-4,28,-23,46,-52,46v-29,0,-49,-17,-52,-46",
            "w": 266
        },
        "\u0150": {
            "d": "134,-242v-132,1,-130,226,0,227v130,-1,130,-226,0,-227xm12,-129v0,-71,41,-133,122,-133v81,0,121,62,121,133v0,71,-40,134,-121,134v-81,0,-122,-63,-122,-134xm169,-281r-18,0r36,-51r28,0xm113,-281r-18,0r36,-51r27,0",
            "w": 266
        },
        "\u00d8": {
            "d": "242,-259r9,8r-26,30v61,78,28,226,-91,226v-36,0,-64,-12,-84,-32r-27,31r-10,-9r29,-31v-61,-80,-28,-226,92,-226v36,0,62,11,82,31xm58,-54r143,-159v-15,-17,-37,-29,-67,-29v-98,0,-119,119,-76,188xm209,-203r-143,159v16,18,38,29,68,29v97,-1,118,-120,75,-188",
            "w": 266
        },
        "\u0152": {
            "d": "229,-236r0,93r133,0r0,21r-133,0r0,101r148,0r0,21r-172,0r0,-25v-17,20,-45,30,-70,30v-76,0,-122,-62,-122,-134v0,-100,114,-175,192,-107r0,-21r170,0r0,21r-146,0xm135,-15v30,0,70,-15,70,-49r0,-119v5,-46,-39,-59,-70,-59v-63,0,-97,53,-97,113v0,60,34,114,97,114",
            "w": 386
        },
        "\u0154": {
            "d": "50,-236r0,101v63,-2,144,15,147,-50v3,-66,-85,-49,-147,-51xm202,0v-16,-45,6,-114,-59,-114r-93,0r0,114r-24,0r0,-257v85,3,195,-22,196,67v1,34,-19,57,-50,66v62,5,34,81,57,124r-27,0xm168,-332r-47,51r-18,0r37,-51r28,0",
            "w": 240,
            "k": {
                "y": -9,
                "\u00fd": -9,
                "\u0177": -9,
                "\u00ff": -9,
                "V": -2,
                "T": -2,
                "\u0164": -2,
                "\u0162": -2,
                "\u021a": -2,
                "W": -2,
                "\u0174": -2,
                "Y": 5,
                "\u00dd": 5,
                "\u0176": 5,
                "\u0178": 5
            }
        },
        "\u0158": {
            "d": "50,-236r0,101v63,-2,144,15,147,-50v3,-66,-85,-49,-147,-51xm202,0v-16,-45,6,-114,-59,-114r-93,0r0,114r-24,0r0,-257v85,3,195,-22,196,67v1,34,-19,57,-50,66v62,5,34,81,57,124r-27,0xm99,-281r-41,-51r23,0r31,37r32,-37r21,0r-41,51r-25,0",
            "w": 240,
            "k": {
                "y": -9,
                "\u00fd": -9,
                "\u0177": -9,
                "\u00ff": -9,
                "V": -2,
                "T": -2,
                "\u0164": -2,
                "\u0162": -2,
                "\u021a": -2,
                "W": -2,
                "\u0174": -2,
                "Y": 5,
                "\u00dd": 5,
                "\u0176": 5,
                "\u0178": 5
            }
        },
        "\u0156": {
            "d": "50,-236r0,101v63,-2,144,15,147,-50v3,-66,-85,-49,-147,-51xm202,0v-16,-45,6,-114,-59,-114r-93,0r0,114r-24,0r0,-257v85,3,195,-22,196,67v1,34,-19,57,-50,66v62,5,34,81,57,124r-27,0xm106,18r31,0v2,31,-1,57,-31,55r0,-10v10,-2,13,-6,14,-12r-14,0r0,-33",
            "w": 240,
            "k": {
                "y": -9,
                "\u00fd": -9,
                "\u0177": -9,
                "\u00ff": -9,
                "V": -2,
                "T": -2,
                "\u0164": -2,
                "\u0162": -2,
                "\u021a": -2,
                "W": -2,
                "\u0174": -2,
                "Y": 5,
                "\u00dd": 5,
                "\u0176": 5,
                "\u0178": 5
            }
        },
        "\u015a": {
            "d": "13,-85r24,0v-1,53,37,70,84,70v27,0,68,-16,68,-53v0,-83,-167,-24,-168,-122v0,-25,17,-72,89,-72v51,0,95,26,95,79r-25,0v2,-72,-134,-84,-134,-7v0,47,64,42,101,54v35,12,67,26,67,68v0,18,-7,73,-98,73v-61,0,-106,-27,-103,-90xm166,-332r-48,51r-18,0r38,-51r28,0",
            "w": 226
        },
        "\u015c": {
            "d": "13,-85r24,0v-1,53,37,70,84,70v27,0,68,-16,68,-53v0,-83,-167,-24,-168,-122v0,-25,17,-72,89,-72v51,0,95,26,95,79r-25,0v2,-72,-134,-84,-134,-7v0,47,64,42,101,54v35,12,67,26,67,68v0,18,-7,73,-98,73v-61,0,-106,-27,-103,-90xm127,-331r41,51r-24,0r-31,-37r-31,37r-21,0r41,-51r25,0",
            "w": 226
        },
        "\u0160": {
            "d": "13,-85r24,0v-1,53,37,70,84,70v27,0,68,-16,68,-53v0,-83,-167,-24,-168,-122v0,-25,17,-72,89,-72v51,0,95,26,95,79r-25,0v2,-72,-134,-84,-134,-7v0,47,64,42,101,54v35,12,67,26,67,68v0,18,-7,73,-98,73v-61,0,-106,-27,-103,-90xm101,-281r-41,-51r24,0r30,37r32,-37r21,0r-41,51r-25,0",
            "w": 226
        },
        "\u015e": {
            "d": "13,-85r24,0v-1,53,37,70,84,70v27,0,68,-16,68,-53v0,-83,-167,-24,-168,-122v0,-25,17,-72,89,-72v51,0,95,26,95,79r-25,0v2,-72,-134,-84,-134,-7v0,47,64,42,101,54v35,12,67,26,67,68v0,15,-5,56,-60,69v-10,3,-22,4,-37,4r-12,14v22,-3,39,-1,42,23v-2,35,-47,37,-74,24r5,-12v13,5,48,12,48,-10v0,-24,-34,-4,-40,-17r18,-22v-56,-3,-93,-31,-91,-90",
            "w": 226
        },
        "\u0218": {
            "d": "13,-85r24,0v-1,53,37,70,84,70v27,0,68,-16,68,-53v0,-83,-167,-24,-168,-122v0,-25,17,-72,89,-72v51,0,95,26,95,79r-25,0v2,-72,-134,-84,-134,-7v0,47,64,42,101,54v35,12,67,26,67,68v0,18,-7,73,-98,73v-61,0,-106,-27,-103,-90xm99,18r31,0v2,31,-1,57,-31,55r0,-10v10,-2,13,-6,14,-12r-14,0r0,-33",
            "w": 226
        },
        "\u0164": {
            "d": "-2,-236r0,-21r204,0r0,21r-90,0r0,236r-24,0r0,-236r-90,0xm88,-281r-41,-51r24,0r31,37r31,-37r21,0r-41,51r-25,0",
            "w": 200,
            "k": {
                "A": 24,
                "\u00c0": 24,
                "\u00c1": 24,
                "\u00c2": 24,
                "\u00c3": 24,
                "\u00c4": 24,
                "\u0100": 24,
                "\u0102": 24,
                "\u00c5": 24,
                "\u0104": 24,
                "\u00c6": 24,
                ".": 40,
                "\u2026": 40,
                "a": 40,
                "\u00e0": 40,
                "\u00e1": 40,
                "\u00e2": 40,
                "\u00e3": 40,
                "\u00e4": 40,
                "\u0101": 40,
                "\u0103": 40,
                "\u00e5": 40,
                "\u0105": 40,
                "\u00e6": 40,
                "e": 40,
                "\u00e8": 40,
                "\u00e9": 40,
                "\u00ea": 40,
                "\u011b": 40,
                "\u00eb": 40,
                "\u0113": 40,
                "\u0115": 40,
                "\u0117": 40,
                "\u0119": 40,
                "-": 46,
                "\u00ad": 46,
                "i": -9,
                "\u0131": -9,
                "\u00ec": -9,
                "\u00ed": -9,
                "\u00ee": -9,
                "\u0129": -9,
                "\u00ef": -9,
                "\u012b": -9,
                "\u012f": -9,
                "\u0133": -9,
                "o": 40,
                "\u00f2": 40,
                "\u00f3": 40,
                "\u00f4": 40,
                "\u00f5": 40,
                "\u00f6": 40,
                "\u014d": 40,
                "\u014f": 40,
                "\u0151": 40,
                "\u00f8": 40,
                "\u0153": 40,
                "r": 33,
                "\u0155": 33,
                "\u0159": 33,
                "\u0157": 33,
                "u": 33,
                "\u00f9": 33,
                "\u00fa": 33,
                "\u00fb": 33,
                "\u0169": 33,
                "\u00fc": 33,
                "\u016b": 33,
                "\u016d": 33,
                "\u016f": 33,
                "\u0171": 33,
                "\u0173": 33,
                "y": 40,
                "\u00fd": 40,
                "\u0177": 40,
                "\u00ff": 40,
                "s": 40,
                "\u015b": 40,
                "\u015d": 40,
                "\u0161": 40,
                "\u015f": 40,
                "\u0219": 40,
                ":": 40,
                ",": 40,
                ";": 40,
                "w": 40,
                "\u0175": 40,
                "c": 40,
                "\u0107": 40,
                "\u0109": 40,
                "\u010d": 40,
                "\u010b": 40,
                "\u00e7": 40
            }
        },
        "\u0162": {
            "d": "-2,-236r0,-21r204,0r0,21r-90,0r0,236r-24,0r0,-236r-90,0xm85,18r31,0v2,31,-1,57,-31,55r0,-10v10,-2,13,-6,14,-12r-14,0r0,-33",
            "w": 200,
            "k": {
                "A": 24,
                "\u00c0": 24,
                "\u00c1": 24,
                "\u00c2": 24,
                "\u00c3": 24,
                "\u00c4": 24,
                "\u0100": 24,
                "\u0102": 24,
                "\u00c5": 24,
                "\u0104": 24,
                "\u00c6": 24,
                ".": 40,
                "\u2026": 40,
                "a": 40,
                "\u00e0": 40,
                "\u00e1": 40,
                "\u00e2": 40,
                "\u00e3": 40,
                "\u00e4": 40,
                "\u0101": 40,
                "\u0103": 40,
                "\u00e5": 40,
                "\u0105": 40,
                "\u00e6": 40,
                "e": 40,
                "\u00e8": 40,
                "\u00e9": 40,
                "\u00ea": 40,
                "\u011b": 40,
                "\u00eb": 40,
                "\u0113": 40,
                "\u0115": 40,
                "\u0117": 40,
                "\u0119": 40,
                "-": 46,
                "\u00ad": 46,
                "i": -9,
                "\u0131": -9,
                "\u00ec": -9,
                "\u00ed": -9,
                "\u00ee": -9,
                "\u0129": -9,
                "\u00ef": -9,
                "\u012b": -9,
                "\u012f": -9,
                "\u0133": -9,
                "o": 40,
                "\u00f2": 40,
                "\u00f3": 40,
                "\u00f4": 40,
                "\u00f5": 40,
                "\u00f6": 40,
                "\u014d": 40,
                "\u014f": 40,
                "\u0151": 40,
                "\u00f8": 40,
                "\u0153": 40,
                "r": 33,
                "\u0155": 33,
                "\u0159": 33,
                "\u0157": 33,
                "u": 33,
                "\u00f9": 33,
                "\u00fa": 33,
                "\u00fb": 33,
                "\u0169": 33,
                "\u00fc": 33,
                "\u016b": 33,
                "\u016d": 33,
                "\u016f": 33,
                "\u0171": 33,
                "\u0173": 33,
                "y": 40,
                "\u00fd": 40,
                "\u0177": 40,
                "\u00ff": 40,
                "s": 40,
                "\u015b": 40,
                "\u015d": 40,
                "\u0161": 40,
                "\u015f": 40,
                "\u0219": 40,
                ":": 40,
                ",": 40,
                ";": 40,
                "w": 40,
                "\u0175": 40,
                "c": 40,
                "\u0107": 40,
                "\u0109": 40,
                "\u010d": 40,
                "\u010b": 40,
                "\u00e7": 40
            }
        },
        "\u021a": {
            "d": "-2,-236r0,-21r204,0r0,21r-90,0r0,236r-24,0r0,-236r-90,0xm85,18r31,0v2,31,-1,57,-31,55r0,-10v10,-2,13,-6,14,-12r-14,0r0,-33",
            "w": 200,
            "k": {
                "A": 24,
                "\u00c0": 24,
                "\u00c1": 24,
                "\u00c2": 24,
                "\u00c3": 24,
                "\u00c4": 24,
                "\u0100": 24,
                "\u0102": 24,
                "\u00c5": 24,
                "\u0104": 24,
                "\u00c6": 24,
                ".": 40,
                "\u2026": 40,
                "a": 40,
                "\u00e0": 40,
                "\u00e1": 40,
                "\u00e2": 40,
                "\u00e3": 40,
                "\u00e4": 40,
                "\u0101": 40,
                "\u0103": 40,
                "\u00e5": 40,
                "\u0105": 40,
                "\u00e6": 40,
                "e": 40,
                "\u00e8": 40,
                "\u00e9": 40,
                "\u00ea": 40,
                "\u011b": 40,
                "\u00eb": 40,
                "\u0113": 40,
                "\u0115": 40,
                "\u0117": 40,
                "\u0119": 40,
                "-": 46,
                "\u00ad": 46,
                "i": -9,
                "\u0131": -9,
                "\u00ec": -9,
                "\u00ed": -9,
                "\u00ee": -9,
                "\u0129": -9,
                "\u00ef": -9,
                "\u012b": -9,
                "\u012f": -9,
                "\u0133": -9,
                "o": 40,
                "\u00f2": 40,
                "\u00f3": 40,
                "\u00f4": 40,
                "\u00f5": 40,
                "\u00f6": 40,
                "\u014d": 40,
                "\u014f": 40,
                "\u0151": 40,
                "\u00f8": 40,
                "\u0153": 40,
                "r": 33,
                "\u0155": 33,
                "\u0159": 33,
                "\u0157": 33,
                "u": 33,
                "\u00f9": 33,
                "\u00fa": 33,
                "\u00fb": 33,
                "\u0169": 33,
                "\u00fc": 33,
                "\u016b": 33,
                "\u016d": 33,
                "\u016f": 33,
                "\u0171": 33,
                "\u0173": 33,
                "y": 40,
                "\u00fd": 40,
                "\u0177": 40,
                "\u00ff": 40,
                "s": 40,
                "\u015b": 40,
                "\u015d": 40,
                "\u0161": 40,
                "\u015f": 40,
                "\u0219": 40,
                ":": 40,
                ",": 40,
                ";": 40,
                "w": 40,
                "\u0175": 40,
                "c": 40,
                "\u0107": 40,
                "\u0109": 40,
                "\u010d": 40,
                "\u010b": 40,
                "\u00e7": 40
            }
        },
        "\u0166": {
            "d": "-2,-236r0,-21r204,0r0,21r-90,0r0,61r60,0r0,16r-60,0r0,159r-24,0r0,-159r-59,0r0,-16r59,0r0,-61r-90,0",
            "w": 200
        },
        "\u00de": {
            "d": "50,-194r0,105v63,-2,142,16,142,-52v0,-68,-79,-51,-142,-53xm26,0r0,-257r24,0r0,42r90,0v46,0,76,28,76,74v0,46,-30,73,-76,73r-90,0r0,68r-24,0",
            "w": 226
        },
        "\u00d9": {
            "d": "123,5v-136,0,-93,-142,-100,-262r25,0r0,159v0,59,27,83,75,83v48,0,76,-24,76,-83r0,-159r24,0v-7,120,37,262,-100,262xm125,-280r-48,-51r28,0r38,51r-18,0",
            "w": 246
        },
        "\u00da": {
            "d": "123,5v-136,0,-93,-142,-100,-262r25,0r0,159v0,59,27,83,75,83v48,0,76,-24,76,-83r0,-159r24,0v-7,120,37,262,-100,262xm179,-332r-48,51r-18,0r38,-51r28,0",
            "w": 246
        },
        "\u00db": {
            "d": "123,5v-136,0,-93,-142,-100,-262r25,0r0,159v0,59,27,83,75,83v48,0,76,-24,76,-83r0,-159r24,0v-7,120,37,262,-100,262xm136,-331r41,51r-24,0r-31,-37r-31,37r-21,0r41,-51r25,0",
            "w": 246
        },
        "\u0168": {
            "d": "123,5v-136,0,-93,-142,-100,-262r25,0r0,159v0,59,27,83,75,83v48,0,76,-24,76,-83r0,-159r24,0v-7,120,37,262,-100,262xm166,-324r14,0v-3,16,-13,34,-32,34v-28,-1,-57,-36,-67,2r-14,0v2,-17,13,-35,32,-35v30,0,55,34,67,-1",
            "w": 246
        },
        "\u00dc": {
            "d": "123,5v-136,0,-93,-142,-100,-262r25,0r0,159v0,59,27,83,75,83v48,0,76,-24,76,-83r0,-159r24,0v-7,120,37,262,-100,262xm104,-288r-25,0r0,-36r25,0r0,36xm167,-288r-24,0r0,-36r24,0r0,36",
            "w": 246
        },
        "\u016a": {
            "d": "123,5v-136,0,-93,-142,-100,-262r25,0r0,159v0,59,27,83,75,83v48,0,76,-24,76,-83r0,-159r24,0v-7,120,37,262,-100,262xm182,-298r-119,0r0,-16r119,0r0,16",
            "w": 246
        },
        "\u016c": {
            "d": "123,5v-136,0,-93,-142,-100,-262r25,0r0,159v0,59,27,83,75,83v48,0,76,-24,76,-83r0,-159r24,0v-7,120,37,262,-100,262xm71,-329r14,0v3,39,71,38,75,0r14,0v-4,28,-23,46,-52,46v-29,0,-48,-17,-51,-46",
            "w": 246
        },
        "\u016e": {
            "d": "123,5v-136,0,-93,-142,-100,-262r25,0r0,159v0,59,27,83,75,83v48,0,76,-24,76,-83r0,-159r24,0v-7,120,37,262,-100,262xm98,-310v0,14,10,25,24,25v14,0,25,-11,25,-25v0,-14,-11,-24,-25,-24v-14,0,-24,10,-24,24xm84,-310v0,-21,17,-38,38,-38v21,0,39,17,39,38v0,21,-18,39,-39,39v-21,0,-38,-18,-38,-39",
            "w": 246
        },
        "\u0170": {
            "d": "123,5v-136,0,-93,-142,-100,-262r25,0r0,159v0,59,27,83,75,83v48,0,76,-24,76,-83r0,-159r24,0v-7,120,37,262,-100,262xm158,-281r-19,0r37,-51r27,0xm102,-281r-19,0r37,-51r27,0",
            "w": 246
        },
        "\u0172": {
            "d": "118,5v-61,0,-95,-45,-95,-98r0,-164r25,0r0,159v0,59,27,83,75,83v48,0,76,-24,76,-83r0,-159r24,0v-7,113,36,253,-89,262v-19,11,-38,54,-7,54v9,0,16,-7,20,-15r10,5v-11,36,-68,30,-68,-5v-4,-8,16,-32,29,-39",
            "w": 246
        },
        "\u0174": {
            "d": "71,0r-71,-257r26,0r59,225r63,-225r31,0r63,225r59,-225r24,0r-70,257r-26,0r-66,-230r-65,230r-27,0xm176,-331r41,51r-23,0r-31,-37r-32,37r-21,0r41,-51r25,0",
            "w": 326,
            "k": {
                "A": 6,
                "\u00c0": 6,
                "\u00c1": 6,
                "\u00c2": 6,
                "\u00c3": 6,
                "\u00c4": 6,
                "\u0100": 6,
                "\u0102": 6,
                "\u00c5": 6,
                "\u0104": 6,
                "\u00c6": 6,
                ".": 27,
                "\u2026": 27,
                "a": 13,
                "\u00e0": 13,
                "\u00e1": 13,
                "\u00e2": 13,
                "\u00e3": 13,
                "\u00e4": 13,
                "\u0101": 13,
                "\u0103": 13,
                "\u00e5": 13,
                "\u0105": 13,
                "\u00e6": 13,
                "e": 6,
                "\u00e8": 6,
                "\u00e9": 6,
                "\u00ea": 6,
                "\u011b": 6,
                "\u00eb": 6,
                "\u0113": 6,
                "\u0115": 6,
                "\u0117": 6,
                "\u0119": 6,
                "i": -9,
                "\u0131": -9,
                "\u00ec": -9,
                "\u00ed": -9,
                "\u00ee": -9,
                "\u0129": -9,
                "\u00ef": -9,
                "\u012b": -9,
                "\u012f": -9,
                "\u0133": -9,
                "o": 6,
                "\u00f2": 6,
                "\u00f3": 6,
                "\u00f4": 6,
                "\u00f5": 6,
                "\u00f6": 6,
                "\u014d": 6,
                "\u014f": 6,
                "\u0151": 6,
                "\u00f8": 6,
                "\u0153": 6,
                "r": 6,
                "\u0155": 6,
                "\u0159": 6,
                "\u0157": 6,
                "u": 6,
                "\u00f9": 6,
                "\u00fa": 6,
                "\u00fb": 6,
                "\u0169": 6,
                "\u00fc": 6,
                "\u016b": 6,
                "\u016d": 6,
                "\u016f": 6,
                "\u0171": 6,
                "\u0173": 6,
                ":": 6,
                ",": 27,
                ";": 6
            }
        },
        "\u00dd": {
            "d": "98,0r0,-106r-102,-151r30,0r84,130r84,-130r30,0r-102,151r0,106r-24,0xm166,-332r-48,51r-18,0r38,-51r28,0",
            "w": 219,
            "k": {
                "A": 27,
                "\u00c0": 27,
                "\u00c1": 27,
                "\u00c2": 27,
                "\u00c3": 27,
                "\u00c4": 27,
                "\u0100": 27,
                "\u0102": 27,
                "\u00c5": 27,
                "\u0104": 27,
                "\u00c6": 27,
                ".": 36,
                "\u2026": 36,
                "a": 33,
                "\u00e0": 33,
                "\u00e1": 33,
                "\u00e2": 33,
                "\u00e3": 33,
                "\u00e4": 33,
                "\u0101": 33,
                "\u0103": 33,
                "\u00e5": 33,
                "\u0105": 33,
                "\u00e6": 33,
                "e": 33,
                "\u00e8": 33,
                "\u00e9": 33,
                "\u00ea": 33,
                "\u011b": 33,
                "\u00eb": 33,
                "\u0113": 33,
                "\u0115": 33,
                "\u0117": 33,
                "\u0119": 33,
                "-": 40,
                "\u00ad": 40,
                "i": 3,
                "\u0131": 3,
                "\u00ec": 3,
                "\u00ed": 3,
                "\u00ee": 3,
                "\u0129": 3,
                "\u00ef": 3,
                "\u012b": 3,
                "\u012f": 3,
                "\u0133": 3,
                "o": 33,
                "\u00f2": 33,
                "\u00f3": 33,
                "\u00f4": 33,
                "\u00f5": 33,
                "\u00f6": 33,
                "\u014d": 33,
                "\u014f": 33,
                "\u0151": 33,
                "\u00f8": 33,
                "\u0153": 33,
                "u": 27,
                "\u00f9": 27,
                "\u00fa": 27,
                "\u00fb": 27,
                "\u0169": 27,
                "\u00fc": 27,
                "\u016b": 27,
                "\u016d": 27,
                "\u016f": 27,
                "\u0171": 27,
                "\u0173": 27,
                "v": 20,
                ":": 33,
                ",": 44,
                ";": 33,
                "p": 27,
                "q": 33
            }
        },
        "\u0176": {
            "d": "98,0r0,-106r-102,-151r30,0r84,130r84,-130r30,0r-102,151r0,106r-24,0xm124,-331r41,51r-23,0r-31,-37r-32,37r-21,0r41,-51r25,0",
            "w": 219,
            "k": {
                "A": 27,
                "\u00c0": 27,
                "\u00c1": 27,
                "\u00c2": 27,
                "\u00c3": 27,
                "\u00c4": 27,
                "\u0100": 27,
                "\u0102": 27,
                "\u00c5": 27,
                "\u0104": 27,
                "\u00c6": 27,
                ".": 36,
                "\u2026": 36,
                "a": 33,
                "\u00e0": 33,
                "\u00e1": 33,
                "\u00e2": 33,
                "\u00e3": 33,
                "\u00e4": 33,
                "\u0101": 33,
                "\u0103": 33,
                "\u00e5": 33,
                "\u0105": 33,
                "\u00e6": 33,
                "e": 33,
                "\u00e8": 33,
                "\u00e9": 33,
                "\u00ea": 33,
                "\u011b": 33,
                "\u00eb": 33,
                "\u0113": 33,
                "\u0115": 33,
                "\u0117": 33,
                "\u0119": 33,
                "-": 40,
                "\u00ad": 40,
                "i": 3,
                "\u0131": 3,
                "\u00ec": 3,
                "\u00ed": 3,
                "\u00ee": 3,
                "\u0129": 3,
                "\u00ef": 3,
                "\u012b": 3,
                "\u012f": 3,
                "\u0133": 3,
                "o": 33,
                "\u00f2": 33,
                "\u00f3": 33,
                "\u00f4": 33,
                "\u00f5": 33,
                "\u00f6": 33,
                "\u014d": 33,
                "\u014f": 33,
                "\u0151": 33,
                "\u00f8": 33,
                "\u0153": 33,
                "u": 27,
                "\u00f9": 27,
                "\u00fa": 27,
                "\u00fb": 27,
                "\u0169": 27,
                "\u00fc": 27,
                "\u016b": 27,
                "\u016d": 27,
                "\u016f": 27,
                "\u0171": 27,
                "\u0173": 27,
                "v": 20,
                ":": 33,
                ",": 44,
                ";": 33,
                "p": 27,
                "q": 33
            }
        },
        "\u0178": {
            "d": "98,0r0,-106r-102,-151r30,0r84,130r84,-130r30,0r-102,151r0,106r-24,0xm90,-288r-24,0r0,-36r24,0r0,36xm154,-288r-24,0r0,-36r24,0r0,36",
            "w": 219,
            "k": {
                "A": 27,
                "\u00c0": 27,
                "\u00c1": 27,
                "\u00c2": 27,
                "\u00c3": 27,
                "\u00c4": 27,
                "\u0100": 27,
                "\u0102": 27,
                "\u00c5": 27,
                "\u0104": 27,
                "\u00c6": 27,
                ".": 36,
                "\u2026": 36,
                "a": 33,
                "\u00e0": 33,
                "\u00e1": 33,
                "\u00e2": 33,
                "\u00e3": 33,
                "\u00e4": 33,
                "\u0101": 33,
                "\u0103": 33,
                "\u00e5": 33,
                "\u0105": 33,
                "\u00e6": 33,
                "e": 33,
                "\u00e8": 33,
                "\u00e9": 33,
                "\u00ea": 33,
                "\u011b": 33,
                "\u00eb": 33,
                "\u0113": 33,
                "\u0115": 33,
                "\u0117": 33,
                "\u0119": 33,
                "-": 40,
                "\u00ad": 40,
                "i": 3,
                "\u0131": 3,
                "\u00ec": 3,
                "\u00ed": 3,
                "\u00ee": 3,
                "\u0129": 3,
                "\u00ef": 3,
                "\u012b": 3,
                "\u012f": 3,
                "\u0133": 3,
                "o": 33,
                "\u00f2": 33,
                "\u00f3": 33,
                "\u00f4": 33,
                "\u00f5": 33,
                "\u00f6": 33,
                "\u014d": 33,
                "\u014f": 33,
                "\u0151": 33,
                "\u00f8": 33,
                "\u0153": 33,
                "u": 27,
                "\u00f9": 27,
                "\u00fa": 27,
                "\u00fb": 27,
                "\u0169": 27,
                "\u00fc": 27,
                "\u016b": 27,
                "\u016d": 27,
                "\u016f": 27,
                "\u0171": 27,
                "\u0173": 27,
                "v": 20,
                ":": 33,
                ",": 44,
                ";": 33,
                "p": 27,
                "q": 33
            }
        },
        "\u0179": {
            "d": "13,-236r0,-21r185,0r0,22r-169,214r173,0r0,21r-200,0r0,-22r169,-214r-158,0xm158,-332r-48,51r-18,0r38,-51r28,0",
            "w": 206
        },
        "\u017d": {
            "d": "13,-236r0,-21r185,0r0,22r-169,214r173,0r0,21r-200,0r0,-22r169,-214r-158,0xm91,-281r-41,-51r23,0r31,37r32,-37r21,0r-41,51r-25,0",
            "w": 206
        },
        "\u017b": {
            "d": "13,-236r0,-21r185,0r0,22r-169,214r173,0r0,21r-200,0r0,-22r169,-214r-158,0xm118,-288r-25,0r0,-36r25,0r0,36",
            "w": 206
        },
        "\u00e0": {
            "d": "42,-129r-23,0v3,-44,33,-62,76,-62v33,0,68,10,68,60r0,98v-1,12,11,17,21,12r0,20v-28,6,-44,-8,-43,-31v-20,51,-129,53,-129,-17v0,-52,50,-54,99,-60v19,-2,29,-5,29,-25v0,-31,-21,-38,-48,-38v-28,0,-49,13,-50,43xm140,-102v-30,22,-106,6,-106,52v0,23,20,36,42,36v46,0,71,-34,64,-88xm93,-212r-48,-50r28,0r38,50r-18,0",
            "w": 186
        },
        "\u00e1": {
            "d": "42,-129r-23,0v3,-44,33,-62,76,-62v33,0,68,10,68,60r0,98v-1,12,11,17,21,12r0,20v-28,6,-44,-8,-43,-31v-20,51,-129,53,-129,-17v0,-52,50,-54,99,-60v19,-2,29,-5,29,-25v0,-31,-21,-38,-48,-38v-28,0,-49,13,-50,43xm140,-102v-30,22,-106,6,-106,52v0,23,20,36,42,36v46,0,71,-34,64,-88xm148,-263r-48,51r-18,0r38,-51r28,0",
            "w": 186
        },
        "\u00e2": {
            "d": "42,-129r-23,0v3,-44,33,-62,76,-62v33,0,68,10,68,60r0,98v-1,12,11,17,21,12r0,20v-28,6,-44,-8,-43,-31v-20,51,-129,53,-129,-17v0,-52,50,-54,99,-60v19,-2,29,-5,29,-25v0,-31,-21,-38,-48,-38v-28,0,-49,13,-50,43xm140,-102v-30,22,-106,6,-106,52v0,23,20,36,42,36v46,0,71,-34,64,-88xm106,-263r41,51r-24,0r-30,-37r-32,37r-21,0r41,-51r25,0",
            "w": 186
        },
        "\u00e3": {
            "d": "42,-129r-23,0v3,-44,33,-62,76,-62v33,0,68,10,68,60r0,98v-1,12,11,17,21,12r0,20v-28,6,-44,-8,-43,-31v-20,51,-129,53,-129,-17v0,-52,50,-54,99,-60v19,-2,29,-5,29,-25v0,-31,-21,-38,-48,-38v-28,0,-49,13,-50,43xm140,-102v-30,22,-106,6,-106,52v0,23,20,36,42,36v46,0,71,-34,64,-88xm136,-256r13,0v-3,16,-12,35,-31,35v-28,-1,-57,-37,-68,1r-14,0v2,-17,13,-34,32,-34v30,0,57,34,68,-2",
            "w": 186
        },
        "\u00e4": {
            "d": "42,-129r-23,0v3,-44,33,-62,76,-62v33,0,68,10,68,60r0,98v-1,12,11,17,21,12r0,20v-28,6,-44,-8,-43,-31v-20,51,-129,53,-129,-17v0,-52,50,-54,99,-60v19,-2,29,-5,29,-25v0,-31,-21,-38,-48,-38v-28,0,-49,13,-50,43xm140,-102v-30,22,-106,6,-106,52v0,23,20,36,42,36v46,0,71,-34,64,-88xm73,-220r-24,0r0,-36r24,0r0,36xm137,-220r-24,0r0,-36r24,0r0,36",
            "w": 186
        },
        "\u0101": {
            "d": "42,-129r-23,0v3,-44,33,-62,76,-62v33,0,68,10,68,60r0,98v-1,12,11,17,21,12r0,20v-28,6,-44,-8,-43,-31v-20,51,-129,53,-129,-17v0,-52,50,-54,99,-60v19,-2,29,-5,29,-25v0,-31,-21,-38,-48,-38v-28,0,-49,13,-50,43xm140,-102v-30,22,-106,6,-106,52v0,23,20,36,42,36v46,0,71,-34,64,-88xm154,-230r-118,0r0,-16r118,0r0,16",
            "w": 186
        },
        "\u0103": {
            "d": "42,-129r-23,0v3,-44,33,-62,76,-62v33,0,68,10,68,60r0,98v-1,12,11,17,21,12r0,20v-28,6,-44,-8,-43,-31v-20,51,-129,53,-129,-17v0,-52,50,-54,99,-60v19,-2,29,-5,29,-25v0,-31,-21,-38,-48,-38v-28,0,-49,13,-50,43xm140,-102v-30,22,-106,6,-106,52v0,23,20,36,42,36v46,0,71,-34,64,-88xm42,-261r15,0v3,40,71,39,75,0r14,0v-4,28,-23,46,-52,46v-29,0,-49,-17,-52,-46",
            "w": 186
        },
        "\u00e5": {
            "d": "42,-129r-23,0v3,-44,33,-62,76,-62v33,0,68,10,68,60r0,98v-1,12,11,17,21,12r0,20v-28,6,-44,-8,-43,-31v-20,51,-129,53,-129,-17v0,-52,50,-54,99,-60v19,-2,29,-5,29,-25v0,-31,-21,-38,-48,-38v-28,0,-49,13,-50,43xm140,-102v-30,22,-106,6,-106,52v0,23,20,36,42,36v46,0,71,-34,64,-88xm68,-245v0,14,11,25,25,25v14,0,24,-11,24,-25v0,-14,-10,-24,-24,-24v-14,0,-25,10,-25,24xm54,-245v0,-21,18,-38,39,-38v21,0,38,17,38,38v0,21,-17,39,-38,39v-21,0,-39,-18,-39,-39",
            "w": 186
        },
        "\u0105": {
            "d": "149,73v-59,0,-25,-63,6,-75v-11,-4,-11,-18,-14,-30v-20,51,-129,53,-129,-17v0,-52,50,-54,99,-60v19,-2,29,-5,29,-25v0,-31,-21,-38,-48,-38v-28,0,-49,13,-50,43r-23,0v3,-44,33,-62,76,-62v33,0,68,10,68,60r0,98v-1,12,11,17,21,12r0,20r-17,1v-27,22,-29,31,-29,42v1,25,31,19,36,2r10,5v-8,18,-20,24,-35,24xm140,-102v-30,22,-106,6,-106,52v0,23,20,36,42,36v46,0,71,-34,64,-88",
            "w": 186
        },
        "\u00e6": {
            "d": "303,-87r-140,0v-3,40,18,73,61,73v31,0,48,-17,55,-46r22,0v-9,75,-126,90,-149,19v-12,58,-140,68,-140,-8v0,-52,50,-54,99,-60v19,-2,29,-5,29,-25v0,-31,-21,-38,-48,-38v-28,0,-49,13,-50,43r-23,0v3,-44,33,-62,76,-62v25,0,57,6,62,38v10,-26,38,-38,65,-38v61,0,81,50,81,104xm140,-102v-30,22,-106,6,-106,52v0,23,20,36,42,36v46,0,71,-34,64,-88xm163,-106r117,0v0,-34,-23,-66,-59,-66v-37,0,-59,31,-58,66",
            "w": 313
        },
        "\u0107": {
            "d": "175,-127r-22,0v-6,-28,-23,-45,-53,-45v-86,1,-87,157,0,158v28,0,51,-22,54,-53r23,0v-6,45,-35,72,-77,72v-57,0,-88,-45,-88,-98v0,-53,31,-98,88,-98v40,0,70,21,75,64xm154,-263r-47,51r-18,0r37,-51r28,0",
            "w": 186
        },
        "\u0109": {
            "d": "175,-127r-22,0v-6,-28,-23,-45,-53,-45v-86,1,-87,157,0,158v28,0,51,-22,54,-53r23,0v-6,45,-35,72,-77,72v-57,0,-88,-45,-88,-98v0,-53,31,-98,88,-98v40,0,70,21,75,64xm112,-263r41,51r-23,0r-31,-37r-32,37r-21,0r41,-51r25,0",
            "w": 186
        },
        "\u010d": {
            "d": "175,-127r-22,0v-6,-28,-23,-45,-53,-45v-86,1,-87,157,0,158v28,0,51,-22,54,-53r23,0v-6,45,-35,72,-77,72v-57,0,-88,-45,-88,-98v0,-53,31,-98,88,-98v40,0,70,21,75,64xm87,-212r-41,-51r23,0r31,37r32,-37r21,0r-41,51r-25,0",
            "w": 186
        },
        "\u010b": {
            "d": "175,-127r-22,0v-6,-28,-23,-45,-53,-45v-86,1,-87,157,0,158v28,0,51,-22,54,-53r23,0v-6,45,-35,72,-77,72v-57,0,-88,-45,-88,-98v0,-53,31,-98,88,-98v40,0,70,21,75,64xm112,-220r-25,0r0,-36r25,0r0,36",
            "w": 186
        },
        "\u00e7": {
            "d": "90,5v-50,-6,-78,-47,-78,-98v0,-53,31,-98,88,-98v40,0,70,21,75,64r-22,0v-6,-28,-23,-45,-53,-45v-86,1,-87,157,0,158v28,0,51,-22,54,-53r23,0v-5,42,-32,71,-75,72r-12,14v22,-3,42,-1,42,23v0,35,-47,36,-73,24r5,-12v13,5,47,12,47,-10v1,-24,-34,-5,-39,-17",
            "w": 186
        },
        "\u010f": {
            "d": "185,-257r0,257r-21,0v-1,-11,2,-26,-1,-35v-10,24,-39,40,-66,40v-57,0,-83,-45,-83,-98v0,-53,26,-98,83,-98v27,0,56,14,65,41r0,-107r23,0xm97,-172v-83,1,-82,157,0,158v89,-1,89,-157,0,-158xm251,-257r-31,51r-17,0r20,-51r28,0",
            "w": 232
        },
        "\u0111": {
            "d": "185,-210r0,210r-21,0v-1,-11,2,-26,-1,-35v-10,24,-39,40,-66,40v-57,0,-83,-45,-83,-98v0,-53,26,-98,83,-98v27,0,56,14,65,41r0,-60r-62,0r0,-16r62,0r0,-31r23,0r0,31r30,0r0,16r-30,0xm97,-172v-83,1,-82,157,0,158v89,-1,89,-157,0,-158",
            "w": 215
        },
        "\u00f0": {
            "d": "49,-215r36,-20v-11,-7,-22,-14,-34,-20r13,-12v13,7,26,14,38,23r41,-23r11,11r-39,22v40,32,71,79,71,141v0,54,-28,98,-88,98v-58,0,-86,-42,-86,-95v0,-69,75,-117,134,-78v-12,-23,-28,-40,-48,-56r-38,21xm99,-163v-46,0,-64,34,-64,74v0,39,19,75,64,75v42,0,64,-31,64,-76v0,-36,-18,-73,-64,-73",
            "w": 200
        },
        "\u00e8": {
            "d": "35,-106r120,0v-1,-34,-23,-66,-59,-66v-37,0,-57,32,-61,66xm178,-87r-143,0v0,33,18,73,61,73v33,0,51,-19,58,-47r23,0v-10,42,-34,66,-81,66v-59,0,-84,-45,-84,-98v0,-49,25,-98,84,-98v59,0,84,52,82,104xm95,-212r-47,-50r28,0r38,50r-19,0",
            "w": 186
        },
        "\u00e9": {
            "d": "35,-106r120,0v-1,-34,-23,-66,-59,-66v-37,0,-57,32,-61,66xm178,-87r-143,0v0,33,18,73,61,73v33,0,51,-19,58,-47r23,0v-10,42,-34,66,-81,66v-59,0,-84,-45,-84,-98v0,-49,25,-98,84,-98v59,0,84,52,82,104xm150,-263r-47,51r-19,0r38,-51r28,0",
            "w": 186
        },
        "\u00ea": {
            "d": "35,-106r120,0v-1,-34,-23,-66,-59,-66v-37,0,-57,32,-61,66xm178,-87r-143,0v0,33,18,73,61,73v33,0,51,-19,58,-47r23,0v-10,42,-34,66,-81,66v-59,0,-84,-45,-84,-98v0,-49,25,-98,84,-98v59,0,84,52,82,104xm109,-263r41,51r-23,0r-31,-37r-32,37r-21,0r41,-51r25,0",
            "w": 186
        },
        "\u011b": {
            "d": "35,-106r120,0v-1,-34,-23,-66,-59,-66v-37,0,-57,32,-61,66xm178,-87r-143,0v0,33,18,73,61,73v33,0,51,-19,58,-47r23,0v-10,42,-34,66,-81,66v-59,0,-84,-45,-84,-98v0,-49,25,-98,84,-98v59,0,84,52,82,104xm84,-212r-41,-51r24,0r31,37r31,-37r21,0r-41,51r-25,0",
            "w": 186
        },
        "\u00eb": {
            "d": "35,-106r120,0v-1,-34,-23,-66,-59,-66v-37,0,-57,32,-61,66xm178,-87r-143,0v0,33,18,73,61,73v33,0,51,-19,58,-47r23,0v-10,42,-34,66,-81,66v-59,0,-84,-45,-84,-98v0,-49,25,-98,84,-98v59,0,84,52,82,104xm77,-220r-24,0r0,-36r24,0r0,36xm141,-220r-25,0r0,-36r25,0r0,36",
            "w": 186
        },
        "\u0113": {
            "d": "35,-106r120,0v-1,-34,-23,-66,-59,-66v-37,0,-57,32,-61,66xm178,-87r-143,0v0,33,18,73,61,73v33,0,51,-19,58,-47r23,0v-10,42,-34,66,-81,66v-59,0,-84,-45,-84,-98v0,-49,25,-98,84,-98v59,0,84,52,82,104xm155,-230r-118,0r0,-16r118,0r0,16",
            "w": 186
        },
        "\u0115": {
            "d": "35,-106r120,0v-1,-34,-23,-66,-59,-66v-37,0,-57,32,-61,66xm178,-87r-143,0v0,33,18,73,61,73v33,0,51,-19,58,-47r23,0v-10,42,-34,66,-81,66v-59,0,-84,-45,-84,-98v0,-49,25,-98,84,-98v59,0,84,52,82,104xm46,-261r14,0v3,40,71,39,75,0r14,0v-4,28,-23,46,-52,46v-29,0,-48,-17,-51,-46",
            "w": 186
        },
        "\u0117": {
            "d": "35,-106r120,0v-1,-34,-23,-66,-59,-66v-37,0,-57,32,-61,66xm178,-87r-143,0v0,33,18,73,61,73v33,0,51,-19,58,-47r23,0v-10,42,-34,66,-81,66v-59,0,-84,-45,-84,-98v0,-49,25,-98,84,-98v59,0,84,52,82,104xm108,-220r-24,0r0,-36r24,0r0,36",
            "w": 186
        },
        "\u0119": {
            "d": "92,5v-55,-2,-80,-46,-80,-98v0,-49,25,-98,84,-98v59,0,84,52,82,104r-143,0v0,33,18,73,61,73v33,0,51,-19,58,-47r23,0v-10,37,-28,61,-69,66v-19,11,-38,54,-7,54v9,0,16,-7,20,-15r10,5v-11,36,-68,30,-68,-5v-4,-8,16,-32,29,-39xm35,-106r120,0v-1,-34,-23,-66,-59,-66v-37,0,-57,32,-61,66",
            "w": 186
        },
        "\u011d": {
            "d": "179,-186v-9,107,39,260,-83,260v-37,0,-74,-17,-77,-56r23,0v5,27,29,37,54,37v50,0,66,-42,59,-95v-10,23,-32,38,-59,38v-59,0,-84,-43,-84,-96v0,-51,30,-93,84,-93v28,-1,49,18,60,37r0,-32r23,0xm96,-21v79,-1,82,-151,0,-151v-43,0,-61,38,-61,77v0,37,19,74,61,74xm117,-263r41,51r-23,0r-31,-37r-32,37r-21,0r41,-51r25,0",
            "w": 200
        },
        "\u011f": {
            "d": "179,-186v-9,107,39,260,-83,260v-37,0,-74,-17,-77,-56r23,0v5,27,29,37,54,37v50,0,66,-42,59,-95v-10,23,-32,38,-59,38v-59,0,-84,-43,-84,-96v0,-51,30,-93,84,-93v28,-1,49,18,60,37r0,-32r23,0xm96,-21v79,-1,82,-151,0,-151v-43,0,-61,38,-61,77v0,37,19,74,61,74xm45,-261r14,0v3,40,71,39,75,0r14,0v-4,28,-23,46,-52,46v-29,0,-48,-17,-51,-46",
            "w": 200
        },
        "\u0121": {
            "d": "179,-186v-9,107,39,260,-83,260v-37,0,-74,-17,-77,-56r23,0v5,27,29,37,54,37v50,0,66,-42,59,-95v-10,23,-32,38,-59,38v-59,0,-84,-43,-84,-96v0,-51,30,-93,84,-93v28,-1,49,18,60,37r0,-32r23,0xm96,-21v79,-1,82,-151,0,-151v-43,0,-61,38,-61,77v0,37,19,74,61,74xm112,-220r-25,0r0,-36r25,0r0,36",
            "w": 200
        },
        "\u0123": {
            "d": "179,-186v-9,107,39,260,-83,260v-37,0,-74,-17,-77,-56r23,0v5,27,29,37,54,37v50,0,66,-42,59,-95v-10,23,-32,38,-59,38v-59,0,-84,-43,-84,-96v0,-51,30,-93,84,-93v28,-1,49,18,60,37r0,-32r23,0xm96,-21v79,-1,82,-151,0,-151v-43,0,-61,38,-61,77v0,37,19,74,61,74xm116,-224r-31,0v-2,-31,1,-57,31,-55r0,10v-10,2,-13,6,-14,12r14,0r0,33",
            "w": 200
        },
        "\u0125": {
            "d": "21,0r0,-257r23,0r1,103v9,-22,33,-37,59,-37v98,0,61,108,68,191r-23,0v-8,-67,28,-171,-47,-172v-75,-1,-56,99,-58,172r-23,0xm108,-331r41,51r-23,0r-31,-37r-32,37r-21,0r41,-51r25,0",
            "w": 193
        },
        "\u0127": {
            "d": "30,-226r0,-31r22,0r0,31r55,0r0,16r-55,0v1,18,-2,40,1,56v9,-22,33,-37,59,-37v98,0,61,108,68,191r-22,0v-8,-67,28,-171,-47,-172v-75,-1,-58,98,-59,172r-22,0r0,-210r-30,0r0,-16r30,0",
            "w": 201
        },
        "\u0131": {
            "d": "45,0r-23,0r0,-186r23,0r0,186"
        },
        "\u00ec": {
            "d": "45,0r-23,0r0,-186r23,0r0,186xm27,-212r-48,-50r28,0r38,50r-18,0"
        },
        "\u00ed": {
            "d": "45,0r-23,0r0,-186r23,0r0,186xm87,-263r-47,51r-19,0r38,-51r28,0"
        },
        "\u00ee": {
            "d": "45,0r-23,0r0,-186r23,0r0,186xm46,-263r41,51r-23,0r-31,-37r-32,37r-21,0r41,-51r25,0"
        },
        "\u0129": {
            "d": "45,0r-23,0r0,-186r23,0r0,186xm76,-256r14,0v-3,16,-12,35,-31,35v-28,-1,-57,-37,-68,1r-14,0v2,-17,13,-34,32,-34v30,0,57,34,67,-2"
        },
        "\u00ef": {
            "d": "45,0r-23,0r0,-186r23,0r0,186xm14,-220r-24,0r0,-36r24,0r0,36xm78,-220r-25,0r0,-36r25,0r0,36"
        },
        "\u012b": {
            "d": "45,0r-23,0r0,-186r23,0r0,186xm93,-230r-119,0r0,-16r119,0r0,16"
        },
        "\u012f": {
            "d": "45,-186r0,186v-24,22,-27,31,-27,42v1,25,28,19,32,2r9,5v-9,36,-62,29,-61,-5v0,-7,1,-22,34,-44r-10,0r0,-186r23,0xm22,-221r0,-36r23,0r0,36r-23,0"
        },
        "\ue0d6": {
            "d": "22,23r0,-209r23,0r0,203v2,34,-16,59,-56,51r0,-19v21,5,33,-6,33,-26"
        },
        "\u0135": {
            "d": "22,23r0,-209r23,0r0,203v2,34,-16,59,-56,51r0,-19v21,5,33,-6,33,-26xm45,-263r41,51r-23,0r-31,-37r-32,37r-21,0r41,-51r25,0"
        },
        "\u0137": {
            "d": "22,0r0,-257r22,0r0,161r103,-90r30,0r-79,69r85,117r-29,0r-73,-101r-37,30r0,71r-22,0xm80,18r31,0v2,31,-1,57,-31,55r0,-10v10,-2,13,-6,14,-12r-14,0r0,-33",
            "w": 180
        },
        "\u013a": {
            "d": "22,0r0,-257r23,0r0,257r-23,0xm88,-332r-48,51r-18,0r38,-51r28,0"
        },
        "\u013e": {
            "d": "22,0r0,-257r23,0r0,257r-23,0xm111,-257r-31,51r-17,0r19,-51r29,0",
            "w": 91
        },
        "\u013c": {
            "d": "22,0r0,-257r23,0r0,257r-23,0xm18,18r31,0v2,31,-1,57,-31,55r0,-10v10,-2,13,-6,14,-12r-14,0r0,-33"
        },
        "\u0142": {
            "d": "22,-142r0,-115r23,0r0,96r24,-20r0,20r-24,20r0,141r-23,0r0,-122r-24,19r0,-19"
        },
        "\u0140": {
            "d": "22,0r0,-257r23,0r0,257r-23,0xm92,-149r-24,0r0,-37r24,0r0,37",
            "w": 106
        },
        "\u0144": {
            "d": "21,0r0,-186r23,0v1,10,-2,24,1,32v9,-22,33,-37,59,-37v98,0,61,108,68,191r-23,0v-8,-67,28,-171,-47,-172v-75,-1,-56,99,-58,172r-23,0xm151,-263r-48,51r-18,0r38,-51r28,0",
            "w": 193
        },
        "\u0148": {
            "d": "21,0r0,-186r23,0v1,10,-2,24,1,32v9,-22,33,-37,59,-37v98,0,61,108,68,191r-23,0v-8,-67,28,-171,-47,-172v-75,-1,-56,99,-58,172r-23,0xm84,-212r-41,-51r23,0r31,37r32,-37r21,0r-41,51r-25,0",
            "w": 193
        },
        "\u00f1": {
            "d": "21,0r0,-186r23,0v1,10,-2,24,1,32v9,-22,33,-37,59,-37v98,0,61,108,68,191r-23,0v-8,-67,28,-171,-47,-172v-75,-1,-56,99,-58,172r-23,0xm139,-256r14,0v-3,16,-12,35,-31,35v-28,-1,-57,-37,-68,1r-14,0v2,-17,13,-34,32,-34v30,0,57,34,67,-2",
            "w": 193
        },
        "\u0146": {
            "d": "21,0r0,-186r23,0v1,10,-2,24,1,32v9,-22,33,-37,59,-37v98,0,61,108,68,191r-23,0v-8,-67,28,-171,-47,-172v-75,-1,-56,99,-58,172r-23,0xm83,18r31,0v2,31,-1,57,-31,55r0,-10v10,-2,13,-6,14,-12r-14,0r0,-33",
            "w": 193
        },
        "\u00f2": {
            "d": "100,-172v-86,1,-87,157,0,158v86,-1,87,-157,0,-158xm100,-191v57,0,88,45,88,98v0,53,-31,98,-88,98v-57,0,-88,-45,-88,-98v0,-53,31,-98,88,-98xm100,-212r-47,-50r28,0r37,50r-18,0",
            "w": 200
        },
        "\u00f3": {
            "d": "100,-172v-86,1,-87,157,0,158v86,-1,87,-157,0,-158xm100,-191v57,0,88,45,88,98v0,53,-31,98,-88,98v-57,0,-88,-45,-88,-98v0,-53,31,-98,88,-98xm155,-263r-47,51r-19,0r38,-51r28,0",
            "w": 200
        },
        "\u00f4": {
            "d": "100,-172v-86,1,-87,157,0,158v86,-1,87,-157,0,-158xm100,-191v57,0,88,45,88,98v0,53,-31,98,-88,98v-57,0,-88,-45,-88,-98v0,-53,31,-98,88,-98xm113,-263r41,51r-23,0r-31,-37r-32,37r-21,0r41,-51r25,0",
            "w": 200
        },
        "\u00f5": {
            "d": "100,-172v-86,1,-87,157,0,158v86,-1,87,-157,0,-158xm100,-191v57,0,88,45,88,98v0,53,-31,98,-88,98v-57,0,-88,-45,-88,-98v0,-53,31,-98,88,-98xm144,-256r13,0v-3,16,-12,35,-31,35v-28,-1,-57,-37,-68,1r-14,0v2,-17,13,-34,32,-34v30,0,57,34,68,-2",
            "w": 200
        },
        "\u00f6": {
            "d": "100,-172v-86,1,-87,157,0,158v86,-1,87,-157,0,-158xm100,-191v57,0,88,45,88,98v0,53,-31,98,-88,98v-57,0,-88,-45,-88,-98v0,-53,31,-98,88,-98xm81,-220r-24,0r0,-36r24,0r0,36xm145,-220r-25,0r0,-36r25,0r0,36",
            "w": 200
        },
        "\u014d": {
            "d": "100,-172v-86,1,-87,157,0,158v86,-1,87,-157,0,-158xm100,-191v57,0,88,45,88,98v0,53,-31,98,-88,98v-57,0,-88,-45,-88,-98v0,-53,31,-98,88,-98xm161,-230r-119,0r0,-16r119,0r0,16",
            "w": 200
        },
        "\u014f": {
            "d": "100,-172v-86,1,-87,157,0,158v86,-1,87,-157,0,-158xm100,-191v57,0,88,45,88,98v0,53,-31,98,-88,98v-57,0,-88,-45,-88,-98v0,-53,31,-98,88,-98xm50,-261r14,0v3,40,71,39,75,0r14,0v-4,28,-23,46,-52,46v-29,0,-48,-17,-51,-46",
            "w": 200
        },
        "\u0151": {
            "d": "100,-172v-86,1,-87,157,0,158v86,-1,87,-157,0,-158xm100,-191v57,0,88,45,88,98v0,53,-31,98,-88,98v-57,0,-88,-45,-88,-98v0,-53,31,-98,88,-98xm136,-212r-18,0r36,-51r27,0xm80,-212r-18,0r36,-51r27,0",
            "w": 200
        },
        "\u00f8": {
            "d": "161,-167v9,-7,17,-28,27,-13r-20,22v43,59,15,166,-68,163v-26,0,-46,-9,-60,-24r-22,23r-8,-7r22,-24v-42,-58,-16,-164,68,-164v26,0,47,9,61,24xm153,-141r-99,106v10,13,26,21,46,21v60,0,81,-79,53,-127xm48,-44r98,-106v-10,-13,-26,-22,-46,-22v-61,1,-81,80,-52,128",
            "w": 200
        },
        "\u0153": {
            "d": "172,-106r116,0v0,-35,-21,-66,-58,-66v-39,0,-58,31,-58,66xm288,-60r22,0v-9,74,-127,91,-148,18v-11,30,-34,47,-67,47v-59,0,-82,-46,-82,-98v0,-51,27,-98,83,-98v33,-1,55,17,67,46v10,-27,35,-46,68,-46v55,0,80,35,80,104r-139,0v0,36,18,73,58,73v32,0,50,-17,58,-46xm95,-172v-47,0,-59,44,-59,83v0,37,16,75,59,75v46,0,55,-42,55,-80v0,-37,-10,-78,-55,-78",
            "w": 320
        },
        "\u0155": {
            "d": "22,0r0,-186r20,0v1,14,-2,32,1,44v12,-30,37,-47,70,-46r0,22v-41,-2,-69,28,-69,67r0,99r-22,0xm90,-263r-48,51r-18,0r38,-51r28,0",
            "w": 113,
            "k": {
                ".": 33,
                "\u2026": 33,
                "e": 6,
                "\u00e8": 6,
                "\u00e9": 6,
                "\u00ea": 6,
                "\u011b": 6,
                "\u00eb": 6,
                "\u0113": 6,
                "\u0115": 6,
                "\u0117": 6,
                "\u0119": 6,
                "-": 20,
                "\u00ad": 20,
                "o": 6,
                "\u00f2": 6,
                "\u00f3": 6,
                "\u00f4": 6,
                "\u00f5": 6,
                "\u00f6": 6,
                "\u014d": 6,
                "\u014f": 6,
                "\u0151": 6,
                "\u00f8": 6,
                "\u0153": 6,
                ",": 33,
                "q": 6,
                "c": 6,
                "\u0107": 6,
                "\u0109": 6,
                "\u010d": 6,
                "\u010b": 6,
                "\u00e7": 6,
                "d": 6,
                "\u010f": 6,
                "\u0111": 6,
                "n": -6,
                "\u0144": -6,
                "\u0148": -6,
                "\u00f1": -6,
                "\u0146": -6
            }
        },
        "\u0159": {
            "d": "22,0r0,-186r20,0v1,14,-2,32,1,44v12,-30,37,-47,70,-46r0,22v-41,-2,-69,28,-69,67r0,99r-22,0xm54,-212r-41,-51r23,0r31,37r32,-37r21,0r-41,51r-25,0",
            "w": 113,
            "k": {
                ".": 33,
                "\u2026": 33,
                "e": 6,
                "\u00e8": 6,
                "\u00e9": 6,
                "\u00ea": 6,
                "\u011b": 6,
                "\u00eb": 6,
                "\u0113": 6,
                "\u0115": 6,
                "\u0117": 6,
                "\u0119": 6,
                "-": 20,
                "\u00ad": 20,
                "o": 6,
                "\u00f2": 6,
                "\u00f3": 6,
                "\u00f4": 6,
                "\u00f5": 6,
                "\u00f6": 6,
                "\u014d": 6,
                "\u014f": 6,
                "\u0151": 6,
                "\u00f8": 6,
                "\u0153": 6,
                ",": 33,
                "q": 6,
                "c": 6,
                "\u0107": 6,
                "\u0109": 6,
                "\u010d": 6,
                "\u010b": 6,
                "\u00e7": 6,
                "d": 6,
                "\u010f": 6,
                "\u0111": 6,
                "n": -6,
                "\u0144": -6,
                "\u0148": -6,
                "\u00f1": -6,
                "\u0146": -6
            }
        },
        "\u0157": {
            "d": "22,0r0,-186r20,0v1,14,-2,32,1,44v12,-30,37,-47,70,-46r0,22v-41,-2,-69,28,-69,67r0,99r-22,0xm18,18r31,0v2,31,-1,57,-31,55r0,-10v10,-2,13,-6,14,-12r-14,0r0,-33",
            "w": 113,
            "k": {
                ".": 33,
                "\u2026": 33,
                "e": 6,
                "\u00e8": 6,
                "\u00e9": 6,
                "\u00ea": 6,
                "\u011b": 6,
                "\u00eb": 6,
                "\u0113": 6,
                "\u0115": 6,
                "\u0117": 6,
                "\u0119": 6,
                "-": 20,
                "\u00ad": 20,
                "o": 6,
                "\u00f2": 6,
                "\u00f3": 6,
                "\u00f4": 6,
                "\u00f5": 6,
                "\u00f6": 6,
                "\u014d": 6,
                "\u014f": 6,
                "\u0151": 6,
                "\u00f8": 6,
                "\u0153": 6,
                ",": 33,
                "q": 6,
                "c": 6,
                "\u0107": 6,
                "\u0109": 6,
                "\u010d": 6,
                "\u010b": 6,
                "\u00e7": 6,
                "d": 6,
                "\u010f": 6,
                "\u0111": 6,
                "n": -6,
                "\u0144": -6,
                "\u0148": -6,
                "\u00f1": -6,
                "\u0146": -6
            }
        },
        "\u015b": {
            "d": "156,-131r-23,0v-1,-28,-23,-41,-49,-41v-20,0,-44,8,-44,32v15,55,123,17,122,90v0,40,-40,55,-75,55v-44,0,-72,-19,-76,-65r23,0v2,31,25,46,55,46v22,0,50,-9,50,-35v0,-58,-121,-21,-121,-90v0,-38,36,-52,69,-52v37,0,67,20,69,60xm142,-263r-48,51r-18,0r38,-51r28,0",
            "w": 173
        },
        "\u015d": {
            "d": "156,-131r-23,0v-1,-28,-23,-41,-49,-41v-20,0,-44,8,-44,32v15,55,123,17,122,90v0,40,-40,55,-75,55v-44,0,-72,-19,-76,-65r23,0v2,31,25,46,55,46v22,0,50,-9,50,-35v0,-58,-121,-21,-121,-90v0,-38,36,-52,69,-52v37,0,67,20,69,60xm101,-263r41,51r-24,0r-31,-37r-31,37r-21,0r41,-51r25,0",
            "w": 173
        },
        "\u0161": {
            "d": "156,-131r-23,0v-1,-28,-23,-41,-49,-41v-20,0,-44,8,-44,32v15,55,123,17,122,90v0,40,-40,55,-75,55v-44,0,-72,-19,-76,-65r23,0v2,31,25,46,55,46v22,0,50,-9,50,-35v0,-58,-121,-21,-121,-90v0,-38,36,-52,69,-52v37,0,67,20,69,60xm76,-212r-41,-51r23,0r31,37r32,-37r21,0r-41,51r-25,0",
            "w": 173
        },
        "\u015f": {
            "d": "162,-50v-1,38,-33,54,-71,55r-12,14v22,-3,39,-1,42,23v-2,34,-47,37,-73,24r5,-12v13,5,47,12,47,-10v0,-24,-34,-4,-40,-17r18,-22v-40,-3,-64,-23,-67,-65r23,0v2,31,25,46,55,46v22,0,50,-9,50,-35v0,-58,-121,-21,-121,-90v0,-38,36,-52,69,-52v37,0,67,20,69,60r-23,0v-1,-28,-23,-41,-49,-41v-20,0,-44,8,-44,32v15,55,123,17,122,90",
            "w": 173
        },
        "\u0219": {
            "d": "156,-131r-23,0v-1,-28,-23,-41,-49,-41v-20,0,-44,8,-44,32v15,55,123,17,122,90v0,40,-40,55,-75,55v-44,0,-72,-19,-76,-65r23,0v2,31,25,46,55,46v22,0,50,-9,50,-35v0,-58,-121,-21,-121,-90v0,-38,36,-52,69,-52v37,0,67,20,69,60xm72,18r31,0v2,31,-1,57,-31,55r0,-10v10,-2,13,-6,14,-12r-14,0r0,-33",
            "w": 173
        },
        "\u00df": {
            "d": "22,0r0,-193v0,-47,29,-69,72,-69v72,0,98,101,29,117v32,6,55,32,54,67v-1,59,-41,86,-98,80r0,-20v40,8,75,-8,75,-56v0,-50,-31,-58,-75,-58r0,-20v32,0,62,-9,62,-46v0,-27,-21,-45,-47,-45v-36,0,-49,18,-49,52r0,191r-23,0",
            "w": 193
        },
        "\u0165": {
            "d": "138,-257r-31,51r-17,0r20,-51r28,0xm58,-242r0,56r37,0r0,19r-37,0r0,126v-4,23,16,27,37,23r0,19v-36,3,-60,0,-60,-41r0,-127r-32,0r0,-19r32,0r0,-56r23,0",
            "w": 119
        },
        "\u0163": {
            "d": "58,-242r0,56r37,0r0,19r-37,0r0,126v-4,23,16,27,37,23r0,19v-36,3,-60,0,-60,-41r0,-127r-32,0r0,-19r32,0r0,-56r23,0xm49,18r31,0v2,31,-1,57,-31,55r0,-10v10,-2,13,-6,14,-12r-14,0r0,-33",
            "w": 106
        },
        "\u021b": {
            "d": "58,-242r0,56r37,0r0,19r-37,0r0,126v-4,23,16,27,37,23r0,19v-36,3,-60,0,-60,-41r0,-127r-32,0r0,-19r32,0r0,-56r23,0xm49,18r31,0v2,31,-1,57,-31,55r0,-10v10,-2,13,-6,14,-12r-14,0r0,-33",
            "w": 106
        },
        "\u0167": {
            "d": "58,-242r0,56r37,0r0,19r-37,0r0,36r42,0r0,16r-42,0r0,74v-4,23,16,27,37,23r0,19v-36,3,-60,0,-60,-41r0,-75r-36,0r0,-16r36,0r0,-36r-32,0r0,-19r32,0r0,-56r23,0",
            "w": 106
        },
        "\u00fe": {
            "d": "22,69r0,-326r22,0r1,107v9,-27,37,-41,64,-41v57,0,84,45,84,98v0,53,-27,98,-84,98v-28,1,-53,-15,-65,-40r0,104r-22,0xm109,-14v83,-1,82,-157,0,-158v-89,1,-89,157,0,158",
            "w": 206
        },
        "\u00f9": {
            "d": "172,-186r0,186r-21,0v-1,-10,2,-25,-1,-33v-24,60,-129,49,-129,-32r0,-121r23,0v8,67,-28,174,50,172v72,-3,52,-100,55,-172r23,0xm99,-212r-48,-50r28,0r38,50r-18,0",
            "w": 193
        },
        "\u00fa": {
            "d": "172,-186r0,186r-21,0v-1,-10,2,-25,-1,-33v-24,60,-129,49,-129,-32r0,-121r23,0v8,67,-28,174,50,172v72,-3,52,-100,55,-172r23,0xm152,-263r-48,51r-18,0r38,-51r28,0",
            "w": 193
        },
        "\u00fb": {
            "d": "172,-186r0,186r-21,0v-1,-10,2,-25,-1,-33v-24,60,-129,49,-129,-32r0,-121r23,0v8,67,-28,174,50,172v72,-3,52,-100,55,-172r23,0xm109,-263r41,51r-23,0r-31,-37r-32,37r-21,0r41,-51r25,0",
            "w": 193
        },
        "\u0169": {
            "d": "172,-186r0,186r-21,0v-1,-10,2,-25,-1,-33v-24,60,-129,49,-129,-32r0,-121r23,0v8,67,-28,174,50,172v72,-3,52,-100,55,-172r23,0xm140,-256r13,0v-3,16,-12,35,-31,35v-28,-1,-57,-37,-68,1r-14,0v2,-17,13,-34,32,-34v30,0,57,34,68,-2",
            "w": 193
        },
        "\u00fc": {
            "d": "172,-186r0,186r-21,0v-1,-10,2,-25,-1,-33v-24,60,-129,49,-129,-32r0,-121r23,0v8,67,-28,174,50,172v72,-3,52,-100,55,-172r23,0xm77,-220r-24,0r0,-36r24,0r0,36xm141,-220r-25,0r0,-36r25,0r0,36",
            "w": 193
        },
        "\u016b": {
            "d": "172,-186r0,186r-21,0v-1,-10,2,-25,-1,-33v-24,60,-129,49,-129,-32r0,-121r23,0v8,67,-28,174,50,172v72,-3,52,-100,55,-172r23,0xm157,-230r-119,0r0,-16r119,0r0,16",
            "w": 193
        },
        "\u016d": {
            "d": "172,-186r0,186r-21,0v-1,-10,2,-25,-1,-33v-24,60,-129,49,-129,-32r0,-121r23,0v8,67,-28,174,50,172v72,-3,52,-100,55,-172r23,0xm46,-261r14,0v3,40,71,39,75,0r14,0v-4,28,-23,46,-52,46v-29,0,-48,-17,-51,-46",
            "w": 193
        },
        "\u016f": {
            "d": "172,-186r0,186r-21,0v-1,-10,2,-25,-1,-33v-24,60,-129,49,-129,-32r0,-121r23,0v8,67,-28,174,50,172v72,-3,52,-100,55,-172r23,0xm73,-245v0,14,10,25,24,25v14,0,25,-11,25,-25v0,-14,-11,-24,-25,-24v-14,0,-24,10,-24,24xm59,-245v0,-21,17,-38,38,-38v21,0,39,17,39,38v0,21,-18,39,-39,39v-21,0,-38,-18,-38,-39",
            "w": 193
        },
        "\u0171": {
            "d": "172,-186r0,186r-21,0v-1,-10,2,-25,-1,-33v-24,60,-129,49,-129,-32r0,-121r23,0v8,67,-28,174,50,172v72,-3,52,-100,55,-172r23,0xm133,-212r-18,0r36,-51r28,0xm77,-212r-18,0r36,-51r27,0",
            "w": 193
        },
        "\u0173": {
            "d": "172,0r-7,0v-27,22,-30,31,-30,42v1,25,31,19,36,2r10,5v-11,36,-68,30,-68,-5v0,-7,1,-22,38,-44v-1,-10,2,-25,-1,-33v-24,60,-129,49,-129,-32r0,-121r23,0v8,67,-28,174,50,172v72,-3,52,-100,55,-172r23,0r0,186",
            "w": 193
        },
        "\u0175": {
            "d": "63,0r-60,-186r24,0r48,159r46,-159r25,0r46,159r48,-159r24,0r-60,186r-25,0r-46,-156r-46,156r-24,0xm146,-263r41,51r-24,0r-31,-37r-31,37r-21,0r41,-51r25,0",
            "w": 266,
            "k": {
                ".": 20,
                "\u2026": 20,
                ",": 20
            }
        },
        "\u00fd": {
            "d": "75,-1r-74,-185r24,0r61,159r57,-159r23,0r-81,214v-13,37,-29,45,-66,39r0,-19v37,12,47,-21,56,-49xm142,-263r-48,51r-18,0r38,-51r28,0",
            "w": 166
        },
        "\u0177": {
            "d": "75,-1r-74,-185r24,0r61,159r57,-159r23,0r-81,214v-13,37,-29,45,-66,39r0,-19v37,12,47,-21,56,-49xm98,-263r41,51r-23,0r-31,-37r-32,37r-21,0r41,-51r25,0",
            "w": 166
        },
        "\u00ff": {
            "d": "75,-1r-74,-185r24,0r61,159r57,-159r23,0r-81,214v-13,37,-29,45,-66,39r0,-19v37,12,47,-21,56,-49xm67,-220r-25,0r0,-36r25,0r0,36xm130,-220r-24,0r0,-36r24,0r0,36",
            "w": 166
        },
        "\u017a": {
            "d": "156,-170r-123,151r128,0r0,19r-156,0r0,-18r122,-149r-113,0r0,-19r142,0r0,16xm138,-263r-47,51r-19,0r38,-51r28,0",
            "w": 166
        },
        "\u017e": {
            "d": "156,-170r-123,151r128,0r0,19r-156,0r0,-18r122,-149r-113,0r0,-19r142,0r0,16xm71,-212r-41,-51r23,0r31,37r32,-37r21,0r-41,51r-25,0",
            "w": 166
        },
        "\u017c": {
            "d": "156,-170r-123,151r128,0r0,19r-156,0r0,-18r122,-149r-113,0r0,-19r142,0r0,16xm96,-220r-24,0r0,-36r24,0r0,36",
            "w": 166
        },
        "\ue300": {
            "d": "36,-280r-47,-51r28,0r38,51r-19,0"
        },
        "\u00b4": {
            "d": "78,-263r-48,51r-18,0r38,-51r28,0"
        },
        "\ue301": {
            "d": "78,-331r-48,51r-18,0r38,-51r28,0"
        },
        "\u02c6": {
            "d": "47,-263r41,51r-24,0r-31,-37r-31,37r-21,0r41,-51r25,0"
        },
        "\ue302": {
            "d": "47,-331r41,51r-24,0r-31,-37r-31,37r-21,0r41,-51r25,0"
        },
        "\u02c7": {
            "d": "19,-212r-41,-51r24,0r31,37r31,-37r21,0r-41,51r-25,0"
        },
        "\ue303": {
            "d": "19,-280r-41,-51r24,0r31,37r31,-37r21,0r-41,51r-25,0"
        },
        "\ue30b": {
            "d": "80,-257r-31,51r-17,0r19,-51r29,0"
        },
        "\u02dc": {
            "d": "76,-256r14,0v-3,16,-13,35,-32,35v-28,-1,-56,-37,-67,1r-14,0v2,-17,13,-34,32,-34v30,0,56,34,67,-2"
        },
        "\ue304": {
            "d": "76,-256r14,0v-3,16,-13,35,-32,35v-28,-1,-56,-37,-67,1r-14,0v2,-17,13,-34,32,-34v30,0,56,34,67,-2"
        },
        "\u00a8": {
            "d": "14,-220r-25,0r0,-36r25,0r0,36xm77,-220r-24,0r0,-36r24,0r0,36"
        },
        "\ue305": {
            "d": "14,-288r-25,0r0,-36r25,0r0,36xm77,-288r-24,0r0,-36r24,0r0,36"
        },
        "\u00af": {
            "d": "93,-230r-119,0r0,-16r119,0r0,16"
        },
        "\ue306": {
            "d": "93,-298r-119,0r0,-16r119,0r0,16"
        },
        "\u02c9": {
            "d": "93,-230r-119,0r0,-16r119,0r0,16"
        },
        "\u02d8": {
            "d": "-18,-261r14,0v3,40,71,39,75,0r14,0v-4,28,-23,46,-52,46v-29,0,-48,-17,-51,-46"
        },
        "\ue307": {
            "d": "-18,-329r14,0v3,39,71,38,75,0r14,0v-4,28,-23,46,-52,46v-29,0,-48,-17,-51,-46"
        },
        "\u02da": {
            "d": "9,-245v0,14,10,25,24,25v14,0,25,-11,25,-25v0,-14,-11,-24,-25,-24v-14,0,-24,10,-24,24xm-5,-245v0,-21,17,-38,38,-38v21,0,39,17,39,38v0,21,-18,39,-39,39v-21,0,-38,-18,-38,-39"
        },
        "\ue308": {
            "d": "9,-310v0,14,10,25,24,25v14,0,25,-11,25,-25v0,-14,-11,-24,-25,-24v-14,0,-24,10,-24,24xm-5,-310v0,-21,17,-38,38,-38v21,0,39,17,39,38v0,21,-18,39,-39,39v-21,0,-38,-18,-38,-39"
        },
        "\u02dd": {
            "d": "63,-212r-19,0r37,-51r27,0xm6,-212r-18,0r36,-51r28,0"
        },
        "\ue309": {
            "d": "63,-282r-19,0r37,-50r27,0xm6,-282r-18,0r36,-50r28,0"
        },
        "\u02d9": {
            "d": "46,-220r-25,0r0,-36r25,0r0,36"
        },
        "\ue30a": {
            "d": "46,-288r-25,0r0,-36r25,0r0,36"
        },
        "\u00b8": {
            "d": "11,27v11,-9,12,-29,34,-27r-15,19v22,-3,41,-1,41,23v0,35,-47,36,-73,24r5,-12v13,5,47,12,47,-10v0,-24,-33,-5,-39,-17"
        },
        "\u02db": {
            "d": "54,0r14,0v-27,22,-29,31,-29,42v1,26,30,18,35,2r11,5v-11,35,-69,30,-68,-5v0,-7,0,-22,37,-44"
        },
        "\ue30c": {
            "d": "35,18r31,0v2,31,-1,57,-31,55r0,-10v10,-2,13,-6,14,-12r-14,0r0,-33",
            "w": 100
        },
        "\ue30d": {
            "d": "65,-224r-31,0v-2,-31,1,-57,31,-55r0,10v-10,2,-13,6,-14,12r14,0r0,33",
            "w": 100
        },
        "\u2026": {
            "d": "315,0r-30,0r0,-38r30,0r0,38xm195,0r-30,0r0,-38r30,0r0,38xm75,0r-30,0r0,-38r30,0r0,38",
            "w": 360
        },
        "\u00ad": {
            "d": "112,-89r-90,0r0,-20r90,0r0,20",
            "w": 133
        },
        "\u00a1": {
            "d": "28,-186r31,0r0,38r-31,0r0,-38xm50,-122r6,117r0,74r-25,0r0,-74r6,-117r13,0",
            "w": 86
        },
        "\u00bf": {
            "d": "111,-186r0,38r-31,0r0,-38r31,0xm107,-124v11,65,-65,74,-65,130v0,29,24,49,52,49v39,0,59,-28,58,-65r22,0v0,51,-29,84,-81,84v-40,0,-74,-24,-74,-66v0,-61,78,-69,65,-132r23,0",
            "w": 193
        },
        "\u2018": {
            "d": "64,-170r-30,0v-1,-41,-2,-77,32,-87r0,15v-12,5,-18,22,-17,34r15,0r0,38",
            "w": 100,
            "k": {
                "\u2018": 43
            }
        },
        "\u2019": {
            "d": "36,-257r30,0v1,41,2,77,-32,87r0,-15v12,-4,18,-23,17,-34r-15,0r0,-38",
            "w": 100,
            "k": {
                "\u2019": 43,
                "s": 40,
                "\u015b": 40,
                "\u015d": 40,
                "\u0161": 40,
                "\u015f": 40,
                "\u0219": 40,
                "t": 6,
                "\u0165": 6,
                "\u0163": 6,
                "\u021b": 6
            }
        },
        "\u201c": {
            "d": "53,-170r-30,0v-1,-41,-2,-77,32,-87r0,15v-12,5,-18,22,-17,34r15,0r0,38xm109,-170r-31,0v-1,-42,-2,-76,33,-87r0,15v-12,5,-18,22,-17,34r15,0r0,38",
            "w": 133
        },
        "\u201d": {
            "d": "24,-257r31,0v1,41,2,77,-32,87r0,-15v12,-4,18,-23,17,-34r-16,0r0,-38xm80,-257r30,0v1,41,2,77,-32,87r0,-15v12,-4,18,-23,17,-34r-15,0r0,-38",
            "w": 133
        },
        "\u201a": {
            "d": "36,-38r30,0v1,41,2,77,-32,87r0,-15v12,-4,18,-23,17,-34r-15,0r0,-38",
            "w": 100
        },
        "\u201e": {
            "d": "24,-38r31,0v1,41,2,77,-32,87r0,-15v12,-4,18,-23,17,-34r-16,0r0,-38xm80,-38r30,0v1,41,2,77,-32,87r0,-15v12,-4,18,-23,17,-34r-15,0r0,-38",
            "w": 133
        },
        "\u2039": {
            "d": "67,-43r-48,-45r0,-22r48,-45r0,24r-34,32r34,32r0,24",
            "w": 93
        },
        "\u203a": {
            "d": "26,-43r0,-24r34,-32r-34,-32r0,-24r48,45r0,22",
            "w": 93
        },
        "\u00ab": {
            "d": "69,-43r-47,-45r0,-22r47,-45r0,24r-33,32r33,32r0,24xm127,-43r-47,-45r0,-22r47,-45r0,24r-33,32r33,32r0,24",
            "w": 153
        },
        "\u00bb": {
            "d": "26,-43r0,-24r34,-32r-34,-32r0,-24r48,45r0,22xm84,-43r0,-24r34,-32r-34,-32r0,-24r48,45r0,22",
            "w": 153
        },
        "\u2013": {
            "d": "180,-89r-180,0r0,-20r180,0r0,20",
            "w": 180
        },
        "\u2014": {
            "d": "313,-89r-266,0r0,-20r266,0r0,20",
            "w": 360
        },
        "\u2022": {
            "d": "26,-129v0,-36,28,-64,64,-64v36,0,64,28,64,64v0,36,-28,65,-64,65v-36,0,-64,-29,-64,-65",
            "w": 180
        },
        "\u00b7": {
            "d": "50,-135v12,0,21,10,21,22v0,11,-10,20,-21,20v-12,0,-21,-9,-21,-21v0,-11,10,-21,21,-21",
            "w": 100
        },
        "\u2219": {
            "d": "50,-135v12,0,21,10,21,22v0,11,-10,20,-21,20v-12,0,-21,-9,-21,-21v0,-11,10,-21,21,-21",
            "w": 100
        },
        "\u2020": {
            "d": "89,-158r-72,0r0,-19r72,0r0,-80r22,0r0,80r72,0r0,19r-72,0r0,212r-22,0r0,-212",
            "w": 200
        },
        "\u2021": {
            "d": "89,-17r-72,0r0,-19r72,0r0,-131r-72,0r0,-19r72,0r0,-71r22,0r0,71r72,0r0,19r-72,0r0,131r72,0r0,19r-72,0r0,71r-22,0r0,-71",
            "w": 200
        },
        "\u00a7": {
            "d": "184,-83v0,24,-18,41,-39,50v40,32,6,91,-43,91v-41,0,-67,-23,-67,-64r23,0v-1,24,17,45,42,45v20,0,40,-9,40,-32v0,-54,-124,-57,-124,-128v0,-24,18,-42,39,-51v-40,-32,-7,-90,43,-90v41,0,67,22,67,63r-23,0v1,-24,-17,-44,-42,-44v-20,0,-40,9,-40,32v0,54,124,57,124,128xm161,-83v0,-38,-62,-57,-93,-78v-17,7,-29,19,-29,39v0,36,61,57,92,78v17,-7,30,-19,30,-39",
            "w": 200
        },
        "\u00b6": {
            "d": "98,64r0,-182v-42,0,-74,-31,-74,-68v0,-46,29,-71,80,-71r83,0r0,321r-23,0r0,-302r-43,0r0,302r-23,0",
            "w": 216
        },
        "\u00a6": {
            "d": "31,-148r0,-90r19,0r0,90r-19,0xm31,32r0,-90r19,0r0,90r-19,0",
            "w": 79
        },
        "\u00a9": {
            "d": "214,-157r-19,0v-18,-68,-107,-36,-107,28v0,37,21,67,60,67v26,0,43,-16,47,-38r19,0v-5,35,-33,54,-67,54v-49,0,-78,-35,-78,-83v0,-89,132,-114,145,-28xm257,-129v0,-64,-49,-114,-113,-114v-65,0,-113,50,-113,114v0,64,48,115,113,115v64,0,113,-51,113,-115xm278,-129v0,75,-58,134,-134,134v-76,0,-134,-59,-134,-134v0,-75,58,-133,134,-133v76,0,134,58,134,133",
            "w": 288
        },
        "\u00ae": {
            "d": "114,-136v32,-1,72,8,72,-27v0,-34,-40,-26,-72,-27r0,54xm114,-120r0,69r-19,0r0,-155v49,0,110,-8,110,43v0,27,-18,39,-39,43r46,69r-22,0r-43,-69r-33,0xm144,-243v-65,0,-113,50,-113,114v0,64,48,115,113,115v64,0,113,-51,113,-115v0,-64,-49,-114,-113,-114xm144,-262v76,0,134,58,134,133v0,75,-58,134,-134,134v-76,0,-134,-59,-134,-134v0,-75,58,-133,134,-133",
            "w": 288
        },
        "\u2122": {
            "d": "190,-109r-19,0r0,-148r31,0r48,120r46,-120r31,0r0,148r-19,0r-1,-131r-52,131r-11,0r-54,-131r0,131xm97,-109r-19,0r0,-132r-48,0r0,-16r115,0r0,16r-48,0r0,132",
            "w": 356
        },
        "\u00a4": {
            "d": "34,-125v0,39,29,69,66,69v37,0,67,-30,67,-69v0,-39,-30,-68,-67,-68v-37,0,-66,29,-66,68xm10,-49r21,-20v-26,-29,-27,-82,0,-111r-21,-20r14,-14r20,20v29,-26,83,-27,112,0r19,-20r14,14r-19,19v27,29,26,84,0,113r19,19r-14,14r-19,-20v-28,26,-84,27,-112,0r-20,20",
            "w": 200
        },
        "\u20ac": {
            "d": "30,-156v8,-57,44,-100,104,-100v30,0,52,9,67,27r-10,22v-27,-36,-83,-39,-112,-5v-12,14,-21,33,-25,56r120,0r-6,16r-116,0r-1,21r110,0r-7,16r-101,0v4,49,31,88,79,88v31,-1,44,-13,63,-31r0,28v-68,55,-166,2,-166,-85r-24,0r7,-16r16,0r0,-21r-23,0r7,-16r18,0",
            "w": 200
        },
        "\u00a2": {
            "d": "183,-127r-23,0v-6,-27,-22,-44,-49,-45r0,158v26,-1,47,-24,50,-53r23,0v-6,44,-34,71,-73,72r0,37r-14,0r0,-37v-50,-5,-78,-48,-78,-98v0,-50,28,-92,78,-97r0,-32r14,0r0,31v37,1,67,23,72,64xm97,-14r0,-157v-74,12,-73,145,0,157",
            "w": 200
        },
        "\u00a3": {
            "d": "39,-18v47,-30,110,30,145,-16r11,17v-41,53,-120,-18,-167,22r-13,-19v32,-24,55,-62,31,-105r-29,0r0,-11r22,0v-11,-18,-20,-36,-20,-58v0,-51,42,-74,83,-74v53,0,84,32,83,85r-23,0v0,-39,-20,-66,-60,-66v-30,0,-60,17,-60,56v0,25,12,36,21,57r58,0r0,11r-51,0v20,40,-1,81,-31,101",
            "w": 200
        },
        "\u0192": {
            "d": "3,60r3,-19v32,10,47,-14,52,-38r27,-142r-36,0r3,-19r36,0v9,-52,17,-112,88,-97r-4,18v-52,-10,-52,40,-61,79r41,0r-4,19r-40,0r-22,116v-7,48,-20,96,-83,83",
            "w": 200
        },
        "\u00a5": {
            "d": "40,-109r0,-17r38,0r-76,-131r26,0r72,131r72,-131r25,0r-76,131r39,0r0,17v-16,2,-39,-4,-49,3r0,26r49,0r0,17r-49,0r0,63r-23,0r0,-63r-48,0r0,-17r48,0v-1,-9,2,-23,-2,-29r-46,0",
            "w": 200
        },
        "\u00aa": {
            "d": "19,-215r-16,0v1,-28,21,-39,50,-39v24,0,46,6,46,36r0,62v0,7,8,10,14,7r0,12v-17,4,-28,-4,-28,-19v-15,33,-87,34,-87,-11v0,-33,33,-35,65,-38v13,-1,19,-3,19,-11v0,-19,-15,-24,-32,-24v-17,0,-31,8,-31,25xm82,-198v-21,12,-71,5,-67,30v6,37,69,20,67,-13r0,-17",
            "w": 111
        },
        "\u00ba": {
            "d": "60,-147v56,0,56,-93,0,-93v-56,0,-56,93,0,93xm58,-132v-37,0,-57,-27,-57,-61v0,-34,20,-61,57,-61v41,0,61,27,61,61v0,34,-20,61,-61,61",
            "w": 120
        },
        "\u00b9": {
            "d": "13,-210r0,-14v26,-1,41,-2,46,-27r14,0r0,152r-17,0r0,-111r-43,0",
            "w": 119
        },
        "\u00b2": {
            "d": "5,-99v0,-61,93,-55,93,-112v0,-19,-17,-29,-37,-29v-26,0,-35,20,-35,41r-17,0v-1,-33,17,-55,54,-55v30,0,52,14,52,45v0,53,-73,52,-90,96r89,0r0,14r-109,0",
            "w": 119
        },
        "\u00b3": {
            "d": "49,-172r0,-14v23,2,46,-5,46,-27v0,-19,-17,-27,-36,-27v-23,0,-36,15,-36,37r-17,0v0,-30,20,-51,53,-51v27,0,53,12,53,40v1,18,-12,28,-28,34v22,3,34,17,34,37v0,31,-26,48,-58,48v-36,0,-60,-19,-57,-53r17,0v-1,23,13,39,39,39v21,0,42,-12,42,-33v0,-24,-24,-32,-52,-30",
            "w": 119
        },
        "\u2044": {
            "d": "-60,12r163,-273r17,0r-162,273r-18,0",
            "w": 60
        },
        "\u2215": {
            "d": "-60,12r163,-273r17,0r-162,273r-18,0",
            "w": 60
        },
        "\u00bc": {
            "d": "231,-128v-22,24,-39,53,-59,78r59,0r0,-78xm231,0r0,-36r-75,0r0,-14r76,-102r16,0r0,102r25,0r0,14r-25,0r0,36r-17,0xm17,-210r0,-14v26,-1,41,-2,46,-27r15,0r0,152r-17,0r0,-111r-44,0xm48,12r163,-273r17,0r-163,273r-17,0",
            "w": 300
        },
        "\u00bd": {
            "d": "173,0v0,-61,93,-55,93,-112v0,-19,-17,-29,-37,-29v-26,0,-36,20,-36,41r-17,0v-1,-33,17,-56,54,-56v30,0,53,14,53,45v0,53,-74,53,-91,97r90,0r0,14r-109,0xm17,-210r0,-14v26,-1,41,-2,46,-27r15,0r0,152r-17,0r0,-111r-44,0xm48,12r163,-273r17,0r-163,273r-17,0",
            "w": 300
        },
        "\u00be": {
            "d": "231,-128v-22,24,-39,53,-59,78r59,0r0,-78xm231,0r0,-36r-75,0r0,-14r76,-102r16,0r0,102r25,0r0,14r-25,0r0,36r-17,0xm62,12r163,-273r17,0r-162,273r-18,0xm49,-172r0,-14v23,2,46,-5,46,-27v0,-19,-17,-27,-36,-27v-23,0,-36,15,-36,37r-17,0v0,-30,20,-51,53,-51v27,0,53,12,53,40v1,18,-12,28,-28,34v22,3,34,17,34,37v0,31,-26,48,-58,48v-36,0,-60,-19,-57,-53r17,0v-1,23,13,39,39,39v21,0,42,-12,42,-33v0,-24,-24,-32,-52,-30",
            "w": 300
        },
        "\u2030": {
            "d": "77,-238v-29,0,-35,24,-35,45v0,21,6,44,35,44v50,-1,48,-87,0,-89xm77,-254v39,0,54,26,54,61v0,35,-15,61,-54,61v-39,0,-54,-26,-54,-61v0,-35,15,-61,54,-61xm324,-100v-29,0,-34,24,-34,45v0,21,5,44,34,44v50,-1,48,-87,0,-89xm324,-116v39,0,54,26,54,61v0,35,-15,60,-54,60v-39,0,-53,-25,-53,-60v0,-35,14,-61,53,-61xm197,-100v-29,0,-35,24,-35,45v0,21,6,44,35,44v49,-1,47,-88,0,-89xm197,-116v39,0,54,26,54,61v0,35,-15,60,-54,60v-39,0,-54,-25,-54,-60v0,-35,15,-61,54,-61xm46,12r164,-273r16,0r-162,273r-18,0",
            "w": 399
        },
        "\u2212": {
            "d": "199,-100r0,19r-181,0r0,-19r181,0",
            "w": 216
        },
        "\u00b1": {
            "d": "18,0r0,-19r181,0r0,19r-181,0xm99,-116r0,-65r19,0r0,65r81,0r0,19r-81,0r0,65r-19,0r0,-65r-81,0r0,-19r81,0",
            "w": 216
        },
        "\u00d7": {
            "d": "94,-90r-67,-68r13,-14r68,68r68,-68r13,14r-68,68r68,68r-13,13r-68,-68r-68,68r-13,-13",
            "w": 216
        },
        "\u00f7": {
            "d": "88,-18v0,-11,9,-20,20,-20v11,0,20,9,20,20v0,10,-10,20,-20,20v-11,0,-20,-9,-20,-20xm88,-163v0,-11,9,-20,20,-20v11,0,20,9,20,20v0,10,-10,20,-20,20v-11,0,-20,-9,-20,-20xm199,-81r-181,0r0,-19r181,0r0,19",
            "w": 216
        },
        "\u2260": {
            "d": "198,-41r-103,0r-28,53r-22,-12r21,-41r-51,0r0,-26r65,0r24,-46r-89,0r0,-25r102,0r28,-54r22,12r-22,42r53,0r0,25r-66,0r-24,46r90,0r0,26",
            "w": 213
        },
        "\u2248": {
            "d": "184,-84r18,0v-3,27,-16,52,-47,52v-45,1,-112,-58,-125,2r-18,0v4,-26,15,-53,46,-53v42,0,111,56,126,-1xm184,-149r18,0v-3,27,-16,52,-47,52v-45,1,-110,-56,-125,2r-18,0v3,-26,15,-53,46,-53v42,-1,112,58,126,-1",
            "w": 213
        },
        "\u2264": {
            "d": "198,11r-183,0r0,-26r183,0r0,26xm198,-30r-183,-66r0,-27r183,-67r0,28r-147,53r147,52r0,27",
            "w": 213
        },
        "\u2265": {
            "d": "198,11r-183,0r0,-26r183,0r0,26xm198,-96r-183,66r0,-27r147,-52r-147,-53r0,-28r183,67r0,27",
            "w": 213
        },
        "\u00ac": {
            "d": "180,-40r0,-77r-162,0r0,-19r181,0r0,96r-19,0",
            "w": 216
        },
        "\u2206": {
            "d": "198,-26r-78,-200r-77,200r155,0xm238,0r-233,0r100,-256r30,0",
            "w": 242
        },
        "\u0394": {
            "d": "198,-26r-78,-200r-77,200r155,0xm238,0r-233,0r100,-256r30,0",
            "w": 242
        },
        "\u2126": {
            "d": "248,0r-92,0r0,-66v42,-8,63,-40,63,-82v0,-50,-37,-86,-87,-86v-97,0,-119,154,-23,168r0,66r-92,0r0,-24r69,0r0,-26v-45,-12,-69,-54,-69,-99v0,-65,52,-111,115,-111v63,0,116,46,116,111v0,46,-24,86,-69,99r0,26r69,0r0,24",
            "w": 269
        },
        "\u03a9": {
            "d": "248,0r-92,0r0,-66v42,-8,63,-40,63,-82v0,-50,-37,-86,-87,-86v-97,0,-119,154,-23,168r0,66r-92,0r0,-24r69,0r0,-26v-45,-12,-69,-54,-69,-99v0,-65,52,-111,115,-111v63,0,116,46,116,111v0,46,-24,86,-69,99r0,26r69,0r0,24",
            "w": 269
        },
        "\u00b5": {
            "d": "172,-186r0,186r-21,0v-1,-10,2,-25,-1,-33v-17,38,-69,50,-106,26r0,76r-23,0r0,-255r23,0v8,67,-28,174,50,172v72,-3,52,-100,55,-172r23,0",
            "w": 193
        },
        "\u03bc": {
            "d": "172,-186r0,186r-21,0v-1,-10,2,-25,-1,-33v-17,38,-69,50,-106,26r0,76r-23,0r0,-255r23,0v8,67,-28,174,50,172v72,-3,52,-100,55,-172r23,0",
            "w": 193
        },
        "\u03c0": {
            "d": "197,-24r0,20v-8,4,-15,6,-25,6v-29,0,-31,-20,-31,-43r0,-107r-88,0r0,148r-27,0r0,-148r-25,0r0,-24r194,0r0,24r-27,0r0,108v-4,17,15,24,29,16",
            "w": 205
        },
        "\u00b0": {
            "d": "34,-202v0,21,17,37,38,37v21,0,38,-16,38,-37v0,-21,-17,-38,-38,-38v-21,0,-38,17,-38,38xm20,-202v0,-28,23,-52,52,-52v28,0,52,24,52,52v0,29,-24,52,-52,52v-29,0,-52,-23,-52,-52",
            "w": 144
        },
        "\u2113": {
            "d": "146,-14v-28,30,-86,27,-86,-26r0,-46v-8,7,-13,17,-22,23r-7,-10r29,-30v0,-60,-10,-159,43,-157v21,0,35,17,35,45v0,35,-22,74,-60,115v-1,36,-5,97,29,91v11,1,21,-6,32,-14xm123,-213v0,-19,-10,-33,-21,-33v-33,0,-23,88,-24,129v28,-33,45,-68,45,-96",
            "w": 180
        },
        "\u212e": {
            "d": "202,-93r-145,0r0,65v37,35,97,26,121,-22r13,8v-42,86,-175,47,-175,-51v0,-56,36,-100,93,-100v55,0,93,42,93,100xm57,-106r104,0r0,-52v-28,-28,-78,-30,-104,0r0,52",
            "w": 216
        },
        "\u221e": {
            "d": "121,-90v-18,-25,-79,-55,-82,-1v2,51,65,27,82,1xm235,-91v0,-18,-11,-32,-30,-32v-20,0,-39,20,-53,33v19,26,83,49,83,-1xm258,-92v0,32,-20,57,-53,57v-27,0,-50,-21,-68,-40v-21,18,-40,39,-69,39v-32,0,-53,-23,-53,-55v0,-31,19,-56,52,-56v29,0,51,22,70,41v19,-19,39,-42,68,-42v32,0,53,25,53,56",
            "w": 273
        },
        "\u2202": {
            "d": "140,-101v-13,-17,-31,-30,-53,-30v-32,0,-48,26,-48,55v0,28,15,59,47,59v40,0,54,-52,54,-84xm169,-130v0,55,-13,134,-84,134v-45,0,-73,-38,-73,-81v0,-70,90,-104,129,-49v4,-49,-8,-108,-61,-111v-16,0,-28,7,-41,17r-16,-18v16,-14,33,-22,55,-22v71,0,91,72,91,130",
            "w": 183
        },
        "\u222b": {
            "d": "123,-283v23,-6,41,32,13,34v-12,0,-14,-16,-20,-16v-18,8,-11,47,-11,65r0,184v0,33,3,93,-45,93v-21,4,-37,-32,-11,-32v11,0,13,15,18,15v14,-5,9,-51,10,-62r0,-178v0,-35,-7,-103,46,-103",
            "w": 199
        },
        "\u221a": {
            "d": "185,-283r-76,360r-27,0r-58,-120r-17,8r-10,-22r40,-19r54,115r67,-322r27,0",
            "w": 181
        },
        "\u2211": {
            "d": "212,77r-203,0r0,-23r116,-158r-111,-156r0,-23r194,0r0,26r-158,0r109,153r-115,155r168,0r0,26",
            "w": 221
        },
        "\u220f": {
            "d": "234,77r-28,0r0,-334r-153,0r0,334r-29,0r0,-360r210,0r0,360",
            "w": 258
        },
        "\u25ca": {
            "d": "154,-128r-47,-114r-48,114r48,113xm181,-128r-61,141r-26,0r-62,-141r62,-141r26,0",
            "w": 213
        },
        "\uf8ff": {
            "d": "80,-42r20,0r0,-24r-20,0r0,24xm120,-171v0,26,-51,44,-39,87r17,0v-9,-45,40,-55,40,-88v0,-28,-19,-47,-45,-47v-26,0,-45,15,-48,49r18,3v1,-46,57,-42,57,-4xm166,-18r-148,0r0,-222r148,0r0,222xm184,-258r-184,0r0,258r184,0r0,-258",
            "w": 184
        }
    }
});;
function checkIE() {
    return (/MSIE (\d+\.\d+);/.test(navigator.userAgent))
}
var _isie = checkIE();
function checkIEversion() {
    return parseFloat(navigator.userAgent.substring(navigator.userAgent.indexOf("MSIE") + 5));
}
var _isie7 = _isie && checkIEversion() == 7 ? true: false;
var _isie8 = _isie && checkIEversion() == 8 ? true: false;
(function($) {
    $.InFieldLabels = function(b, c, d) {
        var f = this;
        f.$label = $(b);
        f.label = b;
        f.$field = $(c);
        f.field = c;
        f.$label.data("InFieldLabels", f);
        f.showing = true;
        f.init = function() {
            f.options = $.extend({},
            $.InFieldLabels.defaultOptions, d);
            if (f.$field.val() != "") {
                f.$label.hide();
                f.showing = false
            };
            f.$field.focus(function() {
                f.fadeOnFocus()
            }).blur(function() {
                f.checkForEmpty(true)
            }).bind('keydown.infieldlabel',
            function(e) {
                f.hideOnChange(e)
            }).change(function(e) {
                f.checkForEmpty()
            }).bind('onPropertyChange',
            function() {
                f.checkForEmpty()
            })
        };
        f.fadeOnFocus = function() {
            if (f.showing) {
                f.setOpacity(f.options.fadeOpacity)
            }
        };
        f.setOpacity = function(a) {
            f.$label.stop().animate({
                opacity: a
            },
            f.options.fadeDuration);
            f.showing = (a > 0.0)
        };
        f.checkForEmpty = function(a) {
            if (f.$field.val() == "") {
                f.prepForShow();
                f.setOpacity(a ? 1.0 : f.options.fadeOpacity)
            } else {
                f.setOpacity(0.0)
            }
        };
        f.prepForShow = function(e) {
            if (!f.showing) {
                f.$label.css({
                    opacity: 0.0
                }).show();
                f.$field.bind('keydown.infieldlabel',
                function(e) {
                    f.hideOnChange(e)
                })
            }
        };
        f.hideOnChange = function(e) {
            if ((e.keyCode == 16) || (e.keyCode == 9)) return;
            if (f.showing) {
                f.$label.hide();
                f.showing = false
            };
            f.$field.unbind('keydown.infieldlabel')
        };
        f.init()
    };
    $.InFieldLabels.defaultOptions = {
        fadeOpacity: 0.5,
        fadeDuration: 300
    };
    $.fn.inFieldLabels = function(c) {
        return this.each(function() {
            var a = $(this).attr('for');
            if (!a) return;
            var b = $("input#" + a + "[type='text']," + "input#" + a + "[type='password']," + "textarea#" + a);
            if (b.length == 0) return;
            (new $.InFieldLabels(this, b[0], c))
        })
    }
})(jQuery);
(function($, window, undefined) {
    '$:nomunge';
    var str_hashchange = 'hashchange',
    doc = document,
    fake_onhashchange, special = $.event.special,
    doc_mode = doc.documentMode,
    supports_onhashchange = 'on' + str_hashchange in window && (doc_mode === undefined || doc_mode > 7);
    function get_fragment(url) {
        url = url || location.href;
        return '#' + url.replace(/^[^#]*#?(.*)$/, '$1');
    };
    $.fn[str_hashchange] = function(fn) {
        return fn ? this.bind(str_hashchange, fn) : this.trigger(str_hashchange);
    };
    $.fn[str_hashchange].delay = 50;
    special[str_hashchange] = $.extend(special[str_hashchange], {
        setup: function() {
            if (supports_onhashchange) {
                return false;
            }
            $(fake_onhashchange.start);
        },
        teardown: function() {
            if (supports_onhashchange) {
                return false;
            }
            $(fake_onhashchange.stop);
        }
    });
    fake_onhashchange = (function() {
        var self = {},
        timeout_id, last_hash = get_fragment(),
        fn_retval = function(val) {
            return val;
        },
        history_set = fn_retval,
        history_get = fn_retval;
        self.start = function() {
            timeout_id || poll();
        };
        self.stop = function() {
            timeout_id && clearTimeout(timeout_id);
            timeout_id = undefined;
        };
        function poll() {
            var hash = get_fragment(),
            history_hash = history_get(last_hash);
            if (hash !== last_hash) {
                history_set(last_hash = hash, history_hash);
                $(window).trigger(str_hashchange);
            } else if (history_hash !== last_hash) {
                location.href = location.href.replace(/#.*/, '') + history_hash;
            }
            timeout_id = setTimeout(poll, $.fn[str_hashchange].delay);
        };
        $.browser.msie && !supports_onhashchange && (function() {
            var iframe, iframe_src;
            self.start = function() {
                if (!iframe) {
                    iframe_src = $.fn[str_hashchange].src;
                    iframe_src = iframe_src && iframe_src + get_fragment();
                    iframe = $('<iframe tabindex="-1" title="empty"/>').hide().one('load',
                    function() {
                        iframe_src || history_set(get_fragment());
                        poll();
                    }).attr('src', iframe_src || 'javascript:0').insertAfter('body')[0].contentWindow;
                    doc.onpropertychange = function() {
                        try {
                            if (event.propertyName === 'title') {
                                iframe.document.title = doc.title;
                            }
                        } catch(e) {}
                    };
                }
            };
            self.stop = fn_retval;
            history_get = function() {
                return get_fragment(iframe.location.href);
            };
            history_set = function(hash, history_hash) {
                var iframe_doc = iframe.document,
                domain = $.fn[str_hashchange].domain;
                if (hash !== history_hash) {
                    iframe_doc.title = doc.title;
                    iframe_doc.open();
                    domain && iframe_doc.write('<script>document.domain="' + domain + '"</script>');
                    iframe_doc.close();
                    iframe.location.hash = hash;
                }
            };
        })();
        return self;
    })();
})(jQuery, this);;
(function(d) {
    var k = d.scrollTo = function(a, i, e) {
        d(window).scrollTo(a, i, e)
    };
    k.defaults = {
        axis: 'xy',
        duration: parseFloat(d.fn.jquery) >= 1.3 ? 0 : 1
    };
    k.window = function(a) {
        return d(window)._scrollable()
    };
    d.fn._scrollable = function() {
        return this.map(function() {
            var a = this,
            i = !a.nodeName || d.inArray(a.nodeName.toLowerCase(), ['iframe', '#document', 'html', 'body']) != -1;
            if (!i) return a;
            var e = (a.contentWindow || a).document || a.ownerDocument || a;
            return d.browser.safari || e.compatMode == 'BackCompat' ? e.body: e.documentElement
        })
    };
    d.fn.scrollTo = function(n, j, b) {
        if (typeof j == 'object') {
            b = j;
            j = 0
        }
        if (typeof b == 'function') b = {
            onAfter: b
        };
        if (n == 'max') n = 9e9;
        b = d.extend({},
        k.defaults, b);
        j = j || b.speed || b.duration;
        b.queue = b.queue && b.axis.length > 1;
        if (b.queue) j /= 2;
        b.offset = p(b.offset);
        b.over = p(b.over);
        return this._scrollable().each(function() {
            var q = this,
            r = d(q),
            f = n,
            s,
            g = {},
            u = r.is('html,body');
            switch (typeof f) {
            case 'number':
            case 'string':
                if (/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(f)) {
                    f = p(f);
                    break
                }
                f = d(f, this);
            case 'object':
                if (f.is || f.style) s = (f = d(f)).offset()
            }
            d.each(b.axis.split(''),
            function(a, i) {
                var e = i == 'x' ? 'Left': 'Top',
                h = e.toLowerCase(),
                c = 'scroll' + e,
                l = q[c],
                m = k.max(q, i);
                if (s) {
                    g[c] = s[h] + (u ? 0 : l - r.offset()[h]);
                    if (b.margin) {
                        g[c] -= parseInt(f.css('margin' + e)) || 0;
                        g[c] -= parseInt(f.css('border' + e + 'Width')) || 0
                    }
                    g[c] += b.offset[h] || 0;
                    if (b.over[h]) g[c] += f[i == 'x' ? 'width': 'height']() * b.over[h]
                } else {
                    var o = f[h];
                    g[c] = o.slice && o.slice( - 1) == '%' ? parseFloat(o) / 100 * m: o
                }
                if (/^\d+$/.test(g[c])) g[c] = g[c] <= 0 ? 0 : Math.min(g[c], m);
                if (!a && b.queue) {
                    if (l != g[c]) t(b.onAfterFirst);
                    delete g[c]
                }
            });
            t(b.onAfter);
            function t(a) {
                r.animate(g, j, b.easing, a &&
                function() {
                    a.call(this, n, b)
                })
            }
        }).end()
    };
    k.max = function(a, i) {
        var e = i == 'x' ? 'Width': 'Height',
        h = 'scroll' + e;
        if (!d(a).is('html,body')) return a[h] - d(a)[e.toLowerCase()]();
        var c = 'client' + e,
        l = a.ownerDocument.documentElement,
        m = a.ownerDocument.body;
        return Math.max(l[h], m[h]) - Math.min(l[c], m[c])
    };
    function p(a) {
        return typeof a == 'object' ? a: {
            top: a,
            left: a
        }
    }
})(jQuery);;
(function(b) {
    var m, t, u, f, D, j, E, n, z, A, q = 0,
    e = {},
    o = [],
    p = 0,
    d = {},
    l = [],
    G = null,
    v = new Image,
    J = /\.(jpg|gif|png|bmp|jpeg)(.*)?$/i,
    W = /[^\.]\.(swf)\s*$/i,
    K,
    L = 1,
    y = 0,
    s = "",
    r,
    i,
    h = false,
    B = b.extend(b("<div/>")[0], {
        prop: 0
    }),
    M = b.browser.msie && b.browser.version < 7 && !window.XMLHttpRequest,
    N = function() {
        t.hide();
        v.onerror = v.onload = null;
        G && G.abort();
        m.empty()
    },
    O = function() {
        if (false === e.onError(o, q, e)) {
            t.hide();
            h = false
        } else {
            e.titleShow = false;
            e.width = "auto";
            e.height = "auto";
            m.html('<p id="fancybox-error">The requested content cannot be loaded.<br />Please try again later.</p>');
            F()
        }
    },
    I = function() {
        var a = o[q],
        c,
        g,
        k,
        C,
        P,
        w;
        N();
        e = b.extend({},
        b.fn.fancybox.defaults, typeof b(a).data("fancybox") == "undefined" ? e: b(a).data("fancybox"));
        w = e.onStart(o, q, e);
        if (w === false) h = false;
        else {
            if (typeof w == "object") e = b.extend(e, w);
            k = e.title || (a.nodeName ? b(a).attr("title") : a.title) || "";
            if (a.nodeName && !e.orig) e.orig = b(a).children("img:first").length ? b(a).children("img:first") : b(a);
            if (k === "" && e.orig && e.titleFromAlt) k = e.orig.attr("alt");
            c = e.href || (a.nodeName ? b(a).attr("href") : a.href) || null;
            if (/^(?:javascript)/i.test(c) || c == "#") c = null;
            if (e.type) {
                g = e.type;
                if (!c) c = e.content
            } else if (e.content) g = "html";
            else if (c) g = c.match(J) ? "image": c.match(W) ? "swf": b(a).hasClass("iframe") ? "iframe": c.indexOf("#") === 0 ? "inline": "ajax";
            if (g) {
                if (g == "inline") {
                    a = c.substr(c.indexOf("#"));
                    g = b(a).length > 0 ? "inline": "ajax"
                }
                e.type = g;
                e.href = c;
                e.title = k;
                if (e.autoDimensions) if (e.type == "html" || e.type == "inline" || e.type == "ajax") {
                    e.width = "auto";
                    e.height = "auto"
                } else e.autoDimensions = false;
                if (e.modal) {
                    e.overlayShow = true;
                    e.hideOnOverlayClick = false;
                    e.hideOnContentClick = false;
                    e.enableEscapeButton = false;
                    e.showCloseButton = false
                }
                e.padding = parseInt(e.padding, 10);
                e.margin = parseInt(e.margin, 10);
                m.css("padding", e.padding + e.margin);
                b(".fancybox-inline-tmp").unbind("fancybox-cancel").bind("fancybox-change",
                function() {
                    b(this).replaceWith(j.children())
                });
                switch (g) {
                case "html":
                    m.html(e.content);
                    F();
                    break;
                case "inline":
                    if (b(a).parent().is("#fancybox-content") === true) {
                        h = false;
                        break
                    }
                    b('<div class="fancybox-inline-tmp" />').hide().insertBefore(b(a)).bind("fancybox-cleanup",
                    function() {
                        b(this).replaceWith(j.children())
                    }).bind("fancybox-cancel",
                    function() {
                        b(this).replaceWith(m.children())
                    });
                    b(a).appendTo(m);
                    F();
                    break;
                case "image":
                    h = false;
                    b.fancybox.showActivity();
                    v = new Image;
                    v.onerror = function() {
                        O()
                    };
                    v.onload = function() {
                        h = true;
                        v.onerror = v.onload = null;
                        e.width = v.width;
                        e.height = v.height;
                        b("<img />").attr({
                            id: "fancybox-img",
                            src: v.src,
                            alt: e.title
                        }).appendTo(m);
                        Q()
                    };
                    v.src = c;
                    break;
                case "swf":
                    e.scrolling = "no";
                    C = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="' + e.width + '" height="' + e.height + '"><param name="movie" value="' + c + '"></param>';
                    P = "";
                    b.each(e.swf,
                    function(x, H) {
                        C += '<param name="' + x + '" value="' + H + '"></param>';
                        P += " " + x + '="' + H + '"'
                    });
                    C += '<embed src="' + c + '" type="application/x-shockwave-flash" width="' + e.width + '" height="' + e.height + '"' + P + "></embed></object>";
                    m.html(C);
                    F();
                    break;
                case "ajax":
                    h = false;
                    b.fancybox.showActivity();
                    e.ajax.win = e.ajax.success;
                    G = b.ajax(b.extend({},
                    e.ajax, {
                        url: c,
                        data: e.ajax.data || {},
                        error: function(x) {
                            x.status > 0 && O()
                        },
                        success: function(x, H, R) {
                            if ((typeof R == "object" ? R: G).status == 200) {
                                if (typeof e.ajax.win == "function") {
                                    w = e.ajax.win(c, x, H, R);
                                    if (w === false) {
                                        t.hide();
                                        return
                                    } else if (typeof w == "string" || typeof w == "object") x = w
                                }
                                m.html(x);
                                F()
                            }
                        }
                    }));
                    break;
                case "iframe":
                    Q()
                }
            } else O()
        }
    },
    F = function() {
        var a = e.width,
        c = e.height;
        a = a.toString().indexOf("%") > -1 ? parseInt((b(window).width() - e.margin * 2) * parseFloat(a) / 100, 10) + "px": a == "auto" ? "auto": a + "px";
        c = c.toString().indexOf("%") > -1 ? parseInt((b(window).height() - e.margin * 2) * parseFloat(c) / 100, 10) + "px": c == "auto" ? "auto": c + "px";
        m.wrapInner('<div style="width:' + a + ";height:" + c + ";overflow: " + (e.scrolling == "auto" ? "auto": e.scrolling == "yes" ? "scroll": "hidden") + ';position:relative;"></div>');
        e.width = m.width();
        e.height = m.height();
        Q()
    },
    Q = function() {
        var a, c;
        t.hide();
        if (f.is(":visible") && false === d.onCleanup(l, p, d)) {
            b.event.trigger("fancybox-cancel");
            h = false
        } else {
            h = true;
            b(j.add(u)).unbind();
            b(window).unbind("resize.fb scroll.fb");
            b(document).unbind("keydown.fb");
            f.is(":visible") && d.titlePosition !== "outside" && f.css("height", f.height());
            l = o;
            p = q;
            d = e;
            if (d.overlayShow) {
                u.css({
                    "background-color": d.overlayColor,
                    opacity: d.overlayOpacity,
                    cursor: d.hideOnOverlayClick ? "pointer": "auto",
                    height: b(document).height()
                });
                if (!u.is(":visible")) {
                    M && b("select:not(#fancybox-tmp select)").filter(function() {
                        return this.style.visibility !== "hidden"
                    }).css({
                        visibility: "hidden"
                    }).one("fancybox-cleanup",
                    function() {
                        this.style.visibility = "inherit"
                    });
                    u.show()
                }
            } else u.hide();
            i = X();
            s = d.title || "";
            y = 0;
            n.empty().removeAttr("style").removeClass();
            if (d.titleShow !== false) {
                if (b.isFunction(d.titleFormat)) a = d.titleFormat(s, l, p, d);
                else a = s && s.length ? d.titlePosition == "float" ? '<table id="fancybox-title-float-wrap" cellpadding="0" cellspacing="0"><tr><td id="fancybox-title-float-left"></td><td id="fancybox-title-float-main">' + s + '</td><td id="fancybox-title-float-right"></td></tr></table>': '<div id="fancybox-title-' + d.titlePosition + '">' + s + "</div>": false;
                s = a;
                if (! (!s || s === "")) {
                    n.addClass("fancybox-title-" + d.titlePosition).html(s).appendTo("body").show();
                    switch (d.titlePosition) {
                    case "inside":
                        n.css({
                            width:
                            i.width - d.padding * 2,
                            marginLeft: d.padding,
                            marginRight: d.padding
                        });
                        y = n.outerHeight(true);
                        n.appendTo(D);
                        i.height += y;
                        break;
                    case "over":
                        n.css({
                            marginLeft:
                            d.padding,
                            width: i.width - d.padding * 2,
                            bottom: d.padding
                        }).appendTo(D);
                        break;
                    case "float":
                        n.css("left", parseInt((n.width() - i.width - 40) / 2, 10) * -1).appendTo(f);
                        break;
                    default:
                        n.css({
                            width:
                            i.width - d.padding * 2,
                            paddingLeft: d.padding,
                            paddingRight: d.padding
                        }).appendTo(f)
                    }
                }
            }
            n.hide();
            if (f.is(":visible")) {
                b(E.add(z).add(A)).hide();
                a = f.position();
                r = {
                    top: a.top,
                    left: a.left,
                    width: f.width(),
                    height: f.height()
                };
                c = r.width == i.width && r.height == i.height;
                j.fadeTo(d.changeFade, 0.3,
                function() {
                    var g = function() {
                        j.html(m.contents()).fadeTo(d.changeFade, 1, S)
                    };
                    b.event.trigger("fancybox-change");
                    j.empty().removeAttr("filter").css({
                        "border-width": d.padding,
                        width: i.width - d.padding * 2,
                        height: e.autoDimensions ? "auto": i.height - y - d.padding * 2
                    });
                    if (c) g();
                    else {
                        B.prop = 0;
                        b(B).animate({
                            prop: 1
                        },
                        {
                            duration: d.changeSpeed,
                            easing: d.easingChange,
                            step: T,
                            complete: g
                        })
                    }
                })
            } else {
                f.removeAttr("style");
                j.css("border-width", d.padding);
                if (d.transitionIn == "elastic") {
                    r = V();
                    j.html(m.contents());
                    f.show();
                    if (d.opacity) i.opacity = 0;
                    B.prop = 0;
                    b(B).animate({
                        prop: 1
                    },
                    {
                        duration: d.speedIn,
                        easing: d.easingIn,
                        step: T,
                        complete: S
                    })
                } else {
                    d.titlePosition == "inside" && y > 0 && n.show();
                    j.css({
                        width: i.width - d.padding * 2,
                        height: e.autoDimensions ? "auto": i.height - y - d.padding * 2
                    }).html(m.contents());
                    f.css(i).fadeIn(d.transitionIn == "none" ? 0 : d.speedIn, S)
                }
            }
        }
    },
    Y = function() {
        if (d.enableEscapeButton || d.enableKeyboardNav) b(document).bind("keydown.fb",
        function(a) {
            if (a.keyCode == 27 && d.enableEscapeButton) {
                a.preventDefault();
                b.fancybox.close()
            } else if ((a.keyCode == 37 || a.keyCode == 39) && d.enableKeyboardNav && a.target.tagName !== "INPUT" && a.target.tagName !== "TEXTAREA" && a.target.tagName !== "SELECT") {
                a.preventDefault();
                b.fancybox[a.keyCode == 37 ? "prev": "next"]()
            }
        });
        if (d.showNavArrows) {
            if (d.cyclic && l.length > 1 || p !== 0) z.show();
            if (d.cyclic && l.length > 1 || p != l.length - 1) A.show()
        } else {
            z.hide();
            A.hide()
        }
    },
    S = function() {
        if (!b.support.opacity) {
            j.get(0).style.removeAttribute("filter");
            f.get(0).style.removeAttribute("filter")
        }
        e.autoDimensions && j.css("height", "auto");
        f.css("height", "auto");
        s && s.length && n.show();
        d.showCloseButton && E.show();
        Y();
        d.hideOnContentClick && j.bind("click", b.fancybox.close);
        d.hideOnOverlayClick && u.bind("click", b.fancybox.close);
        b(window).bind("resize.fb", b.fancybox.resize);
        d.centerOnScroll && b(window).bind("scroll.fb", b.fancybox.center);
        if (d.type == "iframe") b('<iframe id="fancybox-frame" name="fancybox-frame' + (new Date).getTime() + '" frameborder="0" hspace="0" ' + (b.browser.msie ? 'allowtransparency="true""': "") + ' scrolling="' + e.scrolling + '" src="' + d.href + '"></iframe>').appendTo(j);
        f.show();
        h = false;
        b.fancybox.center();
        d.onComplete(l, p, d);
        var a, c;
        if (l.length - 1 > p) {
            a = l[p + 1].href;
            if (typeof a !== "undefined" && a.match(J)) {
                c = new Image;
                c.src = a
            }
        }
        if (p > 0) {
            a = l[p - 1].href;
            if (typeof a !== "undefined" && a.match(J)) {
                c = new Image;
                c.src = a
            }
        }
    },
    T = function(a) {
        var c = {
            width: parseInt(r.width + (i.width - r.width) * a, 10),
            height: parseInt(r.height + (i.height - r.height) * a, 10),
            top: parseInt(r.top + (i.top - r.top) * a, 10),
            left: parseInt(r.left + (i.left - r.left) * a, 10)
        };
        if (typeof i.opacity !== "undefined") c.opacity = a < 0.5 ? 0.5 : a;
        f.css(c);
        j.css({
            width: c.width - d.padding * 2,
            height: c.height - y * a - d.padding * 2
        })
    },
    U = function() {
        return [b(window).width() - d.margin * 2, b(window).height() - d.margin * 2, b(document).scrollLeft() + d.margin, b(document).scrollTop() + d.margin]
    },
    X = function() {
        var a = U(),
        c = {},
        g = d.autoScale,
        k = d.padding * 2;
        c.width = d.width.toString().indexOf("%") > -1 ? parseInt(a[0] * parseFloat(d.width) / 100, 10) : d.width + k;
        c.height = d.height.toString().indexOf("%") > -1 ? parseInt(a[1] * parseFloat(d.height) / 100, 10) : d.height + k;
        if (g && (c.width > a[0] || c.height > a[1])) if (e.type == "image" || e.type == "swf") {
            g = d.width / d.height;
            if (c.width > a[0]) {
                c.width = a[0];
                c.height = parseInt((c.width - k) / g + k, 10)
            }
            if (c.height > a[1]) {
                c.height = a[1];
                c.width = parseInt((c.height - k) * g + k, 10)
            }
        } else {
            c.width = Math.min(c.width, a[0]);
            c.height = Math.min(c.height, a[1])
        }
        c.top = parseInt(Math.max(a[3] - 20, a[3] + (a[1] - c.height - 40) * 0.5), 10);
        c.left = parseInt(Math.max(a[2] - 20, a[2] + (a[0] - c.width - 40) * 0.5), 10);
        return c
    },
    V = function() {
        var a = e.orig ? b(e.orig) : false,
        c = {};
        if (a && a.length) {
            c = a.offset();
            c.top += parseInt(a.css("paddingTop"), 10) || 0;
            c.left += parseInt(a.css("paddingLeft"), 10) || 0;
            c.top += parseInt(a.css("border-top-width"), 10) || 0;
            c.left += parseInt(a.css("border-left-width"), 10) || 0;
            c.width = a.width();
            c.height = a.height();
            c = {
                width: c.width + d.padding * 2,
                height: c.height + d.padding * 2,
                top: c.top - d.padding - 20,
                left: c.left - d.padding - 20
            }
        } else {
            a = U();
            c = {
                width: d.padding * 2,
                height: d.padding * 2,
                top: parseInt(a[3] + a[1] * 0.5, 10),
                left: parseInt(a[2] + a[0] * 0.5, 10)
            }
        }
        return c
    },
    Z = function() {
        if (t.is(":visible")) {
            b("div", t).css("top", L * -40 + "px");
            L = (L + 1) % 12
        } else clearInterval(K)
    };
    b.fn.fancybox = function(a) {
        if (!b(this).length) return this;
        b(this).data("fancybox", b.extend({},
        a, b.metadata ? b(this).metadata() : {})).unbind("click.fb").bind("click.fb",
        function(c) {
            c.preventDefault();
            if (!h) {
                h = true;
                b(this).blur();
                o = [];
                q = 0;
                c = b(this).attr("rel") || "";
                if (!c || c == "" || c === "nofollow") o.push(this);
                else {
                    o = b("a[rel=" + c + "], area[rel=" + c + "]");
                    q = o.index(this)
                }
                I()
            }
        });
        return this
    };
    b.fancybox = function(a, c) {
        var g;
        if (!h) {
            h = true;
            g = typeof c !== "undefined" ? c: {};
            o = [];
            q = parseInt(g.index, 10) || 0;
            if (b.isArray(a)) {
                for (var k = 0, C = a.length; k < C; k++) if (typeof a[k] == "object") b(a[k]).data("fancybox", b.extend({},
                g, a[k]));
                else a[k] = b({}).data("fancybox", b.extend({
                    content: a[k]
                },
                g));
                o = jQuery.merge(o, a)
            } else {
                if (typeof a == "object") b(a).data("fancybox", b.extend({},
                g, a));
                else a = b({}).data("fancybox", b.extend({
                    content: a
                },
                g));
                o.push(a)
            }
            if (q > o.length || q < 0) q = 0;
            I()
        }
    };
    b.fancybox.showActivity = function() {
        clearInterval(K);
        t.show();
        K = setInterval(Z, 66)
    };
    b.fancybox.hideActivity = function() {
        t.hide()
    };
    b.fancybox.next = function() {
        return b.fancybox.pos(p + 1)
    };
    b.fancybox.prev = function() {
        return b.fancybox.pos(p - 1)
    };
    b.fancybox.pos = function(a) {
        if (!h) {
            a = parseInt(a);
            o = l;
            if (a > -1 && a < l.length) {
                q = a;
                I()
            } else if (d.cyclic && l.length > 1) {
                q = a >= l.length ? 0 : l.length - 1;
                I()
            }
        }
    };
    b.fancybox.cancel = function() {
        if (!h) {
            h = true;
            b.event.trigger("fancybox-cancel");
            N();
            e.onCancel(o, q, e);
            h = false
        }
    };
    b.fancybox.close = function() {
        function a() {
            u.fadeOut("fast");
            n.empty().hide();
            f.hide();
            b.event.trigger("fancybox-cleanup");
            j.empty();
            d.onClosed(l, p, d);
            l = e = [];
            p = q = 0;
            d = e = {};
            h = false
        }
        if (! (h || f.is(":hidden"))) {
            h = true;
            if (d && false === d.onCleanup(l, p, d)) h = false;
            else {
                N();
                b(E.add(z).add(A)).hide();
                b(j.add(u)).unbind();
                b(window).unbind("resize.fb scroll.fb");
                b(document).unbind("keydown.fb");
                j.find("iframe").attr("src", M && /^https/i.test(window.location.href || "") ? "javascript:void(false)": "about:blank");
                d.titlePosition !== "inside" && n.empty();
                f.stop();
                if (d.transitionOut == "elastic") {
                    r = V();
                    var c = f.position();
                    i = {
                        top: c.top,
                        left: c.left,
                        width: f.width(),
                        height: f.height()
                    };
                    if (d.opacity) i.opacity = 1;
                    n.empty().hide();
                    B.prop = 1;
                    b(B).animate({
                        prop: 0
                    },
                    {
                        duration: d.speedOut,
                        easing: d.easingOut,
                        step: T,
                        complete: a
                    })
                } else f.fadeOut(d.transitionOut == "none" ? 0 : d.speedOut, a)
            }
        }
    };
    b.fancybox.resize = function() {
        u.is(":visible") && u.css("height", b(document).height());
        b.fancybox.center(true)
    };
    b.fancybox.center = function(a) {
        var c, g;
        if (!h) {
            g = a === true ? 1 : 0;
            c = U(); ! g && (f.width() > c[0] || f.height() > c[1]) || f.stop().animate({
                top: parseInt(Math.max(c[3] - 20, c[3] + (c[1] - j.height() - 40) * 0.5 - d.padding)),
                left: parseInt(Math.max(c[2] - 20, c[2] + (c[0] - j.width() - 40) * 0.5 - d.padding))
            },
            typeof a == "number" ? a: 200)
        }
    };
    b.fancybox.init = function() {
        if (!b("#fancybox-wrap").length) {
            b("body").append(m = b('<div id="fancybox-tmp"></div>'), t = b('<div id="fancybox-loading"><div></div></div>'), u = b('<div id="fancybox-overlay"></div>'), f = b('<div id="fancybox-wrap"></div>'));
            D = b('<div id="fancybox-outer"></div>').append('<div class="fancybox-bg" id="fancybox-bg-n"></div><div class="fancybox-bg" id="fancybox-bg-ne"></div><div class="fancybox-bg" id="fancybox-bg-e"></div><div class="fancybox-bg" id="fancybox-bg-se"></div><div class="fancybox-bg" id="fancybox-bg-s"></div><div class="fancybox-bg" id="fancybox-bg-sw"></div><div class="fancybox-bg" id="fancybox-bg-w"></div><div class="fancybox-bg" id="fancybox-bg-nw"></div>').appendTo(f);
            D.append(j = b('<div id="fancybox-content"></div>'), E = b('<a id="fancybox-close"></a>'), n = b('<div id="fancybox-title"></div>'), z = b('<a href="javascript:;" id="fancybox-left"><span class="fancy-ico" id="fancybox-left-ico"></span></a>'), A = b('<a href="javascript:;" id="fancybox-right"><span class="fancy-ico" id="fancybox-right-ico"></span></a>'));
            E.click(b.fancybox.close);
            t.click(b.fancybox.cancel);
            z.click(function(a) {
                a.preventDefault();
                b.fancybox.prev()
            });
            A.click(function(a) {
                a.preventDefault();
                b.fancybox.next()
            });
            b.fn.mousewheel && f.bind("mousewheel.fb",
            function(a, c) {
                if (h) a.preventDefault();
                else if (b(a.target).get(0).clientHeight == 0 || b(a.target).get(0).scrollHeight === b(a.target).get(0).clientHeight) {
                    a.preventDefault();
                    b.fancybox[c > 0 ? "prev": "next"]()
                }
            });
            b.support.opacity || f.addClass("fancybox-ie");
            if (M) {
                t.addClass("fancybox-ie6");
                f.addClass("fancybox-ie6");
                b('<iframe id="fancybox-hide-sel-frame" src="' + (/^https/i.test(window.location.href || "") ? "javascript:void(false)": "about:blank") + '" scrolling="no" border="0" frameborder="0" tabindex="-1"></iframe>').prependTo(D)
            }
        }
    };
    b.fn.fancybox.defaults = {
        padding: 10,
        margin: 40,
        opacity: false,
        modal: false,
        cyclic: false,
        scrolling: "auto",
        width: 560,
        height: 340,
        autoScale: true,
        autoDimensions: true,
        centerOnScroll: false,
        ajax: {},
        swf: {
            wmode: "transparent"
        },
        hideOnOverlayClick: true,
        hideOnContentClick: false,
        overlayShow: true,
        overlayOpacity: 0.7,
        overlayColor: "#777",
        titleShow: true,
        titlePosition: "float",
        titleFormat: null,
        titleFromAlt: false,
        transitionIn: "fade",
        transitionOut: "fade",
        speedIn: 300,
        speedOut: 300,
        changeSpeed: 300,
        changeFade: "fast",
        easingIn: "swing",
        easingOut: "swing",
        showCloseButton: true,
        showNavArrows: true,
        enableEscapeButton: true,
        enableKeyboardNav: true,
        onStart: function() {},
        onCancel: function() {},
        onComplete: function() {},
        onCleanup: function() {},
        onClosed: function() {},
        onError: function() {}
    };
    b(document).ready(function() {
        b.fancybox.init()
    })
})(jQuery);
(function(b) {
    b.fn.superfish = function(k) {
        var g = b.fn.superfish,
        j = g.c,
        f = b(['<span class="', j.arrowClass, '"> &#187;</span>'].join("")),
        i = function() {
            var c = b(this),
            l = d(c);
            clearTimeout(l.sfTimer);
            c.showSuperfishUl().siblings().hideSuperfishUl()
        },
        e = function() {
            var c = b(this),
            m = d(c),
            l = g.op;
            clearTimeout(m.sfTimer);
            m.sfTimer = setTimeout(function() {
                l.retainPath = (b.inArray(c[0], l.$path) > -1);
                c.hideSuperfishUl();
                if (l.$path.length && c.parents(["li.", l.hoverClass].join("")).length < 1) {
                    i.call(l.$path)
                }
            },
            l.delay)
        },
        d = function(c) {
            var l = c.parents(["ul.", j.menuClass, ":first"].join(""))[0];
            g.op = g.o[l.serial];
            return l
        },
        h = function(c) {
            c.addClass(j.anchorClass).append(f.clone())
        };
        return this.each(function() {
            var c = this.serial = g.o.length;
            var m = b.extend({},
            g.defaults, k);
            m.$path = b("li." + m.pathClass, this).slice(0, m.pathLevels).each(function() {
                b(this).addClass([m.hoverClass, j.bcClass].join(" ")).filter("li:has(ul)").removeClass(m.pathClass)
            });
            g.o[c] = g.op = m;
            b("li:has(ul)", this)[(b.fn.hoverIntent && !m.disableHI) ? "hoverIntent": "hover"](i, e).each(function() {
                if (m.autoArrows) {
                    h(b(">a:first-child", this))
                }
            }).not("." + j.bcClass).hideSuperfishUl();
            var l = b("a", this);
            l.each(function(n) {
                var o = l.eq(n).parents("li");
                l.eq(n).focus(function() {
                    i.call(o)
                }).blur(function() {
                    e.call(o)
                })
            });
            m.onInit.call(this)
        }).each(function() {
            var c = [j.menuClass];
            if (g.op.dropShadows && !(b.browser.msie && b.browser.version < 7)) {
                c.push(j.shadowClass)
            }
            b(this).addClass(c.join(" "))
        })
    };
    var a = b.fn.superfish;
    a.o = [];
    a.op = {};
    a.IE7fix = function() {
        var c = a.op;
        if (b.browser.msie && b.browser.version > 6 && c.dropShadows && c.animation.opacity != undefined) {
            this.toggleClass(a.c.shadowClass + "-off")
        }
    };
    a.c = {
        bcClass: "sf-breadcrumb",
        menuClass: "sf-js-enabled",
        anchorClass: "sf-with-ul",
        arrowClass: "sf-sub-indicator",
        shadowClass: "sf-shadow"
    };
    a.defaults = {
        hoverClass: "sfHover",
        pathClass: "overideThisToUse",
        pathLevels: 1,
        delay: 800,
        animation: {
            opacity: "show"
        },
        speed: "normal",
        autoArrows: true,
        dropShadows: true,
        disableHI: false,
        onInit: function() {},
        onBeforeShow: function() {},
        onShow: function() {},
        onHide: function() {}
    };
    b.fn.extend({
        hideSuperfishUl: function() {
            var e = a.op,
            d = (e.retainPath === true) ? e.$path: "";
            e.retainPath = false;
            var c = b(["li.", e.hoverClass].join(""), this).add(this).not(d).removeClass(e.hoverClass).find(">ul").hide().css("visibility", "hidden");
            e.onHide.call(c);
            return this
        },
        showSuperfishUl: function() {
            var e = a.op,
            d = a.c.shadowClass + "-off",
            c = this.addClass(e.hoverClass).find(">ul:hidden").css("visibility", "visible");
            a.IE7fix.call(c);
            e.onBeforeShow.call(c);
            c.animate(e.animation, e.speed,
            function() {
                a.IE7fix.call(c);
                e.onShow.call(c)
            });
            return this
        }
    })
})(jQuery);
(function($) {
    $.fn.clearonfocus = function() {
        return this.focus(function() {
            var v = $(this).val();
            $(this).val(v === this.defaultValue ? '': v);
        }).blur(function() {
            var v = $(this).val();
            $(this).val(v.match(/^\s+$|^$/) ? this.defaultValue: v);
        });
    };
})(jQuery);
$('form').each(function() {
    $(this).attr('action', $(this).attr('action').replace(/(.+)#(.+)/, "$1") + location.hash);
});
(function($) {
    $.fn.hashtabs = function(options) {
        var h = location.hash;
        return this.each(function() {
            o = $(this);
            var i = 0;
            o.find('li').each(function() {
                var href = $(this).find('a').attr('href').replace('#', '#/');
                $(this).find('a').attr('href', href);
            });
            if ($('.active-first', this).length > 0) {
                i = $('.active-first', this).index();
            }
            var d = o.find('li').eq(i).find('a').attr('href'),
            a = h == "" ? d.replace('/', '') : h.replace('/', ''),
            t;
            o.find('li').each(function(i) {
                t = $(this).find('a').eq(0).attr('href').replace('/', '');
                $(t).addClass('visuallyhidden tab-panel');
            });
            o.find('li.current').removeClass('current');
            ah = a.replace('#', '#/');
            o.find('li a[href="' + ah + '"]').parent().addClass('current');
            $(a).addClass('active-tab-element').removeClass('visuallyhidden');
            $(window).hashchange(function() {
                h = location.hash;
                d = o.find('li').eq(i).find('a').attr('href');
                a = h == "" ? d.replace('/', '') : h.replace('/', '');
                o.find('li.current').removeClass('current');
                ah = a.replace('#', '#/');
                o.find('li a[href="' + ah + '"]').parent().addClass('current');
                $('.active-tab-element').removeClass('active-tab-element').addClass('visuallyhidden');
                $(a).addClass('active-tab-element').removeClass('visuallyhidden');
                $('form').each(function() {
                    $(this).attr('action', $(this).attr('action').replace(/(.+)#(.+)/, "$1") + location.hash);
                });
                return false;
            });
        });
    };
})(jQuery);
(function($) {
    var $producttile = $('<div class="registeredproduct" />'),
    $image = $('<p class="image"><img /></p>'),
    $title = $('<p class="title" />'),
    $meta = $('<p class="meta">Serial Number: <em /></p>'),
    $button = $('<p class="button"><a href="#">Remove</a></p>');
    var registerProduct = {
        init: function() {
            $('#productFieldset .button a').bind('click',
            function() {
                registerProduct.add();
                return false;
            });
            $('.registeredproduct .button a').live('click',
            function() {
                $(this).closest('.registeredproduct').remove();
                return false;
            });
        },
        process: function() {
            var name = $('#productFieldset').find('select[name="productname"]').val(),
            serial = $('#productFieldset').find('input[name="productserial"]').val();
            if (!registerProduct.validate(name, serial)) return false;
            return {
                name: name,
                serial: serial
            };
        },
        validate: function(name, serial) {
            var success = true;
            $('#productFieldset').find('span.error').remove();
            if (name == "") {
                $('#productFieldset').find('select[name="productname"]').after('<span class="error">Please select a product</span>');
                success = false;
            }
            if (serial == "") {
                $('#productFieldset').find('input[name="productserial"]').after('<span class="error">Please include a serial number</span>');
                success = false;
            }
            return success;
        },
        add: function() {
            var info = registerProduct.process();
            if (!info) return false;
            $image.appendTo($producttile).find('img').attr('src', "assets/images/examples/related.png");
            $title.appendTo($producttile).text(info.name);
            $meta.appendTo($producttile).find('em').text(info.serial);
            $button.appendTo($producttile);
            var $tile = $producttile.clone();
            $('#productFieldset').before($tile).find('input[name="productserial"]').val("");
        }
    };
    $(registerProduct.init);
})(jQuery);;
if (window.jQuery)(function($) {
    if ($.browser.msie) try {
        document.execCommand("BackgroundImageCache", false, true)
    } catch(e) {};
    $.fn.rating = function(options) {
        if (this.length == 0) return this;
        if (typeof arguments[0] == 'string') {
            if (this.length > 1) {
                var args = arguments;
                return this.each(function() {
                    $.fn.rating.apply($(this), args);
                });
            };
            $.fn.rating[arguments[0]].apply(this, $.makeArray(arguments).slice(1) || []);
            return this;
        };
        var options = $.extend({},
        $.fn.rating.options, options || {});
        $.fn.rating.calls++;
        this.not('.star-rating-applied').addClass('star-rating-applied').each(function() {
            var control, input = $(this);
            var eid = (this.name || 'unnamed-rating').replace(/\[|\]/g, '_').replace(/^\_+|\_+$/g, '');
            var context = $(this.form || document.body);
            var raters = context.data('rating');
            if (!raters || raters.call != $.fn.rating.calls) raters = {
                count: 0,
                call: $.fn.rating.calls
            };
            var rater = raters[eid];
            if (rater) control = rater.data('rating');
            if (rater && control) control.count++;
            else {
                control = $.extend({},
                options || {},
                ($.metadata ? input.metadata() : ($.meta ? input.data() : null)) || {},
                {
                    count: 0,
                    stars: [],
                    inputs: []
                });
                control.serial = raters.count++;
                rater = $('<span class="star-rating-control"/>');
                input.before(rater);
                rater.addClass('rating-to-be-drawn');
                if (input.attr('disabled')) control.readOnly = true;
                rater.append(control.cancel = $('<div class="rating-cancel"><a title="' + control.cancel + '">' + control.cancelValue + '</a></div>').mouseover(function() {
                    $(this).rating('drain');
                    $(this).addClass('star-rating-hover');
                }).mouseout(function() {
                    $(this).rating('draw');
                    $(this).removeClass('star-rating-hover');
                }).click(function() {
                    $(this).rating('select');
                }).data('rating', control));
            };
            var star = $('<div class="star-rating rater-' + control.serial + '"><a title="' + (this.title || this.value) + '">' + this.value + '</a></div>');
            rater.append(star);
            if (this.id) star.attr('id', this.id);
            if (this.className) star.addClass(this.className);
            if (control.half) control.split = 2;
            if (typeof control.split == 'number' && control.split > 0) {
                var stw = ($.fn.width ? star.width() : 0) || control.starWidth;
                var spi = (control.count % control.split),
                spw = Math.floor(stw / control.split);
                star.width(spw).find('a').css({
                    'margin-left': '-' + (spi * spw) + 'px'
                })
            };
            if (control.readOnly) star.addClass('star-rating-readonly');
            else star.addClass('star-rating-live').mouseover(function() {
                $(this).rating('fill');
                $(this).rating('focus');
            }).mouseout(function() {
                $(this).rating('draw');
                $(this).rating('blur');
            }).click(function() {
                $(this).rating('select');
            });
            if (this.checked) control.current = star;
            input.hide();
            input.change(function() {
                $(this).rating('select');
            });
            star.data('rating.input', input.data('rating.star', star));
            control.stars[control.stars.length] = star[0];
            control.inputs[control.inputs.length] = input[0];
            control.rater = raters[eid] = rater;
            control.context = context;
            input.data('rating', control);
            rater.data('rating', control);
            star.data('rating', control);
            context.data('rating', raters);
        });
        $('.rating-to-be-drawn').rating('draw').removeClass('rating-to-be-drawn');
        return this;
    };
    $.extend($.fn.rating, {
        calls: 0,
        focus: function() {
            var control = this.data('rating');
            if (!control) return this;
            if (!control.focus) return this;
            var input = $(this).data('rating.input') || $(this.tagName == 'INPUT' ? this: null);
            if (control.focus) control.focus.apply(input[0], [input.val(), $('a', input.data('rating.star'))[0]]);
        },
        blur: function() {
            var control = this.data('rating');
            if (!control) return this;
            if (!control.blur) return this;
            var input = $(this).data('rating.input') || $(this.tagName == 'INPUT' ? this: null);
            if (control.blur) control.blur.apply(input[0], [input.val(), $('a', input.data('rating.star'))[0]]);
        },
        fill: function() {
            var control = this.data('rating');
            if (!control) return this;
            if (control.readOnly) return;
            this.rating('drain');
            this.prevAll().andSelf().filter('.rater-' + control.serial).addClass('star-rating-hover');
        },
        drain: function() {
            var control = this.data('rating');
            if (!control) return this;
            if (control.readOnly) return;
            control.rater.children().filter('.rater-' + control.serial).removeClass('star-rating-on').removeClass('star-rating-hover');
        },
        draw: function() {
            var control = this.data('rating');
            if (!control) return this;
            this.rating('drain');
            if (control.current) {
                control.current.data('rating.input').attr('checked', 'checked');
                control.current.prevAll().andSelf().filter('.rater-' + control.serial).addClass('star-rating-on');
            }
            else $(control.inputs).removeAttr('checked');
            control.cancel[control.readOnly || control.required ? 'hide': 'show']();
            this.siblings()[control.readOnly ? 'addClass': 'removeClass']('star-rating-readonly');
        },
        select: function(value, wantCallBack) {
            var control = this.data('rating');
            if (!control) return this;
            if (control.readOnly) return;
            control.current = null;
            if (typeof value != 'undefined') {
                if (typeof value == 'number') return $(control.stars[value]).rating('select', undefined, wantCallBack);
                if (typeof value == 'string') $.each(control.stars,
                function() {
                    if ($(this).data('rating.input').val() == value) $(this).rating('select', undefined, wantCallBack);
                });
            }
            else control.current = this[0].tagName == 'INPUT' ? this.data('rating.star') : (this.is('.rater-' + control.serial) ? this: null);
            this.data('rating', control);
            this.rating('draw');
            var input = $(control.current ? control.current.data('rating.input') : null);
            if ((wantCallBack || wantCallBack == undefined) && control.callback) control.callback.apply(input[0], [input.val(), $('a', control.current)[0]]);
        },
        readOnly: function(toggle, disable) {
            var control = this.data('rating');
            if (!control) return this;
            control.readOnly = toggle || toggle == undefined ? true: false;
            if (disable) $(control.inputs).attr("disabled", "disabled");
            else $(control.inputs).removeAttr("disabled");
            this.data('rating', control);
            this.rating('draw');
        },
        disable: function() {
            this.rating('readOnly', true, true);
        },
        enable: function() {
            this.rating('readOnly', false, false);
        }
    });
    $.fn.rating.options = {
        cancel: 'Cancel Rating',
        cancelValue: '',
        split: 0,
        starWidth: 16
    };
    $(function() {
        $('input[name=rating]').rating();
    });
})(jQuery);;
$(document).ready(function() {
    $('.nav-primary').superfish({
        autoArrows: false,
        dropShadows: false,
        delay: 500,
        hoverClass: 'hover',
        speed: 'fast'
    });
    if (_isie7) $('.products-menu').css('width', 700);
    if (!_isie7) {
        $('.products-menu').bind('mouseleave',
        function() {
            $(this).css({
                width: 100
            });
        });
        $('#productNavigationLink').hover(function() {
            $('.products-menu').css('width', 200);
        });
        $('.products-menu > li > a').bind('hover',
        function() {
            $('.products-menu').css('width', 700);
        });
    }
});
$(function() {
    $('a[rel="external"]').each(function() {
        $(this).click(function(event) {
            event.preventDefault();
            event.stopPropagation();
            window.open(this.href, '_blank');
        });
    });
});
function postcardImages() {
    $('.postcard .image').each(function() {
        var m = $('img', this),
        h = m.height(),
        s = $('span', this),
        c = s.height();
        y = ((h - c) / -2);
        y = y < 0 ? y: 0;
        m.css('top', y);
    });
}
function breadcrumbWidth() {
    var b = $('.breadcrumbs'),
    m = $('.masthead');
    m.removeClass('masthead-line');
    b.removeClass('breadcrumbs-line');
    if ($('.information div').width() - $('h1').width() - b.width() < 0) {
        m.addClass('masthead-line');
        b.addClass('breadcrumbs-line');
    }
}
function wrapImage() {
    $('.image-border .asideimage').wrap('<p class="border"><span /></p>');
}
$(document).ready(function() {
    $('#fl-eNewsletter').attr('href', '/data/forms/enewsletter').fancybox({
        onComplete: function() {
            Cufon.replace('h3')('legend');
        },
        padding: 20
    });
    $('.sales-rep').fancybox({
        padding: 20
    });
});
Cufon.replace('h1')('h2:not(.no-cufon)')('#ancillary h4')('h3', {
    ignore: {
        'i': 1
    }
})('form fieldset legend')('.reverse-page #artist-list a strong')('.largequote');
if (!_isie8) Cufon.replace('.range-title');
$(function() {
    var jsVersion = 1.5;
    if (([]).forEach) jsVersion = 1.6;
    if (window.Iterator) jsVersion = 1.7;
    if (([]).reduce) jsVersion = 1.8;
});
(function(win, undef) {
    var Browser = {
        checkBrowser: (function() {}),
        checkJSVersion: (function() {}),
        jsVersion: this.checkJSVersion()
    };
});
$(document).ready(function() {
    $('#reviewForm').live('submit',
    function() {
        $('#formsubmit', this).attr('disabled', 'disabled');
        var $form = $(this),
        data = $(this).serialize();
        $('.form-errors').remove();
        $form.before('<div class="process">Processing...</div>').hide();
        $.ajax({
            type: 'POST',
            url: '/data/ajax/?a=review',
            data: data,
            success: function(msg) {
                $('.process').before(msg).remove();
                Cufon.replace('legend');
                $('input[name="rating"]').rating();
                $('#formsubmit', this).removeAttr('disabled');
            }
        });
        return false;
    });
    $('#commentForm').live('submit',
    function() {
        $('#formsubmit', this).attr('disabled', 'disabled');
        var $form = $(this),
        data = $(this).serialize();
        $('.form-errors').remove();
        $form.before('<div class="process">Processing...</div>').hide();
        $.ajax({
            type: 'POST',
            url: '/data/ajax/?a=comment',
            data: data,
            success: function(msg) {
                $('.process').before(msg).remove();
                Cufon.replace('legend');
                $('#formsubmit', this).removeAttr('disabled');
            }
        });
        return false;
    });
    $('#fancyenewsletter').live('submit',
    function() {
        $('#formsubmit', this).attr('disabled', 'disabled');
        var $form = $(this),
        data = $(this).serialize();
        $('.form-errors').remove();
        $.ajax({
            type: 'POST',
            url: '/data/ajax/?a=enewsletter',
            data: data,
            success: function(msg) {
                $form.before(msg).hide();
                Cufon.replace('legend');
                $('#formsubmit', this).removeAttr('disabled');
                $.fancybox.resize();
            }
        });
        return false;
    });
});

(function(win, $, undef) {
    var doc = win.document,
    bod = doc.body,
    tippers, tip, tt, init = function() {
        try {
            tt = doc.createElement('div');
            tt.id = 'tooltip';
            bod.appendChild(tt);
            tip = document.getElementById('tooltip');
            tippers = $('.social-links li,.dealer .specialists img');
            listen(tippers);
        } catch(e) {}
    },
    listen = function() {
        $(tippers).live('click',
        function() {
            show(this);
        });
        $(bod).click(function() {
            hide();
        });
        $(tip).click(function(event) {
            event.stopPropagation();
        });
    },
    show = function(el) {
        var target = $(el).attr('data-tooltip'),
        html = document.getElementById(target).innerHTML,
        tipwidth = $(tip).outerWidth(),
        tipheight = $(tip).height(),
        elwidth = $(el).outerWidth(),
        elheight = $(el).outerHeight(),
        pos = $(el).offset();
        tt.innerHTML = html;
        tip.style.cssText = 'top:' + (pos.top + elheight + 30) + 'px;left:' + (pos.left + elwidth - tipwidth) + 'px;opacity:0';
        $(tip).animate({
            'top': pos.top + elheight + 10,
            'opacity': 1
        },
        200);
    },
    hide = function() {
        tt.innerText = "";
        $(tip).css({
            'top': '-9999em',
            'left': '-9999em'
        });
    };
    init();
})(this, jQuery);
var Tooltip = function($, w, u) {
    var Tooltip = {},
    tip, doc = document,
    bod = doc.body || doc.getElementsByTagName('body')[0],
    head = doc.head || doc.getElementsByTagName('head')[0],
    win = w,
    tt;
    Tooltip.isvisible = false;
    Tooltip.init = function() {
        tt = $('<div id="tooltip" />');
        $('body').append(tt);
        var tippers = $('.social-links li');
        Tooltip.listen(tippers);
    }
    Tooltip.listen = function($els) {
        $els.live('click',
        function() {
            Tooltip.show(this);
        });
        $('body').click(function() {
            Tooltip.hide();
        });
        $('#tooltip').click(function(event) {
            event.stopPropagation();
        });
    }
    Tooltip.show = function(el) {
        var target = $(el).attr('data-tooltip');
        var html = document.getElementById(target).innerHTML;
        tt.innerHTML = html;
        tip = doc.getElementById('tooltip');
        var tipwidth = $(tip).outerWidth(),
        tipheight = $(tip).height(),
        elwidth = $(el).outerWidth(),
        elheight = $(el).outerHeight(),
        pos = $(el).offset();
        tip.style.cssText = 'top:' + (pos.top + elheight + 30) + 'px;left:' + (pos.left + elwidth - tipwidth) + 'px;opacity:0';
        $(tip).animate({
            'top': pos.top + elheight + 10,
            'opacity': 1
        },
        200);
        Tooltip.isvisible = true;
    }
    Tooltip.hide = function() {
        tt.innerText = "";
        $(tip).css({
            'top': '-9999em',
            'left': '-9999em'
        });
        Tooltip.isvisible = false;
    }
    $(function() {
        Tooltip.init();
    });
} (jQuery, window);

$(function() {
    $('input.clearonfocus').each(function(i) {
        $(this).attr('data-default', $(this).val());
    });
    $('input.clearonfocus').live('focus',
    function() {
        if ($(this).val() == $(this).attr('data-default')) $(this).val("");
    });
    $('input.clearonfocus').live('blur',
    function() {
        if ($(this).val() == "") $(this).val($(this).attr('data-default'));
    });
});
try{
var map, bounds, tt, markers = [],
submitted = 0;
customevent.subscribe('layout',
function() {
    if (window.layout != 'mobile') {
        $('.viewmap a').attr('href', '#dealers-map');
        $('.viewmap a').live('click',
        function() {
            gotoDealer($(this).attr('data-marker-num'));
        });
    }
});
$(function() {
    $('.reset-map').live('click',
    function() {
        resetMap();
        return false;
    });
    if (Modernizr.geolocation && Modernizr.touch) {
        $('.mylocation').live('click',
        function() {
            $(this).fadeOut(200);
            $('#location').trigger('focus');
        });
        $('#location').live('blur',
        function() {
            if ($(this).val() == "") $('.mylocation').fadeIn(400);
        });
    }
    $('#dealerSearch').live('submit',
    function() {
        var $form = $(this);
        if ($('#location').val() == "" && Modernizr.geolocation && Modernizr.touch) {
            navigator.geolocation.getCurrentPosition(function(pos) {
                $location = $('#location');
                $location.after('<input style="display:none" name="location" />');
                $location.removeAttr('name');
                $('.mylocation').addClass('usinglocation').text('Using your location...');
                $('input[name=location]', $form).attr('value', pos.coords.latitude + ',' + pos.coords.longitude);
                document.getElementById('dealerSearch').submit();
            });
        }
        else {
            document.getElementById('dealerSearch').submit();
        }
        return false;
    });
});
}catch(e){}
function initialize() {
    var myLatlng = new google.maps.LatLng(user.lat, user.lng);
    var myOptions = {
        zoom: 8,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    map = new google.maps.Map(document.getElementById("mapCanvas"), myOptions);
    bounds = new google.maps.LatLngBounds();
    var homemarker = addmarker(user.name, user.lat, user.lng, 0, 'home');
    homemarker.latlng = new google.maps.LatLng(user.lat, user.lng);
    homemarker.name = 'You (' + user.name + ')';
    homemarker.distance = 0;
    homemarker.title = "";
    google.maps.event.addListener(homemarker, 'mouseover',
    function(e) {
        pp = getpixelpos(this.latlng);
        tt = dealerTooltip(pp.x, pp.y, this.name, this.distance);
    });
    google.maps.event.addListener(homemarker, 'mouseout',
    function() {
        tt.remove();
    });
    if (dealers.length == 0) {
        $('.map-util').hide();
        $('#mapCanvas').hide();
    }
    else {
        for (var i = 0; i < 6; i++) {
            if (!dealers[i]) continue;
            var dealer = dealers[i];
            var marker = addmarker(dealer.name, dealer.lat, dealer.lng, i);
            marker.latlng = new google.maps.LatLng(dealer.lat, dealer.lng);
            marker.name = dealer.name;
            marker.distance = Math.round(dealer.distance * 10) / 10;
            marker.title = "";
            markers[i] = marker;
            google.maps.event.addListener(marker, 'mouseover',
            function(e) {
                pp = getpixelpos(this.latlng);
                tt = dealerTooltip(pp.x, pp.y, this.name, this.distance);
            });
            google.maps.event.addListener(marker, 'mouseout',
            function() {
                tt.remove();
            });
        }
        map.fitBounds(bounds);
    }
    equalizedealers();
}
$(function() {
    var script = document.createElement("script");
    script.type = "text/javascript";
    if (document.getElementById("mapCanvas")) {
        script.src = "http://maps.googleapis.com/maps/api/js?sensor=false&callback=initialize";
        document.body.appendChild(script);
    }
    if (document.getElementById("us-map")) {
        script.src = "http://maps.googleapis.com/maps/api/js?sensor=false&callback=initmap";
        document.body.appendChild(script);
    }
});
function gotoDealer(n) {
    var obj = markers[n];
    map.setZoom(14);
    map.panTo(obj.latlng);
}
function resetMap() {
    map.fitBounds(bounds);
}
function addmarker(name, lat, lng, i, type) {
    var icon;
    if (type == 'home') icon = '/assets/images/interface/dealer-home.png';
    else icon = '/assets/images/interface/dealers/dealer-map-' + (i + 1) + '.png';
    var shadow = new google.maps.MarkerImage('/assets/images/interface/dealer-shadow.png', new google.maps.Size(59, 25), new google.maps.Point(0, 0), new google.maps.Point(1, 24));
    var latlng = new google.maps.LatLng(lat, lng);
    bounds.extend(latlng);
    var marker = new google.maps.Marker({
        position: latlng,
        map: map,
        icon: icon,
        shadow: shadow,
        title: name
    });
    return marker;
}
function getpixelpos(mp) {
    var scale = Math.pow(2, map.getZoom()),
    nw = new google.maps.LatLng(map.getBounds().getNorthEast().lat(), map.getBounds().getSouthWest().lng()),
    worldCoordinateNW = map.getProjection().fromLatLngToPoint(nw),
    worldCoordinate = map.getProjection().fromLatLngToPoint(mp),
    pixelOffset = new google.maps.Point(Math.floor((worldCoordinate.x - worldCoordinateNW.x) * scale), Math.floor((worldCoordinate.y - worldCoordinateNW.y) * scale)),
    mapoffset = $('#mapCanvas').offset() || $('#us-map').offset(),
    actualx = mapoffset.left + pixelOffset.x,
    actualy = mapoffset.top + pixelOffset.y;
    return {
        x: actualx,
        y: actualy
    };
}
function dealerTooltip(x, y, name, distance) {
    var tooltip, $tooltip, t, ypos, units = user.units || 'miles';
    if (distance > 0) tooltip = '<p class="dealer-tooltip">' + name + '<b>' + distance + ' ' + units + ' away</b></p>';
    else tooltip = '<p class="dealer-tooltip">' + name + '</p>';
    $tooltip = $(tooltip);
    $('body').prepend($tooltip);
    $tooltip.css({
        'position': 'absolute',
        'top': '-9999em',
        'left': '-9999em'
    });
    ttwidth = $tooltip.width() + parseInt($tooltip.css('paddingLeft')) + parseInt($tooltip.css('paddingRight'));
    xpos = x - (ttwidth / 2) + 3;
    $tooltip.css({
        'zIndex': 5000,
        'top': y - 120,
        'left': xpos,
        'opacity': 0
    }).animate({
        'top': y - 100,
        'opacity': 1
    },
    200);
    return $tooltip;
}
function equalizedealers() {
    var $dealers = $('.dealer'),
    dealerrow = [],
    j = 0;
    $dealers.each(function(i) {
        if (i % 3 == 0) {
            k = 0;
            j++;
        } else k++;
    });
}
$(function() {
    if ($('.js-tabs').length > 0) $('.js-tabs').hashtabs();
    $('.distributor-form input[type="submit"]').hide();
    $('.distributor-form select').bind('change',
    function() {
        $(this).closest('form').trigger('submit');
    });
});
try{
customevent.subscribe('layout',
function(l) {
    postcardImages();
    if (l != 'mobile') {
        breadcrumbWidth();
    }
    unequalizeAll();
    if (l == 'large') {
        equalize('.wide-section-three.equalize', '.column', 3);
        equalize('.wide-list-two', 'li', 2);
        equalize('.wide-list-three.equalize', 'li', 3);
        equalize('.wide-list-four.equalize', 'li', 4);
        if (!_isie) visualequalize('form.form-three', 'fieldset', 3);
    }
    else if (l == 'medium') {
        equalize('.section-three.equalize', '.column', 3);
        equalize('.list-two.equalize', 'li', 2);
        equalize('.list-three.equalize', 'li', 3);
        equalize('.list-four.equalize', 'li', 4);
        if (!_isie) visualequalize('form.form-three', 'fieldset', 3);
    }
    else if (l == 'small') {
        equalize('.thin-section-two.equalize', '.column', 2);
        equalize('.thin-list-two.equalize', 'li', 2);
        if (!_isie) visualequalize('form.form-three', 'fieldset', 2);
    }
    else if (l == 'mobile') {
        mobileFunctions();
        if (!_isie) visualunequalize('form.form-three', 'fieldset');
    }
    Cufon.refresh();
});
}catch(e){}
$.expr[':']['nth-of-type'] = function(elem, i, match) {
    if (match[3].indexOf("n") === -1) return i + 1 == match[3];
    var parts = match[3].split("+");
    return (i + 1 - (parts[1] || 0)) % parseInt(parts[0], 10) === 0;
};
function visualequalize(container, element, number) {
    $(container + ' > ' + element).css('height', 'auto');
    var fieldset = $(container + ' > ' + element + ':nth-of-type(-n+' + number + ')'),
    maxheight = 0;
    if (!fieldset) return;
    fieldset.each(function() {
        if ($(this).css('display') != 'none') {
            if ($(this).height() > maxheight) maxheight = $(this).height();
        }
    });
    fieldset.css('height', maxheight);
}
function visualunequalize(container, element) {
    var fieldset = $(container + ' > ' + element).css('height', 'auto');
}
function equalize(element, column, number) {
    $(element).each(function() {
        $(this).find(column).each(function(i) {
            if (i != 0 && i % number == 0) {
                $(this).before('<div class="equalize-clear" style="width:100%;clear:both;"/>');
            }
        });
    });
}
function unequalizeAll() {
    $('.equalize-clear').remove();
}
function addFormField() {
    var id = document.getElementById("id").value;
    $("#divTxt").append("<fieldset class='productinfo' id='row" + id + "'><p><label for='name" + id + "'>Product Name</label><select name='products[" + id + "][name]' id='name" + id + "'></select></p><p><label for='serial" + id + "'>Serial Number</label><input class='text-input' type='text' size='20' name='products[" + id + "][serial]' id='serial" + id + "'></p><a class='removeproduct' href='#' onClick='removeFormField(\"#row" + id + "\"); return false;'><span>Remove</span></a></fieldset>");
    $("#name0 option").clone().removeAttr('selected').prependTo("#name" + id);
    $('#row' + id).hide().fadeIn('fast');
    id = (id - 1) + 2;
    document.getElementById("id").value = id;
    if (window.layout == 'large' || window.layout == 'medium') {
        if (!_isie) visualequalize('form.form-three', 'fieldset', 3);
    }
    else if (window.layout == 'small') {
        if (!_isie) visualequalize('form.form-three', 'fieldset', 2);
    }
}
function removeFormField(id) {
    $(id).fadeOut('fast',
    function() {
        $(id).remove()
    });
    if (window.layout == 'large' || window.layout == 'medium') {
        if (!_isie) visualequalize('form.form-three', 'fieldset', 3);
    }
    else if (window.layout == 'small') {
        if (!_isie) visualequalize('form.form-three', 'fieldset', 2);
    }
}
$(function() {
    $('.addproduct').live('click',
    function() {
        addFormField();
        return false;
    });
});
$(function() {
    var errors = $('.form-errors li');
    errors.each(function() {
        if ($(this).text() == "") $(this).remove();
    });
    var elength = errors.length;
    if (elength > 3) {
        var hiddenerrors = $('.form-errors li:nth-child(n+4)');
        hiddenerrors.hide();
        $('.form-errors li').eq(3).before('<li class="more-errors">And ' + (hiddenerrors.length) + ' more...</li>');
    }
    $(".more-errors").live('click',
    function() {
        $(this).hide();
        hiddenerrors.show();
    });
});
$(document).ready(function() {
    if (($('body').hasClass('product') || $('body').hasClass('product-range')) && $(window).width() > 480) initproduct();
});
function initproduct() {
    $('a[rel="modal"]').fancybox({
        'transitionIn': 'elastic',
        'transitionOut': 'elastic',
        'speedIn': 600,
        'speedOut': 300,
        'overlayOpacity': 0.75,
        'overlayColor': '#000',
        'padding': 20
    });
    if ($('.image360').length > 0) {
        var product360width = $('.image360').attr('data-width');
        var product360height = $('.image360').attr('data-height');
        $('.image360').fancybox({
            'autoDimensions': false,
            'autoScale': false,
            'width': product360width,
            'height': product360height,
            'transitionIn': 'elastic',
            'transitionOut': 'elastic',
            'speedIn': 600,
            'speedOut': 300,
            'overlayOpacity': 0.75,
            'overlayColor': '#000',
            'padding': 0
        });
    }
    $('a[rel="modalgallery"]').fancybox({
        'transitionIn': 'elastic',
        'transitionOut': 'elastic',
        'speedIn': 600,
        'speedOut': 300,
        'overlayOpacity': 0.75,
        'overlayColor': '#000',
        'padding': 20,
        'titlePosition': 'over'
    });
}
var itemsWidth = 0,
itemCount;
function loadSlider(layout) {
    var $sliderwrap = $('<div id="sliderWrap"><div id="slider"><a href="javascript:;">&nbsp;</a></div></div>'),
    windowWidth = $('.products-window').width();
    var layouts = {
        'small': 3,
        'medium': 4,
        'large': 6
    };
    $('.product-list li').width(windowWidth / layouts[layout]);
    var itemWidth = $('.product-list li').eq(0).width();
    $('.product-list li').width(itemWidth);
    itemCount = $('.product-list li').length;
    itemsWidth = itemWidth * itemCount;
    if (itemsWidth <= windowWidth) return;
    if ($('#sliderWrap').length == 0) $('.products-window').after($sliderwrap);
    var sliderWidth = $('#slider').width(),
    ratio = itemsWidth / windowWidth,
    ratio2 = itemsWidth / sliderWidth;
    $('.product-list').width(itemsWidth);
    $('#slider a').width(sliderWidth / ratio);
    $('.product-list').css('marginLeft', 0);
    $('#slider a').css('left', 0);
    $('#slider a').draggable({
        axis: 'x',
        containment: $('#slider'),
        drag: function(event, ui) {
            position = $('#slider a').position();
            relativeposition = position.left * ratio2;
            $('.product-list').css('marginLeft', -relativeposition);
        }
    });
}
try{
customevent.subscribe('layout',
function(layout, minpoint, maxpoint, fromResize) {
    loadSlider(layout);
});
}catch(e){}
var openmenu = false;
function mobileFunctions() {
    $('#mobile-more > a, #mobile-products > a').bind('click',
    function() {
        if ($(this).parent().index() === openmenu) closeMobileMenu();
        else openMobileMenu(this);
        return false;
    });
}
function openMobileMenu(el) {
    if ($(el).parent().index() === openmenu) return false;
    var $masthead = $('.masthead') || $('#content'),
    height = $(el).siblings('ul').height();
    $masthead.animate({
        'marginTop': 0
    },
    'fast',
    function() {
        $('.nav-mobile li ul').css('zIndex', 1);
        $(el).siblings('ul').css('zIndex', 1000);
        $masthead.animate({
            'marginTop': height
        },
        'fast',
        function() {
            openmenu = $(el).parent().index();
        });
        menuopen = true;
    });
}
function closeMobileMenu() {
    $('.masthead').stop().animate({
        'marginTop': 0
    },
    'fast',
    function() {
        openmenu = false;
    });
} (function(win, $, undef) {
    var tooltip, alt, $el;
    $(document).ready(function() {
        $('abbr').bind('mouseover',
        function() {
            addtooltip(this);
        });
        $('abbr').bind('mouseout',
        function() {
            removetooltip();
        });
        $('abbr').bind('click',
        function() {
            removetooltip();
        });
    });
    function addtooltip(element) {
        $el = $(element)
        alt = $(element).attr('title');
        $(element).attr('title', '');
        tooltip = $('<p class="dealer-tooltip">' + alt + '</p>');
        $('body').prepend(tooltip);
        var elwidth = $(element).width(),
        offset = $(element).offset(),
        x = offset.left,
        y = offset.top;
        tooltip.css({
            'position': 'absolute',
            'top': '-9999em',
            'left': '-9999em'
        });
        ttwidth = tooltip.width() + parseInt(tooltip.css('paddingLeft')) + parseInt(tooltip.css('paddingRight'));
        xpos = x - (ttwidth - elwidth) / 2;
        if (xpos < 10) xpos = 10;
        tooltip.css({
            'zIndex': 5000,
            'top': y - 50,
            'left': xpos,
            'opacity': 0
        }).animate({
            'top': y - 30,
            'opacity': 1
        },
        200);
    }
    function removetooltip() {
        $el.attr('title', alt);
        tooltip.remove();
    }
})(this, jQuery);

try{
customevent.subscribe('layout',
function(l) {
    if (l == 'small' || l == 'mobile') {
        $('.accordion').accordion('destroy');
    }
    else {
        $('.accordion').accordion({
            header: 'h3',
            changestart: function(event, ui) {
                usgotoDealer(ui.options.active, false);
            }
        });
    }
});
}catch(e){}
var bounds;
function initmap() {
    var latlng = new google.maps.LatLng(dealers[0].lat, dealers[0].lng);
    var myOptions = {
        zoom: 8,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        streetViewControl: false
    };
    map = new google.maps.Map(document.getElementById("us-map"), myOptions);
    bounds = new google.maps.LatLngBounds();
    usaddhomemarker(map, hme[1], hme[2]);
    dlatlng = new google.maps.LatLng(hme[1], hme[2]);
    bounds.extend(dlatlng);
    $('.reset-map').live('click',
    function() {
        usresetMap(map);
        return false;
    });
    $('.zoommap a').live('click',
    function() {
        uszoomtoDealer($(this).attr('data-marker-num'));
        return false;
    });
    var circleOptions = {
        strokeColor: "#333",
        strokeOpacity: 0.8,
        strokeWeight: 1,
        fillColor: "#333",
        fillOpacity: 0,
        map: map,
        center: dlatlng,
        radius: 100 * 1609.344
    };
    var circle = new google.maps.Circle(circleOptions);
    var marker, dealercount = dealers.length;
    for (i = 0; i < dealercount; i++) {
        d = dealers[i];
        marker = usaddmarker(map, d.name, d.lat, d.lng, i);
        marker.latlng = new google.maps.LatLng(d.lat, d.lng);
        marker.distance = Math.round(d.distance * 10) / 10;
        marker.name = d.name;
        marker.id = d.id;
        marker.index = i;
        markers[i] = marker;
        google.maps.event.addListener(marker, 'click',
        function() {
            usgotoDealer(this.index, true);
        });
        google.maps.event.addListener(marker, 'mouseover',
        function(e) {
            pp = getpixelpos(this.latlng);
            tt = dealerTooltip(pp.x, pp.y, this.name, this.distance);
        });
        google.maps.event.addListener(marker, 'mouseout',
        function() {
            tt.remove();
        });
        bounds.extend(marker.latlng);
    }
    map.fitBounds(bounds);
}
function usresetMap(m) {
    m.fitBounds(bounds);
}
function usaddmarker(map, name, lat, lng, i) {
    var icon = '/assets/images/interface/dealers/dealer-map-' + (i + 1) + '.png';
    var shadow = new google.maps.MarkerImage('/assets/images/interface/dealer-shadow.png', new google.maps.Size(59, 25), new google.maps.Point(0, 0), new google.maps.Point(1, 24));
    var latlng = new google.maps.LatLng(lat, lng);
    var marker = new google.maps.Marker({
        position: latlng,
        map: map,
        icon: icon,
        shadow: shadow
    });
    return marker;
}
function usaddhomemarker(map, lat, lng) {
    var latlng = new google.maps.LatLng(lat, lng);
    var marker = new google.maps.Marker({
        position: latlng,
        map: map,
        icon: '/assets/images/interface/dealer-home.png'
    });
}
function usgotoDealer(n, acc) {
    obj = markers[n];
    if (!_isie7 && !_isie8) {
        map.panTo(obj.latlng);
    } else {
        map.setCenter(obj.latlng);
    }
    if (acc) $('.accordion').accordion('activate', obj.index);
}
function uszoomtoDealer(n, acc) {
    obj = markers[n];
    map.setZoom(14);
    if (!_isie7 && !_isie8) {
        map.panTo(obj.latlng);
    } else {
        map.setCenter(obj.latlng);
    }
    if (acc) $('.accordion').accordion('activate', obj.index);
}
$(function() {
    if ($('.us-dealer-tabs').length > 0) usdealertabs();
});
function usdealertabs() {
    var o = $('.us-dealer-tabs'),
    f = 0;
    var s = o.find('li:eq(' + f + ') a').attr('href').replace('/', '');
    o.find('li').each(function() {
        t = $(this).find('a').eq(0).attr('href').replace('/', '');
        $(t).addClass('visuallyhidden');
    });
    $(s).addClass('active-tab-element').removeClass('visuallyhidden');
    o.find('li:eq(' + f + ')').addClass('current');
    o.find('li a').live('click',
    function() {
        s = $(this).attr('href').replace('/', '');
        $('.active-tab-element').removeClass('active-tab-element').addClass('visuallyhidden');
        $(s).addClass('active-tab-element').removeClass('visuallyhidden');
        o.find('li.current').removeClass('current');
        $(this).parent().addClass('current');
        if ($('#us-map').length > 0) {
            initmap();
        }
        return false;
    });
}
$(document).ready(function(){
	if($('#bgnav li').length>0){
		$('#bgnav li').click(function(){
			$('#bgnav li').removeClass('current');
			$(this).addClass('current');
			$('#bg div.current').fadeOut();
			$('#bg div').removeClass('current');
			$('#bg div[index='+$(this).find('a').html()+']').fadeIn('slow',function(){
				$(this).addClass('current');
			});
		});	
		window.setInterval(function(){
			if($('#bgnav li.current').find('a').html() == $('#bgnav li').last().find('a').html()){
				$('#bgnav li').first().trigger('click');
			}else{
				$('#bgnav li.current').next().trigger('click');
			}
		}, 4000);
	}
});