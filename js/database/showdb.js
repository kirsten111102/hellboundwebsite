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
            }
            else{
                if (player.status === 'main'){
                    row.innerHTML = `<td>Main Player</td>`;
                }
                else row.innerHTML = `<td>Substitution</td>`;
            }
            row.innerHTML += `
                <td>${player.name}</td>
                <td>${player.age}</td>
            `;

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

async function showSpringandWorldTrophies(bodyId) {
    try {
        const spring = await db.spring_rl.where('team_id').equals(bodyId).toArray();

        const spring_l1 = spring.filter(item => item.id.toString().match(/\d(?!.*\d)/)[0] === '1' && item.wins > 0)
        const spring_l2 = spring.filter(item => item.id.toString().match(/\d(?!.*\d)/)[0] === '2' && item.wins > 0)
        const majors = await db.majors.where('team_id').equals(bodyId).toArray();
        const worlds = await db.worlds.where('team_id').equals(bodyId).toArray();

        const trophy_list = document.getElementById("spring_trophy_list");
        trophy_list.innerHTML = `<td class="time">Spring</td>`;

        if (spring_l2.length > 0){
            const table_data = document.createElement('td');
            for (const data of spring_l2){
                const trophy_region = document.createElement('p')

                const region = await db.regional.where('id').equals(data.regional).toArray();
                trophy_region.innerHTML = `${data.wins} x ${region[0].name}`;
                
                table_data.appendChild(trophy_region)
            }

            trophy_list.innerHTML += table_data.outerHTML;
        }
        else trophy_list.innerHTML += `<td>0</td>`

        if (spring_l1.length > 0){
            const table_data = document.createElement('td');
            for (const data of spring_l1){
                const trophy_region = document.createElement('p')

                const region = await db.regional.where('id').equals(data.regional).toArray();
                trophy_region.innerHTML = `${data.wins} x ${region[0].name}`;
                
                table_data.appendChild(trophy_region)
            }

            trophy_list.innerHTML += table_data.outerHTML;
        }
        else trophy_list.innerHTML += `<td>0</td>`

        trophy_list.innerHTML += `
            <td>${majors[0].spring_wins}</td>
            <td rowspan="3">${worlds[0].wins}</td>
        `
    } catch (error) {
        console.error("Error loading Spring and World trophies:", error);
    }
}

async function showSummerTrophies(bodyId) {
    try {
        const summer = await db.summer_rl.where('team_id').equals(bodyId).toArray();

        const summer_l1 = summer.filter(item => item.id.toString().match(/\d(?!.*\d)/)[0] === '1' && item.wins > 0)
        const summer_l2 = summer.filter(item => item.id.toString().match(/\d(?!.*\d)/)[0] === '2' && item.wins > 0)
        const majors = await db.majors.where('team_id').equals(bodyId).toArray();

        const trophy_list = document.getElementById("summer_trophy_list");
        trophy_list.innerHTML = `<td class="time">Summer</td>`;

        if (summer_l2.length > 0){
            const table_data = document.createElement('td');
            for (const data of summer_l2){
                const trophy_region = document.createElement('p')

                const region = await db.regional.where('id').equals(data.regional).toArray();
                trophy_region.innerHTML = `${data.wins} x ${region[0].name}`;
                
                table_data.appendChild(trophy_region)
            }

            trophy_list.innerHTML += table_data.outerHTML;
        }
        else trophy_list.innerHTML += `<td>0</td>`

        if (summer_l1.length > 0){
            const table_data = document.createElement('td');
            for (const data of summer_l1){
                const trophy_region = document.createElement('p')

                const region = await db.regional.where('id').equals(data.regional).toArray();
                trophy_region.innerHTML = `${data.wins} x ${region[0].name}`;
                
                table_data.appendChild(trophy_region)
            }

            trophy_list.innerHTML += table_data.outerHTML;
        }
        else trophy_list.innerHTML += `<td>0</td>`

        trophy_list.innerHTML += `
            <td>${majors[0].summer_wins}</td>
        `
    } catch (error) {
        console.error("Error loading Spring and World trophies:", error);
    }
}

