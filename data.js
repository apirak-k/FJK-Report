/* Replace these neutral placeholders with confirmed internship information. */
window.presentationData = {
  weeks: Array.from({ length: 17 }, function (_, index) { return index + 1; }),
  overview: {
    summary: "",
    facts: [
      { label: "Student", value: "Apirak Kamol" },
      { label: "University", value: "Chiang Mai University" },
      { label: "Advisor", value: "Yutthakan Pengyuak" },
      { label: "Company", value: "Fujikura Electronics Components (Thailand) Ltd." },
      { label: "Department", value: "MBSW" },
      { label: "Internship period", value: "22 Jun – 16 Oct 2026" }
    ]
  },
  topics: [
    {
      id: "foundation", title: "Foundation", activeWeeks: [1], subtopics: [
        { id: "company-department-orientation", title: "Company & Department Orientation", weeks: [1] },
        { id: "process-ecp", title: "Process ECP", weeks: [1] },
        { id: "rules-safety-policies", title: "Rules, Safety & Policies", weeks: [1] },
        { id: "factory-layout", title: "Factory Layout", weeks: [1] }
      ]
    },
    {
      id: "manufacturing", title: "Manufacturing", activeWeeks: [1, 2, 15], subtopics: [
        { id: "process-product", title: "Process & Product", weeks: [1] },
        { id: "production-line", title: "Production Line", weeks: [1] },
        { id: "artwork-drawings", title: "Artwork & Drawings", weeks: [1, 2] },
        { id: "gstar-cad-measurement", title: "GStar-CAD Measurement", weeks: [1, 2] },
        { id: "automation-system", title: "Automation System", weeks: [15] }
      ]
    },
    {
      // MSA work took place in the Production Line context; MVP is not an MSA Subtopic.
      // TODO: MSA W1 is active in the master schedule but has no confirmed Subtopic mapping.
      id: "msa", title: "MSA", activeWeeks: [1, 2, 4, 11, 13, 14], subtopics: [
        { id: "calibration", title: "Calibration", weeks: [2] },
        { id: "grr", title: "GR&R", weeks: [2, 4, 11, 13, 14] },
        { id: "linearity", title: "Linearity", weeks: [2] },
        { id: "bias", title: "Bias", weeks: [2] },
        { id: "correlation", title: "Correlation", weeks: [2] }
      ]
    },
    {
      // TODO: DOE W1, W7, and W8 remain Topic-active without a confirmed Subtopic mapping.
      id: "doe", title: "DOE", activeWeeks: [1, 5, 7, 8, 9, 10, 11, 12, 15, 16], subtopics: [
        { id: "kansai-felt-tape-evaluation", title: "Kansai Felt Tape Evaluation", weeks: [9, 10, 11], details: ["Defect Classification", "Customer Presentation"] },
        { id: "sample-preparation-peel-test", title: "Sample Preparation & Peel Test", weeks: [5, 11, 12, 15, 16], details: ["Meeting with Japanese Engineers"] }
      ]
    },
    // TODO: Subtopics are not confirmed; active weeks keep Topic-level Gantt markers.
    { id: "jig-stock", title: "JIG STOCK", activeWeeks: [2, 3, 4, 5, 6, 7], showActiveWeeks: true, subtopics: [] },
    // TODO: Subtopics are not confirmed; active weeks keep Topic-level Gantt markers.
    { id: "cost-breakdown", title: "Cost Breakdown", activeWeeks: [2, 3, 4, 5, 6, 8, 9, 10, 13, 14, 15, 16], showActiveWeeks: true, subtopics: [] },
    {
      id: "ai-swe-fundamentals", title: "AI & SWE Fundamentals", activeWeeks: [2, 4, 8, 9, 10, 11, 13], subtopics: [
        { id: "prompting-ai-usage", title: "Prompting & AI Usage", weeks: [2] },
        { id: "git-version-control", title: "Git & Version Control", weeks: [4] },
        { id: "ai-tools", title: "AI Tools", weeks: [8, 10] },
        { id: "ai-workflow-framework", title: "AI Workflow & Framework", weeks: [9] },
        { id: "haws", title: "HAWS", weeks: [11, 13] }
      ]
    },
    {
      id: "machine-setup", title: "Machine Setup", activeWeeks: [10, 11, 12, 13, 15], subtopics: [
        { id: "dobot-setup", title: "Dobot Setup", weeks: [10, 15] },
        { id: "ai-inspection-camera", title: "AI Inspection Camera", weeks: [10, 11, 12, 13], details: ["AI Training for Defect Detection", "MV Viewer"] },
        // TODO: Add a Week label when confirmed.
        { id: "mvp-setup", title: "MVP Setup", weeks: [] },
        { id: "qr-code-setup-classification", title: "QR Code Setup & Classification", weeks: [10, 13] },
        { id: "automation-system-study", title: "Automation System Study", weeks: [15] }
      ]
    },
    {
      id: "workshop", title: "Workshop", activeWeeks: [10, 11, 14], subtopics: [
        { id: "soldering", title: "Soldering", weeks: [10, 11] },
        { id: "cutting-drilling-grinding", title: "Cutting, Drilling & Grinding", weeks: [11, 14] },
        { id: "lan-cable-making", title: "LAN Cable Making", weeks: [10] },
        { id: "storage-room-layout", title: "Storage Room Layout", weeks: [10] }
      ]
    }
  ],
  swot: [
    { id: "strengths", title: "Strengths", points: ["Self-learning", "Observant and problem-focused", "Choosing practical solutions"] },
    { id: "weaknesses", title: "Weaknesses", points: ["Communication", "Decision-making without clear direction", "Limited experience", "Time management"] },
    { id: "opportunities", title: "Opportunities", points: ["Using AI at work", "Entrepreneurial mindset", "Learning structured management systems", "Knowledge beyond the classroom", "Real work experience"] },
    { id: "challenges", title: "Threats / Challenges", points: ["Limited time", "Unavailable equipment", "Internet issues", "Trial and error", "Travel distance", "AI context management"] }
  ]
};
