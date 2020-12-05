//Variable Declarations
var canvas = document.getElementById('mainCanvas'),
    
    ctx = canvas.getContext('2d'),
    
    //Evid objects
    victim,
    knife,
    blood,
    motel,
    report,
    note,
    radio,
    room,
    
    //Booleans
    hover1,
    hover2,
    hover3,
    hover4,
    hover5,
    hover6,
    hover7,
    hover8,
    
    check1,
    check2,
    check3,
    check4,
    check5,
    check6,
    check7,
    check8,
    
    buffer1,
    buffer2,
    buffer3,
    buffer4,
    buffer5,
    buffer6,
    buffer7,
    buffer8,
    
    play = true,
    
    //Number that keeps track of scenes
    sceneCount = 0,
    
    //Holds the current Evid object being looked at by the player
    currBox,
    
    //Image objects
    jc_neutral = new Image(),
    jc_thinking = new Image(),
    jc_confident = new Image(),
    ss_neutral = new Image(),
    ss_nervous = new Image(),
    ss_surprised = new Image(),
    eh_neutral = new Image(),
    eh_smirk = new Image(),
    eh_thinking = new Image(),
    oh_neutral = new Image(),
    oh_angry = new Image(),
    oh_serious = new Image(),
    oh_shocked = new Image(),
    empty = new Image(),
    entrance_back = new Image(),
    motel_back = new Image(),
    roof_back = new Image(),
    title_page = new Image(),

    //Array of the top line of text by scene
    text1Array = [
        'This seems to be the place . . .',
        'Yes, I am Investigator Hawke. You must be',
        "That's me! Justin Case, Ace Detective at",
        '. . .Right. Anyways, we received a call about',
        "From the looks of things, whatever happened was far",
        "Precisely. Now that you're here, we can finally begin our",
        'Right, of course!',
        'I should look for anything that stands out,',
        '',
        'Is that a kitchen knife?',
        "Yes. Forensics says our victim's fingerprints are on",
        'Interesting. Why would it be out here?',
        'Knife has been added to Evidence',
        "The victim's name was Tanya Felling, a local journalist.",
        "So she was shot? The fall didn't kill her?",
        "That's right. Even stranger, we haven't found the bullet.",
        'Strange indeed. And . . . why are there scratches all over her hands?',
        'Victim has been added to Evidence',
        "Something's bothering me about all this blood.",
        "Come on, newbie. What detective hasn't seen blood before?",
        "That isn't what I meant. Look at the strange pattern",
        'I see what you mean. If she was shot while on the ground here,',
        'Great minds think alike, as they say!',
        '. . .Right, I suppose they do.',
        'Blood has been added to Evidence',
        "The 'Homey Side Motel', huh? How . . . quaint.",
        'She was renting the room on the second floor.',
        "I'll say. Look, the first floor windows are even",
        'Motel added to Evidence',
        'A gunshot victim without a bullet, a knife with no stab wound,',
        'Excuse me, gentlemen.',
        'Oh, hello. Are you the owner of this motel?',
        'My, my you truly are quite the detective! Yes, my name is',
        'I see. Then you were the person who called the police?',
        'Of course! I hope you can wrap this . . . business up soon.',
        "That 'stain' used to be a person, Mr. O'Hare.",
        'Yes . . . my apologies. Anyways,',
        "We should probably search the victim's room for evidence.",
        "Agreed. Lead the way, Mr. O'Hare.",
        'Here is the room. Oh, and before I forget . . .',
        'What is this? Some sort of report?',
        'Yes. Just before everything happened, a blackout occurred!',
        "That's quite a strange coincidence . . .",
        'Report has been added to Evidence',
        'We should search this room thoroughly. It may',
        'Agreed! Leave no piece of evidence unturned!',
        '',
        "If I've learned anything, it's that there is",
        'I sincerely hope your deductive reasoning goes',
        'Hold that thought. I found something.',
        'A piece of paper? What does it say?',
        'It says: I know your secret, Tanya.',
        "That seems . . . pretty important.",
        "I hate to say 'I told you so', but . . .",
        'Note has been added to Evidence.',
        "I haven't seen one of these old radios in years.",
        "This thing is a radio? Why is it so big?",
        'Geez, newbie. You really are a greenhorn.',
        '. . .',
        'Um . . . nothing happened',
        "That's strange. The volume is turned up to the maximum setting.",
        "The clock display is broken too, it's on 12:00.",
        'Radio has been added to Evidence.',
        "Wow, this room is really a mess.",
        'Indeed. The drawers have been turned inside out.',
        'Despite the mess, there is a good view outside from the window.',
        "Strange. There's a cutlery set in one of these drawers,",
        'Could that be . . .',
        'Room has been added to Evidence',
        'I still feel like we have more questions than answers.',
        'U-um . . . detectives?',
        'Hm? Who might you be?',
        'My name is Shovely Scott. Oh! I mean, Scott Shovely.',
        'The third floor? Then did you know Ms. Felling?',
        'Well, yes, in passing. I came to ask about your investigation.',
        "There's nothing to be nervous about, Mr. Shovely!",
        'O-oh! Well, yes. I guess I have nothing to hide, after all.',
        "Alright, now the real work begins. There's bound to be a lie",
        'Mr. Shovely, where were you around 9:00 pm tonight?',
        "Oh, probably in my room. I'm usually up all night watching",
        'Up all night watching television, eh?',
        "No, that doesn't seem right. . . ",
        'Mr. Shovely, I believe you are mistaken. You could not',
        'What? But I never miss an episode!',
        'I admire your dedication, but that cannot be true.',
        "O-oh, yes, that does make sense, doesn't it . . .",
        'I was frightened by the blackout, so I went up to the roof',
        "Shovely didn't see the victim on the roof after the blackout?",
        'Please stop lying to me, Mr. Shovely.',
        'W-what? How did you know I was lying?',
        "We found this note in Ms. Fellings' room. It told her to be on the roof",
        "I'm sorry detective. I did see Ms. Felling on the roof. I greeted her,",
        'Nothing else happened? No, something is still missing from his story.', //92
        'The victim most likely had a knife with her before she died. But',
        'If Ms. Felling took a knife with her after receiving the note,',
        "Mr. Shovely, I've been meaning to ask you about those bandages.",
        'H-huh!? W-wait, how could you possibly have figured . . .',
        'Whoa, newbie. Are you suggesting. . .',
        'I am. Before she died, Ms. Felling attacked and wounded',
        'Fine! I admit it! I killed her! I killed her!',
        'An accident? Explain yourself, Mr. Shovely.',
        'The truth is, I went up to the rooftop before the blackout.',
        'Why did you go up to the roof in the first place?',
        "That note you said you found in Ms. Fellings' room . . .",
        'Anyways, I was waiting on the roof when Ms. Felling came up. I said',
        'She cut my arm, and I tried to wrestle the knife away from her.',
        "I was so shocked I couldn't move, but then I heard a loud bang and",
        "Well, I guess that's that. We'll have to take you down to",
        'Excellent work detectives! I always figured something was off',
        "Wait one moment, Investigator Hawke. We're not done here.",
        "What do you mean, detective? He confessed!",
        "I think the newbie is saying that there's",
        "Exactly. I'd like to take a look at the roof,",
        '. . . Of course. Please follow me.',
        "I'm getting close to the truth, I can feel it!",
        "I hope you know what you're looking for, newbie.",
        "Of course! I know exactly what I'm looking for.",
        '. . . I think.',
        '',
        'Here it is. Our literal smoking gun.',
        'I just finished dusting it. No prints, but one bullet',
        'Ha! It looks like Mr. Shovely was kind enough to',
        "Wait a minute! That's not mine! I've never shot anyone!",
        'So, what now? Anything coming together for you?',
        "I think so. Time to crack this case wide open!",
        "Mr. O'Hare, I think it's time I asked you a couple of questions.",
        "I don't think that will be necessary. Don't you already",
        'Just humor me. Besides, if you have nothing to hide,',
        ". . . Very well, detective. I'll play your game. Ask away.",
        "So, Mr. O'Hare, where were you at the time of the murder?",
        "I was in the security office on the first floor, watching",
        'Then, of course, the blackout occurred. I was in the office trying',
        'So, he was in the first floor office the entire time?',
        "Mr. O'Hare, I noticed that the first floor of your motel",
        'Yes, we had an incident with some delinquents',
        'I was just wondering how you were able to see Ms. Felling fall',
        'Grrk! W-well . . . oh! Yes, now I remember!',
        'I was worried about my tenants after the blackout, so I',
        "But the only window on the second floor is in Ms. Fellings' room.",
        "Well, it was that stupid radio! It was playing much too loudly, so I",
        "He went into Ms. Fellings' room because her radio was too loud?",
        "That's impossible, Mr. O'Hare. You said it yourself: you went upstairs",
        "Hmph. What's your point detective?",
        'I caught you in a lie. You have no reason to',
        "You're right, I lied. But that doesn't matter, does it?",
        "He's right, newbie. As shady as lying is, it doesn't prove he killed",
        "Dang it! I'm certain that O'Hare is the culprit, but nothing",
        'No, I can do this. I just need to follow the logic.',
        ''
        
    ],
    
    //Array of the bottom line of text by scene
    text2Array = [
        'Investigator Hawke? Are you here?',
        'the new detective. Justin Case, I presume?',
        'your service! A pleasure to be working with you.',
        'half an hour ago. It seems a woman fell off a building.',
        "from a simple fall, don't you think?",
        "investigation. Let's see what you can do, newbie.",
        '',
        'and see if anything clicks.',
        '',
        '',
        'the handle. The blood on the blade is unidentified, though.',
        '',
        '',
        'Cause of death was a single gunshot wound to the chest, at 9 pm.',
        '',
        '',
        '',
        '',
        '',
        '',
        'of the blood splatter. It spreads out farther than it should.',
        'her blood would not be so spread out.',
        '',
        '',
        '',
        'This is where the victim lived?',
        'Not exactly first class living, is it?',
        "boarded up. Not very 'Homey' to me.",
        '',
        "and a run-down motel. What's really going on here?",
        '',
        '',
        "Ray D. O'Hare. I am the owner of this fine establishment.",
        '',
        'How can I offer first class living with this stain out front?',
        '',
        'will you be investigating inside?',
        '',
        '',
        'I believe this may be of assistance to your investigation.',
        '',
        'Unfortunately it disabled everything, including our security cameras.',
        '',
        '',
        'tell us more about the victim and how she died.',
        '',
        '',
        'always an important piece of evidence left in the trash.',
        'beyond digging through the garbage, newbie.',
        '',
        '',
        'Meet me on the roof at 8:55 . . . or else.',
        '',
        '',
        '',
        '',
        '',
        'Watch, if I press this button here . . . *click*',
        '',
        '',
        '',
        'The blackout probably short-circuited it.',
        '',
        "There's clothes spread everywhere.",
        'Was the victim looking for something?',
        "Oh, and it's unlocked.",
        "but it's missing a knife . . .",
        '',
        '',
        '',
        '',
        '',
        'I live in the room on the third floor.',
        '',
        'Um, when will you be done? All this excitement makes me nervous.',
        'Actually, would you mind answering a few questions for me?',
        '',
        'in his statement. I just need to select the evidence to prove it.',
        '',
        'my soaps on the television. I never miss an episode!',
        "Something tells me that's not the case. . .",
        "Let's try again.",
        'have been watching television at 9:00 pm.',
        '',
        'There was a blackout at 9:00 pm, so your T.V. would have been useless.',
        "Ah, now I remember!",
        'to get some fresh air. But I never saw Ms. Felling.',
        "Can I prove the victim's whereabouts at that time?",
        'You must have seen Ms. Felling on the roof tonight.',
        '',
        'at 8:55. You would have seen her when you went up after the blackout.',
        'and she went back downstairs soon after. Nothing else happened.',
        "Was there something about the victim that Shovely didn't mention?",
        'would she have had it on the roof? Where did the knife come from?',
        'she must have planned on attacking whoever sent it. Which means . . .',
        'Do they happen to be covering a knife wound?',
        '',
        '',
        'Mr. Shovely on the rooftop.',
        "I'm so sorry . . . it was an accident!",
        '',
        "I remember because I could hear Ms. Fellings' radio from downstairs.",
        '',
        'I got one too. But it said to go to the roof at 8:50.',
        'hello, but as soon as she saw me, she lunged at me with that knife!',
        'Then I pushed her . . . and she tripped and fell!',
        'I looked down and she was dead! I killed her!',
        'the station for further questioning, Mr. Shovely.',
        'about that man. Thank you for cracking the case!',
        '',
        "You've got your man!",
        'something else he wants to check.',
        "Mr. O'Hare, if that's alright.",
        '',
        'I just need one more piece of the puzzle . . .',
        '',
        '',
        '',
        '',
        '',
        'is missing, and it was definitely fired recently.',
        'leave his weapon behind.',
        '',
        '',
        '',
        '',
        'have everything you need to convict Mr. Shovely?',
        "there's no need to worry, is there?",
        '',
        '',
        'the camera feed. Mr. Shovely had left his room, as did Ms. Felling.',
        'to fix it when I saw Ms. Felling hit the ground outside my window.',
        "Isn't there a piece of evidence that makes that unlikely?",
        'had sustained some minor damage.',
        'a few days ago. So what?',
        'through the boarded up window.',
        '',
        'went upstairs to check on them. I saw her fall from the second floor.',
        "Why would you enter her room if she wasn't there?",
        "went in to turn it down. That's how I looked through the window.",
        "What piece of evidence proves him wrong?",
        "after the blackout. The radio couldn't have been playing.",
        '',
        "be in Ms. Fellings' room at the time of the crime.",
        "It's not like that is evidence that I am a murderer.",
        'anyone. Unless you can prove it, we have to wrap things up here.',
        'is adding up. Is this as far as I go? Is this how it ends?',
        'I need to think back over this entire case from the beginning.',
        ''
        
    ],
    
    //Array of the speaker text by scene
    speakerArray = [
        'Justin',
        'Hawke',
        'Justin',
        'Hawke',
        'Justin',
        'Hawke',
        'Justin',
        'Justin',
        '',
        'Justin',
        'Hawke',
        'Justin',
        '',
        'Hawke',
        'Justin',
        'Hawke',
        'Justin',
        '',
        'Justin',
        'Hawke',
        'Justin',
        'Hawke',
        'Justin',
        'Hawke',
        '',
        'Justin',
        'Hawke',
        'Justin',
        '',
        'Justin',
        '???',
        'Justin',
        "O'Hare",
        'Justin',
        "O'Hare",
        'Justin',
        "O'Hare",
        'Hawke',
        'Justin',
        "O'Hare",
        'Justin',
        "O'Hare",
        'Justin',
        '',
        'Hawke',
        'Justin',
        '',
        'Justin',
        'Hawke',
        'Justin',
        'Hawke',
        'Justin',
        'Hawke',
        'Justin',
        '',
        'Hawke',
        'Justin',
        'Hawke',
        'Radio',
        'Justin',
        'Hawke',
        'Justin',
        '',
        'Justin',
        'Hawke',
        'Justin',
        'Hawke',
        'Justin',
        '',
        'Justin',
        '???',
        'Justin',
        'Shovely',
        'Justin',
        'Shovely',
        'Justin',
        'Shovely',
        'Justin',
        'Justin',
        'Shovely',
        'Justin',
        'Justin',
        'Justin',
        'Shovely',
        'Justin',
        'Shovely',
        'Shovely',
        'Justin',
        'Justin',
        'Shovely',
        'Justin',
        'Shovely',
        'Justin',
        'Justin',
        'Justin',
        'Justin',
        'Shovely',
        'Hawke',
        'Justin',
        'Shovely',
        'Justin',
        'Shovely',
        'Justin',
        'Shovely',
        'Shovely',
        'Shovely',
        'Shovely',
        'Hawke',
        "O'Hare",
        'Justin',
        "O'Hare",
        'Hawke',
        'Justin',
        "O'Hare",
        'Justin',
        'Hawke',
        'Justin',
        'Justin',
        '',
        'Justin',
        'Hawke',
        "O'Hare",
        'Shovely',
        'Hawke',
        'Justin',
        'Justin',
        "O'Hare",
        'Justin',
        "O'Hare",
        'Justin',
        "O'Hare",
        "O'Hare",
        'Justin',
        'Justin',
        "O'Hare",
        'Justin',
        "O'Hare",
        "O'Hare",
        'Justin',
        "O'Hare",
        'Justin',
        'Justin',
        "O'Hare",
        'Justin',
        "O'Hare",
        'Hawke',
        'Justin',
        'Justin',
        ''
    ],
    
    //Array of Images denoting the leftmost character by scene
    lcharArray = [
        jc_neutral,
        jc_neutral,
        jc_confident,
        jc_neutral,
        jc_thinking,
        jc_neutral,
        jc_confident,
        jc_thinking,
        empty,
        jc_thinking,
        jc_thinking,
        jc_thinking,
        jc_neutral,
        jc_neutral,
        jc_thinking,
        jc_thinking,
        jc_thinking,
        jc_neutral,
        jc_thinking,
        jc_thinking,
        jc_thinking,
        jc_neutral,
        jc_confident,
        jc_confident,
        jc_neutral,
        jc_thinking,
        jc_thinking,
        jc_neutral,
        jc_neutral,
        jc_thinking,
        jc_thinking,
        jc_neutral,
        jc_neutral,
        jc_thinking,
        jc_neutral,
        jc_neutral,
        jc_neutral,
        jc_neutral,
        jc_neutral,
        jc_neutral,
        jc_thinking,
        jc_thinking,
        jc_thinking,
        jc_neutral,
        jc_neutral,
        jc_confident,
        empty,
        jc_confident,
        jc_thinking,
        jc_thinking,
        jc_thinking,
        jc_neutral,
        jc_neutral,
        jc_confident,
        jc_neutral,
        jc_neutral,
        jc_thinking,
        jc_thinking,
        jc_thinking,
        jc_thinking,
        jc_thinking,
        jc_thinking,
        jc_neutral,
        jc_thinking,
        jc_thinking,
        jc_thinking,
        jc_neutral,
        jc_thinking,
        jc_neutral,
        jc_thinking,
        jc_thinking,
        jc_neutral,
        jc_neutral,
        jc_thinking,
        jc_thinking,
        jc_confident,
        jc_neutral,
        jc_thinking,
        jc_neutral,
        jc_neutral,
        jc_thinking,
        jc_thinking,
        jc_confident,
        jc_confident,
        jc_confident,
        jc_neutral,
        jc_neutral,
        jc_thinking,
        jc_confident,
        jc_neutral,
        jc_neutral,
        jc_neutral,
        jc_thinking,
        jc_thinking,
        jc_thinking,
        jc_neutral,
        jc_neutral,
        jc_neutral,
        jc_confident,
        jc_confident,
        jc_thinking,
        jc_thinking,
        jc_thinking,
        jc_thinking,
        jc_neutral,
        jc_thinking,
        jc_thinking,
        jc_thinking,
        jc_thinking,
        jc_neutral,
        jc_neutral,
        jc_neutral,
        jc_confident,
        jc_confident,
        jc_neutral,
        jc_neutral,
        jc_confident,
        jc_thinking,
        empty,
        jc_neutral,
        jc_neutral,
        jc_thinking,
        jc_thinking,
        jc_thinking,
        jc_confident,
        jc_neutral,
        jc_neutral,
        jc_neutral,
        jc_neutral,
        jc_thinking,
        jc_thinking,
        jc_thinking,
        jc_thinking,
        jc_confident,
        jc_neutral,
        jc_confident,
        jc_confident,
        jc_neutral,
        jc_thinking,
        jc_thinking,
        jc_thinking,
        jc_confident,
        jc_confident,
        jc_thinking,
        jc_thinking,
        jc_thinking,
        jc_thinking,
        empty,
        empty
    ],
    
    //Array of Images denoting the rightmost character by scene
    rcharArray = [
        empty,
        eh_neutral,
        eh_neutral,
        eh_thinking,
        eh_thinking,
        eh_neutral,
        empty,
        empty,
        empty,
        eh_neutral,
        eh_thinking,
        eh_thinking,
        empty,
        eh_neutral,
        eh_neutral,
        eh_thinking,
        empty,
        empty,
        eh_neutral,
        eh_smirk,
        eh_smirk,
        eh_thinking,
        eh_thinking,
        eh_smirk,
        empty,
        eh_neutral,
        eh_neutral,
        eh_neutral,
        empty,
        empty,
        oh_serious,
        oh_serious,
        oh_neutral,
        oh_neutral,
        oh_angry,
        oh_angry,
        oh_neutral,
        eh_neutral,
        eh_neutral,
        oh_neutral,
        oh_neutral,
        oh_neutral,
        oh_neutral,
        oh_neutral,
        empty,
        eh_neutral,
        empty,
        eh_neutral,
        eh_smirk,
        eh_smirk,
        eh_thinking,
        eh_thinking,
        eh_thinking,
        eh_thinking,
        empty,
        eh_neutral,
        eh_neutral,
        eh_smirk,
        eh_thinking,
        eh_thinking,
        eh_thinking,
        eh_thinking,
        empty,
        eh_neutral,
        eh_thinking,
        eh_thinking,
        eh_thinking,
        eh_neutral,
        empty,
        eh_neutral,
        ss_nervous,
        ss_nervous,
        ss_neutral,
        ss_neutral,
        ss_nervous,
        ss_nervous,
        ss_surprised,
        empty,
        ss_neutral,
        ss_nervous,
        empty,
        empty,
        ss_nervous,
        ss_surprised,
        ss_surprised,
        ss_nervous,
        ss_neutral,
        empty,
        ss_neutral,
        ss_surprised,
        ss_surprised,
        ss_nervous,
        empty,
        empty,
        ss_nervous,
        ss_nervous,
        ss_surprised,
        eh_thinking,
        ss_surprised,
        ss_surprised,
        ss_surprised,
        ss_nervous,
        ss_nervous,
        ss_neutral,
        ss_nervous,
        ss_surprised,
        ss_surprised,
        eh_thinking,
        oh_neutral,
        oh_shocked,
        oh_angry,
        eh_smirk,
        eh_smirk,
        oh_angry,
        empty,
        eh_neutral,
        eh_neutral,
        empty,
        empty,
        eh_neutral,
        eh_thinking,
        oh_neutral,
        ss_surprised,
        eh_neutral,
        eh_neutral,
        oh_serious,
        oh_angry,
        oh_angry,
        oh_neutral,
        oh_serious,
        oh_neutral,
        oh_serious,
        empty,
        oh_serious,
        oh_neutral,
        oh_neutral,
        oh_shocked,
        oh_neutral,
        oh_neutral,
        oh_serious,
        empty,
        oh_serious,
        oh_neutral,
        oh_neutral,
        oh_neutral,
        eh_neutral,
        empty,
        empty,
        empty
    ];

