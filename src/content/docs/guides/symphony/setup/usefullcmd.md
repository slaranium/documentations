---
title: Usefull Command
description: A guide in my new Starlight docs site.
---

## Tendermint Cheat Sheet

A Tendermint cheat sheet is a quick reference for essential commands to control Tendermint blockchains.

## Managing Keys

Managing keys on a Tendermint-based chain involves securing and controlling access to cryptographic keys used for chain operations.

### Generate New Key

```bash
symphonyd keys add wallet
```

### Recover Key

```bash
symphonyd keys add wallet --recover
```

### List All Keys

```bash
symphonyd keys list
```

### Delete Key

```bash
symphonyd keys delete wallet
```

### Export Key

```bash
symphonyd keys export wallet
```

### Import Key

```bash
symphonyd keys import wallet wallet.backup
```

### Query Wallet Balances

```bash
symphonyd q bank balances $(symphonyd keys show wallet -a)
```

## Managing Validators

Ensure you've updated the moniker, identity, details, and website to match your values.

### Create Validator

```bash
symphonyd tx staking create-validator \
--amount 1000000note \
--pubkey $(symphonyd tendermint show-validator) \
--moniker "your-moniker-name" \
--identity "your-keybase-id" \
--details "your-details" \
--website "your-website" \
--security-contact "your-email" \
--chain-id symphony-testnet-3 \
--commission-rate 0.05 \
--commission-max-rate 0.20 \
--commission-max-change-rate 0.01 \
--min-self-delegation 1 \
--from wallet \
--gas-adjustment 1.4 \
--gas auto \
--fees 800note \
-y
```

### Edit Validator

```bash
symphonyd tx staking edit-validator \
--new-moniker "your-moniker-name" \
--identity "your-keybase-id" \
--details "your-details" \
--website "your-website" \
--security-contact "your-email" \
--chain-id symphony-testnet-3 \
--commission-rate 0.05 \
--from wallet \
--gas-adjustment 1.4 \
--gas auto \
--fees 800note \
-y
```

### Unjail Validator

```bash
symphonyd tx slashing unjail --from wallet --chain-id symphony-testnet-3 --gas-adjustment 1.4 --gas auto --fees 800note -y
```

### Validator Jail Reason

```bash
symphonyd query slashing signing-info $(symphonyd tendermint show-validator)
```

### List Active Validators

```bash
symphonyd q staking validators -oj --limit=3000 | jq '.validators[] | select(.status=="BOND_STATUS_BONDED")' | jq -r '(.tokens|tonumber/pow(10; 6)|floor|tostring) + " \t " + .description.moniker' | sort -gr | nl
```

### List Inactive Validators

```bash
symphonyd q staking validators -oj --limit=3000 | jq '.validators[] | select(.status=="BOND_STATUS_UNBONDED")' | jq -r '(.tokens|tonumber/pow(10; 6)|floor|tostring) + " \t " + .description.moniker' | sort -gr | nl
```

### View Validator Details

```bash
symphonyd q staking validator $(symphonyd keys show wallet --bech val -a)
```

## Managing Tokens

### Withdraw Reward from All Validators

```bash
symphonyd tx distribution withdraw-all-rewards --from wallet --chain-id symphony-testnet-3 --gas-adjustment 1.4 --gas auto --fees 800note -y
```

### Withdraw Reward and Commission

```bash
symphonyd tx distribution withdraw-rewards $(symphonyd keys show wallet --bech val -a) --commission --from wallet --chain-id symphony-testnet-3 --gas-adjustment 1.4 --gas auto --fees 800note -y
```

### Delegate Tokens to Your Validator

```bash
symphonyd tx staking delegate $(symphonyd keys show wallet --bech val -a) 1000000note --from wallet --chain-id symphony-testnet-3 --gas-adjustment 1.4 --gas auto --fees 800note -y
```

### Delegate Tokens to Another Validator

Change `<to-valoper-address>` as you like:

```bash
symphonyd tx staking delegate <to-valoper-address> 1000000note --from wallet --chain-id symphony-testnet-3 --gas-adjustment 1.4 --gas auto --fees 800note -y
```

### Redelegate to Another Validator

```bash
symphonyd tx staking redelegate $(symphonyd keys show wallet --bech val -a) <to-valoper-address> 1000000note --from wallet --chain-id symphony-testnet-3 --gas-adjustment 1.4 --gas auto --fees 800note -y
```

### Unbond Tokens from Your Validator

```bash
symphonyd tx staking unbond $(symphonyd keys show wallet --bech val -a) 1000000note --from wallet --chain-id symphony-testnet-3 --gas-adjustment 1.4 --gas auto --fees 800note -y
```

### Send Tokens to Another Wallet

```bash
symphonyd tx bank send wallet <to-wallet-address> 1000000note --from wallet --chain-id symphony-testnet-3 --gas-adjustment 1.4 --gas auto --fees 800note -y
```

## Governance

### Query List of Proposals

```bash
symphonyd query gov proposals
```

### View Proposal by ID

```bash
symphonyd query gov proposal 1
```

### Vote Option Yes

