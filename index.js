const saveBtn = document.getElementById("save-btn")
const saveTab = document.getElementById("save-tab")
const clearBtn = document.getElementById("clear")
const input = document.getElementById("url-input")
const ulEl = document.getElementById("url-dis")
const nameInput = document.getElementById("url-name")
const urlFromLocalStorage = JSON.parse(localStorage.getItem("URL"))
const urlNameFromLocalStorage = JSON.parse(localStorage.getItem("URLName"))
let url = []
let urlName = []

if (urlFromLocalStorage) {
    url = urlFromLocalStorage
    urlName = urlNameFromLocalStorage
    render(url, urlName)
}
function render(url, urlName) {
    let urlList = ""
        for (let i = 0; i < url.length; i++) {
        urlList += `
        <li>
            <a href="${url[i]}" target=_blank>${urlName[i]}</a>
        </li>
        `
    }
    ulEl.innerHTML = urlList
}
saveBtn.addEventListener("click", () => {
    url.push(input.value)
    urlName.push(nameInput.value)
    input.value = ""
    nameInput.value = ""
    localStorage.setItem("URL", JSON.stringify(url))
    localStorage.setItem("URLName", JSON.stringify(urlName))
    render(url, urlName)
})

saveTab.addEventListener("click", () => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        url.push(tabs[0].url)
        localStorage.setItem("URL", JSON.stringify(url) )
    })
    const tabInput = window.prompt("What's the name?(Reload is required)")
    urlName.push(tabInput)
    localStorage.setItem("URLName", JSON.stringify(urlName))
    render(url, urlName)
})

clearBtn.addEventListener("click", () => {
    localStorage.clear()
    url = []
    urlName = []
    render(url, urlName)
})