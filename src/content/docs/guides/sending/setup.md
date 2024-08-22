---
title: "Sending Network"
description: A reference page in my new Starlight docs site.
---

### Installation Guide

## #Step 1: Download Node Installation Script

Depending on your system, use the following command to download and install the deployment script:

### Ubuntu or other Debian-based system

```bash
sudo apt-get install -y wget && wget -N http://node4.sending.network:8120/watchdog_linux.sh  -P .
```

### Step 2: Run the Installation Script

Change the permissions of the script and execute the installation script by running:

```bash
sudo chmod 777 watchdog_linux.sh && ./watchdog_linux.sh
```

When prompted, enter your wallet address. 

Make sure to use your whitelisted wallet address to ensure node deployment success and avoid missing out on SXP.

Wait for the installation to complete. If you see "The WatchDog node is up and running." in the log output, your node is up.

If you are running the script directly, please **do NOT run it with `sudo`** as it will impact the node daemon process. Instead, you can run it under a common user account, or by using `sudo su` or the root account.

```bash
./watchdog_linux.sh
```

### Check the Status of WatchDog

To check if your node is running, use the following command:

```bash
sudo docker ps -a | grep 'jack0818/watchdog' | grep -v grep | awk '{print $1}' | xargs sudo docker container inspect | grep '"Status": "running"'
```

If your node is running, you will see the following output:

```bash
"Status": "running"
```

### Check Your Node ID

To display your node ID, use the following command:

```bash
cat ~/WatchdogNode/run/watchdog/peerinfo
```

### Stop the Node

To stop the node, use the following commands:

1. Find and stop the WatchDog daemon process:

    ```bash
    sudo ps wxau | grep watchdog | grep sh | awk '{print $2}' | xargs sudo kill -9
    ```

2. Stop and remove the Docker containers:

    ```bash
    sudo docker ps -a | grep 'jack0818/watchdog' | awk '{print $1}' | xargs sudo docker stop | xargs sudo docker rm
    ```

### Restart the Node

To restart your WatchDog node, follow these steps:

1. **Download the latest installation script:** In the original directory, obtain the latest script and run it.

2. **Maintain the original directory:** If you run the node from a new directory other than the original one, it will create a new node ID. Points will be accrued with this new ID, but previous points will remain valid under the original node ID.

### Next Steps

After finishing the installation, interact with our auto-reply bot on the SendingMe app to check your node's stats. SendingMe is an all-in-one web3 instant messaging app built on top of SendingNetwork. Refer to "Check Node Stats with Auto-Reply Bot in SendingMe" for instructions on utilizing the bot to monitor your node's performance.
