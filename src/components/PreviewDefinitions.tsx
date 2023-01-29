import React from 'react';
import { DefinitionData } from '../services/dictionary-api';

export interface PreviewDefinitionsProps {
  wordData: DefinitionData;
}

const WordDefinitionTitle = ({ wordData }: PreviewDefinitionsProps) => {
  const { word, phonetics } = wordData;
  const phonetic = phonetics[0];
  const audio = phonetic?.audio;


  return (
    <div id='word-definition-title' className='flex flex-row items-center mb-4'>
      <div id='word-term' className='mr-3 text-lg font-semibold'>{word}</div>
      {audio && (
        <div
          id='word-audio'
          className='w-4 h-2 cursor-pointer'
          onClick={() => new Audio(audio).play()}
        >
          🔊
        </div>
      )}
    </div>
  );
};


export const PreviewDefinitions: React.FC<PreviewDefinitionsProps> = ({ wordData }) => {

  return (
    <div>
      <WordDefinitionTitle wordData={wordData} />
    </div>
  );

};