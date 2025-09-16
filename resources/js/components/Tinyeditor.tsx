import { Editor } from '@tinymce/tinymce-react';
import { useRef } from 'react';

interface TextEditorProps {
  value: string;
  onChange: (content: string) => void;
  label?: string;
}

export default function TextEditor({ value, onChange, label }: TextEditorProps) {
  const editorRef = useRef<any>(null);

  return (
    <div className="w-full">
      {label && <label className="mb-2 block text-sm font-medium text-zinc-700">{label}</label>}

      <div className="border rounded-md shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
        <Editor
          apiKey="no-api-key" // Replace with your TinyMCE API key if needed
          onInit={(_, editor) => (editorRef.current = editor)}
          value={value}
          onEditorChange={onChange}
          init={{
            height: 300,
            menubar: false,
            branding: false,
            toolbar:
              'undo redo | bold italic underline | blocks fontfamily fontsize | link image media table | alignleft aligncenter alignright alignjustify | outdent indent | removeformat | preview',
            plugins: [
              'advlist',
              'autolink',
              'lists',
              'link',
              'image',
              'charmap',
              'preview',
              'anchor',
              'searchreplace',
              'visualblocks',
              'code',
              'fullscreen',
              'insertdatetime',
              'media',
              'table',
              'help',
              'wordcount',
            ],
            font_family_formats:
              'Sans Serif=sans-serif;Serif=serif;Monospace=monospace;Arial=arial,helvetica,sans-serif;Courier New=courier new,courier;Times New Roman=times new roman,times;',
            fontsize_formats: '12px 14px 16px 18px 24px 36px 48px',
            block_formats:
              'Paragraph=p; Heading 1=h1; Heading 2=h2; Heading 3=h3; Preformatted=pre',
            content_style: 'body { font-family:Inter,Arial,sans-serif; font-size:14px }',
          }}
        />
      </div>
    </div>
  );
}
