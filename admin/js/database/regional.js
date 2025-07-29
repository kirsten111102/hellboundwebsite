function addRegions() {
    db.regional.bulkAdd(region)
        .then(() => {
            console.log("All regions added!");
        })
        .catch(Dexie.BulkError, e => {
            console.error("Regions failed to add:", e.failures);
        });
}

async function deleteRegions(){
    db.regional.clear().then(() => {
        console.log("All regions data cleared");
    });
}

function showRegions() {
    db.regional.toArray().then(regional => {
        const select = document.getElementById("region");
        select.innerHTML = "";

        regional.forEach(region => {
            const option = document.createElement("option");
            option.id = region.id;
            option.value = region.id;
            option.textContent = `${region.name}`;
            select.appendChild(option);
        });
    });
}

function showMinusRegions() {
    db.regional.toArray().then(regional => {
        const select = document.getElementById("minus_region");
        select.innerHTML = "";

        regional.forEach(region => {
            const option = document.createElement("option");
            option.id = region.id;
            option.value = region.id;
            option.textContent = `${region.name}`;
            select.appendChild(option);
        });
    });
}

function showUpdateRegions() {
    db.regional.toArray().then(regional => {
        const select = document.getElementById("update_region");
        select.innerHTML = "";

        regional.forEach(region => {
            const option = document.createElement("option");
            option.id = region.id;
            option.value = region.id;
            option.textContent = `${region.name}`;
            select.appendChild(option);
        });
    });
}

showRegions();
showUpdateRegions();
showMinusRegions();