---
title: PWR Chain
description: A guide in my new Starlight docs site.
---

### PWR Chain Validator Node & RPC Node Guide

This guide provides instructions to set up and run a PWR Chain validator node.

### Validator Node Guide

**Important Note:** This is the inaugural testnet launch. While we strive for perfection, there might be unforeseen issues. We appreciate all feedback, bug reports, or any other issues reported in our [Discord server](https://discord.gg/your-discord-link).

### Requirements

- **CPU:** 1 vCPU
- **Memory:** 1 GB RAM
- **Disk:** 50 GB HDD or higher
- **Open TCP Ports:** 8231, 8085
- **Open UDP Port:** 7621

### Setup on Ubuntu Server

#### Update OS

```bash
sudo apt update
```

#### Install Java

```bash
sudo apt install default-jdk
```

#### Install the Validator Node Software and Config File

```bash
wget https://github.com/pwrlabs/PWR-Validator-Node/raw/main/validator.jar
wget https://github.com/pwrlabs/PWR-Validator-Node/raw/main/config.json
```

#### Set Up Your Password

```bash
sudo nano password
```

1. Enter your desired password.
2. Press `Ctrl + X` to close.
3. Press `Y` to confirm saving the password.

#### Import Your Validator

If you have a private key you want to import, use this command; otherwise, skip to the next step.

```bash
sudo java -jar validator.jar --import-key <private key here> password
```

#### Run the Node

Replace `<YOUR_SERVER_IP>` with your server's actual IP.

```bash
sudo java -jar validator.jar password <YOUR_SERVER_IP> --compression-level 0
```

PWR Chain is the first chain that supports block compression. `--compression-level` sets the level of compression you want your node to use. Compression level varies from 0 to 9. `0` disables compression. `9` sets it to maximum.

#### Get Your Address

```bash
curl localhost:8085/address/
```

#### Become a Validator Node

Initially, your node will synchronize with the blockchain but will not assume validator responsibilities until it possesses staked PWR Coins.

To obtain sufficient PWR Coins for staking, apply to become a testnet validator on our Discord server. Once approved, you can use our Discord bot to claim 100k PWR to stake.

After claiming your coins, your node will initiate a transaction to enlist as a validator.

### Running in the Background

If you wish to run the node in the background, ensuring it remains active after closing the terminal, utilize the `nohup` command:

```bash
nohup sudo java -jar validator.jar password <YOUR_SERVER_IP> --compression-level 0 &
```

### Getting Your Private Key

```bash
nohup sudo java -jar validator.jar get-private-key password
```

A hex string private key will be returned. This key can be used in the PWR Browser Wallet.

Congratulations, you've now set up and run a PWR Chain validator node!
