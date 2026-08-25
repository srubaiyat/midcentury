/* ============================================================================
   data.js  —  ALL THE CONTENT OF THE SITE LIVES HERE.
   ----------------------------------------------------------------------------
   This is the only file you need to touch to add, remove or edit a memory.
   Nothing here is code you have to understand — it's a list of memories.

   A memory looks like this:

     {
       category: "prince",                     // which chapter it belongs to
       title:    "The classroom door",         // the heading
       text:     "In high school, ...",        // the story
       images:   ["./images/example.png"]      // 0, 1 or 2 photographs
     },

   VALID CATEGORY IDs (copy one of these exactly):
     "prince"      -> Prince Charming Chronicles
     "travel"      -> Travel Chronicles
     "trivia"      -> Trivia
     "fatherhood"  -> Fatherhood Chronicles
     "friendship"  -> Friendship Chronicles

   OPTIONAL EXTRAS you can add to any memory:
     aside:  "a short italic wink underneath the story"
     alt:    "description of the photo for screen readers"
     images: []          -> leave empty and an elegant placeholder is drawn
     pending: true       -> marks it as "still being collected"

   The order of this list is the order of the site. Memories are grouped by
   category automatically, so a new memory just needs the right category id —
   you can paste it anywhere in the list.
   ========================================================================= */


/* --- The five chapters, in the order they appear ------------------------- */
const CATEGORIES = [
  {
    id: "prince",
    name: "Prince Charming Chronicles",
    short: "Prince Charming",
    code: "PC",
    blurb: "Evidence gathered from the years when he was, allegedly, devastating."
  },
  {
    id: "travel",
    name: "Travel Chronicles",
    short: "Travel",
    code: "TC",
    blurb: "Passport stamps, questionable hotels, and at least one cockroach incident."
  },
  {
    id: "trivia",
    name: "Trivia",
    short: "Trivia",
    code: "TQ",
    blurb: "How well do you actually know him? Guess first. No scrolling ahead."
  },
  {
    id: "fatherhood",
    name: "Fatherhood Chronicles",
    short: "Fatherhood",
    code: "FC",
    blurb: "The part where he becomes somebody's entire world, and takes it very seriously."
  },
  {
    id: "friendship",
    name: "Friendship Chronicles",
    short: "Friends",
    code: "FR",
    blurb: "What the people who have known him longest have to say. Unedited."
  }
];


/* --- The opening screen -------------------------------------------------- */
const HERO = {
  name: "Mainul Islam",
  headline: "50 Years of",
  years: "1976 — 2026",
  invitation: "Enter the chronicles"
};


/* --- The closing note ---------------------------------------------------- */
const CODA = {
  line: "Fifty years down. We're keeping the file open.",
  sign: "Happy birthday, Papa."
};


