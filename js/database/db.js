const db = new Dexie("HellboundEsports");

db.version(1).stores({
    esportsteam: "id, name",
    transfer_news: "id, news, time, team_id",
    position: "id, pos, team_id",
    player: "++id, name, team, age, pos, status",
    coach: "++id, name, team, age, status",
});

window.db = db;