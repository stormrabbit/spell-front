#!/bin/bash

bp_env_build()
{
	echo "*******************begin build bp env*********************"
	# cd $ROOT_DIR

	#如果bp_dir文件夹存在，就先备份一下
	if [[ -d $front_dir ]]
	then
		backup=$front_dir"_"`date '+%Y-%m-%d-%H:%M:%S'`
		echo "the $front_dir is exist, backup it."
		mv $front_dir "env_backups/"$backup
		
		#判断备份是否成功
		if [ ${?} -ne 0 ]
		then
			echo "backup the old $front_dir faild."
			exit 1
		fi
	fi	
	#npm安装
    npm install --unsafe-perm --allow-root 
	#构建命令
	npm run build
	

}
		
bp_env_build

if [ ${?} -ne 0 ]
then
	echo "build error."
	exit 1
else
	echo "build success."
	exit 0
fi	
