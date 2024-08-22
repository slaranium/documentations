---
title: Installation
description: A guide in my new Starlight docs site.
---

# Symphony Testnet Node Setup

This document provides detailed instructions on setting up and running a Symphony Testnet Node, including setting up a server, installing Docker, and creating a validator.

## Setup Server

### Update Packages and Install Prerequisites

```bash
sudo apt update && apt upgrade -y
sudo apt install curl git jq lz4 build-essential unzip fail2ban ufw -y
```

### Set Firewall

```bash
sudo ufw default allow outgoing
sudo ufw default deny incoming
sudo ufw allow ssh
sudo ufw allow 9100
```

### Enable Firewall

```bash
sudo ufw enable
```

## Install GO

```bash
ver="1.22.3"
wget "https://golang.org/dl/go$ver.linux-amd64.tar.gz"
sudo rm -rf /usr/local/go
sudo tar -C /usr/local -xzf "go$ver.linux-amd64.tar.gz"
rm "go$ver.linux-amd64.tar.gz"
echo "export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin" >> $HOME/.bash_profile
source $HOME/.bash_profile
go version
```

## Node Installation

### Node Name (Moniker)

```bash
MyNode
```

### Port (Optional)

```bash
26
```

### Wallet Name

```bash
wallet
```

### Repository

#### Install Symphony through Repository

```bash
cd $HOME
rm -rf symphony
git clone https://github.com/Orchestra-Labs/symphony symphony
cd symphony
git checkout 0.3.0
make install
```

#### Set Configuration for Your Node

```bash
symphonyd config chain-id symphony-testnet-3
symphonyd config keyring-backend file
```

#### Init Your Node

```bash
symphonyd init MyNode --chain-id symphony-testnet-3
```

#### Add Genesis File and Addrbook

```bash
curl -Ls https://snapshots.indonode.net/symphony/genesis.json > $HOME/.symphonyd/config/genesis.json
curl -Ls https://snapshots.indonode.net/symphony/addrbook.json > $HOME/.symphonyd/config/addrbook.json
```

### Configure Seeds and Peers

