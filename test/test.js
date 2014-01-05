var mf = require('../');
var override = mf.override;
var restore = mf.restore;
var should = require('should');

describe('override', function() {
  it('should return a function', function() {
    var fun = function() {};
    var obj = {
      prop: fun,
    };
    override(obj, 'prop', function() {}).should.be.an.instanceOf(Function);
  });
  it('should return a function that overrides the given function', function() {
    var fun = function() {};
    var obj = {
      prop: fun,
    };
    var mock = function() {};
    override(obj, 'prop', mock)();
    obj.prop.should.not.equal(fun);
  });
  describe('overridden function', function() {
    var obj, called, ocalled;
    var mock = function() { called = true; };
    beforeEach(function() {
      called = false;
      ocalled = false;
      var o = {
        p: function() { ocalled = true; }
      };
      override(o, 'p', mock)();
      obj = o;
    });
    it('should have called property', function() {
      should.exist(obj.p.called);
      obj.p.called.should.be.false;
    });
    it('should have calledTimes property', function() {
      should.exist(obj.p.calledTimes);
      obj.p.calledTimes.should.equal(0);
    });
    it('should update called property if function is called');
    it('should update calledTimes property if function is called');
    it('should not call the original function');
    it('should call the override function');
  });
});

describe('restore', function() {
  it('should restore the overridden function', function() {
  });
});
