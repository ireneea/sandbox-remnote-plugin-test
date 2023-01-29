import React from 'react';
import { DefinitionData } from '../services/dictionary-api';


export interface PreviewDefinitionsProps {
  wordData: DefinitionData;
}

export const PreviewDefinitions: React.FC<PreviewDefinitionsProps> = (props) => {

  return <div>{JSON.stringify(props, null, 2)}</div>;

};