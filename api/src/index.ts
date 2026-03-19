// Entry point: import all function modules so they register with the Azure Functions runtime
import './functions/healthz/index';
import './functions/readyz/index';
import './functions/auth-login/index';
import './functions/auth-signup/index';
import './functions/contact/index';
import './functions/waitlist-subscribe/index';
import './functions/wallet-know-your-rights-pass/index';
import './functions/v1-projects/index';
