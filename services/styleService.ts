import { ArtStyle } from '../constants';

const ALL_EXTRA_STYLES: ArtStyle[] = [
  { name: "Pop Art", imageUrl: "https://images.unsplash.com/photo-1503434396599-0bab4e485c92?w=200&h=200&fit=crop&q=80" },
  { name: "Surrealism", imageUrl: "https://images.unsplash.com/photo-1533318100771-78563327d4ae?w=200&h=200&fit=crop&q=80" },
  { name: "Minimalist", imageUrl: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=200&h=200&fit=crop&q=80" },
  { name: "Art Deco", imageUrl: "https://images.unsplash.com/photo-1617052445855-44243b23c9dd?w=200&h=200&fit=crop&q=80" },
  { name: "Baroque", imageUrl: "https://images.unsplash.com/photo-1615411883394-350736183424?w=200&h=200&fit=crop&q=80" },
  { name: "Cubism", imageUrl: "https://images.unsplash.com/photo-1579541629828-5645aa197491?w=200&h=200&fit=crop&q=80" },
  { name: "Gothic", imageUrl: "https://images.unsplash.com/photo-1531973576160-712576b67565?w=200&h=200&fit=crop&q=80" },
  { name: "Futurism", imageUrl: "https://images.unsplash.com/photo-1632266808149-a2f2b3493e19?w=200&h=200&fit=crop&q=80" },
  { name: "Abstract Expressionism", imageUrl: "https://images.unsplash.com/photo-1535498730771-e735b998cd64?w=200&h=200&fit=crop&q=80" },
];

/**
 * Simulates fetching a list of additional available art styles from an API.
 * In a real application, this would make a network request.
 * @returns A promise that resolves to an array of style objects.
 */
export const fetchAvailableStyles = (): Promise<ArtStyle[]> => {
  return new Promise((resolve) => {
    // Simulate a 1-second network delay to mimic an API call
    setTimeout(() => {
      resolve(ALL_EXTRA_STYLES);
    }, 1000);
  });
};
