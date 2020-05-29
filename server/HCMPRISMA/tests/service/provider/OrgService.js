let orgdata = require("../data/orgnization.json");
export default class OrgService {
  getOrg(id) {
    console.log("ID ", id, orgdata.orgs[id]);
    return orgdata.orgs[id];
  }
  getAllOrg() {
    return orgdata.orgs;
  }
}
