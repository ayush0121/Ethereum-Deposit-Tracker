// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DepositTracker {
    // Define a struct to store deposit details
    struct Deposit {
        uint256 blockNumber;
        uint256 blockTimestamp;
        uint256 fee; // For simplicity, assuming fee is in wei
        bytes32 hash;
        bytes pubkey; // Public key as bytes
        address sender; // Address of the sender
        uint256 amount; // Amount of ETH deposited
    }

    // Mapping to store deposits by transaction hash
    mapping(bytes32 => Deposit) public deposits;

    address public constant BEACON_CONTRACT_ADDRESS = 0x00000000219ab540356cBB839Cbe05303d7705Fa;

    // Event to log deposit details
    event DepositRecorded(
        uint256 blockNumber,
        uint256 blockTimestamp,
        uint256 fee,
        bytes32 hash,
        bytes pubkey,
        address sender,
        uint256 amount
    );

    // Modifier to ensure the deposit is from the Beacon Deposit Contract
    modifier onlyBeaconContract() {
        require(msg.sender == BEACON_CONTRACT_ADDRESS, "Not from Beacon Deposit Contract");
        _;
    }

    // Function to be called when a deposit is detected
    function recordDeposit(
        uint256 _blockNumber,
        uint256 _blockTimestamp,
        uint256 _fee,
        bytes32 _hash,
        bytes memory _pubkey,
        address _sender,
        uint256 _amount
    ) public onlyBeaconContract {
        deposits[_hash] = Deposit({
            blockNumber: _blockNumber,
            blockTimestamp: _blockTimestamp,
            fee: _fee,
            hash: _hash,
            pubkey: _pubkey,
            sender: _sender,
            amount: _amount
        });

        emit DepositRecorded(_blockNumber, _blockTimestamp, _fee, _hash, _pubkey, _sender, _amount);
    }

    // Function to retrieve deposit details by transaction hash
    function getDepositDetails(bytes32 _hash) public view returns (Deposit memory) {
        return deposits[_hash];
    }
}