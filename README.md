node-mock-fun [![Build Status](https://travis-ci.org/madbence/node-mock-fun.png?branch=master)](https://travis-ci.org/madbence/node-mock-fun) [![Coverage Status](https://coveralls.io/repos/madbence/node-mock-fun/badge.png)](https://coveralls.io/r/madbence/node-mock-fun)
=============

Mock functions

## Install

```
npm install mock-fun
```

## Usage

Use with mocha :3

## `.override(obj, prop)`

Returns a `hook(fun)` function, that can override `prop` in `obj`
with a wrapper function that calls `fun` transparently
(keeping context&parameters). The wrapper function manages the
`called` and `calledTimes` property.
`fun` defaults to noop.

## `.restore(obj, prop)`

Returns a `hook` function that restores the original function.
You should use it as an `afterEach` hook.

## Example

```js
var override = require('mock-fun').override;
var restore = require('mock-fun').restore;

// Override per `it`
describe('My library method `fun`', function() {
  var o = override(mylib, 'otherFun');
  afterEach(restore(mylib, 'otherFun'));
  it('should call `otherFun`', function() {
    o(); // default override function is noop
    mylib.fun();
    mylib.otherFun.called.should.be.true;
  });
  it('should call `otherFun` with correct parameter', function() {
    o(function(a) {
      a.should.equal('foobar');
    });
    mylib.fun();
  });
  it('should call `otherFun` with the context of `mylib`', function() {
    o(function() {
      this.should.equal(mylib);
    });
    mylib.fun();
  });
});

// Override per `describe`
describe('My library method `fun`', function() {
  before(override(mylib, 'findById', function(id, cb) {
    cb(null, new User({ foo: 'bar' }));
  }));
  after(restore(mylib, 'findById'));
  it('should query for a user', function() {
    mylib.fun(1337, function(err, user) {
      user.foo.should.equal('bar');
    });
  });
});
```

## License

MIT
