var cluster = require('cluster');
var os = require('os');
// ��ȡCPU ������
var numCPUs = os.cpus().length;
var workers = {};
if (cluster.isMaster) {
// �����̷�֧
cluster.on('death', function (worker) {
// ��һ���������̽���ʱ��������������
delete workers[worker.pid];
worker = cluster.fork();
workers[worker.pid] = worker;
});
// ��ʼ������CPU ������ͬ�Ĺ�������
for (var i = 0; i < numCPUs; i++) {
var worker = cluster.fork();
workers[worker.pid] = worker;
}
} else {
// �������̷�֧������������
var app = require('./app');
app.listen(3000);
}
// �������̱���ֹʱ���ر����й�������
process.on('SIGTERM', function () {
for (var pid in workers) {
process.kill(pid);
}
process.exit(0);
});