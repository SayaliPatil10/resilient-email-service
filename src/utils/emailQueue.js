import EmailService from "../services/email.service.js";
import logger from "./logger.js";

class EmailQueue {
  constructor(maxSize = 50) {
    this.queue = [];
    this.failedJobs = [];
    this.processing = false;
    this.paused = false;
    this.maxSize = maxSize;
  }

  add(emailJob) {
    if (this.queue.length >= this.maxSize) {
      logger.warn("🚫 Queue full. Dropping job.");
      return;
    }
    this.queue.push(emailJob);
    this.processQueue();
  }

  async processQueue() {
    if (this.processing || this.paused || this.queue.length === 0) return;

    this.processing = true;
    const job = this.queue.shift();

    try {
      const result = await EmailService.sendEmail(job);
      logger.info(" Email job processed successfully", result);
    } catch (error) {
      logger.error(" Email job failed. Queued for retry.", error.message);
      this.failedJobs.push(job);
    } finally {
      this.processing = false;
      setImmediate(() => this.processQueue()); // Continue with next job
    }
  }

  pause() {
    this.paused = true;
    logger.warn(" Queue processing paused.");
  }

  resume() {
    if (this.paused) {
      this.paused = false;
      logger.info(" Queue resumed.");
      this.processQueue();
    }
  }

  retryFailedJobs() {
    if (this.failedJobs.length === 0) {
      logger.info(" No failed jobs to retry.");
      return;
    }

    logger.info(`🔁 Retrying ${this.failedJobs.length} failed jobs...`);
    const retryList = [...this.failedJobs];
    this.failedJobs = [];

    for (const job of retryList) {
      this.add(job);
    }
  }
}

const emailQueue = new EmailQueue();
export default emailQueue;
