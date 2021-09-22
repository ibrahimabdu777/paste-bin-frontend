import { AddSnippetProps } from "../utils/Interfaces";

export default function AddSnippet({
  newSnippet,
  onTitleChange,
  onTextChange,
  onSnippetSubmit,
}: AddSnippetProps): JSX.Element {
  return (
    <>
      <form onSubmit={onSnippetSubmit}>
        <input value={newSnippet.title} onChange={onTitleChange} />
        <input value={newSnippet.text} onChange={onTextChange} />
        <input type="submit" value="submit" />
      </form>
    </>
  );
}
