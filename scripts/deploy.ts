import { ethers } from "hardhat";

async function main() {
  const Election = await ethers.getContractFactory("Election");
  const electionContract = await Election.deploy();
  await electionContract.deployed();
  console.log("Election deployed to:", electionContract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
