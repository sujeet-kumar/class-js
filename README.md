# class-js
Class.js: JavaScript Inheritance

-by Sujeet <sujeetkv90@gmail.com>

Usage Example:

```javascript
var BaseClass = createClass({
    name: '',
    url: '',
    
    /* class constructor */
    _init: function (params) {
        if (params.name) {
            this.name = params.name;
        }
        if (params.url) {
            this.url = params.url;
        }
    },
    
    getInfo: function () {
        return this.name + '- ' + this.url;
    }
});

var ChildClass = BaseClass.extend({
    /* class constructor */
    _init: function (params) {
        this._super(params); /* call overridden method of parent class  */
    },
    
    alertInfo: function (url) {
        alert(this.getInfo());
    }
});

var baseClassObj = new BaseClass({name: 'Sujeet', url: 'https://github.com/sujeet-kumar'});

var childClassObj = new ChildClass({name: 'Sujeet', url: 'https://github.com/sujeet-kumar'});
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
        
        _init: function (params) {
            if (params.name) {
                this.name = params.name;
            }
            if (params.url) {
                this.url = params.url;
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
        _init: function (params) {
            this._super(params);
        },

        alertInfo: function (url) {
            alert(this.getInfo());
            log(this.getInfo());
        }
    };
})());
```
