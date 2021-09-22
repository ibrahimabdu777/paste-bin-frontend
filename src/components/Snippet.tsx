import { SnippetProps } from "../utils/Interfaces";

export default function Snippet({ title, text }: SnippetProps): JSX.Element {
  return (
    <>
      <h2>{title}</h2>
      <p>{text}</p>
    </>
  );
}
