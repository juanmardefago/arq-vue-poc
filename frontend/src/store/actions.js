import axios from "axios";

export default {
  createUser(context, user) {
    return axios.post(`${process.env.VUE_APP_BACKEND_URL}/users`, user);
  },
  authenticate(context, user) {
    return axios.post(
      `${process.env.VUE_APP_BACKEND_URL}/authentication`,
      user
    );
  }
};
