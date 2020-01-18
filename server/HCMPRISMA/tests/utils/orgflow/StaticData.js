function Clazz() {};
Clazz.staticMethod = function() {
    alert('STATIC!!!');
};

Clazz.prototype.func = function() {
    this.constructor.staticMethod();
}

var obj = new Clazz();
obj.func(); // <- Alert's "STATIC!!!"