function* tokenize(poly) {
  poly = poly.replace(/\s/g, '')
  if (poly[0] !== "-")
    poly = "+" + poly;
  for (let nextOp = poly.search(/[^\^](\+|-)/) + 1;
      nextOp > 0; 
      poly = poly.substring(nextOp),
      nextOp = poly.search(/[^\^](\+|-)/) + 1) {
    console.log(poly + "  " + nextOp)
    yield poly.slice(0, nextOp)
  }
  yield poly
}


class Term {
  constructor(coefficient, exponent) {
    this.coefficient = Number(coefficient)
    this.exponent = Number(exponent)
  }
  
  toString = () => {
    if (this.exponent.valueOf() === 0)
        return `${this.coefficient}`;
    if (this.coefficient.valueOf() === 1 &&               
        this.exponent.valueOf() === 1)
      return 'x'
    if (this.coefficient.valueOf() === 1)
      return `x^${this.exponent}`;
    if (this.exponent.valueOf() === 1)
      return `${this.coefficient}x`;
    return `${this.coefficient}x^${this.exponent}`;
  }
}



function termify(str){
  let xIndex = str.indexOf('x')
  let coefficient
  let exponent

  if (/lemons?/.test(str.toLowerCase())) {
    throw SyntaxError("I don’t want your damn lemons, what the  hell am I supposed to do with these? I demand to see your manager! I'll make you rue the day you thought you could give me lemons! Do you know who I am? I’m the man who’s gonna burn your house down! With the lemons! I’m gonna get my engineers to invent a combustible lemon that burns your house down!")
  }
  
  if (xIndex < 0) {
    if (/^(\+|-)\d+(.\d+)?$/.test(str))
      return new Term(str, 0)
    else
      throw SyntaxError("number gods are mad at you >:(")
  }
  
  if (xIndex > 1) {
    coefficient = str.substring(0, xIndex)
    console.log()
    if (!/^(\+|-)\d+(.\d+)?$/.test(coefficient))
      throw SyntaxError("number gods are mad at you >:(")
  }
  else {
    if (str[0] === '-')
      coefficient = -1
    else if (str[0] === '+')
      coefficient = 1
    else
      throw SyntaxError(`wtf is ${str[0]}x?`)
  }

  if (xIndex === str.length - 1)
    return new Term(coefficient, 1)
  if (str[xIndex + 1] !== '^')
    throw SyntaxError("Am hangry. Where caret?")
  exponent = str.substring(xIndex + 2)
  if (!/^-?\d+$/.test(exponent))
    throw SyntaxError("Where whole number? ;-;")
  return new Term(coefficient, exponent)
}


function derivative(poly) {
  result = ""
  let terms = tokenize(poly)
  for (let term of terms) {
    console.log(term + " termified: " + termify(term))
    derived = derive(termify(term))
    coefficient = derived.coefficient.valueOf()
    if (coefficient !== 0) {
      if (coefficient > 0)
        result += '+'
      result += derived
    }
  }
  if (result[0] === '+')
    return result.substring(1)
  if (result === '')
    return '0'
  return result
}

function derive(term) {
  exponent = term.exponent.valueOf()
  coefficient = term.coefficient.valueOf()
  if (exponent === 0)
    return new Term(0, 0)
  return new Term(coefficient*exponent, exponent - 1)
}
