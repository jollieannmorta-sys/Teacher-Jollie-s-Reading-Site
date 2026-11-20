/* =========================================================
   READING FUNDAMENTALS – CONTENT
   Edit this file to add or change words, sentences, quizzes
   and passages. No other file needs to change.

   Activity types
   - words     : read-aloud check for single words ({w, syl})
   - sentences : read-aloud check for sentences (array of strings)
   - quiz      : multiple choice ({q, options[], a (index), say?})
   - passage   : read a passage, then answer questions
   ========================================================= */

function splitSentences(text){
  return text.match(/[^.!?]+[.!?]+/g).map(s => s.trim());
}

const PASSAGES = {
  seed: "Mina found a tiny seed in the garden. She dug a small hole and put the seed inside. Every morning, she gave it water. After two weeks, a green shoot came out of the soil. Mina smiled. Soon, the shoot would grow into a tall tomato plant.",
  typhoon: "When a typhoon signal is raised, the family of Lito gets ready. His father ties the roof tightly with strong ropes. His mother fills bottles with clean water and packs canned food, a flashlight, and a radio. Lito helps by putting important papers in a plastic bag. Because they prepared early, the family stayed safe and calm when the strong wind arrived."
};

const LEVELS = [
  {
    id: "l1", emoji: "🔤", title: "Level 1: Letter Sounds & Short Vowels",
    desc: "Sound out short words like cat, pen and sun.",
    activities: [
      { id: "l1a", type: "words", title: "Read the words",
        items: [
          {w:"cat"},{w:"dog"},{w:"sun"},{w:"pen"},{w:"pig"},{w:"bus"},
          {w:"hat"},{w:"map"},{w:"sit"},{w:"top"},{w:"bed"},{w:"cup"}
        ]},
      { id: "l1b", type: "quiz", title: "Listen and choose",
        items: [
          {q:"Which word did you hear?", say:"bat", options:["bat","pat","bit"], a:0},
          {q:"Which word did you hear?", say:"pin", options:["pen","pin","pan"], a:1},
          {q:"Which word did you hear?", say:"hug", options:["hog","hug","hag"], a:1},
          {q:"Which word did you hear?", say:"net", options:["nut","not","net"], a:2},
          {q:"Which word did you hear?", say:"mop", options:["map","mop","mup"], a:1},
          {q:"Which word did you hear?", say:"lip", options:["lip","lap","lop"], a:0}
        ]},
      { id: "l1c", type: "sentences", title: "Read the sentences",
        items: ["The cat sat on the mat.","A big pig is in the mud.","I can see a red hen.","Sam has a hot cup."] }
    ]
  },
  {
    id: "l2", emoji: "🔠", title: "Level 2: Blends & Digraphs",
    desc: "Two letters, one sound: sh, ch, th, wh. And blends like bl, fr, st.",
    activities: [
      { id: "l2a", type: "words", title: "Read the words",
        items: [
          {w:"ship"},{w:"chop"},{w:"thin"},{w:"whale"},{w:"black"},{w:"frog"},
          {w:"stamp"},{w:"plant"},{w:"branch"},{w:"think"},{w:"shell"},{w:"crab"}
        ]},
      { id: "l2b", type: "quiz", title: "Listen and choose",
        items: [
          {q:"Which word did you hear?", say:"ship", options:["sip","ship","chip"], a:1},
          {q:"Which word did you hear?", say:"chin", options:["chin","thin","shin"], a:0},
          {q:"Which word did you hear?", say:"thick", options:["tick","sick","thick"], a:2},
          {q:"Which word did you hear?", say:"frog", options:["frog","from","flog"], a:0},
          {q:"Which word did you hear?", say:"stop", options:["top","stop","step"], a:1},
          {q:"Which word did you hear?", say:"whip", options:["whip","chip","ship"], a:0}
        ]},
      { id: "l2c", type: "sentences", title: "Read the sentences",
        items: ["The ship has a black flag.","A frog sat on the thick branch.","She finds a shell and a crab.","Chen will think about the plant."] }
    ]
  },
  {
    id: "l3", emoji: "🅰️", title: "Level 3: Long Vowels & Vowel Teams",
    desc: "Silent e and vowel pairs: cake, rain, boat, light.",
    activities: [
      { id: "l3a", type: "words", title: "Read the words",
        items: [
          {w:"cake"},{w:"bike"},{w:"rope"},{w:"rain"},{w:"feet"},{w:"boat"},
          {w:"light"},{w:"moon"},{w:"play"},{w:"snow"},{w:"cloud"},{w:"bright"}
        ]},
      { id: "l3b", type: "quiz", title: "Listen and choose",
        items: [
          {q:"Which word did you hear?", say:"kite", options:["kit","kite","kiss"], a:1},
          {q:"Which word did you hear?", say:"rain", options:["ran","rain","run"], a:1},
          {q:"Which word did you hear?", say:"tape", options:["tap","tip","tape"], a:2},
          {q:"Which word did you hear?", say:"boat", options:["boat","bot","bait"], a:0},
          {q:"Which word did you hear?", say:"seed", options:["said","seed","sad"], a:1},
          {q:"Which word did you hear?", say:"night", options:["knit","night","not"], a:1}
        ]},
      { id: "l3c", type: "sentences", title: "Read the sentences",
        items: ["The moon is bright tonight.","We play in the rain and in the snow.","Dad rides his bike to the lake.","A white boat floats on the water."] }
    ]
  },
  {
    id: "l4", emoji: "✂️", title: "Level 4: Syllables",
    desc: "Break big words into beats and read them smoothly.",
    activities: [
      { id: "l4a", type: "words", title: "Read the big words",
        items: [
          {w:"pencil", syl:"pen-cil"},{w:"window", syl:"win-dow"},{w:"rabbit", syl:"rab-bit"},
          {w:"basket", syl:"bas-ket"},{w:"banana", syl:"ba-na-na"},{w:"umbrella", syl:"um-brel-la"},
          {w:"elephant", syl:"el-e-phant"},{w:"computer", syl:"com-pu-ter"},{w:"vegetable", syl:"veg-e-ta-ble"},
          {w:"beautiful", syl:"beau-ti-ful"},{w:"library", syl:"li-brar-y"},{w:"remember", syl:"re-mem-ber"}
        ]},
      { id: "l4b", type: "quiz", title: "How many syllables?",
        items: [
          {q:"How many syllables do you hear?", say:"dog", options:["1","2","3"], a:0},
          {q:"How many syllables do you hear?", say:"table", options:["1","2","3"], a:1},
          {q:"How many syllables do you hear?", say:"banana", options:["2","3","4"], a:1},
          {q:"How many syllables do you hear?", say:"elephant", options:["2","3","4"], a:1},
          {q:"How many syllables do you hear?", say:"butterfly", options:["2","3","4"], a:1},
          {q:"How many syllables do you hear?", say:"vegetable", options:["3","4","5"], a:1}
        ]},
      { id: "l4c", type: "sentences", title: "Read the sentences",
        items: ["The rabbit eats a yellow banana.","My teacher has a pencil and a computer.","Remember to bring an umbrella tomorrow.","The library is a beautiful place to read."] }
    ]
  },
  {
    id: "l5", emoji: "⭐", title: "Level 5: Sight Words & Fluency",
    desc: "Tricky words you cannot sound out, then read smoothly.",
    activities: [
      { id: "l5a", type: "words", title: "Read the tricky words",
        items: [
          {w:"the"},{w:"said"},{w:"was"},{w:"they"},{w:"could"},{w:"would"},
          {w:"because"},{w:"friend", syl:"friend"},{w:"people", syl:"peo-ple"},{w:"through"},{w:"enough", syl:"e-nough"},{w:"again", syl:"a-gain"}
        ]},
      { id: "l5b", type: "sentences", title: "Fluency: read smoothly",
        items: [
          "My friend said they could come again.",
          "People walked through the park because it was a sunny day.",
          "We would have enough time if we left early.",
          "The children laughed and ran across the field after school."
        ]},
      { id: "l5c", type: "sentences", title: "Fluency: a short story",
        items: splitSentences("Ana woke up early on Saturday. She helped her mother cook breakfast. Then she walked to the market with her brother. They bought fresh fish and ripe mangoes. On the way home, they waved to their neighbors.") }
    ]
  },
  {
    id: "l6", emoji: "🧩", title: "Level 6: Vocabulary & Word Parts",
    desc: "Prefixes, suffixes, synonyms, antonyms and context clues.",
    activities: [
      { id: "l6a", type: "quiz", title: "Prefixes and suffixes",
        items: [
          {q:"The prefix un- means \"not\". What does unhappy mean?", say:"unhappy", options:["very happy","not happy","happy again"], a:1},
          {q:"The prefix re- means \"again\". What does rewrite mean?", say:"rewrite", options:["write again","not write","write well"], a:0},
          {q:"The suffix -less means \"without\". What does careless mean?", say:"careless", options:["full of care","without care","care again"], a:1},
          {q:"The suffix -ful means \"full of\". What does joyful mean?", say:"joyful", options:["without joy","full of joy","joy again"], a:1},
          {q:"The prefix pre- means \"before\". What does preview mean?", say:"preview", options:["look before","look after","not look"], a:0},
          {q:"The suffix -ness changes kind into a noun. Which word is that noun?", say:"kindness", options:["kindly","kindness","unkind"], a:1}
        ]},
      { id: "l6b", type: "quiz", title: "Synonyms and antonyms",
        items: [
          {q:"Which word means the SAME as big?", say:"big", options:["large","tiny","thin"], a:0},
          {q:"Which word means the OPPOSITE of hot?", say:"hot", options:["warm","cold","dry"], a:1},
          {q:"Which word means the SAME as happy?", say:"happy", options:["sad","angry","glad"], a:2},
          {q:"Which word means the OPPOSITE of early?", say:"early", options:["late","soon","quick"], a:0},
          {q:"Which word means the SAME as begin?", say:"begin", options:["finish","start","stop"], a:1},
          {q:"Which word means the OPPOSITE of brave?", say:"brave", options:["strong","bold","afraid"], a:2}
        ]},
      { id: "l6c", type: "quiz", title: "Context clues",
        items: [
          {q:"\"The soup was so scalding that Jun had to wait before eating it.\" What does scalding mean?", options:["very hot","very salty","very cold"], a:0},
          {q:"\"Mara is timid. She hides behind her mother when she meets new people.\" What does timid mean?", options:["loud","shy","funny"], a:1},
          {q:"\"The path was narrow, so only one person could walk through at a time.\" What does narrow mean?", options:["not wide","very long","very steep"], a:0},
          {q:"\"After running, Ben was exhausted and fell asleep right away.\" What does exhausted mean?", options:["very hungry","very tired","very happy"], a:1}
        ]}
    ]
  },
  {
    id: "l7", emoji: "🧠", title: "Level 7: Comprehension",
    desc: "Read a passage, then find main idea, details and inferences.",
    activities: [
      { id: "l7a", type: "passage", title: "Passage: The Little Seed", passage: PASSAGES.seed,
        items: [
          {q:"Where did Mina find the seed?", options:["In the garden","At school","In the market"], a:0},
          {q:"What did Mina do right after she found the seed?", options:["She watered it","She dug a small hole","She ate it"], a:1},
          {q:"What did Mina give the seed every morning?", options:["Food","Sunlight","Water"], a:2},
          {q:"What will probably happen next?", options:["The seed will disappear","The shoot will grow into a tomato plant","Mina will move away"], a:1},
          {q:"In this passage, shoot means:", options:["to fire a ball","a young plant just starting to grow","a loud noise"], a:1}
        ]},
      { id: "l7b", type: "sentences", title: "Read-aloud: The Little Seed", items: splitSentences(PASSAGES.seed) },
      { id: "l7c", type: "passage", title: "Passage: Ready for the Typhoon", passage: PASSAGES.typhoon,
        items: [
          {q:"What is the main idea of the passage?", options:["Typhoons are fun to watch","Preparing early helps a family stay safe","Roofs are made of rope"], a:1},
          {q:"Why did Lito put the papers in a plastic bag?", options:["To keep them dry","To throw them away","To give them to a friend"], a:0},
          {q:"Which item was NOT packed?", options:["A flashlight","A radio","A tent"], a:2},
          {q:"What did Lito's father do?", options:["Filled bottles with water","Tied the roof with ropes","Packed canned food"], a:1},
          {q:"In this passage, calm means:", options:["peaceful, not worried","loud and busy","very hungry"], a:0}
        ]},
      { id: "l7d", type: "sentences", title: "Read-aloud: Ready for the Typhoon", items: splitSentences(PASSAGES.typhoon) }
    ]
  }
];

