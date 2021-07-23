import React from "react";
//import styled from "styled-components"

function ListElement({ item, updateStatus, checkOverdueDate }) {
  const convertDateToString = (date) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <tr
      className={
        (item?.isComplete
          ? "table-success"
          : !checkOverdueDate(item?.dueDate)
          ? "table-danger"
          : "") 
      }
    >
      <th scope="row">*</th>
      <td className={item?.isComplete ? "item-completed" : ""}>
        {item?.description || ""}
      </td>
      <td>{item?.dueDate ? convertDateToString(item.dueDate) : ""}</td>
      <td className="table__data table__data--hide">{item?.status?.type}</td>
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
  );
}

export default ListElement;
