---
title: Shardeum
description: A guide install sharedeum atomic node.
---

# Shardeum Node Setup

This guide contains scripts and instructions to set up and run a Shardeum node. Shardeum is a blockchain platform designed to be fast, scalable, and secure.

## Prerequisites

Before setting up the Shardeum node, ensure you have the following:

- A Linux-based operating system (Ubuntu 20.04 or later is recommended)
- Docker installed on your system
- At least 4 GB of RAM and 10 GB of free disk space
- Internet connection

## Installation

Follow these steps to set up the Shardeum node:

### 1. Clone the Repository

```bash
git clone https://github.com/ZuperHunt/shardeum-node.git
cd shardeum-node
```

### 2. Build the Docker Image

Build the Docker image that will be used to run the Shardeum node:

```bash
docker build -t shardeum-node .
```

### 3. Run the Shardeum Node

Start the Shardeum node using Docker:

```bash
docker run -d --name shardeum-node -p 9001:9001 shardeum-node
```

### 4. Verify Node Status

Check if the node is running correctly:

```bash
docker logs shardeum-node
```

### 5. Stop the Node

If you need to stop the node, you can do so with the following command:

```bash
docker stop shardeum-node
```

## Updating the Node

To update the Shardeum node to the latest version, follow these steps:

1. Pull the latest changes from the repository:
   ```bash
   git pull origin main
   ```
2. Rebuild the Docker image:
   ```bash
   docker build -t shardeum-node .
   ```
3. Restart the node:
   ```bash
   docker stop shardeum-node
   docker run -d --name shardeum-node -p 9001:9001 shardeum-node
   ```

## Troubleshooting

### Common Issues

- **Docker Image Not Building**: Ensure Docker is installed and running. Also, verify that your system meets the prerequisites.
- **Node Not Starting**: Check the Docker logs for any error messages. Make sure your firewall is not blocking the required ports.

### Getting Help

If you encounter any issues that are not covered in this README, please open an issue in this repository, and we will assist you.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

We welcome contributions to improve this project. Please read the [CONTRIBUTING](CONTRIBUTING.md) guidelines before submitting a pull request.
