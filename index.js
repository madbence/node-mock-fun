/**
 * Returns a `before` hook, that overrides the given property of `obj`
 * with `fun`.
 */
exports.override = function override(obj, prop, fun) {
  return function() {
    var old = obj[prop];
    var mock = function() {
      mock.called = true;
      mock.calledTimes++;
      fun.apply(this, arguments);
    };
    mock.called = false;
    mock.calledTimes = 0;
    mock.old = old;
    obj[prop] = mock;
  };
};

/**
 * Return an `after` hook function, that restores the overridden function.
 */
exports.restore = function restore(obj, prop) {
  return function() {
    obj[prop] = obj[prop].old;
  };
};
