function addWorldsData() {
    db.worlds.bulkAdd(worlds)
        .then(() => {
            console.log("All Worlds data added!");
        })
        .catch(Dexie.BulkError, e => {
            console.error("Worlds data failed to add:", e.failures);
        });
}

function showWorldsData(){
    db.worlds.toArray().then(worlds => {
        const world_data = document.getElementById("world_trophy_list");
        world_data.innerHTML = "";
        

        worlds.forEach(async (data) => {
            const row = document.createElement("tr")

            const team = await db.esportsteam.where('id').equals(data.team_id).toArray();
            
            row.innerHTML = `
                <td>${team[0].name}</td>
                <td>${data.wins}</td>
            `;

            world_data.appendChild(row);
        })
        
    })
}

showWorldsData()