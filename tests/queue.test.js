import { jest } from '@jest/globals';
import emailQueue from '../src/utils/emailQueue.js';
import EmailService from '../src/services/email.service.js';

jest.useFakeTimers();
jest.spyOn(global, 'setImmediate');

EmailService.sendEmail = jest.fn((job) => {
    if (job.to === 'fail@example.com') {
        return Promise.reject(new Error('Simulated failure'));
    }
    return Promise.resolve({ messageId: 'mocked-id' });
});

describe('EmailQueue', () => {
    beforeEach(() => {
        emailQueue.queue = [];
        emailQueue.failedJobs = [];
        emailQueue.processing = false;
        emailQueue.paused = false;
    });

    it('should process successful job', async () => {
        emailQueue.add({ to: 'test@example.com', subject: 'Test', body: 'Hello' });
        await Promise.resolve(); // allow microtasks to flush
        expect(EmailService.sendEmail).toHaveBeenCalledWith(
            expect.objectContaining({ to: 'test@example.com' })
        );
    });

    it('should queue failed job for retry', async () => {
        emailQueue.add({ to: 'fail@example.com', subject: 'Oops', body: 'Fail' });
        await Promise.resolve();
        expect(emailQueue.failedJobs.length).toBe(1);
    });

    it('should retry failed jobs when requested', async () => {
        emailQueue.failedJobs.push({ to: 'retry@example.com', subject: 'Retry', body: 'Again' });
        emailQueue.retryFailedJobs();
        await Promise.resolve();
        expect(EmailService.sendEmail).toHaveBeenCalledWith(
            expect.objectContaining({ to: 'retry@example.com' })
        );
    });

    it('should pause and resume queue processing', async () => {
        emailQueue.pause();
        expect(emailQueue.paused).toBe(true);

        emailQueue.add({ to: 'pause@example.com', subject: 'Paused', body: 'Hold on' });
        expect(emailQueue.processing).toBe(false); // should not process while paused

        emailQueue.resume();
        expect(emailQueue.paused).toBe(false);
    });

    it('should drop jobs if queue is full', async () => {
        emailQueue.maxSize = 2;
        emailQueue.add({ to: '1@example.com', subject: '', body: '' });
        emailQueue.add({ to: '2@example.com', subject: '', body: '' });
        emailQueue.add({ to: '3@example.com', subject: '', body: '' }); // should be dropped

        expect(emailQueue.queue.length).toBe(2);
    });
});
