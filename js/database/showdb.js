async function showEsportsHomeTeam() {
    db.esportsteam.toArray().then(esportsteam => {
        const list = document.getElementById("teamlist");
        list.innerHTML = "";

        esportsteam.forEach(team => {
            const a = document.createElement("a");
            a.id = team.id;
            a.href = `teams/${team.id}.html`;
            a.innerHTML = `
                <div class="game">
                    <div><img src="/images/games/${team.id}.png" class="avtgame"></div>
                    ${team.name}
                </div>
            `;
            list.appendChild(a);
        });
    });
}

function showEsportsHeaderTeam() {
    db.esportsteam.toArray().then(esportsteam => {
        const list = document.getElementById("teams");
        list.innerHTML = "";

        esportsteam.forEach(team => {
            const li = document.createElement("li");
            li.textContent = `${team.name}`;
            list.appendChild(li);
        });
    });
}

function showTransferNews() {
    db.transfer_news.toArray().then(transfer_news => {
        const table = document.getElementById("news");
        table.innerHTML = "";

        transfer_news.forEach(transfer_new => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${transfer_new.news}</td>
                <td class="focus">${transfer_new.time}</td>
            `;
            table.appendChild(row);
        });
    });
}


document.addEventListener("DOMContentLoaded", showEsportsHomeTeam);
showTransferNews();