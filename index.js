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
  return function EE( subject ) {
    subject = subject || this;
    if ( subject === (global||window) ) { return new EE(); }
    subject._events = {};
    subject.on = function( name, handler ) {
      (this._events[name]=this._events[name]||[])
        .push(handler);
      return this;
    };
    subject.off = function( name, handler ) {
      this._events[name]= (this._events[name]||[])
        .filter(function(listener) {
          return handler !== listener;
        });
      return this;
    };
    subject.emit = function() {
      var args = Array.prototype.slice.call(arguments),
          name = args.shift(),
          list = (this._events[name]=this._events[name]||[]).concat(this._events['*']||[]);
      list.forEach(function(handler) {
        handler.apply(this,args.slice());
      });
      return this;
    };
    subject.once = function( name, handler ) {
      this.on(name,function g() {
        this.off(name,g);
        handler.apply(this,arguments);
      });
    };
    subject.addListener    = this.on;
    subject.removeListener = this.off;
    subject.trigger        = this.emit;
  };
});
