var objs = new Set();
var objects = [ eval, isFinite, isNaN, parseFloat, parseInt, decodeURI, decodeURIComponent, encodeURI, encodeURIComponent, Array, Date, RegExp, Promise, Proxy, Map, WeakMap, Set, WeakSet, Function, Boolean, String, Number, Symbol, Object, Error, EvalError, RangeError, ReferenceError, SyntaxError, TypeError, URIError, ArrayBuffer, SharedArrayBuffer, DataView, Float32Array, Float64Array, Int8Array, Int16Array, Int32Array, Uint8Array, Uint16Array, Uint32Array, Uint8ClampedArray, Atomics, JSON, Math, Reflect];
objects.forEach(o => objs.add(o));

for (let i = 0; i < objects.length; i++) {
  let names = Object.getOwnPropertyNames(objects[i]);

  for (let j = 0; j < names.length; j++) {
    let des = Object.getOwnPropertyDescriptor(objects[i], names[j]);

    if (des.value !== null && des.value !== undefined) {
      let typeName = typeof des.value;
      if (typeName === 'object' || typeName === 'function') {
      	if(!objs.has(des.value)) {
      	  objs.add(des.value)
      	  objects.push(des.value);
      	}    
      }

      if (des.get !== null && des.get !== undefined) {
      	if(!objs.has(des.get)) {
      	  objs.add(des.get)
      	  objects.push(des.get);
      	}
      }

      if (des.set !== null && des.set !== undefined) {
      	if(!objs.has(des.set)) {
      	  objs.add(des.set)
      	  objects.push(des.set);
      	}
      }
    }
  }
}
// 总共384个
console.info(objects);