//Image Sources
jc_neutral.src = 'sprites\\Justin_Case_Neutral.png';

jc_thinking.src = 'sprites\\Justin_Case_Thinking.png';

jc_confident.src = 'sprites\\Justin_Case_Confident.png';

ss_nervous.src = 'sprites\\Scott_shovely_Nervous.png';

ss_neutral.src = 'sprites\\Scott_shovely_Neutral.png';

ss_surprised.src = 'sprites\\Scott_shovely_Surprised.png';

eh_neutral.src = 'sprites\\hawke_neutral_stern.png';

eh_smirk.src = 'sprites\\hawke_smirking.png';

eh_thinking.src = 'sprites\\hawke_thinking.png';

oh_neutral.src = 'sprites\\Ohare_neutral_sleazy.png';

oh_angry.src = 'sprites\\Ohare_angry.png';

oh_serious.src = 'sprites\\Ohare_serious.png';

oh_shocked.src = 'sprites\\Ohare_shocked.png';

entrance_back.src = 'sprites\\entrance.jpg';

motel_back.src = 'sprites\\room.png';

roof_back.src = 'sprites\\rooftop.jpg';

title_page.src = 'sprites\\titlepage.jpg';

canvas.width = 1600;

canvas.height = 900;

//Changes the window to the Finale of the game
function finale() {
    window.location.href = "finale.html";
}

