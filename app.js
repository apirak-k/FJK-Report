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
      if (topic.repository) {
        const headerContent = document.querySelector("#topic-" + topic.id + " .topic-section__header > div");
        const repository = element("a", "topic-repository-link", "View Repository ↗");
        repository.href = topic.repository;
        repository.target = "_blank";
        repository.rel = "noopener noreferrer";
        headerContent.append(repository);
      }
      if (topic.id === "foundation") {
        renderFoundation(topic, container);
        return;
      }
      if (topic.id === "manufacturing") {
        renderManufacturing(topic, container);
        return;
      }
      if (topic.id === "msa") {
        renderMsa(topic, container);
        return;
      }
      if (topic.id === "doe") {
        renderDoe(topic, container);
        return;
      }
      if (topic.id === "ai-swe-fundamentals") {
        renderAiSwe(topic, container);
        return;
      }
      if (topic.id === "machine-setup") {
        renderMachineSetup(topic, container);
        return;
      }
      if (topic.id === "workshop") {
        renderWorkshop(topic, container);
        return;
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

  function renderFoundation(topic, container) {
    const intro = element("p", "foundation-intro", topic.intro);
    container.append(intro);

    const main = element("div", "foundation-main");
    const company = topic.subtopics.find(function (item) { return item.id === "company-department-orientation"; });
    const companySection = renderFoundationSubtopic(company, "foundation-subtopic foundation-subtopic--company");
    main.append(companySection, renderFoundationImage(company));
    container.append(main);

    const ecp = topic.subtopics.find(function (item) { return item.id === "process-ecp"; });
    container.append(renderFoundationSubtopic(ecp, "foundation-subtopic foundation-subtopic--text-only"));

    const support = element("div", "foundation-support");
    ["rules-safety-policies", "factory-layout"].forEach(function (id) {
      const subtopic = topic.subtopics.find(function (item) { return item.id === id; });
      support.append(renderFoundationSubtopic(subtopic, "foundation-subtopic foundation-subtopic--supporting"));
    });
    container.append(support);
  }

  function renderManufacturing(topic, container) {
    container.append(element("p", "manufacturing-intro", topic.intro));

    [
      ["process-product", "production-line"],
      ["artwork-drawings", "gstar-cad-measurement"]
    ].forEach(function (group) {
      const row = element("div", "manufacturing-row");
      group.forEach(function (id) {
        const subtopic = topic.subtopics.find(function (item) { return item.id === id; });
        row.append(renderManufacturingSubtopic(subtopic));
      });
      container.append(row);
    });

    const automation = topic.subtopics.find(function (item) { return item.id === "automation-system"; });
    container.append(renderManufacturingSubtopic(automation, "manufacturing-item manufacturing-item--automation"));
  }

  function renderManufacturingSubtopic(subtopic, className) {
    const topicClass = subtopic.id === "artwork-drawings" || subtopic.id === "gstar-cad-measurement" ? " manufacturing-item--technical" : "";
    const section = element("article", (className || "manufacturing-item") + topicClass);
    section.id = "subtopic-" + subtopic.id;
    section.tabIndex = -1;
    section.setAttribute("aria-labelledby", "subtopic-title-" + subtopic.id);
    const title = element("h4", "subtopic-title", subtopic.title);
    title.id = "subtopic-title-" + subtopic.id;
    section.append(title, element("p", "subtopic-weeks", formatWeeks(subtopic.weeks)), renderFoundationImage(subtopic), element("p", "manufacturing-description", subtopic.description));
    return section;
  }

  function renderMsa(topic, container) {
    container.append(element("p", "msa-intro", topic.intro));

    const calibration = topic.subtopics.find(function (subtopic) { return subtopic.id === "calibration"; });
    container.append(renderMsaSubtopic(calibration, "msa-calibration"));

    const analyses = element("section", "msa-analyses");
    const heading = element("h3", "msa-group-title", "Measurement Analysis");
    analyses.append(heading);
    const grid = element("div", "msa-analysis-grid");
    ["grr", "linearity", "bias", "correlation"].forEach(function (id) {
      const subtopic = topic.subtopics.find(function (item) { return item.id === id; });
      grid.append(renderMsaSubtopic(subtopic, "msa-analysis"));
    });
    analyses.append(grid);
    container.append(analyses);
  }

  function renderMsaSubtopic(subtopic, className) {
    const section = element("article", "msa-subtopic " + className);
    section.id = "subtopic-" + subtopic.id;
    section.tabIndex = -1;
    section.setAttribute("aria-labelledby", "subtopic-title-" + subtopic.id);
    const title = element("h4", "subtopic-title", subtopic.title);
    title.id = "subtopic-title-" + subtopic.id;
    section.append(title, element("p", "subtopic-weeks", formatWeeks(subtopic.weeks)), renderFoundationImage(subtopic), element("p", "msa-description", subtopic.description));
    return section;
  }

  function renderDoe(topic, container) {
    container.append(element("p", "doe-intro", topic.intro));

    const kansai = topic.subtopics.find(function (subtopic) { return subtopic.id === "kansai-felt-tape-evaluation"; });
    const kansaiCase = element("section", "doe-case-study doe-kansai");
    kansaiCase.id = "subtopic-" + kansai.id;
    kansaiCase.tabIndex = -1;
    kansaiCase.setAttribute("aria-labelledby", "doe-title-kansai");
    const kansaiTitle = element("h4", "doe-case-title", kansai.title);
    kansaiTitle.id = "doe-title-kansai";
    kansaiCase.append(kansaiTitle, element("p", "subtopic-weeks", formatWeeks(kansai.weeks)));

    const kansaiTop = element("div", "doe-kansai-top");
    kansaiTop.append(renderDoeImage(kansai.images[0], "doe-kansai-defect"));
    const kansaiCopy = element("div", "doe-kansai-copy");
    kansaiCopy.append(element("p", "doe-description", kansai.description));
    const details = element("ul", "doe-details");
    kansai.details.forEach(function (detail) { details.append(element("li", "", detail)); });
    kansaiCopy.append(details);
    kansaiTop.append(kansaiCopy);
    kansaiCase.append(kansaiTop);

    kansaiCase.append(element("h5", "doe-results-label", "Representative Results"));
    const kansaiResults = element("div", "doe-kansai-results");
    kansaiResults.append(renderDoeImage(kansai.images[1], "doe-kansai-result"));
    kansaiResults.append(renderDoeImage(kansai.images[2], "doe-kansai-result"));
    kansaiCase.append(kansaiResults);
    container.append(kansaiCase);

    const peel = topic.subtopics.find(function (subtopic) { return subtopic.id === "sample-preparation-peel-test"; });
    const peelCase = element("section", "doe-case-study doe-peel");
    peelCase.id = "subtopic-" + peel.id;
    peelCase.tabIndex = -1;
    peelCase.setAttribute("aria-labelledby", "doe-title-peel");
    const peelTitle = element("h4", "doe-case-title", peel.title);
    peelTitle.id = "doe-title-peel";
    peelCase.append(peelTitle, element("p", "subtopic-weeks", formatWeeks(peel.weeks)), element("p", "doe-description", peel.description));

    const activities = element("div", "doe-peel-activities");
    peel.images.slice(0, 3).forEach(function (image, index) {
      const activity = element("div", "doe-peel-activity");
      activity.append(element("h5", "doe-activity-label", ["Sample Preparation", "Peel Test", "Tested Samples"][index]));
      activity.append(renderDoeImage(image, "doe-peel-activity-image"));
      activities.append(activity);
    });
    peelCase.append(activities);

    const process = element("p", "doe-process", "Prepare Sample  →  Peel Test  →  Evaluate");
    process.setAttribute("aria-label", "Prepare Sample, then Peel Test, then Evaluate");
    peelCase.append(process, element("h5", "doe-results-label", "Representative Result"));
    const peelResult = element("div", "doe-peel-result");
    peelResult.append(renderDoeImage(peel.images[3], "doe-peel-result-image"));
    peelResult.append(element("p", "doe-detail-note", peel.details[0]));
    peelCase.append(peelResult);
    container.append(peelCase);
  }

  function renderDoeImage(image, className) {
    const figure = renderFoundationImage({
      id: image.id,
      title: image.title,
      image: image.image,
      imageAlt: image.imageAlt,
      caption: image.title
    });
    figure.classList.add(className);
    return figure;
  }

  function renderAiSwe(topic, container) {
    const header = document.querySelector("#topic-ai-swe-fundamentals .topic-section__header > div");
    header.append(element("p", "ai-swe-expansion", topic.expansion));
    container.append(element("p", "ai-swe-intro", topic.intro));

    const prompting = topic.subtopics.find(function (subtopic) { return subtopic.id === "prompting-ai-usage"; });
    const promptingSection = renderAiSweSubtopic(prompting, "ai-swe-prompting");
    promptingSection.append(element("p", "ai-swe-description", prompting.description));
    container.append(promptingSection);

    const git = topic.subtopics.find(function (subtopic) { return subtopic.id === "git-version-control"; });
    const gitSection = renderAiSweSubtopic(git, "ai-swe-git");
    const gitImages = element("div", "ai-swe-git-images");
    git.images.forEach(function (image) { gitImages.append(renderAiSweImage(image, "ai-swe-git-image")); });
    gitSection.append(gitImages, element("p", "ai-swe-description", git.description));
    container.append(gitSection);

    const tools = topic.subtopics.find(function (subtopic) { return subtopic.id === "ai-tools"; });
    const toolsSection = renderAiSweSubtopic(tools, "ai-swe-tools");
    toolsSection.append(element("p", "ai-swe-description", tools.description));
    const concepts = element("div", "ai-swe-concepts");
    tools.concepts.forEach(function (concept) {
      const item = element("div", "ai-swe-concept");
      item.append(element("h5", "ai-swe-concept__term", concept.term), element("p", "ai-swe-concept__meaning", concept.meaning));
      concepts.append(item);
    });
    toolsSection.append(concepts);
    container.append(toolsSection);

    const workflow = topic.subtopics.find(function (subtopic) { return subtopic.id === "ai-workflow-framework"; });
    const workflowSection = renderAiSweSubtopic(workflow, "ai-swe-workflow");
    workflowSection.append(element("p", "ai-swe-description", workflow.description), renderAiSweFlow(workflow.steps));
    container.append(workflowSection);

    const haws = topic.subtopics.find(function (subtopic) { return subtopic.id === "haws"; });
    const hawsSection = renderAiSweSubtopic(haws, "ai-swe-haws");
    const hawsTop = element("div", "ai-swe-haws-top");
    hawsTop.append(renderAiSweImage(haws.image, "ai-swe-haws-image"));
    const hawsCopy = element("div", "ai-swe-haws-copy");
    hawsCopy.append(element("p", "ai-swe-description", haws.description), renderAiSweFlow(haws.steps));
    const repoLink = element("a", "foundation-external-link", "View HAWS Repository ↗");
    repoLink.href = haws.repository;
    repoLink.target = "_blank";
    repoLink.rel = "noopener noreferrer";
    hawsCopy.append(repoLink);
    hawsTop.append(hawsCopy);
    hawsSection.append(hawsTop);
    container.append(hawsSection);
  }

  function renderAiSweSubtopic(subtopic, className) {
    const section = element("article", "ai-swe-subtopic " + className);
    section.id = "subtopic-" + subtopic.id;
    section.tabIndex = -1;
    const titleId = "subtopic-title-" + subtopic.id;
    section.setAttribute("aria-labelledby", titleId);
    const title = element("h4", "subtopic-title", subtopic.title);
    title.id = titleId;
    section.append(title, element("p", "subtopic-weeks", formatWeeks(subtopic.weeks)));
    return section;
  }

  function renderAiSweImage(image, className) {
    const figure = renderFoundationImage(image);
    figure.classList.add(className);
    return figure;
  }

  function renderAiSweFlow(steps) {
    const flow = element("ol", "ai-swe-flow");
    flow.setAttribute("aria-label", steps.join(" then "));
    steps.forEach(function (step) { flow.append(element("li", "", step)); });
    return flow;
  }

  function renderMachineSetup(topic, container) {
    container.append(element("p", "machine-setup-intro", topic.intro));
    topic.subtopics.forEach(function (subtopic) {
      const section = element("article", "subtopic-section machine-setup-item machine-setup-item--" + subtopic.id);
      section.id = "subtopic-" + subtopic.id;
      section.tabIndex = -1;
      const titleId = "subtopic-title-" + subtopic.id;
      section.setAttribute("aria-labelledby", titleId);
      const title = element("h4", "subtopic-title", subtopic.title);
      title.id = titleId;
      section.append(title);
      if (subtopic.weeks.length) section.append(element("p", "subtopic-weeks", formatWeeks(subtopic.weeks)));

      if (subtopic.id === "ai-inspection-camera") {
        const images = element("div", "machine-setup-camera-images");
        subtopic.images.forEach(function (image) { images.append(renderMachineImage(image, "machine-setup-camera-image")); });
        section.append(images, element("p", "machine-setup-description", subtopic.description));
        section.append(element("p", "machine-setup-details", subtopic.details.join(" · ")));
      } else if (subtopic.id === "qr-code-setup-classification") {
        section.append(element("p", "machine-setup-description", subtopic.description));
        const reference = element("a", "foundation-external-link", "KEYENCE SR-X Series ↗");
        reference.href = subtopic.referenceUrl;
        reference.target = "_blank";
        reference.rel = "noopener noreferrer";
        section.append(reference, element("p", "machine-setup-flow", "Setup → Test → Evaluate"));
        section.append(element("h5", "machine-setup-result-title", "Capability Test Result"));
        section.append(renderMachineImage(subtopic.result, "machine-setup-cpk-image"));
        section.append(element("p", "machine-setup-result-note", "Cp / Cpk — Process capability evaluation"));
      } else {
        section.append(renderMachineImage(subtopic.image, "machine-setup-single-image"));
        section.append(element("p", "machine-setup-description", subtopic.description));
      }
      container.append(section);
    });
  }

  function renderMachineImage(image, className) {
    const figure = renderFoundationImage(image);
    figure.classList.add(className);
    return figure;
  }

  function renderWorkshop(topic, container) {
    container.append(element("p", "workshop-intro", topic.intro));
    const grid = element("div", "workshop-grid");
    topic.subtopics.forEach(function (subtopic) {
      const section = element("article", "subtopic-section workshop-item");
      section.id = "subtopic-" + subtopic.id;
      section.tabIndex = -1;
      const titleId = "subtopic-title-" + subtopic.id;
      section.setAttribute("aria-labelledby", titleId);
      const title = element("h4", "subtopic-title", subtopic.title);
      title.id = titleId;
      section.append(title, element("p", "subtopic-weeks", formatWeeks(subtopic.weeks)));
      section.append(renderWorkshopImage(subtopic));
      section.append(element("p", "workshop-description", subtopic.description));
      grid.append(section);
    });
    container.append(grid);
  }

  function renderWorkshopImage(subtopic) {
    const image = {
      id: subtopic.id,
      title: subtopic.title,
      image: subtopic.image,
      imageAlt: subtopic.imageAlt
    };
    const figure = renderFoundationImage(image);
    figure.classList.add("workshop-item__figure");
    return figure;
  }

  function renderFoundationSubtopic(subtopic, className) {
    const section = element("article", className);
    section.id = "subtopic-" + subtopic.id;
    section.tabIndex = -1;
    section.setAttribute("aria-labelledby", "subtopic-title-" + subtopic.id);
    const title = element("h4", "subtopic-title", subtopic.title);
    title.id = "subtopic-title-" + subtopic.id;
    section.append(title, element("p", "subtopic-weeks", formatWeeks(subtopic.weeks)));

    if (subtopic.image && subtopic.id !== "company-department-orientation") section.append(renderFoundationImage(subtopic));
    section.append(element("p", "foundation-description", subtopic.description));

    if (subtopic.link) {
      const link = element("a", "foundation-external-link", subtopic.link.label);
      link.href = subtopic.link.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      section.append(link);
    }
    if (subtopic.caption) section.append(element("p", "foundation-caption", subtopic.caption));
    return section;
  }

  function renderFoundationImage(subtopic) {
    const figure = element("figure", "foundation-subtopic__figure");
    const button = element("button", "foundation-media-frame");
    button.type = "button";
    button.setAttribute("aria-label", "View full image: " + (subtopic.caption || subtopic.title));
    const image = element("img", "foundation-image foundation-image--" + subtopic.id);
    image.src = subtopic.image;
    image.alt = subtopic.imageAlt;
    image.loading = "lazy";
    button.append(image);
    button.addEventListener("click", function () { openFoundationViewer(subtopic, button); });
    figure.append(button);
    return figure;
  }

  function openFoundationViewer(subtopic, trigger) {
    let viewer = document.getElementById("foundation-image-viewer");
    if (!viewer) {
      viewer = element("dialog", "foundation-image-viewer");
      viewer.id = "foundation-image-viewer";
      viewer.setAttribute("aria-label", "Enlarged image");
      const close = element("button", "foundation-image-viewer__close", "×");
      close.type = "button";
      close.setAttribute("aria-label", "Close enlarged image");
      close.addEventListener("click", function () { viewer.close(); });
      viewer.append(close);
      viewer.addEventListener("click", function (event) {
        if (event.target === viewer) viewer.close();
      });
      viewer.addEventListener("close", function () {
        document.documentElement.style.overflow = viewer.previousOverflow;
        if (viewer.returnFocusTarget && viewer.returnFocusTarget.isConnected) viewer.returnFocusTarget.focus();
      });
      document.body.append(viewer);
    }

    let image = viewer.querySelector(".foundation-image-viewer__image");
    if (!image) {
      image = element("img", "foundation-image-viewer__image");
      viewer.append(image);
    }
    image.src = subtopic.image;
    image.alt = subtopic.imageAlt;
    image.className = "foundation-image-viewer__image";

    let caption = viewer.querySelector(".foundation-image-viewer__caption");
    if (!caption) {
      caption = element("p", "foundation-image-viewer__caption");
      viewer.append(caption);
    }
    caption.textContent = subtopic.id === "process-product" ? "Product" : (subtopic.caption || subtopic.title);
    viewer.returnFocusTarget = trigger;
    viewer.previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    viewer.showModal();
    viewer.querySelector(".foundation-image-viewer__close").focus();
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
