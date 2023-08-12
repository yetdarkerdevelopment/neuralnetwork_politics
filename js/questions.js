let current_question = -1;
let answers = [];
let questions = [
    "Victimless crimes shouldn't be crimes at all.",
    "One should be willing to sacrifice themselves for their ideology.",
    "Not all market economies are capitalist.",
    "Personal ownership of firearms should be prohibited.",
    "Everyone should have access to free, universal and quality healthcare.",
    "Taxes should be increased, in general.",
    "Climate change is real.",
    "We should be protecting environment.",
    "Primary education should be free and publicly managed.",
    "Government should provide financial assistance to students.",
    "All nations should adopt open border policy.",
    "Death penalty should be used.",
    "Abortions should be allowed.",
    "Freedoms should be prioritized over security in majority of cases. ",
    "Government should invest in nuclear energy.",
    "Marihuana use should be legal for recreational purposes. ",
    "Military spending should increase.",
    "All residents of a territory have the right to affect it's governance.",
    "Central government should have more power.",
    "There should be no autonomous governmental subunits.",
    "Immigration should be lowered.",
    "Government should regulate the internet.",
    "Universal Basic Income has good ideas.",
    "Government or community should raise children, rather than their parents doing so.",
    "Conspiracy theories are usually correct.",
    "Randomness should be involved in political decision making.",
    "Prices should be based on supply and demand.",
    "Money should be abolished.",
    "Workers are entitled to the full value of their labor.",
    "Separation of church and state is important.",
    "Schools should teach students to follow atheism.",
    "Religious officials should not be able to run for governmental positions.",
    "Right to start a business is essential to the economy. ",
    "Landlords provide a valuable service.",
    "Electricity should be free to use.",
    "All industries should be privatized.",
    "We should praise our national symbols, such as national anthem.",
    "There is no difference between people, identity is an unnecessary social construct.",
    "We should tear down every social construct.",
    "Traditional family unit should be protected.",
    "The economy should be organized by profession groups performing their function.",
    "People should not be treated differently because of their origin.",
    "Inheritance should be abolished.",
    "People shouldn't be allowed to rise in socioeconomic class system.",
    "We should establish a world government",
    "Experts should be the ones to make decisions.",
    "Only those who served in the military should be allowed in politics.",
    "Interests of the whole are more important than interests of the few.",
    "Everyone's needs must be unconditionally met.",
    "Sectional interests must be secondary to national interests.",
    "There is no individual, only the collective.",
    "Mass surveillance of the populace is a must. ",
    "Technological development past agriculture was a mistake.",
    "Artificial intelligence should surpass humanity.",
    "Automation is always beneficial.",
    "Life is meaningless.",
    "Murder should be legal.",
    "State should control all property.",
    "Planned economy is the best tool for growing an economy.",
    "Marx's historical materialism is a valid analysis of history.",
    "Classes should cooperate, not be in conflict.",
    "Worker unionization should be mandatory.",
    "Unions should have greater influence.",
    "Euthanasia should be legal.",
    "One person or entity should hold absolute power.",
    "Might makes right.",
    "Empathy is weakness.",
    "An individual should free themselves from spooks that collectives impose on them.",
    "Marriage should be abolished.",
    "Not all races are equal.",
    "Some ethnicities are inferior.",
    "Personal property should become collective property instead.",
    "Political extremism is bad and dangerous.",
    "There should be no economic regulations.",
    "Private property should be as widely owned as possible.",
    "Big corporations are inherently bad.",
    "Monopolies are good for the economy.",
    "The rich should rule.",
    "Corporations should rule.",
    "Creationism is not a myth.",
    "There is spiritual, not just material in this world.",
    "Society should collapse so a new better system rises from the ashes.",
    "Free will should be abolished using mind control.",
    "Nineteen Eighty Four has good ideas to put in practice.",
    "Reality is a lie.",
    "A nuclear war would be beneficial.",
    "Mental illness is a social construct.",
    "Existence is a social construct.",
    "There is a god.",
    "We should invade other countries.",
    "All hierarchies are unjust, everything should be voluntary.",
    "Law enforcement needs more power.",
    "Drivers license is an unjust, authoritarian concept.",
    "Competition is necessary for the economy.",
    "We should augment our bodies with machines.",
    "Pornography should be banned.",
    "Government should adopt a strict dress code for its citizens.",
    "Intellectual property is illegitimate.",
    "Old culture should be rid of and replaced with novelty.",
    "Government should implement a cult of personality."
];

function nextQuestion() {
    current_question += 1;
    if (current_question != questions.length) {
        questionElement = document.getElementById("question");
        questionElement.innerHTML = `${current_question + 1}. ${questions[current_question]}`;
    }
    else {
        answers_string = `answ=${answers[0]}`;
        for (let i = 1; i < answers.length; i += 1) {
            answers = answers_string + `&answ=${answers[i]}`;
        }
        window.location.assign(`https://yetdarkerdevelopment.github.io/dozenvalues/results.html?${answers}`);
    }
}

function backQuestion() {
    if (current_question > 0) {
        current_question -= 1;
        questionElement = document.getElementById("question");
        questionElement.innerHTML = `${current_question + 1}. ${questions[current_question]}`;
        answers.pop();
    }
}

let yesBtn = document.getElementById("yesBtn");
let unsureBtn = document.getElementById("unsureBtn");
let noBtn = document.getElementById("noBtn");
let backBtn = document.getElementById("backBtn");

yesBtn.onclick = function () {
    answers.push(0);
    nextQuestion();
}
unsureBtn.onclick = function () {
    answers.push(1);
    nextQuestion();
}
noBtn.onclick = function () {
    answers.push(2);
    nextQuestion();
}
backBtn.onclick = backQuestion;

nextQuestion();
