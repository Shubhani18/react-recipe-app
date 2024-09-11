// import axios from 'axios';

// const translateText = async (text, targetLang) => {
//   const maxCharacters = 500; // Maximum characters that MyMemory API can handle in one request
//   const textChunks = [];
//   let startIndex = 0;

//   while (startIndex < text.length) {
//     const chunk = text.slice(startIndex, startIndex + maxCharacters);
//     textChunks.push(chunk);
//     startIndex += maxCharacters;
//   }

//   try {
//     const translatedChunks = await Promise.all(
//       textChunks.map(async (chunk) => {
//         const response = await axios.get('https://api.mymemory.translated.net/get', {
//           params: {
//             q: chunk,
//             langpair: `en|${targetLang}`,
//           },
//         });

//         if (response.data.responseStatus === 200) {
//           return response.data.responseData.translatedText;
//         } else {
//           console.error('Translation API error:', response.data);
//           return "Translation failed";
//         }
//       })
//     );

//     return translatedChunks.join(' ');

//   } catch (error) {
//     console.error('Translation request failed:', error);
//     return "Translation failed";
//   }
// };

// export default translateText;
import axios from 'axios';

export const translateText = async (text, targetLang) => {
  const maxCharacters = 500; // Maximum characters that MyMemory API can handle in one request
  const textChunks = [];
  let startIndex = 0;

  while (startIndex < text.length) {
    const chunk = text.slice(startIndex, startIndex + maxCharacters);
    textChunks.push(chunk);
    startIndex += maxCharacters;
  }

  try {
    const translatedChunks = await Promise.all(
      textChunks.map(async (chunk) => {
        const response = await axios.get('https://api.mymemory.translated.net/get', {
          params: {
            q: chunk,
            langpair: `en|${targetLang}`,
          },
        });

        if (response.data.responseStatus === 200) {
          return response.data.responseData.translatedText;
        } else {
          console.error('Translation API error:', response.data);
          return "Translation failed";
        }
      })
    );

    return translatedChunks.join(' ');

  } catch (error) {
    console.error('Translation request failed:', error);
    return "Translation failed";
  }
};
