export default {
  signIn(state, data) {
    state.jwt = data.accessToken;
    state.permissions = data.permissions;
    state.logged = true;
    sessionStorage.jwt = data.accessToken;
    sessionStorage.permissions = data.permissions;
    sessionStorage.logged = true;
  },
  signout(state) {
    state.jwt = "";
    state.permissions = "";
    state.logged = false;
    sessionStorage.jwt = "";
    sessionStorage.permissions = "";
    sessionStorage.logged = false;
  },
  setUnapprovedAccommodations(state, accommodations) {
    state.unapprovedAccommodations = accommodations;
  },
  setApprovedAccommodations(state, accommodations) {
    state.approvedAccommodations = accommodations;
  },
  removeAccommodationFromLists(state, accommodation) {
    state.approvedAccommodations.splice(
      state.approvedAccommodations.indexOf(accommodation),
      1
    );
    state.unapprovedAccommodations.splice(
      state.unapprovedAccommodations.indexOf(accommodation),
      1
    );
  },
  setProvinceOptions(state, provinceOptions) {
    state.provinceOptions = provinceOptions;
  },
  setCityOptions(state, cityOptions) {
    state.cityOptions = cityOptions;
  }
};
