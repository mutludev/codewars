function factorialize(num) {
  if (num < 0) return -1
  else if (num == 0) return 1
  else {
    return num * factorialize(num - 1)
  }
}

function binominalCoefficent(n, k) {
  return factorialize(n) / (factorialize(k) * factorialize(n - k))
}

function binomePartGenerator(i, a, x, b, n) {
  let binomeCoefficent = binominalCoefficent(n, i)
  let number = binomeCoefficent * a ** (n - i) * b ** i

  let frontNumber = number.toString()
  if (n == i) {
    //none
  } else if (frontNumber == '1') {
    frontNumber = ''
  } else if (frontNumber == '-1') {
    frontNumber = '-'
  }

  if (frontNumber == '0') return ''

  let pow

  if (n - i == 0 || n - i == 1) {
    pow = ''
  } else {
    pow = `^${n - i}`
  }
  pow

  return `${frontNumber}${n == i ? '' : x}${pow}`
}

function expand(expr) {
  let [_, a, x, b, n] = expr.match(/\(([-]*\d*)(\w)([+-]{1}\d+)\)\^(\d+)/)
  if (n == '0') return '1'
  if (a == '') {
    a = '1'
  } else if (a == '-') {
    a = '-1'
  }
  a = Number(a)
  b = Number(b)
  n = Number(n)

  let binomeParts = []

  for (let i = 0; i <= n; i++) {
    binomeParts.push(binomePartGenerator(i, a, x, b, n))
  }

  binomeParts.filter((b) => b != '')

  return binomeParts.join('+').replaceAll('+-', '-') //?
}

console.log(expand('(x+1)^2')) //?