/* --- The memories -------------------------------------------------------- */
const MEMORIES = [

  /* ===================== PRINCE CHARMING CHRONICLES ===================== */

  {
    category: "prince",
    title: "The classroom door",
    text: "In high school, the door to his classroom section would apparently be surrounded by girls while he stood there flashing that charming smile.",
    images: ["./images/the-classroom-door.png"]
  },
  {
    category: "prince",
    title: "Friday cake dates",
    text: "They used to save up money so they could buy cakes every Friday from the pretty older woman who worked at the cake shop — who apparently looked like either Madhuri Dixit or Monica Bellucci, depending on who is telling the story.",
    images: ["./images/friday-cake-dates.png"]
  },
  {
    category: "prince",
    title: "Sixes for the ladies",
    text: "In college, whenever he happened to be playing cricket and spotted a beautiful girl, he would apparently start hitting sixes.",
    aside: "Clearly, this was less about cricket and more about making an impression.",
    images: ["./images/sixes-for-the-ladies.png"]
  },
  {
    category: "prince",
    title: "The coconut trick",
    text: "He could skin a coconut with his bare hands, and he made sure to demonstrate this impressive skill to every girl he liked, every girl who liked him, or both.",
    images: ["./images/the-coconut-trick.png"]
  },
  {
    category: "prince",
    title: "The Valentine's Day deception",
    text: "His first date with Mom happened because he wanted to win a bet against his friends, so Mom agreed to pretend to be his girlfriend. To make the story convincing, they made a Valentine's Day card as \u201cproof\u201d for Deep and Indra. Once the deception was complete, they decided to throw the card into Dhakuria Lake.",
    images: ["./images/the-valentines-deception.png"]
  },
  {
    category: "prince",
    title: "Three days at the crease",
    text: "On a trip to a friend's village, he stayed at the wicket for three straight days while all the village boys desperately tried to send him back to the pavilion. On the third day, Mom finally said that she wanted to bowl. He let her ball go straight into the wicket.",
    images: ["./images/three-days-at-the-crease.png"]
  },
  {
    category: "prince",
    title: "Three friends, one crush",
    text: "Three girls who were among each other's closest friends all fell for him when he came to study Physics Honours at Scottish Church College.",
    images: ["./images/three-friends-one-crush.png"]
  },
  {
    category: "prince",
    title: "The absent proposal",
    text: "His father proposed to Mom on his behalf while Mom was visiting their house. Meanwhile, he was apparently in the bathroom, completely uninvolved in his own proposal.",
    images: ["./images/the-absent-proposal.png"]
  },


  /* ========================= TRAVEL CHRONICLES ========================== */

  {
    category: "travel",
    title: "Everest",
    text: "While trekking toward Everest Base Camp — notably during the earthquakes — someone grew some common sense and was ready to give up. He walked them back to his brand of insanity and motivated them all the way to Base Camp.",
    images: ["./images/everest.png"]
  },
  {
    category: "travel",
    title: "South Africa",
    text: "He arranged his business trip to coincide with my global competition round and took me to Cape Town so we could visit the southernmost tip of Africa together.",
    images: []
  },
  {
    category: "travel",
    title: "The cross-country road trip",
    text: "He drove across the United States to show Mom Native American reservations, buy Indigenous jewelry, visit Mount Rushmore, and see the Crazy Horse Memorial — after gaining freedom from sending me to India alone for the summer.",
    images: []
  },
  {
    category: "travel",
    title: "Darjeeling",
    text: "His favorite destination — and apparently one he loved enough to visit almost every weekend.",
    images: []
  },
  {
    category: "travel",
    title: "Las Vegas",
    text: "He has been to Las Vegas eight times, despite apparently leaving the money behind at the casino every time.",
    images: []
  },
  {
    category: "travel",
    title: "Macau and Hong Kong",
    text: "After not seeing me in real life for 6 years, we met in Macau and Hong Kong while I was there for a conference — because apparently we're incapable of coordinating a trip aside from when I travel for work.",
    images: []
  },
  {
    category: "travel",
    title: "The Grand Canyon",
    text: "When we were on the shallower end of the Grand Canyon, I wanted to go down to the bottom, but I was being shy and waited too long. Then we reached the deeper end of the canyon, where I realized I could no longer go down because it was too deep for me to get to the end. I started crying. Papa immediately decided to walk into the canyon with me and take me as deep as I wanted to go, until I stopped crying and felt satisfied that I had actually made it into the canyon. Then he carried my things on the way back up.",
    images: []
  },
  {
    category: "travel",
    title: "The Digha Disaster",
    text: "Spontaneous decision to go to Digha, and they drove all night. On the way back, Mainul pees on a tree near the roadside, realizing only after driving away that his earbuds, so they drive all the way back to the wet tree trunk. They found themselves searching for earbuds around a pee-wet tree trunk until facing defeat, and their proximity to nature's toilet was likely for naught. ",
    images: ["./images/the-digha-disaster.jpg"]
  },
  {
    category: "travel",
    title: "The Ghatsila disaster",
    text: "They took a cheap trip to Ghatsila, Jharkhand, and checked into an equally cheap hotel. They arrived late at night and went to eat at the restaurant, but the lights suddenly went out. They kept eating in the darkness, only to discover when the lights came back on that there were cockroaches everywhere. Less than an hour later, they were on a train trying to escape back to Kolkata.",
    images: ["./images/ghatsila-disaster.webp"]
  },

  /* ================================ TRIVIA ============================== */
  /*
     Two kinds of trivia items:

     1. Reveal-only  — just a question and an answer:
          { category:"trivia", type:"quiz", question:"...", answer:"...",
            images:["./images/x.png"] }

     2. Multiple choice — add options and say which one is right.
          correctIndex: 0 means the FIRST option, 1 the second, and so on.
  */

  {
    category: "trivia", type: "quiz",
    question: "What is Papa's favorite hobby?",
    answer: "Creating shareholder value.",
    note: "Bonus: +1 for running.",
    images: ["./images/favorite-hobby.png"]
  },
  {
    category: "trivia", type: "quiz",
    question: "What is Papa's favorite perfume?",
    answer: "Ralph Lauren Polo.",
    images: ["./images/favorite-perfume.png"]
  },
  {
    category: "trivia", type: "quiz",
    question: "What is Papa's favorite mocktail?",
    answer: "Blue Cura\u00e7ao.",
    images: ["./images/favorite-mocktail.png"]
  },
  {
    category: "trivia", type: "quiz",
    question: "What was Papa's favorite ice cream flavor as a child?",
    answer: "Mango Kesar Pista.",
    images: ["./images/favorite-ice-cream.jpg"]
  },
  {
    category: "trivia", type: "quiz",
    question: "What is Papa's favorite flower?",
    answer: "Pink roses.",
    images: ["./images/favorite-flowers.jpeg"]
  },
  {
    category: "trivia", type: "quiz",
    question: "Who does Papa love the most?",
    answer: "ME, back off.",
    images: ["./images/me-back-off.png"]
  },
  {
    category: "trivia", type: "quiz",
    question: "What was the first item on Papa's to-do list before marriage?",
    answer: "Discuss sindoor.",
    note: "This was found written in his notebook by his to-be wife.",
    images: ["./images/marriage-to-do-list.jpg"]
  },
  {
    category: "trivia", type: "quiz",
    question: "How many weddings has Papa had?",
    answer: "Three.",
    images: ["./images/number-of-weddings.png"]
  },
  {
    category: "trivia", type: "quiz",
    question: "How does Papa try to influence the career path of every child in his life?",
    answer: "Convince them to go pre-med.",
    note: "Because apparently, the FOMO kicked in at 40.",
    images: ["./images/career-path.jpeg"]
  },
  {
    category: "trivia", type: "quiz",
    question: "What does Papa think I should look for in someone to marry?",
    options: [
      "Beautiful",
      "Intelligent",
      "Reasonable",
      "Decent",
      "Let him pick the person"
    ],
    correctIndex: 2,            // C. Reasonable
    answer: "Reasonable.",
    images: ["./images/reasonable.png"]
  },
  {
    category: "trivia", type: "quiz",
    question: "Which name did Papa choose?",
    options: [
      "Sumadhu Rubaiyat",
      "Genie"
    ],
    correctIndex: 1,            // B. Genie
    answer: "Genie.",
    images: ["./images/genie.png"]
  },
  {
    category: "trivia", type: "quiz",
    question: "How was the name \u201cSumadhu Rubaiyat\u201d chosen?",
    answer: "He found it written in Mamma's journal and somehow magically realized that she had written it as the name of their future daughter.",
    note: "Somehow, they never disagreed about it.",
    images: ["./images/sumadhu-rubaiyat.jpeg"]
  },
  {
    category: "trivia", type: "quiz",
    question: "When did Papa get married for the first time?",
    options: [
      "The day before Papa went to the USA",
      "On New Year's",
      "The day he landed in India after going to the USA",
      "A month before Mom went to Benaras"
    ],
    correctIndex: 2,            // C.
    answer: "The day he landed in India after going to the USA.",
    images: ["./images/first-married.jpg"]
  },


  /* ======================= FATHERHOOD CHRONICLES ======================== */

  {
    category: "fatherhood",
    title: "The name Genie",
    text: "He chose the name Genie because he said I made all his wishes come true.",
    images: ["./images/genie.png"]
  },
  {
    category: "fatherhood",
    title: "Carrying me home",
    text: "I fell asleep at the restaurant almost every time after I was done eating, and he used to carry me home every time.",
    images: ["./images/sleep-at-restaurant.png"]
  },
  {
    category: "fatherhood",
    title: "The permanent third wheel",
    text: "He used to bring me along on his dates with Mom, making me the ultimate third wheel.",
    images: []
  },
  {
    category: "fatherhood",
    title: "Matching dresses",
    text: "He loved buying dresses for me and Munez.",
    images: [
      "./images/dress-for-me-and-munez1.png",
      "./images/dress-for-me-and-munez2.png"
    ]
  },
  {
    category: "fatherhood",
    title: "The Grand Canyon",
    text: "When I went to the Grand Canyon, I wanted to walk down to the bottom on the shallow end, but I was too shy to ask. Then, when we drove over to the deep end the next day, it was too late. I started crying because I had missed my chance to go down into the canyon just because I was shy. But Papa decided to take me as deep down into the Grand Canyon as far as I could go until I felt better, and then come back up with me.",
    images: []
  },
  {
    category: "fatherhood",
    title: "The California wildfires",
    text: "We were caught in the California wildfires, and instead of seeing it as fleeing from a natural disaster, Papa saw it as an impromptu holiday — arranging for us to stay in a beautiful little cottage in a gorgeous vineyard by a lake.",
    images: ["./images/wild-fire.png"]
  },
  {
    category: "fatherhood",
    title: "The water cycle",
    text: "I first learned about the water cycle because he explained it to me while bathing me, using the steam from the warm bath and the fog on the mirror to explain what was happening.",
    images: []
  },
  {
    category: "fatherhood",
    title: "The pose",
    text: "Two photographs, the same pose, taken at the airport. Some things are simply protocol.",
    images: [
      "./images/airport1.png",
      "./images/airport2.png"
    ]
  },
  {
    category: "fatherhood",
    title: "The dry-cleaning ritual",
    text: "The day after I landed, he would put all of my clothes into dry cleaning. Thankfully, I had gifted clothes from all of his friends, which now became my uniform.",
    images: []
  },
  {
    category: "fatherhood",
    title: "The mountain lion",
    text: "He took me on a jog into a mountain lion region, and we heard one roar. Given his utter disregard for common sense, he decided to roar back to try to make friends with the mountain lion and invite it over.",
    images: ["./images/mountain-lion.jpg"]
  },


  /* ======================= FRIENDSHIP CHRONICLES ======================== */
  /*  These are testimonials. Use  type:"voice",  who:"Name",  quote:"..."   */

  {
    category: "friendship", type: "voice",
    who: "Ishani",
    quote: "Through a deep sympathy, he understands what you need and creates a beautiful reality around you."
  },
  {
    category: "friendship", type: "voice",
    who: "Bodhi",
    quote: "He always had a nice, welcoming smile on his face."
  },
  {
    category: "friendship", type: "voice",
    who: "Sundari",
    quote: "There shall never be born any human again who can make your biryani (all of your cooking, but special mention to your biryani for obvious reasons), God really blessed us with you \ud83d\ude4f\ud83c\udffb"
  },
  {
    category: "friendship", type: "voice",
    who: "Pakhi",
    quote: "He's the best chef in the world and a restaurant connoisseur."
  },
  {
    category: "friendship", type: "voice",
    who: "Ishita",
    quote: "He is always taking care of his family/friends' parents."
  },
  {
    category: "friendship", type: "voice",
    who: "Deep",
    quote: "We used to always go and get chow mein, and one day it was bad, and we couldn't get a refund. So we mixed all of sauces together to make a horrible sauce for everyone who wanted to get food from there later."
  }

];

/* NOTE: ./images/the-digha-disaster.jpg is uploaded but deliberately unused.
   When you know the story, add a memory here and point images at it.        */
