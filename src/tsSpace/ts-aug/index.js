var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var tom = {
    id: 89757,
    name: 'Tom',
    age: 25,
    gender: 'male'
};
var mySearch;
mySearch = function (source, subString) {
    return source.search(subString) !== -1;
};
function isFish(animal) {
    if (typeof animal.swim === 'function') {
        return true;
    }
    return false;
}
function testAnimal(animal) {
    return animal;
}
function testCat(cat) {
    return cat;
}
var animal = {
    name: 'tom'
};
// let tomCat: Cat = animal
// tomCat.run()
var Days;
(function (Days) {
    Days[Days["Sun"] = 7] = "Sun";
    Days[Days["Mon"] = 8] = "Mon";
    Days[Days["Tue"] = 9] = "Tue";
    Days[Days["Wed"] = 10] = "Wed";
    Days[Days["Thu"] = 11] = "Thu";
    Days[Days["Fri"] = 12] = "Fri";
    Days[Days["Sat"] = 'S'] = "Sat";
})(Days || (Days = {}));
;
var NAnimal = /** @class */ (function () {
    function NAnimal(name) {
        this.name = name;
    }
    NAnimal.prototype.move = function () {
        console.log('roaming the earch...');
    };
    return NAnimal;
}());
var NCat = /** @class */ (function (_super) {
    __extends(NCat, _super);
    function NCat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NCat.prototype.makeSound = function () {
        console.log('meow meow');
    };
    NCat.prototype.eat = function () {
        console.log('eat fish');
    };
    return NCat;
}(NAnimal));
var nCat = new NCat('tom');
nCat.eat();
nCat.makeSound();
console.log(nCat.name);
function createArray(length, value) {
    var result = [];
    for (var i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}
var strArr = createArray(3, 'x');
var booleanArr = createArray(5, false);
function swap(tuple) {
    return [tuple[1], tuple[0]];
}
swap([7, 'seven']);
var _createArray;
_createArray = function (length, value) {
    var result = [];
    for (var i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
};
_createArray(3, 'x');
var DataHolder = /** @class */ (function () {
    function DataHolder() {
        this.data = 'Initial Data';
        this.data = 123;
    }
    return DataHolder;
}());
var person = {
    name: 'Tom',
    gender: 'male'
};
var myTypeValue = {
    name: 'Tom',
    sex: 'male',
    say: function () {
        console.log('say');
    }
};
// console.log(person)
