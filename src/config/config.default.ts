import { EggAppConfig, EggAppInfo, PowerPartial } from "midway";

export type DefaultConfig = PowerPartial<EggAppConfig>;

export default (appInfo: EggAppInfo) => {
  const config = {} as DefaultConfig;

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_{{keys}}";

  // add your config here
  config.middleware = [];

  config.db = {
    read: {
      dialect: "mysql",
      database: "read-write",
      host: "remote",
      port: 10802,
      username: "xxxxx",
      password: "xxxxx",
    },
    write: {
      dialect: "mysql",
      database: "read-write",
      host: "remote",
      port: 10801,
      username: "xxxxx",
      password: "xxxxx",
    },
  };

  return config;
};
