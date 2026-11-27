/* Deadline bar, countdown card and dates timeline. Reads window.IARDS_DATES (see config.js). */
(function () {
  var D = window.IARDS_DATES || [], H = 36e5, DAY = 864e5;
  var WD = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      MO = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  document.documentElement.classList.remove("no-js");

  var items = D.map(function (x) {
    var p = x.date.split("-").map(Number), day = Date.UTC(p[0], p[1] - 1, p[2]), dl = x.kind === "deadline";
    var d = new Date(day);
    var txt = x.displayDate ||
      WD[d.getUTCDay()] + ", " + MO[d.getUTCMonth()] + " " + p[2] + ", " + p[0] + (dl ? " · 11:59 PM AoE" : "");
    return { id: x.id, label: x.label, kind: x.kind, sample: !!x.sample, day: day, dl: dl, text: txt,
             end: dl ? day + DAY + 12 * H - 1000 : day, off: dl ? 12 * H : 0 };
  }).sort(function (a, b) { return a.end - b.end; });

  function pad(n) { return n < 10 ? "0" + n : "" + n; }
  function set(root, sel, v) { var e = root.querySelector(sel); if (e && e.textContent !== v) e.textContent = v; }

  function tick() {
    var now = Date.now(), next = null, i;
    for (i = 0; i < items.length; i++) if (items[i].end > now) { next = items[i]; break; }

    document.querySelectorAll("[data-countdown]").forEach(function (r) {
      if (!next) {
        set(r, "[data-eyebrow]", "Status"); set(r, "[data-label]", "Submissions closed");
        set(r, "[data-date]", ""); set(r, "[data-sample]", "");
        r.querySelectorAll(".cd,.tiles").forEach(function (e) { e.hidden = true; });
        return;
      }
      var t = Math.max(0, next.end - now), s = Math.floor(t / 1000);
      set(r, "[data-eyebrow]", next.dl ? "Next deadline" : "Next date");
      set(r, "[data-label]", next.label);
      set(r, "[data-date]", next.text);
      set(r, "[data-sample]", next.sample ? "[sample date]" : "");
      set(r, "[data-d]", "" + Math.floor(s / 86400));
      set(r, "[data-h]", pad(Math.floor(s % 86400 / 3600)));
      set(r, "[data-m]", pad(Math.floor(s % 3600 / 60)));
      set(r, "[data-s]", pad(s % 60));
    });

    document.querySelectorAll("[data-timeline] [data-id]").forEach(function (row) {
      var it = items.filter(function (x) { return x.id === row.getAttribute("data-id"); })[0];
      if (!it) return;
      var pill = row.querySelector(".pill"), txt;
      row.classList.remove("past", "next");
      if (it.end <= now) { row.classList.add("past"); txt = "Passed"; }
      else {
        if (it === next) row.classList.add("next");
        var n = Math.round((it.day - (Math.floor((now - it.off) / DAY) * DAY)) / DAY);
        txt = n <= 0 ? "Today" : n === 1 ? "Tomorrow" : "in " + n + " days";
      }
      if (pill && pill.textContent !== txt) pill.textContent = txt;
    });
  }
  tick();
  setInterval(tick, 1000);
})();
