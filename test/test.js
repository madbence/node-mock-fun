var mf = require('../');
var override = mf.override;
var restore = mf.restore;
var should = require('should');

describe('override', function() {
  it('should return an overridden function');
  describe('overridden function', function() {
    it('should have called property');
    it('should have calledTimes property');
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
