
const ALL_EXTRA_STYLES: string[] = [
  "Pop Art",
  "Surrealism",
  "Minimalist",
  "Art Deco",
  "Baroque",
  "Cubism",
  "Gothic",
  "Futurism",
  "Abstract Expressionism",
];

/**
 * Simulates fetching a list of additional available art styles from an API.
 * In a real application, this would make a network request.
 * @returns A promise that resolves to an array of style strings.
 */
export const fetchAvailableStyles = (): Promise<string[]> => {
  return new Promise((resolve) => {
    // Simulate a 1-second network delay to mimic an API call
    setTimeout(() => {
      resolve(ALL_EXTRA_STYLES);
    }, 1000);
  });
};
