import Twitter from 'twitter';
import { secrets } from '../../secrets/Twitter';
export const client = new Twitter(secrets);
