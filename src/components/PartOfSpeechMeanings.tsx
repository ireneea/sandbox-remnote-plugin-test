import React from 'react';
import { Meaning } from '../services/dictionary-api';

export interface PartOfSpeechMeaningsProps {
  partOfSpeech: string;
  meanings: Meaning[];
  onSelectDefinition?: () => void;
}

export const PartOfSpeechMeanings = ({ partOfSpeech, meanings, onSelectDefinition }: PartOfSpeechMeaningsProps) => {
  return (
    <div id='part-of-speech-meanings' className='mb-4'>
      <div className="flex flex-row items-center mb-3">
        <div id='part-of-speech' className='text-base font-medium mr-3'>
          {partOfSpeech}
        </div>
        {
          onSelectDefinition && (
            <div
              className="cursor-pointer"
              onClick={() => onSelectDefinition()}
            >
              💾
            </div>
          )
        }

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