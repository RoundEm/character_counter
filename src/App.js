import { useState, useEffect } from 'react'
import "./styles.css";

const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

export default function App() {
  const [characters, setCharacters] = useState('')
  const [charTotals, setCharTotals] = useState({})
  console.log('characters: ', characters)
  console.log('charTotals: ', charTotals)
  
  useEffect(() => {
    console.log('useEffect')
    calcCharTotals()
    // Side Question: why does this eslint warning say to add  `calcCharTotals` function to deps when doing so causes infinite loops?
  }, [characters])

  function handleInputChange(e) {
    // const charEntered = e.nativeEvent.data
    // console.log('charEntered: ', charEntered)
    const allCharsEntered = e.target.value
    console.log('allCharsEntered: ', allCharsEntered)
    setCharacters(allCharsEntered)
    // When using this instead of setting `charTotals` from useEffect, the individual character counts in the UI table don't reflect the last key pressed
    // calcCharTotals()
  }

  function calcCharTotals() {
    const totalsReduced = characters
      .split('')
      .reduce((totals, char) => {
        const currentChar = char.toUpperCase()
        if (alphabet.includes(currentChar)) {
          if (!totals[currentChar]) {
            totals[currentChar] = 1
          } else {
            totals[currentChar] = ++totals[currentChar]
          }
        } else {
          totals['nonAlphaChars'] = ++totals['nonAlphaChars']
        }
        
        return totals
    }, { nonAlphaChars: 0 })
    // console.log('totals: ', totals)
    setCharTotals(totalsReduced)
  }

  return (
    <div>
      <h1>Character Counter</h1>
      <h2>Characters: {characters.length}</h2>

      <table>
        <thead>
          <tr>
            {alphabet.map((letter, i) => {
              return <th key={i}>{letter}</th>
            })}
            <th>Other</th>
          </tr>
        </thead>
        
        <tbody>
          <tr>
            {alphabet.map((letter, i) => {
              return (
                <td key={i}>{charTotals[letter]}</td>
              )
            })}
            <td key='other'>
              {charTotals['nonAlphaChars'] || ''}
            </td>
          </tr>
        </tbody>
      </table>

      <textarea 
        placeholder='Text goes here...'
        rows='6' 
        cols='50'
        onChange={handleInputChange}
        value={characters}
      >
      </textarea>
    </div>
  );
}
