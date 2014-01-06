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
    override(obj, 'prop').should.be.an.instanceOf(Function);
  });
  it('should return a function that overrides the given function', function() {
    var fun = function() {};
    var obj = {
      prop: fun,
    };
    var mock = function() {};
    override(obj, 'prop')(mock);
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
      override(o, 'p')(mock);
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
    it('should update called property if function is called', function() {
      obj.p();
      obj.p.called.should.be.true;
    });
    it('should update calledTimes property if function is called', function() {
      obj.p();
      obj.p.calledTimes.should.equal(1);
      obj.p();
      obj.p.calledTimes.should.equal(2);
    });
    it('should not call the original function', function() {
      obj.p();
      ocalled.should.be.false;
    });
    it('should call the override function', function() {
      obj.p();
      called.should.be.true;
    });
    it('should call the global override function if provided', function() {
      var c = false;
      override(obj, 'p', function() { c = true; })();
      obj.p();
      c.should.be.true;
      restore(obj, 'p')();
    });
    it('should call the override function with the correct parameters', function() {
      var obj = {
        p: function() {},
      };
      override(obj, 'p')(function(a, b) {
        a.should.equal(1);
        b.should.equal(2);
      });
      obj.p(1, 2);
    });
    it('should call the override function with the correct context', function() {
      var obj = {
        p: function() {},
      };
      override(obj, 'p')(function() {
        this.should.be.equal(obj);
      });
      obj.p();
    });
  });
});

describe('restore', function() {
  it('should restore the overridden function', function() {
    var f = function() {};
    var obj = {
      p: f
    };
    override(obj, 'p')(function(){});
    restore(obj, 'p')();
    obj.p.should.equal(f);
  });
  it('should restore nested overrides, if needed', function() {
    var f = function() {};
    var obj = {
      p: f
    };
    override(obj, 'p')(function(){});
    override(obj, 'p')(function(){});
    restore(obj, 'p', true)();
    obj.p.should.equal(f);
  });
});
