const {Datastore} = require('@google-cloud/datastore');
const uuid = require("uuid")

// Creates a client
const datastore = new Datastore();

const KvitterKind = "Kvitter"

async function getKvitter() {
  const query = datastore.createQuery(KvitterKind).order("created_at");
  const [kvitter, msg] = await datastore.runQuery(query);
  console.debug(msg)
  return kvitter
}

const storeKvitter = async kvitter => {
  const key = datastore.key([KvitterKind, uuid.v4()]);
  const [rsp] = await datastore.save({
    key: key,
    data: kvitter
  })
  console.debug(rsp)
}

module.exports = {
  getKvitter,
  storeKvitter,
}