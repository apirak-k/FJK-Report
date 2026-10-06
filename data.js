/* Edit this file to replace the neutral placeholders with confirmed information. */
window.presentationData = {
  weeks: Array.from({ length: 17 }, function (_, index) { return index + 1; }),
  overview: {
    summary: "[Add a short overview of the internship and its purpose.]",
    facts: [
      { label: "Student", value: "[Student name]" },
      { label: "University", value: "[University name]" },
      { label: "Advisor", value: "[University advisor]" },
      { label: "Company", value: "[Company name]" },
      { label: "Department", value: "[Department]" },
      { label: "Internship period", value: "[Start date – end date]" }
    ]
  },
  topics: [
    {
      id: "foundation",
      title: "Foundation",
      color: "#bdcf75",
      overview: "[Add a brief overview of this topic.]",
      activities: "[Add relevant activities or subtopics.]",
      visuals: "[Add screenshots, photographs, or diagrams.]",
      evidence: "[Add evidence, outcomes, or results.]",
      links: "[Optional: add verified reference or demo links.]"
    },
    {
      id: "manufacturing",
      title: "Manufacturing",
      color: "#5fb7ad",
      overview: "[Add a brief overview of this topic.]",
      activities: "[Add relevant activities or subtopics.]",
      visuals: "[Add screenshots, photographs, or diagrams.]",
      evidence: "[Add evidence, outcomes, or results.]",
      links: "[Optional: add verified reference or demo links.]"
    },
    {
      id: "msa",
      title: "MSA",
      color: "#d7a65f",
      overview: "[Add a brief overview of this topic.]",
      activities: "[Add relevant activities or subtopics.]",
      visuals: "[Add screenshots, photographs, or diagrams.]",
      evidence: "[Add evidence, outcomes, or results.]",
      links: "[Optional: add verified reference or demo links.]"
    },
    {
      id: "doe",
      title: "DOE",
      color: "#d77758",
      overview: "[Add a brief overview of this topic.]",
      activities: "[Add relevant activities or subtopics.]",
      visuals: "[Add screenshots, photographs, or diagrams.]",
      evidence: "[Add evidence, outcomes, or results.]",
      links: "[Optional: add verified reference or demo links.]"
    },
    {
      id: "jig-stock",
      title: "JIG STOCK",
      color: "#a18acb",
      overview: "[Add a brief overview of this topic.]",
      activities: "[Add relevant activities or subtopics.]",
      visuals: "[Add screenshots, photographs, or diagrams.]",
      evidence: "[Add evidence, outcomes, or results.]",
      links: "[Optional: add verified reference or demo links.]"
    },
    {
      id: "cost-breakdown",
      title: "Cost Breakdown",
      color: "#6698c3",
      overview: "[Add a brief overview of this topic.]",
      activities: "[Add relevant activities or subtopics.]",
      visuals: "[Add screenshots, photographs, or diagrams.]",
      evidence: "[Add evidence, outcomes, or results.]",
      links: "[Optional: add verified reference or demo links.]"
    },
    {
      id: "ai-swe-fundamentals",
      title: "AI & SWE Fundamentals",
      color: "#899d5c",
      overview: "[Add a brief overview of this topic.]",
      activities: "[Add relevant activities or subtopics.]",
      visuals: "[Add screenshots, photographs, or diagrams.]",
      evidence: "[Add evidence, outcomes, or results.]",
      links: "[Optional: add verified reference or demo links.]"
    },
    {
      id: "machine-setup",
      title: "Machine Setup",
      color: "#cf809a",
      overview: "[Add a brief overview of this topic.]",
      activities: "[Add relevant activities or subtopics.]",
      visuals: "[Add screenshots, photographs, or diagrams.]",
      evidence: "[Add evidence, outcomes, or results.]",
      links: "[Optional: add verified reference or demo links.]"
    },
    {
      id: "workshop",
      title: "Workshop",
      color: "#839ba2",
      overview: "[Add a brief overview of this topic.]",
      activities: "[Add relevant activities or subtopics.]",
      visuals: "[Add screenshots, photographs, or diagrams.]",
      evidence: "[Add evidence, outcomes, or results.]",
      links: "[Optional: add verified reference or demo links.]"
    }
  ],
  timeline: {
    notice: "Layout preview only. The markers below demonstrate the chart interactions and do not describe real internship weeks or activities.",
    activities: [
      { id: "foundation-w1", topicId: "foundation", week: 1 },
      { id: "foundation-w2", topicId: "foundation", week: 2 },
      { id: "foundation-w3", topicId: "foundation", week: 3 },
      { id: "manufacturing-w3", topicId: "manufacturing", week: 3 },
      { id: "manufacturing-w4", topicId: "manufacturing", week: 4 },
      { id: "manufacturing-w5", topicId: "manufacturing", week: 5 },
      { id: "manufacturing-w7", topicId: "manufacturing", week: 7 },
      { id: "msa-w5", topicId: "msa", week: 5 },
      { id: "msa-w6", topicId: "msa", week: 6 },
      { id: "msa-w8", topicId: "msa", week: 8 },
      { id: "doe-w7", topicId: "doe", week: 7 },
      { id: "doe-w8", topicId: "doe", week: 8 },
      { id: "doe-w9", topicId: "doe", week: 9 },
      { id: "doe-w10", topicId: "doe", week: 10 },
      { id: "jig-stock-w9", topicId: "jig-stock", week: 9 },
      { id: "jig-stock-w10", topicId: "jig-stock", week: 10 },
      { id: "jig-stock-w12", topicId: "jig-stock", week: 12 },
      { id: "jig-stock-w13", topicId: "jig-stock", week: 13 },
      { id: "cost-breakdown-w11", topicId: "cost-breakdown", week: 11 },
      { id: "cost-breakdown-w12", topicId: "cost-breakdown", week: 12 },
      { id: "cost-breakdown-w14", topicId: "cost-breakdown", week: 14 },
      { id: "ai-swe-fundamentals-w1", topicId: "ai-swe-fundamentals", week: 1 },
      { id: "ai-swe-fundamentals-w13", topicId: "ai-swe-fundamentals", week: 13 },
      { id: "ai-swe-fundamentals-w14", topicId: "ai-swe-fundamentals", week: 14 },
      { id: "ai-swe-fundamentals-w15", topicId: "ai-swe-fundamentals", week: 15 },
      { id: "machine-setup-w2", topicId: "machine-setup", week: 2 },
      { id: "machine-setup-w15", topicId: "machine-setup", week: 15 },
      { id: "machine-setup-w16", topicId: "machine-setup", week: 16 },
      { id: "workshop-w4", topicId: "workshop", week: 4 },
      { id: "workshop-w16", topicId: "workshop", week: 16 },
      { id: "workshop-w17", topicId: "workshop", week: 17 }
    ]
  },
  swot: [
    { id: "strengths", title: "Strengths", prompt: "[Add my personal strengths demonstrated during the internship.]", index: "01" },
    { id: "weaknesses", title: "Weaknesses", prompt: "[Add areas I want to improve.]", index: "02" },
    { id: "opportunities", title: "Opportunities", prompt: "[Add opportunities or experience I gained from the internship.]", index: "03" },
    { id: "challenges", title: "Threats / challenges", prompt: "[Add problems, limitations, or challenges I encountered.]", index: "04" }
  ]
};
