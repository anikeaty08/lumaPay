import 'dotenv/config';
import { createApp } from './src/app.js';
import { createRuntime } from './src/runtime.js';

const runtime = createRuntime();
const app = createApp(runtime);
const port = Number(process.env.PORT ?? 3000);

if (process.env.NODE_ENV !== 'test') {
    const server = app.listen(port, () => {
        runtime.logger.info('api.started', { port, product: 'LumaPay' });
        void runtime.start().catch((error) => {
            runtime.logger.error('runtime.start_failed', { error });
        });
    });

    const shutdown = async (signal) => {
        runtime.logger.info('api.stopping', { signal });
        server.close();
        await runtime.stop();
    };
    process.once('SIGINT', () => void shutdown('SIGINT'));
    process.once('SIGTERM', () => void shutdown('SIGTERM'));
}

export default app;
export { createApp } from './src/app.js';
