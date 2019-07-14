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
  },
  createAccommodation({ state }, accommodation) {
    return axios.post(
      `${process.env.VUE_APP_BACKEND_URL}/accommodation`,
      accommodation,
      {
        headers: {
          Authorization: state.jwt
        }
      }
    );
  },
  fetchProvinceOptions({ commit }) {
    axios.get(process.env.VUE_APP_PROVINCE_API_URL).then(response => {
      commit("setProvinceOptions", response.data.provincias);
    });
  },
  fetchCityOptions({ commit }, province) {
    axios
      .get(`${process.env.VUE_APP_CITIES_API_URL}&provincia=${province}`)
      .then(response => {
        commit("setCityOptions", response.data.municipios);
      })
      .catch(err => {
        console.log(err);
      });
  },
  uploadPhotoForm(context, data) {
    axios.post(
      `${process.env.VUE_APP_BACKEND_URL}/accommodation/upload`,
      data.formData,
      data.config
    );
  },
  getAccommodationData({ state }, id) {
    return axios.get(`${process.env.VUE_APP_BACKEND_URL}/accommodation/${id}`, {
      headers: {
        Authorization: state.jwt
      }
    });
  }
};
