import { doDelivery } from './index';

const { argv } = process;
console.log('Count of houses:', doDelivery(argv[2] ?? ''));