/* =========================================================
   EXTRA PRACTICE + LEVEL 8 (Grade 6 Challenge)
   ========================================================= */
function addActs(levelId, acts){
  LEVELS.find(l => l.id === levelId).activities.push(...acts);
}

addActs("l1", [
  { id: "l1d", type: "words", title: "More short words",
    items: [{w:"bag"},{w:"fox"},{w:"jam"},{w:"leg"},{w:"mud"},{w:"nut"},{w:"web"},{w:"zip"},{w:"van"},{w:"wet"},{w:"yes"},{w:"kid"}] },
  { id: "l1e", type: "quiz", title: "Which word rhymes?",
    items: [
      {q:"Which word rhymes with sun?", say:"sun", options:["run","pen","bed"], a:0},
      {q:"Which word rhymes with pig?", say:"pig", options:["pan","big","hut"], a:1},
      {q:"Which word rhymes with hen?", say:"hen", options:["hat","bus","ten"], a:2},
      {q:"Which word rhymes with mop?", say:"mop", options:["top","map","mud"], a:0},
      {q:"Which word rhymes with bed?", say:"bed", options:["bad","red","bud"], a:1}
    ]},
  { id: "l1f", type: "sentences", title: "More sentences",
    items: ["Ben has a red bag.","The fox hid in the box.","A wet dog ran to the van.","The pup sat in the sun."] }
]);

