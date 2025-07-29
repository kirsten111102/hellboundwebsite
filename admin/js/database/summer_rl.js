function addSummerData() {
    db.summer_rl.bulkAdd(summer_rl)
        .then(() => {
            console.log("All Summer data added!");
        })
        .catch(Dexie.BulkError, e => {
            console.error("Summer data failed to add:", e.failures);
        });
}

function showSummerData(){
    db.summer_rl.toArray().then(summer_rl => {
        const summer_data = document.getElementById("summer_trophy_list");
        summer_data.innerHTML = "";

        summer_rl.forEach(async (data) => {
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

            summer_data.appendChild(row);
        })
        
    })
}

showSummerData()