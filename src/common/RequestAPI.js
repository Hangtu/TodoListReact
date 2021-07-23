import axios from "axios";

axios.defaults.baseURL = 'HTTPS://944ba3c5-94c3-4369-a9e6-a509d65912e2.mock.pstmn.io';
axios.defaults.headers.common['X-Api-Key'] = 'PMAK-5ef63db179d23c004de50751-10300736bc550d2a891dc4355aab8d7a5c';
axios.defaults.headers.patch['Content-Type'] = 'application/json';

export async function getListItems() {
  const response = axios({
    url: "/get",
    method: "get",
  });
  return response;
}

export async function updateItemRequest(item, payload) {
  const response = axios({
    url: `/patch/${item.id}`,
    method: "patch",
    data: {
      isComplete: payload,
    },
  });
  return response;
}
