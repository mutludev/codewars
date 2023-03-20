function encodeRailFenceCipher(string, numberRails) {
  const rails = Array.from({ length: numberRails }, () => [])
  let index = 0
  let direction = 1

  string.split('').forEach((char) => {
    rails[index].push(char)
    index += direction
    if (index === numberRails - 1 || index === 0) {
      direction *= -1
    }
  })

  rails

  return rails.reduce((acc, rail) => acc + rail.join(''), '')
}

function decodeRailFenceCipher(string, numberRails) {
  let index = 0
  let direction = 1
  let stringLen = string.length
  let rails = new Array(numberRails).fill(0)

  for (let i = 0; i < stringLen; i++) {
    rails[index]++
    index += direction
    if (index === numberRails - 1 || index === 0) {
      direction *= -1
    }
  }

  let railsChars = []
  for (let i of rails) {
    railsChars.push(string.slice(0, i).split(''))
    string = string.slice(i)
  }

  let result = ''
  index = 0
  direction = 1
  for (let i = 0; i < stringLen; i++) {
    result += railsChars[index].shift()
    index += direction
    if (index === numberRails - 1 || index === 0) {
      direction *= -1
    }
  }
  return result
}

encodeRailFenceCipher('WEAREDISCOVEREDFLEEATONCE', 3)

decodeRailFenceCipher('WECRLTEERDSOEEFEAOCAIVDEN', 3)
