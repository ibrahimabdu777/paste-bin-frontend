import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import AddSnippet from "./AddSnippet";
import Snippet from "./Snippet";
import { ISnippet, NewSnippet } from "./../utils/Interfaces";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SnippetListItem from "./SnippetListItem";

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
  const routes = snippets.map((snippet) => {
    const object:any = {}
    object.title = snippet.title
    object.route = `/${snippet.title}`
    object.text = snippet.text
    return object
  })
  console.log(routes)
  const routeComponents = routes.map(({route, title, text}, idx) => <Route exact path={route} key={idx}> <Snippet title={title} key={idx} text={text}/></Route>)
  return (
    <>
    <BrowserRouter>
    <AddSnippet
        newSnippet={newSnippet}
        onTitleChange={onTitleChange}
        onTextChange={onTextChange}
        onSnippetSubmit={onSnippetSubmit}
      />
      <ul> 
          {snippets.map((snippet, idx) => <SnippetListItem title={snippet.title} key={idx}/>)}

      </ul>
      <Switch>

          {/* {snippets.map((snippet, idx) => {<Route exact path={`/${snippet.title}`} key={idx} component={Snippet}><Snippet title={snippet.title} text={snippet.text} key={idx}/></Route>})} */}
        {routeComponents}
      </Switch>
      {/* {snippets.map((snippet, idx) => (
        <Snippet title={snippet.title} text={snippet.text} key={idx} />
      )).reverse()} */}

    </BrowserRouter>
    
      
    </>
  );
}
