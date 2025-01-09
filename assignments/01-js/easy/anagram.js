/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
  let a = str1.tolowerCase();
  let b = str2.tolowerCase();

  console.log(str1, str2, a, b);
  let newStr = "";
  if (a.length !== b.length) {
    return false;
  }

  for (let i = 0; i < str1.length; i++) {
    const char = str2[i];
    if (a.indexOf(char) === -1) {
      return false;
    }
  }

  return true;
}

module.exports = isAnagram;
