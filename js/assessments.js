(function () {
  "use strict";
  var assessment = {
    id: "overview",
    number: 0,
    titleKey: "title",
    brandSubKey: "brand_sub",
    pageTitleKey: "title",
    backKey: "course_back",
    theme: "cyberforce",
    bossEmoji: "⚡",
    bossEmojiHit: "💥",
    bossEmojiWin: "🛡️",
    bossEmojiDead: "✅",
    available: true,
    features: { flashcards: true, notecard: false, boss: false, nourish: false }
  };
  window.MAT107_ASSESSMENT_ID = "overview";
  window.Mat107Course = {
    MASTER: 10,
    ASSESSMENTS: [assessment],
    WEEK_GROUPS: [],
    getAssessment: function (id) { return id === "overview" ? assessment : null; },
    getDefaultAssessmentId: function () { return "overview"; },
    resolveAssessmentId: function (id) { return id === "overview" || id === "assessment1" ? "overview" : null; },
    progressStorageKey: function (id) { return "cyberforce-101-" + id + "-progress"; },
    notesStorageKey: function (id) { return "cyberforce-101-" + id + "-notes"; },
    practiceWeekGroups: function () { return []; },
    topicsForWeek: function () { return []; },
    relatedAssessmentIdsForTopic: function () { return []; },
    weekAssessmentForTopic: function () { return null; }
  };
})();
