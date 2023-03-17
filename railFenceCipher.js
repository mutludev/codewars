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

function decodeRailFenceCipher(string, numberRails) {}

encodeRailFenceCipher('WEAREDISCOVEREDFLEEATONCE', 3)
