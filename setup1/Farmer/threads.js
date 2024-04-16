const { Worker } = require('worker_threads');

function main() {
    const numThreads = 2;
            
    for (let i = 0; i < numThreads; i++) {
                const worker = new Worker('./perf.js');
                worker.on("message", (data) => {
                    console.log(data);
                });
                worker.on("error", (msg) => {
                    console.log(`An error ocurred: ${msg}`);
                });
            }
            
}

main();