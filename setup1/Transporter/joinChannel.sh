export CORE_PEER_TLS_ENABLED=true
export ORDERER_CA=${PWD}/../../artifacts/channel/crypto-config/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem
export PEER0_ORG4_CA=${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/transporter/peers/peer0.transporter/tls/ca.crt
export FABRIC_CFG_PATH=${PWD}/../../artifacts/channel/config/

export CHANNEL_NAME=mychannel

setGlobalsForPeer0Org4() {
    export CORE_PEER_LOCALMSPID="Org4MSP"
    export CORE_PEER_TLS_ROOTCERT_FILE=$PEER0_ORG4_CA
    export CORE_PEER_MSPCONFIGPATH=${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/transporter/users/Admin@transporter/msp
    export CORE_PEER_ADDRESS=localhost:7081
    export ANCHOR_NODE="TransporterMSP"
}

setGlobalsForPeer1Org4() {
    export CORE_PEER_LOCALMSPID="Org4MSP"
    export CORE_PEER_TLS_ROOTCERT_FILE=$PEER0_ORG4_CA
    export CORE_PEER_MSPCONFIGPATH=${PWD}/../../artifacts/channel/crypto-config/peerOrganizations/transporter/users/Admin@transporter/msp
    export CORE_PEER_ADDRESS=localhost:7091
}

fetchChannelBlock() {
    rm -rf ./channel-artifacts/*
    setGlobalsForPeer0Org4
    # Replace localhost with your orderer's vm IP address
    peer channel fetch 0 ./channel-artifacts/$CHANNEL_NAME.block -o localhost:7050 \
        --ordererTLSHostnameOverride orderer.example.com \
        -c $CHANNEL_NAME --tls --cafile $ORDERER_CA
}
# fetchChannelBlock

joinChannel() {
    setGlobalsForPeer0Org4
    peer channel join -b ./channel-artifacts/$CHANNEL_NAME.block

    setGlobalsForPeer1Org4
    peer channel join -b ./channel-artifacts/$CHANNEL_NAME.block
}
# joinChannel

updateAnchorPeers() {
    setGlobalsForPeer0Org4
    # Replace localhost with your orderer's vm IP address
    peer channel update -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com \
        -c $CHANNEL_NAME -f ./../../artifacts/channel/${ANCHOR_NODE}anchors.tx \
        --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA
}
# updateAnchorPeers

fetchChannelBlock
joinChannel
updateAnchorPeers
