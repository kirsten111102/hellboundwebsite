async function deleteCoaches(){
    db.coach.clear();
}

async function addAge(){
    const coaches = await db.coach.toArray();

    for (const coach of coaches) {
        const newAge = parseInt(coach.age) + 1;
        await db.coach.update(coach.id, { age: newAge });
    }

    console.log('All coaches aged +1!');
}

async function showCoaches() {
    try {
        const coaches = await db.coach.toArray();
        const player_list = document.getElementById("coach_list");
        player_list.innerHTML = "";

        coaches.forEach(async (coach) => {
            const row = document.createElement("tr");

            const game = await db.esportsteam.where('id').equals(coach.team).toArray();
            
            row.innerHTML = `
                <td>${coach.name}</td>
                <td>${coach.age}</td>
                <td>${coach.status}</td>
                <td>${game[0].name}</td>
            `; 
            player_list.appendChild(row);
            
        });
    } catch (error) {
        console.error("Error loading coaches:", error);
    }
}

showCoaches();