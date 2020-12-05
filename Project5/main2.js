//Smaller variation of main.js, with less functions since it only concerns the denouement. One new function is added to draw the 'Thank You' screen at the end.
var canvas = document.getElementById('mainCanvas'),
    
    ctx = canvas.getContext('2d'),

    victim,
    knife,
    blood,
    motel,
    report,
    note,
    radio,
    room,

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
    
    sceneCount = 0,
    currBox,
    
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
    thanks = new Image(),

    text1Array = [
        "That's it! I have the answer!",
        "Mr. O'Hare, you admit that you were in Tanya Fellings'",
        "Sounds like you're finally catching on detective. So you",
        "On the contrary. But first, let me ask you a question.",
        "Wh-what!?",
        '. . .',
        "Wait, you don't mean . . .",
        "Earlier, I was wondering why Ms. Fellings had scratches all over her",
        "Th-that's absolutely ridiculous! You're really saying that",
        "My logic doesn't lie. Ms. Felling was shot from the second floor.",
        "No! That's . . . that's wrong!",
        "You're quite mistaken, Mr. O'Hare. I know exactly",
        "That's impossible!",
        "There's one thing that's bothered me about this case from the beginning.",
        "You . . . you can't mean!?",
        "The reason we haven't found the bullet is because it's not here. When",
        "Wait, no! No, no, no!",
        "I'm sure forensics will have no problem tracing its trajectory to the",
        "I . . . Aghhhhhhhhhhhhhhh!",
        'That woman was an investigative journalist, trying to get',
        'I tried searching her room to find what she had on me.',
        "We've heard enough. Mr. O'Hare, you're under arrest!",
        "Thank you, detective. If you hadn't kept investigating,",
        "Just doing my duty, Mr. Shovely. Besides, we can't have",
        "I have to say, newbie, you had me worried for a bit.",
        "So, Investigator Hawke, how long did you",
        "Heh, so you found me out. I had forensics scope across the street",
        "You're sharper than I thought Hawke. So, tell me how I did.",
        "I've only got one thing to say, really.",
        ''
    ],

    text2Array = [
        '',
        'room at the time of the murder?',
        "admit you can't prove I'm your culprit?",
        'Were you shocked when Tanya Felling caught you in her room?',
        '',
        '',
        '',
        "hands. It's because, after she fell, she caught herself on the windowsill!",
        "that woman caught herself after falling? You're insane!",
        "And the only person on the second floor at the time was you!",
        "You can't prove I shot her!",
        "how to prove you shot Ms. Felling.",
        '',
        "We've been investigating a shooting, but we have yet to find a bullet.",
        '',
        "you shot Ms. Felling through the window, it flew across the street!",
        '',
        "building across the street. It's time to confess, Ray D. O'Hare!",
        'Fine! I did it! I killed her!',
        "information on my business dealings. I couldn't let her find anything!",
        'I never expected to see her out the window! I had to keep her quiet!',
        '',
        "I'd be behind bars right now!",
        "you missing any more television episodes!",
        "But I think you've more than exceeded my expectations.",
        "know O'Hare was the culprit?",
        "before you arrived. I just wanted to give my new partner a little test.",
        '',
        "Welcome to the force, Detective Case.",
        ''
    ],

    speakerArray = [
        'Justin',
        'Justin',
        "O'Hare",
        'Justin',
        "O'Hare",
        'Hawke',
        'Shovely',
        'Justin',
        "O'Hare",
        'Justin',
        "O'Hare",
        'Justin',
        "O'Hare",
        'Justin',
        "O'Hare",
        'Justin',
        "O'Hare",
        'Justin',
        "O'Hare",
        "O'Hare",
        "O'Hare",
        'Justin',
        'Shovely',
        'Justin',
        'Hawke',
        'Justin',
        'Hawke',
        'Justin',
        'Hawke',
        ''
    ],

    lcharArray = [
        jc_confident,
        jc_neutral,
        jc_neutral,
        jc_confident,
        jc_confident,
        jc_confident,
        jc_confident,
        jc_neutral,
        jc_neutral,
        jc_neutral,
        jc_neutral,
        jc_neutral,
        jc_neutral,
        jc_thinking,
        jc_thinking,
        jc_confident,
        jc_confident,
        jc_confident,
        jc_neutral,
        jc_neutral,
        jc_neutral,
        jc_confident,
        jc_neutral,
        jc_neutral,
        jc_neutral,
        jc_thinking,
        jc_thinking,
        jc_confident,
        jc_confident,
        empty
    ],

    rcharArray = [
        empty,
        oh_neutral,
        oh_neutral,
        oh_neutral,
        oh_shocked,
        eh_smirk,
        ss_surprised,
        oh_shocked,
        oh_shocked,
        oh_shocked,
        oh_shocked,
        oh_shocked,
        oh_shocked,
        oh_shocked,
        oh_angry,
        oh_angry,
        oh_shocked,
        oh_shocked,
        oh_shocked,
        oh_angry,
        oh_shocked,
        oh_shocked,
        ss_nervous,
        ss_neutral,
        eh_neutral,
        eh_neutral,
        eh_smirk,
        eh_smirk,
        eh_smirk,
        empty
    ];

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

