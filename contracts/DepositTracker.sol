// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DepositTracker {
   
    struct Deposit {
        uint256 blockNumber;
        uint256 blockTimestamp;
        uint256 fee; 
        bytes32 hash;
        bytes pubkey; 
        address sender; 
        uint256 amount; 
    }

    mapping(bytes32 => Deposit) public deposits;

    address public constant BEACON_CONTRACT_ADDRESS = 0x00000000219ab540356cBB839Cbe05303d7705Fa;

    event DepositRecorded(
        uint256 blockNumber,
        uint256 blockTimestamp,
        uint256 fee,
        bytes32 hash,
        bytes pubkey,
        address sender,
        uint256 amount
    );
    modifier onlyBeaconContract() {
        require(msg.sender == 0x1D5D040C96F3011344cF56a7126c213d4A6ecCE4, "Not from Beacon Deposit Contract");
        _;
    }
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

    function getDepositDetails(bytes32 _hash) public view returns (Deposit memory) {
        return deposits[_hash];
    }
}