import { useEffect, useState } from "react";
import { ISnippet} from "../utils/Interfaces";

export default function Snippet({id}: ISnippet): JSX.Element {
  const [clickedSnippet, setClickedSnippet] = useState<ISnippet>({title: '', text: '', id: 0, created_at: ''})
  
 
  
  const getSnippet = async () => {
    const response = await fetch(`http://localhost:4000/pastes/${id}`)
    const json = await response.json()
    setClickedSnippet(json.data.snippet[0])
    //setClickedSnippet({...clickedSnippet, title: json.data.snippet.title, text: json.data.snippet.text, id: json.data.snippet.id, created_at: json.data.snippet.created_at})
    
  }
  useEffect(() => {
  getSnippet()
  }
  )
  console.log('fetched single snippet', clickedSnippet)
  return (
    <>
      <h2>{clickedSnippet.title}</h2>
      <p>{clickedSnippet.text}</p>
    </>
  );
}
