async function deletePlayers(){
    db.player.clear();
}

async function addAge(){
    const players = await db.player.toArray();

    for (const player of players) {
        const newAge = parseInt(player.age) + 1;
        await db.player.update(player.id, { age: newAge });
    }

    console.log('All players aged +1!');
}

async function showPlayer() {
    try {
        const players = await db.player.toArray();
        players.sort((a, b) => a.team.localeCompare(b.team));
        const player_list = document.getElementById("player_list");
        player_list.innerHTML = "";

        players.forEach(async (player) => {
            const row = document.createElement("tr");

            const position = await db.position.where('id').equals(player.position).toArray();
            const game = await db.esportsteam.where('id').equals(player.team).toArray();
            if(position.length > 0){
                row.innerHTML = `
                    <td>${player.name}</td>
                    <td>${position[0].pos}</td>
                    <td>${player.age}</td>
                    <td>${player.status}</td>
                    <td>${game[0].name}</td>
                `;
            }
            else{
                row.innerHTML = `
                    <td>${player.name}</td>
                    <td>Player</td>
                    <td>${player.age}</td>
                    <td>${player.status}</td>
                    <td>${game[0].name}</td>
                `;
            }
            
            player_list.appendChild(row);
            
        });
    } catch (error) {
        console.error("Error loading players:", error);
    }
}

showPlayer();