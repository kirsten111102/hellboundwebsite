function addEsportsTeam() {
    db.esportsteam.bulkAdd(esports)
        .then(() => {
            console.log("All esports added!");
        })
        .catch(Dexie.BulkError, e => {
            console.error("Esports failed to add:", e.failures);
        });
}

async function updateEsportsTeam(){
    Promise.all(
        esports.map(item => db.esportsteam.put(item))
    ).then(() => {
        console.log("All updates applied!");
    });
}

async function deleteEsportsTeams(){
    db.esportsteam.clear().then(() => {
        console.log("All teams data cleared");
    });
}

function showEsportsTeam() {
    db.esportsteam.toArray().then(esportsteam => {
        const select = document.getElementById("team");
        select.innerHTML = "";

        esportsteam.forEach(team => {
            const option = document.createElement("option");
            option.id = team.id;
            option.value = team.id;
            option.textContent = `${team.name}`;
            select.appendChild(option);
        });
    });
}

function showMinusEsportsTeam() {
    db.esportsteam.toArray().then(esportsteam => {
        const select = document.getElementById("minus_team");
        select.innerHTML = "";

        esportsteam.forEach(team => {
            const option = document.createElement("option");
            option.id = team.id;
            option.value = team.id;
            option.textContent = `${team.name}`;
            select.appendChild(option);
        });
    });
}

function showUpdateEsportsTeam() {
    db.esportsteam.toArray().then(esportsteam => {
        const select = document.getElementById("update_team");
        select.innerHTML = "";

        esportsteam.forEach(team => {
            const option = document.createElement("option");
            option.id = team.id;
            option.value = team.id;
            option.textContent = `${team.name}`;
            select.appendChild(option);
        });
    });
}

function showDeleteEsportsTeam() {
    db.esportsteam.toArray().then(esportsteam => {
        const select = document.getElementById("delete_team");
        select.innerHTML = "";

        esportsteam.forEach(team => {
            const option = document.createElement("option");
            option.id = team.id;
            option.value = team.id;
            option.textContent = `${team.name}`;
            select.appendChild(option);
        });
    });
}