import { useEffect } from 'react';

import { $convertToMarkdownString, TRANSFORMERS } from '@lexical/markdown';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';

import { ChatTheme } from './Theme/ChatTheme';

const editorConfig = {
  namespace: 'TextareaLexical',
  theme: ChatTheme,

  onError(error: any) {
    throw error;
  },

  nodes: [],
};

function OnChangePlugin({
  setValue,
}: {
  setValue?: (markdown: string) => void;
}) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerUpdateListener(() => {
      editor.update(() => {
        const markdown = $convertToMarkdownString([...TRANSFORMERS]);
        if (setValue) setValue(markdown);
      });
    });
  }, [editor, setValue]);

  return null;
}

const TextareaLexical = ({
  setValue,
}: {
  setValue: (value: string) => void;
}) => {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <RichTextPlugin
        contentEditable={<ContentEditable spellCheck={false} />}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <OnChangePlugin setValue={setValue} />
      <HistoryPlugin />
    </LexicalComposer>
  );
};

export default TextareaLexical;
