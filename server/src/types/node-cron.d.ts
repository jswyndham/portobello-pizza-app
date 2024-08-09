declare module 'node-cron' {
	import { Job } from 'node-schedule';

	type ScheduledTask = {
		start: () => void;
		stop: () => void;
		destroy: () => void;
		getStatus: () => string;
	};

	export function schedule(
		cronExpression: string,
		func: () => void,
		options?: {
			scheduled?: boolean;
			timezone?: string;
		}
	): ScheduledTask;

	export function validate(cronExpression: string): boolean;

	export default {
		schedule,
		validate,
	};
}
