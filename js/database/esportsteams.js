// Function to add a friend
async function addEsportsTeam() {
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