//Draws the leftmost character onto the Canvas
function drawImageLeft(id) {
    'use strict';
    var c;
    id.onload = function () {
        ctx.save();
        ctx.globalCompositeOperation = 'destination-over';
        ctx.drawImage(id, 0, 150);
        ctx.globalCompositeOperation = 'source-over';
        ctx.restore();
        c = true;
    };
    if (!c) {
        ctx.save();
        ctx.globalCompositeOperation = 'destination-over';
        ctx.drawImage(id, 0, 150);
        ctx.globalCompositeOperation = 'source-over';
        ctx.restore();
    }
}

//Draws the rightmost character onto the Canvas
function drawImageRight(id) {
    'use strict';
    var c;
    id.onload = function () {
        ctx.save();
        ctx.globalCompositeOperation = 'destination-over';
        ctx.drawImage(id, 900, 100);
        ctx.globalCompositeOperation = 'source-over';
        ctx.restore();
        c = true;
    };
    if (!c) {
        ctx.save();
        ctx.globalCompositeOperation = 'destination-over';
        ctx.drawImage(id, 900, 100);
        ctx.globalCompositeOperation = 'source-over';
        ctx.restore();
    }
}

//Draws the background onto the Canvas
function drawBack(id) {
    'use strict';
    id.onload = function () {
        ctx.save();
        ctx.globalCompositeOperation = 'destination-over';
        ctx.drawImage(id, 0, 75);
        ctx.globalCompositeOperation = 'source-over';
        ctx.restore();
    };
    ctx.save();
    ctx.globalCompositeOperation = 'destination-over';
    ctx.drawImage(id, 0, 75);
    ctx.globalCompositeOperation = 'source-over';
    ctx.restore();
}