```bash
PEERS="f21a0c449aa40052ab7780b073b1ecd387614eb9@65.108.129.49:38656,7dfa9c9d1f69d4cb7ea7a602ebd341c578b79ba9@91.205.105.37:35656,b534103adb9607b43a5d2c7b2080d0451252341e@94.250.203.128:26656,f3a0085a5d6009c5bd1e1348319fb71b2a5d749b@116.202.218.189:11856,a495c12eac37c0eb92ae8b2af5bcc7ede5534772@88.99.254.62:23656,7c768a0e530ea21d253c9ae6ca6f29f3da7cde48@38.242.157.63:26656,e4c2bc50373c76557292868f8dbf5a636e8e8155@152.53.22.203:25656,f4bad1c7e7ea2ccff5d55d0c1301f1198d181899@162.55.213.116:42656,7ad8144f0459c54b56c96e56ff4b0ca9c4bc8794@149.50.102.86:35656,b3fc76a630180a42d8baf24a226a4bd2a6b746ad@65.21.215.142:39656,8835c8b99e2fae9b7900b25136423a00c935a043@84.247.175.206:39656,14624069e8c156b6e4e7d522e1126a9dc34dbe46@188.241.240.117:36656,0d32644ee60af544e018199093d76635c1e4a37b@45.94.58.14:39656,a3548cfce105e32337ebc3ecae1240e4daf07011@37.27.127.107:35656,ffdd521d16c28ce3016bed487f6faa95c1ad076f@65.21.202.124:24656,62e9d523037900103da58d27398549a11444f032@188.40.73.112:23656,9ca2a8db243d638410ff772345f1d92285188d09@109.199.117.57:26656,be3cc797a053d35a5a521d91c169c89c8a2257be@128.199.167.95:26656,cd1057afb50634d6a267fe233c6bc51b10cf6dd1@84.247.131.187:12656,29e0875c76542a397650c7e78da159e7dc7ea781@209.97.169.74:26656,fe7ab8cb929764fe645dda43be697ce480a436dd@109.199.117.108:26656,22e9b542b7f690922e846f479878ab391e69c4c3@57.129.35.242:26656,428e8ceb6f4783bc971888c55c37fbd3bbae3502@178.128.27.169:26656,8600e62340ebb5dee9350469a78192eb1e620473@14.226.121.54:20656,1a80d895ece8b5dbb5b62b25a43072a631e234ea@159.69.146.32:42656,2062d4c9b26e01ca74e110428b06f8edc6cd5a05@195.201.194.231:35656,f56d8c77e6a6716d67e3e034de0e0cda70f5c235@94.136.188.196:26656,bd980568469c8c0e8c5fd0f8adcbbbe94ddd041a@135.181.79.242:35656,5c0c693e0e6e22e12be5fb47752937e832e053eb@92.118.57.222:35656,00b75f22fa75ee39c54f785d6eb3700e4a0981c7@45.8.148.166:26656,5c57ff95a49daebc91d8c0b20b4fc40f600cc310@65.109.87.218:39656,23ecd7a3b2d97711cec5c3a8159cdb0c540c1d77@65.109.115.15:35656,07650d0b7027d4e80a369bc308897acf2c59daef@213.199.57.212:39656,38d958b028f7228facef4745fb6401e7ac8b89d6@65.21.198.100:24856,14baf7f538abb121a3e936b4561dd3c7145035ca@65.109.83.40:29256,3448d552ef2c7485fb805f0cc662e882dabb6463@194.233.69.228:26656,3456d4af79000354486130560ec0c31262dca9fb@159.223.223.184:26656,0a66a8b150825b71d6655faaae2e2c8b811cd55e@148.113.170.13:16611,0a244e5dfd5783d30a184901ace2b4f2ef5f7e68@155.133.22.148:26656,894ca90b3ac451bcdb87276b0c4f815dd3583e74@213.199.39.187:35656,0e384f7532a7beca665130b44627a58476f4746d@136.243.104.103:24856,95edc0c89a26e544a04438a579c0865548481ec3@185.217.126.249:26656,b0e3fc9321f0de15dc20c719d18b19bf3b993344@109.199.98.25:26656,8e5d8b822c67b9e60f884857c2b58af95e1c67be@152.53.19.64:14656,82256fa5f217e4b6bc9e006c73d6d81b934f49f1@45.159.230.128:17656,9ba9ac89cc4d8b272d1124d62992b2572d35f83a@62.169.16.24:656,a7fc5ef2092d22b67d283d3f9d8f17c7442682e1@68.183.187.199:26656,8ba2e8c2964a58e69f02af175e473ce232d544dc@109.123.238.47:26656,fef5816de49c6f9f649a3196bd4c1e2116d611e6@206.189.93.38:26656,655b2a12419bc6252fb15e687fd604fe858415e6@65.109.117.113:29256,ec3c0bf2f8d743c4498253a47ffc77cff705148a@167.99.157.205:26656,1e8e012104bb3de286dc549e9f0270e0d074f3d1@2.58.82.19:26656,77ce4b0a96b3c3d6eb2beb755f9f6f573c1b4912@178.18.251.146:22656,96605eb667eb5100ba9a1542a11e94415d486c82@185.182.186.122:15656,7ecaeeada7bc77deb916cc8450e6603d85168dde@109.199.117.232:26656,3236c0970cf2fa30472e08b6a63f7f81119dbca1@75.119.157.78:656,67147a0a639ce7eef14a6608121c6dbbe205dec2@37.60.251.177:26656,badf386c35307c0fd5c18305f5793dafdef6b119@185.192.97.28:26656,53e0d236d4414ef397643a6a9a9277c29c06473f@89.117.52.46:26656,6467f265a4ea1477d6c00f8c96feead4a5d9eb3c@45.159.222.95:656,3f58299f67b94e158945b8f15033a409f24cd577@51.178.92.69:18656,22a295ddcfa7ecf37359b56712e508a3e59ebbad@207.244.238.120:26656,e520c4bf09066c852be861cd683c7eadabd5ddbd@116.202.32.209:26656,231d2b8442460e267134998c5a2fd9a0c183d816@45.90.96.220:51556,fbc16e44352b1a91df9a8e623b117595b096697c@65.109.139.230:35656,00cff5e4f5f7d5afe90bb7c3974d359f1c6facc4@45.155.164.41:35656,7c5e48af7fdc8a1acf0b7681460904e48e96780d@95.217.225.147:26656,337c03ec2b46ddd4131af83d9c79bcf1184a4463@207.180.255.125:26656,46552ce672bd1f4861322565a43b68b6fc1445fc@62.169.29.146:26656"
sed -i -e "s|^persistent_peers *=.*|persistent_peers = \"$PEERS\"|" $HOME/.symphonyd/config/config.toml
```

