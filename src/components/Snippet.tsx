import { useEffect, useState } from "react";
import { SnippetProps } from "../utils/Interfaces";
import { useParams } from "react-router-dom";

export default function Snippet({ title, text , id}: any): JSX.Element {
  const [clickedSnippet, setClickedSnippet] = useState<any>({data: {snippet : [{}]}})
  
  const params = useParams()
  
  
  
  const getSnippet = async () => {
    const response = await fetch(`http://localhost:4000/pastes/${id}`)
    const json = await response.json()
    setClickedSnippet(json)
    //setClickedSnippet({...clickedSnippet, title: json.data.snippet.title, text: json.data.snippet.text, id: json.data.snippet.id, created_at: json.data.snippet.created_at})
    
  }
  useEffect(() => {
  getSnippet()
  }, []
  )
  console.log('fetched single snippet', clickedSnippet.data.snippet[0])
  return (
    <>
      <h2>{clickedSnippet.data.snippet[0].title}</h2>
      <p>{clickedSnippet.data.snippet[0].title}</p>
    </>
  );
}
