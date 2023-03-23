let map = `? ? ? ? ? ?
? ? ? ? ? ?
? ? ? 0 ? ?
? ? ? ? ? ?
? ? ? ? ? ?
0 0 0 ? ? ?`
let result = `1 x 1 1 x 1
2 2 2 1 2 2
2 x 2 0 1 x
2 x 2 1 2 2
1 1 1 1 x 1
0 0 0 1 1 1`
function open(row, column) {
  let ans = result.split('\n').map((l) => l.split(' '))[row][column]
  if (ans == 'x') {
    throw new Error('Boom!')
  }
  return ans
}
//MAIN CODE

class minesweeper {
  constructor(map) {
    this.map = map.split('\n').map((l) => l.split(' '))
  }

  getMap() {
    return this.map
  }

  getCopyMap() {
    return this.map.map((l) => l.slice())
  }

  getReturnMap() {
    return this.map.map((l) => l.join(' ')).join('\n')
  }

  openPoint(row, column) {
    if (this.getPoint(row, column) !== '?') return
    let value = open(row, column)
    this.map[row][column] = value
  }

  openPoints(points) {
    points.forEach((point) => {
      this.openPoint(point[0], point[1])
    })
  }

  markPoint(row, column) {
    this.map[row][column] = 'x'
  }

  getPoint(row, column) {
    return this.map[row][column]
  }

  getAroundCoordinates(row, column) {
    let around = []
    for (let i = row - 1; i <= row + 1; i++) {
      for (let j = column - 1; j <= column + 1; j++) {
        if (i >= 0 && i < this.map.length && j >= 0 && j < this.map[0].length) {
          around.push([i, j])
        }
      }
    }
    around.splice(
      around.findIndex((e) => e[0] === row && e[1] === column),
      1
    )
    return around
  }

  getAroundValues(row, column) {
    let around = this.getAroundCoordinates(row, column)
    let values = []
    around.forEach((value) => {
      values.push(this.getPoint(value[0], value[1]))
    })
    return values
  }

  openAround(row, column) {
    let around = this.getAroundCoordinates(row, column)
    around.forEach((value) => {
      this.openPoint(value[0], value[1])
    })
  }

  findPoints(value) {
    let points = []
    for (let i = 0; i < this.map.length; i++) {
      for (let j = 0; j < this.map[0].length; j++) {
        if (this.map[i][j] == value) {
          points.push([i, j])
        }
      }
    }
    return points
  }

  isEqual(map) {
    for (let i = 0; i < this.map.length; i++) {
      for (let j = 0; j < this.map[0].length; j++) {
        if (this.map[i][j] !== map[i][j]) {
          return false
        }
      }
    }
    return true
  }

  strategyOpenZero() {
    this.findPoints('0').forEach((point) => {
      this.openAround(point[0], point[1])
    })
  }

  strategyEqualMark() {
    let mineMap = this.getMap()
    for (let i = 0; i < mineMap.length; i++) {
      for (let j = 0; j < mineMap[0].length; j++) {
        let value = mineMap[i][j]
        let around = this.getAroundValues(i, j)
        let aroundCount = around.filter((e) => e === '?' || e === 'x').length
        if (value == aroundCount) {
          let aroundPoints = this.getAroundCoordinates(i, j)
          aroundPoints.forEach((point) => {
            if (
              this.getPoint(point[0], point[1]) === '?' ||
              this.getPoint(point[0], point[1]) === 'x'
            ) {
              this.markPoint(point[0], point[1])
            }
          })
        }
      }
    }
  }

  strategyMarkedNeighbours() {
    for (let i = 0; i < this.map.length; i++) {
      for (let j = 0; j < this.map[0].length; j++) {
        let value = this.getPoint(i, j)
        let around = this.getAroundValues(i, j)
        let aroundMarkedCount = around.filter((e) => e === 'x').length
        if (value == aroundMarkedCount) {
          this.openAround(i, j)
        }
      }
    }
  }
}

function solveMine(map, n) {
  let mine = new minesweeper(map)
  let isMapChanged = true
  while (isMapChanged) {
    isMapChanged = false
    let oldMap = mine.getCopyMap()

    mine.strategyOpenZero()
    mine.strategyEqualMark()
    mine.strategyMarkedNeighbours()

    isMapChanged = !mine.isEqual(oldMap)
  }

  return mine.getReturnMap()
}

console.log(solveMine(map, 1))
