export function calculateCosineSimilarity(vectorA: number[], vectorB: number[]): number {
    if (vectorA.length !== vectorB.length) {
        throw new Error("Vectors must be of the same length");
    }

    const dotProduct = vectorA.reduce((sum, a, i) => sum + a * vectorB[i], 0);
    const magnitudeA = Math.sqrt(vectorA.reduce((sum, a) => sum + a ** 2, 0));
    const magnitudeB = Math.sqrt(vectorB.reduce((sum, b) => sum + b ** 2, 0));

    if (magnitudeA === 0 || magnitudeB === 0) {
        return 0; 
    }

    return dotProduct / (magnitudeA * magnitudeB);
}
