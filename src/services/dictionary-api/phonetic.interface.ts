import { License } from './license.interface';

export interface Phonetic {
  audio: string;
  sourceUrl: string;
  license: License
  text: string;
}