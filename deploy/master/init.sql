create user slave@'%' identified by 'password'
grant replication slave on *.* to slave@'%'
show master status