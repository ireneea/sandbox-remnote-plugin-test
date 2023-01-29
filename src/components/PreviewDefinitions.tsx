import React from 'react';
import { DefinitionData, Meaning, Phonetic } from '../services/dictionary-api';
import { PartOfSpeechMeanings } from './PartOfSpeechMeanings';
import { WordDefinitionTitle } from './WordDefinitionTitle';
import { groupBy } from '../utils';

export interface WordDefinition {
  word: string;
  partOfSpeech: string;
  meanings: Meaning[];
  phonetic?: Phonetic;
}

export interface PreviewDefinitionsProps {
  wordData: DefinitionData;
  onSelectDefinition?: (wordDefinition: WordDefinition) => void;
}

export const PreviewDefinitions: React.FC<PreviewDefinitionsProps> = ({ wordData, onSelectDefinition }) => {

  const { meanings, phonetics, word } = wordData;
  const phonetic = phonetics[0];
  const audio = phonetic?.audio;
  const groupedMeanings = groupBy(meanings, (x) => x.partOfSpeech);

  return (
    <div>
      <WordDefinitionTitle word={word} audio={audio} />

      {
        Object.entries(groupedMeanings)
          .map(([partOfSpeech, partOfSpeechMeanings]) => (
            <PartOfSpeechMeanings
              partOfSpeech={partOfSpeech}
              meanings={partOfSpeechMeanings}
              onSelectDefinition={
                onSelectDefinition ? () => onSelectDefinition({
                    word,
                    partOfSpeech,
                    meanings: partOfSpeechMeanings,
                    phonetic
                }) : undefined
            }

            />
          ))
          .flat()
      }
    </div>
  );

};