/** Type for eleventy post collection objects */
export interface PostObject {
  /** The data associated with the post */
  data: PostObjectData;
  /** The rendered content of the post */
  templateContent: string;
}

export interface PostObjectData {
  /** A list of tags */
  tags: string[];
  /** The post date */
  date: Date;
  dateFormat?: string;
  title?: string;
  subtitle?: string;
  /** The type of post (e.g., note, article, book) */
  type: string;
  /** The plural form of the post type (e.g., notes, articles, books) */
  typePlural?: string;
  responseData?: ResponseData;
  /** A list of post updates */
  updates?: PostUpdate[];
  /** The date the post was last updated */
  lastUpdated: string;
  /** A custom slug for the post URL */
  slug?: string;
  /** A review rating from 1-5 */
  rating?: number;
  /** Object describing the book microformats */
  'read-of'?: ReadOf;
  'watch-of'?: object;
  /** The URL of the recipe post */
  'eat-of'?: string;
}

export interface ResponseData {
  plaintextSummary: string;
  content?: string;
  name?: string;
}

export interface PostUpdate {
  /** The date of the update */
  date: string;
  /** Description of the update */
  description?: string;
}

export interface ReadOf {
  /** The type of the reference (e.g., cite) */
  type: string;
  /** The name of the book or reference */
  name: string;
  /** Optional URL to a photo or cover image */
  photo?: string;
  /** The author of the book or reference */
  author: string;
  /** Unique identifier for the reference */
  uid: string;
  /** URL to the reference */
  url: string;
}
