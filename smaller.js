function smaller(arr) {
  return arr.map((number, index, list) => {
    return list
      .slice(index + 1)
      .reduce((acc, i) => (number > i ? acc + 1 : acc), 0)
  })
}

smaller([5, 4, 3, 2, 1]) //?
