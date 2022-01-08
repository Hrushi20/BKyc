pragma solidity ^0.8.4;

contract KycStorage{

    struct UsersKyc {
        string ipfsHash;
        string ipfsCipherKey;
        bool isValue;
    }

    mapping(string => UsersKyc) data; 

    function setData(string memory phNo,string memory ipfsHash,string memory ipfsCipherKey) public returns (bool){
        UsersKyc memory user = UsersKyc(ipfsHash,ipfsCipherKey,true);
        data[phNo] = user;
        return true;
    }

    function getData(string memory phNo) public view returns (string memory,string memory,string memory){
        if(data[phNo].isValue == false){
            return ("Data doesn't exists","","");
        }
        return (phNo,data[phNo].ipfsHash,data[phNo].ipfsCipherKey);
    }
}

