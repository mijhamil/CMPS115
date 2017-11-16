function handleChange() {
  var pay = document.getElementById("payrate").value;

  pay = pay.replace(/\D/g,'');
  if (pay.indexOf("$") != 0 && pay.length != 0)
  {
    pay = pay.replace(/$/, '')
    pay = "$" + pay;
  }

  document.getElementById("payrate").value = pay;
}
