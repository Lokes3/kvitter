const {Datastore} = require('@google-cloud/datastore');
const uuid = require("uuid")

// Creates a client
const datastore = new Datastore();

const KvitterKind = "Kvitter"

async function getKvitter() {
  const query = datastore.createQuery(KvitterKind).order('created');
  const [kvitter] = await datastore.runQuery(query);
  console.log(kvitter)
  return kvitter.map(d => d.data)
}

const storeKvitter = async kvitter => {
  const key = datastore.key([KvitterKind, uuid.v4()]);
  await datastore.save({
    key,
    data: kvitter
  })
}

module.exports = {
  getKvitter,
  storeKvitter,
}