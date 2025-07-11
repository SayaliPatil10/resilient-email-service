import { sendViaProviderA } from "../providers/providerA.js";
import { sendViaProviderB } from "../providers/providerB.js";
import logger from "../utils/logger.js";
import { logEmailStatus } from "../utils/statusTracker.js";
import { CircuitBreaker } from "../utils/circuitBreaker.js";

class EmailService {
  constructor() {
    this.maxRetries = 3;
    this.circuitBreakerA = new CircuitBreaker({ failureThreshold: 3, cooldownPeriod: 10000 });
    this.circuitBreakerB = new CircuitBreaker({ failureThreshold: 2, cooldownPeriod: 10000 });
  }

  async sendEmail({ to, subject, body }) {
    let attempt = 0;

    if (this.circuitBreakerA.canRequest()) {
      while (attempt < this.maxRetries) {
        try {
          const response = await sendViaProviderA({ to, subject, body });

          logger.info(`Email sent via Provider A on attempt ${attempt + 1}`);
          this.circuitBreakerA.recordSuccess();
          logEmailStatus({
            to,
            subject,
            providerUsed: "ProviderA",
            status: "success",
            retryCount: attempt,
          });

          return {
            provider: "ProviderA",
            status: "success",
            message: response,
            retries: attempt,
          };
        } catch (error) {
          attempt++;
          this.circuitBreakerA.recordFailure();
          logger.warn(`Retry ${attempt} for Provider A failed`);
          await this._wait(1000 * Math.pow(2, attempt));
        }
      }
    } else {
      logger.warn("Provider A circuit breaker open — skipping");
    }

    if (this.circuitBreakerB.canRequest()) {
      try {
        const response = await sendViaProviderB({ to, subject, body });

        logger.info("Email sent via Provider B");
        this.circuitBreakerB.recordSuccess();
        logEmailStatus({
          to,
          subject,
          providerUsed: "ProviderB",
          status: "success",
          retryCount: 0,
        });

        return {
          provider: "ProviderB",
          status: "success",
          message: response,
        };
      } catch (error) {
        this.circuitBreakerB.recordFailure();
        logger.error("Provider B failed");
      }
    } else {
      logger.warn("Provider B circuit breaker open — skipping");
    }

    logger.error("All providers failed");
    logEmailStatus({
      to,
      subject,
      providerUsed: "None",
      status: "failed",
      retryCount: attempt,
    });

    return {
      status: "failure",
      error: "All providers failed",
    };
  }

  _wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

export default new EmailService();
