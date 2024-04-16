// const { exec } = require('child_process');
const { performance } = require('perf_hooks');
const path = require('path');

const opt = {
    cwd: '/home/test-network/Netowrk/setup1/Organization1',
};

function measureLatency(functionName, ...otherArgs) {

    return new Promise(async (resolve, reject) => {

        var command = '';
        if (functionName.toLowerCase() === "queryuser") {
            command = `peer chaincode query -C mychannel -n fabcar -c '{"Args":["${functionName}",${otherArgs.map(arg => `"${arg}"`).join(",")}]}'`;
        }
        else {
            const PWD = "/home/test-network/Netowrk/setup1/Organization1"

            // Two peers:
            // command = peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/../../artifacts/channel/crypto-config/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C mychannel -n fabcar --peerAddresses localhost:7051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt" --peerAddresses localhost:9051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt" -c '{"function":"${functionName}","Args":[${otherArgs.map(arg => `"${arg}").join(",")}]}'`;

            // 4 peers:
            // command = peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/../../artifacts/channel/crypto-config/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C mychannel -n fabcar --peerAddresses localhost:7051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt" --peerAddresses localhost:8051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer1.org1.example.com/tls/ca.crt" --peerAddresses localhost:9051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt" --peerAddresses localhost:10051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer1.org2.example.com/tls/ca.crt" -c '{"function":"${functionName}","Args":[${otherArgs.map(arg => `"${arg}").join(",")}]}'`;

            // 8 peers:
            // command = peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/../../artifacts/channel/crypto-config/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C mychannel -n fabcar --peerAddresses localhost:7051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt" --peerAddresses localhost:8051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer1.org1.example.com/tls/ca.crt" --peerAddresses localhost:7061 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer2.org1.example.com/tls/ca.crt" --peerAddresses localhost:7071 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer3.org1.example.com/tls/ca.crt" --peerAddresses localhost:9051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt" --peerAddresses localhost:10051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer1.org2.example.com/tls/ca.crt" --peerAddresses localhost:9061 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer2.org2.example.com/tls/ca.crt" --peerAddresses localhost:9071 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer3.org2.example.com/tls/ca.crt" -c '{"function":"${functionName}","Args":[${otherArgs.map(arg => `"${arg}").join(",")}]}'`;

            // 12 peers:
            // command = peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/../../artifacts/channel/crypto-config/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C mychannel -n fabcar --peerAddresses localhost:7051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt" --peerAddresses localhost:8051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer1.org1.example.com/tls/ca.crt" --peerAddresses localhost:7061 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer2.org1.example.com/tls/ca.crt" --peerAddresses localhost:7071 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer3.org1.example.com/tls/ca.crt" --peerAddresses localhost:7081 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer4.org1.example.com/tls/ca.crt" --peerAddresses localhost:7091 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer5.org1.example.com/tls/ca.crt" --peerAddresses localhost:9051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt" --peerAddresses localhost:10051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer1.org2.example.com/tls/ca.crt" --peerAddresses localhost:9061 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer2.org2.example.com/tls/ca.crt" --peerAddresses localhost:9071 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer3.org2.example.com/tls/ca.crt" --peerAddresses localhost:9081 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer4.org2.example.com/tls/ca.crt" --peerAddresses localhost:9091 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer5.org2.example.com/tls/ca.crt" -c '{"function":"${functionName}","Args":[${otherArgs.map(arg => `"${arg}").join(",")}]}'`;

            //16 peers:
            command = `peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/../../artifacts/channel/crypto-config/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C mychannel -n fabcar --peerAddresses localhost:7051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt" --peerAddresses localhost:8051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer1.org1.example.com/tls/ca.crt" --peerAddresses localhost:7061 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer2.org1.example.com/tls/ca.crt" --peerAddresses localhost:7071 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer3.org1.example.com/tls/ca.crt" --peerAddresses localhost:7081 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer4.org1.example.com/tls/ca.crt" --peerAddresses localhost:7091 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer5.org1.example.com/tls/ca.crt" --peerAddresses localhost:8001 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer6.org1.example.com/tls/ca.crt" --peerAddresses localhost:8011 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer7.org1.example.com/tls/ca.crt" --peerAddresses localhost:9051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt" --peerAddresses localhost:10051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer1.org2.example.com/tls/ca.crt" --peerAddresses localhost:9061 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer2.org2.example.com/tls/ca.crt" --peerAddresses localhost:9071 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer3.org2.example.com/tls/ca.crt" --peerAddresses localhost:9081 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer4.org2.example.com/tls/ca.crt" --peerAddresses localhost:9091 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer5.org2.example.com/tls/ca.crt" --peerAddresses localhost:10001 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer6.org2.example.com/tls/ca.crt" --peerAddresses localhost:10011 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer7.org2.example.com/tls/ca.crt" -c '{"function":"${functionName}","Args":[${otherArgs.map(arg => `"${arg}"`).join(",")}]}'`;
        }

        const startTime = performance.now();
        exec(command, opt, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error: ${error.message}`);
                reject (error);
            }
            // else if (stderr) {
            //     console.error(stderr: ${stderr});
            //     resolve(stderr);
            // }
            else {
                const endTime = performance.now();
                // console.log(stdout: ${stdout});
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

const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function measureThroughput(transactions, command, functionName) {
    let count = 0;
    const numTransactions = transactions;
    return new Promise(async (resolve, reject) => {
        const startTime = performance.now();
        for (let i = 0; i < numTransactions; i++) {
            try {
                const { stdout, stderr } = await exec(command, opt);
                if (stderr.includes("result: status:200") || stdout) {
                    // Process successful result
                    // console.log("Stdout", stdout);
                    // console.log("Stderr for", functionName, ":", stderr, "i :", i);
                    console.log("i: ", i);
                } else {
                    // Process error
                    // console.log("3");
                    reject( new Error(stderr));
                }
            } catch (error) {
                // Handle errors
                // console.log(error, "1");
                count++;
                // console.log('Index: ', i);
            }
            // console.log("Sleep in for");
            // await sleep(3000);
            // console.log("After sleep in for");
        }
        const endTime = performance.now();
        const duration = (endTime - startTime)/1000;
        const throughput = numTransactions/duration;
        console.log('Count: ', count);
        console.log('Transaction processing time:', throughput, 'for:', functionName);
        console.log("");
        resolve (throughput);
    });
}

async function main () {

    const CC_NAME="fabcar"

    // try {
    //     const latencyQuery = await  measureLatency("QueryUser", "1");
    //     const latencyCreate = await  measureLatency("CreateUser", "fahd", "Islamabad");
    //     const latencyTransfer = await  measureLatency("TransferMoney", "1", "2", "1");
    //     const latencyIssue = await  measureLatency("IssueMoney", "1", "1");

    //     console.log("latency Query", latencyQuery);

    // 2 peers:
    // console.log("latency Create2", latencyCreate);
    // console.log("latency Transfer2", latencyTransfer);
    // console.log("latency Issue2", latencyIssue);

    // 4 peers:
    // console.log("latency Create4", latencyCreate);
    // console.log("latency Transfer4", latencyTransfer);
    // console.log("latency Issue4", latencyIssue);

    // 8 peers:
    // console.log("latency Create8", latencyCreate);
    // console.log("latency Transfer8", latencyTransfer);
    // console.log("latency Issue8", latencyIssue);

    // 12 peers:
    // console.log("latency Create12", latencyCreate);
    // console.log("latency Transfer12", latencyTransfer);
    // console.log("latency Issue12", latencyIssue);

    // 16 peers:
    //     console.log("latency Create16", latencyCreate);
    //     console.log("latency Transfer16", latencyTransfer);
    //     console.log("latency Issue16", latencyIssue);
    // } catch (error) {
    //     console.error('An error occurred:', error.message);
    // }

    const transactions = 1000;
    const PWD = "/home/test-network/Netowrk/setup1/Organization1";

    const commandQuery = `peer chaincode query -C mychannel -n ${CC_NAME} -c '{"Args":["QueryUser","1"]}'`;

    // For 2 peers:
    const commandCreate2 = `peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/../../artifacts/channel/crypto-config/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C mychannel -n ${CC_NAME} --peerAddresses localhost:7051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt" --peerAddresses localhost:9051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt" -c '{"function":"CreateUser","Args":["Usama","Bahrain"]}'`;
    const commandTransfer2 = `peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/../../artifacts/channel/crypto-config/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C mychannel -n ${CC_NAME} --peerAddresses localhost:7051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt" --peerAddresses localhost:9051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt" -c '{"function":"TransferMoney","Args":["1","2","1"]}'`;
    const commandIssue2 = `peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/../../artifacts/channel/crypto-config/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C mychannel -n ${CC_NAME} --peerAddresses localhost:7051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt" --peerAddresses localhost:9051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt" -c '{"function":"IssueMoney","Args":["1","1"]}'`;

    // For 4 peers:
    const commandCreate4 = `peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/../../artifacts/channel/crypto-config/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C mychannel -n ${CC_NAME} --peerAddresses localhost:7051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt" --peerAddresses localhost:8051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer1.org1.example.com/tls/ca.crt" --peerAddresses localhost:9051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt" --peerAddresses localhost:10051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer1.org2.example.com/tls/ca.crt" -c '{"function":"CreateUser","Args":["Waleed","Peshawer"]}'`;
    const commandTransfer4 = `peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/../../artifacts/channel/crypto-config/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C mychannel -n ${CC_NAME} --peerAddresses localhost:7051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt" --peerAddresses localhost:8051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer1.org1.example.com/tls/ca.crt" --peerAddresses localhost:9051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt" --peerAddresses localhost:10051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer1.org2.example.com/tls/ca.crt" -c '{"function":"TransferMoney","Args":["1","2","1"]}'`;
    const commandIssue4 = `peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/../../artifacts/channel/crypto-config/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C mychannel -n ${CC_NAME} --peerAddresses localhost:7051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt" --peerAddresses localhost:8051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer1.org1.example.com/tls/ca.crt" --peerAddresses localhost:9051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt" --peerAddresses localhost:10051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer1.org2.example.com/tls/ca.crt" -c '{"function":"IssueMoney","Args":["1","1"]}'`;

    // For 8 peers
    const commandCreate8 = `peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/../../artifacts/channel/crypto-config/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C mychannel -n ${CC_NAME} --peerAddresses localhost:7051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt" --peerAddresses localhost:8051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer1.org1.example.com/tls/ca.crt" --peerAddresses localhost:7061 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer2.org1.example.com/tls/ca.crt" --peerAddresses localhost:7071 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer3.org1.example.com/tls/ca.crt" --peerAddresses localhost:9051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt" --peerAddresses localhost:10051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer1.org2.example.com/tls/ca.crt" --peerAddresses localhost:9061 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer2.org2.example.com/tls/ca.crt" --peerAddresses localhost:9071 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer3.org2.example.com/tls/ca.crt" -c '{"function":"CreateUser","Args":["Arsalan","Mingora"]}'`;
    const commandTransfer8 = `peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/../../artifacts/channel/crypto-config/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C mychannel -n ${CC_NAME} --peerAddresses localhost:7051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt" --peerAddresses localhost:8051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer1.org1.example.com/tls/ca.crt" --peerAddresses localhost:7061 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer2.org1.example.com/tls/ca.crt" --peerAddresses localhost:7071 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer3.org1.example.com/tls/ca.crt" --peerAddresses localhost:9051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt" --peerAddresses localhost:10051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer1.org2.example.com/tls/ca.crt" --peerAddresses localhost:9061 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer2.org2.example.com/tls/ca.crt" --peerAddresses localhost:9071 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer3.org2.example.com/tls/ca.crt" -c '{"function":"TransferMoney","Args":["1","2","1"]}'`;
    const commandIssue8 = `peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/../../artifacts/channel/crypto-config/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C mychannel -n ${CC_NAME} --peerAddresses localhost:7051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt" --peerAddresses localhost:8051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer1.org1.example.com/tls/ca.crt" --peerAddresses localhost:7061 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer2.org1.example.com/tls/ca.crt" --peerAddresses localhost:7071 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer3.org1.example.com/tls/ca.crt" --peerAddresses localhost:9051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt" --peerAddresses localhost:10051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer1.org2.example.com/tls/ca.crt" --peerAddresses localhost:9061 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer2.org2.example.com/tls/ca.crt" --peerAddresses localhost:9071 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer3.org2.example.com/tls/ca.crt" -c '{"function":"IssueMoney","Args":["1","15000"]}'`;

    // For 12 peers:
    const commandCreate12 = `peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/../../artifacts/channel/crypto-config/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C mychannel -n ${CC_NAME} --peerAddresses localhost:7051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt" --peerAddresses localhost:8051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer1.org1.example.com/tls/ca.crt" --peerAddresses localhost:7061 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer2.org1.example.com/tls/ca.crt" --peerAddresses localhost:7071 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer3.org1.example.com/tls/ca.crt" --peerAddresses localhost:7081 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer4.org1.example.com/tls/ca.crt" --peerAddresses localhost:7091 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer5.org1.example.com/tls/ca.crt" --peerAddresses localhost:9051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt" --peerAddresses localhost:10051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer1.org2.example.com/tls/ca.crt" --peerAddresses localhost:9061 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer2.org2.example.com/tls/ca.crt" --peerAddresses localhost:9071 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer3.org2.example.com/tls/ca.crt" --peerAddresses localhost:9081 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer4.org2.example.com/tls/ca.crt" --peerAddresses localhost:9091 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer5.org2.example.com/tls/ca.crt" -c '{"function":"CreateUser","Args":["Usman","Barikot"]}'`;
    const commandTransfer12 = `peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/../../artifacts/channel/crypto-config/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C mychannel -n ${CC_NAME} --peerAddresses localhost:7051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt" --peerAddresses localhost:8051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer1.org1.example.com/tls/ca.crt" --peerAddresses localhost:7061 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer2.org1.example.com/tls/ca.crt" --peerAddresses localhost:7071 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer3.org1.example.com/tls/ca.crt" --peerAddresses localhost:7081 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer4.org1.example.com/tls/ca.crt" --peerAddresses localhost:7091 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer5.org1.example.com/tls/ca.crt" --peerAddresses localhost:9051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt" --peerAddresses localhost:10051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer1.org2.example.com/tls/ca.crt" --peerAddresses localhost:9061 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer2.org2.example.com/tls/ca.crt" --peerAddresses localhost:9071 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer3.org2.example.com/tls/ca.crt" --peerAddresses localhost:9081 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer4.org2.example.com/tls/ca.crt" --peerAddresses localhost:9091 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer5.org2.example.com/tls/ca.crt" -c '{"function":"TransferMoney","Args":["1","2","1"]}'`;
    const commandIssue12 = `peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/../../artifacts/channel/crypto-config/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C mychannel -n ${CC_NAME} --peerAddresses localhost:7051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt" --peerAddresses localhost:8051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer1.org1.example.com/tls/ca.crt" --peerAddresses localhost:7061 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer2.org1.example.com/tls/ca.crt" --peerAddresses localhost:7071 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer3.org1.example.com/tls/ca.crt" --peerAddresses localhost:7081 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer4.org1.example.com/tls/ca.crt" --peerAddresses localhost:7091 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer5.org1.example.com/tls/ca.crt" --peerAddresses localhost:9051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt" --peerAddresses localhost:10051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer1.org2.example.com/tls/ca.crt" --peerAddresses localhost:9061 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer2.org2.example.com/tls/ca.crt" --peerAddresses localhost:9071 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer3.org2.example.com/tls/ca.crt" --peerAddresses localhost:9081 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer4.org2.example.com/tls/ca.crt" --peerAddresses localhost:9091 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer5.org2.example.com/tls/ca.crt" -c '{"function":"IssueMoney","Args":["1","1"]}'`;

    // For 16 peers:
    const commandCreate16 = `peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/../../artifacts/channel/crypto-config/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C mychannel -n ${CC_NAME} --peerAddresses localhost:7051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt" --peerAddresses localhost:8051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer1.org1.example.com/tls/ca.crt" --peerAddresses localhost:7061 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer2.org1.example.com/tls/ca.crt" --peerAddresses localhost:7071 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer3.org1.example.com/tls/ca.crt" --peerAddresses localhost:7081 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer4.org1.example.com/tls/ca.crt" --peerAddresses localhost:7091 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer5.org1.example.com/tls/ca.crt" --peerAddresses localhost:8001 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer6.org1.example.com/tls/ca.crt" --peerAddresses localhost:8011 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer7.org1.example.com/tls/ca.crt" --peerAddresses localhost:9051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt" --peerAddresses localhost:10051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer1.org2.example.com/tls/ca.crt" --peerAddresses localhost:9061 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer2.org2.example.com/tls/ca.crt" --peerAddresses localhost:9071 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer3.org2.example.com/tls/ca.crt" --peerAddresses localhost:9081 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer4.org2.example.com/tls/ca.crt" --peerAddresses localhost:9091 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer5.org2.example.com/tls/ca.crt" --peerAddresses localhost:10001 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer6.org2.example.com/tls/ca.crt" --peerAddresses localhost:10011 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer7.org2.example.com/tls/ca.crt" -c '{"function":"CreateUser","Args":["Fahd","Islamabad"]}'`;
    const commandTransfer16 = `peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/../../artifacts/channel/crypto-config/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C mychannel -n ${CC_NAME} --peerAddresses localhost:7051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt" --peerAddresses localhost:8051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer1.org1.example.com/tls/ca.crt" --peerAddresses localhost:7061 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer2.org1.example.com/tls/ca.crt" --peerAddresses localhost:7071 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer3.org1.example.com/tls/ca.crt" --peerAddresses localhost:7081 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer4.org1.example.com/tls/ca.crt" --peerAddresses localhost:7091 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer5.org1.example.com/tls/ca.crt" --peerAddresses localhost:8001 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer6.org1.example.com/tls/ca.crt" --peerAddresses localhost:8011 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer7.org1.example.com/tls/ca.crt" --peerAddresses localhost:9051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt" --peerAddresses localhost:10051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer1.org2.example.com/tls/ca.crt" --peerAddresses localhost:9061 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer2.org2.example.com/tls/ca.crt" --peerAddresses localhost:9071 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer3.org2.example.com/tls/ca.crt" --peerAddresses localhost:9081 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer4.org2.example.com/tls/ca.crt" --peerAddresses localhost:9091 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer5.org2.example.com/tls/ca.crt" --peerAddresses localhost:10001 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer6.org2.example.com/tls/ca.crt" --peerAddresses localhost:10011 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer7.org2.example.com/tls/ca.crt" -c '{"function":"TransferMoney","Args":["1","2","1"]}'`;
    const commandIssue16 = `peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/../../artifacts/channel/crypto-config/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C mychannel -n ${CC_NAME} --peerAddresses localhost:7051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt" --peerAddresses localhost:8051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer1.org1.example.com/tls/ca.crt" --peerAddresses localhost:7061 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer2.org1.example.com/tls/ca.crt" --peerAddresses localhost:7071 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer3.org1.example.com/tls/ca.crt" --peerAddresses localhost:7081 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer4.org1.example.com/tls/ca.crt" --peerAddresses localhost:7091 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer5.org1.example.com/tls/ca.crt" --peerAddresses localhost:8001 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer6.org1.example.com/tls/ca.crt" --peerAddresses localhost:8011 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer7.org1.example.com/tls/ca.crt" --peerAddresses localhost:9051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt" --peerAddresses localhost:10051 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer1.org2.example.com/tls/ca.crt" --peerAddresses localhost:9061 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer2.org2.example.com/tls/ca.crt" --peerAddresses localhost:9071 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer3.org2.example.com/tls/ca.crt" --peerAddresses localhost:9081 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer4.org2.example.com/tls/ca.crt" --peerAddresses localhost:9091 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer5.org2.example.com/tls/ca.crt" --peerAddresses localhost:10001 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer6.org2.example.com/tls/ca.crt" --peerAddresses localhost:10011 --tlsRootCertFiles "${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer7.org2.example.com/tls/ca.crt" -c '{"function":"IssueMoney","Args":["1","1"]}';`

    // const Time = performance.now();
    // console.log(Main starting Time: ${Time/1000});

    console.log(`Number of transaction(s): ${transactions}`);

    // const tpsQuery = await measureThroughput(transactions, commandQuery, "Query");
    // await sleep(1500);

    // const tpsCreate2 = await measureThroughput(transactions, commandCreate2, "Create2");
    // await sleep(1500);
    // const tpsTransfer2 = await measureThroughput(transactions, commandTransfer2, "Transfer2");
    // await sleep(1500);
    // const tpsIssue2 = await measureThroughput(transactions, commandIssue2, "Issue2");
    // await sleep(1500);

    const tpsCreate4 = await measureThroughput(transactions, commandCreate4, "Create4");
    // await sleep(1500);
    // const tpsTransfer4 = await measureThroughput(transactions, commandTransfer4, "Transfer4");
    // await sleep(1500);
    // const tpsIssue4 = await measureThroughput(transactions, commandIssue4, "Issue4");
    // await sleep(1500);

    // const tpsCreate8 = await measureThroughput(transactions, commandCreate8, "Create8");
    // await sleep(1500);
    // const tpsTransfer8 = await measureThroughput(transactions, commandTransfer8, "Transfer8");
    // await sleep(1500);
    // const tpsIssue8 = await measureThroughput(transactions, commandIssue8, "Issue8");
    // await sleep(1500);

    // const tpsCreate12 = await measureThroughput(transactions, commandCreate12, "Create12");
    // await sleep(1500);
    // const tpsTransfer12 = await measureThroughput(transactions, commandTransfer12, "Transfer12");
    // await sleep(1500);
    // const tpsIssue12 = await measureThroughput(transactions, commandIssue12, "Issue12");
    // await sleep(1500);

    // const tpsCreate16 = await measureThroughput(transactions, commandCreate16, "Create16");
    // await sleep(1500);
    // const tpsTransfer16 = await measureThroughput(transactions, commandTransfer16, "Transfer16");
    // await sleep(1500);
    // const tpsIssue16 = await measureThroughput(transactions, commandIssue16, "Issue16");

    // const time = performance.now();
    // console.log(Main ending time time: ${time/1000});
    // console.log(Main Time: ${(time - Time)/1000});
}

function sleep(ms) {
    // console.log("Now in sleep", ms);
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Second version:
main()
  .catch((error) => {
    console.error('Unhandled promise rejection:', error);
});