addActs("l2", [
  { id: "l2d", type: "words", title: "More blends and digraphs",
    items: [{w:"chair"},{w:"thumb"},{w:"wheel"},{w:"shark"},{w:"flag"},{w:"sleep"},{w:"drum"},{w:"spring"},{w:"string"},{w:"splash"},{w:"three"},{w:"clock"}] },
  { id: "l2e", type: "quiz", title: "Sounds and rhymes",
    items: [
      {q:"Which word starts with the same sound as ship?", say:"ship", options:["shop","chop","stop"], a:0},
      {q:"Which word starts with the same sound as chair?", say:"chair", options:["table","shirt","cheese"], a:2},
      {q:"Which word rhymes with fish?", say:"fish", options:["dish","dash","dock"], a:0},
      {q:"Which word starts with the same sound as thumb?", say:"thumb", options:["tub","think","ship"], a:1},
      {q:"Which word starts with the same blend as black?", say:"black", options:["brick","block","back"], a:1},
      {q:"Which word starts with the same blend as frog?", say:"frog", options:["flat","star","fresh"], a:2}
    ]},
  { id: "l2f", type: "sentences", title: "More sentences",
    items: ["Three ships sail past the sunny beach.","The shark swam under the splashing waves.","Chip put the clock on the shelf.","Frank sleeps on a thick blanket."] }
]);

