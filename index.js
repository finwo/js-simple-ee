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
    this._events = {};
    this.on = function( name, handler ) {
      (this._events[name]=this._events[name]||[])
        .push(handler);
      return this;
    };
    this.off = function( name, handler ) {
      this._events[name]= (this._events[name]||[])
        .filter(function(listener) {
          return handler !== listener;
        });
      return this;
    };
    this.emit = function() {
      var args = Array.prototype.slice.call(arguments),
          name = args.shift();
      (this._events[name]=this._events[name]||[])
        .forEach(function(handler) {
          handler.apply(this,args.slice());
        });
      return this;
    };
    this.once = function( name, handler ) {
      this.on(name,function g() {
        this.off(name,g);
        handler.apply(this,arguments);
      });
    };
    this.addListener    = this.on;
    this.removeListener = this.off;
  };
});
