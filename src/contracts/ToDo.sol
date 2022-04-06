pragma experimental ABIEncoderV2;

contract ToDo {
  struct Task {
    string description;
    string user;
    bool status;
    address owner;
  }

  Task[] public tasks;

  function createTask(string memory _description, string memory _user) public {
    tasks.push(Task(_description, _user, false, msg.sender));
  }

  function checkTask(uint8 _id) public {
    tasks[_id].status = true;
  }

  function cleanTasks() public {
    delete tasks;
  }
  
  function getTasks() public view returns(Task[] memory) {
    return tasks;
  }

  function getTasksByOwner(address owner) external view returns(Task[] memory) {
    Task[] memory result = new Task[](tasks.length);
    uint counter = 0;
    for (uint i = 0; i < tasks.length; i++) {
      if (owner == tasks[i].owner) {
        result[counter] = tasks[i];
        counter++;
      }
    }

    return result;
  }

  
}