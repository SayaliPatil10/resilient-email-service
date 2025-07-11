import EmailService from "../services/email.service.js";
import logger from "../utils/logger.js";
import emailQueue from "../utils/emailQueue.js";
import {
    isDuplicateRequest,
    saveIdempotentResult,
    getIdempotentResult,
} from "../utils/idempotency.js";

export const sendEmailController = async (req, res) => {
    const { to, subject, body, idempotencyKey } = req.body;

    try {
        if (!to || !subject || !body || !idempotencyKey) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        if (isDuplicateRequest(idempotencyKey)) {
            return res.status(200).json({
                message: "Duplicate request",
                ...getIdempotentResult(idempotencyKey),
            });
        }

        emailQueue.add({ to, subject, body });

        return res.status(200).json({ message: "Email job added to queue" });
    } catch (error) {
        logger.error(" Failed to enqueue email", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
