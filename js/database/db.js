const db = new Dexie("HellboundEsports");

db.version(1).stores({
    esportsteam: "id, name",
    transfer_news: "id, news, time, team_id"
});

window.db = db;