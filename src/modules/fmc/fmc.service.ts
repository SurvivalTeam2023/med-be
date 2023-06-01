import * as admin from 'firebase-admin';

export class FirebaseAdminService {
    private readonly admin: admin.app.App;
    constructor() {
        this.admin = admin.initializeApp({
            credential: admin.credential.cert({
                projectId: process.env.FCM_PROJECT_ID,
                clientEmail: process.env.CLIENT_EMAIL,
                privateKey: process.env.PRIVATE_KEY,
            }),
        });
    }

    async sendNotification(deviceToken: string, title: string, body: string): Promise<void> {
        const message = {
            notification: {
                title,
                body,
            },
            token: deviceToken,
        };

        try {
            await this.admin.messaging().send(message);
        } catch (error) {
            // Handle error
            console.error('Failed to send notification:', error);
        }
    }
}
