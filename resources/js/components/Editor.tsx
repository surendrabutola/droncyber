
import Editor from "@monaco-editor/react";
import { useState } from "react";

export default function RichEditor() {
  const [html, setHtml] = useState("<h1>Hello HTML</h1>");

  return (
    <div className="h-[400px]">
      <Editor
        height="100%"
        defaultLanguage="html"
        defaultValue={html}
        onChange={(value) => setHtml(value || '')}
      />
    </div>
  );
}

