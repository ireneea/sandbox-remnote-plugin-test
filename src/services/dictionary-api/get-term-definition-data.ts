import { DefinitionData } from './definition-data.interface';

const DICTIONARY_API_URL = 'https://api.dictionaryapi.dev/api/v2';

export const getTermDefinitionData = async (searchTerm: string) => {
  try {
    const response = await fetch(`${DICTIONARY_API_URL}/entries/en/${searchTerm}`);
    const data: DefinitionData[] = await response.json();
    return Array.isArray(data) ? data[0] : undefined;
  } catch (e) {
    console.error(e);
    return undefined;
  }
}