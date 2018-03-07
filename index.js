(function(factory) {
  /** global: define */
  if ( ( 'undefined' !== module ) && ( 'undefined' !== module.exports ) ) {
    module.exports = factory();
  } else if ( ( 'function' === typeof define ) && define.amd ) {
    define([],factory);
  } else if ( 'undefined' !== typeof window ) {
    window.EE = factory();
  } else if ( 'undefined' !== typeof global ) {
    global.EE = factory();
  } else {
    throw new Error("Could not initialize EE");
  }
})(function() {
  return function EE() {
    if ( this === (global||window) ) { return new EE(); }
    var listeners = [];
    this.on = function( name, handler ) {
      listeners.push({
        name    : name,
        handler : handler,
      });
      return this;
    };
    this.off = function( name, handler ) {
      listeners = listeners.filter(function(listener) {
        return !(listener.name === name && listener.handler === handler );
      });
      return this;
    };
    this.emit = function( name, data ) {
      listeners.forEach(function(listener) {
        if ( listener.name !== name ) return;
        listener.handler( data );
      });
    };
    this.once = function( name, handler ) {
      this.on(name,function g() {
        this.off(name,g);
        handler.apply(undefined,arguments);
      });
    };
    this.addListener    = this.on;
    this.removeListener = this.off;
  };
});
