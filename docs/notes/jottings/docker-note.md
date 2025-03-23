# Docker 使用教程

资料：

- [Docker使用](https://www.runoob.com/docker/docker-container-usage.html)
- [写给前端的Docker实战教程](https://juejin.cn/post/6844903946234904583#heading-0)
- [Docker 教程-菜鸟教程](https://www.runoob.com/docker/docker-dockerfile.html)
- [Docker](http://c.biancheng.net/view/3162.html)

## 脑图导读

思维导图：

## Docker 安装

- windows 安装

## Docker 的使用

- 新建文件夹 `hello-docker`，新建 文件 `index.html`，如：

```html
<h1>Hello docker</h1>
```

- 新建 `Dockerfile` 文件

```dockerfile
FROM nginx

COPY ./index.html /usr/share/nginx/html/index.html

EXPOSE 80
```

- 打包镜像

```bash
cd hello-docker/ # 进入刚刚的目录
docker image build ./ -t hello-docker:1.0.0 # 打包镜像
```

`docker image build ./ -t hello-docker:1.0.0`的意思是：基于路径`./`（当前路径）打包一个镜像，镜像的名字是`hello-docker`，版本号是`1.0.0`。该命令会自动寻找`Dockerfile`来打包出一个镜像

- 运行容器

```bash
docker container create -p 2333:80 hello-docker:1.0.0
docker container start xxx # xxx 为上一条命令运行得到的结果
```

在上边第一个命令中，我们使用`docker container create`来创建基于`hello-docker:1.0.0`镜像的一个容器，使用`-p`来指定端口绑定——将容器中的`80`端口绑定在宿主机的`2333`端口。执行完该命令，会返回一个容器ID

- 当容器运行后，可以通过如下命令进入容器内部：

```bash
docker container exec -it xxx /bin/bash # xxx 为容器ID
```

原理实际上是启动了容器内的`/bin/bash`，此时你就可以通过`bash shell`与容器内交互了。就像远程连接了SSH一样



## 使用免费的 Travis CI

- 准备：

在 github 上，先新建/已有仓库，在 Travis 配置面板授权添加。

- 创建 配置文件 `.travis.yml`

在项目中根目录中添加`.travis.yml`文件，内容如下：

```yml
language: node_js
node_js:
  - "12"
services:
  - docker

before_install:
  - npm install

script:
  - npm run build
  - echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
  - docker build -t username/image-name:latest .
  - docker push username/image-name:latest
```

文件内容非常简单，就是使用`npm run build`编译静态产出后，打包一个镜像并且 push 到远程。有几点需要详细说一下：

1. 为了能够让镜像上传到服务器，你需要在`hub.docker.com`中注册一个账号，然后替换代码中的`pea3nut/pea3nut-info:latest`为`用户名/包名:latest`即可

2. 使用 Github 登录 Travis CI 后，在左边点击+加号添加自己的 Github 仓库后，需要移步到 Setting 为项目添加`DOCKER_USERNAME`和`DOCKER_PASSWORD`环境变量。这样保证我们可以秘密的登录 Docker Hub 而不被其他人看到自己的密码。

- 添加 `Dockerfile` 文件到项目根目录 

```dockerfile
FROM nginx

COPY ./dist/ /usr/share/nginx/html/

EXPOSE 80
```

- 可能需要额外增加新的 Nginx 配置

```
events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;

    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '

    sendfile        on;

    keepalive_timeout  65;

    server {
        listen       80;
        server_name  jsmond.com;

        location / {
            proxy_pass http://localhost:9090;
        }

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }

    server {
        listen       80;
        server_name  dev.jsmond.com;

        location / {
            proxy_pass http://localhost:3000;
        }

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }

}
```

- 修改 Dockerfile 文件

```dockerfile
  FROM nginx

  COPY ./dist/ /usr/share/nginx/html/
+ COPY ./my.nginx.conf /etc/nginx/conf.d/my.conf

  EXPOSE 80
```

- 配置完成后，本地推代码到 github 验证是否触发 travis 钩子 进入自动化构建。
- 本地可以试试看该镜像工作是否正常：

```bash
docker image pull username/image-name:latest
docker container create -p 8082:80 username/image-name:latest
docker container start xxx # xxx 为上一条命令执行的返回值
```

## Docker Image 的相关命令

- `docker image pull`是下载镜像的命令。镜像从远程镜像仓库服务的仓库中下载。
- `docker image pull alpine:latest`命令会从 Docker Hub 的 alpine 仓库中拉取标签为 latest 的镜像。
- `docker image push` 命令，会尝试将镜像推送到 docker.io/xxx:latest 中
- `docker image ls`列出了本地 Docker 主机上存储的镜像。可以通过 --digests 参数来查看镜像的 SHA256 签名。
- `docker image inspect`命令非常有用！该命令完美展示了镜像的细节，包括镜像层数据和元数据。
- `docker image rm`用于删除镜像。
- `docker image rm alpine:latest`命令的含义是删除 alpine:latest 镜像。当镜像存在关联的容器，并且容器处于运行（Up）或者停止（Exited）状态时，不允许删除该镜像。
- `docker image history` 来查看在构建镜像的过程中都执行了哪些指令。



**好处是每次构建不用加很多参数，不足是这个镜像太大，每次构建时间会很久。**

## Docker Container 相关的命令

- `docker container run <image> <app>`中，指定了启动所需的镜像以及要运行的应用。
  - 例如：docker container run -it ubuntu /bin/bash
  - 例如：如果想启动 PowerShell 并运行一个应用，则可以使用命令`docker container run -it microsoft- /powershell:nanoserver pwsh.exe`。
  - 例如：`docker container run -d --name c1 -p 80:8080 web:latest`
    - `-d` 参数的作用是让应用程序以守护线程的方式在后台运行。
    - `-p 80:8080` 参数的作用是将主机的80端口与容器内的8080端口进行映射。
- `docker container stop` 命令手动停止容器运行
- `docker container start` 启动容器
- `docker container rm [-f]`  删除容器
- `docker container ls` 查看 当前系统正在运行的容器列表
- `docker container inspect` 显示容器的配置细节和运行时信息。该命令接收容器名称和容器 ID 作为主要参数。
- `docker exec -it image-id /bin/bash` 当容器运行后，可以通过此命令进入容器内部
- `ps -elf` 查看容器内正在运行的进程
- `exit` 退出容器
- 按下 Ctrl-PQ 组合键则会退出容器但并不终止容器运行。这样做会切回到 Docker 主机的 Shell，并保持容器在后台运行。
- `docker logs [OPTIONS] CONTAINER-ID` 获取容器的日志
  - 一些参数的使用：例子：`docker logs --since="2016-07-01" --tail=10 mynginx` 查看容器mynginx从2016年7月1日后的最新10条日志
- `docker create ` 创建容器，但是不启动
- `docker search` 从Docker Hub查找镜像
  - `docker search -f stars=10 java` 查找所有镜像名包含 java，并且收藏数大于 10 的镜像
- `docker pause/unpause CONTAINER-ID` 暂停/恢复 容器中所有的进程。



## Dockerfile 基本语法

例子：

```dockerfile
# Test web-app to use with Pluralsight courses and Docker Deep Dive book
# Linux x64
FROM alpine

LABEL maintainer="nigelpoulton@hotmail.com"

# Install Node and NPM
RUN apk add --update nodejs nodejs-npm

# Copy app to /src
COPY . /src

WORKDIR /src

# Install dependencies
RUN  npm install

EXPOSE 8080

ENTRYPOINT ["node", "./app.js"]
```

使用 -t 参数为镜像打标签，使用 -f 参数指定 Dockerfile 的路径和名称，使用 -f 参数可以指定位于任意路径下的任意名称的 Dockerfile。

构建上下文是指应用文件存放的位置，可能是本地 Docker 主机上的一个目录或一个远程的 Git 库。

Dockerfile 中的 FROM 指令用于指定要构建的镜像的基础镜像。它通常是 Dockerfile 中的第一条指令。

Dockerfile 中的 RUN 指令用于在镜像中执行命令，这会创建新的镜像层。每个 RUN 指令创建一个新的镜像层。

Dockerfile 中的 COPY 指令用于将文件作为一个新的层添加到镜像中。通常使用 COPY 指令将应用代码赋值到镜像中。

Dockerfile 中的 EXPOSE 指令用于记录应用所使用的网络端口。

Dockerfile 中的 ENTRYPOINT 指令用于指定镜像以容器方式启动后默认运行的程序。

其他的 Dockerfile 指令还有 LABEL、ENV、ONBUILD、HEALTHCHECK、CMD 等。

**其他指令：**

- `FROM`：定制的镜像都是基于 FROM 的镜像
- `RUN`：用于执行后面跟着的命令行命令。有以下俩种格式：
  - shell 格式：`RUN <命令行命令>`， 如 `RUN yarn build`
  - exec 格式：`RUN ["可执行文件", "参数1", "参数2"]`，如 `RUN ["./test.php", "dev", "offline"] 等价于 RUN ./test.php dev offline`

- `COPY` 复制指令，从上下文目录中复制文件或者目录到容器里指定路径。
- `ADD`  ADD 指令和 COPY 的使用格类似（同样需求下，官方推荐使用 COPY）。
- `CMD` 类似于 RUN 指令，用于运行程序，但二者运行的时间点不同:
  - **CMD 在docker run 时运行，RUN 是在 docker build 时运行**。
  - 如果 Dockerfile 中如果存在多个 CMD 指令，仅最后一个生效。
- `ENTRYPOINT` 类似于 CMD 指令，但其**不会被 docker run 的命令行参数指定的指令所覆盖**（定参），而且这些命令行参数会被当作参数送给 ENTRYPOINT 指令指定的程序。
  - 但是, 如果运行 docker run 时使用了 --entrypoint 选项，将覆盖 CMD 指令指定的程序。
  - 如果 Dockerfile 中如果存在多个 ENTRYPOINT 指令，仅最后一个生效。
  - 可以搭配 CMD 命令使用：一般是**变参才会使用 CMD**
- `ENV` 设置环境变量，定义了环境变量，那么在后续的指令中，就可以使用这个环境变量。
- `ARG` 构建参数，与 ENV 作用一致。不过**作用域不一样**。ARG 设置的环境变量仅对 Dockerfile 内有效，也就是说只有 docker build 的过程中有效，构建好的镜像内不存在此环境变量
- `VOLUME` 定义匿名数据卷。在启动容器时忘记挂载数据卷，会自动挂载到匿名卷。
  - 避免重要的数据，因容器重启而丢失，这是非常致命的。
  - 避免容器不断变大。
- `EXPOSE` 仅仅只是声明端口。
- `WORKDIR`
- USER
- HEALTHCHECK
- ONBUILD
- `LABEL`



可以看看 [多段构建](http://c.biancheng.net/view/3159.html) 的 Dockerfile 内容：

> 多阶段构建是随 Docker 17.05 版本新增的一个特性，用于构建精简的生产环境镜像。

```dockerfile
FROM node:latest AS storefront
WORKDIR /usr/src/atsea/app/react-app
COPY react-app .
RUN npm install
RUN npm run build

FROM maven:latest AS appserver
WORKDIR /usr/src/atsea
COPY pom.xml .
RUN mvn -B -f pom.xml -s /usr/share/maven/ref/settings-docker.xml dependency
\:resolve
COPY . .
RUN mvn -B -s /usr/share/maven/ref/settings-docker.xml package -DskipTests

FROM java:8-jdk-alpine AS production
RUN adduser -Dh /home/gordon gordon
WORKDIR /static
COPY --from=storefront /usr/src/atsea/app/react-app/build/ .
WORKDIR /app
COPY --from=appserver /usr/src/atsea/target/AtSea-0.0.1-SNAPSHOT.jar .
ENTRYPOINT ["java", "-jar", "/app/AtSea-0.0.1-SNAPSHOT.jar"]
CMD ["--spring.profiles.active=postgres"]
```

首先注意到，Dockerfile 中有 3 个 FROM 指令。每一个 FROM 指令构成一个单独的构建阶段。

各个阶段在内部从 0 开始编号。不过，示例中针对每个阶段都定义了便于理解的名字。

- 阶段 0 叫作 storefront。
- 阶段 1 叫作 appserver。
- 阶段 2 叫作 production。

storefront 阶段拉取了大小超过 600MB 的 node:latest 镜像，然后设置了工作目录，复制一些应用代码进去，然后使用 2 个 RUN 指令来执行 npm 操作。

这会生成 3 个镜像层并显著增加镜像大小。指令执行结束后会得到一个**比原镜像大得多的镜像**，其中包含许多构建工具和少量应用程序代码。

appserver 阶段拉取了大小超过 700MB 的 maven:latest 镜像。然后通过 2 个 COPY 指令和 2 个 RUN 指令**生成了 4 个镜像层**。

## Docker-compose 的使用

**配置文件：**如下是一个简单的 Compose 文件的示例，它定义了一个包含两个服务（web-fe 和 redis）的小型 Flask 应用。

```yaml
version: "3.5"
services:
    web-fe:
        build: .
        command: python app.py
        ports:
        - target: 5000
        published: 5000
        networks:
        - counter-net
        volumes:
        - type: volume
        source: counter-vol
        target: /code
    redis:
        image: "redis:alpine"
        networks:
        counter-net:
        
networks:
counter-net:
volumes:
counter-vol:
```

**yml** 配置文件：

- context：上下文路径。
- dockerfile：指定构建镜像的 Dockerfile 文件名。
- args：添加构建参数，这是只能在构建过程中访问的环境变量。
- labels：设置构建镜像的标签。
- target：多层构建，可以指定构建哪一层。



基本指令：

- `docker-compose --version`
- `docker-compose up [name]` 构建和运行应用 /name
- `docker-compose up -d` 如果你想在后台执行该服务可以加上 **-d** 参数
- `docker-compose stop` 停止 Compose 应用相关的所有容器，但不会删除它们。
- ` docker-compose restart` 重启已停止的 Compose 应用。
- ` docker-compose rm` 用于删除已停止的 Compose 应用。它会删除容器和网络，**但是不会删除卷和镜像**。
- `docker-compose ps` 用于列出 Compose 应用中的各个容器。
- `docker-compose down` **停止并删除**运行中的 Compose 应用。它会删除容器和网络，**但是不会删除卷和镜像**。










