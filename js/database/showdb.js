async function showEsportsHomeTeam() {
    db.esportsteam.toArray().then(esportsteam => {
        const list = document.getElementById("teamlist");
        list.innerHTML = "";

        esportsteam.forEach(team => {
            const a = document.createElement("a");
            a.id = team.id;
            a.href = `/html/teams/${team.id}.html`;
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
        const teamlink = document.getElementById("link_teams");
        teamlink.innerHTML = "";

        esportsteam.forEach(team => {
            const a = document.createElement("a");
            a.href = `/html/teams/${team.id}.html`;
            a.innerHTML = `<li>${team.name}</li>`;
            teamlink.appendChild(a);
        });
    });
}

async function showTransferNews(bodyId){
    try {
        const transfer_news = await db.transfer_news
        .where('team_id')
        .equals(bodyId)
        .toArray();

        const news = document.getElementById("news");
        news.innerHTML = "";

        transfer_news.forEach(transfer_new => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${transfer_new.news}</td>
            <td class="focus">${transfer_new.time}</td>
        `;
        news.appendChild(row);
        });
    } catch (error) {
        console.error("Error loading transfer news:", error);
    }
}


document.addEventListener("DOMContentLoaded", showEsportsHomeTeam);
document.addEventListener("DOMContentLoaded", showEsportsHeaderTeam);