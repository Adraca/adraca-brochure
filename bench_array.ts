
const ITERATIONS = 1_000_000;
const SIZE = 8;

const staticArray = Array.from({ length: SIZE });

console.log(`Running ${ITERATIONS} iterations...`);

const start1 = performance.now();
for (let i = 0; i < ITERATIONS; i++) {
    [...Array(SIZE)].map(() => 1);
}
const end1 = performance.now();
console.log(`Current ([...Array(8)]): ${(end1 - start1).toFixed(2)}ms`);

const start2 = performance.now();
for (let i = 0; i < ITERATIONS; i++) {
    staticArray.map(() => 1);
}
const end2 = performance.now();
console.log(`Optimized (static array): ${(end2 - start2).toFixed(2)}ms`);

console.log(`Improvement: ${((end1 - start1) / (end2 - start2)).toFixed(2)}x faster`);
