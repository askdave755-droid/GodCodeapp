// Scripture-informed prayers. GodCode never claims God has spoken personally through the app.

export const PRAYER_CATEGORIES = [
  {
    id: "identity",
    label: "Identity",
    scripture: { ref: "Ephesians 2:10", text: "For we are his workmanship, created in Christ Jesus for good works." },
    prayers: [
      "Father, I keep trying to assemble an identity out of what I produce and what people say. Thank You that I am Your workmanship, created in Christ Jesus. Quiet the comparison in me. Let what You say about me be louder than what I feel about myself, and let me walk today in the work You prepared. In Jesus' mighty name, Amen.",
      "Lord, You made me in Your image, and You call me new in Christ. Where I have accepted labels You never gave me, pull them off. Teach me to receive my identity rather than manufacture it. In Jesus' mighty name, Amen.",
    ],
  },
  {
    id: "rejection",
    label: "Rejection",
    scripture: { ref: "Psalm 27:10", text: "For my father and my mother have forsaken me, but the LORD will take me in." },
    prayers: [
      "Father, the rejection still stings, and pretending otherwise has not helped. You see what was done and what was withheld. Take me in. Heal the part of me that learned to perform for love, and keep me from becoming hard. In Jesus' mighty name, Amen.",
      "Lord Jesus, You were despised and rejected, so You understand this from the inside. Sit with me in it. Keep me from building my life around avoiding this pain again. In Jesus' mighty name, Amen.",
    ],
  },
  {
    id: "relationships",
    label: "Relationships",
    scripture: { ref: "Colossians 3:13", text: "Bearing with one another and, if one has a complaint against another, forgiving each other." },
    prayers: [
      "Father, relationships are harder than I admit. Give me patience that outlasts my irritation, honesty that is not cruel, and humility to go first in repair. Where I have been wrong, make me quick to say so. In Jesus' mighty name, Amen.",
      "Lord, teach me to love the actual person in front of me rather than the version I wish they were. Guard my tongue and soften my assumptions. In Jesus' mighty name, Amen.",
    ],
  },
  {
    id: "family",
    label: "Family",
    scripture: { ref: "Joshua 24:15", text: "As for me and my house, we will serve the LORD." },
    prayers: [
      "Father, I bring my family to You — the parts that are thriving and the parts that are strained. Break generational patterns that have caused harm. Give us honesty, patience, and a home where grace is normal. In Jesus' mighty name, Amen.",
      "Lord, for the family members I cannot reach and cannot fix: I release them to You. Work in ways I cannot see, and keep my own heart soft. In Jesus' mighty name, Amen.",
    ],
  },
  {
    id: "purpose",
    label: "Purpose",
    scripture: { ref: "Proverbs 16:9", text: "The heart of man plans his way, but the LORD establishes his steps." },
    prayers: [
      "Father, I want clarity, and You have given me a next step. Keep me from despising small, faithful work while I wait for something larger. Establish my steps and protect me from chasing significance over obedience. In Jesus' mighty name, Amen.",
      "Lord, show me what is already in my hands. Let me serve where I actually am, with what I actually have, today. In Jesus' mighty name, Amen.",
    ],
  },
  {
    id: "protection",
    label: "Protection",
    scripture: { ref: "Psalm 91:1–2", text: "He who dwells in the shelter of the Most High will abide in the shadow of the Almighty." },
    prayers: [
      "Father, be my refuge. Protect my family, my mind, and my going out and coming in. Where I am afraid, replace fear with trust in Your character, not merely in good outcomes. In Jesus' mighty name, Amen.",
      "Lord, guard my heart from bitterness, my eyes from what corrodes, and my steps from paths I know I shouldn't take. In Jesus' mighty name, Amen.",
    ],
  },
  {
    id: "wisdom",
    label: "Wisdom",
    scripture: { ref: "James 1:5", text: "If any of you lacks wisdom, let him ask God, who gives generously to all without reproach." },
    prayers: [
      "Father, I lack wisdom, and You said to ask. Give me discernment for the decision in front of me, humility to seek counsel, and patience to wait if waiting is the wise thing. In Jesus' mighty name, Amen.",
      "Lord, keep me from confusing confidence with wisdom. Let Your Word shape how I think before circumstances do. In Jesus' mighty name, Amen.",
    ],
  },
  {
    id: "finances",
    label: "Finances",
    scripture: { ref: "Matthew 6:33", text: "But seek first the kingdom of God and his righteousness, and all these things will be added to you." },
    prayers: [
      "Father, money has a louder voice in my life than I want it to have. Give me wisdom with what I have, contentment where I am, and generosity that costs me something. Provide for what we genuinely need. In Jesus' mighty name, Amen.",
      "Lord, I confess the anxiety and the comparison. Reorder my priorities so that seeking Your kingdom is not the thing I do after the budget works. In Jesus' mighty name, Amen.",
    ],
  },
  {
    id: "anxiety",
    label: "Anxiety",
    scripture: { ref: "Philippians 4:6–7", text: "Do not be anxious about anything, but in everything by prayer and supplication with thanksgiving let your requests be made known to God." },
    prayers: [
      "Father, my mind will not stop running. I bring You the specific thing I am afraid of rather than a vague worry. Guard my heart and mind with a peace I cannot reason my way into. In Jesus' mighty name, Amen.",
      "Lord, help me do the next small thing instead of solving everything tonight. Let me sleep, and let me wake trusting You. In Jesus' mighty name, Amen.",
    ],
    note: "Prayer is not a substitute for care. If anxiety is persistent or overwhelming, please speak with a doctor or qualified counselor as well.",
  },
  {
    id: "forgiveness",
    label: "Forgiveness",
    scripture: { ref: "Matthew 6:14", text: "For if you forgive others their trespasses, your heavenly Father will also forgive you." },
    prayers: [
      "Father, I am holding something I was told to release. I do not feel like forgiving. Help me choose it anyway, and keep choosing it. Heal what the offense did so that forgiveness is not pretending. In Jesus' mighty name, Amen.",
      "Lord, forgive me for what I have done and excused. Thank You that Your mercy is not rationed. Make me someone who extends what I have received. In Jesus' mighty name, Amen.",
    ],
  },
  {
    id: "leadership",
    label: "Leadership",
    scripture: { ref: "Mark 10:43–44", text: "Whoever would be great among you must be your servant." },
    prayers: [
      "Father, make me a servant before a leader. Keep me honest when no one is checking, humble when things go well, and steady when they don't. Protect the people I lead from my blind spots. In Jesus' mighty name, Amen.",
      "Lord, give me courage for the conversation I have been avoiding and gentleness in how I have it. In Jesus' mighty name, Amen.",
    ],
  },
  {
    id: "healing",
    label: "Healing",
    scripture: { ref: "Psalm 147:3", text: "He heals the brokenhearted and binds up their wounds." },
    prayers: [
      "Father, You are a healer. I ask for healing in my body and in the places no one can see. Give wisdom to those caring for me, endurance for the process, and peace regardless of the timeline. In Jesus' mighty name, Amen.",
      "Lord, when healing is slow, keep me from bitterness. Bind up what is broken in me and let me be honest with You about the pain. In Jesus' mighty name, Amen.",
    ],
    note: "Please continue to seek qualified medical care. GodCode offers prayer, not medical advice.",
  },
  {
    id: "gratitude",
    label: "Gratitude",
    scripture: { ref: "1 Thessalonians 5:18", text: "Give thanks in all circumstances; for this is the will of God in Christ Jesus for you." },
    prayers: [
      "Father, thank You. For the things I asked for and received, and for the things I never thought to notice. Train my eyes to see grace in ordinary places, and let gratitude change how I treat people today. In Jesus' mighty name, Amen.",
      "Lord, I have been rehearsing what is missing. Today I rehearse what is true: You are good, You are near, and You have not failed me. In Jesus' mighty name, Amen.",
    ],
  },
];
