// ┗ - 9495 - BOX DRAWINGS HEAVY UP AND RIGHT
// ┓ - 9491 - BOX DRAWINGS HEAVY DOWN AND LEFT
// ┏ - 9487 - BOX DRAWINGS HEAVY DOWN AND RIGHT
// ┛ - 9499 - BOX DRAWINGS HEAVY UP AND LEFT
// ━ - 9473 - BOX DRAWINGS HEAVY HORIZONTAL
// ┃ - 9475 - BOX DRAWINGS HEAVY VERTICAL
// ┣ - 9507 - BOX DRAWINGS HEAVY VERTICAL AND RIGHT
// ┫ - 9515 - BOX DRAWINGS HEAVY VERTICAL AND LEFT
// ┳ - 9523 - BOX DRAWINGS HEAVY DOWN AND HORIZONTAL
// ┻ - 9531 - BOX DRAWINGS HEAVY UP AND HORIZONTAL
// ╋ - 9547 - BOX DRAWINGS HEAVY VERTICAL AND HORIZONTAL

const CONFIG = {
  9495: ['top', 'right'],
  9491: ['bottom', 'left'],
  9487: ['bottom', 'right'],
  9499: ['top', 'left'],
  9473: ['left', 'right'],
  9475: ['top', 'bottom'],
  9507: ['top', 'right', 'bottom'],
  9515: ['top', 'left', 'bottom'],
  9523: ['bottom', 'left', 'right'],
  9531: ['top', 'left', 'right'],
  9547: ['top', 'left', 'right', 'bottom'],
  46: [],
}

const possiblePipes = {
  right: ['9491', '9499', '9473', '9515', '9523', '9531', '9547'],
  top: ['9491', '9487', '9475', '9507', '9515', '9523', '9547'],
  left: ['9495', '9487', '9473', '9507', '9523', '9531', '9547'],
  bottom: ['9495', '9499', '9475', '9507', '9515', '9531', '9547'],
}

const OFFSETS = {
  top: [0, -1],
  bottom: [0, 1],
  left: [-1, 0],
  right: [1, 0],
}

function checkPipe(map) {
  let grid = map.map((row) => row.split(''))
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      let current = grid[y][x]
      let currentCode = current.charCodeAt(0)
      let connectionPoints = CONFIG[currentCode]

      for (let i = 0; i < connectionPoints.length; i++) {
        let offset = OFFSETS[connectionPoints[i]]
        let newx = x + offset[0]
        let newy = y + offset[1]

        try {
          let next = grid[newy][newx]
          let nextCode = next.charCodeAt(0)
          if (
            !possiblePipes[connectionPoints[i]].includes(nextCode.toString())
          ) {
            return false
          }
        } catch (e) {}
      }
    }
  }
  return true
}

let pipe = ['┻╋']

checkPipe(pipe)
