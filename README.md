# class-js
Class.js: JavaScript Inheritance

-by Sujeet <sujeetkv90@gmail.com>

Usage Example:

```javascript
var BaseClass = createClass({
    name: '',
    url: '',
    
    /* class constructor */
    _init: function (name, url) {
        if (name) {
            this.name = name;
        }
        if (url) {
            this.url = url;
        }
    },
    
    getInfo: function () {
        return this.name + '- ' + this.url;
    }
});

var ChildClass = BaseClass.extend({
    /* class constructor */
    _init: function (name, url) {
        this._super(name, url); /* call overridden method of parent class  */
    },
    
    alertInfo: function (url) {
        alert(this.getInfo());
    }
});

var baseClassObj = new BaseClass('Sujeet', 'https://github.com/sujeet-kumar');

var childClassObj = new ChildClass('Sujeet', 'https://github.com/sujeet-kumar');
```

Private class members can also be defined as:

```javascript
var BaseClass = createClass((function () {
    /* private members */
    var delim = ': ';
    
    /* public members */
    return {
        name: '',
        url: '',
        
        _init: function (name, url) {
            if (name) {
                this.name = name;
            }
            if (url) {
                this.url = url;
            }
        },
        
        getInfo: function () {
            return this.name + delim + this.url;
        }
    };
})());

var ChildClass = BaseClass.extend((function () {
    /* private members */
    var log = function (val) {
        console.log(val);
    };
    
    /* public members */
    return {
        _init: function (name, url) {
            this._super(name, url);
        },

        alertInfo: function (url) {
            alert(this.getInfo());
            log(this.getInfo());
        }
    };
})());
```
