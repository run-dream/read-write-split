import {
  DataType,
  Table,
  Model,
  Column,
  CreatedAt,
  UpdatedAt,
  Scopes,
} from "sequelize-typescript";

const { STRING, TEXT, INTEGER, BIGINT } = DataType;

@Scopes(() => {
  return {
    // a self-defined scope means "non-soft-deleted rows"
    avaliable: () => {
      return {
        where: { status: 1 },
      };
    },
  };
})
@Table({
  // you can claim your tableName explicitly
  freezeTableName: true,
  tableName: "post_tbl",
})
export default class PostModel extends Model<PostModel> {
  @Column({
    type: BIGINT({
      length: 20,
    }),
    primaryKey: true,
    autoIncrement: true,
    comment: "post id",
  })
  id: number;

  @Column({
    type: STRING(1024),
    allowNull: false,
    comment: "post title",
  })
  title: string;

  @Column({
    field: "post_content", // alias your field
    type: TEXT,
    allowNull: true,
    comment: "post content",
  })
  postContent: string;

  @Column({
    type: INTEGER(),
    allowNull: false,
    defaultValue: 1,
    comment: "soft delete status", // 0-deleted 1-normal
  })
  status: number;

  @CreatedAt
  @Column({ field: "created_at" })
  createdTime: Date;

  @UpdatedAt
  @Column({ field: "modified_at" })
  modifiedTime: Date;
}
