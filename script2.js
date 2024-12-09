let Events = ["csvFile", "delimiterSelect"];

document.getElementById("csvFile").addEventListener("change", EventHandler);

Events.forEach((e) => {
  document.getElementById(e).addEventListener("change", EventHandler);
});

async function EventHandler(params) {
  document.querySelector(".cont").innerHTML = "";

  const acceptedFile = document.getElementById("csvFile");
  const files = Array.from(acceptedFile.files);
  const splitter = document.getElementById("delimiterSelect");
  let regEx = /\.xlsx$/;

  for (const file of files) {
    if (regEx.test(file.name)) {
      break;
    }
    const newTable = document.createElement("table");

    const fileName = file.name;
    const csvText = await file.text();
    const rows = csvText
      .split("\n")
      .map((row) =>
        row.split(`${splitter.value}`).map((cell) => cell.replace(/"|""/g, ""))
      );
    header = rows[0];
    const tableHeader = document.createElement("thead");

    const th = document.createElement("th");
    th.textContent = "Index";
    tableHeader.appendChild(th);

    header.forEach((cell) => {
      const th = document.createElement("th");
      th.textContent = cell.trim();
      tableHeader.appendChild(th);
    });

    const tableBody = document.createElement("tbody");
    tableBody.innerHTML = "";

    rows.slice(1).forEach((row, index) => {
      const tr = document.createElement("tr");

      // Adding a serial number
      const tdIndex = document.createElement("td");
      tdIndex.textContent = index + 1;
      tr.appendChild(tdIndex);

      // Adding data from cells
      row.forEach((cell) => {
        const td = document.createElement("td");
        td.textContent = cell.trim();
        tr.appendChild(td);
      });

      tableBody.appendChild(tr);
    });
    newTable.appendChild(tableHeader);
    newTable.appendChild(tableBody);
    newTable.className = "table mb-5 animate__animated animate__fadeIn";
    newTable.style.display = "table";

    let TName = document.createElement("label");
    TName.innerHTML = fileName;
    TName.className = "form-label fs-4 fw-bold mt-3";

    document.querySelector(".cont").appendChild(TName);
    document.querySelector(".cont").appendChild(newTable);

    let input = document.getElementById("coloredTextareaF");
    input.value += `${fileName} \n ${csvText}\n`;
  }
  if (files.length !== 0) {
    setTimeout(() => {
      let dellBTN = document.getElementById("btn-DELL");

      dellBTN.className =
        "btn btn-danger mt-3 mb-4 animate__animated animate__backInRight";
    }, 50);
  }
}
