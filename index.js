const app = document.querySelector(".app");
const inp = document.querySelector(".inp__text");
const btnDraw = document.querySelector(".draw__btn");
const label = document.querySelector("label");
let numberCell;
let numberRow;

// DRAW POINT
const drawPOint = (event, element) => {
  const top = event.clientY;
  const left = event.clientX;
  const point = document.createElement("div");
  point.classList.add("point");
  element.append(point);
  point.style.left = `${left}px`;
  point.style.top = `${top}px`;
};

app.addEventListener("click", (e) => {
  const addRow = document.querySelector(".add__row");
  if (e.target !== btnDraw && e.target !== inp && e.target !== addRow) {
    drawPOint(e, app);
  }
  if (e.target === btnDraw) {
    if (validInp(inp, label)) {
      document.querySelector(".table")?.remove();
      clearStyleError();
      const table = drawTable(inp.value);
      const addRowBtn = drawBtn();
      table.append(addRowBtn);
      app.append(table);
      inp.value = "";
    }
  }
  if (e.target === addRow) {
    const tbody = document.querySelector("tbody");
    tbody.append(drowRow());
  }
});

// DRAW TABLE
const validInp = (input, label) => {
  if (!input.value || (input.value.length > 0 && isNaN(input.value))) {
    const errorText = "PLEASE enter the number of cells in red box!!!";
    label.innerText = errorText;
    label.classList.add("error");
    input.classList.add("error__inp");
    return false;
  }
  numberCell = +input.value;
  numberRow = +input.value;
  return true;
};

const drawTd = (tr, rowNuber, countCell) => {
  for (let k = 1; k <= countCell; k++) {
    const td = document.createElement("td");
    td.innerText = `row # ${rowNuber} cell # ${k}`;
    td.classList.add("td");
    tr.append(td);
  }
};

const drawTbody = (countCell) => {
  const tbody = document.createElement("tbody");
  for (let i = 1; i <= countCell; i++) {
    const tr = document.createElement("tr");
    drawTd(tr, i, countCell);
    tbody.append(tr);
  }
  return tbody;
};

const drawTable = (countCell) => {
  const table = document.createElement("table");
  const tbody = drawTbody(countCell);
  table.append(tbody);
  table.classList.add("table");
  return table;
};

const drawBtn = () => {
  const btn = document.createElement("button");
  btn.classList.add("add__row");
  // btn.innerText = "+";
  btn.style.fontSize = "30px";
  return btn;
};

const clearStyleError = () => {
  label.classList.remove("error");
  inp.classList.remove("error__inp");
  label.innerHTML = "Enter the number of cells ⬇";
};

const drowRow = () => {
  const tr = document.createElement("tr");
  numberRow += 1;
  drawTd(tr, numberRow, numberCell);
  return tr;
};
