import React, { useEffect, useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import { Node, mergeAttributes } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import TextAlign from '@tiptap/extension-text-align'
import Highlight from '@tiptap/extension-highlight'
import TextStyle from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import Placeholder from '@tiptap/extension-placeholder'
import { Paragraph } from '@tiptap/extension-paragraph'
import { Heading } from '@tiptap/extension-heading'
import { BulletList } from '@tiptap/extension-bullet-list'
import { ListItem } from '@tiptap/extension-list-item'
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';

import {
  Undo,
  Redo,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Quote,
  Bold,
  Italic,
  ImagePlus,
} from 'lucide-react'

import beautify from 'js-beautify'
import './../tiptap.css'

interface TiptapEditorProps {
  content: string
  onChange: (content: string) => void
}

export default function TiptapEditor({ content, onChange }: TiptapEditorProps) {
  const [showHtml, setShowHtml] = useState(false)
  const [codeEditor, setCodeEditor] = useState('')
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: false, paragraph: false,  bulletList: false, listItem: false, }),
      CustomBulletList,
      PlainListItem,
      CustomHeading.configure({ levels: [1, 2, 3] }),
      CustomParagraph,
      Placeholder.configure({ placeholder: 'Type something...' }),
      Link.configure({ openOnClick: false }),
      Underline,
      CustomImages,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Highlight,
      TextStyle,
      Color,
      Div,
      CustomTable.configure({ resizable: false }),
      CustomTableRow,
      CustomTableHeader,
      CustomTableCell,
    ],
    content,
    onUpdate({ editor }) {
      onChange(editor.getHTML())
    },
  })

  const formattedHtml = beautify.html(editor?.getHTML() || '', {
    indent_size: 4,
    wrap_line_length: 90,
  })
  useEffect(() => {
    setCodeEditor(formattedHtml)
  }, [formattedHtml]) 

  // const addImage = () => {
  //   const url = prompt('Enter image URL')
  //   if (url) editor?.chain().focus().setImage({ src: url, class : string }).run()
  // }
  const addImage = () => {
    const url = prompt('Enter image URL')
    if (!url) return

    // Optional: Validate the URL
    try {
      new URL(url)
    } catch (e) {
      return
    }

    const alt = prompt('Enter alt text (optional)') || ''

    editor?.chain().focus().setImage({
      src: url,
      alt,
      class: 'w-full object-cover', // default dynamic class
      width: '100%',
      height: 'auto',
    }).run()
  }


  const toggleHtml = () => {
    editor?.commands.setContent(codeEditor, false)
    setShowHtml(!showHtml)
  }

  const updateFromHtml = (html: string) => {
    onChange(html)
    setCodeEditor(html)

  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1 border p-2 rounded bg-gray-50">
        <button type="button" onClick={() => editor?.chain().focus().undo().run()}><Undo size={18} /></button>
        <button type="button" onClick={() => editor?.chain().focus().redo().run()}><Redo size={18} /></button>
        <button type="button" onClick={() => editor?.chain().focus().toggleBold().run()}><Bold size={18} /></button>
        <button type="button" onClick={() => editor?.chain().focus().toggleItalic().run()}><Italic size={18} /></button>
        <button type="button" onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}><Heading1 size={18} /></button>
        <button type="button" onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}><Heading2 size={18} /></button>
        <button type="button" onClick={() => editor?.chain().focus().toggleBulletList().run()}><List size={18} /></button>
        <button type="button" onClick={() => editor?.chain().focus().toggleOrderedList().run()}><ListOrdered size={18} /></button>
        <button type="button" onClick={() => editor?.chain().focus().toggleBlockquote().run()}><Quote size={18} /></button>
        {/* <button type="button" onClick={addImage}><ImagePlus size={18} /></button> */}
        <button
          type="button"
          className="px-3 py-1 bg-blue-600 text-white rounded"
          onClick={toggleHtml}
        >
          {showHtml ? 'View Editor' : 'View HTML'}
        </button>
      </div>
      {editor && showHtml ? (
        <textarea
          value={codeEditor}
          onChange={(e) => updateFromHtml(e.target.value)}
          className="w-full h-130 p-2 border"
        />
      ) : (
        <EditorContent
          editor={editor}
          className="min-h-[200px] p-2 border rounded bg-white focus:outline-none focus:border-gray-400"
        />
      )}
    </div>
  )
}

const Div = Node.create({
  name: 'div',
  group: 'block',
  content: 'block*',
  addAttributes() {
    return {
      class: {
        default: null,
        parseHTML: element => element.getAttribute('class'),
        renderHTML: attributes => ({ class: attributes.class }),
      },
    }
  },
  parseHTML() {
    return [{ tag: 'div' }]
  },
  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes), 0]
  },
})

const CustomHeading = Heading.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      class: {
        default: null,
        parseHTML: element => element.getAttribute('class'),
        renderHTML: attributes => ({ class: attributes.class }),
      },
    }
  },
})

const CustomParagraph = Paragraph.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      class: {
        default: null,
        parseHTML: element => element.getAttribute('class'),
        renderHTML: attributes => ({ class: attributes.class }),
      },
    }
  },
})
const CustomBulletList = BulletList.extend({
  addAttributes() {
    return {
      class: {
        default: null,
        parseHTML: element => element.getAttribute('class'),
        renderHTML: attributes => {
          return {
            class: attributes.class,
          }
        },
      },
    }
  },
})
const PlainListItem = ListItem.extend({
  content: 'text*', // allow only inline text, no paragraphs
})

const CustomTable = Table.extend({
  addAttributes() {
    return {
      class: {
        default: null,
        parseHTML: element => element.getAttribute('class'),
        renderHTML: attributes => ({
          class: attributes.class,
        }),
      },
    };
  },
});

const CustomTableCell = TableCell.extend({
  addAttributes() {
    return {
      class: {
        default: null,
        parseHTML: element => element.getAttribute('class'),
        renderHTML: attributes => ({
          class: attributes.class,
        }),
      },
    };
  },
});

const CustomTableHeader = TableHeader.extend({
  addAttributes() {
    return {
      class: {
        default: null,
        parseHTML: element => element.getAttribute('class'),
        renderHTML: attributes => ({
          class: attributes.class,
        }),
      },
    };
  },
});

const CustomTableRow = TableRow.extend({
  addAttributes() {
    return {
      class: {
        default: null,
        parseHTML: element => element.getAttribute('class'),
        renderHTML: attributes => ({
          class: attributes.class,
        }),
      },
    };
  },
});

const CustomImages = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      class: {
        default: null,
        parseHTML: element => element.getAttribute('class'),
        renderHTML: attributes => {
          return attributes.class ? { class: attributes.class } : {}
        },
      },
    }
  },
})