// Records one visit per browser session and shows the total in #visit-count and #visit-count-mobile.
(function () {
  var base = (window.APP_CONFIG || {}).API_BASE;
  var el = document.getElementById("visit-count");
  if (!base && !el) return;

  var pageId = "home";
  var tracked = false;
  try { tracked = sessionStorage.getItem("pf-tracked") === "1"; } catch (e) {}

  var track = tracked
    ? Promise.resolve()
    : fetch(base + "/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pageId: pageId })
      }).then(function () {
        try { sessionStorage.setItem("pf-tracked", "1"); } catch (e) {}
      });

  track
    .then(function () { return fetch(base + "/api/stats?pageId=" + encodeURIComponent(pageId)); })
    .then(function (r) { return r.json(); })
    .then(function (d) {
      var formatted = Number(d.total).toLocaleString();
      var targets = document.querySelectorAll("#visit-count, #visit-count-mobile, .visit-count");
      targets.forEach(function (node) {
        node.textContent = formatted;
      });
    })
    .catch(function () { /* keep the placeholder if the API is unreachable */ });
})();