async function showWinterTrophies(bodyId) {
    try {
        const winter = await db.winter_rl.where('team_id').equals(bodyId).toArray();

        const winter_l1 = winter.filter(item => item.id.toString().match(/\d(?!.*\d)/)[0] === '1' && item.wins > 0)
        const winter_l2 = winter.filter(item => item.id.toString().match(/\d(?!.*\d)/)[0] === '2' && item.wins > 0)
        const majors = await db.majors.where('team_id').equals(bodyId).toArray();

        const trophy_list = document.getElementById("winter_trophy_list");
        trophy_list.innerHTML = `<td class="time">Winter</td>`;

        if (winter_l2.length > 0){
            const table_data = document.createElement('td');
            for (const data of winter_l2){
                const trophy_region = document.createElement('p')

                const region = await db.regional.where('id').equals(data.regional).toArray();
                trophy_region.innerHTML = `${data.wins} x ${region[0].name}`;
                
                table_data.appendChild(trophy_region)
            }

            trophy_list.innerHTML += table_data.outerHTML;
        }
        else trophy_list.innerHTML += `<td>0</td>`

        if (winter_l1.length > 0){
            const table_data = document.createElement('td');
            for (const data of winter_l1){
                const trophy_region = document.createElement('p')

                const region = await db.regional.where('id').equals(data.regional).toArray();
                trophy_region.innerHTML = `${data.wins} x ${region[0].name}`;
                
                table_data.appendChild(trophy_region)
            }

            trophy_list.innerHTML += table_data.outerHTML;
        }
        else trophy_list.innerHTML += `<td>0</td>`

        trophy_list.innerHTML += `
            <td>${majors[0].winter_wins}</td>
        `
    } catch (error) {
        console.error("Error loading Spring and World trophies:", error);
    }
}

async function showLegends(bodyId) {
    try {
        const legends = await db.legends.where('team').equals(bodyId).toArray();
        legends.sort((a, b) => {
            const pos_compare = a.pos.localeCompare(b.pos)
            if (pos_compare !==0) return pos_compare
            return b.age - a.age;
        });

        const player_list = document.getElementById("legend_list");
        player_list.innerHTML = "";

        legends.forEach(async (player) => {
            const row = document.createElement("tr");

            const position = await db.position.where('id').equals(player.pos).toArray();
            if(position.length > 0){
                row.innerHTML = `
                    <td>${position[0].pos}</td>
                    <td>${player.name}</td>
                    <td>${player.age}</td>
                `;
            }
            else{
                row.innerHTML = `
                    <td>${player.name}</td>
                    <td>${player.age}</td>
                `;
            }

            const achievements = player.achievement.split('; ')
            const data = document.createElement('td');
            data.className = "focus"
            for (const trophies of achievements){
                const data_part = document.createElement('p')
                data_part.innerHTML = `${trophies}`
                data.appendChild(data_part)
            }
            row.innerHTML += data.outerHTML;
            switch (player.status){
                case 'main':
                    row.innerHTML += `<td class="focus">Main - ${player.current_team}</td>`
                    break;
                case 'subs':
                    row.innerHTML += `<td class="focus">Substitution - ${player.current_team}</td>`
                    break;
                case 'inactive':
                    row.innerHTML += `<td class="focus">Inactive</td>`
                    break;
                case 'retired':
                    row.innerHTML += `<td class="focus">Retired</td>`
                    break;
            }

            player_list.appendChild(row);

        });
    } catch (error) {
        console.error("Error loading players:", error);
    }
}

document.addEventListener("DOMContentLoaded", showEsportsHomeTeam);
document.addEventListener("DOMContentLoaded", showEsportsHeaderTeam);