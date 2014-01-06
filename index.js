/* jshint plusplus: false */

exports.override = function override(obj, prop, fun) {
  function mock(fun) {
    var old = obj[prop];
    var wrapper = function() {
      wrapper.called = true;
      wrapper.calledTimes++;
      fun.apply(this, arguments);
    };
    wrapper.called = false;
    wrapper.calledTimes = 0;
    wrapper.old = old;
    obj[prop] = wrapper;
  }
  if(fun) {
    return function() {
      mock(fun);
    };
  } else {
    return function(fun) {
      mock(fun);
    };
  }
};

exports.restore = function restore(obj, prop, full) {
  return function() {
    obj[prop] = obj[prop].old;
    while(full && obj[prop].old) {
      obj[prop] = obj[prop].old;
    }
  };
};
