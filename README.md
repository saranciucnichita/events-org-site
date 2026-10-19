## Generic learning project
Uses MUI, Nest as backend, Prisma as ORM, sends data to Docker-containerized MariaDB Server. Treat it as a pet project. **I make no claims against anyone and do not assert any rights to the repository data, to any extent whatsoever.**
To enable migration, use `npx prisma migrate dev --name init`. `npx prisma generate`
To set up paths, use `$env:Path = "C:\Windows\System32;C:\Users\User\Downloads\node-v26.X.X-win-x64"`

Git Setup:
```
git config --global user.name "saranciucnichita"
git config --global user.email "saranciucnichita@gmail.com"
```

Unset:
```
git config --global --unset user.name
git config --global --unset user.email
```
Commands:
curl -X POST -H "Content-Type: application/json" -d '{"username": "nichita", "password": "abc", "role": "client", "email": "abc@mail.com"}' 127.0.0.1:4000/user
curl -X PUT -H "Content-Type: application/json" -d '{"username": "sergiu"}' 127.0.0.1:4000/update/1

Inspired by:
[Summit Events](https://summit.md/en/event-management/)