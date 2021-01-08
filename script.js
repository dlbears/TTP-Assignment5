
const selectedColor = document.querySelector('#colorSelected'),
      row = document.querySelector('#columns'),
      cell = document.querySelector('.cell')

let isDown = false,
    color = "white"

const mouseDown = () => { isDown = true },
      mouseUp = () => { isDown = false }

const updateColor = e => {
    isDown && e.target.setAttribute('style', `background-color: ${color};`)
}

const instaColor = e => {
    e.target.setAttribute('style', `background-color: ${color};`)
    mouseDown()
}
let rowPrev = document.querySelector('.row').cloneNode(true)

const initCell = c => {
    c.setAttribute?.('style', `background-color: ${color};`)
    c.addEventListener('mouseover', updateColor)
    c.addEventListener('mouseup', updateColor)
    c.addEventListener('mousedown', instaColor)
}

const destroyCell = c => {
    c.removeEventListener('mouseover', updateColor)
    c.removeEventListener('mouseup', updateColor)
    c.removeEventListener('mousedown', instaColor)
}

initCell(cell)


const updatePrevRow = () => {
    rowPrev = document.querySelector('.row').cloneNode(true)
}

const addColumn = () => {
    document.querySelectorAll('.row').forEach(n => {
        const clone = cell.cloneNode()
        initCell(clone)
        n.appendChild(clone)
    })
    updatePrevRow()
}

const removeColumn = () => {
    updatePrevRow()
    document.querySelectorAll('.row').forEach(n => {
        destroyCell(n.lastChild)
        n.removeChild(n.lastChild)
    })
    
}

const addRow = () => {
    const rowClone = document.querySelector('.row')?.cloneNode(true) ?? rowPrev
    rowClone.childNodes.forEach(initCell)
    row.appendChild(rowClone)
}

const removeRow = () => {
    row.lastChild.childNodes.forEach(destroyCell)
    row.removeChild(row.lastChild)
}


document.querySelector('#selectColor').addEventListener('change', e => {
    color = e.target[e.target.selectedIndex].value
    selectedColor.innerText = `Selected color is: ${color}`
    if (color === "") color = 'white'
    
})

const fillAllUncolored = () => {
    document.querySelectorAll('.cell').forEach(n => {
        if (n.style.backgroundColor === "" || n.style.backgroundColor === "white") n.setAttribute('style', `background-color: ${color};`)
    })
}

const fillAll = () => {
    document.querySelectorAll('.cell').forEach(n => n.setAttribute('style', `background-color: ${color};`))
}

const clearAll = () => {
    document.querySelectorAll('.cell').forEach(n => n.setAttribute('style', 'background-color: white;'))
}