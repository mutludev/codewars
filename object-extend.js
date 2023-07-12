function extend(...objects) {
  let combinedObject = {}

  objects.forEach((obj) => {
    if (!isObject(obj)) return

    Object.keys(obj).forEach((key) => {
      if (Object.keys(combinedObject).includes(key)) return
      combinedObject[key] = obj[key]
    })
  })
  return combinedObject
}
