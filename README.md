# 🎯 팀 프로젝트 모집 서비스 (Backend)

> **Firebase 기반의 Node.js Express 백엔드 API**
>  
> 대학교 내 팀 프로젝트를 모집하고 지원하는 서비스의 백엔드 개발을 담당하여  
> **Firebase Firestore를 활용한 DB 구축 및 REST API 개발**을 수행하였습니다.

---

## 📌 프로젝트 개요
**팀 프로젝트 모집 서비스**는 대학생들이 프로젝트 팀원을 모집하고,  
사용자 간 소통을 원활하게 할 수 있도록 지원하는 플랫폼입니다.  

- **회원가입 및 로그인**
- **프로필 관리**
- **게시글 CRUD (생성, 수정, 삭제, 조회)**
- **프로젝트 지원 (신청서 작성 및 조회)**
- **채팅 기능 (채팅방 생성 및 메시지 전송)**

<br>


![image](https://github.com/user-attachments/assets/a945bc70-8b75-470d-a67f-4156bb0fc974)
![image](https://github.com/user-attachments/assets/6fefc6a7-eb83-4688-a2d6-90578471b5f8)
![image](https://github.com/user-attachments/assets/6b51a5cb-2006-4fd9-834d-c443522e035c)


<br>

---

## ⚙ **기술 스택**
- **언어:** JavaScript (Node.js)
- **백엔드 프레임워크:** Express.js
- **인증:** Firebase Authentication
- **데이터베이스:** Firebase Firestore

---

## 📂 **프로젝트 구조**
```shell
📁 TeamMate
 ┣ 📂 src
 ┃ ┣ 📂 config
 ┃ ┃ ┣ 📜 firebaseConfig.js
 ┃ ┣ 📂 controllers
 ┃ ┃ ┣ 📜 applicationController.js
 ┃ ┃ ┣ 📜 authController.js
 ┃ ┃ ┣ 📜 chatController.js
 ┃ ┃ ┗ 📜 postController.js
 ┃ ┣ 📂 routes
 ┃ ┃ ┣ 📜 applicationRoutes.js
 ┃ ┃ ┣ 📜 authRoutes.js
 ┃ ┃ ┣ 📜 chatRoutes.js
 ┃ ┃ ┗ 📜 postRoutes.js
 ┃ ┣ 📜 app.js
 ┣ 📜 package.json
 ┣ 📜 package-lock.json
 ┗ 📜 .gitignore
```
---

## 📝 API 명세서

### 🔹 **회원 인증**
| 메서드 | 엔드포인트 | 설명 |
|--------|--------------------------|----------------------------|
| `POST` | `/api/signup` | 회원가입 |
| `POST` | `/api/login` | 로그인 |
| `POST` | `/api/createprofile` | 프로필 생성 |
| `POST` | `/api/editprofile` | 프로필 수정 |
| `GET`  | `/api/getProfile/:uid` | 특정 유저 프로필 조회 |
| `GET`  | `/api/getAllUsers` | 모든 유저 목록 조회 |

### 🔹 **게시글 관리**
| 메서드 | 엔드포인트 | 설명 |
|--------|------------------------------|----------------------|
| `GET`  | `/api/post/getAllPosts` | 모든 게시글 조회 |
| `GET`  | `/api/post/getPost/:postId` | 특정 게시글 조회 |
| `POST` | `/api/post/create` | 게시글 작성 |
| `POST` | `/api/post/edit/:postId` | 게시글 수정 |
| `DELETE` | `/api/post/delete/:postId` | 게시글 삭제 |

### 🔹 **지원서 관리**
| 메서드 | 엔드포인트 | 설명 |
|--------|--------------------------------|---------------------------|
| `POST` | `/api/apply/createApplication` | 지원서 작성 |
| `GET`  | `/api/apply/getApplication/:applicantId` | 특정 지원서 조회 |
| `GET`  | `/api/apply/getApplicationsByPostId/:postId` | 특정 게시글 지원서 조회 |

### 🔹 **채팅 기능**
| 메서드 | 엔드포인트 | 설명 |
|--------|-----------------------------|---------------------|
| `POST` | `/api/chat/createChatRoom` | 채팅방 생성 |
| `POST` | `/api/chat/sendMessage` | 메시지 전송 |
| `GET`  | `/api/chat/getChatRoomMessages/:chatRoomId` | 특정 채팅방 메시지 조회 |

---

## 🚀 프로젝트 실행 방법

### 1️⃣ **환경 설정**
먼저 프로젝트를 클론하고 필요한 패키지를 설치합니다.

```bash
git clone https://github.com/your-repository/team-mate-backend.git
cd team-mate-backend
npm install
```

### 2️⃣ Firebase 설정
src/config/firebaseConfig.js 파일을 설정합니다.
아래의 파일을 src/config/firebaseConfig.js 위치에 생성하고, Firebase 콘솔에서 받은 정보를 입력하세요.

```bash
const admin = require("firebase-admin");
const serviceAccount = require("./findteammate-8edfd-firebase-adminsdk.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://findteammate.firebaseio.com"
});

const db = admin.firestore();
module.exports = { admin, db };
```

### 3️⃣ 서버 실행
아래 명령어를 실행하면 서버가 실행됩니다.
```bash
npm start
```
기본 포트는 3000이며, 실행 후 아래와 같은 메시지가 출력됩니다.
```shell
Server is running on port 3000
```

### 4️⃣ **API 테스트**
Postman 또는 `cURL`을 사용하여 API를 테스트할 수 있습니다.

#### ✅ **예제: 회원가입 API 요청**
다음 `cURL` 명령어를 사용하여 회원가입을 테스트할 수 있습니다.

```bash
curl -X POST "http://localhost:3000/api/signup" \
     -H "Content-Type: application/json" \
     -d '{
           "email": "test@example.com",
           "password": "password123",
           "major": "Computer Science",
           "grade": "3",
           "region": "Seoul"
         }'
```

#### ✅ **예제 응답 (JSON)**
'''shell
{
  "uid": "abcd1234xyz",
  "message": "회원가입 성공"
}
```

---

---

## 🛠 환경 변수 설정

`.env` 파일을 프로젝트 루트 디렉토리에 생성하고 아래와 같이 환경 변수를 설정하세요.

```env
PORT=3000
FIREBASE_API_KEY=your-firebase-api-key
FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
FIREBASE_APP_ID=your-firebase-app-id
'''

`.gitignore` 파일에 `.env` 파일을 추가하여 보안 위험을 방지하세요.
```shell
# Ignore environment variables
.env
'''

