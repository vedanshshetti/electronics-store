'use client';

import { forwardRef } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';

type Props = {
  sitekey: any;
  onVerify: (token: string) => void;
};

const HCaptchaWithRef = forwardRef<any, Props>((props, ref) => (
  <HCaptcha {...props} ref={ref} />
));

HCaptchaWithRef.displayName = 'HCaptchaWithRef';

export default HCaptchaWithRef;