pragma solidity ^0.8.4;

contract KycStorage{

    struct UsersKyc {
        string ipfsHash;
        string ipfsCipherKey;
        bool isValue;
    }

    mapping(string => UsersKyc) data; 

    function setData(string memory kycId,string memory ipfsHash,string memory ipfsCipherKey) public returns (bool){
        UsersKyc memory user = UsersKyc(ipfsHash,ipfsCipherKey,true);
        data[kycId] = user;
        return true;
    }

    function getData(string memory kycId) public view returns (string memory,string memory,string memory){
        if(data[kycId].isValue == false){
            return ("Data doesn't exists","","");
        }
        return (kycId,data[kycId].ipfsHash,data[kycId].ipfsCipherKey);
    }
}

