import { IDENTITY } from "../data/identity.js";

const RELATIONSHIP_SCRIPTURES = [
  {
    ref: "Ephesians 4:2–3",
    text: "With all humility and gentleness, with patience, bearing with one another in love, eager to maintain the unity of the Spirit in the bond of peace.",
    why: "Paul assumes that staying united takes effort. Patience is named as a practice, not a personality trait.",
  },
  {
    ref: "Colossians 3:13",
    text: "Bearing with one another and, if one has a complaint against another, forgiving each other; as the Lord has forgiven you, so you also must forgive.",
    why: "The standard is not whether the other person deserves it, but what has already been extended to you.",
  },
  {
    ref: "Proverbs 15:1",
    text: "A soft answer turns away wrath, but a harsh word stirs up anger.",
    why: "Tone is often the whole argument. Volume rarely resolves anything.",
  },
  {
    ref: "James 1:19",
    text: "Let every person be quick to hear, slow to speak, slow to anger.",
    why: "A simple order of operations most conflicts skip.",
  },
  {
    ref: "1 Corinthians 13:4–7",
    text: "Love is patient and kind... it is not irritable or resentful... Love bears all things, believes all things, hopes all things, endures all things.",
    why: "A description of love as behavior rather than as feeling.",
  },
];

export function buildCompatibility(nameA, codeA, nameB, codeB) {
  const A = IDENTITY[codeA];
  const B = IDENTITY[codeB];
  const same = codeA === codeB;
  const gap = Math.abs(codeA - codeB);

  const communication = same
    ? `${nameA} and ${nameB} share the same reduced GodCode, which means your reflection profiles describe similar communication habits: ${A.communication.toLowerCase()} When two people communicate the same way, the shared blind spot is usually the harder problem — neither of you naturally supplies what the other is missing.`
    : `${nameA}'s profile suggests: ${A.communication} ${nameB}'s profile suggests: ${B.communication} These styles may complement one another, or they may talk past each other — the difference usually comes down to whether you have named the difference out loud.`;

  const emotional = same
    ? `Both profiles describe a similar emotional pattern: ${A.emotional.toLowerCase()} Consider who in your wider circle can offer the perspective neither of you naturally brings.`
    : `${nameA}: ${A.emotional} ${nameB}: ${B.emotional} Consider whether one of you tends to process out loud while the other processes internally — and whether you have mistaken that for indifference.`;

  const strengths = [
    `${nameA} may contribute: ${A.strengths[0].replace(/^You /, "they ").replace(/^you /, "they ")}`.replace("may find it easy", "may find it easy"),
    `${nameB} may contribute: ${B.strengths[0].replace(/^You /, "they ").replace(/^you /, "they ")}`,
    same
      ? "Shared tendencies can make a relationship feel immediately understood and low-friction in daily life."
      : "Different tendencies can cover each other's gaps when both people treat the difference as a resource rather than a flaw.",
  ];

  const friction = [
    `${nameA} may need to watch: ${A.growth[0].replace(/^Consider whether /, "a tendency where ").replace(/^You /, "a tendency to ").replace(/^Notice if /, "a tendency where ")}`,
    `${nameB} may need to watch: ${B.growth[0].replace(/^Consider whether /, "a tendency where ").replace(/^You /, "a tendency to ").replace(/^Notice if /, "a tendency where ")}`,
    gap >= 4
      ? "Your reflection profiles differ substantially. That is not a warning sign — it usually just means you will need more explicit conversation about expectations than couples or friends who think alike."
      : same
      ? "Because your profiles are similar, friction is more likely to come from a shared weakness than from a clash."
      : "Your profiles are moderately different, which often shows up in pacing: one of you may move faster than the other on decisions.",
  ];

  const conflict = `${nameA}'s pattern in conflict: ${A.conflict} ${nameB}'s pattern in conflict: ${B.conflict} A practical step: agree in advance on how you will pause a conversation that is escalating, and when you will return to it. Matthew 18:15 assumes the conversation actually happens.`;

  const growth = [
    `Name the difference instead of interpreting it. Ask: "when you went quiet, what was happening for you?"`,
    `Each of you choose one item from your own growth list — not your partner's — and work on it for a month.`,
    `Decide together what counts as repair. Many conflicts end without either person feeling the matter was closed.`,
    `Bring a third voice in when you are stuck. Proverbs 15:22 treats counsel as normal, not as failure.`,
  ];

  const scriptures = RELATIONSHIP_SCRIPTURES.slice(0, 4);

  return { communication, emotional, strengths, friction, conflict, growth, scriptures };
}
