(function () {
  var el = document.getElementById("footer-updated");
  if (el) { var now = new Date(); el.textContent = "Updated " + now.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }); el.dateTime = now.toISOString(); }
})();