//Draws a character in the center of the Canvas
function drawCenter(id) {
    'use strict';
    id.onload = function () {
        ctx.save();
        ctx.globalCompositeOperation = 'destination-over';
        ctx.drawImage(id, 450, 150);
        ctx.globalCompositeOperation = 'source-over';
        ctx.restore();
    };
    ctx.save();
    ctx.globalCompositeOperation = 'destination-over';
    ctx.drawImage(id, 450, 150);
    ctx.globalCompositeOperation = 'source-over';
    ctx.restore();
}

//Draws the 'Next' button onto the Canvas
function Next() {
    'use strict';
    ctx.save();
    
    ctx.beginPath();
    
    ctx.moveTo(1500, 775);
    ctx.lineTo(1500, 875);
    ctx.lineTo(1550, 825);
    ctx.lineTo(1500, 775);
    ctx.stroke();
    ctx.lineTo(1550, 775);
    ctx.lineTo(1550, 875);
    ctx.lineTo(1500, 875);
    ctx.stroke();
    
    ctx.restore();
}

//Draws the bottom half of the user interface onto the Canvas
function botUI() {
    'use strict';
    ctx.save();
    
    ctx.beginPath();
       
    ctx.moveTo(0, 750);
    ctx.lineTo(1600, 750);
    ctx.lineTo(1600, 900);
    ctx.lineTo(0, 900);
    ctx.lineTo(0, 750);
    ctx.fillStyle = 'wheat';
    ctx.fill();
    ctx.fillStyle = 'black';
       
    ctx.moveTo(0, 675);
    ctx.lineTo(200, 675);
    ctx.lineTo(300, 750);
    ctx.lineTo(0, 749);
    ctx.fillStyle = 'wheat';
    ctx.fill();
    ctx.fillStyle = 'black';
    ctx.stroke();
    
    var next = new Next();
    
    ctx.restore();
}

//Draws the title screen image onto the Canvas
function drawTitle(id) {
    'use strict';
    id.onload = function () {
        ctx.save();
        ctx.globalCompositeOperation = 'destination-over';
        ctx.drawImage(id, 0, 0);
        ctx.globalCompositeOperation = 'source-over';
        ctx.restore();
    };
    ctx.save();
    ctx.globalCompositeOperation = 'destination-over';
    ctx.drawImage(id, 0, 75);
    ctx.globalCompositeOperation = 'source-over';
    ctx.beginPath();
    ctx.strokeStyle = 'red';
    ctx.fillStyle = 'black';
    ctx.moveTo(600, 600);
    ctx.lineTo(1000, 600);
    ctx.lineTo(1000, 800);
    ctx.lineTo(600, 800);
    ctx.lineTo(600, 600);
    ctx.stroke();
    ctx.fill();
    ctx.fillStyle = 'white';
    ctx.font = '82pt Serif';
    ctx.fillText('Play', 700, 730);
    ctx.restore();
}

