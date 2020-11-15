(function(factory) {
  /** global: define */
  if ( ( 'undefined' !== typeof module ) && ( 'undefined' !== typeof module.exports ) ) {
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
    var root = (new Function('return this;')).call();
    subject = subject || this;
    if (subject === root) return new EE();
    var events = {};
    subject.__proto__ = Object.assign({},subject.__proto__,{
      on: function( name, handler ) {
        if ('function' !== typeof handler) return this;
        (events[name]=events[name]||[]).push(handler);
        return this;
      },
      off: function( name, handler ) {
        events[name] = (events[name]||[]).filter(function(fn) {
          return handler !== fn;
        });
        return this;
      },
      emit: function( name, data ) {
        var args = [].slice.call(arguments);
        name = args.shift(),
        list = (events[name]=events[name]||[]).concat(events['*']||[]);
        list.forEach(function(handler) {
          handler.apply(this,args.slice());
        });
        return this;
      },
      once: function( name, handler ) {
        return this.on(name,function fn() {
          this.off(name,fn);
          this.apply(this,arguments);
        });
      },
    });
    return subject;
  };
});
