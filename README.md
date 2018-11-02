Install protobuf compiler form

https://github.com/protocolbuffers/protobuf/releases


protoc -I=. helloworld.proto \
  --js_out=import_style=commonjs:. \
  --grpc-web_out=import_style=commonjs,mode=grpcwebtext:.