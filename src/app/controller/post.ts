import { Context, inject, controller, get, provide } from "midway";
import { ReadDB } from "../lib/read-db";
import { WriteDB } from "../lib/write-db";
import { ModelCtor, Model } from "sequelize-typescript";
import PostModel from "../model/post";

@provide()
@controller("/post")
export class PostController {
  @inject()
  ctx: Context;

  @inject()
  readDB: ReadDB;

  @inject()
  writeDB: WriteDB;

  get writeModel(): ModelCtor<Model<PostModel>> {
    return this.writeDB.sequelize.models.PostModel as any;
  }

  get readModel(): ModelCtor<Model<PostModel>> {
    return this.readDB.sequelize.models.PostModel as any;
  }

  @get("/init")
  async init() {
    await this.writeDB.sequelize.models.PostModel.sync();
    this.ctx.body = {
      read: await this.readDB.sequelize.query(`show tables`),
      write: await this.writeDB.sequelize.query(`show tables`),
    };
  }

  @get("/create")
  async create() {
    const write = await this.writeModel.create<Model<PostModel>>({
      postContent: "testCreate" + new Date().toDateString(),
      title: new Date().toTimeString(),
    });
    this.ctx.body = {
      read: await this.readModel.findByPk(write.id),
      write,
    };
  }

  @get("/update")
  async update() {
    const write = await this.writeModel.update<Model<PostModel>>(
      {
        postContent: "testUpdate" + new Date().toDateString(),
        title: new Date().toTimeString(),
      },
      {
        where: {
          id: 1,
        },
      }
    );
    this.ctx.body = {
      read: await this.readModel.findByPk(write.id),
      write,
    };
  }
}
