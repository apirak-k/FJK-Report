(function () {
  "use strict";

  const data = window.presentationData;
  const topicById = new Map(data.topics.map(function (topic) { return [topic.id, topic]; }));
  const activityById = new Map(data.timeline.activities.map(function (activity) { return [activity.id, activity]; }));
  const dialog = document.getElementById("detail-dialog");
  const dialogTitle = document.getElementById("dialog-title");
  const dialogIntro = document.getElementById("dialog-intro");
  const dialogContent = document.getElementById("dialog-content");
  const dialogClose = document.getElementById("dialog-close");

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function makeButton(text, className, action, value) {
    const button = element("button", className, text);
    button.type = "button";
    button.dataset[action] = value;
    return button;
  }

  function renderOverview() {
    document.getElementById("overview-summary").textContent = data.overview.summary;
    const facts = document.getElementById("student-facts");
    data.overview.facts.forEach(function (fact) {
      facts.append(element("dt", "", fact.label), element("dd", "", fact.value));
    });
  }

  function renderTimeline() {
    document.getElementById("preview-note").textContent = data.timeline.notice;
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
      heading.append(makeButton("W" + String(week).padStart(2, "0"), "week-button", "week", String(week)));
      weekHead.append(heading);
    });

    const rows = document.getElementById("gantt-rows");
    data.topics.forEach(function (topic, index) {
      const row = element("tr", "gantt-row");
      row.style.setProperty("--topic-color", topic.color);
      const heading = element("th", "gantt-row-heading");
      heading.scope = "row";
      const link = element("a", "topic-row-link");
      link.href = "#topic-" + topic.id;
      link.append(element("span", "topic-row-number", String(index + 1).padStart(2, "0")));
      link.append(element("span", "", topic.title));
      link.append(element("span", "topic-row-arrow", "↗"));
      heading.append(link);
      row.append(heading);

      data.weeks.forEach(function (week) {
        const cell = element("td", "gantt-cell");
        const matchingActivities = data.timeline.activities.filter(function (activity) {
          return activity.topicId === topic.id && activity.week === week;
        });
        if (matchingActivities.length) {
          const markerGroup = element("div", "activity-markers");
          matchingActivities.forEach(function (activity, activityIndex) {
            const marker = makeButton("", "activity-marker", "activity", activity.id);
            marker.style.setProperty("--topic-color", topic.color);
            marker.setAttribute("aria-label", "Layout placeholder for " + topic.title + " in Week " + week + ". Open contextual details.");
            marker.title = "Placeholder activity · " + topic.title + " · Week " + week;
            marker.append(element("span", "visually-hidden", "Activity " + (activityIndex + 1)));
            markerGroup.append(marker);
          });
          cell.append(markerGroup);
        } else {
          cell.setAttribute("aria-hidden", "true");
        }
        row.append(cell);
      });
      rows.append(row);
    });
  }

  function placeholderCard(title, text, extraClass) {
    const card = element("article", "topic-cardlet" + (extraClass ? " " + extraClass : ""));
    card.append(element("p", "card-kicker", title));
    card.append(element("p", "placeholder-copy", text));
    return card;
  }

  function renderTopic(topic, index) {
    const section = element("section", "topic-section");
    section.id = "topic-" + topic.id;
    section.tabIndex = -1;
    section.setAttribute("aria-labelledby", "topic-title-" + topic.id);
    section.style.setProperty("--topic-color", topic.color);

    const header = element("div", "topic-section__header");
    const titleWrap = element("div", "topic-title-wrap");
    titleWrap.append(element("p", "topic-index", "TOPIC " + String(index + 1).padStart(2, "0")));
    titleWrap.append(element("h3", "topic-title", topic.title));
    titleWrap.lastChild.id = "topic-title-" + topic.id;
    header.append(titleWrap);
    header.append(element("span", "topic-label", "Details placeholder"));
    section.append(header);

    const grid = element("div", "topic-detail-grid");
    grid.append(placeholderCard("Overview", topic.overview, "topic-cardlet--overview"));

    const weeksCard = element("article", "topic-cardlet topic-cardlet--weeks");
    weeksCard.append(element("p", "card-kicker", "Related weeks"));
    const weekList = element("div", "week-chip-list");
    const relatedWeeks = Array.from(new Set(data.timeline.activities
      .filter(function (activity) { return activity.topicId === topic.id; })
      .map(function (activity) { return activity.week; }))).sort(function (a, b) { return a - b; });
    relatedWeeks.forEach(function (week) {
      weekList.append(makeButton("Week " + String(week).padStart(2, "0"), "week-chip", "week", String(week)));
    });
    weeksCard.append(weekList);
    grid.append(weeksCard);

    const activitiesCard = element("article", "topic-cardlet topic-cardlet--activities");
    activitiesCard.append(element("p", "card-kicker", "Subtopics & activities"));
    activitiesCard.append(element("p", "placeholder-copy", topic.activities));
    const activityList = element("div", "topic-activity-list");
    data.timeline.activities.filter(function (activity) { return activity.topicId === topic.id; }).forEach(function (activity) {
      activityList.append(makeButton("Week " + String(activity.week).padStart(2, "0") + " · Activity placeholder", "topic-activity-link", "activity", activity.id));
    });
    activitiesCard.append(activityList);
    grid.append(activitiesCard);

    const visualsCard = element("article", "topic-cardlet topic-cardlet--visuals");
    visualsCard.append(element("p", "card-kicker", "Images & diagrams"));
    visualsCard.append(element("p", "placeholder-copy", topic.visuals));
    const visualSlots = element("div", "visual-slots");
    ["Image / screenshot", "Diagram"].forEach(function (label) {
      const slot = element("div", "visual-slot");
      slot.append(element("span", "visual-slot__glyph", "◇"));
      slot.append(element("span", "visual-slot__label", label + " placeholder"));
      visualSlots.append(slot);
    });
    visualsCard.append(visualSlots);
    grid.append(visualsCard);

    grid.append(placeholderCard("Evidence & results", topic.evidence, "topic-cardlet--evidence"));
    grid.append(placeholderCard("Optional links", topic.links, "topic-cardlet--links"));
    section.append(grid);

    const footer = element("div", "topic-section__footer");
    footer.append(element("span", "topic-footer-note", "Return to the timeline to explore another week or topic."));
    const back = element("a", "back-link", "↑ Back to the timeline");
    back.href = "#timeline";
    footer.append(back);
    section.append(footer);
    return section;
  }

  function renderTopics() {
    const container = document.getElementById("topic-sections");
    data.topics.forEach(function (topic, index) {
      container.append(renderTopic(topic, index));
    });
  }

  function renderSwot() {
    const grid = document.getElementById("swot-grid");
    data.swot.forEach(function (item) {
      const card = element("article", "swot-card swot-card--" + item.id);
      card.append(element("p", "swot-index", item.index));
      card.append(element("h3", "swot-title", item.title));
      card.append(element("p", "placeholder-copy", item.prompt));
      grid.append(card);
    });
  }

  function showDialog(title, intro) {
    dialogTitle.textContent = title;
    dialogIntro.textContent = intro;
    dialogContent.replaceChildren();
    if (!dialog.open) dialog.showModal();
    dialogClose.focus();
  }

  function showWeek(week) {
    const matches = data.timeline.activities.filter(function (activity) { return activity.week === week; });
    showDialog("Week " + week, "Placeholder activities for this week. These preview markers do not describe confirmed internship work.");
    if (!matches.length) {
      dialogContent.append(element("p", "dialog-empty", "No preview markers are assigned to this week yet."));
      return;
    }
    const list = element("ul", "week-activity-list");
    matches.forEach(function (activity) {
      const topic = topicById.get(activity.topicId);
      if (!topic) return;
      const item = element("li", "week-activity-item");
      const context = element("div", "week-activity-context");
      const topicLink = makeButton(topic.title, "dialog-topic-link", "topic", topic.id);
      topicLink.style.setProperty("--topic-color", topic.color);
      context.append(topicLink, element("span", "week-activity-name", "Activity placeholder"));
      item.append(context);
      item.append(makeButton("View activity detail", "text-action", "activity", activity.id));
      list.append(item);
    });
    dialogContent.append(list);
  }

  function showActivity(activityId) {
    const activity = activityById.get(activityId);
    if (!activity) return;
    const topic = topicById.get(activity.topicId);
    if (!topic) return;
    showDialog(topic.title + " · Week " + activity.week, "Context for one topic-and-week marker. This is a layout placeholder for future content.");
    const card = element("article", "activity-detail-card");
    card.style.setProperty("--topic-color", topic.color);
    card.append(element("p", "card-kicker", "WEEK " + String(activity.week).padStart(2, "0") + " / " + topic.title));
    card.append(element("h3", "activity-detail-title", "Activity placeholder"));
    card.append(element("p", "placeholder-copy", "[Add the activity, context, and relevant result for this topic and week.]"));
    dialogContent.append(card);

    const actions = element("div", "dialog-actions");
    actions.append(makeButton("Open topic section", "dialog-action", "topic", topic.id));
    actions.append(makeButton("View Week " + activity.week, "dialog-action dialog-action--quiet", "week", String(activity.week)));
    dialogContent.append(actions);
  }

  function openTopic(topicId) {
    const section = document.getElementById("topic-" + topicId);
    if (!section) return;
    if (dialog.open) dialog.close();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    section.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
    section.focus({ preventScroll: true });
  }

  document.addEventListener("click", function (event) {
    const trigger = event.target.closest("[data-week], [data-activity], [data-topic]");
    if (!trigger) return;
    if (trigger.dataset.week) {
      showWeek(Number(trigger.dataset.week));
    } else if (trigger.dataset.activity) {
      showActivity(trigger.dataset.activity);
    } else if (trigger.dataset.topic) {
      openTopic(trigger.dataset.topic);
    }
  });

  dialogClose.addEventListener("click", function () { dialog.close(); });
  renderOverview();
  renderTimeline();
  renderTopics();
  renderSwot();
}());
