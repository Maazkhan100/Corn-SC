
chmod -R 0755 ./crypto-config
# Delete existing artifacts
rm -rf ./crypto-config
# rm genesis.block mychannel.tx
# rm -rf ../../channel-artifacts/*

# Generate Crypto artifactes for organizations
cryptogen generate --config=./crypto-config.yaml --output=./crypto-config/

# System channel
SYS_CHANNEL="sys-channel"

# channel name defaults to "mychannel"
# CHANNEL_NAME="mychannel"
CHANNEL_NAME="mychannel"

echo $CHANNEL_NAME

# Generate System Genesis block
configtxgen -profile OrdererGenesis -configPath . -channelID $SYS_CHANNEL  -outputBlock ./genesis.block

# Generate channel configuration block and basic channel means to use that channel configuration.
configtxgen -profile BasicChannel -configPath . -outputCreateChannelTx ./mychannel.tx -channelID $CHANNEL_NAME

echo "#######    Generating anchor peer update for Org1MSP  ##########"
configtxgen -profile BasicChannel -configPath . -outputAnchorPeersUpdate ./FarmerMSPanchors.tx -channelID $CHANNEL_NAME -asOrg Org1MSP

echo "#######    Generating anchor peer update for Org2MSP  ##########"
configtxgen -profile BasicChannel -configPath . -outputAnchorPeersUpdate ./InspectorMSPanchors.tx -channelID $CHANNEL_NAME -asOrg Org2MSP

echo "#######    Generating anchor peer update for Org3MSP  ##########"
configtxgen -profile BasicChannel -configPath . -outputAnchorPeersUpdate ./ExporterMSPanchors.tx -channelID $CHANNEL_NAME -asOrg Org3MSP

echo "#######    Generating anchor peer update for Org4MSP  ##########"
configtxgen -profile BasicChannel -configPath . -outputAnchorPeersUpdate ./TransporterMSPanchors.tx -channelID $CHANNEL_NAME -asOrg Org4MSP

echo "#######    Generating anchor peer update for Org5MSP  ##########"
configtxgen -profile BasicChannel -configPath . -outputAnchorPeersUpdate ./ImporterMSPanchors.tx -channelID $CHANNEL_NAME -asOrg Org5MSP

echo "#######    Generating anchor peer update for Org6MSP  ##########"
configtxgen -profile BasicChannel -configPath . -outputAnchorPeersUpdate ./RetailorMSPanchors.tx -channelID $CHANNEL_NAME -asOrg Org6MSP
