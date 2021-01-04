function add() {
    var _args = Array.prototype.slice.call(arguments);
    var _adder = function() {
        _args.push(...arguments);
        return _adder;
    };
    _adder.toString = () => _args.length !==0 ? _args.reduce((a, b) => a + b ) : ''
    return _adder;
}
console.log(add(1)(2)(3).toString())