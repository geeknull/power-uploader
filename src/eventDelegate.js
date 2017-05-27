/*
* the event delegate library
*
* */

module.exports = Delegate;

function isArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
}

function Delegate (root) {
    var rootElement = null;

    if ( typeof root === 'string' ) {
        rootElement = document.querySelector(root);
    } else {
        rootElement = root;
    }

    if ( !rootElement ) {
        throw new Error('please give valid root element or root selector');
        return void 0;
    }

    this.root = rootElement;
    this.eventPool = {}; // save event callback function
}

Delegate.prototype.on = function (event, selector, callback) {
    var selectorArr = isArray(selector) ? selector : selector.split(',');
    if ( !this.eventPool[event] ) { this.eventPool[event] = []; }
    var eventFunc = function (e) {

        for ( var i = 0, len = selectorArr.length; i < len; i++ ) {
            if ( e.target.closest(selectorArr[i]) ) {
                callback(e);
            }
        }
    };
    this.eventPool[event].push(eventFunc);
    this.root.addEventListener(event, eventFunc, false);
};

Delegate.prototype.off = function (event) {
    var curEvPool = this.eventPool[event];
    if ( curEvPool ) {
        for ( var i = 0, len = curEvPool.length; i < len; i++ ) {
            this.root.removeEventListener(event, curEvPool[i]);
        }
    }
};




/**
 * Finds the closest parent that matches a selector.
 *
 * @param {Element} element
 * @param {String} selector
 * @return {Function}
 */
if (typeof Element.prototype.closest !== 'function') {
    Element.prototype.closest = function closest(selector) {
        var element = this;

        while (element && element.nodeType === 1) {
            if (element.matches(selector)) {
                return element;
            }

            element = element.parentNode;
        }

        return null;
    };
}

// matches hack
if (typeof Element !== 'undefined' && !Element.prototype.matches) {
    var proto = Element.prototype;
    proto.matches = proto.matchesSelector ||
        proto.mozMatchesSelector ||
        proto.msMatchesSelector ||
        proto.oMatchesSelector ||
        proto.webkitMatchesSelector;
}
