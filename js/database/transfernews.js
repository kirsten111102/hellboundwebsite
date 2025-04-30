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