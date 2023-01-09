import type { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import ReactMarkdown from 'react-markdown';

import type { LandingPage, StaticContent } from '../lib/strapi';
import { Article } from '../components/Article';
import { Layout } from '../components/Layout';
import { queryStaticPageContent } from '../lib/next/app';
import { populateMarkdownTemplate } from '../utils/populateMarkdownTemplate';
import { getCountryByDomain } from '../utils/getCountryByDomain';
import { Country } from '../config/countries.config';

const ImprintPage: NextPage<{ content: LandingPage & StaticContent }> = ({
  content,
}) => {
  const enrichedDomainContent = enrichDomainContent(content);
  const pageContent = populateMarkdownTemplate(
    content.imprint,
    enrichedDomainContent,
  );

  return (
    <Layout content={enrichedDomainContent}>
      <NextSeo noindex={true} />
      <div id="imprint" className="content-wrapper">
        <Article>
          <ReactMarkdown>{pageContent ?? ''}</ReactMarkdown>
        </Article>
      </div>
    </Layout>
  );
};

export const getServerSideProps = queryStaticPageContent;

export default ImprintPage;

/** Helper */

const getVatSpecification = (country?: string, vat?: string | null) => {
  if (!vat) return undefined;

  switch (country) {
    case Country.Germany:
      return `Umsatzsteuer-Identifikationsnummer gem. § 27a UStG:\n${vat}`;
    case Country.Switzerland:
      return `Unternehmens-Identifikationsnummer (UID):\n${vat}`;
    default:
      return `Unternehmens-Identifikation:\n${vat}`;
  }
};

const enrichDomainContent = (domainContent: LandingPage): LandingPage => {
  const country = getCountryByDomain(domainContent.domain);

  return {
    ...domainContent,
    client_vat: getVatSpecification(country, domainContent.client_vat),
  };
};