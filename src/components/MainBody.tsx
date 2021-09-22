import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import AddSnippet from "./AddSnippet";
import Snippet from "./Snippet";
import { ISnippet, NewSnippet } from "./../utils/Interfaces";

export default function MainBody(): JSX.Element {
  const [snippets, setSnippets] = useState<ISnippet[] | NewSnippet[]>([]);
  const [newSnippet, setNewSnippet] = useState<NewSnippet>({
    title: "",
    text: "",
  });
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    console.log("making another get req");
    const response = await fetch("http://localhost:4000/pastes/");
    const json = await response.json();
    console.log(json);
    setSnippets(json.data.snippets);
  };
  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setNewSnippet({ ...newSnippet, title: e.target.value });
  const onTextChange = (e: ChangeEvent<HTMLInputElement>) =>
    setNewSnippet({ ...newSnippet, text: e.target.value });
  const onSnippetSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSnippet),
      };
      const response = await fetch("http://localhost:4000/pastes/", options);
      console.log(response.body);
      setSnippets([...snippets, newSnippet]);
    } catch (e) {
      console.log(e);
    }
    getData();
  };
  return (
    <>
      {snippets.map((snippet, idx) => (
        <Snippet title={snippet.title} text={snippet.text} key={idx} />
      ))}

      <AddSnippet
        newSnippet={newSnippet}
        onTitleChange={onTitleChange}
        onTextChange={onTextChange}
        onSnippetSubmit={onSnippetSubmit}
      />
    </>
  );
}
