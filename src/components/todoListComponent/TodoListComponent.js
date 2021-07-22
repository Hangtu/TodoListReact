import React, { useState, useEffect } from "react";
import { getListItems, updateItemRequest } from "../../common/RequestAPI";
import { Spinner } from "react-bootstrap";
import ListElement from "./listElement/ListElement";
import "./TodoListComponent.scss";

function TodoListComponent() {
  const [todoListState, setTodoListState] = useState([]);
  
  useEffect(() => {
    (async () => {
      const request = await getListItems();
      const data = request.data;
      setTodoListState(sortElements(data));
    })();
  }, []);

  const updateStatus = (e, item) => {
    const newValue = e.target.checked;
    const updatedState = [...todoListState];

    const itemIndex = todoListState.findIndex((element) => {
      return element.id === item.id;
    });
    updatedState[itemIndex].isComplete = newValue;
    setTodoListState(sortElements(updatedState));
    updateItemRequest(item, newValue)
      .then((response) => {})
      .catch((err) => {
        updatedState[itemIndex].isComplete = !newValue;
        setTodoListState(updatedState);
        throw new Error("Something went wrong on updating the item!");
      });
  };

  const checkOverdueDate = (date) => {
    if (!date) return 1;
    const itemDate = new Date(date).getTime();
    const todayDate = new Date().getTime();
    return itemDate > todayDate ? 1 : 0;
  };

  const setItemsStatus = (list) => {
    list.forEach((item) => {
      if (item.isComplete) {
         item["status"] = {id : 3 , type : 'Completed'}; // completed
      } else if (checkOverdueDate(item?.dueDate)) {
         item["status"] = {id : 2 , type : 'Pending'}; // completed
      } else {
         item["status"] = {id : 1 , type : 'Overdue'}; // completed
      }
    });
    return list;
  };

  const sortElements = (list) => {
    const items =  setItemsStatus(list);
    const sortItems = items.sort(function (a, b) {
      if (a.status.id === b.status.id) {
        return new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
      }
      return a.status.id > b.status.id ? 1 : -1;
    });
    return sortItems;
  };

  return (
    <React.Fragment>
      {!todoListState.length ? (
        <Spinner animation="border" className="spinner" />
      ) : (
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Task</th>
                <th scope="col">Due Date</th>
                <th scope="col" className="item-status">
                  Status
                </th>
                <th scope="col">Check</th>
              </tr>
            </thead>
            <tbody>
              {todoListState.length
                ? todoListState.map((item) => (
                    <ListElement
                      key={item?.id}
                      item={item}
                      updateStatus={updateStatus}
                      checkOverdueDate={checkOverdueDate}
                    />
                  ))
                : null}
            </tbody>
          </table>
        </div>
      )}
    </React.Fragment>
  );
}

export default TodoListComponent;
