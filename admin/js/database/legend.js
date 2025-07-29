async function deleteLegends(){
    db.legends.clear();
}

async function addAge(){
    const legends = await db.legends.toArray();

    for (const player of legends) {
        const newAge = parseInt(player.age) + 1;
        await db.legends.update(player.id, { age: newAge });
    }

    console.log('All players aged +1!');
}

async function showLegends() {
    try {
        const legends = await db.legends.toArray();
        legends.sort((a, b) => a.pos.localeCompare(b.pos));
        const player_list = document.getElementById("legend_list");
        player_list.innerHTML = "";

        legends.forEach(async (player) => {
            const row = document.createElement("tr");

            const position = await db.position.where('id').equals(player.pos).toArray();
            const game = await db.esportsteam.where('id').equals(player.team).toArray();
            row.innerHTML = `<td>${player.name}</td>`;
            if(position.length > 0){
                row.innerHTML += `<td>${position[0].pos}</td>`;
            }
            else{
                row.innerHTML += `<td>Player</td>`;
            }
            row.innerHTML += `
                <td>${player.age}</td>
                <td>${player.status}</td>
                <td>${game[0].name}</td>
                <td>${player.current_team}</td>
                <td>${player.achievement}</td>
                <td>${player.time_played}</td>
            `;
            
            player_list.appendChild(row);
            
        });
    } catch (error) {
        console.error("Error loading players:", error);
    }
}

showLegends();