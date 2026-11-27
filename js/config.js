/* Dates shown in the deadline bar, the countdown card and the timeline.
   kind: "deadline" (expires 23:59 AoE, UTC-12, on its date) or "event" (starts 00:00 UTC on its date).
   sample:true shows a "[sample date]" label. Set it to false (or remove it) once a date is confirmed.
   If you change a date here, also change the visible text in dates/index.html and the bar markup (no-JS fallback). */
window.IARDS_DATES = [
  { id: "submission",   label: "Paper submission deadline",            date: "2027-03-15", kind: "deadline", sample: true },
  { id: "notification", label: "Notification of acceptance",           date: "2027-04-15", kind: "deadline", sample: true },
  { id: "camera-ready", label: "Camera-ready and author registration", date: "2027-05-10", kind: "deadline", sample: true },
  { id: "workshop",     label: "Workshop day (one day, TBA)",          date: "2027-07-12", kind: "event", displayDate: "Within July 12–15, 2027", sample: true }
];
