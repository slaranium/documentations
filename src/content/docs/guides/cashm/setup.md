---
title: Cashm Network
description: A guide in my new Starlight docs site.
---

### Installation Guide

We run a node on Chasm Network and collect points.

### System Requirements (Minimum-Recommended)

| RAM  | CPU   | Disk          |
|------|-------|---------------|
| 1 GB | 1 Core | 5-20 GB SSD   |

### Step 1: Mint NFT to Get Scout ID and API Key

1. Visit [Chasm Scout Private Mint](https://scout.chasm.net/private-mint).
2. You need 0.3 $MNT on Mantle network in your wallet. You can obtain it from Squid.
3. After minting, you will obtain `WEBHOOK_API_KEY` and `SCOUT_UID`.

### Step 2: Get Groq API Key

1. Sign up for an account at Groq to get `GROQ_API_KEY`.

### Step 3: Optional - Get OpenRouter & OpenAI API Keys

This step is optional.

1. Get `OPENROUTER_API_KEY` from OpenRouter.
2. Get `OPENAI_API_KEY` from OpenAI.
3. You can buy phone numbers for OpenAI here using cryptocurrency.

### Step 4: Install Dependencies

```bash
# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update

# Install Docker
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

### Step 5: Setup

### 5-1: Enter root

```bash
cd ~
```

### 5-2: Create and Configure .env File

```bash
nano .env
```

Copy the following config into your `.env` file and then update the variables as needed:

```
SCOUT_NAME=Your favorite scout name
SCOUT_UID=From Step 1: Mint NFT
WEBHOOK_API_KEY=From Step 1: Mint NFT
WEBHOOK_URL=http://<your-vps-ip>:3001/
GROQ_API_KEY=From Step 2: Get Groq API Key
OPENROUTER_API_KEY=Step 3 (optional)
OPENAI_API_KEY=Step 3 (optional)
PORT=3001
LOGGER_LEVEL=debug

# Chasm
ORCHESTRATOR_URL=https://orchestrator.chasm.net
SCOUT_NAME=myscout
SCOUT_UID=
WEBHOOK_API_KEY=
WEBHOOK_URL=

# Chosen Provider (groq, openai)
PROVIDERS=groq
MODEL=gemma2-9b-it
GROQ_API_KEY=

# Optional
OPENROUTER_API_KEY=
OPENAI_API_KEY=

NODE_ENV=production
```

To save the `.env` file and exit, press `Ctrl + X`, then `Y`, and `Enter`.

### 5-3: Run the Scout

```bash
# Open Port
sudo ufw allow 3001

# Pull the code from DockerHub
docker pull johnsonchasm/chasm-scout

# Start the docker container
docker run -d --restart=always --env-file ./.env -p 3001:3001 --name scout johnsonchasm/chasm-scout
```

### Step 6: Verify

### 6-1: Test Server Response

You should get an "OK" response:

```bash
curl localhost:3001
```

### 6-2: Test LLM

```bash
source ./.env
curl -X POST \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer $WEBHOOK_API_KEY" \
     -d '{"body":"{\"model\":\"gemma-7b-it\",\"messages\":[{\"role\":\"system\",\"content\":\"You are a helpful assistant.\"}]}"}' \
     $WEBHOOK_URL
```

### 6-3: Logs

```bash
docker logs scout
```

### Check Leaderboard

You can check the leaderboard at [Chasm Scout Leaderboard](https://scout.chasm.net/leaderboard).

### Optional: Kill and Stop Docker

```bash
docker stop scout && docker rm scout
```

### Optional: Restart Docker

```bash
docker restart scout
```
