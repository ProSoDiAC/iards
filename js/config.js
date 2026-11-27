/* Dates shown in the deadline bar, the countdown card and the timeline.
   kind: "deadline" (expires 23:59 AoE, UTC-12, on its date) or "event" (starts 00:00 UTC on its date).
   sample:true shows a "[sample date]" label. Set it to false (or remove it) once a date is confirmed.
   If you change a date here, also change the visible text in dates/index.html and the bar markup (no-JS fallback). */
window.IARDS_DATES = [
  { id: "submission",   label: "Paper submission deadline",            date: "2027-03-07", kind: "deadline" },
  { id: "notification", label: "Notification of acceptance",           date: "2027-04-23", kind: "deadline" },
  { id: "camera-ready", label: "Camera-ready papers due (hard deadline)", date: "2027-05-07", kind: "deadline" },
  { id: "workshop",     label: "Workshop day (one day, TBA)",          date: "2027-07-14", kind: "event", displayDate: "Within July 14–15, 2027" }
];
