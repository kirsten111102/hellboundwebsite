function addWinterData() {
    db.winter_rl.bulkAdd(winter_rl)
        .then(() => {
            console.log("All Winter data added!");
        })
        .catch(Dexie.BulkError, e => {
            console.error("Winter data failed to add:", e.failures);
        });
}

function showWinterData(){
    db.winter_rl.toArray().then(winter_rl => {
        const winter_data = document.getElementById("winter_trophy_list");
        winter_data.innerHTML = "";

        winter_rl.forEach(async (data) => {
            const row = document.createElement("tr")

            const team = await db.esportsteam.where('id').equals(data.team_id).toArray();
            const region = await db.regional.where('id').equals(data.regional).toArray();
            const id_parts = data.id.split("_");
            const league_rank = id_parts[0].match(/^([a-zA-Z]+\d*)(\d+)$/)[2];
            
            row.innerHTML = `
                <td>${team[0].name}</td>
                <td>${region[0].name}</td>
                <td>${league_rank}</td>
                <td>${data.wins}</td>
            `;

            winter_data.appendChild(row);
        })
        
    })
}

showWinterData()