addActs("l3", [
  { id: "l3d", type: "words", title: "More long vowel words",
    items: [{w:"train"},{w:"green"},{w:"road"},{w:"night"},{w:"tree"},{w:"goat"},{w:"pie"},{w:"cry"},{w:"glue"},{w:"blue"},{w:"stay"},{w:"coat"}] },
  { id: "l3e", type: "quiz", title: "Find the long vowel",
    items: [
      {q:"Which word has the long a sound, like cake?", options:["tap","tin","tape"], a:2},
      {q:"Which word has the long i sound, like kite?", options:["bike","big","bin"], a:0},
      {q:"Which word has the long o sound, like boat?", options:["not","nose","net"], a:1},
      {q:"Which word has the long e sound, like feet?", options:["fed","fan","feet"], a:2},
      {q:"Which word has the long u sound, like cube?", options:["cube","cub","cut"], a:0}
    ]},
  { id: "l3f", type: "sentences", title: "More sentences",
    items: ["The green train rides slowly down the road.","A goat stands near the tree.","I will stay at home when it rains.","The blue coat is by the door."] }
]);

addActs("l4", [
  { id: "l4d", type: "words", title: "More big words",
    items: [
      {w:"tomato", syl:"to-ma-to"},{w:"chocolate", syl:"choc-o-late"},{w:"family", syl:"fam-i-ly"},{w:"holiday", syl:"hol-i-day"},
      {w:"different", syl:"dif-fer-ent"},{w:"important", syl:"im-por-tant"},{w:"adventure", syl:"ad-ven-ture"},{w:"mountain", syl:"moun-tain"},
      {w:"classroom", syl:"class-room"},{w:"dictionary", syl:"dic-tion-ar-y"},{w:"celebrate", syl:"cel-e-brate"},{w:"yesterday", syl:"yes-ter-day"}
    ]},
  { id: "l4e", type: "quiz", title: "Count the syllables",
    items: [
      {q:"How many syllables do you hear?", say:"pencil", options:["1","2","3"], a:1},
      {q:"How many syllables do you hear?", say:"tomato", options:["2","3","4"], a:1},
      {q:"How many syllables do you hear?", say:"classroom", options:["2","3","4"], a:0},
      {q:"How many syllables do you hear?", say:"family", options:["2","3","4"], a:1},
      {q:"How many syllables do you hear?", say:"dictionary", options:["3","4","5"], a:1},
      {q:"How many syllables do you hear?", say:"mountain", options:["2","3","4"], a:0}
    ]},
  { id: "l4f", type: "sentences", title: "More sentences",
    items: ["My family will celebrate the holiday on Sunday.","Yesterday we climbed a tall mountain.","It is important to read a different book every week.","The dictionary helps us learn new words."] }
]);

