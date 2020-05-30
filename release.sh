#!/bin/bash
set -x
PROJECT=spell_book_ui
ROOT_DIR=/home/wizard
DEPLOY=/home/wizard/spellbook/$PROJECT
WAX=/home/wizard/unlimited_blade_works/$PROJECT
branch='master'
GITHUB='https://github.com/stormrabbit/spell_book_ui.git'
#wax重构环境搭建
bp_env_build()
{
        echo "*******************begin build bp env*********************"
        cd $ROOT_DIR
        # 删除原有文件夹
        rm -Rf $WAX
        #从Git上拉代码
        git clone $GITHUB $WAX
        #cd到目录下
        cd $WAX
           if [[ "$branch"x != "master"x ]]
           then 
                #切分支
                git checkout -b $branch remotes/origin/$branch
           fi
        #判断checkout是否成功
        if [ ${?} -ne 0 ]
        then    
                echo "check out code "$branch" faild."
                exit 1
        else    
                echo "check out code "$branch" to "$ROOT_DIR""$WAX
        fi
        #npm安装
        npm install --unsafe-perm
        #构建命令
        npm run build
        
        #替换文件index
        rm -Rf $DEPLOY
        mkdir -p $DEPLOY
        cp -r $WAX/dist $DEPLOY
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