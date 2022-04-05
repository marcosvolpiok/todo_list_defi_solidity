import logo from './logo.svg';
import './App.css';

import ToDo from './abis/ToDo.json'

import {useEffect, useState, useCallback} from 'react'


var Web3 = require('web3');



function App() {
  //const [data, dataSet] = useState<any>(null)
  const [tasks, setTasks] = useState([]);

  const fetchMyAPI = useCallback(async () => {    
    window.web3 = await new Web3('ws://127.0.0.1:8545');

    await window.ethereum.enable();



    const accounts = await window.web3.eth.getAccounts();
    console.log('ACCCOUNTS', accounts);



    const acc = window.web3.eth.getAccounts(console.log);
    const currentAccount = await window.ethereum.selectedAddress;
    console.log('currentAccount', currentAccount);

    const contract = new window.web3.eth.Contract(ToDo.abi, "0x254dffcd3277C0b1660F6d42EFbB754edaBAbC2B");
    const result = await contract.methods.createTask('Created from React 3', 'React user!')
    .send({from: currentAccount})
    .on('receipt', function (receipt) {
      console.log('method executed!');
    });
    console.log(result)

    const result2 = await contract.methods.getTasks().call();
    console.log(result2);
    setTasks(result2);



    // const list = await contract.methods.tasks(1).call();
    // console.log('list', list);
  }, [])

  useEffect(() => {
    fetchMyAPI()
  }, [fetchMyAPI])

  return (
    <div className="App">
      {tasks.map((task ,i) => (
        <div key={i}>
          <p>
            {task.description}
          </p>
        </div>
      ))}
    </div>
  );
}



export default App;
