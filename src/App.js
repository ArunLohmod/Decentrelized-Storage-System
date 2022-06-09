import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import { ethers } from 'ethers';

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Upload from './components/Upload';
import MyUploaded from './components/MyUploaded';



import contractABI from "./abi/contract.json";
const contractAddress = "0xA314D1e1bFe1C4fA5d04Ff7e780b6A03ccCd55fb";

const App = () => {

  const [account, setAccount] = useState();
  const [contract, setContract] = useState();
  const [loading, setLoading] = useState(true);

  const web3Handler = async () => {

    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAccount(accounts[0])
    // Get provider from Metamask
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    // Set signer
    const signer = provider.getSigner()

    window.ethereum.on('chainChanged', (chainId) => {
      window.location.reload();
    })

    window.ethereum.on('accountsChanged', async function (accounts) {
      setAccount(accounts[0]);
      await web3Handler();
    })
    loadContracts(signer);

  }

  // loading smart contract
  const loadContracts = async (signer) => {
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    setContract(contract);
    setLoading(false);
  }

  return (
    <React.Fragment>

      <Navbar web3Handler={web3Handler} account={account} />

      {
        loading ? (<h1 className="text-center text-2xl mt-48">⌛Waiting for metamask connection...</h1>) :

          <Routes>
            <Route path="/" element={<Home contract={contract}/>} />
            <Route path="/upload" element={<Upload contract={contract} />} />
            <Route path="/my-uploaded-items" element={<MyUploaded contract={contract} account={account} />} />
          </Routes>
      }

    </React.Fragment>
  )
}

export default App;