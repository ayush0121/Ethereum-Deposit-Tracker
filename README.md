# Ethereum Deposit Tracker

The Ethereum Deposit Tracker is a robust application that monitors and records ETH deposits on the Beacon Deposit Contract. It leverages Ethereum RPC methods to interact with the blockchain and capture deposit transactions in real-time.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
  - [Running the Server](#running-the-server)
  - [Triggering Deposit Tracking](#triggering-deposit-tracking)
  - [Viewing Recorded Deposits](#viewing-recorded-deposits)
- [Dockerization](#dockerization)
- [Error Handling and Logging](#error-handling-and-logging)
- [Contributing](#contributing)
- [License](#license)

## Features

- Monitors the Beacon Deposit Contract for incoming ETH deposits
- Records deposit details such as block number, timestamp, sender address, amount, transaction hash, and public key
- Handles multiple deposits made in a single transaction, including internal transactions
- Logs deposit data to a file for historical records
- Sends notifications via Telegram for new deposits
- Implements comprehensive error handling for API calls and RPC interactions
- Includes logging mechanisms to track errors and important events

## Prerequisites

- Node.js (v14 or higher)
- npm (Node package manager)
- An Ethereum wallet with access to the Sepolia test network
- Access to a Telegram account to create a bot for notifications

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/ethereum-deposit-tracker.git
   cd ethereum-deposit-tracker