export interface ExperienceItem {
  id?: number | string;
  company: string;
  role: string;
  period: string;
  highlights: string[];
  image?: string;
  imageURL?: string;
}