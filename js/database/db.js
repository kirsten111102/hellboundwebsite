const db = new Dexie("HellboundEsports");

db.version(1).stores({
    esportsteam: "id, name",
    transfer_news: "id, news, time, team_id",
    position: "id, pos, team_id",
    player: "++id, name, team, age, pos, status",
    coach: "++id, name, team, age, status",
    regional: "id, name",
    spring_rl: "id, team_id, regional, wins",
    summer_rl: "id, team_id, regional, wins",
    winter_rl: "id, team_id, regional, wins",
    majors: "team_id, spring_wins, summer_wins, winter_wins",
    worlds: "team_id, wins",
    legends: "++id, name, team, age, pos, status, current_team, achievement, time_played",
});

window.db = db;