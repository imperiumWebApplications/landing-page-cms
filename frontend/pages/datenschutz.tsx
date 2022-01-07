import type { NextPage } from 'next';
import ReactMarkdown from 'react-markdown';

import { Layout } from '../components/Layout';
import { Section } from '../components/Section';
import { Article } from '../components/Article';
import { populateMarkdownTemplate } from '../utils/populateMarkdownTemplate';
import {
  DomainSpecificContent,
  requestDomainSpecificContent,
} from '../interface/request';

const Privacy: NextPage<DomainSpecificContent> = ({
  domainContent,
  staticContent: { privacy: privacyTemplate },
}) => {
  return (
    <Layout content={domainContent}>
      <Section id="privacy">
        <Article>
          <ReactMarkdown>
            {populateMarkdownTemplate(privacyTemplate, domainContent) ?? ''}
          </ReactMarkdown>
        </Article>
      </Section>
    </Layout>
  );
};

export const getServerSideProps = requestDomainSpecificContent;

export default Privacy;
