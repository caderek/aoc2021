Object.defineProperty(Array.prototype, "chain", {
  value: function(fn) {
    return fn(this);
  }
});
Object.defineProperty(Array.prototype, "tap", {
  value: function(fn) {
    fn(this);
    return this;
  }
});
Object.defineProperty(String.prototype, "chain", {
  value: function(fn) {
    return fn(this);
  }
});
Object.defineProperty(String.prototype, "tap", {
  value: function(fn) {
    fn(this);
    return this;
  }
});
//# sourceMappingURL=monkey.js.map
