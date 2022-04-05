pragma experimental ABIEncoderV2;

contract ToDo {
  struct Task {
    string description;
    string user;
    bool status;
  }

  Task[] public tasks;

  function createTask(string memory _description, string memory _user) public {
    tasks.push(Task(_description, _user, false));
  }

  function checkTask(uint8 _id) public {
    tasks[_id].status = true;
  }
  
  function getTasks() public view returns(Task[] memory) {
    return tasks;
  }
}