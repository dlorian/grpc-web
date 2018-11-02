const PROTO_PATH = __dirname + '/helloworld.proto';

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const helloworld = protoDescriptor.helloworld;

function doSayHello(call, callback) {
    callback(null, { message: 'Hello! ' + call.request.name });
}

function getServer() {
    const server = new grpc.Server();
    server.addProtoService(helloworld.Greeter.service, {
        sayHello: doSayHello,
    });
    return server;
}

if (require.main === module) {
    const server = getServer();
    server.bind('0.0.0.0:9090', grpc.ServerCredentials.createInsecure());
    server.start();
}

exports.getServer = getServer;