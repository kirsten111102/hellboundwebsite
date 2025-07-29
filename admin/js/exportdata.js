async function exportAllData(db) {
  const exportData = {};
  for (const table of db.tables) {
    exportData[table.name] = await table.toArray();
  }

  const blob = new Blob([JSON.stringify(exportData, null, 2)], {
    type: "application/json",
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "dexie-database-export.json";
  a.click();
  URL.revokeObjectURL(url);
}

async function importAllData(db, file) {
  const reader = new FileReader();
  reader.onload = async (e) => {
    try {
      const json = JSON.parse(e.target.result);

      for (const tableName in json) {
        if (!db.tables.map((t) => t.name).includes(tableName)) {
          console.warn(
            `Table ${tableName} doesn't exist in Dexie DB, skipping.`
          );
          continue;
        }

        const data = json[tableName];

        // Optional: clear old data
        await db.table(tableName).clear();

        // Insert new data
        await db.table(tableName).bulkAdd(data);
        console.log(`Imported ${data.length} into ${tableName}`);
      }

      alert("✅ Import completed!");
    } catch (err) {
      console.error("Import failed:", err);
      alert("Import failed. Check the file format.");
    }
  };

  reader.readAsText(file);
}
