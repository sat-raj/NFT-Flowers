import React, { useState, useEffect } from 'react';
import ProductList from './ProductList';
import './App.css';
import { connectMetamask } from './components/connection';
import Hello from './Hello';
function App() {


  const [contractInstance, setContract] = useState(null)
  const [accounts, setAccounts] = useState()

  useEffect(()=>{ 
    async function connect(){
      try {
        let {accounts, instance} = await connectMetamask();
        console.log("RETURN :=", accounts, instance)
        setAccounts(accounts);
        setContract(instance);
      } catch (error) {
        // -32002 error code means metamask is trying to take permission
        if(error.code != -32002){
          alert(
            `Failed to load web3, accounts, or contract. Check console for details.`,
          );
        }
        console.log(error);
      }
    }
    setTimeout(connect, 1500);
  },[])
  return (
    <div>
      <ProductList/>
    </div>
  );
};

export default App;
