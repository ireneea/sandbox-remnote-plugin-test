import React from 'react';
import { DefinitionData, Meaning } from '../services/dictionary-api';

export interface PreviewDefinitionsProps {
  wordData: DefinitionData;
}

const groupBy = <T, K extends keyof any>(list: T[], getKey: (item: T) => K) =>
  list.reduce((previous, currentItem) => {
    const group = getKey(currentItem);
    if (!previous[group]) previous[group] = [];
    previous[group].push(currentItem);
    return previous;
  }, {} as Record<K, T[]>);


const WordDefinitionTitle = ({ wordData }: PreviewDefinitionsProps) => {
  const { word, phonetics } = wordData;
  const phonetic = phonetics[0];
  const audio = phonetic?.audio;

  return (
    <div id='word-definition-title' className='flex flex-row items-center mb-4'>
      <div id='word-term' className='mr-3 text-lg font-semibold capitalize'>{word}</div>
      {audio && (
        <div
          id='word-audio'
          className='cursor-pointer'
          onClick={() => new Audio(audio).play()}
        >
          🔉
        </div>
      )}
    </div>
  );
};

export interface PartOfSpeechMeaningsProps {
  partOfSpeech: string;
  meanings: Meaning[];
}


const PartOfSpeechMeanings = ({ partOfSpeech, meanings }: PartOfSpeechMeaningsProps) => {
  return (
    <div id='part-of-speech-meanings' className='mb-4'>
      <div id='part-of-speech' className='text-base font-medium mr-3 mb-3'>
        {partOfSpeech}
      </div>
      {
        meanings
          .map((meaning, meaningIndex) =>
            meaning.definitions.map((definition, index) => (
              <div key={`${meaningIndex}-${index}`} className='mb-2'>
                <span className='font-light ml-3'>{index + 1}</span>{'. '}
                <span className='font-medium'>
                  {definition.definition.replace(/\.$/, '')}
                </span>
                {definition.example ? <span className="italic">: {definition.example}</span> : ''}
              </div>
            )))
          .flat()
      }
    </div>
  );
};

export const PreviewDefinitions: React.FC<PreviewDefinitionsProps> = ({ wordData }) => {

  const { meanings } = wordData;
  const groupedMeanings = groupBy(meanings, (x) => x.partOfSpeech);
  return (
    <div>
      <WordDefinitionTitle wordData={wordData} />

      {
        Object.entries(groupedMeanings)
          .map(([partOfSpeech, meanings]) => (
            <PartOfSpeechMeanings partOfSpeech={partOfSpeech} meanings={meanings} />
          ))
          .flat()
      }
    </div>
  );

};