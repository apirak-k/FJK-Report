/* Replace these neutral placeholders with confirmed internship information. */
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
    { id: "foundation", title: "Foundation" },
    { id: "manufacturing", title: "Manufacturing" },
    { id: "msa", title: "MSA" },
    { id: "doe", title: "DOE" },
    { id: "jig-stock", title: "JIG STOCK" },
    { id: "cost-breakdown", title: "Cost Breakdown" },
    { id: "ai-swe-fundamentals", title: "AI & SWE Fundamentals" },
    { id: "machine-setup", title: "Machine Setup" },
    { id: "workshop", title: "Workshop" }
  ],
  timeline: {
    notice: "Layout preview only. These topic/week markers do not describe confirmed internship work.",
    /* Point each marker at a matching content id inside its topic section. */
    activities: [
      { id: "foundation-w1", topicId: "foundation", week: 1, targetId: "detail-foundation" },
      { id: "foundation-w2", topicId: "foundation", week: 2, targetId: "detail-foundation" },
      { id: "foundation-w3", topicId: "foundation", week: 3, targetId: "detail-foundation" },
      { id: "manufacturing-w3", topicId: "manufacturing", week: 3, targetId: "detail-manufacturing" },
      { id: "manufacturing-w4", topicId: "manufacturing", week: 4, targetId: "detail-manufacturing" },
      { id: "manufacturing-w5", topicId: "manufacturing", week: 5, targetId: "detail-manufacturing" },
      { id: "manufacturing-w7", topicId: "manufacturing", week: 7, targetId: "detail-manufacturing" },
      { id: "msa-w5", topicId: "msa", week: 5, targetId: "detail-msa" },
      { id: "msa-w6", topicId: "msa", week: 6, targetId: "detail-msa" },
      { id: "msa-w8", topicId: "msa", week: 8, targetId: "detail-msa" },
      { id: "doe-w7", topicId: "doe", week: 7, targetId: "detail-doe" },
      { id: "doe-w8", topicId: "doe", week: 8, targetId: "detail-doe" },
      { id: "doe-w9", topicId: "doe", week: 9, targetId: "detail-doe" },
      { id: "doe-w10", topicId: "doe", week: 10, targetId: "detail-doe" },
      { id: "jig-stock-w9", topicId: "jig-stock", week: 9, targetId: "detail-jig-stock" },
      { id: "jig-stock-w10", topicId: "jig-stock", week: 10, targetId: "detail-jig-stock" },
      { id: "jig-stock-w12", topicId: "jig-stock", week: 12, targetId: "detail-jig-stock" },
      { id: "jig-stock-w13", topicId: "jig-stock", week: 13, targetId: "detail-jig-stock" },
      { id: "cost-breakdown-w11", topicId: "cost-breakdown", week: 11, targetId: "detail-cost-breakdown" },
      { id: "cost-breakdown-w12", topicId: "cost-breakdown", week: 12, targetId: "detail-cost-breakdown" },
      { id: "cost-breakdown-w14", topicId: "cost-breakdown", week: 14, targetId: "detail-cost-breakdown" },
      { id: "ai-swe-fundamentals-w1", topicId: "ai-swe-fundamentals", week: 1, targetId: "detail-ai-swe-fundamentals" },
      { id: "ai-swe-fundamentals-w13", topicId: "ai-swe-fundamentals", week: 13, targetId: "detail-ai-swe-fundamentals" },
      { id: "ai-swe-fundamentals-w14", topicId: "ai-swe-fundamentals", week: 14, targetId: "detail-ai-swe-fundamentals" },
      { id: "ai-swe-fundamentals-w15", topicId: "ai-swe-fundamentals", week: 15, targetId: "detail-ai-swe-fundamentals" },
      { id: "machine-setup-w2", topicId: "machine-setup", week: 2, targetId: "detail-machine-setup" },
      { id: "machine-setup-w15", topicId: "machine-setup", week: 15, targetId: "detail-machine-setup" },
      { id: "machine-setup-w16", topicId: "machine-setup", week: 16, targetId: "detail-machine-setup" },
      { id: "workshop-w4", topicId: "workshop", week: 4, targetId: "detail-workshop" },
      { id: "workshop-w16", topicId: "workshop", week: 16, targetId: "detail-workshop" },
      { id: "workshop-w17", topicId: "workshop", week: 17, targetId: "detail-workshop" }
    ]
  },
  swot: [
    { id: "strengths", title: "Strengths", prompt: "[Add my personal strengths demonstrated during the internship.]", index: "01" },
    { id: "weaknesses", title: "Weaknesses", prompt: "[Add areas I want to improve.]", index: "02" },
    { id: "opportunities", title: "Opportunities", prompt: "[Add opportunities or experience I gained from the internship.]", index: "03" },
    { id: "challenges", title: "Threats / challenges", prompt: "[Add problems, limitations, or challenges I encountered.]", index: "04" }
  ]
};