addActs("l5", [
  { id: "l5d", type: "words", title: "More tricky words",
    items: [{w:"were"},{w:"where"},{w:"there"},{w:"their"},{w:"once"},{w:"other"},{w:"only"},{w:"water"},{w:"very"},{w:"many"},{w:"after"},{w:"every"}] },
  { id: "l5e", type: "sentences", title: "More fluency sentences",
    items: ["Where were they when the bell rang?","There is only one way through the door.","Their teacher gave every pupil some water.","After school, many friends came once again."] },
  { id: "l5f", type: "sentences", title: "Fluency: Rico and Lea",
    items: splitSentences("Rico and Lea walked to school together. They were very early, so they sat under a big tree. Rico read a book about the ocean. Lea drew a picture of a boat. When the bell rang, they ran to their classroom.") }
]);

addActs("l6", [
  { id: "l6d", type: "quiz", title: "Compound words",
    items: [
      {q:"Which two words make sunflower?", say:"sunflower", options:["sun + flower","son + flour","sun + flow"], a:0},
      {q:"Which two words make rainbow?", say:"rainbow", options:["ran + bow","rain + bow","rain + bowl"], a:1},
      {q:"Which two words make notebook?", say:"notebook", options:["not + book","nose + book","note + book"], a:2},
      {q:"Which two words make homework?", say:"homework", options:["home + work","hum + work","hope + work"], a:0},
      {q:"Which two words make classmate?", say:"classmate", options:["glass + mate","class + mate","class + meat"], a:1}
    ]},
  { id: "l6e", type: "quiz", title: "Words with two meanings",
    items: [
      {q:"\"A bat flew out of the cave at night.\" What is a bat here?", options:["an animal that flies","a stick for hitting a ball","to blink"], a:0},
      {q:"\"The pupils sat on the bank of the river.\" What is bank here?", options:["a place for money","the side of a river","to lean"], a:1},
      {q:"\"The dog's bark was very loud.\" What is bark here?", options:["the sound a dog makes","the outside of a tree","to shout"], a:0},
      {q:"\"The bark of the tree is rough.\" What is bark here?", options:["the sound a dog makes","to shout","the outside of a tree"], a:2}
    ]},
  { id: "l6f", type: "quiz", title: "Homophones",
    items: [
      {q:"I can ___ the birds singing.", options:["hear","here"], a:0},
      {q:"Please come ___ now.", options:["hear","here"], a:1},
      {q:"The ___ is shining brightly.", options:["son","sun"], a:1},
      {q:"___ books are on the table.", options:["There","Their","They're"], a:1},
      {q:"I have ___ cats at home.", options:["to","too","two"], a:2}
    ]}
]);

