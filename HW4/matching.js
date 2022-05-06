const regexes = {
    canadianPostalCode:  /^[A-CEGHJ-NPR-TVXY]\d[A-CEGHJ-NPR-TV-Z] \d[A-CEGHJ-NPR-TV-Z]\d$/,
    visa: /^4\d{12}(\d{3})?$/,
    masterCard: /^((5[1-5]\d{14})|(2([3-6]\d\d|22[1-9]|2[3-9]\d|7[01]\d|720)\d{12}))$/,
    adaFloat: 
    /^((\d(_?\d)*(\.\d(_?\d)*)?(E[+-]?\d(_?\d)*)?)|(\d(_?\d)*#[0-9A-F](_?[0-9A-F])*(\.[0-9a-A](_?[0-9a-F])*)?#(E[+-]?\d(_?\d)*)?))$/i,//TODO
    notThreeEndingInOO: /^(?!^.[oO]{2}$).*$/u,
    divisibleBy32: /^(1[01]*00000|0+)$/,
    sevenThroughThirtyOne: /^([7-9]|[1-2]\d|3[01])$/,
    mLComment: /^(\(\*((?!\*\)).)*\*\)|\(\*((?!\(\*).)*\*\))$/,
    notFileForFirstNoLookAround:
    /^([a-eg-z][a-z]*|f([a-hj-np-z][a-z]*)?|fo([a-qs-z][a-z]*)?|fi([a-km-qs-z][a-z]*)?|fil([a-df-z][a-z]*)?|fir([a-rt-z][a-z]*)?|firs([a-su-z][a-z]*)?|first[a-z]+|file[a-z]+|for[a-z]+)?$/i,
    notFileForFirstWithLookAround: /^(?!^(file|for|first)$)[a-zA-Z]*$/,
    cOctal: /^0[0-7]*$/,
    restrictedFloatingPoint: /^\d+(\.\d*)?(E[+-]?\d{1,3})?$/,
    palindrome2358: /^((.)\2|(.).\3|(.)(.).\5\4|(.)(.)(.)(.)\9\8\7\6)$/u, //I hate this
    noNegativeIntLits: /^(?<!-)(\d+)$/,
    repeated: /^([a-z]+)\1$/,
  }
  
  export function matches(name, string) {
    return regexes[name].test(string)
  }