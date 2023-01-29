import React from 'react';

export interface WordDefinitionTitleProps {
  word: string;
  audio?: string
}

export const WordDefinitionTitle = ({ word, audio }: WordDefinitionTitleProps) => {
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