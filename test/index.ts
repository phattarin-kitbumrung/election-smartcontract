import { expect } from "chai";
import { ethers } from "hardhat";

describe("Election", function () {
  it("Should addCandidate success", async function () {
    const Election = await ethers.getContractFactory("Election");
    const electionContract = await Election.deploy();
    await electionContract.deployed();
    await electionContract.addCandidate("Candidate1");
    const result = await electionContract.getCandidates();
    expect(result[result.length - 1]).to.equal("Candidate1");
  });
  it("Should addCandidate failed", async function () {
    const Election = await ethers.getContractFactory("Election");
    const electionContract = await Election.deploy();
    await electionContract.deployed();
    await electionContract.addCandidate("Candidate1");
    const result = await electionContract.getCandidates();
    expect(result[result.length]).to.equal(undefined);
  });
  it("Should vote success", async function () {
    const Election = await ethers.getContractFactory("Election");
    const electionContract = await Election.deploy();
    await electionContract.deployed();
    await electionContract.addCandidate("Candidate1");
    await electionContract.addCandidate("Candidate2");
    await electionContract.addCandidate("Candidate3");
    await electionContract.vote(1);
    const result = await electionContract.getBallot();
    expect(result).to.equal("Candidate2");
  });
  it("Should vote failed", async function () {
    const Election = await ethers.getContractFactory("Election");
    const electionContract = await Election.deploy();
    await electionContract.deployed();
    await electionContract.addCandidate("Candidate1");
    await electionContract.addCandidate("Candidate2");
    await electionContract.addCandidate("Candidate3");
    await electionContract.vote(1);
    await expect(electionContract.vote(2)).to.be.revertedWith("you are voted");
  });
  it("Should get result success", async function () {
    const Election = await ethers.getContractFactory("Election");
    const electionContract = await Election.deploy();
    await electionContract.deployed();
    await electionContract.addCandidate("Candidate1");
    await electionContract.addCandidate("Candidate2");
    await electionContract.addCandidate("Candidate3");
    await electionContract.vote(1);
    const result = await electionContract.result();
    expect(result[1][1]).to.equal(1);
    expect(result[0].length).to.equal(3);
    expect(result[1].length).to.equal(3);
  });
  it("Should get result empty", async function () {
    const Election = await ethers.getContractFactory("Election");
    const electionContract = await Election.deploy();
    await electionContract.deployed();
    const result = await electionContract.result();
    expect(result[0].length).to.equal(0);
    expect(result[1].length).to.equal(0);
  });
});
