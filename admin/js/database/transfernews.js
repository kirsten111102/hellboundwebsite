async function addTransferNews() {
    db.transfer_news.bulkAdd(transfernews)
        .then(() => {
            console.log("All transfer news added!");
        })
        .catch(Dexie.BulkError, e => {
            console.error("Transfer news failed to add:", e.failures);
        });
}

async function updateTransferNews(){
    Promise.all(
        esports.map(item => db.transfer_news.put(item))
    ).then(() => {
        console.log("All updates applied!");
    });
}

async function deleteTransferNews(){
    db.transfer_news.clear().then(() => {
        console.log("All data cleared");
    });
}

function showAllTransferNews() {
    db.transfer_news.toArray().then(transfer_news => {
        const news = document.getElementById("news_list");
        news.innerHTML = "";

        transfer_news.forEach(async (transfer) => {
            const row = document.createElement("tr");
            const team = await db.esportsteam.where('id').equals(transfer.team_id).toArray();

            row.innerHTML = `
                <td>${transfer.news}</td>
                <td class="focus">${transfer.time}</td>
                <td class="focus">${team[0].name}</td>
            `;
            news.appendChild(row);
        })
    });
}

showAllTransferNews();