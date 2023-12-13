const isRelevant = (topics, sentence) => {
    //Checking to see if any topic word is in the sentence 
    return topics.some(topic => sentence.includes(topic));
};

const about = (topics) => {
    return (sentence) => isRelevant(topics, sentence);
};

const getRelevantSentences = (criterion, sentences) => {
    //Filtering sentences based on the criterion function
    return sentences.filter(criterion);
};

const getDistanceByLength = (str1, str2) => {
    return Math.abs(str1.length - str2.length);
};

const getClosestWord = (word, words, distanceFn, threshold) => {
    //Find the word with the minimum distance using the distance function
    const closestWord = words.reduce((minWord, currentWord) =>{
        const distance =distanceFn(word, currentWord);
        return distance <= threshold && distance < distanceFn(word, minWord)
        ? currentWord
        : minWord;
    }, word);
    
    return closestWord;
};



const getClosestWordByLength = (word, words, threshold) => {
    return getClosestWord(word, words, getDistanceByLength, threshold);
};


//Below are some of the simple test cases
//The logs to print out the expected output first. 

console.log('---isRelevant---');
const sentence = 'the quick brown fox jumps over the lazy dog';
const catWords = ['cat' , 'kitten'];
const dogWords = ['dog' , 'puppy'];

console.log(true, isRelevant(dogWords, sentence));
console.log(false, isRelevant(catWords, sentence));

console.log('--- about ---');
const aboutDogs = about(dogWords);
console.log(true, aboutDogs(sentence));
console.log(false, aboutDogs('this sentence is about cats'));

console.log('--- getRelevantSentences ---');
const sentences = [
    'I have a pet dog',
    'I have a pet cat',
    'I do not have any pets',
];
console.log(['I have a pet dog'], getRelevantSentences(aboutDogs, sentences));
console.log(
    ['I do not have any pets'],
    getRelevantSentences((s) => s.length < 17, sentences)
);

console.log('--- getClosestWord ---');
let words = ['bed', 'bank', 'fence', 'bridges'];
console.log("bed", getClosestWord("hi", words, getDistanceByLength, 3));
console.log("hi", getClosestWord("hi", words, getDistanceByLength, 0));
console.log("fence", getClosestWord("rivers", words, getDistanceByLength, 2));

console.log("--- getClosestWordByLength ---");
console.log("bed", getClosestWordByLength("hi", words, 3));
console.log("hi", getClosestWordByLength("hi", words, 0));
console.log("fence", getClosestWordByLength("rivers", words, 2));
