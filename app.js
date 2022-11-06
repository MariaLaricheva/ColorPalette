const cols = document.querySelectorAll(".col")

document.addEventListener("keydown", event => {
    event.preventDefault()
    if (event.code.toLowerCase() === "space") {
        resetColors()
    }
})

const refreshBtn = document.getElementById('refreshBtn')
refreshBtn.addEventListener('click', event => {
    event.preventDefault()
    resetColors()
})


document.addEventListener("click", event => {
    const type = event.target.dataset.type
    if (type === "lock") {
        const node = event.target.tagName.toLowerCase() === "i"
            ? event.target
            : event.target.children[0]
        node.classList.toggle('fa-lock-open')
        node.classList.toggle('fa-lock')
    } else if (type === "copy") {
        copyToClipBoard(event.target.textContent)
    }
})

function setTextColor(text, color) {
    const luminance = chroma(color).luminance()
    text.style.color = luminance > 0.5 ? "#000" : "#FFF"
}

function resetColors (isInitial) {
    const colors = isInitial ? getColorsFromHash() : []

    cols.forEach((col, index) => {
        const isLocked = col.querySelector('i').classList.contains("fa-lock")

        const text = col.querySelector('h2')
        const button = col.querySelector('button')

        if (isLocked) {
            colors.push(text.textContent)
            return
        }

        const color = isInitial
            ? colors[index]
                ? colors[index]
                : chroma.random()
            : chroma.random();

        if (!isInitial) {
            colors.push(color)
        }

        setTextColor(text, color)
        setTextColor(button, color)

        text.textContent = color
        col.style.background = color
    })

    updateColorsHash(colors)
}

function copyToClipBoard (text) {
    return navigator.clipboard.writeText(text)
}

function updateColorsHash (colors = []) {
    document.location.hash = colors
        .map(col => col.toString().substring(1))
        .join('-')

}

function getColorsFromHash () {
    if (document.location.hash.length > 1) {
        return document.location.hash.substring(1)
            .split('-')
            .map(col => '#' + col)
    }
    return []
}

resetColors(true)

