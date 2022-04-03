import logo from './logo.svg';
import './App.css';

import ToDo from './abis/ToDo.json'

import {useEffect, useState, useCallback} from 'react'


var Web3 = require('web3');



function App() {
  //const [data, dataSet] = useState<any>(null)

  const fetchMyAPI = useCallback(async () => {    
    window.web3 = await new Web3('ws://127.0.0.1:8545');

    await window.ethereum.enable();



    const accounts = await window.web3.eth.getAccounts();
    console.log('ACCCOUNTS', accounts);



    const acc = window.web3.eth.getAccounts(console.log);
    const currentAccount = await window.ethereum.selectedAddress;
    console.log('currentAccount', currentAccount);

    const contract = new window.web3.eth.Contract(ToDo.abi, "0xCfEB869F69431e42cdB54A4F4f105C19C080A601");
    const result = await contract.methods.createTask('Created from React 3', 'React user!')
    .send({from: currentAccount})
    .on('receipt', function (receipt) {
      console.log('method executed!');
    });
    console.log(result)


    const list = await contract.methods.tasks(1).call();
    console.log('list', list);
  }, [])

  useEffect(() => {
    fetchMyAPI()
  }, [fetchMyAPI])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
