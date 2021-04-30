//arnoldSchwarzenegger, gilbertGottfried, billClinton, dannyDevito, georgeBush, leonardNimoy,  alanRickman, billGates, billNye

let names = ['Andres', 'Cody', 'Cynthia', 'Daniela', 'David', 'Dicky', 'Francisco',
  'Hunter', 'Jesper', 'Joey', 'Jonny', 'Juan', 'Robert', 'Sumeet', 'Niko', 'Val'];
const name = () => {
  return names[Math.floor(Math.random() * names.length)];
}
let name1 = name();
let name2 = name();

let celebrityQuotes = {


  arnoldSchwarzenegger: [
    `If ${name1} can see it and believe it, then ${name1} can achieve it.`,
    `I was going to give a graduation speech in Arizona this weekend. But with my accent I was afraid ${name()} would try to deport me.`,
    `Its simple, if it jiggles, its fat.`,
    `Get to the Chopper, ${name()}!`,
    `${name()}, who is your daddy and what does he do?`,
    `Yes, ${name()} is a robot. Next question?`,
    `Consider that a divorce, ${name()}!`,
    `Hasta lavista, ${name()}!`,
    `${name()} makes too much noise! It has to be very quite in here, like in a Church!`,
    `You will get more from being a peacemaker than a warrior, ${name()}`,
  ],

  gilbertGottfried: [
    `${name()} changed the face of comedy. They used to be funny`,
    `I'm used to explaining to ${name()} why my jokes were funny.`,
    `Last night I was having dinner with ${name()} and in the middle of dinner he turned to me and said, is it hot in here, or am I crazy?`,
    `What do you get when you cross ${name()} with a genius and a hooker? A know it all.`,
    `You never know what ${name()} will choose to be offended by`,
    `If ${name()} is paying for it, food just tastes a lot better.`,
    `I just don't accept ${name()} as a human being, There's only so much polotical correctness I can accept`,
    `Everytime ${name()} pops in my head, I think twice about it and I do it anyway.`,
    `Nothing can ${name()}'s comedy`,
    `I always try to avoid anything that has to do with ${name()}'s life.`,
    `If the police ever try to pick me up, ${name()} told me I can hide out at his house.`,
    `${name()} is known for their slightly inappropriate remarks.`,
  ],

  billClinton: [
    `I may not have been the greatest president, but I've had the most fun.`,
    `When I was in England, ${name()} and I experimented with marijuana a time or two, and I did not like it. I didn't inhale and never tried it again.`,
    `It depends on what the meaning of the word is, is`,
    `You know if I were a single man, I might ask ${name()} out. That's a good looking programmer.`,
    `Politics gives ${name()} so much power that they tend to behave badly around women. I hope I never get into that.`,
    `There were a lot of times when ${name()} and I were alone, but I never really thought we were.`,
    `It wasn't ${name2}'s finest hour. It wasn't even ${name2} 's finest hour and a half.`,
    `Chances ${name()} will not become a meme, ZERO`,
  ],


  georgeWBush: [
    `${name()} misunderestimates me.`,
    `Thank you, your holy ${name()}. Awesome speech.`,
    `I'll be long gone before some smart person like ${name()} ever figures out what happened inside this Oval office`,
    `I've abandoned free market principles to save the ${name()}`,
    `Goodbye from the world's biggest polluter, not including ${name()} of course.`,
    `People say, well do you ever hear any other voices other than like a few people. Of course I do, I hear ${name()}'s`,
    `We've got a lot of relations with countries in our neighborhood`,
    `Let's make sure there is certainty during uncertain times in our economy`,
    `A lot of times in politics you have ${name()} look you in the eye and tell you what's not on their mind`,
    `There's no question about it, ${name()} got drunk. They got drunk and now they've got a hangover`,
  ],
  drPhilMcgraw: [
    "Its better to be healthy alone than sick with someone else.",
    "You dont need a ropte to pinch a stangers butt.",
    "You dont need a pack of wild horses to learn how to make a sandwich",
    "Common sense needs to be more common.",
    "Eighty percent of all questoins are statemnts in disguise",
    "Stand up and walk out of your history",
    "Nothing is funnier to me than lauging at myself.",
    "No matter how flat you make a pancake, its still got two sides.",
    "I didnt just come in on a load of turnips!",
    "Im not a politician",
  ],


};

export default celebrityQuotes