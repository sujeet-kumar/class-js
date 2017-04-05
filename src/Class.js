/**
 * Class.js: JavaScript Inheritance
 * Inspired from Javascript Inheritance by John Resig <jeresig@gmail.com>
 * http://ejohn.org/blog/simple-javascript-inheritance/
 * 
 * @author Sujeet Kumar <sujeetkv90@gmail.com>
 * @link https://github.com/sujeet-kumar/class-js
 */

(function (globalContext) {
    
    'use strict';
    
    var initializing = false,
        fnParent = /abc/.test(function () {var abc;}) ? /\b_super\b/ : /.*/;
    
    /* the base Class implementation (does nothing) */
    globalContext.Class = function () {};
    
    /* inheritance implementation */
    var extender = function (prop) {
        var _super = this.prototype;
        
        /* instantiate a base class (but only create the instance,
         dont run the _init constructor) */
        initializing = true;
        var prototype = new this();
        initializing = false;
        
        /* copy the properties over onto the new prototype */
        for (var name in prop) {
            prototype[name] = (typeof prop[name] === 'function'
                && typeof _super[name] === 'function'
                && fnParent.test(prop[name]))
                
                ? (function (name, fn) {
                    return function () {
                        var tmp = this._super;
                        /* add a new ._super() method that is the same method
                         but on the super-class */
                        this._super = _super[name];
                        /* the method only need to be bound temporarily, so we
                         remove it when we are done executing */
                        var ret = fn.apply(this, arguments);
                        this._super = tmp;
                        return ret;
                    };
                })(name, prop[name])
                
                : prop[name];
        }
        
        /* the dummy class constructor */
        function Class() {
            /* all construction is actually done in the _init method */
            if (!initializing && this._init && typeof this._init === 'function') {
                this._init.apply(this, arguments);
            }
        }
        
        /* populate our constructed prototype object */
        Class.prototype = prototype;
        
        /* enforce the constructor to be what we expect */
        Class.prototype.constructor = Class;
        
        /* and make this class extendable */
        Class.extend = extender;
        
        return Class;
    };
    
    /* create a new Class that inherits from this class */
    globalContext.Class.extend = extender;
    
    /* create class */
    globalContext.createClass = function (props) {
        return globalContext.Class.extend(props);
    };
    
    /* create namespace in safe way */
    globalContext.createNamespace = function (namespace, parentObject) {
        var createObject = function (obj, n) {
            if (!obj[n]) {
                obj[n] = {};
            }
            return obj[n];
        };
        
        var nsTree = namespace.split('.');
        
        parentObject = parentObject || globalContext;
        
        for (var k in nsTree) {
            parentObject = createObject(parentObject, nsTree[k]);
        }
    };
    
})(window || this);