thanks.src = 'sprites\\thanks.png';

canvas.width = 1600;

canvas.height = 900;

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
    
    drawBack(back);
    
    ctx.restore();
}

function checkNext(x, y) {
    'use strict';
    return (x >= 1500 && x <= 1550 && y >= 775 && y <= 875);
}

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

function checkExit(x, y) {
    return (x >= 1025 && x <= 1075 && y >= 275 && y <= 325);
}

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

Evid.prototype.checkPoint = function (x, y) {
    return (x >= this.x && x <= this.x + this.width && y <= this.y && y >= this.y - this.height);
};

function start() {
    check1 = true;
    buffer1 = true;
    check2 = true;
    buffer2 = true;
    check3 = true;
    buffer3 = true;
    check4 = true;
    buffer4 = true;
    check5 = true;
    buffer5 = true;
    check6 = true;
    buffer6 = true;
    check7 = true;
    buffer7 = true;
    check8= true;
    buffer8 = true;
    topUI();
    
    var n,
        c = 0;
    sceneCount = 0;
    
    n = new Scene(c, lcharArray[c], rcharArray[c], text1Array[c], text2Array[c], speakerArray[c], roof_back);
}

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

//Draws the 'Thank You' image onto the Canvas
function drawThanks(id) {
    'use strict';
    id.onload = function () {
        ctx.save();
        ctx.drawImage(id, 0, 0);
        ctx.restore();
    };
    ctx.save();
    ctx.drawImage(id, 0, 0);
    ctx.restore();
}

canvas.addEventListener('mousemove', function (e) {
    var bound = canvas.getBoundingClientRect(),
    
        scaleX = canvas.width / bound.width,
    
        scaleY = canvas.height / bound.height,
    
        mouseX = parseInt((e.clientX - bound.left) * scaleX),
    
        mouseY = parseInt((e.clientY - bound.top) * scaleY),
        
        n;
    
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
      
    if (checkExit(mouseX, mouseY)) {
        ctx.save();
        
        ctx.beginPath();
        
        ctx.clearRect(0, 76, 1600, 824);
        
        n = new Scene(sceneCount, lcharArray[sceneCount], rcharArray[sceneCount], text1Array[sceneCount], text2Array[sceneCount], speakerArray[sceneCount], roof_back);
                
        ctx.restore();
        
        currBox = null;
    
    }
    
    if (checkNext(mouseX, mouseY) && sceneCount !== 29) {
        sceneCount = sceneCount + 1;
        n = new Scene(sceneCount, lcharArray[sceneCount], rcharArray[sceneCount], text1Array[sceneCount], text2Array[sceneCount], speakerArray[sceneCount], roof_back);
    }
    
    //Draws the 'Thank You' screen and prevents the player from accidentally triggering information boxes for evidence.
    if (checkNext(mouseX, mouseY) && sceneCount === 29) {
        ctx.clearRect(0, 0, 1600, 900);
        drawThanks(thanks);
        check1 = false;
        buffer1 = false;
        check2 = false;
        buffer2 = false;
        check3 = false;
        buffer3 = false;
        check4 = false;
        buffer4 = false;
        check5 = false;
        buffer5 = false;
        check6 = false;
        buffer6 = false;
        check7 = false;
        buffer7 = false;
        check8 = false;
        buffer8 = false;
    }
    
});

start();
