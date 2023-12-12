#!/bin/bash
echo "Creating Traefik objects:"
microk8s kubectl apply -f traefik_crd.yml
microk8s kubectl apply -f traefik_rbac_clusterrole_and_binding.yml
microk8s kubectl apply -f traefik_serviceaccount_and_deployment.yml
#microk8s kubectl apply -f traefik_v1.7_serviceaccount_daemonset_and_service.yml
microk8s kubectl apply -f traefik_web_ui_service_and_ingress.yml

echo "Waiting 60s for pods to stabilize..."
sleep 60

#echo "Forwarding Kubernetes-Dashboard to localhost (this is needed before any Ingress for TLS):"
#microk8s kubectl port-forward --address 0.0.0.0 service/traefik 8000:8000 8080:8080 8443:4443 -n kube-system&
#microk8s kubectl port-forward -n kube-system service/traefik-web-ui-svc 8888:8080
sudo /snap/bin/microk8s.kubectl port-forward --address 0.0.0.0 service/traefik-svc  8000:8000 8080:8080 443:4443 -n kube-system &
echo "You can view the Traefik Web UI at https://localhost:8080/dashboard"

exit 0
