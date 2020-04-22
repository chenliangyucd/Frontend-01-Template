
/*
0000 0000-0000 007F | 0xxxxxxx 一字节编码
0000 0080-0000 07FF | 110xxxxx 10xxxxxx 二字节编码
0000 0800-0000 FFFF | 1110xxxx 10xxxxxx 10xxxxxx 三字节编码
0001 0000-0010 FFFF | 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx 四字节编码
*/
// 依据字节数拼接代码
function literal(charStr, byteLength) {
    let charLength = charStr.length - 1;
    let tempLength = byteLength
    let arrs = [];
    
    for (;tempLength > 1;tempLength--) {
      let teers = []; 
      let j = 0;
      for (;charLength >=0 && j < 6; charLength--,j++) {
         teers.push(charStr[charLength]);
      }
      teers.push(0);
      teers.push(1);
      arrs.push(teers.reverse())
    }
    arrs.reverse(); 
    
    byteLength = byteLength === 1? 0 : byteLength;
    tempLength = byteLength;
    let heads = [];
    for (;tempLength > 0; tempLength--) {
      heads.push(1);
    }
    heads.push(0);
    
    let tailLength = 8 - byteLength - 1;
    let tails = [];
    for (;charLength >=0 ; charLength--) {
       tails.push(charStr[charLength]);
       tailLength--
    }

    for (let i =0; i < tailLength; i++) {
       tails.push(0);
    }
    
    heads = heads.concat(tails.reverse());
    
    let str = heads.join('');
    
    for (let i =0; i < arrs.length; i++) {
       str += arrs[i].join('');
    }

    return str;
    
}
        
function utf8Encoding(str) {
  if (typeof str !== 'string') {
      return '';
  }
  
  let strs = [];
  
  for (let ch of str) {
       let charCode = ch.codePointAt(0);
       let charStr = charCode.toString(2);
      if (charCode <= 0x007f) {
          // 转换成1字节utf-8
          strs.push(literal(charStr, 1));
      } else if (charCode <= 0x07ff) {
        // 转换成2字节utf-8
         strs.push(literal(charStr, 2));
      } else if (charCode <= 0xffff) {
         // 转换成3字节utf-8
         strs.push(literal(charStr, 3));
      } else { 
        // 转换成4字节utf-8
         strs.push(literal(charStr, 4));
      }
  }
  

  return strs.join(' ');
}




console.info(utf8Encoding("严𠮷a"));