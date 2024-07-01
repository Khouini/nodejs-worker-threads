const jobs = Array.from({ length: 150 }, () => 1e8); // Create an array of 150 jobs, each with a value of 100,000,000
const tick = performance.now();
const results = [];

// Process each job received
for (let job of jobs) {
  // Perform a computation for each job (summing up to the job number)
  let count = 0;
  for (let i = 0; i <= job; i++) {
    count += i;
  }
  // Store the result in the results array
  results.push(count);
}

const tock = performance.now();
console.log(`Time taken: ${((tock - tick) * 0.001).toFixed(2)}s`);
console.log('Counts', results);
