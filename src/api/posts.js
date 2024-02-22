import axios from "axios";

export function getPosts(params) {
  return axios.get("http://localhost:5000/posts", { params });
}

export function getPostById(id) {
  return axios.get(`http://localhost:5000/posts/${id}`);
}

export function createPost(data) {
  return axios.post("http://localhost:5000/posts", data);
}

/* put은 전체 데이터가 업데이트되기 때문에 patch와 잘 고려하여 사용한다
export function updatePost(id, data) {
  return axios.put(`http://localhost:5000/posts/${id}`, data);
}
*/
export function updatePost(id, data) {
  return axios.patch(`http://localhost:5000/posts/${id}`, data);
}

export function deletePost(id) {
  return axios.delete(`http://localhost:5000/posts/${id}`);
}
