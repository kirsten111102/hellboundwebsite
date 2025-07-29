function addSpringData() {
    db.spring_rl.bulkAdd(spring_rl)
        .then(() => {
            console.log("All Spring data added!");
        })
        .catch(Dexie.BulkError, e => {
            console.error("Spring data failed to add:", e.failures);
        });
}

function showSpringData(){
    db.spring_rl.toArray().then(spring_rl => {
        const spring_data = document.getElementById("spring_trophy_list");
        spring_data.innerHTML = "";

        spring_rl.forEach(async (data) => {
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

            spring_data.appendChild(row);
        })
        
    })
}

showSpringData()