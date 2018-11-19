#! /bin/bash
if [ -z $1 ];then
	echo 参数错误
	echo [usage]: "./push.sh 提交理由"
	exit 1
fi
git add .
git commit -m $1
git push
