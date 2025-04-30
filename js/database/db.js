const db = new Dexie("HellboundEsports");
const esports = [
    {id: "dota2", name: "Dota 2"},
    {id: "valorant", name: "Valorant"},
    {id: "lol", name: "League of Legends"},
    {id: "cs2", name: "Counter Strike 2"},
    {id: "fifafc", name: "Fifa FC"},
    {id: "overwatch", name: "Overwatch"},
    {id: "cod", name: "Fall of Duty"},
    {id: "smashbros", name: "Smash Bros"},
    {id: "mlbb", name: "Mobile Legends"},
    {id: "shadow5", name: "Shadow 5"},
    {id: "rocketleague", name: "Rocket League"},
    {id: "aow", name: "Age of Wololo"},
    {id: "truckmaniac", name: "Truckmaniac"},
    {id: "starcraft2", name: "Starcraft 2"},
]

db.version(1).stores({
    esportsteam: "id, name"
});

const transfernews = [
    {id: "overwatch1", news: "Dirirt moves to Floxu from Hellbound Esports", time: "1/1/2062", team_id: "overwatch"},
    {id: "overwatch2", news: "Spenuck joins Hellbound Esports", time: "1/1/2062", team_id: "overwatch"},
    {id: "overwatch3", news: "Jep joins Hellbound Esports first team from academy", time: "31/5/2063", team_id: "overwatch"},
]

db.version(1).stores({
    transfer_news: "id, news, time, team_id"
});

window.db = db;