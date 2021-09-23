import { FormEventHandler, useEffect, useState } from "react";
import { ISnippet} from "../utils/Interfaces";
import { useHistory } from "react-router";

export default function Snippet({id , snippets, setSnippets}: any): JSX.Element {
  const [clickedSnippet, setClickedSnippet] = useState<ISnippet>({title: '', text: '', id: 0, created_at: ''})
  // const [editedSnippet, setEditedSnippet] = useState()
 const history = useHistory()
  
  const getSnippet = async () => {
    const response = await fetch(`http://localhost:4000/pastes/${id}`)
    const json = await response.json()
    setClickedSnippet(json.data.snippet[0])
    //setClickedSnippet({...clickedSnippet, title: json.data.snippet.title, text: json.data.snippet.text, id: json.data.snippet.id, created_at: json.data.snippet.created_at})
    
  }
  useEffect(() => {
  getSnippet()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []
  )
 
  const onSnippetSave: FormEventHandler<HTMLFormElement> = async () => {
    const options = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(clickedSnippet),
    }
    const response = await fetch(`http://localhost:4000/pastes/${id}`, options)
    const json = await response.json()
    console.log(json)
    //setClickedSnippet(json.data.snippet[0])  }
    getSnippet() //not sure if this is req
  }
  const deleteSnippet = async () => {
    const options = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }
    const response = await fetch(`http://localhost:4000/pastes/${id}`, options)
    const json = await response.json()
    console.log('deleted snippet', json.data.snippet[0].id)
    // const deletedSnippetId = json.data.snippet[0].id
    // const indexOfDeletedSnippet = snippets.findIndex((snippet: ISnippet) => snippet.id === id)
    setSnippets(snippets.filter((snippet: ISnippet) => snippet.id !== id))
    history.push('/')
  }
  console.log('fetched single snippet', clickedSnippet)
  return (
    <>
      <h2>{clickedSnippet.title}</h2>
      <p>{clickedSnippet.text}</p>
      <form onSubmit={onSnippetSave}>
        <input value={clickedSnippet.title} onChange={(e) => setClickedSnippet({...clickedSnippet, title:e.target.value})}/>
        <input value={clickedSnippet.text} onChange={(e) => setClickedSnippet({...clickedSnippet, text:e.target.value})}/>
        <input type="submit" value="submit" />
      </form>
      <button onClick={deleteSnippet}>Delete Snippet</button>

     

    </>
  )
}
