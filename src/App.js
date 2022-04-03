import logo from './logo.svg';
import './App.css';

import ToDo from './abis/ToDo.json'

import {useEffect, useState, useCallback} from 'react'


var Web3 = require('web3');
var web3 = new Web3('ws://127.0.0.1:8545');




function App() {
  //const [data, dataSet] = useState<any>(null)

  const fetchMyAPI = useCallback(async () => {
    // const userAccount = web3.eth.accounts[0];
    // console.log('user account', userAccount);
    // console.log('accounts', web3.eth.accounts);

    console.log('acc', web3.eth.accounts)

    //const accounts = await ethereuWeb3m.request({ method: 'eth_accounts' });
    const acc = web3.eth.getAccounts(console.log);
    //console.log('abis', ToDo);
    const contract = new web3.eth.Contract(ToDo.abi, "0xCfEB869F69431e42cdB54A4F4f105C19C080A601")
    const result = await contract.methods.createTask('Created from React', 'React user!')
    .send({from: '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1'})
    .on('receipt', function (receipt) {
      console.log('method executed!');
    });
    console.log(result)


    const list = await contract.methods.tasks(1).call();
    console.log('list', list);
    //console.log('Hiiii', accounts)
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
