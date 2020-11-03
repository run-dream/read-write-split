change master to master_port=3306,master_host=mysql_master,master_user=slave,master_password=xxxxx;
start slave;
show slave status;