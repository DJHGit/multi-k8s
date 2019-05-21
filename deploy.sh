docker build -t mmcadocker/multi-client:latest -t mmcadocker/multi-client:$SHA -f ./client/Dockerfile ./client
docker build -t mmcadocker/multi-server:latest -t mmcadocker/multi-server:$SHA -f ./server/Dockerfile ./server
docker build -t mmcadocker/multi-worker:latest -t mmcadocker/multi-worker:$SHA -f ./worker/Dockerfile ./worker

docker push mmcadocker/multi-client:latest
docker push mmcadocker/multi-server:latest
docker push mmcadocker/multi-worker:latest

docker push mmcadocker/multi-client:$SHA
docker push mmcadocker/multi-server:$SHA
docker push mmcadocker/multi-worker:$SHA

kubectl apply -f k8s
kubectl set image deployments/server-deployment server=mmcadocker/multi-server:$SHA
kubectl set image deployments/client-deployment client=mmcadocker/multi-client:$SHA
kubectl set image deployments/worker-deployment worker=mmcadocker/multi-worker:$SHA
