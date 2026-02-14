// authService.ts

import nodemailer from 'nodemailer';
import crypto from 'crypto';

interface OTP {
    code: string;
    expiresIn: Date;
}

interface AuthResponse {
    success: boolean;
    message: string;
    data?: any;
}

interface UserSession {
    userId: string;
    sessionId: string;
    createdAt: Date;
    expiresAt: Date;
}

class AuthService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'your-email@gmail.com',
                pass: 'your-email-password',
            },
        });
    }

    generateOTP(): OTP {
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresIn = new Date(Date.now() + 300000); // OTP valid for 5 minutes
        return { code, expiresIn };
    }

    validateOTP(providedCode: string, otp: OTP): boolean {
        return providedCode === otp.code && new Date() < otp.expiresIn;
    }

    async sendEmail(to: string, subject: string, text: string): Promise<void> {
        await this.transporter.sendMail({
            from: 'your-email@gmail.com',
            to,
            subject,
            text,
        });
    }

    createSession(userId: string): UserSession {
        const sessionId = crypto.randomBytes(16).toString('hex');
        const createdAt = new Date();
        const expiresAt = new Date(Date.now() + 3600000); // Session valid for 1 hour

        return { userId, sessionId, createdAt, expiresAt };
    }

    encryptData(data: string): string {
        const cipher = crypto.createCipher('aes-256-cbc', 'your-secret-key');
        let encrypted = cipher.update(data, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
    }

    // Handle authentication state management etc.
}

export default new AuthService();
