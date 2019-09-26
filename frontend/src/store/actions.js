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
  getUnapprovedAccommodations({ commit, state }, paginationData) {
    return axios
      .get(
        `${
          process.env.VUE_APP_BACKEND_URL
        }/accommodation?approved=false&$limit=${
          paginationData.rowsPerPage
        }&$skip=${paginationData.rowsPerPage * (paginationData.page - 1)}`,
        {
          headers: {
            Authorization: state.jwt
          }
        }
      )
      .then(response => {
        commit("setUnapprovedAccommodations", response.data.data);
        return response.data;
      });
  },
  getApprovedAccommodations({ commit, state }, paginationData) {
    return axios
      .get(
        `${
          process.env.VUE_APP_BACKEND_URL
        }/accommodation?approved=true&$limit=${
          paginationData.rowsPerPage
        }&$skip=${paginationData.rowsPerPage * (paginationData.page - 1)}`,
        {
          headers: {
            Authorization: state.jwt
          }
        }
      )
      .then(response => {
        commit("setApprovedAccommodations", response.data.data);
        return response.data;
      });
  },
  deleteAccommodation({ commit, state }, item) {
    return axios
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
    return axios
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
  uploadPhotoForm({ state }, data) {
    axios.patch(
      `${process.env.VUE_APP_BACKEND_URL}/accommodation/${data.id}`,
      data.formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: state.jwt
        }
      }
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
