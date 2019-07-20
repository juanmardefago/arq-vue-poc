export default {
  jwt: sessionStorage.jwt || "",
  logged: sessionStorage.logged || false,
  permissions: sessionStorage.permissions || "",
  unapprovedAccommodations: [],
  approvedAccommodations: [],
  provinceOptions: [],
  cityOptions: []
};
