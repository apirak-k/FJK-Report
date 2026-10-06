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
      id: "foundation", title: "Foundation", intro: "Started the internship by learning about Fujikura, MBSW, workplace practices, and the factory environment.", activeWeeks: [1], subtopics: [
        { id: "company-department-orientation", title: "Company & Department Orientation", weeks: [1], description: "Learned about Fujikura, the Lamphun factory, and the Membrane Switch (MBSW) division.", image: "assets/foundation/fujikura-factory.jpg", imageAlt: "Fujikura Lamphun factory", link: { label: "Learn more about Lamphun Factory & Membrane Switch ↗", url: "https://www.fujikura.co.th/product-7.php?i=3" } },
        { id: "process-ecp", title: "Process ECP", weeks: [1], description: "Learned the ECP process and department responsibilities." },
        { id: "rules-safety-policies", title: "Rules, Safety & Policies", weeks: [1], description: "Learned workplace rules, safety practices, company policies, and responsible business principles.", image: "assets/foundation/rba-guideline.jpg", imageAlt: "RBA guideline document", caption: "RBA guideline used during orientation." },
        { id: "factory-layout", title: "Factory Layout", weeks: [1], description: "Learned the factory location, layout, and key working areas.", image: "assets/foundation/factory-map.jpg", imageAlt: "Lamphun Factory 1 location map", caption: "Lamphun Factory 1 location map." }
      ]
    },
    {
      id: "manufacturing", title: "Manufacturing", intro: "Learned how products move from process and production to engineering documentation, measurement, and automation.", activeWeeks: [1, 2, 15], subtopics: [
        { id: "process-product", title: "Process & Product", weeks: [1], description: "Learned the manufacturing process and product structure.", image: "assets/manufacturing/manufacturing-process-product.jpg", imageAlt: "Membrane switch product sample" },
        { id: "production-line", title: "Production Line", weeks: [1], description: "Learned the production flow and work sequence on the production line.", image: "assets/manufacturing/manufacturing-production-line.jpg", imageAlt: "Manufacturing production line" },
        { id: "artwork-drawings", title: "Artwork & Drawings", weeks: [1, 2], description: "Reviewed artwork and engineering drawings used in the manufacturing process.", image: "assets/manufacturing/manufacturing-artwork-drawing.jpg", imageAlt: "Manufacturing artwork displayed on a screen" },
        { id: "gstar-cad-measurement", title: "GStar-CAD Measurement", weeks: [1, 2], description: "Used GStar-CAD to measure artwork and compare it with engineering drawings.", image: "assets/manufacturing/manufacturing-gstar-cad.jpg", imageAlt: "GStar-CAD measurement spreadsheet and drawing comparison" },
        { id: "automation-system", title: "Automation System", weeks: [15], description: "Learned how automation systems are applied in the manufacturing process.", image: "assets/manufacturing/manufacturing-automation.jpg", imageAlt: "Automation equipment in a manufacturing area" }
      ]
    },
    {
      // MSA work took place in the Production Line context; MVP is not an MSA Subtopic.
      // TODO: MSA W1 is active in the master schedule but has no confirmed Subtopic mapping.
      id: "msa", title: "MSA", intro: "Applied Measurement System Analysis to evaluate measurement reliability in the production line.", activeWeeks: [1, 2, 4, 11, 13, 14], subtopics: [
        { id: "calibration", title: "Calibration", weeks: [2], description: "Used a calibrated multimeter to measure the reference value for MSA.", image: "assets/msa/Calibration.jpg", imageAlt: "Calibrated multimeter used to measure the reference value" },
        { id: "grr", title: "GR&R", weeks: [2, 4, 11, 13, 14], description: "Performed GR&R to evaluate repeatability and reproducibility.", image: "assets/msa/GR&R.jpg", imageAlt: "GR&R measurement analysis results" },
        { id: "linearity", title: "Linearity", weeks: [2, 4, 11, 13, 14], description: "Performed Linearity analysis as part of MSA.", image: "assets/msa/Linearity.jpg", imageAlt: "Linearity measurement analysis results" },
        { id: "bias", title: "Bias", weeks: [2, 4, 11, 13, 14], description: "Performed Bias analysis as part of MSA.", image: "assets/msa/Bias.jpg", imageAlt: "Bias measurement analysis results" },
        { id: "correlation", title: "Correlation", weeks: [2, 4, 11, 13, 14], description: "Performed Correlation analysis as part of MSA.", image: "assets/msa/Correlation.jpg", imageAlt: "Correlation measurement analysis results" }
      ]
    },
    {
      // TODO: DOE W1, W7, and W8 remain Topic-active without a confirmed Subtopic mapping.
      id: "doe", title: "DOE", intro: "Performed experimental evaluation work using sample preparation, testing, defect classification, and result analysis.", activeWeeks: [1, 5, 7, 8, 9, 10, 11, 12, 15, 16], subtopics: [
        {
          id: "kansai-felt-tape-evaluation", title: "Kansai Felt Tape Evaluation", weeks: [9, 10, 11], description: "Evaluated Kansai Felt tape performance and classified observed defects.", details: ["Defect Classification", "Customer Presentation"], images: [
            { id: "doe-kansai-defect", title: "Kansai Felt tape defect", image: "assets/doe/doe-kansai-defect.jpg", imageAlt: "Observed defect on Kansai Felt tape" },
            { id: "doe-kansai-summary", title: "Kansai evaluation summary", image: "assets/doe/doe-kansai-summary.png", imageAlt: "Kansai Felt tape evaluation summary and results" },
            { id: "doe-kansai-supporting-result", title: "Kansai supporting result", image: "assets/doe/doe-kansai-supporting-result.png", imageAlt: "Supporting results for the Kansai Felt tape evaluation" }
          ]
        },
        {
          id: "sample-preparation-peel-test", title: "Sample Preparation & Peel Test", weeks: [5, 11, 12, 15, 16], description: "Prepared samples, performed peel testing, and evaluated the test results.", details: ["Meeting with Japanese Engineers"], images: [
            { id: "doe-peel-sample-preparation", title: "Sample preparation", image: "assets/doe/doe-peel-sample-preparation.jpg", imageAlt: "Prepared samples for peel testing" },
            { id: "doe-peel-test", title: "Peel test", image: "assets/doe/doe-peel-test.jpg", imageAlt: "Peel testing activity" },
            { id: "doe-peel-tested-samples", title: "Tested samples", image: "assets/doe/doe-peel-tested-samples.jpg", imageAlt: "Samples after peel testing" },
            { id: "doe-peel-material-example", title: "Nitto Peel Test result", image: "assets/doe/nitto.png", imageAlt: "Nitto material Peel Test graph results" }
          ]
        }
      ]
    },
    // TODO: Subtopics are not confirmed; active weeks keep Topic-level Gantt markers.
    { id: "jig-stock", title: "JIG STOCK", repository: "https://github.com/apirak-k/JIGSTOCK", activeWeeks: [2, 3, 4, 5, 6, 7], showActiveWeeks: true, subtopics: [] },
    // TODO: Subtopics are not confirmed; active weeks keep Topic-level Gantt markers.
    { id: "cost-breakdown", title: "Cost Breakdown", repository: "https://github.com/apirak-k/COSTBREAKDOWN/tree/main", activeWeeks: [2, 3, 4, 5, 6, 8, 9, 10, 13, 14, 15, 16], showActiveWeeks: true, subtopics: [] },
    {
      id: "ai-swe-fundamentals", title: "AI & SWE Fundamentals", expansion: "Artificial Intelligence & Software Engineering", intro: "Learned practical AI and software engineering fundamentals and applied them to internship work.", activeWeeks: [2, 4, 8, 9, 10, 11, 13], subtopics: [
        { id: "prompting-ai-usage", title: "Prompting & AI Usage", weeks: [2], description: "Learned how to structure prompts and use Artificial Intelligence (AI) to support work tasks." },
        { id: "git-version-control", title: "Git & Version Control", weeks: [4], description: "Learned Git and GitHub for version control and repository management.", images: [
          { id: "ai-swe-gitgraph", title: "Git Graph", image: "assets/ai-swe/ai-swe-gitgraph.png.png", imageAlt: "Git branches, commits, and development history" },
          { id: "ai-swe-github", title: "GitHub repository", image: "assets/ai-swe/ai-swe-github.png.png", imageAlt: "GitHub repository hosting and management" }
        ] },
        { id: "ai-tools", title: "AI Tools & Integration", weeks: [8, 10], description: "Explored AI tools and integration concepts used in AI-assisted work.", concepts: [
          { term: "AI Skills", meaning: "Artificial Intelligence Skills" },
          { term: "RAG", meaning: "Retrieval-Augmented Generation" },
          { term: "MCP", meaning: "Model Context Protocol" },
          { term: "API", meaning: "Application Programming Interface" }
        ] },
        { id: "ai-workflow-framework", title: "AI Workflow & Framework", weeks: [9], description: "Learned how to organize AI-assisted work into a structured workflow.", steps: ["Task", "AI Assistance", "Review", "Improve"] },
        { id: "haws", title: "HAWS — Human-AI Working Standard", weeks: [11, 13], description: "Worked on HAWS, a working standard for structured human–AI collaboration.", image: { id: "ai-swe-haws-ui", title: "HAWS terminal interface", image: "assets/ai-swe/ai-swe-haws-ui.png", imageAlt: "HAWS terminal and text user interface" }, steps: ["Human Goal", "Rules & Context", "AI Work", "Verify", "Improve"], repository: "https://github.com/apirak-k/Human-AI-Working-Standard" }
      ]
    },
    {
      id: "machine-setup", title: "Machine Setup", intro: "Learned how to set up, configure, test, and understand equipment used in manufacturing and automation.", activeWeeks: [10, 11, 12, 13, 15], subtopics: [
        { id: "dobot-setup", title: "Dobot Setup", weeks: [10, 15], description: "Set up and tested Dobot equipment for automation-related work.", image: { id: "machine-dobot-setup", title: "Dobot setup", image: "assets/machine-setup/machine-dobot-setup.jpg", imageAlt: "Dobot equipment setup and test" } },
        { id: "ai-inspection-camera", title: "AI Inspection Camera", weeks: [10, 11, 12, 13], description: "Set up an inspection camera and trained an Artificial Intelligence (AI) model for defect detection.", details: ["Camera Setup", "AI Training for Defect Detection", "MV Viewer"], images: [
          { id: "machine-ai-camera", title: "AI inspection camera", image: "assets/machine-setup/machine-ai-camera.jpg", imageAlt: "AI inspection camera system" },
          { id: "machine-mv-viewer", title: "MV Viewer", image: "assets/machine-setup/machine-mv-viewer.png", imageAlt: "MV Viewer interface showing camera inspection results" }
        ] },
        { id: "mvp-setup", title: "MVP Setup", weeks: [], description: "Learned and performed setup procedures for MVP measurement equipment.", image: { id: "machine-mvp-setup", title: "MVP setup", image: "assets/machine-setup/machine-mvp-setup.jpg", imageAlt: "MVP measurement equipment setup" } },
        { id: "qr-code-setup-classification", title: "QR Code Classification", weeks: [10, 13], description: "Configured and tested a KEYENCE SR-X code reader for QR code reading and classification, including capability evaluation using Cp and Cpk.", referenceUrl: "https://www.keyence.co.th/products/barcode/barcode-readers/sr-x/", result: { id: "machine-srx-cpk-result", title: "Cp / Cpk capability test result", image: "assets/machine-setup/machine-srx-cpk-result.png", imageAlt: "Cp and Cpk process capability test result charts" } },
        { id: "automation-system-study", title: "Automation System Study", weeks: [15], description: "Studied how automation equipment and systems are connected and used in the manufacturing process.", image: { id: "machine-automation-system", title: "Automation system", image: "assets/machine-setup/machine-automation-system.jpg", imageAlt: "Automation system in a manufacturing line" } }
      ]
    },
    {
      id: "workshop", title: "Workshop", intro: "Developed practical workshop skills through hands-on tasks and workplace improvement activities.", activeWeeks: [10, 11, 14], subtopics: [
        { id: "soldering", title: "Soldering", weeks: [10, 11], description: "Practiced soldering techniques for workshop and equipment-related tasks.", image: "assets/workshop/workshop-soldering.jpg", imageAlt: "Soldered circuit board held by hand" },
        { id: "cutting-drilling-grinding", title: "Cutting, Drilling & Grinding", weeks: [11, 14], description: "Practiced basic workshop operations including cutting, drilling, and grinding.", image: "assets/workshop/workshop-cutting-drilling-grinding.jpg", imageAlt: "Workshop workbench and practical work area" },
        { id: "lan-cable-making", title: "LAN Cable Making", weeks: [10], description: "Made and tested LAN cables for equipment and network connections.", image: "assets/workshop/workshop-lan-cable.jpg", imageAlt: "LAN cable and crimping tool" },
        { id: "storage-room-layout", title: "Storage Room Layout", weeks: [10], description: "Planned and reviewed the storage room layout for better organization and use of space.", image: "assets/workshop/workshop-storage-layout.jpg", imageAlt: "Storage room and equipment layout" }
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
