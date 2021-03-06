import { Sequelize } from "sequelize-typescript";
import { config, init, provide, scope, ScopeEnum } from "midway";
import { join } from "path";
// providing DB.sequelize in case of hyper features
// of sequelize like "sequelize.transaction"
@scope(ScopeEnum.Singleton)
@provide("readDB")
export class ReadDB {
  public sequelize: Sequelize;

  @config("db.read")
  config;
  @init()
  async init() {
    this.sequelize = new Sequelize(this.config);

    // add models here before using them
    this.sequelize.addModels([join(__dirname, "../model")]);

    try {
      await this.sequelize.authenticate();
    } catch (error) {
      error.message = `DB connection error: ${error.message}`;
      throw error;
    }
  }
}
