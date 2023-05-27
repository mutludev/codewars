function multiply(s1, s2) {
  let sign = 1
  let offset = 0
  if (s1.startsWith('-')) {
    sign *= -1
    s1 = s1.slice(1)
  }
  if (s2.startsWith('-')) {
    sign *= -1
    s2 = s2.slice(1)
  }
  if (s1.includes('.')) {
    offset += s1.length - s1.indexOf('.') - 1
    s1 = s1.replace('.', '')
  }
  if (s2.includes('.')) {
    offset += s2.length - s2.indexOf('.') - 1
    s2 = s2.replace('.', '')
  }

  let rawAnswer = multiplyRawStrings(s1, s2).split('')
  if (offset != 0) {
    rawAnswer.splice(rawAnswer.length - offset, 0, '.')
    rawAnswer = rawAnswer.join('').replace(/0+$/, '').split('')
  }

  let unsignedAnswer = rawAnswer.join('').replace(/^0+/, '')
  let answer = sign == 1 ? unsignedAnswer : '-' + unsignedAnswer
  answer = answer.replace(/\.$/, '')
  if (answer == '-') {
    answer = '0'
  }
  if (answer.startsWith('.')) {
    answer = '0' + answer
  }
  return answer
}

function add(a, b) {
  let arr = [a.length, b.length]
  let max = Math.max(...arr)
  a = a.padStart(max, '0')
  b = b.padStart(max, '0')
  a
  b
  let arrA = a.split('').reverse()
  let arrB = b.split('').reverse()

  let arrC = []
  let carry = '0'

  for (let i = 0; i < max; i++) {
    let sum = Number(arrA[i]) + Number(arrB[i]) + Number(carry)
    sum = sum.toString()
    if (sum > 9) {
      carry = sum[0]
      sum = sum[1]
    } else {
      carry = '0'
    }
    arrC[i] = sum
  }

  if (carry !== '0') {
    arrC.push(carry)
  }

  arrC = arrC.reverse().join('')

  return arrC
}

function multiplyRawStrings(s1, s2) {
  numbersToBeSummed = s2
    .split('')
    .reverse()
    .map((digit, index) => {
      let multiplication = multiplyByOneDigit(s1, digit)
      return multiplication + '0'.repeat(index)
    })
  return numbersToBeSummed.reduce((acc, num) => add(acc, num), '0')
}

function multiplyByOneDigit(s, d) {
  let extra = 0

  let total = []
  s.split('')
    .reverse()
    .forEach((digit) => {
      let mult = (Number(digit) * Number(d) + extra).toString()
      extra = 0
      if (mult.length == 1) {
        total.push(mult)
      } else {
        total.push(mult[1])
        extra += Number(mult[0])
      }
    })
  return extra.toString() + total.reverse().join('')
}

multiply('123', '-12.72')
