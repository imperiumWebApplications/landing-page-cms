import CookieConsentModal from 'react-cookie-consent';
import cx from 'classnames';
import ReactMarkdown from 'react-markdown';

import type { StaticContent } from '../../lib/strapi';

import { getButtonSizeClasses, getButtonVariantClasses } from '../Button';

export const COOKIE_CONSENT_NAME = 'lq-pages-cc';

export type CookiesAllowed = 'Yes' | 'No' | 'NotAnswered';
export type CookieConsentProps = {
  consent: CookiesAllowed;
  setConsent: React.Dispatch<React.SetStateAction<CookiesAllowed>>;
  staticContent: StaticContent['cookie_consent_dialog'];
};

export const CookieConsent: React.FC<CookieConsentProps> = ({
  consent,
  setConsent,
  staticContent,
}) => {
  if (consent !== 'NotAnswered') return <></>;

  return (
    <div className="absolute top-0 left-0 z-40 h-full w-full bg-[black] bg-opacity-5 backdrop-blur-sm">
      <div
        data-testid="cookie-consent-modal"
        className="relative h-[80vh] w-full md:h-[98vh]"
      >
        <CookieConsentModal
          disableStyles={true}
          enableDeclineButton={true}
          expires={30}
          containerClasses="absolute z-50 bg-[white] p-8 right-4 w-[calc(100%-2rem)] h-auto rounded-md text-sm shadow-lg md:max-w-lg sm:width-[25rem] sm:right-8"
          buttonText={staticContent?.accept_label}
          ariaAcceptLabel={staticContent?.accept_label ?? undefined}
          buttonClasses={cx(
            'relative rounded-md mt-4',
            getButtonVariantClasses('primary'),
            getButtonSizeClasses('medium'),
          )}
          onAccept={() => setConsent('Yes')}
          declineButtonText={staticContent?.decline_label}
          ariaDeclineLabel={staticContent?.decline_label ?? undefined}
          declineButtonClasses={cx(
            'relative rounded-md mt-4 mr-4',
            getButtonVariantClasses('tertiary'),
            getButtonSizeClasses('medium'),
          )}
          onDecline={() => setConsent('No')}
          cookieName={COOKIE_CONSENT_NAME}
        >
          <span className="my-4 block text-lg font-semibold uppercase tracking-wide text-[black] opacity-90">
            {staticContent?.title}
          </span>
          {staticContent?.description ? (
            <ReactMarkdown>{staticContent?.description}</ReactMarkdown>
          ) : null}
        </CookieConsentModal>
      </div>
    </div>
  );
};
