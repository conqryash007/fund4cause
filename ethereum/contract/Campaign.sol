// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract CampaignFactory{
    Campaign[] public deployedCampaigns;
    
    function createCampaign(uint min) public{
        Campaign newCamp = new Campaign(min,msg.sender);
        deployedCampaigns.push(newCamp);
    }
    
    function getDeployedCampaigns() public view returns(Campaign[] memory){
        return deployedCampaigns;
    }
    
}

contract Campaign{
    
    struct Request{
        string description;
        uint value;
        address payable recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool)approvals;
    }
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    Request[] public requests;
    uint approversCount;
    
    modifier restricted(){
        require(msg.sender == manager);
        _;
    }
    
    constructor(uint min,address creator){
        manager = creator;
        minimumContribution = min;
    }
    
    function contribute() public payable{
        require(msg.value > minimumContribution);
        approvers[msg.sender] = true;
        approversCount++;
    }
    
    function createRequest(string calldata des, uint val,address recip) public restricted{
            Request storage newReq = requests.push();
            newReq.description = des;
            newReq.value = val;
            newReq.recipient = payable(recip);
            newReq.complete = false;
            newReq.approvalCount = 0;
            // requests.push(newReq);
    }
    
    function approveRequest(uint index) public{
        require(approvers[msg.sender]);
        require(!requests[index].approvals[msg.sender]);
        requests[index].approvals[msg.sender] = true;
        requests[index].approvalCount++;
    }
    
    function finalizeRequest(uint index) public payable{
        require(requests[index].approvalCount > approversCount/2);
        require(!requests[index].complete);
        
        requests[index].recipient.transfer(requests[index].value);
        requests[index].complete = true;
    }
    
}
