import { useState, useEffect } from 'react';
import { renderWidget, SelectionType, usePlugin, useTracker } from '@remnote/plugin-sdk';

import { useDebounce } from '../hooks';
import { cleanSelectedText } from '../utils';

export const SelectedTextDictionary = () => {
  const plugin = usePlugin();

  const [wordData, setWordData] = useState<string>();

  const searchTerm = useDebounce(useTracker(async (reactActivePlugin) => {
    const sel = await reactActivePlugin.editor.getSelection();
    if (sel?.type == SelectionType.Text) {

      const text = await plugin.richText.toString(sel.richText);
      return cleanSelectedText(text);
    } else {
      return '';
    }
  }), 500);

  useEffect(() => {

    const getAndSetData = async () => {
      if (!searchTerm) {
        return;
      }

      try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchTerm}`);
        const data = await response.json();
        setWordData(Array.isArray(data) ? data[0] : undefined);
      } catch (e) {
        console.error(e);
      }
    }

    getAndSetData();
  }, [searchTerm]);


  return <div>{JSON.stringify(wordData, null, 4)}</div>;
};

renderWidget(SelectedTextDictionary);
