/**
 *  클로저(Closure)
 *    자기 자신이 정의된 환경에서 함수 안에 있는 자유 변수의 식별자 결정을 실행한다.
 *
 *    - 클로저를 이해하기 위한 핵심 사항
 *
 *        ㆍ 외부 함수를 호출하면 그 함수의 렉시컬 환경 컴포넌트가 생성됩니다.
 *           그리고 그 안에 중첩된 중첩 함수의 함수 객체를 생성해서 반환합니다.
 *           그 결과 외부 함수의 렉시컬 환경 컴포넌트를 참조하는 중첩 함수가 정의한 클로저가 생성됩니다.
 *           즉, 외부 함수는 클로저를 생성하는 팩토리 함수라고 할 수 있습니다.
 *        ㆍ 외부 함수의 함수 객체가 있는 한 외부 함수가 속한 렉시컬 환경 컴포넌트는 지워지지 않습니다.
 *           외부 함수의 함수 객체가 사라져도 지워지지 않습니다.
 *        ㆍ 클로저 내부 상태(외부 함수의 지역 변수, 선언적 환경 레코드)는 외부로부터 은폐되어 있으며
 *           중첩 함수안에서만 읽거나 쓸 수 있습니다.
 *
 *  Closure
 *    Performs identifier determination of free variables in functions in the environment in which they are defined.
 *
 *    - Key to understanding closures
 *
 *      • Calling an external function creates a lexical environment component for that function.
 *        It creates and returns a function object of the nested function nested inside it.
 *        The result is a closure defined by a nested function that references the lexical environment component of the external function.
 *        In other words, external functions are factory functions that create closures.
 *
 *      • As long as there is a function object of an external function,
 *        the lexical environment component to which the external function belongs is not deleted.
 *        The disappearance of a function object from an external function does not clear it.
 *
 *      • The internal state of a closure (local variables of external functions, declarative environment records) is hidden from the outside
 *        and can only be read or written within nested functions.
 */

// simple example
function makeCounter() {
    var count = 0;
    return function() {
        return count++;
    };
}
var counter = makeCounter();
console.log(counter());
console.log(counter());
console.log(counter());

// 클로저를 응용한 예제 (Closure Example)
/**
 * 사용자의 데이터를 저장하는 클로저를 생성하는 함수
 * (Function to create a closure that stores the user's data)
 * @param {String} name 사용자의 이름(User's name)
 * @param {Number} age 사용자의 나이(User's age)
 */
function Person(name, age) {
    var _name = name;
    var _age = age;
    return {
        getName: function() {
            return _name;
        },
        getAge: function() {
            return _age;
        },
        setAge: function(x) {
            _age = x;
        }
    };
}
var person = Person("Tom", 18);
console.log(person.getName());
console.log(person.getAge());
person.setAge(19);
console.log(person.getAge());

// 함수 팩토리 (Function Factory)
/**
 * x번 곱하는 함수를 생성하는 함수
 * (Function to create a function that multiplies x times)
 * @param {Number} x 임의의 정수 (Any integer)
 */
function makeMultiplier(x) {
    return function(y) {
        return x * y;
    };
}
var multi2 = makeMultiplier(2);
var multi10 = makeMultiplier(10);
console.log(multi2(3));
console.log(multi10(3));

// 초기화 기능이 추가된 함수 생성하기 (Create a function with added initialization)
/**
 * 임의의 소수의 곱을 출력하는 함수를 생성하는 함수
 * (Function to create a function that outputs a random prime product)
 * @param {Number} n 임의의 정수 (Any integer)
 */
function Primes(n) {
    var p = [];
    for (var i = 2; i <= n; i++) p[i] = true;
    var max = Math.floor(Math.sqrt(n));
    var x = 2;
    while (x <= max) {
        for (var i = 2 * x; i <= n; i += x) p[i] = false;
        while (!p[++x]);
    }

    var primes = [],
        nprimes = 0;
    for (var i = 2; i <= n; i++) if (p[i]) primes[nprimes++] = i;
    p = null;

    return function(m) {
        for (var i = 0, product = 1; i < m; i++) {
            product += primes[Math.floor(Math.random() * nprimes)];
        }
        return product;
    };
}
var primeProduct = Primes(100000);
console.log(primeProduct(2));
console.log(primeProduct(2));