//An Object representing a scene and its parts
function Scene(num, lchar, rchar, text1, text2, speaker, back) {
    'use strict';
    this.num = num;
    this.lchar = lchar;
    this.rchar = rchar;
    this.text1 = text1;
    this.text2 = text2;
    this.speaker = speaker;
    this.back = back;
    
    ctx.save();
    
    ctx.clearRect(0, 76, 1600, 824);
    
    ctx.font = '38pt Serif';
    
    botUI();
    
    ctx.fillText(this.text1, 40, 810);
    
    ctx.fillText(this.text2, 40, 860);
    
    ctx.fillText(this.speaker, 20, 725);
    
    drawImageLeft(lchar);
    
    drawImageRight(rchar);
    
    if (sceneCount === 147) {
        drawCenter(jc_thinking);
    }
    
    drawBack(back);
    
    ctx.restore();
}

//Boundary Checks
function checkExit(x, y) {
    return (x >= 1025 && x <= 1075 && y >= 275 && y <= 325);
}

function checkGun(x, y) {
    return (x < 140 && x > 30 && y > 525 && y < 590);
}

function checkKnife(x, y) {
    return (x < 185 && x > 50 && y > 500 && y < 530);
}

function checkNote(x, y) {
    return (x < 1175 && x > 1050 && y > 350 && y < 465);
}

function checkRoom(x, y) {
    var t;
    if (x < 410 && x > 190 && y > 535 && y < 660) {
        t = true;
    } else if (x < 915 && x > 705 && y > 565 && y < 650) {
        t = true;
    }
    return t;
}

function checkRadio(x, y) {
    return (x < 685 && x > 510 && y > 250 && y < 320);
}

function checkPlay(x, y) {
    return (x > 600 && x < 1000 && y > 600 && y < 800);
}

function checkNext(x, y) {
    'use strict';
    return (x >= 1500 && x <= 1550 && y >= 775 && y <= 875);
}

function checkVictim(x, y) {
    'use strict';
    return (x < 910 && x > 215 && y > 418 && y < 595);
}

function checkMotel(x, y) {
    'use strict';
    return (x < 1600 && x > 1175 && y > 230 && y < 545);
}

//An Object representing an evidence tag
function Evid(id, x, y) {
    'use strict';
    this.id = id;
    
    this.x = x;
    
    this.y = y;
    
    var text = ctx.measureText(this.id);
    
    this.width = Math.abs(text.actualBoundingBoxLeft) +           Math.abs(text.actualBoundingBoxRight) - 50;
    
    this.height = Math.abs(text.actualBoundingBoxAscent);
    
    this.draw(this.id, this.x, this.y);
    
}

//Draws an information box for a specified Evid object
function evidBox(id, color, a1, a2, a3) {
    this.id = id;
    
    this.color = color;
    
    this.a1 = a1;
    
    this.a2 = a2;
    
    this.a3 = a3;
    
    ctx.save();
    
    ctx.beginPath();
    
    ctx.strokeStyle = this.color;
    ctx.fillStyle = 'wheat';
    
    ctx.moveTo(600, 250);
    ctx.lineTo(600, 650);
    ctx.lineTo(1100, 650);
    ctx.lineTo(1100, 250);
    ctx.lineTo(600, 250);
    ctx.stroke();
    ctx.fill();
    
    ctx.font = '32pt Serif';
    
    ctx.fillStyle = this.color;
    
    ctx.fillText(this.id, 625, 310);
    
    ctx.font = '28pt Serif';

    ctx.fillText(a1, 625, 410);
    
    ctx.fillText(a2, 625, 460);
    
    ctx.fillText(a3, 625, 510);
    
    ctx.restore();
}

//Draws the 'X' that denotes exitting an information box
function evidExit(color) {
    this.color = color;
    
    ctx.save();
    
    ctx.beginPath();
    
    ctx.strokeStyle = this.color;
    
    ctx.moveTo(1025, 275);
    ctx.lineTo(1075, 325);
    ctx.moveTo(1075, 275);
    ctx.lineTo(1025, 325);
    ctx.lineTo(1025, 275);
    ctx.lineTo(1075, 275);
    ctx.lineTo(1075, 325);
    ctx.lineTo(1025, 325);
    ctx.stroke();
    
    ctx.restore();
}

//Draws the text representation of a specified Evid object
Evid.prototype.draw = function (id, x, y) {
    this.id = id;
    
    this.x = x;
    
    this.y = y;
    
    ctx.save();
    
    ctx.beginPath();
    
    ctx.font = '32pt Serif';
    
    ctx.fillText(this.id, this.x, this.y);
    
    ctx.restore();
    
};

//Boundary Check for Evid objects
Evid.prototype.checkPoint = function (x, y) {
    return (x >= this.x && x <= this.x + this.width && y <= this.y && y >= this.y - this.height);
};

//Draws the 'Select' button inside information boxes
function selectBox(color) {
    this.color = color;
    
    ctx.save();
    
    ctx.strokeStyle = this.color;
    
    ctx.beginPath();
    
    ctx.fillStyle = 'wheat';
    
    ctx.moveTo(775, 550);
    ctx.lineTo(925, 550);
    ctx.lineTo(925, 600);
    ctx.lineTo(775, 600);
    ctx.lineTo(775,550);
    ctx.stroke();
    
    ctx.fillStyle = this.color;
    ctx.font = '32pt Serif';
    
    ctx.fillText('Select', 800, 585);
    
    ctx.restore();
}

//Boundary Check for the 'Select' button
function checkSelect(x, y) {
    return (x < 925 && x > 775 && y > 550 && y < 600);
}

//Draws the top of the user interface onto the Canvas
function topUI() {
    ctx.save();
    
    ctx.beginPath();
    
    ctx.fillStyle = 'wheat';
    
    ctx.moveTo(300, 75);
    ctx.lineTo(1600, 75);
    ctx.lineTo(1600, 0);
    ctx.lineTo(0, 0);
    ctx.stroke();
    ctx.fill();
    
    ctx.moveTo(0, 75);
    ctx.lineTo(300, 75);
    ctx.lineTo(400, 0);
    ctx.lineTo(0, 0);
    ctx.stroke();
    ctx.fill();
        
    ctx.closePath();
    
    ctx.fillStyle = 'black';
    
    ctx.font = '48pt Serif';
    ctx.fillText('Evidence:', 40, 50);
    
    if (check1) {
        victim = new Evid('Victim', 390, 50);
    }
    
    if (check2) {
        knife = new Evid('Knife', 540, 50);
    }
    
    if (check3) {
        blood = new Evid('Blood', 690, 50);
    }
    
    if (check4) {
        motel = new Evid('Motel', 840, 50);
    }
    
    if (check5) {
        report = new Evid('Report', 990, 50);
    }
    
    if (check6) {
        note = new Evid('Note', 1140, 50);
    }
    
    if (check7) {
        radio = new Evid('Radio', 1290, 50);
    }
    
    if (check8) {
        room = new Evid('Room', 1440, 50);
    }
    
    ctx.restore();
}

//Starts the game after the 'Play' button is pressed
function start() {
    topUI();
    
    var n,
        c = 0;
    sceneCount = 0;
    
    n = new Scene(c, lcharArray[c], rcharArray[c], text1Array[c], text2Array[c], speakerArray[c], entrance_back);
}

