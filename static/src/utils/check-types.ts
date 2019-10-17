const isAnything = type => {
  return val => Object.prototype.toString.call(val) === type;
};

export const isString = isAnything('[object String]');

export const isObject = isAnything('[object Object');
