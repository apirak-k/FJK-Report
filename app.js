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
        const activities = data.timeline.activities.filter(function (activity) {
          return activity.topicId === topic.id && activity.week === week;
        });
        if (activities.length) {
          const markers = element("div", "activity-markers");
          activities.forEach(function (activity, activityIndex) {
            const marker = element("a", "activity-marker");
            marker.href = "#" + activity.targetId;
            marker.setAttribute("aria-label", "Go to " + topic.title + " activity " + (activityIndex + 1) + ", Week " + week);
            marker.title = topic.title + " activity · Week " + week;
            marker.append(element("span", "visually-hidden", "Activity " + (activityIndex + 1)));
            markers.append(marker);
          });
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
  renderTimeline();
  renderSwot();
  initBackToTop();
}());
