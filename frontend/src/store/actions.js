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
  },
  getUnapprovedAccommodations({ commit, state }) {
    axios
      .get(`${process.env.VUE_APP_BACKEND_URL}/accommodation?approved=false`, {
        headers: {
          Authorization: state.jwt
        }
      })
      .then(response => {
        commit("setUnapprovedAccommodations", response.data.data);
      });
  },
  getApprovedAccommodations({ commit, state }) {
    axios
      .get(`${process.env.VUE_APP_BACKEND_URL}/accommodation?approved=true`, {
        headers: {
          Authorization: state.jwt
        }
      })
      .then(response => {
        commit("setApprovedAccommodations", response.data.data);
      });
  },
  deleteAccommodation({ commit, state }, item) {
    axios
      .delete(`${process.env.VUE_APP_BACKEND_URL}/accommodation/${item._id}`, {
        headers: {
          Authorization: state.jwt
        }
      })
      .then(() => {
        commit("removeAccommodationFromLists", item);
      });
  },
  approveAccommodation({ commit, state }, item) {
    axios
      .patch(
        `${process.env.VUE_APP_BACKEND_URL}/accommodation/${item._id}`,
        {
          approved: true
        },
        {
          headers: {
            Authorization: state.jwt
          }
        }
      )
      .then(() => {
        commit("removeAccommodationFromLists", item);
      });
  }
};
