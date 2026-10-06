(function () {
  "use strict";

  const data = window.presentationData;

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function renderOverview() {
    document.getElementById("overview-summary").textContent = data.overview.summary;
    const facts = document.getElementById("student-facts");
    data.overview.facts.forEach(function (fact) {
      facts.append(element("dt", "", fact.label), element("dd", "", fact.value));
    });
  }

  function formatWeeks(weeks) {
    const ranges = [];
    weeks.slice().sort(function (a, b) { return a - b; }).forEach(function (week) {
      const lastRange = ranges[ranges.length - 1];
      if (lastRange && week === lastRange[1] + 1) lastRange[1] = week;
      else ranges.push([week, week]);
    });
    return ranges.map(function (range) {
      return range[0] === range[1] ? "W" + range[0] : "W" + range[0] + "–W" + range[1];
    }).join(" · ");
  }

  function renderTopics() {
    data.topics.forEach(function (topic) {
      const container = document.getElementById("subtopics-" + topic.id);
      if (topic.showActiveWeeks) {
        const header = document.querySelector("#topic-" + topic.id + " .topic-section__header");
        header.append(element("p", "topic-weeks", formatWeeks(topic.activeWeeks)));
      }
      topic.subtopics.forEach(function (subtopic) {
        const section = element("article", "subtopic-section");
        section.id = "subtopic-" + subtopic.id;
        section.tabIndex = -1;
        const titleId = "subtopic-title-" + subtopic.id;
        section.setAttribute("aria-labelledby", titleId);
        const title = element("h4", "subtopic-title", subtopic.title);
        title.id = titleId;
        section.append(title);
        if (subtopic.weeks.length) section.append(element("p", "subtopic-weeks", formatWeeks(subtopic.weeks)));
        if (subtopic.details && subtopic.details.length) {
          const details = element("ul", "subtopic-details");
          subtopic.details.forEach(function (detail) { details.append(element("li", "", detail)); });
          section.append(details);
        }
        container.append(section);
      });
    });
  }

  function renderTimeline() {
    const columns = document.getElementById("gantt-columns");
    columns.append(element("col", "gantt-topic-column"));
    data.weeks.forEach(function () { columns.append(element("col", "gantt-week-column")); });

    const weekHead = document.getElementById("gantt-week-head");
    const topicHeading = element("th", "gantt-topic-heading", "Topic");
    topicHeading.scope = "col";
    weekHead.append(topicHeading);
    data.weeks.forEach(function (week) {
      const heading = element("th", "gantt-week-heading");
      heading.scope = "col";
      heading.append(element("span", "week-label", "W" + String(week).padStart(2, "0")));
      weekHead.append(heading);
    });

    const rows = document.getElementById("gantt-rows");
    data.topics.forEach(function (topic) {
      const row = element("tr", "gantt-row");
      const heading = element("th", "gantt-row-heading");
      heading.scope = "row";
      const link = element("a", "topic-row-link");
      link.href = "#topic-" + topic.id;
      link.append(element("span", "", topic.title));
      heading.append(link);
      row.append(heading);

      data.weeks.forEach(function (week) {
        const cell = element("td", "gantt-cell");
        if (topic.activeWeeks.includes(week)) {
          const markers = element("div", "activity-markers");
          const marker = element("a", "activity-marker");
          marker.href = "#topic-" + topic.id;
          marker.setAttribute("aria-label", "Go to " + topic.title + ", Week " + week);
          marker.title = topic.title + " · Week " + week;
          markers.append(marker);
          cell.append(markers);
        } else {
          cell.setAttribute("aria-hidden", "true");
        }
        row.append(cell);
      });
      rows.append(row);
    });
  }

  function renderSwot() {
    const grid = document.getElementById("swot-grid");
    data.swot.forEach(function (item) {
      const card = element("article", "swot-card swot-card--" + item.id);
      card.append(element("h3", "swot-title", item.title));
      const points = element("ul", "swot-points");
      item.points.forEach(function (point) { points.append(element("li", "", point)); });
      card.append(points);
      grid.append(card);
    });
  }

  function initBackToTop() {
    const control = document.querySelector(".back-to-top");
    function updateVisibility() {
      control.hidden = window.scrollY < 360;
    }
    window.addEventListener("scroll", updateVisibility, { passive: true });
    updateVisibility();
  }

  renderOverview();
  renderTopics();
  renderTimeline();
  renderSwot();
  initBackToTop();
}());
