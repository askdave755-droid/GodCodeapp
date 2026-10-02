// Daily GodCode devotionals. Rotates deterministically by day-of-year so every user
// sees the same devotional on the same day, with no prediction or fortune-telling.

export const DEVOTIONALS = [
  {
    title: "Made, Not Random",
    scripture: {
      ref: "Ephesians 2:10",
      text: "For we are his workmanship, created in Christ Jesus for good works, which God prepared beforehand, that we should walk in them.",
    },
    meaning:
      "The word translated 'workmanship' describes something crafted with intent. Paul's point is not that you must earn a purpose, but that you were made inside one. Good works are the path you walk in, not the price you pay.",
    identity: "You are not an accident with a personality. You are made, and you are sent.",
    action: "Do one good work today that nobody will see or thank you for.",
    prayer:
      "Father, thank You that I am Your workmanship and not my own invention. Quiet the voice that says I must prove my worth. Show me the work You have already placed in front of me, and give me the willingness to walk in it today. In Jesus' mighty name, Amen.",
  },
  {
    title: "Rest Is Obedience",
    scripture: {
      ref: "Genesis 2:2–3",
      text: "And on the seventh day God finished his work that he had done, and he rested on the seventh day from all his work that he had done.",
    },
    meaning:
      "Rest is written into creation before it is written into law. God did not rest because He was tired; He rested to establish a rhythm His people would need. Refusing rest is not devotion — it is distrust wearing a work ethic.",
    identity: "Your value is not produced by your output.",
    action: "Block out one unhurried hour today with no screens and no agenda.",
    prayer:
      "Lord, You rested, and You called it holy. Forgive me for treating exhaustion as faithfulness. Teach me to stop, to trust that You keep working when I do not, and to receive rest as a gift. In Jesus' mighty name, Amen.",
  },
  {
    title: "The Third Day",
    scripture: {
      ref: "1 Corinthians 15:4",
      text: "That he was buried, that he was raised on the third day in accordance with the Scriptures.",
    },
    meaning:
      "Between the cross and the empty tomb there is a full, silent day. Scripture does not skip it, and neither should we. Resurrection hope is not denial of the waiting — it is confidence about how the waiting ends.",
    identity: "You are someone whose story is held by a God who raises the dead.",
    action: "Name the thing you are waiting on, out loud, in prayer — without fixing it.",
    prayer:
      "Jesus, You know what Saturday feels like. Meet me in the waiting. Keep me from despair and from pretending. I trust that what You raise, You raise completely. In Jesus' mighty name, Amen.",
  },
  {
    title: "Nothing Separates",
    scripture: {
      ref: "Romans 8:38–39",
      text: "For I am sure that neither death nor life, nor angels nor rulers, nor things present nor things to come... will be able to separate us from the love of God in Christ Jesus our Lord.",
    },
    meaning:
      "Paul lists every category of threat he can think of and empties them all. Superstition, luck, numbers, dates, and omens do not appear on the list because they were never powers to begin with.",
    identity: "You are secure in a love you did not earn and cannot lose.",
    action: "Identify one fear you've been managing quietly and bring it to someone you trust.",
    prayer:
      "Father, I confess the fears I have treated as bigger than You. Thank You that nothing in all creation can separate me from Your love. Let that security change how I live today. In Jesus' mighty name, Amen.",
  },
  {
    title: "Renewed Thinking",
    scripture: {
      ref: "Romans 12:2",
      text: "Do not be conformed to this world, but be transformed by the renewal of your mind, that by testing you may discern what is the will of God.",
    },
    meaning:
      "Discernment here is a result of renewed thinking, not a shortcut around it. God's will is discovered by people whose minds are being reshaped by truth — slowly, through intake and obedience.",
    identity: "You are being transformed, not merely informed.",
    action: "Read one chapter of Scripture slowly and write a single sentence about it.",
    prayer:
      "Lord, renew my mind. Replace what I have absorbed thoughtlessly with what is true. Give me patience with slow change and hunger for Your Word. In Jesus' mighty name, Amen.",
  },
  {
    title: "Two Are Better",
    scripture: {
      ref: "Ecclesiastes 4:9–10",
      text: "Two are better than one, because they have a good reward for their toil. For if they fall, one will lift up his fellow.",
    },
    meaning:
      "Biblical wisdom assumes you will fall. The question is whether anyone is close enough to lift you. Independence feels safer right up until the moment it isn't.",
    identity: "You were not designed to carry your life alone.",
    action: "Text one person today and tell them something true that you'd normally hide.",
    prayer:
      "Father, You said it is not good to be alone. Break down the pride that keeps me self-sufficient. Give me honest friends and make me one. In Jesus' mighty name, Amen.",
  },
  {
    title: "Proclaim Liberty",
    scripture: {
      ref: "Leviticus 25:10",
      text: "And you shall consecrate the fiftieth year, and proclaim liberty throughout the land to all its inhabitants.",
    },
    meaning:
      "Jubilee was God's reset button on debt and bondage — a structural mercy, written into the law. Jesus reads this language over His own ministry in Luke 4. Freedom is God's instinct, not His exception.",
    identity: "You are someone God frees, and someone God frees others through.",
    action: "Release one grudge you've been collecting interest on.",
    prayer:
      "Lord, You proclaim liberty. Free me from what I keep returning to, and loosen my grip on what others owe me. Make me generous with mercy because You have been. In Jesus' mighty name, Amen.",
  },
  {
    title: "Forty in the Wilderness",
    scripture: {
      ref: "Matthew 4:1–2",
      text: "Then Jesus was led up by the Spirit into the wilderness to be tempted by the devil. And after fasting forty days and forty nights, he was hungry.",
    },
    meaning:
      "The Spirit led Him there. The wilderness was not a detour from the plan; it was the preparation inside it. A hard season is not automatically a sign of God's absence.",
    identity: "You are being formed, not abandoned.",
    action: "Write down one thing this difficult season has taught you that comfort never did.",
    prayer:
      "Jesus, You know hunger and testing. I don't enjoy this season, but I don't want to waste it. Form something in me here that could not be formed anywhere else. In Jesus' mighty name, Amen.",
  },
  {
    title: "Image Bearers",
    scripture: {
      ref: "Genesis 1:27",
      text: "So God created man in his own image, in the image of God he created him; male and female he created them.",
    },
    meaning:
      "Everything Scripture says about human dignity rests here. It is said of all people, before any achievement, belief, or behavior. It means your worth is given, and so is theirs.",
    identity: "You bear God's image — and so does the person who frustrates you most.",
    action: "Speak well of someone today who is not in the room.",
    prayer:
      "Father, You made me in Your image and You made them in Your image too. Correct the way I measure people. Teach me to honor what You have made. In Jesus' mighty name, Amen.",
  },
  {
    title: "Seventy Times Seven",
    scripture: {
      ref: "Matthew 18:21–22",
      text: "'Lord, how often will my brother sin against me, and I forgive him? As many as seven times?' Jesus said to him, 'I do not say to you seven times, but seventy-seven times.'",
    },
    meaning:
      "Peter thought he was being generous. Jesus answers with a number designed to break the accounting. Forgiveness in the kingdom is not a quota you fill but a posture you keep.",
    identity: "You are forgiven far past counting, and free to forgive the same way.",
    action: "Stop keeping score with one person today — actually stop.",
    prayer:
      "Lord, I have kept records You tore up. Teach me to forgive without a ledger, remembering how much You have released me from. In Jesus' mighty name, Amen.",
  },
  {
    title: "A New Creation",
    scripture: {
      ref: "2 Corinthians 5:17",
      text: "Therefore, if anyone is in Christ, he is a new creation. The old has passed away; behold, the new has come.",
    },
    meaning:
      "Paul does not say you were improved. He says new. The old still has memories and consequences, but it no longer has the authority to define you.",
    identity: "You are new — not because you feel new, but because Christ says so.",
    action: "Write down one old label and cross it out on paper.",
    prayer:
      "Jesus, thank You that I am a new creation. When my feelings disagree with Your Word, help me believe Your Word. In Jesus' mighty name, Amen.",
  },
  {
    title: "Fruit, Not Performance",
    scripture: {
      ref: "Galatians 5:22–23",
      text: "But the fruit of the Spirit is love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, self-control.",
    },
    meaning:
      "Fruit grows; it is not manufactured. The list is singular — one fruit with nine expressions — which means the Spirit is not producing some of these in you and skipping the rest.",
    identity: "You are a place where the Spirit is growing something.",
    action: "Choose the quality you lack most and practice it once today, deliberately.",
    prayer:
      "Holy Spirit, grow in me what I cannot produce. I give You the parts of my character I keep excusing. In Jesus' mighty name, Amen.",
  },
  {
    title: "Counsel Before Decision",
    scripture: {
      ref: "Proverbs 15:22",
      text: "Without counsel plans fail, but with many advisers they succeed.",
    },
    meaning:
      "Scripture's model for guidance is unglamorous: wise people, honest questions, time. It is far more reliable than signs, feelings, or patterns we find in numbers.",
    identity: "You are someone wise enough to ask.",
    action: "Bring the decision you've been sitting on to one wise person this week.",
    prayer:
      "Father, keep me from confusing my preferences with Your voice. Surround me with people who will tell me the truth, and make me humble enough to listen. In Jesus' mighty name, Amen.",
  },
  {
    title: "Belonging to a People",
    scripture: {
      ref: "1 Peter 2:9",
      text: "But you are a chosen race, a royal priesthood, a holy nation, a people for his own possession, that you may proclaim the excellencies of him who called you.",
    },
    meaning:
      "Every identity word in this verse is plural. Christian identity is personal, but it is never private. You find out who you are inside a people.",
    identity: "You belong — before you contribute.",
    action: "Show up somewhere in person this week where you are known.",
    prayer:
      "Lord, thank You that I belong to Your people. Heal what makes me avoid community and give me courage to be known. In Jesus' mighty name, Amen.",
  },
];

export function devotionalForDate(date = new Date()) {
  const start = new Date(date.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((date - start) / 86400000);
  return DEVOTIONALS[dayOfYear % DEVOTIONALS.length];
}
