
 import React, { useEffect, useState } from 'react';
 import Navbar from './Navbar';
 import TrendingSlider from './TrendingSlider';
 import { useParams } from 'react-router-dom';
 import  {translateText}  from './translateText'; 
 import './RecipeId.css';
 // Import the updated translateText function
 
 const RecipeId = () => {
   const { idMeal } = useParams();
   const [data, setData] = useState({});
   const [active, setActive] = useState('ingredient');
   const [translatedText, setTranslatedText] = useState('');
   const [language, setLanguage] = useState('en'); // default language
 
   useEffect(() => {
     const fetchData = async () => {
       const api = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
       const data = await api.json();
       setData(data.meals[0]);
     };
     fetchData();
   }, [idMeal]);
 
   const handleTranslate = async (text, lang) => {
     try {
       const translated = await translateText(text, lang);
       setTranslatedText(translated);
     } catch (error) {
       console.error("Translation error:", error);
     }
   };
 
   const handleVoiceCommand = (text) => {
     const speech = new SpeechSynthesisUtterance(text);
     speech.lang = language;
     window.speechSynthesis.speak(speech);
   };
 
   return (
     <>
       <Navbar />
       <div style={{ width: '90%', margin: 'auto', textAlign: 'center' }}>
         <h1>{data.strMeal}</h1>
         <div style={{ display: 'flex' }}>
           <div className="img" style={{ width: '30%', marginTop: '2rem' }}>
             <img src={data.strMealThumb} alt="" style={{ width: '18rem' }} />
           </div>
           <div className="content" style={{ width: '60%' }}>
             <button className="btn" onClick={() => setActive('ingredient')}>Ingredient</button>
             <button className="btn" onClick={() => setActive('instruction')}>Instruction</button>
 
             {active === 'ingredient' ? (
               <div>
                 {[...Array(20)].map((_, index) => {
                   const ingredient = data[`strIngredient${index + 1}`];
                   const measure = data[`strMeasure${index + 1}`];
                   return ingredient ? (
                     <div key={index} style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                       {ingredient} - {measure}
                     </div>
                   ) : null;
                 })}
               </div>
             ) : (
               <>
                 <p>{data.strInstructions}</p>
                 <button onClick={() => handleTranslate(data.strInstructions, language)} className='translatebtn'>Translate</button>
                 <p>{translatedText}</p>
                 <button onClick={() => handleVoiceCommand(translatedText || data.strInstructions)} className="speakbtn">Speak</button>
                 <div style={{ marginTop: '1rem' }}>
                   <label htmlFor="language">Choose Language:  </label>
                   <select id="language" onChange={(e) => setLanguage(e.target.value)}>
                     <option value="en">English</option>
                     <option value="hi">Hindi</option>
                     <option value="ta">Tamil</option>
                     <option value="te">Telugu</option>
                     <option value="bn">Bengali</option>
                     <option value="mr">Marathi</option>
                     <option value="pa-IN">Punjabi</option> {/* Added Punjabi */}
                     <option value="ur">Urdu</option>    {/* Added Urdu */}
                     <option value="gu">Gujarati</option> {/* Added Gujarati */}
                   </select>
                 </div>
               </>
             )}
           </div>
         </div>
       </div>
       <div style={{ marginTop: '1rem' }}>
         <TrendingSlider />
       </div>
     </>
   );
 };
 
 export default RecipeId;

 







