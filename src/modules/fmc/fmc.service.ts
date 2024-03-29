import * as admin from 'firebase-admin';
import SendChatDTO from './dto/sendChat.dto';
import { CLIENT_EMAIL, FCM_PROJECT_ID, PRIVATE_KEY } from 'src/environments';

export class FirebaseAdminService {
    private readonly admin: admin.app.App;
    constructor() {
        this.admin = admin.initializeApp({
            credential: admin.credential.cert({
                projectId: FCM_PROJECT_ID,
                clientEmail: CLIENT_EMAIL,
                privateKey: PRIVATE_KEY
            }),
        });
    }

    async sendNotification(dto: SendChatDTO): Promise<any> {
        const message = {
            notification: {
                title: dto.title,
                body: dto.body,
            },

            token: dto.registrationToken,
        };

        try {
            await this.admin.messaging().send(message);
        } catch (error) {
            // Handle error
            console.error('Failed to send notification:', error);
        }
    }
}
