# Ethereum Deposit Tracker

## Overview

The Ethereum Deposit Tracker is a Node.js application that monitors the Beacon Deposit Contract for incoming ETH deposits. It records deposit details, sends notifications via Telegram, and visualizes data using Grafana.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Configuration](#environment-configuration)
- [Usage Instructions](#usage-instructions)
- [Code Comments](#code-comments)
- [License](#license)

## Features

- Monitors the Beacon Deposit Contract for incoming deposits.
- Records deposit details (amount, sender address, timestamp, etc.).
- Sends notifications via Telegram for new deposits.
- Visualizes deposit data using Grafana.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or higher)
- npm (Node package manager)
- An Ethereum wallet with access to the Sepolia test network
- Access to a Telegram account to create a bot for notifications
- An InfluxDB instance for data storage (optional for Grafana visualization)

## Installation

1. Clone the repository:

   ```bash
   git clone 
   cd ethereum-deposit-tracker