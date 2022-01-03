let playerList = JSON.parse(localStorage.getItem('players')) || []

const view = {
    renderCharts (data) {
        const charts = document.querySelector('#charts')
        let listHtml = `<ul class="list-group list-group-flush">`
        data.forEach(player => {
            listHtml += `
              <li class="list-group-item d-flex justify-content-around">
                <span>Name: ${player.name}</span>
                <span>Tried： ${player.triedTimes} times</span>
              </li>`
        })
        listHtml += `</ul>`
        charts.innerHTML = listHtml
    }
}

view.renderCharts(playerList)