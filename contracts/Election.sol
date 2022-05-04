//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Election {
    address admin;
    uint timeLock = block.timestamp + 1 weeks;
    struct Candidate {
        string candidateName;
        uint score;
    }
    Candidate[] public candidates;
    mapping(address => bool) voted;
    mapping(address => string) ballots;

    event Vote(address voter, uint indexed option);

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin {
        require(msg.sender == admin, "unauthorized");
        _;
    }

    modifier onlyPeriod {
        require(block.timestamp <= timeLock, "election closed");
        _;
    }

    function addCandidate(string calldata candidateName) public onlyAdmin onlyPeriod {
        // key value mapping
        candidates.push(Candidate({candidateName: candidateName, score: 0}));
    }

    function getCandidates() public view returns(string[] memory) {
        uint arrayLength = candidates.length;
        string[] memory list = new string[](arrayLength);
        for (uint i = 0; i < arrayLength; i++) {
            list[i] = candidates[i].candidateName;
        }

        return list;
    }

    function vote(uint option) public onlyPeriod {
        require(option >= 0 && option <= candidates.length, "incorrect option");
        require(!voted[msg.sender], "you are voted");

        candidates[option].score++;
        ballots[msg.sender] = candidates[option].candidateName;
        voted[msg.sender] = true;
        emit Vote(msg.sender, option);
    }

    function getBallot() public view returns(string memory) {
        return ballots[msg.sender];
    }

    function result() public view returns(string[] memory, uint[] memory) {
        uint arrayLength = candidates.length;
        string[] memory nameList = new string[](arrayLength);
        uint[] memory scoreList = new uint[](arrayLength);
        for (uint i = 0; i < arrayLength; i++) {
            nameList[i] = candidates[i].candidateName;
            scoreList[i] = candidates[i].score;
        }

        return (nameList, scoreList);
    }
}
