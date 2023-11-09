# Java Coding Challenge
# BACK-END
## Stack required:
- Java 17
- Springboot
- MySql

## Setup environment
- **Install MySql**
```sh
docker run --name mysql-local -p 6603:3306 -e MYSQL_ROOT_PASSWORD=admin -d mysql
```
- **Running application**
```sh
mvn clean install
mvn spring-boot:run
```
Sau khi run project sẽ tạo bảng, insert thêm 3 record vào table roles 
```sh
INSERT INTO roles(name) VALUES('ROLE_USER');
INSERT INTO roles(name) VALUES('ROLE_MODERATOR');
INSERT INTO roles(name) VALUES('ROLE_ADMIN');
```


## API CURL
#### Authentication & Authorization
- #### Sign up 
```sh
curl --location 'http://localhost:8080/api/v1/auth/signup' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "user2",
    "email": "user2@gmail.com",
    "phone": "",
    "role": [
        "USER"
    ],
    "password": "admin"
}'
```
Example response
```sh
 {
    "message": "User registered successfully!!!!",
    "data": {
        "id": 12,
        "username": "test1",
        "email": "test1@gmail.com",
        "status": 1,
        "phone": "",
        "roles": [
            {
                "id": 1,
                "name": "ROLE_USER"
            }
        ]
    },
    "status": null,
    "rowCount": 1,
    "errorCode": null
}
```

- #### Sign in
```sh
curl --location 'http://localhost:8080/api/v1/auth/signin' \
--header 'Content-Type: application/json' \
--data '{
    "username": "user1",
    "password": "admin"
}'
```
 Example response
```sh
{
    "message": "Login successfully!!!",
    "data": {
        "token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MSIsImlhdCI6MTY5OTQ5OTkzNywiZXhwIjoxNjk5NTg2MzM3fQ.wYB5hVla2_Afo3qSG83f3gxmggJQT0-TgBs_d7awY5w",
        "type": "Bearer",
        "id": 12,
        "username": "test1",
        "email": "test1@gmail.com",
        "roles": [
            "ROLE_USER"
        ]
    },
    "status": null,
    "rowCount": 0,
    "errorCode": null
}
```
- #### Query job-runs elasticsearch by condition
```sh
curl --location 'http://localhost:8080/job/es/query' \
--header 'Content-Type: application/json' \
--data '{
    "id": "13",
    "runId": "rlbz50cl2ilp381x",
    "tableName": "person",
    "status": "pending",
    "businessDate": "2023-10-11",
    "limit": 15,
    "offset": 0
}'
```
Example response
```sh
{
    "message": "Successfully!!!",
    "data": [
        {
            "id": "13",
            "indexDate": 1696962061346,
            "runId": "rlbz50cl2ilp381x",
            "tableName": "person",
            "status": "pending",
            "businessDate": "2023-10-11",
            "startTime": "2023-10-11T00:00:00",
            "endTime": "2023-10-11T00:00:01",
            "rowCount": 100,
            "expectedRowCount": 100
        }
    ],
    "code": "SUCCESS",
    "total": 2
}
```
- #### Get user bu id
```sh
curl --location 'http://localhost:8080/api/v1/user/6' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTY5OTQzNDI1NSwiZXhwIjoxNjk5NTIwNjU1fQ.MUMAuAETce9X9TWuTo7tVNVODqBoWnzDkRGxVYZ3kIo'
```
Example response
```sh
{
    "message": "Successfully!!!",
    "data": {
        "id": 12,
        "username": "test1",
        "email": "test1@gmail.com",
        "status": 1,
        "phone": "",
        "roles": [
            {
                "id": 1,
                "name": "ROLE_USER"
            }
        ]
    },
    "status": null,
    "rowCount": 1,
    "errorCode": null
}
```
- #### Get list user by id list
```sh
curl --location 'http://localhost:8080/api/v1/user/list' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTY5OTQzNDI1NSwiZXhwIjoxNjk5NTIwNjU1fQ.MUMAuAETce9X9TWuTo7tVNVODqBoWnzDkRGxVYZ3kIo' \
--header 'Content-Type: application/json' \
--data '{
    "ids": [
        11,
        12
    ]
}'
```
Example response
```sh
{
    "message": "Successfully!!!",
    "data": [
        {
            "id": 11,
            "username": "hehe1",
            "email": "hehe@gmail.com",
            "status": 1,
            "phone": "84867709055",
            "roles": [
                {
                    "id": 1,
                    "name": "ROLE_USER"
                }
            ]
        },
        {
            "id": 12,
            "username": "test1",
            "email": "test1@gmail.com",
            "status": 1,
            "phone": "",
            "roles": [
                {
                    "id": 1,
                    "name": "ROLE_USER"
                }
            ]
        }
    ],
    "status": null,
    "rowCount": 2,
    "errorCode": null
}
```
- #### Update user
```sh
curl --location 'http://localhost:8080/api/v1/user/update' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTY5OTUwMDEwNSwiZXhwIjoxNjk5NTg2NTA1fQ.X6mVsEMOoDVlDdBSHoL9xKk6u7rCdi2W4Rw5tfpjXDo' \
--data-raw '{
    "username": "test1",
    "email": "11www@gmail.com",
    "phone": "111111111",
    "role": [
        "MOD"
    ]
}'
```
Example response
```sh
{
    "message": "User updated  successfully!!!",
    "data": null,
    "status": null,
    "rowCount": 0,
    "errorCode": null
}
```
- #### Delete user
```sh
curl --location --request POST 'http://localhost:8080/api/v1/user/delete/12' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTY5OTQ0Njg3NSwiZXhwIjoxNjk5NTMzMjc1fQ.dTQ_F5l55Vzz-lHauE6H99eTlQbQXwcNq0YztdRN97Q'
```
Example response
```sh
{
    "message": "User deleted successfully!!!",
    "data": null,
    "status": null,
    "rowCount": 0,
    "errorCode": null
}
```

# FRONT-END
- **Running application**
```sh
pnpm install
pnpm dev
```
