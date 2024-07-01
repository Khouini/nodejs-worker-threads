const jobs = Array.from({ length: 150 }, () => 1e8); // Create an array of 150 jobs, each with a value of 100,000,000
const { Worker } = require('worker_threads');

function chunkify(arr, n) {
  // Divide the array into n chunks
  const chunks = [];
  for (let i = n; i > 0; i--) {
    // Split the array into roughly equal parts
    chunks.push(arr.splice(0, Math.ceil(arr.length / i)));
  }
  return chunks;
}

function run(jobs, concurrentWorkers) {
  const chunks = chunkify(jobs, concurrentWorkers); // Split jobs into chunks for each worker
  console.log('chunks count', chunks.length);
  const tick = performance.now();
  let completedWorkers = 0; // Keep track of completed workers
  const results = []; // Array to hold the results from all workers

  chunks.forEach((chunk, i) => {
    const worker = new Worker('./native/worker.js'); // Create a new worker
    worker.postMessage(chunk); // Send the chunk of jobs to the worker

    // Listen for messages from the worker
    worker.on('message', workerResults => {
      console.log(`Worker ${i + 1} finished processing ${chunk.length} jobs`);
      results.push(...workerResults); // Append the worker results to the results array
      completedWorkers++; // Increment the completed worker count
      if (completedWorkers === concurrentWorkers) {
        const tock = performance.now();
        console.log(`${concurrentWorkers} workers took ${(tock - tick).toFixed(2)}ms`);

        // Display the count results
        console.log('Counts:', results);

        process.exit();
      }
    });
  });
}

run(jobs, 8); // Run the function with the jobs array and 8 concurrent workers