```bash
symphonyd tx gov vote 1 yes --from wallet --chain-id symphony-testnet-3 --gas-adjustment 1.4 --gas auto --fees 800note -y
```

### Vote Option No

```bash
symphonyd tx gov vote 1 no --from wallet --chain-id symphony-testnet-3 --gas-adjustment 1.4 --gas auto --fees 800note -y
```

### Vote Option Abstain

```bash
symphonyd tx gov vote 1 abstain --from wallet --chain-id symphony-testnet-3 --gas-adjustment 1.4 --gas auto --fees 800note -y
```

### Vote Option NoWithVeto

```bash
symphonyd tx gov vote 1 NoWithVeto --from wallet --chain-id symphony-testnet-3 --gas-adjustment 1.4 --gas auto --fees 800note -y
```

## Usefulness

Please note that updating the custom port is optional!

### Update Custom Port

```bash
CUSTOM_PORT=248
sed -i -e "s%^proxy_app = \"tcp://127.0.0.1:26658\"%proxy_app = \"tcp://127.0.0.1:${CUSTOM_PORT}58\"%; s%^laddr = \"tcp://127.0.0.1:26657\"%laddr = \"tcp://127.0.0.1:${CUSTOM_PORT}57\"%; s%^pprof_laddr = \"localhost:6060\"%pprof_laddr = \"localhost:${CUSTOM_PORT}60\"%; s%^laddr = \"tcp://0.0.0.0:26656\"%laddr = \"tcp://0.0.0.0:${CUSTOM_PORT}56\"%; s%^prometheus_listen_addr = \":26660\"%prometheus_listen_addr = \":${CUSTOM_PORT}66\"%" $HOME/.symphonyd/config/config.toml
sed -i -e "s%^address = \"tcp://0.0.0.0:1317\"%address = \"tcp://0.0.0.0:${CUSTOM_PORT}17\"%; s%^address = \":8080\"%address = \":${CUSTOM_PORT}80\"%; s%^address = \"0.0.0.0:9090\"%address = \"0.0.0.0:${CUSTOM_PORT}90\"%; s%^address = \"0.0.0.0:9091\"%address = \"0.0.0.0:${CUSTOM_PORT}91\"%" $HOME/.symphonyd/config/app.toml
```

### Disable Indexer

```bash
sed -i -e 's|^indexer *=.*|indexer = "null"|' $HOME/.symphonyd/config/config.toml
```

### Enable Indexer

```bash
sed -i -e 's|^indexer *=.*|indexer = "kv"|' $HOME/.symphonyd/config/config.toml
```

### Pruning Update

```bash
sed -i \
  -e 's|^pruning *=.*|pruning = "custom"|' \
  -e 's|^pruning-keep-recent *=.*|pruning-keep-recent = "100"|' \
  -e 's|^pruning-keep-every *=.*|pruning-keep-every = "0"|' \
  -e 's|^pruning-interval *=.*|pruning-interval = "19"|' \
  $HOME/.symphonyd/config/app.toml
```

## Maintenance

### Get Validator Information

```bash
symphonyd status 2>&1 | jq .ValidatorInfo
```

### Get Sync Information

```bash
symphonyd status 2>&1 | jq .SyncInfo
```

### Get Node Peer

```bash
echo $(symphonyd tendermint show-node-id)'@'$(curl -s ifconfig.me)':'$(cat $HOME/.symphonyd/config/config.toml | sed -n '/Address to listen for incoming connection/{n;p;}' | sed 's/.*://; s/".*//')
```

### Check Validator Keys

```bash
[[ $(symphonyd q staking validator $(symphonyd keys show wallet --bech val -a) -oj | jq -r .consensus_pubkey.key) = $(symphonyd status | jq -r .ValidatorInfo.PubKey.value) ]] && echo -e "\n\e[1m\e[32mTrue\e[0m\n" || echo -e "\n\e[1m\e[31mFalse\e[0m\n"
```

### Get Live Peers

```bash
curl -sS http://localhost:24857/net_info | jq -r '.result.peers[] | "\(.node_info.id)@\(.remote_ip):\(.node_info.listen_addr)"' | awk -F ':' '{print $1":"$(NF)}'
```

### Configure Minimum Gas Prices

```bash
sed -i -e "s/^minimum-gas-prices *=.*/minimum-gas-prices = \"0note\"/" $HOME/.symphonyd/config/app.toml
```

### Enable Prometheus

```bash
sed -i -e "s/prometheus = false/prometheus = true/" $HOME/.symphonyd/config/config.toml
```

### Reset Chain Data

```bash
symphonyd tendermint unsafe-reset-all --keep-addr-book --home $HOME/.symphonyd --keep-addr-book
```

**Before moving on to the next step, be aware that all chain data will be erased. Ensure you've created a backup of your priv_validator_key.json!**

### Remove Node

```bash
cd $HOME
sudo systemctl stop symphony
sudo systemctl disable symphony
sudo rm /etc/systemd/system/symphony.service
sudo systemctl daemon-reload
sudo rm -f $(which symphonyd)
sudo rm -rf $HOME/.symphonyd
sudo rm -rf $HOME/symphony
sudo rm -rf $HOME/go
```