const PASSAGES2 = {
  mangrove: "Mangrove forests grow along coastlines in warm countries like the Philippines. Their tangled roots act like a wall that slows down strong waves during storms. Because of this, mangroves protect nearby communities from flooding. The roots also provide a safe nursery for young fish, crabs, and shrimp, which supports the livelihood of local fishers. Sadly, many mangroves have been cut down to make fishponds and to build resorts. Scientists and volunteers are now replanting mangrove seedlings, hoping to restore what was lost.",
  fair: "Carlo had worked on his volcano model for three weeks. On the morning of the science fair, his hands felt cold and his stomach felt strange. He practiced his speech once more in the mirror. When the judges arrived, he took a deep breath and began to explain how the model worked. At first his voice shook, but soon it grew steady. By the end, the judges were nodding and smiling. Carlo walked back to his seat feeling proud."
};

LEVELS.push({
  id: "l8", emoji: "🏆", title: "Level 8: Grade 6 Challenge",
  desc: "Long words, word roots, figurative language and longer passages.",
  activities: [
    { id: "l8a", type: "words", title: "Read the long words",
      items: [
        {w:"environment", syl:"en-vi-ron-ment"},{w:"responsibility", syl:"re-spon-si-bil-i-ty"},{w:"communication", syl:"com-mu-ni-ca-tion"},
        {w:"temperature", syl:"tem-per-a-ture"},{w:"independent", syl:"in-de-pen-dent"},{w:"opportunity", syl:"op-por-tu-ni-ty"},
        {w:"imagination", syl:"i-mag-i-na-tion"},{w:"democracy", syl:"de-moc-ra-cy"},{w:"particularly", syl:"par-tic-u-lar-ly"},
        {w:"extraordinary", syl:"ex-traor-di-nar-y"},{w:"necessary", syl:"nec-es-sar-y"},{w:"unfortunately", syl:"un-for-tu-nate-ly"}
      ]},
    { id: "l8b", type: "words", title: "School and science words",
      items: [
        {w:"pronunciation", syl:"pro-nun-ci-a-tion"},{w:"volunteer", syl:"vol-un-teer"},{w:"achievement", syl:"a-chieve-ment"},
        {w:"knowledge", syl:"knowl-edge"},{w:"government", syl:"gov-ern-ment"},{w:"conservation", syl:"con-ser-va-tion"},
        {w:"typhoon", syl:"ty-phoon"},{w:"evacuation", syl:"e-vac-u-a-tion"},{w:"scientific", syl:"sci-en-tif-ic"},
        {w:"experiment", syl:"ex-per-i-ment"},{w:"geography", syl:"ge-og-ra-phy"},{w:"disappointed", syl:"dis-ap-point-ed"}
      ]},
    { id: "l8c", type: "sentences", title: "Fluency: long sentences",
      items: [
        "The government announced that schools would close because a typhoon was approaching.",
        "Volunteers worked together to clean the river and protect the environment.",
        "Scientists conduct an experiment to test whether their prediction is correct.",
        "It is necessary to show responsibility when using our natural resources."
      ]},
    { id: "l8d", type: "quiz", title: "Word roots",
      items: [
        {q:"The root tele means far. What does a telescope help you do?", say:"telescope", options:["see things far away","hear very quietly","write quickly"], a:0},
        {q:"The root port means carry. What does transport mean?", say:"transport", options:["stay in one place","build a house","carry from place to place"], a:2},
        {q:"The root bio means life. What does biology study?", say:"biology", options:["rocks","living things","stars"], a:1},
        {q:"The root graph means write. What is an autograph?", say:"autograph", options:["a long book","a person's own signature","a drawing machine"], a:1},
        {q:"The prefix inter- means between. What does international mean?", say:"international", options:["between nations","inside a house","before school"], a:0},
        {q:"The root aqua means water. What does an aquarium hold?", say:"aquarium", options:["sand and rocks","books","water and fish"], a:2}
      ]},
    { id: "l8e", type: "quiz", title: "Figurative language",
      items: [
        {q:"\"The classroom was a zoo.\" This is an example of:", options:["a rhyme","a metaphor","a fact"], a:1},
        {q:"\"As brave as a lion.\" This is an example of:", options:["a simile","an opposite","a question"], a:0},
        {q:"\"It is raining cats and dogs.\" This means:", options:["animals are falling","it is raining softly","it is raining very hard"], a:2},
        {q:"\"She has a heart of gold.\" This means she is:", options:["very rich","very kind","very sick"], a:1},
        {q:"\"The wind whispered through the trees.\" This is an example of:", options:["a fact","a question","personification"], a:2}
      ]},
    { id: "l8f", type: "passage", title: "Passage: Why We Protect Mangroves", passage: PASSAGES2.mangrove,
      items: [
        {q:"What is the main idea of the passage?", options:["Mangroves are important and need to be protected","Fishponds are better than forests","Storms only happen in warm countries"], a:0},
        {q:"How do mangrove roots protect communities?", options:["They make the water warm","They slow down strong waves","They stop the rain"], a:1},
        {q:"Why are mangroves important to local fishers?", options:["They are a safe nursery for young fish, crabs and shrimp","They give shade to boats","They make fish bigger"], a:0},
        {q:"What has caused the loss of many mangroves?", options:["Strong storms only","Too much rain","People cutting them down for fishponds and resorts"], a:2},
        {q:"In this passage, restore means:", options:["to bring back to an earlier condition","to cut down","to sell"], a:0},
        {q:"What will probably happen if more mangroves are cut down?", options:["Coastal communities may face more flooding","The waves will get smaller","More fish will live there"], a:0}
      ]},
    { id: "l8g", type: "sentences", title: "Read-aloud: Why We Protect Mangroves", items: splitSentences(PASSAGES2.mangrove) },
    { id: "l8h", type: "passage", title: "Passage: The Science Fair", passage: PASSAGES2.fair,
      items: [
        {q:"How did Carlo feel before he presented?", options:["Bored","Nervous","Angry"], a:1},
        {q:"Which detail shows how he felt?", options:["He worked for three weeks","His hands felt cold and his stomach felt strange","He built a volcano"], a:1},
        {q:"What happened to Carlo's voice as he spoke?", options:["It shook at first, then grew steady","It got louder and louder","It disappeared"], a:0},
        {q:"How did Carlo feel at the end?", options:["Proud","Worried","Sleepy"], a:0},
        {q:"What is the best lesson of the story?", options:["Never speak in front of people","Practice and courage can help you succeed","Volcanoes are dangerous"], a:1},
        {q:"In this passage, steady means:", options:["calm and not shaking","very fast","very loud"], a:0}
      ]},
    { id: "l8i", type: "sentences", title: "Read-aloud: The Science Fair", items: splitSentences(PASSAGES2.fair) }
  ]
});

