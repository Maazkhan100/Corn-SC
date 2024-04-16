const { exec } = require('child_process');
const { performance } = require('perf_hooks');
const puppeteer = require('puppeteer');
const path = require('path');

const opt = {
    cwd: '/home/Supplychain/setup1/Farmer',
};

function measureLatency(functionName, ...otherArgs) {

    return new Promise(async (resolve, reject) => {

        var command = '';
        if (functionName.toLowerCase() === "getbatchdata") {
            const PWD = "/home/Supplychain/setup1/Farmer"
            command = `peer chaincode query -C mychannel -n fabcar -c '{"Args":["${functionName}",${otherArgs.map(arg => `"${arg}"`).join(",")}]}'`;
        }
        else {
            const PWD = "/home/Supplychain/setup1/Farmer"
            // 4 peers:
            // command = `peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/../../artifacts/channel/crypto-config/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C mychannel -n fabcar --peerAddresses localhost:7051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/farmer/peers/peer0.farmer/tls/ca.crt" --peerAddresses localhost:7081 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/transporter/peers/peer0.transporter/tls/ca.crt" --peerAddresses localhost:7061 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/exporter/peers/peer0.exporter/tls/ca.crt" --peerAddresses localhost:9051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/inspector/peers/peer0.inspector/tls/ca.crt" -c '{"function":"${functionName}","Args":[${otherArgs.map(arg => `"${arg}"`).join(",")}]}'`;

            // 8 peers:
            command = `peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/../../artifacts/channel/crypto-config/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C mychannel -n fabcar --peerAddresses localhost:7051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/farmer/peers/peer0.farmer/tls/ca.crt" --peerAddresses localhost:7081 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/transporter/peers/peer0.transporter/tls/ca.crt" --peerAddresses localhost:7061 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/exporter/peers/peer0.exporter/tls/ca.crt" --peerAddresses localhost:9051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/inspector/peers/peer0.inspector/tls/ca.crt" --peerAddresses localhost:8001 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/importer/peers/peer0.importer/tls/ca.crt" --peerAddresses localhost:9061 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/retailor/peers/peer0.retailor/tls/ca.crt" --peerAddresses localhost:10051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/inspector/peers/peer1.inspector/tls/ca.crt" --peerAddresses localhost:8051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/farmer/peers/peer1.farmer/tls/ca.crt" -c '{"function":"${functionName}","Args":[${otherArgs.map(arg => `"${arg}"`).join(",")}]}'`;

            // 12 peers:
            // command = `peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/../../artifacts/channel/crypto-config/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C mychannel -n fabcar --peerAddresses localhost:7051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/farmer/peers/peer0.farmer/tls/ca.crt" --peerAddresses localhost:7081 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/transporter/peers/peer0.transporter/tls/ca.crt" --peerAddresses localhost:7061 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/exporter/peers/peer0.exporter/tls/ca.crt" --peerAddresses localhost:9051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/inspector/peers/peer0.inspector/tls/ca.crt" --peerAddresses localhost:8001 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/importer/peers/peer0.importer/tls/ca.crt" --peerAddresses localhost:9061 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/retailor/peers/peer0.retailor/tls/ca.crt" --peerAddresses localhost:10051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/inspector/peers/peer1.inspector/tls/ca.crt" --peerAddresses localhost:8051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/farmer/peers/peer1.farmer/tls/ca.crt" --peerAddresses localhost:7091 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/transporter/peers/peer1.transporter/tls/ca.crt" --peerAddresses localhost:7071 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/exporter/peers/peer1.exporter/tls/ca.crt" --peerAddresses localhost:8011 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/importer/peers/peer1.importer/tls/ca.crt" --peerAddresses localhost:9071 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/retailor/peers/peer1.retailor/tls/ca.crt" -c '{"function":"${functionName}","Args":[${otherArgs.map(arg => `"${arg}"`).join(",")}]}'`;
        }

        const startTime = performance.now();
        exec(command, opt, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error: ${error.message}`);
                reject (error);
            }
            // else if (stderr) {
            //     console.error(`stderr: ${stderr}`);
            //     resolve(stderr);
            // }
            else {
                const endTime = performance.now();
                console.log(`stdout: ${stdout}`);
                console.error(`stderr: ${stderr}`);
                // Check the content of stderr and resolve or reject based on the content
                if (stderr.includes("result: status:200") || stdout) {
                    const latency = (endTime - startTime)/1000;
                    resolve(latency);
                }
                else {
                    reject(new Error(stderr)); // Reject with the stderr content as an error
                }
            }
        });
    });
}

async function measureThroughput(transactions, command, functionName) {

    const numTransactions = transactions;
    let count = 0;

    return new Promise(async (resolve, reject) => {

        promises = [];
        // const Time = performance.now();
        // console.log(`For Starting Time: ${Time / 1000}`);
        for (let i = 0; i < numTransactions; i++) {
            promises.push(new Promise(async (resolve, reject) => {
                exec(command, opt, (error, stdout, stderr) => {
                    if (error) {
                        count++;
                        // sleep(4000);
                        // refreshCouchDBPage();
                        console.log("1", i);
                        console.log(error);
                        resolve(error);
                    }
                    else {
                        if (stderr.includes("result: status:200") || stdout) {
                            // console.log("2");
                            console.log("Stdout", stdout);
                            // console.log("Stderr", stderr);
                            resolve({stdout, stderr});
                        }
                        else {
                            console.log("3");
                            resolve(new Error(stderr));
                        }
                    }
                });
            }));
        }
        //const time = performance.now();
        // console.log(`For Ending Time: ${time / 1000}`);
        // console.log(`For Time: ${(time - Time) / 1000}`);
        const startTime = performance.now();
        // console.log(`Throughput start time: ${startTime/1000}`);
        Promise.all(promises)
        .then((result) => {
            const endTime = performance.now();
            // console.log(`Throughput end time: ${endTime/1000}`);
            const duration = ((endTime - startTime) / 1000);
            const throughput = numTransactions / duration;
            // console.log(`Time throughput: ${(endTime - startTime) / 1000}`);
            console.log("Count", count);
            console.log(`Transactions Per Second (TPS) for ${functionName}: ${throughput}`);
            resolve(throughput);
        })
    });
}

async function measureThroughputCheck(transactions, commandTemplate, functionName) {

    const numTransactions = transactions + 4300;
    let count = 0;

    return new Promise(async (resolve, reject) => {
        const promises = [];

        for (let i = 4300; i < numTransactions; i++) {
            const command = commandTemplate.replace(/\["b\d+"\]/, `["b${i}"]`);
            promises.push(new Promise(async (resolve, reject) => {
                exec(command, opt, (error, stdout, stderr) => {
                    if (error) {
                        count++;
                        console.log("1", i);
                        // console.log(error);
                        resolve(error);
                    } else {
                        if (stderr.includes("result: status:200") || stdout) {
                            // console.log("Stdout", stdout);
                            // console.log("Stderr", stderr);
                            resolve({ stdout, stderr });
                        } else {
                            console.log("3");
                            resolve(new Error(stderr));
                        }
                    }
                });
            }));
        }

        const startTime = performance.now();

        Promise.all(promises)
            .then((result) => {
                const endTime = performance.now();
                const duration = (endTime - startTime) / 1000;
                const throughput = numTransactions / duration;
                console.log("Count", count);
                console.log(`Transactions Per Second (TPS) for ${functionName}: ${throughput}`);
                resolve(throughput);
            });
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function refreshCouchDBPage() {

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const fauxtonUrl = 'http://localhost:5984/_utils/#database/mychannel_fabcar/_all_docs';

  try {
    // Navigate to the CouchDB Fauxton page
    await page.goto(fauxtonUrl, { waitUntil: 'domcontentloaded' });

    // Reload or refresh the page
    await page.reload({ waitUntil: 'domcontentloaded' });

    console.log('CouchDB page refreshed successfully.');
  } catch (error) {
    console.error('Error refreshing CouchDB page:', error.message);
  } finally {
    // Close the browser
    await browser.close();
  }
}

async function main() {

    const CC_NAME="fabcar";
    const CHANNEL_NAME="mychannel";

    // try {
    //     const latencyQuery = await  measureLatency("GetBatchData", "batchHistoryKey");
    //     const latencyCreate = await  measureLatency("CreateBatch", "ba6");
    //     console.log("latency Query", latencyQuery);
    //     console.log("latency Create", latencyCreate);
    // } catch (error) {
    //     console.error('An error occurred:', error.message);
    // }

    // refreshCouchDBPage();

    const transactions = 5000;
    const PWD = "/home/Supplychain/setup1/Farmer";
    
    console.log(`Number of transaction(s): ${transactions}`);

    const commandQuery = `peer chaincode query -C ${CHANNEL_NAME} -n ${CC_NAME} -c '{"Args":["GetBatchData","batchHistoryKey"]}'`;

    // const commandTemplate4 = `peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/../../artifacts/channel/crypto-config/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C mychannel -n fabcar --peerAddresses localhost:7051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/farmer/peers/peer0.farmer/tls/ca.crt" --peerAddresses localhost:7081 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/transporter/peers/peer0.transporter/tls/ca.crt" --peerAddresses localhost:7061 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/exporter/peers/peer0.exporter/tls/ca.crt" --peerAddresses localhost:9051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/inspector/peers/peer0.inspector/tls/ca.crt" -c '{"function":"CreateBatch","Args":["b10"]}'`;
    // const tpsPeers4 = await measureThroughputCheck(transactions, commandTemplate4, "Peers4");

    // commandTemplate8 = `peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/../../artifacts/channel/crypto-config/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C mychannel -n fabcar --peerAddresses localhost:7051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/farmer/peers/peer0.farmer/tls/ca.crt" --peerAddresses localhost:7081 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/transporter/peers/peer0.transporter/tls/ca.crt" --peerAddresses localhost:7061 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/exporter/peers/peer0.exporter/tls/ca.crt" --peerAddresses localhost:9051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/inspector/peers/peer0.inspector/tls/ca.crt" --peerAddresses localhost:8001 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/importer/peers/peer0.importer/tls/ca.crt" --peerAddresses localhost:9061 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/retailor/peers/peer0.retailor/tls/ca.crt" --peerAddresses localhost:10051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/inspector/peers/peer1.inspector/tls/ca.crt" --peerAddresses localhost:8051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/farmer/peers/peer1.farmer/tls/ca.crt" -c '{"function":"CreateBatch","Args":["b10"]}'`;
    // const tpsPeers8 = await measureThroughputCheck(transactions, commandTemplate8, "Peers8");

    // commandTemplate12 = `peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/../../artifacts/channel/crypto-config/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C mychannel -n fabcar --peerAddresses localhost:7051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/farmer/peers/peer0.farmer/tls/ca.crt" --peerAddresses localhost:7081 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/transporter/peers/peer0.transporter/tls/ca.crt" --peerAddresses localhost:7061 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/exporter/peers/peer0.exporter/tls/ca.crt" --peerAddresses localhost:9051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/inspector/peers/peer0.inspector/tls/ca.crt" --peerAddresses localhost:8001 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/importer/peers/peer0.importer/tls/ca.crt" --peerAddresses localhost:9061 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/retailor/peers/peer0.retailor/tls/ca.crt" --peerAddresses localhost:10051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/inspector/peers/peer1.inspector/tls/ca.crt" --peerAddresses localhost:8051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/farmer/peers/peer1.farmer/tls/ca.crt" --peerAddresses localhost:7091 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/transporter/peers/peer1.transporter/tls/ca.crt" --peerAddresses localhost:7071 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/exporter/peers/peer1.exporter/tls/ca.crt" --peerAddresses localhost:8011 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/importer/peers/peer1.importer/tls/ca.crt" --peerAddresses localhost:9071 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/retailor/peers/peer1.retailor/tls/ca.crt" -c '{"function":"CreateBatch","Args":["b10"]}'`;
    // const tpsPeers12 = await measureThroughputCheck(transactions, commandTemplate12, "Peers12");
    
    // command = `peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/../../artifacts/channel/crypto-config/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C mychannel -n fabcar --peerAddresses localhost:7051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/farmer/peers/peer0.farmer/tls/ca.crt" --peerAddresses localhost:7081 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/transporter/peers/peer0.transporter/tls/ca.crt" --peerAddresses localhost:7061 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/exporter/peers/peer0.exporter/tls/ca.crt" --peerAddresses localhost:9051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/inspector/peers/peer0.inspector/tls/ca.crt" -c '{"function":"CreateFarmer","Args":["f10","Haider", "Peshawer"]}'`;
    
    // const Time = performance.now();
    // console.log(`Main starting Time: ${Time/1000}`);

    const tpsQuery = await measureThroughput(transactions, commandQuery, "Query");
    // await sleep(1500);
    // const tpsPeers4 = await measureThroughput(transactions, commandPeers4, "Peers4");
    // await sleep(1500);
    // const tpsPeers8 = await measureThroughput(transactions, commandPeers8, "Peers8");
    // await sleep(1500);
    // const tpsPeers12 = await measureThroughput(transactions, commandPeers12, "Peers12");

    // const time = performance.now();
    // console.log(`Main ending time time: ${time/1000}`);
    // console.log(`Main Time: ${(time - Time)/1000}`);
}

main()
  .catch((error) => {
    console.error('Unhandled promise rejection:', error);
});
