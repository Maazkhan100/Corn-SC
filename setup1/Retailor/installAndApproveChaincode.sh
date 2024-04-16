export CORE_PEER_TLS_ENABLED=true
export ORDERER_CA=${PWD}/../../artifacts/channel/crypto-config/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem
export PEER0_ORG6_CA=${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/retailor/peers/peer0.retailor/tls/ca.crt
export PEER1_ORG6_CA=${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/retailor/peers/peer1.retailor/tls/ca.crt
export FABRIC_CFG_PATH=${PWD}/../../artifacts/channel/config/

export CHANNEL_NAME=mychannel

setGlobalsForPeer0Org6() {
    export CORE_PEER_LOCALMSPID="Org6MSP"
    export CORE_PEER_TLS_ROOTCERT_FILE=$PEER0_ORG6_CA
    export CORE_PEER_MSPCONFIGPATH=${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/retailor/users/Admin@retailor/msp
    export CORE_PEER_ADDRESS=localhost:9061
}

setGlobalsForPeer1Org6() {
    export CORE_PEER_LOCALMSPID="Org6MSP"
    export CORE_PEER_TLS_ROOTCERT_FILE=$PEER1_ORG6_CA
    export CORE_PEER_MSPCONFIGPATH=${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/retailor/users/Admin@retailor/msp
    export CORE_PEER_ADDRESS=localhost:9071
}

presetup() {
    echo Vendoring Go dependencies ...
    pushd ./../../artifacts/src/github.com/fabcar/go
    GO111MODULE=on go mod vendor
    popd
    echo Finished vendoring Go dependencies
}
# presetup

CHANNEL_NAME="mychannel"
CC_RUNTIME_LANGUAGE="golang"
VERSION="1"
CC_SRC_PATH="./../../artifacts/src/github.com/fabcar/go"
CC_NAME="fabcar"

packageChaincode() {
    rm -rf ${CC_NAME}.tar.gz
    setGlobalsForPeer0Org6
    peer lifecycle chaincode package ${CC_NAME}.tar.gz \
        --path ${CC_SRC_PATH} --lang ${CC_RUNTIME_LANGUAGE} \
        --label ${CC_NAME}_${VERSION}
    echo "===================== Chaincode is packaged on peer0.org6 ===================== "

    setGlobalsForPeer1Org6
    peer lifecycle chaincode package ${CC_NAME}.tar.gz \
        --path ${CC_SRC_PATH} --lang ${CC_RUNTIME_LANGUAGE} \
        --label ${CC_NAME}_${VERSION}
    echo "===================== Chaincode is packaged on peer1.org6 ===================== "
}
# packageChaincode

installChaincode() {
    setGlobalsForPeer0Org6
    peer lifecycle chaincode install ${CC_NAME}.tar.gz
    echo "===================== Chaincode is installed on peer0.org6 ===================== "

    setGlobalsForPeer1Org6
    peer lifecycle chaincode install ${CC_NAME}.tar.gz
    echo "===================== Chaincode is installed on peer1.org6 ===================== "
}
# installChaincode

queryInstalled() {
    setGlobalsForPeer0Org6
    peer lifecycle chaincode queryinstalled >&log.txt

    cat log.txt
    PACKAGE_ID=$(sed -n "/${CC_NAME}_${VERSION}/{s/^Package ID: //; s/, Label:.*$//; p;}" log.txt)
    echo PackageID is ${PACKAGE_ID}
    echo "===================== Query installed successful on peer0.org6 on channel ===================== "

    setGlobalsForPeer1Org6
    peer lifecycle chaincode queryinstalled
    echo "===================== Query installed successful on peer1.org6 on channel ===================== "
}
# queryInstalled

approveForMyOrg6() {
    setGlobalsForPeer0Org6

    # Replace localhost with your orderer's vm IP address
    peer lifecycle chaincode approveformyorg -o localhost:7050 \
        --ordererTLSHostnameOverride orderer.example.com --tls $CORE_PEER_TLS_ENABLED \
        --cafile $ORDERER_CA --channelID $CHANNEL_NAME --name ${CC_NAME} \
        --version ${VERSION} --init-required --package-id ${PACKAGE_ID} \
        --sequence ${VERSION}

    echo "===================== chaincode approved from org 6 ===================== "
}
# queryInstalled
# approveForMyOrg6

checkCommitReadyness() {

    setGlobalsForPeer0Org6
    peer lifecycle chaincode checkcommitreadiness --channelID $CHANNEL_NAME \
        --peerAddresses localhost:9061 --tlsRootCertFiles $PEER0_ORG6_CA \
        --name ${CC_NAME} --version ${VERSION} --sequence ${VERSION} --output json --init-required
    echo "===================== checking commit readyness from org 6 ===================== "
}
# checkCommitReadyness

queryCommitted() {
    setGlobalsForPeer0Org6
    peer lifecycle chaincode querycommitted --channelID $CHANNEL_NAME --name ${CC_NAME}

    setGlobalsForPeer1Org6
    peer lifecycle chaincode querycommitted --channelID $CHANNEL_NAME --name ${CC_NAME}
}

# presetup not required here as deployed on same machine
presetup
packageChaincode
installChaincode
queryInstalled
approveForMyOrg6
checkCommitReadyness

# queryCommitted
