function addMajorData() {
    db.majors.bulkAdd(majors)
        .then(() => {
            console.log("All Major data added!");
        })
        .catch(Dexie.BulkError, e => {
            console.error("Major data failed to add:", e.failures);
        });
}

function showMajorData(){
    db.majors.toArray().then(majors => {
        const major_data = document.getElementById("major_trophy_list");
        major_data.innerHTML = "";

        majors.forEach(async (data) => {
            const row = document.createElement("tr")

            const team = await db.esportsteam.where('id').equals(data.team_id).toArray();
            
            row.innerHTML = `
                <td>${team[0].name}</td>
                <td>${data.spring_wins}</td>
                <td>${data.summer_wins}</td>
                <td>${data.winter_wins}</td>
            `;

            major_data.appendChild(row);
        })
        
    })
}

showMajorData()