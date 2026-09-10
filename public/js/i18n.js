(function () {
  "use strict";
  var pack = (window.QUIZ_LANG_PACKS && window.QUIZ_LANG_PACKS.en) || {};
  function format(value, vars) {
    return String(value).replace(/\{(\w+)\}/g, function (_, key) {
      return vars && vars[key] != null ? String(vars[key]) : "{" + key + "}";
    });
  }
  function t(key, vars) {
    var value = pack[key];
    if (value == null && key.indexOf("hint_overview.") === 0) {
      value = pack["hint_overview_" + key.slice("hint_overview.".length)] || pack.hint_overview_generic;
    }
    return format(value == null ? key : value, vars);
  }
  function applyStatic() {
    document.documentElement.lang = "en";
    document.querySelectorAll("[data-i18n]").forEach(function (el) { el.textContent = t(el.getAttribute("data-i18n")); });
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) { el.innerHTML = t(el.getAttribute("data-i18n-html")); });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) { el.placeholder = t(el.getAttribute("data-i18n-placeholder")); });
    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) { el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria"))); });
    var titleKey = document.documentElement.getAttribute("data-i18n-title");
    if (titleKey) document.title = t(titleKey);
  }
  window.QuizI18n = { t: t, has: function (key) { return pack[key] != null || key.indexOf("hint_overview.") === 0; }, applyStatic: applyStatic, ready: Promise.resolve(), getLang: function () { return "en"; }, languages: function () { return [{ code: "en", name: "English", native: "English" }]; }, onChange: function () {} };
})();
