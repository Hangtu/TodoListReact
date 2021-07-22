import React, { useState, useEffect } from "react";
import { getListItems, updateItemRequest } from "../../common/RequestAPI";
import { Spinner } from "react-bootstrap";
import "./TodoListComponent.scss";

function TodoListComponent() {
  const [todoListState, setTodoListState] = useState([]);
  let itemDateStatus = "";

  useEffect(() => {
    (async () => {
      const request = await getListItems();
      setTodoListState(request.data);
    })();
  }, []);

  const convertDateToString = (date) => {
    return new Date(date).toLocaleDateString();
  };

  const checkOverdueDate = (date) => {
    if (!date) return (itemDateStatus = 1);
    const itemDate = new Date(date).getTime();
    const todayDate = new Date().getTime();
    itemDateStatus = itemDate < todayDate ? 0 : 1;
    return itemDateStatus;
  };

  const updateStatus = (e, item) => {
    const newValue = e.target.checked;
    const itemIndex = todoListState.findIndex((element) => {
      return element.id === item.id;
    });

    const updatedState = [...todoListState];
    updatedState[itemIndex].isComplete = newValue;
    setTodoListState(updatedState);
    updateItemRequest(item, newValue)
      .then((response) => {})
      .catch((err) => {
        updatedState[itemIndex].isComplete = !newValue;
        setTodoListState(updatedState);
        throw new Error("Something went wrong on updating the item!");
      });
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
                    <tr
                      key={item?.id}
                      className={
                        item?.isComplete
                          ? "table-success"
                          : !checkOverdueDate(item?.dueDate)
                          ? "table-danger"
                          : ""
                      }
                    >
                      <th scope="row">*</th>
                      <td className={item?.isComplete ? "item-completed" : ""}>
                        {item?.description || ""}
                      </td>
                      <td>
                        {item?.dueDate ? convertDateToString(item.dueDate) : ""}
                      </td>
                      <td className="item-status">
                        {item?.isComplete
                          ? "Completed"
                          : !itemDateStatus
                          ? "Overdue"
                          : "Pending"}
                      </td>
                      <td>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            defaultChecked={item?.isComplete}
                            onChange={(e) => updateStatus(e, item)}
                          ></input>
                        </div>
                      </td>
                    </tr>
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
