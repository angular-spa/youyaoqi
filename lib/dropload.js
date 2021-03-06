!
function(a) {
    "use strict";
    function c(a) {
        a.touches || (a.touches = a.originalEvent.touches)
    }
    function d(a, b) {
        b._startY = a.touches[0].pageY,
        b._loadHeight = b.$element.height(),
        b._childrenHeight = b.$element.children().height(),
        b._scrollTop = b.$element.scrollTop()
    }
    function e(b, c) {
        c._curY = b.touches[0].pageY,
        c._moveY = c._curY - c._startY,
        c._moveY > 0 ? c.direction = "down": c._moveY < 0 && (c.direction = "up");
        var d = Math.abs(c._moveY);
        "" != c.opts.loadUpFn && c._scrollTop <= 0 && "down" == c.direction && (b.preventDefault(), c.insertDOM || (c.$element.prepend('<div class="' + c.opts.domUp.domClass + '"></div>'), c.insertDOM = !0), c.$domUp = a("." + c.opts.domUp.domClass), h(c.$domUp, 0), d <= c.opts.distance ? (c._offsetY = d, c.$domUp.html("").append(c.opts.domUp.domRefresh)) : d > c.opts.distance && d <= 2 * c.opts.distance ? (c._offsetY = c.opts.distance + .5 * (d - c.opts.distance), c.$domUp.html("").append(c.opts.domUp.domUpdate)) : c._offsetY = c.opts.distance + .5 * c.opts.distance + .2 * (d - 2 * c.opts.distance), c.$domUp.css({
            height: c._offsetY
        })),
        "" != c.opts.loadDownFn && c._childrenHeight <= c._loadHeight + c._scrollTop && "up" == c.direction && (b.preventDefault(), c.insertDOM || (c.$element.append('<div class="' + c.opts.domDown.domClass + '"></div>'), c.insertDOM = !0), c.$domDown = a("." + c.opts.domDown.domClass), h(c.$domDown, 0), d <= c.opts.distance ? (c._offsetY = d, c.$domDown.html("").append(c.opts.domDown.domRefresh)) : d > c.opts.distance && d <= 2 * c.opts.distance ? (c._offsetY = c.opts.distance + .5 * (d - c.opts.distance), c.$domDown.html("").append(c.opts.domDown.domUpdate)) : c._offsetY = c.opts.distance + .5 * c.opts.distance + .2 * (d - 2 * c.opts.distance), c.$domDown.css({
            height: c._offsetY
        }), c.$element.scrollTop(c._offsetY + c._scrollTop))
    }
    function f(b) {
        var c = Math.abs(b._moveY);
        b.insertDOM && ("down" == b.direction ? (b.$domResult = b.$domUp, b.domLoad = b.opts.domUp.domLoad) : "up" == b.direction && (b.$domResult = b.$domDown, b.domLoad = b.opts.domDown.domLoad), h(b.$domResult, 300), c > b.opts.distance ? (b.$domResult.css({
            height: b.$domResult.children().height()
        }), b.$domResult.html("").append(b.domLoad), g(b)) : b.$domResult.css({
            height: "0"
        }).on("webkitTransitionEnd",
        function() {
            b.insertDOM = !1,
            a(this).remove()
        }), b._moveY = 0)
    }
    function g(a) {
        a.loading = !0,
        "" != a.opts.loadUpFn && "down" == a.direction ? a.opts.loadUpFn(a) : "" != a.opts.loadDownFn && "up" == a.direction && a.opts.loadDownFn(a)
    }
    function h(a, b) {
        a.css({
            "-webkit-transition": "all " + b + "ms",
            transition: "all " + b + "ms"
        })
    }
    a.fn.dropload = function(a) {
        return new b(this, a)
    };
    var b = function(b, c) {
        var d = this;
        d.$element = a(b),
        d.insertDOM = !1,
        d.loading = !1,
        d.isLock = !1,
        d.init(c)
    };
    b.prototype.init = function(b) {
        var g = this;
        g.opts = a.extend({},
        {
            domUp: {
                domClass: "dropload-up",
                domRefresh: '<div class="dropload-refresh">↓下拉更新</div>',
                domUpdate: '<div class="dropload-update">↑释放更新</div>',
                domLoad: '<div class="dropload-load">更新中</div>'
            },
            domDown: {
                domClass: "dropload-down",
                domRefresh: '<div class="dropload-refresh">↑上拉加载更多</div>',
                domUpdate: '<div class="dropload-update">↓释放加载</div>',
                domLoad: '<div class="dropload-load">加载中</div>'
            },
            distance: 50,
            loadUpFn: "",
            loadDownFn: ""
        },
        b),
        g.$element.on("touchstart",
        function(a) {
            g.loading || g.isLock || (c(a), d(a, g))
        }),
        g.$element.on("touchmove",
        function(a) {
            g.loading || g.isLock || (c(a, g), e(a, g))
        }),
        g.$element.on("touchend",
        function() {
            g.loading || g.isLock || f(g)
        })
    },
    b.prototype.lock = function() {
        var a = this;
        a.isLock = !0
    },
    b.prototype.unlock = function() {
        var a = this;
        a.isLock = !1
    },
    b.prototype.resetload = function() {
        var b = this;
        b.$domResult && b.$domResult.css({
            height: "0"
        }).on("webkitTransitionEnd",
        function() {
            b.loading = !1,
            b.insertDOM = !1,
            a(this).remove()
        })
    }
} (window.Zepto || window.jQuery);