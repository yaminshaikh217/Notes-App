const addBtn = document.querySelector(".add")
const container = document.querySelector('.container')


addBtn.addEventListener("click", () => getNote())

const notes = JSON.parse(localStorage.getItem('notes'))

if (notes) {
    notes.forEach(note => getNote(note))
}


function getNote(text = "") {
    let note = document.createElement("div")
    note.classList.add("note")
    note.innerHTML = `
    <div class="tools">
            <button class="btn edit" id = "edit"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
            <button class="btn " id = "delete"><i class="fa fa-trash" aria-hidden="true"></i></button>
    </div>
    <div class="main ${text ? "" : "hidden"} "></div>
    <textarea class="textArea ${text ? "hidden" : ""} "></textarea>
    `

    const delBtn = note.querySelector("#delete")
    const edit = note.querySelector("#edit")
    const textArea = note.querySelector(".textArea")
    const main = note.querySelector(".main")


    textArea.value = text
    main.innerHTML = text



    delBtn.addEventListener("click", () => {
        note.remove()
        updateLS()
    })

    edit.addEventListener('click', () => {
        main.classList.toggle("hidden")
        textArea.classList.toggle("hidden")
    })

    textArea.addEventListener("change", (e) => {
        main.innerHTML = e.target.value
        updateLS()
    })

    container.appendChild(note)

}


function updateLS() {
    const notesText = document.querySelectorAll('textarea')

    const notes = []

    notesText.forEach(note => notes.push(note.value))

    localStorage.setItem('notes', JSON.stringify(notes))
}