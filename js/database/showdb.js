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

async function showPlayer(bodyId) {
    try {
        const players = await db.player.where('team').equals(bodyId).toArray();
        const player_list = document.getElementById("player_list");
        player_list.innerHTML = "";

        players.forEach(async (player) => {
            const row = document.createElement("tr");

            const position = await db.position.where('id').equals(player.position).toArray();
            if(position.length > 0){
                if (player.status === 'main'){
                    row.innerHTML = `<td>${position[0].pos}</td>`;
                }
                else row.innerHTML = `<td>${position[0].pos} (Sub)</td>`;
                row.innerHTML += `
                    <td>${player.name}</td>
                    <td>${player.age}</td>
                `;
            }
            else{
                if (player.status === 'main'){
                    row.innerHTML = `<td>Main Player</td>`;
                }
                else row.innerHTML = `<td>Substitution</td>`;
                row.innerHTML += `
                    <td>${player.name}</td>
                    <td>${player.age}</td>
                `;
            }
            
            player_list.appendChild(row);
            
        });
    } catch (error) {
        console.error("Error loading players:", error);
    }
}

async function showCoach(bodyId) {
    try {
        const coaches = await db.coach.where('team').equals(bodyId).toArray();
        const coach_list = document.getElementById("coach_list");
        player_list.innerHTML = "";

        coaches.forEach(async (coach) => {
            const row = document.createElement("tr");

            if (coach.status === 'main'){
                row.innerHTML = `<td>Coach</td>`;
            }
            else row.innerHTML = `<td>Coach (Sub)</td>`;
            row.innerHTML += `
                <td>${coach.name}</td>
                <td>${coach.age}</td>
            `;
            
            coach_list.appendChild(row);
        });
    } catch (error) {
        console.error("Error loading players:", error);
    }
}

document.addEventListener("DOMContentLoaded", showEsportsHomeTeam);
document.addEventListener("DOMContentLoaded", showEsportsHeaderTeam);