document.getElementById("convert").addEventListener("click", async () => {
  const acceptedFile = document.getElementById("csvFile");
  const files = Array.from(acceptedFile.files);
  const splitter = document.getElementById("delimiterSelect");

  let workbooks = [];
  let names = [];
  let regEx = /\.xlsx$/;

  for (const file of files) {
    if (regEx.test(file.name)) {
      break;
    }

    const fileName = file.name;
    const csvText = await file.text();
    const rows = csvText
      .split("\n")
      .map((row) => row.split(`${splitter.value}`).map((cell) => cell.replace(/"|""/g, "")));

    // Making Excel
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(rows);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    workbooks.push(workbook);
    names.push(fileName);

    console.log(`Файл ${fileName} обработан.`);
  }

  let output = document.getElementById("coloredTextareaS");

  workbooks.forEach((workbook, index) => {
    let sheet = workbook.Sheets["Sheet1"];
    rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    if (!regEx.test(names[index])) {
      const outputFileName = names[index].replace(/\.csv$/, ".xlsx");
      output.value += `${outputFileName} \n ${rows.map((row) =>
        row.join("\t")
      )}`;
    }
  });

  workbooks.forEach((workbook, index) => {
    if (!regEx.test(names[index])) {
      const outputFileName = names[index].replace(/\.csv$/, ".xlsx");
      XLSX.writeFile(workbook, outputFileName);
      console.log(`Файл Excel "${outputFileName}" сохранён.`);
    }
  });
});
