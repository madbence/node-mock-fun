node-mock-fun
=============

Mock functions

## Install

```
npm install mock-fun
```

## Usage

Use with mocha :3

```js
var override = require('mock-fun').override;
var restore = require('mock-fun').restore;

describe('My library method', function() {
  beforeEach(override(mylib, 'otherFun', function() {}));
  afterEach(restore(mylib, 'otherFun'));
  it('should call `otherFun`', function() {
    mylib.fun();
    mylib.otherFun.called.should.be.true;
  });
});
```

## License

MIT
