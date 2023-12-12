# Docker / Swarm / Kubernetes

- [Docker](#docker)
  - [Tipps](#tipps)
  - [Podman (RHEL-Variante von Docker) Tipps](#podman-rhel-variante-von-docker-tipps)
  - [Persönliches Docker-Hub Repository](#persönliches-docker-hub-repository)
  - [Docker App](#docker-app)
  - [Docker build & buildx (BuildKit)](#docker-build--buildx-buildkit)
  - [Veränderten container als image speichern (Nur für Legacy-Zeugs. Man sollte aber normalerweise bevorzugt mit Dockerfiles arbeiten)](#veränderten-container-als-image-speichern-nur-für-legacy-zeugs-man-sollte-aber-normalerweise-bevorzugt-mit-dockerfiles-arbeiten)
  - [Layer betrachten (Merke: Layer sind immutable)](#layer-betrachten-merke-layer-sind-immutable)
  - [Befehle ausführen in laufendem Container](#befehle-ausführen-in-laufendem-container)
  - [Cleanup](#cleanup)
    - [Alle gestoppten Container entfernen](#alle-gestoppten-container-entfernen)
    - [Alles säubern (natürlich nur auf Testmaschinen!)](#alles-säubern-natürlich-nur-auf-testmaschinen)
  - [Basic Security](#basic-security)
  - [Network](#network)
    - [Formatierung von Detailinfos aus "inspect"](#formatierung-von-detailinfos-aus-inspect)
    - [publish (-p LOKALER_PORT:CONTAINER_PORT) Container_port ist derjenige, der im Dockerfile  mit "EXPOSE" konfiguriert wurde](#publish--p-lokaler_portcontainer_port-container_port-ist-derjenige-der-im-dockerfile-mit-expose-konfiguriert-wurde)
    - [Tipp DNS](#tipp-dns)
    - ["--net host" (anstatt dem default "bridge") wird (offenbar) für docker-images benötigt, welche in einer VM (bei mir VirtualBox) laufen, sonst gibt's "no route to host" Fehler](#--net-host-anstatt-dem-default-bridge-wird-offenbar-für-docker-images-benötigt-welche-in-einer-vm-bei-mir-virtualbox-laufen-sonst-gibts-no-route-to-host-fehler)
    - [Poor Man's Loadbalancer](#poor-mans-loadbalancer)
      - [Testen (mehrmals probieren, ob versch. IP kommen)](#testen-mehrmals-probieren-ob-versch-ip-kommen)
    - [Probleme mit VirtualBox Netz](#probleme-mit-virtualbox-netz)
  - [Volumes](#volumes)
    - [Benanntes Volume (einfach, weil es einfacher zu finden ist unter /var/lib/docker/volumes)](#benanntes-volume-einfach-weil-es-einfacher-zu-finden-ist-unter-varlibdockervolumes)
    - [Bind-Mount Beispiel](#bind-mount-beispiel)
- [docker-compose (Mehrere Container auf einzelner Maschine)](#docker-compose-mehrere-container-auf-einzelner-maschine)
  - [Alles ausführen, das im docker-compose.yml geschrieben ist](#alles-ausführen-das-im-docker-composeyml-geschrieben-ist)
  - [Stoppen und lokale images löschen](#stoppen-und-lokale-images-löschen)
  - [Alles löschen (Volumes und lokale images)](#alles-löschen-volumes-und-lokale-images)
  - [Logs anschauen](#logs-anschauen)
  - [Templating im Dockercompose File](#templating-im-dockercompose-file)
- [docker-machine](#docker-machine)
  - [Umgebungsvariablen übernehmen (nützt unter Windows allerdings nicht viel, wenn kein docker cmd vorhanden ist)](#umgebungsvariablen-übernehmen-nützt-unter-windows-allerdings-nicht-viel-wenn-kein-docker-cmd-vorhanden-ist)
- [Docker Swarm Management](#docker-swarm-management)
  - [Token von Manager anzeigen (mit dem angezeigten Befehl können dann nodes beitreten)](#token-von-manager-anzeigen-mit-dem-angezeigten-befehl-können-dann-nodes-beitreten)
  - [Rollen wechseln](#rollen-wechseln)
  - [Overlay Netzwerk erstellen](#overlay-netzwerk-erstellen)
  - [Tipp: Manager soll keine Worktasks übernehmen](#tipp-manager-soll-keine-worktasks-übernehmen)
    - [Constraint / placcement-pref](#constraint--placcement-pref)
      - [Sanfte Vorgabe](#sanfte-vorgabe)
      - [Constraint / harte Vorgabe](#constraint--harte-vorgabe)
- [Docker service (container im Swarm)](#docker-service-container-im-swarm)
  - [Service erstellen](#service-erstellen)
    - [Real-World-Beispiel mit 5 versch. Tasks (-d anfügen für async start der services)](#real-world-beispiel-mit-5-versch-tasks--d-anfügen-für-async-start-der-services)
- [Docker stack (Services im Swarm-Cluster)](#docker-stack-services-im-swarm-cluster)
  - [Ein docker-visualizer kann im yml eingebaut werden (nicht für Produktion!), als Übersichtstool](#ein-docker-visualizer-kann-im-yml-eingebaut-werden-nicht-für-produktion-als-übersichtstool)
- [Docker secret (Passwörter u.ä.)](#docker-secret-passwörter-uä)
  - [Benutzen des secrets](#benutzen-des-secrets)
  - [Entfernen von secrets (löst aber redeploy aus)](#entfernen-von-secrets-löst-aber-redeploy-aus)
- [Docker Swarm Lifecycle Beispiel](#docker-swarm-lifecycle-beispiel)
  - [Secrets mit lokalem docker compose benutzen](#secrets-mit-lokalem-docker-compose-benutzen)
  - [Full App Lifecycle: Dev, Build and Deploy With a Single Compose Design](#full-app-lifecycle-dev-build-and-deploy-with-a-single-compose-design)
  - [Service Updates: Changing Things In Flight](#service-updates-changing-things-in-flight)
  - [Tipp: Rebalancing über Nodes erzwingen](#tipp-rebalancing-über-nodes-erzwingen)
- [Healthchecks](#healthchecks)
  - [Healthchecks in Dockerfiles](#healthchecks-in-dockerfiles)
- [Docker Registry](#docker-registry)
  - [Lokales registry erstellen (crt und key benötigt)](#lokales-registry-erstellen-crt-und-key-benötigt)
  - [Lokale registry Benutzen](#lokale-registry-benutzen)
  - [Registry als service](#registry-als-service)
- [Kubernetes](#kubernetes)
  - [microk8s installieren](#microk8s-installieren)
  - [Admin-PW für Weboberfläche des Clusters](#admin-pw-für-weboberfläche-des-clusters)
  - [Autorisierung prüfen / abfragen](#autorisierung-prüfen--abfragen)
  - [Dashboard](#dashboard)
    - [Security Token holen (ohne aktives RBAC)](#security-token-holen-ohne-aktives-rbac)
    - [Bearer Token holen (mit RBAC und entsprechenden Objekten)](#bearer-token-holen-mit-rbac-und-entsprechenden-objekten)
      - [Objekte anlegen, wenn nicht vorhanden](#objekte-anlegen-wenn-nicht-vorhanden)
      - [Token holen](#token-holen)
    - [Dashboard Port forwarden nach localhost](#dashboard-port-forwarden-nach-localhost)
  - [Einzelnes Pod erstellen](#einzelnes-pod-erstellen)
  - [Deployment kreieren (diese Befehl ist neu anstatt "run")](#deployment-kreieren-diese-befehl-ist-neu-anstatt-run)
  - [Befehl ausführen in einem Deployment](#befehl-ausführen-in-einem-deployment)
  - [Skalieren](#skalieren)
  - [Infos / Logs](#infos--logs)
    - [tailf-ähnliches Logging](#tailf-ähnliches-logging)
    - [Log für mehrere (max. 5) Pods ausgeben (nutzt autom. Labeling des deployments)](#log-für-mehrere-max-5-pods-ausgeben-nutzt-autom-labeling-des-deployments)
    - [Details inkl. events](#details-inkl-events)
  - [Service / Exposing](#service--exposing)
    - [Servicetypes](#servicetypes)
    - [Default expose](#default-expose)
    - [Einzelnes Pod, um im Cluster Sachen zu testen (z.B. Curl)](#einzelnes-pod-um-im-cluster-sachen-zu-testen-zb-curl)
    - [Expose NodePort service (von aussen erreichbar)](#expose-nodeport-service-von-aussen-erreichbar)
    - [Expose LoadBalancer service](#expose-loadbalancer-service)
  - [3 Deployment-Stile in Kubernetes](#3-deployment-stile-in-kubernetes)
  - [Aufbau eines YAML Files „from scratch“](#aufbau-eines-yaml-files-from-scratch)
  - [dry-run](#dry-run)
  - [Differenzen vom gewünschten (_spec_) zum aktuellen (_state_) Zustand von Kubernetes-Objekten anzeigen](#differenzen-vom-gewünschten-spec-zum-aktuellen-state-zustand-von-kubernetes-objekten-anzeigen)
  - [Labels, Annotations & Selektoren](#labels-annotations--selektoren)
    - [Labels](#labels)
    - [_nodeSelector_ nutzen](#nodeselector-nutzen)
    - [Empfohlene Labels](#empfohlene-labels)
    - [Annotations](#annotations)
  - [Interne Infos & Weiterführendes](#interne-infos--weiterführendes)
  - [Ingress / Traefik](#ingress--traefik)
  - [Security](#security)
  - [Weiterführendes](#weiterführendes)

## Docker

### Tipps

- Um _Docker Desktop_ zu verwenden, muss Hyper-V und WSL2 aktiv sein, was die gleichzeitige Nutzung von VirtualBox unmöglich macht (startet nicht oder ist unbrauchbar langsam). Um dies temporär umzustellen, ohen Features an- und auschalten zu müssen, braucht es folgende Powershell-Kommandos:

```Powershell
bcdedit /set hypervisorlaunchtype auto
```

- Immer konkrete Versionen im Dockerfile etc. verwenden! Niemals _latest_!
- Alle ENV im Dockerfile definieren. Sie können per entrypoint Skript später überschrieben werden (z.B. plattformabhängig), falls nötig
- Immer Healthchecks einbauen (zumindest in der Produktionsumgebung!)
- Entrypoint kann auch übersteuert werden: `docker run --rm -it --entrypoint /bin/bash db2`

### Podman (RHEL-Variante von Docker) Tipps

Damit die Container<>Container Kommunikation funktioniert, muss ein _Pod_ erstellt und referenziert werden. Der Pod ist dann eine Art «neuer Localhost» für alle Container, die darin laufen, damit ist das Netzwerk und die Kommunikation dort transparent.

```bash
podman pod create -n mypod -p 5520:5520 -p 8980:8980-
docker run --rm -it --privileged=true --pod mypod --name db2 db2
docker run --rm -it --mount type=bind,source=/db2/tax03i,target=/db2/tax03i --pod mypod --privileged=true --entrypoint /bin/bash db2
```

Die published ports bleiben auch beim Stop des Containers erhalten, da sie auf Pod-Ebene angesiedelt sind!

Veröffentlichte Ports anzeigen: `podman port -l` (zeigt nur etwas an, wenn mind. ein Container auf dem Pod aktiv ist)
Pods anzeigen: `podman pod -l`

### Persönliches Docker-Hub Repository

Selbstgebaute images müssen richtig getaggt werden, damit sie in's eigene Repository gepusht werden können `docker tag mynewimage ckpinguin/officialnewimage:latest`

### Docker App

_Docker-App_ ist ein (derzeit experimentelles) Feature für Docker, welches Customizations ermöglicht (weitergehend als docker-compose). Um es zu verwenden (nach [Anleitung](https://github.com/docker/app#linux-or-macos)), ab 19.03 braucht es keine Installation mehr, es muss lediglich folgender Eintrag im _~/docker/config.json_ eingetragen werden:

```json
...
    "experimental": "enabled",
    "debug": true
...
```

### Docker build & buildx (BuildKit)

`docker buildx` ist noch experimentell und muss entsprechend im _config.json_ mit _experimental_ aktiviert werden.
Es bietet dieselben Funktionen wie _build_, aber auch zusätzliche Funktionen für bspw. Multi-Plattform-Builds:

```bash
# assuming contexts node-amd64 and node-arm64 exist in "docker context ls"
docker buildx create --use --name mybuild node-amd64
mybuild
docker buildx create --append --name mybuild node-arm64
docker buildx build --platform linux/amd64,linux/arm64 .
```

### Veränderten container als image speichern (Nur für Legacy-Zeugs. Man sollte aber normalerweise bevorzugt mit Dockerfiles arbeiten)

1. Zuerst Änderungen kontrollieren:
`docker container diff CONTAINER_ID`
2. dann committen und taggen
`docker container commit CONTAINER_ID`
`docker imlge ls`
`docker image tag IMAGE_ID my_image_tag`

### Layer betrachten (Merke: Layer sind immutable)

`docker image inspect --format "{{ json .RootFS.Layers }}" IMAGE_ID`

### Befehle ausführen in laufendem Container

`docker container exec -it webserver bash`

### Cleanup

#### Alle gestoppten Container entfernen

`docker container rm $(docker container ls -aq)`

#### Alles säubern (natürlich nur auf Testmaschinen!)

_system prune_ beinhaltet _container_ & _image_

`docker container stop $(docker container ls -aq) && docker system prune -af --volumes`
 Mit Filterung
`docker container prune --filter="label!=maintainer=Chrigi"`

### Basic Security

- _seccomp_ Profile verwenden, um die Syscalls der Container einzuschränken => [Play-with-docker/security-seccomp](https://training.play-with-docker.com/security-seccomp/#clone)
- _libcap_ verwenden, um root-capabilities einzuschränken und die caps von eingemounteten Files zu entfernen => [Play-with-docker/security-capabilities](https://training.play-with-docker.com/security-capabilities/)
- Absicherung der Verbindung zum Dockerhost mit SSH anstatt TLS. Damit wird umständliches Zertifikat-Handling vermieden:
  Entweder mit separatem Kontext:
  
  ```bash
  docker context create ssh --docker "host=ssh://localhost"`
  docker -c ssh ps
  ```

  oder einfach
  
  ```bash
  docker -H ssh://localhost ps
  ```

### Network

#### Formatierung von Detailinfos aus "inspect"

`docker container inspect --format "{{.NetworkSettings.IPAddress }}" web2`

#### publish (-p LOKALER_PORT:CONTAINER_PORT) Container_port ist derjenige, der im Dockerfile  mit "EXPOSE" konfiguriert wurde

`docker run --rm -dit -p 80:3000 --name nt ckpinguin/nodetest`

#### Tipp DNS

- DNS Auflösung der Container-Namen funktioniert nur bei eigenen neu definierten Bridge-Netzwerken!
- nslookup hat häufig timeouts, ping ist besser zum prüfen der dns-abfrage

#### "--net host" (anstatt dem default "bridge") wird (offenbar) für docker-images benötigt, welche in einer VM (bei mir VirtualBox) laufen, sonst gibt's "no route to host" Fehler

`docker container run --net host -it --name ubu9 ubuntu bash`

#### Poor Man's Loadbalancer

`docker network create my_net`
Zwei oder mehr mal ausführen:
`docker container run --net my_net --net-alias search -d elasticsearch:2`

##### Testen (mehrmals probieren, ob versch. IP kommen)

`docker container run --rm centos ping search`

#### Probleme mit VirtualBox Netz

- Auf _bridge_ umstellen kann schon helfen (Virtualbox hat normale IP im lokalen Netz)
- Wenn man _NAT_ lässt, muss man in Virtualbox (Netzwerkeinstellung) das entsprechende Portforwardung aktivieren, dann sind diese Ports auf localhost verfügbar.
- Evtl. (Geschäftsnotebook) muss NACH dem Starten der Container firewalld gestoppt werden

### Volumes

Merke: Bind-Mounts sind inode-basiert: Dateien also nie mit vi(m) manipulieren, welches die Datei ersetzt. Mit code oder nano ist das kein Problem.

#### Benanntes Volume (einfach, weil es einfacher zu finden ist unter /var/lib/docker/volumes)

`docker container run -d --name mysql3 -e MYSQL_ALLOW_EMPTY_PASSWORD=True -v mysql-db:/var/lib/mysql mysql`

#### Bind-Mount Beispiel

`docker container run -d --name my-nginx -v ``pwd``/website_data:/var/lib/web mysql`

Laut Docker-Doku sollte neu der generische Befehl mit _type_ Angabe benutzt werden: `--mount type=bind,source=/db2/tax03i,target=/db2/tax03i`

## docker-compose (Mehrere Container auf einzelner Maschine)

**Wichtig:** docker-compose ist nicht für Produktion gedacht, auch wenn man nur eine einzelne Maschine hat, kann man ganz einfach `docker swarm init` machen. Hauptgrund: Swarm bietet zero-downtime resp. rolling upgrades.

### Alles ausführen, das im docker-compose.yml geschrieben ist

`docker-compose up (-d)`

### Stoppen und lokale images löschen

`docker-compose down --rmi`

### Alles löschen (Volumes und lokale images)

`docker-compose down -v --rmi local`

### Logs anschauen

Orientiert sich am _docker-compose.yml_ des Arbeitsverzeichnisses: `docker-compose logs -f`

### Templating im Dockercompose File

Damit können Redundanzen vermieden werden.
Definieren des Templates mit Referenz _my-logging_:

```yaml
x-logging:
  &my-logging
  options:
    max-size: '1m'
    max-file: '5'
```

Benutzen der Referenz:

```yaml
services:
  ghost:
    image: ghost
    logging: *my-logging
  nginx:
    image: nginx
    logging: *my-logging
```

## docker-machine

Defaultmässig wird eine Virtualbox VM erstellt

`docker-machine create vm1`

### Umgebungsvariablen übernehmen (nützt unter Windows allerdings nicht viel, wenn kein docker cmd vorhanden ist)

`eval $("C:\Users\chris\bin\docker-machine.exe" env vm1)`

Bridge statt eigenes Netz: Eine 3. NIC mit _bridge_ muss konfiguriert werden, falls die Maschinen auch im lokalen Netz sichtbar sein sollen.
=> [Artikel von dzone.com](https://dzone.com/articles/how-to-create-a-docker-machine-with-a-bridged-netw)

## Docker Swarm Management

### Token von Manager anzeigen (mit dem angezeigten Befehl können dann nodes beitreten)

`docker swarm join-token manager`

### Rollen wechseln

`docker node promote/demote node1 manager/worker`

### Overlay Netzwerk erstellen

`docker network create --driver overlay mydrupal`

### Tipp: Manager soll keine Worktasks übernehmen

`docker node update --availability drain <NODE>`

#### Constraint / placcement-pref

##### Sanfte Vorgabe

`--placement-pref 'spread=node.labels.web'`

##### Constraint / harte Vorgabe

`--constraint 'node.labels.type=web'`

## Docker service (container im Swarm)

### Service erstellen

`docker service create --name voting-app --replicas 2 --network frontend_net -p 80:80 bretfisher/examplevotingapp_vote`

#### Real-World-Beispiel mit 5 versch. Tasks (-d anfügen für async start der services)

Wirklich nur als Beispiel zu sehen, sowas geht natürlich mit _docker stack_ deklarativ viel einfacher!
`docker network create --driver overlay frontend_net`
`docker network create --driver overlay backend_net`
`docker service create --name voting-app --replicas 2 --network frontend_net -p 80:80 bretfisher/examplevotingapp_vote`
`docker service create --name redis --replicas 1 --network frontend_net redis:3.2`
`docker service create --name worker --replicas 1 --network frontend_net --network backend_net bretfisher/examplevotingapp_worker:java`
`docker service create --name db --replicas 1 --network backend_net --mount type=volume,source=db-data,target=/var/lib/postgresql/data -e POSTGRES_HOST_AUTH_METHOD=trust postgres:9.4`
`docker service create --name result-app --replicas 1 --network backend_net -p 5001:80 bretfisher/examplevotingapp_result`

## Docker stack (Services im Swarm-Cluster)

Es können dieselben docker-compose.yml Files verwendet werden mit einer zusätzlichen Option _deploy_, welches von docker-compose ignoriert wird, während _build_ wiederum von _docker stack_ ignoriert wird.
_stack deploy_ auf einem bereits deployten Stack löst einen _service update_ aus mit den entsprechenden Änderungen des YAML-Files.
`docker stack deploy -c example-voting-app-stack.yml mystack`
`docker stack ps mystack`
`docker stack services mystack` ist quasi docker service ps für alle services

### Ein docker-visualizer kann im yml eingebaut werden (nicht für Produktion!), als Übersichtstool

```yaml
visualizer:
    image: dockersamples/visualizer
    ports:
      - "8080:8080"
    stop_grace_period: 1m30s
    volumes:
      - "/var/run/docker.sock:/var/run/docker.sock"
    deploy:
      placement:
        constraints: [node.role == manager]
```

## Docker secret (Passwörter u.ä.)

Beispiel mit Passwort in einer Datei:
`docker secret create psql_user psql_user.txt`

Bessere Lösung ohne Datei:
`echo "myDBpassword" | docker secret create psql_pass -`

### Benutzen des secrets

`docker service create --name psql --secret psql_user --secret psql_pass -e POSTGRES_USER_FILE=/run/secrets/psql_user -e POSTGRES_PASSWORD_FILE=/run/secrets/psql_pass postgres`

Die Secrets sind dann unter _/run/secrets_ ersichtlich (nur im container des entsprechenden Tasks!)

### Entfernen von secrets (löst aber redeploy aus)

`docker service update --secret-rm`

## Docker Swarm Lifecycle Beispiel

### Secrets mit lokalem docker compose benutzen

`docker node ls`
`docker-compose up -d`
`docker-compose exec psql cat /run/secrets/psql_user`
`docker-compose 11`
`pcat docker-compose.yml`

### Full App Lifecycle: Dev, Build and Deploy With a Single Compose Design

`docker-compose up -d`
`docker inspect TAB COMPLETION`
`docker-compose down`
`docker-compose -f docker-compose.yml -f docker-compose.test.yml up -d`
`docker inspect TAB COMPLETION`
`docker-compose -f docker-compose.yml -f docker-compose.prod.yml config --help`
`docker-compose -f docker-compose.yml -f docker-compose.prod.yml config`
`docker-compose -f docker-compose.yml -f docker-compose.prod.yml config > output.yml`

### Service Updates: Changing Things In Flight

`docker service create -p 8088:80 --name web nginx:1.13.7`
`docker service ls`
`docker service scale web=5`
`docker service update --image nginx:1.13.6 web`
`docker service update --publish-rm 8088 --publish-add 9090:80`

### Tipp: Rebalancing über Nodes erzwingen

`docker service update --force web`

## Healthchecks

### Healthchecks in Dockerfiles

`docker container run --name p1 -d postgres`
`docker container ls`
`docker container run --name p2 -d --health-cmd="pg_isready -U postgres || exit 1" postgres`
`docker container ls`
`docker container inspect p2`
`docker service create --name p1 postgres`

Wird ein service mit healthcheck gestartet, so dauert der Start 30s länger, bis der service als _running_ deklariert wird (30s ist default für den ersten Healthchecks)
`docker service create --name p2 --health-cmd="pg_isready -U postgres || exit 1" postgres`

## Docker Registry

Im YAML file für einen Container das eigene Registry angeben:

```yaml
storage:
  filesystem:
    rootdirectory: /var/lib/Registry
```

### Lokales registry erstellen (crt und key benötigt)

`openssl req -newkey rsa:4096 -nodes -sha256 -keyout certs/domain.key -x509 -days 365 -out certs/domain.crt`
`mkdir registry-data`

```bash
docker run -d -p 5000:5000 --name registry \
  --restart unless-stopped \
  -v $(pwd)/registry-data:/var/lib/registry -v $(pwd)/certs:/certs \
  -e REGISTRY_HTTP_TLS_CERTIFICATE=/certs/domain.crt \
  -e REGISTRY_HTTP_TLS_KEY=/certs/domain.key \
  registry
```
  
Dasselbe mit Authentifizierung (mit htpasswd File)

```bash
docker run -d -p 5000:5000 --name registry \
  --restart unless-stopped \
  -v $(pwd)/registry-data:/var/lib/registry \
  -v $(pwd)/certs:/certs \
  -v $(pwd)/auth:/auth \
  -e REGISTRY_HTTP_TLS_CERTIFICATE=/certs/domain.crt \
  -e REGISTRY_HTTP_TLS_KEY=/certs/domain.key \
  -e REGISTRY_AUTH=htpasswd \
  -e "REGISTRY_AUTH_HTPASSWD_REALM=Registry Realm" \
  -e "REGISTRY_AUTH_HTPASSWD_PATH=/auth/htpasswd" \
  registry
```

### Lokale registry Benutzen

`docker login 127.0.0.1:5000`
`docker pull 127.0.0.1:5000/hello-world`

### Registry als service

`docker service create --name registry --publish 5000:5000 registry`

## Kubernetes

Merke: Kubernetes ist ein System resp. Standardvorgaben dafür, aber kein eigentliches Softwareprodukt. Es gibt daher ganz verschiedene Implementierungen von div. Anbietern: microk8s, minikube, Openshift und natürlich div. Cloudanbieter.

### microk8s installieren

`sudo snap install microk8s --classic`
Alles aktivieren, was wir brauchen:
`microk8s enable dashboard dns registry rbac`
**Achtung**: Wenn _traefik_ (siehe weiter unten) als Ingress-Controller benutzt wird, darf hier das addon `ingress` _nicht_ aktiviert werden!

Falls alle Stricke reissen, kann es einfach deinstalliert und wieder installiert werden. Dabei gehen alle Objekte verloren! Deshalb ist es wichtig, mit deklarativen YML Files zu arbeiten, um die Objekte wieder herstellen zu können.
`sudo snap remove microk8s`

### Admin-PW für Weboberfläche des Clusters

`kubectl config view` oder `microk8s.config` (gilt natürlich nur für die microk8s Implementation)

### Autorisierung prüfen / abfragen

`kubectl auth can-i create deployments --namespace dev`

### Dashboard

#### Security Token holen (ohne aktives RBAC)

`kubectl -n kube-system describe secret $(microk8s kubectl -n kube-system get secret | grep default-token | cut -d " " -f1)`

#### Bearer Token holen (mit RBAC und entsprechenden Objekten)

##### Objekte anlegen, wenn nicht vorhanden

`kubeclt apply -f kubernetes-dashboard-namespace.yml`
`kubectl apply -f admin-user-service-account.yml`
`kubectl apply -f admin-user-clusterrole-binding.yml`

##### Token holen

`kubectl -n kubernetes-dashboard describe secret $(kubectl -n kubernetes-dashboard get secret | grep admin-user | awk '{print $1}')`

#### Dashboard Port forwarden nach localhost

Geht aber auch ohne, man kan die Cluster-IP verwenden, welche unter `kubectl get services -n kube-system` angezeigt wird.
`microk8s kubectl port-forward -n kube-system service/kubernetes-dashboard 10443:443`

**Achtung** Die Webseite [https://localhost:10443](https://localhost:10443) funktioniert dann nur mit Firefox (Chrome lässt keine Zertifakatsausnahmen mehr zu)!

### Einzelnes Pod erstellen

Dies hat in alten Versionen ein ganzes Deployment kreiert (neu nur noch ein Pod), siehe nächsten Befehl. Für Produktion nicht empfohlen, denn reine Pods werden bei einem Node-Ausfall nicht neu gestartet!
`kubectl run my-nginx --image nginx`

### Deployment kreieren (diese Befehl ist neu anstatt "run")

`kubectl create deployment my-apache --image httpd`

### Befehl ausführen in einem Deployment

Funktioniert natürlich nur, wenn der Container eine Shell hat.
`kubectl exec --stdin --tty my-test -- /bin/bash`

### Skalieren

`kubectl scale deploy/my-apache --replicas 2` oder: `kubectl scale deployment my-apache --replicas 2`

### Infos / Logs

Nur Pods: `kubectl get pods -o wide`

Oder alle Objekte (ist nützlicher): `kubectl get all -o wide`

Laufende Ausgabe, was sich ändert: `kubectl get pods -o wide -w`

#### tailf-ähnliches Logging

`kubectl logs deployment/my-apache --follow --tail 1`

#### Log für mehrere (max. 5) Pods ausgeben (nutzt autom. Labeling des deployments)

`kubectl logs -l app=my-apache`

**ACHTUNG**: Die Logabfrage braucht einen funktionierenden DNS Server, der muss evtl. erst aktiviert werden mit `microk8s.enable dns`.
Zudem benötigt man einen Eintrag im /etc/hosts für den lokalen Hostnamen, wo der Kube-Cluster läuft, v.a. wenn er in Virtualbox mit Bridge-Network läuft (denn dann wird der DNS vom Internet-Provider verwendet, was nutzlos ist)

#### Details inkl. events

`kubectl describe deployment.app/my-apache`
`kubectl describe pod my-apache-xyz`

### Service / Exposing

#### Servicetypes

1. ClusterIP (default): für Pod<=>Pod Kommunikation, einzelne interne VIP, nur im Cluster erreichbar
2. NodePort: ähnlich wie ClusterIP, aber inter-Node offen. Jeder Node erhält einen hohen Port für einen Service
3. LoadBalancer: Externen Loadbalancer (z.B. AWS-LB) wird verwendet. NodePort+ClusterIP services werden erstellt. Der LB sendet an NodePort
4. ExternalName: Selten verwendet, wenn Kube Services mit Systemen „draussen“ reden müssen. Es wird ein CNAME DNS Eintrag im CoreDNS-System dafür erstellt, damit die externen Adressen aufgelöst werden können

#### Default expose

`kubectl expose deployment/my-nginx --port 8888`

Dies generiert einen _service_, der zu sehen ist mit `kubectl get services`

Die ClusterIP ist die VIP, die man lokal verwenden kann. Es können natürlich auch die IP-Adressen der einzelnen Pods genommen werden, die man so herausfindet: `kubectl describe pod my-nginx-abc414`

#### Einzelnes Pod, um im Cluster Sachen zu testen (z.B. Curl)

`kubectl run  tmp-shell --rm -it --image bretfisher/netshoot -- bash`

#### Expose NodePort service (von aussen erreichbar)

_NodePort_ ist eine Erweiterung von _ClusterIP_ insofern also lokal genau gleich erreichbar.
`kubectl expose deployment/httpenv --port 8888 --name httpenv-np --type NodePort`

Dies generiert einen Service mit hohem lokal-Port:

> service/httpenv-np   NodePort    10.152.183.4     \<none>        8888:30367/TCP   29s

Man kann hier nun den Service bequem erreichen bspw. mit `curl localhost:30367`

Dies hängt aber von der verwendeten Kubernetes-Implementation ab. Zudem scheint der Service von „ganz aussen“ (also bei mir; dem Windows Host, wo Virtualbox läuft) mit hohen Ports nicht zu funktionieren (während das mit Docker publish wunderbar klappt).

Und im den coreDNS Dienst auch nutzen zu können, muss auf dem Kube-Host das Forwarding erlaubt sein! `sudo iptables -P FORWARD ACCEPT`

#### Expose LoadBalancer service

`kubectl expose deployment/httpenv --port 8888 --name httpenv-lb --type LoadBalancer`

Die neue IP ist zwar ansprechbar, aber ohne externen Loadbalancer findet kein Loadbalancing statt.

### 3 Deployment-Stile in Kubernetes

Generell: Um Die aktuelle (YAML) Konfiguration einzusehen, nutzt man prinzipiell `kubectl get [object] -o yaml` resp. `kubectl get -f [file|url] -o yaml`
Kubernetes wandelt alle YAML Files intern in JSON um, daher kann man bei YAML bleiben (was einfacher zu lesen/schreiben ist).

1. **Imperativ**: kubectl create etc.
Ist gut zum Kennenlernen und die Abläufe zu verstehen
2. **Imperativ** mit Konfigurationsfiles: kubectl create/replace/delete etc. -f [filename|url]
Erster Schritt zur Automatisierung. Man muss den Status der Objekte kennen. Es kann zu update-Konflikten kommen, wenn mehrere Leute daran arbeiten
3. **Deklarativ**: kubectl apply -f [file|directory|url]
=> dies ist unser DevOps-Ziel!
Es wird nur der gewünschte Zustand angegeben in Konfigfiles (meist YAML). Wenn man dies sauber mit git umsetzt, gibt es keine Konflikte.

### Aufbau eines YAML Files „from scratch“

1. Als erstes die für das Feld _apiVersion_ verfügberen API-Versionen anzeigen mit `kubectl api-versions`
2. Das Feld _kind_ ist zentral. Man kann alle verfügbaren Arten von Ressourcen anzeigen mit `kubectl api-resources`.
3. Daraus kann man schon lernen, dass bspw. _Deployment_ im _app/v1_ API liegt, während ein _Pod_ in keinem spezifischen unter-API angesiedelt ist. Deshalb hat ein _Pod_ nur `apiVersion: v1` im YAML, während ein _Deployment_ `apiVersion: apps/v1` hat.
4. Um alle möglichen Felder für _spec_ anzuzeigen, nutzt man `kubectl explain [Objekttyp] --recursive`
5. Um dann eine genauere Beschreibung zu erhalten: `kubectl explain [Objekttyp].spec`
6. Drilldown eines spezifischen Schlüssels (Beispiel für Service): `kubectl explain services.spec.type`
7. Dieser Drilldown kann beliebig tief gehen: `kubectl explain deployment.spec.template.spec.volumes.nfs.server`
8. Beispiel-YAML von der [offiziellen Dokumentation](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.19/#deployment-v1-apps) sind hilfreich

### dry-run

YAML (deklarativ) anzeigen für einen best. Befehl (imperativ), ohne diesen auszuführen:
`kubectl run my-nginx --image nginx --dry-run=client -o yaml`
Mit _dry-run=server_ erhält man die Serversicht zurück, diese ist natürlich komplexer: `kubectl run my-nginx --image nginx --dry-run=server -o yaml`

So kann man auch wunderbar den Unterschied zwischen _run_ und _create deployment_ erkennen, den es seit der 19er Version von Kubernetes gibt (run erstellt heute nur noch einen Pod, kein Deployment):
`kubectl create deployment my-nginx --image nginx --dry-run=client -o yaml`

Will man dasselbe für den "expose" Befehl machen, braucht es zuvor ein "echtes" Deployment
`kubectl create deployment test --image nginx`
`kubectl expose deployment test --port 80 --dry-run=client -o yaml`

### Differenzen vom gewünschten (_spec_) zum aktuellen (_state_) Zustand von Kubernetes-Objekten anzeigen

`kubectl diff -f aktualisiertes.yml`

### Labels, Annotations & Selektoren

#### Labels

Ein Label wird auf _metadata_ Ebene gesetzt:

```yaml
apiVersion: v1
kind: Pod
metadata:
    name: my-test # der Podname
    labels:
        tier: frontend
...
```

Das Label nutzen bspw. mit ```kubectl get pods -l tier=frontend```

#### _nodeSelector_ nutzen

Beispiel, wo nur Nodes mit SSD Disks benutzt werden sollen:

```yaml
...
  nodeSelector:
    disktype: ssd
```

#### Empfohlene Labels

Laut [Kubernetes-Dokumentation](https://kubernetes.io/docs/concepts/overview/working-with-objects/common-labels/), Beispiel:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app.kubernetes.io/name: wordpress
    app.kubernetes.io/instance: wordpress-abcxzy
    app.kubernetes.io/version: "4.9.4"
    app.kubernetes.io/managed-by: helm
    app.kubernetes.io/component: server
    app.kubernetes.io/part-of: wordpress
...
```

#### Annotations

_Annotations_ werden nicht zur Indentifizierung sondern zur Konfiguration benutzt.
Beispiel:

```json
metadata: {}
  "annotations": {
    "key1" : value1
    "key2" : value2
  }
}
```

### Interne Infos & Weiterführendes

- Erweiterte Infos auch über interne Pods (z.B. coreDNS) mit `kubectl get all --all-namespaces`
- Cluster-Kontext anzeigen mit `kubectl config get-contexts`
- Cluster-Konfig anzeigen mit `kubectl config view`
- Konfiguration anpassen mit `kubectl config set*`

### Ingress / Traefik

Ein gutes Tutorial für das eingebaute Ingress (als Beispiel) und weiterführend mit traefik ist auf [Medium](https://medium.com/kubernetes-tutorials/deploying-traefik-as-ingress-controller-for-your-kubernetes-cluster-b03a0672ae0c) verfügbar.

Und für die traefik Version >2 [hier](https://medium.com/dev-genius/quickstart-with-traefik-v2-on-kubernetes-e6dff0d65216)

Aber vielleicht einfach auch mal die offizielle [Doku](https://docs.traefik.io/user-guides/crd-acme/) durcharbeiten? ;-)

Kontrollieren, ob das traefik Pod richtig deployt:
`kubectl get events  --all-namespaces --watch`

`kubectl apply -f traefik_rbac_clusterrole_and_binding.yml`
`kubectl apply -f traefik_serviceaccount_daemonset_and_service.yml`
`kubectl apply -f traefik_web_ui_service_and_ingress.yml`

`kubectl port-forward --address 0.0.0.0 service/traefik 8000:8000 8080:8080 443:4443 -n default`

Das Traefik-UI ist dann verfügbar auf [http://localhost:8080/dashboard/](http://localhost:8080/dashboard/)

### Security

Nach [Bret Fisher's Liste](https://github.com/BretFisher/ama/issues/17):

1. Nur Docker benutzen, hilft schon sehr viel, um Prozesse einzusperren
2. Jeder Server sollte das [Docker Bench Security](https://github.com/docker/docker-bench-security) durchlaufen
3. Docker TCP Port nicht freigeben nach aussen. Besser `DOCKER_HOST=ssh://user@host` verwenden
4. Applikationen im Container nicht als root laufen lassen. Besser _USER_ im Dockerfile verwenden. Ggf. vorher den User/Gruppe erstellen
5. Images auf mögliche [CVE's](https://cve.mitre.org) scannen. Vulnerability Scans durchführen, bspw. mit _Trivy_, _Snyk_, _Microscanner_ etc. Scanning sollte möglichst früh stattfinden (bspw. Microscanner kann im Dockerfile verwendet werden, Trivy nur auf dem Image)
6. Möglichst abgespeckte Images verwenden (z.B. _Alpine Linux_ statt Ubuntu oder CentOS). Noch besser wäre natürlich _scratch_ oder _busybox_
7. [_Multistage-Builds_](https://docs.docker.com/develop/develop-images/multistage-build/) verwenden, um bspw. Entwicklung und Produktion zu trennen
8. _User Namespaces_ aktivieren und nutzen. Muss getestet werden, weil nicht alle Applikationen dies unterstützen. Auf dem Hostsystem müssen dazu _/etc/subuid_ und _/etc/subgid_ vorhanden sein (wird in neueren RHEL/CentOS automatisch erstellt). Auf Docker-Seite sollte man das File _/etc/docker/daemon.json_ entsprechend ergänzen. Siehe [Anleitung](https://docs.docker.com/engine/security/userns-remap)
9. Runtime Bad Behaviour Monitoring mit _Falco_
10. Content Trust: Signieren etc. mit `docker trust`, siehe die [Dokumentation](https://docs.docker.com/engine/security/trust/content_trust). Client-seitig muss die Variable `DOCKER_CONTENT_TRUST=1` gesetzt sein.
11. Selinux, Apparmor, Seccomp Profile erweitern
12. Docker Rootless: Prinzipiell nur möglich, wenn kein Bridge-Netzwerk aufgebaut werden muss (Linux braucht root für Netzwerk-Änderungen). Deshalb Kaum für Produktion geeignet. Man kann Docker's [Skript](https://get.docker.com/rootless) zur Installation nutzen.

Linux _seccomp_ nutzen: `docker run --rm -it --security-opt seccomp=/path/to/seccomp/profile.json hello-world`.

### Weiterführendes

`kubectl kustomize` lässt wie bei Docker Compose Overrides von Konfigurationen zu.

_Helm_ ist ein Package-Manager für Docker & Kubernetes.
