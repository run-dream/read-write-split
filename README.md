# read_write_split

rw-split demo 用 midway.js + sequelize-typescript 来实现读写分离

# 注意

sequelize-typescript 暂时不支持 sequelize6
没采用 replication 的配置来实现是因为可能存在某些业务要从写库来直接读取返回
