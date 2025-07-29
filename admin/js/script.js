fetch("/admin/html/header.html")
  .then((res) => res.text())
  .then((data) => {
    document.getElementById("header").innerHTML = data;
    const exportBtn = document.getElementById("export_data");
    exportBtn.addEventListener("click", () => exportAllData(db));

    const importInput = document.getElementById("import_data");
    importInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        importAllData(db, file);
      }
    });
  });
