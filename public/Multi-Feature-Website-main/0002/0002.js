function update(value) {
  document.getElementById("screen").value += value;
}

function result() {
  res = eval(document.getElementById("screen").value);
  document.getElementById("screen").value = res;
}

function form_reset() {
  document.getElementById("screen").value = "";
}
