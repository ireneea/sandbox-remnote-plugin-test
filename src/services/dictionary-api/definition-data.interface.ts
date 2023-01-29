import { Phonetic } from './phonetic.interface';
import { Meaning } from './meaning.interface';
import { License } from './license.interface';

export interface DefinitionData {
  word: string;
  phonetics: Phonetic[];
  meanings: Meaning[];
  license: License;
  sourceUrls: string[];
}