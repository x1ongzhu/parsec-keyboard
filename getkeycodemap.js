
let codeMap = {}
window.addEventListener('keydown', function(e) {
    console.log(e.key, e.code)
    codeMap[e.key] = e.code
    e.preventDefault()
    e.stopPropagation()
})