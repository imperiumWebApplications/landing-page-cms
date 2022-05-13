import type { NextPage } from 'next';

import type { ContentPageContent } from '../interface/getServerSideProps';
import { collectContentPageContent } from '../interface/getServerSideProps';
import {
  mapSectionsDataToSectionComponents,
  SectionMapping,
} from '../config/sections.config';
import { Layout } from '../components/Layout';
import { StepsSection } from '../sections/StepsSection';
import { VideoSection } from '../sections/VideoSection';
import { StatisticsSection } from '../sections/StatisticsSection';
import { CallToActionSection } from '../sections/CallToActionSection';
import { ServicesSection } from '../sections/ServicesSection';
import { ReviewsSection } from '../sections/ReviewsSection';
import { ImagesSection } from '../sections/ImagesSection';
import { QuestionsSection } from '../sections/QuestionsSection';
import { HeroSection } from '../sections/HeroSection';

const IndexPage: NextPage<ContentPageContent> = ({
  domainContent,
  staticContent,
}) => {
  const sections = mapSectionsDataToSectionComponents(domainContent.sections);
  const funnelTarget = domainContent.funnel_target ?? 'Questionnaire';

  return (
    <Layout content={domainContent}>
      {/* Hero Section */}
      {sections[SectionMapping.Hero] &&
        (funnelTarget === 'Questionnaire' ? (
          <HeroSection.Questionnaires
            id="hero"
            content={sections[SectionMapping.Hero]}
            questionnaire={domainContent.questionnaire}
            funnelTarget={funnelTarget}
          />
        ) : (
          <HeroSection.Call
            id="hero"
            content={sections[SectionMapping.Hero]}
            serviceType={domainContent.service_type}
            contactPhone={domainContent.contact_phone}
            callLink={domainContent.funnel_target_call_link}
            funnelTarget={funnelTarget}
          />
        ))}
      {/* Steps Section */}
      {staticContent && (
        <StepsSection
          id="steps"
          funnelTarget={domainContent.funnel_target}
          staticContent={staticContent}
        />
      )}
      {/* Video Section */}
      {sections[SectionMapping.Video] && staticContent && (
        <VideoSection
          id="video"
          content={sections[SectionMapping.Video]}
          staticContent={staticContent}
        />
      )}
      {/* Statistics Section */}
      {sections[SectionMapping.Statistics] && (
        <StatisticsSection
          id="statistics"
          content={sections[SectionMapping.Statistics]}
        />
      )}
      {/* CallToAction Section */}
      {sections[SectionMapping.CallToAction] && (
        <CallToActionSection
          id="call-to-action"
          phoneNumber={domainContent.contact_phone}
          content={sections[SectionMapping.CallToAction]}
        />
      )}
      {/* Services Section */}
      {sections[SectionMapping.Services] && (
        <ServicesSection
          id="services"
          serviceType={domainContent.service_type}
          content={sections[SectionMapping.Services]}
        />
      )}
      {/* Reviews Section */}
      {sections[SectionMapping.Reviews] && (
        <ReviewsSection
          id="reviews"
          content={sections[SectionMapping.Reviews]}
        />
      )}
      {/* Images Section */}
      {sections[SectionMapping.Images] && (
        <ImagesSection
          id="images"
          phoneNumber={domainContent.contact_phone}
          content={sections[SectionMapping.Images]}
        />
      )}
      {/* Questions Section */}
      {sections[SectionMapping.Questions] && (
        <QuestionsSection
          id="questions"
          content={sections[SectionMapping.Questions]}
        />
      )}
    </Layout>
  );
};

export const getServerSideProps = collectContentPageContent;

export default IndexPage;
