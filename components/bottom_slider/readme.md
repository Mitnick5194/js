�ײ�����ѡ����

demo1 �򵥵���ʾ��
var data = {
data:["����" , "����" , "��ɽ"],
idx: 2,
}
var picker = new SingleSlider(data);
ȡֵ��picker.getSelectedNode();����Ԫ�ض��󣬿��Դ�Ԫ�ض�����ı���dataset��ȡ��Ҫ������

demo2 �����Զ���dataset��
var data = [{
name: '����',
dataset:{id:1,provider:'�㶫'}
},{
name: '����',
dataset: {id:2 , provider: '�㶫'}
},{
name: '����',
dataset: {id:3,provider:'����'}
},{
name: '̫ԭ',
dataset:{id:4,provider: 'ɽ��'}
},{
name: '����',
dataset:{id:4,provider: '�ຣ'}
}]
var picker = new SingleSlider({
title:"��ѡ��",
//data:["����1","����2","����3","����4","����5","����6","����7","����8","����9","����10","����11","����12"],
data:data,
idx: 2
});

