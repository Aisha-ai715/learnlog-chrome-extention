const note = document.getElementById('input-el')
const options = document.getElementById('select')
const saveBtn = document.getElementById('tab-btn')
const deleteBtn = document.getElementById('delete-btn')
const ulEl = document.getElementById('ul-el')
const loadFromLocalStorage = JSON.parse(localStorage.getItem('myUrls'))

let leadsEl = []

if (loadFromLocalStorage) {
    leadsEl = loadFromLocalStorage
    render(leadsEl)
}

saveBtn.addEventListener('click', () => {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
        leadsEl.push({
            url: tabs[0].url,
            note: note.value,
            status: options.value
        })

        localStorage.setItem('myUrls', JSON.stringify(leadsEl))
        render(leadsEl)
        note.value = ""
    })

})

function render(arr) {
    let list = ""
    for (let i = 0; i < arr.length; i++) {
        list += `
           <li><a href="${arr[i].url}" target="_blank"> ${arr[i].url}</a>
           <p class="user-option">${arr[i].note}</p>
           <p class="user-note">${arr[i].status}</p>
           </li>
        `
    }

    ulEl.innerHTML = list
}

deleteBtn.addEventListener('dblclick', () => {
    leadsEl = []
    localStorage.clear()
    render(leadsEl)
    ulEl.style.height = "0"

})