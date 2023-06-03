/*! Image Map Resizer (imageMapResizer.min.js ) - v1.0.10 - 2019-04-10
 *  Desc: Resize HTML imageMap to scaled image.
 *  Copyright: (c) 2019 David J. Bradshaw - dave@bradshaw.net
 *  License: MIT
 */

!function() {
    "use strict";

    function r() {
        // Function to resize the image map coordinates
        function e() {
            var r = {
                width: u.width / u.naturalWidth,
                height: u.height / u.naturalHeight
            };

            var a = {
                width: parseInt(window.getComputedStyle(u, null).getPropertyValue("padding-left"), 10),
                height: parseInt(window.getComputedStyle(u, null).getPropertyValue("padding-top"), 10)
            };

            i.forEach(function(e, t) {
                var n = 0;
                o[t].coords = e.split(",").map(function(e) {
                    var t = 1 === (n = 1 - n) ? "width" : "height";
                    return a[t] + Math.floor(Number(e) * r[t]);
                }).join(",");
            });
        }

        // Helper function to normalize coordinate values
        function t(e) {
            return e.coords.replace(/ *, */g, ",").replace(/ +/g, ",");
        }

        // Function to handle the resize event
        function n() {
            clearTimeout(d);
            d = setTimeout(e, 250);
        }

        // Function to get the image element associated with the map
        function r(e) {
            return document.querySelector('img[usemap="' + e + '"]');
        }

        var a = this,
            o = null,
            i = null,
            u = null,
            d = null;

        if (typeof a._resize !== "function") {
            o = a.getElementsByTagName("area");
            i = Array.prototype.map.call(o, t);
            u = r("#" + a.name) || r(a.name);
            a._resize = e;

            // Attach event listeners
            u.addEventListener("load", e, !1);
            window.addEventListener("focus", e, !1);
            window.addEventListener("resize", n, !1);
            window.addEventListener("readystatechange", e, !1);
            document.addEventListener("fullscreenchange", e, !1);

            // Check if the image is already loaded and has correct dimensions
            if (u.width === u.naturalWidth && u.height === u.naturalHeight) {
                e();
            }
        } else {
            a._resize();
        }
    }

    // Function to handle the image maps
    function e() {
        function t(e) {
            e && (function(e) {
                if (!e.tagName) throw new TypeError("Object is not a valid DOM element");
                if ("MAP" !== e.tagName.toUpperCase()) throw new TypeError("Expected <MAP> tag, found <" + e.tagName + ">.");
            }(e), r.call(e), n.push(e));
        }

        var n;

        return function(e) {
            switch (n = [], typeof e) {
                case "undefined":
                case "string":
                    Array.prototype.forEach.call(document.querySelectorAll(e || "map"), t);
                    break;
                case "object":
                    t(e);
                    break;
                default:
                    throw new TypeError("Unexpected data type (" + typeof e + ").");
            }
            return n;
        };
    }

    // Check AMD and CommonJS environments
    if (typeof define === "function" && define.amd) {
        define([], e);
    } else if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = e();
    } else {
        window.imageMapResize = e();
    }
}();
//# sourceMappingURL=imageMapResizer.map
