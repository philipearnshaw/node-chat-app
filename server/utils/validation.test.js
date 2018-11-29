const expect = require('expect');

var {isRealString} = require('./validation');

describe('isRealString', () => {
  it('should reject non-string values', () => {
    var val = 98;
    expect(isRealString(val)).toBe(false);
  });

  it('should reject string with only spaces', () => {
    var val = '   ';
    expect(isRealString(val)).toBe(false);
  });

  it('should allow string with non-space character', () => {
    var val = ' the string ';
    expect(isRealString(val)).toBe(true);
  });
});
