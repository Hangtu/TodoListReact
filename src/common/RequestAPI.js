import axios from "axios";
const headers = {
  "X-Api-Key":
    "PMAK-5ef63db179d23c004de50751-10300736bc550d2a891dc4355aab8d7a5c",
};

export async function getListItems() {
  const response = axios({
    url: "https://944ba3c5-94c3-4369-a9e6-a509d65912e2.mock.pstmn.io/get",
    method: "get",
    headers: headers,
  });

  return response;
}

export async function updateItemRequest(item, payload) {
  headers["Content-Type"] = "application/json";

  const response = axios({
    url: `https://944ba3c5-94c3-4369-a9e6-a509d65912e2.mock.pstmn.io/patch/${item.id}`,
    method: "patch",
    headers: headers,
    data: {
      isComplete: payload,
    },
  });

  return response;
}