//Event Listener for the player moving the cursor
canvas.addEventListener('mousemove', function (e) {
    var bound = canvas.getBoundingClientRect(),
    
        scaleX = canvas.width / bound.width,
    
        scaleY = canvas.height / bound.height,
    
        mouseX = parseInt((e.clientX - bound.left) * scaleX),
    
        mouseY = parseInt((e.clientY - bound.top) * scaleY),
        
        n;
    //Checks to see if the player has found each piece of    evidence. If they have, it will change the evidence tags' color upon mousing over it, and will change it back upon removal.
    if (buffer1) {
       
        if (victim.checkPoint(mouseX, mouseY) && check1) {
            n = victim;
            ctx.save();
            ctx.font = '32pt Serif';
            ctx.fillStyle = "white";
            ctx.fillText(n.id, n.x, n.y);
            ctx.fillStyle = "blue";
            ctx.fillText(n.id, n.x, n.y);
            ctx.restore();
            hover1 = true;
        } else if (hover1) {
            n = victim;
            ctx.save();
            ctx.font = '32pt Serif';
            ctx.fillStyle = "white";
            ctx.fillText(n.id, n.x, n.y);
            ctx.fillStyle = "black";
            ctx.fillText(n.id, n.x, n.y);
            ctx.restore();
            hover1 = false;
        }
        
    }
    
    if (buffer2) {
        if (knife.checkPoint(mouseX, mouseY) && check2) {
            n = knife;
            ctx.save();
            ctx.font = '32pt Serif';
            ctx.fillStyle = "white";
            ctx.fillText(n.id, n.x, n.y);
            ctx.fillStyle = "blue";
            ctx.fillText(n.id, n.x, n.y);
            ctx.restore();
            hover2 = true;
        } else if (hover2) {
            n = knife;
            ctx.save();
            ctx.font = '32pt Serif';
            ctx.fillStyle = "white";
            ctx.fillText(n.id, n.x, n.y);
            ctx.fillStyle = "black";
            ctx.fillText(n.id, n.x, n.y);
            ctx.restore();
            hover2 = false;
        }
    }
    
    if (buffer3) {
        if (blood.checkPoint(mouseX, mouseY) && check3) {
            n = blood;
            ctx.save();
            ctx.font = '32pt Serif';
            ctx.fillStyle = "white";
            ctx.fillText(n.id, n.x, n.y);
            ctx.fillStyle = "blue";
            ctx.fillText(n.id, n.x, n.y);
            ctx.restore();
            hover3 = true;
        } else if (hover3) {
            n = blood;
            ctx.save();
            ctx.font = '32pt Serif';
            ctx.fillStyle = "white";
            ctx.fillText(n.id, n.x, n.y);
            ctx.fillStyle = "black";
            ctx.fillText(n.id, n.x, n.y);
            ctx.restore();
            hover3 = false;
        }
    }
    
    if (buffer4) {
        if (motel.checkPoint(mouseX, mouseY) && check4) {
            n = motel;
            ctx.save();
            ctx.font = '32pt Serif';
            ctx.fillStyle = "white";
            ctx.fillText(n.id, n.x, n.y);
            ctx.fillStyle = "blue";
            ctx.fillText(n.id, n.x, n.y);
            ctx.restore();
            hover4 = true;
        } else if (hover4) {
            n = motel;
            ctx.save();
            ctx.font = '32pt Serif';
            ctx.fillStyle = "white";
            ctx.fillText(n.id, n.x, n.y);
            ctx.fillStyle = "black";
            ctx.fillText(n.id, n.x, n.y);
            ctx.restore();
            hover4 = false;
        }
    }
    
    if (buffer5) {
        if (report.checkPoint(mouseX, mouseY) && check5) {
            n = report;
            ctx.save();
            ctx.font = '32pt Serif';
            ctx.fillStyle = "white";
            ctx.fillText(n.id, n.x, n.y);
            ctx.fillStyle = "blue";
            ctx.fillText(n.id, n.x, n.y);
            ctx.restore();
            hover5 = true;
        } else if (hover5) {
            n = report;
            ctx.save();
            ctx.font = '32pt Serif';
            ctx.fillStyle = "white";
            ctx.fillText(n.id, n.x, n.y);
            ctx.fillStyle = "black";
            ctx.fillText(n.id, n.x, n.y);
            ctx.restore();
            hover5 = false;
        }
    }
    
    if (buffer6) {
        if (note.checkPoint(mouseX, mouseY) && check6) {
            n = note;
            ctx.save();
            ctx.font = '32pt Serif';
            ctx.fillStyle = "white";
            ctx.fillText(n.id, n.x, n.y);
            ctx.fillStyle = "blue";
            ctx.fillText(n.id, n.x, n.y);
            ctx.restore();
            hover6 = true;
        } else if (hover6) {
            n = note;
            ctx.save();
            ctx.font = '32pt Serif';
            ctx.fillStyle = "white";
            ctx.fillText(n.id, n.x, n.y);
            ctx.fillStyle = "black";
            ctx.fillText(n.id, n.x, n.y);
            ctx.restore();
            hover6 = false;
        }
    }
    
    if (buffer7) {
        if (radio.checkPoint(mouseX, mouseY) && check7) {
            n = radio;
            ctx.save();
            ctx.font = '32pt Serif';
            ctx.fillStyle = "white";
            ctx.fillText(n.id, n.x, n.y);
            ctx.fillStyle = "blue";
            ctx.fillText(n.id, n.x, n.y);
            ctx.restore();
            hover7 = true;
        } else if (hover7) {
            n = radio;
            ctx.save();
            ctx.font = '32pt Serif';
            ctx.fillStyle = "white";
            ctx.fillText(n.id, n.x, n.y);
            ctx.fillStyle = "black";
            ctx.fillText(n.id, n.x, n.y);
            ctx.restore();
            hover7 = false;
        }
    }
    
    if (buffer8) {
        if (room.checkPoint(mouseX, mouseY) && check8) {
            n = room;
            ctx.save();
            ctx.font = '32pt Serif';
            ctx.fillStyle = "white";
            ctx.fillText(n.id, n.x, n.y);
            ctx.fillStyle = "blue";
            ctx.fillText(n.id, n.x, n.y);
            ctx.restore();
            hover8 = true;
        } else if (hover8) {
            n = room;
            ctx.save();
            ctx.font = '32pt Serif';
            ctx.fillStyle = "white";
            ctx.fillText(n.id, n.x, n.y);
            ctx.fillStyle = "black";
            ctx.fillText(n.id, n.x, n.y);
            ctx.restore();
            hover8 = false;
        }
    }
});

