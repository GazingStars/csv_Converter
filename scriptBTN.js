let btnD = document.getElementById("btn-DELL");

btnD.addEventListener("click", () => {
  btnD.className = "btn btn-danger mt-3 mb-4 animate__animated animate__backOutRight";
  let csvF = document.getElementById("csvFile");
  let input = document.getElementById("coloredTextareaF");
  let output = document.getElementById("coloredTextareaS");
  output.value = "";
  csvF.value = "";
  document.querySelector(".cont").innerHTML = "";
  input.value = "";


  setTimeout(() => {
    btnD.className = "d-none";
  }, 400);
});
