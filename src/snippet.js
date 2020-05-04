javascript: try {
  let clickMe = ''
  Object.keys(localStorage).forEach((key) => {
    clickMe += key + ': ' + localStorage.getItem(key) + ';\n'
  })
  alert(clickMe)
} catch (e) {
  alert(e.message)
} // https:
