import { useState, useEffect } from 'react';
import { renderWidget, SelectionType, usePlugin, useTracker } from '@remnote/plugin-sdk';

import { useDebounce } from '../hooks';
import { cleanSelectedText } from '../utils';
import { DefinitionData, getTermDefinitionData } from '../services/dictionary-api';
import { PreviewDefinitions, WordDefinition } from '../components/PreviewDefinitions';

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

  const addSelectedDefinition = async (wordDefinition: WordDefinition) => {
    try {
      const { word, partOfSpeech, meanings } = wordDefinition;

      const rootRemName = await plugin.settings.getSetting('root') as string;
      if (!rootRemName) {
        await plugin.app.toast('Please set a root rem for the dictionary');
        return;
      }

      const rootRem = await plugin.rem.findByName([rootRemName], null);
      if (!rootRem) {
        await plugin.app.toast(`Root rem named '${rootRemName}' not found `);
        return;
      }

      const wordRem = await plugin.rem.createRem();
      if (wordRem) {
        const wordRemText = `${word} (${partOfSpeech})`;
        const existingWordRem = await plugin.rem.findByName([wordRemText], rootRem._id);

        if (existingWordRem) {
          plugin.app.toast(`Word '${wordRemText}' already exists in the dictionary`);
          return;
        }


        await wordRem.setText([wordRemText]);
        await wordRem.setParent(rootRem._id);

        const definitionRems = meanings
          .map((meaning) => meaning.definitions.map((def) => def.definition))
          .flat();

        for (const definition of definitionRems) {
          const definitionRem = await plugin.rem.createRem();
          if (definitionRem) {
            await definitionRem.setText([definition]);
            await definitionRem.setParent(wordRem._id);
            await definitionRem.setIsCardItem(true);
          }
        }

        plugin.app.toast(`Added '${wordRemText}' to dictionary`);
      }
    } catch (e) {
      plugin.app.toast('Error adding word to dictionary');
    }
  }


  return (
    <div className="min-h-[200px] max-h-[500px] overflow-y-scroll m-4">
      { wordData && <PreviewDefinitions wordData={wordData} onSelectDefinition={addSelectedDefinition}/> }
    </div>
  );
};

renderWidget(SelectedTextDictionary);
