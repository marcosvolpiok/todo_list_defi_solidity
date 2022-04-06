import logo from './logo.svg';
import './App.css';

import ToDo from './abis/ToDo.json'

import {useEffect, useState, useCallback} from 'react'


var Web3 = require('web3');
var contract;
var currentAccount;
const contractAddress = '0x0E696947A06550DEf604e82C26fd9E493e576337';

function App() {
  //const [data, dataSet] = useState<any>(null)
  const [tasks, setTasks] = useState([]);

  const fetchMyAPI = useCallback(async () => {    
    window.web3 = await new Web3('ws://127.0.0.1:8545');

    await window.ethereum.enable();



    const accounts = await window.web3.eth.getAccounts();
    console.log('ACCCOUNTS', accounts);



    const acc = window.web3.eth.getAccounts(console.log);
    currentAccount = await window.ethereum.selectedAddress;
    console.log('currentAccount', currentAccount);

    contract = new window.web3.eth.Contract(ToDo.abi, contractAddress);


    // const list = await contract.methods.tasks(1).call();
    // console.log('list', list);
    getTasks();
  }, [])

  useEffect(() => {
    fetchMyAPI()
  }, [fetchMyAPI])


  async function check(id) {
    const result = await contract.methods.checkTask(id)
    .send({from: currentAccount})
    .on('receipt', function (receipt) {
      console.log('method executed!');
      getTasks();
    });
  }

  async function getTasks(){
    const result2 = await contract.methods.getTasks().call();
    console.log(result2);
    setTasks(result2);
  }

  async function createTask(description, user){
    const result = await contract.methods.createTask(description, user)
    .send({from: currentAccount})
    .on('receipt', function (receipt) {
      console.log('method executed!');
    });
    console.log(result)
  }

  return (
    <div className="App">
      {tasks.map((task ,i) => (
        <div key={i}>
          <p
          style={{ textDecoration: task.status == true && 'line-through' }}
          >
            ID: {i} - {task.description} -  
            {task.status == false &&
              <button onClick={() => check(i)}>Check</button>
            }
          </p>
        </div>
      ))}
    </div>
  );
}



export default App;
