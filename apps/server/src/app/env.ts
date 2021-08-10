const getVal = (key: string) => process.env[key];

export const env = () => {
  const port = parseInt(getVal('PORT'), 10);
  const secret = getVal('MONGO_PASSWORD');
  const user = getVal('MONGO_USER');
  const dbHost = getVal('MONGO_HOST');
  const dbPort = getVal('MONGO_PORT');
  const database = getVal('MONGO_DATABASE');
  const authDatabase = getVal('MONGO_AUTH_DATABASE');
  const dataDir = getVal('DATA_DIR');

  return {
    port,
    auth_databae: authDatabase,
    database_url: `mongodb://${user}:${secret}@${dbHost}:${dbPort}/${database}`,
    dataDir,
  };
};
