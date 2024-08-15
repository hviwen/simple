interface Person {
  readonly id: number;
  name: string;
  age?: number;
  address?: string;
  hasChildren?: boolean;

  [propName: string]: any;
}

let tom: Person = {
  id: 89757,
  name: 'Tom',
  age: 25,
  gender: 'male'
};

interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;

mySearch = function (source: string, subString: string) {
  return source.search(subString) !== -1;
}

interface Animal {
  name: string;
}

interface Cat {
  name: string;

  run(): void;
}

interface Fish {
  name: string;

  swim(): void;
}

function isFish(animal: Cat | Fish) {
  if (typeof (animal as Fish).swim === 'function') {
    return true;
  }
  return false;
}

function testAnimal(animal: Animal) {
  return (animal as Cat);
}

function testCat(cat: Cat) {
  return (cat as Animal);
}

const animal: Animal = {
  name: 'tom'
};

// let tomCat: Cat = animal
// tomCat.run()

enum Days {Sun = 7, Mon, Tue, Wed, Thu, Fri, Sat = <any>'S'};

abstract class NAnimal {
  public name: string;

  public constructor(name: string) {
    this.name = name;
  }

  abstract makeSound(): void;

  move(): void {
    console.log('roaming the earch...');
  }
}

class NCat extends NAnimal {
  public makeSound() {
    console.log('meow meow');
  }

  public eat(): void {
    console.log('eat fish');
  }
}

let nCat: NCat = new NCat('tom');

nCat.eat()
nCat.makeSound()
console.log(nCat.name)

function createArray<T>(length: number, value: T): Array<T> {
  let result: T[] = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result
}

let strArr: string[] = createArray(3, 'x')
let booleanArr: boolean[] = createArray(5, false)

function swap<T, U>(tuple: [T, U]): [U, T] {
  return [tuple[1], tuple[0]]
}

swap([7, 'seven'])

interface CreateArrayFunc<T> {
  (length: number, value: T): Array<T>;
}

let _createArray: CreateArrayFunc<any>;
_createArray = function <T>(length: number, value: T): Array<T> {
  let result: T[] = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result
}

_createArray(3, 'x')

class DataHolder {
  data: string | number;

  constructor() {
    this.data = 'Initial Data';
    this.data = 123
  }
}

type keys = keyof Person
// console.log(keys)

type personKeys = Partial<Person>
// console.log(personKeys)

type personKeys2 = Required<Person>

// console.log(personKeys2)

interface IPersonA {
  name: string;
  age?: number;
}

interface IPersonB {
  name: string;
  gender: string;
}

let person: IPersonB & IPersonA = {
  name: 'Tom',
  gender: 'male'
}

type MyType = {
  name: string;
  say(): void
}

type MyType2 = MyType & {
  sex: string;
}

let myTypeValue: MyType2 = {
  name: 'Tom',
  sex: 'male',
  say(): void {
    console.log('say')
  }
}

function getMyValue<T, U>(arg: [T, U]): [T, U] {
  return arg
}

const treeValue = getMyValue(['tree', 123])
console.log(treeValue)

// console.log(person)

