const { parentPort } = require('worker_threads');

// Listen for messages from the parent thread
parentPort.on('message', jobs => {
  // Array to hold the results of each job
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

  // Send the results array back to the parent thread
  parentPort.postMessage(results);
});
