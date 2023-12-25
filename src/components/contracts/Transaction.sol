// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Transaction {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can call this function");
        _;
    }

    receive() external payable {
        // This function is called when Ether is sent directly to the contract
    }

    function transferToOwner(uint256 amount) external payable {
        require(msg.value == amount, "Sent value does not match the specified amount");
        payable(owner).transfer(amount);
    }

    function contractBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
