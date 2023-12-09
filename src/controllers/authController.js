const { getAuth, signInWithEmailAndPassword } = require("firebase/auth");
const { Storage } = require('@google-cloud/storage');
const admin = require('firebase-admin');
const serviceAccount = require('../path/to/serviceAccountKey.json');
const { admin, db } = require('../config/firebaseConfig');

const signUp = async (req, res) => {
    const { email, password, major, grade, region } = req.body;

    try {
        const userRecord = await admin.auth().createUser({
            email: email,
            password: password,
        });

        const uid = userRecord.uid;
        await db.collection('users').doc(uid).set({
            email,
            uid,
            major,
            grade,
            region,
        });

        await db.collection('usersByMajor').doc(uid).set({
            uid,
            email,
            major,
            grade,
            region,
        });

        await db.collection('usersByGrade').doc(uid).set({
            uid,
            email,
            major,
            grade,
            region,
        });

        await db.collection('usersByRegion').doc(uid).set({
            uid,
            email,
            major,
            grade,
            region,
        });

        res.status(201).json({ message: "회원가입 성공" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const login = (req, res) => {
    const { email, password } = req.body;
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            res.status(200).json({ message: "로그인 성공" });
        })
        .catch((error) => {
            res.status(500).json({ error: error.message });
        });
};

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'https://console.firebase.google.com/u/0/project/findteammate-8edfd/storage/findteammate-8edfd.appspot.com/files',
});

const bucket = admin.storage().bucket();

const createProfile = async (req, res) => {
    const { uid, name, birth, phoneNumber, university, major, grade, region,notificationEnabled  } = req.body;

    try {
        // 파일 업로드를 처리
        upload.fields([{ name: 'experience', maxCount: 1 }, { name: 'portfolio', maxCount: 1 }])(req, res, async (err) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            const experienceFile = req.files['experience'][0];
            const portfolioFile = req.files['portfolio'][0];

            // 파일을 저장할 Firebase Storage 경로 설정
            const experienceFilePath = `users/${uid}/experience/${experienceFile.originalname}`;
            const portfolioFilePath = `users/${uid}/portfolio/${portfolioFile.originalname}`;

            // Firebase Storage에 파일 업로드
            await bucket.upload(experienceFile.path, { destination: experienceFilePath });
            await bucket.upload(portfolioFile.path, { destination: portfolioFilePath });

            // 데이터베이스에 프로필 정보 및 파일 경로 저장
            await db.collection('users').doc(uid).set({
                uid,
                name,
                birth,
                phoneNumber,
                university,
                major,
                grade,
                region,
                experience: experienceFilePath,
                portfolio: portfolioFilePath,
                notificationEnabled,
            });

            res.status(200).json({ message: "프로필 생성 및 파일 업로드 완료" });
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// const createProfile = async (req, res) => {
//     const { uid, name, birth, phoneNumber, university, experience, major, grade, region } = req.body;

//     try {
//         await db.collection('users').doc(uid).update({
//             uid,
//             name,
//             birth,
//             phoneNumber,
//             university,
//             experience,
//             major,
//             grade,
//             region,
//             portfolio,
//         });

//         res.status(200).json({ message: "프로필 생성 완료" });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

const editProfile = async (req, res) => {
    const { uid, name, birth, phoneNumber, university, experience, major, grade, region } = req.body;

    try {
        await db.collection('users').doc(uid).update({
            name,
            birth,
            phoneNumber,
            university,
            experience,
            major,
            grade,
            region,
            portfolio,
            notificationEnabled,
        });

        res.status(200).json({ message: "프로필 편집 완료" });
    } catch (error) {
        console.error(`Error editing profile: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};


const getProfile = async (req, res) => {
    const { uid } = req.params;

    try {
        const doc = await db.collection('users').doc(uid).get();

        if (!doc.exists) {
            res.status(404).json({ error: "프로필을 찾을 수 없습니다." });
            return;
        }

        const profileData = doc.data();
        res.status(200).json({ ...profileData, notificationEnabled: profileData.notificationEnabled || false });
    } catch (error) {
        console.error(`Error getting profile: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};

const getProfileByCategory = async (req, res) => {
    const { category, value } = req.params;

    try {
        const querySnapshot = await db.collection(`usersBy${category}`).where(category, '==', value).get();

        const profiles = [];
        querySnapshot.forEach((doc) => {
            profiles.push(doc.data());
        });

        res.status(200).json(profiles);
    } catch (error) {
        console.error(`Error getting profiles: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    signUp,
    login,
    createProfile,
    editProfile,
    getProfile,
    getProfileByCategory
};