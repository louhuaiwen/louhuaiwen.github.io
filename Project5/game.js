//Creates the text boxes during the Finale of the game with a selection of button objects and an array of text nodes.
const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return false;
  }
  if (nextTextNodeId == 9) {
    window.location.href = "end.html";
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: "For some unknown reason, O'Hare wanted to search Tanya's room. How did he make sure he would not be detected?",
    options: [
      {
        text: 'The blackout and  the threatening notes',
        nextText: 2
      },
      {
        text: 'Shovely caused a distraction',
        nextText: 8
      },
      {
        text: "O'Hare fired gunshots",
        nextText: 8
      },
      {
        text: "O'Hare waited until everyone was asleep",
        nextText: 8
      }
    ]
  },
  {
    id: 2,
    text: 'Tanya was afraid of whoever sent the note, so she arrived on the roof with a knife to protect herself. Unfortunately, she mistook Shovely for her aggressor, and a fight ensued, causing her to fall off the roof. Wait . . . there’s something missing. What is wrong with this chain of events?',
    options: [
      {
        text: 'Tanya died before she fell.',
        nextText: 8
      },
      {
        text: 'Tanya died after she fell.',
        nextText: 3
      },
      {
        text: 'Tanya was not pushed.',
        nextText: 8
      },
      {
        text: 'Tanya was not shot.',
        nextText: 8
      }
    ]
  },
  {
    id: 3,
    text: 'The blood splatter suggests that Tanya wasn’t shot after she fell. We assumed that must mean she was shot before she fell. Is there a piece of evidence that contradicts that?',
    options: [
      {
        text: "Shovely's Statement",
        nextText: 4
      },
      {
        text: "O'Hare's Statement",
        nextText: 8
      },
      {
        text: "Gun",
        nextText: 8
      },
      {
        text: 'Kitchen Knife',
        nextText: 8
      }
    ]
  },
  {
    id: 4,
    text: 'Shovely said that he heard a loud bang after Tanya fell. I assumed that must have been when she hit the ground, but it’s more likely that that sound was a gunshot. We’ve had it wrong from the beginning! Tanya wasn’t shot before she fell, she was shot before she hit the ground! Based on the timeline of events, and the location of all the suspects, that means that Tanya was shot . . .?',
    options: [
      {
        text: 'From the first floor',
        nextText: 8
      },
      {
        text: 'On the roof',
        nextText: 8
      },
      {
        text: 'From the third floor',
        nextText: 8
      },
      {
        text: 'From the second floor',
        nextText: 5
      }
    ]
  },
  {
    id: 5,
    text: 'Tanya must have been shot from the second floor, it’s the only option that’s possible. But that doesn’t make sense, because O’Hare wouldn’t have been able to shoot her in free fall. Wait . . . there was something about the victim’s body that hasn’t been explained yet. Could it be that Tanya stopped her fall by using . . .?',
    options: [
      {
        text: 'Her hands',
        nextText: 6
      },
      {
        text: 'Her feet',
        nextText: 8
      },
      {
        text: 'Her arms',
        nextText: 8
      },
      {
        text: 'Her legs',
        nextText: 8
      }
    ]
  },
  {
    id: 6,
    text: 'Tanya’s hands were bloody and scraped, especially around her fingers. She must have caught the upper windowsill on her way down! As implausible as it sounds, it fits with the evidence. But that means that . . .?',
    options: [
      {
        text: 'Tanya saw Shovely in her room',
        nextText: 8
      },
      {
        text: "Tanya saw O'Hare in her room",
        nextText: 7
      },
      {
        text: 'Tanya was not shot',
        nextText: 8
      },
      {
        text: 'Tanya did not fall',
        nextText: 8
      }
    ]
  },
  {
    id: 7,
    text: 'O’Hare admitted he was in Tanya’s room when she fell. If Tanya caught herself on the windowsill, she would have seen him going through her room! That’s why he shot her! But if that’s really what happened: O’Hare going to Tanya’s room, then Tanya falling off the roof and catching the windowsill, then O’Hare shooting Tanya as she hung from the windowsill, there must be a piece of evidence that proves O’Hare took the shot from the second floor. What piece of evidence could lead us to the truth?',
    options: [
      {
        text: 'The Kitchen Knife',
        nextText: 8
      },
      {
        text: 'The Radio',
        nextText: 8
      },
      {
        text: 'The Missing Bullet',
        nextText: 9
      },
      {
        text: 'The Windowsill',
        nextText: 8
      }
    ]
  },
    {
    id: 8,
    text: "No, that doesn't make any sense. I should go back and think things through from the beginning.",
    options: [
      {
        text: 'Try',
        nextText: 1
      },
      {
        text: 'Again',
        nextText: 1
      }
    ]
  }
    
]

startGame()