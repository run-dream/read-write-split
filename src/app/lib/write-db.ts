import { Sequelize } from "sequelize-typescript";
import { init, config, provide, scope, ScopeEnum } from "midway";
import { join } from "path";
// providing DB.sequelize in case of hyper features
// of sequelize like "sequelize.transaction"
@scope(ScopeEnum.Singleton)
@provide("writeDB")
export class WriteDB {
  public sequelize: Sequelize;

  @config("db.write")
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