/* =========================================================
   VISUALS: level colors, picture cards, passage art
   ========================================================= */
const LEVEL_COLORS = {
  l1:"#ef476f", l2:"#f77f00", l3:"#d99a00", l4:"#06a77d",
  l5:"#118ab2", l6:"#7b4bd6", l7:"#d6459b", l8:"#3d5a80"
};

// A picture shows next to a word when it is a thing kids can see
const PICS = {
  cat:"🐱",dog:"🐶",sun:"☀️",pen:"🖊️",pig:"🐷",bus:"🚌",hat:"🎩",map:"🗺️",bed:"🛏️",cup:"🥤",
  bag:"🎒",fox:"🦊",jam:"🍓",leg:"🦵",nut:"🥜",web:"🕸️",van:"🚐",wet:"💧",yes:"✅",kid:"🧒",
  ship:"🚢",whale:"🐋",black:"⚫",frog:"🐸",plant:"🌱",branch:"🌿",think:"💭",shell:"🐚",crab:"🦀",
  chair:"🪑",thumb:"👍",wheel:"🛞",shark:"🦈",flag:"🚩",sleep:"😴",drum:"🥁",spring:"🌸",string:"🧵",
  splash:"💦",three:"3️⃣",clock:"🕒",
  cake:"🎂",bike:"🚲",rain:"🌧️",feet:"🦶",boat:"⛵",light:"💡",moon:"🌙",play:"🛝",snow:"❄️",cloud:"☁️",
  bright:"🌟",train:"🚆",green:"🟢",road:"🛣️",night:"🌃",tree:"🌳",goat:"🐐",pie:"🥧",cry:"😢",blue:"🔵",coat:"🧥",
  pencil:"✏️",window:"🪟",rabbit:"🐰",basket:"🧺",banana:"🍌",umbrella:"☂️",elephant:"🐘",computer:"💻",
  vegetable:"🥦",beautiful:"🌺",library:"📚",remember:"🧠",tomato:"🍅",chocolate:"🍫",family:"👨‍👩‍👧",
  holiday:"🎉",mountain:"⛰️",classroom:"🏫",dictionary:"📖",celebrate:"🥳",yesterday:"📅",adventure:"🧭",
  friend:"🤝",people:"👥",water:"💧",again:"🔁",
  environment:"🌍",temperature:"🌡️",communication:"💬",imagination:"🦄",democracy:"🗳️",typhoon:"🌀",
  experiment:"🧪",geography:"🌏",volunteer:"🙋",knowledge:"🧠",government:"🏛️",scientific:"🔬",
  evacuation:"🏃",conservation:"♻️",achievement:"🏆",pronunciation:"🗣️",disappointed:"😞",
  ocean:"🌊",book:"📕",mango:"🥭",mangoes:"🥭",fish:"🐟",market:"🛒",school:"🏫"
};

// Picture banner for passages and story read-alouds, by activity id
const ART = {
  l5c:"🛒🐟🥭👫", l5f:"🏫🌳📚⛵",
  l7a:"🌱🍅💧☀️", l7b:"🌱🍅💧☀️", l7c:"🌀🏠🔦📻", l7d:"🌀🏠🔦📻",
  l8f:"🌊🌿🦀🐟", l8g:"🌊🌿🦀🐟", l8h:"🌋🔬🏆😊", l8i:"🌋🔬🏆😊"
};

/* =========================================================
   SITE OWNER – change the name here and it updates everywhere
   ========================================================= */
const SITE = {
  owner: "Teacher Jollie",
  title: "Teacher Jollie's Reading Fundamentals",
  corner: "Teacher Jollie's Reading Corner"
};