//Event Listener for the player clicking the mouse
canvas.addEventListener('click', function (e) {
    var bound = canvas.getBoundingClientRect(),
    
        scaleX = canvas.width / bound.width,
    
        scaleY = canvas.height / bound.height,
    
        mouseX = parseInt((e.clientX - bound.left) * scaleX),
    
        mouseY = parseInt((e.clientY - bound.top) * scaleY),
        
        n,
        a1,
        a2,
        a3;
    
    //Checks to see if the player has found each piece of evidence. If they have, an information box will open for the evidence tag that was clicked.
    if (buffer1) {
        if (victim.checkPoint(mouseX, mouseY)) {
            n = victim;
        
            a1 = 'Tanya Felling; T.O.D - 9 pm';
            a2 = 'Cause of death: gunshot wound';
            a3 = 'No bullet found; bloody hands';
        
            ctx.beginPath();
        
            ctx.clearRect(599, 249, 502, 402);
        
            evidBox(n.id, 'black', a1, a2, a3);
            
            if (sceneCount === 80 || sceneCount === 81 || sceneCount === 87 || sceneCount === 92 || sceneCount === 93 || sceneCount === 132 || sceneCount === 140) {
                selectBox('black');
            }
        
            evidExit('red');
            
            currBox = victim;
    
        }
    }
    
    if (buffer2) {
        if (knife.checkPoint(mouseX, mouseY)) {
            n = knife;
        
            a1 = 'Traces of blood on blade';
            a2 = "Tanya Fellings' fingerprints";
            a3 = '';
        
            ctx.beginPath();
        
            ctx.clearRect(599, 249, 502, 402);
        
            evidBox(n.id, 'black', a1, a2, a3);
            
            if (sceneCount === 80 || sceneCount === 81 || sceneCount === 87 || sceneCount === 92 || sceneCount === 93 || sceneCount === 132 || sceneCount === 140) {
                selectBox('black');
            }
        
            evidExit('red');
            
            currBox = knife;
    
        }
    }
    
    if (buffer3) {
        if (blood.checkPoint(mouseX, mouseY)) {
            n = blood;
        
            a1 = 'Large pool around victim';
            a2 = 'Smaller splatters in large radius';
            a3 = '';
        
            ctx.beginPath();
        
            ctx.clearRect(599, 249, 502, 402);
        
            evidBox(n.id, 'black', a1, a2, a3);
            
            if (sceneCount === 80 || sceneCount === 81 || sceneCount === 87 || sceneCount === 92 || sceneCount === 93 || sceneCount === 132 || sceneCount === 140) {
                selectBox('black');
            }
        
            evidExit('red');
            
            currBox = blood;
    
        }
    }
    
    if (buffer4) {
        if (motel.checkPoint(mouseX, mouseY)) {
            n = motel;
        
            a1 = 'A shabby, three-story building';
            a2 = 'First floor windows boarded up';
            a3 = '';
        
            ctx.beginPath();
        
            ctx.clearRect(599, 249, 502, 402);
        
            evidBox(n.id, 'black', a1, a2, a3);
            
            if (sceneCount === 80 || sceneCount === 81 || sceneCount === 87 || sceneCount === 92 || sceneCount === 93 || sceneCount === 132 || sceneCount === 140) {
                selectBox('black');
            }
        
            evidExit('red');
            
            currBox = motel;
    
        }
    }
    
    if (buffer5) {
        if (report.checkPoint(mouseX, mouseY)) {
            n = report;
        
            a1 = 'Blackout occured at 8:57 pm';
            a2 = 'Affected entire building';
            a3 = 'Disabled security cameras';
        
            ctx.beginPath();
        
            ctx.clearRect(599, 249, 502, 402);
        
            evidBox(n.id, 'black', a1, a2, a3);
            
            if (sceneCount === 80 || sceneCount === 81 || sceneCount === 87 || sceneCount === 92 || sceneCount === 93 || sceneCount === 132 || sceneCount === 140) {
                selectBox('black');
            }
        
            evidExit('red');
            
            currBox = report;
    
        }
    }
    
    if (buffer6) {
        if (note.checkPoint(mouseX, mouseY)) {
            n = note;
        
            a1 = 'It reads:';
            a2 = '"I know your secret, Tanya';
            a3 = 'Meet me on the roof at 8:55"';
        
            ctx.beginPath();
        
            ctx.clearRect(599, 249, 502, 402);
        
            evidBox(n.id, 'black', a1, a2, a3);
            
            if (sceneCount === 80 || sceneCount === 81 || sceneCount === 87 || sceneCount === 92 || sceneCount === 93 || sceneCount === 132 || sceneCount === 140) {
                selectBox('black');
            }
        
            evidExit('red');
            
            currBox = note;
    
        }
    }
    
    if (buffer7) {
        if (radio.checkPoint(mouseX, mouseY)) {
            n = radio;
        
            a1 = 'Clock display stuck on 12:00';
            a2 = 'Volume set to maximum';
            a3 = 'Was muted upon entering';
        
            ctx.beginPath();
        
            ctx.clearRect(599, 249, 502, 402);
        
            evidBox(n.id, 'black', a1, a2, a3);
            
            if (sceneCount === 80 || sceneCount === 81 || sceneCount === 87 || sceneCount === 92 || sceneCount === 93 || sceneCount === 132 || sceneCount === 140) {
                selectBox('black');
            }
        
            evidExit('red');
            
            currBox = radio;
    
        }
    }
    
    if (buffer8) {
        if (room.checkPoint(mouseX, mouseY)) {
            n = room;
        
            a1 = "Victim's room is in disarray";
            a2 = 'Single, unlocked window';
            a3 = 'Knife missing from cutlery set';
        
            ctx.beginPath();
        
            ctx.clearRect(599, 249, 502, 402);
        
            evidBox(n.id, 'black', a1, a2, a3);
            
            if (sceneCount === 80 || sceneCount === 81 || sceneCount === 87 || sceneCount === 92 || sceneCount === 93 || sceneCount === 132 || sceneCount === 140) {
                selectBox('black');
            }
        
            evidExit('red');
            
            currBox = room;
    
        }
    }
    
    //Checks to see which piece of evidence the player selects when prompted. If it is the correct choice for that scene, it progresses the player; if not, it takes the player to a 'try again' scene until they are correct.
    if (checkSelect(mouseX, mouseY) && currBox !== null) {
        if ((sceneCount === 80 || sceneCount === 81) && currBox === report) {
            sceneCount = 82;
            n = new Scene(sceneCount, lcharArray[sceneCount], rcharArray[sceneCount], text1Array[sceneCount], text2Array[sceneCount], speakerArray[sceneCount], motel_back);      
        } else if ((sceneCount === 87 || sceneCount === 81) && currBox === note) {
            sceneCount = 88;
            n = new Scene(sceneCount, lcharArray[sceneCount], rcharArray[sceneCount], text1Array[sceneCount], text2Array[sceneCount], speakerArray[sceneCount], motel_back);
        } else if ((sceneCount === 92 || sceneCount === 81) && currBox === knife) {
            sceneCount = 93;
            n = new Scene(sceneCount, lcharArray[sceneCount], rcharArray[sceneCount], text1Array[sceneCount], text2Array[sceneCount], speakerArray[sceneCount], motel_back);
        } else if ((sceneCount === 93 || sceneCount === 81) && currBox === room) {
            sceneCount = 94;
            n = new Scene(sceneCount, lcharArray[sceneCount], rcharArray[sceneCount], text1Array[sceneCount], text2Array[sceneCount], speakerArray[sceneCount], motel_back);
        } else if ((sceneCount === 132 || sceneCount === 81) && currBox === motel) {
            sceneCount = 133;
            n = new Scene(sceneCount, lcharArray[sceneCount], rcharArray[sceneCount], text1Array[sceneCount], text2Array[sceneCount], speakerArray[sceneCount], roof_back);
        } else if ((sceneCount === 140 || sceneCount === 81) && (currBox === radio || currBox === report)) {
            sceneCount = 141;
            n = new Scene(sceneCount, lcharArray[sceneCount], rcharArray[sceneCount], text1Array[sceneCount], text2Array[sceneCount], speakerArray[sceneCount], roof_back);
        } else if (sceneCount <= 114) {
            sceneCount = 81;
            n = new Scene(sceneCount, lcharArray[sceneCount], rcharArray[sceneCount], text1Array[sceneCount], text2Array[sceneCount], speakerArray[sceneCount], motel_back);
            
        } else if (sceneCount > 114) {
            sceneCount = 81;
            n = new Scene(sceneCount, lcharArray[sceneCount], rcharArray[sceneCount], text1Array[sceneCount], text2Array[sceneCount], speakerArray[sceneCount], roof_back);
            
        }
        currBox = null;
    }
    
    //Begins the game when the 'Play' button is clicked on the title page.
    if (checkPlay(mouseX, mouseY) && play) {
        start();
        play = false;
    }
    
    //Closes the information box and refreshes the scene when the player clicks the 'Exit' button.
    if (checkExit(mouseX, mouseY)) {
        ctx.save();
        
        ctx.beginPath();
        
        ctx.clearRect(0, 76, 1600, 824);
        if (sceneCount < 38) {
            n = new Scene(sceneCount, lcharArray[sceneCount], rcharArray[sceneCount], text1Array[sceneCount], text2Array[sceneCount], speakerArray[sceneCount], entrance_back);
        } else if (sceneCount >= 38 && sceneCount <= 114) {
            n = new Scene(sceneCount, lcharArray[sceneCount], rcharArray[sceneCount], text1Array[sceneCount], text2Array[sceneCount], speakerArray[sceneCount], motel_back);
        } else {
            n = new Scene(sceneCount, lcharArray[sceneCount], rcharArray[sceneCount], text1Array[sceneCount], text2Array[sceneCount], speakerArray[sceneCount], roof_back);
        }
                
        ctx.restore();
        
        currBox = null;
    
    }
    
    //Progresses to the next scene upon clicking the 'Next' button, except when the player is gathering evidence or prompted to present evidence. Also determines when the player finds individiual pieces of evidence and refreshes the UI accordingly.
    if (checkNext(mouseX, mouseY) && sceneCount >= 0 && sceneCount !== 8 && sceneCount !== 46 && sceneCount !== 80 && sceneCount !== 81 && sceneCount !== 87 && sceneCount !== 92 && sceneCount !== 93 && sceneCount !== 118 && sceneCount !== 132 && sceneCount !== 140) {
        if (sceneCount === 11) {
            check2 = true;
            buffer2 = true;
            topUI();
        }
        if (sceneCount === 12 || sceneCount === 24 || sceneCount === 28) {
            sceneCount = 7;
        }
        if (sceneCount === 54 || sceneCount === 62 || sceneCount === 68) {
            sceneCount = 45;
        }
        if (sceneCount === 16) {
            check1 = true;
            buffer1 = true;
            topUI();
        }
        if (sceneCount === 23) {
            check3 = true;
            buffer3 = true;
            topUI();
        }
        if (sceneCount === 27) {
            check4 = true;
            buffer4 = true;
            topUI();
        }
        if (sceneCount === 42) {
            check5 = true;
            buffer5 = true;
            topUI();
        }
        if (sceneCount === 53) {
            check6 = true;
            buffer6 = true;
            topUI();
        }
        if (sceneCount === 61) {
            check7 = true;
            buffer7 = true;
            topUI();
        }
        if (sceneCount === 67) {
            check8 = true;
            buffer8 = true;
            topUI();
        }
        sceneCount = sceneCount + 1;
        if (sceneCount <= 38) {
            n = new Scene(sceneCount, lcharArray[sceneCount], rcharArray[sceneCount], text1Array[sceneCount], text2Array[sceneCount], speakerArray[sceneCount], entrance_back);
        } else if (sceneCount > 38 && sceneCount <= 114) {
            n = new Scene(sceneCount, lcharArray[sceneCount], rcharArray[sceneCount], text1Array[sceneCount], text2Array[sceneCount], speakerArray[sceneCount], motel_back);
        } else {
            n = new Scene(sceneCount, lcharArray[sceneCount], rcharArray[sceneCount], text1Array[sceneCount], text2Array[sceneCount], speakerArray[sceneCount], roof_back);
        }
    }
    
    //Specific scene progression checks for specific moments in the game: when gathering evidence, when presenting evidence, and when proceeding to the Finale.
    if (checkNext(mouseX, mouseY) && sceneCount === 8 && check1 && check2 && check3 && check4) {
        sceneCount = 29;
        n = new Scene(29, lcharArray[sceneCount], rcharArray[sceneCount], text1Array[sceneCount], text2Array[sceneCount], speakerArray[sceneCount], entrance_back);
        
    }
    
    if (checkNext(mouseX, mouseY) && sceneCount === 46 && check6 && check7 && check8) {
        sceneCount = 69;
        n = new Scene(69, lcharArray[sceneCount], rcharArray[sceneCount], text1Array[sceneCount], text2Array[sceneCount], speakerArray[sceneCount], motel_back);
        
    }
    
    if (checkNext(mouseX, mouseY) && sceneCount === 148) {
        finale();
    }
    
    if (checkGun(mouseX, mouseY) && sceneCount === 118) {
        sceneCount = 119;
        n = new Scene(119, lcharArray[sceneCount], rcharArray[sceneCount], text1Array[sceneCount], text2Array[sceneCount], speakerArray[sceneCount], roof_back);
    }
        
    if (checkKnife(mouseX, mouseY) && sceneCount === 8) {
        sceneCount = 9;
        n = new Scene(9, lcharArray[sceneCount], rcharArray[sceneCount], text1Array[sceneCount], text2Array[sceneCount], speakerArray[sceneCount], entrance_back);
    }
    
    if (checkVictim(mouseX, mouseY) && sceneCount === 8) {
        sceneCount = 13;
        n = new Scene(13, lcharArray[sceneCount], rcharArray[sceneCount], text1Array[sceneCount], text2Array[sceneCount], speakerArray[sceneCount], entrance_back);
        
    }
    
    if (checkMotel(mouseX, mouseY) && sceneCount === 8) {
        sceneCount = 25;
        n = new Scene(25, lcharArray[sceneCount], rcharArray[sceneCount], text1Array[sceneCount], text2Array[sceneCount], speakerArray[sceneCount], entrance_back);
        
    }
    
    if (checkNote(mouseX, mouseY) && sceneCount === 46) {
        sceneCount = 47;
        n = new Scene(47, lcharArray[sceneCount], rcharArray[sceneCount], text1Array[sceneCount], text2Array[sceneCount], speakerArray[sceneCount], motel_back);
    }
    
    if (checkRadio(mouseX, mouseY) && sceneCount === 46) {
        sceneCount = 55;
        n = new Scene(55, lcharArray[sceneCount], rcharArray[sceneCount], text1Array[sceneCount], text2Array[sceneCount], speakerArray[sceneCount], motel_back);
    }
    
    if (checkRoom(mouseX, mouseY) && sceneCount === 46) {
        sceneCount = 63;
        n = new Scene(63, lcharArray[sceneCount], rcharArray[sceneCount], text1Array[sceneCount], text2Array[sceneCount], speakerArray[sceneCount], motel_back);
    }
    
});

//Begins the game on the title page.
drawTitle(title_page);
