# JavaScript



## 변수 끌어올리기(hositing)

함수 안에 있는 선언들을 끌어올려서 해당 함수 유호 범위의 최상단에 선언하는 것을 뜻함

```javascript
func();
function func() {
	console.log('Hello Javascript!!!');
}
```

위의 경우 func()의 선언이 밑에있지만 자바스크립트가 func에 대해 전역함수로 지정해 주면서 오류가 발생하지 않게 된다.

```javascript
func();
const func = function() {
	console.log('Hello Javascript!!!');
}
```

하지만 함수 리터럴을 할당하는 구조로 만들게 되면 전역함수로 지정해주지 않아 오류가 발생하게 된다.



## 보간 표현식

백틱('`')을 이용하여 구문을 작성하는 표현식

```javascript
const fileUrl = `./src/temp/${fileName}`;
```

