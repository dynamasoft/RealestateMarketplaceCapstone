pragma solidity >=0.4.21 <0.6.0;

import "./Verifier.sol";
import "./ERC721Mintable.sol";

contract SolnSquareVerifier is ERC721Mintable
{

	Verifier zkpVerifier;

	modifier requireUniqueSolution(uint[2] memory a,  uint[2][2] memory b, uint[2] memory c, uint[2] memory input)
	{
		bytes32 key = keccak256(abi.encodePacked(a,b,c,input));
		require(isSolutionUnique(key), "Solution is already exists. Try a different one");
		_;
	}

	modifier requireValidSolution(uint[2] memory a,  uint[2][2] memory b, uint[2] memory c, uint[2] memory input)
	{
		require(zkpVerifier.verifyTx(a,b,c,input), "Invalid solution");
		_;
	}

	//constructor
	constructor(address contractAddress) ERC721Mintable() 
	public
    {
        zkpVerifier = Verifier(contractAddress);
    }

	// TODO define a solutions struct that can hold an index & an address
	struct Solution {uint id; address solutionAddress;}

	// TODO define an array of the above struct
	Solution[] solutions;

	// TODO define a mapping to store unique solutions submitted
	mapping(bytes32 => Solution) private solutionsSubmitted;

	// TODO Create an event to emit when a solution is added
	event solutionAddedEvent(address solutionAddress);

	// TODO Create a function to add the solutions to the array and emit the event
	function addSolution(
        address solutionAddress,
        uint256 id,
        uint[2] memory a,
        uint[2][2] memory b,
        uint[2] memory c,
        uint[2] memory input)
		requireUniqueSolution(a,b,c, input)
        public
        {

        Solution memory mySolution = Solution({
			id: id, 
			solutionAddress: solutionAddress
		});

		bytes32 uniqueKey = keccak256(abi.encodePacked(a,b,c,input));
        solutionsSubmitted[uniqueKey] = mySolution;

        solutions.push(mySolution);
        emit solutionAddedEvent(solutionAddress);
    }

    function isSolutionUnique(bytes32 key) public view returns (bool)
	{
    	if (solutionsSubmitted[key].solutionAddress != address(0))
		{
    		return false;
    	}
        
		return true;
    }
    
	function mintNFT(
        address _to,
        uint256 _tokenId,
        uint[2] memory a,
        uint[2][2] memory b,
        uint[2] memory c,
        uint[2] memory input
        )
        public
		requireValidSolution(a,b,c,input)
        {				
		addSolution(_to, _tokenId,a,b,c,input);
		super.mint(_to, _tokenId);
	}

}


























