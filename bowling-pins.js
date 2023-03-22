function bowlingPins(arr) {
  let string = 'X X X X\n X X X \n  X X  \n   X   '
  let startIndex = 1
  while (startIndex <= 10) {
    let index = string.lastIndexOf('X')
    if (arr.includes(startIndex)) {
      string = string.slice(0, index) + ' ' + string.slice(index + 1)
    } else {
      string = string.slice(0, index) + 'I' + string.slice(index + 1)
    }
    startIndex++
  }
  return string
    .split('\n')
    .map((l) => l.split('').reverse().join(''))
    .join('\n')
}

bowlingPins([3, 5, 9]) //?
