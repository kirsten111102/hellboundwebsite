async function addPositions() {
    db.position.bulkAdd(position)
        .then(() => {
            console.log("All position added!");
        })
        .catch(Dexie.BulkError, e => {
            console.error("Positions failed to add:", e.failures);
        });
}

async function showPositions(team_id) {
    try {
        const position = await db.position
        .where('team_id')
        .equals(team_id)
        .toArray();

        const select = document.getElementById("pos");
        if (Object.keys(position).length == 0){
            select.innerHTML = '<option value="player" id="player">Player</option>';
        }
        else{
            select.innerHTML = "";

            position.forEach(pos => {
                const option = document.createElement("option");
                option.id = pos.id;
                option.value = pos.id;
                option.textContent = `${pos.pos}`;
                select.appendChild(option);
            });
        }
    } catch (error) {
        console.error("Error loading positions:", error);
    }
}