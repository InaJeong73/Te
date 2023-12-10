const { admin, db } = require('../config/firebaseConfig');

const createApplication = async (req, res) => {
    const { postid, writerid, applicantid, selfIntroduction, resume } = req.body;

    try {
        // Check if the postid exists before creating the application
        const postDoc = await db.collection('Post').doc(postid).get();
        if (!postDoc.exists) {
            res.status(404).json({ error: "게시물을 찾을 수 없습니다." });
            return;
        }

        // Create the application document
        await db.collection('applications').doc(postid).set({
            postid,
            writerid,
            applicantid,
            selfIntroduction,
            resume
        });

        res.status(201).json({ message: "신청서 생성 완료" });
    } catch (error) {
        console.error(`Error creating application: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};

const getApplication = async (req, res) => {
    const { applicantId } = req.params;

    try {
        // Get application information
        const applicationDoc = await db.collection('applications').where('applicantid', '==', applicantId).get();

        if (applicationDoc.empty) {
            res.status(404).json({ error: "신청서를 찾을 수 없습니다." });
            return;
        }

        const applicationData = applicationDoc.docs.map(doc => doc.data());

        // Get profile information using applicantId
        const profileDoc = await db.collection('users').doc(applicantId).get();

        if (!profileDoc.exists) {
            res.status(404).json({ error: "프로필을 찾을 수 없습니다." });
            return;
        }

        const profileData = profileDoc.data();

        // Combine profile and application data
        const result = {
            profile: profileData,
            applications: applicationData
        };

        res.status(200).json(result);
    } catch (error) {
        console.error(`Error getting application: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};

const getApplicationsByPostId = async (req, res) => {
    const { postId } = req.params;

    try {
        // Get all applications for a specific postId
        const applicationsSnapshot = await db.collection('applications').where('postid', '==', postId).get();

        if (applicationsSnapshot.empty) {
            res.status(404).json({ error: "이 게시물에 대한 지원서가 없습니다." });
            return;
        }

        const applications = applicationsSnapshot.docs.map(doc => doc.data());

        res.status(200).json(applications);
    } catch (error) {
        console.error(`Error getting applications for post: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    createApplication,
    getApplication,
    getApplicationsByPostId
};