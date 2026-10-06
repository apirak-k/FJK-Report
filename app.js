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
      if (topic.repository && topic.id !== "jig-stock") {
        const headerContent = document.querySelector("#topic-" + topic.id + " .topic-section__header > div");
        const repository = element("a", "topic-repository-link", "View Repository ↗");
        repository.href = topic.repository;
        repository.target = "_blank";
        repository.rel = "noopener noreferrer";
        headerContent.append(repository);
      }
      if (topic.id === "cost-breakdown") {
        const headerContent = document.querySelector("#topic-" + topic.id + " .topic-section__header > div");
        headerContent.append(renderDemoLauncher(topic.id));
      }
      if (topic.id === "jig-stock") {
        renderJigStock(topic, container);
        return;
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

  function renderDemoLauncher(topicId) {
    const storageKey = topicId === "jig-stock" ? "fjk-demo-jigstock" : "fjk-demo-costbreakdown";
    const launcher = element("div", "topic-demo-launcher");
    const inputId = "demo-url-" + topicId;
    const errorId = inputId + "-error";
    const label = element("label", "topic-demo-label", "Demo URL");
    label.htmlFor = inputId;

    const controls = element("div", "topic-demo-controls");
    const input = element("input", "topic-demo-input");
    input.type = "url";
    input.id = inputId;
    input.placeholder = "Paste local demo URL...";
    input.autocomplete = "url";
    input.setAttribute("aria-describedby", errorId);
    const button = element("button", "topic-demo-button", "Open Demo ↗");
    button.type = "button";
    button.disabled = true;
    const error = element("p", "topic-demo-error");
    error.id = errorId;
    error.setAttribute("role", "status");
    error.setAttribute("aria-live", "polite");
    error.hidden = true;

    try {
      input.value = window.localStorage.getItem(storageKey) || "";
    } catch (errorReadingStorage) {
      // Keep the launcher usable when browser storage is unavailable.
    }
    button.disabled = input.value.trim() === "";

    input.addEventListener("input", function () {
      const value = input.value;
      button.disabled = value.trim() === "";
      error.textContent = "";
      error.hidden = true;
      input.removeAttribute("aria-invalid");
      try {
        window.localStorage.setItem(storageKey, value);
      } catch (errorWritingStorage) {
        // The current input remains usable for this page view.
      }
    });
    button.addEventListener("click", function () {
      const value = input.value.trim();
      let url;
      try {
        url = new URL(value);
      } catch (invalidUrl) {
        url = null;
      }
      if (!url || (url.protocol !== "http:" && url.protocol !== "https:") || !url.hostname) {
        error.textContent = "Enter a valid http:// or https:// URL.";
        error.hidden = false;
        input.setAttribute("aria-invalid", "true");
        return;
      }
      error.textContent = "";
      error.hidden = true;
      input.removeAttribute("aria-invalid");
      window.open(url.href, "_blank", "noopener,noreferrer");
    });

    controls.append(input, button);
    launcher.append(label, controls, error);
    return launcher;
  }

  function renderJigStock(topic, container) {
    const purpose = element("section", "jig-stock-purpose");
    purpose.append(element("h4", "jig-stock-section-title", "Purpose"), element("p", "jig-stock-purpose-text", topic.purpose));

    const top = element("div", "jig-stock-top");
    const overview = element("section", "jig-stock-overview");
    overview.append(element("h4", "jig-stock-section-title", "System Overview"));
    const flow = element("ol", "jig-stock-overview-flow");
    flow.setAttribute("aria-label", "JIGSTOCK material request flow");
    topic.overviewSteps.forEach(function (step) { flow.append(element("li", "jig-stock-overview-step", step)); });
    overview.append(flow, element("p", "jig-stock-supporting-areas", topic.supportingAreas));

    const platform = element("section", "jig-stock-platform");
    platform.append(element("h4", "jig-stock-section-title", "Platform / UI"));
    const screenshot = renderFoundationImage({
      id: "jigstock-dashboard",
      title: "JIGSTOCK Dashboard",
      image: topic.screenshot,
      imageAlt: topic.screenshotAlt
    });
    screenshot.classList.add("jig-stock-screenshot");
    platform.append(screenshot, element("p", "jig-stock-screenshot-description", topic.screenshotDescription));
    const repository = element("a", "topic-repository-link", "View Repository ↗");
    repository.href = topic.repository;
    repository.target = "_blank";
    repository.rel = "noopener noreferrer";
    platform.append(repository, renderDemoLauncher(topic.id));
    top.append(overview, platform);

    const logic = element("section", "jig-stock-logic");
    logic.append(element("h4", "jig-stock-section-title", "How JIGSTOCK Works"));
    const logicFlow = element("div", "jig-stock-logic-flow");
    const action = element("div", "jig-stock-logic-step", topic.issueLogic.action);
    const checks = element("div", "jig-stock-logic-step", topic.issueLogic.checks);
    const outcomes = element("div", "jig-stock-logic-outcomes");
    outcomes.append(
      element("p", "jig-stock-logic-blocked", topic.issueLogic.blocked),
      element("p", "jig-stock-logic-passed", topic.issueLogic.passed)
    );
    const persistence = element("div", "jig-stock-logic-step jig-stock-logic-step--save", topic.issueLogic.persistence);
    logicFlow.append(action, checks, outcomes, persistence);
    logic.append(logicFlow, element("p", "jig-stock-issue-note", topic.issueNote));

    const result = element("section", "jig-stock-result");
    result.append(element("h4", "jig-stock-section-title", "Result"));
    const resultList = element("ul", "jig-stock-result-list");
    topic.results.forEach(function (item) { resultList.append(element("li", "jig-stock-result-item", item)); });
    result.append(resultList);
    container.append(purpose, top, logic, result);
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
    const progression = element("div", "ai-swe-progression");

    const prompting = topic.subtopics.find(function (subtopic) { return subtopic.id === "prompting-ai-usage"; });
    const promptingSection = renderAiSweSubtopic(prompting, "ai-swe-prompting");
    promptingSection.append(element("p", "ai-swe-description", prompting.description));
    progression.append(promptingSection);

    const git = topic.subtopics.find(function (subtopic) { return subtopic.id === "git-version-control"; });
    const gitSection = renderAiSweSubtopic(git, "ai-swe-git");
    const gitImages = element("div", "ai-swe-git-images");
    git.images.forEach(function (image) { gitImages.append(renderAiSweImage(image, "ai-swe-git-image")); });
    gitSection.append(gitImages, element("p", "ai-swe-description", git.description));
    progression.append(gitSection);

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
    progression.append(toolsSection);

    const workflow = topic.subtopics.find(function (subtopic) { return subtopic.id === "ai-workflow-framework"; });
    const workflowSection = renderAiSweSubtopic(workflow, "ai-swe-workflow");
    workflowSection.append(element("p", "ai-swe-description", workflow.description), renderAiSweFlow(workflow.steps));
    progression.append(workflowSection);
    container.append(progression);

    const haws = topic.subtopics.find(function (subtopic) { return subtopic.id === "haws"; });
    container.append(renderHaws(haws));
  }

  function renderHaws(haws) {
    const section = renderAiSweSubtopic(haws, "ai-swe-haws");

    const intro = element("div", "haws-intro-grid");
    const overview = element("div", "haws-overview");
    const purpose = element("section", "haws-purpose");
    purpose.append(element("h5", "haws-panel-title", "Purpose"), element("p", "haws-purpose-copy", haws.purpose));

    const context = element("div", "haws-context-grid");
    const problem = element("section", "haws-context-block");
    problem.append(element("h5", "haws-panel-title", "Problem"));
    const problemList = element("ul", "haws-problem-list");
    haws.problem.forEach(function (item) { problemList.append(element("li", "", item)); });
    problem.append(problemList);
    const useCase = element("section", "haws-context-block");
    useCase.append(element("h5", "haws-panel-title", "Use Case"), element("p", "haws-context-copy", haws.useCase));
    context.append(problem, useCase);
    overview.append(purpose, context);
    intro.append(overview, renderAiSweImage(haws.image, "ai-swe-haws-image"));
    section.append(intro);

    const architecture = element("section", "haws-block");
    architecture.append(element("h5", "haws-section-title", "How HAWS Works"));
    const architectureFlow = element("div", "haws-architecture-flow");
    architectureFlow.setAttribute("role", "group");
    architectureFlow.setAttribute("aria-label", "HAWS configures AI environments before people use them directly");
    architectureFlow.append(element("div", "haws-architecture-node haws-architecture-node--source", haws.architecture.source));
    architectureFlow.append(element("span", "haws-architecture-arrow", "→"));
    architectureFlow.append(element("div", "haws-architecture-node", haws.architecture.action));
    architectureFlow.append(element("span", "haws-architecture-arrow", "→"));
    const environments = element("div", "haws-environments");
    haws.architecture.environments.forEach(function (environment) {
      environments.append(element("div", "haws-architecture-node haws-architecture-node--environment", environment));
    });
    architectureFlow.append(environments);
    architecture.append(architectureFlow, element("p", "haws-architecture-note", haws.architecture.note));
    section.append(architecture);

    const capabilities = element("section", "haws-block");
    capabilities.append(element("h5", "haws-section-title", "What HAWS Provides"));
    const capabilityGrid = element("div", "haws-capabilities");
    haws.capabilities.forEach(function (capability) {
      const item = element("article", "haws-capability");
      item.append(element("h6", "haws-capability-title", capability.title), element("p", "haws-capability-copy", capability.description));
      capabilityGrid.append(item);
    });
    const management = element("p", "haws-management");
    management.append(element("span", "haws-management-label", "Management"), document.createTextNode(" · " + haws.management.join(" · ")));
    capabilities.append(capabilityGrid, management);
    section.append(capabilities);

    const logic = element("section", "haws-block haws-working-logic");
    logic.append(element("h5", "haws-section-title", "Working Logic"));
    logic.append(renderHawsStepFlow(haws.taskSteps, "Task flow"));
    logic.append(renderHawsDecision(haws.capabilityDecision, "capability"));
    logic.append(element("p", "haws-flow-continues", "Both paths continue to Execute ↓"));
    logic.append(renderHawsStepFlow(haws.verificationSteps, "Verification flow"));
    logic.append(renderHawsDecision(haws.verificationDecision, "verification"));
    section.append(logic);

    const setup = element("section", "haws-block haws-setup");
    setup.append(element("h5", "haws-section-title", "Setup / System Logic"), renderHawsStepFlow(haws.setupSteps, "HAWS setup flow"));
    section.append(setup);

    const result = element("section", "haws-block haws-result");
    result.append(element("h5", "haws-section-title", "Result"));
    const resultGrid = element("div", "haws-results-grid");
    haws.results.forEach(function (item) {
      const card = element("article", "haws-result-item");
      card.append(element("h6", "haws-result-title", item.title), element("p", "haws-result-copy", item.description));
      resultGrid.append(card);
    });
    result.append(resultGrid, element("p", "haws-outcome", haws.outcome));
    const repoLink = element("a", "foundation-external-link haws-repository-link", "View HAWS Repository ↗");
    repoLink.href = haws.repository;
    repoLink.target = "_blank";
    repoLink.rel = "noopener noreferrer";
    result.append(repoLink);
    section.append(result);
    return section;
  }

  function renderHawsStepFlow(steps, label) {
    const flow = element("ol", "haws-step-flow");
    if (label === "Task flow") flow.classList.add("haws-task-flow");
    if (label === "Verification flow") flow.classList.add("haws-verification-flow");
    flow.setAttribute("aria-label", label);
    steps.forEach(function (step) { flow.append(element("li", "haws-step", step)); });
    return flow;
  }

  function renderHawsDecision(decision, name) {
    const block = element("section", "haws-decision haws-decision--" + name);
    const title = element("h6", "haws-decision-question", decision.question);
    const branches = element("div", "haws-decision-branches");
    [["Yes", decision.yes], ["No", decision.no]].forEach(function (branch) {
      const item = element("div", "haws-decision-branch");
      item.append(element("strong", "haws-branch-label", branch[0]), element("span", "haws-branch-copy", branch[1]));
      branches.append(item);
    });
    block.append(title, branches, element("p", "haws-decision-note", name === "capability" ? decision.continuation : "↶ " + decision.retry));
    return block;
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
    const activities = topic.subtopics.slice().sort(function (a, b) {
      return Number(b.id === "cutting-drilling-grinding") - Number(a.id === "cutting-drilling-grinding");
    });
    activities.forEach(function (subtopic) {
      const section = element("article", "subtopic-section workshop-item workshop-item--" + subtopic.id);
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
