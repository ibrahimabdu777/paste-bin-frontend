import { ChangeEventHandler, Dispatch, FormEventHandler, SetStateAction } from "react";
import { Set } from "typescript";

export interface ISnippet {
  title: string;
  text: string;
  created_at: string;
  id: number;
}

export interface SnippetProps {
  title: string;
  text: string;
  id: number;
  created_at: string;
  snippets: ISnippet[];
  setSnippets: Dispatch<SetStateAction<ISnippet[]>>

}

export interface AddSnippetProps {
  newSnippet: NewSnippet;
  onTitleChange: ChangeEventHandler<HTMLInputElement>;
  onTextChange: ChangeEventHandler<HTMLInputElement>;
  onSnippetSubmit: FormEventHandler<HTMLFormElement>;
}

export interface NewSnippet {
  title: string;
  text: string;
}

export interface IObject {
  text: string;
  title: string;
  route: string;
  id: number;
  created_at: string;
}

export interface SnippetListItemProps {
  title: string;
  id: number;
  key: number;
}