import { useState, useEffect } from 'react';
import { renderWidget, SelectionType, usePlugin, useTracker } from '@remnote/plugin-sdk';

import { useDebounce } from '../hooks';
import { cleanSelectedText } from '../utils';
import { DefinitionData, getTermDefinitionData } from '../services/dictionary-api';
import { PreviewDefinitions } from '../components/PreviewDefinitions';

export const SelectedTextDictionary = () => {
  const plugin = usePlugin();

  const [wordData, setWordData] = useState<DefinitionData>();

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
        const data = await getTermDefinitionData(searchTerm);
        setWordData(data);
      } catch (e) {
        console.error(e);
      }
    };

    getAndSetData();
  }, [searchTerm]);


  return (
    <div className="min-h-[200px] max-h-[500px] overflow-y-scroll m-4">
      { wordData && <PreviewDefinitions wordData={wordData} /> }
    </div>
  );
};

renderWidget(SelectedTextDictionary);
