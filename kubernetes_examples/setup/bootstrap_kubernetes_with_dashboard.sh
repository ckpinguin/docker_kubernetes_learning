#!/bin/bash

# Uncomment the following to reinstall microk8s:
# echo "Removing microk8s..."
# sudo snap remove microk8s
# echo "Installing microk8s..."
# sudo snap install microk8s --classic

echo "Enabling kubernetes addons:"
microk8s enable dashboard dns registry rbac

sleep 10

echo "Creating Kubernetes-Dashboard objects:"
microk8s kubectl apply -f kubernetes-dashboard-namespace.yml
microk8s kubectl apply -f kubernetes-dashboard-admin-user-service-account.yml
microk8s kubectl apply -f kubernetes-dashboard-admin-user-clusterrole-binding.yml

echo "Waiting 180s for all pods to stabilize..."
sleep 180

echo "Forwarding Kubernetes-Dashboard to localhost:"
microk8s kubectl port-forward -n kube-system service/kubernetes-dashboard 10443:443&

echo "Getting Token to login:"

microk8s kubectl -n kubernetes-dashboard describe secret $(microk8s kubectl -n kubernetes-dashboard get secret | grep admin-user | awk '{print $1}')

echo "You can use this Token to login to the Kubernetes-Dashboard at https://localhost:10443"