### Set Pruning, Enable Prometheus, Gas Prices, and Indexer

```bash
sed -i \
  -e 's|^pruning *=.*|pruning = "custom"|' \
  -e 's|^pruning-keep-recent *=.*|pruning-keep-recent = "100"|' \
  -e 's|^pruning-keep-every *=.*|pruning-keep-every = "0"|' \
  -e 's|^pruning-interval *=.*|pruning-interval = "19"|' \
$HOME/.symphonyd/config/app.toml
sed -i -e 's|^indexer *=.*|indexer = "null"|' $HOME/.symphonyd/config/config.toml
sed -i -e "s|^minimum-gas-prices *=.*|minimum-gas-prices = \"0.25note\"|" $HOME/.symphonyd/config/app.toml
```

### Set Service File

```bash
sudo tee /etc/systemd/system/symphonyd.service > /dev/null <<EOF
[Unit]
Description=symphony testnet node
After=network-online.target
[Service]
User=$USER
ExecStart=$(which symphonyd) start
Restart=always
RestartSec=3
LimitNOFILE=65535
[Install]
WantedBy=multi-user.target
EOF
sudo systemctl daemon-reload
sudo systemctl enable symphonyd
```

### Change Port

```bash
sed -i.bak -e "s%^proxy_app = \"tcp://127.0.0.1:26658\"%proxy_app = \"tcp://127.0.0.1:26658\"%; s%^laddr = \"tcp://127.0.0.1:26657\"%laddr = \"tcp://127.0.0.1:26657\"%; s%^pprof_laddr = \"localhost:6060\"%pprof_laddr = \"localhost:26060\"%; s%^laddr = \"tcp://0.0.0.0:26656\"%laddr = \"tcp://0.0.0.0:26656\"%; s%^prometheus_listen_addr = \":26660\"%prometheus_listen_addr = \":26660\"" $HOME/.symphonyd/config/config.toml
sed -i.bak -e "s%^address = \"tcp://localhost:1317\"%address = \"tcp://0.0.0.0:26317\"%; s%^address = \":8080\"%address = \":26080\"%; s%^address = \"localhost:9090\"%address = \"0.0.0.0:26090\"%; s%^address = \"0.0.0.0:9091\"%address = \"0.0.0.0:26091\"%; s%:8545%:26545%; s%:8546%:26546%; s%:6065%:60265%" $HOME/.symphonyd/config/app.toml
```

### Download Latest Snapshot

```bash
curl -L https://snapshots.indonode.net/symphony/symphony-latest.tar.lz4 | tar -Ilz4 -xf - -C $HOME/.symphonyd
```

### Start the Node

```bash
sudo systemctl restart symphonyd && sudo journalctl -fu symphonyd -o cat
```

## Setup Validator

You need a wallet for the validator. There are two options: you can either create a new one or recover an existing one.

### Option 1: Create Wallet

```bash
symphonyd keys add wallet
```

### Option 2: Recover Wallet

```bash
symphonyd keys add wallet --recover
```

**Warning:** Backup your seed phrase in a safe place!!!

### List Keys

To see the list of all your wallets:

```bash
symphonyd keys list
```

Fund your wallet with tokens, at least 1, and check the balance:

### Check Balance

```bash
symphonyd q bank balances $(symphonyd keys show wallet -a)
```

## Create Validator

**Caution:** Make sure to edit the values for YOUR_KEYBASE_ID, YOUR_DETAILS, and YOUR_WEBSITE_URL. You can leave them empty if you don't have any of those.

```bash
symphonyd tx staking create-validator \
  --amount 1000000note \
  --pubkey $(symphonyd tendermint show-validator) \
  --moniker "MyNode" \
  --identity "YOUR_KEYBASE_ID" \
  --details "YOUR_DETAILS" \
  --website "YOUR_WEBSITE_URL" \
  --chain-id symphony-testnet-3 \
  --commission-rate 0.05 \
  --commission-max-rate 0.20 \
  --commission-max-change-rate 0.05 \
  --min-self-delegation "1" \
  --from wallet \
  --gas auto \
  --gas-adjustment 1.4 \
  --gas-prices 0.25note \
  -y
```

**Important:** Save the `$HOME/.symphonyd/config/priv_validator_key.json` file to recover your validator. This is the only file you need to recover your validator if you lose it.
